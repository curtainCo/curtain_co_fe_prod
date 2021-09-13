import React, { useEffect, useRef } from "react"
// STYLES
import {
    Typography,
    Grid,
    Button,
    useTheme,
    useMediaQuery,
} from "@material-ui/core"
import useStyles from "./UserDashboardStyles"
// HELPERS AND SERVICES
import { displayShortDate } from "../../../helpers/appHelpers"
import { useCurtainContext } from "../../../config/CurtainCoContext"
// import { buildContentString } from "../../../helpers/collectionHelpers"
// STATE
import { ACTIONS } from "../../../config/stateReducer"

function PurchaseOrder({ order }) {
    const classes = useStyles()
    const { dispatch } = useCurtainContext()
    // USING THIS FOR THE IMAGE IN THE ORDER LIST
    const firstItemInOrder = useRef({ current: { imgUrl: "", name: "" } })
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))

    function handleItemClick(event) {
        event.preventDefault()
        dispatch({
            type: ACTIONS.SET_MODAL,
            payload: {
                open: true,
                data: order,
                orderSummary: true,
            },
        })
    }

    useEffect(() => {
        firstItemInOrder.current = order.items[0].item
    }, [order])

    //  THIS IS THE CONTAINER FOR EACH INDIVIDUAL ORDER MADE BY A USER
    return (
        <Grid container direction="column">
            <Grid item className={classes.userAccountPurchaseOrderNumberCont}>
                <Typography className={classes.userAccountPurchaseOrderNumber}>
                    Order #: {order.paymentData.id}
                </Typography>
            </Grid>

            <Grid item container justify="center">
                <Grid
                    item
                    container
                    direction={isMobile ? "row" : "column"}
                    justify="center"
                    alignItems="center"
                    xs={12}
                    sm={4}
                >
                    <Grid item container justify="center" xs={6} sm={12}>
                        <img
                            src={
                                firstItemInOrder.current.imgUrl === undefined
                                    ? "/no-image.png"
                                    : firstItemInOrder.current.imgUrl
                            }
                            onError={e => e.target.src = "./no-image.png"}
                            alt={
                                firstItemInOrder.current.name === undefined
                                    ? "product has no image"
                                    : firstItemInOrder.current.name
                            }
                            className={classes.orderImg}
                        />
                    </Grid>

                    {isMobile && (
                        <Grid
                            item
                            container
                            xs={6}
                            justify="center"
                            alignItems="center"
                        >
                            <Button color="primary" onClick={handleItemClick}>
                                See More
                            </Button>
                        </Grid>
                    )}
                </Grid>

                <Grid
                    item
                    container
                    direction="column"
                    justify={isMobile ? "center" : "flex-start"}
                    alignItems="center"
                    xs={12}
                    sm={4}
                >
                    <Grid
                        item
                        container
                        justify={isMobile ? "center" : "flex-start"}
                    >
                        <Typography
                            variant="h6"
                            component="h6"
                            className={
                                classes.userAccountPurchaseOrderDetailsHeader
                            }
                        >
                            Details
                        </Typography>
                    </Grid>

                    <Grid item container>
                        <Grid
                            item
                            container
                            direction="column"
                            alignItems={isMobile ? "center" : "flex-start"}
                            xs={6}
                        >
                            <Typography
                                className={
                                    classes.purchaseOrderDetailsListHeading
                                }
                            >
                                Date:
                            </Typography>
                            <Typography
                                className={
                                    classes.purchaseOrderDetailsListHeading
                                }
                            >
                                Cost:
                            </Typography>
                            <Typography
                                className={
                                    classes.purchaseOrderDetailsListHeading
                                }
                            >
                                Status?
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            container
                            direction="column"
                            alignItems={isMobile ? "center" : "flex-start"}
                            xs={6}
                        >
                            <Typography
                                className={classes.purchaseOrderDetailsData}
                            >
                                {displayShortDate(order.createdAt)}
                            </Typography>
                            <Typography
                                className={classes.purchaseOrderDetailsData}
                            >
                                ${order.totalPrice}
                            </Typography>
                            <Typography
                                className={classes.purchaseOrderDetailsData}
                            >
                                {order.isProcessed ? "Sent" : "Not yet sent"}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {/* ONLY SHOW THIS BUTTON HERE ON DESKTOP */}

                {!isMobile && (
                    <Grid
                        item
                        container
                        xs={2}
                        justify="flex-end"
                        alignItems="center"
                    >
                        <Button color="primary" onClick={handleItemClick}>
                            See More
                        </Button>
                    </Grid>
                )}
            </Grid>
        </Grid>
    )
}

export default PurchaseOrder
