import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as AntComponents from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { RestAPIAuth, UserCollections, OAuth2 } from "../../../core";
import { EXTEND_URL } from "../../helper";
import { SampleLogIn, SampleSignUp } from "./sample";

const { Card, Button, Form, Input, Row, Typography, message, Image } =
    AntComponents;

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
                        ? dispatch(
                              UserCollections({
                                  keyForm: "Create",
                                  data: {
                                      oldVal: {},
                                      values: checkRePass(values),
                                      admin: {},
                                  },
                              })
                          )
                        : message.error("Nhập lại password không đúng.");
                else if (key === "Forget") {
                    console.log("Form 1");
                    dispatch(
                        UserCollections({
                            keyForm: "Update",
                            data: {
                                oldVal: {},
                                values: {
                                    ...values,
                                    password: Date.now().toString(),
                                },
                                admin: {},
                            },
                        })
                    );
                    console.log("Form 2");
                } else throw new Error();
                return;
            })
            .catch((err) => console.log(err))
            .finally(() => {
                navigate("/");
            });
    };
    const GoogleOAuth = () => {
        dispatch(OAuth2("google"));
        navigate("/");
    };
    const sampleVal = typeForm === "LogIn" ? SampleLogIn : SampleSignUp;

    return (
        <Card className="m-auto" style={{ width: 600 }}>
            <Form name="login-form" form={form} initialValues={sampleVal}>
                <Typography.Title level={2}>
                    {Title[typeForm]}
                    <hr />
                </Typography.Title>
                <Typography.Title level={5} hidden={typeForm !== "Forget"}>
                    Thông tin xác thực
                </Typography.Title>
                <Form.Item name="name" hidden={typeForm === "LogIn"}>
                    <Input placeholder="Nhập họ tên" />
                </Form.Item>
                <Form.Item name="phoneNumber">
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Nhập số điện thoại"
                    />
                </Form.Item>
                <Form.Item name="email" hidden={typeForm === "LogIn"}>
                    {typeForm === "Forget" ? (
                        <strong>
                            Bạn cần đăng nhập vào email để nhận mật khẩu
                        </strong>
                    ) : (
                        <Input placeholder="Nhập email" />
                    )}
                </Form.Item>
                <Typography.Title level={5} hidden={typeForm !== "SignUp"}>
                    <hr />
                    Tạo mật khẩu
                </Typography.Title>
                <Form.Item
                    name="password"
                    hidden={typeForm === "Forget"}
                    disabled={typeForm === "Forget"}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Nhập password"
                        autoFocus
                    />
                </Form.Item>
                <Form.Item
                    name="rePassword"
                    hidden={typeForm !== "SignUp"}
                    disabled={typeForm !== "SignUp"}
                >
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
                <div className="mt-3" hidden={typeForm !== "LogIn"}>
                    <Button
                        type="default"
                        className="w-100"
                        icon={
                            <Image
                                width={24}
                                height={24}
                                className="mb-1"
                                src={EXTEND_URL + "asset/svg/google.svg"}
                                preview={false}
                            />
                        }
                        onClick={GoogleOAuth}
                    >
                        Continue with Google
                    </Button>
                </div>
            </Form>
        </Card>
    );
};
