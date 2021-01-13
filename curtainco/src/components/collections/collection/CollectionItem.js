import React from "react"
// STYLES
import {
    Button,
    Grid,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core"
import useStyles from "../CollectionStyles"
// HELPERS AND SERVICES
import { Link } from "react-router-dom"
import { capitalize, setSuccessSnackBar } from "../../../helpers/appHelpers"
// import { addItemToCart } from "../../../services/cartServices"
import { useCurtainContext } from "../../../config/CurtainCoContext"
// import { ACTIONS } from "../../../config/stateReducer"
// COMPONENTS
// import AddToCartButton from "../../reusable/AddToCartButton"

function CollectionItem({ data }) {
    const classes = useStyles()
    // const { dispatch } = useCurtainContext()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))

    // function handleCartClick(event) {
    //     event.preventDefault()
    //     if (
    //         !window.confirm(
    //             "Do you want to add the full collection to your cart without customising first?"
    //         )
    //     ) {
    //         return
    //     }
    //     addItemToCart(data, dispatch)
    //     setSuccessSnackBar(dispatch, "Added full collection to cart")
    // }
    return (
        <Paper className={classes.paper}>
            <Grid item container spacing={2}>
                <Grid item xs={4}>
                    <img
                        src={data.imgUrl === "" ? "/no-image.png" : data.imgUrl}
                        alt={data.name}
                        className={classes.collectionItemImg}
                    />
                </Grid>
                <Grid item container direction="column" xs={8} spacing={2}>
                    <Grid item>
                        <Typography variant="h4" component="h4">
                            {capitalize(data.name)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            className={classes.collectionItemDescription}
                        >
                            {capitalize(data.description)}
                        </Typography>
                    </Grid>
                    {/* <Grid item>
                        <AddToCartButton
                            icon={true}
                            text={"Cart"}
                            handleClick={handleCartClick}
                        />
                    </Grid> */}
                    <Grid item container justify="flex-end" alignItems="center">
                        <Button
                            size={isMobile ? "small" : "medium"}
                            variant="contained"
                            color="primary"
                        >
                            <Link
                                className={classes.link}
                                to={`/collections/customise/${data._id}`}
                            >
                                Customise
                            </Link>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CollectionItem
