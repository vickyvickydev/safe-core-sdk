import { Provider } from '@ethersproject/providers'
import { BigNumber, ContractTransaction, Wallet } from 'ethers'
import { GnosisSafe } from '../typechain'
import SafeAbi from './abis/SafeAbiV1-2-0.json'
import Safe from './Safe'
import { areAddressesEqual } from './utils'
import { SENTINEL_MODULES } from './utils/constants'
import { generatePreValidatedSignature } from './utils/signatures'
import { EthSignSignature, SafeSignature } from './utils/signatures/SafeSignature'
import { SafeTransaction } from './utils/transactions'

class EthersSafe implements Safe {
  #contract: GnosisSafe
  #ethers: any
  #provider: Provider
  #signer?: Wallet

  /**
   * Creates an instance of the Safe Core SDK.
   *
   * @param ethers - Ethers v5 library
   * @param safeAddress - The address of the Safe account to use
   * @param providerOrSigner - Ethers provider or signer. If this parameter is not passed, Ethers defaultProvider will be used.
   * @returns The Safe Core SDK instance
   */
  constructor(ethers: any, safeAddress: string, providerOrSigner?: Provider | Wallet) {
    const currentProviderOrSigner = providerOrSigner || (ethers.getDefaultProvider() as Provider)
    this.#ethers = ethers
    this.#contract = new this.#ethers.Contract(safeAddress, SafeAbi, currentProviderOrSigner)
    if (Wallet.isSigner(currentProviderOrSigner)) {
      this.#signer = currentProviderOrSigner
      this.#provider = currentProviderOrSigner.provider
      return
    }
    this.#signer = undefined
    this.#provider = currentProviderOrSigner
  }

