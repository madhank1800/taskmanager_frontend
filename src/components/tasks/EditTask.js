import React,{useState,useEffect} from "react";
import axios from "axios";

const EditTask = ({ open, item }) => {
    const [form, setForm] = useState({
      title: item?.title || "",
      description: item?.description || "",
    });
    const handleChange = (evt) => {
      setForm({ ...form, [evt.target.name]: evt.target.value });
    };
    


    useEffect(() => {
      // Update the form state when the item prop changes
      setForm({
        title: item?.title || "",
        description: item?.description || "",
      });
    }, [item]);






    const editData = (id) => {
      axios.put(`http://localhost:8080/tasks/updateTask/${id}`, form).then((res) => {
        if (res.status === 200) {
          window.location.reload();
          //    navigate("/home")
        }
      });
    };
    const handleSubmit = async (id) => {
      console.log(form);
      await editData(id);
    };
    return (
      <>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Task
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
                      defaultValue={item?.title}
                      id="InputTitle"
                      aria-describedby="titleHelp"
                      onChange={(eve) => {
                        handleChange(eve);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      defaultValue={item?.description}
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
                  onClick={()=>{handleSubmit(item._id);}}
                >
                  update 
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
export default EditTask;