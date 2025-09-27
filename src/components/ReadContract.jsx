import { Alert, Card } from "antd";
import { useReadContract } from "wagmi";
import { balanceAbi } from "../abi";

const constractAddress = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";

const userAddress = "0x0aa0E6617Fe992b96A2df5d8E98b6742D0536Af3";

const contractConfig = {
  address: constractAddress,
  abi: balanceAbi,
};

export default function ReadContract() {
  const { data, isPending, error } = useReadContract({
    ...contractConfig,
    functionName: "balanceOf",
    args: [userAddress],
  });

  return (
    <Card className="mb-[10px]" title="合约读取余额">
      {error && <Alert type="error" message={error.message}></Alert>}
      {isPending ? <div>加载中...</div> : <div>余额: {data?.toString()}</div>}
    </Card>
  );
}
