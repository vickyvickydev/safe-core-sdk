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
var _SafeApiKit_instances,
  _SafeApiKit_chainId,
  _SafeApiKit_txServiceBaseUrl,
  _SafeApiKit_isValidAddress,
  _SafeApiKit_getEip3770Address
Object.defineProperty(exports, '__esModule', { value: true })
const httpRequests_1 = require('./utils/httpRequests')
const signDelegate_1 = require('./utils/signDelegate')
const protocol_kit_1 = require('@safe-global/protocol-kit')
const safe_core_sdk_types_1 = require('@safe-global/safe-core-sdk-types')
const config_1 = require('./utils/config')
const utils_1 = require('./utils')
const safeOperation_1 = require('./utils/safeOperation')
class SafeApiKit {
  constructor({ chainId, txServiceUrl }) {
    _SafeApiKit_instances.add(this)
    _SafeApiKit_chainId.set(this, void 0)
    _SafeApiKit_txServiceBaseUrl.set(this, void 0)
    __classPrivateFieldSet(this, _SafeApiKit_chainId, chainId, 'f')
    if (txServiceUrl) {
      __classPrivateFieldSet(this, _SafeApiKit_txServiceBaseUrl, txServiceUrl, 'f')
    } else {
      const url = config_1.TRANSACTION_SERVICE_URLS[chainId.toString()]
      if (!url) {
        throw new TypeError(
          `There is no transaction service available for chainId ${chainId}. Please set the txServiceUrl property to use a custom transaction service.`
        )
      }
      __classPrivateFieldSet(this, _SafeApiKit_txServiceBaseUrl, `${url}/api`, 'f')
    }
  }
  /**
   * Returns the information and configuration of the service.
   *
   * @returns The information and configuration of the service
   */
  async getServiceInfo() {
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/about`,
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Returns the list of Safe singletons.
   *
   * @returns The list of Safe singletons
   */
  async getServiceSingletonsInfo() {
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/about/singletons`,
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Decodes the specified Safe transaction data.
   *
   * @param data - The Safe transaction data
   * @returns The transaction data decoded
   * @throws "Invalid data"
   * @throws "Not Found"
   * @throws "Ensure this field has at least 1 hexadecimal chars (not counting 0x)."
   */
  async decodeData(data) {
    if (data === '') {
      throw new Error('Invalid data')
    }
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/data-decoder/`,
      method: httpRequests_1.HttpMethod.Post,
      body: { data }
    })
  }
  /**
   * Returns the list of Safes where the address provided is an owner.
   *
   * @param ownerAddress - The owner address
   * @returns The list of Safes where the address provided is an owner
   * @throws "Invalid owner address"
   * @throws "Checksum address validation failed"
   */
  async getSafesByOwner(ownerAddress) {
    if (ownerAddress === '') {
      throw new Error('Invalid owner address')
    }
    const { address } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, ownerAddress)
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/owners/${address}/safes/`,
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Returns the list of Safes where the module address provided is enabled.
   *
   * @param moduleAddress - The Safe module address
   * @returns The list of Safe addresses where the module provided is enabled
   * @throws "Invalid module address"
   * @throws "Module address checksum not valid"
   */
  async getSafesByModule(moduleAddress) {
    if (moduleAddress === '') {
      throw new Error('Invalid module address')
    }
    const { address } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, moduleAddress)
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/modules/${address}/safes/`,
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Returns all the information of a Safe transaction.
   *
   * @param safeTxHash - Hash of the Safe transaction
   * @returns The information of a Safe transaction
   * @throws "Invalid safeTxHash"
   * @throws "Not found."
   */
  async getTransaction(safeTxHash) {
    if (safeTxHash === '') {
      throw new Error('Invalid safeTxHash')
    }
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/multisig-transactions/${safeTxHash}/`,
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Returns the list of confirmations for a given a Safe transaction.
   *
   * @param safeTxHash - The hash of the Safe transaction
   * @returns The list of confirmations
   * @throws "Invalid safeTxHash"
   */
  async getTransactionConfirmations(safeTxHash) {
    if (safeTxHash === '') {
      throw new Error('Invalid safeTxHash')
    }
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/multisig-transactions/${safeTxHash}/confirmations/`,
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Adds a confirmation for a Safe transaction.
   *
   * @param safeTxHash - Hash of the Safe transaction that will be confirmed
   * @param signature - Signature of the transaction
   * @returns
   * @throws "Invalid safeTxHash"
   * @throws "Invalid signature"
   * @throws "Malformed data"
   * @throws "Error processing data"
   */
  async confirmTransaction(safeTxHash, signature) {
    if (safeTxHash === '') {
      throw new Error('Invalid safeTxHash')
    }
    if (signature === '') {
      throw new Error('Invalid signature')
    }
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/multisig-transactions/${safeTxHash}/confirmations/`,
      method: httpRequests_1.HttpMethod.Post,
      body: {
        signature
      }
    })
  }
  /**
   * Returns the information and configuration of the provided Safe address.
   *
   * @param safeAddress - The Safe address
   * @returns The information and configuration of the provided Safe address
   * @throws "Invalid Safe address"
   * @throws "Checksum address validation failed"
   */
  async getSafeInfo(safeAddress) {
    if (safeAddress === '') {
      throw new Error('Invalid Safe address')
    }
    const { address } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, safeAddress)
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/safes/${address}/`,
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Returns the list of delegates.
   *
   * @param getSafeDelegateProps - Properties to filter the returned list of delegates
   * @returns The list of delegates
   * @throws "Checksum address validation failed"
   */
  async getSafeDelegates({ safeAddress, delegateAddress, delegatorAddress, label, limit, offset }) {
    const url = new URL(
      `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v2/delegates`
    )
    if (safeAddress) {
      const { address: safe } = __classPrivateFieldGet(
        this,
        _SafeApiKit_instances,
        'm',
        _SafeApiKit_getEip3770Address
      ).call(this, safeAddress)
      url.searchParams.set('safe', safe)
    }
    if (delegateAddress) {
      const { address: delegate } = __classPrivateFieldGet(
        this,
        _SafeApiKit_instances,
        'm',
        _SafeApiKit_getEip3770Address
      ).call(this, delegateAddress)
      url.searchParams.set('delegate', delegate)
    }
    if (delegatorAddress) {
      const { address: delegator } = __classPrivateFieldGet(
        this,
        _SafeApiKit_instances,
        'm',
        _SafeApiKit_getEip3770Address
      ).call(this, delegatorAddress)
      url.searchParams.set('delegator', delegator)
    }
    if (label) {
      url.searchParams.set('label', label)
    }
    if (limit != null) {
      url.searchParams.set('limit', limit.toString())
    }
    if (offset != null) {
      url.searchParams.set('offset', offset.toString())
    }
    return (0, httpRequests_1.sendRequest)({
      url: url.toString(),
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Adds a new delegate for a given Safe address.
   *
   * @param addSafeDelegateProps - The configuration of the new delegate
   * @returns
   * @throws "Invalid Safe delegate address"
   * @throws "Invalid Safe delegator address"
   * @throws "Invalid label"
   * @throws "Checksum address validation failed"
   * @throws "Address <delegate_address> is not checksumed"
   * @throws "Safe=<safe_address> does not exist or it's still not indexed"
   * @throws "Signing owner is not an owner of the Safe"
   */
  async addSafeDelegate({ safeAddress, delegateAddress, delegatorAddress, label, signer }) {
    if (delegateAddress === '') {
      throw new Error('Invalid Safe delegate address')
    }
    if (delegatorAddress === '') {
      throw new Error('Invalid Safe delegator address')
    }
    if (label === '') {
      throw new Error('Invalid label')
    }
    const { address: delegate } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, delegateAddress)
    const { address: delegator } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, delegatorAddress)
    const signature = await (0, signDelegate_1.signDelegate)(
      signer,
      delegate,
      __classPrivateFieldGet(this, _SafeApiKit_chainId, 'f')
    )
    const body = {
      safe: safeAddress
        ? __classPrivateFieldGet(
            this,
            _SafeApiKit_instances,
            'm',
            _SafeApiKit_getEip3770Address
          ).call(this, safeAddress).address
        : null,
      delegate,
      delegator,
      label,
      signature
    }
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v2/delegates/`,
      method: httpRequests_1.HttpMethod.Post,
      body
    })
  }
  /**
   * Removes a delegate for a given Safe address.
   *
   * @param deleteSafeDelegateProps - The configuration for the delegate that will be removed
   * @returns
   * @throws "Invalid Safe delegate address"
   * @throws "Invalid Safe delegator address"
   * @throws "Checksum address validation failed"
   * @throws "Signing owner is not an owner of the Safe"
   * @throws "Not found"
   */
  async removeSafeDelegate({ delegateAddress, delegatorAddress, signer }) {
    if (delegateAddress === '') {
      throw new Error('Invalid Safe delegate address')
    }
    if (delegatorAddress === '') {
      throw new Error('Invalid Safe delegator address')
    }
    const { address: delegate } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, delegateAddress)
    const { address: delegator } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, delegatorAddress)
    const signature = await (0, signDelegate_1.signDelegate)(
      signer,
      delegate,
      __classPrivateFieldGet(this, _SafeApiKit_chainId, 'f')
    )
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v2/delegates/${delegate}`,
      method: httpRequests_1.HttpMethod.Delete,
      body: {
        delegator,
        signature
      }
    })
  }
  /**
   * Returns the creation information of a Safe.
   *
   * @param safeAddress - The Safe address
   * @returns The creation information of a Safe
   * @throws "Invalid Safe address"
   * @throws "Safe creation not found"
   * @throws "Checksum address validation failed"
   * @throws "Problem connecting to Ethereum network"
   */
  async getSafeCreationInfo(safeAddress) {
    if (safeAddress === '') {
      throw new Error('Invalid Safe address')
    }
    const { address } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, safeAddress)
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/safes/${address}/creation/`,
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Estimates the safeTxGas for a given Safe multi-signature transaction.
   *
   * @param safeAddress - The Safe address
   * @param safeTransaction - The Safe transaction to estimate
   * @returns The safeTxGas for the given Safe transaction
   * @throws "Invalid Safe address"
   * @throws "Data not valid"
   * @throws "Safe not found"
   * @throws "Tx not valid"
   */
  async estimateSafeTransaction(safeAddress, safeTransaction) {
    if (safeAddress === '') {
      throw new Error('Invalid Safe address')
    }
    const { address } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, safeAddress)
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/safes/${address}/multisig-transactions/estimations/`,
      method: httpRequests_1.HttpMethod.Post,
      body: safeTransaction
    })
  }
  /**
   * Creates a new multi-signature transaction with its confirmations and stores it in the Safe Transaction Service.
   *
   * @param proposeTransactionConfig - The configuration of the proposed transaction
   * @returns The hash of the Safe transaction proposed
   * @throws "Invalid Safe address"
   * @throws "Invalid safeTxHash"
   * @throws "Invalid data"
   * @throws "Invalid ethereum address/User is not an owner/Invalid signature/Nonce already executed/Sender is not an owner"
   */
  async proposeTransaction({
    safeAddress,
    safeTransactionData,
    safeTxHash,
    senderAddress,
    senderSignature,
    origin
  }) {
    if (safeAddress === '') {
      throw new Error('Invalid Safe address')
    }
    const { address: safe } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, safeAddress)
    const { address: sender } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, senderAddress)
    if (safeTxHash === '') {
      throw new Error('Invalid safeTxHash')
    }
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/safes/${safe}/multisig-transactions/`,
      method: httpRequests_1.HttpMethod.Post,
      body: {
        ...safeTransactionData,
        contractTransactionHash: safeTxHash,
        sender,
        signature: senderSignature,
        origin
      }
    })
  }
  /**
   * Returns the history of incoming transactions of a Safe account.
   *
   * @param safeAddress - The Safe address
   * @returns The history of incoming transactions
   * @throws "Invalid Safe address"
   * @throws "Checksum address validation failed"
   */
  async getIncomingTransactions(safeAddress) {
    if (safeAddress === '') {
      throw new Error('Invalid Safe address')
    }
    const { address } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, safeAddress)
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/safes/${address}/incoming-transfers?executed=true`,
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Returns the history of module transactions of a Safe account.
   *
   * @param safeAddress - The Safe address
   * @returns The history of module transactions
   * @throws "Invalid Safe address"
   * @throws "Invalid data"
   * @throws "Invalid ethereum address"
   */
  async getModuleTransactions(safeAddress) {
    if (safeAddress === '') {
      throw new Error('Invalid Safe address')
    }
    const { address } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, safeAddress)
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/safes/${address}/module-transactions/`,
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Returns the history of multi-signature transactions of a Safe account.
   *
   * @param safeAddress - The Safe address
   * @returns The history of multi-signature transactions
   * @throws "Invalid Safe address"
   * @throws "Checksum address validation failed"
   */
  async getMultisigTransactions(safeAddress) {
    if (safeAddress === '') {
      throw new Error('Invalid Safe address')
    }
    const { address } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, safeAddress)
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/safes/${address}/multisig-transactions/`,
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Returns the list of multi-signature transactions that are waiting for the confirmation of the Safe owners.
   *
   * @param safeAddress - The Safe address
   * @param currentNonce - Current nonce of the Safe
   * @returns The list of transactions waiting for the confirmation of the Safe owners
   * @throws "Invalid Safe address"
   * @throws "Invalid data"
   * @throws "Invalid ethereum address"
   */
  async getPendingTransactions(safeAddress, currentNonce) {
    if (safeAddress === '') {
      throw new Error('Invalid Safe address')
    }
    const { address } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, safeAddress)
    const nonce = currentNonce ? currentNonce : (await this.getSafeInfo(address)).nonce
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/safes/${address}/multisig-transactions/?executed=false&nonce__gte=${nonce}`,
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Returns a list of transactions for a Safe. The list has different structures depending on the transaction type
   *
   * @param safeAddress - The Safe address
   * @returns The list of transactions waiting for the confirmation of the Safe owners
   * @throws "Invalid Safe address"
   * @throws "Checksum address validation failed"
   */
  async getAllTransactions(safeAddress, options) {
    if (safeAddress === '') {
      throw new Error('Invalid Safe address')
    }
    const { address } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, safeAddress)
    const url = new URL(
      `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/safes/${address}/all-transactions/`
    )
    const trusted = options?.trusted?.toString() || 'true'
    url.searchParams.set('trusted', trusted)
    const queued = options?.queued?.toString() || 'true'
    url.searchParams.set('queued', queued)
    const executed = options?.executed?.toString() || 'false'
    url.searchParams.set('executed', executed)
    return (0, httpRequests_1.sendRequest)({
      url: url.toString(),
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Returns the right nonce to propose a new transaction after the last pending transaction.
   *
   * @param safeAddress - The Safe address
   * @returns The right nonce to propose a new transaction after the last pending transaction
   * @throws "Invalid Safe address"
   * @throws "Invalid data"
   * @throws "Invalid ethereum address"
   */
  async getNextNonce(safeAddress) {
    if (safeAddress === '') {
      throw new Error('Invalid Safe address')
    }
    const { address } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, safeAddress)
    const pendingTransactions = await this.getPendingTransactions(address)
    if (pendingTransactions.results.length > 0) {
      const nonces = pendingTransactions.results.map((tx) => tx.nonce)
      const lastNonce = Math.max(...nonces)
      return lastNonce + 1
    }
    const safeInfo = await this.getSafeInfo(address)
    return safeInfo.nonce
  }
  /**
   * Returns the list of all the ERC20 tokens handled by the Safe.
   *
   * @returns The list of all the ERC20 tokens
   */
  async getTokenList() {
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/tokens/`,
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Returns the information of a given ERC20 token.
   *
   * @param tokenAddress - The token address
   * @returns The information of the given ERC20 token
   * @throws "Invalid token address"
   * @throws "Checksum address validation failed"
   */
  async getToken(tokenAddress) {
    if (tokenAddress === '') {
      throw new Error('Invalid token address')
    }
    const { address } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, tokenAddress)
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/tokens/${address}/`,
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Get a message by its safe message hash
   * @param messageHash The Safe message hash
   * @returns The message
   */
  async getMessage(messageHash) {
    if (!messageHash) {
      throw new Error('Invalid messageHash')
    }
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/messages/${messageHash}/`,
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Get the list of messages associated to a Safe account
   * @param safeAddress The safe address
   * @param options The options to filter the list of messages
   * @returns The paginated list of messages
   */
  async getMessages(safeAddress, { ordering, limit, offset } = {}) {
    if (
      !__classPrivateFieldGet(this, _SafeApiKit_instances, 'm', _SafeApiKit_isValidAddress).call(
        this,
        safeAddress
      )
    ) {
      throw new Error('Invalid safeAddress')
    }
    const url = new URL(
      `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/safes/${safeAddress}/messages/`
    )
    if (ordering) {
      url.searchParams.set('ordering', ordering)
    }
    if (limit != null) {
      url.searchParams.set('limit', limit.toString())
    }
    if (offset != null) {
      url.searchParams.set('offset', offset.toString())
    }
    return (0, httpRequests_1.sendRequest)({
      url: url.toString(),
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Creates a new message with an initial signature
   * Add more signatures from other owners using addMessageSignature()
   * @param safeAddress The safe address
   * @param options The raw message to add, signature and safeAppId if any
   */
  async addMessage(safeAddress, addMessageProps) {
    if (
      !__classPrivateFieldGet(this, _SafeApiKit_instances, 'm', _SafeApiKit_isValidAddress).call(
        this,
        safeAddress
      )
    ) {
      throw new Error('Invalid safeAddress')
    }
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/safes/${safeAddress}/messages/`,
      method: httpRequests_1.HttpMethod.Post,
      body: addMessageProps
    })
  }
  /**
   * Add a signature to an existing message
   * @param messageHash The safe message hash
   * @param signature The signature
   */
  async addMessageSignature(messageHash, signature) {
    if (!messageHash || !signature) {
      throw new Error('Invalid messageHash or signature')
    }
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/messages/${messageHash}/signatures/`,
      method: httpRequests_1.HttpMethod.Post,
      body: {
        signature
      }
    })
  }
  /**
   * Get the SafeOperations that were sent from a particular address.
   * @param getSafeOperationsProps - The parameters to filter the list of SafeOperations
   * @throws "Safe address must not be empty"
   * @throws "Invalid Ethereum address {safeAddress}"
   * @returns The SafeOperations sent from the given Safe's address
   */
  async getSafeOperationsByAddress({ safeAddress, ordering, limit, offset }) {
    if (!safeAddress) {
      throw new Error('Safe address must not be empty')
    }
    const { address } = __classPrivateFieldGet(
      this,
      _SafeApiKit_instances,
      'm',
      _SafeApiKit_getEip3770Address
    ).call(this, safeAddress)
    const url = new URL(
      `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/safes/${address}/safe-operations/`
    )
    if (ordering) {
      url.searchParams.set('ordering', ordering)
    }
    if (limit != null) {
      url.searchParams.set('limit', limit.toString())
    }
    if (offset != null) {
      url.searchParams.set('offset', offset.toString())
    }
    return (0, httpRequests_1.sendRequest)({
      url: url.toString(),
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Get a SafeOperation by its hash.
   * @param safeOperationHash The SafeOperation hash
   * @throws "SafeOperation hash must not be empty"
   * @throws "Not found."
   * @returns The SafeOperation
   */
  async getSafeOperation(safeOperationHash) {
    if (!safeOperationHash) {
      throw new Error('SafeOperation hash must not be empty')
    }
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/safe-operations/${safeOperationHash}/`,
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Create a new 4337 SafeOperation for a Safe.
   * @param addSafeOperationProps - The configuration of the SafeOperation
   * @throws "Safe address must not be empty"
   * @throws "Invalid Safe address {safeAddress}"
   * @throws "Module address must not be empty"
   * @throws "Invalid module address {moduleAddress}"
   * @throws "Signature must not be empty"
   */
  async addSafeOperation(safeOperation) {
    let safeAddress, moduleAddress
    let addSafeOperationProps
    if ((0, safe_core_sdk_types_1.isSafeOperation)(safeOperation)) {
      addSafeOperationProps = await (0, safeOperation_1.getAddSafeOperationProps)(safeOperation)
    } else {
      addSafeOperationProps = safeOperation
    }
    const {
      entryPoint,
      moduleAddress: moduleAddressProp,
      options,
      safeAddress: safeAddressProp,
      userOperation
    } = addSafeOperationProps
    if (!safeAddressProp) {
      throw new Error('Safe address must not be empty')
    }
    try {
      safeAddress = __classPrivateFieldGet(
        this,
        _SafeApiKit_instances,
        'm',
        _SafeApiKit_getEip3770Address
      ).call(this, safeAddressProp).address
    } catch (err) {
      throw new Error(`Invalid Safe address ${safeAddressProp}`)
    }
    if (!moduleAddressProp) {
      throw new Error('Module address must not be empty')
    }
    try {
      moduleAddress = __classPrivateFieldGet(
        this,
        _SafeApiKit_instances,
        'm',
        _SafeApiKit_getEip3770Address
      ).call(this, moduleAddressProp).address
    } catch (err) {
      throw new Error(`Invalid module address ${moduleAddressProp}`)
    }
    if ((0, utils_1.isEmptyData)(userOperation.signature)) {
      throw new Error('Signature must not be empty')
    }
    // We are receiving the timestamp in seconds (block timestamp), but the API expects it in milliseconds
    const getISOString = (date) => (!date ? null : new Date(date * 1000).toISOString())
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/safes/${safeAddress}/safe-operations/`,
      method: httpRequests_1.HttpMethod.Post,
      body: {
        nonce: Number(userOperation.nonce),
        initCode: (0, utils_1.isEmptyData)(userOperation.initCode) ? null : userOperation.initCode,
        callData: userOperation.callData,
        callGasLimit: userOperation.callGasLimit.toString(),
        verificationGasLimit: userOperation.verificationGasLimit.toString(),
        preVerificationGas: userOperation.preVerificationGas.toString(),
        maxFeePerGas: userOperation.maxFeePerGas.toString(),
        maxPriorityFeePerGas: userOperation.maxPriorityFeePerGas.toString(),
        paymasterAndData: (0, utils_1.isEmptyData)(userOperation.paymasterAndData)
          ? null
          : userOperation.paymasterAndData,
        entryPoint,
        validAfter: getISOString(options?.validAfter),
        validUntil: getISOString(options?.validUntil),
        signature: userOperation.signature,
        moduleAddress
      }
    })
  }
  /**
   * Returns the list of confirmations for a given a SafeOperation.
   *
   * @param safeOperationHash - The hash of the SafeOperation to get confirmations for
   * @param getSafeOperationConfirmationsOptions - Additional options for fetching the list of confirmations
   * @returns The list of confirmations
   * @throws "Invalid SafeOperation hash"
   * @throws "Invalid data"
   */
  async getSafeOperationConfirmations(safeOperationHash, { limit, offset } = {}) {
    if (!safeOperationHash) {
      throw new Error('Invalid SafeOperation hash')
    }
    const url = new URL(
      `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/safe-operations/${safeOperationHash}/confirmations/`
    )
    if (limit != null) {
      url.searchParams.set('limit', limit.toString())
    }
    if (offset != null) {
      url.searchParams.set('offset', offset.toString())
    }
    return (0, httpRequests_1.sendRequest)({
      url: url.toString(),
      method: httpRequests_1.HttpMethod.Get
    })
  }
  /**
   * Adds a confirmation for a SafeOperation.
   *
   * @param safeOperationHash The SafeOperation hash
   * @param signature - Signature of the SafeOperation
   * @returns
   * @throws "Invalid SafeOperation hash"
   * @throws "Invalid signature"
   * @throws "Malformed data"
   * @throws "Error processing data"
   */
  async confirmSafeOperation(safeOperationHash, signature) {
    if (!safeOperationHash) {
      throw new Error('Invalid SafeOperation hash')
    }
    if (!signature) {
      throw new Error('Invalid signature')
    }
    return (0, httpRequests_1.sendRequest)({
      url: `${__classPrivateFieldGet(this, _SafeApiKit_txServiceBaseUrl, 'f')}/v1/safe-operations/${safeOperationHash}/confirmations/`,
      method: httpRequests_1.HttpMethod.Post,
      body: { signature }
    })
  }
}
;(_SafeApiKit_chainId = new WeakMap()),
  (_SafeApiKit_txServiceBaseUrl = new WeakMap()),
  (_SafeApiKit_instances = new WeakSet()),
  (_SafeApiKit_isValidAddress = function _SafeApiKit_isValidAddress(address) {
    try {
      ;(0, protocol_kit_1.validateEthereumAddress)(address)
      return true
    } catch {
      return false
    }
  }),
  (_SafeApiKit_getEip3770Address = function _SafeApiKit_getEip3770Address(fullAddress) {
    return (0, protocol_kit_1.validateEip3770Address)(
      fullAddress,
      __classPrivateFieldGet(this, _SafeApiKit_chainId, 'f')
    )
  })
exports.default = SafeApiKit
//# sourceMappingURL=SafeApiKit.js.map
