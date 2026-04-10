import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { sepolia } from "wagmi/chains";
import { env } from "./env";

if (env.VITE_CHAIN_ID !== sepolia.id) {
  throw new Error("VITE_CHAIN_ID must be set to Sepolia chain ID 11155111.");
}

export const tipPostAddress = env.VITE_CONTRACT_ADDRESS as `0x${string}`;
export const appChainId = env.VITE_CHAIN_ID;

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [
    injected({
      target: "metaMask",
    }),
  ],
  transports: {
    [sepolia.id]: http(env.VITE_SEPOLIA_RPC_URL),
  },
});
