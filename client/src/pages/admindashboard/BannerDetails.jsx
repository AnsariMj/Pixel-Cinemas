import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { server } from "../../server";

const BannerDetails = () => {
    const token = localStorage.getItem("token");
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await axios.get(`${server}banner/get-all-banner`);
            setBanners(response.data);
        } catch (error) {
            console.error("Error fetching banners:", error);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this banner?");

        if (confirmed) {
            try {
                await axios.delete(`${server}banner/delete-banner/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                });
                setBanners(banners.filter(banner => banner._id !== id)); // Remove the deleted banner from the state
                toast.success("Banner Deleted successfully");
            } catch (error) {
                toast.error("Something went wrong");
                console.error(error.message);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 h-fit">
            <h1 className="text-3xl font-bold  text-black mb-4">All Banners List</h1>
            <div className="grid grid-cols-3 gap-4">
                {banners.map((banner) => (
                    <div key={banner._id} className="bg-white p-4 rounded-lg shadow-md">
                        <img src={banner.bannerImage} alt={banner.bannerTitle} className="w-full h-auto rounded-lg" style={{ maxHeight: "300px" }} />
                        <p className="text-lg text-black font-semibold my-2"> Movie Name : {banner.bannerTitle}</p>
                        <button
                            type="button"
                            className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleDelete(banner._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannerDetails;
