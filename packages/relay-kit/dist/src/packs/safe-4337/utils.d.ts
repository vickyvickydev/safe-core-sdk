import {
  SafeUserOperation,
  MetaTransactionData,
  SafeSignature,
  UserOperation
} from '@safe-global/types-kit'
import { SafeProvider } from '@safe-global/protocol-kit'
import { BundlerClient } from './types'
/**
 * Gets the EIP-4337 bundler provider.
 *
 * @param {string} bundlerUrl The EIP-4337 bundler URL.
 * @return {BundlerClient} The EIP-4337 bundler provider.
 */
export declare function getEip4337BundlerProvider(bundlerUrl: string): BundlerClient
/**
 * Signs typed data.
 *
 * @param {SafeUserOperation} safeUserOperation - Safe user operation to sign.
 * @param {SafeProvider} safeProvider - Safe provider.
 * @param {string} safe4337ModuleAddress - Safe 4337 module address.
 * @return {Promise<SafeSignature>} The SafeSignature object containing the data and the signatures.
 */
export declare function signSafeOp(
  safeUserOperation: SafeUserOperation,
  safeProvider: SafeProvider,
  safe4337ModuleAddress: string
): Promise<SafeSignature>
/**
 * Encodes multi-send data from transactions batch.
 *
 * @param {MetaTransactionData[]} transactions - an array of transaction to to be encoded.
 * @return {string} The encoded data string.
 */
export declare function encodeMultiSendCallData(transactions: MetaTransactionData[]): string
/**
 * Gets the safe user operation hash.
 *
 * @param {SafeUserOperation} safeUserOperation - The SafeUserOperation.
 * @param {bigint} chainId - The chain id.
 * @param {string} safe4337ModuleAddress - The Safe 4337 module address.
 * @return {string} The hash of the safe operation.
 */
export declare function calculateSafeUserOperationHash(
  safeUserOperation: SafeUserOperation,
  chainId: bigint,
  safe4337ModuleAddress: string
): string
/**
 * Converts various bigint values from a UserOperation to their hexadecimal representation.
 *
 * @param {UserOperation} userOperation - The UserOperation object whose values are to be converted.
 * @returns {UserOperation} A new UserOperation object with the values converted to hexadecimal.
 */
export declare function userOperationToHexValues(userOperation: UserOperation): {
  nonce: `0x${string}`
  callGasLimit: `0x${string}`
  verificationGasLimit: `0x${string}`
  preVerificationGas: `0x${string}`
  maxFeePerGas: `0x${string}`
  maxPriorityFeePerGas: `0x${string}`
  sender: string
  initCode: string
  callData: string
  paymasterAndData: string
  /**
   * Encodes the given WebAuthn signature into a string. This computes the ABI-encoded signature parameters:
   * ```solidity
   * abi.encode(authenticatorData, clientDataFields, r, s);
   * ```
   *
   * @param authenticatorData - The authenticator data as a Uint8Array.
   * @param clientDataFields - The client data fields as a string.
   * @param r - The value of r as a bigint.
   * @param s - The value of s as a bigint.
   * @returns The encoded string.
   */
  signature: string
}
/**
 * Passkey Dummy client data JSON fields. This can be used for gas estimations, as it pads the fields enough
 * to account for variations in WebAuthn implementations.
 */
export declare const DUMMY_CLIENT_DATA_FIELDS: string
/**
 * Dummy authenticator data. This can be used for gas estimations, as it ensures that the correct
 * authenticator flags are set.
 */
export declare const DUMMY_AUTHENTICATOR_DATA: Uint8Array
/**
 * This method creates a dummy signature for the SafeOperation based on the Safe threshold. We assume that all owners are passkeys
 * This is useful for gas estimations
 * @param userOperation - The user operation
 * @param signer - The signer
 * @param threshold - The Safe threshold
 * @returns The user operation with the dummy passkey signature
 */
export declare function addDummySignature(
  userOperation: UserOperation,
  signer: string,
  threshold: number
): UserOperation
/**
 * Encodes the given WebAuthn signature into a string. This computes the ABI-encoded signature parameters:
 * ```solidity
 * abi.encode(authenticatorData, clientDataFields, r, s);
 * ```
 *
 * @param authenticatorData - The authenticator data as a Uint8Array.
 * @param clientDataFields - The client data fields as a string.
 * @param r - The value of r as a bigint.
 * @param s - The value of s as a bigint.
 * @returns The encoded string.
 */
export declare function getSignatureBytes({
  authenticatorData,
  clientDataFields,
  r,
  s
}: {
  authenticatorData: Uint8Array
  clientDataFields: string
  r: bigint
  s: bigint
}): string
