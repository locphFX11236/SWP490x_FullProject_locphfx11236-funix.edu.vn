import { Col, Form, Input, InputNumber, message, Row, Select, Slider, } from 'antd';
import { useDispatch } from 'react-redux';

import { CreateProgram, DeleteProgram, SelectDataState, UpdateProgram } from '../../../core/slice/showData';
import { SelectAuthState } from '../../../core/slice/authData';
import { programSample } from './sample';
import { checkFile, DraggerImg, getBase64Encoder } from './uploadImg';

const { TextArea } = Input;

export const ProgramForm = ({data, setOpen}) => {
    const { organizations } = SelectDataState();
    const auth = SelectAuthState();
    const dispatch = useDispatch();
    const SelectOrgId = organizations.map(o => <Select.Option key={o._id} value={o._id}>{o.nameOrganization}</Select.Option>)
    const [form] = Form.useForm();
    const isAdd = !(data) ? true : false;
    const { _id, name } = auth.data.find(d => d._id === auth.user_id);
    const handle = (key) => {
        form.validateFields()
        .then(values => {
            if (key === 'Create') dispatch(CreateProgram({ values: values, admin: { name: name, admin_id: _id } }));
            else if (key === 'Update') dispatch(UpdateProgram({ oldVal: data, newVal: values, admin: { name: name, admin_id: _id } }));
            else if (key === 'Delete') dispatch(DeleteProgram(data.key));
            else console.log('Cancel!');
            setOpen(false);
            return;
        })
        .catch((err) => console.log(err))
    };
    const handleFile = (e) => {
        const result = [];
        if (e.file.status === 'removed') { return result; }
        else if( checkFile(e.file) ) {
            getBase64Encoder(e.file, str => result.unshift(str));
            return result;
        } else {
            message.error('File không phù hợp!');
            return result;
        };
    };

    return (
        <Form
            name="program-form"
            form={form}
            labelAlign="left"
            wrapperCol={{ span: 16 }}
            labelCol={{ span: 8 }}
            initialValues={ isAdd ? programSample : data }
        >
            <Form.Item label="Program ID" hidden={isAdd} >
                <span className="ant-form-text">{isAdd ? '' : data.key}</span>
            </Form.Item>

            <Form.Item name="name" label="Tên chương trình">
                <Input />
            </Form.Item>

            <Form.Item name="imgProgram" label="Url Ảnh" hidden={isAdd}>
                <Input disabled={isAdd} />
            </Form.Item>

            <Form.Item name="moneyRate" label={`Tỷ lệ hoàn thành (${isAdd ? '' : data.moneyRate}%)`} hidden={isAdd}>
                <Slider disabled/>
            </Form.Item>

            <Form.Item name={["organization", 'key']} label="Tổ chức đồng hành" >
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
                    <Form.Item name="moneyCurrent" label="Số tiền hiện tại (VNĐ)" hidden={isAdd} >
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
                        { DraggerImg() }
                    </Form.Item> {/** Không dùng React component đc ??? */}
                </Col>
            </Row>

            <label><p>Mô tả câu chuyện:</p></label>
            <Form.Item name="descriptionStory" noStyle>
                <TextArea rows={15} />
            </Form.Item>

            <Form.Item noStyle>
                <Row className='d-flex justify-content-between mt-3'> {/** Tại sao có type='button' thì không bi lỗi */}
                    <button className="btn btn-success" type='button' onClick={() => handle('Create')} hidden={!isAdd}>Create</button>
                    <button className="btn btn-danger" type='button' onClick={() => handle('Delete')} hidden={isAdd}>Delete</button>
                    <button className="btn btn-warning" type='button' onClick={() => handle('Update')} hidden={isAdd}>Update</button>
                    <button className="btn btn-outline-info" type='button' onClick={() => handle('Cancel')} >Cancel</button>
                </Row>
            </Form.Item>
        </Form>
    );
};