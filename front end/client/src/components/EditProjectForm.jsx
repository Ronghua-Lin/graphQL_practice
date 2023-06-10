import React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

export default function EditProjectForm({ project }) {
  const [newProject, setNewProject] = useState({
    name: project.name,
    description: project.description,
    status: "new",
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name: newProject.name,
      description: newProject.description,
      status: newProject.status,
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      newProject.name === "" ||
      newProject.description === "" ||
      newProject.status === ""
    ) {
      return alert("please fill in all fields");
    }
    updateProject(
      newProject.name,
      newProject.description,
      newProject.status
    );
    // addClient(newClient.name, newClient.email, newClient.phone);
    setNewProject({
      name: "",
      description: "",
      status: "new",
    });
  };
  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={(e)=>onSubmit(e)}>
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
