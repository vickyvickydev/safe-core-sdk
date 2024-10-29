import { GetSafeOperationListResponse, ListOptions } from '@safe-global/api-kit'
import { PaymasterOptions } from '@safe-global/relay-kit'
import { SafeClient } from '../../SafeClient'
import { BundlerOptions } from '../../extensions/safe-operations/types'
import { ConfirmSafeOperationProps, SafeClientResult, SendSafeOperationProps } from '../../types'
/**
 * Extend the SafeClient with the ability to use a bundler and a paymaster
 *
 * @example
 * const safeClient = await createSafeClient({ ... })
 *
 * const safeOperationClient = await safeClient.extend(
 *   safeOperations({ ... }, { ... })
 * )
 *
 * const { safeOperations } = await safeOperationClient.sendSafeOperation({ transactions })
 * await safeOperationClient.confirmSafeOperation({ safeOperationHash: safeOperations?.safeOperationHash})
 */
export declare function safeOperations(
  { bundlerUrl }: BundlerOptions,
  paymasterOptions?: PaymasterOptions
): (client: SafeClient) => Promise<{
  /**
   * Send SafeOperations from a group of transactions.
   * This method will convert your transactions in a batch and:
   * - If the threshold > 1 it will save for later the SafeOperation using the Transaction service
   *   You must confirmSafeOperation() with other owners
   * - If the threshold = 1 the SafeOperation can be submitted to the bundler so it will execute it immediately
   *
   * @param {Safe4337CreateTransactionProps} props The Safe4337CreateTransactionProps object
   * @returns {Promise<SafeClientResult>} A promise that resolves with the status of the SafeOperation
   */
  sendSafeOperation(props: SendSafeOperationProps): Promise<SafeClientResult>
  /**
   * Confirms the stored safeOperation
   *
   * @param {ConfirmSafeOperationProps} props The ConfirmSafeOperationProps object
   * @returns {Promise<SafeClientResult>} A promise that resolves to the result of the safeOperation.
   */
  confirmSafeOperation(props: ConfirmSafeOperationProps): Promise<SafeClientResult>
  /**
   * Retrieves the pending Safe operations for the current Safe account
   *
   * @async
   * @param {ListOptions} options The pagination options
   * @returns {Promise<GetSafeOperationListResponse>} A promise that resolves to an array of pending Safe operations.
   * @throws {Error} If there is an issue retrieving the safe address or pending Safe operations.
   */
  getPendingSafeOperations(options?: ListOptions): Promise<GetSafeOperationListResponse>
}>
