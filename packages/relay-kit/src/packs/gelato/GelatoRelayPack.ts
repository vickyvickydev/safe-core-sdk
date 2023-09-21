import { BigNumber } from '@ethersproject/bignumber'
import {
  CallWithSyncFeeRequest,
  GelatoRelay as GelatoNetworkRelay,
  RelayRequestOptions,
  RelayResponse,
  SponsoredCallRequest,
  TransactionStatusResponse
} from '@gelatonetwork/relay-sdk'
import Safe, {
  estimateTxBaseGas,
  estimateSafeTxGas,
  estimateSafeDeploymentGas,
  createERC20TokenTransferTransaction,
  isGasTokenCompatibleWithHandlePayment
} from '@safe-global/protocol-kit'
import { RelayKitBasePack } from '@safe-global/relay-kit/RelayKitBasePack'
import {
  GELATO_FEE_COLLECTOR,
  GELATO_GAS_EXECUTION_OVERHEAD,
  GELATO_NATIVE_TOKEN_ADDRESS,
  GELATO_TRANSFER_GAS_COST,
  ZERO_ADDRESS
} from '@safe-global/relay-kit/constants'
import { RelayKitTransaction } from '@safe-global/relay-kit/types'
import {
  MetaTransactionOptions,
  RelayTransaction,
  SafeTransaction,
  Transaction
} from '@safe-global/safe-core-sdk-types'

import { GelatoOptions } from './types'

export class GelatoRelayPack extends RelayKitBasePack {
  #gelatoRelay: GelatoNetworkRelay
  #apiKey?: string

  constructor({ apiKey, protocolKit }: GelatoOptions) {
    super(protocolKit)
    this.#gelatoRelay = new GelatoNetworkRelay()

    this.#apiKey = apiKey
  }

  private _getFeeToken(gasToken?: string): string {
    return !gasToken || gasToken === ZERO_ADDRESS ? GELATO_NATIVE_TOKEN_ADDRESS : gasToken
  }

  getFeeCollector(): string {
    return GELATO_FEE_COLLECTOR
  }

