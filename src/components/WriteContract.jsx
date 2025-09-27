import { Button, Card, Input, Alert } from "antd";
import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { mintAbi } from "../abi";
import { getAddress } from "viem";

const constractAddress = "0x1F856Fd79F1Bc5f546e8C7F869E6d9E97A7D9C7E";

const contractConfig = {
  address: getAddress(constractAddress),
  abi: mintAbi,
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
