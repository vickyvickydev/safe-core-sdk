import Safe, {
  AddOwnerTxParams,
  RemoveOwnerTxParams,
  SwapOwnerTxParams
} from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import { TransactionBase } from '@safe-global/safe-core-sdk-types'
import { ChangeThresholdTxParams } from './types'
export declare class BaseClient {
  #private
  protocolKit: Safe
  apiKit: SafeApiKit
  constructor(protocolKit: Safe, apiKit: SafeApiKit)
  /**
   * Returns the Safe address.
   *
   * @returns {string} The Safe address
   */
  getAddress(): Promise<string>
  /**
   * Checks if the current Safe is deployed.
   *
   * @returns {boolean} if the Safe contract is deployed
   */
  isDeployed(): Promise<boolean>
  /**
   * Checks if a specific address is an owner of the current Safe.
   *
   * @param {string} ownerAddress - The account address
   * @returns {boolean} TRUE if the account is an owner
   */
  isOwner(ownerAddress: string): Promise<boolean>
  /**
   * Returns the list of Safe owner accounts.
   *
   * @returns The list of owners
   */
  getOwners(): Promise<string[]>
  /**
   * Returns the Safe threshold.
   *
   * @returns {number} The Safe threshold
   */
  getThreshold(): Promise<number>
  /**
   * Returns the Safe nonce.
   *
   * @returns {number} The Safe nonce
   */
  getNonce(): Promise<number>
  /**
   * Returns a list of owners who have approved a specific Safe transaction.
   *
   * @param {string} txHash - The Safe transaction hash
   * @returns {string[]} The list of owners
   */
  getOwnersWhoApprovedTx(txHash: string): Promise<string[]>
  /**
   * Encodes the data for adding a new owner to the Safe.
   *
   * @param {AddOwnerTxParams} addOwnerParams - The parameters for adding a new owner
   * @returns {TransactionBase} The encoded data
   */
  createAddOwnerTransaction(addOwnerParams: AddOwnerTxParams): Promise<TransactionBase>
  /**
   * Encodes the data for removing an owner from the Safe.
   *
   * @param {RemoveOwnerTxParams} removeOwnerParams - The parameters for removing an owner
   * @returns {TransactionBase} The encoded data
   */
  createRemoveOwnerTransaction(removeOwnerParams: RemoveOwnerTxParams): Promise<TransactionBase>
  /**
   * Encodes the data for swapping an owner in the Safe.
   *
   * @param {SwapOwnerTxParams} swapParams - The parameters for swapping an owner
   * @returns {TransactionBase} The encoded data
   */
  createSwapOwnerTransaction(swapParams: SwapOwnerTxParams): Promise<TransactionBase>
  /**
   * Encodes the data for changing the Safe threshold.
   *
   * @param {ChangeThresholdTxParams} changeThresholdParams - The parameters for changing the Safe threshold
   * @returns {TransactionBase} The encoded data
   */
  createChangeThresholdTransaction(
    changeThresholdParams: ChangeThresholdTxParams
  ): Promise<TransactionBase>
}
