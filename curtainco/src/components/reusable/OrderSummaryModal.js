import React from "react"
// STYLES
import {
    Grid,
    IconButton,
    Typography,
    Box,
    Container,
    useTheme,
    useMediaQuery,
} from "@material-ui/core"
import useStyles from "./ModalStyles"
// ICONS
import CloseIcon from "@material-ui/icons/Close"
// COMPONENTS
import PurchasedItems from "../account/user/PurchasedItems"

function OrderSummaryModal({ data, handleClose }) {
    let order = { ...data }
    const classes = useStyles()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))

    const items = order.items.map((orderItem) => (
        <PurchasedItems
            key={`productId-${orderItem.id}`}
            orderItem={orderItem}
        />
    ))

    return (
        <Grid
            item
            container
            direction="column"
            className={classes.closeButtonCont}
        >
            <Grid
                item
                container
                justifyContent="space-between"
                className={classes.closeButtonCont}
            >
                <Grid item container justifyContent="center" xs={10} sm={9}>
                    <Typography
                        variant="h3"
                        component="h3"
                        className={classes.orderSummaryModalTitle}
                    >
                        Order #: {order.paymentData.id}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <IconButton
                        onClick={handleClose}
                        className={classes.closeButton}
                        style={{ right: "-3%" }}
                    >
                        <CloseIcon color="error" />
                    </IconButton>
                </Grid>
            </Grid>

            <Grid item container direction="column">
                {items}
            </Grid>
        </Grid>
    )
}

export default OrderSummaryModal
