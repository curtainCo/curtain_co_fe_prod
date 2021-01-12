import React, { useState, useEffect } from "react"
import { Grid, Typography } from "@material-ui/core"

function CurtainCoImg({
    imageSrc,
    imgAlt,
    border = false,
    text,
    getBorderRadius,
}) {
    const [imgHeight, setImgHeight] = useState(100)
    const [borderRadius, setBorderRadius] = useState(80)
    console.log(window.innerHeight / 3)

    useEffect(() => {
        let { innerHeight } = window
        let divideBy = innerHeight > 750 ? 3.5 : 3
        setImgHeight(innerHeight / divideBy)
        setBorderRadius(innerHeight / 10)
        console.log(innerHeight)
    }, [])
    useEffect(() => {
        getBorderRadius(borderRadius)
    }, [getBorderRadius, borderRadius])

    return (
        <>
            <div style={{ position: "relative" }}>
                <div
                    style={{
                        width: "100%",
                        position: "absolute",
                        height: `${imgHeight}px`,
                        zIndex: 25,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Grid
                        item
                        container
                        justify="center"
                        alignItems="center"
                        style={{
                            width: "87%",
                            height: "87%",
                            border: border ? "2px solid white" : "none",
                            borderRadius: `${borderRadius}px 0 ${borderRadius}px 0`,
                        }}
                    >
                        <Typography
                            variant="h2"
                            style={{
                                color: "white",
                                width: "100%",
                                textAlign: "center",
                            }}
                        >
                            {text}
                        </Typography>
                    </Grid>
                </div>

                <Grid
                    style={{
                        width: "100%",
                        height: `${imgHeight}px`,
                        zIndex: 15,
                        borderRadius: `${borderRadius}px 0 ${borderRadius}px 0`,
                    }}
                    container
                    justify="center"
                    alignItems="center"
                >
                    <Grid
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${imageSrc})`,
                            backgroundSize: "cover",
                            borderRadius: `${borderRadius}px 0 ${borderRadius}px 0`,
                        }}
                        item
                        container
                        justify="center"
                        alignItems="center"
                    >
                        <Grid
                            item
                            container
                            justify="center"
                            alignItems="center"
                            style={{
                                position: "absolute",
                                background: "black",
                                opacity: 0.5,
                                width: "100%",
                                height: `${imgHeight}px`,
                                borderRadius: `${borderRadius}px 0 ${borderRadius}px 0`,
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default CurtainCoImg
