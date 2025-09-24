import { Button, Card, Input } from "antd";
import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

const constractAddress = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9"; // 临时的

const contractConfig = {
  address: constractAddress,
  abi: [
    {
      name: "mint", // 铸造NFT
      type: "function",
      inputs: [{ name: "tokenId", type: "uint256" }],
    },
  ],
};

export default function WriteContract() {
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const [tokenId, setTokenId] = useState("");

  const mint = () => {
    writeContract({
      ...contractConfig,
      functionName: "mint",
      args: [tokenId],
    });
  };

  return (
    <Card className="mt">
      <Input
        value={tokenId}
        placeholder="Token ID"
        onChange={(e) => {
          setTokenId(e.target.value);
        }}
      />
      <Button
        type="primary"
        className="mt"
        loading={isPending || isLoading}
        onClick={mint}
      >
        {isPending ? "确认中..." : "Mint"}
      </Button>
      {error && <div style={{ color: "red" }}>Error: {error.message}</div>}
      {hash && <div>交易哈希: {hash}</div>}
      {isPending && <div>等待确认...</div>}
      {isSuccess && <div>交易已确认</div>}
    </Card>
  );
}
