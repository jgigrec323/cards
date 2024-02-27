// Button.js
const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Button = db.define(
  "Button",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    textColor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bgColor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "button",
    timestamps: false,
  }
);

module.exports = Button;
