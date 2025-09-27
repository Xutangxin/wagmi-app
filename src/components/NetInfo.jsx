import { Tag } from "antd";
import { useAccount } from "wagmi";

export default function NetInfo() {
  const { isConnected, chain } = useAccount();

  if (!isConnected || !chain) {
    return null;
  }
  return (
    <div className="mb-[10px] mt-[10px] ">
      <Tag className="p-[4px]">ChainId: {chain.id}</Tag>
      <Tag className="p-[4px]">ChainName: {chain.name}</Tag>
    </div>
  );
}
