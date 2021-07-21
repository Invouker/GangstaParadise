"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerModule = void 0;
var PlayerModule;
(function (PlayerModule) {
    var Player = /** @class */ (function () {
        function Player(money, coin) {
            this._money = money;
            this._coin = coin;
        }
        Object.defineProperty(Player.prototype, "money", {
            get: function () {
                return this._money;
            },
            set: function (value) {
                this._money = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "coin", {
            get: function () {
                return this._coin;
            },
            set: function (value) {
                this._coin = value;
            },
            enumerable: false,
            configurable: true
        });
        return Player;
    }());
    PlayerModule.Player = Player;
})(PlayerModule = exports.PlayerModule || (exports.PlayerModule = {}));
