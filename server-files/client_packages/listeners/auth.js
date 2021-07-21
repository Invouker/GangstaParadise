"use strict";
//const cef = require('./cefManager');
/*
gm.cef.createCef("cef.auth", 'package://auth/auth.html').then(r => {
    console.log("Test: " + r)
});*/
//const authCef = mp.browsers.new("package://auth/auth.html");
//authCef.active = false;
mp.events.add("playerJoin", function () {
    //authCef.active = true;
    mp.events.call("client.showcef", "auth");
    setTimeout(showCursorAndFreeze, 500);
    mp.gui.chat.activate(false); // Disables the chat
    mp.gui.chat.show(false);
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.discord.update('Something is in air', 'Playing like a boss');
    mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE"); // disable ambient sounds like car alarms
});
function showCursorAndFreeze() {
    mp.gui.cursor.show(true, true);
}
mp.events.add("playerReady", function () {
    //authCef.active = true;
    mp.events.call("client.showcef", "auth");
    mp.events.call("cef.playmusic", "https://westland.sk/xpress/Jungle%20-%20House%20in%20LA.mp3");
    setTimeout(showCursorAndFreeze, 500);
    mp.gui.chat.activate(false); // Disables the chat
    mp.gui.chat.show(false);
    mp.game.ui.displayHud(false);
    mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE"); // disable ambient sounds like car alarms
    mp.game.ui.displayRadar(false);
    mp.discord.update('Something is in air', 'Playing like a boss');
});
mp.events.add("cef.registerAttempt", function (nick, email, password) {
    mp.events.callRemote("server.registerAttempt", nick, email, password);
});
mp.events.add("cef.loginAttempt", function (nick, password) {
    mp.events.callRemote("server.loginAttempt", nick, password);
});
mp.events.add("cef.forgotPassword", function (email) {
    mp.events.callRemote("server.forgotPassword", email);
});
mp.events.add("client.hideAuth", function () {
    //authCef.active = false;
    mp.console.logInfo("hide Auth");
    mp.events.call("cef.stopmusic");
    mp.console.logInfo("hide music");
    mp.events.call("client.clearcef");
    mp.console.logInfo("hide clearcef");
    mp.gui.cursor.show(false, false);
    mp.console.logInfo("hide cursor, unfreeze");
    mp.gui.chat.activate(true);
    mp.gui.chat.show(true);
    mp.game.ui.displayHud(true);
    mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE"); // disable ambient sounds like car alarms
    mp.game.ui.displayRadar(true);
});
/*
   * Register results:
   * 2 Error
   * 0 player already exists
   * 1 player successfully registred
   * */
mp.events.add("client.registerResult", function (registerResult) {
    mp.console.logInfo("Register result is " + registerResult);
    switch (registerResult) {
        case 2: {
            //ERROR
            break;
        }
        case 0: {
            //Player exists
            break;
        }
        case 1: {
            mp.events.call("client.hideAuth");
            break;
        }
    }
});
/*
   * Login results:
   * 2 Error
   * 0 wrong password
   * 1 successfuly logged
   * */
mp.events.add("client.loginResults", function (loginResult) {
    mp.console.logInfo("Login result is:: " + loginResult);
    mp.events.callRemote("server.debug", "result login: " + loginResult);
    mp.events.call("cef.stopmusic");
    switch (loginResult) {
        case "2": {
            mp.console.logError("Login result is -1");
            console.log("result == -1");
            break;
        }
        case "0": {
            console.log("Wrong password");
            break;
        }
        case "1": {
            mp.events.call("client.hideAuth");
            break;
        }
    }
});
