import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
  const [userInfo, setUserInfo] = useState(null);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const getUserInfo = async (user) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://e-commerce-node-mga.herokuapp.com/api/users/email/${user}`,
        headers: {
          authorization: `bearer ${token}`,
        },
        body: {},
      });
      setUserInfo(data);
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 401) {
        localStorage.clear("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (user) {
      getUserInfo(user);
    }
  }, [user]);

  if (userInfo === null) {
    return <h3 className="text-white">Cargando...</h3>;
  }
  return (
    <div className="container d-flex justify-content-center">
      <div
        className="card bg-secondary text-white text-bg-secondary m-5"
        style={{ width: 80 + "vw" }}
      >
        <div className="row g-0 m-4">
          <div className="col-md-4 d-flex justify-content-center">
            <img
              src={`https://e-commerce-node-mga.herokuapp.com/${userInfo.avatar}`}
              className="img-fluid rounded"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Name: {userInfo.name}</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-secondary">
                  E-mail: {userInfo.username}
                </li>
                <li className="list-group-item bg-secondary">
                  Address: {userInfo.address}
                </li>
                <li className="list-group-item bg-secondary">
                  Age: {userInfo.age}
                </li>
                <li className="list-group-item bg-secondary">
                  Phone number: {userInfo.phone}
                </li>
                <li className="list-group-item bg-secondary">
                  <a href="/orders">
                    <button className="btn btn-success">View all orders</button>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
