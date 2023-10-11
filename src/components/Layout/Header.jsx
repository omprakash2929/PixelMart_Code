import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/Ai";
import { useAuth } from "../../contexts/auth";
import { useSearch } from "../../contexts/search";
import axios from "axios";
import useCategory from "../../Hook/useCategory";
import { useCart } from "../../contexts/cart";

const Header = (props) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState(false);
  const [values, setValues] = useSearch();
  const [cart] = useCart();
  const categories = useCategory();

  //! Search API
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, result: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  //?Logout Function
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <nav className=" bg-white shadow sticky top-0 z-40 ">
      <div className="container px-6 py-3 mx-auto relative ">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <div className=" items-center  2xl:flex">
              <Link to="/">
                <img
                  className="w-auto h-[60px] ml-[-2rem] xl:ml-0 sm:h-[50px]"
                  src="https://github.com/omprakash2929/Image/blob/main/logo/logo.png?raw=true"
                  alt
                />
              </Link>
            </div>

            {/* Search input on desktop screen */}
            <div className="hidden mx-10 md:flex relative left-[19rem]">
              <div className=" absolute inset-y-0 right-0 flex items-center">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex pr-[15px]  justify-center items-center  relative z-10  p-[10.4px] text-gray-700 bg-white border border-gray-500   rounded-r-full focus:border-blue-500 focus:ring-opacity-40  focus:outline-none"
                >
                  <svg
                    className="w-5 h-5 text-gray-800 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>Category</div>
                </button>

                {open && (
                  <div
                    onClick={() => setOpen(false)}
                    x-show="isOpen"
                    x-transition:enter="transition ease-out duration-100"
                    x-transition:enter-start="opacity-0 scale-90"
                    x-transition:enter-end="opacity-100 scale-100"
                    x-transition:leave="transition ease-in duration-100"
                    x-transition:leave-start="opacity-100 scale-100"
                    x-transition:leave-end="opacity-0 scale-90"
                    className="absolute right-0 z-20 w-48 py-[6px] mt-[39.5rem] mr-[-5rem] origin-top-right bg-white rounded-md shadow-xl "
                  >
                    <Link
                      to={`/category`}
                      className="font-Ibm block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  hover:bg-gray-100 "
                    >
                      All Category
                    </Link>

                    {categories?.map((c) => (

                      <Link
                      key={c._id}
                        to={`/category/${c.slug}`}
                        className="font-Ibm block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  hover:bg-gray-100 "
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative xl:ml-[-10rem] 2xl:ml-0">
                <form action="" role="search">
                  <button type="submit" onClick={handleSearch}>
                    <span className="absolute inset-y-0 left-[16rem] flex items-center pl-0 ">
                      <svg
                        className="w-5 h-5 text-gray-400 cursor-pointer"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <input
                    type="search"
                    className="w-full py-2 pl-10 pr-[11rem] border border-gray-500 focus:outline-none rounded-full text-gray-700 bg-white focus:ring-0 "
                    placeholder="Search"
                    value={values.keyword}
                    aria-label="Search"
                    onChange={(e) =>
                      setValues({ ...values, keyword: e.target.value })
                    }
                  />
                </form>
              </div>
            </div>
          </div>
          {/* Mobile Navbar */}

          {/* humber bar menu */}
          <div className=" xl:hidden ">
            <input type="checkbox" className="peer hidden" id="navbar-open" />
            <label
              className="absolute top-5 right-5 cursor-pointer lg:hidden mt-[4px]"
              htmlFor="navbar-open"
            >
              <svg
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <nav
              aria-label="Header Navigation"
              className="peer-checked:pt-8 font-pop peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row"
            >
              <ul className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
                <li className="lg:mr-12">
                  <Link
                    className="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2 font-pop"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="lg:mr-12">
                  <Link
                    className="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2"
                    to="/category"
                  >
                    Categories
                  </Link>
                </li>
                <li className="lg:mr-12">
                  <a
                    className="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2"
                    href="#"
                  >
                    Contact
                  </a>
                </li>
                <li className="lg:mr-12">
                  <a
                    className="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2"
                    href="#"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
              <hr className="mt-4 w-full lg:hidden" />
              <div className="space-x-3 mt-2">
                {!auth.user ? (
                  <>
                    <Link to="/login">
                      <button className="px-4 font-Ibm py-2 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200">
                        Login
                      </button>
                    </Link>

                    <Link to="/register">
                      <button className="px-4 font-Ibm py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg">
                        Registraer
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <ul className="mt-4 flex sm:mt-0">
                      <Link to="/dashboard/user/profile">
                        <li className="ml-6 flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border text-gray-600 hover:text-black hover:shadow">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </li>
                      </Link>
                      <Link to="/dashboard/user/orders">
                        <li className="ml-6 flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border text-gray-600 hover:text-black hover:shadow">
                          <img
                            className="w-5 h-5"
                            src="https://img.icons8.com/cotton/64/shopping-trolley--v2.png"
                            alt="shopping-trolley--v2"
                          />
                        </li>
                      </Link>
                      <li className="ml-6 flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border text-gray-600 hover:text-black hover:shadow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </li>

                      <Link to="/login">
                        <li className="ml-6 flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border text-gray-600 hover:text-black hover:shadow">
                          <img
                            onClick={handleLogout}
                            className="w-5 h-5"
                            src="https://img.icons8.com/cotton/64/logout-rounded--v3.png"
                            alt="logout-rounded--v3"
                          />
                        </li>
                      </Link>
                    </ul>
                  </>
                )}
              </div>
            </nav>
          </div>
          <hr className="xl:hidden w-[397px] overflow-y-hidden ml-[-2rem]" />
          {/* Search Bar  */}
          <div className="flex mr-40 w-full xl:hidden mt-2 space-x-4">
            <div className="relative w-80">
              <form action="">

              <label htmlFor="Search" className="sr-only">
                Search
              </label>

              <input
                type="text"
                id="Search"
                placeholder="Search now..."
                value={values.keyword}
                    aria-label="Search"
                    onChange={(e) =>
                      setValues({ ...values, keyword: e.target.value })
                    }
                className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
              />

              <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button
                 type="submit" onClick={handleSearch}
                  className="text-gray-600 hover:text-gray-700"
                >
                  <span className="sr-only">Search</span>

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
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </span>
              </form>
            </div>
            <Link
                className=" text-sm font-Ibm leading-5 text-gray-700 transition-colors duration-300 transform  hover:text-blue-600  hover:underline md:mx-4 md:my-0 flex justify-center space-x-2 items-center"
                to="/cart"
              >
                {/* <HiShoppingCart size={25} /> ({cart?.length}) */}
                <img
                  src="https://github.com/omprakash2929/Image/blob/main/Images/shopping-cart.gif?raw=true"
                  className="w-9 h-9"
                  alt=""
                />
                <span className="absolute top-[-1px] left-[12px] w-[18px] h-[18px] inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-1 text-purple-700">
                {cart?.length}
                </span>
              </Link>
          </div>

          {/* Desktop Menu */}
          <div className="absolute inset-x-0 z-20 w-full px-6 py-2 transition-all duration-300 ease-in-out bg-white top-24  md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center hidden xl:flex ">
            <div className="flex flex-col md:flex-row md:mx-1">
              <Link
                className="flex justify-center items-center my-2 text-sm font-Ibm leading-5 text-gray-700 transition-colors duration-300 transform  hover:text-blue-600  hover:underline md:mx-4 md:my-0"
                to="/"
              >
                Home
              </Link>

              <Link
                className=" my-2 text-sm font-Ibm leading-5 text-gray-700 transition-colors duration-300 transform  hover:text-blue-600  hover:underline md:mx-4 md:my-0 flex justify-center space-x-2 items-center"
                to="/cart"
              >
                {/* <HiShoppingCart size={25} /> ({cart?.length}) */}
                <img
                  src="https://github.com/omprakash2929/Image/blob/main/Images/shopping-cart.gif?raw=true"
                  className="w-9 h-9"
                  alt=""
                />
                <span className="absolute top-[-1px] left-[12px] w-[18px] h-[18px] inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-1 text-purple-700">
                {cart?.length}
                </span>
              </Link>
              <Link
                className="flex justify-center items-center my-2 text-sm font-Ibm leading-5 text-gray-700 transition-colors duration-300 transform  hover:text-blue-600  hover:underline md:mx-4 md:my-0"
                to="#"
              >
                <AiOutlineHeart size={25} />
              </Link>
            </div>

            <div className="relative mr-8">
              <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                <span
                  href="#"
                  className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                >
                  {auth?.user?.role === 1 ? "Admin" : "User"}
                </span>

                <button
                  onClick={() => setRoles(!roles)}
                  className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                >
                  <span className="sr-only">Menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {roles && (
                <div
                  onClick={() => setRoles(false)}
                  className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
                  role="menu"
                >
                  <div className="p-2">
                    <Link
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      Dashabord
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="space-x-3">
              {!auth.user ? (
                <>
                  <Link to="/login">
                    <button className="px-4 font-Ibm py-2 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200">
                      Login
                    </button>
                  </Link>

                  <Link to="/register">
                    <button className="px-4 font-Ibm py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg">
                      Registraer
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button
                      onClick={handleLogout}
                      className="px-4 font-Ibm py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg"
                    >
                      Logout
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
