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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const ethers_1 = require('ethers')
const protocol_kit_1 = __importStar(require('@safe-global/protocol-kit')),
  protocolKitPackage = protocol_kit_1
const safe_core_sdk_types_1 = require('@safe-global/safe-core-sdk-types')
const api_kit_1 = __importDefault(require('@safe-global/api-kit'))
const SafeMoneriumClient_1 = require('./SafeMoneriumClient')
const signatures_1 = require('./signatures')
const newOrder = {
  amount: '100',
  counterpart: {
    identifier: {
      standard: 'iban',
      iban: 'iban'
    },
    details: {
      firstName: 'firstName',
      lastName: 'lastName'
    }
  },
  memo: 'memo'
}
jest.mock('@monerium/sdk', () => {
  const actualSdk = jest.requireActual('@monerium/sdk')
  return {
    ...jest.genMockFromModule('@monerium/sdk'),
    getChain: actualSdk.getChain,
    getNetwork: actualSdk.getNetwork,
    placeOrderMessage: actualSdk.placeOrderMessage
  }
})
jest.mock('@safe-global/protocol-kit')
jest.mock('@safe-global/api-kit')
describe('SafeMoneriumClient', () => {
  const protocolKit = new protocol_kit_1.default()
  let safeMoneriumClient
  beforeEach(() => {
    jest.clearAllMocks()
    protocolKit.getChainId = jest.fn().mockResolvedValue(5)
    protocolKit.getSafeProvider = jest.fn().mockReturnValue({
      call: jest.fn().mockImplementation(async () => signatures_1.MAGIC_VALUE),
      getSignerAddress: jest.fn().mockResolvedValue('0xSignerAddress')
    })
    protocolKit.getSafeProvider.call = jest
      .fn()
      .mockImplementation(async () => signatures_1.MAGIC_VALUE)
    safeMoneriumClient = new SafeMoneriumClient_1.SafeMoneriumClient(
      { environment: 'sandbox', clientId: 'mockClientId', redirectUrl: 'http://mockUrl' },
      protocolKit
    )
  })
  it('should create a SafeMoneriumClient instance', () => {
    expect(safeMoneriumClient).toBeInstanceOf(SafeMoneriumClient_1.SafeMoneriumClient)
  })
  it('should allow to get the Safe address', async () => {
    protocolKit.getAddress = jest.fn(() => Promise.resolve('0xSafeAddress'))
    expect(await safeMoneriumClient.getSafeAddress()).toBe('0xSafeAddress')
  })
  it('should allow to send tokens from then Safe to any IBAN', async () => {
    protocolKit.getAddress = jest.fn(() => Promise.resolve('0xSafeAddress'))
    const placeOrderSpy = jest.spyOn(safeMoneriumClient, 'placeOrder')
    //@ts-expect-error - Not all values are mocked
    const signMessageSpy = jest.spyOn(safeMoneriumClient, 'signMessage').mockResolvedValueOnce({
      safe: '0xSafeAddress',
      to: '0xAddress',
      value: '0',
      operation: 1
    })
    await safeMoneriumClient.send({ ...newOrder })
    expect(placeOrderSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        ...newOrder,
        address: '0xSafeAddress',
        message: expect.stringContaining('Send EUR 100 to iban at'),
        chainId: 5,
        signature: '0x',
        supportingDocumentId: ''
      })
    )
    expect(signMessageSpy).toHaveBeenCalledWith(
      '0xSafeAddress',
      expect.stringContaining('Send EUR 100 to iban at')
    )
  })
  it('should throw if signing message fails', async () => {
    protocolKit.getAddress = jest.fn(() => Promise.resolve('0xSafeAddress'))
    const placeOrderSpy = jest.spyOn(safeMoneriumClient, 'placeOrder')
    const signMessageSpy = jest
      .spyOn(safeMoneriumClient, 'signMessage')
      .mockRejectedValueOnce(new Error('Failed to sign message'))
    await expect(safeMoneriumClient.send({ ...newOrder })).rejects.toThrow('Failed to sign message')
    expect(placeOrderSpy).toHaveBeenCalledTimes(1)
    expect(signMessageSpy).toHaveBeenCalledTimes(1)
  })
  it('should allow to check if a message is signed in the smart contract if the promise is fulfilled', async () => {
    const isMessageSigned = await safeMoneriumClient.isMessageSigned(
      '0xSafeAddress',
      'message to sign'
    )
    expect(isMessageSigned).toBe(true)
  })
  it('should allow to check if a message is NOT signed in the smart contract if the promise is fulfilled', async () => {
    // Promise fulfilled without signature
    protocolKit.getSafeProvider().call = jest.fn().mockImplementation(async () => '0x')
    const isMessageSigned = await safeMoneriumClient.isMessageSigned(
      '0xSafeAddress',
      'message to sign'
    )
    expect(isMessageSigned).toBe(false)
  })
  it('should allow to check if a message is signed in the smart contract and the promise is rejected', async () => {
    class EthersError extends Error {
      constructor(message, data) {
        super(message)
        this.data = data
      }
    }
    // promise is rejected with the signature
    protocolKit.getSafeProvider().call = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject(
          new EthersError('execution reverted: "Hash not approved"', signatures_1.MAGIC_VALUE)
        )
      )
    const isMessageSigned = await safeMoneriumClient.isMessageSigned(
      '0xSafeAddress',
      'message to sign'
    )
    expect(isMessageSigned).toBe(true)
  })
  it('should allow to check if a message is NOT signed in the smart contract and the promise is rejected', async () => {
    class EthersError extends Error {
      constructor(message, data) {
        super(message)
        this.data = data
      }
    }
    // promise is rejected without a signature
    protocolKit.getSafeProvider().call = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject(new EthersError('execution reverted: "Hash not approved"', '0x'))
      )
    const isMessageSigned = await safeMoneriumClient.isMessageSigned(
      '0xSafeAddress',
      'message to sign'
    )
    expect(isMessageSigned).toBe(false)
  })
  it('should allow to check if a message is pending in the safe transaction queue', async () => {
    jest.spyOn(api_kit_1.default.prototype, 'getPendingTransactions').mockResolvedValueOnce({
      count: 0,
      results: []
    })
    const isSignMessagePending = await safeMoneriumClient.isSignMessagePending(
      '0xSafeAddress',
      'message to sign'
    )
    expect(isSignMessagePending).toBe(false)
    jest.spyOn(api_kit_1.default.prototype, 'getPendingTransactions').mockResolvedValueOnce({
      count: 0,
      results: [
        {
          // @ts-expect-error - dataDecoded should have the method property
          dataDecoded: {
            method: 'signMessage',
            parameters: [{ value: (0, ethers_1.hashMessage)('message to sign') }]
          }
        }
      ]
    })
    const isSignMessagePending2 = await safeMoneriumClient.isSignMessagePending(
      '0xSafeAddress',
      'message to sign'
    )
    expect(isSignMessagePending2).toBe(true)
  })
  it('should allow to sign a message', async () => {
    const txData = {
      operation: safe_core_sdk_types_1.OperationType.DelegateCall,
      baseGas: 0,
      safeTxGas: 1000000,
      gasPrice: 0,
      gasToken: '0x000',
      refundReceiver: '0x00000000',
      nonce: 0
    }
    jest.spyOn(protocolKitPackage, 'getSignMessageLibContract').mockResolvedValueOnce({
      safeVersion: '1.3.0',
      contractName: 'signMessageLibVersion',
      contract: new ethers_1.Contract('0x0000000000000000000000000000000000000001', []),
      safeProvider: protocolKit.getSafeProvider(),
      encode: jest.fn(),
      contractAbi: safe_core_sdk_types_1.signMessageLib_1_4_1_ContractArtifacts.abi,
      contractAddress: '',
      getAddress: jest.fn(),
      getMessageHash: jest.fn(),
      signMessage: jest.fn(),
      estimateGas: jest.fn(),
      init: jest.fn()
    })
    protocolKit.createTransaction = jest.fn().mockResolvedValueOnce({
      data: txData
    })
    protocolKit.getTransactionHash = jest.fn().mockResolvedValueOnce('0xTransactionHash')
    protocolKit.signHash = jest.fn().mockResolvedValueOnce('0xTransactionSignature')
    jest.spyOn(api_kit_1.default.prototype, 'getTransaction').mockResolvedValueOnce({
      confirmationsRequired: 1,
      //@ts-expect-error - Only required properties are mocked
      confirmations: [{ to: '0xSignerAddress' }]
    })
    const proposeTransactionSpy = jest.spyOn(api_kit_1.default.prototype, 'proposeTransaction')
    protocolKit.executeTransaction = jest.fn()
    await safeMoneriumClient.signMessage('0xSafeAddress', 'message to sign')
    expect(proposeTransactionSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        safeAddress: '0xSafeAddress',
        safeTransactionData: txData,
        safeTxHash: '0xTransactionHash',
        senderAddress: '0xSignerAddress',
        senderSignature: undefined
      })
    )
  })
  it('should map the protocol kit chainId to the Monerium Chain types', async () => {
    protocolKit.getChainId = jest.fn().mockResolvedValueOnce(1n)
    expect(await safeMoneriumClient.getChain()).toBe('ethereum')
    protocolKit.getChainId = jest.fn().mockResolvedValueOnce(11155111n)
    expect(await safeMoneriumClient.getChain()).toBe('ethereum')
    protocolKit.getChainId = jest.fn().mockResolvedValueOnce(100n)
    expect(await safeMoneriumClient.getChain()).toBe('gnosis')
    protocolKit.getChainId = jest.fn().mockResolvedValueOnce(10200n)
    expect(await safeMoneriumClient.getChain()).toBe('gnosis')
    protocolKit.getChainId = jest.fn().mockResolvedValueOnce(137n)
    expect(await safeMoneriumClient.getChain()).toBe('polygon')
    protocolKit.getChainId = jest.fn().mockResolvedValueOnce(80001n)
    expect(await safeMoneriumClient.getChain()).toBe('polygon')
    protocolKit.getChainId = jest.fn().mockResolvedValueOnce(300n)
    expect(safeMoneriumClient.getChain()).rejects.toThrow('Chain not supported: 300')
  })
  it('should map the protocol kit chainId to the Monerium Network types', async () => {
    protocolKit.getChainId = jest.fn().mockResolvedValueOnce(1n)
    expect(await safeMoneriumClient.getNetwork()).toBe('mainnet')
    protocolKit.getChainId = jest.fn().mockResolvedValueOnce(11155111n)
    expect(await safeMoneriumClient.getNetwork()).toBe('sepolia')
    protocolKit.getChainId = jest.fn().mockResolvedValueOnce(100n)
    expect(await safeMoneriumClient.getNetwork()).toBe('mainnet')
    protocolKit.getChainId = jest.fn().mockResolvedValueOnce(10200n)
    expect(await safeMoneriumClient.getNetwork()).toBe('chiado')
    protocolKit.getChainId = jest.fn().mockResolvedValueOnce(137n)
    expect(await safeMoneriumClient.getNetwork()).toBe('mainnet')
    protocolKit.getChainId = jest.fn().mockResolvedValueOnce(80001n)
    expect(await safeMoneriumClient.getNetwork()).toBe('mumbai')
    protocolKit.getChainId = jest.fn().mockResolvedValueOnce(300n)
    expect(safeMoneriumClient.getNetwork()).rejects.toThrow('Network not supported: 300')
  })
})
//# sourceMappingURL=SafeMoneriumClient.test.js.map
