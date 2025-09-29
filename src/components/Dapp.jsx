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
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";

export default function Dapp() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={new QueryClient()}>
          <div>
            <WalletConnect />
            <NetInfo />
            <Balance />
            <Tabs defaultActiveKey="1">
              <TabPane tab="发送交易" key="1">
                <SendTransaction />
              </TabPane>
              <TabPane tab="NFTs" key="2">
                <Nfts />
              </TabPane>
              <TabPane tab="铸造" key="3">
                <WriteContract />
              </TabPane>
            </Tabs>

            {/* <ReadContract /> */}
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
