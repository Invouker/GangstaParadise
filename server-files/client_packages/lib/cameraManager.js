"use strict";
var CamerasManagerInfo = {
    gameplayCamera: null,
    activeCamera: null,
    interpCamera: null,
    interpActive: false,
    _events: new Map(),
    cameras: new Map([
        ['testCamera', mp.cameras.new('default', new mp.Vector3(), new mp.Vector3(), 50.0)],
    ])
};
mp.events.add('render', function () {
    if (CamerasManagerInfo.interpCamera && CamerasManager.doesExist(CamerasManagerInfo.interpCamera) && !CamerasManagerInfo.activeCamera.isInterpolating()) {
        CamerasManager.fireEvent('stopInterp', CamerasManagerInfo.activeCamera);
        CamerasManagerInfo.interpCamera.setActive(false);
        CamerasManagerInfo.interpCamera.destroy();
        CamerasManagerInfo.interpCamera = null;
    }
});
var cameraSerialize = function (camera) {
    camera.setActiveCamera = function (toggle) {
        CamerasManager.setActiveCamera(camera, toggle);
    };
    camera.setActiveCameraWithInterp = function (position, rotation, duration, easeLocation, easeRotation) {
        CamerasManager.setActiveCameraWithInterp(camera, position, rotation, duration, easeLocation, easeRotation);
    };
};
var CamerasManager = /** @class */ (function () {
    function CamerasManager() {
    }
    CamerasManager.on = function (eventName, eventFunction) {
        if (CamerasManagerInfo._events.has(eventName)) {
            var event_1 = CamerasManagerInfo._events.get(eventName);
            if (!event_1.has(eventFunction)) {
                event_1.add(eventFunction);
            }
        }
        else {
            CamerasManagerInfo._events.set(eventName, new Set([eventFunction]));
        }
    };
    CamerasManager.fireEvent = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (CamerasManagerInfo._events.has(eventName)) {
            var event_2 = CamerasManagerInfo._events.get(eventName);
            event_2.forEach(function (eventFunction) {
                eventFunction.apply(void 0, args);
            });
        }
    };
    CamerasManager.getCamera = function (name) {
        var camera = CamerasManagerInfo.cameras.get(name);
        if (typeof camera.setActiveCamera !== 'function') {
            cameraSerialize(camera);
        }
        return camera;
    };
    CamerasManager.setCamera = function (name, camera) {
        CamerasManagerInfo.cameras.set(name, camera);
    };
    CamerasManager.hasCamera = function (name) {
        return CamerasManagerInfo.cameras.has(name);
    };
    CamerasManager.destroyCamera = function (camera) {
        if (this.doesExist(camera)) {
            if (camera === this.activeCamera) {
                this.activeCamera.setActive(false);
            }
            camera.destroy();
        }
    };
    CamerasManager.createCamera = function (name, type, position, rotation, fov) {
        var cam = mp.cameras.new(type, position, rotation, fov);
        cameraSerialize(cam);
        CamerasManagerInfo.cameras.set(name, cam);
        return cam;
    };
    CamerasManager.setActiveCamera = function (activeCamera, toggle) {
        if (!toggle) {
            if (this.doesExist(CamerasManagerInfo.activeCamera)) {
                CamerasManagerInfo.activeCamera = null;
                activeCamera.setActive(false);
                mp.game.cam.renderScriptCams(false, false, 0, false, false);
            }
            if (this.doesExist(CamerasManagerInfo.interpCamera)) {
                CamerasManagerInfo.interpCamera.setActive(false);
                CamerasManagerInfo.interpCamera.destroy();
                CamerasManagerInfo.interpCamera = null;
            }
        }
        else {
            if (this.doesExist(CamerasManagerInfo.activeCamera)) {
                CamerasManagerInfo.activeCamera.setActive(false);
            }
            CamerasManagerInfo.activeCamera = activeCamera;
            activeCamera.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, false, false);
        }
    };
    CamerasManager.setActiveCameraWithInterp = function (activeCamera, position, rotation, duration, easeLocation, easeRotation) {
        if (this.doesExist(CamerasManagerInfo.activeCamera)) {
            CamerasManagerInfo.activeCamera.setActive(false);
        }
        if (this.doesExist(CamerasManagerInfo.interpCamera)) {
            CamerasManager.fireEvent('stopInterp', CamerasManagerInfo.interpCamera);
            CamerasManagerInfo.interpCamera.setActive(false);
            CamerasManagerInfo.interpCamera.destroy();
            CamerasManagerInfo.interpCamera = null;
        }
        var interpCamera = mp.cameras.new('default', activeCamera.getCoord(), activeCamera.getRot(2), activeCamera.getFov());
        activeCamera.setCoord(position.x, position.y, position.z);
        activeCamera.setRot(rotation.x, rotation.y, rotation.z, 2);
        activeCamera.stopPointing();
        CamerasManagerInfo.activeCamera = activeCamera;
        CamerasManagerInfo.interpCamera = interpCamera;
        activeCamera.setActiveWithInterp(interpCamera.handle, duration, easeLocation, easeRotation);
        mp.game.cam.renderScriptCams(true, false, 0, false, false);
        CamerasManager.fireEvent('startInterp', CamerasManagerInfo.interpCamera);
    };
    CamerasManager.doesExist = function (camera) {
        return mp.cameras.exists(camera) && camera.doesExist();
    };
    Object.defineProperty(CamerasManager, "activeCamera", {
        get: function () {
            return CamerasManagerInfo.activeCamera;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CamerasManager, "gameplayCam", {
        get: function () {
            if (!CamerasManagerInfo.gameplayCamera) {
                CamerasManagerInfo.gameplayCamera = mp.cameras.new("gameplay");
            }
            return CamerasManagerInfo.gameplayCamera;
        },
        enumerable: false,
        configurable: true
    });
    return CamerasManager;
}());
var proxyHandler = {
    get: function (target, name, receiver) { return typeof CamerasManager[name] !== 'undefined' ? CamerasManager[name] : CamerasManagerInfo.cameras.get(name); }
};
exports = new Proxy({}, proxyHandler);
