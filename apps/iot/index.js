var alexa = require('alexa-app');
var api = require('./api');


// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('iot');
app.launch(function(req,res) {
	console.log("IOT Starting");
	res.say("This is the IOT app");
});

app.dictionary = { "pinStates":["on","off"]};

app.intent('SetPinIntent', {
	"slots": {"PIN_STATE":"PIN_STATES","PIN_NAME":"PIN_NAMES","ROOM":"ROOMS"},
	"utterances": [
		"turn {-|PIN_STATE} the {-|PIN_NAME} {light|pin|one} in the {-|ROOM}",
		"turn {-|PIN_STATE} the {-|ROOM} {-|PIN_NAME} {light|pin|one}",
		"set the {-|ROOM} {-|PIN_NAME} {light|pin|one} to {-|PIN_STATE}",
		"turn the {-|ROOM} {-|PIN_NAME} {light|pin|one} {-|PIN_STATE}"
	]
	}, function(req,res) {
		var pinValue = req.slot('PIN_STATE');
		var pinAlias = req.slot('PIN_NAME');
		var deviceAlias = req.slot('ROOM');
		res.say("OK, I'll turn "+pinValue+" the "+pinAlias+" one on the "+deviceAlias+" thing.");
		doPin(deviceAlias,pinAlias,pinValue, function(err,response) {
			if(err) {
				console.log("Error: ",err);
			} else {
				console.log("Success");
			}
		});
	}
);

function doPin(deviceAlias,pinAlias,pinValue,cb) {
	console.log(deviceAlias,pinAlias,pinValue);
	console.log("Building API Call");
	var path = 'devices-by-alias/set';
	var payload = {
		deviceAlias : deviceAlias,
		pinAlias: pinAlias,
		pinValue: pinValue
	}
	console.log("Calling API");
	api.put(path,payload,cb);
}

module.exports = app;
