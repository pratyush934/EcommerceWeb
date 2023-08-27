import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:8080/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    result = await result.json();
    setProducts(result);
  };
  //   console.warn("products", products);

  const deleteProduct = async (id) => {
    try {
      let result = await fetch(`http://localhost:8080/product/${id}`, {
        method: "DELETE", // "Delete" should be in uppercase
        headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
      });

      // Debugging log
      console.log("Response status:", result.status);

      if (result.status === 200) {
        console.warn(`Deleted`);
        alert(`Deleted`);
        // You might want to update the local state to reflect the deleted item, if applicable
        getProducts();
      } else {
        console.error("Deletion failed with status:", result.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const searchHandle = async (event) => {
    // console.warn(event.target.value);
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:8080/search/${key}`, {
        headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>ProductList</h3>

      <input
        className="search"
        type="text"
        placeholder="Search Product"
        onChange={searchHandle}
      />

      <ul>
        <li>S No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>

      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>$ {item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={"/update/" + item._id}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
};

export default ProductList;
