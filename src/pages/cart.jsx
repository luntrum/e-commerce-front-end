import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../components/context/product.context';
import { Button, Table } from 'antd';
import { AuthContext } from '../components/context/auth.context';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { auth } = useContext(AuthContext);
  const { products } = useContext(ProductContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

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
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [auth, products]);

  // Cột cho bảng
  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${new Intl.NumberFormat('vi-VN').format(price)} VND`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total',
      key: 'total',
      render: (_, record) => {
        const totalItemPrice = record.price * record.quantity;
        return `${new Intl.NumberFormat('vi-VN').format(totalItemPrice)} VND`;
      },
    },
  ];

  // Row selection logic
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
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
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 === 0,
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
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
    navigate('/');
  };
  return (
    <div className="w-full m-auto mt-5">
      <section className="m-auto w-3/4 bottom-20 top-12">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={cartItems}
          rowKey="product_id"
          pagination={{ pageSize: 8 }}
        />
      </section>
      <footer className=" fixed w-full  bottom-0 bg-white h-20 ">
        <div className="flex justify-around mt-5 p-4 shadow-md">
          <p className=" text-black text-2xl font-semibold">
            Total: {new Intl.NumberFormat('vi-VN').format(totalPrice)} VND
          </p>
          <Button type="primary" size="large" onClick={handlePurchase}>
            {' '}
            Complete Purchase{' '}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;
