import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

import DataGrid from "../../components/DataGrid";
import jsonData from "./data.json";

export default function DataGridPage() {
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
        <title>Data Grid</title>
      </Head>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main
            className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-light"
            style={{ minHeight: contentHeight }}
          >
            <div>
              <h1>Data Grid Page</h1>
              <DataGrid data={jsonData} />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
