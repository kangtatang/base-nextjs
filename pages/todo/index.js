"use client";
// import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const Todo = () => {
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

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Math.random().toString(),
        text: inputValue,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
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
            <h1>Aplikasi To-Do List</h1>
            <div className="col-md-6">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  className="btn btn-success text-light btn-outline-secondary"
                  type="button"
                  id="button-addon1"
                  onClick={addTodo}
                >
                  Tambah
                </button>
              </div>
            </div>

            <div className="col-md-6">
              <ul className="list-group">
                {todos.map((todo) => (
                  <li className="list-group-item text-end" key={todo.id}>
                    {todo.text}
                    <button
                      className="ms-2 btn btn-sm btn-danger"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Hapus
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Todo;
