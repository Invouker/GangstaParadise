const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ParseCmd(s:any){
    var args = s.split(" ");
    var cmd = args[0].toLowerCase();
    var res = '';
    switch(cmd){

        case "tppos":
            if(args.length>4){
                mp.players.forEach(player => {
                    if(player.name.toLowerCase() == args[1].toLowerCase()){
                        player.position = new mp.Vector3(parseFloat(args[2]), parseFloat(args[3]), parseFloat(args[4]));
                        res = " Player "+player.name+" was teleported to X:"+parseFloat(args[2])+" Y:"+parseFloat(args[3])+" Z:"+parseFloat(args[4])+"!!!";
                    }
                });
            } else {
                res = " Invalid arguments!!!"
            }
            break;
        case "give.weapons":
            if(args.length>3){
                mp.players.forEach(player => {
                    if(player.name.toLowerCase() == args[1].toLowerCase()){
                        player.giveWeapon(mp.joaat(args[2]), parseInt(args[3]));
                        res = " Player "+player.name+" received weapons!";
                    }
                });
            } else {
                res = " Invalid arguments!!!"
            }
            break;
        case "status":
            res = "\n=================[Server status]=================\n Players: "+mp.players.length+"/"+mp.players.size+"\n Vehicles: "+mp.vehicles.length+"\n Objects: "+mp.objects.length+"\n Uptime: "+process.uptime()+"\n=================================================";
            break;
        case "saveall":
            res = "All players successfully saved";
            const users = require("../database/userManager");
            mp.players.forEach((player: PlayerMp) => {
                users.saveUser(player);
            });
            break;
        case "online":

            res = "Online: "+mp.players.length+"/"+mp.players.size+"\n ";
            mp.players.forEach(player => {
                res += player.name+" | "+player.ip+" | "+player.ping+"\n ";
            });
            break;

        case "say":
            let text :string = "";
            if(args.length == 0)
                return;

            for (let i = 1; i < args.length; i++) {
                text += args[i] + " ";
            }
            res = "[Console] " + text;
            mp.players.broadcast("[Server] " + text);
            break;

        case "exit":
        case "stop":
            res = "Exitting the server";
            logger.info("Exiting after all tasks ended, pid: " + process.pid);
            log4js.shutdown(() => process.abort());
            break;
        default:
            res = "Neznámy príkaz!";
            break;
    }
    return res;
}

function done() {


}

rl.on('line', (s: any) => {
    var res = ParseCmd(s);
    readline.moveCursor(process.stdout,0,-1);
    readline.clearScreenDown(process.stdout);
    console.log(res);
});