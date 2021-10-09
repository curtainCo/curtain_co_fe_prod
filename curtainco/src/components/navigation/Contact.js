import React from "react"
// STYLES
import { Grid, Typography, useMediaQuery, useTheme } from "@material-ui/core"
import useStyles from "./NavigationStyles"
// ICONS
import InstagramIcon from "@material-ui/icons/Instagram"
import FacebookIcon from "@material-ui/icons/Facebook"
import SocialLinkButton from "../reusable/SocialLinkButton"
// COMPONENTS

function Contact() {
    const classes = useStyles()
    const theme = useTheme()
    // const isMobile = useMediaQuery(theme.breakpoints.only("xs"))
    const isMobileOrTabletPortrait = useMediaQuery(theme.breakpoints.down("sm"))

    return (
        <Grid item container direction="column">
            <Grid
                item
                container
                justifyContent={
                    isMobileOrTabletPortrait ? "center" : "flex-start"
                }
                spacing={2}
            >
                <Grid item>
                    <a
                        href="https://www.facebook.com/marie.gjorg/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FacebookIcon color="primary" fontSize="large" />
                    </a>
                </Grid>
                <Grid item>
                    <a
                        href="https://www.instagram.com/marie_g_builder/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <InstagramIcon color="primary" fontSize="large" />
                    </a>
                </Grid>
            </Grid>

            <Grid
                item
                container
                justifyContent={
                    isMobileOrTabletPortrait ? "center" : "flex-start"
                }
            >
                <Typography variant="body2" className={classes.footerText}>
                    0401 762 272
                </Typography>
            </Grid>

            <Grid
                item
                container
                justifyContent={
                    isMobileOrTabletPortrait ? "center" : "flex-start"
                }
            >
                <Typography variant="body2" className={classes.footerEmailLink}>
                    <a href="mailto:marie@marieg.com.au?" className="link">
                        marie@marieg.com.au
                    </a>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Contact
