// UserPerso.js
const { DataTypes } = require("sequelize");
const db = require("../config/database");
const SocialMedia = require("./SocialMedia");

const UserPerso = db.define(
  "UserPerso",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fonction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cvFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    texts_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Texts",
        key: "id",
      },
    },
    footer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Footer",
        key: "id",
      },
    },
    body_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Body",
        key: "id",
      },
    },
    header_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Header",
        key: "id",
      },
    },
    button_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Button",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "User",
        key: "id",
      },
    },
    social_media_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "SocialMedia",
        key: "id",
      },
    },
  },
  {
    tableName: "userPerso",
    timestamps: false,
  }
);
UserPerso.belongsTo(SocialMedia, { foreignKey: "social_media_id" });

module.exports = UserPerso;
