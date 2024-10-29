import { Eip1193Provider } from 'ethers'
export type AuthKitEthereumProvider = Eip1193Provider
export type AuthKitSignInData = {
  eoa: string
  safes?: string[]
}
