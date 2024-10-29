'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const SafeWebAuthnSignerFactoryBaseContract_1 = __importDefault(
  require('../../../contracts/SafeWebAuthnSignerFactory/SafeWebAuthnSignerFactoryBaseContract')
)
const safe_core_sdk_types_1 = require('@safe-global/safe-core-sdk-types')
/**
 * SafeWebAuthnSignerFactoryContract_v0_2_1  is the implementation specific to the SafeWebAuthnSigner Factory contract version 0.2.1.
 *
 * This class specializes in handling interactions with the SafeWebAuthnSigner Factory contract version 0.2.1 using Ethers.js v6.
 *
 * @extends SafeWebAuthnSignerFactoryBaseContract<SafeWebAuthnSignerFactoryContract_v0_2_1_Abi> - Inherits from SafeWebAuthnSignerFactoryBaseContract with ABI specific to SafeWebAuthnSigner Factory contract version 0.2.1.
 * @implements SafeWebAuthnSignerFactoryContract_v0_2_1_Contract - Implements the interface specific to SafeWebAuthnSigner Factory contract version 0.2.1.
 */
class SafeWebAuthnSignerFactoryContract_v0_2_1 extends SafeWebAuthnSignerFactoryBaseContract_1.default {
  /**
   * Constructs an instance of SafeWebAuthnSignerFactoryContract_v0_2_1
   *
   * @param chainId - The chain ID where the contract resides.
   * @param safeProvider - An instance of SafeProvider.
   * @param safeVersion - The version of the Safe contract.
   * @param customContractAddress - Optional custom address for the contract. If not provided, the address is derived from the Safe deployments based on the chainId and safeVersion.
   * @param customContractAbi - Optional custom ABI for the contract. If not provided, the default ABI for version 0.2.1 is used.
   */
  constructor(chainId, safeProvider, safeVersion, customContractAddress, customContractAbi) {
    const defaultAbi = safe_core_sdk_types_1.SafeWebAuthnSignerFactory_0_2_1_ContractArtifacts.abi
    super(chainId, safeProvider, defaultAbi, safeVersion, customContractAddress, customContractAbi)
    /**
     * Returns the address of the Signer.
     * @param args - Array[x, y, verifiers]
     * @returns Array[signer]
     */
    this.getSigner = async (args) => {
      return [await this.contract.getSigner(...args)]
    }
    /**
     * Returns the address of the Signer and deploy the signer contract if its not deployed yet.
     * @param args - Array[x, y, verifiers]
     * @returns Array[signer]
     */
    this.createSigner = async (args) => {
      return [await this.contract.createSigner(...args)]
    }
    this.isValidSignatureForSigner = async (args) => {
      return [await this.contract.isValidSignatureForSigner(...args)]
    }
    this.safeVersion = safeVersion
  }
}
exports.default = SafeWebAuthnSignerFactoryContract_v0_2_1
//# sourceMappingURL=SafeWebAuthnSignerFactoryContract_v0_2_1.js.map
