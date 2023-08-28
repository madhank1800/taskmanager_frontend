import React, { useState } from "react";
import axios from "axios";
import "./home.css";

const AddTask = () => {
  const [form, setForm] = useState([]);
  const handleChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };
  const postData = () => {
    axios
      .post(`https://taskmanager-backend-bdy0.onrender.com/tasks/addtask`, form)
      .then((res) => {
        if (res.status === 201) {
          window.location.reload();
          //    navigate("/home")
        }
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await postData();
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary add"
        data-bs-toggle="modal"
        data-bs-target="#addTask"
      >
        <i className="bi bi-plus-circle"></i>
        Add New Task
      </button>

      <div
        className="modal fade"
        id="addTask"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add New Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="InputTitle"
                    aria-describedby="titleHelp"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    onChange={handleChange}
                    id="desc"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddTask;
