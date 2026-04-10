import { useWallet, useUserEarnings } from "../../hooks";
import { formatEth } from "../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function EarningsPanel() {
  const { account } = useWallet();
  const { earnings, isLoading } = useUserEarnings(account.address);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Earnings</CardTitle>
      </CardHeader>
      <CardContent>
        {!account.isConnected && <p className="text-sm text-muted-foreground">Connect wallet to see your tip earnings.</p>}
        {account.isConnected && (
          <p className="text-2xl font-semibold tracking-tight">{isLoading ? "Loading..." : formatEth(earnings)}</p>
        )}
      </CardContent>
    </Card>
  );
}
