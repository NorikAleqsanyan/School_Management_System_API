const express = require("express");
const { ManagerController } = require("../controllers/ManagerController");
const manager = express.Router();

manager.get("/groups",ManagerController.getGroups);

manager.post("/teacher",ManagerController.addTeacher);
manager.post("/teacher",ManagerController.addGroup);
manager.post("/student", ManagerController.addStudent);

manager.patch("/studentGroup/:id", ManagerController.updateStudentGroup);

manager.delete("/group/:id",ManagerController.deleteGroup);
manager.delete("/student/:id",ManagerController.deleteStudent);


module.exports = { manager };
