import { users } from "../config/mongoCollections";

const usersCollection = await users();

const getAllUsers = async () => {

}

const exportedMethods = {
    getAllUsers
}

export default exportedMethods;