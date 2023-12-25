"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = 9000;
app.get('/', function (req, res) {
    res.send('Hello world');
});
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port, "/"));
});
