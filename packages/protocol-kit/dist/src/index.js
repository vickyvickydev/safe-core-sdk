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
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p)
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.EthSafeTransaction =
  exports.createPasskeyClient =
  exports.SafeProvider =
  exports.generateTypedData =
  exports.hashSafeMessage =
  exports.getSafeAddressFromDeploymentTx =
  exports.getEip712MessageTypes =
  exports.getEip712TxTypes =
  exports.preimageSafeMessageHash =
  exports.preimageSafeTransactionHash =
  exports.buildSignatureBytes =
  exports.buildContractSignature =
  exports.generateEIP712Signature =
  exports.generateSignature =
  exports.validateEthereumAddress =
  exports.validateEip3770Address =
  exports.standardizeSafeTransactionData =
  exports.getPredictedSafeAddressInitCode =
  exports.predictSafeAddress =
  exports.isGasTokenCompatibleWithHandlePayment =
  exports.getSafeWebAuthnSharedSignerContract =
  exports.getSafeWebAuthnSignerFactoryContract =
  exports.getSignMessageLibContract =
  exports.getSafeContract =
  exports.getSafeProxyFactoryContract =
  exports.getMultiSendContract =
  exports.getMultiSendCallOnlyContract =
  exports.getERC20Decimals =
  exports.getCreateCallContract =
  exports.getCompatibilityFallbackHandlerContract =
  exports.encodeSetupCallData =
  exports.encodeMultiSendData =
  exports.encodeCreateProxyWithNonce =
  exports.SignMessageLibBaseContract =
  exports.SafeProxyFactoryBaseContract =
  exports.SafeBaseContract =
  exports.PREDETERMINED_SALT_NONCE =
  exports.MultiSendBaseContract =
  exports.MultiSendCallOnlyBaseContract =
  exports.EthSafeSignature =
  exports.DEFAULT_SAFE_VERSION =
  exports.createERC20TokenTransferTransaction =
  exports.CreateCallBaseContract =
  exports.ContractManager =
  exports.extractPasskeyCoordinates =
  exports.extractPasskeyData =
  exports.estimateSafeDeploymentGas =
  exports.estimateSafeTxGas =
  exports.estimateTxGas =
  exports.estimateTxBaseGas =
    void 0
