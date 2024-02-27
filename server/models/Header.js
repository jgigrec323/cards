// Header.js
const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Header = db.define(
  "Header",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "header",
    timestamps: false,
  }
);

module.exports = Header;
