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
var _PimlicoFeeEstimator_instances, _PimlicoFeeEstimator_getFeeData
Object.defineProperty(exports, '__esModule', { value: true })
exports.PimlicoFeeEstimator = void 0
const utils_1 = require('../utils')
const constants_1 = require('../constants')
class PimlicoFeeEstimator {
  constructor() {
    _PimlicoFeeEstimator_instances.add(this)
  }
  async setupEstimation({ bundlerUrl }) {
    const bundlerClient = (0, utils_1.getEip4337BundlerProvider)(bundlerUrl)
    const feeData = await __classPrivateFieldGet(
      this,
      _PimlicoFeeEstimator_instances,
      'm',
      _PimlicoFeeEstimator_getFeeData
    ).call(this, bundlerClient)
    return feeData
  }
  async adjustEstimation({ userOperation }) {
    return {
      callGasLimit: userOperation.callGasLimit + userOperation.callGasLimit / 2n, // +50%
      verificationGasLimit: userOperation.verificationGasLimit * 4n, // +300%
      preVerificationGas: userOperation.preVerificationGas + userOperation.preVerificationGas / 20n // +5%
    }
  }
  async getPaymasterEstimation({ userOperation, paymasterUrl, entryPoint, sponsorshipPolicyId }) {
    const paymasterClient = (0, utils_1.getEip4337BundlerProvider)(paymasterUrl)
    const gasEstimate = await paymasterClient.request({
      method: constants_1.RPC_4337_CALLS.SPONSOR_USER_OPERATION,
      params: sponsorshipPolicyId
        ? [
            (0, utils_1.userOperationToHexValues)(userOperation),
            entryPoint,
            { sponsorshipPolicyId }
          ]
        : [(0, utils_1.userOperationToHexValues)(userOperation), entryPoint]
    })
    return gasEstimate
  }
}
exports.PimlicoFeeEstimator = PimlicoFeeEstimator
;(_PimlicoFeeEstimator_instances = new WeakSet()),
  (_PimlicoFeeEstimator_getFeeData = async function _PimlicoFeeEstimator_getFeeData(bundlerClient) {
    const {
      fast: { maxFeePerGas, maxPriorityFeePerGas }
    } = await bundlerClient.request({
      method: 'pimlico_getUserOperationGasPrice'
    })
    return {
      maxFeePerGas: BigInt(maxFeePerGas),
      maxPriorityFeePerGas: BigInt(maxPriorityFeePerGas)
    }
  })
//# sourceMappingURL=PimlicoFeeEstimator.js.map
