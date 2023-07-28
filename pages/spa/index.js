"use client";
// pages/index.js

// import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import data from "./data.json";

const Home = () => {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const handleMenuClick = (menuId) => {
    setActiveMenuId(menuId);
    const selected = data.find((item) => item.id === menuId);
    setSelectedData(selected);
  };

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
            <div className="mt-4">
              <ul>
                {data.map((item) => (
                  <li
                    key={item.id}
                    className={` btn btn-sm btn-success me-2 ${
                      activeMenuId === item.id ? "active" : ""
                    }`}
                    onClick={() => handleMenuClick(item.id)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>

            <div className="content">
              {selectedData && (
                <div>
                  <img className="gambar" src={selectedData.gbr} alt="Gambar" />
                  <h2>{selectedData.title}</h2>
                  <p>{selectedData.konten}</p>
                </div>
              )}

              {!selectedData && <div>choose your path</div>}
            </div>
          </main>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .gambar {
          width: 500px;
        }
        .active {
          background-color: blue;
        }
      `}</style>
    </div>
  );
};

const Menu1 = () => {
  return <h1>Menu 1</h1>;
};

const Menu2 = () => {
  return <h1>Menu 2</h1>;
};

const Menu3 = () => {
  return <h1>Menu 3</h1>;
};

export default Home;
