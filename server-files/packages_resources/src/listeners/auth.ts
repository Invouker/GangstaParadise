import {pool} from "../database";
const users = require("../database/userManager");
const bcrypt = require("bcrypt");


mp.events.add(RageEnums.EventKey.PLAYER_JOIN, (player) => {
    console.log(`[SERVER]: ${player.name} has joined the server!`);

});

/*
   * Register results:
   * 2 Error
   * 0 player already exists
   * 1 player successfully registred
   * */
mp.events.add("server.registerAttempt", async (player, nick, email, password) => {
    new Promise(function(resolve, reject) {
        pool.query("SELECT userName FROM gp_users WHERE userName=?", [nick], async function (err:any, result:any, fields:any) {
            if (err) reject(err);
            if(result.length <= 0) {
                console.log("[DB] Player doesnt exists and registred!");

                bcrypt.genSalt(12, (err: any, salt: any) => {
                    if (err) reject(err);
                    bcrypt.hash(password, salt, async (err: any, hash: any) => {
                        //pool.query("INSERT INTO gp_users (userName, email, password, money, coin) VALUES (?,?,?,?,?)", [nick, email, hash, 2500, 25], function (err: any, result: any, fields: any) {});
                        users.registerUser(nick, email, hash);
                        await resolve(1);
                    });
                });


            } else resolve(0);
        });
    }).then(async function (res) {
        await player.call("client.registerResult", res);
    });
});


/*
   * Login results:
   * 2 Error
   * 0 wrong password
   * 1 successfuly logged
   * */

mp.events.add("server.loginAttempt", (player, nick, password) => {
    new Promise(function (resolve, reject) {
        pool.query("SELECT userName, password FROM gp_users WHERE userName=?", [nick],  function (err: any, res: any, fields: any) {
            if (err) reject(err);
            if (res.length > 0) {
                console.log("[DB] Player exists and check password!");
                pool.query("SELECT * FROM gp_users WHERE userName=? OR email=?", [nick, nick],  function (err: any, result: any, fields: any) {
                    if (err) reject(err);
                    bcrypt.compare(password, result[0]["password"], async  function (err: any, res: boolean) {
                        // if res == true, password matched
                        if (res) {
                           // player.setVariable("money", result[0]["money"]);
                            //player.setVariable("coin", result[0]["coin"]);

                            player.setVariable("isLogged", true);
                            console.log("Successfully logged in!")
                           await resolve("1");
                            return;
                        } else {
                           await resolve("0");
                            // wrong password
                        }
                    });
                });
            }
        });
    }).then((result: any) => {
        player.setVariable('client.loginResult', result);
        if(result === "1")
            users.loadUser(player, nick);

    })
});

mp.events.add("server.forgotPassword", (player, email) => {
    let result: Number = -1;

    player.call("client.forgotPasswordResult", result);
});