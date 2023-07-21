import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";

import * as Thunk from "../../../core/thunkAction";

const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
    // "data-client-token": "abc123xyz==",
};

export const PayPalPayment = ({ setOpen, ...rest }) => {
    const dispatch = useDispatch();
    const donat = useRef(rest);
    const CreateOrder = async (...paypalDefalt) => {
        setOpen(false);
        const orderPromise = () =>
            dispatch(
                Thunk.CreatePaypalOrder({
                    donation: donat.current,
                    paypalDefalt,
                })
            );
        const orderId = await orderPromise();
        return orderId.payload; // Trả lại OrderId -> OnApprove sẽ dùng id ngay sau đó
    };
    const OnApprove = (data, actions) =>
        dispatch(
            Thunk.CapturePaypalOrder({ data, donation: donat.current, actions })
        );
    const OnError = () => message.error("Quyên góp thất bại!");

    useEffect(() => (donat.current = rest), [rest]);

    return (
        <PayPalScriptProvider options={initialOptions}>
            <strong>Chú ý: Bạn sẽ thanh toán bằng USD.</strong>
            <strong>
                Sau khi chuyển đổi sang USD theo tỷ giá và được làm tròn
            </strong>
            <PayPalButtons
                createOrder={CreateOrder}
                onApprove={OnApprove}
                onError={OnError}
            />
        </PayPalScriptProvider>
    );
};
