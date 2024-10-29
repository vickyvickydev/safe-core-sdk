'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        var desc = Object.getOwnPropertyDescriptor(m, k)
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k]
            }
          }
        }
        Object.defineProperty(o, k2, desc)
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
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
var _Safe4337Pack_instances,
  _Safe4337Pack_BUNDLER_URL,
  _Safe4337Pack_ENTRYPOINT_ADDRESS,
  _Safe4337Pack_SAFE_4337_MODULE_ADDRESS,
  _Safe4337Pack_SAFE_WEBAUTHN_SHARED_SIGNER_ADDRESS,
  _Safe4337Pack_bundlerClient,
  _Safe4337Pack_chainId,
  _Safe4337Pack_paymasterOptions,
  _Safe4337Pack_toSafeOperation,
  _Safe4337Pack_timestamp,
  _Safe4337Pack_getSafeNonceFromEntrypoint,
  _Safe4337Pack_encodeExecuteUserOpCallData
Object.defineProperty(exports, '__esModule', { value: true })
exports.Safe4337Pack = void 0
const satisfies_1 = __importDefault(require('semver/functions/satisfies'))
const protocol_kit_1 = __importStar(require('@safe-global/protocol-kit'))
const RelayKitBasePack_1 = require('../../RelayKitBasePack')
const types_kit_1 = require('@safe-global/types-kit')
const safe_modules_deployments_1 = require('@safe-global/safe-modules-deployments')
const viem_1 = require('viem')
const SafeOperation_1 = __importDefault(require('./SafeOperation'))
const constants_1 = require('./constants')
const utils_1 = require('./utils')
const entrypoint_1 = require('./utils/entrypoint')
const PimlicoFeeEstimator_1 = require('./estimators/PimlicoFeeEstimator')
const MAX_ERC20_AMOUNT_TO_APPROVE =
  0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn
const EQ_OR_GT_1_4_1 = '>=1.4.1'
/**
 * Safe4337Pack class that extends RelayKitBasePack.
 * This class provides an implementation of the ERC-4337 that enables Safe accounts to wrk with UserOperations.
 * It allows to create, sign and execute transactions using the Safe 4337 Module.
 *
 * @class
 * @link https://github.com/safe-global/safe-modules/blob/main/modules/4337/contracts/Safe4337Module.sol
 * @link https://eips.ethereum.org/EIPS/eip-4337
 */
