const cef = mp.browsers.new("package://cef/cefs/index.html");
exports.cef = cef;
cef.active = true;

mp.events.add("client.showcef", (cefName) => {
    cef.execute(`showCef(\`${cefName}\`);`);
});


mp.events.add("cef.playmusic", (link) => {
    cef.execute(`playMusic(\`${link}\`);`);
});

mp.events.add("cef.stopmusic", () => {
    cef.execute(`stopMusic();`);
    mp.events.callRemote("server.debug", "Stop music");
});


mp.events.add("client.clearcef", () => {
    cef.execute(`clearCef();`);
});

mp.events.add("client.stopmusic.auth", () => {
    cef.execute(`stopMusic();`);
    mp.events.callRemote("server.debug", "Stopping music?");
});
