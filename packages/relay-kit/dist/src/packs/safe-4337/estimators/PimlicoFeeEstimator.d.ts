import { EstimateGasData } from '@safe-global/safe-core-sdk-types'
import {
  EstimateFeeFunctionProps,
  EstimateSponsoredFeeFunctionProps,
  EstimateSponsoredGasData,
  IFeeEstimator
} from '../types'
export declare class PimlicoFeeEstimator implements IFeeEstimator {
  #private
  setupEstimation({ bundlerUrl }: EstimateFeeFunctionProps): Promise<EstimateGasData>
  adjustEstimation({ userOperation }: EstimateFeeFunctionProps): Promise<EstimateGasData>
  getPaymasterEstimation({
    userOperation,
    paymasterUrl,
    entryPoint,
    sponsorshipPolicyId
  }: EstimateSponsoredFeeFunctionProps): Promise<EstimateSponsoredGasData>
}
