mp.events.add("playerQuit", (player) => {
    mp.game.graphics.notify(`<C>${player.name}</C> (ID:${player.remoteId}) left the server`);
});