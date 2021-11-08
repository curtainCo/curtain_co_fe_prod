import api from "../config/api"

async function registerUser(user) {
    // call to server to login user
    // return user info if successful and error if not
    const response = await api.post("/account/register", user)
    // console.log(response)

    // console.log("user created")
    return response
}

async function loginUser(user) {
    // call to server to login user
    // return user info if successful and error if not
    return await api.post("/account", user)
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

async function sendConfirmationEmail(email) {
    // call to server to check if valid email
    // sends email or returns error
    try {
        return await api.post("/forgot-password", email)
    } catch (error) {
        console.log(error)
        return false
    }
}

async function checkResetPasswordToken(token) {
    // call to server to check if token is valid
    const resp = await api.get(`/reset-password?resetPasswordToken=${token}`)
    if (resp.status !== 200) {
        console.log("token not valid")
        throw new Error(
            "Something went wrong. Please try resetting your password again again."
        )
    }
    return resp
}

function resetPassword(updatedUserInfo) {
    // call to server to update password
    return api.post("/reset-password", updatedUserInfo)
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
