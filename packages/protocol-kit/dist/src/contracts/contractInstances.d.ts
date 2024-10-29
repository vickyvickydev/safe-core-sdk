import { JsonFragment, AbstractSigner, Provider } from 'ethers'
import { SafeVersion } from '@safe-global/safe-core-sdk-types'
import CreateCallContract_v1_3_0 from './CreateCall/v1.3.0/CreateCallContract_v1_3_0'
import CreateCallContract_v1_4_1 from './CreateCall/v1.4.1/CreateCallContract_v1_4_1'
import MultiSendContract_v1_1_1 from './MultiSend/v1.1.1/MultiSendContract_v1_1_1'
import MultiSendContract_v1_3_0 from './MultiSend/v1.3.0/MultiSendContract_v1_3_0'
import MultiSendContract_v1_4_1 from './MultiSend/v1.4.1/MultiSendContract_v1_4_1'
import MultiSendCallOnlyContract_v1_3_0 from './MultiSend/v1.3.0/MultiSendCallOnlyContract_v1_3_0'
import MultiSendCallOnlyContract_v1_4_1 from './MultiSend/v1.4.1/MultiSendCallOnlyContract_v1_4_1'
import SignMessageLibContract_v1_3_0 from './SignMessageLib/v1.3.0/SignMessageLibContract_v1_3_0'
import SignMessageLibContract_v1_4_1 from './SignMessageLib/v1.4.1/SignMessageLibContract_v1_4_1'
import SafeContract_v1_0_0 from './Safe/v1.0.0/SafeContract_v1_0_0'
import SafeContract_v1_1_1 from './Safe/v1.1.1/SafeContract_v1_1_1'
import SafeContract_v1_2_0 from './Safe/v1.2.0/SafeContract_v1_2_0'
import SafeContract_v1_3_0 from './Safe/v1.3.0/SafeContract_v1_3_0'
import SafeContract_v1_4_1 from './Safe/v1.4.1/SafeContract_v1_4_1'
import SafeProxyFactoryContract_v1_0_0 from './SafeProxyFactory/v1.0.0/SafeProxyFactoryContract_v1_0_0'
import SafeProxyFactoryContract_v1_1_1 from './SafeProxyFactory/v1.1.1/SafeProxyFactoryContract_v1_1_1'
import SafeProxyFactoryContract_v1_3_0 from './SafeProxyFactory/v1.3.0/SafeProxyFactoryContract_v1_3_0'
import SafeProxyFactoryContract_v1_4_1 from './SafeProxyFactory/v1.4.1/SafeProxyFactoryContract_v1_4_1'
import SimulateTxAccessorContract_v1_3_0 from './SimulateTxAccessor/v1.3.0/SimulateTxAccessorContract_v1_3_0'
import SimulateTxAccessorContract_v1_4_1 from './SimulateTxAccessor/v1.4.1/SimulateTxAccessorContract_v1_4_1'
import CompatibilityFallbackHandlerContract_v1_3_0 from './CompatibilityFallbackHandler/v1.3.0/CompatibilityFallbackHandlerContract_v1_3_0'
import CompatibilityFallbackHandlerContract_v1_4_1 from './CompatibilityFallbackHandler/v1.4.1/CompatibilityFallbackHandlerContract_v1_4_1'
import SafeWebAuthnSignerFactoryContract_v0_2_1 from './SafeWebAuthnSignerFactory/v0.2.1/SafeWebAuthnSignerFactoryContract_v0_2_1'
import SafeWebAuthnSharedSignerContract_v0_2_1 from './SafeWebAuthnSharedSigner/v0.2.1/SafeWebAuthnSharedSignerContract_v0_2_1'
import SafeProvider from '../SafeProvider'
export declare function getSafeContractInstance(
  safeVersion: SafeVersion,
  safeProvider: SafeProvider,
  contractAddress?: string,
  customContractAbi?: JsonFragment | JsonFragment[] | undefined,
  isL1SafeSingleton?: boolean
): Promise<
  | SafeContract_v1_4_1
  | SafeContract_v1_3_0
  | SafeContract_v1_2_0
  | SafeContract_v1_1_1
  | SafeContract_v1_0_0
>
export declare function getCompatibilityFallbackHandlerContractInstance(
  safeVersion: SafeVersion,
  safeProvider: SafeProvider,
  contractAddress?: string,
  customContractAbi?: JsonFragment | JsonFragment[] | undefined
): Promise<
  CompatibilityFallbackHandlerContract_v1_4_1 | CompatibilityFallbackHandlerContract_v1_3_0
>
export declare function getMultiSendContractInstance(
  safeVersion: SafeVersion,
  safeProvider: SafeProvider,
  contractAddress?: string,
  customContractAbi?: JsonFragment | JsonFragment[] | undefined
): Promise<MultiSendContract_v1_4_1 | MultiSendContract_v1_3_0 | MultiSendContract_v1_1_1>
export declare function getMultiSendCallOnlyContractInstance(
  safeVersion: SafeVersion,
  safeProvider: SafeProvider,
  contractAddress?: string,
  customContractAbi?: JsonFragment | JsonFragment[] | undefined
): Promise<MultiSendCallOnlyContract_v1_4_1 | MultiSendCallOnlyContract_v1_3_0>
export declare function getSafeProxyFactoryContractInstance(
  safeVersion: SafeVersion,
  safeProvider: SafeProvider,
  signerOrProvider: AbstractSigner | Provider,
  contractAddress?: string,
  customContractAbi?: JsonFragment | JsonFragment[] | undefined
): Promise<
  | SafeProxyFactoryContract_v1_4_1
  | SafeProxyFactoryContract_v1_3_0
  | SafeProxyFactoryContract_v1_1_1
  | SafeProxyFactoryContract_v1_0_0
>
export declare function getSignMessageLibContractInstance(
  safeVersion: SafeVersion,
  safeProvider: SafeProvider,
  contractAddress?: string,
  customContractAbi?: JsonFragment | JsonFragment[] | undefined
): Promise<SignMessageLibContract_v1_4_1 | SignMessageLibContract_v1_3_0>
export declare function getCreateCallContractInstance(
  safeVersion: SafeVersion,
  safeProvider: SafeProvider,
  contractAddress?: string,
  customContractAbi?: JsonFragment | JsonFragment[] | undefined
): Promise<CreateCallContract_v1_4_1 | CreateCallContract_v1_3_0>
export declare function getSimulateTxAccessorContractInstance(
  safeVersion: SafeVersion,
  safeProvider: SafeProvider,
  contractAddress?: string,
  customContractAbi?: JsonFragment | JsonFragment[] | undefined
): Promise<SimulateTxAccessorContract_v1_4_1 | SimulateTxAccessorContract_v1_3_0>
export declare function getSafeWebAuthnSignerFactoryContractInstance(
  safeVersion: SafeVersion,
  safeProvider: SafeProvider,
  contractAddress?: string,
  customContractAbi?: JsonFragment | JsonFragment[] | undefined
): Promise<SafeWebAuthnSignerFactoryContract_v0_2_1>
export declare function getSafeWebAuthnSharedSignerContractInstance(
  safeVersion: SafeVersion,
  safeProvider: SafeProvider,
  contractAddress?: string,
  customContractAbi?: JsonFragment | JsonFragment[] | undefined
): Promise<SafeWebAuthnSharedSignerContract_v0_2_1>
