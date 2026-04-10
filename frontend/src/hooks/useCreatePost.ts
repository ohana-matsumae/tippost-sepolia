import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useChainId, useSwitchChain, useWriteContract } from "wagmi";
import { tipPostAbi } from "../abi/tipPostAbi";
import { appChainId, wagmiConfig, tipPostAddress } from "../config/wagmi";
import { getReadableError } from "../lib/errors";
import type { TxStatus } from "../types";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();
  const [tx, setTx] = useState<TxStatus>({ status: "idle" });

  const createPost = async (imageUrl: string, caption: string) => {
    setTx({ status: "loading", message: "Submitting createPost transaction..." });

    try {
      if (chainId !== appChainId) {
        await switchChainAsync({ chainId: appChainId });
      }

      const hash = await writeContractAsync({
        abi: tipPostAbi,
        address: tipPostAddress,
        chainId: appChainId,
        functionName: "createPost",
        args: [imageUrl, caption],
      });

      await waitForTransactionReceipt(wagmiConfig, { hash });

      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      setTx({ status: "success", message: "Post created successfully." });
      return true;
    } catch (error) {
      setTx({ status: "error", message: getReadableError(error) });
      return false;
    }
  };

  return {
    createPost,
    tx,
    clearTx: () => setTx({ status: "idle" }),
  };
}
