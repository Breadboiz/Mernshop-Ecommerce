import { useEffect, useState } from 'react';
import axiosInstance from '../lib/axios';
import { useAuthContext } from '../context/AuthContext';

const useGetUserList = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchUserList = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/user', {
          headers: {
            'x-client-id': authUser?._id || '',
          },
          withCredentials: true,
        });
        setUserList(response.data.metadata || []);
      } catch (error) {
        console.error('Lỗi khi tìm danh sách khách hàng:', error);
      } finally {
        setLoading(false);
      }
    };

    if (authUser?._id) {
      fetchUserList();
    }
  }, [authUser]);

  return { userList, loading };
};

export default useGetUserList;
