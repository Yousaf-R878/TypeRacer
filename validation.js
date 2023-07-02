
export function checkId(id, type = "Object", funcName = "Unknown function") {
    if (!id || typeof id !== "string") {
        throw `Error in ${funcName}: ${type} ID is required and must be a string`;
    }
    if (id.length === 0)
        throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) {
        throw `Error in ${funcName}: ${type} ID invalid object ID`;
    }
    return id.trim();
}

export function checkUserName(userName, varName){

}

export function checkEmail(email, varName){

}

export function checkPassword(password, varName){

}

