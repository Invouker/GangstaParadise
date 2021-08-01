"use strict";
//declare var global.gm:any = {};
require("./cef");
var nativeui = require("./lib/nativeui");
var Menu = nativeui.Menu, UIMenuItem = nativeui.UIMenuItem, UIMenuListItem = nativeui.UIMenuListItem, UIMenuCheckboxItem = nativeui.UIMenuCheckboxItem, BadgeStyle = nativeui.BadgeStyle, Point = nativeui.Point, ItemsCollection = nativeui.ItemsCollection, Color = nativeui.Color;
//gm.cef = require("./lib/cefManager");
var characterData = require("./charcreator/data");
require("./charcreator/index");
require("./listeners/auth");
require("./listeners/quit");
require("./commands/test");
require("./camera/fly");
require("./lib/cameraManager");
mp.events.callRemote("server.debug", "Start testing debug messages");
mp.events.add("cef.debug", function (message) {
    mp.events.callRemote("server.debug", "[CEF] " + message);
});
mp.events.callRemote("server.debug", "Start login result");
mp.events.add("client.loginResults", function (result) {
    mp.events.callRemote("server.debug", "Result: " + result);
});
