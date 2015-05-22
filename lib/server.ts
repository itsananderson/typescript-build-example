/// <reference path="../definitions/harness.d.ts" />

var express = require("express");
var app = express();
var pkg = require("../package");

app.set("port", process.env.PORT || 3000);

app.get("/", function(req, res) {
    res.send("Hello, World! " + pkg.version);
});

export = app;