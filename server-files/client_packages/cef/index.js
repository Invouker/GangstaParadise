"use strict";
var cef = mp.browsers.new("package://cef/cefs/index.html");
exports.cef = cef;
cef.active = true;
mp.events.add("client.showcef", function (cefName) {
    cef.execute("showCef(`" + cefName + "`);");
});
mp.events.add("cef.playmusic", function (link) {
    cef.execute("playMusic(`" + link + "`);");
});
mp.events.add("cef.stopmusic", function () {
    cef.execute("stopMusic();");
});
mp.events.add("client.clearcef", function () {
    cef.execute("clearCef();");
});
mp.events.add("client.showToast", function (message, time) {
    cef.active = true;
    cef.execute("createToast(new Date().getTime()%10000, `" + time + "`, `" + message + "`);");
});
mp.events.add("client.stopmusic.auth", function () {
    cef.execute("stopMusic();");
    mp.events.callRemote("server.debug", "Stopping music?");
});
