'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.signDelegate = void 0
async function signDelegate(walletClient, delegateAddress, chainId) {
  const domain = {
    name: 'Safe Transaction Service',
    version: '1.0',
    chainId: Number(chainId)
  }
  const types = {
    Delegate: [
      { name: 'delegateAddress', type: 'address' },
      { name: 'totp', type: 'uint256' }
    ]
  }
  const totp = Math.floor(Date.now() / 1000 / 3600)
  return walletClient.signTypedData({
    domain,
    types,
    primaryType: 'Delegate',
    message: { delegateAddress, totp }
  })
}
exports.signDelegate = signDelegate
//# sourceMappingURL=signDelegate.js.map
