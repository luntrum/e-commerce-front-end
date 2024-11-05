import { Button, Card, Carousel, List, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { ProductContext } from '../components/context/product.context';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/context/auth.context';

function HomePage() {
  const { products } = useContext(ProductContext);
  const { handleAddtoCart } = useContext(AuthContext);
  const categorizedProducts = products.reduce((acc, product) => {
    (acc[product.category] = acc[product.category] || []).push(product);
    return acc;
  }, {});

  return (
    <div className="m-5 w-full ">
      {Object.entries(categorizedProducts).map(([category, products]) => (
        <div key={category} className="w-full mb-8 ">
          <Typography.Title level={3}>{category}</Typography.Title>

          <div className="m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center ">
            {products.map((product) => (
              <div
                key={product._id}
                className=" ml-0 my-2 grid items-center justify-center"
              >
                <Card
                  title={
                    <Link
                      className=" flex justify-center m-auto items-center text-nowrap hover:underline"
                      to={`/products/${product.product_id}`}
                    >
                      {product.name}
                    </Link>
                  }
                  className=" m-auto  justify-between h-full w-60 md:w-72  "
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
                    <p className="text-sm hidden sm:flex">Add to cart</p>
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
