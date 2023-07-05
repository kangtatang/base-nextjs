import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewDetail = ({ selectedItem, onClose }) => {
  return (
    <div>
      {/* <h2>Detail Data</h2> */}
      {selectedItem && (
        <div>
          <table className="table table-striped table-sm table-hover">
            <tr>
              <td>ID</td>
              <td>: {selectedItem.id}</td>
            </tr>
            <tr>
              <td>Nama</td>
              <td>: {selectedItem.nama}</td>
            </tr>
            <tr>
              <td>Jabatan</td>
              <td>: {selectedItem.jabatan}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>: {selectedItem.email}</td>
            </tr>
            <tr>
              <td>Alamat</td>
              <td>: {selectedItem.alamat}</td>
            </tr>
            <tr>
              <td>Keterangan</td>
              <td>: {selectedItem.keterangan}</td>
            </tr>
          </table>
        </div>
      )}
      {/* <button className="btn btn-ms btn-info" onClick={onClose}>
        Tutup
      </button> */}
    </div>
  );
};

export default ViewDetail;
