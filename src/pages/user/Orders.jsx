import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { UserMenu } from "../../components/Layout/UserMenu";
import { useAuth } from "../../contexts/auth";
import axios from "axios";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/cart";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();



  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/auth/orders"
      );
      setOrders(data);
      console.log(orders);
    } catch (error) {
      console.log(error);
    }
  };
  const toatalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout>
      <div className="container">
        <div className=" hidden  xl:flex flex-row">
          <div className="">
            <UserMenu />
          </div>
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
              {orders?.reverse()?.map((o, i) => {
                return (
                  <>
                    <div key={o._id} className="overflow-x-auto flex flex-col mt-8 rounded-lg border border-gray-200">
                      <div className="overflow-x-auto flex  rounded-lg  ">
                        <table className=" items-center w-[40%] ml-8  bg-white text-sm">
                          <thead className="ltr:text-left rtl:text-right font-pop font-bold">
                            <tr className="">
                              <th className="whitespace-nowrap font-pop   px-4 py-2 font-medium text-gray-900">
                                #
                              </th>
                              <th className="whitespace-nowrap font-pop  px-4 py-2 font-medium text-gray-900">
                                Status
                              </th>
                              <th className="whitespace-nowrap font-pop  px-4 py-2 font-medium text-gray-900">
                                Buyer
                              </th>
                              <th className="whitespace-nowrap font-pop  px-4 py-2 font-medium text-gray-900">
                                Date
                              </th>
                              <th className="whitespace-nowrap font-pop  px-4 py-2 font-medium text-gray-900">
                                Quantity
                              </th>
                              <th className="whitespace-nowrap font-pop  px-4 py-2 font-medium text-gray-900">
                                Total
                              </th>
                            </tr>
                          </thead>

                          <tbody className="">
                            <tr>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {i + 1}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {o?.status}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {o?.buyer?.name}
                              </td>
                              <td className=" whitespace-nowrap px-4 py-2 text-gray-700">
                                {moment(o?.createAt).fromNow()}
                              </td>
                              <td className="flex justify-center items-center  whitespace-nowrap px-4 py-2 text-gray-700">
                                {o?.products?.length}
                              </td>
                              <td className=" whitespace-nowrap px-4 py-2 text-gray-700">
                              ₹{toatalPrice()}.00
                              </td>
                              
                            </tr>
                          </tbody>
                        </table>
                        <div className="flex xl:ml-[10rem] 2xl:ml-[22rem] justify-center items-center gap-4">
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
                              className="w-[40%] rounded-md shadow-md"
                            />
                          </div>
                          <div className="flex flex-col w-[40%] relative mt-4 ">
                            <h1 className="font-pop text-lg ">{p.name} </h1>
                            <p>{p.decription}</p>

                            <div className="flex gap-1">
                              <p className="font-pop"> Payment:</p>
                              <p>{o?.payment.success ? "Failed" : "Success"}</p>
                            </div>
                          </div>
                          <div className="flex justify-center items-center flex-col mt-4 ">
                            <h1 className="flex  font-pop text-lg ">
                              ₹{p.price}
                            </h1>
                            <button
                              onClick={() => navigate(`/product/${p.slug}`)}
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

        {/* android Order  */}
        <div className="grid sm:px-10  xl:hidden">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">
              Check the status of recent orders, manage returns, and discover
              similar products.
            </p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white py-4 px-6">
              {orders?.reverse()?.map((o, i, idx) => {
                return (
                  <>
                    {o?.products?.map((p, i) => (
                      <div key={o._id} className="flex  rounded-lg bg-white flex-row">
                        <img
                          className="m-2 h-24 w-28 rounded-md border shadow-md object-cover object-center"
                          src={`/api/v1/product/products-photo/${p._id}`}
                          alt
                        />
                        <div className="flex w-full flex-col px-4 py-4">
                          <span className="font-medium font-pop">{p.name} </span>
                          <span className="float-right text-xs text-gray-400">
                           
                            {p.description.substring(0, 10)}
                          </span>
                          <p className="text-lg font-bold">₹{p.price}</p>
                        </div>
                      </div>
                    ))}

                    <div className=" bg-gray-50 px-4 pt-8 lg:mt-0">
                      <div className>
                        <div className="mt-6 border-t border-b py-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              Status
                            </p>
                            <p className="font-medium text-gray-900">
                              {o?.status}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              
                              Buyer
                            </p>
                            <p className="font-medium text-gray-900">
                              {o?.buyer?.name}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              
                              Date
                            </p>
                            <p className="font-medium text-gray-900">
                              
                              {moment(o?.createAt).fromNow()}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              
                              Quantity
                            </p>
                            <p className="font-medium text-gray-900">
                              {o?.products?.length}
                            </p>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Total
                          </p>
                          <p className="text-xl font-semibold font-pop text-gray-900">
                          ₹{toatalPrice()}.00
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate("/")}
                        className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                      >
                        View more product
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
