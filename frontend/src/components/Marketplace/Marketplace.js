import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Marketplace.css"

const Marketplace = ({ firebase_Id }) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [editingProductId, setEditingProductId] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getProducts/${firebase_Id}`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [firebase_Id]);

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/postProducts`, {
        firebase_Id: firebase_Id,
        name: productName,
        description: productDescription,
      });
      console.log("Product added:", response.data);
      setProducts([...products, response.data.data.ops[0]]);
      setProductName("");
      setProductDescription("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (productId, newName, newDescription) => {
    try {
      await axios.patch(`http://localhost:8000/updateProd/${productId}`, {
        name: newName,
        description: newDescription,
      });
      const updatedProducts = products.map((product) => {
        if (product._id === productId) {
          return { ...product, name: newName, description: newDescription };
        }
        return product;
      });
      setProducts(updatedProducts);
      setEditingProductId("");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      {/*  Add Product Modal Button*/}
      <div className="d-flex justify-content-end me-5">
      <button type="button" class="btn btn-color" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add Product
      </button>
      </div>

      {/*  Add Product Modal */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Add Product To MarketPlace</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleAddProduct} className="product-form">

                <div class="form-group">
                  <label class="form-control-label ">Product Name</label>
                  <input type="text" id="productname" name="productname" placeholder="Enter Product Name" class="form-control" onChange={(e) => setProductName(e.target.value)} required />
                </div>

                <div class="form-group">
                  <label class="form-control-label ">Product Description: </label>
                  <input type="text" id="desc" name="desc" placeholder="Phone no or email id" class="form-control" onChange={(e) => setProductDescription(e.target.value)} required />
                </div>

                <div class="row justify-content-center my-3 px-3">
                  <button class="btn-block btn-color" type="submit">Add Product</button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>

      {/*  List all products */}
      <div className="products mt-5 container">
        <h2 className="fw-bold ">Products</h2>
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="card col-md-3 border-0 rounded-0 shadow m-2 p-0">
              {editingProductId === product._id ? (
                <div className="product-form p-3">
                  <h3 className="fw-bold mb-2">Edit Product</h3>

                  <div class="form-group">
                    <label class="form-control-label ">Product Name</label>
                    <input type="text" id="productname" name="productname" value={productName} class="form-control" onChange={(e) => setProductName(e.target.value)} required />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label ">Product Description: </label>
                    <input type="text" id="desc" name="desc" value={productDescription} class="form-control" onChange={(e) => setProductDescription(e.target.value)} required />
                  </div>

                  <div class="d-flex justify-content-between ">
                    <button class=" btn-color" onClick={() =>
                      handleEditProduct(
                        product._id,
                        productName,
                        productDescription
                      )
                    }>Save</button>

                    <button className=" btn-color" onClick={() => setEditingProductId("")}>Cancel</button>
                  </div>
                </div>
              ) : (

                <>
                  <img src="https://codingyaar.com/wp-content/uploads/bag-scaled.jpg" class="card-img-top rounded-0" alt="..." />
                  <div class="card-body mt-3 mb-3">
                    <div class="row">
                      <div class="col-10">
                        <h4 class="card-title">{product.name}</h4>
                        <p>{product.description}</p>
                      </div>
                    </div>
                  </div>
                  <div class="row align-items-center text-center g-0">
                    <div class="col-4">
                      <h5>$129</h5>
                    </div>
                    <div class="col-8">
                      <button class="btn  btn-primary w-100 p-3 rounded-0" onClick={() => setEditingProductId(product._id)}>Edit</button>
                    </div>
                  </div>
                </>



              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
