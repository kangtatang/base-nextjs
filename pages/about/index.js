import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

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
        <title>Halaman About</title>
      </Head>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main
            className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-light"
            style={{ minHeight: contentHeight }}
          >
            <h1>Selamat datang di halaman About</h1>
            <p>Ini adalah halaman About.</p>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
