import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import useCategory from "../../Hook/useCategory";
import { Link } from "react-router-dom";

function Categories() {
  const categories = useCategory();
  return (
    <Layout>
      <div className="flex flex-wrap  gap-3 container mx-auto">
        {categories?.map((c) => (
               <div className=" flex flex-wrap mt-4 ml-2 " key={c._id}>
                
               <div className=" flex justify-center items-center group relative mb-4 w-[11rem] h-[6rem] text-white rounded-md border bg-blue-600 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5  py-10 px-8 shadow-lg transition-all duration-200 ease-in-out">
                
                 <p className="text-center font-sans text-2xl font-bold">{c.name} </p>
  
                 <div className=" absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-md bg-blue-600 px-10 opacity-0 transition group-hover:opacity-100">
                   <Link to={`/category/${c.slug}`} className="text-center text-xl font-bold"> Visite Now </Link>
                 </div> 
               </div>
             </div>
        ))}
      </div>
    </Layout>
  );
}

export default Categories;
