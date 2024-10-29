import { TransactionResult } from '@safe-global/safe-core-sdk-types'
import { ContractTransactionReceipt } from 'ethers'
import { SafeClientTxStatus } from '../constants'
import { SafeClientResult, SafeConfig } from '../types'
export declare const isValidAddress: (address: string) => boolean
export declare const isValidSafeConfig: (config: SafeConfig) => boolean
export declare const waitSafeTxReceipt: (
  txResult: TransactionResult
) => Promise<ContractTransactionReceipt | null | undefined>
export declare const createSafeClientResult: ({
  status,
  safeAddress,
  deploymentTxHash,
  safeTxHash,
  txHash,
  messageHash,
  userOperationHash,
  safeOperationHash
}: {
  status: SafeClientTxStatus
  safeAddress: string
  deploymentTxHash?: string | undefined
  safeTxHash?: string | undefined
  txHash?: string | undefined
  messageHash?: string | undefined
  userOperationHash?: string | undefined
  safeOperationHash?: string | undefined
}) => SafeClientResult
export * from './sendTransaction'
export * from './proposeTransaction'
