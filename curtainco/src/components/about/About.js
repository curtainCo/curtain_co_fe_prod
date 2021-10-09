import React from "react"
// STYLES
import { Container, Grid, Typography } from "@material-ui/core"
import useStyles from "./AboutStyles"
// COMPONENTS
import Story from "./Story"
import Success from "./Success"
import CheckOutRange from "./CheckOutRange"
import {
    // Desktop,
    DesktopAndTabletLandscape,
    // Mobile,
    MobileAndTabletPortrait,
} from "../reusable/Responsive"
// import Testimonial from "./Testimonial"

function About() {
    const classes = useStyles()
    return (
        <>
            <DesktopAndTabletLandscape>
                <Container>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={5}
                        className={classes.aboutMeCont}
                    >
                        <Success />
                        <Story />
                        <CheckOutRange />
                        {/* <Testimonial /> */}
                    </Grid>
                </Container>
            </DesktopAndTabletLandscape>

            <MobileAndTabletPortrait>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    className={classes.aboutMeCont}
                >
                    <Success />
                    <Story />
                    {/* <Testimonial /> */}
                    <CheckOutRange />
                </Grid>
            </MobileAndTabletPortrait>
        </>
    )
}

export default About
