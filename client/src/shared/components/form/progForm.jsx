import { Col, Form, Input, Row, Slider } from 'antd';

const { TextArea } = Input;

const ProgramForm = ({data}) => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            name="program-form"
            wrapperCol={{ span: 12 }}
            labelCol={{ span: 8 }}
            onFinish={onFinish}
            initialValues={data}
        >
            <Form.Item label="Key ID">
                <span className="ant-form-text">{data.key}</span>
            </Form.Item>

            <Form.Item name="name" label="Tên chương trình">
                <TextArea />
            </Form.Item>

            <Form.Item name="moneyRate" label="Tỷ lệ hoàn thành">
                <Slider marks={{
                    0: '0%',
                    50: '50%',
                    100: '100%',
                }} />
            </Form.Item>

            <Row>
                <Col span={12}>
                    <Form.Item name="moneyCurrent" label="Số tiền hiện tại">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="moneyTotal" label="Tổng số tiền cần">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

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
        </Form>
    );
};
export default ProgramForm;