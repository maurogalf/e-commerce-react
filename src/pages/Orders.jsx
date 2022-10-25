import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Orders = ({ user }) => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://e-commerce-node-mga.herokuapp.com/api/orders/${user}`,
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      if (id === "last") {
        setOrders(data.slice(data.length - 1, data.length));
      } else if (id === undefined) {
        setOrders(data.reverse());
      } else {
        setOrders(data.filter((order) => order._id === id));
      }
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 401) {
        localStorage.clear("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div>
      {orders.map((order) => {
        return (
          <div
            key={order._id}
            className="container d-flex justify-content-center"
          >
            <div
              className="card bg-secondary text-white text-bg-secondary m-5"
              style={{ width: 80 + "vw" }}
            >
              <h3 className="p-2">Order n° {order.order_id} details:</h3>
              <div className="row g-0">
                <div className="col-md-12">
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item bg-secondary text-white">
                        Name: {order.name}
                      </li>
                      <li className="list-group-item bg-secondary text-white">
                        E-mail: {order.email}
                      </li>
                      <li className="list-group-item bg-secondary text-white">
                        Date: {order.date}
                      </li>
                      <li className="list-group-item bg-secondary text-white">
                        Address: {order.address}
                      </li>
                      <li className="list-group-item bg-secondary text-white">
                        State: {order.state}
                      </li>
                    </ul>
                  </div>
                  <table className="table table-dark table-striped mt-5">
                    <thead>
                      <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">Cant</th>
                        <th scope="col">Price</th>
                        <th scope="col">Sub-Total</th>
                      </tr>
                    </thead>
                    <tbody id="form">
                      {order.items.length > 0 &&
                        order.items.map((prod) => {
                          return (
                            <tr key={`${order._id}-${prod.code}`}>
                              <th>{prod.code}</th>
                              <td>{prod.name}</td>
                              <td>{prod.cant}</td>
                              <td>$ {prod.price}</td>
                              <td>$ {prod.total}</td>
                            </tr>
                          );
                        })}
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th scope="row">Total</th>
                        <th scope="row">$ {order.total}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      ;
    </div>
  );
};

export default Orders;
