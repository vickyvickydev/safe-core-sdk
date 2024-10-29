'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getSignatureBytes =
  exports.addDummySignature =
  exports.DUMMY_AUTHENTICATOR_DATA =
  exports.DUMMY_CLIENT_DATA_FIELDS =
  exports.userOperationToHexValues =
  exports.calculateSafeUserOperationHash =
  exports.encodeMultiSendCallData =
  exports.signSafeOp =
  exports.getEip4337BundlerProvider =
    void 0
const safe_core_sdk_types_1 = require('@safe-global/safe-core-sdk-types')
const protocol_kit_1 = require('@safe-global/protocol-kit')
const ethers_1 = require('ethers')
const constants_1 = require('./constants')
/**
 * Gets the EIP-4337 bundler provider.
 *
 * @param {string} bundlerUrl The EIP-4337 bundler URL.
 * @return {Provider} The EIP-4337 bundler provider.
 */
function getEip4337BundlerProvider(bundlerUrl) {
  const provider = new ethers_1.ethers.JsonRpcProvider(bundlerUrl, undefined, {
    batchMaxCount: 1
  })
  return provider
}
exports.getEip4337BundlerProvider = getEip4337BundlerProvider
/**
 * Signs typed data.
 *
 * @param {SafeUserOperation} safeUserOperation - Safe user operation to sign.
 * @param {SafeProvider} safeProvider - Safe provider.
 * @param {string} safe4337ModuleAddress - Safe 4337 module address.
 * @return {Promise<SafeSignature>} The SafeSignature object containing the data and the signatures.
 */
async function signSafeOp(safeUserOperation, safeProvider, safe4337ModuleAddress) {
  const signer = await safeProvider.getExternalSigner()
  const chainId = await safeProvider.getChainId()
  const signerAddress = await signer.getAddress()
  const signature = await signer.signTypedData(
    {
      chainId,
      verifyingContract: safe4337ModuleAddress
    },
    constants_1.EIP712_SAFE_OPERATION_TYPE,
    {
      ...safeUserOperation,
      nonce: ethers_1.ethers.toBeHex(safeUserOperation.nonce),
      validAfter: ethers_1.ethers.toBeHex(safeUserOperation.validAfter),
      validUntil: ethers_1.ethers.toBeHex(safeUserOperation.validUntil),
      maxFeePerGas: ethers_1.ethers.toBeHex(safeUserOperation.maxFeePerGas),
      maxPriorityFeePerGas: ethers_1.ethers.toBeHex(safeUserOperation.maxPriorityFeePerGas)
    }
  )
  return new protocol_kit_1.EthSafeSignature(signerAddress, signature)
}
exports.signSafeOp = signSafeOp
/**
 * Encodes multi-send data from transactions batch.
 *
 * @param {MetaTransactionData[]} transactions - an array of transaction to to be encoded.
 * @return {string} The encoded data string.
 */
function encodeMultiSendCallData(transactions) {
  return constants_1.INTERFACES.encodeFunctionData('multiSend', [
    (0, protocol_kit_1.encodeMultiSendData)(
      transactions.map((tx) => ({
        ...tx,
        operation: tx.operation ?? safe_core_sdk_types_1.OperationType.Call
      }))
    )
  ])
}
exports.encodeMultiSendCallData = encodeMultiSendCallData
/**
 * Gets the safe user operation hash.
 *
 * @param {SafeUserOperation} safeUserOperation - The SafeUserOperation.
 * @param {bigint} chainId - The chain id.
 * @param {string} safe4337ModuleAddress - The Safe 4337 module address.
 * @return {string} The hash of the safe operation.
 */
function calculateSafeUserOperationHash(safeUserOperation, chainId, safe4337ModuleAddress) {
  return ethers_1.ethers.TypedDataEncoder.hash(
    {
      chainId,
      verifyingContract: safe4337ModuleAddress
    },
    constants_1.EIP712_SAFE_OPERATION_TYPE,
    safeUserOperation
  )
}
exports.calculateSafeUserOperationHash = calculateSafeUserOperationHash
/**
 * Converts various bigint values from a UserOperation to their hexadecimal representation.
 *
 * @param {UserOperation} userOperation - The UserOperation object whose values are to be converted.
 * @returns {UserOperation} A new UserOperation object with the values converted to hexadecimal.
 */
