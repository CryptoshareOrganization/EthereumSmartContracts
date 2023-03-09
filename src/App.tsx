import React from 'react';
import {Fruitpayment} from "./Components/Fruit"
import {Config, DAppProvider, Mumbai} from "@usedapp/core"



function App() {
  const config: Config = {
    readOnlyChainId: Mumbai.chainId,
    readOnlyUrls: {
      [Mumbai.chainId]: 'put your Infura or Alchemy Mumbai RPC URL here',
    },
    networks: [Mumbai],
    notifications: {
      expirationPeriod: 1000,
      checkInterval: 1000
    }
  }

  return (
    <DAppProvider config={config}>
      <Fruitpayment />
    </DAppProvider>
  );
}

export default App;

