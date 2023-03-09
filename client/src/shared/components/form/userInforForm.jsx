import { Form, Input, Row } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { SelectAuthState, UpdateUser } from '../../../core/slice/authData';

export const UserInforForm = () => {
    const [allow, setAllow] = useState(true);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { data, user_id } = SelectAuthState();
    const user = data.find(d => d._id.$oid === user_id);
    const handle = () => {
        form.validateFields()
        .then(values => {
            const val = { ...values, imgAvatar: user.imgAvatar }
            dispatch(UpdateUser({ oldVal: user, newVal: val }));
        })
        .catch((err) => console.log(err))
    };

    return (
        <Form
            name="program-form"
            form={form}
            layout='vertical'
            initialValues={ user }
            onValuesChange={() => setAllow(false)}
        >
            <Form.Item label="Họ tên" name='name' >
                <Input />
            </Form.Item>

            <Form.Item label="Số điện thoại" name='phoneNumber' >
                <Input />
            </Form.Item>

            <Form.Item label="Email" name='email' >
                <Input />
            </Form.Item>

            <Form.Item label="Mật khẩu" name='password' >
                <Input.Password />
            </Form.Item>
            
            <Form.Item noStyle hidden={allow}>
                <Row className='d-flex justify-content-between mt-3'>
                    <h5 className="p-2 bg-info text-white">Bạn muốn thay đổi thông tin cá nhân?</h5>
                    <button className="btn btn-outline-info" onClick={handle}>Update</button>
                </Row>
            </Form.Item>
        </Form>
    );
};