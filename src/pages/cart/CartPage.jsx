import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useCart } from "../../contexts/cart";
import { useAuth } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { Test } from "../test";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [count, setCount] = useState(1);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const removeItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(myCart));
      setCart(myCart);
    } catch (error) {
      console.log(error);
    }
  };
  //! Total
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

  const countItem = (pid) => {
    setCount(count + 1);
    console.log(count);
  };

  //? Get Payment Gatways
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //* Handle Payments
  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment copleted Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container mx-auto my-auto  hidden xl:flex">
        <div className="container mx-auto mt-10">
          <h1 className="font-Raleway font-semibold xl:ml-8 text-2xl">{`Hello ${
            auth?.token && auth?.user?.name
          }`}</h1>
          <div className="flex shadow-md my-10">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">
                  {cart?.length > 0
                    ? `  ${cart.length} Items${
                        auth?.token ? "" : "please login to checkout"
                      }`
                    : "Your cart Is Empty"}
                </h2>
              </div>

              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                  Quantity
                </h3>
                <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                  Price
                </h3>
                <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
              </div>
              {cart?.map((p) => (
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-2/5">
                    {/* product */}
                    <div className="w-20">
                      <img
                        onClick={() => navigate(`/product/${p.slug}`)}
                        src={`/api/v1/product/products-photo/${p._id}`}
                        alt="Product"
                        className="h-24 object-cover rounded-t-xl"
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{p.name}</span>
                      <span className="text-red-500 text-xs">
                        {p.description.substring(0, 30)}
                      </span>
                      <button
                        onClick={() => removeItem(p._id)}
                        className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <button type="button" onClick={() => countItem(p._id)}>
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                    <input
                      className="mx-2 border text-center w-8"
                      type="text"
                      defaultValue={count}
                    />
                    <button type="button">
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                   
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    ₹{p.price}
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    $400.00
                  </span>
                </div>
              ))}

              <a
                href="#"
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </a>
            </div>
            <div id="summary" className="w-1/4 px-8 py-10">
              <h1 className="font-semibold text-2xl border-b pb-8">
                Order Summary
              </h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Items
                  {cart?.length > 0
                    ? `  ${cart.length} ${
                        auth?.token ? "" : "please login to checkout"
                      }`
                    : "Your cart Is Empty"}
                </span>
                <span className="font-semibold text-sm">₹{toatalPrice()}</span>
              </div>

              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>₹{toatalPrice()}</span>
                </div>
                {auth?.user?.address ? (
                  <>
                    <div className="flex font-semibold justify-between  text-sm uppercase ">
                      <span className="">Current Address</span>
                      <span className="font-semibold ">
                        {auth?.user?.address}
                      </span>
                    </div>

                    <div className="flex  gap-6 mt-4">
                      <button
                        onClick={() => navigate("/dashboard/user/profile")}
                        className="rounded-sm bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                      >
                        Update Address
                      </button>
                    </div>
                  </>
                ) : (
                  <div>
                    {auth?.token ? (
                      <button
                        onClick={() => navigate("/dashboard/user/profile")}
                        className="rounded-sm bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                        className="bg-indigo-500 font-semibold rounded-sm hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                      >
                        Please Login to checkout
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="border mt-8">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                        googlePay: {
                          merchantId: "9510287206@paytm",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      type="button"
                      onClick={handlePayment}
                      className="bg-green-500 cursor-pointer font-semibold rounded-sm hover:bg-green-600 py-3 text-sm text-white uppercase w-full disabled:bg-slate-400"
                      disabled={!auth?.user?.address}
                    >
                      Make Payment
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Android Cart  */}

      <div className="h-[200vh] bg-gray-100 py-12  lg:py-20 xl:hidden ">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-Raleway font-semibold text-2xl">{`Hello ${
              auth?.token && auth?.user?.name
            }`}</h1>
            <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
          </div>
          <div className="mx-auto mt-8 max-w-md md:mt-12">
            <div className="rounded-3xl bg-white shadow-lg">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="-my-8">
                    {cart?.map((p) => (
                      <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                        <div className="shrink-0 relative">
                          <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                            1
                          </span>
                          <img
                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                            onClick={() => navigate(`/product/${p.slug}`)}
                            src={`/api/v1/product/products-photo/${p._id}`}
                            alt
                          />
                        </div>
                        <div className="relative flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                              <p className="text-base font-semibold text-gray-900">
                                {p.name}
                              </p>
                              <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                {p.description.substring(0, 30)}
                              </p>
                            </div>
                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                ₹{p.price}
                                <del className="text-xs ml-2 text-gray-400">
                                  ₹{p.price + 200}
                                </del>
                              </p>
                            </div>
                          </div>
                          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <button
                              type="button"
                              onClick={() => removeItem(p._id)}
                              className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                  className
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* <hr class="mx-0 mt-6 mb-0 h-0 border-r-0 border-b-0 border-l-0 border-t border-solid border-gray-300" /> */}
                <div className="mt-6 space-y-3 border-t border-b py-8">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Total </p>
                    <p className="text-lg font-semibold text-gray-900">
                    ₹{toatalPrice()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Items</p>
                    <p className="text-lg font-semibold text-gray-900">{cart?.length > 0
                    ? `  ${cart.length} ${
                        auth?.token ? "" : "please login to checkout"
                      }`
                    : "Your cart Is Empty"}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-xl font-semibold text-gray-900">
                    <span className="text-xs mr-2 font-normal text-gray-400">
                      INR
                    </span>
                    ₹{toatalPrice()}.00
                  </p>
                </div>
                <div className="border-t mt-8 text-center">
                 
                  <div className=" mt-8">
                {auth?.user?.address ? (
                  <>
                    <div className="flex font-semibold justify-between  text-sm uppercase ">
                      <span className="text-gray-400">Current Address</span>
                      <span className="font-semibold ">
                        {auth?.user?.address}
                      </span>
                    </div>

                    <div className="flex  gap-6 mt-4">
                      <button
                        onClick={() => navigate("/dashboard/user/profile")}
                        className="rounded-sm bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                      >
                        Update Address
                      </button>
                    </div>
                  </>
                ) : (
                  <div>
                    {auth?.token ? (
                      <button
                        onClick={() => navigate("/dashboard/user/profile")}
                        className="rounded-sm bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                        className="bg-indigo-500 font-semibold rounded-sm hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                      >
                        Please Login to checkout
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="border mt-8">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                        googlePay: {
                          merchantId: "9510287206@paytm",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      type="button"
                      onClick={handlePayment}
                      className="bg-green-500 cursor-pointer font-semibold rounded-sm hover:bg-green-600 py-3 text-sm text-white uppercase w-full disabled:bg-slate-400"
                      disabled={!auth?.user?.address}
                    >
                      Make Payment
                    </button>
                  </>
                )}
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

export default CartPage;
