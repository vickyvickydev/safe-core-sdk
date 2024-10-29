import { Abi } from 'abitype'
import SafeProvider from '../../SafeProvider'
import { SafeVersion } from '@safe-global/types-kit'
import BaseContract from '../../contracts/BaseContract'
import { contractName } from '../../contracts/config'
import { DeploymentType } from '../../types'
/**
 * Abstract class SafeBaseContract extends BaseContract to specifically integrate with the Safe contract.
 * It is designed to be instantiated for different versions of the Safe contract.
 *
 * Subclasses of SafeBaseContract are expected to represent specific versions of the Safe contract.
 *
 * @template SafeContractAbiType - The ABI type specific to the version of the Safe contract, extending InterfaceAbi from Ethers.
 * @extends BaseContract<SafeContractAbiType> - Extends the generic BaseContract.
 *
 * Example subclasses:
 * - SafeContract_v1_4_1  extends SafeBaseContract<SafeContract_v1_4_1_Abi>
 * - SafeContract_v1_3_0  extends SafeBaseContract<SafeContract_v1_3_0_Abi>
 * - SafeContract_v1_2_0  extends SafeBaseContract<SafeContract_v1_2_0_Abi>
 * - SafeContract_v1_1_1  extends SafeBaseContract<SafeContract_v1_1_1_Abi>
 * - SafeContract_v1_0_0  extends SafeBaseContract<SafeContract_v1_0_0_Abi>
 */
declare abstract class SafeBaseContract<
  SafeContractAbiType extends Abi
> extends BaseContract<SafeContractAbiType> {
  contractName: contractName
  /**
   * @constructor
   * Constructs an instance of SafeBaseContract.
   *
   * @param chainId - The chain ID of the contract.
   * @param safeProvider - An instance of SafeProvider.
   * @param defaultAbi - The default ABI for the Safe contract. It should be compatible with the specific version of the Safe contract.
   * @param safeVersion - The version of the Safe contract.
   * @param isL1SafeSingleton - A flag indicating if the contract is a L1 Safe Singleton.
   * @param customContractAddress - Optional custom address for the contract. If not provided, the address is derived from the Safe deployments based on the chainId and safeVersion.
   * @param customContractAbi - Optional custom ABI for the contract. If not provided, the ABI is derived from the Safe deployments or the defaultAbi is used.
   * @param deploymentType - Optional deployment type for the contract. If not provided, the first deployment retrieved from the safe-deployments array will be used.
   */
  constructor(
    chainId: bigint,
    safeProvider: SafeProvider,
    defaultAbi: SafeContractAbiType,
    safeVersion: SafeVersion,
    isL1SafeSingleton?: boolean,
    customContractAddress?: string,
    customContractAbi?: SafeContractAbiType,
    deploymentType?: DeploymentType
  )
}
export default SafeBaseContract
