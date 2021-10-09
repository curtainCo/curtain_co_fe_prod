import React, { useState, useEffect } from "react"
// HELPERS AND SERVICES
import { useCurtainContext } from "../../../config/CurtainCoContext"
import {
    calculateCustomizedCollectionPrice,
    getOneCollectionFromState,
} from "../../../helpers/collectionHelpers"
import { getOneCollection } from "../../../services/collectionServices"
import {
    capitalize,
    setErrorSnackBar,
    setSuccessSnackBar,
    setWarningSnackBar,
} from "../../../helpers/appHelpers"
import { addItemToCart } from "../../../services/cartServices"
import { ACTIONS } from "../../../config/stateReducer"
// STYLES
import useStyles from "../CollectionStyles"
import {
    Container,
    Divider,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core"
// COMPONENTS
import CustomAccordion from "../../reusable/CustomAccordion"
import CollectionIncludes from "./CollectionIncludes"
import AddToCartButton from "../../reusable/AddToCartButton"

function CollectionCustomise() {
    let collectionId = window.location.pathname.split("/customise/")[1]
    const classes = useStyles()
    const { state, dispatch } = useCurtainContext()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))
    const isMobileOrTabletPortrait = useMediaQuery(theme.breakpoints.down("sm"))
    const [customizedPrice, setCustomizedPrice] = useState(0)
    const [discount, setDiscount] = useState(
        state.discounts.mostProductsMultiplier
    )
    const [collection, setCollection] = useState({
        _id: "",
        name: "",
        description: "",
        imgUrl: "",
        price: 0,
        track: [],
        fabric: [],
        accessory: [],
        trackTip: "",
        accessoryTip: "",
        fabricTip: "",
    })
    const [customizedCollection, setCustomizedCollection] = useState({
        track: [],
        fabric: [],
        accessory: [],
    })

    function handleUserCustomizingCollection(productArray, category) {
        setCustomizedCollection({
            ...customizedCollection,
            [category]: productArray,
        })
    }

    function handleCartClick(event) {
        event.preventDefault()
        let tempTrack = customizedCollection.track.filter(
            (element) => element !== false
        )
        let tempFabric = customizedCollection.fabric.filter(
            (element) => element !== false
        )
        let tempAccessory = customizedCollection.accessory.filter(
            (element) => element !== false
        )

        // STOP THE USER FROM BUYING A COLLECTION IF THEY DO NOT HAVE AT LEAST 1 PRODUCT FROM EACH CATEGORY
        if (
            tempTrack.length === 0 ||
            tempFabric.length === 0 ||
            tempAccessory.length === 0
        ) {
            setWarningSnackBar(
                dispatch,
                "Purchasing a collection requires at least 1 of every category. Nothing added to cart"
            )
            return
        }

        let tempCollection = {
            ...collection,
            track: tempTrack,
            fabric: tempFabric,
            accessory: tempAccessory,
            price: customizedPrice,
        }
        // console.log(tempCollection)
        addItemToCart(tempCollection, dispatch)
        setSuccessSnackBar(dispatch, "Added customised collection to cart")
    }

    // HANDLES THE TOTAL PRICE AND DISCOUNT OF THE CUSTOMISED COLLECTION
    useEffect(() => {
        // console.log("---HERE----")
        let { customPrice, discount } = calculateCustomizedCollectionPrice(
            customizedCollection,
            collection,
            state.discounts
        )

        if (customPrice < 1) {
            setCustomizedPrice(collection.price)
        } else {
            setCustomizedPrice(customPrice)
        }
        setDiscount(discount)
    }, [customizedCollection, collection, state.discounts])

    // GETS THE COLLECTION FROM THE SERVER BASED ON THE ID IN THE URL
    useEffect(() => {
        if (state.collections.length < 1) {
            // console.log("getting the collection from db")
            getOneCollection(collectionId)
                .then((resp) => {
                    setCollection(resp.data)
                })
                .catch((error) => {
                    console.log(error.response)
                    setErrorSnackBar(
                        dispatch,
                        "Error: Something went wrong when fetching collection information"
                    )
                })
        } else {
            console.log("getting the collection from state")
            let resp = getOneCollectionFromState(
                state.collections,
                collectionId
            )
            setCollection(resp)
        }
    }, [state.collections, collectionId, dispatch])

    useEffect(() => {
        setCustomizedCollection({
            track: collection.track,
            fabric: collection.fabric,
            accessory: collection.accessory,
        })
    }, [collection])

    return (
        <Grid container className={classes.collectionCustomiseCont}>
            <Grid
                item
                xs={12}
                container
                justifyContent={
                    isMobileOrTabletPortrait ? "center" : "flex-start"
                }
                className={classes.collectionHeaderCont}
            >
                <Typography
                    variant="h4"
                    component="h4"
                    className={classes.collectionCustomiseHeader}
                >
                    {collection.name
                        ? `Your Customised ${capitalize(collection.name)}`
                        : "Not Found"}
                </Typography>
            </Grid>
            <Grid
                item
                container
                justifyContent="space-around"
                className={classes.customizedCollectionAccordionCont}
                spacing={isMobileOrTabletPortrait ? 5 : 0}
                xs={12}
            >
                <Grid
                    item
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={isMobile ? 5 : 2}
                    xs={12}
                    md={9}
                >
                    <CustomAccordion
                        summary="Step 1: Fabrics"
                        data={collection.fabric}
                        tip={collection.fabricTip}
                        handleCustomization={handleUserCustomizingCollection}
                        open={true}
                        isMobile={isMobile}
                    />
                    <CustomAccordion
                        summary="Step 2: Tracks"
                        data={collection.track}
                        tip={collection.trackTip}
                        handleCustomization={handleUserCustomizingCollection}
                        open={false}
                        isMobile={isMobile}
                    />
                    <CustomAccordion
                        summary="Step 3: Accessories"
                        data={collection.accessory}
                        tip={collection.accessoryTip}
                        handleCustomization={handleUserCustomizingCollection}
                        open={false}
                        isMobile={isMobile}
                    />
                </Grid>
                <Grid
                    item
                    container
                    justifyContent="center"
                    alignItems="flex-start"
                    xs={12}
                    sm={12}
                    lg={3}
                    spacing={2}
                    className={classes.collectionIncludesAddToCartButtonCont}
                >
                    <CollectionIncludes
                        fabrics={customizedCollection.fabric}
                        tracks={customizedCollection.track}
                        accessories={customizedCollection.accessory}
                        discount={discount}
                        price={customizedPrice}
                        isMobile={isMobile}
                    />

                    <AddToCartButton
                        icon={false}
                        text={"Add To Cart"}
                        size="large"
                        handleClick={handleCartClick}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CollectionCustomise
