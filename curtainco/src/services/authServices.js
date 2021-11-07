import api from "../config/api"

async function registerUser(userInfo) {
    // call to server to login user
    // return user info if successful and error if not
    const response = await api.post("/account/register", userInfo)
    // console.log(response)

    // console.log("user created")
    return response
}

async function loginUser(userInfo) {
    // call to server to login user
    // return user info if successful and error if not
    const response = await api.post("/account", userInfo)
    // console.log("got user back from server")
    return response
}

async function logoutUser() {
    // call to server to logout user
    // return api.get("/account/logout")
    const response = await api.get("/account/logout")
    // console.log("logging out")
    return response
}

async function getLoggedInUserFromHomeRoute() {
    // call to server to logout user
    const response = await api.get("/")
    return response
}

function sendConfirmationEmail(email) {
    // call to server to check if valid email
    // sends email or returns error
    return api.post("/forgot-password", email)
}

function checkResetPasswordToken(token) {
    // call to server to check if token is valid
    const resp = api.get("/reset-password", { resetPasswordToken: token })
    if (resp.status !== 200) {
        console.log("token not valid")
        throw new Error(
            "Something went wrong. Please try resetting your password again again."
        )
    }
    return resp
}

function resetPassword(payload) {
    // call to server to update password
    return api.post("/reset-password", payload)
}

export {
    registerUser,
    loginUser,
    logoutUser,
    getLoggedInUserFromHomeRoute,
    sendConfirmationEmail,
    checkResetPasswordToken,
    resetPassword,
}
