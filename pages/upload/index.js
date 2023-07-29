import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./UploadComponent.module.css"; // Import file CSS untuk animasi loading spinner
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import NotificationModal from "../../components/NotificationModal";
import { config } from "dotenv";

function UploadComponent() {
  config();

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

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // State untuk menyimpan status upload
  // modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  //  message modal
  const [message, setMessage] = useState("");

  const inputFileRef = useRef(null); // Ref untuk elemen input file

  const handleFileChange = (e) => {
    // setSelectedFile(e.target.files[0]);
    const file = e.target.files[0];
    // Cek apakah file ada dan tipe file sesuai dengan yang diizinkan
    if (file && isFileValid(file)) {
      setSelectedFile(file);
    } else {
      //   alert("Tipe file yang diupload harus berupa jpg, jpeg, atau png.");
      setMessage("Format File salah!");
      setShowErrorModal(true);
      // Reset input file menjadi blank menggunakan ref
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
      setSelectedFile(null); // Reset selectedFile menjadi null
    }
  };

  const isFileValid = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  //   import axios from "axios";

  const handleUpload = () => {
    setLoading(true);
    setUploadStatus(""); // Menghapus pesan status sebelum upload file

    if (!selectedFile) {
      //   alert("Tidak ada file untuk diupload.");
      setMessage("Tidak ada File yang dipilih!");
      setShowErrorModal(true);
      setLoading(false);
      return;
    }

    // Ganti "Example Data" dengan data yang ingin diupload, atau gunakan selectedFile jika Anda ingin mengupload file
    const data = selectedFile;

    // config(); // Panggil dan konfigurasi file .env

    // Anda dapat langsung menggunakan variabel lingkungan dari process.env di sini
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    // Gunakan fungsi uploadData untuk melakukan proses upload
    uploadData(data, apiKey)
      .then((response) => {
        setLoading(false);
        setMessage("File berhasil diupload");
        setShowSuccessModal(true);
        setUploadStatus("File berhasil diupload.");
        // Reset input file menjadi blank menggunakan ref
        if (inputFileRef.current) {
          inputFileRef.current.value = "";
        }

        setSelectedFile(null);
      })
      .catch((error) => {
        setLoading(false);
        setMessage("Proses Upload gagal!");
        setShowErrorModal(true);
        setUploadStatus("Terjadi kesalahan saat upload file.");
      });
  };

  const uploadData = async (data, apiKey) => {
    try {
      const response = await axios.post(
        "https://api.upload.io/v2/accounts/12a1yTw/uploads/binary",
        data,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "image/jpeg", // Ganti sesuai dengan tipe data yang diupload
          },
        }
      );

      // Proses response jika diperlukan
      console.log("Response:", response.data);

      return response.data; // Mengembalikan response jika diperlukan
    } catch (error) {
      // Tangani error jika ada
      console.error("Error:", error);
      throw error; // Mengembalikan error jika diperlukan
    }
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
            <h1>Form Upload</h1>
            <div className="form-group mt-4 mb-2">
              <input
                className="form-control"
                type="file"
                onChange={handleFileChange}
                ref={inputFileRef} // Menghubungkan ref ke elemen input
                accept=".jpg, .jpeg, .png" // Batasi tipe file yang diizinkan
              />
            </div>
            <div className="form-group">
              <button className="btn btn-sm btn-info" onClick={handleUpload}>
                Upload
              </button>
            </div>

            <div className={styles.loader_container}>
              {loading && <div className={styles.loader}></div>}{" "}
              {/* Animasi loading spinner */}
              {uploadStatus && <div>{uploadStatus}</div>}{" "}
            </div>

            {/* Modal Pesan Berhasil */}
            <NotificationModal
              show={showSuccessModal}
              onHide={() => setShowSuccessModal(false)}
              title="Sukses"
              message={message}
            />

            {/* Modal Pesan Error */}
            <NotificationModal
              show={showErrorModal}
              onHide={() => setShowErrorModal(false)}
              title="Error"
              message={message}
            />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UploadComponent;
