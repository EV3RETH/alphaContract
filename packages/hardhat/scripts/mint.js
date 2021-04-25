/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
const delayMS = 1000 //sometimes xDAI needs a 6000ms break lol 😅

const main = async () => {

	// ADDRESS TO MINT TO:
	const toAddress = "0xb40467523e737edC69d0f783C1D86bd27EEC2759"

	console.log("\n\n 🎫 Minting to " + toAddress + "...\n");

	const AlphaTokens = await ethers.getContractAt('AlphaTokens', fs.readFileSync("./artifacts/AlphaTokens.address").toString())
	const godzilla = {
		"description": "Raaaar!",
		"external_url": "https://austingriffith.com/portfolio/paintings/",// <-- this can link to a page for the specific file too
		"image": "https://austingriffith.com/images/paintings/godzilla.jpg",
		"name": "Godzilla",
		"attributes": [
			{
				"trait_type": "BackgroundColor",
				"value": "orange"
			},
			{
				"trait_type": "Eyes",
				"value": "googly"
			},
			{
				"trait_type": "Stamina",
				"value": 99
			}
		]
	}
	console.log("Uploading godzilla...")
	const uploadedgodzilla = await ipfs.add(JSON.stringify(godzilla))

	console.log("Minting godzilla with IPFS hash (" + uploadedgodzilla.path + ")")
	await AlphaTokens.mintItem(AlphaTokens.address, uploadedgodzilla.path, { gasLimit: 400000 })

	await sleep(delayMS)


	const A = {
		"description": "A is for Affability",
		"image": "https://ipfs.io/ipfs/Qmb3WwtmSw4q4omCEtLptNdJUuz6WDQ3DjNPuLxHP4FCvT?filename=A.png",
		"name": "A",
	}
	console.log("Uploading A...")
	const uploadedA = await ipfs.add(JSON.stringify(A))

	console.log("Minting A with IPFS hash (" + uploadedA.path + ")")
	await AlphaTokens.mintItem(toAddress, uploadedA.path, { gasLimit: 400000 })


	await sleep(delayMS)


	const B = {
		"description": "B is for Bold",
		"image": "https://ipfs.io/ipfs/QmZNj2mwKh8eZEWbuJNwQiMtMPhG1fN29LMd5UzGPJmsFC?filename=B.png",
		"name": "B",
	}
	console.log("Uploading B...")
	const uploadedB = await ipfs.add(JSON.stringify(B));
	console.log("Minting B with IPFS hash (" + uploadedB.path + ")");
	await AlphaTokens.mintItem(toAddress, uploadedB.path, { gasLimit: 400000 })

	await sleep(delayMS)

	const C = {
		"description": "C is for Coooool",
		"image": "https://ipfs.io/ipfs/QmSCWjz3s4UfrQokQADgfv6az8MqUyxipQJPBvhAn7NSEh?filename=C.png",
		"name": "C",
	}
	console.log("Uploading C...")
	const uploadedC = await ipfs.add(JSON.stringify(C));
	console.log("Minting C with IPFS hash (" + uploadedB.path + ")");
	await AlphaTokens.mintItem(toAddress, uploadedC.path, { gasLimit: 400000 })

	await sleep(delayMS)


	const D = {
		"description": "D is for Duuude",
		"image": "	https://ipfs.io/ipfs/QmV3BGAUzkzy9zCvDmEcoH7W13a83Xhewy7DBTGCXFSqFz?filename=D.png",
		"name": "D",
	}
	console.log("Uploading D...")
	const uploadedD = await ipfs.add(JSON.stringify(D));
	console.log("Minting D with IPFS hash (" + uploadedB.path + ")");
	await AlphaTokens.mintItem(toAddress, uploadedD.path, { gasLimit: 400000 })

	await sleep(delayMS)



	console.log("Transferring Ownership of AlphaTokens to " + toAddress + "...")

	await AlphaTokens.transferOwnership(toAddress)

	await sleep(delayMS)

	/*


	console.log("Minting zebra...")
	await AlphaTokens.mintItem("0xD75b0609ed51307E13bae0F9394b5f63A7f8b6A1","zebra.jpg")

	*/


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
