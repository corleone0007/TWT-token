//we import the hardhat runtime environment from the hardhat package that we installed
const hre = require("hardhat");

//In order to use await in our main function, we added async to the function
async function main() {
    //We use ethers form hre to call the getContractFactory and pass the exact name of our token
    const TWToken = await hre.ethers.getContractFactory("TWToken");
    //We now have the contract factory of out smart contract, we can now use it to deploy our contract
    //Our contract is expecting a cap value on deployment. 100000 eth was is send when deploying
    //ethers.utils.parseEther("100000.0") will be explained below
    const twtoken = await TWToken.deploy(ethers.utils.parseEther("100000.0"))

    //we can now wait for our contract to the deployed
    await twtoken.deployed();

    //Add this line so that we can see the contract address when we succesfully deploy our contract
    //We will use this address to import our token, so keep it somewhere
    console.log("TWToken deploy to ", twtoken.address);
}


//We call the main function which returns and observable
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1)
    })