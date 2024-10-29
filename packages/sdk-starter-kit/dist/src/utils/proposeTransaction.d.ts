import Safe from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import { SafeTransaction } from '@safe-global/types-kit'
/**
 *  Propose a transaction to the Safe
 *
 * @param {SafeTransaction} safeTransaction The Safe transaction to propose
 * @param {Safe} protocolKit The Safe instance
 * @param {SafeApiKit} apiKit The SafeApiKit instance
 * @returns The Safe transaction hash
 */
export declare const proposeTransaction: ({
  safeTransaction,
  protocolKit,
  apiKit
}: {
  safeTransaction: SafeTransaction
  protocolKit: Safe
  apiKit: SafeApiKit
}) => Promise<string>
