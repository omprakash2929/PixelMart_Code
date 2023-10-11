import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate,useLocation } from "react-router-dom";
const Spinner = ({path = "login"}) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        const interval = setInterval(() => {
            setCount ((prevValue)=> --prevValue)
        }, 1000);
        count === 0 && navigate(`/${path}`,{
            state:location.pathname,
        });
        return() =>clearInterval(interval)
    }, [count, navigate,location,path])
  return (
    <div className="flex flex-col h-[100vh] w-[100%] justify-center items-center ">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
      <h1 className="Ibm-font"> Refirecting to you in {count} second</h1>
    </div>
  );
};

export default Spinner;
