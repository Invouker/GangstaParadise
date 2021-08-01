"use strict";
// @ts-ignore
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabase = exports.pool = void 0;
var mysql_1 = __importDefault(require("mysql"));
//var mysql = require('mysql');
console.log("Loading Database...");
/*
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "gangstaparadise"
});
*/
exports.pool = mysql_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: "root",
    database: 'gangstaparadise',
    waitForConnections: true,
    connectionLimit: 10
});
function createDatabase() {
    exports.pool.query("CREATE DATABASE IF NOT EXISTS gangstaparadise;", function (err, rows, fields) { });
    exports.pool.query("CREATE TABLE IF NOT EXISTS `gp_users` ( `id` int(11) NOT NULL AUTO_INCREMENT, `userName` varchar(64) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `health` smallint(255) NOT NULL, `armour` smallint(255) NOT NULL, `position` varchar(400) NOT NULL, `heading` smallint(255) NOT NULL, `adminLevel` tinyint(10) NOT NULL, `money` int(11) NOT NULL, `coin` int(11) NOT NULL, PRIMARY KEY (`id`)) ENGINE = InnoDB;", function (err, rows, fields) { });
}
exports.createDatabase = createDatabase;
module.exports.pool = exports.pool;
//module.exports.connection = connection;
