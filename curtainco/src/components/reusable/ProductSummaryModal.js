import React, { useState } from "react"
// STYLES
import {
    Grid,
    Typography,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import useStyles from "./ModalStyles"
// ICONS
import CloseIcon from "@material-ui/icons/Close"
// COMPONENTS
import AddToCartButton from "./AddToCartButton"
import TrackModalSummary from "./TrackModalSummary"
import FabricModalSummary from "./FabricModalSummary"
import AccessoryModalSummary from "./AccessoryModalSummary"
// HELPERS AND SERVICES
import { capitalize } from "../../helpers/appHelpers"

function ProductSummaryModal({ data, title, handleCartClick, handleClose }) {
    const classes = useStyles()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))
    const [success, setSuccess] = useState(false)

    function autoCloseAlert() {
        setSuccess(false)
    }

    function handleAddToCart(event) {
        setSuccess(true)
        handleCartClick(event)
        setTimeout(autoCloseAlert, 3000)
        clearTimeout()
    }

    return (
        <Grid container spacing={isMobile ? 1 : 3}>
            <Grid
                item
                container
                xs={12}
                sm={5}
                justify="center"
                alignItems="center"
            >
                <div role="img">
                    <img
                        src={
                            data.imgUrl === undefined
                                ? "/no-image.png"
                                : data.imgUrl
                        }
                        onError={e => e.target.src = "./no-image.png"}
                        alt={data.name}
                        className={
                            isMobile
                                ? classes.modalImageMobile
                                : classes.modalImage
                        }
                    />
                </div>
            </Grid>
            <Grid
                item
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                xs={12}
                sm={7}
            >
                <Grid
                    item
                    container
                    justify="space-between"
                    className={classes.closeButtonCont}
                >
                    <Grid item container justify="center" xs={10} sm={9}>
                        <Typography
                            variant="h3"
                            component="h3"
                            className={classes.modalTitle}
                            style={{ fontSize: isMobile ? 30 : 45 }}
                        >
                            {capitalize(title)}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton
                            onClick={handleClose}
                            className={classes.closeButton}
                        >
                            <CloseIcon color="error" />
                        </IconButton>
                    </Grid>
                </Grid>
                {/* <Grid item>
                    <Typography>{message}</Typography>
                </Grid> */}

                <Grid item style={{ paddingBottom: "2%" }}>
                    <Typography className={classes.modalData}>
                        {data.description !== undefined &&
                            capitalize(data.description)}
                    </Typography>
                </Grid>

                <Grid item container>
                    <Grid item container direction="column" xs={6}>
                        <Typography>Price:</Typography>
                    </Grid>
                    <Grid item container direction="column" xs={6}>
                        <Grid item>
                            <Typography className={classes.modalData}>
                                ${data.price}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item container>
                    {data.category === "Fabric" ? (
                        <FabricModalSummary product={data} />
                    ) : data.category === "Track" ? (
                        <TrackModalSummary product={data} />
                    ) : (
                        <AccessoryModalSummary product={data} />
                    )}
                </Grid>
                <Grid
                    item
                    container
                    justify="space-around"
                    alignItems="center"
                    style={{ marginTop: "3%" }}
                >
                    <div>
                        {success && (
                            <Alert
                                onClose={() => {
                                    setSuccess(false)
                                }}
                            >
                                Item added to cart
                            </Alert>
                        )}
                    </div>
                    <AddToCartButton
                        icon={false}
                        text={"Add To Cart"}
                        handleClick={handleAddToCart}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProductSummaryModal
