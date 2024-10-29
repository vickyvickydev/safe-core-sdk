import { SigningMethod } from '@safe-global/protocol-kit'
import { RelayKitBasePack } from '../../RelayKitBasePack'
import { SafeOperationResponse } from '@safe-global/safe-core-sdk-types'
import EthSafeOperation from './SafeOperation'
import {
  EstimateFeeProps,
  Safe4337CreateTransactionProps,
  Safe4337ExecutableProps,
  Safe4337InitOptions,
  Safe4337Options,
  UserOperationReceipt,
  UserOperationWithPayload
} from './types'
/**
 * Safe4337Pack class that extends RelayKitBasePack.
 * This class provides an implementation of the ERC-4337 that enables Safe accounts to wrk with UserOperations.
 * It allows to create, sign and execute transactions using the Safe 4337 Module.
 *
 * @class
 * @link https://github.com/safe-global/safe-modules/blob/main/modules/4337/contracts/Safe4337Module.sol
 * @link https://eips.ethereum.org/EIPS/eip-4337
 */
export declare class Safe4337Pack extends RelayKitBasePack<{
  EstimateFeeProps: EstimateFeeProps
  EstimateFeeResult: EthSafeOperation
  CreateTransactionProps: Safe4337CreateTransactionProps
  CreateTransactionResult: EthSafeOperation
  ExecuteTransactionProps: Safe4337ExecutableProps
  ExecuteTransactionResult: string
}> {
  #private
  /**
   * Creates an instance of the Safe4337Pack.
   *
   * @param {Safe4337Options} options - The initialization parameters.
   */
  constructor({
    protocolKit,
    bundlerClient,
    bundlerUrl,
    chainId,
    paymasterOptions,
    entryPointAddress,
    safe4337ModuleAddress,
    safeWebAuthnSharedSignerAddress
  }: Safe4337Options)
  /**
   * Initializes a Safe4337Pack class.
   * This method creates the protocolKit instance based on the input parameters.
   * When the Safe address is provided, it will use the existing Safe.
   * When the Safe address is not provided, it will use the predictedSafe feature with the provided owners and threshold.
   * It will use the correct contract addresses for the fallbackHandler and the module and will add the data to enable the 4337 module.
   *
   * @param {Safe4337InitOptions} initOptions - The initialization parameters.
   * @return {Promise<Safe4337Pack>} The Promise object that will be resolved into an instance of Safe4337Pack.
   */
  static init(initOptions: Safe4337InitOptions): Promise<Safe4337Pack>
  /**
   * Estimates gas for the SafeOperation.
   *
   * @param {EstimateFeeProps} props - The parameters for the gas estimation.
   * @param {EthSafeOperation} props.safeOperation - The SafeOperation to estimate the gas.
   * @param {IFeeEstimator} props.feeEstimator - The function to estimate the gas.
   * @return {Promise<EthSafeOperation>} The Promise object that will be resolved into the gas estimation.
   */
  getEstimateFee({ safeOperation, feeEstimator }: EstimateFeeProps): Promise<EthSafeOperation>
  /**
   * Creates a relayed transaction based on the provided parameters.
   *
   * @param {MetaTransactionData[]} transactions - The transactions to batch in a SafeOperation.
   * @param options - Optional configuration options for the transaction creation.
   * @return {Promise<EthSafeOperation>} The Promise object will resolve a SafeOperation.
   */
  createTransaction({
    transactions,
    options
  }: Safe4337CreateTransactionProps): Promise<EthSafeOperation>
  /**
   * Signs a safe operation.
   *
   * @param {EthSafeOperation | SafeOperationResponse} safeOperation - The SafeOperation to sign. It can be:
   * - A response from the API (Tx Service)
   * - An instance of EthSafeOperation
   * @param {SigningMethod} signingMethod - The signing method to use.
   * @return {Promise<EthSafeOperation>} The Promise object will resolve to the signed SafeOperation.
   */
  signSafeOperation(
    safeOperation: EthSafeOperation | SafeOperationResponse,
    signingMethod?: SigningMethod
  ): Promise<EthSafeOperation>
  /**
   * Executes the relay transaction.
   *
   * @param {Safe4337ExecutableProps} props - The parameters for the transaction execution.
   * @param {EthSafeOperation | SafeOperationResponse} props.executable - The SafeOperation to execute. It can be:
   * - A response from the API (Tx Service)
   * - An instance of EthSafeOperation
   * @return {Promise<string>} The user operation hash.
   */
  executeTransaction({ executable }: Safe4337ExecutableProps): Promise<string>
  /**
   * Return a UserOperation based on a hash (userOpHash) returned by eth_sendUserOperation
   *
   * @param {string} userOpHash - The hash of the user operation to fetch. Returned from the #sendUserOperation method
   * @returns {UserOperation} - null in case the UserOperation is not yet included in a block, or a full UserOperation, with the addition of entryPoint, blockNumber, blockHash and transactionHash
   */
  getUserOperationByHash(userOpHash: string): Promise<UserOperationWithPayload>
  /**
   * Return a UserOperation receipt based on a hash (userOpHash) returned by eth_sendUserOperation
   *
   * @param {string} userOpHash - The hash of the user operation to fetch. Returned from the #sendUserOperation method
   * @returns {UserOperationReceipt} - null in case the UserOperation is not yet included in a block, or UserOperationReceipt object
   */
  getUserOperationReceipt(userOpHash: string): Promise<UserOperationReceipt | null>
  /**
   * Returns an array of the entryPoint addresses supported by the client.
   * The first element of the array SHOULD be the entryPoint addressed preferred by the client.
   *
   * @returns {string[]} - The supported entry points.
   */
  getSupportedEntryPoints(): Promise<string[]>
  /**
   * Returns EIP-155 Chain ID.
   *
   * @returns {string} - The chain id.
   */
  getChainId(): Promise<string>
}
