"use strict";
var log4js = require("log4js");
log4js.configure({
    categories: {
        default: { appenders: ['out'], level: 'ALL' },
        tofile: { appenders: ['afile'], level: 'info' }
    },
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
                pattern: '[%d{hh:mm:ss}] [%[%p%]]:%] %m' //[13:19:11] [INFO]:
            }
        }
    },
});
var logger = log4js.getLogger('latest');
;
exports.logger = logger;
console.log = function (msg) { return logger.info(msg); };
console.error = function (msg) { return logger.error(msg); };
console.debug = function (msg) { return logger.debug(msg); };
console.warn = function (msg) { return logger.warn(msg); };
console.trace = function (msg) { return logger.trace(msg); };
console.log('Ganga Paradise gamemode initialization...');
var database = require('./database/index');
database.createDatabase();
var pool = database.pool;
require("./car/index");
////pool.query("INSERT INTO gp_users (userName, email, password, money, coin) VALUES (?,?,?,?,?)", ["XpresS", "mail", "pass", 2500, 25], function (err:any, result:any, fields:any) {});
require("./listeners/auth");
require("./camera");
require("./test/commandLine");
require("./listeners/quit");
mp.events.add("server.debug", function (player, debugMessage) {
    console.log("[Debug-Client] Client name: " + player.name + ", message: " + debugMessage);
});
var ToastType;
(function (ToastType) {
    ToastType[ToastType["Warn"] = 0] = "Warn";
    ToastType[ToastType["Success"] = 1] = "Success";
    ToastType[ToastType["Wrong"] = 2] = "Wrong";
})(ToastType || (ToastType = {}));
