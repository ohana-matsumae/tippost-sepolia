import { useAccount, useChainId, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { appChainId } from "../config/wagmi";

export function useWallet() {
  const account = useAccount();
  const chainId = useChainId();
  const { connect, connectAsync, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChainAsync, isPending: isSwitching } = useSwitchChain();

  const isWrongNetwork = account.isConnected && chainId !== appChainId;

  const switchToSepolia = async () => {
    await switchChainAsync({ chainId: appChainId });
  };

  return {
    account,
    connectors,
    connect,
    connectAsync,
    disconnect,
    isConnecting,
    isSwitching,
    isWrongNetwork,
    switchToSepolia,
  };
}
