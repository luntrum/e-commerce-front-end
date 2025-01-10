import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../components/context/product.context";
import { Button, Card } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { selectProductApi } from "../util/api";
import { AuthContext } from "../components/context/auth.context";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { products, formatVND } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth, handleAddtoCart } = useContext(AuthContext);
  const userId = auth?.user?._id;

  useEffect(() => {
    const foundProduct = products.find(
      (product) => product.product_id === parseInt(id),
    );

    if (foundProduct) {
      setProduct(foundProduct);
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [id, products]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="mt-10 h-full bg-white">
      <Card
        key={product.id}
        title={
          <p
            className="text-nowrap text-center hover:underline"
            to={`/products/${product.product_id}`}
          >
            {product.name}
          </p>
        }
        className="m-auto mt-10 h-full w-60 justify-between md:w-3/4"
      >
        <div className="grid grid-cols-3 grid-rows-5">
          <img
            src={product.image}
            alt={product.title}
            className="col-span-2 row-span-4 m-auto mb-4 h-48 w-48 md:h-60 md:w-60"
          />
          <div className="col-span-1 row-span-4 flex flex-col">
            <p className="m-auto ml-0 text-wrap text-left text-xl font-bold">
              {product.title}
            </p>
            <p className="m-auto">{product.description} </p>
            <p className="m-auto ml-0 text-center text-xl">
              {formatVND(product.price)}{" "}
            </p>
          </div>
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => handleAddtoCart(product.product_id)}
            className="col-span-3 row-span-1 w-full"
          >
            <p className="hidden text-sm sm:flex">Add to cart</p>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetailPage;
