// Texts.js
const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Texts = db.define(
  "Texts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bioColor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fonctionColor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nameColor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "texts",
    timestamps: false,
  }
);

module.exports = Texts;
