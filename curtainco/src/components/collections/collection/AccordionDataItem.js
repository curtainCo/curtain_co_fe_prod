import React, { useState, useEffect } from "react"
// STYLES
import { Grid, Typography, useMediaQuery } from "@material-ui/core"
import useStyles from "../CollectionStyles"
// HELPERS AND SERVICES
import { capitalize } from "../../../helpers/appHelpers"

function AccordionDataItem({ data, handleCustomization }) {
    const classes = useStyles()
    const [productSelection, setProductSelection] = useState([])
    const isIphone5 = useMediaQuery("(max-width:320px)")

    // const [category, setCategory] = useState("")

    function handleSelected(event) {
        let productId = event.currentTarget.id.split(",")[0]
        let index = event.currentTarget.id.split(",")[1]
        let category = event.currentTarget.id.split(",")[2].toLowerCase()

        let tempSelection = [...productSelection]
        tempSelection[index] = productSelection[index] ? false : productId
        setProductSelection(tempSelection)
        handleCustomization(tempSelection, category)
    }

    useEffect(() => {
        let tempSelection = [false, false, false, false]
        let category = ""
        for (let i = 0; i < data.length; i++) {
            tempSelection[i] = data[i]._id
            category = data[i].category
        }
        setProductSelection(tempSelection)
    }, [data])

    // THIS LINE:
    // sm={data.length === 4 ? 3 : 4}
    // DEALS WITH THE GRID FOR 3 OR LESS PRODUCTS

    // I AM SORRY FUTURE PERSON, THIS CODE BELOW IS CONFUSING
    const dataItem = data.map((product, index) => (
        <Grid
            item
            container
            direction="column"
            justify="space-around"
            xs={6}
            lg={data.length === 4 ? 3 : 4} // this is to even out spacing for 1 or 3 items
            key={`${product._id},${index}`}
        >
            <Grid
                item
                container
                justify="center"
                onClick={handleSelected}
                id={`${product._id},${index},${product.category}`}
            >
                <img
                    src={
                        product.imgUrl !== undefined
                            ? product.imgUrl
                            : "/no-image.png"
                    }
                    onError={e => e.target.src = "./no-image.png"}
                    alt={`${product.name} product`}
                    className={
                        productSelection[index]
                            ? classes.accordionDataItemSelected
                            : classes.accordionDataItem
                    }
                    style={{
                        width: isIphone5 && "70px",
                        height: isIphone5 && "70px",
                    }}
                />
            </Grid>
            <Grid item container justify="center">
                <Typography
                    variant="subtitle1"
                    component="p"
                    className={classes.collectionCustomiseProductName}
                >
                    {capitalize(product.name)}
                </Typography>
            </Grid>
        </Grid>
    ))

    return dataItem
}

export default AccordionDataItem
