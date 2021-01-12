import React, { useState } from "react"

import { Grid } from "@material-ui/core"
import HeroBanner from "./HeroBanner"
import WhyCurtains from "./WhyCurtains"

function Home() {
    const [imgBorderRadius, setImgBorderRadius] = useState()

    function getBorderRadius(radius) {
        setImgBorderRadius(radius)
    }
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid
                item
                xs={12}
                sm={6}
                style={{
                    backgroundColor: "whitesmoke",
                    borderBottomRightRadius: `${imgBorderRadius}px`,
                    borderTopLeftRadius: `${imgBorderRadius}px`,
                    height: "100%",
                    width: "100%",
                    zIndex: 50,
                    borderBottom: "20px solid whitesmoke",
                    borderRight: "10px solid whitesmoke",
                    borderLeft: "10px solid whitesmoke",
                }}
            >
                <HeroBanner getBorderRadius={getBorderRadius} />
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                style={{
                    backgroundColor: "lightblue",
                    position: "relative",
                    height: "100%",
                    width: "100%",
                    zIndex: 49,
                    marginTop: "-20%",
                    borderBottomRightRadius: `${imgBorderRadius}px`,
                    borderRight: "10px solid whitesmoke",
                    borderLeft: "10px solid whitesmoke",
                    paddingTop: "25%",
                    paddingBottom: "7%",
                    paddingLeft: "5%",
                    paddingRight: "5%",
                }}
            >
                <WhyCurtains />
            </Grid>
        </Grid>
    )
}

export default Home
