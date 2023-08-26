import React from "react";

const AddProduct = () => {

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company , setCompany] = React.useState('');

    const addProduct = () => {
        console.warn(name, price, category, company);
    }

  return (
    <div className="products">
      <h1>Add Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => {setName(e.target.value)}}
      ></input>
       <input
        className="inputBox"
        type="text"
        placeholder="Enter product Price"
        value={price}
        onChange={(e) => {setPrice(e.target.value)}}
      ></input>
       <input
        className="inputBox"
        type="text"
        placeholder="Enter product Category"
        value={category}
        onChange={(e) => {setCategory(e.target.value)}}
      ></input>
       <input
        className="inputBox"
        type="text"
        placeholder="Enter product Company"
        value={company}
        onChange={(e) => {setCompany(e.target.value)}}
      ></input>
      <button onClick={addProduct} className="appbutton" type="button">
        Add
      </button>
    </div>
  );
};

export default AddProduct;
