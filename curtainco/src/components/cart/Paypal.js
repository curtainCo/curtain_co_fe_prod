import React from "react";
import ReactDOM from "react-dom";


function Paypal(props) {

    const { handleSuccess, handleError, handleCancel, handleCreateOrder, totalPrice } = props;

    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

    const payPalButtonStyles = {
        size: "medium",
        color: "blue",
        shape: "pill"
    };
    const createOrder = (data, actions) => {
        handleCreateOrder();
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: totalPrice,
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then((res) => {
            handleSuccess(res);
        });
    };

    const onError = (err) => {
        handleError(err);
    };

    const onCancel = (data) => {
        handleCancel(data);
    };

    return (
        <PayPalButton
            env='sandbox'
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            onCancel={(data) => onCancel(data)}
            onError={err => onError(err)}
            style={payPalButtonStyles}
        />
    );
}

export default Paypal;