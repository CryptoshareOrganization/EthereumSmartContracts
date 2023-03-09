import { useContractFunction } from "@usedapp/core"
import FRT from "../build/contracts/FruitShop.json"
import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"

export const Sendpurchase = () => {
    const { abi } = FRT

    const fruitContractAddress = "0x28b1481aA1fa2dbf887eF560Db9CB2007746D523"


    const fruitInterface = new utils.Interface(abi)
    const fruitContract = new Contract(fruitContractAddress, fruitInterface)

    const { send: buyAppleFruit, state: applePurchaseState } =
        useContractFunction(fruitContract, "buyApple", { transactionName: "fruitpurchase" })

    const sendAppleAmount = (fruitAmount: number) => {
        const fruitCost = fruitAmount * 0.0002
        const asString = fruitCost.toString()
        buyAppleFruit(fruitAmount, { value: utils.parseEther(asString) })
    }

    const { send: buyBananaFruit, state: bananaPurchaseState } =
        useContractFunction(fruitContract, "buyBanana", { transactionName: "fruitpurchase" })

    const sendBananaAmount = (fruitAmount: number) => {
        const fruitCost = fruitAmount * 0.0003
        const asString = fruitCost.toString()
        buyBananaFruit(fruitAmount, { value: utils.parseEther(asString) })
    }

    const { send: buyStrawberryFruit, state: strawberryPurchaseState } =
        useContractFunction(fruitContract, "buyStrawberry", { transactionName: "fruitpurchase" })

    const sendStrawberryAmount = (fruitAmount: number) => {
        const fruitCost = fruitAmount * 0.0004
        const asString = fruitCost.toString()
        buyStrawberryFruit(fruitAmount, { value: utils.parseEther(asString) })
    }

    const { send: buyMangoFruit, state: mangoPurchaseState } =
        useContractFunction(fruitContract, "buyMango", { transactionName: "fruitpurchase" })

    const sendMangoAmount = (fruitAmount: number) => {
        const fruitCost = fruitAmount * 0.0005
        const asString = fruitCost.toString()
        buyMangoFruit(fruitAmount, { value: utils.parseEther(asString) })
    }

    return { sendAppleAmount, applePurchaseState, sendBananaAmount, bananaPurchaseState, sendStrawberryAmount, strawberryPurchaseState, sendMangoAmount, mangoPurchaseState }
}