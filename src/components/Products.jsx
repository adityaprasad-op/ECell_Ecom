import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  let componentMounted = true;

  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("https://e-commerce.urownsite.xyz/products/");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);


  function handle1(e) {
    setSearchResult(e.target.value);
  }
  const [searchResult, setSearchResult] = useState("");

  async function searchPost(title) {
    let item = {title}
    let url = 'https://e-commerce.urownsite.xyz/products/search'
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": Cookies.get('auth_key'),
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setData(response)
        });
}

  
  console.log(data);
  const ShowProducts = () => {
    return (
      <>
        {data.data && data.data.map((product) => {
          return (
            <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100" key={product.id}>
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title}
                  </h5>
                  <p className="card-text">
                    {product.description}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                </ul>
                <div className="card-body">
                  <Link to={"/product/" + product.id} state={product} className="btn btn-dark m-1">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>

          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div>
              <h1>Search Bar</h1>
              <input required type="text" name="result" placeholder="Search Posts" onChange={(e) => handle1(e)} />
              <input type="button" value="Search" onClick={() => searchPost(searchResult)} />
          </div>
          <div className="col-12">
            <h2 className="display-5 text-center">All Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
        <ShowProducts />
        </div>
      </div>
    </>
  );
};

export default Products;
