import React from 'react';
import {Fruitpayment} from "./Components/Fruit"
import {Config, DAppProvider, Goerli} from "@usedapp/core"



function App() {
  const config: Config = {
    readOnlyChainId: Goerli.chainId,
    readOnlyUrls: {
      [Goerli.chainId]: 'https://eth-goerli.g.alchemy.com/v2/lTEJhXROfxDAg885-GyhYN0shhBS6hEu',
    },
    networks: [Goerli],
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

