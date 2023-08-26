import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
      <img className="logo" src="https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg" alt="logo"></img>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              LogOut
              ({JSON.parse(auth).name})
            </Link>
          </li>
          {/* <li>
          {auth ? (
            <Link onClick={logout} to="/signup">
              LogOut
            </Link>
          ) : (
            <Link to="/signup">SignUp</Link>
          )}
          
        </li> */}
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/login">LogIn</Link>
            </li>
          </>
        </ul>
      )}
    </div>
  );
};

export default Nav;
