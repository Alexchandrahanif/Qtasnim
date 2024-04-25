const ExcelJS = require("exceljs");

const exportToExcel = async (dataHistory, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("History Penjualan");

    worksheet.columns = [
      {
        header: "Nomor",
        key: "Nomor",
        width: 10,
        alignment: {
          horizontal: "center",
          vertical: "middle",
        },
        border: {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        },
      },
      {
        header: "Nama Barang",
        key: "Barang",
        width: 25,
        alignment: {
          horizontal: "center",
          vertical: "middle",
        },
        border: {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        },
      },
      {
        header: "Jumlah",
        key: "Jumlah",
        width: 25,
        alignment: {
          horizontal: "center",
          vertical: "middle",
        },
        border: {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        },
      },
      {
        header: "Keterangan",
        key: "Keterangan",
        width: 25,
        alignment: {
          horizontal: "center",
          vertical: "middle",
        },
        border: {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        },
      },
      {
        header: "Kasir",
        key: "Kasir",
        width: 25,
        alignment: {
          horizontal: "center",
          vertical: "middle",
        },
        border: {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        },
      },
      {
        header: "Tanggal Penjualan",
        key: "Tanggal Penjualan",
        width: 25,
        alignment: {
          horizontal: "center",
          vertical: "middle",
        },
        border: {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        },
      },
    ];

    dataHistory.forEach((row, idx) => {
      const tanggalPenjualan = new Date(row.createdAt);
      const formattedTanggalPenjualan = `${tanggalPenjualan.toLocaleDateString(
        "id-ID",
        {
          weekday: "long",
        }
      )}, ${tanggalPenjualan.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`;

      worksheet.addRow({
        Nomor: idx + 1,
        Barang: row?.StokBarang?.nama_barang,
        Jumlah: row.jumlah,
        Keterangan: row.keterangan,
        Kasir: row.User?.nama,
        "Tanggal Penjualan": formattedTanggalPenjualan,
      });
    });

    const excelFileName = "History.xlsx";

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment;filename=" + "History.xlsx"
    );

    await workbook.xlsx.write(res);

    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { exportToExcel };
