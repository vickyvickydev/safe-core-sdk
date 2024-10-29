'use strict'
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
var _BaseClient_instances, _BaseClient_buildTransaction
Object.defineProperty(exports, '__esModule', { value: true })
exports.BaseClient = void 0
class BaseClient {
  constructor(protocolKit, apiKit) {
    _BaseClient_instances.add(this)
    this.protocolKit = protocolKit
    this.apiKit = apiKit
  }
  /**
   * Returns the Safe address.
   *
   * @returns {string} The Safe address
   */
  async getAddress() {
    return this.protocolKit.getAddress()
  }
  /**
   * Checks if the current Safe is deployed.
   *
   * @returns {boolean} if the Safe contract is deployed
   */
  async isDeployed() {
    return this.protocolKit.isSafeDeployed()
  }
  /**
   * Checks if a specific address is an owner of the current Safe.
   *
   * @param {string} ownerAddress - The account address
   * @returns {boolean} TRUE if the account is an owner
   */
  async isOwner(ownerAddress) {
    return this.protocolKit.isOwner(ownerAddress)
  }
  /**
   * Returns the list of Safe owner accounts.
   *
   * @returns The list of owners
   */
  async getOwners() {
    return this.protocolKit.getOwners()
  }
  /**
   * Returns the Safe threshold.
   *
   * @returns {number} The Safe threshold
   */
  async getThreshold() {
    return this.protocolKit.getThreshold()
  }
  /**
   * Returns the Safe nonce.
   *
   * @returns {number} The Safe nonce
   */
  async getNonce() {
    return this.protocolKit.getNonce()
  }
  /**
   * Returns a list of owners who have approved a specific Safe transaction.
   *
   * @param {string} txHash - The Safe transaction hash
   * @returns {string[]} The list of owners
   */
  async getOwnersWhoApprovedTransaction(txHash) {
    return this.protocolKit.getOwnersWhoApprovedTx(txHash)
  }
  /**
   * Encodes the data for adding a new owner to the Safe.
   *
   * @param {AddOwnerTxParams} addOwnerParams - The parameters for adding a new owner
   * @returns {TransactionBase} The encoded data
   */
  async createAddOwnerTransaction(addOwnerParams) {
    const addOwnerTransaction = await this.protocolKit.createAddOwnerTx(addOwnerParams)
    return __classPrivateFieldGet(
      this,
      _BaseClient_instances,
      'm',
      _BaseClient_buildTransaction
    ).call(this, addOwnerTransaction)
  }
  /**
   * Encodes the data for removing an owner from the Safe.
   *
   * @param {RemoveOwnerTxParams} removeOwnerParams - The parameters for removing an owner
   * @returns {TransactionBase} The encoded data
   */
  async createRemoveOwnerTransaction(removeOwnerParams) {
    const removeOwnerTransaction = await this.protocolKit.createRemoveOwnerTx(removeOwnerParams)
    return __classPrivateFieldGet(
      this,
      _BaseClient_instances,
      'm',
      _BaseClient_buildTransaction
    ).call(this, removeOwnerTransaction)
  }
  /**
   * Encodes the data for swapping an owner in the Safe.
   *
   * @param {SwapOwnerTxParams} swapParams - The parameters for swapping an owner
   * @returns {TransactionBase} The encoded data
   */
  async createSwapOwnerTransaction(swapParams) {
    const swapOwnerTransaction = await this.protocolKit.createSwapOwnerTx(swapParams)
    return __classPrivateFieldGet(
      this,
      _BaseClient_instances,
      'm',
      _BaseClient_buildTransaction
    ).call(this, swapOwnerTransaction)
  }
  /**
   * Encodes the data for changing the Safe threshold.
   *
   * @param {ChangeThresholdTxParams} changeThresholdParams - The parameters for changing the Safe threshold
   * @returns {TransactionBase} The encoded data
   */
  async createChangeThresholdTransaction(changeThresholdParams) {
    const changeThresholdTransaction = await this.protocolKit.createChangeThresholdTx(
      changeThresholdParams.threshold
    )
    return __classPrivateFieldGet(
      this,
      _BaseClient_instances,
      'm',
      _BaseClient_buildTransaction
    ).call(this, changeThresholdTransaction)
  }
}
exports.BaseClient = BaseClient
;(_BaseClient_instances = new WeakSet()),
  (_BaseClient_buildTransaction = async function _BaseClient_buildTransaction(safeTransaction) {
    return {
      to: safeTransaction.data.to,
      value: safeTransaction.data.value,
      data: safeTransaction.data.data
    }
  })
//# sourceMappingURL=BaseClient.js.map
