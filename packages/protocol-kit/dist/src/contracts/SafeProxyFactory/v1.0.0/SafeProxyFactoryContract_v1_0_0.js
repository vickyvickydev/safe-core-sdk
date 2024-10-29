'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const SafeProxyFactoryBaseContract_1 = __importDefault(
  require('../../../contracts/SafeProxyFactory/SafeProxyFactoryBaseContract')
)
const types_kit_1 = require('@safe-global/types-kit')
/**
 * SafeProxyFactoryContract_v1_0_0  is the implementation specific to the Safe Proxy Factory contract version 1.0.0.
 *
 * This class specializes in handling interactions with the Safe Proxy Factory contract version 1.0.0 using Ethers.js v6.
 *
 * @extends SafeProxyFactoryBaseContract<SafeProxyFactoryContract_v1_0_0_Abi> - Inherits from SafeProxyFactoryBaseContract with ABI specific to Safe Proxy Factory contract version 1.0.0.
 * @implements SafeProxyFactoryContract_v1_0_0_Contract - Implements the interface specific to Safe Proxy Factory contract version 1.0.0.
 */
class SafeProxyFactoryContract_v1_0_0 extends SafeProxyFactoryBaseContract_1.default {
  /**
   * Constructs an instance of SafeProxyFactoryContract_v1_0_0
   *
   * @param chainId - The chain ID where the contract resides.
   * @param safeProvider - An instance of SafeProvider.
   * @param customContractAddress - Optional custom address for the contract. If not provided, the address is derived from the Safe deployments based on the chainId and safeVersion.
   * @param customContractAbi - Optional custom ABI for the contract. If not provided, the default ABI for version 1.0.0 is used.
   * @param deploymentType - Optional deployment type for the contract. If not provided, the first deployment retrieved from the safe-deployments array will be used.
   */
  constructor(chainId, safeProvider, customContractAddress, customContractAbi, deploymentType) {
    const safeVersion = '1.0.0'
    const defaultAbi = types_kit_1.safeProxyFactory_1_0_0_ContractArtifacts.abi
    super(
      chainId,
      safeProvider,
      defaultAbi,
      safeVersion,
      customContractAddress,
      customContractAbi,
      deploymentType
    )
    /**
     * Allows to retrieve the creation code used for the Proxy deployment. With this it is easily possible to calculate predicted address.
     * @returns Array[creationCode]
     */
    this.proxyCreationCode = async () => {
      return [await this.read('proxyCreationCode')]
    }
    /**
     * Allows to retrieve the runtime code of a deployed Proxy. This can be used to check that the expected Proxy was deployed.
     * @returns Array[runtimeCode]
     */
    this.proxyRuntimeCode = async () => {
      return [await this.read('proxyRuntimeCode')]
    }
    /**
     * Allows to create new proxy contact and execute a message call to the new proxy within one transaction.
     * @param args - Array[masterCopy, data]
     * @returns Array[proxyAddress]
     */
    this.createProxy = async (args) => {
      return [await this.write('createProxy', args)]
    }
    /**
     * Allows to create new proxy contract and execute a message call to the new proxy within one transaction.
     * @param args - Array[masterCopy, initializer, saltNonce]
     * @returns Array[proxyAddress]
     */
    this.createProxyWithNonce = async (args) => {
      return [await this.write('createProxyWithNonce', args)]
    }
  }
}
exports.default = SafeProxyFactoryContract_v1_0_0
//# sourceMappingURL=SafeProxyFactoryContract_v1_0_0.js.map
