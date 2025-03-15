module.exports = (sequelize, Sequelize) => {
    const Teacher = sequelize.define("teacher", {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
    });
    return Teacher;
};
