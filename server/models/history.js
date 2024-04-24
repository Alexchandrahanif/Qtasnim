"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      //
    }
  }
  History.init(
    {
      keterangan: DataTypes.STRING,
      jumlah: DataTypes.INTEGER,
      UserId: DataTypes.UUID,
      InventoryId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  return History;
};
