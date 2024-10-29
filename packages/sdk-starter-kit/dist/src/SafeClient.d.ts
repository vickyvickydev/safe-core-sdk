import Safe from '@safe-global/protocol-kit'
import SafeApiKit, { SafeMultisigTransactionListResponse } from '@safe-global/api-kit'
import { ConfirmTransactionProps, SafeClientResult, SendTransactionProps } from './types'
import { BaseClient } from './BaseClient'
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
export declare class SafeClient extends BaseClient {
  #private
  constructor(protocolKit: Safe, apiKit: SafeApiKit)
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
  send({ transactions, ...transactionOptions }: SendTransactionProps): Promise<SafeClientResult>
  /**
   * Confirms a transaction by its safe transaction hash.
   *
   * @param {ConfirmTransactionProps} props The ConfirmTransactionProps object.
   * @param {string} props.safeTxHash  The hash of the safe transaction to confirm.
   * @returns {Promise<SafeClientResult>} A promise that resolves to the result of the confirmed transaction.
   * @throws {Error} If the transaction confirmation fails.
   */
  confirm({ safeTxHash }: ConfirmTransactionProps): Promise<SafeClientResult>
  /**
   * Retrieves the pending transactions for the current safe address.
   *
   * @async
   * @returns {Promise<SafeMultisigTransactionListResponse>} A promise that resolves to an array of pending transactions.
   * @throws {Error} If there is an issue retrieving the safe address or pending transactions.
   */
  getPendingTransactions(): Promise<SafeMultisigTransactionListResponse>
  /**
   * Extend the SafeClient with additional functionality.
   *
   * @param extendFunc
   * @returns
   */
  extend<T>(extendFunc: (client: SafeClient) => Promise<T>): Promise<SafeClient & T>
  extend<T>(extendFunc: (client: SafeClient) => T): SafeClient & T
}
