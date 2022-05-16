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
  rowNum: 6,
  colNum: 10,
  totalLimit: 60,
  startX: window.innerWidth/8,
  startY: window.innerHeight / 2,
  allCorals: [],
};

const rock2Corals = {
  rowNum: 3,
  colNum: 15,
  totalLimit: 45,
  allCorals: [],
};

const rock3Corals = {
  rowNum: 6,
  colNum: 8,
  totalLimit: 48, 
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

    console.log(newCoral);

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

  }
}

function setup() {
  ctx = createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  image(tank, 0, 0, window.innerWidth, window.innerHeight);
  drawRock1Corals();
  //drawRock2Corals();
  //drawRock3Corals();
}

function drawRock1Corals(){
  rock1Corals.allCorals.forEach((coral, ind)=>{
    let row = Math.floor(ind / rock1Corals.rowNum);
    let col = ind % rock1Corals.colNum;
    coral.drawSelf(row, col, rock1Corals.startX, rock1Corals.startY);
  });
}

function drawRock2Corals(){
  rock2Corals.allCorals.forEach((coral, ind)=>{
    let row = Math.floor(ind / rock2Corals.rowNum);
    let col = ind % rock2Corals.colNum;
    coral.drawSelf(row, col, rock2Corals.startX, rock2Corals.startY);
  });
}


function drawRock3Corals(){
  rock3Corals.allCorals.forEach((coral, ind)=>{
    let row = Math.floor(ind / rock3Corals.rowNum);
    let col = ind % rock3Corals.colNum;
    coral.drawSelf(row, col, rock3Corals.startX, rock3Corals.startY);
  })
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    console.log("Up pressed (fake switch)");
    turnOnVideo();
  }
  else if(keyCode=== RIGHT_ARROW){
    console.log("Sending p5 -> p5 MQTT Test message");
    sendMqttMessage();
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

