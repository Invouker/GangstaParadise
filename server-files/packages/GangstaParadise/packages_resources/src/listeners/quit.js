"use strict";
var users = require("../database/userManager");
mp.events.add("playerQuit", function (player, exitType, reason) {
    users.saveUser(player);
    console.log("Player " + player.name + " left server [" + exitType + ", " + reason + "]");
});
