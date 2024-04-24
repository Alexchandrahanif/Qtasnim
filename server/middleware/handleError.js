const handleError = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = [];
    err.errors.forEach((el) => {
      message.push(el.message);
    });
  } else if (err.name === "Invalid authorization") {
    code = 401;
    message = "Akses Token Tidak Ada";
  }

  //
  else if (err.name === "Email/Password Salah") {
    code = 400;
    message = "Email/Password Salah";
  } else if (err.name === "Mohon Masukkan Password") {
    code = 400;
    message = "Mohon Masukkan Password";
  } else if (err.name === "Mohon Masukkan Email") {
    code = 400;
    message = "Mohon Masukkan Email";
  } else if (err.name === "Email Sudah Terdaftar") {
    code = 400;
    message = "Email Sudah Terdaftar";
  } else if (err.name === "Mohon Masukkan Nomor Telepon") {
    code = 400;
    message = "Mohon Masukkan Nomor Telepon";
  } else if (err.name === "Nomor Telepon Tidak Terdaftar") {
    code = 400;
    message = "Nomor Telepon Tidak Terdaftar";
  } else if (err.name === "Nomor Telepon Sudah Terdaftar") {
    code = 400;
    message = "Nomor Telepon Sudah Terdaftar";
  } else if (err.name === "Konfirmasi Password Tidak Cocok") {
    code = 400;
    message = "Konfirmasi Password Tidak Cocok";
  } else if (err.name === `Stok Tersedia Kurang Dari`) {
    code = 400;
    message = `Stok Tersedia Kurang Dari ${err.stok}, tersisa ${err.sisa}`;
  } else if (err.name === "Nomor Telepon Minimal 8 Angka") {
    code = 400;
    message = "Nomor Telepon Minimal 8 Angka";
  } else if (err.name === "Nomor Telepon Maksimal 16 Angka") {
    code = 400;
    message = "Nomor Telepon Maksimal 16 Angka";
  }

  // 404
  else if (err.name === "Id User Tidak Ditemukan") {
    code = 404;
    message = "Id User Tidak Ditemukan";
  } else if (err.name === "Id Inventory Tidak Ditemukan") {
    code = 404;
    message = "Id Inventory Tidak Ditemukan";
  } else if (err.name === "Id History Tidak Ditemukan") {
    code = 404;
    message = "Id History Tidak Ditemukan";
  }

  //!

  // 401 dan 403
  else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Token Tidak Sesuai";
  } else if (err.name === "TokenExpiredError") {
    code = 401;
    message = "Token Sudah Expired";
  } else if (err.name === "API KEY Tidak Valid") {
    code = 401;
    message = "API KEY Tidak Valid";
  } else if (err.name === "Forbidden") {
    code = 403;
    message = "Anda Tidak Memiliki Hak Akses";
  }
  res.status(code).json({
    statusCode: code,
    message: message,
  });
};

module.exports = handleError;
