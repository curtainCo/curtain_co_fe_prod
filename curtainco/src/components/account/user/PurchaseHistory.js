import React, { useState, useEffect } from "react"
// COMPONENTS
import PurchaseOrder from "./PurchaseOrder"
import LoadingSymbol from "../../reusable/LoadingSymbol"
// STYLES
import { Container, Typography, Grid, Divider } from "@material-ui/core"
import useStyles from "./UserDashboardStyles"
// HELPERS AND SERVICES
import { useCurtainContext } from "../../../config/CurtainCoContext"

function PurchaseHistory({ isLoading, isMobile }) {
    const classes = useStyles()
    const { state } = useCurtainContext()
    const [purchaseHistory, setPurchaseHistory] = useState([])
    const [purchaseHistoryError, setPurchaseHistoryError] = useState(
        "No purchases have been made"
    )

    useEffect(() => {
        // IF THE USER WASN'T FETCHED CORRECTLY IN ACCOUNT.JS AND ERROR OCCURRED
        // THEN ORDERS WILL BE AN ARRAY OF STRINGS OR EMPTY
        if (typeof state.currentUser.orders[0] === "string") {
            setPurchaseHistoryError(
                "There was an error fetching your purchase history"
            )
        } else if (state.currentUser.orders.length === 0) {
            setPurchaseHistoryError("There are no recent purchases to display")
        } else {
            setPurchaseHistory(state.currentUser.orders)
        }
    }, [state.currentUser])

    const allPurchasedItems = purchaseHistory.map((order) => (
        <Grid item xs key={order._id}>
            <PurchaseOrder order={order} />
            <Divider
                variant={isMobile ? "middle" : "inset"}
                style={{
                    marginTop: isMobile ? "4%" : "1.5%",
                    marginBottom: isMobile ? "7%" : 0,
                }}
            />
        </Grid>
    ))

    return (
        <Grid item container spacing={2}>
            <Grid item container justifyContent="center">
                <Typography
                    variant="h4"
                    className={classes.userDashboardSubheading}
                    style={{ fontSize: isMobile ? 34 : 46 }}
                >
                    Purchase History
                </Typography>
            </Grid>
            <Grid
                item
                container
                direction="column"
                className={classes.purchaseHistoryRoot}
            >
                {isLoading ? (
                    <LoadingSymbol />
                ) : allPurchasedItems.length === 0 ? (
                    <Grid item container justifyContent="center">
                        <Typography className={classes.purchaseHistoryErrorMsg}>
                            {purchaseHistoryError}
                        </Typography>
                    </Grid>
                ) : (
                    allPurchasedItems
                )}
            </Grid>
        </Grid>
    )
}

export default PurchaseHistory
