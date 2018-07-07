var https = require("https");
var fs = require("fs");

var options = {
    hostname: "en.wikipedia.org",
    port: 443,
    path: "wiki/London",
    method: "GET"
};

var req = https.request(options, function(res){
    
    var responseBody = "";

    console.log("Requesting server has started..");
    console.log(`Response status-code: ${res.statusCode}\n`);
    console.log("Response Headers: %j", res.headers);

    res.setEncoding("UTF-8");

    res.once("data", function(chunk){
        console.log(chunk);
    });

    res.on("data", function(chunk){
        console.log(`chunk ${chunk.length}`);
        responseBody += chunk;
    });

    res.on("end", function(){
        fs.writeFile("ford_mustang.html", responseBody, function(err){
            if (err) {
                console.log(err.message);
            } else {
                console.log("File downloaded complete.");
            }
        });
    });

});

req.on("error", function(err){
    console.log(`Error with the request: ${err.message}`);
});

req.end();



