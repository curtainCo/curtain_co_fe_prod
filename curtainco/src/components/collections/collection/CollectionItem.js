import React from "react"
// STYLES
import {
    Button,
    Grid,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core"
import useStyles from "../CollectionStyles"
// HELPERS AND SERVICES
import { Link } from "react-router-dom"
import { capitalize } from "../../../helpers/appHelpers"

// COMPONENTS

function CollectionItem({ data }) {
    const classes = useStyles()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))

    return (
        <Paper className={classes.paper}>
            <Grid item container spacing={2}>
                <Grid item container justify="center" xs={12} sm={4}>
                    <img
                        src={data.imgUrl === "" ? "/no-image.png" : data.imgUrl}
                        onError={e => e.target.src = "./no-image.png"}
                        alt={data.name}
                        className={
                            isMobile
                                ? classes.collectionItemImgMobile
                                : classes.collectionItemImg
                        }
                    />
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    sm={8}
                    spacing={2}
                >
                    <Grid item container justify="center">
                        <Typography
                            variant="h4"
                            component="h4"
                            className={classes.collectionItemHeader}
                        >
                            {capitalize(data.name)}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography
                            className={classes.collectionItemDescription}
                        >
                            {capitalize(data.description)}
                        </Typography>
                    </Grid>

                    <Grid item container justify="flex-end" alignItems="center">
                        <Link
                            className={classes.collectionLink}
                            to={`/collections/customise/${data._id}`}
                        >
                            <Button
                                size={isMobile ? "small" : "medium"}
                                variant="contained"
                                color="secondary"
                                className={classes.customiseCollectionButton}
                            >
                                Customise
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CollectionItem
