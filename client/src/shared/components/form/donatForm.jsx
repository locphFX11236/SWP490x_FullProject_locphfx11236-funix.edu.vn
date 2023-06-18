import { Form, Input } from "antd";
import moment from "moment";

import { PayPalPayment } from "../payment";

export const DonationForm = ({ name, programId, ...rest }) => {
    const [form] = Form.useForm();
    const initValue = { name: name };
    const values = {
        _id: programId,
        donationMoney: parseFloat(Form.useWatch("donationMoney", form)),
        donationTime: moment().toISOString(),
        message: Form.useWatch("message", form),
        ...rest,
    };

    return (
        <Form
            name="donation-form"
            form={form}
            layout="horizontal"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={initValue}
        >
            <Form.Item label="Bạn là:" name="name">
                <Input readOnly />
            </Form.Item>

            <Form.Item label="Số tiền quyên góp" name="donationMoney">
                <Input type="number" suffix="VND" />
            </Form.Item>

            <Form.Item label="Lời yêu thương" name="message">
                <Input.TextArea />
            </Form.Item>

            {values.donationMoney ? <PayPalPayment {...values} /> : ""}
        </Form>
    );
};