  /**
   * Initializes the Safe Core SDK connecting the providerOrSigner to the safeAddress.
   *
   * @param providerOrSigner - Ethers provider or signer
   * @param safeAddress - The address of the Safe account to use
   */
  connect(providerOrSigner: Provider | Wallet, safeAddress?: string): EthersSafe {
    return new EthersSafe(this.#ethers, safeAddress || this.#contract.address, providerOrSigner)
  }

  /**
   * Returns the connected provider.
   *
   * @returns The connected provider
   */
  getProvider(): Provider {
    return this.#provider
  }

  /**
   * Returns the connected signer.
   *
   * @returns The connected signer
   */
  getSigner(): Wallet | undefined {
    return this.#signer
  }

  /**
   * Returns the address of the current Safe Proxy contract.
   *
   * @returns The address of the Safe Proxy contract
   */
  getAddress(): string {
    return this.#contract.address
  }

  /**
   * Returns the Safe Master Copy contract version.
   *
   * @returns The Safe Master Copy contract version
   */
  async getContractVersion(): Promise<string> {
    return this.#contract.VERSION()
  }

  /**
   * Returns the list of Safe owner accounts.
   *
   * @returns The list of owners
   */
  async getOwners(): Promise<string[]> {
    return this.#contract.getOwners()
  }

  /**
   * Returns the Safe threshold.
   *
   * @returns The Safe threshold
   */
  async getThreshold(): Promise<BigNumber> {
    return this.#contract.getThreshold()
  }

  /**
   * Returns the chainId of the connected network.
   *
   * @returns The chainId of the connected network
   */
  async getChainId(): Promise<number> {
    return (await this.#provider.getNetwork()).chainId
  }

  /**
   * Returns the ETH balance of the Safe.
   *
   * @returns The ETH balance of the Safe
   */
  async getBalance(): Promise<BigNumber> {
    return BigNumber.from(await this.#provider.getBalance(this.getAddress()))
  }

  /**
   * Returns the list of addresses of all the enabled Safe modules.
   *
   * @returns The list of addresses of all the enabled Safe modules
   */
  async getModules(): Promise<string[]> {
    return this.#contract.getModules()
  }

  /**
   * Checks if a specific Safe module is enabled for the current Safe.
   *
   * @param moduleAddress - The desired module address
   * @returns TRUE if the module is enabled
   */
  async isModuleEnabled(moduleAddress: string): Promise<boolean> {
    return this.#contract.isModuleEnabled(moduleAddress)
  }

  /**
   * Returns the transaction hash of a Safe transaction.
   *
   * @param safeTransaction - The Safe transaction
   * @returns The transaction hash of the Safe transaction
   */
  async getTransactionHash(safeTransaction: SafeTransaction): Promise<string> {
    const safeTransactionData = safeTransaction.data
    const txHash = await this.#contract.getTransactionHash(
      safeTransactionData.to,
      safeTransactionData.value,
      safeTransactionData.data,
      safeTransactionData.operation,
      safeTransactionData.safeTxGas,
      safeTransactionData.baseGas,
      safeTransactionData.gasPrice,
      safeTransactionData.gasToken,
      safeTransactionData.refundReceiver,
      safeTransactionData.nonce
    )
    return txHash
  }

  /**
   * Signs a hash using the current signer account.
   *
   * @param hash - The hash to sign
   * @returns The Safe signature
   */
  async signTransactionHash(hash: string): Promise<SafeSignature> {
    if (!this.#signer) {
      throw new Error('No signer provided')
    }
    const owners = await this.getOwners()
    const addressIsOwner = owners.find(
      (owner: string) => this.#signer && areAddressesEqual(owner, this.#signer.address)
    )
    if (!addressIsOwner) {
      throw new Error('Transactions can only be signed by Safe owners')
    }
    const messageArray = this.#ethers.utils.arrayify(hash)
    const signature = await this.#signer.signMessage(messageArray)
    return new EthSignSignature(this.#signer.address, signature)
  }

  /**
   * Adds the signature of the current signer to the Safe transaction object.
   *
   * @param safeTransaction - The Safe transaction to be signed
   */
  async signTransaction(safeTransaction: SafeTransaction): Promise<void> {
    const txHash = await this.getTransactionHash(safeTransaction)
    const signature = await this.signTransactionHash(txHash)
    safeTransaction.addSignature(signature)
  }

  /**
   * Approves on-chain a hash using the current signer account.
   *
   * @param hash - The hash to approve
   * @param skipOnChainApproval - TRUE to avoid the Safe transaction to be approved on-chain
   * @returns The pre-validated signature
   */
  async approveTransactionHash(
    hash: string,
    skipOnChainApproval?: boolean
  ): Promise<SafeSignature> {
    if (!this.#signer) {
      throw new Error('No signer provided')
    }
    const owners = await this.getOwners()
    const addressIsOwner = owners.find(
      (owner: string) => this.#signer && areAddressesEqual(owner, this.#signer.address)
    )
    if (!addressIsOwner) {
      throw new Error('Transaction hashes can only be approved by Safe owners')
    }
    if (!skipOnChainApproval) {
      await this.#contract.approveHash(hash)
    }
    return generatePreValidatedSignature(this.#signer.address)
  }

  /**
   * Returns a list of owners who have approved a specific Safe transaction.
   *
   * @param txHash - The Safe transaction hash
   * @returns The list of owners
   */
  async getOwnersWhoApprovedTx(txHash: string): Promise<string[]> {
    const owners = await this.getOwners()
    let ownersWhoApproved: string[] = []
    for (const owner of owners) {
      const approved = await this.#contract.approvedHashes(owner, txHash)
      if (approved.gt(0)) {
        ownersWhoApproved.push(owner)
      }
    }
    return ownersWhoApproved
  }

  /**
   * Executes a Safe transaction.
   *
   * @param safeTransaction - The Safe transaction to execute
   * @param options - Execution configuration options
   * @returns The Safe transaction response
   */
  async executeTransaction(
    safeTransaction: SafeTransaction,
    options?: any
  ): Promise<ContractTransaction> {
    if (!this.#signer) {
      throw new Error('No signer provided')
    }

    const txHash = await this.getTransactionHash(safeTransaction)
    const ownersWhoApprovedTx = await this.getOwnersWhoApprovedTx(txHash)
    for (const owner of ownersWhoApprovedTx) {
      safeTransaction.addSignature(generatePreValidatedSignature(owner))
    }
    const owners = await this.getOwners()
    if (owners.includes(this.#signer.address)) {
      safeTransaction.addSignature(generatePreValidatedSignature(this.#signer.address))
    }

    const threshold = await this.getThreshold()
    if (threshold.gt(safeTransaction.signatures.size)) {
      const signaturesMissing = threshold.sub(safeTransaction.signatures.size).toNumber()
      throw new Error(
        `There ${signaturesMissing > 1 ? 'are' : 'is'} ${signaturesMissing} signature${
          signaturesMissing > 1 ? 's' : ''
        } missing`
      )
    }

    const txResponse = await this.#contract.execTransaction(
      safeTransaction.data.to,
      safeTransaction.data.value,
      safeTransaction.data.data,
      safeTransaction.data.operation,
      safeTransaction.data.safeTxGas,
      safeTransaction.data.baseGas,
      safeTransaction.data.gasPrice,
      safeTransaction.data.gasToken,
      safeTransaction.data.refundReceiver,
      safeTransaction.encodedSignatures(),
      { ...options }
    )
    return txResponse
  }

  /**
   * Returns the Safe transaction to enable a Safe module.
   *
   * @param moduleAddress - The desired module address
   * @returns The Safe transaction ready to be signed
   */
  async getEnableModuleTx(moduleAddress: string): Promise<SafeTransaction> {
    const modules = await this.getModules()
    const moduleIndex = modules.findIndex((module: string) =>
      areAddressesEqual(module, moduleAddress)
    )
    if (moduleIndex >= 0) {
      throw new Error('Module provided is already enabled')
    }
    const tx = new SafeTransaction({
      to: this.getAddress(),
      value: '0',
      data: this.#contract.interface.encodeFunctionData('enableModule', [moduleAddress]),
      nonce: (await this.#contract.nonce()).toNumber()
    })
    return tx
  }

  /**
   * Returns the Safe transaction to disable a Safe module.
   *
   * @param moduleAddress - The desired module address
   * @returns The Safe transaction ready to be signed
   */
  async getDisableModuleTx(moduleAddress: string): Promise<SafeTransaction> {
    const modules = await this.getModules()
    const moduleIndex = modules.findIndex((module: string) =>
      areAddressesEqual(module, moduleAddress)
    )
    if (moduleIndex < 0) {
      throw new Error('Module provided is not enabled already')
    }
    const prevModuleAddress = moduleIndex === 0 ? SENTINEL_MODULES : modules[moduleIndex - 1]
    const tx = new SafeTransaction({
      to: this.getAddress(),
      value: '0',
      data: this.#contract.interface.encodeFunctionData('disableModule', [
        prevModuleAddress,
        moduleAddress
      ]),
      nonce: (await this.#contract.nonce()).toNumber()
    })
    return tx
  }
}

export default EthersSafe
