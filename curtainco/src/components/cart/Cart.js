import React, { useState, useEffect } from "react";
// COMPONENTS
import PayPal from "./Paypal";
import CartList from "./CartList";
import CartTotal from "./CartTotal";
// PACKAGES
import { Link } from "react-router-dom/cjs/react-router-dom.min";
// STYLES
import { Typography, Grid, Box, Button } from "@material-ui/core";
import useStyles from "./CartStyles";
// HELPERS AND SERVICES
import {
    getCartItemsFromLocalStorage,
    changeQtyOfItemInLocalStorage,
    updateLocalStorageWithNewArray,
    removeFromCart,
    generateTotalPriceOfCart,
} from "../../services/cartServices";
import { createOrder, updateOrder, deleteOrder } from "../../services/orderServices";
import { setSuccessSnackBar } from "../../helpers/appHelpers";
// STATE
import { useCurtainContext } from "../../config/CurtainCoContext";
import { ACTIONS } from "../../config/stateReducer";
import { setErrorSnackBar } from "../../helpers/appHelpers";

function Cart({ history }) {
    const classes = useStyles();
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { state, dispatch } = useCurtainContext();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentFailed, setPaymentFailed] = useState(false);
    const [paymentCancelled, setPaymentCancelled] = useState(false);
    let orderId = null;
    // GET THE ITEMS FROM LOCAL STORAGE
    function updateCartInStateFromLocalStorage() {
        const cartItems = getCartItemsFromLocalStorage();
        // console.log(cartItems)
        setCart(cartItems);
    }

    // GET THE ITEMS FROM LOCAL STORAGE ON FIRST LOAD
    useEffect(() => {
        updateCartInStateFromLocalStorage();
        setPaymentFailed(false);
        setPaymentCancelled(false);
    }, []);

    // WHEN CART IN LOCAL STATE IS LOADED, CALCULATE THE TOTAL PRICE
    useEffect(() => {
        let tempTotal = generateTotalPriceOfCart(cart);
        setTotalPrice(tempTotal);
    }, [cart]);

    function handleIncreaseQty(event) {
        event.preventDefault();
        let productId = event.currentTarget.value;
        let cartArrayWithUpdatedQty = changeQtyOfItemInLocalStorage(
            cart,
            productId,
            "increase"
        );
        updateLocalStorageWithNewArray(cartArrayWithUpdatedQty);
        updateCartInStateFromLocalStorage();
    }

    function handleDecreaseQty(event) {
        event.preventDefault();
        let productId = event.currentTarget.value;
        let errorOrArray = changeQtyOfItemInLocalStorage(
            cart,
            productId,
            "decrease"
        );
        if (!errorOrArray) {
            setErrorSnackBar(dispatch, "Error: Please remove the item instead");
            return;
        }
        updateLocalStorageWithNewArray(errorOrArray);
        updateCartInStateFromLocalStorage();
    }

    function handleRemove(event) {
        event.preventDefault();
        removeFromCart(event.currentTarget.value);
        updateCartInStateFromLocalStorage();
        setSuccessSnackBar(dispatch, "Item was removed from cart");
    }

    async function handleSuccess(data) {
        // data contains the response from paypal which is to be stored in server
        console.log("----SUCCESSFUL PAYPAL PURCHASE----");
        console.log(data);

        const payload = {
            paymentData: data
        };
        // updates the db document with Paypal data
        try {
            let response = await updateOrder(orderId, payload);
            console.log(response);
            // TODO CLEAR THE CART AND REDIRECT TO THEIR ACCOUNT PAGE TO VIEW THE PURCHASE
            setPaymentSuccess(true); // modal confirmation?
            window.localStorage.clear();
            updateCartInStateFromLocalStorage();
            history.push("/account");
            setSuccessSnackBar(dispatch, "Payment was successful");
        } catch (error) {
            console.log(
                "Error occurred when updating the order after successful paypal payment."
            );
            console.log(error);
            setErrorSnackBar(
                dispatch,
                "Error: OrderId and payment data was not updated but payment was taken."
            );
        }
    }

    async function handleCreateOrder() {
        const payload = {
            totalPrice: totalPrice,
            items: cart,
            // placeholder
            paymentData: {},
        };
        try {
            let response = await createOrder(payload);
            orderId = response.data._id;
            console.log(response);
            return response;
        } catch (error) {
            console.log(
                "Error occurred when creating the order after successful paypal payment."
            );
            console.log(error);
            setErrorSnackBar(
                dispatch,
                "Error: Order was not processed and no payment was taken"
            );
        }
    }

    async function handleError(data) {
        console.log("----ERROR PAYPAL PURCHASE----");
        // data contains the response from paypal which is to be stored in server
        console.log(data);
        // delete created order upon clicking PayPal Checkout
        try {
            await deleteOrder(orderId);
            console.log("Order Object DELETED");
            setPaymentFailed(true); // modal ??
            setErrorSnackBar(
                dispatch,
                "Something went wrong. Payment was not taken"
            );
        } catch (error) {
            console.log("There was a problem removing the created order when paypal errored on checkout.");
            console.log(error);
        }
    }

    async function handleCancel(data) {
        console.log("----CANCEL PAYPAL PURCHASE----");
        console.log(data);
        // data contains the response from paypal which is to be stored in server
        try {
            await deleteOrder(orderId);
            console.log("Order Object DELETED");
            setPaymentCancelled(true);
        } catch (error) {
            console.log("There was a problem removing the created order after cancelling checkout.");
            console.log(error);
        }
    }

    function isUserLoggedIn() {
        return state.currentUser !== null;
    }

    return (
        <>
            <Typography variant="h3">Cart Page</Typography>
            <CartList
                cart={cart}
                handleRemove={handleRemove}
                handleIncreaseQty={handleIncreaseQty}
                handleDecreaseQty={handleDecreaseQty}
            />
            <Box p={4}>
                <Grid
                    container
                    justify="flex-end"
                    className={classes.cartTotalCont}
                >
                    <Grid item xs={6}>
                        {cart.length > 0 ? (
                            <CartTotal
                                total={totalPrice}
                                loginText="To purchase with PayPal, please log in first."
                                isCancel={paymentCancelled}
                                isError={paymentFailed}
                            >
                                {isUserLoggedIn() ? (
                                    <PayPal
                                        handleSuccess={handleSuccess}
                                        handleError={handleError}
                                        handleCancel={handleCancel}
                                        handleCreateOrder={handleCreateOrder}
                                        totalPrice={totalPrice}
                                    />
                                ) : (
                                        <Link
                                            to={{
                                                pathname: "/login",
                                                state: {
                                                    prevUrl: window.location.href,
                                                },
                                            }}
                                            className="link"
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                            >
                                                Log In
                                        </Button>
                                        </Link>
                                    )}
                            </CartTotal>
                        ) : (
                                ""
                            )}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Cart;
