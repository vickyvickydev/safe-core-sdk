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
var _SafeOperationClient_instances, _SafeOperationClient_waitForOperationToFinish
Object.defineProperty(exports, '__esModule', { value: true })
exports.SafeOperationClient = void 0
const protocol_kit_1 = require('@safe-global/protocol-kit')
const utils_1 = require('../../utils')
const constants_1 = require('../../constants')
/**
 * @class
 * This class provides the functionality to use a bundler and a paymaster with your Safe account
 * With the features implemented here we can add EIP-4377 support to the Safe account
 */
class SafeOperationClient {
  constructor(safe4337Pack, apiKit) {
    _SafeOperationClient_instances.add(this)
    this.protocolKit = safe4337Pack.protocolKit
    this.apiKit = apiKit
    this.safe4337Pack = safe4337Pack
  }
  /**
   * Send SafeOperations from a group of transactions.
   * This method will convert your transactions in a batch and:
   * - If the threshold > 1 it will save for later the SafeOperation using the Transaction service
   *   You must confirmSafeOperation() with other owners
   * - If the threshold = 1 the SafeOperation can be submitted to the bundler so it will execute it immediately
   *
   * @param {Safe4337CreateTransactionProps} props The Safe4337CreateTransactionProps object
   * @param {SafeTransaction[]} props.transactions An array of transactions to be batched
   * @param {TransactionOptions} [props.amountToApprove] The amount to approve for the SafeOperation
   * @param {TransactionOptions} [props.validUntil] The validUntil timestamp for the SafeOperation
   * @param {TransactionOptions} [props.validAfter] The validAfter timestamp for the SafeOperation
   * @param {TransactionOptions} [props.feeEstimator] The feeEstimator to calculate the fees
   * @returns {Promise<SafeClientResult>} A promise that resolves with the status of the SafeOperation
   */
  async sendSafeOperation({ transactions, ...sendSafeOperationOptions }) {
    const safeAddress = await this.protocolKit.getAddress()
    const isMultisigSafe = (await this.protocolKit.getThreshold()) > 1
    let safeOperation = await this.safe4337Pack.createTransaction({
      transactions,
      options: sendSafeOperationOptions
    })
    safeOperation = await this.safe4337Pack.signSafeOperation(safeOperation)
    if (isMultisigSafe) {
      await this.apiKit.addSafeOperation(safeOperation)
      const safeOperationHash = safeOperation.getHash()
      return (0, utils_1.createSafeClientResult)({
        safeAddress,
        status: constants_1.SafeClientTxStatus.SAFE_OPERATION_PENDING_SIGNATURES,
        safeOperationHash
      })
    }
    const userOperationHash = await this.safe4337Pack.executeTransaction({
      executable: safeOperation
    })
    await __classPrivateFieldGet(
      this,
      _SafeOperationClient_instances,
      'm',
      _SafeOperationClient_waitForOperationToFinish
    ).call(this, { userOperationHash })
    return (0, utils_1.createSafeClientResult)({
      safeAddress,
      status: constants_1.SafeClientTxStatus.SAFE_OPERATION_EXECUTED,
      userOperationHash,
      safeOperationHash: safeOperation.getHash()
    })
  }
  /**
   * Confirms the stored safeOperation
   *
   * @param {ConfirmSafeOperationProps} props The confirmation properties
   * @param {string} props.safeOperationHash The hash of the safe operation to confirm.
   * The safeOperationHash can be extracted from the SafeClientResult of the sendSafeOperation method under the safeOperations property
   * You must confirmSafeOperation() with the other owners and once the threshold is reached the SafeOperation will be sent to the bundler
   * @returns {Promise<SafeClientResult>} A promise that resolves to the result of the safeOperation.
   */
  async confirmSafeOperation({ safeOperationHash }) {
    const safeAddress = await this.protocolKit.getAddress()
    const threshold = await this.protocolKit.getThreshold()
    await this.apiKit.confirmSafeOperation(
      safeOperationHash,
      (0, protocol_kit_1.buildSignatureBytes)([await this.protocolKit.signHash(safeOperationHash)])
    )
    const confirmedSafeOperation = await this.apiKit.getSafeOperation(safeOperationHash)
    if (confirmedSafeOperation?.confirmations?.length === threshold) {
      const userOperationHash = await this.safe4337Pack.executeTransaction({
        executable: confirmedSafeOperation
      })
      await __classPrivateFieldGet(
        this,
        _SafeOperationClient_instances,
        'm',
        _SafeOperationClient_waitForOperationToFinish
      ).call(this, { userOperationHash })
      return (0, utils_1.createSafeClientResult)({
        status: constants_1.SafeClientTxStatus.SAFE_OPERATION_EXECUTED,
        safeAddress,
        userOperationHash,
        safeOperationHash
      })
    }
    return (0, utils_1.createSafeClientResult)({
      status: constants_1.SafeClientTxStatus.SAFE_OPERATION_PENDING_SIGNATURES,
      safeAddress,
      safeOperationHash
    })
  }
  /**
   * Retrieves the pending Safe operations for the current Safe account
   *
   * @async
   * @param {ListOptions} options The pagination options
   * @returns {Promise<GetSafeOperationListResponse>} A promise that resolves to an array of pending Safe operations.
   * @throws {Error} If there is an issue retrieving the safe address or pending Safe operations.
   */
  async getPendingSafeOperations(options) {
    const safeAddress = await this.protocolKit.getAddress()
    return this.apiKit.getSafeOperationsByAddress({ safeAddress, ...options })
  }
}
exports.SafeOperationClient = SafeOperationClient
;(_SafeOperationClient_instances = new WeakSet()),
  (_SafeOperationClient_waitForOperationToFinish =
    /**
     * Helper method to wait for the operation to finish
     * @param userOperationHash The userOperationHash to wait for. This comes from the bundler and can be obtained from the
     * SafeClientResult method under the safeOperations property
     */
    async function _SafeOperationClient_waitForOperationToFinish({ userOperationHash }) {
      let userOperationReceipt = null
      while (!userOperationReceipt) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        userOperationReceipt = await this.safe4337Pack.getUserOperationReceipt(userOperationHash)
      }
    })
//# sourceMappingURL=SafeOperationClient.js.map
