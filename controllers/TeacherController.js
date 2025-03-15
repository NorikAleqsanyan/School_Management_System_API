const { Group, Student } = require("../models");
const { schemagradeStudent } = require("../schema");

class TeacherController {
  static async getGroups(req, res) {
    try {
      const groups = await Group.findAll({
        where: { teacherId: req.params.id },
      });
      if (!groups) {
        return res.send({ message: "Groups not found" });
      }
      return res.send({ groups });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }
  static async getGroupStudent(req, res) {
    try {
      const group = await Group.findOne({
        where: { teacherId: req.params.id },
      });
      if (!group) {
        return res.send({ message: "Group not found" });
      }
      const student = await Student.findAll({
        wher: { groupId: group.id },
      });
      if (!student) {
        return res.send({ message: "Student not found" });
      }
      return res.send({ student });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }

  static async gradeStudent(req, res) {
    try {
      const { error, value } = schemagradeStudent.validate(req.body);
      if (error) {
        return res.send({ value, error: error.details });
      }

      const { id, grade } = req.body;

      const student = await Student.findOne({ where: { id } });
      if (!student) {
        return res.status(404).send({ message: "Student not found" });
      }

      if (!student.grades) {
        student.grades = [];
      }

      student.grades.push(grade);

      await student.update({ grades: student.grades });

      return res.send({ message: "Grade added successfully", student });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = { TeacherController };
