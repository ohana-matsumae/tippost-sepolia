import { formatAddress } from "../../lib/utils";
import { useWallet } from "../../hooks";
import { appChainId } from "../../config/wagmi";
import { Button } from "../ui/button";

export function ConnectWalletButton() {
  const { account, connectors, connectAsync, disconnect, isConnecting } = useWallet();

  if (account.isConnected && account.address) {
    return (
      <div className="flex items-center gap-3">
        <span className="rounded-md border border-border bg-card px-3 py-2 text-sm">{formatAddress(account.address)}</span>
        <Button variant="secondary" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    );
  }

  const metaMaskConnector = connectors.find((connector) => connector.id === "metaMask") ?? connectors[0];

  return (
    <Button
      disabled={isConnecting || !metaMaskConnector}
      onClick={() =>
        metaMaskConnector &&
        connectAsync({
          connector: metaMaskConnector,
          chainId: appChainId,
        })
      }
    >
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
