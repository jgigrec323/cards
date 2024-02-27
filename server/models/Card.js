// Card.js
const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Card = db.define(
  "Card",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cardName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "cards",
    timestamps: false,
  }
);

module.exports = Card;
