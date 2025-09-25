import { Button, Typography } from "antd";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const { Text } = Typography;

export default function WalletConnect() {
  const { address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  return address ? (
    <div>
      已连接地址:
      <Text copyable> {address}</Text>
      <Button className="ml-[18px]" danger onClick={() => disconnect()}>
        断开连接
      </Button>
    </div>
  ) : (
    <div>
      {connectors.map((connector) => (
        <Button
          type="primary"
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          连接 {connector.name}
        </Button>
      ))}
    </div>
  );
}
