import { React, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
export const Products = () => {
  const [product, setProduct] = useState([]);

  //*Get All products

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/product/get-product"
      );
      setProduct(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Somting Wrong in Product List Fronted");
    }
  };

  //* LifeCycle Method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="w-full h-full">
        <div className="flex ">
          <div className="sticky">
            <AdminMenu />
          </div>
          <div className="w-full">
            <h1 className="Ibm-font text-lg font-semibold">All Products</h1>
            <div className="flex w-full flex-wrap flex-row  gap-4">
                  <div className="container mx-auto ml-[3rem]">
                    <div className="mx-auto grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 justify-items-center justify-center gap-x-5 mt-10 mb-5   ">
                     
                      {product?.map((p) => (
                    
              <div
                className="relative h-[29rem] m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                key={p._id}
              >
                <a
                  className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                  href="#"
                >
                  <img
                    onClick={() => navigate(`/product/${p.slug}`)}
                    className="object-cover"
                    src={`/api/v1/product/products-photo/${p._id}`}
                    alt="product image"
                  />
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                    39% OFF
                  </span>
                </a>
                <div className="mt-4 px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl tracking-tight text-slate-900">
                      {p.name}{" "}
                    </h5>
                  </a>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      <span className="text-2xl font-bold text-slate-900">
                        ₹{p.price}
                      </span>
                    </p>
                  </div>
                  <div className="flex w-full gap-3">
                    <Link
                      type="button"
                      to={`/dashboard/admin/product/${p.slug}`}
                      className=" flex  items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                     Update products 
                    </Link>
                    
                  </div>
                </div>
              </div>
                        
            ))}
                      
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