exports.getPasskeyOwnerAddress = exports.EthSafeMessage = void 0
const Safe_1 = __importDefault(require('./Safe'))
const SafeProvider_1 = __importDefault(require('./SafeProvider'))
exports.SafeProvider = SafeProvider_1.default
const contracts_1 = require('./contracts')
Object.defineProperty(exports, 'CreateCallBaseContract', {
  enumerable: true,
  get: function () {
    return contracts_1.CreateCallBaseContract
  }
})
Object.defineProperty(exports, 'MultiSendBaseContract', {
  enumerable: true,
  get: function () {
    return contracts_1.MultiSendBaseContract
  }
})
Object.defineProperty(exports, 'MultiSendCallOnlyBaseContract', {
  enumerable: true,
  get: function () {
    return contracts_1.MultiSendCallOnlyBaseContract
  }
})
Object.defineProperty(exports, 'SafeBaseContract', {
  enumerable: true,
  get: function () {
    return contracts_1.SafeBaseContract
  }
})
Object.defineProperty(exports, 'SafeProxyFactoryBaseContract', {
  enumerable: true,
  get: function () {
    return contracts_1.SafeProxyFactoryBaseContract
  }
})
Object.defineProperty(exports, 'SignMessageLibBaseContract', {
  enumerable: true,
  get: function () {
    return contracts_1.SignMessageLibBaseContract
  }
})
const config_1 = require('./contracts/config')
Object.defineProperty(exports, 'DEFAULT_SAFE_VERSION', {
  enumerable: true,
  get: function () {
    return config_1.DEFAULT_SAFE_VERSION
  }
})
const safeDeploymentContracts_1 = require('./contracts/safeDeploymentContracts')
Object.defineProperty(exports, 'getCompatibilityFallbackHandlerContract', {
  enumerable: true,
  get: function () {
    return safeDeploymentContracts_1.getCompatibilityFallbackHandlerContract
  }
})
Object.defineProperty(exports, 'getCreateCallContract', {
  enumerable: true,
  get: function () {
    return safeDeploymentContracts_1.getCreateCallContract
  }
})
Object.defineProperty(exports, 'getMultiSendCallOnlyContract', {
  enumerable: true,
  get: function () {
    return safeDeploymentContracts_1.getMultiSendCallOnlyContract
  }
})
Object.defineProperty(exports, 'getMultiSendContract', {
  enumerable: true,
  get: function () {
    return safeDeploymentContracts_1.getMultiSendContract
  }
})
Object.defineProperty(exports, 'getSafeProxyFactoryContract', {
  enumerable: true,
  get: function () {
    return safeDeploymentContracts_1.getSafeProxyFactoryContract
  }
})
Object.defineProperty(exports, 'getSafeContract', {
  enumerable: true,
  get: function () {
    return safeDeploymentContracts_1.getSafeContract
  }
})
Object.defineProperty(exports, 'getSignMessageLibContract', {
  enumerable: true,
  get: function () {
    return safeDeploymentContracts_1.getSignMessageLibContract
  }
})
Object.defineProperty(exports, 'getSafeWebAuthnSignerFactoryContract', {
  enumerable: true,
  get: function () {
    return safeDeploymentContracts_1.getSafeWebAuthnSignerFactoryContract
  }
})
Object.defineProperty(exports, 'getSafeWebAuthnSharedSignerContract', {
  enumerable: true,
  get: function () {
    return safeDeploymentContracts_1.getSafeWebAuthnSharedSignerContract
  }
})
const utils_1 = require('./contracts/utils')
Object.defineProperty(exports, 'PREDETERMINED_SALT_NONCE', {
  enumerable: true,
  get: function () {
    return utils_1.PREDETERMINED_SALT_NONCE
  }
})
Object.defineProperty(exports, 'encodeCreateProxyWithNonce', {
  enumerable: true,
  get: function () {
    return utils_1.encodeCreateProxyWithNonce
  }
})
Object.defineProperty(exports, 'encodeSetupCallData', {
  enumerable: true,
  get: function () {
    return utils_1.encodeSetupCallData
  }
})
Object.defineProperty(exports, 'predictSafeAddress', {
  enumerable: true,
  get: function () {
    return utils_1.predictSafeAddress
  }
})
Object.defineProperty(exports, 'getPredictedSafeAddressInitCode', {
  enumerable: true,
  get: function () {
    return utils_1.getPredictedSafeAddressInitCode
  }
})
Object.defineProperty(exports, 'getSafeAddressFromDeploymentTx', {
  enumerable: true,
  get: function () {
    return utils_1.getSafeAddressFromDeploymentTx
  }
})
const contractManager_1 = __importDefault(require('./managers/contractManager'))
exports.ContractManager = contractManager_1.default
const utils_2 = require('./utils')
Object.defineProperty(exports, 'EthSafeSignature', {
  enumerable: true,
  get: function () {
    return utils_2.EthSafeSignature
  }
})
Object.defineProperty(exports, 'estimateTxBaseGas', {
  enumerable: true,
  get: function () {
    return utils_2.estimateTxBaseGas
  }
})
Object.defineProperty(exports, 'estimateTxGas', {
  enumerable: true,
  get: function () {
    return utils_2.estimateTxGas
  }
})
Object.defineProperty(exports, 'estimateSafeTxGas', {
  enumerable: true,
  get: function () {
    return utils_2.estimateSafeTxGas
  }
})
Object.defineProperty(exports, 'estimateSafeDeploymentGas', {
  enumerable: true,
  get: function () {
    return utils_2.estimateSafeDeploymentGas
  }
})
Object.defineProperty(exports, 'extractPasskeyCoordinates', {
  enumerable: true,
  get: function () {
    return utils_2.extractPasskeyCoordinates
  }
})
Object.defineProperty(exports, 'extractPasskeyData', {
  enumerable: true,
  get: function () {
    return utils_2.extractPasskeyData
  }
})
Object.defineProperty(exports, 'validateEthereumAddress', {
  enumerable: true,
  get: function () {
    return utils_2.validateEthereumAddress
  }
})
Object.defineProperty(exports, 'validateEip3770Address', {
  enumerable: true,
  get: function () {
    return utils_2.validateEip3770Address
  }
})
const SafeTransaction_1 = __importDefault(require('./utils/transactions/SafeTransaction'))
exports.EthSafeTransaction = SafeTransaction_1.default
const SafeMessage_1 = __importDefault(require('./utils/messages/SafeMessage'))
exports.EthSafeMessage = SafeMessage_1.default
const utils_3 = require('./utils/transactions/utils')
Object.defineProperty(exports, 'encodeMultiSendData', {
  enumerable: true,
  get: function () {
    return utils_3.encodeMultiSendData
  }
})
Object.defineProperty(exports, 'standardizeSafeTransactionData', {
  enumerable: true,
  get: function () {
    return utils_3.standardizeSafeTransactionData
  }
})
const erc_20_1 = require('./utils/erc-20')
Object.defineProperty(exports, 'getERC20Decimals', {
  enumerable: true,
  get: function () {
    return erc_20_1.getERC20Decimals
  }
})
Object.defineProperty(exports, 'isGasTokenCompatibleWithHandlePayment', {
  enumerable: true,
  get: function () {
    return erc_20_1.isGasTokenCompatibleWithHandlePayment
  }
})
Object.defineProperty(exports, 'createERC20TokenTransferTransaction', {
  enumerable: true,
  get: function () {
    return erc_20_1.createERC20TokenTransferTransaction
  }
})
const utils_4 = require('./utils/signatures/utils')
Object.defineProperty(exports, 'generateSignature', {
  enumerable: true,
  get: function () {
    return utils_4.generateSignature
  }
})
Object.defineProperty(exports, 'generateEIP712Signature', {
  enumerable: true,
  get: function () {
    return utils_4.generateEIP712Signature
  }
})
Object.defineProperty(exports, 'buildContractSignature', {
  enumerable: true,
  get: function () {
    return utils_4.buildContractSignature
  }
})
Object.defineProperty(exports, 'buildSignatureBytes', {
  enumerable: true,
  get: function () {
    return utils_4.buildSignatureBytes
  }
})
Object.defineProperty(exports, 'preimageSafeTransactionHash', {
  enumerable: true,
  get: function () {
    return utils_4.preimageSafeTransactionHash
  }
})
Object.defineProperty(exports, 'preimageSafeMessageHash', {
  enumerable: true,
  get: function () {
    return utils_4.preimageSafeMessageHash
  }
})
const eip_712_1 = require('./utils/eip-712')
Object.defineProperty(exports, 'getEip712TxTypes', {
  enumerable: true,
  get: function () {
    return eip_712_1.getEip712TxTypes
  }
})
Object.defineProperty(exports, 'getEip712MessageTypes', {
  enumerable: true,
  get: function () {
    return eip_712_1.getEip712MessageTypes
  }
})
Object.defineProperty(exports, 'hashSafeMessage', {
  enumerable: true,
  get: function () {
    return eip_712_1.hashSafeMessage
  }
})
Object.defineProperty(exports, 'generateTypedData', {
  enumerable: true,
  get: function () {
    return eip_712_1.generateTypedData
  }
})
const PasskeyClient_1 = require('./utils/passkeys/PasskeyClient')
Object.defineProperty(exports, 'createPasskeyClient', {
  enumerable: true,
  get: function () {
    return PasskeyClient_1.createPasskeyClient
  }
})
const getPasskeyOwnerAddress_1 = __importDefault(require('./utils/passkeys/getPasskeyOwnerAddress'))
exports.getPasskeyOwnerAddress = getPasskeyOwnerAddress_1.default
__exportStar(require('./types'), exports)
exports.default = Safe_1.default
//# sourceMappingURL=index.js.map
