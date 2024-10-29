'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        var desc = Object.getOwnPropertyDescriptor(m, k)
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k]
            }
          }
        }
        Object.defineProperty(o, k2, desc)
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p)
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.createSafeClientResult =
  exports.waitSafeTxReceipt =
  exports.isValidSafeConfig =
  exports.isValidAddress =
    void 0
const protocol_kit_1 = require('@safe-global/protocol-kit')
const constants_1 = require('../constants')
const isValidAddress = (address) => {
  try {
    ;(0, protocol_kit_1.validateEthereumAddress)(address)
    return true
  } catch {
    return false
  }
}
exports.isValidAddress = isValidAddress
const isValidSafeConfig = (config) => {
  if (!config.owners || !config.threshold) return false
  return true
}
exports.isValidSafeConfig = isValidSafeConfig
const waitSafeTxReceipt = async (txResult) => {
  const receipt = txResult.transactionResponse
    ? await txResult.transactionResponse.wait()
    : undefined
  return receipt
}
exports.waitSafeTxReceipt = waitSafeTxReceipt
const createSafeClientResult = ({
  status,
  safeAddress,
  deploymentTxHash,
  safeTxHash,
  txHash,
  messageHash,
  userOperationHash,
  safeOperationHash
}) => {
  return {
    safeAddress,
    description: constants_1.MESSAGES[status],
    status,
    transactions: txHash || safeTxHash ? { ethereumTxHash: txHash, safeTxHash } : undefined,
    messages: messageHash ? { messageHash } : undefined,
    safeOperations:
      userOperationHash || safeOperationHash ? { userOperationHash, safeOperationHash } : undefined,
    safeAccountDeployment: deploymentTxHash ? { ethereumTxHash: deploymentTxHash } : undefined
  }
}
exports.createSafeClientResult = createSafeClientResult
__exportStar(require('./sendTransaction'), exports)
__exportStar(require('./proposeTransaction'), exports)
//# sourceMappingURL=index.js.map
