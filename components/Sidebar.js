import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="col-md-3 col-lg-2 d-md-block bg-dark sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link href="/contoh/berhitung" className="nav-link active">
              <span>Berhitung</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/todo" className="nav-link">
              <span>Todo List</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/datagrid" className="nav-link">
              <span>Data Grid</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/modal" className="nav-link">
              <span>Modal</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/modal/notif" className="nav-link">
              <span>Notif</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/spa" className="nav-link">
              <span>Togle Content</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/post" className="nav-link">
              <span>Post From API</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/select" className="nav-link">
              <span>multi Select</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/select/car" className="nav-link">
              <span>Filter By Select</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/basicform" className="nav-link">
              <span>Basic Form</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/upload" className="nav-link">
              <span>Upload</span>
            </Link>
          </li>
          {/* Tambahkan menu lainnya di sini */}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
