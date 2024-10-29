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
const protocol_kit_1 = __importDefault(require('@safe-global/protocol-kit'))
const MoneriumPack_1 = require('./MoneriumPack')
const safeMoneriumClient = __importStar(require('./SafeMoneriumClient'))
const index_1 = require('../../index')
Object.defineProperty(window, 'location', {
  writable: true,
  value: {
    ...window.location,
    replace: jest.fn()
  }
})
Object.defineProperty(safeMoneriumClient.SafeMoneriumClient.prototype, 'bearerProfile', {
  get: jest.fn(() => ({
    access_token: 'access-token',
    token_type: 'bearer',
    expires_in: 3600,
    refresh_token: 'refresh-token',
    profile: 'profile',
    userId: 'userId'
  }))
})
const REDIRECT_URL = 'http://localhost:3000'
const config = {
  clientId: 'monerium-client-id',
  redirectUrl: REDIRECT_URL,
  environment: 'sandbox'
}
jest.mock('@monerium/sdk')
jest.mock('@safe-global/protocol-kit')
jest.mock('./SafeMoneriumClient')
describe('MoneriumPack', () => {
  let moneriumPack
  beforeEach(() => {
    jest.clearAllMocks()
    moneriumPack = new MoneriumPack_1.MoneriumPack(config)
  })
  describe('init()', () => {
    it('should create a MoneriumPack instance', () => {
      expect(moneriumPack).toBeInstanceOf(MoneriumPack_1.MoneriumPack)
      expect(moneriumPack).toBeInstanceOf(index_1.OnRampKitBasePack)
    })
    it('should initialize the pack', async () => {
      const protocolKit = new protocol_kit_1.default()
      await moneriumPack.init({ protocolKit })
      expect(safeMoneriumClient.SafeMoneriumClient).toHaveBeenCalledWith(
        {
          clientId: 'monerium-client-id',
          environment: 'sandbox',
          redirectUrl: 'http://localhost:3000'
        },
        protocolKit
      )
    })
    it('should throw an exception if no instance of the protocol kit is passed as parameter', async () => {
      // @ts-expect-error - Throw and exception
      await expect(moneriumPack.init()).rejects.toThrow(
        'You need to provide an instance of the protocol kit'
      )
    })
  })
  describe('open()', () => {
    beforeEach(async () => {
      const protocolKit = new protocol_kit_1.default()
      await moneriumPack.init({ protocolKit })
    })
    it('should call order socket', async () => {
      const getConnectSocketSpy = jest.spyOn(
        safeMoneriumClient.SafeMoneriumClient.prototype,
        'connectOrderSocket'
      )
      await moneriumPack.open()
      expect(getConnectSocketSpy).toHaveBeenCalledWith()
    })
    it('should call getAccess', async () => {
      const getAuthFlowSpy = jest.spyOn(
        safeMoneriumClient.SafeMoneriumClient.prototype,
        'getAccess'
      )
      await moneriumPack.open()
      expect(getAuthFlowSpy).toHaveBeenCalledWith()
    })
    it('should check if the message is in the pending safe transactions queue when not signed', async () => {
      jest
        .spyOn(safeMoneriumClient.SafeMoneriumClient.prototype, 'isMessageSigned')
        .mockResolvedValue(false)
      jest
        .spyOn(safeMoneriumClient.SafeMoneriumClient.prototype, 'getSafeAddress')
        .mockResolvedValue('0xSafeAddress')
      const isMessagePendingSpy = jest.spyOn(
        safeMoneriumClient.SafeMoneriumClient.prototype,
        'isSignMessagePending'
      )
      await moneriumPack.open({ initiateAuthFlow: true })
      expect(isMessagePendingSpy).toHaveBeenCalledWith(
        '0xSafeAddress',
        'I hereby declare that I am the address owner.'
      )
    })
  })
  describe('close()', () => {
    it('should call disconnect', async () => {
      const disconnectSpy = jest.spyOn(
        safeMoneriumClient.SafeMoneriumClient.prototype,
        'revokeAccess'
      )
      const protocolKit = new protocol_kit_1.default()
      await moneriumPack.init({ protocolKit })
      await moneriumPack.close()
      await moneriumPack.open()
      expect(disconnectSpy).toHaveBeenCalledWith()
    })
  })
})
//# sourceMappingURL=MoneriumPack.test.js.map
