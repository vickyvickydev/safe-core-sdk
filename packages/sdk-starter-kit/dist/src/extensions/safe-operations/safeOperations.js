'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.safeOperations = void 0
const relay_kit_1 = require('@safe-global/relay-kit')
const SafeOperationClient_1 = require('../../extensions/safe-operations/SafeOperationClient')
/**
 * Extend the SafeClient with the ability to use a bundler and a paymaster
 *
 * @example
 * const safeClient = await createSafeClient({ ... })
 *
 * const safeOperationClient = await safeClient.extend(
 *   safeOperations({ ... }, { ... })
 * )
 *
 * const { safeOperations } = await safeOperationClient.sendSafeOperation({ transactions })
 * await safeOperationClient.confirmSafeOperation({ safeOperationHash: safeOperations?.safeOperationHash})
 */
function safeOperations({ bundlerUrl }, paymasterOptions) {
  return async (client) => {
    const { provider, signer } = client.protocolKit.getSafeProvider()
    const isSafeDeployed = await client.protocolKit.isSafeDeployed()
    let options
    if (isSafeDeployed) {
      const safeAddress = await client.protocolKit.getAddress()
      options = {
        safeAddress
      }
    } else {
      const { safeDeploymentConfig, safeAccountConfig } = client.protocolKit.getPredictedSafe()
      options = {
        owners: safeAccountConfig.owners,
        threshold: safeAccountConfig.threshold,
        ...safeDeploymentConfig
      }
    }
    const safe4337Pack = await relay_kit_1.Safe4337Pack.init({
      provider,
      signer,
      bundlerUrl,
      options,
      paymasterOptions
    })
    client.protocolKit = safe4337Pack.protocolKit
    const safeOperationClient = new SafeOperationClient_1.SafeOperationClient(
      safe4337Pack,
      client.apiKit
    )
    return {
      /**
       * Send SafeOperations from a group of transactions.
       * This method will convert your transactions in a batch and:
       * - If the threshold > 1 it will save for later the SafeOperation using the Transaction service
       *   You must confirmSafeOperation() with other owners
       * - If the threshold = 1 the SafeOperation can be submitted to the bundler so it will execute it immediately
       *
       * @param {Safe4337CreateTransactionProps} props The Safe4337CreateTransactionProps object
       * @returns {Promise<SafeClientResult>} A promise that resolves with the status of the SafeOperation
       */
      async sendSafeOperation(props) {
        return safeOperationClient.sendSafeOperation(props)
      },
      /**
       * Confirms the stored safeOperation
       *
       * @param {ConfirmSafeOperationProps} props The ConfirmSafeOperationProps object
       * @returns {Promise<SafeClientResult>} A promise that resolves to the result of the safeOperation.
       */
      async confirmSafeOperation(props) {
        return safeOperationClient.confirmSafeOperation(props)
      },
      /**
       * Retrieves the pending Safe operations for the current Safe account
       *
       * @async
       * @param {ListOptions} options The pagination options
       * @returns {Promise<GetSafeOperationListResponse>} A promise that resolves to an array of pending Safe operations.
       * @throws {Error} If there is an issue retrieving the safe address or pending Safe operations.
       */
      async getPendingSafeOperations(options) {
        return safeOperationClient.getPendingSafeOperations(options)
      }
    }
  }
}
exports.safeOperations = safeOperations
//# sourceMappingURL=safeOperations.js.map
