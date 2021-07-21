"use strict";
//declare var global.gm:any = {};
require("./cef/index");
//gm.cef = require("./lib/cefManager");
require("./listeners/auth");
mp.events.callRemote("server.debug", "Start testing debug messages");
mp.events.add("cef.debug", function (message) {
    mp.events.callRemote("server.debug", "[CEF] " + message);
});
mp.events.add("client.loginResult", function (result) {
    console.log("[XXXX] result: " + result);
});
