import { Typography } from "antd";
import { useAccount } from "wagmi";
const { Text } = Typography;

export default function NetInfo() {
  const { isConnected, chain } = useAccount();

  if (!isConnected) {
    return null;
  }
  return (
    <div className="mb">
      {/* <Text>chainId: {chainId}</Text> */}
      <h4>chainId: {chain.id}</h4>
      <h4>chainName: {chain.name}</h4>
    </div>
  );
}
