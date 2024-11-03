import { createContext, useEffect, useState } from 'react';
import { getAllProductApi } from '../../util/api';

export const ProductContext = createContext({});
export const ProductWrapper = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProductApi(); // Thay thế bằng endpoint thực tế

        setProducts(data);
        localStorage.setItem('products', JSON.stringify(data));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const productsdata = localStorage.getItem('products');

    if (productsdata) {
      try {
        const paredData = JSON.parse(productsdata);
        if (Array.isArray(paredData)) {
          setProducts(paredData);
        }
      } catch (error) {
        console.error('Error parsing Products from localStorages', error);
      }
    }
  }, []);
  useEffect(() => {
    if (products) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {props.children}
    </ProductContext.Provider>
  );
};
