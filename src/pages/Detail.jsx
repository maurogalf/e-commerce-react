import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail = ({ user }) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getProduct = async (id) => {
    try {
      const response = await axios({
        method: "GET",
        url: `https://e-commerce-node-mga.herokuapp.com/api/products/${id}`,
        headers: {
          authorization: "bearer " + token,
        },
        data: {},
      });
      setProduct(response.data);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      if (error.response.status === 401) {
        localStorage.clear("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  const addProduct = async (code) => {
    try {
      await axios({
        method: "POST",
        url: `https://e-commerce-node-mga.herokuapp.com/api/carts/${user}`,
        headers: {
          authorization: `bearer ${token}`,
        },
        data: {
          code: product.code,
        },
      });
      navigate("/productos");
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return (
      <div className="container d-flex justify-content-center">
        <h3 className="text-white">Error: {error}</h3>
      </div>
    );
  }
  if (product.name === undefined) {
    return <h3 className="text-white">Cargando...</h3>;
  }
  return (
    <div>
      <div className="container d-flex justify-content-center">
        <div
          className="card bg-secondary text-white text-bg-secondary m-5"
          style={{ width: 80 + "vw" }}
        >
          <div className="row g-0">
            <div className="col-md-4 d-flex p-4 justify-content-center">
              <img
                src={`https://e-commerce-node-mga.herokuapp.com/${product.thumbnail}`}
                className="rounded mx-auto d-block"
                style={{ maxWidth: 100 + "%" }}
                alt={product.name}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-secondary">
                    {product.description}
                  </li>
                  <li className="list-group-item bg-secondary">
                    Category: {product.category}
                  </li>
                  <li className="list-group-item bg-secondary">
                    Price: $ {product.price}
                  </li>
                  <li className="list-group-item bg-secondary">
                    Stock: {product.stock}
                  </li>
                  <li className="list-group-item bg-secondary d-flex justify-content-center my-4">
                    <button
                      onClick={() => addProduct(product.code)}
                      type="submit"
                      className="btn btn-success"
                    >
                      Add to cart 🛒
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
