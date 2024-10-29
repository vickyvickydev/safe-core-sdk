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
exports.createSafeClient = void 0
const protocol_kit_1 = __importDefault(require('@safe-global/protocol-kit'))
const api_kit_1 = __importDefault(require('@safe-global/api-kit'))
const SafeClient_1 = require('./SafeClient')
const utils_1 = require('./utils')
/**
 * Initializes a Safe client with the given configuration options.
 *
 * @param config - The Safe client configuration options.
 * @returns A Safe client instance.
 */
async function createSafeClient(config) {
  const protocolKit = await getProtocolKitInstance(config)
  const apiKit = await getApiKitInstance(protocolKit)
  if (!protocolKit || !apiKit) throw new Error('Failed to create a kit instances')
  return new SafeClient_1.SafeClient(protocolKit, apiKit)
}
exports.createSafeClient = createSafeClient
/**
 * Get the Safe protocol kit instance.
 *
 * @param config - The SDK Starter kit configuration options.
 * @returns A protocolKit instance.
 */
async function getProtocolKitInstance(config) {
  if (config.safeAddress && (0, utils_1.isValidAddress)(config.safeAddress)) {
    // If the safe already exist
    return protocol_kit_1.default.init({
      provider: config.provider,
      signer: config.signer,
      safeAddress: config.safeAddress
    })
  } else if (config.safeOptions && (0, utils_1.isValidSafeConfig)(config.safeOptions)) {
    // If the safe does not exist and the configuration is provided
    const protocolKit = await protocol_kit_1.default.init({
      provider: config.provider,
      signer: config.signer,
      predictedSafe: {
        safeAccountConfig: {
          owners: config.safeOptions.owners,
          threshold: config.safeOptions.threshold
        },
        safeDeploymentConfig: {
          saltNonce: config.safeOptions.saltNonce
        }
      }
    })
    const isSafeDeployed = await protocolKit.isSafeDeployed()
    // When the safe is deployed, which can be true given the predicted safe address based on the options,
    // we need to re-initialize the Safe client with the safeAddress
    if (isSafeDeployed) {
      return protocol_kit_1.default.init({
        provider: config.provider,
        signer: config.signer,
        safeAddress: await protocolKit.getAddress()
      })
    }
    return protocolKit
  } else {
    throw new Error(
      'Invalid configuration: either a valid safeAddress or valid safeOptions must be provided.'
    )
  }
}
async function getApiKitInstance(protocolKit) {
  const chainId = await protocolKit.getChainId()
  return new api_kit_1.default({ chainId })
}
__exportStar(require('./types'), exports)
__exportStar(require('./extensions'), exports)
__exportStar(require('./SafeClient'), exports)
//# sourceMappingURL=index.js.map
