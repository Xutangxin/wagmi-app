import { useAccount } from "wagmi";

export default function NetInfo() {
  const { isConnected, chain } = useAccount();

  if (!isConnected) {
    return null;
  }
  return (
    <div className="mb-[10px] mt-[10px] ">
      <h4>ChainId: {chain.id}</h4>
      <h4>ChainName: {chain.name}</h4>
    </div>
  );
}
