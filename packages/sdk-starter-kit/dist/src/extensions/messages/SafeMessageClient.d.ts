import Safe from '@safe-global/protocol-kit'
import SafeApiKit, { ListOptions, SafeMessageListResponse } from '@safe-global/api-kit'
import {
  ConfirmOffChainMessageProps,
  SafeClientResult,
  SendOffChainMessageProps
} from '../../types'
/**
 * @class
 * This class provides the functionality to create and confirm off-chain messages
 */
export declare class SafeMessageClient {
  #private
  protocolKit: Safe
  apiKit: SafeApiKit
  /**
   * @constructor
   * @param {Safe} protocolKit A Safe instance
   * @param {SafeApiKit} apiKit A SafeApiKit instance
   */
  constructor(protocolKit: Safe, apiKit: SafeApiKit)
  /**
   * Send off-chain messages using the Transaction service
   *
   * @param {SendOffChainMessageProps} props The message properties
   * @param {string | EIP712TypedData} props.message The message to be sent. Can be a raw string or an EIP712TypedData object
   * @returns {Promise<SafeClientResult>} A SafeClientResult. You can get the messageHash to confirmMessage() afterwards from the messages property
   */
  sendMessage({ message }: SendOffChainMessageProps): Promise<SafeClientResult>
  /**
   * Confirms an off-chain message using the Transaction service
   *
   * @param {ConfirmOffChainMessageProps} props The confirmation properties
   * @param {string} props.messageHash The messageHash. Returned from the sendMessage() method inside the SafeClientResult messages property
   * @returns {Promise<SafeClientResult>} A SafeClientResult with the result of the confirmation
   */
  confirmMessage({ messageHash }: ConfirmOffChainMessageProps): Promise<SafeClientResult>
  /**
   * Get the list of pending off-chain messages. This messages can be confirmed using the confirmMessage() method
   *
   * @param {ListOptions} options The pagination options
   * @returns {Promise<SafeMessageListResponse>} A list of pending messages
   */
  getPendingMessages(options?: ListOptions): Promise<SafeMessageListResponse>
}
