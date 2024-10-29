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
var _SafeMessageClient_instances,
  _SafeMessageClient_deployAndAddMessage,
  _SafeMessageClient_addMessage,
  _SafeMessageClient_updateProtocolKitWithDeployedSafe
Object.defineProperty(exports, '__esModule', { value: true })
exports.SafeMessageClient = void 0
const protocol_kit_1 = require('@safe-global/protocol-kit')
const utils_1 = require('../../utils')
const constants_1 = require('../../constants')
/**
 * @class
 * This class provides the functionality to create and confirm off-chain messages
 */
class SafeMessageClient {
  /**
   * @constructor
   * @param {Safe} protocolKit A Safe instance
   * @param {SafeApiKit} apiKit A SafeApiKit instance
   */
  constructor(protocolKit, apiKit) {
    _SafeMessageClient_instances.add(this)
    this.protocolKit = protocolKit
    this.apiKit = apiKit
  }
  /**
   * Send off-chain messages using the Transaction service
   *
   * @param {SendOffChainMessageProps} props The message properties
   * @param {string | EIP712TypedData} props.message The message to be sent. Can be a raw string or an EIP712TypedData object
   * @returns {Promise<SafeClientResult>} A SafeClientResult. You can get the messageHash to confirmMessage() afterwards from the messages property
   */
  async sendMessage({ message }) {
    const isSafeDeployed = await this.protocolKit.isSafeDeployed()
    const safeMessage = this.protocolKit.createMessage(message)
    if (isSafeDeployed) {
      return __classPrivateFieldGet(
        this,
        _SafeMessageClient_instances,
        'm',
        _SafeMessageClient_addMessage
      ).call(this, { safeMessage })
    } else {
      return __classPrivateFieldGet(
        this,
        _SafeMessageClient_instances,
        'm',
        _SafeMessageClient_deployAndAddMessage
      ).call(this, { safeMessage })
    }
  }
  /**
   * Confirms an off-chain message using the Transaction service
   *
   * @param {ConfirmOffChainMessageProps} props The confirmation properties
   * @param {string} props.messageHash The messageHash. Returned from the sendMessage() method inside the SafeClientResult messages property
   * @returns {Promise<SafeClientResult>} A SafeClientResult with the result of the confirmation
   */
  async confirmMessage({ messageHash }) {
    let messageResponse = await this.apiKit.getMessage(messageHash)
    const safeAddress = await this.protocolKit.getAddress()
    const threshold = await this.protocolKit.getThreshold()
    let safeMessage = this.protocolKit.createMessage(messageResponse.message)
    safeMessage = await this.protocolKit.signMessage(safeMessage)
    await this.apiKit.addMessageSignature(messageHash, safeMessage.encodedSignatures())
    messageResponse = await this.apiKit.getMessage(messageHash)
    return (0, utils_1.createSafeClientResult)({
      status:
        messageResponse.confirmations.length === threshold
          ? constants_1.SafeClientTxStatus.MESSAGE_CONFIRMED
          : constants_1.SafeClientTxStatus.MESSAGE_PENDING_SIGNATURES,
      safeAddress,
      messageHash
    })
  }
  /**
   * Get the list of pending off-chain messages. This messages can be confirmed using the confirmMessage() method
   *
   * @param {ListOptions} options The pagination options
   * @returns {Promise<SafeMessageListResponse>} A list of pending messages
   */
  async getPendingMessages(options) {
    const safeAddress = await this.protocolKit.getAddress()
    return this.apiKit.getMessages(safeAddress, options)
  }
}
exports.SafeMessageClient = SafeMessageClient
;(_SafeMessageClient_instances = new WeakSet()),
  (_SafeMessageClient_deployAndAddMessage =
    /**
     * Deploys a new Safe account based on the provided config and adds a message using the Transaction service
     * - If the Safe threshold > 1, we need to deploy the Safe account first and afterwards add the message
     *   The message should be confirmed with other owners using the confirmMessage() method until the threshold is reached in order to be valid
     * - If the threshold = 1, we can deploy the Safe account and add the message in one step. The message will be valid immediately
     *
     * @param {SafeTransaction} safeMessage  The safe message
     * @returns {Promise<SafeClientResult>} The SafeClientResult
     */
    async function _SafeMessageClient_deployAndAddMessage({ safeMessage }) {
      let deploymentTxHash
      const threshold = await this.protocolKit.getThreshold()
      const safeDeploymentTransaction =
        await this.protocolKit.createSafeDeploymentTransaction(undefined)
      try {
        deploymentTxHash = await (0, utils_1.sendTransaction)({
          transaction: safeDeploymentTransaction,
          protocolKit: this.protocolKit
        })
        await __classPrivateFieldGet(
          this,
          _SafeMessageClient_instances,
          'm',
          _SafeMessageClient_updateProtocolKitWithDeployedSafe
        ).call(this)
      } catch (error) {
        throw new Error('Could not deploy the Safe account')
      }
      try {
        const { messages } = await __classPrivateFieldGet(
          this,
          _SafeMessageClient_instances,
          'm',
          _SafeMessageClient_addMessage
        ).call(this, { safeMessage })
        const messageResponse = await this.apiKit.getMessage(messages?.messageHash || '0x')
        return (0, utils_1.createSafeClientResult)({
          safeAddress: await this.protocolKit.getAddress(),
          status:
            messageResponse.confirmations.length === threshold
              ? constants_1.SafeClientTxStatus.DEPLOYED_AND_MESSAGE_CONFIRMED
              : constants_1.SafeClientTxStatus.DEPLOYED_AND_MESSAGE_PENDING_SIGNATURES,
          deploymentTxHash,
          messageHash: messages?.messageHash
        })
      } catch (error) {
        throw new Error('Could not add a new off-chain message to the Safe account')
      }
    }),
  (_SafeMessageClient_addMessage =
    /**
     * Add a new off-chain message using the Transaction service
     * - If the threshold > 1, remember to confirmMessage() after sendMessage()
     * - If the threshold = 1, then the message is confirmed and valid immediately
     *
     * @param {SafeMessage} safeMessage The message
     * @returns {Promise<SafeClientResult>} The SafeClientResult
     */
    async function _SafeMessageClient_addMessage({ safeMessage }) {
      const safeAddress = await this.protocolKit.getAddress()
      const threshold = await this.protocolKit.getThreshold()
      const signedMessage = await this.protocolKit.signMessage(safeMessage)
      const messageHash = await this.protocolKit.getSafeMessageHash(
        (0, protocol_kit_1.hashSafeMessage)(safeMessage.data)
      )
      try {
        await this.apiKit.addMessage(safeAddress, {
          message: safeMessage.data,
          signature: signedMessage.encodedSignatures()
        })
      } catch (error) {
        throw new Error('Could not add a new off-chain message to the Safe account')
      }
      const message = await this.apiKit.getMessage(messageHash)
      return (0, utils_1.createSafeClientResult)({
        safeAddress: await this.protocolKit.getAddress(),
        status:
          message.confirmations.length === threshold
            ? constants_1.SafeClientTxStatus.MESSAGE_CONFIRMED
            : constants_1.SafeClientTxStatus.MESSAGE_PENDING_SIGNATURES,
        messageHash
      })
    }),
  (_SafeMessageClient_updateProtocolKitWithDeployedSafe =
    /**
     * This method updates the Safe instance with the deployed Safe account
     */
    async function _SafeMessageClient_updateProtocolKitWithDeployedSafe() {
      this.protocolKit = await this.protocolKit.connect({
        provider: this.protocolKit.getSafeProvider().provider,
        signer: this.protocolKit.getSafeProvider().signer,
        safeAddress: await this.protocolKit.getAddress()
      })
    })
//# sourceMappingURL=SafeMessageClient.js.map
