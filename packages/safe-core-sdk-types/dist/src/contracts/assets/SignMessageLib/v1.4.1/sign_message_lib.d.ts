declare const _default: {
  readonly contractName: 'SignMessageLib'
  readonly version: '1.4.1'
  readonly abi: readonly [
    {
      readonly anonymous: false
      readonly inputs: readonly [
        {
          readonly indexed: true
          readonly internalType: 'bytes32'
          readonly name: 'msgHash'
          readonly type: 'bytes32'
        }
      ]
      readonly name: 'SignMsg'
      readonly type: 'event'
    },
    {
      readonly inputs: readonly [
        {
          readonly internalType: 'bytes'
          readonly name: 'message'
          readonly type: 'bytes'
        }
      ]
      readonly name: 'getMessageHash'
      readonly outputs: readonly [
        {
          readonly internalType: 'bytes32'
          readonly name: ''
          readonly type: 'bytes32'
        }
      ]
      readonly stateMutability: 'view'
      readonly type: 'function'
    },
    {
      readonly inputs: readonly [
        {
          readonly internalType: 'bytes'
          readonly name: '_data'
          readonly type: 'bytes'
        }
      ]
      readonly name: 'signMessage'
      readonly outputs: readonly []
      readonly stateMutability: 'nonpayable'
      readonly type: 'function'
    }
  ]
}
export default _default
