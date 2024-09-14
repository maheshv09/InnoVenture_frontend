import React, { useState, useEffect } from "react";
import axios from "axios";
import './Marketplace.css'

const Marketplace = ({ firebase_Id }) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPhoto, setProductPhoto] = useState(""); // Updated to hold file object
  const [productPrice, setProductPrice] = useState("");
  const [editingProductId, setEditingProductId] = useState("");
  const [flag, setFlag] = useState(false); // Flag for photo upload status

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
    //console.log(products);
  }, [firebase_Id]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      let photoUrl = "";
      // if (productPhoto) {
      //   const formData = new FormData();
      //   formData.append("image", productPhoto);
      //   setFlag(true);
      //   const response = await axios.post(
      //     "https://api.imgbb.com/1/upload?key=e260abee406449ae9e7c159665ef502c",
      //     formData
      //   );
      //   photoUrl = response.data.data.display_url;
      // }

      const response = await axios.post(`http://localhost:8000/postProducts`, {
        firebase_Id: firebase_Id,
        name: productName,
        description: productDescription,
        photo: productPhoto,
        price: productPrice,
      });

      console.log("Product added:", response.data);
      
      window.location.reload();
      setProducts([...products, response.data.data.ops[0]]);
      setProductName("");
      setProductDescription("");
      setProductPhoto(null); // Reset file object after upload
      setProductPrice("");
      
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (
    productId,
    newName,
    newDescription,
    newPhoto,
    newPrice
  ) => {
    try {
     
      let photoUrl = newPhoto;

      const formData = new FormData();
      formData.append("image", newPhoto);
      setFlag(true);
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=e260abee406449ae9e7c159665ef502c",
        formData
      );
      console.log("RES:", response);
      photoUrl = response.data.data.display_url;

      console.log("URLLLL:", photoUrl);
      await axios.patch(`http://localhost:8000/updateProd/${productId}`, {
        name: newName,
        description: newDescription,
        photo: photoUrl,
        price: newPrice,
      });
      const updatedProducts = products.map((product) => {
        if (product._id === productId) {
          return {
            ...product,
            name: newName,
            description: newDescription,
            photo: photoUrl,
            price: newPrice,
          };
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
        <button type="button" class="btn btn-color" data-bs-toggle="modal" data-bs-target="#productModal">
          Add Product
        </button>
      </div>

      {/*  Add Product Modal */}
      <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="productModalLabel">Add Product To MarketPlace</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleAddProduct} className="product-form">

                <div class="form-group">
                  <label class="form-control-label ">Product Name</label>
                  <input type="text" id="productName" name="productName" placeholder="Enter Product Name" class="form-control" value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required />
                </div>

                <div class="form-group">
                  <label class="form-control-label ">Product Description: </label>
                  <input type="text" id="productDescription" name="productDescription" placeholder="Description" class="form-control" value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)} required />
                </div>

                <div class="form-group">
                  <label class="form-control-label ">Product Photo: </label>
                  <input type="text" id="productPhoto" name="productPhoto" placeholder="Photo" class="form-control"  onChange={(e) => setProductPhoto(e.target.value)} required />
                </div>

                <div class="form-group">
                  <label class="form-control-label ">Product Price: </label>
                  <input type="text" id="productPrice" name="productPrice" placeholder="Product Price" class="form-control"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)} required />
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
                <div className="product-form edit p-3">
                  <h3 className="fw-bold mb-2">Edit Product</h3>

                  <div class="form-group">
                    <label class="form-control-label ">Product Name</label>
                    <input type="text" id="productname" name="productname" value={productName} class="form-control" onChange={(e) => setProductName(e.target.value)} required />
                  </div>

                  <div class="form-group">
                    <label class="form-control-label ">Product Description: </label>
                    <input type="text" id="desc" name="desc" value={productDescription} class="form-control" onChange={(e) => setProductDescription(e.target.value)} required />
                  </div>

                  <div class="form-group">
                    <label class="form-control-label ">Product Photo: </label>
                    <input type="file"
                      accept="image/*" class="form-control" onChange={(e) => setProductPhoto(e.target.files[0])} required />
                  </div>

                  <div class="form-group">
                    <label class="form-control-label ">Product Price: </label>
                    <input type="text" id="price" name="price" class="form-control" value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)} required />
                  </div>

                  <div class="d-flex justify-content-between ">
                    <button class=" btn-color" onClick={() =>
                      handleEditProduct(
                        product._id,
                        productName,
                        productDescription,
                        productPhoto,
                        productPrice
                      )
                    }>Save</button>

                    <button className="btn-color" onClick={() => {
                      setEditingProductId(""); setProductDescription(""); setProductName(""); setProductPrice(""); setProductPhoto(null)
                    }}>Cancel</button>
                  </div>
                </div>
              ) : (

                <>
                  <img src={product.photo} class="card-img-top rounded-0" alt="..." />
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
                      <h5>Rs. {product.price}</h5>
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
