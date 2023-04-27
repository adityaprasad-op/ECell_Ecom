import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { useLocation } from 'react-router-dom';

import { Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState([]);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    setProduct(location.state);
  }, []);

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                alt={product.title}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h1 className="display-5">{product.title}</h1>
              <p className="lead">
              </p>
              <p className="lead">{product.description}</p>
              <button
                className="btn btn-outline-dark"
                onClick={() => addProduct(product)}
              >
                Add to Cart
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row"><ShowProduct /></div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
