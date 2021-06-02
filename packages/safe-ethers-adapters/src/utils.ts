import { SafeTransactionData } from "@gnosis.pm/safe-core-sdk/dist/src/utils/transactions/SafeTransaction"
import { getCreateCallDeployment } from "@gnosis.pm/safe-deployments"
import { providers, utils } from "ethers"

export const createLibDeployment = getCreateCallDeployment()
export const createLibAddress = createLibDeployment!!.defaultAddress
export const createLibInterface = new utils.Interface(createLibDeployment!!.abi)

const mapStatus = (receipt: providers.TransactionReceipt): number => {
    const success = receipt.logs.find((log: any) => log.topics[0] === "0x442e715f626346e8c54381002da614f62bee8d27386535b2521ec8540898556e")
    return !!success ? 1 : 0
}

const mapContractAddress = (receipt: providers.TransactionReceipt, safeTx: SafeTransactionData): string => {
    if (safeTx.to.toLowerCase() === createLibAddress.toLowerCase()) {
        const creationLog = receipt.logs.find((log: any) => log.topics[0] === "0x4db17dd5e4732fb6da34a148104a592783ca119a1e7bb8829eba6cbadef0b511")
        if (creationLog)
            return utils.getAddress("0x" + creationLog.data.slice(creationLog.data.length - 40))
    }
    return receipt.contractAddress
}

export const mapReceipt = (receipt: providers.TransactionReceipt, safeTx: SafeTransactionData) => {
        // Update status with Safe tx status and extract created contract
        receipt.status = mapStatus(receipt)
        receipt.contractAddress = mapContractAddress(receipt, safeTx)
        return receipt
}