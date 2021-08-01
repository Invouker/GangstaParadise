// @ts-ignore

import mysql from 'mysql';

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
export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: "root",
  database: 'gangstaparadise',
  waitForConnections: true,
  connectionLimit: 10
});

export function createDatabase() {
  pool.query("CREATE DATABASE IF NOT EXISTS gangstaparadise;", function(err:any, rows:any, fields:any) {})

  pool.query("CREATE TABLE IF NOT EXISTS `gp_users` ( `id` int(11) NOT NULL AUTO_INCREMENT, `userName` varchar(64) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `health` smallint(255) NOT NULL, `armour` smallint(255) NOT NULL, `position` varchar(400) NOT NULL, `heading` smallint(255) NOT NULL, `adminLevel` tinyint(10) NOT NULL, `money` int(11) NOT NULL, `coin` int(11) NOT NULL, PRIMARY KEY (`id`)) ENGINE = InnoDB;", function(err:any, rows:any, fields:any) {});


}

module.exports.pool = pool;
//module.exports.connection = connection;

