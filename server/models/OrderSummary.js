// OrderSummary.js
const { DataTypes } = require("sequelize");
const db = require("../config/database");

const OrderSummary = db.define(
  "OrderSummary",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "order_summary",
    timestamps: true,
  }
);

module.exports = OrderSummary;
