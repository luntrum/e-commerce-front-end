import { Button, Card, Carousel, List, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { ProductContext } from "../components/context/product.context";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/context/auth.context";

function HomePage() {
  const { products } = useContext(ProductContext);
  const { handleAddtoCart } = useContext(AuthContext);
  const categorizedProducts = products.reduce((acc, product) => {
    (acc[product.category] = acc[product.category] || []).push(product);
    return acc;
  }, {});
  // console.log(categorizedProducts);

  return (
    <div className="m-5 w-full bg-white">
      {Object.entries(categorizedProducts).map(([category, products]) => (
        <div key={category} id={`${category}`} className="mb-8 w-full">
          <Typography.Title level={3}>{category}</Typography.Title>

          <div className="m-auto grid grid-cols-1 items-center justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="my-2 ml-0 grid items-center justify-center"
              >
                <Card
                  title={
                    <Link
                      className="m-auto flex items-center justify-center text-nowrap hover:underline"
                      to={`/products/${product.product_id}`}
                    >
                      {product.name}
                    </Link>
                  }
                  className="m-auto h-full w-60 justify-between md:w-72"
                >
                  <p className="m-auto text-wrap text-center">
                    {product.title}
                  </p>
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
