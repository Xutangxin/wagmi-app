import { WagmiProvider } from "wagmi";
import { config } from "../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WalletConnect from "./WalletConnect";
import SendTransaction from "./SendTransaction";
import NetInfo from "./NetInfo";
import ReadContract from "./ReadContract";
import WriteContract from "./WriteContract";
import Balance from "./Balance";
import Nfts from "./Nfts";

export default function Dapp() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={new QueryClient()}>
          <div>
            <WalletConnect />
            <NetInfo />
            <Balance />
            {/* <ReadContract /> */}
            <SendTransaction />
            <Nfts />
            <WriteContract />
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
