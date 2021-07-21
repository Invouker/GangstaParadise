"use strict";
// @ts-ignore
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
//var mysql = require('mysql');
console.log("Loading Database");
var connection = mysql_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
});
function createDatabase() {
    connection.connect(function (err) {
        if (err)
            throw err;
        console.log("Connected!");
        connection.query("CREATE DATABASE IF NOT EXISTS gangstaparadise;");
        connection.query("CREATE TABLE IF NOT EXISTS `gangstaparadise`.`gp_users` ( `id` INT NOT NULL AUTO_INCREMENT , `userName` VARCHAR(64) NOT NULL , `email` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `money` INT NOT NULL , `coin` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;");
        console.log("Creating Database or table if not exists!");
        connection.end();
    });
}
module.exports.createDatabase = createDatabase;
