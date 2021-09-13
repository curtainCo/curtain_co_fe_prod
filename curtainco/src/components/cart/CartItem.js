import React from "react"
// STYLES
import {
    Grid,
    Typography,
    IconButton,
    Paper,
    Container,
    useTheme,
    useMediaQuery,
} from "@material-ui/core"
import useStyles from "./CartStyles"
// ICONS
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
// SERVICES AND HELPERS
import { capitalize } from "../../helpers/appHelpers"

function CartItem({
    itemInCart,
    handleRemove,
    handleIncreaseQty,
    handleDecreaseQty,
}) {
    const classes = useStyles()
    let productItem = itemInCart.item
    let price = productItem.price * itemInCart.qty
    price = price.toFixed(2)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))

    return (
        <Grid item xs container justify="center">
            <Paper className={classes.cartItemCont}>
                <Grid
                    item
                    xs
                    container
                    justify="space-between"
                    alignItems="center"
                    key={`cart-item-${itemInCart.id}`}
                >
                    <Grid
                        item
                        container
                        xs={12}
                        sm={2}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={10} sm={12}>
                            <img
                                src={
                                    productItem.imgUrl !== undefined
                                        ? productItem.imgUrl
                                        : "/no-image.png"
                                }
                                onError={e => e.target.src = "./no-image.png"}
                                alt={productItem.name}
                                className={classes.cartItemImg}
                            />
                        </Grid>

                        {/* IF MOBILE, DISPLAY REMOVE FROM CART BUTTON TOP RIGHT */}

                        {isMobile && (
                            <Grid item xs={2} container justify="flex-end">
                                <IconButton
                                    variant="outlined"
                                    size="small"
                                    color="secondary"
                                    value={itemInCart.id}
                                    onClick={handleRemove}
                                    className={classes.secondaryIconButton}
                                >
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </Grid>
                        )}
                    </Grid>

                    <Grid
                        item
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start"
                        xs={12}
                        sm={10}
                        className={classes.cartItemDetailsCont}
                    >
                        <Grid
                            item
                            container
                            justify="flex-start"
                            alignItems="flex-start"
                            xs={12}
                        >
                            <Typography
                                variant="h5"
                                component="h5"
                                className={classes.cartItemHeader}
                            >
                                {capitalize(productItem.name)}
                            </Typography>
                        </Grid>
                        <Grid item container sm={12}>
                            {productItem.colour ? (
                                <Grid item container sm={4}>
                                    <Grid
                                        item
                                        container
                                        direction="column"
                                        xs={6}
                                    >
                                        <Typography
                                            className={classes.cartItemDetails}
                                        >
                                            Colour:
                                        </Typography>
                                        <Typography
                                            className={classes.cartItemDetails}
                                        >
                                            Category:
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
                                            className={
                                                classes.cartItemDetailsData
                                            }
                                        >
                                            {capitalize(productItem.colour)}
                                        </Typography>
                                        <Typography
                                            className={
                                                classes.cartItemDetailsData
                                            }
                                        >
                                            {productItem.category}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid item container sm={4}>
                                    <Grid item>
                                        <Typography
                                            className={
                                                classes.cartCollectionContainsHeader
                                            }
                                        >
                                            Collection Contains:
                                        </Typography>
                                    </Grid>

                                    <Grid item container>
                                        <Grid
                                            item
                                            container
                                            direction="column"
                                            xs={6}
                                        >
                                            <Typography
                                                className={
                                                    classes.cartItemDetails
                                                }
                                            >
                                                Tracks:
                                            </Typography>
                                            <Typography
                                                className={
                                                    classes.cartItemDetails
                                                }
                                            >
                                                Fabric:
                                            </Typography>
                                            <Typography
                                                className={
                                                    classes.cartItemDetails
                                                }
                                            >
                                                Accessories
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
                                                className={
                                                    classes.cartItemDetails
                                                }
                                            >{`x${productItem.track.length}`}</Typography>
                                            <Typography
                                                className={
                                                    classes.cartItemDetails
                                                }
                                            >{`x${productItem.fabric.length}`}</Typography>
                                            <Typography
                                                className={
                                                    classes.cartItemDetails
                                                }
                                            >{`x${productItem.accessory.length}`}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}

                            <Grid
                                item
                                xs={6}
                                sm={4}
                                container
                                justify="center"
                                alignItems="center"
                                className={
                                    isMobile ? classes.cartItemQtyCont : ""
                                }
                            >
                                <Grid
                                    item
                                    xs={4}
                                    sm={3}
                                    container
                                    justify="center"
                                >
                                    <IconButton
                                        size="small"
                                        className={classes.secondaryIconButton}
                                        onClick={handleDecreaseQty}
                                        value={itemInCart.id}
                                    >
                                        <RemoveIcon color="error" />
                                    </IconButton>
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                    sm={3}
                                    container
                                    justify="center"
                                >
                                    <Typography>x{itemInCart.qty}</Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                    sm={3}
                                    container
                                    justify="center"
                                >
                                    <IconButton
                                        size="small"
                                        className={classes.primaryIconButton}
                                        onClick={handleIncreaseQty}
                                        value={itemInCart.id}
                                    >
                                        <AddIcon color="secondary" />
                                    </IconButton>
                                </Grid>
                            </Grid>

                            <Grid
                                item
                                xs={6}
                                sm={3}
                                container
                                justify="center"
                                alignItems="center"
                                className={
                                    isMobile ? classes.cartItemQtyCont : ""
                                }
                            >
                                <Typography className={classes.cartItemPrice}>
                                    ${price}
                                </Typography>
                            </Grid>

                            {!isMobile && (
                                <Grid
                                    item
                                    xs={1}
                                    sm={1}
                                    container
                                    alignItems="center"
                                    justify="center"
                                >
                                    <IconButton
                                        variant="outlined"
                                        color="secondary"
                                        value={itemInCart.id}
                                        onClick={handleRemove}
                                        className={classes.secondaryIconButton}
                                    >
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default CartItem
