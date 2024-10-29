'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getAccounts = void 0
const hardhat_1 = require('hardhat')
const viem_1 = require('viem')
async function getHardhatAccounts() {
  const wallets = await hardhat_1.viem.getWalletClients()
  const accounts = []
  for (let i = 0; i < 10; i++) {
    const wallet = wallets[i]
    const account = { signer: wallet, address: (0, viem_1.getAddress)(wallet.account.address) }
    accounts.push(account)
  }
  return accounts
}
async function getAccounts() {
  const accounts = await getHardhatAccounts()
  return accounts
}
exports.getAccounts = getAccounts
//# sourceMappingURL=setupTestNetwork.js.map
