'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const ethers_1 = require('ethers')
const protocol_kit_1 = require('@safe-global/protocol-kit')
const utils_1 = require('./utils')
class EthSafeOperation {
  constructor(userOperation, { chainId, entryPoint, validAfter, validUntil, moduleAddress }) {
    this.signatures = new Map()
    this.chainId = chainId
    this.moduleAddress = moduleAddress
    this.data = {
      safe: userOperation.sender,
      nonce: BigInt(userOperation.nonce),
      initCode: userOperation.initCode,
      callData: userOperation.callData,
      callGasLimit: userOperation.callGasLimit,
      verificationGasLimit: userOperation.verificationGasLimit,
      preVerificationGas: userOperation.preVerificationGas,
      maxFeePerGas: userOperation.maxFeePerGas,
      maxPriorityFeePerGas: userOperation.maxPriorityFeePerGas,
      paymasterAndData: userOperation.paymasterAndData,
      validAfter: validAfter || 0,
      validUntil: validUntil || 0,
      entryPoint
    }
  }
  getSignature(signer) {
    return this.signatures.get(signer.toLowerCase())
  }
  addSignature(signature) {
    this.signatures.set(signature.signer.toLowerCase(), signature)
  }
  encodedSignatures() {
    return (0, protocol_kit_1.buildSignatureBytes)(Array.from(this.signatures.values()))
  }
  addEstimations(estimations) {
    const keys = [
      'maxFeePerGas',
      'maxPriorityFeePerGas',
      'verificationGasLimit',
      'preVerificationGas',
      'callGasLimit'
    ]
    for (const key of keys) {
      this.data[key] = BigInt(estimations[key] || this.data[key])
    }
  }
  toUserOperation() {
    return {
      sender: this.data.safe,
      nonce: ethers_1.ethers.toBeHex(this.data.nonce),
      initCode: this.data.initCode,
      callData: this.data.callData,
      callGasLimit: this.data.callGasLimit,
      verificationGasLimit: this.data.verificationGasLimit,
      preVerificationGas: this.data.preVerificationGas,
      maxFeePerGas: this.data.maxFeePerGas,
      maxPriorityFeePerGas: this.data.maxPriorityFeePerGas,
      paymasterAndData: this.data.paymasterAndData,
      signature: ethers_1.ethers.solidityPacked(
        ['uint48', 'uint48', 'bytes'],
        [this.data.validAfter, this.data.validUntil, this.encodedSignatures()]
      )
    }
  }
  getHash() {
    return (0, utils_1.calculateSafeUserOperationHash)(this.data, this.chainId, this.moduleAddress)
  }
}
exports.default = EthSafeOperation
//# sourceMappingURL=SafeOperation.js.map
