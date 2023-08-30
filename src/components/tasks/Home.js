import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import AddTask from "./AddTask";
import NavBar from "../navbar/Navbar";
import EditTask from "./EditTask";
const Home = () => {
  const [data, setData] = useState([]);
  const [item, setitem] = useState();
  const [open, setOpen] = useState(false);

  const fectData = () => {
    axios
      .get(`https://taskmanager-backend-bdy0.onrender.com/tasks/getAllTasks`)
      .then((data) => {
        // console.log(data);
        setData(data.data);
      })
      .then((res) => {});
  };

  useEffect(() => {
    fectData();
  }, [data]);
  const handleEdit = (id) => {
    axios
      .put(
        `https://taskmanager-backend-bdy0.onrender.com/tasks/updateTask/${id}`,
        {
          status: "completed",
        }
      )
      .then((data) => {
        console.log(data);
        //window.location.reload();
      });
  };
  const handleDelete = (id) => {
    axios
      .delete(
        `https://taskmanager-backend-bdy0.onrender.com/tasks/deleteTask/${id}`,
        {
          status: "completed",
        }
      )
      .then((data) => {
        window.location.reload();
      });
  };

  const handleOpen = (item) => {
    console.log(item);
    setOpen(true);
    setitem(item);
  };
  return (
    <>
      <NavBar />
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="alltasks-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true"
          >
            All Tasks
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="false"
          >
            Completed
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="alltasks-tab"
          tabIndex="0"
        >
          <div className="container custom">
            <AddTask />

            <table className="table tableColorClass">
              <thead className="table-primary">
                <tr>
                  <th scope="row">Sno.</th>
                  <th colSpan="4">Title</th>
                  <th colSpan="4">Description</th>
                  {/* <th colSpan="4">status</th> */}
                  <th colSpan="4">Status</th>
                  <th colSpan="4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={index} className="table-light">
                      <th scope="row">{index + 1}</th>
                      <td colSpan="4">{item.title}</td>
                      <td colSpan="4" className="desc">
                        {item.description}
                      </td>
                      <td colSpan="4" className="">
                        {item.status === "pending" ? (
                          <p className="btn btn-danger btn-sm ">
                            {item.status}
                          </p>
                        ) : (
                          <p className="btn btn-success btn-sm">
                            {item.status}
                          </p>
                        )}
                      </td>
                      <td colSpan="4">
                        <button
                          type="button"
                          className="btn btn-info btn-sm"
                          onClick={() => {
                            handleEdit(item._id);
                          }}
                        >
                          Mark AsCompleted
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabIndex="0"
        >
          <div className="container custom">
            {/* <AddTask /> */}

            <table className="table ">
              <thead className="table-primary">
                <tr>
                  <th scope="row">Sno.</th>
                  <th colSpan="4">Title</th>
                  <th colSpan="4">Description</th>
                  {/* <th colSpan="4">status</th> */}
                  <th colSpan="4">Status</th>
                  <th colSpan="4">Edit</th>
                  <th colSpan="4">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((obj) => obj.status === "completed")
                  .map((item, index) => {
                    return (
                      <tr key={index} className="table-light">
                        <th scope="row">{index + 1}</th>
                        <td colSpan="4">{item.title}</td>
                        <td colSpan="4" className="desc">
                          {item.description}
                        </td>
                        <td colSpan="4" className="">
                          {item.status === "pending" ? (
                            <p className="btn btn-danger btn-sm ">
                              {item.status}
                            </p>
                          ) : (
                            <p className="btn btn-success btn-sm">
                              {item.status}
                            </p>
                          )}
                        </td>
                        <td colSpan="4">
                          <i
                            type="button"
                            className="bi bi-pencil"
                            style={{ cursor: "pointer" }}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => {
                              handleOpen(item);
                            }}
                          ></i>
                        </td>
                        <td colSpan="4">
                          {" "}
                          <i
                            className="bi bi-trash"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleDelete(item._id);
                            }}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* edit  */}
      <EditTask open={open} item={item} />
    </>
  );
};
export default Home;
