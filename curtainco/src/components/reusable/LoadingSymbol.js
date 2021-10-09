import React from "react"
import { Box, Grid } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"

function LoadingSymbol() {
    return (
        <Box m={6}>
            <Grid
                item
                xs
                container
                justifyContent="center"
                alignItems="center"
                style={{ height: "100%" }}
            >
                <CircularProgress />
            </Grid>
        </Box>
    )
}

export default LoadingSymbol
