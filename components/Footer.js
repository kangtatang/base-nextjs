import React from "react";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">
        <span className="text-muted">
          &copy; {new Date().getFullYear()} Nama Perusahaan Anda
        </span>
      </div>
    </footer>
  );
};

export default Footer;
