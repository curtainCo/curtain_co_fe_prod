import React, { useState, useEffect } from "react"
// SERVICES AND HELPERS
import { loginUser } from "../../services/authServices"
import { loginFieldAreBad } from "../../helpers/authHelpers"
import { setErrorSnackBar } from "../../helpers/appHelpers"
// PACKAGES
import { Link, Redirect, useHistory } from "react-router-dom"
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
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
    Typography,
    Container,
    useTheme,
    useMediaQuery,
} from "@material-ui/core"
import useStyles from "../reusable/UserDataFormStyles"
// ICONS
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"

export default function SignIn() {
    const classes = useStyles()
    const history = useHistory()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"))

    const { state, dispatch } = useCurtainContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [prevUrl, setPrevUrl] = useState("/")
    const [isLoading, setIsLoading] = useState(false)
    const [helperText, setHelperText] = useState({
        email: "",
        password: "",
    })

    async function handleLogin(e) {
        e.preventDefault()
        setIsLoading(true)
        let loginError = false
        const emailCheck = loginFieldAreBad(email, "email")
        const passwordCheck = loginFieldAreBad(password, "password")

        if (emailCheck) {
            setHelperText({ ...helperText, email: emailCheck })
            setIsLoading(false)
            return
        }
        if (passwordCheck) {
            setHelperText({ ...helperText, password: passwordCheck })
            setIsLoading(false)
            return
        }

        const user = { email, password, rememberMe }

        try {
            let resp = await loginUser(user)
            // console.log("---CURRENT USER---")
            // console.log(resp.data)
            let currentUser = resp.data.user
            if (currentUser && resp.status === 200) {
                // fires a setTimeout that would refresh the page based on rememberMe
                // if remember me is true, sets the timeout from refresh to the max value setTimeout can reach
                // assumes the user would not leave the browser open without refresh in a span of a month.
                let timeOut = null
                if (rememberMe) {
                    const maxTimeOutVal = 2147483647
                    timeOut = setTimeout(() => {
                        window.location.reload()
                    }, maxTimeOutVal)
                } else {
                    timeOut = setTimeout(() => {
                        window.location.reload()
                    }, 3600000)
                }
                // console.log("timeout set, with ID", timeOut)
                dispatch({
                    type: ACTIONS.LOGIN,
                    payload: currentUser,
                    timeOut,
                })
                setEmail("")
                setPassword("")
            }
        } catch (error) {
            loginError = `An error ocurred on login. ${error.response}`
            console.log(loginError)
            setErrorSnackBar(
                dispatch,
                "Something went wrong. Email or password is incorrect"
            )
        }
        setIsLoading(false)
    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
        setHelperText({ ...helperText, email: "" })
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
        setHelperText({ ...helperText, password: "" })
    }

    function handleRememberMe() {
        setRememberMe(!rememberMe)
    }

    // AFTER USER LOGS IN, REDIRECT THEM TO THE PREVIOUS PAGE THEY CAME FROM
    useEffect(() => {
        if (history.location.state !== undefined) {
            // console.log(history.location.state)
            setPrevUrl(history.location.state.prevUrl.split("3000")[1])
        }
    }, [history])

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
                            Sign in
                        </Typography>

                        {isLoading ? (
                            <LoadingSymbol />
                        ) : (
                            <>
                                <form
                                    className={classes.form}
                                    noValidate
                                    onSubmit={handleLogin}
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
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={handlePasswordChange}
                                        error={helperText.password !== ""}
                                        helperText={helperText.password}
                                    />
                                    <Grid
                                        container
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="secondary"
                                                        onChange={
                                                            handleRememberMe
                                                        }
                                                        checked={rememberMe}
                                                    />
                                                }
                                                label="Remember me"
                                            />
                                        </Grid>
                                        <Grid item>
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
                                                    Forgot Password
                                                </Typography>
                                            </Link>
                                        </Grid>
                                    </Grid>

                                    <Container maxWidth="sm">
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="secondary"
                                            className={classes.submit}
                                        >
                                            Sign In
                                        </Button>
                                    </Container>

                                    <Grid container justify="flex-end">
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
                            </>
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
