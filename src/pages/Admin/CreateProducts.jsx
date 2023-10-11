import { React, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;


const CreateProducts = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

//* Add Products

const handleSumbit = async(e) =>{
  e.preventDefault();

  try {
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("quantity", quantity);
    productData.append("photo", photo);
    productData.append("category", category);
    productData.append("shipping", shipping);
    const {data} = await axios.post("/api/v1/product/create-product", productData)

    if(data?.success){
      toast.success('Products Create success')
      window.location.reload()
    }
    else{
      toast.error('Something went wrong product add')
      navigate("/dashboard/admin/products")
    }
    
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong in getting products");
  }

}

  //* Get all Produts
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
   
  }, []);
  return (
    <Layout>
      <div className="container">
        <Toaster/>
        <div className="flex flex-row">
          <div className="">
            <AdminMenu />
          </div>
          <div className="2xl:ml-[30rem] xl:ml-[15rem] ">
            <h1 className="text-lg mt-8 font-semibold">Add Products</h1>
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
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
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
                  <div className="flex justify-end mt-6">
                    <button
                    onClick={handleSumbit}
                    type="button"
                     className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
                      Add Now
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProducts;
