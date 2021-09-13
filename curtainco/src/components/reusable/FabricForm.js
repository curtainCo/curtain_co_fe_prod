import React from "react"
// STYLES
import { Typography, Grid, TextField, Button, Box } from "@material-ui/core"
import useStyles from "../account/admin/AdminStyles"
// ICONS
import DeleteIcon from "@material-ui/icons/Delete"
// COMPONENTS
import FileInput from "./FileInput"
import LoadingSymbol from "../reusable/LoadingSymbol"

function FabricForm({
    title,
    buttonText,
    handleTextChange,
    handleSubmit,
    product,
    handleRemove,
    handleFileChange,
    setResetFile,
    resetFile,
    isLoading,
}) {
    const classes = useStyles()
    // this loop just changes an undefined value of the product to
    // empty string for the form to display cleaner
    for (const key in product) {
        if (Object.hasOwnProperty.call(product, key)) {
            if (product[key] === undefined || product[key] === null)
                product[key] = ""
        }
    }

    return (
        <>
            <Box pb={1}>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={3}>
                        <img
                            src={
                                product.imgUrl !== ""
                                    ? product.imgUrl
                                    : "/no-image.png"
                            }
                            onError={e => e.target.src = "./no-image.png"}
                            alt={
                                product.imgUrl === ""
                                    ? "blank-image"
                                    : `${product.colour} ${product.name}`
                            }
                            className={classes.editFormImage}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        justify="center"
                        alignItems="center"
                        xs={9}
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                style={{ textAlign: "center" }}
                            >
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FileInput
                                handleFileChange={handleFileChange}
                                resetFile={resetFile}
                                setResetFile={setResetFile}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item xs={12}>
                    <TextField
                        id="fabric-input"
                        label="Fabric Name"
                        variant="outlined"
                        name="name"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="fabric-description-input"
                        label="Description"
                        variant="outlined"
                        name="description"
                        multiline
                        fullWidth
                        onChange={handleTextChange}
                        value={product.description}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="fabric-color-input"
                        label="Fabric Colour"
                        variant="outlined"
                        name="colour"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.colour}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="fabric-density-input"
                        label="Fabric Density"
                        variant="outlined"
                        name="density"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.density}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="fabric-header-style-input"
                        label="Header Style"
                        variant="outlined"
                        name="style"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.style}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="fabric-size-input"
                        label="Hem Size"
                        variant="outlined"
                        name="size"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.size}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="fabric-length-input"
                        label="Length"
                        variant="outlined"
                        name="length"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.length}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="fabric-price-input"
                        label="Price"
                        variant="outlined"
                        type="number"
                        name="price"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.price}
                    />
                </Grid>

                {product && (
                    <Grid
                        item
                        container
                        justify="space-between"
                        alignItems="center"
                        xs={12}
                        style={{ paddingTop: "5%" }}
                    >
                        {/* IF THE REMOVE HANDLER WAS PASSED IN, SHOW THE DELETE BUTTON */}
                        <Grid item>
                            {handleRemove && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<DeleteIcon />}
                                    onClick={handleRemove}
                                >
                                    Delete
                                </Button>
                            )}
                        </Grid>

                        {isLoading
                            ? (
                                <Grid item>
                                    <LoadingSymbol />
                                </Grid>
                            )
                            : (<Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    {buttonText}
                                </Button>
                            </Grid>)
                        }


                    </Grid>
                )}
            </Grid>
        </>
    )
}

export default FabricForm
