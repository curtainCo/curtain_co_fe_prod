import React, { useState, useEffect } from "react"
// STYLES
import { CssBaseline, Button, Grid, Divider } from "@material-ui/core"
import useStyles from "./NavigationStyles"
// HELPERS AND SERVICES
import { Link, useLocation } from "react-router-dom"
// COMPONENTS
import Contact from "./Contact"
import Legal from "./Legal"

export default function StickyFooter() {
    const classes = useStyles()
    const [hideButton, setHideButton] = useState(false)
    const location = useLocation()

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
                                <Link to="/request" className={classes.link}>
                                    Request Consultation
                                </Link>
                            </Button>
                        )}
                    </Grid>

                    <Legal />
                </Grid>
            </footer>
        </div>
    )
}
