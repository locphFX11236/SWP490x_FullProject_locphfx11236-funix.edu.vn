import React, { useEffect } from "react";
import { Spin } from "antd";
import { useParams } from "react-router-dom";

import { useWaiting } from "./context";

export const WaitingPage = ({ children }) => {
    const param = useParams();
    const state = param.state;
    const wait = useWaiting();
    useEffect(() => {
        console.log("WaitingPage", state, wait.isWaiting);
        if (state) {
            const stateArr = state.split("-");
            const errorState = stateArr[0] === "failure";
            const time = +stateArr[1];
            if (errorState) {
                wait.setError("Đăng nhập thất bại!");
            } else {
                setTimeout(() => window.close(), time * 1000);
            }
        }
    }, [state, wait]);

    return (
        <>
            {children}
            <div
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "100vw",
                    height: "100vh",
                    padding: "40vh 0",
                    textAlign: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    zIndex: 5,
                }}
                hidden={state || !wait.isWaiting}
            >
                <Spin size="large" />
                <h3 hidden={!wait.isError}>{wait.message}</h3>
            </div>
        </>
    );
};
