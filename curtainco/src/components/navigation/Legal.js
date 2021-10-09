import React from "react"
// STYLES
import { Grid, Typography, useMediaQuery, useTheme } from "@material-ui/core"
import useStyles from "./NavigationStyles"
// COMPONENTS
import Copyright from "../authentication/Copyright"
import Privacy from "../reusable/Privacy"

function Legal() {
    const classes = useStyles()
    const theme = useTheme()
    // const isMobile = useMediaQuery(theme.breakpoints.only("xs"))
    const isMobileOrTabletPortrait = useMediaQuery(theme.breakpoints.down("sm"))

    return (
        <Grid
            item
            container
            direction="column"
            alignItems={isMobileOrTabletPortrait ? "center" : "flex-end"}
            justifyContent="center"
            spacing={1}
        >
            <Grid item>
                <Privacy />
            </Grid>
            <Grid item>
                <Copyright />
            </Grid>
            <Grid item>
                <Typography
                    variant="body2"
                    className={classes.siteByText}
                    align="center"
                >
                    Site by{" "}
                    <a
                        href="https://www.simonmcurran.com"
                        target="_blank"
                        rel="noreferrer"
                        className={classes.footerSiteByLinks}
                    >
                        Simon Curran
                    </a>{" "}
                    &{" "}
                    <a
                        href="https://philantiporda.netlify.app/"
                        target="_blank"
                        rel="noreferrer"
                        className={classes.footerSiteByLinks}
                    >
                        Phil Antiporda
                    </a>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Legal
