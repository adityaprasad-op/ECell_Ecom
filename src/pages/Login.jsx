import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import { useCookies } from "react-cookie";

const Login = () => {
  const[ email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const history = useNavigate();
  const [cookie, setCookie] = useCookies();

  const login = async (e) => {
    e.preventDefault()
    console.warn(email,password)
    let item={email,password};
    let result = await fetch("https://e-commerce.urownsite.xyz/users/login",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body:JSON.stringify(item)
    });
    result = await result.json()
    console.log(result)
    setCookie('auth_key',result.authorization)
    localStorage.setItem("user-info", JSON.stringify(result))
    history("/")
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={login}>
              <div className="my-3">
                <label htmlFor="display-4">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
