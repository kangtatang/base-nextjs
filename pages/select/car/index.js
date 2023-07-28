import { useState } from "react";

const CarList = () => {
  const data = [
    { id: 1, car_model: "Explorer", car_model_year: 1995, car_make: "Ford" },
    { id: 2, car_model: "Q", car_model_year: 1994, car_make: "Infiniti" },
    { id: 3, car_model: "7 Series", car_model_year: 1997, car_make: "BMW" },
    { id: 4, car_model: "Esprit", car_model_year: 1986, car_make: "Lotus" },
    {
      id: 5,
      car_model: "Cabriolet",
      car_model_year: 1985,
      car_make: "Volkswagen",
    },
    { id: 6, car_model: "3 Series", car_model_year: 2011, car_make: "BMW" },
    { id: 7, car_model: "98", car_model_year: 1995, car_make: "Oldsmobile" },
    { id: 8, car_model: "Element", car_model_year: 2010, car_make: "Honda" },
    { id: 9, car_model: "B-Series", car_model_year: 2007, car_make: "Mazda" },
    { id: 10, car_model: "Arnage", car_model_year: 2006, car_make: "Bentley" },
    { id: 11, car_model: "Elan", car_model_year: 1991, car_make: "Lotus" },
    { id: 12, car_model: "550", car_model_year: 2006, car_make: "BMW" },
    { id: 13, car_model: "Paseo", car_model_year: 1997, car_make: "Toyota" },
    {
      id: 14,
      car_model: "Camaro",
      car_model_year: 2010,
      car_make: "Chevrolet",
    },
    { id: 15, car_model: "Century", car_model_year: 1996, car_make: "Buick" },
    {
      id: 16,
      car_model: "Ram Van 3500",
      car_model_year: 2000,
      car_make: "Dodge",
    },
    { id: 17, car_model: "TSX", car_model_year: 2006, car_make: "Acura" },
    { id: 18, car_model: "Sierra 1500", car_model_year: 2012, car_make: "GMC" },
    { id: 19, car_model: "Equator", car_model_year: 2010, car_make: "Suzuki" },
    { id: 20, car_model: "960", car_model_year: 1993, car_make: "Volvo" },
    { id: 21, car_model: "L300", car_model_year: 1990, car_make: "Mitsubishi" },
    { id: 22, car_model: "Envoy XUV", car_model_year: 2004, car_make: "GMC" },
    {
      id: 23,
      car_model: "Express 1500",
      car_model_year: 2003,
      car_make: "Chevrolet",
    },
    { id: 24, car_model: "Sunbird", car_model_year: 1990, car_make: "Pontiac" },
    {
      id: 25,
      car_model: "Pajero",
      car_model_year: 1998,
      car_make: "Mitsubishi",
    },
    { id: 26, car_model: "Ascender", car_model_year: 2004, car_make: "Isuzu" },
    { id: 27, car_model: "Tiburon", car_model_year: 1998, car_make: "Hyundai" },
    {
      id: 28,
      car_model: "Ram Van 2500",
      car_model_year: 1997,
      car_make: "Dodge",
    },
    { id: 29, car_model: "F150", car_model_year: 2003, car_make: "Ford" },
    {
      id: 30,
      car_model: "Ram 2500 Club",
      car_model_year: 1998,
      car_make: "Dodge",
    },
    { id: 31, car_model: "Neon", car_model_year: 1995, car_make: "Dodge" },
    { id: 32, car_model: "Sonic", car_model_year: 2012, car_make: "Chevrolet" },
    { id: 33, car_model: "Envoy XUV", car_model_year: 2005, car_make: "GMC" },
    { id: 34, car_model: "MR2", car_model_year: 1992, car_make: "Toyota" },
    {
      id: 35,
      car_model: "Grand Am",
      car_model_year: 2005,
      car_make: "Pontiac",
    },
    { id: 36, car_model: "Karif", car_model_year: 1990, car_make: "Maserati" },
    {
      id: 37,
      car_model: "Grand Caravan",
      car_model_year: 1995,
      car_make: "Dodge",
    },
    { id: 38, car_model: "LS", car_model_year: 2005, car_make: "Lincoln" },
    { id: 39, car_model: "Cougar", car_model_year: 1986, car_make: "Mercury" },
    {
      id: 40,
      car_model: "Daewoo Kalos",
      car_model_year: 2005,
      car_make: "Pontiac",
    },
    { id: 41, car_model: "S-Type", car_model_year: 2006, car_make: "Jaguar" },
    { id: 42, car_model: "Sedona", car_model_year: 2002, car_make: "Kia" },
    { id: 43, car_model: "Esteem", car_model_year: 2002, car_make: "Suzuki" },
    {
      id: 44,
      car_model: "FJ Cruiser",
      car_model_year: 2011,
      car_make: "Toyota",
    },
    {
      id: 45,
      car_model: "Sonoma Club Coupe",
      car_model_year: 1995,
      car_make: "GMC",
    },
    { id: 46, car_model: "Forester", car_model_year: 2012, car_make: "Subaru" },
    { id: 47, car_model: "Dakota", car_model_year: 2007, car_make: "Dodge" },
    {
      id: 48,
      car_model: "SL-Class",
      car_model_year: 1984,
      car_make: "Mercedes-Benz",
    },
    { id: 49, car_model: "300M", car_model_year: 2001, car_make: "Chrysler" },
    { id: 50, car_model: "Fusion", car_model_year: 2010, car_make: "Ford" },
  ];

  const [carModelFilter, setCarModelFilter] = useState("");
  const [carModelYearFilter, setCarModelYearFilter] = useState("");

  const handleCarModelFilterChange = (e) => {
    setCarModelFilter(e.target.value);
  };

  const handleCarModelYearFilterChange = (e) => {
    setCarModelYearFilter(e.target.value);
  };

  const filteredData = data.filter((car) => {
    return (
      car.car_model.toLowerCase().includes(carModelFilter.toLowerCase()) &&
      car.car_model_year.toString().includes(carModelYearFilter)
    );
  });

  const years = [];
  for (let year = 2000; year <= 2023; year++) {
    years.push(year);
  }

  return (
    <div>
      <h1>Daftar Mobil</h1>
      <label>
        Filter Model Mobil:
        <select value={carModelFilter} onChange={handleCarModelFilterChange}>
          <option value="">-- Pilih Model Mobil --</option>
          <option value="FJ Cruiser">FJ Cruiser</option>
          <option value="Explorer">Explorer</option>
          <option value="Cabriolet">Cabriolet</option>
          <option value="Arnage">Arnage</option>
          {/* Isi select field dengan opsi model mobil */}
        </select>
      </label>
      <label>
        Filter Tahun Mobil:
        <select
          value={carModelYearFilter}
          onChange={handleCarModelYearFilterChange}
        >
          <option value="">-- Pilih Tahun Mobil --</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Model Mobil</th>
            <th>Tahun Mobil</th>
            <th>Merk Mobil</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.car_model}</td>
              <td>{car.car_model_year}</td>
              <td>{car.car_make}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarList;
