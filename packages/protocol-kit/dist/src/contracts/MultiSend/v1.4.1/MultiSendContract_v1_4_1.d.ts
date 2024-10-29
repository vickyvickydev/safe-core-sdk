import MultiSendBaseContract from '../../../contracts/MultiSend/MultiSendBaseContract'
import SafeProvider from '../../../SafeProvider'
import { DeploymentType } from '../../../types'
import {
  MultiSendContract_v1_4_1_Abi,
  MultiSendContract_v1_4_1_Contract
} from '@safe-global/types-kit'
/**
 * MultiSendContract_v1_4_1  is the implementation specific to the MultiSend contract version 1.4.1.
 *
 * This class specializes in handling interactions with the MultiSend contract version 1.4.1 using Ethers.js v6.
 *
 * @extends MultiSendBaseContract<MultiSendContract_v1_4_1_Abi> - Inherits from MultiSendBaseContract with ABI specific to MultiSend contract version 1.4.1.
 * @implements MultiSendContract_v1_4_1_Contract - Implements the interface specific to MultiSend contract version 1.4.1.
 */
declare class MultiSendContract_v1_4_1
  extends MultiSendBaseContract<MultiSendContract_v1_4_1_Abi>
  implements MultiSendContract_v1_4_1_Contract
{
  /**
   * Constructs an instance of MultiSendContract_v1_4_1
   *
   * @param chainId - The chain ID where the contract resides.
   * @param safeProvider - An instance of SafeProvider.
   * @param customContractAddress - Optional custom address for the contract. If not provided, the address is derived from the MultiSend deployments based on the chainId and safeVersion.
   * @param customContractAbi - Optional custom ABI for the contract. If not provided, the default ABI for version 1.4.1 is used.
   * @param deploymentType - Optional deployment type for the contract. If not provided, the first deployment retrieved from the safe-deployments array will be used.
   */
  constructor(
    chainId: bigint,
    safeProvider: SafeProvider,
    customContractAddress?: string,
    customContractAbi?: MultiSendContract_v1_4_1_Abi,
    deploymentType?: DeploymentType
  )
}
export default MultiSendContract_v1_4_1
