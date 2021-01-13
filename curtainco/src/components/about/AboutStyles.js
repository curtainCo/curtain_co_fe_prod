import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    aboutMeCont: {
        paddingBottom: "10%",
    },
    aboutMeImg: {
        width: "100%",
        height: "90%",
        maxHeight: "400px",
        maxWidth: "600px",
        objectFit: "cover",
    },
    aboutMeMsg: {
        paddingLeft: theme.spacing(5),
        [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(0),
        },
    },
    aboutMeMsgHeader: {
        paddingLeft: theme.spacing(5),
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(3),
        },
    },
}))

export default useStyles
