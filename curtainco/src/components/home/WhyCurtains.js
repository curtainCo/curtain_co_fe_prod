import React from "react"
// STYLES
import { Grid, Button, Typography } from "@material-ui/core"
import useStyles from "./HomeStyles"
// PACKAGES
import { Link } from "react-router-dom"

function WhyCurtains() {
    const classes = useStyles()
    return (
        <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            className={classes.WhyCurtainsCont}
        >
            <Grid item container justifyContent="center">
                <Typography
                    variant="h3"
                    component="h3"
                    className={classes.whyCurtainsHeading}
                >
                    Why Curtains?
                </Typography>
            </Grid>

            <Grid item>
                <Typography variant="body1" className={classes.whyCurtainsText}>
                    The easiest and most impactful way to soften, add style,
                    warmth and comfort to a room is with the simple solution of
                    well designed curtains. However, prior to adding curtains to
                    a room, there are many decisions to be made. To make this
                    easier, we have curated some collections for you, which are
                    available as sample boxes to allow you to see the products
                    in your home.
                </Typography>
            </Grid>

            <Grid item style={{ paddingBottom: "5%" }}>
                <Link to={`/collections`} className="link">
                    <Button variant="contained" color="secondary" size="large">
                        Collections
                    </Button>
                </Link>
            </Grid>
        </Grid>
    )
}

export default WhyCurtains
