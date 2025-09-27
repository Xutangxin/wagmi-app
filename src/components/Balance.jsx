import { Tag } from "antd";
import { formatUnits } from "viem";
import { useAccount, useBalance } from "wagmi";

export default function Balance() {
  const { address } = useAccount();

  const { data } = useBalance({
    address,
  });

  return (
    <div className="mb-[10px]">
      {data && (
        <Tag className="p-[6px] font-bold text-sm">
          余额:{" "}
          <span>
            {formatUnits(data.value, data.decimals)} {data.symbol}
          </span>
        </Tag>
      )}
    </div>
  );
}
