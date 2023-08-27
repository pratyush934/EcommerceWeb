import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  //   const [error,setError] = React.useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    // console.warn(params);
    let result = await fetch(`http://localhost:8080/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    // console.warn(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProducts = async () => {
    console.warn({ name, price, category, company });
    let result = await fetch(`http://localhost:8080/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/");
  };

  return (
    <div className="products">
      <h1>Update Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Update product name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <input
        className="inputBox"
        type="text"
        placeholder="Update product Price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>
      <input
        className="inputBox"
        type="text"
        placeholder="Update product Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      ></input>
      <input
        className="inputBox"
        type="text"
        placeholder="Update product Company"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      ></input>
      <button onClick={updateProducts} className="appbutton" type="button">
        Update
      </button>
    </div>
  );
};

export default UpdateProduct;
