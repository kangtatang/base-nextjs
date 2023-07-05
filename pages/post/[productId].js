import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Link from "next/link";

const PostDetail = ({ post }) => {
  // State untuk menyimpan data post
  const [postDetail, setPostDetail] = useState(null);

  useEffect(() => {
    // Fungsi untuk mengambil data detail post
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${post}`
        );
        setPostDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostDetail();
  }, [post]);

  if (!postDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{postDetail.title}</h1>
      <p>{postDetail.body}</p>
    </div>
  );
};

const PostDetailPage = () => {
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
  // Mendapatkan parameter "productId" dari dynamic routing
  const { productId } = useRouter().query;

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
            <h1>Detail Post</h1>
            <PostDetail post={productId} />
            <div>
              <Link href="/post">
                <button className="btn btn-sm btn-info">Kembali</button>
              </Link>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetailPage;
