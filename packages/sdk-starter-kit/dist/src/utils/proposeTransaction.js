'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.proposeTransaction = void 0
const protocol_kit_1 = require('@safe-global/protocol-kit')
/**
 *  Propose a transaction to the Safe
 *
 * @param {SafeTransaction} safeTransaction The Safe transaction to propose
 * @param {Safe} protocolKit The Safe instance
 * @param {SafeApiKit} apiKit The SafeApiKit instance
 * @returns The Safe transaction hash
 */
const proposeTransaction = async ({ safeTransaction, protocolKit, apiKit }) => {
  safeTransaction = await protocolKit.signTransaction(safeTransaction)
  const signerAddress = (await protocolKit.getSafeProvider().getSignerAddress()) || '0x'
  const ethSig = safeTransaction.getSignature(signerAddress)
  const safeTxHash = await protocolKit.getTransactionHash(safeTransaction)
  const txOptions = {
    safeAddress: await protocolKit.getAddress(),
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress: signerAddress,
    senderSignature: (0, protocol_kit_1.buildSignatureBytes)([ethSig])
  }
  await apiKit.proposeTransaction(txOptions)
  return safeTxHash
}
exports.proposeTransaction = proposeTransaction
//# sourceMappingURL=proposeTransaction.js.map
