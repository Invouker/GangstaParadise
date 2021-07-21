import {pool} from "./database";

declare global {
    var db: any;
}


console.log('Ganga Paradise gamemode initialization...');

const database = require('./database/index');
database.createDatabase();
global.db = database.pool;

////pool.query("INSERT INTO gp_users (userName, email, password, money, coin) VALUES (?,?,?,?,?)", ["XpresS", "mail", "pass", 2500, 25], function (err:any, result:any, fields:any) {});

require("./test/commandLine");
require("./listeners/auth");


mp.events.add("server.debug", function (player: PlayerMp, debugMessage: String) {
    console.log("[Debug-Client] Client name: " + player.name + ", message: " + debugMessage);
});




