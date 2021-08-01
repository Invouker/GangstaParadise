"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Font_1 = __importDefault(require("../enums/Font"));
var ResText_1 = __importStar(require("../modules/ResText"));
var Sprite_1 = __importDefault(require("../modules/Sprite"));
var Color_1 = __importDefault(require("../utils/Color"));
var Point_1 = __importDefault(require("../utils/Point"));
var Size_1 = __importDefault(require("../utils/Size"));
var Screen_1 = require("../utils/Screen");
var Number_1 = require("../utils/Number");
var UIMenuItem_1 = __importDefault(require("./UIMenuItem"));
var UIMenuDynamicListItem = /** @class */ (function (_super) {
    __extends(UIMenuDynamicListItem, _super);
    function UIMenuDynamicListItem(text, description, lowerThreshold, upperThreshold, startValue, data) {
        if (description === void 0) { description = ''; }
        if (lowerThreshold === void 0) { lowerThreshold = 0; }
        if (upperThreshold === void 0) { upperThreshold = 10; }
        if (startValue === void 0) { startValue = 0; }
        if (data === void 0) { data = null; }
        var _this = _super.call(this, text, description, data) || this;
        _this.ScrollingEnabled = true;
        _this.HoldTimeBeforeScroll = 200;
        _this.currOffset = 0;
        _this._leftMoveThreshold = 1;
        _this._rightMoveThreshold = 1;
        _this._lowerThreshold = 0;
        _this._upperThreshold = 10;
        _this._preText = '';
        var y = 0;
        _this.LowerThreshold = lowerThreshold;
        _this.UpperThreshold = lowerThreshold > upperThreshold ? lowerThreshold : upperThreshold;
        _this.SelectedValue = (startValue < lowerThreshold || startValue > upperThreshold) ? lowerThreshold : startValue;
        _this._arrowLeft = new Sprite_1.default("commonmenu", "arrowleft", new Point_1.default(110, 105 + y), new Size_1.default(30, 30));
        _this._arrowRight = new Sprite_1.default("commonmenu", "arrowright", new Point_1.default(280, 105 + y), new Size_1.default(30, 30));
        _this._itemText = new ResText_1.default('', new Point_1.default(290, y + 104), 0.35, Color_1.default.White, Font_1.default.ChaletLondon, ResText_1.Alignment.Right);
        return _this;
    }
    Object.defineProperty(UIMenuDynamicListItem.prototype, "PreCaptionText", {
        get: function () {
            return this._preText;
        },
        set: function (text) {
            if (typeof text !== 'string')
                throw new Error("The pre caption text must be a string");
            this._preText = text;
            this.currOffset = Screen_1.Screen.GetTextWidth(this.PreCaptionText + this._value.toString(), this._itemText && this._itemText.font ? this._itemText.font : 0, 0.35); // this._itemText && this._itemText.scale ? this._itemText.scale : 0.35
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIMenuDynamicListItem.prototype, "LeftMoveThreshold", {
        get: function () {
            return this._leftMoveThreshold;
        },
        set: function (amt) {
            if (!amt)
                throw new Error("The left threshold can't be null");
            this._leftMoveThreshold = amt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIMenuDynamicListItem.prototype, "RightMoveThreshold", {
        get: function () {
            return this._rightMoveThreshold;
        },
        set: function (amt) {
            if (!amt)
                throw new Error("The right threshold can't be null");
            this._rightMoveThreshold = amt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIMenuDynamicListItem.prototype, "LowerThreshold", {
        get: function () {
            return this._lowerThreshold;
        },
        set: function (amt) {
            if (typeof amt !== 'number' && !amt)
                throw new Error("The lower threshold can't be null");
            this._lowerThreshold = amt;
            if (this.SelectedValue < this._lowerThreshold) {
                this.SelectedValue = this._lowerThreshold;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIMenuDynamicListItem.prototype, "UpperThreshold", {
        get: function () {
            return this._upperThreshold;
        },
        set: function (amt) {
            if (typeof amt !== 'number' && !amt)
                throw new Error("The upper threshold can't be null");
            this._upperThreshold = amt;
            if (this.SelectedValue > this._upperThreshold) {
                this.SelectedValue = this._upperThreshold;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIMenuDynamicListItem.prototype, "SelectedValue", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (value < this._lowerThreshold || value > this._upperThreshold)
                throw new Error("The value can not be outside the lower or upper limits");
            this._value = Number_1.fixFloat(value);
            this.currOffset = Screen_1.Screen.GetTextWidth(this.PreCaptionText + this._value.toString(), this._itemText && this._itemText.font ? this._itemText.font : 0, this._itemText && this._itemText.scale ? this._itemText.scale : 0.35);
        },
        enumerable: false,
        configurable: true
    });
    UIMenuDynamicListItem.prototype.SetVerticalPosition = function (y) {
        this._arrowLeft.pos = new Point_1.default(300 + this.Offset.X + this.Parent.WidthOffset, 147 + y + this.Offset.Y);
        this._arrowRight.pos = new Point_1.default(400 + this.Offset.X + this.Parent.WidthOffset, 147 + y + this.Offset.Y);
        this._itemText.pos = new Point_1.default(300 + this.Offset.X + this.Parent.WidthOffset, y + 147 + this.Offset.Y);
        _super.prototype.SetVerticalPosition.call(this, y);
    };
    UIMenuDynamicListItem.prototype.SetRightLabel = function (text) {
        return this;
    };
    UIMenuDynamicListItem.prototype.SetRightBadge = function (badge) {
        return this;
    };
    UIMenuDynamicListItem.prototype.Draw = function () {
        _super.prototype.Draw.call(this);
        var offset = this.currOffset;
        this._itemText.color = this.Enabled
            ? this.Selected
                ? this.HighlightedForeColor
                : this.ForeColor
            : new Color_1.default(163, 159, 148);
        this._itemText.caption = this.PreCaptionText + this._value.toString();
        this._arrowLeft.color = this.Enabled
            ? this.Selected
                ? this.HighlightedForeColor
                : this.ForeColor
            : new Color_1.default(163, 159, 148);
        this._arrowRight.color = this.Enabled
            ? this.Selected
                ? this.HighlightedForeColor
                : this.ForeColor
            : new Color_1.default(163, 159, 148);
        this._arrowLeft.pos = new Point_1.default(380 - offset + this.Offset.X + this.Parent.WidthOffset, // 375
        this._arrowLeft.pos.Y);
        if (this.Selected) {
            this._arrowLeft.Draw();
            this._arrowRight.Draw();
            this._itemText.pos = new Point_1.default(405 + this.Offset.X + this.Parent.WidthOffset, this._itemText.pos.Y);
        }
        else {
            this._itemText.pos = new Point_1.default(420 + this.Offset.X + this.Parent.WidthOffset, this._itemText.pos.Y);
        }
        this._itemText.Draw();
    };
    return UIMenuDynamicListItem;
}(UIMenuItem_1.default));
exports.default = UIMenuDynamicListItem;
