import React, { useState, useEffect } from "react"
// COMPONENTS
import PayPal from "./Paypal"
import CartList from "./CartList"
import CartTotal from "./CartTotal"
import LoadingSymbol from "../reusable/LoadingSymbol"
// PACKAGES
import { Link } from "react-router-dom/cjs/react-router-dom.min"
// STYLES
import {
    Grid,
    Button,
    useTheme,
    useMediaQuery,
    Typography,
} from "@material-ui/core"
import useStyles from "./CartStyles"
// HELPERS AND SERVICES
import {
    getCartItemsFromLocalStorage,
    changeQtyOfItemInLocalStorage,
    updateLocalStorageWithNewArray,
    removeFromCart,
    generateTotalPriceOfCart,
} from "../../services/cartServices"
import {
    createOrder,
    updateOrder,
    deleteOrder,
} from "../../services/orderServices"
import { setSuccessSnackBar } from "../../helpers/appHelpers"
// STATE
import { useCurtainContext } from "../../config/CurtainCoContext"
// import { ACTIONS } from "../../config/stateReducer"
import {
    setErrorSnackBar,
    setWarningSnackBar,
    setErrorAlert,
    setWarningAlert,
} from "../../helpers/appHelpers"

function Cart({ history }) {
    const classes = useStyles()
    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [payPalLoading, setPayPalLoading] = useState(false)
    // const [userNotUsingBrave, setUserNotUsingBrave] = useState(false)
    const { state, dispatch } = useCurtainContext()
    let orderId = null
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [paymentFailedOrCancelled, setPaymentFailedOrCancelled] =
        useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))

    // GET THE ITEMS FROM LOCAL STORAGE
    function updateCartInStateFromLocalStorage() {
        const cartItems = getCartItemsFromLocalStorage()
        setCart(cartItems)
    }

    // GET THE ITEMS FROM LOCAL STORAGE ON FIRST LOAD
    useEffect(() => {
        updateCartInStateFromLocalStorage()
        setPaymentFailedOrCancelled(false)
    }, [])

    // WHEN CART IN LOCAL STATE IS LOADED, CALCULATE THE TOTAL PRICE
    useEffect(() => {
        let tempTotal = generateTotalPriceOfCart(cart)
        // FORCE TOTAL TO 2 DECIMAL PLACES
        tempTotal = Math.round((tempTotal + Number.EPSILON) * 100) / 100
        setTotalPrice(tempTotal)
    }, [cart])

    function handleIncreaseQty(event) {
        event.preventDefault()
        let productId = event.currentTarget.value
        let cartArrayWithUpdatedQty = changeQtyOfItemInLocalStorage(
            cart,
            productId,
            "increase",
            dispatch
        )
        updateLocalStorageWithNewArray(cartArrayWithUpdatedQty)
        updateCartInStateFromLocalStorage()
    }

    function handleDecreaseQty(event) {
        event.preventDefault()
        let productId = event.currentTarget.value
        let errorOrArray = changeQtyOfItemInLocalStorage(
            cart,
            productId,
            "decrease",
            dispatch
        )
        if (!errorOrArray) {
            setErrorSnackBar(dispatch, "Error: Please remove the item instead")
            return
        }
        updateLocalStorageWithNewArray(errorOrArray)
        updateCartInStateFromLocalStorage()
    }

    function handleRemove(event) {
        event.preventDefault()
        removeFromCart(event.currentTarget.value, dispatch)
        updateCartInStateFromLocalStorage()
        setSuccessSnackBar(dispatch, "Item was removed from cart")
    }

    async function handleSuccess(data) {
        // data contains the response from paypal which is to be stored in server
        console.log("----SUCCESSFUL PAYPAL PURCHASE----")
        // console.log(data)
        setPayPalLoading(true)
        const payload = {
            paymentData: data,
        }

        // updates the db document with Paypal data
        try {
            let response = await updateOrder(orderId, payload)
            // console.log(response)
            window.localStorage.clear()
            history.push("/account")
            setPaymentSuccess(true)
            updateCartInStateFromLocalStorage()
            setSuccessSnackBar(dispatch, "Payment was successful")
        } catch (error) {
            console.log(
                "Error occurred when updating the order after successful paypal payment."
            )
            console.log(error.response)
            setErrorSnackBar(
                dispatch,
                "Error: OrderId and payment data was not updated but payment was taken."
            )
        }
        setPayPalLoading(false)
    }

    async function handleCreateOrder() {
        const payload = {
            totalPrice: totalPrice,
            items: cart,
            // placeholder
            paymentData: {},
        }
        try {
            let response = await createOrder(payload)
            orderId = response.data._id
            // console.log(response)
            return response
        } catch (error) {
            console.log(
                "Error occurred when creating the order after successful paypal payment."
            )
            console.log(error.response)
            setErrorSnackBar(
                dispatch,
                "Error: Order was not processed and no payment was taken"
            )
        }
    }

    async function handleError(data) {
        console.log("----ERROR PAYPAL PURCHASE----")
        // data contains the response from paypal which is to be stored in server
        // console.log(data)
        // delete created order upon clicking PayPal Checkout
        try {
            await deleteOrder(orderId)
            // console.log("Order Object DELETED")
            const errMsg = "Something went wrong. Payment was not taken"
            setPaymentFailedOrCancelled(true)
            setErrorSnackBar(dispatch, errMsg)
            setErrorAlert(dispatch, errMsg)
        } catch (error) {
            console.log(
                "There was a problem removing the created order when paypal errored on checkout."
            )
            console.log(error.response)
        }
    }

    async function handleCancel(data) {
        console.log("----CANCEL PAYPAL PURCHASE----")
        // console.log(data)
        // data contains the response from paypal which is to be stored in server
        try {
            await deleteOrder(orderId)
            // console.log("Order Object DELETED")
            const warningMsg = "Transaction Cancelled. No payment was taken."
            setWarningSnackBar(dispatch, warningMsg)
            setPaymentFailedOrCancelled(true)
            setWarningAlert(dispatch, warningMsg)
        } catch (error) {
            console.log(
                "There was a problem removing the created order after cancelling checkout."
            )
            console.log(error.response)
        }
    }

    function isUserLoggedIn() {
        return state.currentUser !== null
    }

    function userIsNotAdmin() {
        if (isUserLoggedIn()) {
            return state.currentUser.role !== "admin"
        }
    }

    // useEffect(() => {
    //     async function userIsUsingBraveBrowser() {
    //         try {
    //             let resp = await navigator.brave.isBrave()
    //             // console.log(resp)
    //             if ((navigator.brave && resp) || false) {
    //                 return true
    //             }
    //             return false
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     if (userIsUsingBraveBrowser()) {
    //         console.log(
    //             "PAYPAL ERRORS ARE FROM BRAVE SHIELDS (ADS), CURRENTLY EVERYTHING STILL WORKS THOUGH, BUT THIS CAN BREAK SOMETIMES AND NOT SURE WHY YET OR HOW TO HANDLE THIS ISSUE. PLEASE CONTACT MARIE TO GET INTO CONTACT WITH DEVELOPERS IF AN ERROR PERSISTS WHEN BUYING SOMETHING WITH BRAVE BROWSER"
    //         )
    //         // setUserNotUsingBrave(false)
    //     }
    // }, [])

    return (
        <>
            {payPalLoading ? (
                <>
                    <LoadingSymbol />
                    <Typography className={classes.payPalLoadingUserMessage}>
                        Your order is being processed. Please do not refresh the
                        page
                    </Typography>
                </>
            ) : (
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    style={{ paddingTop: "3%" }}
                >
                    <Grid
                        item
                        xs={12}
                        md={10}
                        lg={8}
                        className={classes.cartListCont}
                    >
                        <CartList
                            cart={cart}
                            handleRemove={handleRemove}
                            handleIncreaseQty={handleIncreaseQty}
                            handleDecreaseQty={handleDecreaseQty}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        justifyContent="center"
                        alignItems="center"
                        className={classes.cartTotalCont}
                        xs={12}
                        md={10}
                        lg={4}
                    >
                        {cart.length > 0 && (
                            <CartTotal
                                total={totalPrice}
                                loginText="To purchase with PayPal, please log in first."
                                isCancelOrError={paymentFailedOrCancelled}
                                setPaymentFailedOrCancelled={
                                    setPaymentFailedOrCancelled
                                }
                                isMobile={isMobile}
                            >
                                {/* BLOCK ADMINS FROM SEEING PAYPAL BUTTON*/}
                                {/* BLOCK ADMINS FROM SEEING THE LOG IN BUTTON AS WELL */}
                                {isUserLoggedIn() && userIsNotAdmin() ? (
                                    <PayPal
                                        handleSuccess={handleSuccess}
                                        handleError={handleError}
                                        handleCancel={handleCancel}
                                        handleCreateOrder={handleCreateOrder}
                                        totalPrice={totalPrice}
                                    />
                                ) : (
                                    !isUserLoggedIn() && (
                                        <Link
                                            to={{
                                                pathname: "/login",
                                                state: {
                                                    prevUrl:
                                                        window.location.href,
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
                                    )
                                )}
                            </CartTotal>
                        )}
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default Cart
