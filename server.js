/*
 * this is the "HTTP server module"
 * which should do HTTP level stuff such as parameters parsing. 
 * 
 */ 
var http = require('http');					// to start http server
var url = require("url");					// for URL parsing
var querystring = require('querystring');	// for query part parsing

// To make this possible, we will put our server code into a function
// named start, and we will export this function
function start(route, handle) {
	
	function onRequest(req, res) {
		
		// e.g. http://localhost:1337/?foo=bar
		var parsedUrl = url.parse(req.url);
		var pathname = parsedUrl.pathname;
		var query = parsedUrl.query;
		var params = querystring.parse(query);
		var fooVal = params["foo"];
		console.log("Request for " + pathname + " received, query=" + query + " foo=" + fooVal);
	    
		// POST data aggregator
		var postData = "";
		// For POST operations
		req.setEncoding("utf8");
		req.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '"+ postDataChunk + "'.");
		});
		
		// For everything.
		req.addListener("end", function() {
			route(handle, pathname, res, postData);
		});
		
		
		// route(handle, pathname, res);
		
		
		// res.writeHead(200, {'Content-Type': 'text/plain'});
	    // res.end('Hello World\n');
	}
	
	http.createServer(onRequest).listen(1337, '127.0.0.1');
	
	console.log('Server running at http://127.0.0.1:1337/');
}

// "exports" is a magic map containing all modular functions.
exports.start = start;
