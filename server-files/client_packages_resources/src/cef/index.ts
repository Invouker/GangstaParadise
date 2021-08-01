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
});


mp.events.add("client.clearcef", () => {
    cef.execute(`clearCef();`);
});

/*
      * 0 - orange - warning
      * 1 - green - success
      * 2 - red - wrong
      * */
enum ToastType {
    Warn= 0,
    Success = 1,
    Wrong = 2
}

mp.events.add("client.showToast", (message, iconType, time) => {
    cef.active = true;
    cef.execute("createToastWithIcon(" +iconType+ ","+time+", \""+message+"\");");
});

mp.events.add("client.stopmusic.auth", () => {
    cef.execute(`stopMusic();`);
    mp.events.callRemote("server.debug", "Stopping music?");
});
