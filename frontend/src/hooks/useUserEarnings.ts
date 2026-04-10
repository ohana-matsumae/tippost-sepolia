import { useReadContract, useWatchContractEvent } from "wagmi";
import { tipPostAbi } from "../abi/tipPostAbi";
import { tipPostAddress } from "../config/wagmi";

export function useUserEarnings(address?: `0x${string}`) {
  const result = useReadContract({
    abi: tipPostAbi,
    address: tipPostAddress,
    functionName: "totalEarnedByUser",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  useWatchContractEvent({
    abi: tipPostAbi,
    address: tipPostAddress,
    eventName: "PostLiked",
    onLogs: () => {
      void result.refetch();
    },
  });

  return {
    earnings: result.data ?? 0n,
    isLoading: result.isLoading,
    error: result.error,
    refetch: result.refetch,
  };
}
