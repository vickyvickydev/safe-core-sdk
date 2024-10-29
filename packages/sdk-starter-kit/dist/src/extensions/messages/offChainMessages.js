'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.offChainMessages = void 0
const SafeMessageClient_1 = require('../../extensions/messages/SafeMessageClient')
/**
 * Extend the SafeClient with the ability to use off-chain messages
 *
 * @example
 * const safeClient = await createSafeClient({ ... })
 *
 * const safeMessagesClient = await safeClient.extend(
 *   offChainMessages()
 * )
 *
 * const { messages } = await safeMessagesClient.sendOffChainMessage({ message })
 * await safeMessagesClient.confirmOffChainMessage({ messageHash: messages?.messageHash})
 */
function offChainMessages() {
  return (client) => {
    const safeMessageClient = new SafeMessageClient_1.SafeMessageClient(
      client.protocolKit,
      client.apiKit
    )
    return {
      /**
       * Creates an off-chain message using the Transaction service
       *
       * @param {SendOffChainMessageProps} props The message properties
       * @returns {Promise<SafeClientResult>} A SafeClientResult. You can get the messageHash to confirmMessage() afterwards from the messages property       */
      async sendOffChainMessage(props) {
        return safeMessageClient.sendMessage(props)
      },
      /**
       * Confirms an off-chain message using the Transaction service
       *
       * @param {ConfirmOffChainMessageProps} props The confirmation properties
       * @returns {Promise<SafeClientResult>} A SafeClientResult with the result of the confirmation
       */
      async confirmOffChainMessage(props) {
        return safeMessageClient.confirmMessage(props)
      },
      /**
       * Get the list of pending off-chain messages. This messages can be confirmed using the confirmMessage() method
       *
       * @param {ListOptions} options The pagination options
       * @returns {Promise<SafeMessageListResponse>} A list of pending messages
       */
      async getPendingOffChainMessages(options) {
        return safeMessageClient.getPendingMessages(options)
      }
    }
  }
}
exports.offChainMessages = offChainMessages
//# sourceMappingURL=offChainMessages.js.map
