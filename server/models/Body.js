// Body.js
const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Body = db.define(
  "Body",
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
    tableName: "body",
    timestamps: false,
  }
);

module.exports = Body;
