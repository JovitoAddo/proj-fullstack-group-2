import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./Login.css";
import { Link, useNavigate, } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Login = ({}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axios.post("http://localhost:5000/login", user)
    .then((res) => {
      const message = res.data.message

      if(message==="Login Successful"){
        Swal.fire({
          icon: 'success',
          title: (message),
          color: '3E497A',
          backdrop: 'rgb(62, 73, 122)',
        })
      Cookies.set("token", res.data.token, { expires: 7, path: "/" });

      navigate("/");
      }else if(message==="email / password invalid"){
        Swal.fire({
          icon: 'error',
          title: (message),
          color: '3E497A',
          backdrop: 'rgb(62, 73, 122)',
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: (message),
          color: '3E497A',
          backdrop: 'rgb(62, 73, 122)',
        })
      }
    });
  };

  return (
    <div>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-2">
              <div className="section pb-2 pt-2 pt-sm-2 text-center">
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4
                            className="mb-4 pb-3"
                            style={{ color: "#F0F0F0" }}
                          >
                            Login
                          </h4>
                          <div className="form-group">
                            <input
                              type="email"
                              name="email"
                              className="form-style"
                              placeholder="Your Email"
                              id="email"
                              autocomplete="off"
                              value={user.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div class="form-group mt-2">
                            <input
                              type="password"
                              name="password"
                              className="form-style"
                              placeholder="Your Password"
                              id="password"
                              autocomplete="off"
                              value={user.password}
                              onChange={handleChange}
                            />
                            <br />
                            <br />
                          </div>
                          <Button
                            variant="outline-warning"
                            className="btn-loginp"
                            onClick={handleSubmit}
                          >
                            Submit
                          </Button>
                          <p
                            className="mb-0 mt-4 text-center"
                            style={{ color: "#F0F0F0" }}
                          >
                            Don't have an account yet?
                            <br />
                            <a href="/register" style={{ color: "#F0F0F0" }}>
                              Register here!
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
