import React, { useState, useEffect } from "react"
// SERVICES AND HELPERS
import {
    checkResetPasswordToken,
    resetPassword,
} from "../../services/authServices"
import { loginFieldAreBad } from "../../helpers/authHelpers"
import { setErrorSnackBar, setSuccessSnackBar } from "../../helpers/appHelpers"
// PACKAGES
import { Redirect, useHistory, useParams } from "react-router-dom"
// STATE
import { useCurtainContext } from "../../config/CurtainCoContext"
import { ACTIONS } from "../../config/stateReducer"
// COMPONENTS
import Copyright from "./Copyright"
import LoadingSymbol from "../reusable/LoadingSymbol"
// STYLES
import {
    Avatar,
    Button,
    TextField,
    Typography,
    Box,
    Container,
    useTheme,
    useMediaQuery,
} from "@material-ui/core"
import useStyles from "../reusable/UserDataFormStyles"
// ICONS
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"

export default function ResetPasswordRestricted() {
    const classes = useStyles()
    const history = useHistory()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))
    const { token } = useParams()

    const { state, dispatch } = useCurtainContext()
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [prevUrl, setPrevUrl] = useState("/")
    const [isLoading, setIsLoading] = useState(false)
    const [helperText, setHelperText] = useState({
        password: "",
        confirmPassword: "",
    })

    useEffect(() => {
        setIsLoading(true)
        ;(async () => {
            try {
                const resp = await checkResetPasswordToken(token)
                setUser({ ...user, email: resp.data })
            } catch (error) {
                history.push("/")
                setErrorSnackBar(dispatch, error.message)
            }
        })()
        setIsLoading(false)
    }, [user, token, history, dispatch])

    async function handleResetPassword(e) {
        e.preventDefault()
        setIsLoading(true)
        const passwordIsBad = loginFieldAreBad(user.password, "password")
        const confirmPasswordIsBad = loginFieldAreBad(
            user.confirmPassword,
            "password"
        )

        if (passwordIsBad) {
            setHelperText({ ...helperText, password: passwordIsBad })
            setIsLoading(false)
            return
        } else if (confirmPasswordIsBad) {
            setHelperText({ ...helperText, password: confirmPasswordIsBad })
            setIsLoading(false)
            return
        } else if (user.password !== user.confirmPassword) {
            setHelperText({
                ...helperText,
                confirmPassword: "Passwords must match.",
            })
            setIsLoading(false)
            return
        }

        try {
            await resetPassword({
                email: user.email,
                password: user.password,
            })
            setSuccessSnackBar(
                dispatch,
                "Success. Your password has been updated. Please log in again."
            )
            history.push("/login")
        } catch (error) {
            console.log(`An error ocurred on resetPassword. ${error.message}`)
            setErrorSnackBar(dispatch, "Error: Try again.")
        }
        setIsLoading(false)
    }

    function handlePasswordChange(e) {
        setUser({ ...user, password: e.target.value })
        setHelperText({ ...helperText, password: "" })
    }

    function handleConfirmPasswordChange(e) {
        setUser({ ...user, confirmPassword: e.target.value })
        setHelperText({ ...helperText, confirmPassword: "" })
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
                                onSubmit={handleResetPassword}
                            >
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label="New Password"
                                    name="password"
                                    autoFocus
                                    onChange={handlePasswordChange}
                                    error={helperText.password !== ""}
                                    helperText={helperText.password}
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Confirm Password"
                                    name="confirm-password"
                                    onChange={handleConfirmPasswordChange}
                                    error={helperText.confirmPassword !== ""}
                                    helperText={helperText.confirmPassword}
                                />

                                <Container maxWidth="sm">
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        className={classes.submit}
                                    >
                                        Reset Password
                                    </Button>
                                </Container>
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
