import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../server";

const AdminProfile = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1)
  const itemPerPage = 7;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${server}auth/user/${id}`, {
          // const res = await axios.get(`${server}auth/me`, {
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


  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(data?.details?.length / itemPerPage)) {
      setCurrentPage(pageNumber);
    }
  };


  const sliceMovie = (movie, currentPage, itemPerPage) => {
    const firstIndex = (currentPage - 1) * itemPerPage;
    const lastIndex = firstIndex + itemPerPage;
    return movie.slice(firstIndex, lastIndex);

  }
  const paginatedMovie = sliceMovie(data?.details || [], currentPage, itemPerPage);

  return (
    <>
      <div className="container mx-auto px-4 py-8 bg-teal-700">
        {data && (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-2xl font-bold font-serif text-gray-200 mt-20">User Details</h2>
              <div className="flex items-center space-x-4">
                <p className="text-gray-200 font-serif font-medium text-2xl mt-20">UserName : {data.userName}</p>
                <p className="text-gray-200 font-serif font-medium text-2xl mt-20">Email : {data.userEmail}</p>
                <p className="text-gray-200 font-serif font-medium text-2xl mt-20">Contact : {data.userPhoneNumber}</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold font-serif text-gray-200  "> Show Details</h2>
            {data.details && (
              <>
                <div className="shadow- overflow-x-auto bg-slate-600 rounded-md mt-8">
                  <table className="w-full min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-500 text-left text-gray-300 font-medium">
                        <th className="p-4">Movie Title</th>
                        <th className="p-4  md:text-center">Screen Time</th>
                        <th className="p-4  lg:text-right">Total Price</th>
                        <th className="p-4 lg:text-right ">Seat Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedMovie.map((movie, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-900">
                          <td className="p-4">{movie.movie}</td>
                          <td className="p-4  md:text-center">{movie.screeningTime}</td>
                          <td className="p-4  lg:text-right">{movie.price}</td>
                          <td className="p-4  lg:text-right">{movie.id.$in.join(" , ")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {data?.details?.length > itemPerPage && (
                    <div className="flex justify-center mt-4">
                      <ul className="inline-flex list-none rounded-md shadow">
                        {/* Previous button */}
                        <li className="px-3 py-2 text-gray-400 hover:text-blue-500">
                          <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                          >
                            Previous
                          </button>
                        </li>

                        {/* Page numbers */}
                        {Array.from({ length: Math.ceil(data?.details?.length / itemPerPage) }, (_, i) => (
                          <li key={i + 1} className="px-3 py-2 text-gray-400 hover:text-blue-500">
                            <button
                              className={currentPage === i + 1 ? "text-blue-500 font-bold" : ""}
                              onClick={() => handlePageChange(i + 1)}
                            >
                              {i + 1}
                            </button>
                          </li>
                        ))}

                        {/* Next button */}
                        <li className="px-3 py-2 text-gray-400 hover:text-blue-500">
                          <button
                            disabled={currentPage === Math.ceil(data?.details?.length / itemPerPage)}
                            onClick={() => handlePageChange(currentPage + 1)}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
          </>

        )}

      </div>





    </>
  )
};

export default AdminProfile;
