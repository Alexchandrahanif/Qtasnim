"use strict";

const dataStokBarang = require("../data/stokBarang.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    dataStokBarang.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("StokBarangs", dataStokBarang, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("StokBarangs", null);
  },
};
