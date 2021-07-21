"use strict";
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function ParseCmd(s) {
    var args = s.split(" ");
    var cmd = args[0].toLowerCase();
    var res = '';
    switch (cmd) {
        case "tppos":
            if (args.length > 4) {
                mp.players.forEach(function (player) {
                    if (player.name.toLowerCase() == args[1].toLowerCase()) {
                        player.position = new mp.Vector3(parseFloat(args[2]), parseFloat(args[3]), parseFloat(args[4]));
                        res = " Player " + player.name + " was teleported to X:" + parseFloat(args[2]) + " Y:" + parseFloat(args[3]) + " Z:" + parseFloat(args[4]) + "!!!";
                    }
                });
            }
            else {
                res = " Invalid arguments!!!";
            }
            break;
        case "give.weapons":
            if (args.length > 3) {
                mp.players.forEach(function (player) {
                    if (player.name.toLowerCase() == args[1].toLowerCase()) {
                        player.giveWeapon(mp.joaat(args[2]), parseInt(args[3]));
                        res = " Player " + player.name + " received weapons!!!";
                    }
                });
            }
            else {
                res = " Invalid arguments!!!";
            }
            break;
        case "status":
            res = "\n Players: " + mp.players.length + "/" + mp.players.size + "\n Vehicles: " + mp.vehicles.length + "\n Objects: " + mp.objects.length + "\n Uptime: " + process.uptime() + "\n";
            break;
        case "online":
            res = "\n Online: " + mp.players.length + "/" + mp.players.size + "\n ";
            mp.players.forEach(function (player) {
                res += player.name + " | " + player.ip + " | " + player.ping + "\n ";
            });
            break;
        default:
            res = "[Error] Neznámy príkaz!";
            break;
    }
    return res;
}
rl.on('line', function (s) {
    var res = ParseCmd(s);
    console.log(res);
});
