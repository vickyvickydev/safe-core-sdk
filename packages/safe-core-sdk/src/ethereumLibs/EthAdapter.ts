import { BigNumber } from 'ethers'
import { Abi } from '../utils/types'

interface EthAdapter {
  isAddress(address: string): boolean
  getBalance(address: string): Promise<BigNumber>
  getChainId(): Promise<number>
  getContract(address: string, abi: Abi): any
  getContractCode(address: string): Promise<string>
  getAccount(): Promise<string>
  signMessage(message: string, signerAddress: string): Promise<string>
}

export default EthAdapter
