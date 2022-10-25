import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Productos = ({ user }) => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  const getProducts = async (category) => {
    let url = "";
    category !== undefined
      ? (url = `https://e-commerce-node-mga.herokuapp.com/api/products/category/${category}`)
      : (url = `https://e-commerce-node-mga.herokuapp.com/api/products/`);

    try {
      const response = await axios({
        method: "GET",
        url: url,
        headers: {
          authorization: `bearer ${token}`,
        },
        data: {},
      });
      setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts(category);
  }, [category]);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  return (
    <div>
      <div>
        <Link
          className={`btn btn-outline-secondary me-4 ${
            category === undefined && "disabled"
          }`}
          to="/productos"
        >
          All
        </Link>
        <Link
          className={`btn btn-outline-secondary me-4 ${
            category === "data" && "disabled"
          }`}
          to="/productos/category/data"
        >
          Data
        </Link>
        <Link
          className={`btn btn-outline-secondary me-4 ${
            category === "programacion" && "disabled"
          }`}
          to="/productos/category/programacion"
        >
          Programing
        </Link>
        <Link
          className={`btn btn-outline-secondary me-4 ${
            category === "diseno" && "disabled"
          }`}
          to="/productos/category/diseno"
        >
          Design
        </Link>
      </div>
      <div className="container d-flex flex-wrap justify-content-around p-3">
        {products.length > 0 &&
          products.map((product) => {
            return <ProductCard key={product.code} product={product} />;
          })}
      </div>
    </div>
  );
};

export default Productos;
