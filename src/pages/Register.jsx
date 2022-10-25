import React, { useState } from "react";
import { Link } from "react-router-dom";
import { countryCodes } from "../utils/countryCodes";

const Register = () => {
  const [error, setError] = useState(false);
  const [btnDisabled, setbtnDisabled] = useState(true);
  const [user, setUser] = useState({
    username: "",
    name: "",
    address: "",
    age: "",
    phone: "",
    avatar: "",
    password: "",
  });

  const formChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log(user);
  };
  return (
    <div>
      <div className="container mb-5">
        <nav className=" container navbar navbar-dark bg-dark">
          <div className="container-fluid col-md-9">
            <h1 className="m-5 text-white">Register</h1>
            <div>
              <span className="text-white">Already registered? </span>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </nav>
      </div>
      {error && (
        <h3 className="text-white text-center">Error: Invalid e-mail.</h3>
      )}
      <div className="container">
        <div className="row">
          <div className="col-md-9 m-auto">
            <div className="card">
              <div className="card-body">
                <form
                  action="/register"
                  method="POST"
                  encType="multipart/form-data"
                  className="d-flex row justify-content-center"
                >
                  <div className="input-group m-3">
                    <label className="form-label" htmlFor="email">
                      E-mail:{" "}
                    </label>
                    <input
                      onChange={(e) => formChange(e)}
                      type="email"
                      className="form-control mx-3"
                      id="username"
                      name="username"
                    />
                    <label className="form-label" htmlFor="name">
                      Name:{" "}
                    </label>
                    <input
                      onChange={(e) => formChange(e)}
                      type="text"
                      className="form-control mx-3"
                      id="name"
                      name="name"
                    />
                  </div>
                  <div className="input-group m-3">
                    <label htmlFor="address">Address: </label>
                    <input
                      onChange={(e) => formChange(e)}
                      type="text"
                      className="form-control mx-3"
                      id="address"
                      name="address"
                    />
                    <label htmlFor="age">Age: </label>
                    <input
                      onChange={(e) => formChange(e)}
                      type="number"
                      className="form-control mx-3"
                      id="age"
                      name="age"
                    />
                  </div>
                  <div className="input-group m-3">
                    <label htmlFor="phone">Phone-number: </label>
                    <select
                      name="area"
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="+54"> Argentina (+54)</option>
                      {countryCodes.map((country) => {
                        return (
                          <option
                            key={`${country.dial_code}-${country.name}`}
                            value={country.dial_code}
                          >
                            {country.name} ({country.dial_code})
                          </option>
                        );
                      })}
                    </select>
                    <input
                      onChange={(e) => formChange(e)}
                      type="tel"
                      className="form-control mx-3"
                      id="phone"
                      name="phone"
                    />
                    <label htmlFor="avatar">Avatar: </label>
                    <input
                      onChange={(e) => formChange(e)}
                      type="file"
                      className="form-control mx-3"
                      id="avatar"
                      name="avatar"
                    />
                  </div>
                  <div className="input-group m-3">
                    <label htmlFor="password">Password : </label>
                    <input
                      onInput={(e) => formChange(e)}
                      type="password"
                      className="form-control mx-3"
                      id="password"
                      name="password"
                    />
                    <label htmlFor="confirm-pw">Confirm Password : </label>
                    <input
                      onInput={(e) => formChange(e)}
                      type="password"
                      className="form-control mx-3"
                      id="confirm-pw"
                      name="confirm-pw"
                    />
                  </div>
                  <div className="d-flex row justify-content-center">
                    <button
                      disabled={btnDisabled}
                      type="submit"
                      id="btnSend"
                      className="mt-3 btn btn-primary btn-lg"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
