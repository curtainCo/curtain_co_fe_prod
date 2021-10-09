import React, { useState, useEffect } from "react"
// STYLES
import { Grid, Typography, useTheme, useMediaQuery } from "@material-ui/core"
import useStyles from "../home/HomeStyles"

function CurtainCoImg({
    imageSrc,
    // imgAlt,
    border = false,
    text,
    getBorderRadius,
    getImgHeight,
}) {
    const classes = useStyles()
    const [imgHeight, setImgHeight] = useState(100)
    const [borderRadius, setBorderRadius] = useState(80)
    const theme = useTheme()
    // const isDesktop = useMediaQuery(theme.breakpoints.up("lg"))
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))

    useEffect(() => {
        let { innerHeight } = window
        let divideBy = 2.2
        if (isMobile) divideBy = innerHeight > 750 ? 3.5 : 3
        setImgHeight(innerHeight / divideBy)
        setBorderRadius(innerHeight / 10)
    }, [isMobile])

    useEffect(() => {
        if (typeof getBorderRadius === "function") {
            getBorderRadius(borderRadius)
        }
    }, [getBorderRadius, borderRadius])

    useEffect(() => {
        if (typeof getImgHeight === "function") {
            getImgHeight(imgHeight)
        }
    }, [getImgHeight, imgHeight])

    // AGAIN I AM SORRY FOR THE PERSON WHO HAS TO DECIPHER THE INLINE STYLES
    return (
        <div
            style={{ position: "relative" }}
            className={classes.curtainCoImgCont}
        >
            <div
                style={{
                    width: "100%",
                    position: "absolute",
                    height: `${imgHeight}px`,
                    zIndex: 25,
                    display: "flex",
                    alignItems: "center",
                    justifyContentContent: "center",
                }}
            >
                <Grid
                    item
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{
                        width: "87%",
                        height: "85%",
                        border: border ? "2px solid white" : "none",
                        borderRadius: `${borderRadius}px 0 ${borderRadius}px 0`,
                    }}
                >
                    <Typography
                        variant="h2"
                        className={classes.curtainCoImgText}
                    >
                        {text}
                    </Typography>
                </Grid>
            </div>

            <Grid
                style={{
                    width: "100%",
                    height: `${imgHeight}px`,
                    zIndex: 15,
                    borderRadius: `${borderRadius}px 0 ${borderRadius}px 0`,
                }}
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${imageSrc})`,
                        backgroundSize: "cover",
                        borderRadius: `${borderRadius}px 0 ${borderRadius}px 0`,
                    }}
                    item
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid
                        item
                        container
                        justifyContent="center"
                        alignItems="center"
                        style={{
                            position: "absolute",
                            background: "black",
                            opacity: 0.5,
                            width: "100%",
                            height: `${imgHeight}px`,
                            borderRadius: `${borderRadius}px 0 ${borderRadius}px 0`,
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default CurtainCoImg
