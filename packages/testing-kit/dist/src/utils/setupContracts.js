'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.getDefaultCallbackHandler =
  exports.getDebugTransactionGuard =
  exports.getERC20Mintable =
  exports.getWhiteListModule =
  exports.getStateChannelModule =
  exports.getSocialRecoveryModule =
  exports.getDailyLimitModule =
  exports.getWebAuthnContract =
  exports.getSafeWebAuthnSharedSigner =
  exports.getSafeWebAuthnSignerFactory =
  exports.getSimulateTxAccessor =
  exports.getCreateCall =
  exports.getSignMessageLib =
  exports.getMultiSendCallOnly =
  exports.getMultiSend =
  exports.getCompatibilityFallbackHandler =
  exports.getSafeWithOwners =
  exports.getSafeTemplate =
  exports.getFactory =
  exports.getSafeSingleton =
    void 0
const viem_1 = require('viem')
const deploy_contracts_1 = require('../hardhat/deploy/deploy-contracts')
const hardhat_1 = require('hardhat')
const satisfies_1 = __importDefault(require('semver/functions/satisfies'))
const transactions_1 = require('./transactions')
const ZERO_ADDRESS = viem_1.zeroAddress
const getSafeSingleton = async () => {
  const safeDeployment = await hardhat_1.deployments.get(deploy_contracts_1.safeDeployed.name)
  const contract = await hardhat_1.viem.getContractAt(
    deploy_contracts_1.safeDeployed.name,
    safeDeployment.address
  )
  return {
    contract,
    abi: safeDeployment.abi
  }
}
exports.getSafeSingleton = getSafeSingleton
const getFactory = async () => {
  const factoryDeployment = await hardhat_1.deployments.get(
    deploy_contracts_1.proxyFactoryDeployed.name
  )
  const factoryAddress = factoryDeployment.address
  const contract = await hardhat_1.viem.getContractAt(
    deploy_contracts_1.proxyFactoryDeployed.name,
    factoryAddress,
    {
      client: { wallet: await (0, transactions_1.getDeployer)() }
    }
  )
  return {
    contract,
    abi: factoryDeployment.abi
  }
}
exports.getFactory = getFactory
const getSafeTemplate = async () => {
  const randomSaltNonce = Math.floor(Math.random() * 1000000000) + 1
  const singleton = (await (0, exports.getSafeSingleton)()).contract
  const factory = (await (0, exports.getFactory)()).contract
  const singletonAddress = singleton.address
  const { result } = await factory.simulate.createProxyWithNonce([
    singletonAddress,
    '0x',
    randomSaltNonce
  ])
  const hash = await factory.write.createProxyWithNonce([singletonAddress, '0x', randomSaltNonce])
  await (0, transactions_1.waitTransactionReceipt)(hash)
  return hardhat_1.viem.getContractAt(deploy_contracts_1.safeDeployed.name, result)
}
exports.getSafeTemplate = getSafeTemplate
const getSafeWithOwners = async (owners, threshold, fallbackHandler) => {
  const template = await (0, exports.getSafeTemplate)()
  if ((0, satisfies_1.default)(deploy_contracts_1.safeVersionDeployed, '<=1.0.0')) {
    await template.write.setup([
      owners,
      threshold || owners.length,
      ZERO_ADDRESS,
      '0x',
      ZERO_ADDRESS,
      0,
      ZERO_ADDRESS
    ])
  } else {
    await template.write.setup([
      owners,
      threshold || owners.length,
      ZERO_ADDRESS,
      '0x',
      fallbackHandler || (await (0, exports.getCompatibilityFallbackHandler)()).contract.address,
      ZERO_ADDRESS,
      0,
      ZERO_ADDRESS
    ])
  }
  return template
}
exports.getSafeWithOwners = getSafeWithOwners
const getCompatibilityFallbackHandler = async () => {
  const compatibilityFallbackHandlerDeployment = await hardhat_1.deployments.get(
    deploy_contracts_1.compatibilityFallbackHandlerDeployed.name
  )
  const compatibilityFallbackHandlerDeploymentAddress =
    compatibilityFallbackHandlerDeployment.address
  const contract = await hardhat_1.viem.getContractAt(
    deploy_contracts_1.compatibilityFallbackHandlerDeployed.name,
    compatibilityFallbackHandlerDeploymentAddress
  )
  return {
    contract,
    abi: compatibilityFallbackHandlerDeployment.abi
  }
}
exports.getCompatibilityFallbackHandler = getCompatibilityFallbackHandler
const getMultiSend = async () => {
  const multiSendDeployment = await hardhat_1.deployments.get(
    deploy_contracts_1.multiSendDeployed.name
  )
  const multiSendAddress = multiSendDeployment.address
  const contract = await hardhat_1.viem.getContractAt(
    deploy_contracts_1.multiSendDeployed.name,
    multiSendAddress
  )
  return {
    contract,
    abi: multiSendDeployment.abi
  }
}
exports.getMultiSend = getMultiSend
const getMultiSendCallOnly = async () => {
  const multiSendCallOnlyDeployment = await hardhat_1.deployments.get(
    deploy_contracts_1.multiSendCallOnlyDeployed.name
  )
  const multiSendAddress = multiSendCallOnlyDeployment.address
  const contract = await hardhat_1.viem.getContractAt(
    deploy_contracts_1.multiSendCallOnlyDeployed.name,
    multiSendAddress
  )
  return {
    contract,
    abi: multiSendCallOnlyDeployment.abi
  }
}
exports.getMultiSendCallOnly = getMultiSendCallOnly
const getSignMessageLib = async () => {
  const signMessageLibDeployment = await hardhat_1.deployments.get(
    deploy_contracts_1.signMessageLibDeployed.name
  )
  const signMessageLibAddress = signMessageLibDeployment.address
  const contract = await hardhat_1.viem.getContractAt(
    deploy_contracts_1.signMessageLibDeployed.name,
    signMessageLibAddress
  )
  return {
    contract,
    abi: signMessageLibDeployment.abi
  }
}
exports.getSignMessageLib = getSignMessageLib
const getCreateCall = async () => {
  const createCallDeployment = await hardhat_1.deployments.get(
    deploy_contracts_1.createCallDeployed.name
  )
  const createCallAddress = createCallDeployment.address
  const contract = await hardhat_1.viem.getContractAt(
    deploy_contracts_1.createCallDeployed.name,
    createCallAddress
  )
  return {
    contract,
    abi: createCallDeployment.abi
  }
}
exports.getCreateCall = getCreateCall
const getSimulateTxAccessor = async () => {
  const simulateTxAccessorDeployment = await hardhat_1.deployments.get(
    deploy_contracts_1.simulateTxAccessorDeployed.name
  )
  const simulateTxAccessorAddress = simulateTxAccessorDeployment.address
  const contract = await hardhat_1.viem.getContractAt(
    deploy_contracts_1.simulateTxAccessorDeployed.name,
    simulateTxAccessorAddress
  )
  return {
    contract,
    abi: simulateTxAccessorDeployment.abi
  }
}
exports.getSimulateTxAccessor = getSimulateTxAccessor
const getSafeWebAuthnSignerFactory = async () => {
  const safeWebAuthnSignerFactoryDeployment = await hardhat_1.deployments.get(
    deploy_contracts_1.safeWebAuthnSignerFactoryDeployed.name
  )
  const safeWebAuthnSignerFactoryAddress = safeWebAuthnSignerFactoryDeployment.address
  const contract = await hardhat_1.viem.getContractAt(
    deploy_contracts_1.proxyFactoryDeployed.name,
    safeWebAuthnSignerFactoryAddress,
    {
      client: { wallet: await (0, transactions_1.getDeployer)() }
    }
  )
  return {
    contract,
    abi: safeWebAuthnSignerFactoryDeployment.abi
  }
}
exports.getSafeWebAuthnSignerFactory = getSafeWebAuthnSignerFactory
const getSafeWebAuthnSharedSigner = async () => {
  const safeWebAuthnSharedSignerDeployment = await hardhat_1.deployments.get(
    deploy_contracts_1.safeWebAuthnSharedSignerDeployed.name
  )
  return {
    contract: await hardhat_1.viem.getContractAt(
      deploy_contracts_1.safeWebAuthnSharedSignerDeployed.name,
      safeWebAuthnSharedSignerDeployment.address
    ),
    abi: safeWebAuthnSharedSignerDeployment.abi
  }
}
exports.getSafeWebAuthnSharedSigner = getSafeWebAuthnSharedSigner
const getWebAuthnContract = async () => {
  const webAuthnContractDeployment = await hardhat_1.deployments.get('WebAuthnContract')
  const dailyLimitModuleAddress = webAuthnContractDeployment.address
  return await hardhat_1.viem.getContractAt('WebAuthnContract', dailyLimitModuleAddress)
}
exports.getWebAuthnContract = getWebAuthnContract
const getDailyLimitModule = async () => {
  const dailyLimitModuleDeployment = await hardhat_1.deployments.get('DailyLimitModule')
  const dailyLimitModuleAddress = dailyLimitModuleDeployment.address
  return await hardhat_1.viem.getContractAt('DailyLimitModule', dailyLimitModuleAddress)
}
exports.getDailyLimitModule = getDailyLimitModule
const getSocialRecoveryModule = async () => {
  const socialRecoveryModuleDeployment = await hardhat_1.deployments.get('SocialRecoveryModule')
  const socialRecoveryModuleAddress = socialRecoveryModuleDeployment.address
  return await hardhat_1.viem.getContractAt('SocialRecoveryModule', socialRecoveryModuleAddress)
}
exports.getSocialRecoveryModule = getSocialRecoveryModule
const getStateChannelModule = async () => {
  const stateChannelModuleDeployment = await hardhat_1.deployments.get('StateChannelModule')
  const stateChannelModuleAddress = stateChannelModuleDeployment.address
  return await hardhat_1.viem.getContractAt('StateChannelModule', stateChannelModuleAddress)
}
exports.getStateChannelModule = getStateChannelModule
const getWhiteListModule = async () => {
  const whiteListModuleDeployment = await hardhat_1.deployments.get('WhitelistModule')
  const whiteListModuleAddress = whiteListModuleDeployment.address
  return await hardhat_1.viem.getContractAt('WhitelistModule', whiteListModuleAddress)
}
exports.getWhiteListModule = getWhiteListModule
const getERC20Mintable = async () => {
  const eRC20MintableDeployment = await hardhat_1.deployments.get('ERC20Mintable')
  const eRC20MintableAddress = eRC20MintableDeployment.address
  return await hardhat_1.viem.getContractAt('ERC20Mintable', eRC20MintableAddress, {
    client: { wallet: await (0, transactions_1.getDeployer)() }
  })
}
exports.getERC20Mintable = getERC20Mintable
const getDebugTransactionGuard = async () => {
  const contractName = (0, satisfies_1.default)(deploy_contracts_1.safeVersionDeployed, '<=1.3.0')
    ? 'DebugTransactionGuard_SV1_3_0'
    : 'DebugTransactionGuard_SV1_4_1'
  const debugTransactionGuardDeployment = await hardhat_1.deployments.get(contractName)
  const debugTransactionGuardAddress = debugTransactionGuardDeployment.address
  return await hardhat_1.viem.getContractAt(contractName, debugTransactionGuardAddress)
}
exports.getDebugTransactionGuard = getDebugTransactionGuard
const getDefaultCallbackHandler = async () => {
  const contractName = (0, satisfies_1.default)(deploy_contracts_1.safeVersionDeployed, '<=1.3.0')
    ? 'DefaultCallbackHandler_SV1_3_0'
    : 'TokenCallbackHandler_SV1_4_1'
  const defaultCallbackHandlerDeployment = await hardhat_1.deployments.get(contractName)
  const defaultCallbackHandlerAddress = defaultCallbackHandlerDeployment.address
  return await hardhat_1.viem.getContractAt(contractName, defaultCallbackHandlerAddress)
}
exports.getDefaultCallbackHandler = getDefaultCallbackHandler
//# sourceMappingURL=setupContracts.js.map
