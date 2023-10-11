import React,{useState, useEffect} from 'react'
import { useCart } from '../contexts/cart';
import { useAuth } from "../contexts/auth";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Price } from "../components/price";
function Filter({categories}) {
   
  return (
     <div className="flex border  top-0 left-0 w-[20rem] h-[94vh] border-r bg-white space-y-8 sm:w-80">
          <div className="flex flex-col h-full justify-center m-4">
            <div className="flex-1 flex flex-col h-full overflow-auto">
              <ul className="px-4 text-sm font-medium flex-1">
                <div className="space-y-2">
                  <ToastContainer />
                  <h1 className="font-Ibm ">Product Filters</h1>
                  <details className="overflow-hidden rounded border w-36 border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
                      <span className="text-sm font-medium">Availability</span>

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
                    <header className="flex items-center justify-between p-4">
                      <span className="text-sm text-gray-700"> </span>
                    
                      <button
                        type="button"
                        className="text-sm text-gray-900 underline underline-offset-4"
                        onClick={() => window.location.reload()}
                      >
                        Reset
                      </button>
                    </header>
                    <div className="border-t border-gray-200 bg-white">
                      <ul className="space-y-1 border-t border-gray-200 p-4">
                        <li>
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
                        </li>
                      </ul>
                    </div>
                  </details>
                  <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
                      <span className="text-sm font-medium"> Price </span>

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

                    <div className="border-t border-gray-200 bg-white">
                      <ul className="space-y-1 border-t border-gray-200 p-4">
                        <li>
                          <Radio.Group
                            onChange={(e) => setRadio(e.target.value)}
                          >
                            {Price?.map((p) => (
                              <div key={p._id}>
                                <Radio value={p.array}>{p.name}</Radio>
                              </div>
                            ))}
                          </Radio.Group>
                        </li>
                      </ul>
                    </div>
                  </details>
                </div>
              </ul>
            </div>
          </div>
        </div> 
  )
}

export default Filter