import React, { useState, useEffect } from "react"
// STYLES
import Container from "@material-ui/core/Container"
// STATE
import { useCurtainContext } from "../../config/CurtainCoContext"
import { ACTIONS } from "../../config/stateReducer"
// HELPERS AND SERVICES
import { registerUser, loginUser } from "../../services/authServices"
// COMPONENTS
import Copyright from "./Copyright"
import { UserDataForm } from "../export"
import LoadingSymbol from "../reusable/LoadingSymbol"
// PACKAGES
import { Redirect, useHistory } from "react-router-dom"
import {
    setErrorAlert,
    setErrorSnackBar,
    setWarningSnackBar,
} from "../../helpers/appHelpers"

export default function SignUp() {
    const history = useHistory()
    const { state, dispatch } = useCurtainContext()
    const [prevUrl, setPrevUrl] = useState("/")
    const [isLoading, setIsLoading] = useState(false)

    function handleRegister(userDetails) {
        let registerError = false
        // REGISTER THE USER
        setIsLoading(true)
        registerUser(userDetails)
            .then((regResp) => {
                // console.log(regResp)
                if (regResp.status === 201)
                    console.log("User successfully signed up")
            })
            .then(() => {
                let { email, password } = userDetails
                // AFTER THE USER HAS BEEN CREATED LOG THE USER IN
                loginUser({ email, password })
                    .then((logResp) => {
                        let currentUser = logResp.data.user

                        if (currentUser && logResp.status === 200) {
                            const timeOut = setTimeout(() => {
                                window.location.reload()
                            }, 3600000)
                            console.log("timeout set, with ID", timeOut)
                            dispatch({
                                type: ACTIONS.LOGIN,
                                payload: currentUser,
                                timeOut,
                            })
                        }
                    })
                    .catch((error) => {
                        registerError = `An error ocurred on logging in after registering: ${error.response.data.message}.`
                        console.log(registerError)
                        console.log(error.response)
                        setWarningSnackBar(
                            dispatch,
                            "Warning: You were signed up, but an error occurred when logging in. Please just log in"
                        )
                    })
            })

            .catch((error) => {
                registerError = `An error ocurred on register. ${error.response.data.message}`
                console.log(registerError)
                console.log(error.response)
                setErrorSnackBar(dispatch, "Error: This email already exists")
            })

        setIsLoading(false)
        return registerError
    }

    // AFTER USER LOGS IN, REDIRECT THEM TO THE PREVIOUS PAGE THEY CAME FROM
    useEffect(() => {
        // THIS prevUrl HAS ALREADY BEEN SPLIT ON THE LOGIN PAGE
        // SO WE JUST NEED TO KNOW WHAT THE VALUE IS
        if (history.location.state !== undefined) {
            // console.log(history.location.state)
            setPrevUrl(history.location.state.prevUrl)
        }
    }, [history])

    return (
        <>
            {state.currentUser !== null ? (
                <Redirect to={prevUrl} />
            ) : isLoading ? (
                <LoadingSymbol />
            ) : (
                <>
                    <UserDataForm
                        currentUser={state.currentUser}
                        handleSubmitFunctionFromParent={handleRegister}
                        withAuth={{ email: true, password: true }}
                        buttonText={"Sign Up"}
                        headerInformation={{ icon: true, title: "Sign Up" }}
                        withConsultMessage={false}
                    />
                    {/* <Container maxWidth="sm">
                        <Copyright />
                    </Container> */}
                </>
            )}
        </>
    )
}
