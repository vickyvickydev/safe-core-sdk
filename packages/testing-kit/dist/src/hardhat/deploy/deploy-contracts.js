'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.safeWebAuthnSharedSignerDeployed =
  exports.safeWebAuthnSignerFactoryDeployed =
  exports.simulateTxAccessorDeployed =
  exports.createCallDeployed =
  exports.signMessageLibDeployed =
  exports.compatibilityFallbackHandlerDeployed =
  exports.multiSendCallOnlyDeployed =
  exports.multiSendDeployed =
  exports.proxyFactoryDeployed =
  exports.safeDeployed =
  exports.safeVersionDeployed =
    void 0
exports.safeVersionDeployed = process.env.SAFE_VERSION
const safeContracts = {
  '1.4.1': { name: 'Safe_SV1_4_1' },
  '1.3.0': { name: 'Safe_SV1_3_0' },
  '1.2.0': { name: 'Safe_SV1_2_0' },
  '1.1.1': { name: 'Safe_SV1_1_1' },
  '1.0.0': { name: 'Safe_SV1_0_0' }
}
const proxyFactoryContracts = {
  '1.4.1': { name: 'SafeProxyFactory_SV1_4_1' },
  '1.3.0': { name: 'SafeProxyFactory_SV1_3_0' },
  '1.2.0': { name: 'SafeProxyFactory_SV1_2_0' },
  '1.1.1': { name: 'SafeProxyFactory_SV1_1_1' },
  '1.0.0': { name: 'SafeProxyFactory_SV1_0_0' }
}
const multiSendContracts = {
  '1.4.1': { name: 'MultiSend_SV1_4_1' },
  '1.3.0': { name: 'MultiSend_SV1_3_0' },
  '1.2.0': { name: 'MultiSend_SV1_2_0' },
  '1.1.1': { name: 'MultiSend_SV1_2_0' },
  '1.0.0': { name: 'MultiSend_SV1_2_0' }
}
const multiSendCallOnlyContracts = {
  '1.4.1': { name: 'MultiSendCallOnly_SV1_4_1' },
  '1.3.0': { name: 'MultiSendCallOnly_SV1_3_0' },
  '1.2.0': { name: 'MultiSendCallOnly_SV1_3_0' },
  '1.1.1': { name: 'MultiSendCallOnly_SV1_3_0' },
  '1.0.0': { name: 'MultiSendCallOnly_SV1_3_0' }
}
const compatibilityFallbackHandlerContracts = {
  '1.4.1': { name: 'CompatibilityFallbackHandler_SV1_4_1' },
  '1.3.0': { name: 'CompatibilityFallbackHandler_SV1_3_0' },
  '1.2.0': { name: 'CompatibilityFallbackHandler_SV1_3_0' },
  '1.1.1': { name: 'CompatibilityFallbackHandler_SV1_3_0' },
  '1.0.0': { name: 'CompatibilityFallbackHandler_SV1_3_0' }
}
const signMessageLibContracts = {
  '1.4.1': { name: 'SignMessageLib_SV1_4_1' },
  '1.3.0': { name: 'SignMessageLib_SV1_3_0' },
  '1.2.0': { name: 'SignMessageLib_SV1_3_0' },
  '1.1.1': { name: 'SignMessageLib_SV1_3_0' },
  '1.0.0': { name: 'SignMessageLib_SV1_3_0' }
}
const createCallContracts = {
  '1.4.1': { name: 'CreateCall_SV1_4_1' },
  '1.3.0': { name: 'CreateCall_SV1_3_0' },
  '1.2.0': { name: 'CreateCall_SV1_3_0' },
  '1.1.1': { name: 'CreateCall_SV1_3_0' },
  '1.0.0': { name: 'CreateCall_SV1_3_0' }
}
const simulateTxAccessorContracts = {
  '1.4.1': { name: 'SimulateTxAccessor_SV1_4_1' },
  '1.3.0': { name: 'SimulateTxAccessor_SV1_3_0' },
  '1.2.0': { name: 'SimulateTxAccessor_SV1_3_0' },
  '1.1.1': { name: 'SimulateTxAccessor_SV1_3_0' },
  '1.0.0': { name: 'SimulateTxAccessor_SV1_3_0' }
}
const safeWebAuthnSignerFactoryContracts = {
  '1.4.1': { name: 'SafeWebAuthnSignerFactory_SV1_4_1' },
  '1.3.0': { name: 'SafeWebAuthnSignerFactory_SV1_4_1' },
  '1.2.0': { name: 'SafeWebAuthnSignerFactory_SV1_4_1' },
  '1.1.1': { name: 'SafeWebAuthnSignerFactory_SV1_4_1' },
  '1.0.0': { name: 'SafeWebAuthnSignerFactory_SV1_4_1' }
}
const safeWebAuthnSharedSignerContracts = {
  '1.4.1': { name: 'SafeWebAuthnSharedSigner' },
  '1.3.0': { name: 'SafeWebAuthnSharedSigner' },
  '1.2.0': { name: 'SafeWebAuthnSharedSigner' },
  '1.1.1': { name: 'SafeWebAuthnSharedSigner' },
  '1.0.0': { name: 'SafeWebAuthnSharedSigner' }
}
exports.safeDeployed = safeContracts[exports.safeVersionDeployed]
exports.proxyFactoryDeployed = proxyFactoryContracts[exports.safeVersionDeployed]
exports.multiSendDeployed = multiSendContracts[exports.safeVersionDeployed]
exports.multiSendCallOnlyDeployed = multiSendCallOnlyContracts[exports.safeVersionDeployed]
exports.compatibilityFallbackHandlerDeployed =
  compatibilityFallbackHandlerContracts[exports.safeVersionDeployed]
exports.signMessageLibDeployed = signMessageLibContracts[exports.safeVersionDeployed]
exports.createCallDeployed = createCallContracts[exports.safeVersionDeployed]
exports.simulateTxAccessorDeployed = simulateTxAccessorContracts[exports.safeVersionDeployed]
exports.safeWebAuthnSignerFactoryDeployed =
  safeWebAuthnSignerFactoryContracts[exports.safeVersionDeployed]
exports.safeWebAuthnSharedSignerDeployed =
  safeWebAuthnSharedSignerContracts[exports.safeVersionDeployed]
const deploy = async (hre) => {
  const { deployments, getNamedAccounts } = hre
  const { deployer } = await getNamedAccounts()
  const { deploy } = deployments
  await deploy(exports.safeDeployed.name, {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy(exports.proxyFactoryDeployed.name, {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy(exports.multiSendDeployed.name, {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy(exports.multiSendCallOnlyDeployed.name, {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy(exports.signMessageLibDeployed.name, {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy(exports.createCallDeployed.name, {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy(exports.compatibilityFallbackHandlerDeployed.name, {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy(exports.simulateTxAccessorDeployed.name, {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy(exports.safeWebAuthnSignerFactoryDeployed.name, {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy(exports.safeWebAuthnSharedSignerDeployed.name, {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy('WebAuthnContract', {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy('DailyLimitModule', {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy('SocialRecoveryModule', {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy('ERC20Mintable', {
    from: deployer,
    args: [],
    log: true
  })
  await deploy('DebugTransactionGuard_SV1_3_0', {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy('DefaultCallbackHandler_SV1_3_0', {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy('DebugTransactionGuard_SV1_4_1', {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy('TokenCallbackHandler_SV1_4_1', {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy('StateChannelModule', {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
  await deploy('WhitelistModule', {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: true
  })
}
exports.default = deploy
//# sourceMappingURL=deploy-contracts.js.map
