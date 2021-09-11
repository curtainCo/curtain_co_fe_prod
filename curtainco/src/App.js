import React, { useState, useEffect } from "react"
// STATE
import { useCurtainContext } from "./config/CurtainCoContext"
import { ACTIONS } from "./config/stateReducer"
// STYLES
import { Container, useMediaQuery, ThemeProvider } from "@material-ui/core"
import { createTheme, responsiveFontSizes } from "@material-ui/core/styles"
import "./styles/Main.css"
// PACKAGES
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// HELPERS ANS SERVICES
// import { setErrorSnackBar } from "./helpers/appHelpers"
import { getLoggedInUserFromHomeRoute } from "./services/authServices"
import { getCartItemsFromLocalStorage } from "./services/cartServices"
// COMPONENTS
import {
    NavBar,
    Home,
    Footer,
    About,
    Collections,
    CollectionCustomise,
    Products,
    Cart,
    Account,
    Login,
    Register,
    ResetPassword,
    ResetPasswordRestricted,
    RequestConsultation,
    CustomSnackbar,
    CustomModal,
    PageNotFound,
} from "./components/export.js"
import LoadingSymbol from "./components/reusable/LoadingSymbol"

function App() {
    const { state, dispatch } = useCurtainContext()
    const [isLoading, setIsLoading] = useState(false)
    // const isMobile = useMediaQuery("(max-width: 600px)")
    const isMobileOrTabletPortrait = useMediaQuery("(max-width: 960px)")

    let theme = createTheme({
        typography: {
            fontFamily: [
                '"Nunito"',
                '"Raleway"',
                '"Parisienne"',
                '"Nunito Sans"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
            ].join(","),
        },
        palette: {
            background: {
                default: "#f5f5f5",
            },
            primary: {
                veryLight: "#d0e9f5",
                light: "#5C9CB9",
                main: "#3D537D",
                dark: "#025B6D",
            },
            secondary: {
                light: "rgba(31, 144, 77, 0.1)",
                main: "rgba(31, 144, 77, 0.6)",
                dark: "rgba(31, 144, 77, 0.7)",
            },
            tertiary: {
                light: "#ffefeb",
                main: "#FDBAAA",
                dark: "#D66D50",
            },
        },
        overrides: {
            MuiButton: {
                root: {
                    borderRadius: 20,
                },
                contained: {
                    boxShadow: "none",
                },
            },
        },
    })
    theme = responsiveFontSizes(theme)

    useEffect(() => {
        // FIND IF A PERSON STILL HAS A SESSION,
        // IF SO, LOG THEM IN
        if (state.currentUser === null) {
            setIsLoading(true)
            getLoggedInUserFromHomeRoute()
                .then((resp) => {
                    let currentUser = resp.data.user
                    if (currentUser && resp.status === 200) {
                        // server responds with the remaining time of their session-cookie
                        // if remaining time > maxAllowed time for setTimeout, it would set the maxAllowed time for refresh
                        // otherwise get the remaining time for setTimeout
                        // sends the setTimeout id to global state for clearing in logout
                        const maxTime =
                            resp.data.user.cookie > 2147483647
                                ? 2147483647
                                : resp.data.user.cookie
                        // console.log("timeout set", maxTime)
                        const timeOut = setTimeout(() => {
                            window.location.reload()
                        }, maxTime)
                        dispatch({
                            type: ACTIONS.SET_CURRENT_USER,
                            payload: currentUser,
                            timeOut,
                        })
                    }
                })
                .catch((error) => {
                    console.log(
                        `Couldn't get current session or no previous user logged in. ${error}.`
                    )
                    // setErrorSnackBar(
                    //     dispatch,
                    //     "Something went wrong and we couldn't log you in"
                    // )
                })
            setIsLoading(false)
        }

        // GET THE CURRENT AMOUNT OF ITEMS IN THE CART AND SET IT
        const cartItems = getCartItemsFromLocalStorage()
        let cartLength = 0
        for (let i = 0; i < cartItems.length; i++) {
            cartLength += cartItems[i].qty
        }
        dispatch({
            type: ACTIONS.SET_CART,
            payload: cartLength,
        })
    }, [dispatch, state.currentUser])

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <NavBar />

                {isLoading ? (
                    <LoadingSymbol />
                ) : (
                    <Container
                        className={
                            isMobileOrTabletPortrait
                                ? "app-container-mobile"
                                : "app-container"
                        }
                        component="main"
                    >
                        {/* CHANGE THE CLASS IN THE CONTAINER ABOVE SO THAT TABLET AND MOBILE CAN SCROLL
                        AND DESKTOP ACTS AS A SPA */}
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route
                                exact
                                path="/reset-password"
                                component={ResetPassword}
                            />
                            <Route
                                exact
                                path="/reset-password/:token"
                                component={ResetPasswordRestricted}
                            />
                            <Route exact path="/about" component={About} />
                            <Route
                                exact
                                path="/collections"
                                component={Collections}
                            />
                            <Route
                                exact
                                path="/collections/customise/:id"
                                component={CollectionCustomise}
                            />
                            <Route
                                exact
                                path="/products"
                                component={Products}
                            />
                            <Route exact path="/cart" component={Cart} />
                            <Route
                                exact
                                path="/request"
                                component={RequestConsultation}
                            />
                            <Route exact path="/account" component={Account} />
                            <Route component={PageNotFound} />
                        </Switch>
                    </Container>
                )}

                <CustomSnackbar
                    open={state.snackbar.open}
                    severity={state.snackbar.severity}
                    message={state.snackbar.message}
                />

                <CustomModal
                    title={state.modal.title}
                    open={state.modal.open}
                    message={state.modal.message}
                    data={state.modal.data}
                />

                <Footer />
            </ThemeProvider>
        </Router>
    )
}

export default App
