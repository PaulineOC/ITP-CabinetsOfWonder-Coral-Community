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
let allCorals = [];
//Image resources:
let tank;
let amCoral;
let fsCoral;
// MQTT client:
let client;

// topic to subscribe to when you connect:
const topic = 'IndividualVideoDone';

function preload() {
  tank = loadImage('Assets/tank.png');
  amCoral = loadImage('Assets/am-test.png');
  fsCoral = loadImage('Assets/am-test.png');

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
              client.subscribe(topic);
            },       // callback function for when you connect
            userName: MQTTCreds.userName,   // username
            password: MQTTCreds.password,   // password
            useSSL: true                // use SSL
        }
    );
}

const onMQTTMessageArrive = (message) => {

  // const sampleData = {
  //         coralType: FUNGIA_SCUTARIA
  //         name: "Bob",
  //         red: "255",
  //         blue: "0",
  //         green: "255",
  //         state: "VID-DONE",
  //         type: STATION_TYPE,
  //};

  // CORAL_TYPE = {
  // FUNGIA_SCUTARIA: "FUNGIA_SCUTARIA",
  // ACROPORA_LORIPES: "ACROPORA_LORIPES",
  // ACROPORA_MILLEPORA:

  //Coral(coralType, img, name, red, green, blue,){

  const actualData = JSON.parse(message.payloadString);
  if(actualData.state === "VID-DONE"){
    const [ name, red, blue, green ] = actualData;
    const coral = message.payloadString;
    const imgType = coral === CORAL_TYPE.FUNGIA_SCUTARIA ? fsCoral : amCoral;

    const newCoral = Coral(
      coral,
      imgType, 
      name,
      red,
      blue,
      green
    );
    allCorals.push(newCoral);
  }

}

function setup() {
  ctx = createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  image(tank, 0, 0, canvas.width, canvas.height);
  allCorals.forEach((coral)=>{
    coral.drawSelf();
  });
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
          name: "Bob",
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

