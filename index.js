/**
 * Entry class
 * pre-requisite: npm install formidable
 */

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

// array of functions
var handle = {};
handle["/"] = requestHandlers.startForm;
handle["/start"] = requestHandlers.start;
handle["/startForm"] = requestHandlers.startForm;
handle["/list"] = requestHandlers.list;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);

