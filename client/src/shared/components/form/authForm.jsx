import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Form, Input, Row, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { CreateUser } from "../../../core/slice/authData";
import { RestAPIAuth } from "../../../core/thunkAction";
import { SampleLogIn, SampleSignUp } from "./sample";

const Title = {
    SignUp: "Đăng ký",
    LogIn: "Đăng nhập",
    Forget: "Quên mật khẩu",
};

export const AuthForm = () => {
    const path = useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const typeForm = path.substring(1);
    const handle = (key) => {
        const checkRePass = (val) => {
            const { rePassword, ...rest } = val;
            if (rest.password === rePassword) return rest;
            else return;
        };
        form.validateFields()
            .then((values) => {
                if (key === "LogIn")
                    dispatch(
                        RestAPIAuth({
                            phoneNumber: values.phoneNumber,
                            password: values.password,
                        })
                    );
                else if (key === "SignUp")
                    checkRePass(values)
                        ? dispatch(CreateUser(checkRePass(values)))
                        : message.error("Nhập lại password không đúng.");
                else if (key === "Forget") {
                    console.log("Forget! with record", values);
                } else navigate("/");
                return;
            })
            .catch((err) => console.log(err));
    };
    const sampleVal = typeForm === "LogIn" ? SampleLogIn : SampleSignUp;

    return (
        <Card className="m-auto" style={{ width: 600 }}>
            <Form name="login-form" form={form} initialValues={sampleVal}>
                <Typography.Title level={3}>{Title[typeForm]}</Typography.Title>
                <Form.Item name="name" hidden={typeForm === "LogIn"}>
                    <Input placeholder="Nhập họ tên" />
                </Form.Item>
                <Form.Item name="email" hidden={typeForm === "LogIn"}>
                    <Input placeholder="Nhập email" />
                </Form.Item>
                <Form.Item name="phoneNumber">
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Nhập số điện thoại"
                    />
                </Form.Item>
                <Form.Item name="password">
                    <Input.Password
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Nhập password"
                    />
                </Form.Item>
                <Form.Item name="rePassword" hidden={typeForm === "LogIn"}>
                    <Input.Password
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Nhập password lần nữa"
                    />
                </Form.Item>

                <Form.Item noStyle>
                    <Row className="d-flex justify-content-between">
                        <Button
                            type={typeForm === "LogIn" ? "primary" : "link"}
                            onClick={() =>
                                typeForm === "LogIn"
                                    ? handle(typeForm)
                                    : navigate("/LogIn")
                            }
                        >
                            {typeForm === "LogIn"
                                ? Title[typeForm]
                                : "Log in now!"}
                        </Button>
                        <Button
                            type={typeForm === "SignUp" ? "primary" : "link"}
                            onClick={() =>
                                typeForm === "SignUp"
                                    ? handle(typeForm)
                                    : navigate("/SignUp")
                            }
                        >
                            {typeForm === "SignUp"
                                ? Title[typeForm]
                                : "Register now!"}
                        </Button>
                        <Button
                            type={typeForm === "Forget" ? "primary" : "link"}
                            onClick={() =>
                                typeForm === "Forget"
                                    ? handle(typeForm)
                                    : navigate("/Forget")
                            }
                        >
                            {typeForm === "Forget"
                                ? "Lấy lại mật khẩu"
                                : "Forgot password!"}
                        </Button>
                        <Button type="primary" onClick={() => handle("Cancel")}>
                            Cancel
                        </Button>
                    </Row>
                </Form.Item>
            </Form>
        </Card>
    );
};
