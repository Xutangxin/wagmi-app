import { WagmiProvider } from "wagmi";
import { config } from "../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WalletConnect from "./WalletConnect";
import SendTransaction from "./SendTransaction";
import NetInfo from "./NetInfo";
import ReadContract from "./ReadContract";
import WriteContract from "./WriteContract";

export default function Dapp() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={new QueryClient()}>
          <div>
            <WalletConnect />
            <NetInfo />
            <ReadContract />
            <SendTransaction />
            <WriteContract />
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
