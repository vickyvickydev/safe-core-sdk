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
var _MoneriumPack_instances,
  _MoneriumPack_config,
  _MoneriumPack_startAuthFlow,
  _MoneriumPack_addAccountIfNotLinked
Object.defineProperty(exports, '__esModule', { value: true })
exports.MoneriumPack = void 0
const sdk_1 = require('@monerium/sdk')
const errors_1 = require('../../lib/errors')
const OnRampKitBasePack_1 = require('../../OnRampKitBasePack')
const SafeMoneriumClient_1 = require('./SafeMoneriumClient')
const SIGNATURE_MESSAGE = sdk_1.constants.LINK_MESSAGE
/**
 * This class extends the OnRampKitBasePack to work with the Monerium platform
 * @class MoneriumPack
 */
class MoneriumPack extends OnRampKitBasePack_1.OnRampKitBasePack {
  /**
   * The constructor of the MoneriumPack
   * @constructor
   * @param config The configuration object for the Monerium provider
   */
  constructor(config) {
    super()
    _MoneriumPack_instances.add(this)
    _MoneriumPack_config.set(this, void 0)
    __classPrivateFieldSet(this, _MoneriumPack_config, config, 'f')
  }
  /**
   * Initializes the SafeMoneriumClient
   * @param options The MoneriumInitOptions object
   * @throws {Error} If the Monerium client is not initialized
   */
  async init(options) {
    if (!options?.protocolKit) {
      throw new Error('You need to provide an instance of the protocol kit')
    }
    this.client = new SafeMoneriumClient_1.SafeMoneriumClient(
      {
        environment: __classPrivateFieldGet(this, _MoneriumPack_config, 'f').environment,
        clientId: __classPrivateFieldGet(this, _MoneriumPack_config, 'f').clientId,
        redirectUrl: __classPrivateFieldGet(this, _MoneriumPack_config, 'f').redirectUrl
      },
      options.protocolKit
    )
  }
  /**
   * This method initialize the flow with Monerium in order to gain access to the resources
   * using the access_token. Return a initialized {@link SafeMoneriumClient}
   * @param {MoneriumOpenOptions} [options] The MoneriumOpenOptions object
   * @returns A {@link SafeMoneriumClient} instance
   */
  async open(options) {
    if (!this.client) {
      throw new Error('Monerium client not initialized')
    }
    try {
      const safeAddress = await this.client.getSafeAddress()
      const isAuthorized = await this.client.getAccess()
      if (isAuthorized) {
        await __classPrivateFieldGet(
          this,
          _MoneriumPack_instances,
          'm',
          _MoneriumPack_addAccountIfNotLinked
        ).call(this, safeAddress)
      } else if (options?.initiateAuthFlow) {
        await __classPrivateFieldGet(
          this,
          _MoneriumPack_instances,
          'm',
          _MoneriumPack_startAuthFlow
        ).call(this, safeAddress)
      }
      // When the user is authenticated, we connect to the order notifications socket in case
      // the user has subscribed to any event
      await this.client.connectOrderSocket()
      return this.client
    } catch (error) {
      throw new Error((0, errors_1.getErrorMessage)(error))
    }
  }
  /**
   * Close the flow and clean up
   */
  async close() {
    this.client?.revokeAccess()
  }
  /**
   * Subscribe to MoneriumEvent to receive notifications using the Monerium API (WebSocket)
   * We are setting a subscription map because we need the user to have a token to start the WebSocket connection
   * {@link https://monerium.dev/api-docs#operation/profile-orders-notifications}
   * @param event The event to subscribe to
   * @param handler The handler to be called when the event is triggered
   */
  subscribe(event, handler) {
    this.client?.subscribeOrders(event, handler)
  }
  /**
   * Unsubscribe from MoneriumEvent and close the socket if there are no more subscriptions
   * @param event The event to unsubscribe from
   */
  unsubscribe(event) {
    this.client?.unsubscribeOrders(event)
  }
}
exports.MoneriumPack = MoneriumPack
;(_MoneriumPack_config = new WeakMap()),
  (_MoneriumPack_instances = new WeakSet()),
  (_MoneriumPack_startAuthFlow =
    /**
     * This private method starts the authorization code flow
     * {@link https://monerium.dev/docs/getting-started/auth-flow}
     * @param safeAddress The address of the Safe
     * @param redirectUrl The redirect url from the Monerium UI
     */
    async function _MoneriumPack_startAuthFlow(safeAddress) {
      if (!this.client) return
      // Check if the user has already signed the message
      if (safeAddress) {
        // Check if the Safe has a completed transaction with the signature message
        const isSigned = await this.client.isMessageSigned(safeAddress, SIGNATURE_MESSAGE)
        if (!isSigned) {
          // Check if the Safe has a pending transaction with the signature message
          const isPending = await this.client.isSignMessagePending(safeAddress, SIGNATURE_MESSAGE)
          if (!isPending) {
            await this.client.signMessage(safeAddress, SIGNATURE_MESSAGE)
          }
        }
      }
      await this.client.authorize({
        address: safeAddress,
        signature: '0x',
        chainId: await this.client.getChainId()
      })
    }),
  (_MoneriumPack_addAccountIfNotLinked =
    /**
     * Add an address to the Monerium account if it is not already linked
     * @param safeAddress The address of the Safe
     */
    async function _MoneriumPack_addAccountIfNotLinked(safeAddress) {
      if (!this.client) return
      const authContext = await this.client.getAuthContext()
      if (!authContext) return
      const profile = await this.client.getProfile(authContext.defaultProfile)
      if (profile) {
        const isSafeAddressLinked = profile.accounts.some(
          (account) => account.address.toLowerCase() === safeAddress.toLowerCase()
        )
        if (!isSafeAddressLinked) {
          await this.client.linkAddress(authContext.defaultProfile, {
            address: safeAddress,
            message: SIGNATURE_MESSAGE,
            signature: '0x',
            chainId: await this.client.getChainId(),
            accounts: [
              {
                chainId: await this.client.getChainId(),
                currency: sdk_1.Currency.eur
              }
            ]
          })
        }
      }
    })
//# sourceMappingURL=MoneriumPack.js.map