class Safe4337Pack extends RelayKitBasePack_1.RelayKitBasePack {
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
  }) {
    super(protocolKit)
    _Safe4337Pack_instances.add(this)
    _Safe4337Pack_BUNDLER_URL.set(this, void 0)
    _Safe4337Pack_ENTRYPOINT_ADDRESS.set(this, void 0)
    _Safe4337Pack_SAFE_4337_MODULE_ADDRESS.set(this, '0x')
    _Safe4337Pack_SAFE_WEBAUTHN_SHARED_SIGNER_ADDRESS.set(this, '0x')
    _Safe4337Pack_bundlerClient.set(this, void 0)
    _Safe4337Pack_chainId.set(this, void 0)
    _Safe4337Pack_paymasterOptions.set(this, void 0)
    __classPrivateFieldSet(this, _Safe4337Pack_BUNDLER_URL, bundlerUrl, 'f')
    __classPrivateFieldSet(this, _Safe4337Pack_bundlerClient, bundlerClient, 'f')
    __classPrivateFieldSet(this, _Safe4337Pack_chainId, chainId, 'f')
    __classPrivateFieldSet(this, _Safe4337Pack_paymasterOptions, paymasterOptions, 'f')
    __classPrivateFieldSet(this, _Safe4337Pack_ENTRYPOINT_ADDRESS, entryPointAddress, 'f')
    __classPrivateFieldSet(this, _Safe4337Pack_SAFE_4337_MODULE_ADDRESS, safe4337ModuleAddress, 'f')
    __classPrivateFieldSet(
      this,
      _Safe4337Pack_SAFE_WEBAUTHN_SHARED_SIGNER_ADDRESS,
      safeWebAuthnSharedSignerAddress || '0x',
      'f'
    )
  }
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
  static async init(initOptions) {
    const { provider, signer, options, bundlerUrl, customContracts, paymasterOptions } = initOptions
    let protocolKit
    const bundlerClient = (0, utils_1.getEip4337BundlerProvider)(bundlerUrl)
    const chainId = await bundlerClient.request({ method: constants_1.RPC_4337_CALLS.CHAIN_ID })
    let addModulesLibAddress = customContracts?.addModulesLibAddress
    const network = parseInt(chainId, 16).toString()
    const safeModulesVersion =
      initOptions.safeModulesVersion || constants_1.DEFAULT_SAFE_MODULES_VERSION
    if ((0, satisfies_1.default)(safeModulesVersion, entrypoint_1.EQ_OR_GT_0_3_0)) {
      throw new Error(
        `Incompatibility detected: Safe modules version ${safeModulesVersion} is not supported. The SDK can use 0.2.0 only.`
      )
    }
    if (!addModulesLibAddress) {
      const addModulesDeployment = (0, safe_modules_deployments_1.getAddModulesLibDeployment)({
        released: true,
        version: safeModulesVersion,
        network
      })
      addModulesLibAddress = addModulesDeployment?.networkAddresses[network]
    }
    let safe4337ModuleAddress = customContracts?.safe4337ModuleAddress
    if (!safe4337ModuleAddress) {
      const safe4337ModuleDeployment = (0, safe_modules_deployments_1.getSafe4337ModuleDeployment)({
        released: true,
        version: safeModulesVersion,
        network
      })
      safe4337ModuleAddress = safe4337ModuleDeployment?.networkAddresses[network]
    }
    if (!addModulesLibAddress || !safe4337ModuleAddress) {
      throw new Error(
        `Safe4337Module and/or AddModulesLib not available for chain ${network} and modules version ${safeModulesVersion}`
      )
    }
    let safeWebAuthnSharedSignerAddress = customContracts?.safeWebAuthnSharedSignerAddress
    // Existing Safe
    if ('safeAddress' in options) {
      protocolKit = await protocol_kit_1.default.init({
        provider,
        signer,
        safeAddress: options.safeAddress
      })
      const safeVersion = protocolKit.getContractVersion()
      const isSafeVersion4337Compatible = (0, satisfies_1.default)(safeVersion, EQ_OR_GT_1_4_1)
      if (!isSafeVersion4337Compatible) {
        throw new Error(
          `Incompatibility detected: The current Safe Account version (${safeVersion}) is not supported. EIP-4337 requires the Safe to use at least v1.4.1.`
        )
      }
      const safeModules = await protocolKit.getModules()
      const is4337ModulePresent = safeModules.some((module) => module === safe4337ModuleAddress)
      if (!is4337ModulePresent) {
        throw new Error(
          `Incompatibility detected: The EIP-4337 module is not enabled in the provided Safe Account. Enable this module (address: ${safe4337ModuleAddress}) to add compatibility.`
        )
      }
      const safeFallbackhandler = await protocolKit.getFallbackHandler()
      const is4337FallbackhandlerPresent = safeFallbackhandler === safe4337ModuleAddress
      if (!is4337FallbackhandlerPresent) {
        throw new Error(
          `Incompatibility detected: The EIP-4337 fallbackhandler is not attached to the Safe Account. Attach this fallbackhandler (address: ${safe4337ModuleAddress}) to ensure compatibility.`
        )
      }
    } else {
      // New Safe will be created based on the provided configuration when bundling a new UserOperation
      if (!options.owners || !options.threshold) {
        throw new Error('Owners and threshold are required to deploy a new Safe')
      }
      const safeVersion = options.safeVersion || constants_1.DEFAULT_SAFE_VERSION
      // we need to create a batch to setup the 4337 Safe Account
      // first setup transaction: Enable 4337 module
      const enable4337ModuleTransaction = {
        to: addModulesLibAddress,
        value: '0',
        data: (0, viem_1.encodeFunctionData)({
          abi: constants_1.ABI,
          functionName: 'enableModules',
          args: [[safe4337ModuleAddress]]
        }),
        operation: types_kit_1.OperationType.DelegateCall // DelegateCall required for enabling the 4337 module
      }
      const setupTransactions = [enable4337ModuleTransaction]
      const isApproveTransactionRequired =
        !!paymasterOptions &&
        !paymasterOptions.isSponsored &&
        !!paymasterOptions.paymasterTokenAddress
      if (isApproveTransactionRequired) {
        const { paymasterAddress, amountToApprove = MAX_ERC20_AMOUNT_TO_APPROVE } = paymasterOptions
        // second transaction: approve ERC-20 paymaster token
        const approveToPaymasterTransaction = {
          to: paymasterOptions.paymasterTokenAddress,
          data: (0, viem_1.encodeFunctionData)({
            abi: constants_1.ABI,
            functionName: 'approve',
            args: [paymasterAddress, amountToApprove]
          }),
          value: '0',
          operation: types_kit_1.OperationType.Call // Call for approve
        }
        setupTransactions.push(approveToPaymasterTransaction)
      }
      const safeProvider = await protocol_kit_1.SafeProvider.init({ provider, signer, safeVersion })
      // third transaction: passkey support via shared signer SafeWebAuthnSharedSigner
      // see: https://github.com/safe-global/safe-modules/blob/main/modules/passkey/contracts/4337/experimental/README.md
      const isPasskeySigner = await safeProvider.isPasskeySigner()
      if (isPasskeySigner) {
        if (!safeWebAuthnSharedSignerAddress) {
          const safeWebAuthnSharedSignerDeployment = (0,
          safe_modules_deployments_1.getSafeWebAuthnShareSignerDeployment)({
            released: true,
            version: '0.2.1',
            network
          })
          safeWebAuthnSharedSignerAddress =
            safeWebAuthnSharedSignerDeployment?.networkAddresses[network]
        }
        if (!safeWebAuthnSharedSignerAddress) {
          throw new Error(`safeWebAuthnSharedSignerAddress not available for chain ${network}`)
        }
        const passkeySigner = await safeProvider.getExternalSigner()
        if (!options.owners.includes(safeWebAuthnSharedSignerAddress)) {
          options.owners.push(safeWebAuthnSharedSignerAddress)
        }
        const sharedSignerTransaction = {
          to: safeWebAuthnSharedSignerAddress,
          value: '0',
          data: passkeySigner.encodeConfigure(),
          operation: types_kit_1.OperationType.DelegateCall // DelegateCall required into the SafeWebAuthnSharedSigner instance in order for it to set its configuration.
        }
        setupTransactions.push(sharedSignerTransaction)
      }
      let deploymentTo
      let deploymentData
      const isBatch = setupTransactions.length > 1
      if (isBatch) {
        const multiSendContract = await (0, protocol_kit_1.getMultiSendContract)({
          safeProvider,
          safeVersion
        })
        const batchData = (0, viem_1.encodeFunctionData)({
          abi: constants_1.ABI,
          functionName: 'multiSend',
          args: [(0, protocol_kit_1.encodeMultiSendData)(setupTransactions)]
        })
        deploymentTo = multiSendContract.getAddress()
        deploymentData = batchData
      } else {
        deploymentTo = enable4337ModuleTransaction.to
        deploymentData = enable4337ModuleTransaction.data
      }
      protocolKit = await protocol_kit_1.default.init({
        provider,
        signer,
        predictedSafe: {
          safeDeploymentConfig: {
            safeVersion,
            saltNonce: options.saltNonce || undefined
          },
          safeAccountConfig: {
            owners: options.owners,
            threshold: options.threshold,
            to: deploymentTo,
            data: deploymentData,
            fallbackHandler: safe4337ModuleAddress,
            paymentToken: viem_1.zeroAddress,
            payment: 0,
            paymentReceiver: viem_1.zeroAddress
          }
        }
      })
    }
    let selectedEntryPoint
    if (customContracts?.entryPointAddress) {
      const requiredSafeModulesVersion = (0, entrypoint_1.entryPointToSafeModules)(
        customContracts?.entryPointAddress
      )
      if (!(0, satisfies_1.default)(safeModulesVersion, requiredSafeModulesVersion))
        throw new Error(
          `The selected entrypoint ${customContracts?.entryPointAddress} is not compatible with version ${safeModulesVersion} of Safe modules`
        )
      selectedEntryPoint = customContracts?.entryPointAddress
    } else {
      const supportedEntryPoints = await bundlerClient.request({
        method: constants_1.RPC_4337_CALLS.SUPPORTED_ENTRY_POINTS
      })
      if (!supportedEntryPoints.length) {
        throw new Error('No entrypoint provided or available through the bundler')
      }
      selectedEntryPoint = supportedEntryPoints.find((entryPoint) => {
        const requiredSafeModulesVersion = (0, entrypoint_1.entryPointToSafeModules)(entryPoint)
        return (0, satisfies_1.default)(safeModulesVersion, requiredSafeModulesVersion)
      })
      if (!selectedEntryPoint) {
        throw new Error(
          `Incompatibility detected: None of the entrypoints provided by the bundler is compatible with the Safe modules version ${safeModulesVersion}`
        )
      }
    }
    return new Safe4337Pack({
      chainId: BigInt(chainId),
      protocolKit,
      bundlerClient,
      paymasterOptions,
      bundlerUrl,
      entryPointAddress: selectedEntryPoint,
      safe4337ModuleAddress,
      safeWebAuthnSharedSignerAddress
    })
  }
  /**
   * Estimates gas for the SafeOperation.
   *
   * @param {EstimateFeeProps} props - The parameters for the gas estimation.
   * @param {EthSafeOperation} props.safeOperation - The SafeOperation to estimate the gas.
   * @param {IFeeEstimator} props.feeEstimator - The function to estimate the gas.
   * @return {Promise<EthSafeOperation>} The Promise object that will be resolved into the gas estimation.
   */
  async getEstimateFee({
    safeOperation,
    feeEstimator = new PimlicoFeeEstimator_1.PimlicoFeeEstimator()
  }) {
    const threshold = await this.protocolKit.getThreshold()
    const setupEstimationData = await feeEstimator?.setupEstimation?.({
      bundlerUrl: __classPrivateFieldGet(this, _Safe4337Pack_BUNDLER_URL, 'f'),
      entryPoint: __classPrivateFieldGet(this, _Safe4337Pack_ENTRYPOINT_ADDRESS, 'f'),
      userOperation: safeOperation.toUserOperation()
    })
    if (setupEstimationData) {
      safeOperation.addEstimations(setupEstimationData)
    }
    const estimateUserOperationGas = await __classPrivateFieldGet(
      this,
      _Safe4337Pack_bundlerClient,
      'f'
    ).request({
      method: constants_1.RPC_4337_CALLS.ESTIMATE_USER_OPERATION_GAS,
      params: [
        (0, utils_1.userOperationToHexValues)(
          (0, utils_1.addDummySignature)(
            safeOperation.toUserOperation(),
            __classPrivateFieldGet(this, _Safe4337Pack_SAFE_WEBAUTHN_SHARED_SIGNER_ADDRESS, 'f'),
            threshold
          )
        ),
        __classPrivateFieldGet(this, _Safe4337Pack_ENTRYPOINT_ADDRESS, 'f')
      ]
    })
    if (estimateUserOperationGas) {
      safeOperation.addEstimations({
        preVerificationGas: BigInt(estimateUserOperationGas.preVerificationGas),
        verificationGasLimit: BigInt(estimateUserOperationGas.verificationGasLimit),
        callGasLimit: BigInt(estimateUserOperationGas.callGasLimit)
      })
    }
    const adjustEstimationData = await feeEstimator?.adjustEstimation?.({
      bundlerUrl: __classPrivateFieldGet(this, _Safe4337Pack_BUNDLER_URL, 'f'),
      entryPoint: __classPrivateFieldGet(this, _Safe4337Pack_ENTRYPOINT_ADDRESS, 'f'),
      userOperation: safeOperation.toUserOperation()
    })
    if (adjustEstimationData) {
      safeOperation.addEstimations(adjustEstimationData)
    }
    if (__classPrivateFieldGet(this, _Safe4337Pack_paymasterOptions, 'f')?.isSponsored) {
      if (!__classPrivateFieldGet(this, _Safe4337Pack_paymasterOptions, 'f').paymasterUrl) {
        throw new Error('No paymaster url provided for a sponsored transaction')
      }
      const paymasterEstimation = await feeEstimator?.getPaymasterEstimation?.({
        userOperation: (0, utils_1.addDummySignature)(
          safeOperation.toUserOperation(),
          __classPrivateFieldGet(this, _Safe4337Pack_SAFE_WEBAUTHN_SHARED_SIGNER_ADDRESS, 'f'),
          threshold
        ),
        paymasterUrl: __classPrivateFieldGet(this, _Safe4337Pack_paymasterOptions, 'f')
          .paymasterUrl,
        entryPoint: __classPrivateFieldGet(this, _Safe4337Pack_ENTRYPOINT_ADDRESS, 'f'),
        sponsorshipPolicyId: __classPrivateFieldGet(this, _Safe4337Pack_paymasterOptions, 'f')
          .sponsorshipPolicyId
      })
      safeOperation.data.paymasterAndData =
        paymasterEstimation?.paymasterAndData || safeOperation.data.paymasterAndData
      if (paymasterEstimation) {
        safeOperation.addEstimations(paymasterEstimation)
      }
    }
    return safeOperation
  }
  /**
   * Creates a relayed transaction based on the provided parameters.
   *
   * @param {MetaTransactionData[]} transactions - The transactions to batch in a SafeOperation.
   * @param options - Optional configuration options for the transaction creation.
   * @return {Promise<EthSafeOperation>} The Promise object will resolve a SafeOperation.
   */
  async createTransaction({ transactions, options = {} }) {
    const safeAddress = await this.protocolKit.getAddress()
    const nonce = await __classPrivateFieldGet(
      this,
      _Safe4337Pack_instances,
      'm',
      _Safe4337Pack_getSafeNonceFromEntrypoint
    ).call(this, safeAddress)
    const { amountToApprove, validUntil, validAfter, feeEstimator } = options
    if (amountToApprove) {
      const paymasterOptions = __classPrivateFieldGet(this, _Safe4337Pack_paymasterOptions, 'f')
      if (!paymasterOptions.paymasterTokenAddress) {
        throw new Error('Paymaster must be initialized')
      }
      const approveToPaymasterTransaction = {
        to: paymasterOptions.paymasterTokenAddress,
        data: (0, viem_1.encodeFunctionData)({
          abi: constants_1.ABI,
          functionName: 'approve',
          args: [paymasterOptions.paymasterAddress, amountToApprove]
        }),
        value: '0',
        operation: types_kit_1.OperationType.Call // Call for approve
      }
      transactions.push(approveToPaymasterTransaction)
    }
    const isBatch = transactions.length > 1
    const multiSendAddress = this.protocolKit.getMultiSendAddress()
    const callData = isBatch
      ? __classPrivateFieldGet(
          this,
          _Safe4337Pack_instances,
          'm',
          _Safe4337Pack_encodeExecuteUserOpCallData
        ).call(this, {
          to: multiSendAddress,
          value: '0',
          data: (0, utils_1.encodeMultiSendCallData)(transactions),
          operation: types_kit_1.OperationType.DelegateCall
        })
      : __classPrivateFieldGet(
          this,
          _Safe4337Pack_instances,
          'm',
          _Safe4337Pack_encodeExecuteUserOpCallData
        ).call(this, transactions[0])
    const paymasterAndData =
      __classPrivateFieldGet(this, _Safe4337Pack_paymasterOptions, 'f') &&
      'paymasterAddress' in __classPrivateFieldGet(this, _Safe4337Pack_paymasterOptions, 'f')
        ? __classPrivateFieldGet(this, _Safe4337Pack_paymasterOptions, 'f').paymasterAddress
        : '0x'
    const userOperation = {
      sender: safeAddress,
      nonce: nonce,
      initCode: '0x',
      callData,
      callGasLimit: 1n,
      verificationGasLimit: 1n,
      preVerificationGas: 1n,
      maxFeePerGas: 1n,
      maxPriorityFeePerGas: 1n,
      paymasterAndData,
      signature: '0x'
    }
    const isSafeDeployed = await this.protocolKit.isSafeDeployed()
    if (!isSafeDeployed) {
      userOperation.initCode = await this.protocolKit.getInitCode()
    }
    const safeOperation = new SafeOperation_1.default(userOperation, {
      chainId: __classPrivateFieldGet(this, _Safe4337Pack_chainId, 'f'),
      moduleAddress: __classPrivateFieldGet(this, _Safe4337Pack_SAFE_4337_MODULE_ADDRESS, 'f'),
      entryPoint: __classPrivateFieldGet(this, _Safe4337Pack_ENTRYPOINT_ADDRESS, 'f'),
      validUntil,
      validAfter
    })
    return await this.getEstimateFee({
      safeOperation,
      feeEstimator
    })
  }
  /**
   * Signs a safe operation.
   *
   * @param {EthSafeOperation | SafeOperationResponse} safeOperation - The SafeOperation to sign. It can be:
   * - A response from the API (Tx Service)
   * - An instance of EthSafeOperation
   * @param {SigningMethod} signingMethod - The signing method to use.
   * @return {Promise<EthSafeOperation>} The Promise object will resolve to the signed SafeOperation.
   */
  async signSafeOperation(
    safeOperation,
    signingMethod = protocol_kit_1.SigningMethod.ETH_SIGN_TYPED_DATA_V4
  ) {
    let safeOp
    if ((0, types_kit_1.isSafeOperationResponse)(safeOperation)) {
      safeOp = __classPrivateFieldGet(
        this,
        _Safe4337Pack_instances,
        'm',
        _Safe4337Pack_toSafeOperation
      ).call(this, safeOperation)
    } else {
      safeOp = safeOperation
    }
    const safeProvider = this.protocolKit.getSafeProvider()
    const signerAddress = await safeProvider.getSignerAddress()
    const isPasskeySigner = await safeProvider.isPasskeySigner()
    if (!signerAddress) {
      throw new Error('There is no signer address available to sign the SafeOperation')
    }
    const isOwner = await this.protocolKit.isOwner(signerAddress)
    const isSafeDeployed = await this.protocolKit.isSafeDeployed()
    if ((!isOwner && isSafeDeployed) || (!isSafeDeployed && !isPasskeySigner && !isOwner)) {
      throw new Error('UserOperations can only be signed by Safe owners')
    }
    let signature
    if (isPasskeySigner) {
      const safeOpHash = safeOp.getHash()
      // if the Safe is not deployed we force the Shared Signer signature
      if (!isSafeDeployed) {
        const passkeySignature = await this.protocolKit.signHash(safeOpHash)
        // SafeWebAuthnSharedSigner signature
        signature = new protocol_kit_1.EthSafeSignature(
          __classPrivateFieldGet(this, _Safe4337Pack_SAFE_WEBAUTHN_SHARED_SIGNER_ADDRESS, 'f'),
          passkeySignature.data,
          true // passkeys are contract signatures
        )
      } else {
        signature = await this.protocolKit.signHash(safeOpHash)
      }
    } else {
      if (
        signingMethod in
        [
          protocol_kit_1.SigningMethod.ETH_SIGN_TYPED_DATA_V4,
          protocol_kit_1.SigningMethod.ETH_SIGN_TYPED_DATA_V3,
          protocol_kit_1.SigningMethod.ETH_SIGN_TYPED_DATA
        ]
      ) {
        signature = await (0, utils_1.signSafeOp)(
          safeOp.data,
          this.protocolKit.getSafeProvider(),
          __classPrivateFieldGet(this, _Safe4337Pack_SAFE_4337_MODULE_ADDRESS, 'f')
        )
      } else {
        const safeOpHash = safeOp.getHash()
        signature = await this.protocolKit.signHash(safeOpHash)
      }
    }
    const signedSafeOperation = new SafeOperation_1.default(safeOp.toUserOperation(), {
      chainId: __classPrivateFieldGet(this, _Safe4337Pack_chainId, 'f'),
      moduleAddress: __classPrivateFieldGet(this, _Safe4337Pack_SAFE_4337_MODULE_ADDRESS, 'f'),
      entryPoint: __classPrivateFieldGet(this, _Safe4337Pack_ENTRYPOINT_ADDRESS, 'f'),
      validUntil: safeOp.data.validUntil,
      validAfter: safeOp.data.validAfter
    })
    safeOp.signatures.forEach((signature) => {
      signedSafeOperation.addSignature(signature)
    })
    signedSafeOperation.addSignature(signature)
    return signedSafeOperation
  }
  /**
   * Executes the relay transaction.
   *
   * @param {Safe4337ExecutableProps} props - The parameters for the transaction execution.
   * @param {EthSafeOperation | SafeOperationResponse} props.executable - The SafeOperation to execute. It can be:
   * - A response from the API (Tx Service)
   * - An instance of EthSafeOperation
   * @return {Promise<string>} The user operation hash.
   */
  async executeTransaction({ executable }) {
    let safeOperation
    if ((0, types_kit_1.isSafeOperationResponse)(executable)) {
      safeOperation = __classPrivateFieldGet(
        this,
        _Safe4337Pack_instances,
        'm',
        _Safe4337Pack_toSafeOperation
      ).call(this, executable)
    } else {
      safeOperation = executable
    }
    const userOperation = safeOperation.toUserOperation()
    return __classPrivateFieldGet(this, _Safe4337Pack_bundlerClient, 'f').request({
      method: constants_1.RPC_4337_CALLS.SEND_USER_OPERATION,
      params: [
        (0, utils_1.userOperationToHexValues)(userOperation),
        __classPrivateFieldGet(this, _Safe4337Pack_ENTRYPOINT_ADDRESS, 'f')
      ]
    })
  }
  /**
   * Return a UserOperation based on a hash (userOpHash) returned by eth_sendUserOperation
   *
   * @param {string} userOpHash - The hash of the user operation to fetch. Returned from the #sendUserOperation method
   * @returns {UserOperation} - null in case the UserOperation is not yet included in a block, or a full UserOperation, with the addition of entryPoint, blockNumber, blockHash and transactionHash
   */
  async getUserOperationByHash(userOpHash) {
    return __classPrivateFieldGet(this, _Safe4337Pack_bundlerClient, 'f').request({
      method: constants_1.RPC_4337_CALLS.GET_USER_OPERATION_BY_HASH,
      params: [userOpHash]
    })
  }
  /**
   * Return a UserOperation receipt based on a hash (userOpHash) returned by eth_sendUserOperation
   *
   * @param {string} userOpHash - The hash of the user operation to fetch. Returned from the #sendUserOperation method
   * @returns {UserOperationReceipt} - null in case the UserOperation is not yet included in a block, or UserOperationReceipt object
   */
  async getUserOperationReceipt(userOpHash) {
    return __classPrivateFieldGet(this, _Safe4337Pack_bundlerClient, 'f').request({
      method: constants_1.RPC_4337_CALLS.GET_USER_OPERATION_RECEIPT,
      params: [userOpHash]
    })
  }
  /**
   * Returns an array of the entryPoint addresses supported by the client.
   * The first element of the array SHOULD be the entryPoint addressed preferred by the client.
   *
   * @returns {string[]} - The supported entry points.
   */
  async getSupportedEntryPoints() {
    return __classPrivateFieldGet(this, _Safe4337Pack_bundlerClient, 'f').request({
      method: constants_1.RPC_4337_CALLS.SUPPORTED_ENTRY_POINTS
    })
  }
  /**
   * Returns EIP-155 Chain ID.
   *
   * @returns {string} - The chain id.
   */
  async getChainId() {
    return __classPrivateFieldGet(this, _Safe4337Pack_bundlerClient, 'f').request({
      method: constants_1.RPC_4337_CALLS.CHAIN_ID
    })
  }
}
exports.Safe4337Pack = Safe4337Pack
;(_Safe4337Pack_BUNDLER_URL = new WeakMap()),
  (_Safe4337Pack_ENTRYPOINT_ADDRESS = new WeakMap()),
  (_Safe4337Pack_SAFE_4337_MODULE_ADDRESS = new WeakMap()),
  (_Safe4337Pack_SAFE_WEBAUTHN_SHARED_SIGNER_ADDRESS = new WeakMap()),
  (_Safe4337Pack_bundlerClient = new WeakMap()),
  (_Safe4337Pack_chainId = new WeakMap()),
  (_Safe4337Pack_paymasterOptions = new WeakMap()),
  (_Safe4337Pack_instances = new WeakSet()),
  (_Safe4337Pack_toSafeOperation = function _Safe4337Pack_toSafeOperation(safeOperationResponse) {
    const { validUntil, validAfter, userOperation } = safeOperationResponse
    const paymaster = userOperation?.paymaster || '0x'
    const paymasterData = userOperation?.paymasterData || '0x'
    const safeOperation = new SafeOperation_1.default(
      {
        sender: userOperation?.sender || '0x',
        nonce: userOperation?.nonce?.toString() || '0',
        initCode: userOperation?.initCode || '',
        callData: userOperation?.callData || '',
        callGasLimit: BigInt(userOperation?.callGasLimit || 0n),
        verificationGasLimit: BigInt(userOperation?.verificationGasLimit || 0),
        preVerificationGas: BigInt(userOperation?.preVerificationGas || 0),
        maxFeePerGas: BigInt(userOperation?.maxFeePerGas || 0),
        maxPriorityFeePerGas: BigInt(userOperation?.maxPriorityFeePerGas || 0),
        paymasterAndData: (0, viem_1.concat)([paymaster, paymasterData]),
        signature: safeOperationResponse.preparedSignature || '0x'
      },
      {
        chainId: __classPrivateFieldGet(this, _Safe4337Pack_chainId, 'f'),
        moduleAddress: __classPrivateFieldGet(this, _Safe4337Pack_SAFE_4337_MODULE_ADDRESS, 'f'),
        entryPoint:
          userOperation?.entryPoint ||
          __classPrivateFieldGet(this, _Safe4337Pack_ENTRYPOINT_ADDRESS, 'f'),
        validAfter: __classPrivateFieldGet(
          this,
          _Safe4337Pack_instances,
          'm',
          _Safe4337Pack_timestamp
        ).call(this, validAfter),
        validUntil: __classPrivateFieldGet(
          this,
          _Safe4337Pack_instances,
          'm',
          _Safe4337Pack_timestamp
        ).call(this, validUntil)
      }
    )
    if (safeOperationResponse.confirmations) {
      safeOperationResponse.confirmations.forEach((confirmation) => {
        safeOperation.addSignature(
          new protocol_kit_1.EthSafeSignature(confirmation.owner, confirmation.signature)
        )
      })
    }
    return safeOperation
  }),
  (_Safe4337Pack_timestamp = function _Safe4337Pack_timestamp(date) {
    return date ? new Date(date).getTime() / 1000 : undefined
  }),
  (_Safe4337Pack_getSafeNonceFromEntrypoint =
    /**
     * Gets account nonce from the bundler.
     *
     * @param {string} safeAddress - Account address for which the nonce is to be fetched.
     * @returns {Promise<string>} The Promise object will resolve to the account nonce.
     */
    async function _Safe4337Pack_getSafeNonceFromEntrypoint(safeAddress) {
      const safeProvider = this.protocolKit.getSafeProvider()
      const newNonce = await safeProvider.readContract({
        address: __classPrivateFieldGet(this, _Safe4337Pack_ENTRYPOINT_ADDRESS, 'f') || '0x',
        abi: constants_1.ENTRYPOINT_ABI,
        functionName: 'getNonce',
        args: [safeAddress, 0n]
      })
      return newNonce.toString()
    }),
  (_Safe4337Pack_encodeExecuteUserOpCallData = function _Safe4337Pack_encodeExecuteUserOpCallData(
    transaction
  ) {
    return (0, viem_1.encodeFunctionData)({
      abi: constants_1.ABI,
      functionName: 'executeUserOp',
      args: [
        transaction.to,
        BigInt(transaction.value),
        transaction.data,
        transaction.operation || types_kit_1.OperationType.Call
      ]
    })
  })
//# sourceMappingURL=Safe4337Pack.js.map
