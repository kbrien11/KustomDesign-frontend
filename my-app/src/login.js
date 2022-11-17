import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const navigate = useNavigate();

  const LoginButton = async () => {
    const endpoint = "http://127.0.0.1:8000/api/login";
    const data = {
      email: inputEmail,
      password: inputPassword,
    };
    const configs = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(endpoint, configs);
    const res = await response.json();
    console.log(res.user_type)
    if (res) {
        
      if (res.user_type === "Artist") {
        sessionStorage.setItem('artistid',res.id)
        navigate("/artist");
      }
      if (res.user_type === " User" || res.user_type === "User" ) {
        sessionStorage.setItem('userpk',res.id)
        navigate("/user");
      }
    } else {
      console.log("error");
    }
  };

  return (
    <div>
      <input type="text" placeholder="Username.." onChange={(e) => setInputEmail(e.target.value)} />{" "}
      <input
        type="text"
        placeholder="Password.."
        onChange={(e) => setInputPassword(e.target.value)}
      />{" "}
      <button onClick={(e) => LoginButton()}> Add Image</button>
    </div>
  );
};

export default Login;
