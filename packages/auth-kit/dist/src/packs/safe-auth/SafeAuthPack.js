'use strict'
var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === 'm') throw new TypeError('Private method is not writable')
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter')
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError('Cannot write private member to an object whose class did not declare it')
    return (
      kind === 'a' ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value),
      value
    )
  }
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter')
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError(
        'Cannot read private member from an object whose class did not declare it'
      )
    return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver)
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
var _SafeAuthPack_provider, _SafeAuthPack_config
Object.defineProperty(exports, '__esModule', { value: true })
exports.SafeAuthPack = void 0
const safeauth_embed_1 = __importDefault(require('@web3auth/safeauth-embed'))
const errors_1 = require('../../lib/errors')
const AuthKitBasePack_1 = require('../../AuthKitBasePack')
const constants_1 = require('./constants')
const SAFE_WALLET_SERVICES_URL = 'https://safe.web3auth.com'
const WS_EMBED_NOT_INITIALIZED = 'SafeEmbed SDK is not initialized'
/**
 * SafeAuthPack uses the Web3Auth services to get a signer address across different dApps
 * @class
 */
class SafeAuthPack extends AuthKitBasePack_1.AuthKitBasePack {
  /**
   * Instantiate the SafeAuthPack
   * @param config SafeAuth config
   */
  constructor(config) {
    super()
    _SafeAuthPack_provider.set(this, void 0)
    _SafeAuthPack_config.set(this, void 0)
    __classPrivateFieldSet(this, _SafeAuthPack_config, config, 'f')
    __classPrivateFieldSet(this, _SafeAuthPack_provider, null, 'f')
  }
  /**
   * Check if the user is authenticated
   * Checking the communication provider for this information
   */
  get isAuthenticated() {
    return this.safeAuthEmbed.communicationProvider.isLoggedIn
  }
  /**
   * Initialize the SafeAuthPack
   * @param options The options to initialize the SafeAuthPack
   * @throws Error if there was an error initializing the Web3Auth WsEmbed
   */
  async init(options) {
    try {
      this.safeAuthEmbed = new safeauth_embed_1.default()
      const chainConfig = options.chainConfig && {
        ...constants_1.CHAIN_CONFIG[options.chainConfig.chainId],
        chainId: options.chainConfig?.chainId,
        rpcTarget: options.chainConfig?.rpcTarget
      }
      await this.safeAuthEmbed.init({
        ...options,
        chainConfig,
        walletUrls: {
          production: { url: SAFE_WALLET_SERVICES_URL, logLevel: 'error' }
        }
      })
      __classPrivateFieldSet(this, _SafeAuthPack_provider, this.safeAuthEmbed.provider, 'f')
    } catch (e) {
      throw new Error((0, errors_1.getErrorMessage)(e))
    }
  }
  /**
   * Connect to the Web3Auth services and login
   * @param options The options to connect to the Web3Auth services
   * When loginProvider is specified the native provider authentication will be used instead the provider selector UI modal
   * @returns An AuthKitSignInData object with the signer address and the associated safes
   */
  async signIn(options) {
    if (!this.safeAuthEmbed) {
      throw new Error(WS_EMBED_NOT_INITIALIZED)
    }
    await this.safeAuthEmbed.login(options)
    __classPrivateFieldSet(this, _SafeAuthPack_provider, this.safeAuthEmbed.provider, 'f')
    const eoa = await this.getAddress()
    const safes = await this.getSafes(
      __classPrivateFieldGet(this, _SafeAuthPack_config, 'f')?.txServiceUrl
    )
    return { eoa, safes }
  }
  /**
   * Get the provider returned by the Web3Auth WsEmbed
   * @returns A EIP-1193 compatible provider. Can be wrapped with ethers or web3
   */
  getProvider() {
    return __classPrivateFieldGet(this, _SafeAuthPack_provider, 'f')
  }
  /**
   * Disconnect from the Web3Auth services and logout
   * Use reset parameter to true when you want to remove completely the iframe.
   * When this is false you can logout and login again without the need to refresh the page.
   * You need to re-instantiate the pack if you reset completely it
   * @param options The options to disconnect from the Web3Auth services
   */
  async signOut(options) {
    if (!this.safeAuthEmbed) {
      throw new Error(WS_EMBED_NOT_INITIALIZED)
    }
    __classPrivateFieldSet(this, _SafeAuthPack_provider, null, 'f')
    if (options?.reset) {
      await this.safeAuthEmbed.cleanUp()
    } else {
      await this.safeAuthEmbed.logout()
    }
  }
  /**
   * Get user information. Use it after authentication
   * @returns The specific user information coming from the oAuth or email provider
   * @throws Error if there was an error initializing the Web3Auth WsEmbed
   */
  async getUserInfo() {
    if (!this.safeAuthEmbed) {
      throw new Error(WS_EMBED_NOT_INITIALIZED)
    }
    const userInfo = this.safeAuthEmbed.getUserInfo()
    return userInfo
  }
  /**
   * Remove the Web3Auth WsEmbed iframe from the DOM. Useful if you need to re-instantiate the pack
   * with an alternative configuration
   */
  destroy() {
    this.safeAuthEmbed.clearInit()
  }
  /**
   * Subscribe to events (accountsChanged, chainChanged)
   * You can use the accountsChanged event to check the accounts and
   * as an indicator that a first authentication happened, so if the page
   * is refreshed you can call the signIn method immediately
   * @param event The event you want to subscribe to
   * @param handler The event handler
   */
  subscribe(event, handler) {
    const provider = this.getProvider()
    provider.on(event, handler)
  }
  /**
   * Unsubscribe from events
   * @param event The event you want to unsubscribe from
   * @param handler The event handler
   */
  unsubscribe(event, handler) {
    const provider = this.getProvider()
    provider.off(event, handler)
  }
}
exports.SafeAuthPack = SafeAuthPack
;(_SafeAuthPack_provider = new WeakMap()), (_SafeAuthPack_config = new WeakMap())
//# sourceMappingURL=SafeAuthPack.js.map
