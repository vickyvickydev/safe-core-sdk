declare const _default: {
  readonly contractName: 'SafeWebAuthnSignerFactory'
  readonly abi: readonly [
    {
      readonly inputs: readonly [
        {
          readonly internalType: 'uint256'
          readonly name: 'x'
          readonly type: 'uint256'
        },
        {
          readonly internalType: 'uint256'
          readonly name: 'y'
          readonly type: 'uint256'
        },
        {
          readonly internalType: 'P256.Verifiers'
          readonly name: 'verifiers'
          readonly type: 'uint192'
        }
      ]
      readonly name: 'createSigner'
      readonly outputs: readonly [
        {
          readonly internalType: 'address'
          readonly name: 'signer'
          readonly type: 'address'
        }
      ]
      readonly stateMutability: 'nonpayable'
      readonly type: 'function'
    },
    {
      readonly inputs: readonly [
        {
          readonly internalType: 'uint256'
          readonly name: 'x'
          readonly type: 'uint256'
        },
        {
          readonly internalType: 'uint256'
          readonly name: 'y'
          readonly type: 'uint256'
        },
        {
          readonly internalType: 'P256.Verifiers'
          readonly name: 'verifiers'
          readonly type: 'uint192'
        }
      ]
      readonly name: 'getSigner'
      readonly outputs: readonly [
        {
          readonly internalType: 'address'
          readonly name: 'signer'
          readonly type: 'address'
        }
      ]
      readonly stateMutability: 'view'
      readonly type: 'function'
    },
    {
      readonly inputs: readonly [
        {
          readonly internalType: 'bytes32'
          readonly name: 'message'
          readonly type: 'bytes32'
        },
        {
          readonly internalType: 'bytes'
          readonly name: 'signature'
          readonly type: 'bytes'
        },
        {
          readonly internalType: 'uint256'
          readonly name: 'x'
          readonly type: 'uint256'
        },
        {
          readonly internalType: 'uint256'
          readonly name: 'y'
          readonly type: 'uint256'
        },
        {
          readonly internalType: 'P256.Verifiers'
          readonly name: 'verifiers'
          readonly type: 'uint192'
        }
      ]
      readonly name: 'isValidSignatureForSigner'
      readonly outputs: readonly [
        {
          readonly internalType: 'bytes4'
          readonly name: 'magicValue'
          readonly type: 'bytes4'
        }
      ]
      readonly stateMutability: 'view'
      readonly type: 'function'
    }
  ]
}
export default _default
