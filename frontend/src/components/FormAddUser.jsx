import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddUser = () => {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [access, setAccess] = useState({
    businessUnit: "",
    subUnit: "",
    branch: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // ✅ inisialisasi

  const handleChangeAccess = (e) => {
    setAccess({
      ...access,
      [e.target.name]: e.target.value,
    });
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users/create", {
        username: username,
        password: password,
        role: role,
        access: access,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="container mt-6">
      <h1 className="title is-4">Tambah User Baru</h1>
      <form onSubmit={saveUser} className="box">
        <p className="has-text-centered">{msg}</p>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan username"
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Role</label>
          <div className="control">
            <div className="select">
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Pilih Role</option>
                <option value="adminBU">Admin BU</option>
                <option value="adminSU">Admin SubUnit</option>
                <option value="viewer">Branch</option>
              </select>
            </div>
          </div>
        </div>

        <hr />

        <div className="field">
          <label className="label">Business Unit</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="businessUnit"
              value={access.businessUnit}
              onChange={handleChangeAccess}
              placeholder="Contoh: BU-PLANTATION"
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Sub Unit</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="subUnit"
              value={access.subUnit}
              onChange={handleChangeAccess}
              placeholder="Contoh: SU-PLANTATION"
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Branch</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="branch"
              value={access.branch}
              onChange={handleChangeAccess}
              placeholder="Contoh: THIP"
              required
            />
          </div>
        </div>

        <div className="field is-grouped mt-4">
          <div className="control">
            <button type="submit" className="button is-primary">
              Simpan
            </button>
          </div>
          <div className="control">
            <button type="reset" className="button is-light">
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormAddUser;
