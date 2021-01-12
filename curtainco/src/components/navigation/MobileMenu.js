import React from "react"
// STATE
import useCurtainContext from "../../config/CurtainCoContext"
// STYLES
import { Typography, Menu, MenuItem } from "@material-ui/core"
import useStyles from "./NavigationStyles"
// PACKAGES
import { Link } from "react-router-dom"

function MobileMenu({
    handleLogout,
    isMobileMenuOpen,
    mobileMenuId,
    mobileMoreAnchorEl,
    handleMobileMenuClose,
}) {
    const { state, dispatch } = useCurtainContext()
    const classes = useStyles()

    return (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            getContentAnchorEl={null}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            position="fixed"
        >
            <MenuItem>
                <Link
                    onClick={handleMobileMenuClose}
                    className={classes.link}
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
                    className={classes.link}
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
                    className={classes.link}
                    to={"/products"}
                >
                    <Typography
                        variant="button"
                        className={classes.mobileMenuItemText}
                    >
                        products
                    </Typography>
                </Link>
            </MenuItem>

            <MenuItem>
                <Link
                    onClick={handleMobileMenuClose}
                    className={classes.link}
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
                    className={classes.link}
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
                <>
                    <MenuItem>
                        <Link
                            onClick={handleMobileMenuClose}
                            className={classes.link}
                            to={"/account"}
                        >
                            <Typography
                                variant="button"
                                className={classes.mobileMenuItemText}
                            >
                                account
                            </Typography>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            onClick={handleMobileMenuClose}
                            className={classes.link}
                            to="/"
                        >
                            <Typography
                                variant="button"
                                color="inherit"
                                onClick={handleLogout}
                                className={classes.mobileMenuItemText}
                            >
                                Logout
                            </Typography>
                        </Link>
                    </MenuItem>
                </>
            ) : (
                <MenuItem>
                    <Link
                        className={classes.link}
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
    )
}

export default MobileMenu
