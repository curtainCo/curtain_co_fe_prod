import { capitalize, isEmpty } from "./appHelpers"

function loginFieldAreBad(field, type) {
    if (field === "") {
        return "Field must not be empty"
    }
    if (type === "email") {
        let check = emailHasBadFormatting(field)
        if (check) return check
    }

    if (type === "password") {
        let check = passwordHasBadFormatting(field)
        if (check) return check
    }

    return false
}

function emailHasBadFormatting(field) {
    if (!field.includes("@") || !field.includes(".")) {
        return "Email is badly formatted"
    }
    return false
}

function passwordHasBadFormatting(field) {
    if (field.length < 6 || field.length > 32) {
        return "Password must be between 6 and 32 characters"
    }
    return false
}

function areAnyFieldsInUserDataFormAreEmpty(userDetails) {
    let errorObject = {}

    for (const key in userDetails) {
        if (Object.hasOwnProperty.call(userDetails, key)) {
            let wordForErrorMessage = capitalize(key)
            const value = userDetails[key]
            // CHECK IF ANY OF THE FIELDS ARE EMPTY OR UNDEFINED
            if (value === "" || value === undefined) {
                // IF THEY ARE, CAPITALIZE THE NAME FOR THE ERROR MESSAGE
                // AND ALTER CERTAIN WORDS TO DISPLAY BETTER
                switch (wordForErrorMessage) {
                    case "Address1":
                        wordForErrorMessage = "Address"
                        break
                    case "FirstName":
                        wordForErrorMessage = "First Name"
                        break
                    case "LastName":
                        wordForErrorMessage = "Last Name"
                        break
                    default:
                        break
                }

                // SKIP TITLE AND COMPANY NAME AS THEY ARE NOT REQUIRED BY MODEL
                if (key === "title" || key === "companyName") {
                    continue
                }

                // FILL THE OBJECT WITH THE NAME OF THE FIELD AND THE ERROR TO DISPLAY FOR IT
                errorObject[key] = `${wordForErrorMessage} must not be empty`
            }

            // CATCH INCORRECT POSTCODES
            if (key === "postcode" && value.length !== 4) {
                errorObject[key] = `${wordForErrorMessage} must be 4 numbers`
            }

            // CATCH PASSWORDS NOT BETWEEN 6 AND 32
            if (key === "phone") {
                if (value.length !== 10) {
                    errorObject[
                        key
                    ] = `Mobile ${wordForErrorMessage} must be 10 numbers`
                } else if (value[0] !== "0" && value[1] !== "4") {
                    errorObject[
                        key
                    ] = `Mobile ${wordForErrorMessage} format 04xxxxxxxx`
                }
            }

            // CATCH PASSWORDS NOT BETWEEN 6 AND 32
            if (key === "password") {
                let check = passwordHasBadFormatting(value)
                if (check) errorObject[key] = check
            }

            // CATCH PASSWORDS NOT BETWEEN 6 AND 32
            if (key === "email") {
                let check = emailHasBadFormatting(value)
                if (check) errorObject[key] = check
            }
        }
    }

    // IF THE OBJECT IS STILL EMPTY, THEN NO ERRORS WERE FOUND
    if (isEmpty(errorObject)) {
        return false
    }

    // OTHERWISE RETURN THE OBJECT
    return errorObject
}

export { loginFieldAreBad, areAnyFieldsInUserDataFormAreEmpty }
