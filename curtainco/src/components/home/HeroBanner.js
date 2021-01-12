import { Grid } from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"
import CurtainCoImg from "../reusable/CurtainCoImg"

function HeroBanner({ getBorderRadius }) {
    return (
        <Grid item sm={6}>
            <Link to={`/collections`} className="link">
                {/* <img
                    src="https://source.unsplash.com/random/600x300"
                    alt="Hero Banner"
                    style={{ width: "100%" }}
                /> */}
                <CurtainCoImg
                    imageSrc={
                        "https://images.unsplash.com/photo-1467635624863-33cf388d9a2e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    }
                    border
                    text="View Our Collections"
                    getBorderRadius={getBorderRadius}
                />
            </Link>
        </Grid>
    )
}

export default HeroBanner
