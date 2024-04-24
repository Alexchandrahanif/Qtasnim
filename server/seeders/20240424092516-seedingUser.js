"use strict";

const dataUser = require("../data/user.json");
const { hashingPassword } = require("../helper/helper");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    dataUser.forEach((el) => {
      el.password = hashingPassword(el.password);
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Users", dataUser, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null);
  },
};
