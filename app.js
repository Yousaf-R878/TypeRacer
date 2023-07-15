import express from "express";
import configRoutes from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname, format } from "path";
import exphbs from "express-handlebars";
import path from "path";
import e from "express";
import {userData} from "./data/index.js";
import { dbConnection } from "./config/mongoConnection.js";

process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const viewsDir = path.join(__dirname, "views");
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", viewsDir);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const staticDir = express.static(__dirname + "/public");
app.use("/public", staticDir);


configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});



//drop mongo connection
const db = await dbConnection();
await db.dropDatabase();

let user = await userData.createUser("test", "test", "test");
console.log(user);

//await userData.updateUser(user._id, "test2", "test2", "test2");
