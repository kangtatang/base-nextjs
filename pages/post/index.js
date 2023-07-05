import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Link from "next/link";

const PostList = () => {
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

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  // Menghitung indeks post yang akan ditampilkan
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Mengubah halaman
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            <h1>Daftar Post</h1>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <ul>
                  {currentPosts.map((post) => (
                    <li key={post.id}>
                      <Link href={`/post/${post.id}`}>
                        <h3 className="text-primary">{post.title}</h3>
                      </Link>
                      <p>{post.body}</p>
                    </li>
                  ))}
                </ul>
                {/* Pagination */}
                <nav>
                  <ul className="pagination">
                    {Array.from(
                      { length: Math.ceil(posts.length / postsPerPage) },
                      (_, index) => (
                        <li key={index} className="page-item">
                          <a
                            className="page-link"
                            onClick={() => paginate(index + 1)}
                            href="#"
                          >
                            {index + 1}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </nav>
              </>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostList;
