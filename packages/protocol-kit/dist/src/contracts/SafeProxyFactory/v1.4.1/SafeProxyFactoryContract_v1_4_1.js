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
 * SafeProxyFactoryContract_v1_4_1  is the implementation specific to the Safe Proxy Factory contract version 1.4.1.
 *
 * This class specializes in handling interactions with the Safe Proxy Factory contract version 1.4.1 using Ethers.js v6.
 *
 * @extends SafeProxyFactoryBaseContract<SafeProxyFactoryContract_v1_4_1_Abi> - Inherits from SafeProxyFactoryBaseContract with ABI specific to Safe Proxy Factory contract version 1.4.1.
 * @implements SafeProxyFactoryContract_v1_4_1_Contract - Implements the interface specific to Safe Proxy Factory contract version 1.4.1.
 */
class SafeProxyFactoryContract_v1_4_1 extends SafeProxyFactoryBaseContract_1.default {
  /**
   * Constructs an instance of SafeProxyFactoryContract_v1_4_1
   *
   * @param chainId - The chain ID where the contract resides.
   * @param safeProvider - An instance of SafeProvider.
   * @param customContractAddress - Optional custom address for the contract. If not provided, the address is derived from the Safe deployments based on the chainId and safeVersion.
   * @param customContractAbi - Optional custom ABI for the contract. If not provided, the default ABI for version 1.4.1 is used.
   * @param deploymentType - Optional deployment type for the contract. If not provided, the first deployment retrieved from the safe-deployments array will be used.
   */
  constructor(chainId, safeProvider, customContractAddress, customContractAbi, deploymentType) {
    const safeVersion = '1.4.1'
    const defaultAbi = types_kit_1.safeProxyFactory_1_4_1_ContractArtifacts.abi
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
     * Returns the ID of the chain the contract is currently deployed on.
     * @returns Array[chainId]
     */
    this.getChainId = async () => {
      return [await this.read('getChainId')]
    }
    /**
     * Allows to retrieve the creation code used for the Proxy deployment. With this it is easily possible to calculate predicted address.
     * @returns Array[creationCode]
     */
    this.proxyCreationCode = async () => {
      return [await this.read('proxyCreationCode')]
    }
    /**
     * Deploys a new chain-specific proxy with singleton and salt. Optionally executes an initializer call to a new proxy.
     * @param args - Array[singleton, initializer, saltNonce]
     * @returns Array[proxy]
     */
    this.createChainSpecificProxyWithNonce = async (args) => {
      return [await this.write('createChainSpecificProxyWithNonce', args)]
    }
    /**
     * Deploy a new proxy with singleton and salt.
     * Optionally executes an initializer call to a new proxy and calls a specified callback address.
     * @param args - Array[singleton, initializer, saltNonce, callback]
     * @returns Array[proxy]
     */
    this.createProxyWithCallback = async (args) => {
      return [await this.write('createProxyWithCallback', args)]
    }
    /**
     * Deploys a new proxy with singleton and salt. Optionally executes an initializer call to a new proxy.
     * @param args - Array[singleton, initializer, saltNonce]
     * @returns Array[proxy]
     */
    this.createProxyWithNonce = async (args) => {
      return [await this.write('createProxyWithNonce', args)]
    }
  }
}
exports.default = SafeProxyFactoryContract_v1_4_1
//# sourceMappingURL=SafeProxyFactoryContract_v1_4_1.js.map
