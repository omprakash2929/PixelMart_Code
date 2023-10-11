import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useCategory from "../../Hook/useCategory";
import { Link } from "react-router-dom";

const AndroidCategories = () => {
  const categories = useCategory();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 6,
    },
  };
  return (
    <div className="overflow-hidden xl:hidden mt-2    ">
      
      
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay
        autoPlaySpeed={5000}
        transitionDuration={500}
        className=" "
      >
        
          
          {categories?.map((c) => (
            
        <div
          key={c._id}
          className="bg-[#002244] border  w-12 h-12 rounded-full flex justify-center items-center text-[9px] overflow-hidden"
        >
          <Link className=" text-center  font-pop antialiased text-white" to={`/category/${c.slug}`}>
            {c.name}
          </Link>
        </div>
      ))}
         
       
      </Carousel>
    </div>
  );
};

export default AndroidCategories;
