import { useMemo } from "react";
import { useReadContract, useWatchContractEvent } from "wagmi";
import { tipPostAbi } from "../abi/tipPostAbi";
import { tipPostAddress } from "../config/wagmi";
import type { Post } from "../types";

type RawPost = {
  id: bigint;
  creator: `0x${string}`;
  imageUrl: string;
  caption: string;
  likes: bigint;
  totalEarned: bigint;
  timestamp: bigint;
};

function mapPost(raw: RawPost): Post {
  return {
    id: raw.id,
    creator: raw.creator,
    imageUrl: raw.imageUrl,
    caption: raw.caption,
    likes: raw.likes,
    totalEarned: raw.totalEarned,
    timestamp: raw.timestamp,
  };
}

export function usePosts() {
  const { data, isLoading, isRefetching, refetch, error } = useReadContract({
    abi: tipPostAbi,
    address: tipPostAddress,
    functionName: "getAllPosts",
    query: {
      refetchOnWindowFocus: true,
    },
  });

  useWatchContractEvent({
    abi: tipPostAbi,
    address: tipPostAddress,
    eventName: "PostCreated",
    onLogs: () => {
      void refetch();
    },
  });

  useWatchContractEvent({
    abi: tipPostAbi,
    address: tipPostAddress,
    eventName: "PostLiked",
    onLogs: () => {
      void refetch();
    },
  });

  const posts = useMemo(() => {
    if (!data) {
      return [] as Post[];
    }

    const normalized = data as readonly RawPost[];
    return normalized.map(mapPost).sort((a, b) => Number(b.id - a.id));
  }, [data]);

  return {
    posts,
    isLoading,
    isRefetching,
    refetch,
    error,
  };
}
