"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
console.log("Camera initialization!");
mp.events.addCommand('savecam', function (player, name) {
    if (name === void 0) { name = 'No name'; }
    player.call('getCamCoords', [name]);
});
var saveFile = 'savedposcam.txt';
mp.events.add('saveCamCoords', function (player, position, pointAtCoord, name) {
    if (name === void 0) { name = 'No name'; }
    var pos = JSON.parse(position);
    var point = JSON.parse(pointAtCoord);
    console.log(position);
    console.log(pointAtCoord);
    fs_1.default.appendFile(saveFile, "Position: " + pos.x + ", " + pos.y + ", " + pos.z + " | pointAtCoord: " + point.position.x + ", " + point.position.y + ", " + point.position.z + " | entity: " + point.entity + " - " + name + "\r\n", function (err) {
        if (err) {
            player.notify("~r~SaveCamPos Error: ~w~" + err.message);
        }
        else {
            player.notify("~g~PositionCam saved. ~w~(" + name + ")");
        }
    });
});
