/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
const delayMS = 1000 //sometimes xDAI needs a 6000ms break lol 😅

const tokens = require('./tokens')

const main = async () => {

	// ADDRESS TO MINT TO:
	// const toAddress = "0xb40467523e737edC69d0f783C1D86bd27EEC2759" //rinkby
	const toAddress = "0x053BFA7ff001a4c2bCC7B990d4dE6ec0e4C39366" //local host

	console.log("\n\n 🎫 Minting to " + toAddress + "...\n");

	const AlphaTokens = await ethers.getContractAt('AlphaTokens', fs.readFileSync("./artifacts/AlphaTokens.address").toString())


	for (let i = 1; i <= 26; i++) {
		const token = tokens[i - 1]

		console.log("Uploading", token.name, "...")
		const uploaded = await ipfs.add(JSON.stringify(token))

		const address = i === 24 ? AlphaTokens.address : toAddress;
		console.log("Minting", token.name, "with IPFS hash (" + uploaded.path + ") to: ", address)
		await AlphaTokens.mintItem(address, uploaded.path, { gasLimit: 400000 })

		await sleep(delayMS)
	}

	console.log("Transferring Ownership of AlphaTokens to " + toAddress + "...")

	await AlphaTokens.transferOwnership(toAddress)

	await sleep(delayMS)



	// const godzilla = {
	// 	"description": "Raaaar!",
	// 	"external_url": "https://austingriffith.com/portfolio/paintings/",// <-- this can link to a page for the specific file too
	// 	"image": "https://austingriffith.com/images/paintings/godzilla.jpg",
	// 	"name": "Godzilla",
	// 	"attributes": [
	// 		{
	// 			"trait_type": "BackgroundColor",
	// 			"value": "orange"
	// 		},
	// 		{
	// 			"trait_type": "Eyes",
	// 			"value": "googly"
	// 		},
	// 		{
	// 			"trait_type": "Stamina",
	// 			"value": 99
	// 		}
	// 	]
	// }
	// console.log("Uploading godzilla...")
	// const uploadedgodzilla = await ipfs.add(JSON.stringify(godzilla))

	// console.log("Minting godzilla with IPFS hash (" + uploadedgodzilla.path + ")")
	// await AlphaTokens.mintItem(AlphaTokens.address, uploadedgodzilla.path, { gasLimit: 400000 })

	// await sleep(delayMS)



	//const secondContract = await deploy("SecondContract")

	// const exampleToken = await deploy("ExampleToken")
	// const examplePriceOracle = await deploy("ExamplePriceOracle")
	// const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])



	/*
	//If you want to send value to an address from the deployer
	const deployerWallet = ethers.provider.getSigner()
	await deployerWallet.sendTransaction({
		to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
		value: ethers.utils.parseEther("0.001")
	})
	*/


	/*
	//If you want to send some ETH to a contract on deploy (make your constructor payable!)
	const yourContract = await deploy("YourContract", [], {
	value: ethers.utils.parseEther("0.05")
	});
	*/


	/*
	//If you want to link a library into your contract:
	// reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
	const yourContract = await deploy("YourContract", [], {}, {
	 LibraryName: **LibraryAddress**
	});
	*/

};

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
