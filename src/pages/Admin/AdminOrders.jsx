import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../contexts/auth";
import axios from "axios";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";

export const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/auth/all-orders"
      );
      setOrders(data);
      
    } catch (error) {
      console.log(error);
    } 
  };
const handleChange = async(orderId, value) =>{
  try {
    const { data } = await axios.put(
      `/api/v1/auth/orders-status/${orderId}`,
      {status:value}
    );
    getOrders()
    
  } catch (error) {
    console.log(error)
    
  }
}
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout>
      <div className="container">
        <div className="flex flex-row">
          <div className="">
            <AdminMenu />
          </div>
          <div>
            <div className="container">
              <div className="flex flex-row">
                <div className="2xl:w-[140%] xl:w-[80vw]">
                  <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                    <div className="">
                      <h1 className="font-Ral text-3xl font-semibold">
                        Order History
                      </h1>
                      <p className="font-pop text-gray-500">
                        Check the status of recent orders, manage returns, and
                        discover similar products.
                      </p>
                    </div>
                    {orders?.map((o, i) => {
                      return (
                        <>
                          <div key={o._id} className="overflow-x-auto flex flex-col mt-8 rounded-lg border border-gray-200">
                            <div className="overflow-x-auto flex  rounded-lg  ">
                              <table class=" items-center w-[40%] ml-8  bg-white text-sm">
                                <thead class="ltr:text-left rtl:text-right font-pop font-bold">
                                  <tr className="">
                                    <th class="whitespace-nowrap font-pop   px-4 py-2 font-medium text-gray-900">
                                      #
                                    </th>
                                    <th class="whitespace-nowrap font-pop  px-4 py-2 font-medium text-gray-900">
                                      Status
                                    </th>
                                    <th class="whitespace-nowrap font-pop  px-4 py-2 font-medium text-gray-900">
                                      Buyer
                                    </th>
                                    <th class="whitespace-nowrap font-pop  px-4 py-2 font-medium text-gray-900">
                                      Date
                                    </th>
                                    <th class="whitespace-nowrap font-pop  px-4 py-2 font-medium text-gray-900">
                                      Quantity
                                    </th>
                                    
                                  </tr>
                                </thead>

                                <tbody class="">
                                  <tr>
                                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                      {i + 1}
                                    </td>
                                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                                      <td>
                                        <Select bordered={false} defaultValue={o?.status} onChange={(value, orderId)=> handleChange(o._id,value)} >
                                          {status?.map((s,i)=>(
                                            <option key={i} value={s}>{s}</option>
                                          ))}
                                        </Select>
                                      </td>
                                    </td>
                                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                                      {o?.buyer?.name}
                                    </td>
                                    <td class=" whitespace-nowrap px-4 py-2 text-gray-700">
                                      {moment(o?.createAt).fromNow()}
                                    </td>
                                    <td class="flex justify-center items-center  whitespace-nowrap px-4 py-2 text-gray-700">
                                      {o?.products?.length}
                                    </td>
                                    
                                  </tr>
                                </tbody>
                              </table>
                              <div className="flex xl:ml-[13rem] 2xl:ml-[22rem] justify-center items-center gap-4">
                                <button className="w-[7rem] font-pop h-[45px] px-3 py-1.5 text-sm text-gray-700 duration-150 border rounded-lg hover:bg-indigo-100 active:bg-indigo-200 shadow-md">
                                  view order
                                </button>
                                <button className="shadow-md w-[5rem] h-[45px] px-3 py-1.5 text-sm text-gray-700 duration-150 font-pop border rounded-lg hover:bg-indigo-100 active:bg-indigo-200">
                                  order
                                </button>
                              </div>
                            </div>
                            {o?.products?.map((p, i) => (
                              <div
                                className="grid grid-cols-3 gap-4 p-4  border w-full "
                                key={p._id}
                              >
                                <div className="flex  w-[30rem] mt-4 ml-11">
                                  <img
                                    src={`/api/v1/product/products-photo/${p._id}`}
                                    alt="Product"
                                    className="w-[40%] rounded-md"
                                  />
                                </div>
                                <div className="flex flex-col w-[40%] relative mt-4 ">
                                  <h1 className="font-pop text-lg ">
                                    {p.name}
                                  </h1>
                                  <p>{p.decription}</p>

                                  <div className="flex gap-1">
                                    <p className="font-pop"> Payment:</p>
                                    <p>
                                      {o?.payment.success
                                        ? "Failed"
                                        : "Success"}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex justify-center items-center flex-col mt-4 ">
                                  <h1 className="flex  font-pop text-lg ">
                                  ₹{p?.price}
                                  </h1>
                                  <button
                                    onClick={() =>
                                      navigate(`/product/${p.slug}`)
                                    }
                                    className="mt-[4rem]  w-[8rem] h-[45px] px-3 py-1.5 text-sm text-purple-500 duration-150 font-pop border-none hover:bg-indigo-100 active:bg-indigo-200"
                                  >
                                    View product
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
