export declare const OWNER_1 = '0xFfAC5578BE8AC1B2B9D13b34cAf4A074B96B8A1b'
export declare const OWNER_2 = '0x3059EfD1BCe33be41eeEfd5fb6D520d7fEd54E43'
export declare const PREDICTED_SAFE_ADDRESS = '0x65e0d294F2d17CB9fB0f65111E9Ac8a00C4049dA'
export declare const SAFE_ADDRESS_v1_4_1 = '0x717f4BB83D8DF2e5a3Cc603Ee27263ac9EFB6c12'
export declare const SAFE_ADDRESS_v1_3_0 = '0x8C35a08Af278518B59D04ddDe3F1b370aD766D22'
export declare const SAFE_ADDRESS_4337_MODULE_NOT_ENABLED =
  '0xfC82a1e4A045a44527e8b45FC70332C8F66fc32B'
export declare const SAFE_ADDRESS_4337_FALLBACKHANDLER_NOT_ENABLED =
  '0xA6FDc4e18404E1715D1bC51B07266c91393C6622'
export declare const SAFE_ADDRESS_4337_PASSKEY = '0x02DCbFD25178b6b8eFb45603D30b5123179117DD'
export declare const SAFE_MODULES_V0_3_0 = '0.3.0'
export declare const PAYMASTER_ADDRESS = '0x0000000000325602a77416A16136FDafd04b299f'
export declare const PAYMASTER_TOKEN_ADDRESS = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'
export declare const CHAIN_ID = '0xaa36a7'
export declare const MODULE_ADDRESS = '0xa581c4A4DB7175302464fF3C06380BC3270b4037'
export declare const RPC_URL = 'https://sepolia.gateway.tenderly.co'
export declare const BUNDLER_URL = 'https://bundler.url'
export declare const PAYMASTER_URL = 'https://paymaster.url'
export declare const USER_OPERATION_HASH =
  '0x3cb881d1969036174f38d636d22108d1d032145518b53104fc0b1e1296d2cc9c'
export declare const ENTRYPOINTS: string[]
export declare const USER_OPERATION_RECEIPT: {
  userOpHash: string
  sender: string
  nonce: string
  actualGasUsed: string
  actualGasCost: string
  success: boolean
  logs: never[]
  receipt: {
    transactionHash: string
    transactionIndex: string
    blockHash: string
    blockNumber: string
    from: string
    to: string
    cumulativeGasUsed: string
    gasUsed: string
    contractAddress: null
    logs: never[]
    logsBloom: string
    status: string
    effectiveGasPrice: string
  }
}
export declare const USER_OPERATION: {
  sender: string
  nonce: string
  initCode: string
  callData: string
  callGasLimit: bigint
  verificationGasLimit: bigint
  preVerificationGas: bigint
  maxFeePerGas: bigint
  maxPriorityFeePerGas: bigint
  paymasterAndData: string
  signature: string
}
export declare const USER_OPERATION_HEX_VALUES: {
  sender: string
  nonce: string
  initCode: string
  callData: string
  callGasLimit: string
  verificationGasLimit: string
  preVerificationGas: string
  maxFeePerGas: string
  maxPriorityFeePerGas: string
  paymasterAndData: string
  signature: string
}
export declare const USER_OPERATION_BY_HASH: {
  userOperation: {
    sender: string
    nonce: string
    initCode: string
    callData: string
    callGasLimit: string
    verificationGasLimit: string
    preVerificationGas: string
    maxFeePerGas: string
    maxPriorityFeePerGas: string
    paymasterAndData: string
    signature: string
  }
  entryPoint: string
  transactionHash: string
  blockHash: string
  blockNumber: string
}
export declare const GAS_ESTIMATION: {
  verificationGasLimit: string
  preVerificationGas: string
  callGasLimit: string
}
export declare const SAFE_OPERATION_RESPONSE: {
  created: string
  modified: string
  safeOperationHash: string
  validAfter: null
  validUntil: null
  moduleAddress: string
  confirmations: {
    created: string
    modified: string
    owner: string
    signature: string
    signatureType: string
  }[]
  preparedSignature: string
  userOperation: {
    ethereumTxHash: null
    sender: string
    userOperationHash: string
    nonce: number
    initCode: string
    callData: string
    callGasLimit: number
    verificationGasLimit: number
    preVerificationGas: number
    maxFeePerGas: number
    maxPriorityFeePerGas: number
    paymaster: null
    paymasterData: null
    signature: string
    entryPoint: string
  }
}
export declare const SPONSORED_GAS_ESTIMATION: {
  verificationGasLimit: string
  preVerificationGas: string
  callGasLimit: string
  paymasterAndData: string
}
export declare const USER_OPERATION_GAS_PRICE: {
  fast: {
    maxFeePerGas: string
    maxPriorityFeePerGas: string
  }
}
