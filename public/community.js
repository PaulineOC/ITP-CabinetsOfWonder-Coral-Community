/* MQTT */
let preventTimeoutTimer;

const main = document.getElementById('mainContainer');
const userCorals = [];

let newCoral;

/*P5.js */
let ctx;

/* WEB SERIAL */
const serial = new p5.WebSerial();
let portButton;


window.addEventListener('DOMContentLoaded', () => {
  resetBackground();
  console.log('DOM loaded, setting up MQTT');
  setupMQTT();
  window.userCorals = userCorals;
});

window.addEventListener("keyup", (event) => {
  //R
  if(event.keyCode === 82){
    console.log('Resetting background');
    resetBackground();
  }
  //ESC
  if(event.keyCode === 27 && preventTimeoutTimer){
    console.log('Aborting prevent timeout');
    clearInterval(preventTimeoutTimer);
  }
  //Space
  if (event.keyCode === 32) {
    console.log('Generating Random Coral');
    const randomSpecies = _.sample(Object.values(CORAL_SPECIES));
    const randomColor = _.sample(Object.values(COLORS));
    const randomName = _.sample(Object.values(TEST_NAMES));
    const toSpawn = {
      species: randomSpecies, 
      color: randomColor,
      name: randomName,
    };
    sendMqttMessage(toSpawn, MQTT_TOPICS['SPAWN_CORAL']);
    if(!client.isConnected){
      console.log('MQTT disconnected: manually adding');
      userCorals.push(new Coral(toSpawn.species, toSpawn.color, toSpawn.name));
    }
  }

  if(event.keyCode === 13){
    console.log('Spawning most recent coral');
    spawnCoral();
  }

  //Backspace 
  if(event.keyCode === 8){
    console.log('Clearing User Corals');
    userCorals = [];
  }
});

const placeItem = (ele, data) => {
  ele.style.top = `${data.top * window.innerHeight}px`;;
  ele.style.left = `${data.left * window.innerWidth}px`;
  ele.style.height = `${data.height * window.innerHeight}px`;
};


const addCoral = (msg) => {

    //Create new coral
    //const newCoral = new Coral(CORAL_SPECIES.ACROPORA_LORIPES, COLORS.PURPLE,'Kumiho Cookie');
    newCoral = msg;
 
    const newPos = findSpotForCoralWrapper(newCoral);

    if(newPos == null){
      console.log("Invalid position");
    }
    else{
      newCoral.setPosition(newPos.top, newPos.left, newPos.rock);

      const rock = document.getElementById(`${[newCoral.parentRock]}-CONTAINER`);
      newCoral.draw(rock);
    }
};


const shuffle = (arr) => {
  const a = arr.slice();
  const source = arr.slice();
  for(let i = 0; i< a.length; i++){
    let j = Math.floor(Math.random() * (i+1));
    if(j!= i){
      a[i] = a[j];
    }
    a[j] = source[i];
  }
  return a;
};

const findSpotForCoralWrapper = (newCoral) => {
   let newPosition = null;
   let openRock = null;

   let allShelves = Object.keys(ROCK_SHELF_COORDINATES);
   allShelves = shuffle(allShelves);

   for(let i = 0 ; i < allShelves.length; i++){

      const currRockShelfKey = allShelves[i];
       newPosition = checkShelfPositions(currRockShelfKey, newCoral);

       if(newPosition !== null){
        newPosition.rock = ROCK_TYPES[currRockShelfKey.split('_')[0]]; 
        ROCK_SHELF_CORALS[currRockShelfKey].push(newCoral);
        window.corals = ROCK_SHELF_CORALS[currRockShelfKey];
        return newPosition;
       }
   }

   return newPosition;
};


const checkShelfPositions = (currRockShelf, newCoral) => {

  const currShelfCorals = ROCK_SHELF_CORALS[currRockShelf];

  const { top, left, endX, endY } = ROCK_SHELF_COORDINATES[currRockShelf];

  let newPos = null;

  for(let i = 0; i < NUM_TRIES; i++){

    const x = TO_PIXELS((Math.random() * (endX - left) + left), 'innerWidth');
    const y = TO_PIXELS((Math.random() * (endY - top) + top), 'innerHeight');

    if(currShelfCorals.length <= 0){
      return { left: x , top: y };
    }

    const test = _.every(currShelfCorals, (currCoral, ind) => {

      const currDimensions = {
        currStartX: currCoral.dimensions.groupStartXPx,
        currStartY: currCoral.dimensions.groupStartYPx,
        currLength: currCoral.dimensions.totalWidth,
        currHeight: currCoral.dimensions.totalHeight,
      };

      const newDimensions = {
        newStartX: x,
        newStartY: y,
        newLength: newCoral.dimensions.totalWidth,
        newHeight: newCoral.dimensions.totalHeight,
      }

      return !IS_COLLIDING(currDimensions, newDimensions);
    });

    if(test){
      return {left: x, top: y};
    }
  }
  // console.log(`%% Invalid shelf candidate: ${currRockShelf}`);
  return null;
};


/* Spawning Coral */
const spawnCoral = () => {
  const lastCoral = userCorals.pop();
  console.log('Spawning most recent coral:');
  console.log(lastCoral);
  addCoral(lastCoral);
};

/* INITIALIZATION */
const resetBackground = () => {
  console.log('Resetting background...');
  main.style.height = `${window.innerHeight}px`;
  main.style.width =  `${window.innerWidth}px`;

  const rockLeft = document.getElementById('LEFT');
  placeItem(rockLeft, ROCK_COORDINATES.LEFT);

  const rockBack = document.getElementById('BACK');
  placeItem(rockBack, ROCK_COORDINATES.BACK);

  const rockRight = document.getElementById('RIGHT');
  placeItem(rockRight, ROCK_COORDINATES.RIGHT);
};

/* P5.js */
function setup() {
  console.log("p5 setup");
  ctx = createCanvas(window.innerWidth, window.innerHeight);


  setupWebSerial(makePortButton, onWebSerialRead);
}

function draw(){

}




/* WEB SERIAL */

function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton("choose port");
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(()=>{
    if (portButton) portButton.show();
    serial.requestPort();
  });
}

function onWebSerialRead(){
  const inData =  serial.readString();
  console.log(`Receiving Webserial Data: ${inData}`);

  //If coral and received signal,
  if((inData == "1" || inData == "01") && userCorals.length > 0){
    spawnCoral();
    return;
  }

}
