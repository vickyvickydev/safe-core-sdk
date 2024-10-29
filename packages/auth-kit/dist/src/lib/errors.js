'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getErrorMessage = void 0
function isErrorWithMessage(error) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  )
}
function toErrorWithMessage(maybeError) {
  if (isErrorWithMessage(maybeError)) return maybeError
  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError))
  }
}
function getErrorMessage(error) {
  return toErrorWithMessage(error).message
}
exports.getErrorMessage = getErrorMessage
//# sourceMappingURL=errors.js.map
