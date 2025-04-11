import React, { useState } from 'react';
import Header from '../components/Header';
import PriceChecker from '../components/PriceChecker';

const Home = () => {
  const [lastItemCode, setLastItemCode] = useState('');

  return (
    <div>
      <Header itemCode={lastItemCode} />
      <PriceChecker onSearch={(code) => setLastItemCode(code)} />
    </div>
  );
};

export default Home;