  async getEstimateFee(chainId: number, gasLimit: string, gasToken?: string): Promise<string> {
    const feeToken = this._getFeeToken(gasToken)
    const estimation = await this.#gelatoRelay.getEstimatedFee(
      chainId,
      feeToken,
      BigNumber.from(gasLimit),
      false
    )
    return estimation.toString()
  }

  async getTaskStatus(taskId: string): Promise<TransactionStatusResponse | undefined> {
    return this.#gelatoRelay.getTaskStatus(taskId)
  }

  /**
   * Creates a payment transaction to Gelato
   *
   * @private
   * @async
   * @function
   * @param {Safe} safe - The Safe object
   * @param {string} gas - The gas amount for the payment.
   * @param {MetaTransactionOptions} options - Options for the meta transaction.
   * @returns {Promise<Transaction>} Promise object representing the created payment transaction.
   *
   */
  private async createPaymentToGelato(
    gas: string,
    options: MetaTransactionOptions
  ): Promise<Transaction> {
    const chainId = await this.protocolKit.getChainId()
    const gelatoAddress = this.getFeeCollector()
    const gasToken = options.gasToken ?? ZERO_ADDRESS

    const paymentToGelato = await this.getEstimateFee(chainId, gas, gasToken)

    // The Gelato payment transaction
    const transferToGelato = createERC20TokenTransferTransaction(
      gasToken,
      gelatoAddress,
      paymentToGelato
    )

    return transferToGelato
  }

  /**
   * Creates a Safe transaction designed to be executed using the Gelato Relayer.
   *
   * @param {RelayKitTransaction} RelayKitTransaction - Properties required to create the transaction.
   * @returns {Promise<SafeTransaction>} Returns a Promise that resolves with a SafeTransaction object.
   */
  async createRelayedTransaction({
    transactions,
    onlyCalls = false,
    options = {}
  }: RelayKitTransaction): Promise<SafeTransaction> {
    const { isSponsored = false } = options

    if (isSponsored) {
      const nonce = await this.protocolKit.getNonce()

      const sponsoredTransaction = await this.protocolKit.createTransaction({
        safeTransactionData: transactions,
        onlyCalls,
        options: {
          nonce
        }
      })

      return sponsoredTransaction
    }

    // If the ERC20 gas token does not follow the standard 18 decimals, we cannot use handlePayment to pay Gelato fees.

    const gasToken = options.gasToken ?? ZERO_ADDRESS
    const isGasTokenCompatible = await isGasTokenCompatibleWithHandlePayment(
      gasToken,
      this.protocolKit
    )

    if (!isGasTokenCompatible) {
      // if the ERC20 gas token is not compatible (less than 18 decimals like USDC), a separate transfer is required to pay Gelato fees.

      return this.createTransactionWithTransfer({ transactions, onlyCalls, options })
    }

    // If the gas token is compatible (Native token or standard ERC20), we use handlePayment function present in the Safe contract to pay Gelato fees
    return this.createTransactionWithHandlePayment({ transactions, onlyCalls, options })
  }

  /**
   * Creates a Safe transaction designed to be executed using the Gelato Relayer and
   * uses the handlePayment function defined in the Safe contract to pay the fees
   * to the Gelato relayer.
   *
   * @async
   * @function createTransactionWithHandlePayment
   * @param {RelayKitTransaction} RelayKitTransaction - Properties needed to create the transaction.
   * @returns {Promise<SafeTransaction>} Returns a promise that resolves to the created SafeTransaction.
   * @private
   */
  private async createTransactionWithHandlePayment({
    transactions,
    onlyCalls = false,
    options = {}
  }: RelayKitTransaction): Promise<SafeTransaction> {
    const { gasLimit } = options
    const nonce = await this.protocolKit.getNonce()

    // this transaction is only used for gas estimations
    const transactionToEstimateGas = await this.protocolKit.createTransaction({
      safeTransactionData: transactions,
      onlyCalls,
      options: {
        nonce
      }
    })

    // as we set gasPrice to 1, safeTxGas is set to a non-zero value to prevent transaction failure due to out-of-gas errors. value see: https://github.com/safe-global/safe-contracts/blob/main/contracts/Safe.sol#L203
    const gasPrice = '1'
    const safeTxGas = await estimateSafeTxGas(this.protocolKit, transactionToEstimateGas)
    const gasToken = options.gasToken ?? ZERO_ADDRESS
    const refundReceiver = this.getFeeCollector()
    const chainId = await this.protocolKit.getChainId()

    // if a custom gasLimit is provided, we do not need to estimate the gas cost
    if (gasLimit) {
      const paymentToGelato = await this.getEstimateFee(chainId, gasLimit, gasToken)

      const syncTransaction = await this.protocolKit.createTransaction({
        safeTransactionData: transactions,
        onlyCalls,
        options: {
          baseGas: paymentToGelato,
          gasPrice,
          safeTxGas,
          gasToken,
          refundReceiver,
          nonce
        }
      })

      return syncTransaction
    }

    // If gasLimit is not provided, we need to estimate the gas cost.

    const baseGas = await estimateTxBaseGas(this.protocolKit, transactionToEstimateGas)
    const safeDeploymentGasCost = await estimateSafeDeploymentGas(this.protocolKit)

    const totalGas =
      Number(baseGas) + // baseGas
      Number(safeTxGas) + // safeTxGas
      Number(safeDeploymentGasCost) + // Safe deploymet gas cost if it is required
      GELATO_GAS_EXECUTION_OVERHEAD // Gelato execution overhead

    const paymentToGelato = await this.getEstimateFee(chainId, String(totalGas), gasToken)

    const syncTransaction = await this.protocolKit.createTransaction({
      safeTransactionData: transactions,
      onlyCalls,
      options: {
        baseGas: paymentToGelato, // payment to Gelato
        gasPrice,
        safeTxGas,
        gasToken,
        refundReceiver,
        nonce
      }
    })

    return syncTransaction
  }

  /**
   * Creates a Safe transaction designed to be executed using the Gelato Relayer and
   * uses a separate ERC20 transfer to pay the fees to the Gelato relayer.
   *
   * @async
   * @function createTransactionWithTransfer
   * @param {RelayKitTransaction} RelayKitTransaction - Properties needed to create the transaction.
   * @returns {Promise<SafeTransaction>} Returns a promise that resolves to the created SafeTransaction.
   * @private
   */
  private async createTransactionWithTransfer({
    transactions,
    onlyCalls = false,
    options = {}
  }: RelayKitTransaction): Promise<SafeTransaction> {
    const { gasLimit } = options
    const nonce = await this.protocolKit.getNonce()
    const gasToken = options.gasToken ?? ZERO_ADDRESS

    // if a custom gasLimit is provided, we do not need to estimate the gas cost
    if (gasLimit) {
      const transferToGelato = await this.createPaymentToGelato(gasLimit, options)

      const syncTransaction = await this.protocolKit.createTransaction({
        safeTransactionData: [...transactions, transferToGelato],
        onlyCalls,
        options: {
          nonce,
          gasToken
        }
      })

      return syncTransaction
    }

    // If gasLimit is not provided, we need to estimate the gas cost.

    // this transaction is only used for gas estimations
    const transactionToEstimateGas = await this.protocolKit.createTransaction({
      safeTransactionData: transactions,
      onlyCalls,
      options: {
        nonce
      }
    })

    const safeTxGas = await estimateSafeTxGas(this.protocolKit, transactionToEstimateGas)
    const baseGas = await estimateTxBaseGas(this.protocolKit, transactionToEstimateGas)
    const safeDeploymentGasCost = await estimateSafeDeploymentGas(this.protocolKit)

    const totalGas =
      Number(baseGas) + // baseGas
      Number(safeTxGas) + // safeTxGas without Gelato payment transfer
      Number(safeDeploymentGasCost) + // Safe deploymet gas cost if it is required
      GELATO_TRANSFER_GAS_COST + // Gelato payment transfer
      GELATO_GAS_EXECUTION_OVERHEAD // Gelato execution overhead

    const transferToGelato = await this.createPaymentToGelato(String(totalGas), options)

    const syncTransaction = await this.protocolKit.createTransaction({
      safeTransactionData: [...transactions, transferToGelato],
      onlyCalls,
      options: {
        nonce,
        gasToken
      }
    })

    return syncTransaction
  }

  async sendSponsorTransaction(
    target: string,
    encodedTransaction: string,
    chainId: number
  ): Promise<RelayResponse> {
    if (!this.#apiKey) {
      throw new Error('API key not defined')
    }
    const request: SponsoredCallRequest = {
      chainId,
      target,
      data: encodedTransaction
    }
    const response = await this.#gelatoRelay.sponsoredCall(request, this.#apiKey)
    return response
  }

  async sendSyncTransaction(
    target: string,
    encodedTransaction: string,
    chainId: number,
    options: MetaTransactionOptions
  ): Promise<RelayResponse> {
    const { gasLimit, gasToken } = options
    const feeToken = this._getFeeToken(gasToken)
    const request: CallWithSyncFeeRequest = {
      chainId,
      target,
      data: encodedTransaction,
      feeToken,
      isRelayContext: false
    }
    const relayRequestOptions: RelayRequestOptions = {
      gasLimit
    }
    const response = await this.#gelatoRelay.callWithSyncFee(request, relayRequestOptions)
    return response
  }

  async relayTransaction({
    target,
    encodedTransaction,
    chainId,
    options = {}
  }: RelayTransaction): Promise<RelayResponse> {
    const response = options.isSponsored
      ? this.sendSponsorTransaction(target, encodedTransaction, chainId)
      : this.sendSyncTransaction(target, encodedTransaction, chainId, options)
    return response
  }

  /**
   * Sends the Safe transaction to the Gelato Relayer for execution.
   * If the Safe is not deployed, it creates a batch of transactions including the Safe deployment transaction.
   *
   * @param {SafeTransaction} safeTransaction - The Safe transaction to be executed.
   * @returns {Promise<RelayResponse>} Returns a Promise that resolves with a RelayResponse object.
   */
  async executeRelayTransaction(
    safeTransaction: SafeTransaction,
    options?: MetaTransactionOptions
  ): Promise<RelayResponse> {
    const isSafeDeployed = await this.protocolKit.isSafeDeployed()
    const chainId = await this.protocolKit.getChainId()
    const safeAddress = await this.protocolKit.getAddress()
    const safeTransactionEncodedData = await this.protocolKit.getEncodedTransaction(safeTransaction)

    const gasToken = options?.gasToken || safeTransaction.data.gasToken

    if (isSafeDeployed) {
      const relayTransaction: RelayTransaction = {
        target: safeAddress,
        encodedTransaction: safeTransactionEncodedData,
        chainId,
        options: {
          ...options,
          gasToken
        }
      }

      return this.relayTransaction(relayTransaction)
    }

    // if the Safe is not deployed we create a batch with the Safe deployment transaction and the provided Safe transaction
    const safeDeploymentBatch = await this.protocolKit.wrapSafeTransactionIntoDeploymentBatch(
      safeTransaction
    )

    const relayTransaction: RelayTransaction = {
      target: safeDeploymentBatch.to, // multiSend Contract address
      encodedTransaction: safeDeploymentBatch.data,
      chainId,
      options: {
        ...options,
        gasToken
      }
    }

    return this.relayTransaction(relayTransaction)
  }
}
