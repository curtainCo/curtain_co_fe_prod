import React, { useEffect, useRef } from "react"
import { Grid } from "@material-ui/core"
import ProductItem from "./ProductItem"
import {
    checkIfAnyFieldsEmptyOnProductObject,
    filterByType,
    searchProducts,
    sortProducts,
} from "../../../helpers/productHelpers"

function ProductList({
    products,
    filterText,
    filterTypes,
    filterSortBy,
    sortFields,
    inStockOnly,
}) {
    let filteredProducts = products

    // FILTER BY SEARCH TEXT
    filteredProducts = searchProducts(filteredProducts, filterText)

    // FILTER BY TYPE
    filteredProducts = filterByType(filteredProducts, filterTypes)

    // filter by inStockOnly
    // filteredProducts = filteredProducts.filter(element => filterTypes.includes(element.type))

    // SORT THE PRODUCTS
    filteredProducts = sortProducts(filteredProducts, filterSortBy)

    const listOfProducts = useRef([])

    function buildProductList(products) {
        let array = []
        for (let i = 0; i < products.length; i++) {
            const product = products[i]
            let emptyFields = checkIfAnyFieldsEmptyOnProductObject(product)
            // IF ALL FIELDS ARE NOT EMPTY, BUT PRICE IS NULL
            // MAKE SURE TO SKIP THAT SO PEOPLE CAN'T ADD IT TO THE CART
            if (emptyFields || product.price === null) continue

            array.push(
                <Grid
                    item
                    key={`product-${i}`}
                    xs={12}
                    sm={6}
                    md={4}
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ width: "100%" }}
                >
                    <ProductItem productData={product} />
                </Grid>
            )
        }
        return array
    }

    listOfProducts.current = buildProductList(filteredProducts)

    return listOfProducts.current
}

export default ProductList
