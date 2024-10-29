import { ListOptions, SafeMessageListResponse } from '@safe-global/api-kit'
import { SafeClient } from '../../SafeClient'
import {
  ConfirmOffChainMessageProps,
  SafeClientResult,
  SendOffChainMessageProps
} from '../../types'
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
export declare function offChainMessages(): (client: SafeClient) => {
  /**
   * Creates an off-chain message using the Transaction service
   *
   * @param {SendOffChainMessageProps} props The message properties
   * @returns {Promise<SafeClientResult>} A SafeClientResult. You can get the messageHash to confirmMessage() afterwards from the messages property       */
  sendOffChainMessage(props: SendOffChainMessageProps): Promise<SafeClientResult>
  /**
   * Confirms an off-chain message using the Transaction service
   *
   * @param {ConfirmOffChainMessageProps} props The confirmation properties
   * @returns {Promise<SafeClientResult>} A SafeClientResult with the result of the confirmation
   */
  confirmOffChainMessage(props: ConfirmOffChainMessageProps): Promise<SafeClientResult>
  /**
   * Get the list of pending off-chain messages. This messages can be confirmed using the confirmMessage() method
   *
   * @param {ListOptions} options The pagination options
   * @returns {Promise<SafeMessageListResponse>} A list of pending messages
   */
  getPendingOffChainMessages(options?: ListOptions): Promise<SafeMessageListResponse>
}
