import { Chain, Account, Transport, WalletClient } from 'viem'
export declare function signDelegate(
  walletClient: WalletClient<Transport, Chain, Account>,
  delegateAddress: string,
  chainId: bigint
): Promise<`0x${string}`>
