const users = require("../database/userManager");

mp.events.add("playerQuit", (player: PlayerMp, exitType:String, reason: String) => {
    users.saveUser(player);
    console.log("Player " + player.name + " left server [" + exitType + ", " + reason + "]")
});
