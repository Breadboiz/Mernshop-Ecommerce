import React from 'react'
import useGetUserList from '../../hooks/userGetUserList'

const UsersmanagementTab = () => {
  const { userList, loading } = useGetUserList()
  console.log(userList)
  return (
    <div className="w-full sm:w-[80%] h-auto  mx-auto">
      <h2 className="text-2xl font-semibold mb-5 px-4 sm:px-10    rounded">
        Danh sách khách hàng
      </h2>

      <div className="p-4 sm:p-10 shadow rounded-md overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-600">Đang tải dữ liệu...</p>
        ) : userList.length === 0 ? (
          <p className="skeleton"></p>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên khách hàng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Số lượng đơn hàng đã đặt</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                user.roles !== 'AD' && <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.username || 'N/A'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>{user.phone || 'N/A'}</td>
                <td>{ user.address ? Object.values(user.address).join(', ') : 'N/A'}</td>
                <td className='text-center'>{user.countOrder}</td>
              </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default UsersmanagementTab
