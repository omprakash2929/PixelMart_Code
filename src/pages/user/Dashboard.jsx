import React from "react";
import Layout from "../../components/Layout/Layout";
import { UserMenu } from "../../components/Layout/UserMenu";
import { useAuth } from "../../contexts/auth";

export const Dashbaord = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container">
        <div className="flex flex-row">
          <div className="">
            <UserMenu />
          </div>
          <div className="mt-12">
<div className="my-4  w-[40rem] xl:ml-[12rem] 2xl:ml-[24rem] max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
  <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
    <div className="shrink-0 mr-auto sm:py-3">
      <p className="font-medium font-pop text-3xl">Account Details</p>
      <p className=" font-Ibm text-xl text-gray-600">show account details</p>
    </div>
    
  </div>
  <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
    <p className="shrink-0 w-32 font-medium">Name</p>
    <div className="flex">

    <input placeholder="First Name" value={auth?.user?.name} className="mb-2 w-40 rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1" />
    </div>
    
  </div>
  <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
    <p className="shrink-0 w-32 font-medium">Email</p>
    <input value={auth?.user?.email} className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" />
  </div>
  <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
    <p className="shrink-0 w-32 font-medium">password</p>
    <input value={"••••••••••••"} className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" />
  </div>
  <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
    <p className="shrink-0 w-32 font-medium">Address</p>
    <input value={auth?.user?.address} className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" />
  </div>
  <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
    <p className="shrink-0 w-32 font-medium">Language</p>
    <input value={"English"} className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" />
  </div>
  <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
    <p className="shrink-0 w-32 font-medium">Phone Number</p>
    <input value={auth?.user?.phone} className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" />
  </div>
  

</div>

          </div>
        </div>
      </div>
    </Layout>
  );
};
