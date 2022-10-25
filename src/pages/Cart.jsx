import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = ({ user }) => {
  const [products, setProducts] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getCartUser = async (user) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://e-commerce-node-mga.herokuapp.com/api/carts/${user}`,
        headers: {
          authorization: `bearer ${token}`,
        },
        data: {},
      });
      setProducts(data.items);
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 401) {
        localStorage.clear("token");
        navigate("/login");
      }
    }
  };

  const handleDelete = (code) => {
    try {
      axios({
        method: "PUT",
        url: `https://e-commerce-node-mga.herokuapp.com/api/carts/${user}`,
        headers: {
          authorization: `bearer ${token}`,
        },
        data: {
          code: code,
        },
      });
      setProducts(products.filter((products) => products.code !== code));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCheckOut = async () => {
    try {
      await axios({
        method: "POST",
        url: `https://e-commerce-node-mga.herokuapp.com/api/orders/${user}`,
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      navigate(`/orders/last`);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    user && getCartUser(user);
  }, [user]);

  if (!products) {
    return <h2 className="m-5 text-white">Cargando...</h2>;
  }

  if (products.length === 0) {
    return <h2 className="m-5 text-white">The cart is empty!</h2>;
  }
  return (
    <div>
      <div className="container mb-5">
        <div className=" container navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <h2 className="m-5 text-white">Cart detail: </h2>
          </div>
        </div>
      </div>
      <table className="table table-dark table-striped mt-5">
        <thead>
          <tr>
            <th scope="col">ID Producto</th>
            <th scope="col">Nombre del Curso</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
            <th scope="col">Logo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody id="form">
          {products.map((product) => {
            return (
              <tr key={product._id}>
                <th scope="row">{product.code}</th>
                <td>
                  <Link className="text-white" to={`/productos/${product._id}`}>
                    {product.name}
                  </Link>
                </td>
                <td>{product.cant}</td>
                <td>$ {product.price}</td>
                <td>
                  <img
                    style={{ maxWidth: 50 + "px" }}
                    src={`https://e-commerce-node-mga.herokuapp.com/${product.thumbnail}`}
                    alt={product.name}
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(product.code)}
                    name="_DELETE"
                    type="submit"
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex my-5 py-3 border-top border-white justify-content-end">
        <button
          onClick={handleCheckOut}
          name="FINISH"
          type="submit"
          className="btn btn-success"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
