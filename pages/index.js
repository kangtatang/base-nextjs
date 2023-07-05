import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Home() {
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
        <title>Dashboard</title>
      </Head>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main
            className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-light"
            style={{ minHeight: contentHeight }}
          >
            <h1>Hallo</h1>
            <p>
              Aplikasi ini merupakan aplikasi sederhana sebagai bahan
              pembelajaran, acuan dasar bagi pemula untuk mempelajari aplikasi
              react JS. silahkan dipergunakan sebagaimana mestinya.
            </p>
            <p>Dibuat oleh: kangtatang (https://github.com/kangtatang)</p>
            <p>Library tambahan: axios, bootstrap, react-bootstrap</p>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
