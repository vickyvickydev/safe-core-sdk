import { ContractTransaction } from '@ethersproject/contracts'
import { PromiEvent, TransactionReceipt } from 'web3-core/types'

export interface SafeTransactionOptionalProps {
  safeTxGas?: number
  baseGas?: number
  gasPrice?: number
  gasToken?: string
  refundReceiver?: string
  nonce?: number
}

export interface TransactionOptions {
  from?: string
  gas?: number | string
  gasLimit?: number | string
  safeTxGas?: number | string
  gasPrice?: number | string
}

export interface BaseTransactionResult {
  hash: string
}

export interface Web3TransactionResult extends BaseTransactionResult {
  promiEvent: PromiEvent<TransactionReceipt>
  options?: TransactionOptions
}

export interface EthersTransactionResult extends BaseTransactionResult {
  transactionResponse: ContractTransaction
  options?: TransactionOptions
}

export interface TransactionResult extends BaseTransactionResult {
  promiEvent?: PromiEvent<TransactionReceipt>
  transactionResponse?: ContractTransaction
  options?: TransactionOptions
}
