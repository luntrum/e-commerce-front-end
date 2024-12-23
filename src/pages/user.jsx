import { useContext, useEffect, useState } from "react";
import { getUserApi } from "../util/api";
import { Descriptions } from "antd";
import { AuthContext } from "../components/context/auth.context";

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
    <div className="flex justify-center bg-white p-5 align-middle">
      <div className="m-auto flex w-full max-w-lg flex-col items-center">
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
            <span className="text-sm sm:text-sm md:text-lg lg:text-2xl">
              {auth.user.username}
            </span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span className="text-sm sm:text-sm md:text-xl lg:text-3xl">
                Name
              </span>
            }
          >
            <span className="text-sm sm:text-sm md:text-lg lg:text-2xl">
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
            <span className="text-sm sm:text-sm md:text-lg lg:text-2xl">
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
            <span className="text-sm sm:text-sm md:text-lg lg:text-2xl">
              {auth.user.role}
            </span>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default UserPage;
