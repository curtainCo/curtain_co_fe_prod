import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    link: {
        color: "black",
        textDecoration: "none",
        width: "100%",
        height: "100%",
    },

    footerRoot: {
        position: "absolute",
        // bottom: -150,
        // height: "92px",
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
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
    },

    mobileHeader: {
        textAlign: "center",
        padding: "3%",
    },
    footerMobile: {
        height: "fit-content",
        backgroundColor: "lightblue",
        marginTop: "10%",
    },
    footerDetailsCont: {
        width: "80%",
        margin: "0 auto",
    },
    mobileMenuItemText: {
        color: "#F2511B",
        fontFamily: "Roboto Slab",
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },

    appBar: {
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
}))

export default useStyles
