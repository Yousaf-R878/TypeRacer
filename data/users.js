import { users } from "../config/mongoCollections";
import * as validation from "../validation.js"

const usersCollection = await users();

const getAllUsers = async () => {
    const users = await usersCollection.find({}).toArray();
    return users;
}

const getUser = async (id) => {
    const id = validation.checkId(id, "userID");
    const user = await usersCollection.findOne({ _id: id });
    return user;
}

const createUser = async (username, email, password) => {

}

const updateUser = async (id, username, email, password) => {

}
const exportedMethods = {
    getAllUsers,
    getUser,
    createUser,
    updateUser
}

export default exportedMethods;