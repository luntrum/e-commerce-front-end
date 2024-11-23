import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../components/context/product.context";
import { Button, notification, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AuthContext } from "../components/context/auth.context";
import { data } from "autoprefixer";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items } = location.state || {};
  const { products } = useContext(ProductContext);
  const { handleUpdateCart } = useContext(AuthContext);
  console.log(items);
  const purchaseItems = items.reduce((result, item) => {
    const productDetails = products.find(
      (product) => product.product_id === item.productId,
    );

    if (productDetails) {
      const category = productDetails.category;
      const productWithQuantity = {
        ...productDetails,
        quantity: item.quantity,
      };
      if (!result[category]) {
        result[category] = [];
      }
      result[category].push(productWithQuantity);
    }

    return result;
  }, []);
  console.log(purchaseItems);
  const totalPrice = Object.values(purchaseItems)
    .flat()
    .reduce((total, product) => total + product.price * product.quantity, 0);
  const formatVND = (amout) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amout);
  };

  const handlePurchase = () => {
    try {
      const res = handleUpdateCart({
        updateReq: "remove_purchase_items",
        data: items,
      });
      if (res) {
        notification.success({
          message: "Purchase Succesfull",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen w-full flex-col">
      <header className="sticky top-12 grid h-12 w-full grid-cols-3 bg-white">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/shopping-cart")}
          className="col-span-1 my-auto ml-5"
        />
        <h1 className="col-span-1 text-center text-3xl">Payment</h1>
      </header>
      <section className="top-24 m-auto w-4/5 rounded-lg p-5 sm:w-1/2">
        {Object.entries(purchaseItems).map(([category, products]) => (
          <div
            key={category}
            className="my-5 grid grid-rows-5 rounded-2xl border p-2"
          >
            <Typography.Title level={4} className="row-span-1 m-auto text-left">
              {" "}
              {category}{" "}
            </Typography.Title>
            <div className="row-span-3">
              {products.map((product, index) => (
                <div
                  className="my-2 grid grid-cols-9 border"
                  key={product.product_id}
                >
                  <div className="col-span-1">{index + 1}</div>
                  <div className="col-span-4">{product.name}</div>
                  <div className="col-span-1">{product.quantity}</div>
                  <div className="col-span-3">{formatVND(product.price)}</div>
                </div>
              ))}
            </div>
            <div className="row-span-1 flex justify-between">
              <span>ToTal price of {products.length} items:</span>
              <div>
                {formatVND(
                  products.reduce(
                    (total, product) =>
                      total + product.price * product.quantity,
                    0,
                  ),
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
      <footer className="m-auto flex w-4/5 justify-between font-bold sm:w-1/2">
        <span>Total price is {formatVND(totalPrice)}</span>
        <Button onClick={handlePurchase}> Purchase </Button>
      </footer>
    </div>
  );
};

export default PaymentPage;
