'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.sendTransaction = void 0
const actions_1 = require('viem/actions')
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
  const client = protocolKit.getSafeProvider().getExternalProvider()
  if (!signer)
    throw new Error('SafeProvider must be initialized with a signer to use this function')
  const hash = await signer.sendTransaction({
    to: transaction.to,
    data: transaction.data,
    value: BigInt(transaction.value),
    account: signer.account
  })
  const receipt = await (0, actions_1.waitForTransactionReceipt)(client, { hash })
  return receipt.transactionHash
}
exports.sendTransaction = sendTransaction
//# sourceMappingURL=sendTransaction.js.map
