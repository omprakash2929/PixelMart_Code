import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
const data = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Jul',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Aug',
    uv: 3180,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Sep',
    uv: 2180,
    pv: 9800,
    amt: 2100,
  },
  {
    name: 'Oct',
    uv: 1180,
    pv: 2300,
    amt: 2100,
  },
  {
    name: 'Nov',
    uv: 6180,
    pv: 5300,
    amt: 2100,
  },
  {
    name: 'Dec',
    uv: 7180,
    pv: 4300,
    amt: 2100,
  },
]
export const OrderDashbaord = () => {
  return (
    <Layout>
      <div className="w-full">
        <div className="flex flex-row w-full">
          <div className="w-[17%]">
            <AdminMenu />
          </div>
        <div className="mt-8 flex justify-center items-center">
       
        <LineChart
          width={1000}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
     
        </div>
        </div>
      </div>
    </Layout>
  );
};
