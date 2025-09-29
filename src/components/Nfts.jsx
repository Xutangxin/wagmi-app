import { useAccount } from "wagmi";
import { apiKey } from "../constants";
import { useEffect, useState } from "react";
import { Card, Spin } from "antd";

import { Network, Alchemy } from "alchemy-sdk";

import { NFTCard } from "@ant-design/web3";

const settings = {
  apiKey: apiKey, // Replace with your Alchemy API Key.
  network: Network.BASE_SEPOLIA, // Replace with your network.
};
const alchemy = new Alchemy(settings);

export default function Nfts() {
  const { address } = useAccount();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNfts = async () => {
    setLoading(true);
    const res = await alchemy.nft.getNftsForOwner(address).finally(() => {
      setLoading(false);
    });
    console.log("res: ", res.ownedNfts);
    setNfts(res.ownedNfts);
  };

  useEffect(() => {
    address && getNfts();
  }, [address]);

  return (
    <Spin spinning={loading}>
      <Card className="mb-[10px]">
        {nfts.length ? (
          <div className="flex gap-x-[18px]">
            {nfts.map((i) => {
              return (
                <NFTCard
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
          <p>暂无NFT</p>
        )}
      </Card>
    </Spin>
  );
}
