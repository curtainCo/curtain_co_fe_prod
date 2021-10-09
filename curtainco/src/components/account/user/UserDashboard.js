import React from "react"
// STYLES
import { Container, Grid, useMediaQuery, useTheme } from "@material-ui/core"
import useStyles from "./UserDashboardStyles"
// COMPONENTS
import ProfileInformation from "./ProfileInformation"
import PurchaseHistory from "./PurchaseHistory"
import CTARequestConsultation from "./CTARequestConsultation"

function UserDashboard({ isLoading }) {
    const classes = useStyles()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))
    const isMobileOrTabletPortrait = useMediaQuery(theme.breakpoints.down("sm"))

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            className={classes.userDashboardCont}
            spacing={isMobile ? 4 : 6}
        >
            <Grid
                item
                container
                direction="row"
                justifyContent="space-around"
                spacing={isMobileOrTabletPortrait ? 4 : 0}
            >
                <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    sm={10}
                    lg={6}
                    spacing={3}
                >
                    <ProfileInformation isMobile={isMobile} />
                    <CTARequestConsultation
                        isMobile={isMobile}
                        className={classes.ctaRequestConsultCont}
                    />
                </Grid>
                <Grid
                    item
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                    xs={12}
                    md={10}
                    lg={6}
                    className={classes.userDashboardPurchaseHistoryCont}
                >
                    <PurchaseHistory
                        isLoading={isLoading}
                        isMobile={isMobile}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default UserDashboard
