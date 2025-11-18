import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const Userlist = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
    getUsers();
  }, []);

    const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

    const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };



  return (
    <section className="section">
      <div className="container">
      <h1 className="title is-2">User List</h1>
      <Link to="/users/add" className="button is-primary mb-2 mt-4">
        Add New
      </Link>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>User Name</th>
            <th>Role</th>
            <th>Bisnis Unit</th>
            <th>Sub Unit</th>
            <th>Site Plant</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.access?.businessUnit}</td>
              <td>{user.access?.subUnit}</td>
              <td>{user.access?.branch}</td>
              <td>
                <Link
                  to={`/users/edit/${user.id}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </section>
  )
}

export default Userlist
