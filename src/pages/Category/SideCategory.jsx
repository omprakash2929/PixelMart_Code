import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useCategory from "../../Hook/useCategory";
import { Link } from "react-router-dom";

const SideCategory = () => {
  const categories = useCategory();
  
  return (
    <>
 
      <div className="xl:flex ml-6 mt-8 xl:h-[64vh] 2xl:h-[54vh] flex-col xl:w-[11rem]  2xl:w-[13rem]  border   text-white font-pop hidden">
        <div className="flex h-10 justify-center items-center font-pop xl:text-[12px] 2xl:text-xl   place-content-center  bg-[#0f172a]  text-white rounded-sm xl:w-[11rem]  2xl:w-[13rem]   ">
          ALL CATEGORIES
        </div>
        <div className="flex flex-col  justify-center xl:w-[11rem]  2xl:w-[13rem]  ">
          <ul className="flex flex-col text-center   ">
            {categories?.map((c) => (
              <li className="border-b  border-gray-400" key={c._id}>
                <Link
                  to={`/category/${c.slug}`}
                  className="block  font-pop  px-4 py-2 text-sm font-medium text-black transition ease-in-out delay-100 transform  hover:bg-slate-500 hover:text-white "
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
      
      </div>
    
    </>
  );
};

export default SideCategory;
