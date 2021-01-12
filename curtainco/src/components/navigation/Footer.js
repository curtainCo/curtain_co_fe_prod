import React, { useState, useEffect } from "react"
// STYLES
import {
    CssBaseline,
    Button,
    Grid,
    Divider,
    Typography,
    Container,
    // useMediaQuery,
} from "@material-ui/core"
import useStyles from "./NavigationStyles"

// HELPERS AND SERVICES
import { Link, useLocation } from "react-router-dom"
// COMPONENTS
import Contact from "./Contact"
import Legal from "./Legal"
import { Mobile, Default } from "../reusable/Responsive"

export default function StickyFooter() {
    const classes = useStyles()
    const [hideButton, setHideButton] = useState(false)
    const location = useLocation()
    // const isPortrait = useMediaQuery("(orientation: portrait)")
    // console.log({ isPortrait })

    useEffect(() => {
        // THIS HIDES THE BUTTON ON THE REQUEST CONSULTATION PAGE
        // SO PEOPLE DON'T CONFUSE THE BUTTONS TO SUBMIT THE FORM
        if (location !== undefined && location.pathname === "/request") {
            setHideButton(true)
        } else {
            setHideButton(false)
        }
    }, [location])

    return (
        <>
            <Default>
                <div className={classes.footerRoot}>
                    <CssBaseline />

                    <footer className={classes.footer}>
                        <Divider />
                        <Grid container>
                            <Contact />

                            <Grid
                                item
                                sm={8}
                                container
                                justify="center"
                                alignItems="center"
                            >
                                {/* HIDING THE REQUEST CONSULTATION BUTTON TO THIS ROUTE SO THAT PEOPLE
                        DON'T THINK TO PRESS THIS BUTTON TO SUBMIT IT AND RELOAD THE PAGE
                        ACCIDENTALLY */}
                                {!hideButton && (
                                    <Button variant="contained" color="primary">
                                        <Link
                                            to="/request"
                                            className={classes.link}
                                        >
                                            Request Consultation
                                        </Link>
                                    </Button>
                                )}
                            </Grid>

                            <Legal />
                        </Grid>
                    </footer>
                </div>
            </Default>
            <Mobile>
                <footer className={classes.footerMobile}>
                    <Container>
                        <Divider />

                        <Grid
                            container
                            direction="column"
                            spacing={2}
                            className={classes.footerDetailsCont}
                        >
                            <Grid item container justify="space-around" xs={12}>
                                <Grid item container xs={6}>
                                    <img
                                        src="/CurtainCoLogo192.png"
                                        alt="curtain co logo"
                                        style={{ width: "70px" }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="column"
                                    alignItems="flex-end"
                                    xs={6}
                                >
                                    <Grid item>social links</Grid>
                                    <Grid item>phone</Grid>
                                    <Grid item>email</Grid>
                                </Grid>
                            </Grid>
                            <Grid item container justify="center">
                                <Link to="/request" className={classes.link}>
                                    <Button variant="outlined">
                                        Request Consultation
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item container justify="space-around">
                                <Grid item>privacy</Grid>
                                <Grid item>copy right and year</Grid>
                            </Grid>
                            <Grid item container justify="center">
                                {" "}
                                site by simon and phil
                            </Grid>
                        </Grid>
                    </Container>
                </footer>
            </Mobile>
        </>
    )
}
