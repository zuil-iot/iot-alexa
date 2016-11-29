const http = require('http');
const hostname = 'iot-haproxy';
const port = '4000';
const basePath = '/internal'

function put (path,payload,cb) {
	console.log("Entering API Put");
	var data = JSON.stringify(payload);
	console.log(data);
	var options = {
		hostname: hostname,
		port: port,
		path: basePath+'/'+path,
		method: 'PUT',
		headers: {
			'Content-type': 'application/json',
			'Content-length': Buffer.byteLength(data)
		}
	};

	var req=http.request(options, (res) => {
		res.on('data', (chunk) => {
			console.log("API: end");
			cb(false,res);
		});
	});
	req.on('error',(err) => {
		console.log("API: error");
		cb(true,err);
	});
	req.write(data);
	req.end();
}

module.exports.put = put;
