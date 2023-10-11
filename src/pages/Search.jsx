import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../contexts/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/cart";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  return (
    <Layout>
      <div className="flex  justify-center items-center">
        <div className="container mx-auto ml-[3rem] hidden xl:flex">
          <div className="mx-auto grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-4 justify-items-center justify-center gap-x-10  mt-10  mb-5   ">
            {values?.result.map((p) => (
              <div
                className="relative h-[29rem] m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                key={p._id}
              >
                <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
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
                      {p.name}
                    </h5>
                  </a>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      <span className="text-2xl font-bold text-slate-900">
                        ₹{p.price}
                      </span>
                      <del className="text-xs text-gray-400">
                        
                        ₹{p.price + 200}
                      </del>
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
        </div>
        {/* Android Producst Card */}

        <div className="bg-white  text-gray-700 sm:py-16 lg:py-20 xl:hidden ">
          <div className="mx-auto  px-4 sm:px-6 lg:px-8">
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
              {values?.result.map((p) => (
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
                    <h3 className="mb-2 text-sm text-gray-400">{p.name}</h3>
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
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
