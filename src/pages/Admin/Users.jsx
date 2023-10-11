import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../contexts/auth'
import axios from 'axios'


const Users = () => {
  const [auth] = useAuth();
  const [account, setAccount] = useState([])

  const getAllUser = async() =>{
    try {
      const {data} = await axios.get("/api/v1/auth/all-User");
      setAccount(data)
      
    } catch (error) {
      console.log(error)
      
    }
  }

 //* LifeCycle Method
 useEffect(() => {
  getAllUser();
}, []);
  return (
    <Layout>
<div className="w-full">
        <div className="flex flex-row w-full">
          <div className="w-[17%]">
            <AdminMenu />
          </div>
          <div className='2xl:ml-[12rem] xl:ml-[2rem]'>
          <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
  <div className="flex items-center justify-between pb-6">
    <div>
      
      <h2 className="font-semibold text-gray-700">User Accounts</h2>
      <span className="text-xs text-gray-500">View accounts of registered users</span>
    </div>
   
  </div>
  <div className="overflow-y-hidden rounded-lg border">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
            
            <th className="px-5 py-3">#</th>
            <th className="px-5 py-3">ID</th>
            <th className="px-5 py-3">Full Name</th>
            <th className="px-5 py-3">Email</th>
            <th className="px-5 py-3">User Role</th>
            <th className="px-5 py-3">Created at</th>
            <th className="px-5 py-3">Status</th>
          </tr>
        </thead>
        {
          account?.map((a,i)=>(
            <tbody key={a._id} className="text-gray-500">
          
            <tr>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="whitespace-no-wrap">{i + 1}</p>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="whitespace-no-wrap">{a?._id}</p>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="whitespace-no-wrap">{a?.name}</p>
                  </div>
                </div>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="whitespace-no-wrap">{a?.email}</p>
                  </div>
                </div>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="whitespace-no-wrap">{a?.role === 1 ? "Admin" : "User"}</p>
              </td>
              <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p className="whitespace-no-wrap">   {a?.createdAt} </p>
              </td>
             
            </tr>
            
          </tbody>
          ))
        }
       
      </table>
    </div>
    <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
      <span className="text-xs text-gray-600 sm:text-sm"> Showing 1 to 5 of 12 Entries </span>
      <div className="mt-2 inline-flex sm:mt-0">
        <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Prev</button>
        <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Next</button>
      </div>
    </div>
  </div>
</div>

          </div>
        </div>
      </div> 
    </Layout>
  )
}

export default Users