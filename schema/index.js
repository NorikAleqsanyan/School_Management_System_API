const Joi = require("joi");

module.exports = {
    schemaTeacherCreate: Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().min(1).max(50).required(),
        password:  Joi.string().min(6).max(12).required(),
        email: Joi.string().email().required(),
    }),//
    schemaStudentCreate: Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().min(1).max(50).required(),
        password:  Joi.string().min(6).max(12).required(),
        email: Joi.string().email().required(),
        groupId: Joi.number().required(),
    }),//
    schemaStudentGroupUpdate: Joi.object({
        name: Joi.string().required(),
        teacherId: Joi.number().required(),
    }),//
    schemagradeStudent: Joi.object({
        grade: Joi.number().min(0).max(10).required(),
    }),//
    schemaLogin: Joi.object({
        username: Joi.string().alphanum().max(30).required(),
        password: Joi.string().min(6).max(12).required(),
    }),
    schemaUpdatePassword: Joi.object({
        oldPassword: Joi.string().min(6).max(12).required(),
        password: Joi.string().min(6).max(12).required(),
        confirmPassword: Joi.ref("password"),
    }),//
    schemaUserData: Joi.object({
        name: Joi.string().alphanum().max(30).required(),
        surname: Joi.string().alphanum().max(30).required(),
    }),//

};
