export type Post = {
  id: bigint;
  creator: `0x${string}`;
  imageUrl: string;
  caption: string;
  likes: bigint;
  totalEarned: bigint;
  timestamp: bigint;
};

export type TxStatus = {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
};
