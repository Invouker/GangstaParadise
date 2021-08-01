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
var fs = require("fs");
var freemodeCharacters = [mp.joaat("mp_m_freemode_01"), mp.joaat("mp_f_freemode_01")];
var creatorPlayerPos = new mp.Vector3(402.8664, -996.4108, -99.00027);
var creatorPlayerHeading = -185.0;
// this will increase by 1 every time a player is sent to the character creator
var creatorDimension = 1;
mp.events.add("playerReady", function (player) {
    player.colorForOverlayIdx = function (index) {
        var color;
        switch (index) {
            case 1:
                color = this.customCharacter.BeardColor;
                break;
            case 2:
                color = this.customCharacter.EyebrowColor;
                break;
            case 5:
                color = this.customCharacter.BlushColor;
                break;
            case 8:
                color = this.customCharacter.LipstickColor;
                break;
            case 10:
                color = this.customCharacter.ChestHairColor;
                break;
            default:
                color = 0;
        }
        return color;
    };
    player.defaultCharacter = function () {
        this.customCharacter = {
            Gender: 0,
            Parents: {
                Father: 0,
                Mother: 0,
                Similarity: 1.0,
                SkinSimilarity: 1.0
            },
            Features: [],
            Appearance: [],
            Hair: {
                Hair: 0,
                Color: 0,
                HighlightColor: 0
            },
            EyebrowColor: 0,
            BeardColor: 0,
            EyeColor: 0,
            BlushColor: 0,
            LipstickColor: 0,
            ChestHairColor: 0
        };
        for (var i = 0; i < 20; i++)
            this.customCharacter.Features.push(0.0);
        for (var i = 0; i < 10; i++)
            this.customCharacter.Appearance.push({ Value: 255, Opacity: 1.0 });
        player.applyCharacter();
    };
    player.applyCharacter = function () {
        this.setCustomization(this.customCharacter.Gender == 0, this.customCharacter.Parents.Mother, this.customCharacter.Parents.Father, 0, this.customCharacter.Parents.Mother, this.customCharacter.Parents.Father, 0, this.customCharacter.Parents.Similarity, this.customCharacter.Parents.SkinSimilarity, 0.0, this.customCharacter.EyeColor, this.customCharacter.Hair.Color, this.customCharacter.Hair.HighlightColor, this.customCharacter.Features);
        this.setClothes(2, this.customCharacter.Hair.Hair, 0, 2);
        for (var i = 0; i < 10; i++)
            this.setHeadOverlay(i, [this.customCharacter.Appearance[i].Value, this.customCharacter.Appearance[i].Opacity, this.colorForOverlayIdx(i), 0]);
    };
    player.loadCharacter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.query('SELECT `clothing` FROM `gp_users` WHERE `userName` = ?', [this.name]).then(function (_a) {
                            var rows = _a[0];
                            _this.customCharacter = rows[0]["clothing"];
                            _this.applyCharacter();
                        }).catch(function (err) {
                            console.log(err);
                            _this.defaultCharacter();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    player.saveCharacter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.query('UPDATE `gp_users` SET `clothing` = ? WHERE `userName` = ?', [JSON.stringify(this.customCharacter), player.name]).then(function () {
                            console.log(player.name + "'s clothing has been updated");
                        }).catch(function (err) { return console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    player.sendToCreator = function () {
        player.position = creatorPlayerPos;
        player.heading = creatorPlayerHeading;
        player.dimension = creatorDimension;
        player.usingCreator = true;
        player.changedGender = false;
        player.call("toggleCreator", [true, JSON.stringify(player.customCharacter)]);
        creatorDimension++;
    };
    player.sendToWorld = function () {
        player.usingCreator = false;
        player.changedGender = false;
        player.call("toggleCreator", [false]);
        player.call('toggleUI', [true]);
        player.spawn();
        //server.auth.spawnPlayer(player);
    };
});
mp.events.add("creator_GenderChange", function (player, gender) {
    player.model = freemodeCharacters[gender];
    player.position = creatorPlayerPos;
    player.heading = creatorPlayerHeading;
    player.changedGender = true;
});
mp.events.add("creator_Save", function (player, gender, parentData, featureData, appearanceData, hairAndColorData) {
    player.customCharacter.Gender = gender;
    player.customCharacter.Parents = JSON.parse(parentData);
    player.customCharacter.Features = JSON.parse(featureData);
    player.customCharacter.Appearance = JSON.parse(appearanceData);
    var hairAndColors = JSON.parse(hairAndColorData);
    //test
    var custom = "test";
    console.log(custom);
    player.customCharacter.Hair = { Hair: hairAndColors[0], Color: hairAndColors[1], HighlightColor: hairAndColors[2] };
    player.customCharacter.EyebrowColor = hairAndColors[3];
    player.customCharacter.BeardColor = hairAndColors[4];
    player.customCharacter.EyeColor = hairAndColors[5];
    player.customCharacter.BlushColor = hairAndColors[6];
    player.customCharacter.LipstickColor = hairAndColors[7];
    player.customCharacter.ChestHairColor = hairAndColors[8];
    player.saveCharacter();
    player.applyCharacter();
    player.sendToWorld();
});
mp.events.add("creator_Leave", function (player) {
    if (player.changedGender)
        player.loadCharacter(); // revert back to last save if gender is changed
    player.applyCharacter();
    player.sendToWorld();
});
