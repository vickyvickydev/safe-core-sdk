'use strict'
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter')
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError(
        'Cannot read private member from an object whose class did not declare it'
      )
    return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver)
  }
var _SafeClient_instances,
  _SafeClient_deployAndExecuteTransaction,
  _SafeClient_deployAndProposeTransaction,
  _SafeClient_executeTransaction,
  _SafeClient_proposeTransaction,
  _SafeClient_reconnectSafe
Object.defineProperty(exports, '__esModule', { value: true })
exports.SafeClient = void 0
const utils_1 = require('./utils')
const constants_1 = require('./constants')
const BaseClient_1 = require('./BaseClient')
/**
 * @class
 * This class provides the core functionality to create, sign and execute transactions.
 * It also provides the ability to be extended with features through the extend function.
 *
 * @example
 * const safeClient = await createSafeClient({ ... })
 *
 * const { transactions } = await safeClient.send(...)
 * await safeClient.confirm(transactions?.safeTxHash)
 */
class SafeClient extends BaseClient_1.BaseClient {
  constructor(protocolKit, apiKit) {
    super(protocolKit, apiKit)
    _SafeClient_instances.add(this)
  }
  /**
   * Sends transactions through the Safe protocol.
   * You can send an array to transactions { to, value, data} that we will convert to a transaction batch
   *
   * @param {SendTransactionProps} props The SendTransactionProps object.
   * @param {TransactionBase[]} props.transactions An array of transactions to be sent.
   * @param {string} props.transactions[].to The recipient address of the transaction.
   * @param {string} props.transactions[].value The value of the transaction.
   * @param {string} props.transactions[].data The data of the transaction.
   * @param {string} props.from The sender address of the transaction.
   * @param {number | string} props.gasLimit The gas limit of the transaction.
   * @param {number | string} props.gasPrice The gas price of the transaction.
   * @param {number | string} props.maxFeePerGas The max fee per gas of the transaction.
   * @param {number | string} props.maxPriorityFeePerGas The max priority fee per gas of the transaction.
   * @param {number} props.nonce The nonce of the transaction.
   * @returns {Promise<SafeClientResult>} A promise that resolves to the result of the transaction.
   */
  async send({ transactions, ...transactionOptions }) {
    const isSafeDeployed = await this.protocolKit.isSafeDeployed()
    const isMultisigSafe = (await this.protocolKit.getThreshold()) > 1
    const safeTransaction = await this.protocolKit.createTransaction({ transactions })
    if (isSafeDeployed) {
      if (isMultisigSafe) {
        // If the threshold is greater than 1, we need to propose the transaction first
        return __classPrivateFieldGet(
          this,
          _SafeClient_instances,
          'm',
          _SafeClient_proposeTransaction
        ).call(this, { safeTransaction })
      } else {
        // If the threshold is 1, we can execute the transaction
        return __classPrivateFieldGet(
          this,
          _SafeClient_instances,
          'm',
          _SafeClient_executeTransaction
        ).call(this, { safeTransaction, ...transactionOptions })
      }
    } else {
      if (isMultisigSafe) {
        // If the threshold is greater than 1, we need to deploy the Safe account first and
        // afterwards propose the transaction
        // The transaction should be confirmed with other owners until the threshold is reached
        return __classPrivateFieldGet(
          this,
          _SafeClient_instances,
          'm',
          _SafeClient_deployAndProposeTransaction
        ).call(this, { safeTransaction, ...transactionOptions })
      } else {
        // If the threshold is 1, we can deploy the Safe account and execute the transaction in one step
        return __classPrivateFieldGet(
          this,
          _SafeClient_instances,
          'm',
          _SafeClient_deployAndExecuteTransaction
        ).call(this, { safeTransaction, ...transactionOptions })
      }
    }
  }
  /**
   * Confirms a transaction by its safe transaction hash.
   *
   * @param {ConfirmTransactionProps} props The ConfirmTransactionProps object.
   * @param {string} props.safeTxHash  The hash of the safe transaction to confirm.
   * @returns {Promise<SafeClientResult>} A promise that resolves to the result of the confirmed transaction.
   * @throws {Error} If the transaction confirmation fails.
   */
  async confirm({ safeTxHash }) {
    let transactionResponse = await this.apiKit.getTransaction(safeTxHash)
    const safeAddress = await this.protocolKit.getAddress()
    const signedTransaction = await this.protocolKit.signTransaction(transactionResponse)
    await this.apiKit.confirmTransaction(safeTxHash, signedTransaction.encodedSignatures())
    transactionResponse = await this.apiKit.getTransaction(safeTxHash)
    if (
      transactionResponse.confirmations &&
      transactionResponse.confirmationsRequired === transactionResponse.confirmations.length
    ) {
      const executedTransactionResponse =
        await this.protocolKit.executeTransaction(transactionResponse)
      await (0, utils_1.waitSafeTxReceipt)(executedTransactionResponse)
      return (0, utils_1.createSafeClientResult)({
        status: constants_1.SafeClientTxStatus.EXECUTED,
        safeAddress,
        txHash: executedTransactionResponse.hash,
        safeTxHash
      })
    }
    return (0, utils_1.createSafeClientResult)({
      status: constants_1.SafeClientTxStatus.PENDING_SIGNATURES,
      safeAddress,
      safeTxHash
    })
  }
  /**
   * Retrieves the pending transactions for the current safe address.
   *
   * @async
   * @returns {Promise<SafeMultisigTransactionListResponse>} A promise that resolves to an array of pending transactions.
   * @throws {Error} If there is an issue retrieving the safe address or pending transactions.
   */
  async getPendingTransactions() {
    const safeAddress = await this.protocolKit.getAddress()
    return this.apiKit.getPendingTransactions(safeAddress)
  }
  extend(extendFunc) {
    const result = extendFunc(this)
    if (result instanceof Promise) {
      return result.then((extensions) => Object.assign(this, extensions))
    } else {
      return Object.assign(this, result)
    }
  }
}
exports.SafeClient = SafeClient
;(_SafeClient_instances = new WeakSet()),
  (_SafeClient_deployAndExecuteTransaction =
    /**
     * Deploys and executes a transaction in one step.
     *
     * @param {SafeTransaction} safeTransaction  The safe transaction to be executed
     * @param {TransactionOptions} options  Optional transaction options
     * @returns  A promise that resolves to the result of the transaction
     */
    async function _SafeClient_deployAndExecuteTransaction({
      safeTransaction,
      ...transactionOptions
    }) {
      safeTransaction = await this.protocolKit.signTransaction(safeTransaction)
      const transactionBatchWithDeployment =
        await this.protocolKit.wrapSafeTransactionIntoDeploymentBatch(
          safeTransaction,
          transactionOptions
        )
      const hash = await (0, utils_1.sendTransaction)({
        transaction: transactionBatchWithDeployment,
        protocolKit: this.protocolKit
      })
      await __classPrivateFieldGet(
        this,
        _SafeClient_instances,
        'm',
        _SafeClient_reconnectSafe
      ).call(this)
      return (0, utils_1.createSafeClientResult)({
        safeAddress: await this.protocolKit.getAddress(),
        status: constants_1.SafeClientTxStatus.DEPLOYED_AND_EXECUTED,
        deploymentTxHash: hash,
        txHash: hash
      })
    }),
  (_SafeClient_deployAndProposeTransaction =
    /**
     * Deploys and proposes a transaction in one step.
     *
     * @param {SafeTransaction} safeTransaction The safe transaction to be proposed
     * @param {TransactionOptions} transactionOptions  Optional transaction options
     * @returns  A promise that resolves to the result of the transaction
     */
    async function _SafeClient_deployAndProposeTransaction({
      safeTransaction,
      ...transactionOptions
    }) {
      const safeDeploymentTransaction = await this.protocolKit.createSafeDeploymentTransaction(
        undefined,
        transactionOptions
      )
      const hash = await (0, utils_1.sendTransaction)({
        transaction: { ...safeDeploymentTransaction },
        protocolKit: this.protocolKit
      })
      await __classPrivateFieldGet(
        this,
        _SafeClient_instances,
        'm',
        _SafeClient_reconnectSafe
      ).call(this)
      safeTransaction = await this.protocolKit.signTransaction(safeTransaction)
      const safeTxHash = await (0, utils_1.proposeTransaction)({
        safeTransaction,
        protocolKit: this.protocolKit,
        apiKit: this.apiKit
      })
      return (0, utils_1.createSafeClientResult)({
        safeAddress: await this.protocolKit.getAddress(),
        status: constants_1.SafeClientTxStatus.DEPLOYED_AND_PENDING_SIGNATURES,
        deploymentTxHash: hash,
        safeTxHash
      })
    }),
  (_SafeClient_executeTransaction =
    /**
     * Executes a transaction.
     *
     * @param {SafeTransaction} safeTransaction The safe transaction to be executed
     * @param {TransactionOptions} transactionOptions Optional transaction options
     * @returns A promise that resolves to the result of the transaction
     */
    async function _SafeClient_executeTransaction({ safeTransaction, ...transactionOptions }) {
      safeTransaction = await this.protocolKit.signTransaction(safeTransaction)
      const { hash } = await this.protocolKit.executeTransaction(
        safeTransaction,
        transactionOptions
      )
      return (0, utils_1.createSafeClientResult)({
        safeAddress: await this.protocolKit.getAddress(),
        status: constants_1.SafeClientTxStatus.EXECUTED,
        txHash: hash
      })
    }),
  (_SafeClient_proposeTransaction =
    /**
     *  Proposes a transaction to the Safe.
     * @param { SafeTransaction } safeTransaction The safe transaction to propose
     * @returns The SafeClientResult
     */
    async function _SafeClient_proposeTransaction({ safeTransaction }) {
      const safeTxHash = await (0, utils_1.proposeTransaction)({
        safeTransaction,
        protocolKit: this.protocolKit,
        apiKit: this.apiKit
      })
      return (0, utils_1.createSafeClientResult)({
        safeAddress: await this.protocolKit.getAddress(),
        status: constants_1.SafeClientTxStatus.PENDING_SIGNATURES,
        safeTxHash
      })
    }),
  (_SafeClient_reconnectSafe = async function _SafeClient_reconnectSafe() {
    this.protocolKit = await this.protocolKit.connect({
      provider: this.protocolKit.getSafeProvider().provider,
      signer: this.protocolKit.getSafeProvider().signer,
      safeAddress: await this.protocolKit.getAddress()
    })
  })
//# sourceMappingURL=SafeClient.js.map
