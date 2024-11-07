import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../components/context/product.context";
import { Button, notification, Table } from "antd";
import { AuthContext } from "../components/context/auth.context";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { auth, handleUpdateCart } = useContext(AuthContext);
  const { products } = useContext(ProductContext);
  const [cartItems, setCartItems] = useState([]);
  const [editedQuantity, setEditedQuantity] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  //getCartItem by product id from auth user
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (auth?.user?.selectedProducts && products.length > 0) {
          const cartItemsData = auth.user.selectedProducts
            .map((cartItem) => {
              const product = products.find(
                (item) => item.product_id === cartItem.productId,
              );

              return product
                ? { ...product, quantity: cartItem.quantity }
                : null;
            })
            .filter(Boolean);

          setCartItems(cartItemsData);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [auth, products, isEditing]);

  // Cột cho bảng
  const columns = [
    {
      title: "Stt",
      key: "index",
      render: (_, __, index) => index + 1, // Tăng dần từ 1
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${new Intl.NumberFormat("vi-VN").format(price)} VND`,
    },
    {
      title: "Quantity",

      key: "quantity",
      render: (_, record) => {
        return (
          <div className="flex items-center justify-around">
            <Button onClick={() => handleQuantityChange(record.product_id, -1)}>
              -
            </Button>
            <span>{editedQuantity[record.product_id] ?? record.quantity}</span>
            <Button onClick={() => handleQuantityChange(record.product_id, 1)}>
              +
            </Button>
          </div>
        );
      },
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) => {
        const totalItemPrice = record.price * record.quantity;
        return `${new Intl.NumberFormat("vi-VN").format(totalItemPrice)} VND`;
      },
    },
  ];

  // Row selection logic
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 === 0,
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 !== 0,
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const totalPrice = selectedRowKeys.reduce((total, key) => {
    const item = cartItems.find((cartItem) => cartItem.product_id === key);
    if (item) {
      return total + item.price * item.quantity;
    }
    return total;
  }, 0);
  const handlePurchase = () => {
    navigate("/");
  };

  //edit quantity
  const handleQuantityChange = (productId, amount) => {
    setEditedQuantity((prev) => {
      const currentItem = cartItems.find(
        (item) => item.product_id === productId,
      );
      if (!currentItem) {
        return prev;
      }
      const currentQuantity = prev[productId] ?? currentItem.quantity;
      const newQuantity = currentQuantity + amount;
      return {
        ...prev,
        [productId]: Math.max(newQuantity, 0),
      };
    });
    setIsEditing(true);
  };

  ///done button
  const handleDone = async () => {
    try {
      const updatedCartItems = cartItems.map((item) => ({
        productId: item.product_id,
        quantity: editedQuantity[item.product_id] ?? item.quantity,
      }));

      const res = await handleUpdateCart({
        updateReq: "update_items",
        items: updatedCartItems,
      });
      if (res) {
        notification.success({
          message: "Update Cart successfully",
          description: "Cart updated successfully",
        });
        setIsEditing(false);
        setEditedQuantity({});
      } else {
        notification.error({
          message: "update cart failed",
          description: `ERROR`,
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

  return (
    <div className="m-auto mt-5 w-full">
      <section className="bottom-20 top-12 m-auto w-3/4">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={cartItems}
          rowKey="product_id"
          pagination={{ pageSize: 8 }}
          scroll={{ y: 400 }}
          style={{ minHeight: "400px" }}
        />
      </section>
      {isEditing && (
        <div className="mt-5 flex justify-around p-4">
          <Button type="primary" onClick={handleDone}>
            Done
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      )}
      <footer className="fixed bottom-0 h-20 w-full bg-white">
        <div className="mt-5 flex justify-around p-4 shadow-md">
          <p className="text-2xl font-semibold text-black">
            Total: {new Intl.NumberFormat("vi-VN").format(totalPrice)} VND
          </p>
          <Button type="primary" size="large" onClick={handlePurchase}>
            {" "}
            Complete Purchase{" "}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;
