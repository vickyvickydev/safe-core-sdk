'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.describeif = exports.itif = void 0
const itif = (condition) => (condition ? it : it.skip)
exports.itif = itif
const describeif = (condition) => (condition ? describe : describe.skip)
exports.describeif = describeif
//# sourceMappingURL=helpers.js.map
