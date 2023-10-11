import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SideCategory from "./Category/SideCategory";



const Banner = () => {
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
      items: 1,
    },
  };
  return (
    
    <div className="flex mt-2 w-full">
      
      <SideCategory/>
      <section className="flex ml-0 xl:ml-16 xl:mt-8 flex-row mx-auto w-[96rem]">
      <div className="w-full flex ">

        <div className=" w-[25rem] xl:w-[50rem] 2xl:w-[78%] ">
          <Carousel
            responsive={responsive}
            infinite={true}
           autoPlay
            autoPlaySpeed={5000}
            transitionDuration={500}
            className="xl:ml-[-2rem] 2xl:ml-0"
          >
            <div>
              <img
                src="https://github.com/omprakash2929/Image/blob/main/Banner/banner-1.png?raw=true"
                className="w-[25rem] xl:w-[60rem] 2xl:w-[73rem] h-[13rem] xl:h-[30rem] 2xl:h-[33rem] "
                alt=""
              />
            </div>
            <div>
              <img
                src="https://github.com/omprakash2929/Image/blob/main/Banner/banner-2.png?raw=true"
                className="w-[25rem] xl:w-[60rem] 2xl:w-[73rem] h-[13rem] xl:h-[30rem] 2xl:h-[33rem]"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://github.com/omprakash2929/Image/blob/main/Banner/banner-3.png?raw=true"
                className="w-[25rem] xl:w-[60rem] 2xl:w-[73rem] h-[13rem] xl:h-[30rem] 2xl:h-[33rem]"
                alt=""
              />
            </div>
          </Carousel>
        </div>
        <div className="hidden xl:flex 2xl:flex flex-col gap-8">
          <img
            src="https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            className="2xl:w-[888rem] 2xl:h-[16rem] xl:w-[12rem] xl:h-[13rem] xl:ml-4 2xl:ml-0"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1531303435785-3853ba035cda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
            className="2xl:w-[888rem] 2xl:h-[15rem] xl:w-[12rem] xl:h-[15rem] xl:ml-4 2xl:ml-0"
            alt=""
          />
        </div>
        
      </div>
      </section>
    </div>
  )
};

export default Banner;
