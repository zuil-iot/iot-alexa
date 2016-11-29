
var AlexaAppServer = require('./alexa-app-server/index.js');
AlexaAppServer.start({
	server_root:__dirname,     // Path to root
	public_html:"public_html", // Static content
	app_dir:"apps",            // Where alexa-app modules are stored
	app_root:"/alexa/",        // Service root
	port:3000,                 // What port to use, duh
});
