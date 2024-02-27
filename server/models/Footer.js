// Footer.js
const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Footer = db.define(
  "Footer",
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
    tableName: "footer",
    timestamps: false,
  }
);

module.exports = Footer;
