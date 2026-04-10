import { Alert } from "./ui/alert";
import type { TxStatus } from "../types";

type Props = {
  tx: TxStatus;
};

export function TxStatusBanner({ tx }: Props) {
  if (tx.status === "idle") {
    return null;
  }

  if (tx.status === "loading") {
    return <Alert variant="warning">{tx.message ?? "Transaction in progress..."}</Alert>;
  }

  if (tx.status === "success") {
    return <Alert variant="success">{tx.message ?? "Transaction confirmed."}</Alert>;
  }

  return <Alert variant="destructive">{tx.message ?? "Transaction failed."}</Alert>;
}
