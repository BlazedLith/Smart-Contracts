# FundMe Smart Contract

A decentralized crowdfunding smart contract built with Solidity that allows users to fund projects with ETH while enforcing a minimum USD threshold using Chainlink price feeds.

## Overview

The FundMe contract consists of two main components:
- **FundMe.sol**: Main crowdfunding contract
- **PriceConverter.sol**: Library for ETH/USD price conversion

## Features

- **Minimum Funding Threshold**: Enforces a $50 USD minimum contribution
- **Real-time Price Conversion**: Uses Chainlink oracles for accurate ETH/USD pricing
- **Owner-Only Withdrawals**: Only the contract owner can withdraw funds
- **Gas-Efficient Error Handling**: Uses custom errors instead of strings
- **Automatic Funding**: Supports both direct transfers and function calls
- **Funder Tracking**: Maintains records of all contributors and their amounts

## Contract Structure

### FundMe.sol
The main contract that handles:
- Accepting ETH contributions above the minimum threshold
- Tracking funders and their contribution amounts
- Owner-only fund withdrawals
- Fallback and receive functions for direct transfers

### PriceConverter.sol
A library that provides:
- ETH/USD price fetching from Chainlink oracles
- Conversion rate calculations
- Price feed interface integration

## 🔧 Technical Details

### Dependencies
- **Solidity**: ^0.8.8
- **Chainlink Contracts**: For price feed integration

### Key Variables
- `MINIMUM_USD`: Minimum contribution amount (50 USD)
- `i_owner`: Immutable owner address set at deployment
- `addressToAmountFunded`: Mapping of funder addresses to amounts
- `funders`: Array of all funder addresses

### Price Feed
- **Network**: Ethereum Sepolia Testnet
- **Address**: `0x694AA1769357215DE4FAC081bf1f309aDC325306`
- **Pair**: ETH/USD

## Security Considerations

1. **Reentrancy Protection**: The contract uses checks-effects-interactions pattern
2. **Access Control**: Critical functions are protected with `onlyOwner` modifier
3. **Integer Overflow**: Solidity 0.8.x has built-in overflow protection
4. **Price Feed Reliability**: Relies on Chainlink's decentralized oracle network

## Gas Optimization

- Uses `immutable` for owner address (saves gas on reads)
- Uses `constant` for minimum USD amount
- Custom errors instead of string messages
- Efficient withdrawal loop with proper cleanup

## Network Compatibility

Currently configured for:
- **Ethereum Sepolia Testnet**
- **Chainlink Price Feed**: ETH/USD

To deploy on other networks, update the price feed address in both contracts.

## License

This project is licensed under the MIT License - see the contract headers for details.
---

**Note**: This contract uses Chainlink price feeds for accurate ETH/USD conversion. Always ensure price feed addresses are correct for your target network before deployment.

**Disclaimer**: This code is for educational purposes. Always conduct thorough testing and security audits before using in production.
