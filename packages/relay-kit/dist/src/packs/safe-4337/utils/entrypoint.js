'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.isEntryPointV6 =
  exports.entryPointToSafeModules =
  exports.sameString =
  exports.EQ_OR_GT_0_3_0 =
    void 0
const constants_1 = require('../constants')
const EQ_0_2_0 = '0.2.0'
exports.EQ_OR_GT_0_3_0 = '>=0.3.0'
function sameString(str1, str2) {
  return str1.toLowerCase() === str2.toLowerCase()
}
exports.sameString = sameString
function entryPointToSafeModules(entryPoint) {
  const moduleVersionToEntryPoint = {
    [constants_1.ENTRYPOINT_ADDRESS_V06]: EQ_0_2_0,
    [constants_1.ENTRYPOINT_ADDRESS_V07]: exports.EQ_OR_GT_0_3_0
  }
  return moduleVersionToEntryPoint[entryPoint]
}
exports.entryPointToSafeModules = entryPointToSafeModules
function isEntryPointV6(address) {
  return sameString(address, constants_1.ENTRYPOINT_ADDRESS_V06)
}
exports.isEntryPointV6 = isEntryPointV6
//# sourceMappingURL=entrypoint.js.map
