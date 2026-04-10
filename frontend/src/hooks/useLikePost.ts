import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { parseEther } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useChainId, useSwitchChain, useWriteContract } from "wagmi";
import { tipPostAbi } from "../abi/tipPostAbi";
import { appChainId, tipPostAddress, wagmiConfig } from "../config/wagmi";
import { getReadableError } from "../lib/errors";
import type { TxStatus } from "../types";

const LIKE_VALUE = parseEther("0.0001");

export function useLikePost() {
  const queryClient = useQueryClient();
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();
  const [tx, setTx] = useState<TxStatus>({ status: "idle" });

  const likePost = async (postId: bigint) => {
    setTx({ status: "loading", message: "Sending tip and liking post..." });

    try {
      if (chainId !== appChainId) {
        await switchChainAsync({ chainId: appChainId });
      }

      const hash = await writeContractAsync({
        abi: tipPostAbi,
        address: tipPostAddress,
        chainId: appChainId,
        functionName: "likePost",
        args: [postId],
        value: LIKE_VALUE,
      });

      await waitForTransactionReceipt(wagmiConfig, { hash });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
        queryClient.invalidateQueries({ queryKey: ["earnings"] }),
      ]);

      setTx({ status: "success", message: "Like sent with 0.0001 ETH tip." });
    } catch (error) {
      setTx({ status: "error", message: getReadableError(error) });
    }
  };

  return {
    likePost,
    tx,
    clearTx: () => setTx({ status: "idle" }),
  };
}
