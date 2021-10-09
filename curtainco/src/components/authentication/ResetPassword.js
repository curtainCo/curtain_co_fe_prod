import React, { useState } from "react"
// SERVICES AND HELPERS
import { sendConfirmationEmail } from "../../services/authServices"
import { loginFieldAreBad } from "../../helpers/authHelpers"
import { setErrorSnackBar, setSuccessSnackBar } from "../../helpers/appHelpers"
// PACKAGES
import { Link, Redirect, useHistory } from "react-router-dom"
// STATE
import { useCurtainContext } from "../../config/CurtainCoContext"
// COMPONENTS
import Copyright from "./Copyright"
import LoadingSymbol from "../reusable/LoadingSymbol"
// STYLES
import {
    Avatar,
    Button,
    TextField,
    Grid,
    Typography,
    Box,
    Container,
    useTheme,
    useMediaQuery,
} from "@material-ui/core"
import useStyles from "../reusable/UserDataFormStyles"
// ICONS
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"

export default function ResetPassword() {
    const classes = useStyles()
    const history = useHistory()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))

    const { state, dispatch } = useCurtainContext()
    const [email, setEmail] = useState("")
    const [prevUrl, setPrevUrl] = useState("/")
    const [isLoading, setIsLoading] = useState(false)
    const [helperText, setHelperText] = useState({
        email: "",
    })

    async function handleSendConfirmation(e) {
        e.preventDefault()
        setIsLoading(true)
        const emailCheck = loginFieldAreBad(email, "email")

        if (emailCheck) {
            setHelperText({ ...helperText, email: emailCheck })
            setIsLoading(false)
            return
        }

        try {
            await sendConfirmationEmail(email)
            setEmail("")
            setSuccessSnackBar(
                dispatch,
                "Success. Please check your emails to reset your password."
            )
        } catch (error) {
            console.log(`Something went wrong: ${error}`)
            setErrorSnackBar(dispatch, error)
            setHelperText({ ...helperText, email: error })
        }
        setIsLoading(false)
    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
        setHelperText({ ...helperText, email: "" })
    }

    return (
        <>
            {state.currentUser !== null ? (
                <Redirect to={prevUrl} />
            ) : (
                <Container maxWidth="xs">
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography
                            component="h2"
                            variant="h5"
                            className={classes.userDataFormHeader}
                            style={{ fontSize: isMobile ? 32 : 48 }}
                        >
                            Reset Password
                        </Typography>

                        {isLoading ? (
                            <LoadingSymbol />
                        ) : (
                            <form
                                className={classes.form}
                                noValidate
                                onSubmit={handleSendConfirmation}
                            >
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={handleEmailChange}
                                    error={helperText.email !== ""}
                                    helperText={helperText.email}
                                />

                                <Container maxWidth="sm">
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        className={classes.submit}
                                    >
                                        Send Confirmation Email
                                    </Button>
                                </Container>

                                <Grid container justifyContent="flex-end">
                                    <Link
                                        className={classes.loginLink}
                                        to={{
                                            pathname: "/register",
                                            state: {
                                                prevUrl: prevUrl,
                                            },
                                        }}
                                    >
                                        <Typography>
                                            Don't have an account? Sign Up
                                        </Typography>
                                    </Link>
                                </Grid>
                            </form>
                        )}
                    </div>

                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>
            )}
        </>
    )
}
