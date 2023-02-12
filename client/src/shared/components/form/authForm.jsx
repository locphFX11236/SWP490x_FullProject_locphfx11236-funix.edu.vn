import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Form, Input, Row, Typography } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { RestAPIAuth } from "../../../core/slice/authData";

const Title = {
    'SignUp': 'Đăng ký',
    'LogIn': 'Đăng nhập',
    'Forget': 'Quên mật khẩu',
};

const SampleLogIn = {
    phoneNumber: "0987654321",
    password: "123456",
};

export const AuthForm = () => {
    const path = useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const typeForm = path.substring(1);
    const handle = (key) => {
        form.validateFields()
        .then(values => {
            if (key === 'SignUp') {console.log('SignUp! with record', values)}
            else if (key === 'LogIn') {console.log('LogIn! with record', values); dispatch( RestAPIAuth(SampleLogIn) ); navigate('/'); }
            else if (key === 'Forget') {console.log('Forget! with record', values)}
            else {console.log('Cancel')}
        })
        .catch((err) => console.log(err))
    };

    return (
        <Card className="m-auto" style={{ width: 600 }}>
            <Form
                name="login-form"
                form={form}
                initialValues={typeForm === 'LogIn' ? SampleLogIn : undefined}
            >
                <Typography.Title level={3}>{ Title[typeForm] }</Typography.Title>
                <Form.Item
                    name="name"
                    hidden={typeForm === 'LogIn'}
                >
                    <Input placeholder="Nhập họ tên" />
                </Form.Item>
                <Form.Item
                    name="email"
                    hidden={typeForm === 'LogIn'}
                >
                    <Input placeholder="Nhập email" />
                </Form.Item>
                <Form.Item name="phoneNumber" >
                    <Input prefix={<UserOutlined />} placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item name="password" >
                    <Input.Password
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Nhập password"
                    />
                </Form.Item>
                <Form.Item
                    name="re-password"
                    hidden={typeForm === 'LogIn'}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Nhập password lần nữa"
                    />
                </Form.Item>

                <Form.Item noStyle>
                    <Row className='d-flex justify-content-between'>
                        <Button
                            type={typeForm === 'LogIn' ? 'primary' : 'link' }
                            onClick={() => typeForm === 'LogIn' ? handle(typeForm) : navigate('/LogIn')}
                        >
                            {typeForm === 'LogIn' ? Title[typeForm] : 'Log in now!' }
                        </Button>
                        <Button
                            type={typeForm === 'SignUp' ? 'primary' : 'link' }
                            onClick={() => typeForm === 'SignUp' ? handle(typeForm) : navigate('/SignUp')}
                        >
                            {typeForm === 'SignUp' ? Title[typeForm] : 'Register now!' }
                        </Button>
                        <Button
                            type={typeForm === 'Forget' ? 'primary' : 'link' }
                            onClick={() => typeForm === 'Forget' ? handle(typeForm) : navigate('/Forget')}
                        >
                            {typeForm === 'Forget' ? 'Lấy lại mật khẩu' : 'Forgot password!' }
                        </Button>
                        <Button
                            type='primary'
                            onClick={() => handle('Cancel')}
                        >
                            Cancel
                        </Button>
                    </Row>
                </Form.Item>
            </Form>
        </Card>
    );
};