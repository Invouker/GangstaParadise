"use strict";
mp.events.add("playerQuit", function (player) {
    mp.game.graphics.notify("<C>" + player.name + "</C> (ID:" + player.remoteId + ") left the server");
});
