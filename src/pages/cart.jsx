import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../components/context/product.context";
import { Button, Card, Checkbox, notification, Table, Typography } from "antd";
import { AuthContext } from "../components/context/auth.context";
import { useNavigate } from "react-router-dom";

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

          console.log("categorized Product: ", categorizedProducts);
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

    navigate("/payment", { state: { items: purchaseItems } });
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
  return (
    <div className="m-auto mt-5 flex min-h-screen w-full flex-col">
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
                className="row-span-2 my-4 grid min-h-20 grid-cols-8 border p-4 pr-8"
              >
                <Checkbox
                  checked={selectedItems[product.product_id] ? true : false}
                  onChange={(e) =>
                    handleCheckboxChange(product, e.target.checked)
                  }
                  className="left-0 col-span-1 ml-0"
                ></Checkbox>
                <div className="col-span-7 grid grid-cols-8">
                  <div className="m-autoflex col-span-3">
                    {product.name.trim()}
                  </div>
                  <div className="col-span-3 flex justify-between align-middle">
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
                  <div className="col-span-2 m-auto mx-5 w-full pr-2">
                    {" "}
                    {formatVND(product.price)}
                    {"  "}
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
