import { Button, Card, Input, Alert } from "antd";
import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

const constractAddress = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9"; // 临时的

const contractConfig = {
  address: constractAddress,
  abi: [
    {
      name: "mint", // 铸造
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
    <Card title="铸造">
      <Input
        value={tokenId}
        placeholder="Token ID"
        onChange={(e) => {
          setTokenId(e.target.value);
        }}
      />
      <Button
        type="primary"
        className="mt-[10px]"
        disabled={!tokenId}
        loading={isPending || isLoading}
        onClick={mint}
      >
        {isPending ? "确认中..." : "铸造"}
      </Button>

      <div className="mt-[10px]">
        {error && (
          <Alert
            type="error"
            message="Error"
            description={error.message}
          ></Alert>
        )}
        {isSuccess && (
          <Alert
            type="success"
            message="交易已确认"
            description={"交易哈希: " + hash}
          ></Alert>
        )}
      </div>
    </Card>
  );
}
