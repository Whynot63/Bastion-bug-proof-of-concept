// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract SwapFlashLoan {
    function calculateSwap(
        uint8 tokenIndexFrom,
        uint8 tokenIndexTo,
        uint256 dx
    ) external view virtual returns (uint256) {}
}

contract CErc20 {
    function exchangeRateStored() public view returns (uint) {}
    function accrueInterest() public returns (uint) {}
    function decimals() public view returns (uint) {}
}