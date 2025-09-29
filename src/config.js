import { http, createConfig } from "wagmi";
import { baseSepolia, mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask, walletConnect } from "wagmi/connectors";
import { projectId } from "./constants";

export const config = createConfig({
  autoConnect: true,
  connectors: [injected(), walletConnect({ projectId }), metaMask()],
  chains: [sepolia, mainnet, baseSepolia],
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
    [baseSepolia.id]: http(),
  },
});
