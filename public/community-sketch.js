const RESTORATION_TYPE = {
  PHYSICAL: "PHYSICAL",
  STRUCTURAL: "STRUCTURAL"
}; 
let STATION_TYPE = null;

const STATES = {
  START: "START",
  PLAYING: "PLAYING",
  END: "END",
}; 
let GameState = STATES.START;
      
let ctx;

const rock1Corals = {
  rowNum: 4,
  colNum: 3,
  totalLimit: 12,
  startX: window.innerWidth / 10,
  startY: window.innerHeight - 550,
  allCorals: [],
};

const rock2Corals = {
  rowNum: 5,
  colNum: 3,
  totalLimit: 15,
  startX: window.innerWidth / 2 - 75,
  startY: window.innerHeight - 775,
  allCorals: [],
};

const rock3Corals = {
  rowNum: 5,
  colNum: 3,
  totalLimit: 15, 
  startX: window.innerWidth / 2 + 150,
  startY: window.innerHeight - 450,
  allCorals: [],
};

//Image resources:
let tank;
let amCoral;
let fsCoral;
let alCoral;


// MQTT client:
let client;

// topic to subscribe to when you connect:
const topic = 'IndividualVideoDone';
const topic2 = 'ArduinoMessage';
const topic3 = 'ResetCustomizer';

function preload() {
  tank = loadImage('Assets/tank.png');
  fsCoral = loadImage('Assets/fs-test.png');
  amCoral = loadImage('Assets/am-test.png');

  setupMQTT();
};

function setupMQTT(){
  // MQTT client details:
  let MQTTBroker = {
      hostname: `itp-cow-coral.cloud.shiftr.io/mqtt`,
      port: `1883`
  };
  // client credentials:
  let MQTTCreds = {
      clientID: 'Coral-Community',
      userName: 'itp-cow-coral',
      password: 'KfJGdpgNyNgxeDJX'
  }
    //MQTT - Private:

  client = new Paho.MQTT.Client(MQTTBroker.hostname, Number(MQTTBroker.port), MQTTCreds.clientID);
    // set callback handlers for the client:
    client.onConnectionLost = () => {
      console.log("lost connection");
    };
    client.onMessageArrived = onMQTTMessageArrive;
  // connect to the MQTT broker:
    client.connect(
        {
            onSuccess: () => {
            console.log("connected");  
              client.subscribe(topic);
              client.subscribe(topic2);
            },       // callback function for when you connect
            userName: MQTTCreds.userName,   // username
            password: MQTTCreds.password,   // password
            useSSL: true                // use SSL
        }
    );
}

const onMQTTMessageArrive = (message) => {

  const actualData = JSON.parse(message.payloadString);
  console.log(actualData);

  if(actualData.state === "VID-DONE"){
    console.log("Received Data");
    console.log(actualData);
    const coral = actualData.coralType;

    if(actualData.coralType === CORAL_TYPE.FUNGIA_SCUTARIA ){
      imgType = fsCoral;
    }
    else if(actualData.coralType === CORAL_TYPE.ACROPORA_LORIPES ){
      imgType = alCoral;
    }
    else if(actualData.coralType === CORAL_TYPE.ACROPORA_MILLEPORA){
      imgType = amCoral;
    }
    const newCoral = new Coral(
      actualData.coralType,
      imgType, 
      name,
      red,
      blue,
      green
    );

    if(rock1Corals.allCorals.length < rock1Corals.totalLimit){
      console.log("Adding Coral to Rock 1");
      rock1Corals.allCorals.push(newCoral);
    }
    else if(rock1Corals.allCorals.length >= rock1Corals.totalLimit && rock2Corals.allCorals.length < rock2Corals.totalLimit){
      console.log("Adding Coral to Rock 2");
      rock2Corals.allCorals.push(newCoral);
    }
    else if(rock2Corals.allCorals.length >= rock2Corals.totalLimit && rock3Corals.allCorals.length < rock3Corals.totalLimit){
      console.log("Adding Coral to Rock 3");
      rock3Corals.allCorals.push(newCoral);
    }
    resetCustomizerMessage();
  }
}

function setup() {
  ctx = createCanvas(window.innerWidth, window.innerHeight);
    image(tank, 0, 0, window.innerWidth, window.innerHeight);
}

function draw() {
  if(rock1Corals.allCorals.length > 0 ){
      drawRock1Corals();
  }
  if(rock2Corals.allCorals.length > 0 ){
      drawRock2Corals();
  }
  if(rock3Corals.allCorals.length > 0 ){
      drawRock3Corals();
  }
}

function drawRock1Corals(){
  for(let i = 0; i< rock1Corals.rowNum; i++){
    for(let j = 0; j< rock1Corals.colNum; j++){
      let ind = `${j * rock1Corals.rowNum + i}`; 
      let currCoral = rock1Corals.allCorals[ind];
      if(currCoral){
        currCoral.drawSelf(i, j, rock1Corals.startX, rock1Corals.startY);
      }
    }
  }
}

function drawRock2Corals(){
  for(let i = 0; i< rock2Corals.rowNum; i++){
    for(let j = 0; j< rock2Corals.colNum; j++){
      let ind = `${j * rock2Corals.rowNum + i}`; 
      let currCoral = rock2Corals.allCorals[ind];
      if(currCoral){
        currCoral.drawSelf(i, j, rock2Corals.startX, rock2Corals.startY);
      }
    }
  }
}

function drawRock3Corals(){
  for(let i = 0; i< rock3Corals.rowNum; i++){
    for(let j = 0; j< rock3Corals.colNum; j++){
      let ind = `${j * rock3Corals.rowNum + i}`; 
      let currCoral = rock3Corals.allCorals[ind];
      if(currCoral){
        currCoral.drawSelf(i, j, rock3Corals.startX, rock3Corals.startY);
      }
    }
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    console.log("Pressed Up");
  }
  else if(keyCode=== DOWN_ARROW){
    console.log("Making fake coral: Individual p5 --> Community p5");
    sendMqttMessage();
  }
  else if(keyCode === LEFT_ARROW){
    console.log("Sending fake arduino structural:");
    sendFakeArduinoSignal(1);
  }
  else if(keyCode === RIGHT_ARROW){
    console.log("Sending fake Arduino physical:");
    sendFakeArduinoSignal(2);
  }
}

function sendFakeArduinoSignal(num){
  if (client.isConnected()) {
        let msg = `${num}`;
        // start an MQTT message:
        message = new Paho.MQTT.Message(msg);
        message.destinationName = topic2;
        // send it:
        client.send(message);
    }
}

function resetCustomizerMessage(){
  if (client.isConnected()) {
        let msg = 'RESET';
        // start an MQTT message:
        message = new Paho.MQTT.Message(msg);
        message.destinationName = topic3;
        // send it:
        client.send(message);
    }
}


function sendMqttMessage() {
    if (client.isConnected()) {
        let msg = `${STATION_TYPE}-HI`;
        const finalData = {
          coralType: CORAL_TYPE.FUNGIA_SCUTARIA,
          name: "TEST",
          red: "255",
          blue: "0",
          green: "255",
          state: "VID-DONE",
          type: "STRUCTURAL",
        };
        const finalDataString = JSON.stringify(finalData);
        // start an MQTT message:
        message = new Paho.MQTT.Message(finalDataString);
        message.destinationName = topic;
        // send it:
        client.send(message);
    }
}

