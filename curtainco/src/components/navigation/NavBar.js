import React, { useState } from "react"
// HELPERS AND SERVICES
import { logoutUser } from "../../services/authServices"
import { setErrorSnackBar } from "../../helpers/appHelpers"
// STATE
import { ACTIONS } from "../../config/stateReducer"
import { useCurtainContext } from "../../config/CurtainCoContext"
// STYLES
import {
    AppBar,
    Toolbar,
    Typography,
    Fab,
    Menu,
    MenuItem,
    Grid,
    IconButton,
    withStyles,
    Badge,
    Divider,
    useMediaQuery,
} from "@material-ui/core"
import useStyles from "./NavigationStyles"
// ICONS
import MenuIcon from "@material-ui/icons/Menu"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
// COMPONENTS
import {
    MobileAndTabletPortrait,
    DesktopAndTabletLandscape,
} from "../reusable/Responsive"
// PACKAGES
import { Link, withRouter } from "react-router-dom"

// MINOR COMPONENT FOR THE BADGE ON THE CART
const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}))(Badge)

function NavBar() {
    const classes = useStyles()
    const { state, dispatch } = useCurtainContext()
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
    const mobileMenuId = "app-bar-mobile"
    const isTabletPortrait = useMediaQuery(
        "(min-width: 600px) and (max-width: 960px) and (orientation: portrait)"
    )

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = (e) => {
        setMobileMoreAnchorEl(null)
    }

    function handleLogout(e) {
        e.preventDefault()

        logoutUser()
            .then((resp) => {
                console.log("Got back response on logout", resp)
                // logout the user locally
                if (resp.status === 204) {
                    // gets and clears the timeout set when logging in or refresh with session on it
                    const timeOut = state.timeOut
                    clearTimeout(timeOut)
                    dispatch({ type: ACTIONS.LOGOUT, timeOut: null })
                    console.log("logging out")
                }
            })
            .catch((error) => {
                console.log(
                    "The server may be down - caught an exception on logout:",
                    error
                )
                setErrorSnackBar(
                    dispatch,
                    `Something went wrong and you were not logged out`
                )
            })
    }

    return (
        <>
            <DesktopAndTabletLandscape>
                <AppBar
                    position="static"
                    color="transparent"
                    className={classes.appBar}
                >
                    <Toolbar disableGutters className={classes.toolBar}>
                        <Grid container direction="column">
                            <Grid
                                item
                                container
                                justifyContent="space-around"
                                alignItems="center"
                            >
                                <Grid
                                    item
                                    container
                                    justifyContent="center"
                                    xs={1}
                                >
                                    <Grid item>
                                        <Link
                                            className={classes.navLinks}
                                            to="/collections"
                                        >
                                            <Typography
                                                variant="button"
                                                className={classes.navBarText}
                                            >
                                                Collections
                                            </Typography>
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    justifyContent="center"
                                    xs={1}
                                >
                                    <Grid item>
                                        <Link
                                            className={classes.navLinks}
                                            to="/products"
                                        >
                                            <Typography
                                                variant="button"
                                                className={classes.navBarText}
                                            >
                                                Samples
                                            </Typography>
                                        </Link>
                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    container
                                    justifyContent="center"
                                    xs={1}
                                >
                                    <Grid item>
                                        <Link
                                            className={classes.navLinks}
                                            to="/about"
                                        >
                                            <Typography
                                                variant="button"
                                                className={classes.navBarText}
                                            >
                                                About
                                            </Typography>
                                        </Link>
                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    container
                                    justifyContent="center"
                                    xs={1}
                                >
                                    <Grid item>
                                        <Link
                                            className={classes.navbarLogoCont}
                                            to="/"
                                        >
                                            <img
                                                src="/logo512.png"
                                                alt="the curtain co logo"
                                                className={
                                                    classes.navBarLogoImg
                                                }
                                            />
                                        </Link>
                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    container
                                    justifyContent="center"
                                    xs={1}
                                >
                                    <Grid item>
                                        <Link
                                            className={classes.navLinks}
                                            to={
                                                state.currentUser !== null
                                                    ? "/account"
                                                    : "/login"
                                            }
                                        >
                                            <Typography
                                                variant="button"
                                                className={classes.navBarText}
                                            >
                                                Account
                                            </Typography>
                                        </Link>
                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    container
                                    justifyContent="center"
                                    xs={1}
                                >
                                    <Grid item>
                                        {state.currentUser !== null ? (
                                            <Grid
                                                item
                                                container
                                                justifyContent="center"
                                            >
                                                <Link
                                                    className={classes.navLinks}
                                                    to="/"
                                                    onClick={handleLogout}
                                                >
                                                    <Typography
                                                        variant="button"
                                                        className={
                                                            classes.navBarText
                                                        }
                                                    >
                                                        Logout
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                        ) : (
                                            <Grid
                                                item
                                                container
                                                justifyContent="center"
                                            >
                                                <Link
                                                    className={classes.navLinks}
                                                    to={{
                                                        pathname: "/login",
                                                        state: {
                                                            prevUrl:
                                                                window.location
                                                                    .href,
                                                        },
                                                    }}
                                                >
                                                    <Typography
                                                        variant="button"
                                                        className={
                                                            classes.navBarText
                                                        }
                                                    >
                                                        Login
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                    xs={1}
                                >
                                    <Link
                                        className={classes.iconButtonLink}
                                        to="/cart"
                                    >
                                        <IconButton aria-label="cart">
                                            <StyledBadge
                                                badgeContent={state.cartLength}
                                                color="secondary"
                                            >
                                                <ShoppingCartIcon color="primary" />
                                            </StyledBadge>
                                        </IconButton>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid item className={classes.dividerCont}>
                                <Divider
                                    variant="middle"
                                    className={classes.bottomNavBarDivider}
                                />
                            </Grid>
                            <Grid item className={classes.dividerCont}>
                                <Divider
                                    variant="middle"
                                    className={classes.topNavBarDivider}
                                />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </DesktopAndTabletLandscape>

            {/* MOBILE STYLES */}

            <MobileAndTabletPortrait>
                <Grid
                    container
                    direction="column"
                    className={classes.navBarMobileHeaderMobile}
                >
                    <Grid
                        item
                        style={{
                            width: "80%",
                            margin: "0 auto",
                            height: "100%",
                        }}
                    >
                        <Link to={"/"} className={classes.navLinks}>
                            <Grid
                                item
                                container
                                justifyContent="center"
                                alignItems="center"
                                xs={12}
                            >
                                <Typography
                                    variant="h4"
                                    className={classes.navBarMobileHeaderLeft}
                                    style={{
                                        fontSize: isTabletPortrait ? 40 : 24,
                                    }}
                                >
                                    THE
                                </Typography>

                                <Typography
                                    variant="h4"
                                    className={classes.navBarMobileHeaderRight}
                                    style={{
                                        fontSize: isTabletPortrait ? 40 : 24,
                                    }}
                                >
                                    CURTAIN CO
                                </Typography>
                            </Grid>
                        </Link>
                    </Grid>
                    {/* <Grid item className={classes.dividerCont}> */}
                    <Grid item>
                        <Divider
                            variant="middle"
                            className={classes.topNavBarDividerMobile}
                            style={{
                                top: isTabletPortrait ? "-70px" : "-55px",
                            }}
                        />
                    </Grid>
                    {/* <Grid item className={classes.dividerCont}> */}
                    <Grid item>
                        <Divider
                            variant="middle"
                            className={classes.bottomNavBarDividerMobile}
                            style={{
                                top: isTabletPortrait ? "-20px" : "-15px",
                            }}
                        />
                    </Grid>
                </Grid>

                <AppBar position="fixed" className={classes.appBarMobile}>
                    <div className={classes.sectionMobile}>
                        <Fab
                            color="primary"
                            aria-label="menu"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            size="large"
                        >
                            <MenuIcon />
                        </Fab>
                    </div>

                    <Menu
                        anchorEl={mobileMoreAnchorEl}
                        anchorOrigin={{ vertical: "top", horizontal: "left" }}
                        getContentAnchorEl={null}
                        id={mobileMenuId}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={isMobileMenuOpen}
                        onClose={handleMobileMenuClose}
                        position="fixed"
                    >
                        <MenuItem>
                            <Link
                                onClick={handleMobileMenuClose}
                                className={classes.navLinks}
                                to={"/"}
                            >
                                <Typography
                                    variant="button"
                                    className={classes.mobileMenuItemText}
                                >
                                    home
                                </Typography>
                            </Link>
                        </MenuItem>

                        <MenuItem>
                            <Link
                                onClick={handleMobileMenuClose}
                                className={classes.navLinks}
                                to={"/collections"}
                            >
                                <Typography
                                    variant="button"
                                    className={classes.mobileMenuItemText}
                                >
                                    collections
                                </Typography>
                            </Link>
                        </MenuItem>

                        <MenuItem>
                            <Link
                                onClick={handleMobileMenuClose}
                                className={classes.navLinks}
                                to={"/products"}
                            >
                                <Typography
                                    variant="button"
                                    className={classes.mobileMenuItemText}
                                >
                                    samples
                                </Typography>
                            </Link>
                        </MenuItem>

                        <MenuItem>
                            <Link
                                onClick={handleMobileMenuClose}
                                className={classes.navLinks}
                                to={"/about"}
                            >
                                <Typography
                                    variant="button"
                                    className={classes.mobileMenuItemText}
                                >
                                    about
                                </Typography>
                            </Link>
                        </MenuItem>

                        <MenuItem>
                            <Link
                                onClick={handleMobileMenuClose}
                                className={classes.navLinks}
                                to={"/cart"}
                            >
                                <Typography
                                    variant="button"
                                    className={classes.mobileMenuItemText}
                                >
                                    cart
                                </Typography>
                            </Link>
                        </MenuItem>

                        {state.currentUser !== null ? (
                            <div>
                                <MenuItem>
                                    <Link
                                        onClick={handleMobileMenuClose}
                                        className={classes.navLinks}
                                        to={"/account"}
                                    >
                                        <Typography
                                            variant="button"
                                            className={
                                                classes.mobileMenuItemText
                                            }
                                        >
                                            account
                                        </Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link
                                        onClick={handleMobileMenuClose}
                                        className={classes.navLinks}
                                        to="/"
                                    >
                                        <Typography
                                            variant="button"
                                            color="inherit"
                                            onClick={handleLogout}
                                            className={
                                                classes.mobileMenuItemText
                                            }
                                        >
                                            Logout
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            </div>
                        ) : (
                            <MenuItem>
                                <Link
                                    onClick={handleMobileMenuClose}
                                    className={classes.navLinks}
                                    to={{
                                        pathname: "/login",
                                        state: {
                                            prevUrl: window.location.href,
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="button"
                                        color="inherit"
                                        className={classes.mobileMenuItemText}
                                    >
                                        Login
                                    </Typography>
                                </Link>
                            </MenuItem>
                        )}
                    </Menu>
                </AppBar>
            </MobileAndTabletPortrait>

            {/* TABLET STYLES */}
        </>
    )
}

export default withRouter(NavBar)
