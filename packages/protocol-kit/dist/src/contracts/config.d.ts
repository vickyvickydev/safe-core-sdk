import { SingletonDeployment } from '@safe-global/safe-deployments'
import { SafeVersion } from '@safe-global/safe-core-sdk-types'
export declare const DEFAULT_SAFE_VERSION: SafeVersion
export declare const SAFE_BASE_VERSION: SafeVersion
type contractNames = {
  safeSingletonVersion: string
  safeSingletonL2Version?: string
  safeProxyFactoryVersion: string
  compatibilityFallbackHandler: string
  multiSendVersion: string
  multiSendCallOnlyVersion?: string
  signMessageLibVersion?: string
  createCallVersion?: string
  simulateTxAccessorVersion?: string
  safeWebAuthnSignerFactoryVersion?: string
  safeWebAuthnSharedSignerVersion?: string
}
type SafeDeploymentsVersions = Record<SafeVersion, contractNames>
export type contractName = keyof contractNames
export declare const safeDeploymentsVersions: SafeDeploymentsVersions
export declare const safeDeploymentsL1ChainIds: bigint[]
export declare function getContractDeployment(
  safeVersion: SafeVersion,
  chainId: bigint,
  contractName: contractName
): SingletonDeployment
export {}
