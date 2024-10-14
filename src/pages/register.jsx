import { Button, Form, Input, notification, Row, Col } from "antd";
import { registerUserAPI } from "../services/api.service";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        console.log(">>> Check values", values)

        //call api
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone)

        if (res.data) {
            notification.success({
                message: "Register User",
                description: "Đăng ký người dùng thành công"
            })
            navigate("/login")
        } else {
            notification.error({
                message: "Register User Error",
                description: JSON.stringify(res.message)
            })
        }
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ margin: "10px" }}
        // onFinishFailed={onFinishFailed}
        >
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Full name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your full name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: "Wrong format!"

                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <div xs={24} md={8}>
                    <Button type="primary" onClick={() => form.submit()}>Register</Button>
                </div>
            </Row>

        </Form >
    )
}

export default RegisterPage;