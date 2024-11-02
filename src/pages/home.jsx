import { Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

function HomePage() {
  return (
    <div className="p-5 top-10 ">
      <Button type="primary" icon={<ShoppingCartOutlined />}>
        Mua hàng
      </Button>
    </div>
  );
}

export default HomePage;
