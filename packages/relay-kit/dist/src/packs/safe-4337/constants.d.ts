export declare const DEFAULT_SAFE_VERSION = '1.4.1'
export declare const DEFAULT_SAFE_MODULES_VERSION = '0.2.0'
export declare const EIP712_SAFE_OPERATION_TYPE: {
  SafeOp: {
    type: string
    name: string
  }[]
}
export declare const ABI: readonly [
  {
    readonly name: 'enableModules'
    readonly type: 'function'
    readonly stateMutability: 'nonpayable'
    readonly inputs: readonly [
      {
        readonly type: 'address[]'
      }
    ]
    readonly outputs: readonly []
  },
  {
    readonly name: 'multiSend'
    readonly type: 'function'
    readonly stateMutability: 'payable'
    readonly inputs: readonly [
      {
        readonly type: 'bytes'
        readonly name: 'transactions'
      }
    ]
    readonly outputs: readonly []
  },
  {
    readonly name: 'executeUserOp'
    readonly type: 'function'
    readonly stateMutability: 'nonpayable'
    readonly inputs: readonly [
      {
        readonly type: 'address'
        readonly name: 'to'
      },
      {
        readonly type: 'uint256'
        readonly name: 'value'
      },
      {
        readonly type: 'bytes'
        readonly name: 'data'
      },
      {
        readonly type: 'uint8'
        readonly name: 'operation'
      }
    ]
    readonly outputs: readonly []
  },
  {
    readonly name: 'approve'
    readonly type: 'function'
    readonly stateMutability: 'nonpayable'
    readonly inputs: readonly [
      {
        readonly type: 'address'
        readonly name: '_spender'
      },
      {
        readonly type: 'uint256'
        readonly name: '_value'
      }
    ]
    readonly outputs: readonly []
  },
  {
    readonly name: 'configure'
    readonly type: 'function'
    readonly stateMutability: 'nonpayable'
    readonly inputs: readonly [
      {
        readonly type: 'tuple'
        readonly components: readonly [
          {
            readonly type: 'uint256'
            readonly name: 'x'
          },
          {
            readonly type: 'uint256'
            readonly name: 'y'
          },
          {
            readonly type: 'uint176'
            readonly name: 'verifiers'
          }
        ]
        readonly name: 'signer'
      }
    ]
    readonly outputs: readonly []
  }
]
export declare const ENTRYPOINT_ABI: readonly [
  {
    readonly inputs: readonly [
      {
        readonly name: 'sender'
        readonly type: 'address'
      },
      {
        readonly name: 'key'
        readonly type: 'uint192'
      }
    ]
    readonly name: 'getNonce'
    readonly outputs: readonly [
      {
        readonly name: 'nonce'
        readonly type: 'uint256'
      }
    ]
    readonly stateMutability: 'view'
    readonly type: 'function'
  }
]
export declare const ENTRYPOINT_ADDRESS_V06 = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789'
export declare const ENTRYPOINT_ADDRESS_V07 = '0x0000000071727De22E5E9d8BAf0edAc6f37da032'
export declare enum RPC_4337_CALLS {
  ESTIMATE_USER_OPERATION_GAS = 'eth_estimateUserOperationGas',
  SEND_USER_OPERATION = 'eth_sendUserOperation',
  GET_USER_OPERATION_BY_HASH = 'eth_getUserOperationByHash',
  GET_USER_OPERATION_RECEIPT = 'eth_getUserOperationReceipt',
  SUPPORTED_ENTRY_POINTS = 'eth_supportedEntryPoints',
  CHAIN_ID = 'eth_chainId',
  SPONSOR_USER_OPERATION = 'pm_sponsorUserOperation'
}
