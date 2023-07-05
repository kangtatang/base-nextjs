import { useState, useEffect } from "react";
import ViewDetail from "./ViewDetail";
import { Modal, Button } from "react-bootstrap";

const DataGrid = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // Filter data based on search term
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  // Menghitung total halaman
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Menghitung indeks data yang akan ditampilkan
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (column) => {
    if (column === sortColumn) {
      // Reverse the sort direction if the same column is clicked again
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Sort the data based on the selected column
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Mengatur ulang halaman ke halaman pertama
  };

  const sortedData = sortColumn
    ? [...currentItems].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      })
    : currentItems;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // detail-view
  const [selectedItem, setSelectedItem] = useState(null);
  const handleViewDetail = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    // Lakukan tindakan edit data, seperti menampilkan formulir pengeditan
  };

  const handleDelete = (item) => {
    // Lakukan tindakan penghapusan data, seperti mengirim permintaan API DELETE
  };

  return (
    <div>
      <div className="col-md-3">
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* {selectedItem && (
        <div className="mt-2 mb-2">
          <ViewDetail
            selectedItem={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        </div>
      )} */}
      <table className="table table-hover table-info table-striped">
        <thead className="table-dark">
          <tr>
            <th onClick={() => handleSort("id")}>
              ID{" "}
              {sortColumn === "id" && (
                <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("nama")}>
              Nama{" "}
              {sortColumn === "nama" && (
                <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("jabatan")}>
              Jabatan{" "}
              {sortColumn === "jabatan" && (
                <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("email")}>
              Email{" "}
              {sortColumn === "email" && (
                <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("alamat")}>
              Alamat{" "}
              {sortColumn === "alamat" && (
                <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th>Keterangan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{item.jabatan}</td>
              <td>{item.email}</td>
              <td>{item.alamat}</td>
              <td>{item.keterangan}</td>
              <td>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => handleViewDetail(item)}
                >
                  Detail
                </button>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(item)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* modal */}
      {selectedItem && (
        <div className="mt-2 mb-2">
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton className="bg-info">
              <Modal.Title>Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ViewDetail
                selectedItem={selectedItem}
                onClose={handleCloseModal}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="info" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
      {/* modal */}

      {/* Pagination */}
      {/* Tampilkan pagination */}
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
    </div>
  );
};

export default DataGrid;
