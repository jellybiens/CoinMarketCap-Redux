import React from 'react';
import CoinMarketHeader from '../containers/coin-market-header';
import CoinMarketTable from '../containers/coin-market-table';

const App = () => (
  <div className="screen">
      <CoinMarketHeader />
      <CoinMarketTable />
  </div>
);

export default App;
