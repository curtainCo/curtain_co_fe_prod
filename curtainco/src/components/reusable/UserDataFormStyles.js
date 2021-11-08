import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.up("md")]: {
            paddingBottom: theme.spacing(3),
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        // width: "80%", // Fix IE 11 issue.
        // backgroundColor: theme.palette.secondary.main,
    },
    loginLink: {
        cursor: "pointer",
        // textDecoration: "none",
        color: theme.palette.grey[700],
    },
    formControl: {
        minWidth: 120,
    },
    userDataFormHeader: {
        fontFamily: theme.typography.fontFamily.split(",")[2],
        color: theme.palette.primary.light,
        textAlign: "center",
        marginTop: theme.spacing(2),
    },
    passwordResetMessage: {
        fontStyle: "italic",
        fontFamily: theme.typography.fontFamily.split(",")[1],
        color: theme.palette.grey[700],
        textAlign: "center",
        marginTop: theme.spacing(4),
    },
}))

export default useStyles
