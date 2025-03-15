module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    groupId: Sequelize.INTEGER,
    grades: {
      type: Sequelize.JSON,
      defaultValue: [],
    },
  });
  return Student;
};
