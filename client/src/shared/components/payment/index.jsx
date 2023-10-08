import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";

import { CreatePaypalOrder, CapturePaypalOrder } from "../../../core";

const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
    // "data-client-token": "abc123xyz==",
};

const PayPalPayment = ({ setOpen, ...rest }) => {
    const dispatch = useDispatch();
    const donat = useRef(rest);
    const CreateOrder = async (...paypalDefalt) => {
        const orderPromise = () =>
            dispatch(
                CreatePaypalOrder({
                    donation: donat.current,
                    paypalDefalt,
                })
            );
        const orderId = await orderPromise();
        setOpen(false);
        console.log("\nsb-g4343fb26134850@business.example.com\n00000000\n---");
        return orderId.payload; // Trả lại OrderId -> OnApprove sẽ dùng id ngay sau đó
    };
    const OnApprove = (data, actions) =>
        dispatch(
            CapturePaypalOrder({
                data,
                donation: donat.current,
                actions,
            })
        );
    const OnError = () => message.error("Quyên góp thất bại!");

    useEffect(() => {
        donat.current = rest;
    }, [rest]);

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

export default PayPalPayment;
