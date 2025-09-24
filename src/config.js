import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask, walletConnect } from "wagmi/connectors";

const projectId = "1306cedcc99db7786b11146cf8efbc32"; // WalletConnect项目ID

export const config = createConfig({
  autoConnect: true,
  connectors: [injected(), walletConnect({ projectId }), metaMask()],
  // chains: [mainnet, sepolia],
  chains: [sepolia],
  transports: {
    // [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
