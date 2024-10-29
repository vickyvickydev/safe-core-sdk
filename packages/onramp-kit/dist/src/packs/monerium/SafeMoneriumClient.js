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
var _SafeMoneriumClient_instances,
  _SafeMoneriumClient_protocolKit,
  _SafeMoneriumClient_safeProvider,
  _SafeMoneriumClient_isValidSignature,
  _SafeMoneriumClient_createOrder
Object.defineProperty(exports, '__esModule', { value: true })
exports.SafeMoneriumClient = void 0
const ethers_1 = require('ethers')
const sdk_1 = require('@monerium/sdk')
const protocol_kit_1 = require('@safe-global/protocol-kit')
const api_kit_1 = __importDefault(require('@safe-global/api-kit'))
const errors_1 = require('../../lib/errors')
const safe_core_sdk_types_1 = require('@safe-global/safe-core-sdk-types')
const signatures_1 = require('./signatures')
class SafeMoneriumClient extends sdk_1.MoneriumClient {
  /**
   * Constructor where the Monerium environment and the Protocol kit instance are set
   * @param moneriumOptions The Monerium options object
   * @param protocolKit The Protocol kit instance
   */
  constructor(moneriumOptions, protocolKit) {
    super(moneriumOptions)
    _SafeMoneriumClient_instances.add(this)
    _SafeMoneriumClient_protocolKit.set(this, void 0)
    _SafeMoneriumClient_safeProvider.set(this, void 0)
    __classPrivateFieldSet(this, _SafeMoneriumClient_protocolKit, protocolKit, 'f')
    __classPrivateFieldSet(
      this,
      _SafeMoneriumClient_safeProvider,
      protocolKit.getSafeProvider(),
      'f'
    )
  }
  /**
   * We get the Safe address using the Protocol kit instance
   * @returns The Safe address
   */
  async getSafeAddress() {
    return await __classPrivateFieldGet(this, _SafeMoneriumClient_protocolKit, 'f').getAddress()
  }
  /**
   * Allow to make transactions using the Monerium SDK
   * @param order The order to be placed
   */
  async send(order) {
    const safeAddress = await this.getSafeAddress()
    const newOrder = await __classPrivateFieldGet(
      this,
      _SafeMoneriumClient_instances,
      'm',
      _SafeMoneriumClient_createOrder
    ).call(this, safeAddress, order)
    try {
      // Place the order to Monerium and Safe systems for being linked between each other and confirmed
      await this.placeOrder(newOrder)
      const safeTransaction = await this.signMessage(safeAddress, newOrder.message)
      return safeTransaction
    } catch (error) {
      throw new Error((0, errors_1.getErrorMessage)(error))
    }
  }
  /**
   * Check if the message is signed in the smart contract
   * @param safeAddress The Safe address
   * @param message The message to be signed
   * @returns A boolean indicating if the message is signed
   */
  async isMessageSigned(safeAddress, message) {
    const messageHash = (0, ethers_1.hashMessage)(message)
    const messageHashSigned = await __classPrivateFieldGet(
      this,
      _SafeMoneriumClient_instances,
      'm',
      _SafeMoneriumClient_isValidSignature
    ).call(this, safeAddress, messageHash)
    return messageHashSigned
  }
  /**
   * Check if the message is pending (multi owner or not executed) using the Transaction Service
   * @param safeAddress The Safe address
   * @param message The message to be signed
   * @returns A boolean indicating if the message is signed
   */
  async isSignMessagePending(safeAddress, message) {
    const chainId = await __classPrivateFieldGet(
      this,
      _SafeMoneriumClient_protocolKit,
      'f'
    ).getChainId()
    const apiKit = new api_kit_1.default({ chainId })
    const pendingTransactions = await apiKit.getPendingTransactions(safeAddress)
    return pendingTransactions.results.some((tx) => {
      return (
        // @ts-expect-error - dataDecoded should have the method property
        tx?.dataDecoded?.method === 'signMessage' &&
        // @ts-expect-error - dataDecoded should have the parameters array
        tx?.dataDecoded?.parameters[0]?.value === (0, ethers_1.hashMessage)(message)
      )
    })
  }
  /**
   * Sign a message using the Safe SDK
   * @param safeAddress The Safe address
   * @param message The message to be signed
   */
  async signMessage(safeAddress, message) {
    try {
      const safeVersion = await __classPrivateFieldGet(
        this,
        _SafeMoneriumClient_protocolKit,
        'f'
      ).getContractVersion()
      const signMessageContract = await (0, protocol_kit_1.getSignMessageLibContract)({
        safeProvider: __classPrivateFieldGet(this, _SafeMoneriumClient_safeProvider, 'f'),
        safeVersion
      })
      const txData = signMessageContract.encode('signMessage', [(0, ethers_1.hashMessage)(message)])
      const safeTransactionData = {
        to: await signMessageContract.getAddress(),
        value: '0',
        data: txData,
        operation: safe_core_sdk_types_1.OperationType.DelegateCall
      }
      const safeTransaction = await __classPrivateFieldGet(
        this,
        _SafeMoneriumClient_protocolKit,
        'f'
      ).createTransaction({
        transactions: [safeTransactionData]
      })
      const safeTxHash = await __classPrivateFieldGet(
        this,
        _SafeMoneriumClient_protocolKit,
        'f'
      ).getTransactionHash(safeTransaction)
      const senderSignature = await __classPrivateFieldGet(
        this,
        _SafeMoneriumClient_protocolKit,
        'f'
      ).signHash(safeTxHash)
      const chainId = await __classPrivateFieldGet(
        this,
        _SafeMoneriumClient_protocolKit,
        'f'
      ).getChainId()
      const apiKit = new api_kit_1.default({ chainId })
      await apiKit.proposeTransaction({
        safeAddress,
        safeTransactionData: safeTransaction.data,
        safeTxHash,
        senderAddress:
          (await __classPrivateFieldGet(
            this,
            _SafeMoneriumClient_safeProvider,
            'f'
          ).getSignerAddress()) || '',
        senderSignature: senderSignature.data
      })
      const transaction = await apiKit.getTransaction(safeTxHash)
      return transaction
    } catch (error) {
      throw new Error((0, errors_1.getErrorMessage)(error))
    }
  }
  /**
   * Get the current chain id
   * @returns The Chain Id
   */
  async getChainId() {
    return Number(
      await __classPrivateFieldGet(this, _SafeMoneriumClient_protocolKit, 'f').getChainId()
    )
  }
  /**
   * Get the corresponding Monerium SDK Chain from the current chain id
   * @returns The Chain
   */
  async getChain() {
    const chainId = await __classPrivateFieldGet(
      this,
      _SafeMoneriumClient_protocolKit,
      'f'
    ).getChainId()
    return (0, sdk_1.getChain)(Number(chainId))
  }
  /**
   * Get the corresponding Monerium SDK Network from the current chain id
   * @returns The Network
   */
  async getNetwork() {
    const chainId = await __classPrivateFieldGet(
      this,
      _SafeMoneriumClient_protocolKit,
      'f'
    ).getChainId()
    return (0, sdk_1.getNetwork)(Number(chainId))
  }
}
exports.SafeMoneriumClient = SafeMoneriumClient
;(_SafeMoneriumClient_protocolKit = new WeakMap()),
  (_SafeMoneriumClient_safeProvider = new WeakMap()),
  (_SafeMoneriumClient_instances = new WeakSet()),
  (_SafeMoneriumClient_isValidSignature =
    /**
     * Check if the message signature is valid using the fallback handler Smart Contract
     * @param safeAddress The Safe address
     * @param messageHash The message hash
     * @returns A boolean indicating if the message is signed
     */
    async function _SafeMoneriumClient_isValidSignature(safeAddress, messageHash) {
      try {
        const eip1271data = signatures_1.EIP_1271_INTERFACE.encodeFunctionData('isValidSignature', [
          messageHash,
          '0x'
        ])
        const msgBytes = (0, ethers_1.getBytes)(messageHash)
        const eip1271BytesData = signatures_1.EIP_1271_BYTES_INTERFACE.encodeFunctionData(
          'isValidSignature',
          [msgBytes, '0x']
        )
        const checks = [
          __classPrivateFieldGet(this, _SafeMoneriumClient_safeProvider, 'f').call({
            from: safeAddress,
            to: safeAddress,
            data: eip1271data
          }),
          __classPrivateFieldGet(this, _SafeMoneriumClient_safeProvider, 'f').call({
            from: safeAddress,
            to: safeAddress,
            data: eip1271BytesData
          })
        ]
        const responses = await Promise.allSettled(checks)
        return responses.reduce((prev, response) => {
          if (response.status === 'fulfilled') {
            return (
              prev ||
              (0, errors_1.decodeSignatureData)(response.value) === signatures_1.MAGIC_VALUE ||
              (0, errors_1.decodeSignatureData)(response.value) === signatures_1.MAGIC_VALUE_BYTES
            )
          }
          return (
            prev ||
            (0, errors_1.parseIsValidSignatureErrorResponse)(response.reason) ===
              signatures_1.MAGIC_VALUE ||
            (0, errors_1.parseIsValidSignatureErrorResponse)(response.reason) ===
              signatures_1.MAGIC_VALUE_BYTES
          )
        }, false)
      } catch (error) {
        throw new Error((0, errors_1.getErrorMessage)(error))
      }
    }),
  (_SafeMoneriumClient_createOrder =
    /**
     * Create a valid order for the Monerium SDK
     * @param order The order to be created
     * @returns The Monerium type order
     */
    async function _SafeMoneriumClient_createOrder(safeAddress, order) {
      return {
        amount: order.amount,
        signature: '0x',
        address: safeAddress,
        // currency: order.currency,
        counterpart: order.counterpart,
        memo: order.memo,
        message: (0, sdk_1.placeOrderMessage)(order.amount, order.counterpart.identifier.iban),
        chainId: await this.getChainId(),
        supportingDocumentId: ''
      }
    })
//# sourceMappingURL=SafeMoneriumClient.js.map
