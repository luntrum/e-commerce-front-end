import { App, notification } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserApi, selectProductApi, updateUserApi } from "../../util/api";
import { data } from "autoprefixer";
import { ProductContext } from "./product.context";

export const AuthContext = createContext({});

export const AuthWrapper = (props) => {
  const { products } = useContext(ProductContext);
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {
      userId: "",
      username: "",
      email: "",
      name: "",
      role: "",
      selectedProducts: [
        {
          productId: "",
          quantity: 0,
        },
      ],
    },
  });

  const fetchUserData = async (username) => {
    try {
      const res = await getUserApi(username);
      if (res?.data && res?.status === 200) {
        setAuth({
          isAuthenticated: true,
          user: res.data,
        });
      }
    } catch (error) {
      console.log(error, "error fetching data");
    }
  };
  //get item from localStorage
  useEffect(() => {
    const authLocal = localStorage.getItem("auth");
    if (authLocal && !auth?.isAuthenticated) {
      try {
        const parsedata = JSON.parse(authLocal);
        if (parsedata) {
          setAuth(parsedata);
        }
        // console.log(parsedata);
      } catch (error) {
        console.log("error parsing auth", error);
      }
    }
  }, []);
  useEffect(() => {
    if (auth?.user && auth?.isAuthenticated === true) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);
  const handleAddtoCart = async (productId) => {
    const product = products.find(
      (product) => product.product_id === productId,
    );
    try {
      const selectedProductsData = await selectProductApi(
        auth.user._id,
        productId,
      );
      if (selectedProductsData) {
        const fetchUser = async () => {
          const username = auth.user.username;
          const res = await getUserApi(username);
          // console.log(res);
          if (res?.data && res.status === 200) {
            setAuth({
              isAuthenticated: true,
              user: res.data,
            });
          }
        };
        fetchUser();
        notification.success({
          message: `Added item to cart`,
          description: `${product.name} added to cart`,
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "Please login for continue shopping",
      });
    }
  };

  const handleUpdateCart = async (updateData) => {
    try {
      const res = await updateUserApi(auth.user._id, updateData);
      if (res) {
        fetchUserData(auth.user.username);
        return res;
      } else {
        console.log("update Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, handleAddtoCart, handleUpdateCart }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
