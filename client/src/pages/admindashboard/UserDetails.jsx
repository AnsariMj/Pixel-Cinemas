import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../server";


const UserDetails = () => {
  const [data, setData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${server}auth/all-user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        setData(res.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUserDetails();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      try {
        const res = await axios.delete(`${server}auth/delete/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        if (res.status === 200) {

          toast.success("User Deleted successfully")

          window.location.reload();
        } else {
          toast.error("User Deleted successfully")

          alert("Failed to delete user");
        }
      } catch (error) {
        toast.error("Something went wrong")
        console.error(error.message);
      }
    }
  };

  const filteredData = data
    ? data.filter(
      (d) =>
        d.role === "user" &&
        (d.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.userPhoneNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    : [];

  return (
    <>
      <div className="bg-teal-700 rounded-lg gap-1 py-10 px-6   h-fit">
        <div className="text-gray-900   bg-teal-700">
          <div className="p-4 flex flex-col">
            <h1 className="text-2xl mb-2  font-bold font-serif text-gray-200 mt-20">Users</h1>
            <input
              type="text"
              placeholder="Search..."
              className="p-1 w-60 bg-gray-100 text-slate-900 rounded-md mb-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="px-3 py-4 flex justify-center">
            <div className="overflow-x-auto  ">
              <table className="w-full text-md text-gray-400 overflow-scroll  md:w-[900px] bg-gray-500 shadow-md rounded mb-4">
                <tbody>
                  <tr className="border-b">
                    <th className="text-left text-slate-100 p-3 px-5">Name</th>
                    <th className="text-left text-slate-100 p-3 px-5">Email</th>
                    <th className="text-left text-slate-100 p-3 px-5">Number</th>
                    <th className="text-left text-slate-100 p-3 px-5">Action</th>
                    <th></th>
                  </tr>

                  {filteredData.map((d, i) => (
                    <tr
                      className="border-b  bg-slate-700 hover:bg-gray-900"
                      key={i}
                    >
                      <td className="p-3 text-slate-100 px-5">
                        <h1>{d.userName}</h1>
                      </td>
                      <td className="p-3 text-slate-100 px-5">
                        <h1>{d.userEmail}</h1>
                      </td>
                      <td className="p-3 text-slate-100 px-5">
                        <h1>{d.userPhoneNumber}</h1>
                      </td>
                      <td className="p-3 px-5 flex flex-col items-center md:flex-row md:items-center">
                        <Link
                          to={`/user-profile/${d._id}`}
                          type="button"
                          className="mb-2 md:mr-2 md:mb-0 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          View
                        </Link>
                        <button
                          type="button"
                          className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => handleDelete(d._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
