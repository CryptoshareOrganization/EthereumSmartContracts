# Ethereum Smart Contract Fruit Shop Model

For Deployment AWS EC2 Instance & NGnix

Video Demonstration: https://www.loom.com/share/ead60f7f662d4b18bcb93889b9c5fd6f

Deployment: https://cryptoshareorganization.github.io/EthereumSmartContracts/

------
This project is a fruit shop model built on the Ethereum ecosystem. It's a full-stack app with a front-end and a smart contract backend. 
The front-end is built with:
1. Material UI
2. Usedapp Framework - To connect with the smart Contract

The backend is built with:
1. Solidity
2. Deployed to Ethereum Goerli Testnet

Deployed smart contract link: https://goerli.etherscan.io/address/0x28b1481aA1fa2dbf887eF560Db9CB2007746D523 


## How it Works
The app works by allowing users to purchase fruits with Ethereum. To use the app, the user has to log in with either metamask or WalletConnect. Once logged in, the next steps are as follows:
1. Choose the fruit.
2. Choose the quantity.
3. Make the purchase.
4, Approve the transaction on the wallet.

![shop](https://user-images.githubusercontent.com/60107787/223988531-69d819ce-800a-4976-a62d-47687efa9585.jpg)


Once a transaction is made, the details of the pruchase is encoded and stored on the blockchain. The technology behind the encoding and storing of transaction details is Ethereum events. 

Ethereum events are emitted once an event variable is set in the code and programmed to emit once a function has been called and the transaction succesfully completed.

Setting an event variable
```
 // Events to notify when a fruit is sold
    event FruitSold(address buyer, uint256 quantity, uint256 price, string fruit);
```

Example of emitting an event variable once a function is executed
```
 emit FruitSold(msg.sender, quantity, msg.value, "apple");
```

The details encoded on the blockchain include:
1. Buyer address.
2. Quantity of fruit bought.
3. Price of fruit.
4. Name of the fruit.

![events](https://user-images.githubusercontent.com/60107787/223988116-d3ba9c39-e779-4099-b028-637ad63178c8.jpg)

## Challenges
During testing, I had problems testing with the Goerli testnet. The gas fees were too high upto and I couldn't find enough testnet eth to do transactions as most testnets only give small amounts up to 0.1 ETH and requesting for more testnet funds is restricted to one per day via IP address tracking. Luckily other EVM testnets are well maintined and efficient and I managed test on Polygon in the meantime. I later reduced the price of the fruits to account for the high Goerli fees so as to deploy on Ethereum Goerli.
