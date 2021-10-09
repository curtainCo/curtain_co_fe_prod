import React from "react"
import { Button, Grid, useMediaQuery, useTheme } from "@material-ui/core"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import CurtainCoImg from "../reusable/CurtainCoImg"

function PageNotFound() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))
    return (
        <Grid container justifyContent="center" style={{ height: "53vh" }}>
            <div
                style={{
                    width: isMobile ? "85vw" : "40vw",
                    marginTop: "3%",
                }}
            >
                <CurtainCoImg
                    imageSrc={
                        "https://images.unsplash.com/photo-1467635624863-33cf388d9a2e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    }
                    border
                    text="Page Not Found"
                />
            </div>
            <Grid container justifyContent="center" style={{ marginTop: "5%" }}>
                <Link to="/">
                    <Button variant="contained" color="primary" size="large">
                        Go Back Home
                    </Button>
                </Link>
            </Grid>
        </Grid>
    )
}

export default PageNotFound
