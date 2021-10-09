import React, { useState, useEffect } from "react"
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Grid,
} from "@material-ui/core"
import useStyles from "../CollectionStyles"

function CollectionIncludes({
    fabrics,
    tracks,
    accessories,
    price,
    discount,
    isMobile,
}) {
    const classes = useStyles()
    const [lengths, setLengths] = useState({
        fabricLength: 0,
        trackLength: 0,
        accessoryLength: 0,
    })

    useEffect(() => {
        let f = fabrics.filter((fab) => fab !== false).length
        let t = tracks.filter((tra) => tra !== false).length
        let a = accessories.filter((acc) => acc !== false).length
        setLengths({ fabricLength: f, trackLength: t, accessoryLength: a })
    }, [fabrics, tracks, accessories])

    return (
        <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            xs={12}
            className={classes.collectionIncludesCont}
        >
            <Grid item>
                <Typography
                    variant="h5"
                    component="h5"
                    className={classes.collectionIncludesHeader}
                >
                    Your Collection Includes
                </Typography>
            </Grid>
            <Grid
                item
                container
                spacing={3}
                className={classes.collectionIncludesCategoryCont}
                xs={12}
                sm={10}
            >
                <Grid
                    item
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    xs={6}
                    md={8}
                >
                    <Typography className={classes.collectionIncludesCategory}>
                        Fabrics:
                    </Typography>
                    <Typography className={classes.collectionIncludesCategory}>
                        Tracks:
                    </Typography>
                    <Typography className={classes.collectionIncludesCategory}>
                        Accessories:
                    </Typography>
                    <Typography className={classes.collectionIncludesCategory}>
                        Total Products:
                    </Typography>
                    <Typography className={classes.collectionIncludesCategory}>
                        Discount Applied:
                    </Typography>
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    xs={6}
                    md={4}
                >
                    <Typography className={classes.collectionIncludesNumber}>
                        {`x${lengths.fabricLength}`}
                    </Typography>
                    <Typography className={classes.collectionIncludesNumber}>
                        {`x${lengths.trackLength}`}
                    </Typography>
                    <Typography className={classes.collectionIncludesNumber}>
                        {`x${lengths.accessoryLength}`}
                    </Typography>
                    <Typography className={classes.collectionIncludesNumber}>
                        {lengths.accessoryLength +
                            lengths.trackLength +
                            lengths.fabricLength}
                    </Typography>
                    <Typography className={classes.collectionIncludesNumber}>
                        {`${discount * 100}%`}
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                item
                container
                spacing={3}
                className={classes.collectionIncludesTotalHeader}
                xs={12}
                sm={10}
            >
                <Grid
                    item
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    xs={6}
                    md={8}
                >
                    <Typography className={classes.collectionIncludesTotal}>
                        Total:
                    </Typography>
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    alignItems="center"
                    xs={6}
                    md={4}
                >
                    <Typography
                        className={classes.collectionIncludesTotalNumber}
                    >
                        {`$${price.toFixed(2)}`}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CollectionIncludes
