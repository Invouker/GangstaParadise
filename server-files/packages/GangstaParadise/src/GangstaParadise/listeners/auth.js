"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("../entity/Player");
var Player = Player_1.PlayerModule.Player;
var CefHandler_1 = require("../../../client_packages/CefHandler");
var players = [];
mp.events.add("playerJoin" /* PLAYER_JOIN */, function (player) {
    console.log("[SERVER]: " + player.name + " has joined the server!");
    CefHandler_1.CefHandler.authCef().then(function () {
        console.log("authCefShow");
    });
    players.push(new Player(200, 200));
});
