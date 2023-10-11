import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../contexts/auth";

export const AdminDashbaord = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <div className="container">
        <div className="grid grid-cols-2">
          <div className="">
            <AdminMenu />
          </div>
          <div className="mt-8 absolute left-[48rem]">
            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Admin Name</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {auth?.user?.name}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Admin Email</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {auth?.user?.email}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Admin contact</dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {auth?.user?.phone}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
