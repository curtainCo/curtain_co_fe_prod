import React, { useEffect, useState } from "react"
// STYLES
import { Grid, useMediaQuery, useTheme } from "@material-ui/core"
import useStyles from "./ProductStyles"
// COMPONENTS
import ProductList from "./product/ProductList"
import Search from "./sidebar/Search"
import Filter from "./sidebar/Filter"
import Sort from "./sidebar/Sort"
import LoadingSymbol from "../reusable/LoadingSymbol"
// STATE
import { useCurtainContext } from "../../config/CurtainCoContext"
import { ACTIONS } from "../../config/stateReducer"
// HELPERS AND SERVICES
import { sortACTIONS, sortProducts } from "../../helpers/productHelpers"
import { getAllProducts } from "../../services/productServices"

const sortFields = Object.values(sortACTIONS)

function Products() {
    const classes = useStyles()
    const { state, dispatch } = useCurtainContext()
    const [sortBy, setSortBy] = useState(sortACTIONS.NAME_ALPHABETICAL)
    const [searchInput, setSearchInput] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))
    const isTablet = useMediaQuery(theme.breakpoints.up("sm"))

    const [productsErrorMessage, setProductErrorMessage] = useState(null)
    const [filter, setFilter] = useState({
        fabric: false,
        track: false,
        accessory: false,
    })

    // HANDLE THE STATE CHANGE FOR FILTERING
    const handleFilterChange = (event) => {
        setFilter({ ...filter, [event.target.name]: event.target.checked })
    }

    // HANDLE THE STATE CHANGE FOR FILTERING
    const handleSortByChange = (event) => {
        setSortBy(event.target.value)
    }

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value)
    }

    useEffect(() => {
        getAllProducts()
            .then((resp) => {
                if (resp.status === 200) {
                    // console.log("---PRODUCTS---")
                    // console.log(resp.data)
                    let sortedProducts = sortProducts(
                        resp.data,
                        sortACTIONS.NAME_ALPHABETICAL
                    )
                    dispatch({
                        type: ACTIONS.SET_ALL_PRODUCTS,
                        payload: sortedProducts,
                    })
                    setIsLoading(false)
                }
            })
            .catch((error) => {
                console.log(error)
                setProductErrorMessage(error)
                setIsLoading(false)
            })
    }, [dispatch])

    return (
        <Grid
            container
            item
            justifyContent="space-around"
            alignItems="flex-start" // this is for putting the filters at the top of the page in landscape
            xs={12}
            className={classes.productPageCont}
        >
            <Grid
                item
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                xs={12}
                sm={10}
                lg={3}
                spacing={1}
            >
                <Grid item xs={12} sm={6} lg={12} style={{ width: "100%" }}>
                    <Search
                        searchInput={searchInput}
                        handleChange={handleSearchInputChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={12} style={{ width: "100%" }}>
                    <Sort
                        sortFields={sortFields}
                        sortBy={sortBy}
                        handleChange={handleSortByChange}
                    />
                </Grid>
                <Grid item xs={12} style={{ width: "100%" }}>
                    <Filter
                        filterBy={filter}
                        handleChange={handleFilterChange}
                    />
                </Grid>
            </Grid>
            <Grid
                item
                container
                xs={12}
                sm={10}
                md={8}
                justifyContent="center"
                alignItems="center"
                className={isMobile ? classes.cardGridMobile : classes.cardGrid}
            >
                {isLoading ? (
                    <LoadingSymbol />
                ) : productsErrorMessage !== null ? (
                    productsErrorMessage
                ) : (
                    <ProductList
                        products={state.products}
                        filterText={searchInput}
                        filterTypes={filter}
                        filterSortBy={sortBy}
                        sortFields={sortFields}
                        inStockOnly={true}
                    />
                )}
            </Grid>
        </Grid>
    )
}

export default Products
