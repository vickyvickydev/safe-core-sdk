'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.RPC_4337_CALLS =
  exports.ENTRYPOINT_ADDRESS_V07 =
  exports.ENTRYPOINT_ADDRESS_V06 =
  exports.ENTRYPOINT_ABI =
  exports.ABI =
  exports.EIP712_SAFE_OPERATION_TYPE =
  exports.DEFAULT_SAFE_MODULES_VERSION =
  exports.DEFAULT_SAFE_VERSION =
    void 0
const viem_1 = require('viem')
exports.DEFAULT_SAFE_VERSION = '1.4.1'
exports.DEFAULT_SAFE_MODULES_VERSION = '0.2.0'
exports.EIP712_SAFE_OPERATION_TYPE = {
  SafeOp: [
    { type: 'address', name: 'safe' },
    { type: 'uint256', name: 'nonce' },
    { type: 'bytes', name: 'initCode' },
    { type: 'bytes', name: 'callData' },
    { type: 'uint256', name: 'callGasLimit' },
    { type: 'uint256', name: 'verificationGasLimit' },
    { type: 'uint256', name: 'preVerificationGas' },
    { type: 'uint256', name: 'maxFeePerGas' },
    { type: 'uint256', name: 'maxPriorityFeePerGas' },
    { type: 'bytes', name: 'paymasterAndData' },
    { type: 'uint48', name: 'validAfter' },
    { type: 'uint48', name: 'validUntil' },
    { type: 'address', name: 'entryPoint' }
  ]
}
exports.ABI = (0, viem_1.parseAbi)([
  'function enableModules(address[])',
  'function multiSend(bytes memory transactions) public payable',
  'function executeUserOp(address to, uint256 value, bytes data, uint8 operation)',
  'function approve(address _spender, uint256 _value)',
  'function configure((uint256 x, uint256 y, uint176 verifiers) signer)'
])
exports.ENTRYPOINT_ABI = [
  {
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'key', type: 'uint192' }
    ],
    name: 'getNonce',
    outputs: [{ name: 'nonce', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
]
exports.ENTRYPOINT_ADDRESS_V06 = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789'
exports.ENTRYPOINT_ADDRESS_V07 = '0x0000000071727De22E5E9d8BAf0edAc6f37da032'
var RPC_4337_CALLS
;(function (RPC_4337_CALLS) {
  RPC_4337_CALLS['ESTIMATE_USER_OPERATION_GAS'] = 'eth_estimateUserOperationGas'
  RPC_4337_CALLS['SEND_USER_OPERATION'] = 'eth_sendUserOperation'
  RPC_4337_CALLS['GET_USER_OPERATION_BY_HASH'] = 'eth_getUserOperationByHash'
  RPC_4337_CALLS['GET_USER_OPERATION_RECEIPT'] = 'eth_getUserOperationReceipt'
  RPC_4337_CALLS['SUPPORTED_ENTRY_POINTS'] = 'eth_supportedEntryPoints'
  RPC_4337_CALLS['CHAIN_ID'] = 'eth_chainId'
  RPC_4337_CALLS['SPONSOR_USER_OPERATION'] = 'pm_sponsorUserOperation'
})(RPC_4337_CALLS || (exports.RPC_4337_CALLS = RPC_4337_CALLS = {}))
//# sourceMappingURL=constants.js.map
