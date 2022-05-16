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
//Image resources:
let oceanBg;
let welcomeScreen;

// MQTT client:
let client;

// topic to subscribe to when you connect:
const topic = 'ArduinoMessage';
const topic2 = 'IndividualVideoDone';
const topic3 = 'CoralCustomization';


function preload() {
  oceanBg = loadImage('Assets/ocean.png');
  welcomeScreen = loadImage('Assets/Frame-2.png');

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
      clientID: STATION_TYPE === RESTORATION_TYPE.STRUCTURAL ? 'Individual-Structural' : 'Individual-Physical',
      userName: 'itp-cow-coral',
      password: 'KfJGdpgNyNgxeDJX'
  }
    //MQTT - Private:

  client = new Paho.MQTT.Client(MQTTBroker.hostname, Number(MQTTBroker.port), MQTTCreds.clientID);
    // set callback handlers for the client:
    client.onConnectionLost = () => {
      console.log("lost connection");
    };
    client.onMessageArrived = (message) => {
      console.log("received message: ", message );
    };

  // connect to the MQTT broker:
    client.connect(
        {
            onSuccess: () => {    
              client.subscribe(topic);
              client.subscribe(topic2);
            },       // callback function for when you connect
            userName: MQTTCreds.userName,   // username
            password: MQTTCreds.password,   // password
            useSSL: true                // use SSL
        }
    );
}


function setup() {
  ctx = createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    background(0,0,0);

  
  switch(GameState){
    case STATES.START:
      image(welcomeScreen, 0, 0, window.innerWidth/2, window.innerHeight/2);
      //image();
      break;
      case STATES.PLAYING:
        image(currVid, 0,0, window.innerWidth/2, window.innerHeight/2);
      // image(currVid, 0, 0, window.innerWidth, window.innerHeight);
      //image();
      break;
    case STATES.END:
      image(oceanBg, 0, 0, window.innerWidth, window.innerHeight);
      break;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    console.log("Up pressed (fake switch)");
    turnOnVideo();
  }
  else if (keyCode === BACKSPACE) {
    console.log("BACKSPACE pressed");
      serial.write("g");
  }
  else if(keyCode=== LEFT_ARROW){
    console.log("sending ARDUINO MQTT Test message");
    //sendMqttMessage(topic);
  }

  else if(keyCode=== RIGHT_ARROW){
    console.log("Sending p5 -> p5 MQTT Test message");
    //sendMqttMessage(topic2);
  }
}