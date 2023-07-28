// import React, { useState } from "react";
"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const Berhitung = () => {
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

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
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
            <h1>Contoh Aplikasi Next.js</h1>
            <p>Count: {count}</p>
            <button
              onClick={increment}
              className="btn btn-sm btn-info me-2 text-light"
            >
              Tambah
            </button>
            <button
              onClick={decrement}
              className="btn btn-sm btn-success text-light"
            >
              Kurang
            </button>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Berhitung;
