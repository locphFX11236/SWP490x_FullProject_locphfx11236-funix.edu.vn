import React, { useEffect } from "react";
import { Spin } from "antd";
import { useParams } from "react-router-dom";

export const WaitingPage = () => {
    const param = useParams();
    const stateArr = param.state.split("-");
    useEffect(() => {
        setTimeout(() => {
            window.close();
        }, Number(stateArr[2]) * 1000);
    }, [stateArr]);

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                width: "100vw",
                height: "100vh",
                padding: "40vw 0",
                textAlign: "center",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
        >
            <Spin size="large" />
        </div>
    );
};
