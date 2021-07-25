import {pool} from "./database";
var log4js = require("log4js");
var format = require('date-format');

declare global {
    var db: any;
}


log4js.configure({

    categories: {
        default: { appenders: ['out', 'afile'], level: 'ALL' },
        tofile: { appenders: ['afile'], level: 'info' } },
    appenders: {

        afile: { type: 'multiFile', base: 'logs/', property: 'categoryName', extension: '.log' },

        out: {
            type: 'stdout',
            layout: {
                type: 'pattern',
//[13:19:11] [IO-Worker-15/INFO]:
                pattern: '[%[%d{hh:mm:ss}%]] [%[%p%]]:%[ %m %]'
            }}
    },


});
const logger = log4js.getLogger('latest.log');;
exports.logger = logger
logger.info('Hello!');
logger.debug("debug message");

logger.info('doing something.');

logger.info('this is just a test');
logger.error('of a custom appender');
logger.warn('that outputs json');


console.log = (msg) => logger.info(msg);

console.log('Ganga Paradise gamemode initialization...');

const database = require('./database/index');
database.createDatabase();
global.db = database.pool;

require("./car/index");
////pool.query("INSERT INTO gp_users (userName, email, password, money, coin) VALUES (?,?,?,?,?)", ["XpresS", "mail", "pass", 2500, 25], function (err:any, result:any, fields:any) {});

require("./listeners/auth");
require("./camera");

require("./test/commandLine");
require("./listeners/quit");


mp.events.add("server.debug", function (player: PlayerMp, debugMessage: String) {
    console.log("[Debug-Client] Client name: " + player.name + ", message: " + debugMessage);
});




