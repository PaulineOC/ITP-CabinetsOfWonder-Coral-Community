/* CORALS */

const CORAL_SPECIES = {
  FUNGIA_SCUTARIA: "FUNGIA_SCUTARIA",
  ACROPORA_LORIPES: "ACROPORA_LORIPES",
  ACROPORA_MILLEPORA: "ACROPORA_MILLEPORA"
}; 

const CORAL_FILENAMES = {
	FUNGIA_SCUTARIA: 'Assets/T2-FS.png',
	ACROPORA_LORIPES: 'Assets/T2-AL.png',
	ACROPORA_MILLEPORA: 'Assets/T2-AM.png',
};

const CORAL_SIZE_SCALE_FACTOR = 1.5;


const CORAL_DIMENSIONS = {
	FUNGIA_SCUTARIA: {
		top: (386/1344),
		left: (457/2388),
		height: (100/1344),
		width: (100/1344),
	},
	ACROPORA_LORIPES: {
		top: (386/1344),
		left: (457/2388),
		height: (150/1344),
		width: (100/1344),

	},
	ACROPORA_MILLEPORA: {
		top: (748/1344),
		left: (1508/2388),
		height: (125*CORAL_SIZE_SCALE_FACTOR/1344),
		width: (170.8*CORAL_SIZE_SCALE_FACTOR/2388),

		// height: (125/1344),
		// width: (170.8/1344),
	},
};


const COLORS = {
	RED: "RED",
	ORANGE: "ORANGE",
	YELLOW: "YELLOW",
	GREEN: "GREEN",
	CYAN: "CYAN",
	BLUE: "BLUE",
	PURPLE: "PURPLE",
	PINK: "PINK"
};


/* ROCKS */
const ROCK_TYPES = {
	LEFT: 'LEFT',
	RIGHT: 'RIGHT',
	BACK: 'BACK',
}

const ROCK_COORDINATES = {
	BACK: {
		top: (386/1344),
		left: (457/2388),
		height: (928/1344),
	},
	LEFT: {
		top: (778/1344),
		left: (149/2388),
		height: (566/1344)
	},
	RIGHT: {
		top: (748/1344),
		left: (1508/2388),
		height: (566/1344)
	},
};

const ROCK_SHELF_COORDINATES = {
	LEFT_LEFT: {
		left: (168/2388),
		endX: (441/2388),
		top: (943/1344),
		endY: (1050/1344), //adjusted height
	},
	LEFT_RIGHT: {
		left: (596/2388),
		endX: (953/2388),
		top: (935/1344),
		endY: (1030/1344), //adjusted height
	},
	LEFT_BACK: {
		left: (350/2388),
		endX: (649/2388),
		top: (875/1344), //adjusted start
		endY: (930/1344), //adjusted height
	},
	RIGHT_LEFT: {
		left: (1532/2388),
		endX: (1889/2388),
		top: (935/1344),
		endY: (995/1344), //adjusted height
	},
	RIGHT_RIGHT: {
		left: (1950/2388),
		endX: (2200/2388),
		top: (950/1344),
		endY: (1000/1344), //adjusted height
	},
	RIGHT_BACK: {
		left: (350/2388),
		endX: (649/2388),
		top: (875/1344), //adjusted start
		endY: (930/1344), //adjusted height
	},
	BACK_LEFT: {
		left: (487/2388),
		endX: (844/2388),
		top: (650/1344), //adjusted start
		endY: (750/1344), //adjusted height
	},
	BACK_RIGHT: {
		left: (1120/2388),
		endX: (1620/2388),
		top: (625/1344), //adjusted start
		endY: (740/1344), //adjusted height
	},
	BACK_BACK: {
		left: (775/2388), //adjusted start
		endX: (1247/2388),
		top: (480/1344), //adjusted start
		endY: (620/1344), //adjusted height
	},
};

const ROCK_SHELF_CORALS = {
	LEFT_LEFT: [],
	LEFT_RIGHT: [],
	LEFT_BACK: [],
	RIGHT_LEFT: [],
	RIGHT_RIGHT: [],
	RIGHT_BACK: [],
	BACK_LEFT: [],
	BACK_RIGHT: [],
	BACK_BACK: [],
};


/* MISC */

const NUM_TRIES = 5;
const FONT_SIZE = 42;
const NAME_TO_IMG_GAP_PX = -20;

const TEST_NAMES = [
	`Emma`,
	`Charlotte`,
	`Amelia`,
	`Ava`,
	`Sophia`,
	`Isabella`,
	`Mia`,
	`Evelyn`,
	`Harper`,
	`Kai`,
	`Jayden`,
	`Ezra`,
	`Luca`,
	`Rowan`,
	`Finn`,
	`Zion`,
	`Remi`,
	`Ari`,
	`Elliot`,
	`Arthur`,
	`Emerson`,
	'Tammy',
	'Danielle',
	'Tommy',
	'Bob',
	`Derek`,
	'John',
	'Joshua',
	'Herbert',
	'Emile',
	'Bill',
	'Richard'
];

const MQTT_TOPICS = {
	CUSTOMIZER : 'CUSTOMIZER',
	SPAWN_CORAL: `SPAWN_CORAL`,
	PREVENT_TIMEOUT: `PREVENT_TIMEOUT`, 
};