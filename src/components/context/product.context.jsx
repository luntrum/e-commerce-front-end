import { createContext , useEffect, useState } from 'react';
import { getAllProductApi, selectProductApi } from '../../util/api';


export const ProductContext = createContext({});
export const ProductWrapper = (props) => {

  const [products, setProducts] = useState([]);
  //get data from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProductApi();

        setProducts(data);
        localStorage.setItem('products', JSON.stringify(data));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);
  ///check if there is data in localStorages
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
  //save data to localStorages
  useEffect(() => {
    if (products) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  
  return (
    <ProductContext.Provider
      value={{ products, setProducts }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
