import React, { useEffect, useState, Fragment } from "react";
import {
  Space,
  Table,
  Tag,
  Input,
  Tabs,
  Button,
  Select,
  Tooltip,
  InputNumber,
  Menu,
  Dropdown,
  message,
  DatePicker,
  Pagination,
  Modal,
} from "antd";
import axios from "axios";

import {
  PlusOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";
import { logo } from "../assets";

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

import { useNavigate, useParams } from "react-router-dom";

function DetailPage() {
  const navigate = useNavigate();

  let { id } = useParams();

  const [penjualan, setPenjualan] = useState([]);
  const [awal, setAwal] = useState(null);
  const [akhir, setAkhir] = useState(null);
  const [dataSearch, setDataSearch] = useState(null);
  const [selectedSingleDate, setSelectedSingleDate] = useState(null);

  const [produk, setProduk] = useState("");
  const [plat, setPlat] = useState("");

  const [limit, setLimit] = useState(15);

  const [editingData, setEditingData] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [hapus, setHapus] = useState(null);

  useEffect(() => {
    const queryParams = {
      limit: limit,
    };

    if (selectedSingleDate !== null) {
      queryParams.tanggal = selectedSingleDate;
    }

    if (dataSearch !== null) {
      queryParams.search = dataSearch;
    }

    if (awal && akhir) {
      queryParams.awal = awal;
      queryParams.akhir = akhir;
    }

    axios({
      url: `http://localhost:3000/stokBarang/history/${id}`,
      method: "GET",
      params: queryParams,
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    })
      .then((response) => {
        const data = response.data.data;
        setPenjualan(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [
    dataSearch,
    awal,
    akhir,
    selectedSingleDate,
    isModalVisible,
    limit,
    hapus,
    editingData,
  ]);

  const handleOk = () => {
    if (editingData) {
      axios({
        url: `http://localhost:3000/stokBarang/${editingData.id}`,
        method: "PATCH",
        data: {
          produk: produk,
          plat: plat,
        },
      })
        .then((response) => {
          message.success(response.data.message);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    } else {
      axios({
        url: "http://localhost:3000/stokBarang",
        method: "POST",
        data: {
          produk: produk,
          plat: plat,
        },
      })
        .then((response) => {
          const newRecord = response.data.data;
          setPenjualan((prevData) => [...prevData, newRecord]);
          message.success(response.data.message);
        })
        .catch((error) => {
          console.error("Error adding new data:", error);
        });
    }

    setIsModalVisible(false);
    setProduk("");
    setPlat("");
    setEditingData(null);
  };

  const handleDateChange = (dates, dateStrings) => {
    setAwal(dateStrings[0]);
    setAkhir(dateStrings[1]);
  };

  const handleEdit = (data) => {
    setEditingData(data);
    setIsModalVisible(true);
    setProduk(data.produk || "");
    setPlat(data.plat || "");
  };

  const handleSingleDateChange = (date, dateString) => {
    setSelectedSingleDate(dateString);
  };

  const handleSearch = (value) => {
    setDataSearch(value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const ColumnStokBarang = [
    {
      title: "No",
      width: 100,
      align: "center",
      render: (data, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Nama Barang",
      align: "center",
      render: (data) => {
        return data?.StokBarang?.nama_barang;
      },
    },
    {
      title: "Jumlah",
      align: "center",
      render: (data) => {
        return data?.jumlah;
      },
    },
    {
      title: "Keterangan",
      align: "center",
      render: (data) => {
        return data?.keterangan;
      },
    },
    {
      title: "Kasir",
      align: "center",
      render: (data) => {
        return data?.User?.nama;
      },
    },
    {
      title: "Transaksi Terakhir",
      align: "center",
      render: (data) => {
        const formattedDate = new Date(data.createdAt);
        const options = {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        };
        return formattedDate.toLocaleDateString("id-ID", options);
      },
    },
  ];
  const handleDownload = () => {
    const queryParams = {
      limit: limit,
      exportExcel: true,
    };

    if (selectedSingleDate !== null) {
      queryParams.tanggal = selectedSingleDate;
    }

    if (dataSearch !== null) {
      queryParams.search = dataSearch;
    }

    if (awal && akhir) {
      queryParams.awal = awal;
      queryParams.akhir = akhir;
    }

    axios({
      url: `http://localhost:3000/stokBarang/history/${id}`,
      method: "GET",
      params: queryParams,
      responseType: "blob",
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "History.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading data:", error);
      });
  };

  return (
    <>
      <div className="bg-slate-100 w-full h-screen">
        <div className="mx-64 bg-white  h-full">
          {/* Header */}
          <div className="w-full h-16 bg-white flex justify-center items-center">
            <img
              src={logo}
              alt=""
              className="object-cover w-24 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Filter */}
          <div className="flex w-full justify-between p-3">
            <Search
              placeholder="Cari data"
              onSearch={handleSearch}
              style={{ width: 300, marginBottom: 16 }}
            />
            <div style={{ marginBottom: 16 }}>
              <RangePicker onChange={handleDateChange} />
            </div>

            <DatePicker
              onChange={handleSingleDateChange}
              style={{ marginLeft: 16, marginBottom: 16 }}
            />

            <button
              className="bg-blue-600 w-[100px] h-[30px] rounded-lg text-white"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>

          {/* Tabel */}
          <div>
            <Table
              size="small"
              columns={ColumnStokBarang}
              dataSource={Array.isArray(penjualan) ? penjualan : []}
              pagination={false}
              scroll={{
                y: 420,
              }}
              rowKey="id"
            />
          </div>

          <div className="flex justify-end mr-5 py-2 w-full items-center">
            <input
              className="border-[1px] w-[100px]  px-2 py-1 "
              type="number"
              value={limit}
              style={{ width: 60, marginBottom: 16, marginRight: 16 }}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>

          <Modal
            title={
              editingData ? "Edit Data Penjualan" : "Tambah Data Penjualan Baru"
            }
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className="flex justify-between my-5">
              <input
                type="text"
                placeholder="Produk"
                value={produk || (editingData ? editingData.produk : "")}
                className="border-[2px] w-[230px] border-slate-500 rounded-md px-2 py-1 text-md"
                onChange={(e) => setProduk(e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="Plat"
                value={plat || (editingData ? editingData.plat : "")}
                className="border-[2px] w-[230px] border-slate-500 rounded-md px-2 py-1 text-md"
                onChange={(e) => setPlat(e.target.value)}
              />
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
