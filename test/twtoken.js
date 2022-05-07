const {expect} = require("chai");
const {ethers} = require("hardhat");

//To start writing the test, we wrap it in a describe
//We will be using ES6 syntax to declare a function
describe("TWToken contract", () => {
    //we decalre a global variable that will hold the contractFactory of our token
    let twtoken = null;
    //a beforeEach is a function that runs all the time before each test
    beforeEach(async () => {
        // deploy our contract like we did above
        const TWToken = await ethers.getContractFactory("TWToken");
        //we use the global varaible declares above to hold our deployed contract
        //so we can use it out of beforeEach
        twtoken = await TWToken.deploy(ethers.utils.parseEther("100000.0"));
        await twtoken.deployed();
    });

    //A test can have a describe and several 'it' in it
    describe("TWToken", () => {
        //Lets check if when our contract was deployed, 10,000 eth was send to the owner of the contract
        //Hardhat provide us with free accounts that we can use, and the first account is the owner of the contract
        it("Owner of contract should have 10,000 eth", async () => {
            //let get all the free accounts by using getSigners() an ethers.js function. You can look it up on ethers doc
            const accounts =  await ethers.getSigners();
            //we sent 10,000 eth to the onwer so let's check if the balanceof the account = 10,000
            //If you look at REMIX, when deployed our contract, there is a balaceOf function that takes and address
            //this will return the balance of the given address

            //use the deployed contract to call the balanceOf function and pass the first account address to it
            const ownersBalance = await twtoken.balanceOf(accounts[0].address);
            //expect to see if it eqauls 10,000
            //balanceOf returns a wei, so we use formatEther to convert it to eth
            expect(ethers.utils.formatEther(ownersBalance)).to.equal("10000.0");
        });

        //Lets check if our deploy contract has a market cap of 100,000 eth
        it("Should have market cap of 100,000 eth", async () => {
            //call the cap function from our smart contract which returns a wei
            const capValue = await twtoken.cap();
            expect(ethers.utils.formatEther(capValue)).to.equal("100000.0");
        });

        //Lets test our airdrop function
        it("Should send an airdrop of 90,000eth", async () => {
            const accounts = await ethers.getSigners();
            await twtoken.issueAirDrop([accounts[1].address]);
            //get the balance of the account and check if it equals 90,000 eth
            var balance = await twtoken.balanceOf(accounts[1].address);
            expect(ethers.utils.formatEther(balance)).to.equal("90000.0");
        });

        //Lets try to call the airdrop function the second time, it shoudl fail
        it("Should fail when more than cap value", async () => {
            const accounts = await ethers.getSigners();
            //calling it the first time will pass. Each test in a new instance and not related to the old one
            await twtoken.issueAirDrop([accounts[1].address]);
            //call it the second time
            //On Remix when we tried to do this we had an error, go and copy the exact error
            await expect(twtoken.issueAirDrop([accounts[1].address])).to.be.revertedWith("ERC20Capped: cap exceeded");
            //to.be.revertedWith() is one of the ways hardhat handles errors
        });

        //Lets test the onlyOwner role. It should fail when a different account tries to call issueAirDrop
        it("Should not allow others to call the function", async () => {
            //lets get accounts and use the a different account from the first which is the owner
            const accounts = await ethers.getSigners();
            //We use the first account as owner to issue an air drop to account 2
            await expect(twtoken.connect(accounts[1]).issueAirDrop([accounts[2].address])).to.be.revertedWith("Ownable: caller is not the owner")
        })
    })
})