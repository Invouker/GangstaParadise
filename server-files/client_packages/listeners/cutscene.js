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
var player = mp.players.local;
var finishText = false;
var peds = [];
var jet = null;
var pedplayer = false;
var cutsceneEnded = false;
var welcomeText = false;
var CharacterName = false;
var CharacterGender = 0;
var ServerName = 'SERVERNAME';
mp.events.add("doneCutscene", function () {
    mp.game.audio.triggerMusicEvent("FM_INTRO_DRIVE_END");
    mp.game.invoke("0xD220BDD222AC4A1E");
    mp.gui.cursor.show(false, false);
    player.setAlpha(255);
    player.setInvincible(false);
    // NOTICE
    mp.game.invoke("0xEA1C610A04DB6BBB", pedplayer, false, false);
    // Hide Ped (Deleting Ped crashes Game)
    setTimeout(function () {
        mp.game.cam.doScreenFadeOut(100);
    }, 100);
    mp.events.callRemote("cutsceneEnded");
    mp.events.call("cutsceneEnded");
});
mp.events.add("startWelcomeCutscene", function (gender, name) {
    if (gender === void 0) { gender = 0; }
    if (name === void 0) { name = null; }
    return __awaiter(void 0, void 0, void 0, function () {
        var pedplayer, hash, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (name !== null) {
                        CharacterName = name;
                    }
                    if (gender !== 0) {
                        CharacterGender = gender;
                    }
                    mp.game.cam.doScreenFadeOut(0);
                    //create hud ready for them to spawn
                    mp.gui.cursor.show(false, false);
                    mp.game.time.advanceClockTimeTo(19, 30, 0);
                    mp.game.audio.setAudioFlag("DisableFlightMusic", true);
                    player.clearTasksImmediately();
                    player.position = new mp.Vector3(-1117.778, -1557.625, 3.3819);
                    player.setInvincible(true);
                    mp.game.audio.prepareMusicEvent("FM_INTRO_START");
                    pedplayer = mp.game.invoke("0xEF29A16337FACADB", player.handle, 0, false, false);
                    //Make Player Invisible
                    player.setAlpha(0);
                    mp.game.cam.renderScriptCams(false, false, 0, false, false);
                    mp.game.cutscene.requestCutscene("mp_intro_concat", 1);
                    _a.label = 1;
                case 1:
                    if (!!mp.game.cutscene.hasThisCutsceneLoaded("mp_intro_concat")) return [3 /*break*/, 3];
                    return [4 /*yield*/, mp.game.waitAsync(0)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3:
                    hash = mp.game.joaat("p_cs_mp_jet_01_s");
                    jet = mp.game.object.createObject(hash, -1200, -1490, 142.385, false, true, false);
                    mp.game.invoke("0x3910051CCECDB00C", jet, false);
                    mp.game.invoke("0xEA1C610A04DB6BBB", jet, true, false);
                    // Attach Jet to Cutscene
                    mp.game.cutscene.registerEntityForCutscene(jet, "MP_Plane", 0, 0, 0);
                    if (CharacterGender == 0) {
                        // Remove Female NPC from Cutscene
                        mp.game.cutscene.registerEntityForCutscene(0, "MP_Female_Character", 3, mp.game.joaat("mp_f_freemode_01"), 0);
                        mp.game.cutscene.registerEntityForCutscene(pedplayer, "MP_Male_Character", 0, 0, 0);
                    }
                    else {
                        // Remove Male NPC from Cutscene
                        mp.game.cutscene.registerEntityForCutscene(0, "MP_Male_Character", 3, mp.game.joaat("mp_m_freemode_01"), 0);
                        mp.game.cutscene.registerEntityForCutscene(pedplayer, "MP_Female_Character", 0, 0, 0);
                    }
                    mp.game.invoke("0xEA1C610A04DB6BBB", pedplayer, true, false);
                    for (i = 1; i < 8; i++) {
                        mp.game.cutscene.registerEntityForCutscene(0, "MP_Plane_Passenger_" + i, 3, mp.game.joaat("mp_m_freemode_01"), 0);
                        mp.game.invoke("0x4C61C75BEE8184C2", "MP_Plane_Passenger_" + i, 0, 0);
                    }
                    mp.game.invoke("0xE532F5D78798DAAB", hash);
                    setTimeout(function () {
                        mp.game.cutscene.startCutscene(4);
                        mp.game.invoke("0xBEB2D9A1D9A8F55A", 9, 9, 9, 9);
                        mp.game.cam.doScreenFadeIn(500);
                        mp.game.audio.triggerMusicEvent("FM_INTRO_START");
                    }, 500);
                    setTimeout(function () {
                        mp.game.time.advanceClockTimeTo(23, 30, 0);
                    }, 20000);
                    return [2 /*return*/];
            }
        });
    });
});
mp.events.add("render", function () {
    var time = mp.game.invoke("0xE625BEABBAFFDAB9");
    if (time !== 0 && cutsceneEnded == false) {
        if (time > 26000) {
            cutsceneEnded = true;
            mp.events.call("doneCutscene");
        }
    }
});
