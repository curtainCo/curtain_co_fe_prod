import React, { useState } from "react"
// HELPERS AND SERVICES
import { submitConsultationRequest } from "../../services/consultationServices"
import { setErrorSnackBar, setSuccessSnackBar } from "../../helpers/appHelpers"
// STATE
import { useCurtainContext } from "../../config/CurtainCoContext"
import { ACTIONS } from "../../config/stateReducer"
// STYLES
import { Grid } from "@material-ui/core"
import useStyles from "./ConsultationStyles"
// COMPONENTS
// import Copyright from "../authentication/Copyright"
import UserDataForm from "../reusable/UserDataForm"

export default function RequestConsultation({ history }) {
    const classes = useStyles()

    const { state, dispatch } = useCurtainContext()
    const [message, setMessage] = useState({ message: "" })

    async function getUserDetailsFromFormAndSubmit(request) {
        try {
            let resp = await submitConsultationRequest(request)
            // console.log(resp)
            dispatch({
                type: ACTIONS.ADD_CONSULTATION,
                payload: request,
            })
            setMessage({ message: "" })
            setSuccessSnackBar(
                dispatch,
                "Consultation Request has been submitted"
            )
            if (state.currentUser) {
                history.push("/account")
            } else {
                history.push("/")
            }

            return resp
        } catch (error) {
            console.log(
                `Error occurred when submitting the consultation request. ${error}`
            )
            setErrorSnackBar(
                dispatch,
                "Error: Something went wrong and your request was not made"
            )
            return false
        }
    }

    function handleMessageChange(e) {
        setMessage({ message: e.target.value })
    }

    return (
        <Grid
            container
            alignItems="flex-start"
            justifyContent="center"
            item
            md={10}
            className={classes.consultationCont}
            style={{
                height: state.currentUser === null ? "fit-content" : "60vh",
                // this forces the mobile footer to the bottom of the page
                // for a user who is logged in (due to user data form
                // containing only a message input)
            }}
        >
            <UserDataForm
                currentUser={state.currentUser}
                handleSubmitFunctionFromParent={getUserDetailsFromFormAndSubmit}
                withAuth={{ email: true, password: false }}
                headerInformation={{
                    icon: false,
                    title: "Request Consultation",
                }}
                buttonText={"Submit Request"}
                withConsultMessage={{
                    msg: message.message,
                    handleFunction: handleMessageChange,
                }}
            />
        </Grid>
    )
}
