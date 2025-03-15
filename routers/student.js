const express = require("express");
const { StudentController } = require("../controllers/StudentController");
const student = express.Router();

student.get("/studentGroup", StudentController.getStudentGroup);
student.get("/teacher", StudentController.getTeacher);
student.get("/studentsByGroup", StudentController.getStudentsByGroup);
student.get("/grade", StudentController.getGrade);

module.exports = { student };
