"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../database");
var users = require("../database/userManager");
var bcrypt = require("bcrypt");
mp.events.add("playerJoin" /* PLAYER_JOIN */, function (player) {
    console.log("[SERVER]: " + player.name + " has joined the server!");
});
/*
   * Register results:
   * 2 Error
   * 0 player already exists
   * 1 player successfully registred
   * */
mp.events.add("server.registerAttempt", function (player, nick, email, password) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        new Promise(function (resolve, reject) {
            database_1.pool.query("SELECT userName FROM gp_users WHERE userName=?", [nick], function (err, result, fields) {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        if (err)
                            reject(err);
                        if (result.length <= 0) {
                            console.log("[DB] Player doesnt exists and registred!");
                            bcrypt.genSalt(12, function (err, salt) {
                                if (err)
                                    reject(err);
                                bcrypt.hash(password, salt, function (err, hash) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                //pool.query("INSERT INTO gp_users (userName, email, password, money, coin) VALUES (?,?,?,?,?)", [nick, email, hash, 2500, 25], function (err: any, result: any, fields: any) {});
                                                users.registerUser(nick, email, hash);
                                                return [4 /*yield*/, resolve(1)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            });
                        }
                        else
                            resolve(0);
                        return [2 /*return*/];
                    });
                });
            });
        }).then(function (res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, player.call("client.registerResult", res)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        return [2 /*return*/];
    });
}); });
/*
   * Login results:
   * 2 Error
   * 0 wrong password
   * 1 successfuly logged
   * */
mp.events.add("server.loginAttempt", function (player, nick, password) {
    new Promise(function (resolve, reject) {
        database_1.pool.query("SELECT userName, password FROM gp_users WHERE userName=?", [nick], function (err, res, fields) {
            if (err)
                reject(err);
            if (res.length > 0) {
                console.log("[DB] Player exists and check password!");
                database_1.pool.query("SELECT * FROM gp_users WHERE userName=? OR email=?", [nick, nick], function (err, result, fields) {
                    if (err)
                        reject(err);
                    bcrypt.compare(password, result[0]["password"], function (err, res) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!res) return [3 /*break*/, 2];
                                        // player.setVariable("money", result[0]["money"]);
                                        //player.setVariable("coin", result[0]["coin"]);
                                        player.setVariable("isLogged", true);
                                        console.log("Successfully logged in!");
                                        return [4 /*yield*/, resolve("1")];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                    case 2: return [4 /*yield*/, resolve("0")];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
            }
        });
    }).then(function (result) {
        player.setVariable('client.loginResult', result);
        if (result === "1")
            users.loadUser(player, nick);
    });
});
mp.events.add("server.forgotPassword", function (player, email) {
    var result = -1;
    player.call("client.forgotPasswordResult", result);
});
