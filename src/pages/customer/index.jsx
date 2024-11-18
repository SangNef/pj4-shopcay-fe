import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api/auth"; // Import the API function for fetching users

const Customer = () => {
  const [customers, setCustomers] = useState([]);

  // Fetch customers from the API
  const fetchCustomers = async () => {
    const data = await getAllUsers();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
    document.title = "AlaZea - Customers";
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Customers List</h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">ID</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Username</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Full Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Role</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{customer.id}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.username}</td>
                <td className="px-6 py-4">{customer.fullname}</td>
                <td className="px-6 py-4">{customer.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      customer.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {customer.status ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;
