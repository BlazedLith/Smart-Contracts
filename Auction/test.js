let Auction = artifacts.require("./Auction.sol");

let auctionInstance;

contract('AuctionContract', function (accounts) {
  // Test case 1
  it("Contract deployment", function() {
    return Auction.deployed().then(function (instance) {
      auctionInstance = instance;
      assert(auctionInstance !== undefined, 'Auction contract should be defined');
    });
  });

  // Sample Test Case
  it("Should set bidders", function() {
    return auctionInstance.register({from:accounts[1]}).then(function(result) {
      return auctionInstance.getPersonDetails(0);
    }).then(function(result) {
      assert.equal(result[2], accounts[1], 'bidder address set');
    })
  });

 // Test: Bid more than remaining tokens
  it("Should NOT allow to bid more than remaining tokens", function() {
    return auctionInstance.bid(0, 6, {from: accounts[1]})
    .then(function (result) {
      throw("Failed to check remaining tokens less than count");
    }).catch(function (e) {
      var a = e.toString();
      if(e === "Failed to check remaining tokens less than count") {
        assert(false);
      } else {
        assert(true);
      }
    });
  });

// Test: Only owner can reveal winners
  it("Should NOT allow non owner to reveal winners", function() {
    return auctionInstance.revealWinners({from: accounts[1]})
    .then(function (instance) {
      throw("Failed to check owner in reveal winners");
    }).catch(function (e) {
      if(e === "Failed to check owner in reveal winners") {
        assert(false);
      } else {
        assert(true);
      }
    });
  });

// Test: Set winners properly
  it("Should set winners", function() {
    return auctionInstance.register({from: accounts[2]})      // TASK 7
    .then(function(result) {
      return auctionInstance.register({from: accounts[3]});   // TASK 8
    }).then(function() {
      return auctionInstance.register({from: accounts[4]});   // TASK 9
    }).then(function() {
      return auctionInstance.bid(0, 5, {from: accounts[2]});  // TASK 10
    }).then(function() {
      return auctionInstance.bid(1, 5, {from: accounts[3]});  // TASK 11
    }).then(function() {
      return auctionInstance.bid(2, 5, {from: accounts[4]});  // TASK 12
    }).then(function() {
      return auctionInstance.revealWinners({from: accounts[0]});  // TASK 13
    }).then(function() {
      return auctionInstance.winners(0, {from: accounts[0]});     // TASK 14
    }).then(function(result) {
      assert.notEqual(result, '0x0000000000000000000000000000000000000000', 'There should be a winner for item 0');  // TASK 15
      return auctionInstance.winners(1, {from: accounts[0]});     // TASK 16
    }).then(function(result) {
      assert.notEqual(result, '0x0000000000000000000000000000000000000000', 'There should be a winner for item 1');  // TASK 17
      return auctionInstance.winners(2, {from: accounts[3]});     // TASK 18
    }).then(function(result) {
      assert.notEqual(result, '0x0000000000000000000000000000000000000000', 'There should be a winner for item 2');  // TASK 19
    });
  });
});