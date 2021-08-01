"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Render = void 0;
var Render = /** @class */ (function () {
    function Render(name, shortRange, vector, blipID, width, height, markerID, dimension, markerColor, blipColor, blipDDistance) {
        if (markerColor === void 0) { markerColor = [255, 0, 0, 255]; }
        if (blipColor === void 0) { blipColor = 4; }
        if (blipDDistance === void 0) { blipDDistance = 100; }
        this.name = name;
        this.shortRange = shortRange;
        this.vector = vector;
        this.blipID = blipID;
        this.width = width;
        this.height = height;
        this.markerID = markerID;
        this.dimension = dimension;
        this.blipDDistance = blipDDistance;
        this.markerColor = markerColor;
        this.blipColor = blipColor;
        this.colShape = this.renderColShape();
        this.blip = this.renderBlip();
        this.marker = this.renderMarker();
    }
    ;
    Render.prototype.renderMarker = function () {
        return mp.markers.new(this.markerID, this.vector, this.width, {
            direction: this.vector,
            rotation: new mp.Vector3(0, 0, 0),
            color: [this.markerColor[0], this.markerColor[1], this.markerColor[2], this.markerColor[3]],
            visible: true,
            dimension: this.dimension
        });
    };
    Render.prototype.renderBlip = function () {
        return mp.blips.new(this.blipID, this.vector, {
            name: String(this.name),
            color: this.blipColor,
            drawDistance: this.blipDDistance,
            shortRange: Boolean(this.shortRange),
        });
    };
    Render.prototype.renderColShape = function () {
        return mp.colshapes.newRectangle(this.vector.x, this.vector.y, this.width, this.height);
    };
    Object.defineProperty(Render.prototype, "getColShape", {
        get: function () {
            return this.colShape;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Render.prototype, "getMarker", {
        get: function () {
            return this.marker;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Render.prototype, "getBlip", {
        get: function () {
            return this.blip;
        },
        enumerable: false,
        configurable: true
    });
    return Render;
}());
exports.Render = Render;
