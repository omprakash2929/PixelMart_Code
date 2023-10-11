import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../contexts/auth";
import {  useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import axios from "axios";
import { Price } from "../components/price";
import { useCart } from "../contexts/cart";
import Banner from "./Banner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/LoadingSpinner";
import AndroidCategories from "./Category/AndroidCategories";

export const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loding, setLoding] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  //!Get Total
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/product/product-counts"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //*Get All products

  const getAllProducts = async () => {
    try {
      setLoding(true);
      const { data } = await axios.get(
        ` /api/v1/product/products-list/${page}`
      );
      setLoding(false);
      setProducts(data.products);
    } catch (error) {
      setLoding(false);
      console.log(error);
      toast.error("Somting Wrong in Product List Fronted");
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMorepage();
  }, [page]);

  //! Load More
  const loadMorepage = async () => {
    try {
      setLoding(true);
      const { data } = await axios.get(
        `/api/v1/product/products-list/${page}`
      );
      setLoding(false);
      setProducts([...products, ...data?.products]);
      console.log("page more");
    } catch (error) {
      console.log(error);
      console.log("Page");
      setLoding(false);
    }
  };

  //! GetAll Category
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

  //* Filter by Cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //! Get Filterd Products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/product/product-filter",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //* LifeCycle Method
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  return (
    <Layout>
      <AndroidCategories />
      <Banner />

      <div className="flex flex-col xl:flex-row   w-full h-full ">
        {/* Desktop Filter */}
        <div className="hidden xl:flex bg-white sticky bottom-0">
          <div>
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  New Agrivals
                </h1>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  >
                    <span className="sr-only">Filters</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6  "
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>
                <div className="grid grid-cols-1  ">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                    >
                      <li>
                        <a href="#">Totes</a>
                      </li>
                      <li>
                        <a href="#">Backpacks</a>
                      </li>
                      <li>
                        <a href="#">Travel Bags</a>
                      </li>
                      <li>
                        <a href="#">Hip Bags</a>
                      </li>
                      <li>
                        <a href="#">Laptop Sleeves</a>
                      </li>
                    </ul>
                    <div className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        {/* Expand/collapse section button */}
                        <button
                          type="button"
                          className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                          aria-controls="filter-section-0"
                          aria-expanded="false"
                        >
                          <span className="font-medium font-pop text-gray-900">
                            Category
                          </span>
                        </button>
                      </h3>
                      {/* Filter section, show/hide based on section state. */}
                      <div className="pt-6" id="filter-section-0">
                        <div className="space-y-4">
                          {categories?.map((c) => (
                            <Checkbox
                              key={c._id}
                              onChange={(e) =>
                                handleFilter(e.target.checked, c._id)
                              }
                              className="flex"
                            >
                              {c.name}
                            </Checkbox>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        {/* Expand/collapse section button */}
                        <button
                          type="button"
                          className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                          aria-controls="filter-section-1"
                          aria-expanded="false"
                        >
                          <span className="font-medium font-pop text-gray-900">
                            Price
                          </span>
                        </button>
                      </h3>
                      {/* Filter section, show/hide based on section state. */}
                      <div className="pt-6" id="filter-section-1">
                        <div className="space-y-4">
                          <Radio.Group
                            onChange={(e) => setRadio(e.target.value)}
                          >
                            {Price?.map((p) => (
                              <div key={p._id}>
                                <Radio value={p.array}>{p.name}</Radio>
                              </div>
                            ))}
                          </Radio.Group>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </section>
            </main>
          </div>
        </div>
        {/* Android Filters  */}
        <div className="flex ml-8 mt-8 gap-8 xl:hidden h-8">
          <div className="relative">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                <span className="text-sm font-medium font-pop">categories</span>

                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>

              <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
                <div className="w-[13rem] rounded border border-gray-200 bg-white">
                  <header className="flex items-center justify-between p-4">
                    <span className="text-sm text-gray-700"> Selected </span>

                    <button
                      type="button"
                      className="text-sm text-gray-900 underline underline-offset-4"
                    >
                      Reset
                    </button>
                  </header>

                  <div className="pt-6 ml-8" id="filter-section-0">
                    <div className="space-y-4">
                      {categories?.map((c) => (
                        <Checkbox
                          key={c._id}
                          onChange={(e) =>
                            handleFilter(e.target.checked, c._id)
                          }
                          className="flex"
                        >
                          {c.name}
                        </Checkbox>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>

          <div className="relative ">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                <span className="text-sm font-medium font-pop"> Price </span>

                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>

              <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
                <div className="w-[13rem] rounded border border-gray-200 bg-white">
                  <header className="flex items-center justify-between p-4">
                    <span className="text-sm font-pop text-gray-700">
                      price
                    </span>

                    <button
                      type="button"
                      className="text-sm text-gray-900 underline underline-offset-4"
                    >
                      Reset
                    </button>
                  </header>

                  <div className="border-t border-gray-200 p-4">
                    <div className="flex justify-between gap-4">
                      <div className="pt-6" id="filter-section-1">
                        <div className="space-y-4">
                          <Radio.Group
                            onChange={(e) => setRadio(e.target.value)}
                          >
                            {Price?.map((p) => (
                              <div key={p._id}>
                                <Radio value={p.array}>{p.name}</Radio>
                              </div>
                            ))}
                          </Radio.Group>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
        {/* Products Card  */}
        <div className="container xl:flex mt-4 flex-col justify-center mx-auto hidden ">
          <div className="mx-auto grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center justify-center    mt-10 mb-5   ">
            {products?.map((p) => (
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
                      {p.name.substring(0, 40)}
                    </h5>
                  </a>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      <span className="text-2xl font-bold text-slate-900">
                        ₹{p.price}
                      </span>
                      <span className="text-sm text-slate-900 line-through">
                        ₹{p.price + 200}
                      </span>
                    </p>
                  </div>
                  <div className="flex w-full gap-3">
                    <button
                      type="button"
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className=" flex  items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      More Details
                    </button>
                    <a
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast("Item Add to Cart");
                      }}
                      className="flex  items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add to Cart
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Loadign Spinner  */}
          <div className=" w-25 h-12 mr-[20rem] flex flex-col justify-center items-center">
            {products && products.length < total && (
              <button
                onClick={(e) => {
                  e.preventDefault();

                  setPage(page + 1);
                }}
                className="flex items-center gap-x-4 rounded-xl bg-blue-600 px-8 py-3 font-medium text-white"
              >
                {loding ? <LoadingSpinner /> : "Loadmore"}
              </button>
            )}
          </div>
        </div>
        {/* Android Producst Card */}

        <div className="bg-white  text-gray-700 sm:py-16 lg:py-20 xl:hidden ">
          <div className="mx-auto  px-4 sm:px-6 lg:px-8">
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
              {products?.map((p) => (
                <article
                  key={p._id}
                  className="relative flex flex-col overflow-hidden rounded-lg border"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                      onClick={() => navigate(`/product/${p.slug}`)}
                      src={`/api/v1/product/products-photo/${p._id}`}
                      alt
                    />
                  </div>
                  <div className="absolute top-0 m-2 rounded-full bg-white">
                    <p className="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                      Sale
                    </p>
                  </div>
                  <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                    <div className="mb-2 flex">
                      <p className="mr-3 text-sm font-semibold">₹{p.price} </p>
                      <del className="text-xs text-gray-400">
                        ₹{p.price + 200}
                      </del>
                    </div>
                    <h3 className="mb-2 text-sm text-gray-400">
                      {p.name.substring(0, 40)}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast("Item Add to Cart");
                    }}
                    className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600"
                  >
                    <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-emerald-600 group-hover:text-white">
                      Add
                    </div>
                    <div className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-emerald-500 group-hover:text-white">
                      +
                    </div>
                  </button>
                </article>
              ))}
            </div>
            {/* Loadign Spinner  */}
            <div className=" w-25 h-12 flex flex-col justify-center items-center">
              {products && products.length < total && (
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    setPage(page + 1);
                  }}
                  className="flex items-center gap-x-4 rounded-xl bg-blue-600 px-8 py-3 font-medium text-white"
                >
                  {loding ? <LoadingSpinner /> : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
