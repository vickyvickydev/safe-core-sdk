'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.sendTransaction = void 0
/**
 * Sends a transaction using the signer (owner)
 * It's useful to deploy Safe accounts
 *
 * @param {Transaction} transaction  The transaction.
 * @param {Safe} protocolKit The protocolKit instance
 * @returns {Promise<string | undefined>} A promise that resolves with the transaction hash
 */
const sendTransaction = async ({ transaction, protocolKit }) => {
  const signer = await protocolKit.getSafeProvider().getExternalSigner()
  const txResponsePromise = await signer.sendTransaction({
    from: (await protocolKit.getSafeProvider().getSignerAddress()) || '0x',
    ...transaction
  })
  const txResponse = await txResponsePromise.wait()
  return txResponse?.hash
}
exports.sendTransaction = sendTransaction
//# sourceMappingURL=sendTransaction.js.map
