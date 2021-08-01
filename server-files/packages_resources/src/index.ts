var log4js = require("log4js");
log4js.configure({

    categories: {
        default: { appenders: ['out'], level: 'ALL' },
        tofile: { appenders: ['afile'], level: 'info' } },
    appenders: {

        afile: {
            type: 'multiFile',
            base: 'logs/',
            property: 'categoryName',
            extension: '.log',
            maxLogSize: 5120000,
            backups: 3
        },

        out: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: '[%d{hh:mm:ss}] [%[%p%]]:%] %m'//[13:19:11] [INFO]:
            }}
    },


});
const logger = log4js.getLogger('latest');;
exports.logger = logger

console.log = (msg) => logger.info(msg);
console.error = (msg) => logger.error(msg);
console.debug = (msg) => logger.debug(msg);
console.warn = (msg) => logger.warn(msg);
console.trace = (msg) => logger.trace(msg);

console.log('Ganga Paradise gamemode initialization...');

const { RagempAutoReloadPlugin } = require('ragemp-auto-reload-webpack-plugin')

module.exports = {

    plugins: [new RagempAutoReloadPlugin({serverPath: 'E:/Games/RageMP/server-files/ragemp-server.exe'})]

}

const database = require('./database/index');
database.createDatabase();
const pool = database.pool;

require("./car/index");
////pool.query("INSERT INTO gp_users (userName, email, password, money, coin) VALUES (?,?,?,?,?)", ["XpresS", "mail", "pass", 2500, 25], function (err:any, result:any, fields:any) {});
const charCreator2 = require("./listeners/charCreator");

require("./listeners/auth");
require("./camera");

require("./test/commandLine");
require("./listeners/quit");


mp.events.add("server.debug", function (player: PlayerMp, debugMessage: String) {
    console.log("[Debug-Client] Client name: " + player.name + ", message: " + debugMessage);
});

enum ToastType {
    Warn= 0,
    Success = 1,
    Wrong = 2
}




