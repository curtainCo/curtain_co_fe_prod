import React, { useState, useEffect } from "react"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { Grid } from "@material-ui/core"
import useStyles from "../collections/CollectionStyles"
import { capitalize } from "../../helpers/appHelpers"
import AccordionDataItem from "../collections/collection/AccordionDataItem"

export default function CustomAccordion({
    summary,
    data,
    tip,
    handleCustomization,
    open,
    isMobile,
}) {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)

    // SHOW THE TIPS IF THE ACCORDION IS EXPANDED
    function handleChange() {
        setExpanded(!expanded)
    }
    // THIS CATCHES THE DEFAULT EXPANDED ACCORDION AND SHOWS THE TIP
    useEffect(() => {
        if (open) setExpanded(true)
    }, [open])

    return (
        <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            spacing={isMobile ? 1 : 5}
            direction={isMobile ? "column" : "row"}
        >
            <Grid item xs={12} sm={8}>
                <div className={classes.accordionRoot}>
                    <Accordion defaultExpanded={open} onChange={handleChange}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.accordionHeading}>
                                {summary}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetails}>
                            <Grid
                                container
                                justifyContent="space-around"
                                alignItems="center"
                                // spacing={3}
                            >
                                <AccordionDataItem
                                    data={data}
                                    handleCustomization={handleCustomization}
                                    isMobile={isMobile}
                                />
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Grid>

            <Grid item container alignItems="flex-start" xs={12} sm={4}>
                <Grid item xs={12}>
                    <Typography
                        variant="h5"
                        component="h5"
                        className={classes.designerTipHeader}
                    >
                        Designer Tip
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.designerTipMessage}>
                        {expanded ? capitalize(tip) : ""}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}
