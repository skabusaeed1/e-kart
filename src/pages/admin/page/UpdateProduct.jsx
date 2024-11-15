import React, { useContext } from "react";
import MyContext from "../../../context/data/MyContext";

function UpdateProduct() {

  
  const context = useContext(MyContext);
  const { product, setProduct, updateProduct } = context;


  return (
    <div>
      <div className=" flex justify-center items-center h-screen">
        <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
          <div className="">
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Update Product
            </h1>
          </div>
          <div>
            <input
              value={product.title}
              onChange={(e) => setProduct({...product, title: e.target.value})}
              type="text"
              name="title"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product title"
            />
          </div>
          <div>
            <input
              value={product.price}
              onChange={(e) => setProduct({...product, price: e.target.value})}
              type="text"
              name="price"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product price"
            />
          </div>
          <div>
            <input
              value={product.imageUrl}
              onChange={(e) => setProduct({...product, imageUrl: e.target.value})}
              type="text"
              name="imageUrl"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product imageUrl"
            />
          </div>
          <div>
            <input
              value={product.category}
              onChange={(e) => setProduct({...product, category: e.target.value})}
              type="text"
              name="category"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product category"
            />
          </div>
          <div>
            <textarea
              value={product.description}
              onChange={(e) => setProduct({...product, description: e.target.value})}
              cols="30"
              rows="10"
              name="description"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product description"
            ></textarea>
          </div>
          <div className=" flex justify-center mb-3">
            <button className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg" onClick={updateProduct}>
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
