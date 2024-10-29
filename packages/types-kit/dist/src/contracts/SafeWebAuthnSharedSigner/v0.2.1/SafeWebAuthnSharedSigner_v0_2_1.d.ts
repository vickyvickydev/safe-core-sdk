import { ExtractAbiFunctionNames } from 'abitype'
import SafeWebAuthnSharedSignerBaseContract from '../SafeWebAuthnSharedSignerBaseContract'
import { ContractFunction } from '../../common/BaseContract'
declare const safeWebAuthnSharedSigner_v0_2_1_AbiTypes: readonly [
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
/**
 * Represents the ABI of the Safe WebAuthn Shared Signer contract version 0.2.1.
 *
 * @type {SafeWebAuthnSharedSignerContract_v0_2_1_Abi}
 */
export type SafeWebAuthnSharedSignerContract_v0_2_1_Abi =
  typeof safeWebAuthnSharedSigner_v0_2_1_AbiTypes
/**
 * Represents the function type derived by the given function name from the SafeWebAuthnSharedSigner contract version 0.2.1 ABI.
 *
 * @template ContractFunctionName - The function name, derived from the ABI.
 * @type {SafeWebAuthnSharedSignerContract_v0_2_1_Function}
 */
export type SafeWebAuthnSharedSignerContract_v0_2_1_Function<
  ContractFunctionName extends ExtractAbiFunctionNames<SafeWebAuthnSharedSignerContract_v0_2_1_Abi>
> = ContractFunction<SafeWebAuthnSharedSignerContract_v0_2_1_Abi, ContractFunctionName>
/**
 * Represents the contract type for a Safe WebAuthn Shared Signer contract version 0.2.1, defining read and write methods.
 * Utilizes the generic SafeWebAuthnSharedSignerBaseContract with the ABI specific to version 0.2.1.
 *
 * @type {SafeWebAuthnSharedSignerContract_v0_2_1_Contract}
 */
export type SafeWebAuthnSharedSignerContract_v0_2_1_Contract =
  SafeWebAuthnSharedSignerBaseContract<SafeWebAuthnSharedSignerContract_v0_2_1_Abi>
export {}
