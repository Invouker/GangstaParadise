mp.events.add("test", (command) => {
    const args = command.split(/[ ]+/);
    const commandName = args[0];

    args.shift();
    mp.gui.chat.push(`You enter command a "${commandName}", and all arguments it a [${args.join(",")}]`);


});

mp.keys.bind(0x71, true, function() {
    mp.game.ui.displayCash(true);
    mp.game.ui.addTextComponentSubstringCash(20, true);
    mp.game.ui.setMultiplayerHudCash(10, 20);
    mp.gui.chat.push('F2 key is pressed.');
});

mp.keys.bind(0x72, true, function() {
    mp.events.call("client.showToast", "Úspešne si sa prihlásil!",ToastType.Wrong, 10);
    mp.events.call("client.showToast", "Úspešne si sa prihlásil!",ToastType.Success, 15);
    mp.events.call("client.showToast", "Úspešne si sa prihlásil!",ToastType.Warn, 30);
    //mp.events.call("client.showToast", "hehe, toast22", 100);

});


