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