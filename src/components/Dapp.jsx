import { WagmiProvider } from "wagmi";
import { config } from "../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WalletConnect from "./WalletConnect";
import SendTransaction from "./SendTransaction";
import NetInfo from "./NetInfo";

export default function Dapp() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={new QueryClient()}>
          <div className="dapp">
            <WalletConnect />
            <NetInfo />
            <SendTransaction />
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
