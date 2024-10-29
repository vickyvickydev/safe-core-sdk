import { SafeClient } from './SafeClient'
import { SdkStarterKitConfig } from './types'
/**
 * Initializes a Safe client with the given configuration options.
 *
 * @param config - The Safe client configuration options.
 * @returns A Safe client instance.
 */
export declare function createSafeClient(config: SdkStarterKitConfig): Promise<SafeClient>
export * from './types'
export * from './extensions'
export * from './SafeClient'
