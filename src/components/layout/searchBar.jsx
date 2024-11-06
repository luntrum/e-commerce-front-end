import { AutoComplete } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const handleSearch = (value) => {
    const searchResults = onSearch(value);
    setOptions(
      searchResults.map((product) => ({
        value: product.name,
        id: product.product_id,
      })),
    );
  };
  const handleSelect = (value, options) => {
    navigate(`/products/${options.id}`);
  };
  return (
    <AutoComplete
      options={options}
      onSearch={handleSearch}
      onSelect={handleSelect}
      placeholder="Type what you need here"
      className="w-full"
    />
  );
};

export default SearchBar;
