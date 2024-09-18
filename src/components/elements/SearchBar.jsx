import { useState } from 'react';
import { Input } from 'antd';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const { Search } = Input;
  const handleSearchClick = () => {
    alert('Ой! не успел закончить :(');
  };

  return (
    <div style={{maxWidth: '550px', minWidth: '150px', margin: "0 auto", paddingBottom: "25px"}}>
      <Search
        placeholder="Введите название объявления..."
        onSearch={handleSearchClick}
        onChange={(e) => setInputValue(e.target.value)}
        enterButton
      />
    </div>
  );
};

export default SearchBar;
