module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("group", {
        name: Sequelize.STRING,
        teacherId: Sequelize.INTEGER,
        studentCount: Sequelize.INTEGER,
    });
    return Group;
};
