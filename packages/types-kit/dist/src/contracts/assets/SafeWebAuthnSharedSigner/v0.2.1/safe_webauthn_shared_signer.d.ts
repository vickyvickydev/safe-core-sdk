declare const _default: {
  readonly contractName: 'SafeWebAuthnSharedSigner'
  readonly abi: readonly [
    {
      readonly inputs: readonly []
      readonly stateMutability: 'nonpayable'
      readonly type: 'constructor'
    },
    {
      readonly inputs: readonly []
      readonly name: 'NotDelegateCalled'
      readonly type: 'error'
    },
    {
      readonly inputs: readonly []
      readonly name: 'SIGNER_SLOT'
      readonly outputs: readonly [
        {
          readonly internalType: 'uint256'
          readonly name: ''
          readonly type: 'uint256'
        }
      ]
      readonly stateMutability: 'view'
      readonly type: 'function'
    },
    {
      readonly inputs: readonly [
        {
          readonly components: readonly [
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
              readonly type: 'uint176'
            }
          ]
          readonly internalType: 'struct SafeWebAuthnSharedSigner.Signer'
          readonly name: 'signer'
          readonly type: 'tuple'
        }
      ]
      readonly name: 'configure'
      readonly outputs: readonly []
      readonly stateMutability: 'nonpayable'
      readonly type: 'function'
    },
    {
      readonly inputs: readonly [
        {
          readonly internalType: 'address'
          readonly name: 'account'
          readonly type: 'address'
        }
      ]
      readonly name: 'getConfiguration'
      readonly outputs: readonly [
        {
          readonly components: readonly [
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
              readonly type: 'uint176'
            }
          ]
          readonly internalType: 'struct SafeWebAuthnSharedSigner.Signer'
          readonly name: 'signer'
          readonly type: 'tuple'
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
        }
      ]
      readonly name: 'isValidSignature'
      readonly outputs: readonly [
        {
          readonly internalType: 'bytes4'
          readonly name: 'magicValue'
          readonly type: 'bytes4'
        }
      ]
      readonly stateMutability: 'view'
      readonly type: 'function'
    },
    {
      readonly inputs: readonly [
        {
          readonly internalType: 'bytes'
          readonly name: 'data'
          readonly type: 'bytes'
        },
        {
          readonly internalType: 'bytes'
          readonly name: 'signature'
          readonly type: 'bytes'
        }
      ]
      readonly name: 'isValidSignature'
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
