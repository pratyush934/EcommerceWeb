import React from "react";

const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);

  const addProduct = async () => {
    console.warn(!name);

    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    console.warn(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:8080/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    // console.warn(userId._id);
    result = await result.json();
    console.warn(result);
  };

  return (
    <div className="products">
      <h1>Add Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product Price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>
      {error && !price && (
        <span className="invalid-input">Enter valid Price</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      ></input>
      {error && !category && (
        <span className="invalid-input">Enter valid Category</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product Company"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      ></input>
      {error && !company && (
        <span className="invalid-input">Enter valid Company</span>
      )}
      <button onClick={addProduct} className="appbutton" type="button">
        Add
      </button>
    </div>
  );
};

export default AddProduct;