function userOperationToHexValues(userOperation) {
  const userOperationWithHexValues = {
    ...userOperation,
    nonce: ethers_1.ethers.toBeHex(userOperation.nonce),
    callGasLimit: ethers_1.ethers.toBeHex(userOperation.callGasLimit),
    verificationGasLimit: ethers_1.ethers.toBeHex(userOperation.verificationGasLimit),
    preVerificationGas: ethers_1.ethers.toBeHex(userOperation.preVerificationGas),
    maxFeePerGas: ethers_1.ethers.toBeHex(userOperation.maxFeePerGas),
    maxPriorityFeePerGas: ethers_1.ethers.toBeHex(userOperation.maxPriorityFeePerGas)
  }
  return userOperationWithHexValues
}
exports.userOperationToHexValues = userOperationToHexValues
/**
 * Passkey Dummy client data JSON fields. This can be used for gas estimations, as it pads the fields enough
 * to account for variations in WebAuthn implementations.
 */
exports.DUMMY_CLIENT_DATA_FIELDS = [
  `"origin":"https://safe.global"`,
  `"padding":"This pads the clientDataJSON so that we can leave room for additional implementation specific fields for a more accurate 'preVerificationGas' estimate."`
].join(',')
/**
 * Dummy authenticator data. This can be used for gas estimations, as it ensures that the correct
 * authenticator flags are set.
 */
exports.DUMMY_AUTHENTICATOR_DATA = new Uint8Array(37)
// Authenticator data is the concatenation of:
// - 32 byte SHA-256 hash of the relying party ID
// - 1 byte for the user verification flag
// - 4 bytes for the signature count
// We fill it all with `0xfe` and set the appropriate user verification flag.
exports.DUMMY_AUTHENTICATOR_DATA.fill(0xfe)
exports.DUMMY_AUTHENTICATOR_DATA[32] = 0x04
/**
 * This method creates a dummy signature for the SafeOperation based on the Safe threshold. We assume that all owners are passkeys
 * This is useful for gas estimations
 * @param userOperation - The user operation
 * @param signer - The signer
 * @param threshold - The Safe threshold
 * @returns The user operation with the dummy passkey signature
 */
function addDummySignature(userOperation, signer, threshold) {
  const signatures = []
  for (let i = 0; i < threshold; i++) {
    const isContractSignature = true
    const passkeySignature = getSignatureBytes({
      authenticatorData: exports.DUMMY_AUTHENTICATOR_DATA,
      clientDataFields: exports.DUMMY_CLIENT_DATA_FIELDS,
      r: BigInt(`0x${'ec'.repeat(32)}`),
      s: BigInt(`0x${'d5a'.repeat(21)}f`)
    })
    signatures.push(
      new protocol_kit_1.EthSafeSignature(signer, passkeySignature, isContractSignature)
    )
  }
  return {
    ...userOperation,
    signature: ethers_1.ethers.solidityPacked(
      ['uint48', 'uint48', 'bytes'],
      [0, 0, (0, protocol_kit_1.buildSignatureBytes)(signatures)]
    )
  }
}
exports.addDummySignature = addDummySignature
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
function getSignatureBytes({ authenticatorData, clientDataFields, r, s }) {
  // Helper functions
  // Convert a number to a 64-byte hex string with padded upto Hex string with 32 bytes
  const encodeUint256 = (x) => x.toString(16).padStart(64, '0')
  // Calculate the byte size of the dynamic data along with the length parameter alligned to 32 bytes
  const byteSize = (data) => 32 * (Math.ceil(data.length / 32) + 1) // +1 is for the length parameter
  // Encode dynamic data padded with zeros if necessary in 32 bytes chunks
  const encodeBytes = (data) =>
    `${encodeUint256(data.length)}${ethers_1.ethers.hexlify(data).slice(2)}`.padEnd(
      byteSize(data) * 2,
      '0'
    )
  // authenticatorData starts after the first four words.
  const authenticatorDataOffset = 32 * 4
  // clientDataFields starts immediately after the authenticator data.
  const clientDataFieldsOffset = authenticatorDataOffset + byteSize(authenticatorData)
  return (
    '0x' +
    encodeUint256(authenticatorDataOffset) +
    encodeUint256(clientDataFieldsOffset) +
    encodeUint256(r) +
    encodeUint256(s) +
    encodeBytes(authenticatorData) +
    encodeBytes(new TextEncoder().encode(clientDataFields))
  )
}
exports.getSignatureBytes = getSignatureBytes
//# sourceMappingURL=utils.js.map
