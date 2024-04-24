import React, { useState } from "react";

import { Button, Input, Space } from "antd";
import { message, Upload, Modal } from "antd";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import { home, home2, logo } from "../assets";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telepon, setTelepon] = useState("");

  const handleSubmit = async () => {
    const data = await axios({
      url: `http://localhost:3000/user/register`,
      method: "POST",
      data: {
        nama,
        email,
        password,
        role: "ADMIN",
        nomor_telepon: telepon,
      },
    })
      .then((response) => {
        message.loading("Loading...", 1, () => {
          navigate("/login");
          message.success(response.data.message);
        });
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full h-screen flex p-5">
      {/* Kanan */}
      <div className="w-[55%] bg-slate-100 h-full rounded-lg overflow-hidden">
        <img
          src={home2}
          alt="homeRegister"
          className="w-full h-full object-contain opacity-80"
        />
      </div>

      {/* Kiri */}
      <div className="w-[45%] flex flex-col px-10 ">
        <div className="flex justify-start items-center  gap-3">
          <img src={logo} alt="logoRegister" className="w-40" />
        </div>
        <div className="flex flex-col justify-center flex-1 gap-5">
          <div>
            <h1 className="text-2xl font-bold  text-Green">Register</h1>
            <p className="text-sm text-gray-500">
              Input data yang diminta untuk melakukan pendaftaran.
            </p>
          </div>

          <div className="w-full rounded-xl gap-5 flex flex-col">
            <div className="flex flex-col gap-2">
              {/* Display Name */}
              <label htmlFor="username" className=" text-slate-500 text-sm">
                Username
              </label>
              <Input
                id="username"
                autoComplete="off"
                size="large"
                placeholder="Masukkan Username"
                value={nama}
                onChange={(e) => {
                  setNama(e.target.value);
                }}
              />

              {/* Email */}
              <label htmlFor="email" className=" text-slate-500 text-sm">
                E-mail
              </label>
              <Input
                id="email"
                autoComplete="off"
                size="large"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              {/* Password */}
              <label htmlFor="password" className=" text-slate-500 text-sm">
                Password
              </label>
              <Input.Password
                id="password"
                autoComplete="off"
                size="large"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              {/* Phone Number */}
              <label htmlFor="telepon" className=" text-slate-500 text-sm">
                Telepon
              </label>
              <Input
                id="telepon"
                autoComplete="off"
                size="large"
                placeholder="Masukkan Nomor Telepon"
                value={telepon}
                onChange={(e) => {
                  setTelepon(e.target.value);
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button
                autoComplete="off"
                size="large"
                type="primary"
                block
                className=" bg-Green"
                onClick={() => handleSubmit()}
              >
                Register
              </Button>

              <p className="font-light text-sm">
                Sudah Punya Akun?{" "}
                <span
                  className="text-primaryDark font-semibold  cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
