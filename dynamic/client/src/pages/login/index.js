import { useLogin } from "@refinedev/core";
import {
    Button, Card, Form,
    Input,Typography
} from "antd";

const logoSrc = process.env.PUBLIC_URL + "/logo.jpg";

export const LoginPage = () => {
    const [form] = Form.useForm();
    const { Text, Title } = Typography;
    const CardTitle = (
        <Title level={3} className="title">
            HCM Sign in your account
        </Title>
    );
    const { mutate: login } = useLogin();
  const loginContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  };

  const loginFormStyle = {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  const logoStyle = {
    width: "100px", /* Adjust the width as needed */
    height: "auto",
    marginBottom: "20px",
  };

  const headingStyle = {
    marginBottom: "20px",
  };

  return (
    <div style={loginContainerStyle}>
      <div style={loginFormStyle}>
        <img src={logoSrc} alt="Logo" style={logoStyle} />
        <form>
        </form><Card  headStyle={{ borderBottom: 0 }}>
                            <Form
                                layout="vertical"
                                form={form}
                                onFinish={(values) => {
                                    console.log("values", values)
                                    login(values);
                                }}
                                requiredMark={false}
                                initialValues={{
                                    remember: false,
                                }}
                            >
                                <Form.Item
                                    name="email"
                                    label="email"
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        size="large"
                                        placeholder="email"

                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[{ required: true }]}
                                    style={{ marginBottom: "12px" }}
                                >
                                    <Input
                                        type="password"
                                        placeholder="●●●●●●●●"
                                        size="large"
                                    />
                                </Form.Item>
                            
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    block
                                >
                                    Sign in
                                </Button>
                            </Form>
                            <div style={{ marginTop: 8 }}>
                                <Text style={{ fontSize: 12 }}>
                                    Don’t have an account?{" "}
                                    <a href="/register" style={{ fontWeight: "bold" }}>
                                        Sign up
                                    </a>
                                </Text>
                            </div>
                        </Card>
      </div>
    </div>
  );
};

