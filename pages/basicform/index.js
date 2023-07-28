import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

function ContohComponent() {
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setContentHeight(window.innerHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Buat state untuk variabel data dengan nilai awal kosong
  const [data, setData] = useState({
    nama: "",
    telepon: "",
    email: "",
    jabatan: "",
  });

  // Fungsi untuk mengubah data saat input diubah
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <Head>
        <title>Halaman Utama</title>
      </Head>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main
            className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-light"
            style={{ minHeight: contentHeight }}
          >
            {/* Input untuk mengubah data */}
            <input
              type="text"
              name="nama"
              value={data.nama}
              onChange={handleChange}
              placeholder="Nama"
            />
            <input
              type="text"
              name="telepon"
              value={data.telepon}
              onChange={handleChange}
              placeholder="Telepon"
            />
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="jabatan"
              value={data.jabatan}
              onChange={handleChange}
              placeholder="Jabatan"
            />

            {/* Tampilkan data */}
            <p>Nama: {data.nama}</p>
            <p>Telepon: {data.telepon}</p>
            <p>Email: {data.email}</p>
            <p>Jabatan: {data.jabatan}</p>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContohComponent;
