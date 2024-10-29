import { RelayResponse, TransactionStatusResponse } from '@gelatonetwork/relay-sdk'
import { RelayKitBasePack } from '../../RelayKitBasePack'
import {
  MetaTransactionOptions,
  RelayTransaction,
  SafeTransaction
} from '@safe-global/safe-core-sdk-types'
import {
  GelatoCreateTransactionProps,
  GelatoEstimateFeeProps,
  GelatoEstimateFeeResult,
  GelatoExecuteTransactionProps,
  GelatoOptions
} from './types'
export declare class GelatoRelayPack extends RelayKitBasePack<{
  EstimateFeeProps: GelatoEstimateFeeProps
  EstimateFeeResult: GelatoEstimateFeeResult
  CreateTransactionProps: GelatoCreateTransactionProps
  CreateTransactionResult: SafeTransaction
  ExecuteTransactionProps: GelatoExecuteTransactionProps
  ExecuteTransactionsResult: RelayResponse
}> {
  #private
  constructor({ apiKey, protocolKit }: GelatoOptions)
  private _getFeeToken
  getFeeCollector(): string
  /**
   * Estimates the fee for a transaction.
   * @param {GelatoEstimateFeeProps} props - Props for the fee estimation.
   * @returns {Promise<GelatoEstimateFeeResult>} Returns a Promise that resolves with the estimated fee result.
   */
  getEstimateFee(props: GelatoEstimateFeeProps): Promise<GelatoEstimateFeeResult>
  /**
   * @deprecated The method should not be used
   * @param chainId - The chain id.
   * @param gasLimit - The gas limit.
   * @param gasToken - The gas token.
   */
  getEstimateFee(chainId: bigint, gasLimit: string, gasToken?: string): Promise<string>
  getTaskStatus(taskId: string): Promise<TransactionStatusResponse | undefined>
  /**
   * Creates a payment transaction to Gelato
   *
   * @private
   * @async
   * @function
   * @param {string} gas - The gas amount for the payment.
   * @param {MetaTransactionOptions} options - Options for the meta transaction.
   * @returns {Promise<Transaction>} Promise object representing the created payment transaction.
   *
   */
  private createPaymentToGelato
  /**
   * @deprecated Use createTransaction instead
   */
  createRelayedTransaction({
    transactions,
    onlyCalls,
    options
  }: GelatoCreateTransactionProps): Promise<SafeTransaction>
  /**
   * Creates a Safe transaction designed to be executed using the Gelato Relayer.
   *
   * @param {GelatoCreateTransactionProps} options - Options for Gelato.
   * @param {MetaTransactionData[]} [options.transactions] - The transactions batch.
   * @param {boolean} [options.onlyCalls=false] - If true, MultiSendCallOnly contract should be used. Remember to not use delegate calls in the batch.
   * @param {MetaTransactionOptions} [options.options={}] - Gas Options for the transaction batch.
   * @returns {Promise<SafeTransaction>} Returns a Promise that resolves with a SafeTransaction object.
   */
  createTransaction({
    transactions,
    onlyCalls,
    options
  }: GelatoCreateTransactionProps): Promise<SafeTransaction>
  /**
   * Creates a Safe transaction designed to be executed using the Gelato Relayer and
   * uses the handlePayment function defined in the Safe contract to pay the fees
   * to the Gelato relayer.
   *
   * @async
   * @function createTransactionWithHandlePayment
   * @param {GelatoCreateTransactionProps} options - Options for Gelato.
   * @param {MetaTransactionData[]} [options.transactions] - The transactions batch.
   * @param {boolean} [options.onlyCalls=false] - If true, MultiSendCallOnly contract should be used. Remember to not use delegate calls in the batch.
   * @param {MetaTransactionOptions} [options.options={}] - Gas Options for the transaction batch.
   * @returns {Promise<SafeTransaction>} Returns a promise that resolves to the created SafeTransaction.
   * @private
   */
  private createTransactionWithHandlePayment
  /**
   * Creates a Safe transaction designed to be executed using the Gelato Relayer and
   * uses a separate ERC20 transfer to pay the fees to the Gelato relayer.
   *
   * @async
   * @function createTransactionWithTransfer
   * @param {GelatoCreateTransactionProps} options - Options for Gelato.
   * @param {MetaTransactionData[]} [options.transactions] - The transactions batch.
   * @param {boolean} [options.onlyCalls=false] - If true, MultiSendCallOnly contract should be used. Remember to not use delegate calls in the batch.
   * @param {MetaTransactionOptions} [options.options={}] - Gas Options for the transaction batch.
   * @returns {Promise<SafeTransaction>} Returns a promise that resolves to the created SafeTransaction.
   * @private
   */
  private createTransactionWithTransfer
  sendSponsorTransaction(
    target: string,
    encodedTransaction: string,
    chainId: bigint
  ): Promise<RelayResponse>
  sendSyncTransaction(
    target: string,
    encodedTransaction: string,
    chainId: bigint,
    options: MetaTransactionOptions
  ): Promise<RelayResponse>
  relayTransaction({
    target,
    encodedTransaction,
    chainId,
    options
  }: RelayTransaction): Promise<RelayResponse>
  /**
   * @deprecated Use executeTransaction instead
   */
  executeRelayTransaction(
    safeTransaction: SafeTransaction,
    options?: MetaTransactionOptions
  ): Promise<RelayResponse>
  /**
   * Sends the Safe transaction to the Gelato Relayer for execution.
   * If the Safe is not deployed, it creates a batch of transactions including the Safe deployment transaction.
   *
   * @param {GelatoExecuteTransactionProps} props - Execution props
   * @param {SafeTransaction} props.executable - The Safe transaction to be executed.
   * @param {MetaTransactionOptions} props.options - Options for the transaction.
   * @returns {Promise<RelayResponse>} Returns a Promise that resolves with a RelayResponse object.
   */
  executeTransaction({
    executable: safeTransaction,
    options
  }: GelatoExecuteTransactionProps): Promise<RelayResponse>
}
