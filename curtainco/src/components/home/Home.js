import React, { useState } from "react"
// STYLES
import { Grid, useTheme, useMediaQuery, Container } from "@material-ui/core"
import useStyles from "./HomeStyles"
// COMPONENTS
import HeroBanner from "./HeroBanner"
import WhyCurtains from "./WhyCurtains"
import {
    // Desktop,
    DesktopAndTabletLandscape,
    // Mobile,
    MobileAndTabletPortrait,
} from "../reusable/Responsive"

function Home() {
    const classes = useStyles()
    const [imgBorderRadius, setImgBorderRadius] = useState()
    const [imgHeight, setImgHeight] = useState(0)
    const [imgWidth, setImgWidth] = useState(0)
    const theme = useTheme()
    const isLargeDesktop = useMediaQuery(theme.breakpoints.up("xl"))

    function getBorderRadius(radius) {
        setImgBorderRadius(radius)
    }
    function getImgHeight(height) {
        let calc = height / 3
        let width = isLargeDesktop ? calc * 7 : calc * 5.5
        setImgHeight(height)
        setImgWidth(width)
    }

    return (
        <>
            {/* DESKTOP */}

            <DesktopAndTabletLandscape>
                <Container>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        className={classes.homeCont}
                    >
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid
                                item
                                xs={6}
                                container
                                justifyContent="center"
                                alignItems="center"
                                style={{
                                    backgroundColor: `${theme.palette.background.default}`,
                                    borderBottomRightRadius: `${imgBorderRadius}px`,
                                    borderTopLeftRadius: `${imgBorderRadius}px`,
                                    height: "100%",
                                    maxWidth: `${imgWidth}px`,
                                    zIndex: 50,
                                    borderRight: `30px solid ${theme.palette.background.default}`,
                                    borderBottom: `10px solid ${theme.palette.background.default}`,
                                    borderTop: `10px solid ${theme.palette.background.default}`,
                                }}
                            >
                                <HeroBanner
                                    getBorderRadius={getBorderRadius}
                                    getImgHeight={getImgHeight}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                container
                                justifyContent="center"
                                alignItems="center"
                                style={{
                                    backgroundColor: `${theme.palette.primary.veryLight}`,
                                    position: "relative",
                                    height: `${imgHeight}px`,
                                    maxWidth: `${imgWidth * 1.3}px`,
                                    zIndex: 49,
                                    borderBottomRightRadius: `${imgBorderRadius}px`,
                                    paddingLeft: "12%",
                                    marginLeft: "-10%",
                                    paddingRight: "2%",
                                }}
                            >
                                <WhyCurtains />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </DesktopAndTabletLandscape>

            {/* MOBILE */}

            <MobileAndTabletPortrait>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={6}
                        style={{
                            backgroundColor: `${theme.palette.background.default}`,
                            borderBottomRightRadius: `${imgBorderRadius}px`,
                            borderTopLeftRadius: `${imgBorderRadius}px`,
                            height: "100%",
                            width: "100%",
                            zIndex: 50,
                            borderBottom: `20px solid ${theme.palette.background.default}`,
                            borderRight: `10px solid ${theme.palette.background.default}`,
                            borderLeft: `10px solid ${theme.palette.background.default}`,
                        }}
                    >
                        <HeroBanner
                            getBorderRadius={getBorderRadius}
                            getImgHeight={getImgHeight}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        justifyContent="center"
                        alignItems="center"
                        xs={12}
                        sm={8}
                        md={6}
                        style={{
                            backgroundColor: "lightblue",
                            position: "relative",
                            height: "100%",
                            width: "100%",
                            zIndex: 49,
                            marginTop: "-20%",
                            borderBottomRightRadius: `${imgBorderRadius}px`,
                            borderRight: `10px solid ${theme.palette.background.default}`,
                            borderLeft: `10px solid ${theme.palette.background.default}`,
                            paddingTop: "25%",
                            paddingBottom: "7%",
                            paddingLeft: "5%",
                            paddingRight: "5%",
                        }}
                    >
                        <WhyCurtains />
                    </Grid>
                </Grid>
            </MobileAndTabletPortrait>
        </>
    )
}

export default Home
