# Auction Smart Contract

This project implements a simple token-based auction system using Solidity (`^0.4.17`). The contract allows users to register, bid on items using tokens, and lets the owner reveal the winners.

> ⚠ **Note:** This contract was created **for practice purposes** as part of the *Smart Contracts* course on **Coursera**. It is not intended for production use.

## Overview

- **Language:** Solidity `^0.4.17`
- **Auction type:** Token-based blind auction
- **Participants:** 4 bidders, 3 items
- **Owner:** The contract deployer is the auction beneficiary

## Features

- Bidders register and are assigned 5 tokens each  
- Bidders can distribute their tokens across 3 items  
- Owner can reveal winners after bidding concludes  
- Random selection of winner among bids for each item  
- Public getter to view bidder details  

## How It Works

### Registration

- Each bidder calls `register()` to sign up.
- They are assigned a `personId`, their address is recorded, and they receive 5 tokens.

### Bidding

- Bidders call `bid(_itemId, _count)` to place tokens on an item.
- Rules:
  - Cannot bid more tokens than they have remaining.
  - Cannot bid for non-existent items (IDs must be 0, 1, or 2).
  - Tokens are deducted when the bid is placed.

### Winner Selection

- Only the contract owner (`beneficiary`) can call `revealWinners()`.
- For each item, if bids exist, a winner is randomly selected using block data.
- Winners are stored in a `winners` array corresponding to the item ID.

## Contract Details

- `register()` — Register as a bidder (max 4 bidders).
- `bid(uint _itemId, uint _count)` — Place bids using tokens.
- `revealWinners()` — (Owner only) Reveal winners for all items.
- `getPersonDetails(uint id)` — Public getter to return bidder info: `(remainingTokens, personId, address)`.
