/**
 * Application logic
 */
var exec = require("child_process").exec;		// execute system function asynchronously
var querystring = require('querystring');		// for query part parsing, the POST FORM is the same
var fs = require("fs");							// filesystem operations


// utility function to sleep for a few sec
function sleep(milliSeconds) {
	var startTime = new Date().getTime();
	while (new Date().getTime() < startTime + milliSeconds){};
}

function list(response, postData) {
	// sleep(3000);
	console.log("Request handler 'list' was called.");
	
	exec("ls -lah",	// "find /",
			{ timeout: 10000, maxBuffer: 20000*1024 },
		function (error, stdout, stderr) {
			console.log("End: error=" + error);	
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write(stdout);
			response.end();
	});
}

function start(response, postData) {
	console.log("Request handler 'start' was called.");
	
	var body = '<html>'+
				'<head>'+
				'<meta http-equiv="Content-Type" content="text/html; '+
				'charset=UTF-8" />'+
				'</head>'+
				'<body>'+
				'<form action="/upload" method="post">'+
				'<textarea name="text" rows="20" cols="60"></textarea>'+
				'<input type="submit" value="Submit text" />'+
				'</form>'+
				'</body>'+
				'</html>';
	
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}


function startForm(response, postData) {
	console.log("Request handler 'start' was called.");
	var body = '<html>'+
				'<head>'+
				'<meta http-equiv="Content-Type" '+
				'content="text/html; charset=UTF-8" />'+
				'</head>'+
				'<body>'+
				'<form action="/upload" enctype="multipart/form-data" '+
				'method="post">'+
				'<input type="file" name="upload">'+
				'<input type="submit" value="Upload file" />'+
				'</form>'+
				'</body>'+
				'</html>';
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}


function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("You've sent: " + querystring.parse(postData).text);
	response.end();
}


function show(response, postData) {
	console.log("Request handler 'show' was called.");
	fs.readFile("tmp/orly.jpg", "binary", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}


exports.start = start;
exports.startForm = startForm;
exports.list = list;
exports.upload = upload;
exports.show = show;