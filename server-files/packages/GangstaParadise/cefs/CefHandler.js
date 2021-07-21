"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CefHandler = void 0;
var cef = require("./lib/cefManager.js");
var CefHandler;
(function (CefHandler) {
    function authCef() { return cef.createCef("cef.auth", 'package://rage/browsers/hud/index.html'); }
    CefHandler.authCef = authCef;
    ;
})(CefHandler = exports.CefHandler || (exports.CefHandler = {}));
