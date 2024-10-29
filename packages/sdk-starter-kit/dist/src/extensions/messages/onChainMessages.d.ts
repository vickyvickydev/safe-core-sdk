import { SafeClient } from '../../SafeClient'
import { SafeClientResult, SendOnChainMessageProps } from '../../types'
/**
 * Extend the SafeClient with the ability to use on-chain messages
 * The on-chain messages are regular transactions created using the SignMessageLib so after sendMessage()
 * you can confirm the transaction using the safeTxHash anf the confirm() method for transactions
 *
 * @example
 * const safeClient = await createSafeClient({ ... })
 *
 * const safeMessageClient = await safeClient.extend(
 *   onChainMessages()
 * )
 *
 * const { transactions } = await safeMessageClient.sendOnChainMessage({ message })
 * await safeMessageClient.confirm({ safeTxHash: transactions?.safeTxHash})
 */
export declare function onChainMessages(): (client: SafeClient) => {
  /**
   * Creates and sends a message as a regular transaction using the SignMessageLib contract
   * The message can be a string or an EIP712TypedData object
   * As this method creates a new transaction you can confirm it using the safeTxHash and the confirm() method and
   * retrieve the pending transactions using the getPendingTransactions() method from the general client
   * @param {SendOnChainMessageProps} props The message properties
   * @returns {Promise<SafeClientResult>} A SafeClientResult. You can get the safeTxHash to confirm from the transaction property
   */
  sendOnChainMessage(props: SendOnChainMessageProps): Promise<SafeClientResult>
}
