import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import carData from "./car.json";

const CarList = () => {
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

  const sortedCarYear = carData
    .slice()
    .sort((a, b) => a.car_model_year - b.car_model_year);

  const sortedYear = sortedCarYear.filter(
    (car, index, array) =>
      index === array.findIndex((c) => c.car_model_year === car.car_model_year)
  );

  const [carModelFilter, setCarModelFilter] = useState("");
  const [carModelYearFilter, setCarModelYearFilter] = useState("");

  const handleCarModelFilterChange = (e) => {
    setCarModelFilter(e.target.value);
  };

  const handleCarModelYearFilterChange = (e) => {
    setCarModelYearFilter(e.target.value);
  };

  const sortedCarModel = carData
    .slice()
    .sort((a, b) => a.car_model.localeCompare(b.car_model));

  const sortedModel = sortedCarModel.filter(
    (car, index, array) =>
      index === array.findIndex((c) => c.car_model === car.car_model)
  );

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    // Filtering data berdasarkan filter model dan year
    const filtered = carData.filter((car) => {
      return (
        car.car_model.toLowerCase().includes(carModelFilter.toLowerCase()) &&
        car.car_model_year.toString().includes(carModelYearFilter)
      );
    });

    // Set total halaman berdasarkan jumlah data dan data per halaman
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    // Reset halaman ke halaman pertama ketika ada perubahan pada data atau data per halaman
    setCurrentPage(1);
    // Simpan data hasil filtering ke dalam state filteredData
    setFilteredData(filtered);
  }, [carModelFilter, carModelYearFilter, itemsPerPage]);

  useEffect(() => {
    // Hitung startIndex dan endIndex berdasarkan currentPage dan itemsPerPage
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Ambil data yang sesuai dengan halaman saat ini dari state filteredData
    const dataToShow = filteredData.slice(startIndex, endIndex);
    // Simpan data ke dalam state currentData
    setCurrentData(dataToShow);
  }, [currentPage, itemsPerPage, filteredData]);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset halaman ke halaman pertama ketika data per halaman berubah
  };

  //   sorting
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedFilteredData, setSortedFilteredData] = useState([]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      // Jika kolom yang sama di-klik lagi, toggle arah pengurutan
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Jika kolom baru di-klik, urutkan secara ascending
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  useEffect(() => {
    // Filtering data berdasarkan filter model dan year
    const filtered = carData.filter((car) => {
      return (
        car.car_model.toLowerCase().includes(carModelFilter.toLowerCase()) &&
        car.car_model_year.toString().includes(carModelYearFilter)
      );
    });

    // Mengurutkan data berdasarkan kolom yang dipilih dan arah pengurutan
    const sortedData = filtered.slice().sort((a, b) => {
      if (sortColumn === "car_model") {
        return sortDirection === "asc"
          ? a.car_model.localeCompare(b.car_model)
          : b.car_model.localeCompare(a.car_model);
      } else if (sortColumn === "car_model_year") {
        return sortDirection === "asc"
          ? a.car_model_year - b.car_model_year
          : b.car_model_year - a.car_model_year;
      } else if (sortColumn === "car_make") {
        return sortDirection === "asc"
          ? a.car_make.localeCompare(b.car_make)
          : b.car_make.localeCompare(a.car_make);
      }
      return 0;
    });

    // Set total halaman berdasarkan jumlah data dan data per halaman
    setTotalPages(Math.ceil(sortedData.length / itemsPerPage));
    // Reset halaman ke halaman pertama ketika ada perubahan pada data atau data per halaman
    setCurrentPage(1);

    // Simpan hasil filtering dan sorting ke dalam state sortedFilteredData
    setSortedFilteredData(sortedData);
  }, [
    carModelFilter,
    carModelYearFilter,
    sortColumn,
    sortDirection,
    itemsPerPage,
  ]);

  useEffect(() => {
    // Hitung startIndex dan endIndex berdasarkan currentPage dan itemsPerPage
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Ambil data yang sesuai dengan halaman saat ini dari state sortedFilteredData
    const dataToShow = sortedFilteredData.slice(startIndex, endIndex);
    // Simpan data ke dalam state currentData
    setCurrentData(dataToShow);
  }, [currentPage, itemsPerPage, sortedFilteredData]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
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
            <h1>Daftar Mobil</h1>
            <label>
              Filter Model Mobil:
              <select
                value={carModelFilter}
                onChange={handleCarModelFilterChange}
              >
                <option value="">-- Pilih Model Mobil --</option>
                {sortedModel.map((car) => (
                  <option key={car.car_model} value={car.car_model}>
                    {car.car_model}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Filter Tahun Mobil:
              <select
                value={carModelYearFilter}
                onChange={handleCarModelYearFilterChange}
              >
                <option value="">-- Pilih Tahun Mobil --</option>
                {sortedYear.map((car) => (
                  <option key={car.car_model_year} value={car.car_model_year}>
                    {car.car_model_year}
                  </option>
                ))}
              </select>
            </label>
            <table className="table table-sm table-hovered mt-4">
              <thead className="table-dark text-light">
                <tr>
                  <th>ID</th>
                  <th onClick={() => handleSort("car_model")}>
                    Model Mobil{" "}
                    {sortColumn === "car_model" &&
                      (sortDirection === "asc" ? <>&#x25B2;</> : <>&#x25BC;</>)}
                  </th>
                  <th onClick={() => handleSort("car_model_year")}>
                    Tahun Mobil{" "}
                    {sortColumn === "car_model_year" &&
                      (sortDirection === "asc" ? <>&#x25B2;</> : <>&#x25BC;</>)}
                  </th>
                  <th onClick={() => handleSort("car_make")}>
                    Merk Mobil{" "}
                    {sortColumn === "car_make" &&
                      (sortDirection === "asc" ? <>&#x25B2;</> : <>&#x25BC;</>)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((car) => (
                  <tr key={car.id}>
                    <td>{car.id}</td>
                    <td>{car.car_model}</td>
                    <td>{car.car_model_year}</td>
                    <td>{car.car_make}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="col-md-3">
              <select
                className="form-control mt-2 mb-2"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="mt-2">{`Data per halaman: ${itemsPerPage}`}</span>
            </div>

            <div className="mt-4 mb-4">
              <button
                className="btn btn-primary btn-sm me-2"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>{`Halaman: ${currentPage} dari ${totalPages}`}</span>
              <button
                className="btn btn-primary btn-sm ms-2"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarList;
