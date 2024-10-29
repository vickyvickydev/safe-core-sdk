import { Eip1193Provider } from 'ethers'
import SafeAuthEmbed from '@web3auth/safeauth-embed'
import { AuthKitBasePack } from '../../AuthKitBasePack'
import {
  SafeAuthConfig,
  SafeAuthEvent,
  SafeAuthEventListener,
  SafeAuthInitOptions,
  SafeAuthSignInOptions,
  SafeAuthSignOutOptions,
  SafeAuthUserInfo
} from './types'
import type { AuthKitSignInData } from '../../types'
/**
 * SafeAuthPack uses the Web3Auth services to get a signer address across different dApps
 * @class
 */
export declare class SafeAuthPack extends AuthKitBasePack {
  #private
  safeAuthEmbed: SafeAuthEmbed
  /**
   * Instantiate the SafeAuthPack
   * @param config SafeAuth config
   */
  constructor(config?: SafeAuthConfig)
  /**
   * Check if the user is authenticated
   * Checking the communication provider for this information
   */
  get isAuthenticated(): boolean
  /**
   * Initialize the SafeAuthPack
   * @param options The options to initialize the SafeAuthPack
   * @throws Error if there was an error initializing the Web3Auth WsEmbed
   */
  init(options: SafeAuthInitOptions): Promise<void>
  /**
   * Connect to the Web3Auth services and login
   * @param options The options to connect to the Web3Auth services
   * When loginProvider is specified the native provider authentication will be used instead the provider selector UI modal
   * @returns An AuthKitSignInData object with the signer address and the associated safes
   */
  signIn(options?: SafeAuthSignInOptions): Promise<AuthKitSignInData>
  /**
   * Get the provider returned by the Web3Auth WsEmbed
   * @returns A EIP-1193 compatible provider. Can be wrapped with ethers or web3
   */
  getProvider(): Eip1193Provider | null
  /**
   * Disconnect from the Web3Auth services and logout
   * Use reset parameter to true when you want to remove completely the iframe.
   * When this is false you can logout and login again without the need to refresh the page.
   * You need to re-instantiate the pack if you reset completely it
   * @param options The options to disconnect from the Web3Auth services
   */
  signOut(options?: SafeAuthSignOutOptions): Promise<void>
  /**
   * Get user information. Use it after authentication
   * @returns The specific user information coming from the oAuth or email provider
   * @throws Error if there was an error initializing the Web3Auth WsEmbed
   */
  getUserInfo(): Promise<SafeAuthUserInfo>
  /**
   * Remove the Web3Auth WsEmbed iframe from the DOM. Useful if you need to re-instantiate the pack
   * with an alternative configuration
   */
  destroy(): void
  /**
   * Subscribe to events (accountsChanged, chainChanged)
   * You can use the accountsChanged event to check the accounts and
   * as an indicator that a first authentication happened, so if the page
   * is refreshed you can call the signIn method immediately
   * @param event The event you want to subscribe to
   * @param handler The event handler
   */
  subscribe(event: SafeAuthEvent, handler: SafeAuthEventListener): void
  /**
   * Unsubscribe from events
   * @param event The event you want to unsubscribe from
   * @param handler The event handler
   */
  unsubscribe(event: SafeAuthEvent, handler: SafeAuthEventListener): void
}
