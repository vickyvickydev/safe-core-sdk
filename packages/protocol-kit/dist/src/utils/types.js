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
Object.defineProperty(exports, '__esModule', { value: true })
exports.getChainById =
  exports.asHex =
  exports.asHash =
  exports.isSafeConfigWithPredictedSafe =
    void 0
const viem_1 = require('viem')
const allChains = __importStar(require('viem/chains'))
function isSafeConfigWithPredictedSafe(config) {
  return config.predictedSafe !== undefined
}
exports.isSafeConfigWithPredictedSafe = isSafeConfigWithPredictedSafe
function asHash(hash) {
  return hash
}
exports.asHash = asHash
function asHex(hex) {
  return (0, viem_1.isHex)(hex) ? hex : `0x${hex}`
}
exports.asHex = asHex
function getChainById(chainId) {
  const chain = Object.values(allChains).find((chain) => chain.id === Number(chainId))
  if (chain) {
    return chain
  } else {
    // We assume an ethereum-based chain whose urls will be defined on the client.
    return (0, viem_1.defineChain)({
      id: Number(chainId),
      name: 'Custom',
      nativeCurrency: {
        decimals: viem_1.etherUnits.wei,
        name: 'Ether',
        symbol: 'ETH'
      },
      rpcUrls: {
        default: {
          http: [],
          webSocket: []
        }
      }
    })
  }
}
exports.getChainById = getChainById
//# sourceMappingURL=types.js.map
