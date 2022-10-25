import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "https://e-commerce-node-mga.herokuapp.com/api/login",
        headers: {},
        data: {
          username: credentials.username,
          password: credentials.password,
        },
      });
      setUser(credentials.username);
      setError(false);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {}, [token]);
  if (token) {
    return <Navigate to="/productos" replace={true} />;
  }

  return (
    <div className="bg-dark container">
      <div className="container mb-5">
        <nav className=" container navbar navbar-dark bg-dark">
          <div className="container-fluid col-md-9">
            <h1 className="m-5 text-white">Login</h1>
            <div>
              <span className="text-white">Unregistered yet?</span>
              <Link to="/register"> Do it now.</Link>
            </div>
          </div>
        </nav>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-9 m-auto">
            <div className="card">
              <div className="card-body">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-group">
                    <label>User : </label>
                    <input
                      type="email"
                      className="form-control"
                      id="nombre"
                      name="username"
                      placeholder="Ingrese su nombre"
                      onInput={(e) =>
                        setCredentials({
                          ...credentials,
                          username: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Password : </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Ingrese su contraseña"
                      onInput={(e) =>
                        setCredentials({
                          ...credentials,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  {error && <p>Credentials error!</p>}
                  <button type="submit" className="mt-3 btn btn-primary">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
