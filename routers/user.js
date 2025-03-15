const express = require("express");
const { UserController } = require("../controllers/UserController");
const user = express.Router();

user.get("/profile", UserController.getUser);
user.get("/searchGroups",UserController.searchGroupsByName)

user.patch("/updateUser", UserController.updateUser);
user.patch("/password", UserController.updateUserPassword);

user.delete("/user", UserController.deleteUser);
module.exports = { user };
