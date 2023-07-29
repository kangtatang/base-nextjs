import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NotificationModal from "../../../components/NotificationModal";
import Head from "next/head";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";

const Home = () => {
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

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Proses pengiriman formulir ke server
    // Misalnya, Anda bisa menggunakan axios untuk mengirimkan data ke API

    // Jika pengiriman berhasil, tampilkan modal berhasil
    // setShowSuccessModal(true);

    // Jika terjadi kesalahan, tampilkan modal error
    setShowErrorModal(true);
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
            <h1>Formulir</h1>
            <form onSubmit={handleSubmit}>
              {/* Isi formulir disini */}
              <button type="submit" className="btn btn-sm btn-info">
                Kirim
              </button>
            </form>

            {/* Modal Pesan Berhasil */}
            <NotificationModal
              show={showSuccessModal}
              onHide={() => setShowSuccessModal(false)}
              title="Sukses"
              message="Formulir berhasil dikirim."
            />

            {/* Modal Pesan Error */}
            <NotificationModal
              show={showErrorModal}
              onHide={() => setShowErrorModal(false)}
              title="Error"
              message="Terjadi kesalahan saat mengirimkan formulir."
            />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
