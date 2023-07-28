import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Link from "next/link";

function SelectFieldComponent() {
  const [contentHeight, setContentHeight] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

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

  const [selectedOptions, setSelectedOptions] = useState([]);

  //   const handleSelectChange = (event) => {
  //     // Mendapatkan hasil pilihan dari select field
  //     const selectedValues = Array.from(
  //       event.target.selectedOptions,
  //       (option) => option.value
  //     );
  //     setSelectedOptions(selectedValues);
  //   };

  const handleSelectChange = (event) => {
    // Mendapatkan hasil pilihan dari select field pertama (multiple options)
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    // Mendapatkan hasil pilihan dari select field kedua (single option)
    const selectedValue = event.target.value;

    // Menggabungkan hasil pilihan dari kedua select field ke dalam satu array
    const combinedOptions = [
      ...selectedOptions,
      ...selectedValues,
      selectedValue,
    ];

    // Menghapus duplikasi nilai dalam array
    const uniqueOptions = [...new Set(combinedOptions)];

    setSelectedOptions(uniqueOptions);
  };

  const handleRemove = (option) => {
    // Hapus item dari array selectedOptions
    const updatedOptions = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(updatedOptions);
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
            {/* Select field pertama dengan multi pilihan */}
            <select multiple onChange={handleSelectChange}>
              <option value="option1">Pilihan 1</option>
              <option value="option2">Pilihan 2</option>
              <option value="option3">Pilihan 3</option>
            </select>

            {/* Select field kedua dengan single option */}
            <select onChange={handleSelectChange}>
              <option value="option4">Pilihan 4</option>
              <option value="option5">Pilihan 5</option>
              <option value="option6">Pilihan 6</option>
            </select>

            {/* Menampilkan hasil pilihan dari kedua select field dalam list */}
            <ul>
              {selectedOptions.map((option) => (
                <li key={option}>
                  {option}{" "}
                  <button onClick={() => handleRemove(option)}>Hapus</button>
                </li>
              ))}
            </ul>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelectFieldComponent;
