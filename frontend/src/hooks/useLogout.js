import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        console.log(localStorage.getItem("user"));
        setLoading(true);

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const clientId = user._id;
            const response = await axiosInstance.post("/auth/logout", {} , {
                headers: {
                    "x-client-id": clientId,
                },
            })
            const { message } = response.data;
            console.log(response.data);

            setAuthUser(null);
            localStorage.removeItem("user");
            window.location.reload();
            toast.success(message);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Logout failed");
        } finally {
            setLoading(false);
        }
    };

    return { logout, loading };
};

export default useLogout;
