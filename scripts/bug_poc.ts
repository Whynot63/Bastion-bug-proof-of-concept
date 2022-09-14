import { BigNumber } from "@ethersproject/bignumber";
import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CErc20, SwapFlashLoan } from "../typechain-types";

const cTokenPerToken = async (token: CErc20) => {
    const exchangeRate = await token.exchangeRateStored()
    const humanExchangeRate = exchangeRate.toNumber() / 1e16
    return 1 / humanExchangeRate;
}

const cTokenPerCToken = async (pool: SwapFlashLoan, token0: CErc20, token1: CErc20) => {
    const index0 = token0.address === "0xe5308dc623101508952948b141fD9eaBd3337D99" ? 0 : 1;
    const index1 = token1.address == "0x845E15A441CFC1871B7AC610b0E922019BaD9826" ? 1 : 0;

    const token0Decimals = (await token0.decimals()).toNumber();
    const token1Decimals = (await token1.decimals()).toNumber();
    const exchangeRate = await pool.calculateSwap(index0, index1, 10 ** token0Decimals)
    const humanExchangeRate = exchangeRate.toNumber() / 10 ** token1Decimals;
    return humanExchangeRate;
}


task("poc", "Bastion stable swap proof of concept")
    .setAction(async (taskArguments, hre: HardhatRuntimeEnvironment) => {
        const cUSDT = await hre.ethers.getContractAt("CErc20", "0x845E15A441CFC1871B7AC610b0E922019BaD9826");
        const cUSDC = await hre.ethers.getContractAt("CErc20", "0xe5308dc623101508952948b141fD9eaBd3337D99");
        const pool = await hre.ethers.getContractAt("SwapFlashLoan", "0x6287e912a9Ccd4D5874aE15d3c89556b2a05f080");

        console.log("Now:")
        console.log(`1 USDT  -> ${await cTokenPerToken(cUSDT)} cUSDT`);
        console.log(`1 USDC  -> ${await cTokenPerToken(cUSDC)} cUSDC`);
        console.log(`1 cUSDT -> ${await cTokenPerCToken(pool, cUSDC, cUSDT)} cUSDC`)

        await hre.network.provider.send("evm_increaseTime", [10 * 365 * 24 * 60 * 60])
        await (await cUSDT.accrueInterest()).wait();
        await (await cUSDC.accrueInterest()).wait();

        console.log("After some time")
        console.log(`1 USDT  -> ${await cTokenPerToken(cUSDT)} cUSDT`);
        console.log(`1 USDC  -> ${await cTokenPerToken(cUSDC)} cUSDC`);
        console.log(`1 cUSDT -> ${await cTokenPerCToken(pool, cUSDC, cUSDT)} cUSDC`)
    });
