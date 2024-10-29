import SafeApiKit, { SafeApiKitConfig } from './SafeApiKit'
export * from './types/safeTransactionServiceTypes'
export { SafeApiKitConfig }
export default SafeApiKit
declare module 'abitype' {
  interface Register {
    AddressType: string
  }
}
