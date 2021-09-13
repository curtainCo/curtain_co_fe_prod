import React from "react"
// STYLES
import {
    Grid,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Button,
    // Box,
} from "@material-ui/core"
import useStyles from "../ProductStyles"
// ICONS
// import AddIcon from "@material-ui/icons/Add"
// import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
// STATE
import { useCurtainContext } from "../../../config/CurtainCoContext"
import { ACTIONS } from "../../../config/stateReducer"
// HELPERS AND SERVICES
import { capitalize, setSuccessSnackBar } from "../../../helpers/appHelpers"
import { addItemToCart } from "../../../services/cartServices"
// COMPONENTS
import AddToCartButton from "../../reusable/AddToCartButton"

function ProductItem({ productData }) {
    const classes = useStyles()
    const { dispatch } = useCurtainContext()

    function handleViewClick(event) {
        event.preventDefault()

        dispatch({
            type: ACTIONS.SET_MODAL,
            payload: {
                open: true,
                title: `${capitalize(productData.name)}`,
                message: `${capitalize(productData.description)}`,
                productSummary: true,
                data: productData,
            },
        })
    }

    function handleCartClick(event) {
        event.preventDefault()
        addItemToCart(productData, dispatch)
        // SHOW SNACKBAR
        setSuccessSnackBar(dispatch, "Success: Item was added to the cart")
    }

    console.log(productData)
    return (
        <div className={classes.productItemCont}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    component="img"
                    image={
                        productData.imgUrl && productData.imgUrl !== ""
                            ? productData.imgUrl
                            : "./no-image.png"
                    }
                    title={`${capitalize(productData.name)} Image`}
                    onError={e => e.target.src = "./no-image.png"}
                />

                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2" noWrap>
                        {capitalize(productData.name)}
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item container justify="space-between">
                            <Typography
                                variant="body2"
                                className={classes.cardContentText}
                            >{`Type: ${productData.category}`}</Typography>
                            <Typography
                                variant="body2"
                                className={classes.cardContentText}
                            >{`$${productData.price}`}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>

                <CardActions>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="space-between"
                    >
                        <Grid item xs container justify="center">
                            <AddToCartButton
                                icon={true}
                                text="Cart"
                                size="small"
                                handleClick={handleCartClick}
                            />
                        </Grid>
                        <Grid item xs container justify="center">
                            <Button
                                size="small"
                                color="primary"
                                onClick={handleViewClick}
                            >
                                <Typography
                                    className={classes.productSeeMoreButton}
                                >
                                    See More
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </div>
    )
}

export default ProductItem
