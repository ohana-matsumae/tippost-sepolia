import { z } from "zod";

const envSchema = z.object({
  VITE_CONTRACT_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  VITE_CHAIN_ID: z.coerce.number().int().positive(),
  VITE_SEPOLIA_RPC_URL: z.string().url(),
});

export const env = envSchema.parse(import.meta.env);
