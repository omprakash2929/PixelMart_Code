import React,{useState} from "react";
import useCategory from "../Hook/useCategory";

export const Test = ({}) => {
 
  return (
  <>
<div>
<section className="py-6 sm:py-8 lg:py-12">
  <div className="mx-auto max-w-screen-xl px-4 md:px-8">
    
    <div className="relative mb-10 pt-8 md:mb-16">
      <h2 className="mb-4 text-center font-serif text-3xl font-bold text-blue-900 md:mb-6 md:text-4xl">New in the Industry</h2>
    </div>
  
    <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
     
      <article className="relative select-none bg-blue-50 px-8 pt-10 pb-20 text-blue-900 shadow-md">
        <h1 className="text-sm uppercase">nodejs</h1>
        <h1 className="text-lg font-semibold">How Good is PNPM when compared to Yarn and Turbo</h1>
        <a href="#" className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center bg-blue-500 text-white transition-all hover:w-16">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </article>
     
    </div>
  </div>
</section>


</div>








  </>

  
  );
};
