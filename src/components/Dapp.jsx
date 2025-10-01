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

const items = [
  {
    key: "1",
    label: "发送交易",
    children: <SendTransaction />,
  },
  {
    key: "2",
    label: "NFTs",
    children: <Nfts />,
  },
  {
    key: "3",
    label: "铸造",
    children: <WriteContract />,
  },
];

export default function Dapp() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={new QueryClient()}>
          <div>
            <WalletConnect />
            <NetInfo />
            <Balance />
            <Tabs defaultActiveKey="1" items={items}></Tabs>
            {/* <ReadContract /> */}
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
