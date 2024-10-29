import { SafeOperation } from '@safe-global/types-kit'
export declare const getAddSafeOperationProps: (safeOperation: SafeOperation) => Promise<{
  entryPoint: string
  moduleAddress: string
  safeAddress: string
  userOperation: import('@safe-global/types-kit').UserOperation
  options: {
    validAfter: number
    validUntil: number
  }
}>
