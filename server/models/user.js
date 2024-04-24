"use strict";
const { Model } = require("sequelize");
const { hashingPassword } = require("../helper/helper");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      nama: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email Sudah Terdaftar",
        },
        validate: {
          notEmpty: {
            msg: "Email Tidak Boleh Kosong",
          },
          notNull: {
            msg: "Email Tidak Boleh Kosong",
          },
          isEmail: {
            msg: "Email harus format Email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Password Sudah Terdaftar",
        },
        validate: {
          notEmpty: {
            msg: "Password Tidak Boleh Kosong",
          },
          notNull: {
            msg: "Password Tidak Boleh Kosong",
          },
        },
      },
      role: DataTypes.STRING,
      nomor_telepon: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Nomor Telepon Tidak Boleh Kosong",
          },
          notNull: {
            msg: "Nomor Telepon Tidak Boleh Kosong",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((data) => {
    data.password = hashingPassword(data.password);
  });
  return User;
};
