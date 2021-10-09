import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    navLinks: {
        color: "black",
        textDecoration: "none",
        width: "100%",
        height: "100%",
        padding: "12px 20px",
    },
    iconButtonLink: {
        textDecoration: "none",
        padding: 0,
        width: "70%",
        textAlign: "center",
    },
    footerRoot: {
        position: "relative",
        bottom: 0,
        height: "fit-content",
        width: "100%",
        zIndex: "100",
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: "auto",
        backgroundColor: theme.palette.primary.veryLight,
    },
    footerMobile: {
        height: "fit-content",
        backgroundColor: theme.palette.primary.veryLight,
        marginTop: "10%",
        // paddingBottom: "20%",
        paddingTop: "5%",
        position: "relative",
        width: "100%",
        bottom: 0,
    },
    footerDetailsCont: {
        width: "80%",
        margin: "0 auto",
    },
    mobileMenuItemText: {
        color: theme.palette.primary.dark,
        fontSize: 16,
        letterSpacing: "1px",
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    appBar: {
        boxShadow: theme.shadows[0],
        width: "100%",
        display: "flex",
        justifyContentContent: "center",
        alignItems: "stretch",
        paddingTop: "10px",
    },
    appBarMobile: {
        top: "auto",
        background: "transparent",
        boxShadow: "none",
        marginTop: "3%",
        [theme.breakpoints.down("sm")]: {
            marginTop: "0",
            bottom: "3%",
            width: "25%",
        },
        zIndex: 1000,
    },
    toolBar: {
        maxWidth: "1600px",
        width: "100%",
        maxHeight: "170px",
        minHeight: "170px",
        margin: "0 auto",
        [theme.breakpoints.up("sm")]: {
            width: "95%",
        },
    },
    myAccountButton: {
        display: "flex",
        justifyContentContent: "space-around",
        color: "black",
        textDecoration: "none",
        width: "100%",
        height: "100%",
    },
    navBarLogoCont: {
        // maxWidth: "200px",
        // maxHeight: "200px",
        position: "relative",
    },
    navBarLogoImg: {
        maxWidth: "170px",
        maxHeight: "170px",
        position: "relative",
        zIndex: 1000,
        [theme.breakpoints.up("sm")]: {
            maxWidth: "170px",
            maxHeight: "170px",
        },
        // left: 0,
    },
    navBarToolBar: {
        padding: "none",
    },
    topNavBarDivider: {
        marginTop: "-113px",
        // backgroundColor: theme.palette.primary.main,
        backgroundColor: "#5C9CB9",
    },
    bottomNavBarDivider: {
        marginTop: "-65px",
        // backgroundColor: theme.palette.primary.main,
        backgroundColor: "#5C9CB9",
    },
    topNavBarDividerMobile: {
        // marginTop: "-63px",
        position: "relative",
        // top: "-55px",
        // backgroundColor: theme.palette.primary.dark,
        backgroundColor: "#5C9CB9",
    },
    bottomNavBarDividerMobile: {
        // marginTop: "-20px",
        position: "relative",
        top: "-15px",
        // backgroundColor: theme.palette.primary.dark,
        backgroundColor: "#5C9CB9",
    },
    dividerCont: {
        position: "relative",
    },
    navBarText: {
        fontSize: 20,
        fontFamily: theme.typography.fontFamily.split(",")[3],
        color: theme.palette.primary.dark,
        // fontWeight: theme.typography.fontWeightMedium,
        fontWeight: 600,
        letterSpacing: "2px",
        [theme.breakpoints.up("sm")]: {
            fontSize: 16,
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: 26,
        },
        "&:hover": {
            color: theme.palette.primary.light,
        },
        "&:selected": {
            color: theme.palette.primary.main,
        },
    },
    footerText: {
        color: theme.palette.primary.dark,
    },
    footerEmailLink: {
        fontSize: 16,
        color: theme.palette.secondary.dark,
        "&:hover": {
            color: theme.palette.secondary.main,
        },
    },
    navBarMobileHeaderLeft: {
        paddingRight: "4px",
        fontWeight: theme.typography.fontWeightMedium,
    },
    navBarMobileHeaderRight: {
        paddingLeft: "4px",
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.primary.main,
    },
    privacy: {
        color: theme.palette.primary.main,
    },
    copyrightText: {
        color: theme.palette.primary.main,
    },
    siteByText: {
        color: theme.palette.primary.main,
    },
    footerSiteByLinks: {
        textDecoration: "none",
        color: theme.palette.secondary.dark,
        "&:hover": {
            color: theme.palette.secondary.main,
        },
    },

    navBarMobileHeaderMobile: {
        // flexDirection: "inherit !important",
    },
    cartLengthBadge: {
        color: theme.palette.tertiary.main,
    },
    curtainCoDividerColor: {
        background: theme.palette.primary.dark,
    },
    curtainCoDividerDot: {
        width: "4px",
        height: "4px",
        borderRadius: "2px",
        background: theme.palette.primary.dark,
        position: "relative",
        top: -2,
    },
}))

export default useStyles
