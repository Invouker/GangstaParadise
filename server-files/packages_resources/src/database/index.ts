// @ts-ignore

import mysql from 'mysql';

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

  pool.query("CREATE TABLE IF NOT EXISTS `gangstaparadise`.`gp_users` ( `id` INT NOT NULL AUTO_INCREMENT , " +
      "`userName` VARCHAR(64) NOT NULL , `email` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `money` " +
      "INT NOT NULL , `coin` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;", function(err:any, rows:any, fields:any) {});


}

module.exports.pool = pool;
//module.exports.connection = connection;

