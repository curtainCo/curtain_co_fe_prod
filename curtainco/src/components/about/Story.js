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

function Story() {
    const classes = useStyles()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))

    return (
        <Grid
            item
            container
            justifyContent="center"
            spacing={2}
            xs={12}
            sm={11}
        >
            <Grid item sm={6}>
                <Grid
                    container
                    justifyContent={isMobile ? "flex-start" : "center"}
                >
                    <Typography
                        variant="h3"
                        component="h3"
                        className={classes.aboutMeMsgHeader}
                    >
                        Our Story
                    </Typography>

                    <Typography variant="body1" className={classes.aboutMeMsg}>
                        We are a family run company, creating, designing and
                        sewing locally here in Brisbane for over 30 years. Our
                        passion for curtains has seen many different trends and
                        styles over the years, with our experience, knowledge,
                        skill and attitude we enjoy creating beautiful bespoke
                        custom creations. We work with clients on both
                        Commercial and Domestic premises, we also create both
                        indoor and outdoor curtains. We work as a close team to
                        ensure we have developed the best design for your space
                        and your needs. We continue to work with you on the
                        progress of your curtain manufacture from design to
                        install. Our focus is on quality product and quality
                        service. We love what we do, we deliver on quality and
                        style.
                    </Typography>
                </Grid>
            </Grid>

            <Grid item container justifyContent="center" sm={6}>
                <img
                    src="https://images.unsplash.com/photo-1519710889408-a67e1c7e0452?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                    alt="Reflecting story"
                    className={classes.aboutMeImg}
                />
            </Grid>
        </Grid>
    )
}

export default Story
