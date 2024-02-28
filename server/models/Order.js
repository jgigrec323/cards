// Order.js
const { DataTypes } = require("sequelize");
const db = require("../config/database");
const OrderSummary = require("./OrderSummary");
const Card = require("./Card");

const Order = db.define(
  "Order",
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
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderSummaryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    timestamps: false,
  }
);
Order.belongsTo(OrderSummary);
Order.belongsTo(Card);
module.exports = Order;
