
const thisIsMyWebsite = "https://ev3reth.com"

const frameTypes = {
	silver: "silver",
	bronze: "bronze",
	gold: "gold"
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getTokenIPFSuri = (tokenName) => `https://ipfs.io/ipfs/QmcuNKRSXHZQCN7L9K9UUQQF3z35xqnTjQpTaB7skroDeW/${ tokenName }-transparent.png`
const tokens = [
	{
		"description": "First letter in the Alphabet",
		"image": getTokenIPFSuri("A"),
		"external_url": thisIsMyWebsite,
		"name": "A",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.silver
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(80, 96)
			},
		]
	},
	{
		"description": "Second letter in the Alphabet",
		"image": getTokenIPFSuri("B"),
		"external_url": thisIsMyWebsite,
		"name": "B",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.bronze
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(50, 79)
			},
		]
	},
	{
		"description": "3rd letter in the Alphabet",
		"image": getTokenIPFSuri("C"),
		"external_url": thisIsMyWebsite,
		"name": "C",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.bronze
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(50, 79)
			},
		]
	},
	{
		"description": "I promise it's a D and not just a flipped C, well I guess its both...",
		"image": getTokenIPFSuri("D"),
		"external_url": thisIsMyWebsite,
		"name": "D",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.bronze
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(50, 79)
			},
		]
	},
	{
		"description": "~ E is for EV3RETH ~",
		"image": getTokenIPFSuri("E"),
		"external_url": thisIsMyWebsite,
		"name": "E",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.gold
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(97, 100)
			},
		]
	},
	{
		"description": "Number 6 baby!",
		"image": getTokenIPFSuri("F"),
		"external_url": thisIsMyWebsite,
		"name": "F",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.bronze
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(50, 79)
			},
		]
	},
	{
		"description": "#7: Holy number right here",
		"image": getTokenIPFSuri("G"),
		"external_url": thisIsMyWebsite,
		"name": "G",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.bronze
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(50, 79)
			},
		]
	},
	{
		"description": "8, thats twice as big as D",
		"image": getTokenIPFSuri("H"),
		"external_url": thisIsMyWebsite,
		"name": "H",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.bronze
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(50, 79)
			},
		]
	},
	{
		"description": "Nine times, its more than a line",
		"image": getTokenIPFSuri("I"),
		"external_url": thisIsMyWebsite,
		"name": "I",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.bronze
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(50, 79)
			},
		]
	},
	{
		"description": "Double digits!!!",
		"image": getTokenIPFSuri("J"),
		"external_url": thisIsMyWebsite,
		"name": "J",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.bronze
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(50, 79)
			},
		]
	},
	{
		"description": "Two ones",
		"image": getTokenIPFSuri("K"),
		"external_url": thisIsMyWebsite,
		"name": "K",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.silver
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(80, 96)
			},
		]
	},
	{
		"description": "Twelve, it's another holy one baby",
		"image": getTokenIPFSuri("L"),
		"external_url": thisIsMyWebsite,
		"name": "L",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.bronze
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(50, 79)
			},
		]
	},
	{
		"description": "#13, spooooooky ~",
		"image": getTokenIPFSuri("M"),
		"external_url": thisIsMyWebsite,
		"name": "M",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.silver
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(80, 96)
			},
		]
	},
	{
		"description": "Fourteen, that's 4 more than 10",
		"image": getTokenIPFSuri("N"),
		"external_url": thisIsMyWebsite,
		"name": "N",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.bronze
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(50, 79)
			},
		]
	},
	{
		"description": "#15",
		"image": getTokenIPFSuri("O"),
		"external_url": thisIsMyWebsite,
		"name": "O",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.bronze
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(50, 79)
			},
		]
	},
	{
		"description": "#16, I may be running out description writing steam here...",
		"image": getTokenIPFSuri("P"),
		"external_url": thisIsMyWebsite,
		"name": "P",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.bronze
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(50, 79)
			},
		]
	},
	{
		"description": "#17, def out steam",
		"image": getTokenIPFSuri("Q"),
		"external_url": thisIsMyWebsite,
		"name": "Q",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.silver
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(80, 96)
			},
		]
	},
	{
		"description": "Numba 18",
		"image": getTokenIPFSuri("R"),
		"external_url": thisIsMyWebsite,
		"name": "R",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.bronze
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(50, 79)
			},
		]
	},
	{
		"description": "#19, is that... is that a second wind?",
		"image": getTokenIPFSuri("S"),
		"external_url": thisIsMyWebsite,
		"name": "S",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.bronze
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(50, 79)
			},
		]
	},
	{
		"description": "20 double digits times two",
		"image": getTokenIPFSuri("T"),
		"external_url": thisIsMyWebsite,
		"name": "T",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.bronze
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(50, 79)
			},
		]
	},
	{
		"description": "21, it's drinking time!",
		"image": getTokenIPFSuri("U"),
		"external_url": thisIsMyWebsite,
		"name": "U",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.silver
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(80, 96)
			},
		]
	},
	{
		"description": "Double two baby",
		"image": getTokenIPFSuri("V"),
		"external_url": thisIsMyWebsite,
		"name": "V",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.silver
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(80, 96)
			},
		]
	},
	{
		"description": "Number 23, that double U",
		"image": getTokenIPFSuri("W"),
		"external_url": thisIsMyWebsite,
		"name": "W",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.silver
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(80, 96)
			},
		]
	},
	{
		"description": "One third of that porn rating",
		"image": getTokenIPFSuri("X"),
		"external_url": thisIsMyWebsite,
		"name": "X",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.gold
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(97, 100)
			},
		]
	},
	{
		"description": "Penultimate...",
		"image": getTokenIPFSuri("Y"),
		"external_url": thisIsMyWebsite,
		"name": "Y",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.gold
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(97, 100)
			},
		]
	},
	{
		"description": "Finality",
		"image": getTokenIPFSuri("Z"),
		"external_url": thisIsMyWebsite,
		"name": "Z",
		"attributes": [
			{
				"trait_type": "frame",
				"value": frameTypes.gold
			},
			{
				"trait_type": "hype",
				"value": getRndInteger(97, 100)
			},
		]
	},
]

module.exports = tokens