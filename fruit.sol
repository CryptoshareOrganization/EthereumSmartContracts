// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract FruitShop {
    // Define the prices of each fruit
    uint256 public applePrice;
    uint256 public bananaPrice;
    uint256 public strawberryPrice;
    uint256 public mangoPrice;

    constructor(uint256 appleCost, uint256 bananaCost, uint256 strawberryCost, uint256 mangoCost) {
        setCost(appleCost, bananaCost, strawberryCost, mangoCost);
    }

    // Events to notify when a fruit is sold
    event FruitSold(address buyer, uint256 quantity, uint256 price, string fruit);

    // Functions to buy each fruit
    function buyApple(uint256 quantity) public payable {
       require(msg.value > 0 && msg.value >= applePrice * quantity, "Insufficient Funds");
        emit FruitSold(msg.sender, quantity, msg.value, "apple");
    }

    function buyBanana(uint256 quantity) public payable {
       require(msg.value > 0 && msg.value >= bananaPrice * quantity, "Insufficient Funds");
        emit FruitSold(msg.sender, quantity, msg.value, "banana");
    }

    function buyStrawberry(uint256 quantity) public payable {
       require(msg.value > 0 && msg.value >= strawberryPrice * quantity, "Insufficient Funds");
        emit FruitSold(msg.sender, quantity, msg.value, "strawberry");
    }

    function buyMango(uint256 quantity) public payable {
       require(msg.value > 0 && msg.value >= mangoPrice * quantity, "Insufficient Funds");
        emit FruitSold(msg.sender, quantity, msg.value, "mango");
    }

    function setCost(uint256 appleCost, uint256 bananaCost, uint256 strawberryCost, uint256 mangoCost) public {
        applePrice = appleCost;
        bananaPrice = bananaCost;
        strawberryPrice = strawberryCost;
        mangoPrice = mangoCost;
    }

}
