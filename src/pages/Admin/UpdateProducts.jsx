import { React, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import {useNavigate, useParams} from 'react-router-dom'
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;


export const UpdateProducts = () => {
    const navigate = useNavigate();
    const parms = useParams();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("");
  
    //* Get Single products
    const getsingleProducts =async () =>{
        try {
            const {data} = await axios.get(`/api/v1/product/get-product/${parms.slug}`)
            setName(data.product.name)
            setId(data.product._id)
            setDescription(data.product.description)
            setPhoto(data.product.photo)
            setPrice(data.product.price)
            setCategory(data.product.category._id)
            setQuantity(data.product.quantity)
            setShipping(data.product.shipping)
            
        } catch (error) {
            console.log(error);
            toast.error("Somthing Error in single Getproducts")
            
        }
    }


  //* Add Products
  
  const handleUpdate = async(e) =>{
    e.preventDefault();
  
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo &&  productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const {data} = await axios.put(`/api/v1/product/update-product/${id}`, productData)
  
      if(data?.success){
        toast.success('Products Update success')
        navigate("/dashboard/admin/products")
      }
      else{
        toast.error('Something went wrong product add')
      
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  
  }
    //* Get Delete Products
    const handleDelete = async() =>{
      try {
        const {data} = await axios.delete(`/api/v1/product/product-delete/${id}`)
        toast.success("Delete products Succfully");
        navigate('/dashboard/admin/products')
      } catch (error) {
        console.log(error)
        toast.error("Somthing Error in Delete Handle")
        
      }
}
useEffect(()=>{
  getsingleProducts();
},[])
  
  return (
    <Layout>
    <div className="container">
      <div className="grid grid-cols-2">
        <div className="">
          <AdminMenu />
        </div>
        <div>
          <h1 className="text-3xl mt-8 font-semibold">Update Products</h1>
          <div className="">
            <Select
              bordered={false}
              placeholder="Search a category"
              size="large"
              showSearch
              className="mb-3 border w-[10rem] rounded-xl"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <div className="">
              <label for="image" className="block text-sm text-gray-500 ">
                Image
              </label>

              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full  placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
              />
              <div className="border rounded-md">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="products Photo"
                      height={"100px"}
                      className="border rounded-md w-[16rem]"
                    />
                  </div>
                ):(
                    <div className="text-center">
                    <img
                      src={`/api/v1/product/products-photo/${id}`}
                      alt="products Photo"
                      height={"100px"}
                      className="border rounded-md w-[16rem]"
                    />
                  </div>
                )}
              </div>
            </div>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
              <h2 className="text-lg font-semibold text-gray-700 capitalize ">
                Products Details
              </h2>
              <form>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label className="text-gray-700 " htmlFor="username">
                      Name
                    </label>
                    <input
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 " htmlFor="password">
                      price
                    </label>
                    <input
                      id="price"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label
                      className="text-gray-700 "
                      htmlFor="passwordConfirmation"
                    >
                      quantity
                    </label>
                    <input
                      id="quantity"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                    />
                  </div>
                  <div className="block">
                    <label
                      className="text-gray-700 "
                      htmlFor="passwordConfirmation"
                    >
                      shipping
                    </label>
                    <Select
                      bordered={false}
                      size="large"
                      showSearch
                      className="w-[12rem]"
                      onChange={(value) => {
                        setShipping(value);
                      }}
                      value={shipping? "yes":"No"}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                    {/* <input
                      id="shipping"
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                    /> */}
                  </div>
                  <div>
                    <label className="text-gray-700 " htmlFor="emailAddress">
                      Description
                    </label>
                    <textarea
                      id="OrderNotes"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      className="mt-2 w-full text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring shadow-sm sm:text-sm"
                      rows="4"
                      placeholder="Enter any additional order notes..."
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end mt-6 gap-5">
                  <button
                  onClick={handleUpdate}
                   className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                    Update Now
                  </button>
                  <button
                  onClick={handleDelete}
                  type="button"
                   className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-300">
                    Delete Now
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}
