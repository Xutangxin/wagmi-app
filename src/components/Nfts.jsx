import { useAccount } from "wagmi";
import { apiKey } from "../constants";
import { useEffect, useState } from "react";
import { Card, Spin } from "antd";

import { Network, Alchemy } from "alchemy-sdk";

import { NFTCard } from "@ant-design/web3";

const settingList = [
  {
    apiKey: apiKey, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  },
  {
    apiKey: apiKey,
    network: Network.ETH_SEPOLIA,
  },
  {
    apiKey: apiKey,
    network: Network.BASE_SEPOLIA,
  },
];

export default function Nfts() {
  const { address } = useAccount();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNfts = async () => {
    setLoading(true);
    const jobs = settingList.map(async (setting) => {
      const res = await new Alchemy(setting).nft.getNftsForOwner(address);
      return res;
    });

    const allRes = await Promise.allSettled(jobs).finally(() => {
      setLoading(false);
    });
    const list = allRes
      .filter((job) => job.status === "fulfilled")
      .map((i) => i.value.ownedNfts || [])
      .flat();

    setNfts(list);
  };

  useEffect(() => {
    address && getNfts();
  }, [address]);

  return (
    <Spin spinning={loading}>
      <Card className="mb-[10px]">
        {nfts.length ? (
          <div className="flex flex-wrap gap-[12px]">
            {nfts.map((i) => {
              return (
                <NFTCard
                  className="min-w-[240px]"
                  key={i.tokenId}
                  name={i.name}
                  tokenId={i.tokenId}
                  description={i.description}
                  image={(i.image || {}).thumbnailUrl}
                ></NFTCard>
              );
            })}
          </div>
        ) : (
          !loading && <p> 暂无NFT</p>
        )}
      </Card>
    </Spin>
  );
}
