"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      History.belongsTo(models.StokBarang, {
        foreignKey: "StokBarangId",
      });
      History.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  History.init(
    {
      id: {
        allowNull: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      keterangan: DataTypes.STRING,
      jumlah: DataTypes.INTEGER,
      UserId: DataTypes.UUID,
      StokBarangId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  return History;
};
