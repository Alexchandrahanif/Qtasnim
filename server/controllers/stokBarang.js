const { StokBarang, History, User } = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

class Controller {
  // GET ALL
  static async getAll(req, res, next) {
    try {
      const { limit, page, search, tanggal } = req.query;

      let pagination = {
        where: {},
        order: [["nama_barang", "ASC"]],
        limit: limit ? limit : 50,
      };

      if (limit) {
        pagination.limit = limit;
      }

      if (page && limit) {
        pagination.offset = (page - 1) * limit;
      }

      if (search) {
        pagination.where = {
          [Op.or]: [{ nama_barang: { [Op.iLike]: `%${search}%` } }],
        };
      }

      if (tanggal) {
        const pagi = moment().format(`${tanggal} 00:00`);
        const masuk = moment().format(`${tanggal} 23:59`);
        pagination.where = {
          createdAt: {
            [Op.between]: [pagi, masuk],
          },
        };
      }

      let dataStokBarang = await StokBarang.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataStokBarang.count / (limit ? limit : 50));

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Stok Barang",
        data: dataStokBarang.rows,
        totaldataStokBarang: dataStokBarang.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ONE
  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const data = await StokBarang.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Stok barang Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Stok Barang",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async create(req, res, next) {
    try {
      const { nama_barang, stok, jenis_barang } = req.body;

      let body = {
        nama_barang,
        stok,
        jenis_barang,
        jumlah_terjual: 0,
        tanggal_transaksi: new Date(),
      };

      const data = await StokBarang.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Stok Barang",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ADDING STOK
  static async addingStock(req, res, next) {
    try {
      const { id } = req.params;

      const { jumlah } = req.body;

      const data = await StokBarang.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Stok barang Tidak Ditemukan" };
      }

      let body = {
        keterangan: "Barang Masuk",
        jumlah: jumlah,
        UserId: req.user.id,
        StokBarangId: id,
      };

      await History.create(body);

      await StokBarang.update(
        {
          stok: +data.stok + +jumlah,
          tanggal_transaksi: new Date(),
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menambahkan Data Stok Barang",
      });
    } catch (error) {
      next(error);
    }
  }

  // ADDING STOK
  static async reduceStock(req, res, next) {
    try {
      const { id } = req.params;

      const { jumlah } = req.body;

      const data = await StokBarang.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Stok barang Tidak Ditemukan" };
      }

      if (jumlah > data.stok) {
        throw {
          name: "Stok Tersedia Kurang Dari",
          stok: jumlah,
          sisa: data.stok,
        };
      }

      let body = {
        keterangan: "Barang Keluar",
        jumlah: jumlah,
        UserId: req.user.id,
        StokBarangId: id,
      };

      await History.create(body);

      await StokBarang.update(
        {
          stok: +data.stok - +jumlah,
          tanggal_transaksi: new Date(),
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mengurangi Data Stok Barang",
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { nama_barang, jenis_barang } = req.body;

      const data = await StokBarang.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Stok barang Tidak Ditemukan" };
      }

      await StokBarang.update({ nama_barang, jenis_barang }, { where: { id } });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Stok Barang",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const data = await StokBarang.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Stok barang Tidak Ditemukan" };
      }

      await StokBarang.destroy({ where: { id } });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Stok Barang",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
