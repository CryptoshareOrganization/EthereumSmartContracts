import { useContractFunction } from "@usedapp/core"
import FRT from "../build/contracts/FruitShop.json"
import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"

export const Sendpurchase = () => {
    const { abi } = FRT

    const fruitContractAddress = "0xC2bD0b3c8a2095E1d5741F7759982e3Ed995A758"


    const fruitInterface = new utils.Interface(abi)
    const fruitContract = new Contract(fruitContractAddress, fruitInterface)

    const { send: buyAppleFruit, state: applePurchaseState } =
        useContractFunction(fruitContract, "buyApple", { transactionName: "fruitpurchase" })

    const sendAppleAmount = (fruitAmount: number) => {
        const fruitCost = fruitAmount * 0.02
        const asString = fruitCost.toString()
        buyAppleFruit(fruitAmount, { value: utils.parseEther(asString) })
    }

    const { send: buyBananaFruit, state: bananaPurchaseState } =
        useContractFunction(fruitContract, "buyBanana", { transactionName: "fruitpurchase" })

    const sendBananaAmount = (fruitAmount: number) => {
        const fruitCost = fruitAmount * 0.03
        const asString = fruitCost.toString()
        buyBananaFruit(fruitAmount, { value: utils.parseEther(asString) })
    }

    const { send: buyStrawberryFruit, state: strawberryPurchaseState } =
        useContractFunction(fruitContract, "buyStrawberry", { transactionName: "fruitpurchase" })

    const sendStrawberryAmount = (fruitAmount: number) => {
        const fruitCost = fruitAmount * 0.04
        const asString = fruitCost.toString()
        buyStrawberryFruit(fruitAmount, { value: utils.parseEther(asString) })
    }

    const { send: buyMangoFruit, state: mangoPurchaseState } =
        useContractFunction(fruitContract, "buyMango", { transactionName: "fruitpurchase" })

    const sendMangoAmount = (fruitAmount: number) => {
        const fruitCost = fruitAmount * 0.05
        const asString = fruitCost.toString()
        buyMangoFruit(fruitAmount, { value: utils.parseEther(asString) })
    }

    return { sendAppleAmount, applePurchaseState, sendBananaAmount, bananaPurchaseState, sendStrawberryAmount, strawberryPurchaseState, sendMangoAmount, mangoPurchaseState }
}