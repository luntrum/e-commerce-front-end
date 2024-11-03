import { Button, Card, Carousel, List, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { ProductContext } from '../components/context/product.context';

function HomePage() {
  const { products } = useContext(ProductContext);
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
              <div className=" ml-0 my-2 grid items-center justify-center">
                <Card
                  key={product.id}
                  title={
                    <p className="m-auto text-center text-wrap">
                      {product.name}
                    </p>
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
                    onClick={() => console.log('Add to cart', product)}
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
