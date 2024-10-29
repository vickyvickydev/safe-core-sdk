import { ethers } from 'ethers'
export declare const DEFAULT_SAFE_VERSION = '1.4.1'
export declare const DEFAULT_SAFE_MODULES_VERSION = '0.2.0'
export declare const EIP712_SAFE_OPERATION_TYPE: {
  SafeOp: {
    type: string
    name: string
  }[]
}
export declare const INTERFACES: ethers.Interface
export declare const ENTRYPOINT_ADDRESS_V06 = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789'
export declare const ENTRYPOINT_ADDRESS_V07 = '0x0000000071727De22E5E9d8BAf0edAc6f37da032'
export declare const RPC_4337_CALLS: {
  ESTIMATE_USER_OPERATION_GAS: string
  SEND_USER_OPERATION: string
  GET_USER_OPERATION_BY_HASH: string
  GET_USER_OPERATION_RECEIPT: string
  SUPPORTED_ENTRY_POINTS: string
  CHAIN_ID: string
  SPONSOR_USER_OPERATION: string
}
