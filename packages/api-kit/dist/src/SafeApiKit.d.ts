import {
  AddMessageProps,
  AddSafeDelegateProps,
  AddSafeOperationProps,
  AllTransactionsListResponse,
  AllTransactionsOptions,
  DeleteSafeDelegateProps,
  GetSafeDelegateProps,
  GetSafeMessageListProps,
  GetSafeOperationListProps,
  GetSafeOperationListResponse,
  ListOptions,
  ModulesResponse,
  OwnerResponse,
  ProposeTransactionProps,
  SafeCreationInfoResponse,
  SafeDelegateListResponse,
  SafeInfoResponse,
  SafeMessage,
  SafeMessageListResponse,
  SafeModuleTransactionListResponse,
  SafeMultisigTransactionEstimate,
  SafeMultisigTransactionEstimateResponse,
  SafeMultisigTransactionListResponse,
  SafeServiceInfoResponse,
  SafeSingletonResponse,
  SignatureResponse,
  SignedSafeDelegateResponse,
  TokenInfoListResponse,
  TokenInfoResponse,
  TransferListResponse
} from './types/safeTransactionServiceTypes'
import {
  SafeMultisigConfirmationListResponse,
  SafeMultisigTransactionResponse,
  SafeOperation,
  SafeOperationConfirmationListResponse,
  SafeOperationResponse
} from '@safe-global/safe-core-sdk-types'
export interface SafeApiKitConfig {
  /** chainId - The chainId */
  chainId: bigint
  /** txServiceUrl - Safe Transaction Service URL */
  txServiceUrl?: string
}
declare class SafeApiKit {
  #private
  constructor({ chainId, txServiceUrl }: SafeApiKitConfig)
  /**
   * Returns the information and configuration of the service.
   *
   * @returns The information and configuration of the service
   */
  getServiceInfo(): Promise<SafeServiceInfoResponse>
  /**
   * Returns the list of Safe singletons.
   *
   * @returns The list of Safe singletons
   */
  getServiceSingletonsInfo(): Promise<SafeSingletonResponse[]>
  /**
   * Decodes the specified Safe transaction data.
   *
   * @param data - The Safe transaction data
   * @returns The transaction data decoded
   * @throws "Invalid data"
   * @throws "Not Found"
   * @throws "Ensure this field has at least 1 hexadecimal chars (not counting 0x)."
   */
  decodeData(data: string): Promise<any>
  /**
   * Returns the list of Safes where the address provided is an owner.
   *
   * @param ownerAddress - The owner address
   * @returns The list of Safes where the address provided is an owner
   * @throws "Invalid owner address"
   * @throws "Checksum address validation failed"
   */
  getSafesByOwner(ownerAddress: string): Promise<OwnerResponse>
  /**
   * Returns the list of Safes where the module address provided is enabled.
   *
   * @param moduleAddress - The Safe module address
   * @returns The list of Safe addresses where the module provided is enabled
   * @throws "Invalid module address"
   * @throws "Module address checksum not valid"
   */
  getSafesByModule(moduleAddress: string): Promise<ModulesResponse>
  /**
   * Returns all the information of a Safe transaction.
   *
   * @param safeTxHash - Hash of the Safe transaction
   * @returns The information of a Safe transaction
   * @throws "Invalid safeTxHash"
   * @throws "Not found."
   */
  getTransaction(safeTxHash: string): Promise<SafeMultisigTransactionResponse>
  /**
   * Returns the list of confirmations for a given a Safe transaction.
   *
   * @param safeTxHash - The hash of the Safe transaction
   * @returns The list of confirmations
   * @throws "Invalid safeTxHash"
   */
  getTransactionConfirmations(safeTxHash: string): Promise<SafeMultisigConfirmationListResponse>
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
  confirmTransaction(safeTxHash: string, signature: string): Promise<SignatureResponse>
  /**
   * Returns the information and configuration of the provided Safe address.
   *
   * @param safeAddress - The Safe address
   * @returns The information and configuration of the provided Safe address
   * @throws "Invalid Safe address"
   * @throws "Checksum address validation failed"
   */
  getSafeInfo(safeAddress: string): Promise<SafeInfoResponse>
  /**
   * Returns the list of delegates.
   *
   * @param getSafeDelegateProps - Properties to filter the returned list of delegates
   * @returns The list of delegates
   * @throws "Checksum address validation failed"
   */
  getSafeDelegates({
    safeAddress,
    delegateAddress,
    delegatorAddress,
    label,
    limit,
    offset
  }: GetSafeDelegateProps): Promise<SafeDelegateListResponse>
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
  addSafeDelegate({
    safeAddress,
    delegateAddress,
    delegatorAddress,
    label,
    signer
  }: AddSafeDelegateProps): Promise<SignedSafeDelegateResponse>
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
  removeSafeDelegate({
    delegateAddress,
    delegatorAddress,
    signer
  }: DeleteSafeDelegateProps): Promise<void>
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
  getSafeCreationInfo(safeAddress: string): Promise<SafeCreationInfoResponse>
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
  estimateSafeTransaction(
    safeAddress: string,
    safeTransaction: SafeMultisigTransactionEstimate
  ): Promise<SafeMultisigTransactionEstimateResponse>
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
  proposeTransaction({
    safeAddress,
    safeTransactionData,
    safeTxHash,
    senderAddress,
    senderSignature,
    origin
  }: ProposeTransactionProps): Promise<void>
  /**
   * Returns the history of incoming transactions of a Safe account.
   *
   * @param safeAddress - The Safe address
   * @returns The history of incoming transactions
   * @throws "Invalid Safe address"
   * @throws "Checksum address validation failed"
   */
  getIncomingTransactions(safeAddress: string): Promise<TransferListResponse>
  /**
   * Returns the history of module transactions of a Safe account.
   *
   * @param safeAddress - The Safe address
   * @returns The history of module transactions
   * @throws "Invalid Safe address"
   * @throws "Invalid data"
   * @throws "Invalid ethereum address"
   */
  getModuleTransactions(safeAddress: string): Promise<SafeModuleTransactionListResponse>
  /**
   * Returns the history of multi-signature transactions of a Safe account.
   *
   * @param safeAddress - The Safe address
   * @returns The history of multi-signature transactions
   * @throws "Invalid Safe address"
   * @throws "Checksum address validation failed"
   */
  getMultisigTransactions(safeAddress: string): Promise<SafeMultisigTransactionListResponse>
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
  getPendingTransactions(
    safeAddress: string,
    currentNonce?: number
  ): Promise<SafeMultisigTransactionListResponse>
  /**
   * Returns a list of transactions for a Safe. The list has different structures depending on the transaction type
   *
   * @param safeAddress - The Safe address
   * @returns The list of transactions waiting for the confirmation of the Safe owners
   * @throws "Invalid Safe address"
   * @throws "Checksum address validation failed"
   */
  getAllTransactions(
    safeAddress: string,
    options?: AllTransactionsOptions
  ): Promise<AllTransactionsListResponse>
  /**
   * Returns the right nonce to propose a new transaction after the last pending transaction.
   *
   * @param safeAddress - The Safe address
   * @returns The right nonce to propose a new transaction after the last pending transaction
   * @throws "Invalid Safe address"
   * @throws "Invalid data"
   * @throws "Invalid ethereum address"
   */
  getNextNonce(safeAddress: string): Promise<number>
  /**
   * Returns the list of all the ERC20 tokens handled by the Safe.
   *
   * @returns The list of all the ERC20 tokens
   */
  getTokenList(): Promise<TokenInfoListResponse>
  /**
   * Returns the information of a given ERC20 token.
   *
   * @param tokenAddress - The token address
   * @returns The information of the given ERC20 token
   * @throws "Invalid token address"
   * @throws "Checksum address validation failed"
   */
  getToken(tokenAddress: string): Promise<TokenInfoResponse>
  /**
   * Get a message by its safe message hash
   * @param messageHash The Safe message hash
   * @returns The message
   */
  getMessage(messageHash: string): Promise<SafeMessage>
  /**
   * Get the list of messages associated to a Safe account
   * @param safeAddress The safe address
   * @param options The options to filter the list of messages
   * @returns The paginated list of messages
   */
  getMessages(
    safeAddress: string,
    { ordering, limit, offset }?: GetSafeMessageListProps
  ): Promise<SafeMessageListResponse>
  /**
   * Creates a new message with an initial signature
   * Add more signatures from other owners using addMessageSignature()
   * @param safeAddress The safe address
   * @param options The raw message to add, signature and safeAppId if any
   */
  addMessage(safeAddress: string, addMessageProps: AddMessageProps): Promise<void>
  /**
   * Add a signature to an existing message
   * @param messageHash The safe message hash
   * @param signature The signature
   */
  addMessageSignature(messageHash: string, signature: string): Promise<void>
  /**
   * Get the SafeOperations that were sent from a particular address.
   * @param getSafeOperationsProps - The parameters to filter the list of SafeOperations
   * @throws "Safe address must not be empty"
   * @throws "Invalid Ethereum address {safeAddress}"
   * @returns The SafeOperations sent from the given Safe's address
   */
  getSafeOperationsByAddress({
    safeAddress,
    ordering,
    limit,
    offset
  }: GetSafeOperationListProps): Promise<GetSafeOperationListResponse>
  /**
   * Get a SafeOperation by its hash.
   * @param safeOperationHash The SafeOperation hash
   * @throws "SafeOperation hash must not be empty"
   * @throws "Not found."
   * @returns The SafeOperation
   */
  getSafeOperation(safeOperationHash: string): Promise<SafeOperationResponse>
  /**
   * Create a new 4337 SafeOperation for a Safe.
   * @param addSafeOperationProps - The configuration of the SafeOperation
   * @throws "Safe address must not be empty"
   * @throws "Invalid Safe address {safeAddress}"
   * @throws "Module address must not be empty"
   * @throws "Invalid module address {moduleAddress}"
   * @throws "Signature must not be empty"
   */
  addSafeOperation(safeOperation: AddSafeOperationProps | SafeOperation): Promise<void>
  /**
   * Returns the list of confirmations for a given a SafeOperation.
   *
   * @param safeOperationHash - The hash of the SafeOperation to get confirmations for
   * @param getSafeOperationConfirmationsOptions - Additional options for fetching the list of confirmations
   * @returns The list of confirmations
   * @throws "Invalid SafeOperation hash"
   * @throws "Invalid data"
   */
  getSafeOperationConfirmations(
    safeOperationHash: string,
    { limit, offset }?: ListOptions
  ): Promise<SafeOperationConfirmationListResponse>
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
  confirmSafeOperation(safeOperationHash: string, signature: string): Promise<void>
}
export default SafeApiKit
