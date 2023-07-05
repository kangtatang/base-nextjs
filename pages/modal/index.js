import CustomModal from "../../components/Modal";

import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const modal = () => {
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
            <h1>Selamat Datang di Next.js!</h1>
            <CustomModal />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default modal;

// import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import Head from "next/head";
// import Navbar from "../../components/Navbar";
// import Sidebar from "../../components/Sidebar";
// import Footer from "../../components/Footer";

// const ModalExample = () => {
//   const [contentHeight, setContentHeight] = useState(0);

//   useEffect(() => {
//     const handleResize = () => {
//       setContentHeight(window.innerHeight);
//     };

//     handleResize();

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const [showModal, setShowModal] = useState(false);

//   const handleShowModal = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div>
//       <Head>
//         <title>Halaman About</title>
//       </Head>
//       <Navbar />
//       <div className="container-fluid">
//         <div className="row">
//           <Sidebar />
//           <main
//             className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-light"
//             style={{ minHeight: contentHeight }}
//           >
//             <button className="btn btn-primary" onClick={handleShowModal}>
//               Buka Modal
//             </button>
//           </main>
//         </div>
//       </div>
//       <Footer />

//       {showModal && (
//         <div className="modal show" tabIndex="-1" role="dialog">
//           <div className="modal-dialog" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Contoh Modal</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   data-dismiss="modal"
//                   aria-label="Close"
//                   onClick={handleCloseModal}
//                 >
//                   <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <p>Ini adalah isi modal.</p>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-dismiss="modal"
//                   onClick={handleCloseModal}
//                 >
//                   Tutup
//                 </button>
//                 <button type="button" className="btn btn-primary">
//                   Simpan
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ModalExample;
