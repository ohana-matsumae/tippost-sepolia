type ErrorWithCode = Error & { code?: number; shortMessage?: string; details?: string };

export function getReadableError(error: unknown): string {
  const err = error as ErrorWithCode;

  if (err?.code === 4001) {
    return "Transaction rejected in MetaMask.";
  }

  const shortMessage = err?.shortMessage?.toLowerCase() ?? "";
  const details = err?.details?.toLowerCase() ?? "";
  const message = err?.message?.toLowerCase() ?? "";

  if (shortMessage.includes("insufficient") || details.includes("insufficient")) {
    return "Insufficient funds for transaction or gas.";
  }

  if (message.includes("wrong network") || message.includes("chain")) {
    return "Wrong network. Please switch to Sepolia.";
  }

  if (message.includes("already liked")) {
    return "You already liked this post.";
  }

  if (message.includes("cannot like your own post")) {
    return "You cannot like your own post.";
  }

  if (message.includes("does not exist")) {
    return "This post no longer exists on-chain.";
  }

  if (message.includes("execution reverted")) {
    return err.message;
  }

  return err?.message ?? "Unexpected error. Try again.";
}
