'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getContractNetworks = void 0
const setupContracts_1 = require('./setupContracts')
async function getContractNetworks(chainId) {
  return {
    [chainId.toString()]: {
      safeSingletonAddress: (await (0, setupContracts_1.getSafeSingleton)()).contract.address,
      safeSingletonAbi: (await (0, setupContracts_1.getSafeSingleton)()).abi,
      safeProxyFactoryAddress: (await (0, setupContracts_1.getFactory)()).contract.address,
      safeProxyFactoryAbi: (await (0, setupContracts_1.getFactory)()).abi,
      multiSendAddress: (await (0, setupContracts_1.getMultiSend)()).contract.address,
      multiSendAbi: (await (0, setupContracts_1.getMultiSend)()).abi,
      multiSendCallOnlyAddress: (await (0, setupContracts_1.getMultiSendCallOnly)()).contract
        .address,
      multiSendCallOnlyAbi: (await (0, setupContracts_1.getMultiSendCallOnly)()).abi,
      fallbackHandlerAddress: (await (0, setupContracts_1.getCompatibilityFallbackHandler)())
        .contract.address,
      fallbackHandlerAbi: (await (0, setupContracts_1.getCompatibilityFallbackHandler)()).abi,
      signMessageLibAddress: (await (0, setupContracts_1.getSignMessageLib)()).contract.address,
      signMessageLibAbi: (await (0, setupContracts_1.getSignMessageLib)()).abi,
      createCallAddress: (await (0, setupContracts_1.getCreateCall)()).contract.address,
      createCallAbi: (await (0, setupContracts_1.getCreateCall)()).abi,
      simulateTxAccessorAddress: (await (0, setupContracts_1.getSimulateTxAccessor)()).contract
        .address,
      simulateTxAccessorAbi: (await (0, setupContracts_1.getSimulateTxAccessor)()).abi,
      safeWebAuthnSignerFactoryAddress: (await (0, setupContracts_1.getSafeWebAuthnSignerFactory)())
        .contract.address,
      safeWebAuthnSignerFactoryAbi: (await (0, setupContracts_1.getSafeWebAuthnSignerFactory)())
        .abi,
      safeWebAuthnSharedSignerAddress: (await (0, setupContracts_1.getSafeWebAuthnSharedSigner)())
        .contract.address,
      safeWebAuthnSharedSignerAbi: (await (0, setupContracts_1.getSafeWebAuthnSharedSigner)()).abi
    }
  }
}
exports.getContractNetworks = getContractNetworks
//# sourceMappingURL=setupContractNetworks.js.map
