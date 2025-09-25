import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Typography,
  Alert,
} from "antd";

const { Text } = Typography;
import { parseEther } from "viem";
import {
  useSendTransaction,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";

export default function SendTransaction() {
  const { isConnected } = useAccount();
  const { data: hash, isPending, sendTransaction } = useSendTransaction();

  const { isLoading, isSuccess, isError, error } = useWaitForTransactionReceipt(
    {
      hash,
    }
  );

  const onFinish = (values) => {
    sendTransaction({
      to: values.address,
      value: parseEther(`${values.value}`),
    });
  };

  if (!isConnected) return null;

  return (
    <div className="mb-[10px]">
      <Card title="发送交易">
        <Form
          name="basic"
          // labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{
            address: "0x5bF9634a97fAdfCEDCE8fF81A293dFf0FA060ADa",
            value: 0.001,
          }}
        >
          <Form.Item
            label="接收地址"
            name="address"
            rules={[{ required: true, message: "Please input address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ETH数量"
            name="value"
            rules={[{ required: true, message: "Please input amount!" }]}
          >
            <InputNumber
              min={0.0001}
              max={10}
              step={0.0001}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending || isLoading}
            >
              {isPending || isLoading ? "发送中" : "发送"}
            </Button>
          </Form.Item>
        </Form>
        {isSuccess && (
          <Alert
            message="交易成功!"
            type="success"
            showIcon
            description={<Text>交易哈希: {hash}</Text>}
          />
        )}
        {isError && (
          <Alert
            message="交易失败"
            type="error"
            showIcon
            description={error?.message}
          />
        )}
      </Card>
    </div>
  );
}
