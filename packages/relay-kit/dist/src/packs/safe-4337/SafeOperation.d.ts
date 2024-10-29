import {
  EstimateGasData,
  SafeOperation,
  SafeSignature,
  SafeUserOperation,
  UserOperation
} from '@safe-global/types-kit'
type SafeOperationOptions = {
  moduleAddress: string
  entryPoint: string
  chainId: bigint
  validAfter?: number
  validUntil?: number
}
declare class EthSafeOperation implements SafeOperation {
  data: SafeUserOperation
  signatures: Map<string, SafeSignature>
  moduleAddress: string
  chainId: bigint
  constructor(
    userOperation: UserOperation,
    { chainId, entryPoint, validAfter, validUntil, moduleAddress }: SafeOperationOptions
  )
  getSignature(signer: string): SafeSignature | undefined
  addSignature(signature: SafeSignature): void
  encodedSignatures(): string
  addEstimations(estimations: EstimateGasData): void
  toUserOperation(): UserOperation
  getHash(): string
}
export default EthSafeOperation
