const { Sequelize } = require("sequelize");
const sequelize = require("../../../sequelize.js");

class User extends Sequelize.Model {
  static initialize() {
    this.init(
      {
        id: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        code: {
          type: Sequelize.TEXT,
          allowNull: false,
          charset: "latin1",
          collate: "latin1_general_ci",
        },
        access_token: {
          type: Sequelize.TEXT,
          allowNull: true,
          charset: "latin1",
          collate: "latin1_general_ci",
        },
        client_id: {
          type: Sequelize.TEXT,
          allowNull: false,
          charset: "latin1",
          collate: "latin1_general_ci",
        },
        client_secret: {
          type: Sequelize.TEXT,
          allowNull: false,
          charset: "latin1",
          collate: "latin1_general_ci",
        },
        user_id: {
          type: Sequelize.TEXT,
          allowNull: true,
          charset: "latin1",
          collate: "latin1_general_ci",
        },
        last_updated: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: false,
      }
    );
  }

  static async getUsers() {
    try {
      const user = await this.findByPk(1);

      if (!user) {
        return null;
      }

      const {
        access_token,
        code,
        client_id,
        client_secret,
        user_id,
      } = user.toJSON();

      return { access_token, code, client_id, client_secret, user_id };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

User.initialize();

module.exports = User;
