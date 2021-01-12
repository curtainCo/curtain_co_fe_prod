import React from "react"
// HELPERS AND SERVICES
import { logoutUser } from "../../services/authServices"
import { setErrorSnackBar } from "../../helpers/appHelpers"
// STATE
import { ACTIONS } from "../../config/stateReducer"
import { useCurtainContext } from "../../config/CurtainCoContext"
// STYLES
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"
import useStyles from "./NavigationStyles"
// COMPONENTS
// PACKAGES
import { Link, withRouter } from "react-router-dom"

function NavBar() {
    const classes = useStyles()
    const { state, dispatch } = useCurtainContext()

    function handleLogout(e) {
        e.preventDefault()

        logoutUser()
            .then((resp) => {
                console.log("Got back response on logout", resp)
                // logout the user locally
                if (resp.status === 204) {
                    dispatch({ type: ACTIONS.LOGOUT })
                    console.log("logging out")
                }
            })
            .catch((error) => {
                setErrorSnackBar(
                    dispatch,
                    `Something went wrong and you were not logged out`
                )
                console.log(
                    "The server may be down - caught an exception on logout:",
                    error
                )
            })
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link className={classes.link} to="/">
                        The Curtain Co
                    </Link>
                </Typography>

                <Link className={classes.link} to="/">
                    <Button color="inherit">Home</Button>
                </Link>

                <Link className={classes.link} to="/collections">
                    <Button color="inherit">Collections</Button>
                </Link>

                <Link className={classes.link} to="/products">
                    <Button color="inherit">Products</Button>
                </Link>

                <Link className={classes.link} to="/about">
                    <Button color="inherit">About</Button>
                </Link>

                <Link className={classes.link} to="/cart">
                    <Button color="inherit">Cart</Button>
                </Link>

                {state.currentUser !== null && (
                    <Link className={classes.link} to="/account">
                        <Button color="inherit">Account</Button>
                    </Link>
                )}

                {state.currentUser !== null ? (
                    <Link className={classes.link} to="/">
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Link>
                ) : (
                    <Link
                        className={classes.link}
                        to={{
                            pathname: "/login",
                            state: {
                                prevUrl: window.location.href,
                            },
                        }}
                    >
                        <Button color="inherit">Login</Button>
                    </Link>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default withRouter(NavBar)
