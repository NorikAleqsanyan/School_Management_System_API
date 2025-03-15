const { Teacher, Group, Student, User } = require("../models");
const {
  schemaStudentGroupUpdate,
  schemaStudentCreate,
  schemaTeacherCreate,
} = require("../schema");

class ManagerController {
  static async addTeacher(req, res) {
    try {
      const { error, value } = schemaTeacherCreate.validate(req.body);
      if (error) {
        return res.send({ value, error: error.details });
      }

      const { name, surname, password, email } = req.body;

      const teacher = await User.findOne({
        where: { email },
      });
      if (teacher) {
        return res.send({ message: "Email has already been taken." });
      }
      const user = await User.create({
        name,
        surname,
        password,
        email,
      });
      const newTeacher = await Teacher.create({ userId: user.id });
      return res.send({
        teacher: newTeacher,
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }

  static async addGroup(req, res) {
    try {
      const { error, value } = schemaGroupCreate.validate(req.body);
      if (error) {
        return res.send({ value, error: error.details });
      }

      const { groupName, teacherId, studentCount } = req.body;

      const group = await Group.findOne({
        where: { name: groupName },
      });
      if (group) {
        return res.send({ message: "Group with this name already exists." });
      }

      const teacher = await Teacher.findOne({
        where: { id: teacherId },
      });
      if (!teacher) {
        return res.send({ message: "Teacher not found." });
      }

      const newGroup = await Group.create({
        name: groupName,
        teacherId: teacher.id,
        studentCount,
      });

      return res.send({
        group: newGroup,
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }


  static async addStudent(req, res) {
    try {
      const { error, value } = schemaStudentCreate.validate(req.body);
      if (error) {
        return res.send({ value, error: error.details });
      }

      const { name, surname, password, email, groupId } = req.body;

      const student = await User.findOne({
        where: { email },
      });
      if (student) {
        return res.send({ message: "Email has already been taken." });
      }

      const user = await User.create({
        name,
        surname,
        password,
        email,
      });

      const group = await Group.findOne({
        where: { id: groupId },
      });
      if (!group) {
        return res.send({ message: "Group not found." });
      }

      const studentCount = await Student.count({
        where: { groupId },
      });

      if (studentCount >= group.studentCount) {
        return res.send({ message: "No available slots in the group." });
      }

      const newStudent = await Student.create({ userId: user.id, groupId });

      return res.send(newStudent);
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }


  static async getGroups(req, res) {
    try {
      const groups = await Group.findAll();
      return res.send({ groups });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }

  static async deleteGroup(req, res) {
    try {
      const group = await Group.findByPk(req.params.id);
      if (!group) {
        return res.send(false);
      }
      await Group.destroy({
        where: { id: req.params.id },
      });
      return res.send(true);
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }
  static async deleteStudent(req, res) {
    try {
      const student = await Student.findByPk(req.params.id);
      if (!student) {
        return res.send(false);
      }
      await Student.destroy({
        where: { id: req.params.id },
      });
      return res.send(true);
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }

  static async updateStudentGroup(req, res) {
    try {
      const { error, value } = schemaStudentGroupUpdate.validate(req.body);
      if (error) {
        return res.send({ value, error: error.details });
      }
      const student = await Student.findByPk(req.params.id);
      if (!student) {
        return res.send({ message: "Student not found!" });
      }
      const { groupId } = req.body;
      const group = await Group.findOne({
        where: { id: groupId },
      });
      if (!group) {
        return res.send({ message: "Group not found" });
      }
      await Student.update({
        groupId: group.id ? group.id : student.groupId,
      });
      res.send(await Student.findByPk(req.params.id));
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }
}

module.exports = { ManagerController };
