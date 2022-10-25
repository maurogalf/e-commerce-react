import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div>
      <div
        className="card m-3 text-center rounded"
        style={{ maxWidth: 18 + "rem", minWidth: 15 + "vw" }}
      >
        <div>
          <img
            className="card-img-top m-1"
            src={`https://e-commerce-node-mga.herokuapp.com/${product.thumbnail}`}
            style={{ maxWidth: 10 + "rem" }}
            alt={product.name}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">$ {product.price}</p>
          <Link to={`/productos/${product._id}`}>
            <button className="btn btn-dark">View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
