import React from "react"
// STYLES
import {
    Grid,
    Typography,
    Container,
    useMediaQuery,
    useTheme,
} from "@material-ui/core"
import useStyles from "./AboutStyles"

function Success() {
    const classes = useStyles()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))

    return (
        <Grid
            container
            direction={isMobile ? "column-reverse" : "row"}
            item
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            xs={12}
            sm={11}
        >
            <Grid item container justifyContent="center" sm={6}>
                <img
                    src="https://images.unsplash.com/photo-1508024043938-d0cfe70cf65d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=981&q=80"
                    alt="Reflecting success"
                    className={classes.aboutMeImg}
                />
            </Grid>
            <Grid item sm={6}>
                <Grid
                    item
                    container
                    justifyContent={isMobile ? "flex-start" : "center"}
                    // alignItems="center"
                >
                    <Typography
                        variant="h3"
                        component="h3"
                        className={classes.aboutMeMsgHeader}
                    >
                        Our Vision
                    </Typography>
                    <Typography variant="body1" className={classes.aboutMeMsg}>
                        Here at The Curtain Co. we believe custom curtains are
                        the only option by making them fit into, and complement,
                        your space. There are many customisations to be made,
                        height, fabric, exposure, rod, length and header. This
                        is where we come in, at The Curtain Co, we live and
                        breathe curtains, we know what options work in what
                        spaces and will happily guide you through the entire
                        journey. We have taken the hard work out the decision
                        making process and created a range of collections for
                        you containing samples so that you can see what they
                        look like before proceeding to commit to an entire
                        package. Once you have received your collection box,
                        book a consultation with one of our interior designers
                        to measure up and quote your curtains.
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Success
