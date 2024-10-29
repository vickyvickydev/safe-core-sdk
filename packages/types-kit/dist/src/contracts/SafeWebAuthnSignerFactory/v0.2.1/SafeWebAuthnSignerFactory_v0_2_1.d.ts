import { ExtractAbiFunctionNames } from 'abitype'
import SafeWebAuthnSignerFactoryBaseContract from '../SafeWebAuthnSignerFactoryBaseContract'
import { ContractFunction } from '../../common/BaseContract'
declare const safeWebAuthnSignerFactory_v0_2_1_AbiTypes: readonly [
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
/**
 * Represents the ABI of the Safe WebAuthn Signer Factory contract version 0.2.1.
 *
 * @type {SafeWebAuthnSignerFactoryContract_v0_2_1_Abi}
 */
export type SafeWebAuthnSignerFactoryContract_v0_2_1_Abi =
  typeof safeWebAuthnSignerFactory_v0_2_1_AbiTypes
/**
 * Represents the function type derived by the given function name from the SafeWebAuthnSignerFactory contract version 0.2.1 ABI.
 *
 * @template ContractFunctionName - The function name, derived from the ABI.
 * @type {SafeWebAuthnSignerFactoryContract_v0_2_1_Function}
 */
export type SafeWebAuthnSignerFactoryContract_v0_2_1_Function<
  ContractFunctionName extends ExtractAbiFunctionNames<SafeWebAuthnSignerFactoryContract_v0_2_1_Abi>
> = ContractFunction<SafeWebAuthnSignerFactoryContract_v0_2_1_Abi, ContractFunctionName>
/**
 * Represents the contract type for a Safe WebAuthn Signer Factory contract version 0.2.1, defining read and write methods.
 * Utilizes the generic SafeWebAuthnSignerFactoryBaseContract with the ABI specific to version 0.2.1.
 *
 * @type {SafeWebAuthnSignerFactoryContract_v0_2_1_Contract}
 */
export type SafeWebAuthnSignerFactoryContract_v0_2_1_Contract =
  SafeWebAuthnSignerFactoryBaseContract<SafeWebAuthnSignerFactoryContract_v0_2_1_Abi>
export {}
