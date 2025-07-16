# Solidity Smart Contract Suite

This repository contains a collection of three interconnected Solidity smart contracts that demonstrate fundamental concepts in smart contract development, including basic storage, inheritance, and factory patterns.

## 🔍 Overview

This smart contract suite includes:

- **SimpleStorage**: A foundational contract for storing numbers and managing a people registry
- **StorageExtra**: An inherited contract that modifies the storage behavior
- **StorageFactory**: A factory contract that creates and manages multiple SimpleStorage instances

## 📄 Contracts

### 🗃️ SimpleStorage

The core contract that provides basic storage functionality with person management.

#### Key Features:
- Stores a favorite number (`uint256 public favNumber`)
- Manages a registry of people with their favorite numbers
- Provides mapping for quick name-to-number lookups

#### Data Structures:
```
struct Person {
    uint256 favNumber;
    string name;
}
```

#### State Variables:
- `uint256 public favNumber` - The main stored number
- `mapping(string => uint256) public nameToFavNum` - Name to number mapping  
- `Person[] public people` - Dynamic array of Person structs

#### Functions:

| Function | Visibility | Description |
|----------|------------|-------------|
| `store(uint256 _favNumber)` | `public virtual` | Sets the favorite number |
| `retrieve()` | `public view` | Returns the current favorite number |
| `addPerson(string memory _name, uint256 _favNum)` | `public` | Adds a new person to the registry |

---

### ⚙️ StorageExtra

An extension of `SimpleStorage` that demonstrates contract inheritance and function overriding.

#### Inheritance:
```
contract StorageExtra is SimpleStorage
```

#### Modified Behavior:
- **Overrides** the `store()` function
- **Enhancement**: Adds 5 to any stored value automatically

#### Override Function:
```
function store(uint256 _favNum) public override {
    favNumber = _favNum + 5;
}
```

#### Example:
```
StorageExtra se = new StorageExtra();
se.store(10);  // Actually stores 15
uint256 result = se.retrieve(); // Returns 15
```

---

### 🏗️ StorageFactory

A factory contract that creates and manages multiple `SimpleStorage` contract instances.

#### Key Features:
- **Deploys** new `SimpleStorage` contracts dynamically
- **Tracks** all created contracts in an array
- **Interacts** with deployed contracts by index

#### State Variables:
```
SimpleStorage[] public SSArray;
```

#### Functions:

| Function | Visibility | Description |
|----------|------------|-------------|
| `createSimpleStorageContract()` | `public` | Deploys a new SimpleStorage contract |
| `sfStore(uint256 SSIndex, uint256 SSNumber)` | `public` | Stores a number in the specified contract |
| `sfGet(uint256 _simpleStorageIndex)` | `public view` | Retrieves a number from the specified contract |

---

## 💡 Usage Examples

### Basic SimpleStorage Usage

```
// Deploy the contract
SimpleStorage ss = new SimpleStorage();

// Store a favorite number
ss.store(42);

// Retrieve the stored number
uint256 favorite = ss.retrieve(); // Returns 42

// Add a person
ss.addPerson("Alice", 100);

// Check Alice's favorite number
uint256 aliceFav = ss.nameToFavNum("Alice"); // Returns 100
```

### StorageExtra with Override

```
// Deploy the enhanced contract
StorageExtra se = new StorageExtra();

// Store a number (automatically adds 5)
se.store(20);

// Retrieve the modified number
uint256 result = se.retrieve(); // Returns 25 (20 + 5)

// Add a person (inherited functionality)
se.addPerson("Bob", 50);
```

### StorageFactory for Multiple Contracts

```
// Deploy the factory
StorageFactory factory = new StorageFactory();

// Create first SimpleStorage contract
factory.createSimpleStorageContract();

// Create second SimpleStorage contract  
factory.createSimpleStorageContract();

// Store values in different contracts
factory.sfStore(0, 100); // Store 100 in first contract
factory.sfStore(1, 200); // Store 200 in second contract

// Retrieve values
uint256 firstValue = factory.sfGet(0);  // Returns 100
uint256 secondValue = factory.sfGet(1); // Returns 200
```

## 📚 Key Concepts Demonstrated

1. **Basic Storage**: Simple state variable management
2. **Structs and Arrays**: Complex data structure handling
3. **Mappings**: Key-value storage for efficient lookups
4. **Inheritance**: Contract extension and code reuse
5. **Function Overriding**: Modifying inherited behavior
6. **Factory Pattern**: Dynamic contract creation
7. **Inter-contract Communication**: Contract-to-contract calls

## 🔒 Security Considerations

- All functions use appropriate visibility modifiers
- State variables are properly declared as `public` where needed
- Virtual functions allow for safe inheritance
- Factory pattern prevents direct contract manipulation

## 📄 License

This project is licensed under the MIT License - see the individual contract files for details.

---
