"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StokBarang extends Model {
    static associate(models) {
      // define association here
    }
  }
  StokBarang.init(
    {
      nama_barang: DataTypes.STRING,
      stok: DataTypes.INTEGER,
      jumlah_terjual: DataTypes.INTEGER,
      tanggal_transaksi: DataTypes.DATE,
      jenis_barang: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StokBarang",
    }
  );
  return StokBarang;
};
