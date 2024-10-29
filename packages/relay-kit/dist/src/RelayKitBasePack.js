'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.RelayKitBasePack = void 0
/**
 * Abstract class. The base class for all RelayKit packs.
 * It provides the Safe SDK instance and the abstract methods to be implemented by the packs.
 * @abstract
 * @template EstimateFeeProps
 * @template EstimateFeeResult
 * @template CreateTransactionProps
 * @template CreateTransactionResult,
 * @template ExecuteTransactionProps
 * @template ExecuteTransactionResult
 */
class RelayKitBasePack {
  /**
   * Creates a new RelayKitBasePack instance.
   * The packs implemented using our SDK should extend this class and therefore provide a Safe SDK instance
   * @param {Safe} protocolKit - The Safe SDK instance
   */
  constructor(protocolKit) {
    this.protocolKit = protocolKit
  }
}
exports.RelayKitBasePack = RelayKitBasePack
//# sourceMappingURL=RelayKitBasePack.js.map
