import React, { useState } from "react"
// HELPERS AND SERVICES
import { submitConsultationRequest } from "../../services/consultationServices"
import { setErrorSnackBar } from "../../helpers/appHelpers"
// STATE
import { useCurtainContext } from "../../config/CurtainCoContext"
import { ACTIONS } from "../../config/stateReducer"
// STYLES
import { CssBaseline, Box, Typography } from "@material-ui/core"
import useStyles from "./ConsultationStyles"
// COMPONENTS
import Copyright from "../authentication/Copyright"
import UserDataForm from "../reusable/UserDataForm"

export default function SignUp() {
    const classes = useStyles()

    const { state, dispatch } = useCurtainContext()
    const [message, setMessage] = useState({ message: "" })

    async function getUserDetailsFromFormAndSubmit(request) {
        try {
            let resp = await submitConsultationRequest(request)
            console.log(resp)
            if (resp.status === 201) {
                dispatch({
                    type: ACTIONS.ADD_CONSULTATION,
                    payload: request,
                })
                setMessage({ message: "" })
                return resp
            }
        } catch (error) {
            console.log(
                `Error occurred when submitting the consultation request. ${error.response.data.message}`
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
        <>
            {/* <CssBaseline /> */}

            <div className={classes.paper}>
                <UserDataForm
                    currentUser={state.currentUser}
                    handleSubmitFunctionFromParent={
                        getUserDetailsFromFormAndSubmit
                    }
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
            </div>

            <Box mt={5}>
                <Copyright />
            </Box>
        </>
    )
}
