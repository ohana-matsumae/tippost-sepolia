import { Alert } from "./components/ui/alert";
import { ConnectWalletButton } from "./components/wallet/ConnectWalletButton";
import { EarningsPanel } from "./components/wallet/EarningsPanel";
import { CreatePostForm } from "./components/posts/CreatePostForm";
import { PostFeed } from "./components/posts/PostFeed";
import { usePosts, useWallet } from "./hooks";
import { Button } from "./components/ui/button";

export default function App() {
  const { account, isWrongNetwork, switchToSepolia, isSwitching } = useWallet();
  const { posts, isLoading } = usePosts();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.22),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.2),_transparent_30%),linear-gradient(180deg,_#05060a_0%,_#0a101b_100%)] text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col items-start justify-between gap-4 rounded-xl border border-border/70 bg-card/70 p-5 backdrop-blur sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">TipPost Live</h1>
            <p className="text-sm text-muted-foreground">Decentralized social feed with direct ETH tipping on Sepolia.</p>
          </div>
          <ConnectWalletButton />
        </header>

        {account.isConnected && isWrongNetwork && (
          <Alert variant="warning" className="flex items-center justify-between gap-4">
            <span>Wrong network detected. Switch to Sepolia to continue.</span>
            <Button size="sm" onClick={() => switchToSepolia()} disabled={isSwitching}>
              {isSwitching ? "Switching..." : "Switch Network"}
            </Button>
          </Alert>
        )}

        <section className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <div className="space-y-6">
            <EarningsPanel />
            <CreatePostForm disabled={isWrongNetwork} />
          </div>

          <main className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Live Feed</h2>
              {isLoading && <span className="text-sm text-muted-foreground">Loading posts...</span>}
            </div>
            <PostFeed posts={posts} disabled={isWrongNetwork} />
          </main>
        </section>
      </div>
    </div>
  );
}
