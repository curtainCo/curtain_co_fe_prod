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
import useStyles from "../reusable/UserDataFormStyles"
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
    Typography,
    Container,
} from "@material-ui/core"
// ICONS
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"

export default function SignIn() {
    const classes = useStyles()
    const history = useHistory()

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
            console.log("---CURRENT USER---")
            console.log(resp.data)
            let currentUser = resp.data.user
            if (currentUser && resp.status === 200) {
                dispatch({
                    type: ACTIONS.LOGIN,
                    payload: currentUser,
                })
                setEmail("")
                setPassword("")
            }
        } catch (error) {
            loginError = `An error ocurred on login. ${error.response.data}`
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
            console.log(history.location.state)
            setPrevUrl(history.location.state.prevUrl.split("3000")[1])
        }
    }, [history])

    return (
        <>
            {state.currentUser !== null ? (
                <Redirect to={prevUrl} />
            ) : (
                <Container maxWidth="xs">
                    <CssBaseline />

                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
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

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                onChange={handleRememberMe}
                                                checked={rememberMe}
                                            />
                                        }
                                        label="Remember me"
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Sign In
                                    </Button>

                                    <Grid container>
                                        <Grid item xs>
                                            <Link
                                                className={classes.link}
                                                to="/"
                                            >
                                                {/* Forgot password? */}
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link
                                                className={classes.link}
                                                to={{
                                                    pathname: "/register",
                                                    state: {
                                                        prevUrl: prevUrl,
                                                    },
                                                }}
                                            >
                                                Don't have an account? Sign Up
                                            </Link>
                                        </Grid>
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
