import React, { useState } from "react"
// STYLES
import {
    Container,
    Grid,
    Typography,
    Button,
    useMediaQuery,
} from "@material-ui/core"
import useStyles from "./UserDashboardStyles"
// STATE
import { useCurtainContext } from "../../../config/CurtainCoContext"
import { ACTIONS } from "../../../config/stateReducer"
// HELPERS AND SERVICES
import {
    getFirstNameFromFullName,
    getLastNameFromFullName,
} from "../../../helpers/userHelpers"
import { updateUserInformation } from "../../../services/userServices"
import {
    setErrorSnackBar,
    setSuccessSnackBar,
} from "../../../helpers/appHelpers"
// COMPONENTS
import ShowUserInformation from "./ShowUserInformation"
import EditUserInformation from "./EditUserInformation"

function ProfileInformation({ isMobile }) {
    const classes = useStyles()
    const { state, dispatch } = useCurtainContext()
    const [editUser, setEditUser] = useState(false)

    function toggleEditUserForm() {
        setEditUser(!editUser)
    }

    function handleUpdate(userDetails) {
        let updateError = false
        let userId = state.currentUser._id

        updateUserInformation(userDetails, userId)
            .then((resp) => {
                if (resp.status === 200) {
                    dispatch({
                        type: ACTIONS.SET_CURRENT_USER,
                        payload: resp.data,
                    })

                    setSuccessSnackBar(dispatch, "Account successfully updated")
                    console.log("User successfully updated")
                }
            })
            .catch((error) => {
                updateError = `An error ocurred on updating information: ${error.response}.`
                console.log(updateError)
                setErrorSnackBar(
                    dispatch,
                    "Error: Something went wrong, profile information not updated "
                )
            })

        toggleEditUserForm()
        return updateError
    }
    return (
        <Grid item container direction="column" spacing={2}>
            <Grid item>
                <Typography
                    variant="h4"
                    className={classes.userDashboardSubheading}
                    style={{ fontSize: isMobile ? 34 : 46 }}
                >
                    {`${
                        state.currentUser.title !== undefined
                            ? state.currentUser.title
                            : ""
                    } ${getFirstNameFromFullName(
                        state.currentUser.fullName
                    )} ${getLastNameFromFullName(state.currentUser.fullName)}`}
                </Typography>
            </Grid>

            <Grid item>
                {editUser ? (
                    <EditUserInformation
                        user={state.currentUser}
                        handleUpdate={handleUpdate}
                    />
                ) : (
                    <ShowUserInformation
                        user={state.currentUser}
                        isMobile={isMobile}
                    />
                )}
            </Grid>

            <Grid item container justifyContent="center">
                <Button
                    variant="contained"
                    color={editUser ? "default" : "secondary"}
                    onClick={toggleEditUserForm}
                >
                    {editUser ? "Cancel" : "Edit Information"}
                </Button>
            </Grid>
        </Grid>
    )
}

export default ProfileInformation
