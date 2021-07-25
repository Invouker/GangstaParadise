"use strict";
//declare var global.gm:any = {};
require("./cef");
//gm.cef = require("./lib/cefManager");
require("./listeners/auth");
require("./listeners/quit");
require("./commands/test");
require("./camera");
mp.events.callRemote("server.debug", "Start testing debug messages");
mp.events.add("cef.debug", function (message) {
    mp.events.callRemote("server.debug", "[CEF] " + message);
});
mp.events.callRemote("server.debug", "Start login result");
mp.events.add("client.loginResults", function (result) {
    mp.events.callRemote("server.debug", "Result: " + result);
});
