const express = require("express");
const { TeacherController } = require("../controllers/TeacherController");
const teacher = express.Router();

teacher.get("/groups",TeacherController.getGroups);
teacher.get("/groupStudents",TeacherController.getGroupStudent);

teacher.patch("/gradeStudent/:id", TeacherController.gradeStudent);


module.exports = { teacher };
