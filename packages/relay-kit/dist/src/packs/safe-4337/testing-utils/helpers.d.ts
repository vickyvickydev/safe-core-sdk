import { Safe4337InitOptions } from '../types'
import { Safe4337Pack } from '../Safe4337Pack'
export declare const generateTransferCallData: (to: string, value: bigint) => `0x${string}`
export declare const createSafe4337Pack: (
  initOptions: Partial<Safe4337InitOptions>
) => Promise<Safe4337Pack>
