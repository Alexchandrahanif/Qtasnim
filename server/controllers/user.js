const formatPhoneNumber = require("../helper/formatPhoneNumber");
const {
  createAccessToken,
  comparePassword,
  hashingPassword,
} = require("../helper/helper");

const { User } = require("../models");

class Controller {
  // REGISTER
  static async register(req, res, next) {
    try {
      const { nama, email, password, nomor_telepon, role } = req.body;

      const phoneN = formatPhoneNumber(nomor_telepon.trim());

      if (phoneN.length > 16) {
        throw { name: "Nomor Telepon Maksimal 16 Angka" };
      }

      if (phoneN.length < 8) {
        throw { name: "Nomor Telepon Minimal 8 Angka" };
      }

      const dataEmail = await User.findOne({
        where: {
          email,
        },
      });

      if (dataEmail) {
        throw { name: "Email Sudah Terdaftar" };
      }

      let body = {
        nama: nama.trim(),
        email: email.toLowerCase().trim(),
        password: password.trim(),
        nomor_telepon,
        role,
      };

      const dataUser = await User.create(body);

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Register",
      });
    } catch (error) {
      next(error);
    }
  }

  // LOGIN
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "Mohon Masukkan Email" };
      }
      if (!password) {
        throw { name: "Mohon Masukkan Password" };
      }

      const dataUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!dataUser) {
        throw { name: "Email/Password Salah" };
      }

      if (!comparePassword(password, dataUser.password)) {
        throw { name: "Email/Password Salah" };
      }

      // CREATE PAYLOAD
      const payload = {
        id: dataUser.id,
        email: dataUser.email,
      };

      // CREATE ACCESS TOKEN
      const authorization = createAccessToken(payload);

      res.status(201).json({
        statusCode: 201,
        authorization: authorization,
        message: `Selamat Datang ${dataUser.nama} Berhasil Login`,
        nama: dataUser.nama,
        email: dataUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ALL
  static async getAll(req, res, next) {
    try {
      const { limit, page, search, tanggal } = req.query;

      let pagination = {
        where: {},
        attributes: {
          exclude: ["password"],
        },
        order: [["nama", "ASC"]],
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
          [Op.or]: [{ nama: { [Op.iLike]: `%${search}%` } }],
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

      let dataUser = await User.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataUser.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data User",
        data: dataUser.rows,
        totaldataUser: dataUser.count,
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
      const dataUser = await User.findOne({
        where: {
          id,
        },
      });

      if (!dataUser) {
        throw { name: "Id User Tidak Ditemukan" };
      }

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data User",
        data: dataUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { nama, role } = req.body;

      let body = {
        nama,
        role,
      };

      const dataUser = await User.findOne({
        where: {
          id,
        },
      });

      if (!dataUser) {
        throw { name: "Id User Tidak Ditemukan" };
      }

      await User.update(body, { where: { id } });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data User",
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async updateNomorTelepon(req, res, next) {
    try {
      const { id } = req.params;
      const { nomor_telepon } = req.body;

      let body = {
        nomor_telepon,
      };

      const dataUser = await User.findOne({
        where: {
          id,
        },
      });

      if (!dataUser) {
        throw { name: "Id User Tidak Ditemukan" };
      }

      await User.update(body, { where: { id } });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Nomor Telepon User",
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async updatePassword(req, res, next) {
    try {
      const { id } = req.params;

      const { password, confirmasi_password } = req.body;

      if (password !== confirmasi_password) {
        throw { name: "Konfirmasi Password Tidak Cocok" };
      }

      let body = {
        password: hashingPassword(password),
      };

      const dataUser = await User.findOne({
        where: {
          id,
        },
      });

      if (!dataUser) {
        throw { name: "Id User Tidak Ditemukan" };
      }

      await User.update(body, { where: { id } });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data User",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const dataUser = await User.findOne({
        where: {
          id,
        },
      });

      if (!dataUser) {
        throw { name: "Id User Tidak Ditemukan" };
      }

      await User.destroy({ where: { id } });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data User",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
