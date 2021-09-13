import React from "react"
// STYLES
import {
    Typography,
    Grid,
    Divider,
    Box,
    useTheme,
    useMediaQuery,
} from "@material-ui/core"
import useStyles from "../../reusable/ModalStyles"
// HELPERS AND SERVICES
import { capitalize } from "../../../helpers/appHelpers"
// import { buildContentString } from "../../../helpers/collectionHelpers"

function PurchasedCollection({ qty, collection }) {
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
                {/* ONLY SHOW THE COLLECTION NAME HERE IF IT IS MOBILE */}
                {isMobile && (
                    <Grid item xs={12}>
                        <Typography
                            className={classes.orderSummaryModalPurchaseName}
                            style={{
                                fontSize: isIphone5 ? 24 : 28,
                                textAlign: "center",
                            }}
                        >
                            {capitalize(collection.name)}
                        </Typography>
                    </Grid>
                )}

                <Grid
                    item
                    container
                    justify={isMobile ? "flex-start" : "center"}
                    xs={6}
                    sm={2}
                >
                    <Grid item>
                        <img
                            src={
                                collection.imgUrl !== undefined
                                    ? collection.imgUrl
                                    : "/no-image.png"
                            }
                            onError={e => e.target.src = "./no-image.png"}
                            alt={collection.name}
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
                    {/* ONLY THIS THE COLLECTION NAME HERE IF IT ISN'T MOBILE */}
                    {!isMobile && (
                        <Grid item>
                            <Typography
                                className={
                                    classes.orderSummaryModalPurchaseName
                                }
                                style={{ fontSize: isMobile ? 22 : 28 }}
                            >
                                {capitalize(collection.name)}
                            </Typography>
                        </Grid>
                    )}

                    <Grid item>
                        <Typography>QTY: x {qty}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            ${qty * collection.price.toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item container direction="column" xs={12} sm={4}>
                    <Grid item>
                        <Typography
                            className={classes.orderSummaryModalContentTitle}
                        >
                            Contents
                        </Typography>
                    </Grid>
                    <Grid item container>
                        <Grid item container direction="column" xs={6}>
                            <Typography
                                className={
                                    classes.orderSummaryModalContentHeadings
                                }
                            >
                                Tracks:
                            </Typography>
                            <Typography
                                className={
                                    classes.orderSummaryModalContentHeadings
                                }
                            >
                                Fabrics:
                            </Typography>
                            <Typography
                                className={
                                    classes.orderSummaryModalContentHeadings
                                }
                            >
                                Accessories:
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
                                x{collection.track.length}
                            </Typography>
                            <Typography
                                className={classes.orderSummaryModalContentData}
                            >
                                x{collection.fabric.length}
                            </Typography>
                            <Typography
                                className={classes.orderSummaryModalContentData}
                            >
                                x{collection.accessory.length}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider className={classes.orderSummaryDivider} />
        </Box>
    )
}

export default PurchasedCollection
