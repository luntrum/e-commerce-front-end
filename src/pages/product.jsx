import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../components/context/product.context";
import { Button, Card } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { selectProductApi } from "../util/api";
import { AuthContext } from "../components/context/auth.context";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
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
    <div className="mt-5 bg-white">
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
        className="m-auto h-full w-60 justify-between md:w-72"
      >
        <img
          src={product.image}
          alt={product.title}
          className="m-auto h-48 w-48"
        />
        <p className="m-auto text-wrap text-center">{product.title}</p>
        <p className="text-center">{product.price} </p>
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={() => handleAddtoCart(product.product_id)}
          className="w-full"
        >
          <p className="hidden text-sm sm:flex">Add to cart</p>
        </Button>
      </Card>
    </div>
  );
};

export default ProductDetailPage;
