import React from "react"
import { Link } from "react-router-dom"
import { Button, Grid, Typography } from "@material-ui/core"

function WhyCurtains() {
    return (
        <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
        >
            <Grid item>
                <Typography
                    variant="h2"
                    component="h2"
                    style={{ textAlign: "center" }}
                >
                    Why Curtains?
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" style={{ fontStyle: "italic" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequatur maiores veritatis tempora nostrum, laudantium
                    repellat voluptatem, error hic ipsum in debitis doloribus
                    nulla autem odit voluptas soluta asperiores deleniti
                    perspiciatis!
                </Typography>
            </Grid>
            <Grid item>
                <Link to={`/collections`} className="link">
                    <Button variant="contained" color="secondary">
                        Collections
                    </Button>
                </Link>
            </Grid>
        </Grid>
    )
}

export default WhyCurtains
