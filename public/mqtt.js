let client;


function setupMQTT(){
  // MQTT client details:
  let MQTTBroker = {
      hostname: `itp-cow-coral.cloud.shiftr.io`,
      port: `443`
  };
  // client credentials:
  let MQTTCreds = {
      clientID: 'Coral-Community',
      userName: 'itp-cow-coral',
      password: 'KfJGdpgNyNgxeDJX'
  }
    //MQTT - Private:

  client = new Paho.MQTT.Client(MQTTBroker.hostname, Number(MQTTBroker.port), MQTTCreds.clientID);

  window.client = client;
  // set callback handlers for the client:
  client.onConnectionLost = () => {
    console.log("lost connection");
  };

  client.onMessageArrived = onMQTTMessageArrive;

  // connect to the MQTT broker:
    client.connect(
        {
            onSuccess: () => {
            console.log("MQTT Connected");  
            client.subscribe(`/${MQTT_TOPICS[`PREVENT_TIMEOUT`]}`);
            client.subscribe(`/${MQTT_TOPICS[`CUSTOMIZER`]}`);
            client.subscribe(`/${MQTT_TOPICS[`SPAWN_CORAL`]}`);
            },
            userName: MQTTCreds.userName,   // username
            password: MQTTCreds.password,   // password
            useSSL: true                // use SSL
        }
    );
}

//Use MQTT to reset interactive
const onMQTTMessageArrive = (message) => {

  const actualData = JSON.parse(message.payloadString);
  console.log("Message has arrived: ", actualData);

  if(actualData.state === MQTT_TOPICS[`CUSTOMIZER`] || actualData.state === MQTT_TOPICS[`SPAWN_CORAL`]){
      let incomingCoral = actualData;
      userCorals.push(new Coral(incomingCoral.species, incomingCoral.color, incomingCoral.name));
  }

};


function sendMqttMessage(data, mqttTopic) {
    // if the client is connected to the MQTT broker:
    if (client.isConnected()) {

        const formattedData = {
          ...data,
          state: mqttTopic
        };
        //console.log(formattedData);

        const finalDataString = JSON.stringify(formattedData);
        // start an MQTT message:
        message = new Paho.MQTT.Message(finalDataString);
        // choose the destination topic:
        message.destinationName = mqttTopic;
        // send it:
        client.send(message);
        return true;
    }
    else{
      console.log("Not connected");
      return false;
    }
} 

const timedAddCoral = () => {
  if(newCoral){
    console.log('Firing timedAdd Coral');
    addCoral(new Coral(newCoral.species, newCoral.color, newCoral.name));
    newCoral = null;
  }
};

// const interval = setInterval(timedAddCoral, 250);

preventTimeoutTimer = setInterval(() => {
  sendMqttMessage({}, MQTT_TOPICS['PREVENT_TIMEOUT']);
}, 10000);




