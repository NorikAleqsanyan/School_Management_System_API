const { Group, Student, Teacher } = require("../models");
class StudentController {
    //get
    static async getStudentGroup(req, res) {
        try {
            const student = await Student.findOne({
                where: { id: req.params.id },
            });
            if (!student) {
                return res.send({ message: "Student not found!" });
            }
            const group = await Group.findOne({
                where: { id: student.groupId },
            });
            return res.send({ group });
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }
    static async getTeacher(req, res) {
        try {
            const student = await Student.findOne({
                where: { id: req.params.id },
            });
            if (!student) {
                return res.send({ message: "Student not found!" });
            }
            const group = await Group.findOne({
                where: { id: student.groupId },
            });
            const teacher = await Teacher.findOne({
                where: { id: group.teacherId },
            });
            if (!teacher) {
                return res.send({ message: "Teacher not found!" });
            }
            return res.send({ teacher });
        } catch (error) {
            return res.status(400).send({
                message: error.message,
            });
        }
    }
    static async getStudentsByGroup(req, res) {
        try {
            const student = await Student.findOne({
                where: { id: req.params.id },
            });
            if (!student) {
                return res.send({ message: "Student not found!" });
            }
            const group = await Group.findOne({
                where: { id: student.groupId },
            });
            const students = await Student.findAll({
                where: { groupId: group.id },
            });

            return res.send({students});
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }
    static async getGrade(req, res) {
        try {
            const student = await Student.findOne({
                where: { id: req.params.id },
            });
            if (!student) {
                return res.send({ message: "Student not found!" });
            }

            return res.send({ grade: student.grade });
        } catch (error) {
            return res.status(400).send({
                message: error.message,
            });
        }
    }
}
module.exports = { StudentController };
