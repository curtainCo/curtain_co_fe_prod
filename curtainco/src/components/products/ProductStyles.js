import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingBottom: "5%",
        overflowY: "auto",
    },
    cardGridMobile: {
        paddingBottom: "5%",
        marginLeft: 0,
        overflowY: "auto",
    },
    card: {
        height: "100%",
        width: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        borderBottomRightRadius: theme.spacing(5),
        borderTopLeftRadius: theme.spacing(5),
        border: `1px solid ${theme.palette.primary.main}`,
        paddingBottom: theme.spacing(1),
    },
    cardMedia: {
        // paddingTop: "56.25%", // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    cardContentText: {
        fontFamily: theme.typography.fontFamily.split(",")[1],
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    productSeeMoreButton: {
        // fontFamily: theme.typography.fontFamily.split(",")[1],
    },
    productFilterText: {
        fontFamily: theme.typography.fontFamily.split(",")[1],
        width: "100%",
        color: theme.palette.primary.main,
    },
    productFilterHeadings: {
        color: theme.palette.primary.main,
    },
    filterRoot: {
        display: "flex",
    },
    filterFormControl: {
        // margin: theme.spacing(3),
        color: theme.palette.grey[700],
    },
    productItemCont: {
        margin: "4%",
        width: "100%",
    },
    productPageCont: {
        marginTop: theme.spacing(1),
    },
}))

export default useStyles
