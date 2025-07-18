# FundMe Smart Contract

A decentralized crowdfunding smart contract built with Solidity that allows users to fund projects with ETH while enforcing a minimum USD threshold using Chainlink price feeds.

## 📋 Overview

The FundMe contract consists of two main components:
- **FundMe.sol**: Main crowdfunding contract
- **PriceConverter.sol**: Library for ETH/USD price conversion

## 🚀 Features

- **Minimum Funding Threshold**: Enforces a $50 USD minimum contribution
- **Real-time Price Conversion**: Uses Chainlink oracles for accurate ETH/USD pricing
- **Owner-Only Withdrawals**: Only the contract owner can withdraw funds
- **Gas-Efficient Error Handling**: Uses custom errors instead of strings
- **Automatic Funding**: Supports both direct transfers and function calls
- **Funder Tracking**: Maintains records of all contributors and their amounts

## 📁 Contract Structure

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
- **OpenZeppelin**: (Recommended for additional security features)

### Key Variables
- `MINIMUM_USD`: Minimum contribution amount (50 USD)
- `i_owner`: Immutable owner address set at deployment
- `addressToAmountFunded`: Mapping of funder addresses to amounts
- `funders`: Array of all funder addresses

### Price Feed
- **Network**: Ethereum Sepolia Testnet
- **Address**: `0x694AA1769357215DE4FAC081bf1f309aDC325306`
- **Pair**: ETH/USD

## 🛠️ Installation & Deployment

### Prerequisites
```bash
npm install @chainlink/contracts
```

### Deployment Steps
1. Compile the contracts using your preferred framework (Hardhat, Foundry, etc.)
2. Deploy to your target network
3. Verify the contract on Etherscan (recommended)

### Example Deployment Script (Hardhat)
```javascript
const { ethers } = require("hardhat");

async function main() {
    const FundMe = await ethers.getContractFactory("FundMe");
    const fundMe = await FundMe.deploy();
    await fundMe.deployed();
    console.log("FundMe deployed to:", fundMe.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

## 📖 Usage

### Funding the Contract
```javascript
// Send ETH directly to the contract
await fundMe.fund({ value: ethers.utils.parseEther("0.1") });

// Or send ETH directly to the contract address (triggers receive/fallback)
await signer.sendTransaction({
    to: fundMe.address,
    value: ethers.utils.parseEther("0.1")
});
```

### Withdrawing Funds (Owner Only)
```javascript
await fundMe.withdraw();
```

### Checking Contract State
```javascript
// Get current ETH/USD price
const price = await fundMe.getVersion();

// Check how much a specific address funded
const amount = await fundMe.addressToAmountFunded(address);

// Get all funders
const fundersArray = await fundMe.getFunders();
```

## ⚠️ Security Considerations

1. **Reentrancy Protection**: The contract uses checks-effects-interactions pattern
2. **Access Control**: Critical functions are protected with `onlyOwner` modifier
3. **Integer Overflow**: Solidity 0.8.x has built-in overflow protection
4. **Price Feed Reliability**: Relies on Chainlink's decentralized oracle network

## 🧪 Testing

### Test Cases to Consider
- [ ] Funding with amounts below minimum threshold
- [ ] Funding with amounts above minimum threshold
- [ ] Withdrawal by owner
- [ ] Withdrawal by non-owner (should fail)
- [ ] Multiple funders scenario
- [ ] Price feed accuracy
- [ ] Fallback and receive function testing

### Sample Test (Hardhat)
```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FundMe", function () {
    it("Should fail if funding amount is below minimum", async function () {
        const FundMe = await ethers.getContractFactory("FundMe");
        const fundMe = await FundMe.deploy();
        
        await expect(
            fundMe.fund({ value: ethers.utils.parseEther("0.001") })
        ).to.be.revertedWith("You need to spend more ETH!");
    });
});
```

## 📊 Gas Optimization

- Uses `immutable` for owner address (saves gas on reads)
- Uses `constant` for minimum USD amount
- Custom errors instead of string messages
- Efficient withdrawal loop with proper cleanup

## 🌐 Network Compatibility

Currently configured for:
- **Ethereum Sepolia Testnet**
- **Chainlink Price Feed**: ETH/USD

To deploy on other networks, update the price feed address in both contracts.

## 🔄 Upgrade Considerations

This contract is not upgradeable by design. For upgradeable versions, consider:
- Implementing proxy patterns (OpenZeppelin's upgradeable contracts)
- Using Diamond Standard (EIP-2535)
- Planning for data migration strategies

## 📄 License

This project is licensed under the MIT License - see the contract headers for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions or issues:
- Create an issue in this repository
- Review the Chainlink documentation for price feed updates
- Check Solidity documentation for language updates

## 📈 Future Enhancements

- [ ] Multi-token support
- [ ] Tiered funding levels
- [ ] Funding deadlines
- [ ] Refund mechanisms
- [ ] Governance features
- [ ] Integration with DeFi protocols

---

**Note**: This contract uses Chainlink price feeds for accurate ETH/USD conversion. Always ensure price feed addresses are correct for your target network before deployment.

**⚠️ Disclaimer**: This code is for educational purposes. Always conduct thorough testing and security audits before using in production.