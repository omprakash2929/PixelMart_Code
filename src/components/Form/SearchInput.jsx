import axios from "axios";
import React from "react";
import {  useNavigate } from "react-router-dom";
import { useSearch } from "../../contexts/search";

function SearchInput() {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const handleSearch = (e) => {
      e.preventDefault();
      try {
        const { data } = axios.get(
          `/api/v1/product/search/${values.keyword}`
        );
        setValues({ ...values, result: data });
        console.log(data)
        navigate("/search");
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div>
      <input
        type="text"
        className="w-full py-2 pl-10 pr-[11rem] border border-gray-500 focus:outline-none rounded-full text-gray-700 bg-white focus:ring-0 "
        placeholder="Search"
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
      />
      <button onClick={handleSearch} className="px-3 py-1.5 text-sm text-white duration-150 bg-indigo-600 rounded-full hover:bg-indigo-500 active:bg-indigo-700">
        Button
      </button>
    </div>
  );
}

export default SearchInput;
