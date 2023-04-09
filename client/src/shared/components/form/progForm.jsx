import {
    Col,
    Form,
    Input,
    InputNumber,
    message,
    Row,
    Select,
    Slider,
} from "antd";
import { useDispatch } from "react-redux";
import moment from "moment";

import { ProgramCollections } from "../../../core/thunkAction";
import { SelectDataState } from "../../../core/slice/showData";
import { SelectAuthState } from "../../../core/slice/authData";
import { programSample } from "./sample";
import { checkFile, DraggerImg } from "./uploadImg";

const { TextArea } = Input;

const SelectItem = (org) => (
    <Select.Option key={org._id} value={org._id}>
        {org.nameOrganization}
    </Select.Option>
);

export const ProgramForm = ({ data, setOpen }) => {
    const { organizations } = SelectDataState();
    const auth = SelectAuthState();
    const dispatch = useDispatch();
    const SelectOrgId = organizations.map((o) => SelectItem(o));
    const [form] = Form.useForm();
    const isAdd = !data ? true : false;
    const { _id, name } = auth.data.find((d) => d._id === auth.user_id);
    const handle = (keyForm) => {
        form.validateFields()
            .then((values) => {
                values.startTime = moment(
                    values.startTime,
                    "HH:mm DD/MM/YYYY"
                ).toISOString();
                values.endTime = moment(
                    values.endTime,
                    "HH:mm DD/MM/YYYY"
                ).toISOString();
                return values;
            })
            .then((values) => {
                if (keyForm === "Create")
                    dispatch(
                        ProgramCollections({
                            keyForm,
                            data: {
                                oldVal: {},
                                values: values,
                                admin: {
                                    name: name,
                                    admin_id: _id,
                                },
                            },
                        })
                    );
                else if (keyForm === "Update")
                    dispatch(
                        ProgramCollections({
                            keyForm,
                            data: {
                                oldVal: data,
                                values: values,
                                admin: {
                                    name: name,
                                    admin_id: _id,
                                },
                            },
                        })
                    );
                else if (keyForm === "Delete")
                    dispatch(
                        ProgramCollections({
                            keyForm,
                            data: {
                                oldVal: data,
                                values: values,
                                admin: {
                                    name: name,
                                    admin_id: _id,
                                },
                            },
                        })
                    );
                else console.log("Cancel!");
                setOpen(false);
                return;
            })
            .catch((err) => console.log(err));
    };
    const handleFile = (e) => {
        const result = [];
        if (e.file.status === "removed") {
            return result;
        } else if (checkFile(e.file)) {
            result.unshift(e.file);
            return result;
        } else {
            message.error("File không phù hợp!");
            return result;
        }
    };

    return (
        <Form
            name="program-form"
            form={form}
            labelAlign="left"
            wrapperCol={{ span: 16 }}
            labelCol={{ span: 8 }}
            initialValues={isAdd ? programSample : data}
        >
            <Form.Item label="Program ID" hidden={isAdd}>
                <span className="ant-form-text">{isAdd ? "" : data.key}</span>
            </Form.Item>

            <Form.Item name="name" label="Tên chương trình">
                <Input />
            </Form.Item>

            <Form.Item name="imgProgram" label="Url Ảnh" hidden={isAdd}>
                <Input disabled={isAdd} />
            </Form.Item>

            <Form.Item
                name="moneyRate"
                label={`Tỷ lệ hoàn thành (${
                    isAdd ? "" : data.moneyRate.toFixed(2)
                }%)`}
                hidden={isAdd}
            >
                <Slider disabled />
            </Form.Item>

            <Form.Item name={["organization", "key"]} label="Tổ chức đồng hành">
                <Select children={SelectOrgId} />
            </Form.Item>

            <Row>
                <Col span={12}>
                    <Form.Item name="startTime" label="Thời gian bắt đầu">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="endTime" label="Thời gian kết thúc">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <Form.Item name="moneyTotal" label="Tổng số tiền cần (VNĐ)">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="moneyCurrent"
                        label="Số tiền hiện tại (VNĐ)"
                        hidden={isAdd}
                    >
                        <InputNumber disabled={isAdd} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Upload file ảnh"
                        name="imgUpFile"
                        valuePropName="file"
                        getValueFromEvent={handleFile}
                    >
                        {DraggerImg()}
                    </Form.Item>
                    {/** Không dùng React component đc ??? */}
                </Col>
            </Row>

            <label>
                <p>Mô tả câu chuyện:</p>
            </label>
            <Form.Item name="descriptionStory" noStyle>
                <TextArea rows={15} />
            </Form.Item>

            <Form.Item noStyle>
                <Row className="d-flex justify-content-between mt-3">
                    {/** Tại sao có type='button' thì không bi lỗi */}
                    <button
                        className="btn btn-success"
                        type="button"
                        onClick={() => handle("Create")}
                        hidden={!isAdd}
                    >
                        Create
                    </button>
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
