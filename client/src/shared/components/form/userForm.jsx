import { Form, Input, message, Row } from "antd";
import { useDispatch } from "react-redux";

import { SelectAuthState, UserCollections } from "../../../core";
import { userSample } from "./sample";
import { checkFile, DraggerImg } from "./uploadImg";

export const UserForm = ({ data, setOpen }) => {
    const dispatch = useDispatch();
    const auth = SelectAuthState();
    const [form] = Form.useForm();
    const isAdd = !data ? true : false;
    const { _id } = auth.data.find((d) => d._id === auth.user_id);
    const handle = (keyForm) => {
        form.validateFields()
            .then((values) => {
                if (keyForm === "Create")
                    dispatch(
                        UserCollections({
                            keyForm,
                            data: {
                                oldVal: {},
                                values: values,
                                admin: {},
                            },
                        })
                    );
                else if (keyForm === "Update")
                    dispatch(
                        UserCollections({
                            keyForm,
                            data: {
                                oldVal: data,
                                values: values,
                                admin: { admin_id: _id },
                            },
                        })
                    );
                else if (keyForm === "Delete")
                    dispatch(
                        UserCollections({
                            keyForm,
                            data: {
                                oldVal: data,
                                values: values,
                                admin: { admin_id: _id },
                            },
                        })
                    );
                else console.log("Cancel!");
                return;
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setOpen(false);
            });
    };
    const normFile = (e) => {
        const result = [];
        if (e.file.status === "removed") return result;
        else if (checkFile(e.file)) {
            result.unshift(e.file);
            return result;
        } else {
            message.error("File không phù hợp!");
            return result;
        }
    };

    return (
        <Form
            name="user-form"
            form={form}
            labelAlign="left"
            wrapperCol={{ span: 16 }}
            labelCol={{ span: 8 }}
            initialValues={isAdd ? userSample : data}
        >
            <Form.Item label="User ID" hidden={isAdd}>
                <span className="ant-form-text">{isAdd ? "" : data.key}</span>
            </Form.Item>

            <Form.Item label="Họ tên" name="name">
                <Input />
            </Form.Item>

            <Form.Item label="Avatar Url" name="imgAvatar" hidden={isAdd}>
                <Input />
            </Form.Item>

            <Form.Item label="Số điện thoại" name="phoneNumber">
                <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
                <Input readOnly />
            </Form.Item>

            <Form.Item label="Mật khẩu" name="password">
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Upload avatar"
                name="imgUpFile"
                valuePropName="file"
                getValueFromEvent={normFile}
            >
                {DraggerImg()}
            </Form.Item>

            <Form.Item noStyle>
                <Row className="d-flex justify-content-between mt-3">
                    <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => handle("Delete")}
                        hidden={isAdd}
                    >
                        Delete
                    </button>
                    <button
                        className="btn btn-warning"
                        type="button"
                        onClick={() => handle("Update")}
                        hidden={isAdd}
                    >
                        Update
                    </button>
                    <button
                        className="btn btn-success"
                        type="button"
                        onClick={() => handle("Create")}
                        hidden={!isAdd}
                    >
                        Create
                    </button>
                    <button
                        className="btn btn-outline-info"
                        type="button"
                        onClick={() => handle("Cancel")}
                    >
                        Cancel
                    </button>
                </Row>
            </Form.Item>
        </Form>
    );
};
