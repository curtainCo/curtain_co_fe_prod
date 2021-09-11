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

async function sendConfirmationEmail(email) {
    // call to server to check if valid email
    // sends email or returns error
    const response = await api.post("/forgot-password", email)
    if (response.status !== 200) {
        throw new Error("Email address not found.")
    }
    return response
}

async function checkResetPasswordToken(token) {
    // call to server to check if token is valid
    // const response = await api.get("/forgot-password", token)
    // if (response.status !== 200) {
    //     console.log("token not valid")
    //     throw new Error("Something went wrong. Please try again.")
    // }
    if (token !== "test") {
        console.log("token not valid")
        throw new Error("Something went wrong. Please try again.")
    }
    return { data: { email: "simosultan2020@gmail.com" } }
}

async function resetPassword(password) {
    // call to server to update password
    const response = await api.post("/reset-password", password)
    if (response.status !== 200) {
        throw new Error("Something went wrong. Password not updated.")
    }
    return response
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
