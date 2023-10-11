import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { UserMenu } from "../../components/Layout/UserMenu";
import { useAuth } from "../../contexts/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Profiles = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();

  //! Get data
  useEffect(() => {
    const { name, email, phone, address, password } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
    setPassword(password);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `/api/v1/auth/profile`,
        {
          name,
          email,
          phone,
          address,
          password,
        }
      );
      if (data?.error) {
        toast.error("Profile not Upate :( ");
      } else {
        setAuth({ ...auth, user: data?.updateUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updateUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile is Update");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something worng");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="hidden xl:flex flex-row">
          <div className="">
            <UserMenu />
          </div>

          <div className="col-span-2 ml-20 relative right-9rem mt-8 ">
            <h1 className="text-4xl font-poppins text-red-500 mt-4">
              Personal Information
            </h1>
            <p className="font-poppins w-[47rem]">
              Manage your personal infromation , including pgone number and
              email adress where you can be contacated
            </p>
            <div className="grid xl:grid-cols-2 2xl:grid-cols-3 gap-16 mt-8">
              <a
                className="relative w-[24rem]  flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
                href="#"
              >
                <div className="pt-4 text-gray-500">
                  <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                    Name
                  </h3>

                  <p className="mt-2 hidden text-sm sm:block">
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      required
                      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                  </p>
                </div>
                <img
                  src="https://github.com/omprakash2929/Image/blob/main/user-info/profile.png?raw=true"
                  className="h-16 w-16 "
                  alt=""
                />
              </a>

              <a
                className="relative w-[24rem]  flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
                href="#"
              >
                <div className="pt-4 text-gray-500">
                  <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                    E-mail
                  </h3>

                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    required
                    disabled
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <img
                  src="https://github.com/omprakash2929/Image/blob/main/user-info/email.png?raw=true"
                  className="h-16 w-16 "
                  alt=""
                />
              </a>
              <a
                className="relative w-[24rem]  flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
                href="#"
              >
                <div className="pt-4 text-gray-500">
                  <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                    Phone Number
                  </h3>

                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    type="text"
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <img
                  src="https://github.com/omprakash2929/Image/blob/main/user-info/phone-call.png?raw=true"
                  className="h-16 w-16 "
                  alt=""
                />
              </a>
              <a
                className="relative w-[24rem]  flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
                href="#"
              >
                <div className="pt-4 text-gray-500">
                  <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                    Address
                  </h3>

                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    type="text"
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <img
                  src="https://github.com/omprakash2929/Image/blob/main/user-info/home-address.png?raw=true"
                  className="h-16 w-16 "
                  alt=""
                />
              </a>
              <a
                className="relative w-[24rem]  flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
                href="#"
              >
                <div className="pt-4 text-gray-500">
                  <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                    Password
                  </h3>

                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <img
                  src="https://github.com/omprakash2929/Image/blob/main/user-info/pass.png?raw=true"
                  className="h-16 w-16 "
                  alt=""
                />
              </a>
              <a
                className="relative w-[24rem]  flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
                href="#"
              >
                <div className="pt-4 text-gray-500">
                  <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                    Language
                  </h3>

                  <p className="mt-2 hidden text-sm sm:block">English</p>
                </div>
                <img
                  src="/public/user-info/translate.png"
                  className="h-16 w-16 "
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>

        <section className="py-6zpy-8 lg:py-12 xl:hidden ">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="relative mb-10 pt-8 md:mb-16">
            <h1 className="text-2xl font-poppins text-red-500 mt-4">
              Personal Information
            </h1>
            <p className="font-poppins  text-sm w-[22rem]">
              Manage your personal infromation , including pgone number and
              email adress where you can be contacated
            </p>
            </div>

            <div className="grid  grid-cols-2 gap-12 lg:grid-cols-3">
              <article className="relative h-36 select-none bg-blue-50 px-8 pt-10 pb-20 text-blue-900 shadow-md">
                <div className="flex items-center mt-[-1rem] gap-7">

                <h1 className="text-sm uppercase">Name</h1>
                <img
                  src="/public/user-info/profile.png"
                  className="h-10 w-10 "
                  alt=""
                />
                </div>

                <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      required
                      className="text-sm font-pop  w-[8rem] ml-[-1rem] mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
              </article>
              <article className="relative h-36 select-none bg-blue-50 px-8 pt-10 pb-20 text-blue-900 shadow-md">
                <div className="flex items-center mt-[-1rem] gap-7">

                <h1 className="text-sm uppercase">Email</h1>
                <img
                  src="/public/user-info/email.png"
                  className="h-10 w-10 "
                  alt=""
                />
                </div>

                <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      required
                      disabled
                      className="text-sm font-pop  w-[8rem] ml-[-1rem] mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
              </article>
              <article className="relative h-36 select-none bg-blue-50 px-8 pt-10 pb-20 text-blue-900 shadow-md">
                <div className="flex items-center mt-[-1rem] gap-7">

                <h1 className="text-sm uppercase">Phone</h1>
                <img
                  src="/public/user-info/phone-call.png"
                  className="h-7 w-7 "
                  alt=""
                />
                </div>

                <input
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      type="text"
                      required
                      className="text-sm font-pop  w-[8rem] ml-[-1rem] mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
              </article>
              <article className="relative h-36 select-none bg-blue-50 px-8 pt-10 pb-20 text-blue-900 shadow-md">
                <div className="flex items-center mt-[-1rem] gap-2">

                <h1 className="text-sm uppercase">Password</h1>
                <img
                  src="/public/user-info/pass.png"
                  className="h-7 w-7 "
                  alt=""
                />
                </div>

                <input
                      onChange={(e) => setName(e.target.value)}
                      value={password}
                      type="password"
                      required
                      className="text-sm font-pop  w-[8rem] ml-[-1rem] mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
              </article>
              <article className="relative h-36 select-none bg-blue-50 px-8 pt-10 pb-20 text-blue-900 shadow-md">
                <div className="flex items-center mt-[-1rem] gap-4">

                <h1 className="text-sm uppercase">Address</h1>
                <img
                  src="/public/user-info/home-address.png"
                  className="h-7 w-7 "
                  alt=""
                />
                </div>

                <input
                      onChange={(e) => setName(e.target.value)}
                      value={address}
                      type="text"
                      required
                      className="text-sm font-pop  w-[8rem] ml-[-1rem] mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
              </article>
              <article className="relative h-36 select-none bg-blue-50 px-8 pt-10 pb-20 text-blue-900 shadow-md">
                <div className="flex items-center mt-[-1rem] gap-4">

                <h1 className="text-sm uppercase">Language</h1>
                <img
                  src="/public/user-info/translate.png"
                  className="h-7 w-7 "
                  alt=""
                />
                </div>
                <p className="mt-2  font-pop    text-sm ">English</p>
                
              </article>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Profiles;
