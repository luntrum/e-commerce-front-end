import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../components/context/product.context";
import { Button, Checkbox, notification, Typography } from "antd";
import { AuthContext } from "../components/context/auth.context";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons";

const CartPage = () => {
  const { auth, handleUpdateCart } = useContext(AuthContext);
  const { products } = useContext(ProductContext);
  const [cartItems, setCartItems] = useState({});

  const [editedQuantity, setEditedQuantity] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});

  const navigate = useNavigate();
  //getCartItem by product id from auth user
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const selectedProducts = await auth?.user?.selectedProducts;
        if (selectedProducts) {
          const categorizedProducts = await selectedProducts.reduce(
            (result, selectedProduct) => {
              let productDetails = products.find(
                (product) => product.product_id === selectedProduct.productId,
              );
              if (productDetails) {
                productDetails = {
                  ...productDetails,
                  quantity: selectedProduct.quantity,
                };
                (result[productDetails.category] =
                  result[productDetails.category] || []).push(productDetails);
              }
              return result;
            },
            {},
          );
          setCartItems(categorizedProducts);
          setEditedQuantity({});
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [auth, products]);

  const handlePurchase = () => {
    const purchaseItems = Object.values(selectedItems).map((product) => ({
      productId: product.product_id,
      quantity: editedQuantity[product.product_id] ?? product.quantity,
    }));
    if (purchaseItems.length > 0) {
      navigate("/payment", { state: { items: purchaseItems } });
    } else {
      notification.error({
        message: "Purchase Error",
        description: "Please chose item you want purchase",
      });
    }
  };

  //edit quantity
  const handleQuantityChange = (product, amount) => {
    setIsEditing(true);
    setEditedQuantity((prevQuantities) => {
      const currentQuantity =
        prevQuantities[product.product_id] ?? product.quantity;
      const newQuantity =
        amount === "+" ? currentQuantity + 1 : Math.max(currentQuantity - 1, 1);
      return {
        ...prevQuantities,
        [product.product_id]: newQuantity,
      };
    });
  };
  /// delete button
  const handleDeleteItem = async (product) => {
    try {
      const productName = product.name;
      const res = await handleUpdateCart({
        updateReq: "delete_item",
        item: product.product_id,
      });
      if (res) {
        notification.success({
          message: `Remove item to cart`,
          description: `${productName} remove from cart`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  ///done button
  const handleDone = async () => {
    try {
      const updatedCartItems = Object.keys(editedQuantity).map((productId) => ({
        productId,
        quantity: editedQuantity[productId],
      }));
      const res = await handleUpdateCart({
        updateReq: "update_items",
        items: updatedCartItems,
      });
      console.log(res);
      if (res) {
        notification.success({
          message: "Update Cart successfully",
          description: "Cart updated successfully",
        });
        setIsEditing(false);
      } else {
        notification.error({
          message: "Update cart failed",
          description: "ERROR",
        });
      }
    } catch (error) {
      console.log("update cart error", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedQuantity({});
  };
  const handleCheckboxChange = (product, checked) => {
    setSelectedItems((prevSelectedItems) => {
      const updateSelectedItems = { ...prevSelectedItems };
      if (checked) {
        updateSelectedItems[product.product_id] = product;
      } else {
        delete updateSelectedItems[product.product_id];
      }

      return updateSelectedItems;
    });
  };
  const calculateTotalPrice = () => {
    return Object.values(selectedItems).reduce((total, product) => {
      const quantity = editedQuantity[product.product_id] ?? product.quantity;
      return total + product.price * quantity;
    }, 0);
  };

  const formatVND = (amout) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amout);
  };
  console.log(cartItems);
  return (
    <div className="m-auto mt-5 flex min-h-screen w-full flex-col bg-white">
      <header className="sticky top-12 z-10 grid h-10 grid-cols-3 bg-white">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => {
            navigate("/");
          }}
          className="col-span-1 mx-5 my-auto"
        ></Button>
        <h1 className="col-span-1 text-nowrap text-center text-xl md:text-2xl lg:text-3xl">
          Your Shopping Cart
        </h1>
      </header>
      <div
        className={`${Object.keys(cartItems).length === 0 ? "flex" : "hidden"} sticky top-24 mx-auto justify-center align-middle`}
      >
        {" "}
        You didn't chose anything{" "}
      </div>
      <section className="bottom-20 top-12 m-auto w-3/4 min-w-[400px] flex-grow sm:w-2/5">
        {Object.entries(cartItems).map(([category, products]) => (
          <div
            key={category}
            className="my-5 flex flex-col rounded-xl border p-2"
          >
            <Typography.Title
              level={3}
              className="col-span-1 row-span-3 text-center"
            >
              {category}
            </Typography.Title>

            {products.map((product) => (
              <div
                key={product.product_id}
                className="row-span-2 my-4 grid min-h-20 grid-cols-12 border p-4 pr-8"
              >
                <div className="left-0 col-span-1 my-auto ml-0">
                  <Checkbox
                    checked={selectedItems[product.product_id] ? true : false}
                    onChange={(e) =>
                      handleCheckboxChange(product, e.target.checked)
                    }
                  ></Checkbox>
                </div>
                <div className="col-span-11 grid grid-cols-9">
                  <div className="col-span-3 my-auto flex justify-start text-left">
                    {product.name.trim()}
                  </div>
                  <div className="col-span-2 flex justify-between align-middle">
                    <Button
                      className="m-auto"
                      onClick={() => handleQuantityChange(product, "-")}
                    >
                      -
                    </Button>
                    <span className="m-auto">
                      {editedQuantity[product.product_id] ?? product.quantity}
                    </span>
                    <Button
                      className="m-auto"
                      onClick={() => handleQuantityChange(product, "+")}
                    >
                      +
                    </Button>{" "}
                  </div>
                  <div className="col-span-3 m-auto mx-5 w-full pr-2 text-sm sm:text-lg">
                    {" "}
                    {formatVND(product.price)}
                    {"  "}
                  </div>
                  <div className="col-span-1 m-auto ml-5">
                    <Button
                      className="m-auto"
                      icon={<CloseOutlined />}
                      onClick={() => handleDeleteItem(product)}
                    ></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
      <footer className="sticky bottom-0 z-10 mb-0 h-20 w-full bg-white pb-0">
        <div className="mt-5 flex justify-around p-4 shadow-md">
          <p className="text-2xl font-semibold text-black">
            Total: {formatVND(calculateTotalPrice())}
          </p>

          {isEditing ? (
            <div className="flex space-x-4">
              <Button type="primary" onClick={handleDone}>
                Done
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </div>
          ) : (
            <Button type="primary" size="large" onClick={handlePurchase}>
              {" "}
              Complete Purchase{" "}
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default CartPage;
