import Safe from '@safe-global/protocol-kit'
import { Transaction } from '@safe-global/types-kit'
/**
 * Sends a transaction using the signer (owner)
 * It's useful to deploy Safe accounts
 *
 * @param {Transaction} transaction  The transaction.
 * @param {Safe} protocolKit The protocolKit instance
 * @returns {Promise<string | undefined>} A promise that resolves with the transaction hash
 */
export declare const sendTransaction: ({
  transaction,
  protocolKit
}: {
  transaction: Transaction
  protocolKit: Safe
}) => Promise<string | undefined>
