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
  PlusCircleOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";

import { logo } from "../assets";

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const [stokBarang, setStokBarang] = useState([]);

  const [dataSearch, setDataSearch] = useState(null);

  const [nama, setNama] = useState("");
  const [stok, setStok] = useState(0);
  const [jenis, setJenis] = useState("Jenis Barang");

  const [jumlah, setJumlah] = useState("");

  const [statusStok, setStatusStok] = useState("");

  const [limit, setLimit] = useState(15);

  const [idBarang, setIdBarang] = useState("");

  const [editingData, setEditingData] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isModalStokVisible, setIsModalStokVisible] = useState(false);

  const [hapus, setHapus] = useState(null);

  useEffect(() => {
    const queryParams = {
      limit: limit,
    };

    if (dataSearch !== null) {
      queryParams.search = dataSearch;
    }

    axios({
      url: "http://localhost:3000/stokBarang",
      method: "GET",
      params: queryParams,
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    })
      .then((response) => {
        const data = response.data.data;
        setStokBarang(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [
    dataSearch,
    isModalVisible,
    limit,
    hapus,
    editingData,
    isModalStokVisible,
  ]);

  const handleOk = () => {
    if (editingData) {
      axios({
        url: `http://localhost:3000/stokBarang/${editingData.id}`,
        method: "PATCH",
        data: {
          nama_barang: nama,
          jenis_barang: jenis,
        },
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      })
        .then((response) => {
          message.success(response.data.message);
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
    } else {
      axios({
        url: "http://localhost:3000/stokBarang",
        method: "POST",
        data: {
          nama_barang: nama,
          stok: stok,
          jenis_barang: jenis,
        },
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      })
        .then((response) => {
          const newRecord = response.data.data;
          setStokBarang((prevData) => [...prevData, newRecord]);
          message.success(response.data.message);
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
    }

    setIsModalVisible(false);
    setNama("");
    setJenis("Jenis Barang");
    setStok(0);
    setEditingData(null);
  };
  const handleOkStok = () => {
    if (statusStok == "tambah") {
      axios({
        url: `http://localhost:3000/stokBarang/add/${idBarang}`,
        method: "PATCH",
        data: {
          jumlah,
        },
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      })
        .then((response) => {
          message.success(response.data.message);
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
    } else if (statusStok == "kurang") {
      axios({
        url: `http://localhost:3000/stokBarang/reduce/${idBarang}`,
        method: "PATCH",
        data: {
          jumlah,
        },
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      })
        .then((response) => {
          const newRecord = response.data.data;
          setStokBarang((prevData) => [...prevData, newRecord]);
          message.success(response.data.message);
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
    }

    setIsModalStokVisible(false);
    setJumlah("");
  };

  const handleEdit = (data) => {
    setEditingData(data);
    setIsModalVisible(true);
    setNama(data.nama_barang || "");
    setJenis(data.jenis_barang || "");
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
    setEditingData(null);
    setNama("");
    setJenis("Jenis Barang");
    setStok(0);
  };

  const handleCancelStok = () => {
    setIsModalStokVisible(false);
    setEditingData("");
    setJumlah("");
  };

  const handleChange = (value) => {
    setJenis(value);
  };

  const handlePlus = (id) => {
    setIsModalStokVisible(true);
    setStatusStok("tambah");
    setIdBarang(id);
  };

  const handleMinus = (id) => {
    setIsModalStokVisible(true);
    setStatusStok("kurang");
    setIdBarang(id);
  };

  const ColumnStokBarang = [
    {
      title: "No",
      width: 60,
      align: "center",
      render: (data, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Nama Barang",
      align: "center",
      width: 180,
      render: (data) => {
        return data?.nama_barang;
      },
    },
    {
      title: "Stok",
      align: "center",
      width: 90,
      render: (data) => {
        return data?.stok;
      },
    },
    {
      title: "Jumlah Terjual",
      align: "center",
      width: 150,
      render: (data) => {
        return data?.jumlah_terjual;
      },
    },
    {
      title: "Jenis Barang",
      align: "center",
      width: 120,
      render: (data) => {
        return data?.jenis_barang;
      },
    },
    {
      title: "Transaksi Terakhir",
      align: "center",
      render: (data) => {
        const formattedDate = new Date(data?.tanggal_transaksi);
        const options = {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        };
        return formattedDate.toLocaleDateString("id-ID", options);
      },
    },
    {
      title: "Action",
      fixed: "right",
      align: "center",
      width: 75,
      render: (data) => {
        const handleMenuClick = (e, id) => {
          if (e.key === "edit") {
            handleEdit(data);
          } else if (e.key === "delete") {
            axios({
              url: `http://localhost:3000/stokBarang/${id}`,
              method: "DELETE",
              headers: {
                authorization: localStorage.getItem("authorization"),
              },
            })
              .then((response) => {
                message.success(response.data.message);
                setHapus(!hapus);
              })
              .catch((error) => {
                message.error("Error deleting data");
              });
          } else if (e.key == "detail") {
            navigate(`/${id}`);
          } else if (e.key == "plus") {
            handlePlus(id);
          } else if (e.key == "minus") {
            handleMinus(id);
          }
        };

        const menu = (
          <Menu onClick={(e) => handleMenuClick(e, data.id)}>
            <Menu.Item key="detail">
              <InfoCircleOutlined /> Detail
            </Menu.Item>
            <Menu.Item key="edit">
              <EditOutlined /> Edit
            </Menu.Item>
            <Menu.Item key="plus">
              <PlusCircleOutlined /> Stok
            </Menu.Item>
            <Menu.Item key="minus">
              <PlusCircleOutlined /> Penjualan
            </Menu.Item>
            <Menu.Item key="delete" style={{ color: "red" }}>
              <DeleteOutlined />
              Hapus
            </Menu.Item>
          </Menu>
        );

        return (
          <Fragment>
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <DownCircleOutlined className="text-lg text-slate-500" />
              </a>
            </Dropdown>
          </Fragment>
        );
      },
    },
  ];

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
          <div className="flex w-full justify-between px-5 py-3">
            <Search
              placeholder="Cari data"
              onSearch={handleSearch}
              style={{ width: 400, marginBottom: 16 }}
            />

            <div className="flex gap-3">
              <button
                className=" bg-blue-600 w-[100px] h-[30px] rounded-lg text-white"
                onClick={showModal}
              >
                Tambah
              </button>
              <button
                className=" bg-blue-600 w-[100px] h-[30px] rounded-lg text-white"
                onClick={(e) => {
                  localStorage.clear(),
                    navigate("/login"),
                    message.success("Sampai jumpa lagi !!");
                }}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Tabel */}
          <div>
            <Table
              size="small"
              columns={ColumnStokBarang}
              dataSource={Array.isArray(stokBarang) ? stokBarang : []}
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
              editingData
                ? "Edit Data Stok Barang"
                : "Tambah Data Stok Barang Baru"
            }
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className="flex  my-5 gap-3 flex-wrap">
              <input
                type="text"
                placeholder="Nama Barang"
                value={nama || (editingData ? editingData.nama : "")}
                className="border-[2px] w-[220px] border-slate-500 rounded-md px-2 py-1 text-md"
                onChange={(e) => setNama(e.target.value)}
              />
              <br />
              {editingData ? null : (
                <input
                  type="text"
                  placeholder="Stok"
                  value={stok || (editingData ? editingData.stok : "")}
                  className="border-[2px] w-[220px] border-slate-500 rounded-md px-2 py-1 text-md "
                  onChange={(e) => setStok(e.target.value)}
                />
              )}
              <Select
                value={jenis || (editingData ? editingData.jenis : "")}
                className="border-[2px] w-[220px] border-slate-500 rounded-md  text-md"
                onChange={handleChange}
                options={[
                  {
                    value: "Konsumsi",
                    label: "Konsumsi",
                  },
                  {
                    value: "Pembersih",
                    label: "Pembersih",
                  },
                ]}
              />
            </div>
          </Modal>

          <Modal
            title={
              statusStok == "tambah"
                ? "Tambah Stok Barang"
                : "Tambah Penjualan Barang"
            }
            visible={isModalStokVisible}
            onOk={handleOkStok}
            onCancel={handleCancelStok}
          >
            <div className="flex  my-5 gap-3 flex-wrap">
              <input
                type="text"
                placeholder="Jumlah"
                value={jumlah}
                className="border-[2px] w-[220px] border-slate-500 rounded-md px-2 py-1 text-md"
                onChange={(e) => setJumlah(e.target.value)}
              />
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default HomePage;
