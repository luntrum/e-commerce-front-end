import { useContext, useEffect, useState } from 'react';
import { getUserApi } from '../util/api';
import { Descriptions } from 'antd';
import { AuthContext } from '../components/context/auth.context';

const UserPage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const username = auth.user.username;
  //     const res = await getUserApi(username);
  //     // console.log(res);
  //     if (res?.data && res.status === 200) {
  //       setAuth({
  //         isAuthenticated: true,
  //         user: res.data,
  //       });
  //     }
  //   };
  //   fetchUser();
  // }, []);

  return (
    <div className="flex justify-center align-middle p-5">
      <div className="flex flex-col m-auto items-center w-full max-w-lg">
        <Descriptions
          title={<span className="text-3xl font-bold">User Info</span>}
          className="text-center text-xl"
          layout="horizontal"
          column={1}
        >
          <Descriptions.Item
            label={
              <span className="text-sm sm:text-sm md:text-xl lg:text-3xl">
                Username
              </span>
            }
          >
            <span className="text-sm sm:text-sm md:text-lg lg:text-2xl  ">
              {auth.user.username}
            </span>
          </Descriptions.Item>
          <p>id: {auth.user._id}</p>
          <Descriptions.Item
            label={
              <span className="text-sm sm:text-sm md:text-xl lg:text-3xl">
                Name
              </span>
            }
          >
            <span className="text-sm sm:text-sm md:text-lg lg:text-2xl ">
              {auth.user.name}
            </span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span className="text-sm sm:text-sm md:text-xl lg:text-3xl">
                Email
              </span>
            }
          >
            <span className="text-sm sm:text-sm md:text-lg lg:text-2xl ">
              {auth.user.email}
            </span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span className="text-lg sm:text-sm md:text-xl lg:text-3xl">
                Role
              </span>
            }
          >
            <span className="text-sm sm:text-sm md:text-lg lg:text-2xl ">
              {auth.user.role}
            </span>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default UserPage;
