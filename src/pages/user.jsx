import { useEffect, useState } from 'react';
import { getUserApi } from '../util/api';
import { Table } from 'antd';

const UserPage = () => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const username = user?.username;

      const res = await getUserApi(username);
      if (res && res.status === 200) {
        setDataSource(res.data);
      }
      console.log(res.data);
    };
    fetchUser();
  }, []);

  return <div> name:{dataSource.name} </div>;
};

export default UserPage;
