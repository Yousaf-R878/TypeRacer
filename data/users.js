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
    username = validation.checkUserName(username, "username");
    email = validation.checkEmail(email, "email");
    password = validation.checkPassword(password, "password");
    const newUser = {
        username: username,
        email: email,
        password: password,
        races: []
    }
    const user = await usersCollection.findOne({email: email});
    if(user){
        throw `Error: User with email ${email} already exists`;
    }
    const insertInfo = await usersCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw "Could not add user";

    return user;

}

const updateUser = async (id, username, email, password) => {
    const id = validation.checkId(id, "userID");
    username = validation.checkUserName(username, "username");
    email = validation.checkEmail(email, "email");
    password = validation.checkPassword(password, "password");
    const updatedUser = {
        username: username,
        email: email,
        password: password
    }
    const user = await usersCollection.findOne({ _id: id });
    if (!user) throw "User not found";

    const updateInfo = await usersCollection.updateOne({ _id: id }, { $set: updatedUser }, {returnDocument: 'after'});
    if (updatedInfo.lastErrorObject.n === 0) {
        throw [404,'could not update message successfully'];
    }

    return await this.getUser(id);
}


const exportedMethods = {
    getAllUsers,
    getUser,
    createUser,
    updateUser
}

export default exportedMethods;