Upd: Submited at http://immunefi. Anwer from Bastion team:
>Impermanent loss is a well known risk when providing liquidity for AMMs. Liquidity providers are compensated with liquidity mining rewards and take a share of the fees for that risk. And given how slow the cToken exchange rate changes, we think it is enough to mitigate any losses and make it profitable to provide liquidity for the stableswap.



# Bastion bug proof of concept for immunefi

Usage:
```
npm i
npx hardhat compile
npx hardhat poc
```

Example of output
```
Now:
1 USDT  -> 4.979033976509814 cUSDT
1 USDC  -> 4.9897794253268435 cUSDC
1 cUSDT -> 1.00182093 cUSDC
After some time
1 USDT  -> 4.913815762863975 cUSDT
1 USDC  -> 4.975361165224322 cUSDC
1 cUSDT -> 1.00182093 cUSDC
```
