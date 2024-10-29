'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.setupTests = void 0
const hardhat_1 = require('hardhat')
const setupTestNetwork_1 = require('./setupTestNetwork')
const setupContractNetworks_1 = require('./setupContractNetworks')
const setupContracts_1 = require('./setupContracts')
const deploy_contracts_1 = require('../hardhat/deploy/deploy-contracts')
exports.setupTests = hardhat_1.deployments.createFixture(
  async ({ deployments, getChainId }, options) => {
    const { safeConfig, predictedSafeConfig } = options || {}
    await deployments.fixture()
    const accounts = await (0, setupTestNetwork_1.getAccounts)()
    const chainId = BigInt(await getChainId())
    const contractNetworks = await (0, setupContractNetworks_1.getContractNetworks)(chainId)
    const safe = await (0, setupContracts_1.getSafeWithOwners)(
      safeConfig
        ? [...accounts.slice(0, safeConfig?.numberOfOwners).map((account) => account.address)]
        : [accounts[0].address],
      safeConfig?.threshold || 1
    )
    const predictedSafe = {
      safeAccountConfig: {
        owners: predictedSafeConfig
          ? [
              ...accounts
                .slice(0, predictedSafeConfig?.numberOfOwners)
                .map((account) => account.address)
            ]
          : [accounts[0].address],
        threshold: predictedSafeConfig?.threshold || 1
      },
      safeDeploymentConfig: {
        safeVersion: deploy_contracts_1.safeVersionDeployed
      }
    }
    return {
      safe,
      accounts,
      contractNetworks,
      chainId,
      predictedSafe
    }
  }
)
//# sourceMappingURL=setupTests.js.map
