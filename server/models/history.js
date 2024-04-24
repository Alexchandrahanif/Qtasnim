"use strict";
const { Model } = require("sequelize");
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
