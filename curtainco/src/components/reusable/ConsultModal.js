import { Grid, IconButton, Typography, Box, Container } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import useStyles from "./ModalStyles"
import React from "react"
import {
    getFirstNameFromFullName,
    getLastNameFromFullName,
} from "../../helpers/userHelpers"
import { displayShortDate } from "../../helpers/appHelpers"

function ConsultModal({ data, handleClose }) {
    const classes = useStyles()

    const name = `${getFirstNameFromFullName(
        data.fullName
    )} ${getLastNameFromFullName(data.fullName)}`
    return (
        <Grid container direction="column">
            <Grid
                item
                container
                justifyContent="space-between"
                className={classes.closeButtonCont}
            >
                <Grid item>
                    <Typography variant="h3">{`${
                        data.title || ""
                    } ${name}`}</Typography>
                </Grid>
                <Grid item>
                    <IconButton
                        onClick={handleClose}
                        className={classes.closeButton}
                    >
                        <CloseIcon color="error" />
                    </IconButton>
                </Grid>
            </Grid>

            <Typography>{`Email: ${data.email}`}</Typography>
            <Typography>{`Phone: ${data.phone}`}</Typography>
            <Typography>
                {`Address: ${data.address1}, ${data.suburb} ${data.state} ${data.postcode}`}
            </Typography>
            <Typography>
                {`Contacted? ${data.isProcessed ? "Yes" : "No"}`}
            </Typography>
            <Typography>
                {`Requested on: ${displayShortDate(data.createdAt)}`}
            </Typography>
            <Typography>Message:</Typography>
            <Typography variant="body1">{data.message}</Typography>
        </Grid>
    )
}

export default ConsultModal
