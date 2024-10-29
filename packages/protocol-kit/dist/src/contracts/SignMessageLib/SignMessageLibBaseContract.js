'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const BaseContract_1 = __importDefault(require('../../contracts/BaseContract'))
/**
 * Abstract class  SignMessageLibBaseContract extends BaseContract to specifically integrate with the SignMessageLib contract.
 * It is designed to be instantiated for different versions of the SignMessageLib contract.
 *
 * Subclasses of  SignMessageLibBaseContract are expected to represent specific versions of the SignMessageLib contract.
 *
 * @template SignMessageLibContractAbiType - The ABI type specific to the version of the SignMessageLib contract, extending InterfaceAbi from Ethers.
 * @extends BaseContract<SignMessageLibContractAbiType> - Extends the generic BaseContract.
 *
 * Example subclasses:
 * - SignMessageLibContract_v1_4_1  extends  SignMessageLibBaseContract<SignMessageLibContract_v1_4_1_Abi>
 * - SignMessageLibContract_v1_3_0  extends  SignMessageLibBaseContract<SignMessageLibContract_v1_3_0_Abi>
 */
class SignMessageLibBaseContract extends BaseContract_1.default {
  /**
   * @constructor
   * Constructs an instance of  SignMessageLibBaseContract.
   *
   * @param chainId - The chain ID of the contract.
   * @param safeProvider - An instance of SafeProvider.
   * @param defaultAbi - The default ABI for the SignMessageLib contract. It should be compatible with the specific version of the SignMessageLib contract.
   * @param safeVersion - The version of the SignMessageLib contract.
   * @param customContractAddress - Optional custom address for the contract. If not provided, the address is derived from the SignMessageLib deployments based on the chainId and safeVersion.
   * @param customContractAbi - Optional custom ABI for the contract. If not provided, the ABI is derived from the SignMessageLib deployments or the defaultAbi is used.
   * @param deploymentType - Optional deployment type for the contract. If not provided, the first deployment retrieved from the safe-deployments array will be used.
   */
  constructor(
    chainId,
    safeProvider,
    defaultAbi,
    safeVersion,
    customContractAddress,
    customContractAbi,
    deploymentType
  ) {
    const contractName = 'signMessageLibVersion'
    super(
      contractName,
      chainId,
      safeProvider,
      defaultAbi,
      safeVersion,
      customContractAddress,
      customContractAbi,
      deploymentType
    )
    this.contractName = contractName
  }
}
exports.default = SignMessageLibBaseContract
//# sourceMappingURL=SignMessageLibBaseContract.js.map
