import {pool} from "./index";

module.exports = {
    registerUser: function(nick: String, email: String, hash: String) {
        pool.query("INSERT INTO gp_users (userName, email, password) VALUES (?,?,?,?,?)",
            [nick, email, hash], function (err: any, result: any, fields: any) {});
    },

    saveUser: function(player: PlayerMp) {
        const pos = {"x":player.position.x, "y":player.position.y, "z":player.position.z};
        pool.query("UPDATE gp_users SET money=?, coin=?, health=?, armour=?, position=?, heading=?, adminLevel=? WHERE userName=?",
            [player.getVariable("money"),
                player.getVariable("coin"),
                player.health,
                player.armour,
                JSON.stringify(pos),
                player.heading,
                player.getVariable("adminLevel"),
                player.getVariable("nick")
            ], function (err: any, result: any, fields: any) {
                if(err) throw err;
                console.log(result);
                console.log(fields);
            });

    },

    loadUser: function (player: PlayerMp, nick: String) {
        pool.query("SELECT * FROM gp_users WHERE userName=?", [nick],
            async function (err: any, result: any, fields: any) {
                if(err) throw err;
                if(result.length <= 0)
                    return;
                const obj =  {"money": result[0]["money"],
                    "coin": result[0]["coin"],
                    "heading": result[0]["heading"],
                    "adminLevel": result[0]["adminLevel"],
                    "nick": nick};
                player.setVariables(obj);
                {
                    player.health = result[0]["health"];
                    player.armour = result[0]["armour"];
                }
                {
                    const pos = await JSON.parse(result[0]["position"])
                    player.position.x = pos.x;
                    player.position.y = pos.y;
                    player.position.z = pos.z;
                }

            });
    }
};