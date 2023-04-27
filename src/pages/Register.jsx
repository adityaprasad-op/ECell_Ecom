import React, {useState} from 'react'
import { Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {

    const[ email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const[ name, setName]=useState("");
    const history=useNavigate();

    const SignUp = (e) => {
        e.preventDefault()
        let item = {
            email,
            password,
            name,
        }
        console.log(item);
        fetch("https://e-commerce.urownsite.xyz/users/signUp",{
        method: "POST",
        headers:{
            "content-Type": "application/json",
        },
        body:JSON.stringify(item)
        }).then((res)=> res.json()).then(
            res => {
            console.log(res)
        })
    }

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={SignUp}>
                            <div className="form my-3">
                                <label htmlFor="Name">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    onChange={(e)=>setName(e.target.value)}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form  my-3">
                                <label htmlFor="Password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register