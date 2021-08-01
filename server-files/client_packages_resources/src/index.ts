
//declare var global.gm:any = {};

require("./cef");
const nativeui = require("./lib/nativeui")
const {Menu, UIMenuItem, UIMenuListItem, UIMenuCheckboxItem, BadgeStyle, Point, ItemsCollection, Color} = nativeui;
//gm.cef = require("./lib/cefManager");
const characterData  = require("./charcreator/data");
require("./charcreator/index");
require("./listeners/auth");
require("./listeners/quit");
require("./commands/test")
require("./camera/fly");
require("./lib/cameraManager");


mp.events.callRemote("server.debug", "Start testing debug messages");
mp.events.add("cef.debug", (message) => {
    mp.events.callRemote("server.debug", "[CEF] " + message);
})

mp.events.callRemote("server.debug", "Start login result");
mp.events.add("client.loginResults", (result) => {
    mp.events.callRemote("server.debug", "Result: " + result);
})