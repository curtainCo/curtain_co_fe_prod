import React, { useState, useEffect } from "react"
// STYLES
import {
    Button,
    Grid,
    Divider,
    Container,
    useTheme,
    useMediaQuery,
} from "@material-ui/core"
import useStyles from "./NavigationStyles"
// STATE
// import { useCurtainContext } from "../../config/CurtainCoContext"
// HELPERS AND SERVICES
import { Link, useLocation } from "react-router-dom"
// COMPONENTS
import {
    Mobile,
    Desktop,
    MobileAndTablet,
    Default,
    MobileAndTabletPortrait,
    DesktopAndTabletLandscape,
} from "../reusable/Responsive"
import Contact from "./Contact"
import Legal from "./Legal"
import CurtainCoDivider from "../reusable/CurtainCoDivider"
import RequestConsultationButton from "./RequestConsultationButton"

export default function StickyFooter() {
    const classes = useStyles()
    const [hideButton, setHideButton] = useState(false)
    const location = useLocation()
    const theme = useTheme()
    const isMobilePortrait = useMediaQuery(
        "(max-width: 600px) and (orientation: portrait)"
    )
    const isTablet = useMediaQuery(theme.breakpoints.down("sm"))

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
            <DesktopAndTabletLandscape>
                <div className={classes.footerRoot}>
                    <footer className={classes.footer}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item container style={{ width: "108%" }}>
                                <CurtainCoDivider />
                            </Grid>
                            <Grid
                                item
                                container
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center"
                            >
                                <Grid item xs={4}>
                                    <Contact />
                                </Grid>

                                <Grid
                                    item
                                    // sm={8}
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                    xs={4}
                                >
                                    {/* HIDING THE REQUEST CONSULTATION BUTTON TO THIS ROUTE SO THAT PEOPLE
                        DON'T THINK TO PRESS THIS BUTTON TO SUBMIT IT AND RELOAD THE PAGE
                        ACCIDENTALLY */}
                                    {!hideButton && (
                                        <RequestConsultationButton size="large" />
                                    )}
                                </Grid>
                                <Grid item container xs={4}>
                                    <Legal />
                                </Grid>
                            </Grid>
                        </Grid>
                    </footer>
                </div>
            </DesktopAndTabletLandscape>

            {/* MOBILE STYLES  */}

            <MobileAndTabletPortrait>
                <footer
                    className={classes.footerMobile}
                    style={{ paddingBottom: isMobilePortrait ? "20%" : "5%" }}
                >
                    <CurtainCoDivider />

                    <Grid
                        container
                        direction="column"
                        spacing={2}
                        className={classes.footerDetailsCont}
                    >
                        <Grid
                            item
                            container
                            justifyContent="space-between"
                            xs={12}
                        >
                            <Grid item container xs={6}>
                                <Link to="/">
                                    <img
                                        src="/logo192.png"
                                        alt="curtain co logo"
                                        style={{
                                            width: isMobilePortrait
                                                ? "60px"
                                                : "150px",
                                            position: "absolute",
                                            left: "10px",
                                        }}
                                    />
                                </Link>
                            </Grid>
                            <Grid
                                item
                                container
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                xs={12}
                            >
                                <Contact />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            {/* HIDING THE REQUEST CONSULTATION BUTTON TO THIS ROUTE SO THAT PEOPLE
                        DON'T THINK TO PRESS THIS BUTTON TO SUBMIT IT AND RELOAD THE PAGE
                        ACCIDENTALLY */}
                            {!hideButton && (
                                <RequestConsultationButton size={"large"} />
                            )}
                        </Grid>
                        <Grid item container justifyContent="space-around">
                            <Legal />
                        </Grid>
                    </Grid>
                </footer>
            </MobileAndTabletPortrait>
        </>
    )
}
