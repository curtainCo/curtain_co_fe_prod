import React from "react"
// STYLES
import {
    Grid,
    Divider,
    Box,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core"
import useStyles from "../../reusable/ModalStyles"
// HELPERS AND SERVICES
import { capitalize } from "../../../helpers/appHelpers"

function PurchasedProduct({ qty, product }) {
    const classes = useStyles()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))
    const isIphone5 = useMediaQuery("(max-width:320px)")

    return (
        <Box m={1}>
            <Grid
                item
                container
                justify="center"
                alignItems="center"
                spacing={isMobile ? 1 : 2}
            >
                {/* ONLY SHOW THE PRODUCT NAME HERE IF IT IS MOBILE */}
                {isMobile && (
                    <Grid item xs={12}>
                        <Typography
                            className={classes.orderSummaryModalPurchaseName}
                            style={{
                                fontSize: 28,
                                textAlign: "center",
                            }}
                        >
                            {capitalize(product.name)}
                        </Typography>
                    </Grid>
                )}

                <Grid item container justify="flex-start" xs={6} sm={2}>
                    <Grid item>
                        <img
                            src={
                                product.imgUrl !== undefined
                                    ? product.imgUrl
                                    : "/no-image.png"
                            }
                            onError={e => e.target.src = "./no-image.png"}
                            alt={product.name}
                            className={classes.orderSummaryModalImage}
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    alignItems={isMobile ? "center" : "flex-start"}
                    xs={6}
                    sm={6}
                >
                    {/* ONLY THIS THE PRODUCT NAME HERE IF IT ISN'T MOBILE */}
                    {!isMobile && (
                        <Grid item>
                            <Typography
                                variant="h6"
                                className={
                                    classes.orderSummaryModalPurchaseName
                                }
                            >
                                {capitalize(product.name)}
                            </Typography>
                        </Grid>
                    )}

                    <Grid item>
                        <Typography>QTY: x {qty}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            ${qty * product.price.toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                    xs={12}
                    sm={4}
                >
                    <Grid item>
                        <Typography
                            className={classes.orderSummaryModalContentTitle}
                        >
                            Details
                        </Typography>
                    </Grid>
                    <Grid item container>
                        <Grid item container direction="column" xs={6}>
                            <Typography
                                className={
                                    classes.orderSummaryModalContentHeadings
                                }
                            >
                                Category:
                            </Typography>
                            <Typography
                                className={
                                    classes.orderSummaryModalContentHeadings
                                }
                            >
                                Colour:
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            container
                            direction="column"
                            alignItems="center"
                            xs={6}
                        >
                            <Typography
                                className={classes.orderSummaryModalContentData}
                            >
                                {product.category}
                            </Typography>
                            <Typography
                                className={classes.orderSummaryModalContentData}
                            >
                                {capitalize(product.colour)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider className={classes.orderSummaryDivider} />
        </Box>
    )
}

export default PurchasedProduct
