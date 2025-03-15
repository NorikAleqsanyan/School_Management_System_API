const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("SecureClass", "root", "", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
});

const User = require("./User")(sequelize, Sequelize);
const Manager = require("./Manager")(sequelize, Sequelize);
const Student = require("./Student")(sequelize, Sequelize);
const Teacher = require("./Teacher")(sequelize, Sequelize);
const Group = require("./Group")(sequelize, Sequelize);

Manager.belongsTo(User, {
    foreignKey: "userId",
    onupdate: "cascade",
    ondelete: "cascade",
});

Student.belongsTo(User, {
    foreignKey: "userId",
    onupdate: "cascade",
    ondelete: "cascade",
});
Teacher.belongsTo(User, {
    foreignKey: "userId",
    onupdate: "cascade",
    ondelete: "cascade",
});

User.hasOne(Manager, { foreignKey: "userId" });
User.hasOne(Teacher, { foreignKey: "userId" });
User.hasOne(Student, { foreignKey: "userId" });

Group.hasMany(Student, { foreignKey: "groupId" });

sequelize.sync();
module.exports = {
    User,
    Manager,
    Student,
    Teacher,
    Group,
};
