import React from "react"
// STYLES
import { Grid, Button, Typography } from "@material-ui/core"
// PACKAGES
import { Link } from "react-router-dom"
// STATE
import { useCurtainContext } from "../../config/CurtainCoContext"
// COMPONENTS
import CustomAlert from "../reusable/CustomAlert"

function CartTotal({
    total,
    children,
    loginText,
    isCancelOrError,
    setPaymentFailedOrCancelled,
    isMobile,
}) {
    const { state } = useCurtainContext()

    return (
        <Grid item container direction="column" spacing={2}>
            {/* IF PAYMENT WAS CANCELLED OR THERE WAS AN ERROR
            SHOW THIS DIV */}
            {isCancelOrError && (
                <Grid item>
                    <CustomAlert
                        setPaymentFailedOrCancelled={
                            setPaymentFailedOrCancelled
                        }
                    />
                </Grid>
            )}

            <Grid item container justifyContent="center" alignItems="center">
                <Grid item xs container justifyContent="center">
                    <Typography variant="h4" component="h4">
                        Subtotal
                    </Typography>
                </Grid>
                <Grid item xs container justifyContent="center">
                    <Typography variant="h5" component="h5">
                        ${total.toFixed(2)}
                    </Typography>
                </Grid>
            </Grid>

            {state.currentUser === null && (
                <Grid item xs container justifyContent="center">
                    <Typography>{loginText}</Typography>
                </Grid>
            )}
            <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                spacing={4}
            >
                <Grid item xs={12} sm={6} container justifyContent="center">
                    <Link to="/products" className="link">
                        <Button variant="outlined" color="primary" size="large">
                            Continue Shopping
                        </Button>
                    </Link>
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={6}
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    {children}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CartTotal
