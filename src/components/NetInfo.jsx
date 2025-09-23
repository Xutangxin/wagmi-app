import { Typography } from "antd";
import { useAccount, useChainId } from "wagmi";
const { Text } = Typography;

export default function NetInfo() {
  const { isConnected } = useAccount();

  const chainId = useChainId();

  if (!isConnected) {
    return null;
  }
  return (
    <p className="mb">
      <Text>chainId: {chainId}</Text>
    </p>
  );
}
