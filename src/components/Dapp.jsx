import { WagmiProvider } from "wagmi";
import { config } from "../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WalletConnect from "./WalletConnect";
import SendTransaction from "./SendTransaction";
import { useState } from "react";

export default function Dapp() {
  const [account, setAccount] = useState({});

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={new QueryClient()}>
          <div className="dapp">
            <WalletConnect setAccount={setAccount} />
            {account?.address && <SendTransaction />}
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
