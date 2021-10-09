import React, { useState, useEffect } from "react"
import { Grid } from "@material-ui/core"
import CollectionItem from "../collection/CollectionItem"
import useStyles from "../CollectionStyles"
import { filterOutEmptyCollections } from "../../../helpers/collectionHelpers"

function CollectionList({ collections }) {
    const classes = useStyles()
    const [filteredCollections, setFilteredCollections] = useState([])

    // FILTER OUT ANY COLLECTIONS THAT DON'T HAVE ANY PRODUCTS IN THEM
    // SO USERS CAN'T BUY THEM

    useEffect(() => {
        let filtered = filterOutEmptyCollections(collections)
        setFilteredCollections(filtered)
    }, [collections])

    const collectionList = filteredCollections.map((item, index) => (
        <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            key={`collection-${index}`}
            xs={12}
            sm={10}
            className={classes.collectionList}
        >
            <CollectionItem data={item} />
        </Grid>
    ))

    return collectionList
}

export default CollectionList
