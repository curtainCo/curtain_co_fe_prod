import React from "react"
// STYLES
import { Grid, Button } from "@material-ui/core"
// PACKAGES
import { Link } from "react-router-dom"

function RequestConsultationButton({ size }) {
    return (
        <Link to="/request" style={{ textDecoration: "none" }}>
            <Grid item container justifyContent="center">
                <Button variant="contained" color="primary" size={size}>
                    Request A Consultation
                </Button>
            </Grid>
        </Link>
    )
}

export default RequestConsultationButton
