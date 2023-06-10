import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";
import { ADD_PROJECT } from "../mutations/projectMutations";


export default function AddProjectModal() {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    status: "new",
    clientId: "",
  });

  const [addProject]=useMutation(ADD_PROJECT,{
    variables:{name:newProject.name,description:newProject.description,status:newProject.status,clientId:newProject.clientId},
    update(cache,{data:{addProject}}){
      const {projects}=cache.readQuery({query:GET_PROJECTS})
      cache.writeQuery({
        query:GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      })
    }
  })



  //client for select
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;



  const onSubmit = (e) => {
    e.preventDefault();
    console.log('client id',newProject)
    if (
      newProject.name === "" ||
      newProject.description === "" ||
      newProject.status === ""
    ) {
      return alert("please fill in all fields");
    }
    addProject(newProject.name,newProject.description,newProject.status,newProject.clientId)
  
    setNewProject({
      name: "",
      description: "",
      status: "new",
      clientId: "",
    });
  };
  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Porject</div>
            </div>
          </button>

          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectModalLabel">
                    New Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={newProject.name}
                        onChange={(e) =>
                          setNewProject((prev) => {
                            return { ...prev, name: e.target.value };
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="email"
                        value={newProject.description}
                        onChange={(e) =>
                          setNewProject((prev) => {
                            return { ...prev, description: e.target.value };
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        id="status"
                        value={newProject.status}
                        onChange={(e) =>
                          setNewProject((prev) => {
                            return { ...prev, status: e.target.value };
                          })
                        }
                      >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        id="clientId"
                        className="form-select"
                        value={newProject.clientId}
                        onChange={(e) =>
                          setNewProject((prev) => {
                            return { ...prev, clientId: e.target.value };
                          })
                        }
                      >
                        <option value="">Select Client</option>
                        {data.clients.map((client)=>(
                          <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
