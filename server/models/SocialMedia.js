// SocialMedia.js
const { DataTypes } = require("sequelize");
const db = require("../config/database");

const SocialMedia = db.define(
  "SocialMedia",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    whatsapp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    spotify: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pinterest: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    youtube: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Add other social media fields as needed
  },
  {
    tableName: "social_media",
    timestamps: false,
  }
);

module.exports = SocialMedia;
