import React from "react"
// STYLES
import { Typography, Grid } from "@material-ui/core"
import useStyles from "./UserDashboardStyles"
// PACKAGES
// import { Link } from "react-router-dom/cjs/react-router-dom.min"
// STATE
import { useCurtainContext } from "../../../config/CurtainCoContext"

function CTARequestConsultation({ isMobile }) {
    const classes = useStyles()
    const { state } = useCurtainContext()
    return (
        <Grid item container spacing={2}>
            <Grid item container justifyContent="center">
                <Typography
                    variant="h4"
                    className={classes.userDashboardSubheading}
                    style={{ fontSize: isMobile ? 34 : 46 }}
                >
                    Ready To Get Started?
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    variant="body1"
                    className={classes.userDashBoardCTAText}
                >
                    {state.currentUser.orders.length > 0
                        ? "Thank you for purchasing our products. Next step, request a consultation for one of our experienced designer installers to help size up and order your curtain packages. You can find the link to request a consultation at the bottom of the page."
                        : "Head over and view our customised collections of samples by an interior designer, or pick out some individual samples to be able to make your own collection."}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default CTARequestConsultation
