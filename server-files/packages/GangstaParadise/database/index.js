"use strict";
// @ts-ignore
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabase = exports.pool = void 0;
var mysql_1 = __importDefault(require("mysql"));
//var mysql = require('mysql');
console.log("Loading Database");
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
    exports.pool.query("CREATE TABLE IF NOT EXISTS `gangstaparadise`.`gp_users` ( `id` INT NOT NULL AUTO_INCREMENT , " +
        "`userName` VARCHAR(64) NOT NULL , `email` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `money` " +
        "INT NOT NULL , `coin` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;", function (err, rows, fields) { });
}
exports.createDatabase = createDatabase;
module.exports.pool = exports.pool;
//module.exports.connection = connection;
