'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.asBlockId = void 0
function asBlockId(blockId) {
  return typeof blockId === 'number' ? blockNumber(blockId) : blockTag(blockId)
}
exports.asBlockId = asBlockId
function blockNumber(blockNumber) {
  return { blockNumber: blockNumber.toNumber() }
}
function blockTag(blockTag) {
  return { blockTag: blockTag }
}
//# sourceMappingURL=block.js.map
