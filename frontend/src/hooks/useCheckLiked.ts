import { zeroAddress } from "viem";
import { useReadContract } from "wagmi";
import { tipPostAbi } from "../abi/tipPostAbi";
import { tipPostAddress } from "../config/wagmi";

export function useCheckLiked(postId: bigint, address?: `0x${string}`) {
  const result = useReadContract({
    abi: tipPostAbi,
    address: tipPostAddress,
    functionName: "checkLiked",
    args: [postId, address ?? zeroAddress],
    query: {
      enabled: Boolean(address),
    },
  });

  return {
    liked: result.data ?? false,
    isLoading: result.isLoading,
  };
}
