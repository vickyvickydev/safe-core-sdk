import { SafeVersion } from '@safe-global/safe-core-sdk-types'

export const DEFAULT_SAFE_VERSION: SafeVersion = '1.3.0'
export const SAFE_BASE_VERSION: SafeVersion = '1.0.0'

type SafeDeploymentsVersions = {
  [version: string]: {
    safeSingletonVersion: string
    safeSingletonL2Version?: string
    safeProxyFactoryVersion: string
    compatibilityFallbackHandler: string
    multiSendVersion: string
    multiSendCallOnlyVersion?: string
    signMessageLibVersion?: string
    createCallVersion?: string
  }
}

export const safeDeploymentsVersions: SafeDeploymentsVersions = {
  '1.4.1': {
    safeSingletonVersion: '1.4.1',
    safeSingletonL2Version: '1.4.1',
    safeProxyFactoryVersion: '1.4.1',
    compatibilityFallbackHandler: '1.4.1',
    multiSendVersion: '1.4.1',
    multiSendCallOnlyVersion: '1.4.1',
    signMessageLibVersion: '1.4.1',
    createCallVersion: '1.4.1'
  },
  '1.3.0': {
    safeSingletonVersion: '1.3.0',
    safeSingletonL2Version: '1.3.0',
    safeProxyFactoryVersion: '1.3.0',
    compatibilityFallbackHandler: '1.3.0',
    multiSendVersion: '1.3.0',
    multiSendCallOnlyVersion: '1.3.0',
    signMessageLibVersion: '1.3.0',
    createCallVersion: '1.3.0'
  },
  '1.2.0': {
    safeSingletonVersion: '1.2.0',
    safeSingletonL2Version: undefined,
    safeProxyFactoryVersion: '1.1.1',
    compatibilityFallbackHandler: '1.3.0',
    multiSendVersion: '1.1.1',
    multiSendCallOnlyVersion: '1.3.0',
    signMessageLibVersion: '1.3.0',
    createCallVersion: '1.3.0'
  },
  '1.1.1': {
    safeSingletonVersion: '1.1.1',
    safeSingletonL2Version: undefined,
    safeProxyFactoryVersion: '1.1.1',
    compatibilityFallbackHandler: '1.3.0',
    multiSendVersion: '1.1.1',
    multiSendCallOnlyVersion: '1.3.0',
    signMessageLibVersion: '1.3.0',
    createCallVersion: '1.3.0'
  },
  '1.0.0': {
    safeSingletonVersion: '1.0.0',
    safeSingletonL2Version: undefined,
    safeProxyFactoryVersion: '1.0.0',
    compatibilityFallbackHandler: '1.3.0',
    multiSendVersion: '1.1.1',
    multiSendCallOnlyVersion: '1.3.0',
    signMessageLibVersion: '1.3.0',
    createCallVersion: '1.3.0'
  }
}

export const safeDeploymentsL1ChainIds = [
  1n // Ethereum Mainnet
]
