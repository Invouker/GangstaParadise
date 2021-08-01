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
/*
      * 0 - orange - warning
      * 1 - green - success
      * 2 - red - wrong
      * */
var ToastType;
(function (ToastType) {
    ToastType[ToastType["Warn"] = 0] = "Warn";
    ToastType[ToastType["Success"] = 1] = "Success";
    ToastType[ToastType["Wrong"] = 2] = "Wrong";
})(ToastType || (ToastType = {}));
mp.events.add("client.showToast", function (message, iconType, time) {
    cef.active = true;
    cef.execute("createToastWithIcon(" + iconType + "," + time + ", \"" + message + "\");");
});
mp.events.add("client.stopmusic.auth", function () {
    cef.execute("stopMusic();");
    mp.events.callRemote("server.debug", "Stopping music?");
});
