import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        width: "60%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
        borderBottomRightRadius: theme.spacing(10),
        borderTopLeftRadius: theme.spacing(10),
        border: `1px solid ${theme.palette.primary.main}`,
    },
    collectionLink: {
        textDecoration: "none",
        color: "inherit",
    },
    collectionListCont: {
        height: "100%",
        paddingBottom: "5%",
    },
    collectionHeaderImage: {
        width: "60%",
    },
    collectionHeaderCont: {
        // width: "100%",
        paddingLeft: "5%",
        // margin: "0 auto",
    },
    collectionList: {
        width: "100%",
    },
    accordionRoot: {
        width: "100%",
    },
    accordionHeading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
        color: theme.palette.tertiary.dark,
    },
    accordionDetails: {
        width: "90%",
        margin: "0 auto",
    },
    accordionDataItemSelected: {
        border: `3px solid ${theme.palette.tertiary.main}`,
        padding: "4px",
        cursor: "pointer",
        height: "100px",
        width: "100px",
        objectFit: "cover",
        borderBottomRightRadius: theme.spacing(4),
        borderTopLeftRadius: theme.spacing(4),
        "&:hover": {
            border: `3px solid ${theme.palette.tertiary.dark}`,
        },
    },
    accordionDataItem: {
        padding: "6px",
        cursor: "pointer",
        height: "100px",
        width: "100px",
        objectFit: "cover",
        borderBottomRightRadius: theme.spacing(4),
        borderTopLeftRadius: theme.spacing(4),
    },
    collectionItemHeader: {
        fontFamily: theme.typography.fontFamily.split(",")[2],
        fontSize: "2.5rem",
        color: theme.palette.primary.light,
    },
    collectionItemImg: {
        width: "90%",
        objectFit: "cover",
        maxWidth: "200px",
        maxHeight: "150px",
        borderBottomRightRadius: theme.spacing(6),
        borderTopLeftRadius: theme.spacing(6),
    },
    collectionItemDescription: {
        fontStyle: "italic",
        fontFamily: theme.typography.fontFamily.split(",")[1],
        color: theme.palette.grey[700],
    },
    collectionItemImgMobile: {
        width: "100%",
        objectFit: "cover",
        maxWidth: "350px",
        maxHeight: "170px",
        borderBottomRightRadius: theme.spacing(6),
        borderTopLeftRadius: theme.spacing(6),
    },
    collectionCustomiseHeader: {
        fontFamily: theme.typography.fontFamily.split(",")[2],
        color: theme.palette.primary.light,
        fontSize: 40,
        textAlign: "center",
        paddingTop: 0,
        [theme.breakpoints.down("md")]: {
            fontSize: 32,
        },
        [theme.breakpoints.only("xs")]: {
            paddingTop: "2%",
        },
    },
    designerTipHeader: {
        fontFamily: theme.typography.fontFamily.split(",")[2],
        color: theme.palette.tertiary.dark,
        fontSize: 30,
        [theme.breakpoints.only("xs")]: {
            fontSize: 28,
        },
    },
    designerTipMessage: {
        fontFamily: theme.typography.fontFamily.split(",")[1],
        color: theme.palette.grey[800],
        fontStyle: "italic",
    },
    collectionCustomiseProductName: {
        fontFamily: theme.typography.fontFamily.split(",")[1],
        color: theme.palette.grey[800],
        fontSize: 16,
        [theme.breakpoints.only("xs")]: {
            fontSize: 14,
        },
    },
    collectionIncludesHeader: {
        fontFamily: theme.typography.fontFamily.split(",")[2],
        color: theme.palette.primary.light,
        fontSize: 30,
        textAlign: "center",
        [theme.breakpoints.only("xs")]: {
            fontSize: 28,
        },
    },
    collectionIncludesNumber: {
        fontFamily: theme.typography.fontFamily.split(",")[1],
        color: theme.palette.grey[800],
        fontStyle: "italic",
    },
    collectionIncludesCategoryCont: {
        paddingTop: "2%",
        [theme.breakpoints.down("sm")]: {
            paddingTop: "5%",
        },
    },
    collectionIncludesTotalHeader: {
        paddingTop: "2%",
        [theme.breakpoints.down("sm")]: {
            paddingTop: "5%",
        },
        color: theme.palette.grey[800],
    },
    collectionIncludesTotal: {
        fontFamily: theme.typography.fontFamily.split(",")[1],
        fontWeight: "bold",
        fontSize: 20,
    },
    collectionIncludesTotalNumber: {
        fontFamily: theme.typography.fontFamily.split(",")[1],
        fontWeight: "bold",
        fontSize: 20,
    },
    customizedCollectionAccordionCont: {
        width: "100%",
        margin: "auto",
        paddingTop: "2%",
    },
    collectionsHeader: {
        fontFamily: theme.typography.fontFamily.split(",")[2],
        fontSize: 60,
        color: theme.palette.primary.light,
        textAlign: "center",
        marginBottom: "2%",
        [theme.breakpoints.down("sm")]: {
            fontSize: 40,
        },
    },
    // collectionCustomiseCont: {
    //     paddingTop: "1%",
    // },
    collectionIncludesCont: {
        paddingTop: "1%",
    },
    collectionIncludesAddToCartButtonCont: {
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            paddingTop: theme.spacing(2),
        },
    },
}))

export default useStyles
