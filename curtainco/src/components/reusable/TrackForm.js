import React from "react"
// STYLES
import {
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import useStyles from "../account/admin/AdminStyles"
// COMPONENTS
import FileInput from "./FileInput"
import LoadingSymbol from "./LoadingSymbol"

function TrackForm({
    title,
    buttonText,
    handleTextChange,
    handleRadioChange,
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
                        id="track-input"
                        label="Track Name"
                        variant="outlined"
                        name="name"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="track-description-input"
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
                        id="track-type-input"
                        label="Track Type"
                        variant="outlined"
                        name="type"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.type}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="track-color-input"
                        label="Track Colour"
                        variant="outlined"
                        name="colour"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.colour}
                    />
                </Grid>
                <Grid
                    item
                    container
                    justify="center"
                    alignItems="center"
                    xs={12}
                >
                    {/* IF PRODUCT.SINGLE IS EMPTY, DONT SELECT ANYTHING */}
                    {/* OTHERWISE CHANGE TRUE -> SINGLE AND FALSE -> DOUBLE */}
                    <RadioGroup
                        aria-label="single-double-input"
                        name="single"
                        onChange={handleRadioChange}
                        row
                        value={
                            product.single === ""
                                ? null
                                : product.single
                                    ? "single"
                                    : "double"
                        }
                    >
                        <FormControlLabel
                            value="single"
                            control={<Radio />}
                            label="Single"
                        />
                        <FormControlLabel
                            value="double"
                            control={<Radio />}
                            label="Double"
                        />
                    </RadioGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="track-finial-style-input"
                        label="Finial Style"
                        variant="outlined"
                        name="finialStyle"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.finialStyle}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="track-finial-color-input"
                        label="Finial Colour"
                        variant="outlined"
                        name="finialColour"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.finialColour}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="track-fix-location-input"
                        label="Fix Location"
                        variant="outlined"
                        name="location"
                        fullWidth
                        onChange={handleTextChange}
                        value={product.location}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="track-price-input"
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

export default TrackForm
