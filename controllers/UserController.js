const { User, Group, Student } = require("../models");
const { schemaUserData, schemaUpdatePassword } = require("../schema");

class UserController {

  static async searchGroupsByName(req, res) {
    try {
      const groupName = req.query.name;

      if (!groupName) {
        return res.status(400).send({ message: "Group name must be provided" });
      }

      const groups = await Group.findAll({
        where: {
          name: {
            [Sequelize.Op.iLike]: `%${groupName}%`,
          },
        },
      });

      if (groups.length === 0) {
        return res.status(404).send({ message: "Group not finde" });
      }
      const students = await Student.findAll({
        where: { groupId: groups.id },
      });
      return res.send({ groups, students });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }

  static async getUser(req, res) {
    try {
      if (!req.user) {
        return res.send({ message: "User not found!" });
      }

      return res.send({ user: req.user });
    } catch (error) {
      console.error(error.message);
      return res.send({
        message: "An error occurred while retrieving user data.",
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const { error, value } = schemaUserData.validate(req.body);
      if (error) {
        return res.status(400).send({ value, error: error.details });
      } else {
        const { name, surname } = req.body;
        const user = await User.findByPk(req.user.id);

        if (!user) {
          return res.send({ message: "User not found!" });
        }
        User.update({
          name: name,
          surname: surname,
        });

        return res.send({ message: "User updated successfully", user });
      }
    } catch (error) {
      console.error(error.message);
      return res.send({
        message: "An error occurred while updating user data.",
      });
    }
  }

  static async updateUserPassword(req, res) {
    try {
      const { error, value } = schemaUpdatePassword.validate(req.body);
      if (error) {
        return res.status(400).send({ value, error: error.details });
      } else {
        const { oldPassword, Password, confimPassword } = req.body;
        const user = await User.findByPk(req.user.id);

        if (!user) {
          return res.send({ message: "User not found!" });
        }

        if (user.password !== oldPassword) {
          return res.send({ message: "Old password is incorrect!" });
        }

        if (Password !== confimPassword) {
          return res.send({
            message: "New password and confirmation do not match!",
          });
        }
        User.update({
          password: Password,
        });

        return res.send({ message: "User updated successfully", user });
      }
    } catch (error) {
      console.error(error.message);
      return res.send({
        message: "An error occurred while updating user data.",
      });
    }
  }
  // delete
  static async deleteUser(req, res) {
    try {
      if (req.user.type !== 2) {
        return res.send({
          message: "Forbidden: You don't have permission to delete this user!",
        });
      }

      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.send({ message: "User not found!" });
      }

      await user.destroy();

      return res.send({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error.message);
      return res.send({
        message: "An error occurred while deleting user data.",
      });
    }
  }
}

module.exports = { UserController };
