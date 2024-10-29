import Safe from '@safe-global/protocol-kit'
import SafeApiKit, { ListOptions, GetSafeOperationListResponse } from '@safe-global/api-kit'
import { Safe4337Pack } from '@safe-global/relay-kit'
import { ConfirmSafeOperationProps, SafeClientResult, SendSafeOperationProps } from '../../types'
/**
 * @class
 * This class provides the functionality to use a bundler and a paymaster with your Safe account
 * With the features implemented here we can add EIP-4377 support to the Safe account
 */
export declare class SafeOperationClient {
  #private
  protocolKit: Safe
  apiKit: SafeApiKit
  safe4337Pack: Safe4337Pack
  constructor(safe4337Pack: Safe4337Pack, apiKit: SafeApiKit)
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
  sendSafeOperation({
    transactions,
    ...sendSafeOperationOptions
  }: SendSafeOperationProps): Promise<SafeClientResult>
  /**
   * Confirms the stored safeOperation
   *
   * @param {ConfirmSafeOperationProps} props The confirmation properties
   * @param {string} props.safeOperationHash The hash of the safe operation to confirm.
   * The safeOperationHash can be extracted from the SafeClientResult of the sendSafeOperation method under the safeOperations property
   * You must confirmSafeOperation() with the other owners and once the threshold is reached the SafeOperation will be sent to the bundler
   * @returns {Promise<SafeClientResult>} A promise that resolves to the result of the safeOperation.
   */
  confirmSafeOperation({ safeOperationHash }: ConfirmSafeOperationProps): Promise<SafeClientResult>
  /**
   * Retrieves the pending Safe operations for the current Safe account
   *
   * @async
   * @param {ListOptions} options The pagination options
   * @returns {Promise<GetSafeOperationListResponse>} A promise that resolves to an array of pending Safe operations.
   * @throws {Error} If there is an issue retrieving the safe address or pending Safe operations.
   */
  getPendingSafeOperations(options?: ListOptions): Promise<GetSafeOperationListResponse>
}
