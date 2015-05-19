var express = require("express");
var app = express();
var pkg = require("../package");

app.set("port", process.env.PORT || 3000);

app.get("/", function(req, res) {
    res.send("Hello, World!");
});

app.listen(app.get("port"), function() {
    console.log(pkg.name + " listening on port " + app.get("port"));
});
