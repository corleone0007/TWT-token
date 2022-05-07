require("@nomiclabs/hardhat-waffle");
require("dotenv").config({path: ".env"});

//Lets get access to our secret keys in the .env file
//process.env is the way to get access to the .env file in hardhat
const ALCHEMY_URL = process.env.ALCHEMY_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

//Lets add our networ and point it to mumbai
module.exports = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: ALCHEMY_URL,
      accounts: [PRIVATE_KEY]   //The accounst is an array
    }
  }
};
