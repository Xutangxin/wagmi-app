import { formatUnits } from "viem";
import { useAccount, useBalance } from "wagmi";

export default function Balance() {
  const { address } = useAccount();

  const { data } = useBalance({
    address,
  });

  return (
    <div className="mb-[10px]">
      {/* {!data && <span>获取余额中...</span>} */}
      {data && (
        <div>
          余额:{" "}
          <span>
            {formatUnits(data.value, data.decimals)}
            {data.symbol}
          </span>
        </div>
      )}
    </div>
  );
}
