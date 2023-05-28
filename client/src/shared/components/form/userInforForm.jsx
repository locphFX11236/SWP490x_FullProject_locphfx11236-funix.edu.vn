import { Form, Input, Row } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { SelectAuthState } from "../../../core/slice/authData";
import { UserCollections } from "../../../core/thunkAction";

export const UserInforForm = () => {
    const [hidden, setHidden] = useState(true);
    const { data, user_id } = SelectAuthState();
    const [form] = Form.useForm();
    const index = data.findIndex((d) => d._id === user_id);
    const dispatch = useDispatch();
    const handle = () => {
        form.validateFields()
            .then((values) => {
                const val = { ...values, imgAvatar: data[index].imgAvatar };
                dispatch(
                    UserCollections({
                        keyForm: "Update",
                        data: {
                            oldVal: data[index],
                            values: val,
                            admin: {},
                        },
                    })
                );
                setHidden(true);
                return;
            })
            .catch((err) => console.log(err));
    };

    return (
        <Form
            name="program-form"
            form={form}
            layout="vertical"
            initialValues={data[index]}
            onValuesChange={() => setHidden(false)}
        >
            <Form.Item label="Họ tên" name="name">
                <Input />
            </Form.Item>

            <Form.Item label="Số điện thoại" name="phoneNumber">
                <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
                <Input />
            </Form.Item>

            <Form.Item label="Mật khẩu" name="password">
                <Input.Password />
            </Form.Item>

            <Form.Item noStyle hidden={hidden}>
                <Row className="d-flex justify-content-between mt-3">
                    <h5 className="p-2 bg-info text-white">
                        Bạn muốn thay đổi thông tin cá nhân?
                    </h5>
                    <button
                        className="btn btn-outline-info"
                        type="button"
                        onClick={handle}
                    >
                        Update
                    </button>
                </Row>
            </Form.Item>
        </Form>
    );
};
