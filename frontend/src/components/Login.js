import React, { useEffect } from "react";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if(auth) {
        navigate('/');
    }
  }, [])

  const handleLogin = async () => {
    console.warn(email, password);
    let result = await fetch("http://localhost:8080/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if(result.name) {
        localStorage.setItem('user', JSON.stringify(result));
        navigate('/');
    } else {
        alert("please Enter correct details")
    }
  };
  return (
    
    <div className="login">
        <h1>Login</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      ></input>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></input>
      <button onClick={handleLogin} className="appbutton" type="button">
        Login
      </button>
    </div>
  );
};

export default Login;
