import React from "react"
// STYLES
import { Typography, Grid } from "@material-ui/core"
import useStyles from "./UserDashboardStyles"
// ICONS
import EmailIcon from "@material-ui/icons/Email"
import HomeIcon from "@material-ui/icons/Home"
import PhoneIcon from "@material-ui/icons/Phone"
import BusinessIcon from "@material-ui/icons/Business"
// SERVICES AND HELPERS
import { displayPhoneNumber } from "../../../helpers/appHelpers"

function ShowUserInformation({ user, isMobile }) {
    const classes = useStyles()
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
        >
            <Grid
                item
                container
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item xs={2} sm={1}>
                    <EmailIcon color="primary" />
                </Grid>
                <Grid item xs={10} sm={11}>
                    <Typography
                        className={classes.profileInfoDetails}
                        style={{ fontSize: isMobile ? 14 : 20 }}
                    >
                        {user.email}
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                item
                container
                justifyContent="space-around"
                alignItems="center"
                spacing={1}
            >
                <Grid item xs={2} sm={1}>
                    <HomeIcon color="primary" />
                </Grid>
                <Grid item xs={10} sm={11}>
                    <Typography
                        className={classes.profileInfoDetails}
                        style={{ fontSize: isMobile ? 14 : 20 }}
                    >
                        {`${user.address1}, ${user.suburb}, ${user.state}, ${user.postcode}`}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container justifyContent="center" alignItems="center">
                <Grid item xs={2} sm={1}>
                    <PhoneIcon color="primary" />
                </Grid>
                <Grid item xs={10} sm={11}>
                    <Typography
                        className={classes.profileInfoDetails}
                        style={{ fontSize: isMobile ? 14 : 20 }}
                    >
                        {displayPhoneNumber(user.phone)}
                    </Typography>
                </Grid>
            </Grid>
            {user.companyName && (
                <Grid
                    item
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={2} sm={1}>
                        <BusinessIcon color="primary" />
                    </Grid>
                    <Grid item xs={10} sm={11}>
                        <Typography
                            className={classes.profileInfoDetails}
                            style={{ fontSize: isMobile ? 14 : 20 }}
                        >
                            {user.companyName}
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </Grid>
    )
}

export default ShowUserInformation
