"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BadgeStyle_1 = __importDefault(require("../enums/BadgeStyle"));
var Font_1 = __importDefault(require("../enums/Font"));
var ResRectangle_1 = __importDefault(require("../modules/ResRectangle"));
var ResText_1 = __importStar(require("../modules/ResText"));
var Sprite_1 = __importDefault(require("../modules/Sprite"));
var Color_1 = __importDefault(require("../utils/Color"));
var Point_1 = __importDefault(require("../utils/Point"));
var Size_1 = __importDefault(require("../utils/Size"));
var UUIDV4_1 = __importDefault(require("../utils/UUIDV4"));
var UIMenuItem = /** @class */ (function () {
    function UIMenuItem(text, description, data) {
        if (description === void 0) { description = ''; }
        if (data === void 0) { data = null; }
        this.Id = UUIDV4_1.default();
        this.BackColor = UIMenuItem.DefaultBackColor;
        this.HighlightedBackColor = UIMenuItem.DefaultHighlightedBackColor;
        this.ForeColor = UIMenuItem.DefaultForeColor;
        this.HighlightedForeColor = UIMenuItem.DefaultHighlightedForeColor;
        this.RightLabel = '';
        this.LeftBadge = BadgeStyle_1.default.None;
        this.RightBadge = BadgeStyle_1.default.None;
        this.Enabled = true;
        this.Data = data;
        this._rectangle = new ResRectangle_1.default(new Point_1.default(0, 0), new Size_1.default(431, 38), new Color_1.default(150, 0, 0, 0));
        this._text = new ResText_1.default(text, new Point_1.default(8, 0), 0.33, Color_1.default.WhiteSmoke, Font_1.default.ChaletLondon, ResText_1.Alignment.Left);
        this.Description = description;
        this._selectedSprite = new Sprite_1.default("commonmenu", "gradient_nav", new Point_1.default(0, 0), new Size_1.default(431, 38));
        this._badgeLeft = new Sprite_1.default("commonmenu", "", new Point_1.default(0, 0), new Size_1.default(40, 40));
        this._badgeRight = new Sprite_1.default("commonmenu", "", new Point_1.default(0, 0), new Size_1.default(40, 40));
        this._labelText = new ResText_1.default("", new Point_1.default(0, 0), 0.35, Color_1.default.White, 0, ResText_1.Alignment.Right);
    }
    Object.defineProperty(UIMenuItem.prototype, "Text", {
        get: function () {
            return this._text.caption;
        },
        set: function (text) {
            this._text.caption = text;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIMenuItem.prototype, "Description", {
        get: function () {
            return this._description;
        },
        set: function (text) {
            this._description = text;
            if (this.hasOwnProperty('Parent')) {
                this.Parent.UpdateDescriptionCaption();
            }
        },
        enumerable: false,
        configurable: true
    });
    UIMenuItem.prototype.SetVerticalPosition = function (y) {
        this._rectangle.pos = new Point_1.default(this.Offset.X, y + 144 + this.Offset.Y);
        this._selectedSprite.pos = new Point_1.default(0 + this.Offset.X, y + 144 + this.Offset.Y);
        this._text.pos = new Point_1.default(8 + this.Offset.X, y + 147 + this.Offset.Y);
        this._badgeLeft.pos = new Point_1.default(0 + this.Offset.X, y + 142 + this.Offset.Y);
        this._badgeRight.pos = new Point_1.default(385 + this.Offset.X, y + 142 + this.Offset.Y);
        this._labelText.pos = new Point_1.default(420 + this.Offset.X, y + 148 + this.Offset.Y);
    };
    UIMenuItem.prototype.addEvent = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._event = { event: event, args: args };
    };
    UIMenuItem.prototype.fireEvent = function () {
        var _a;
        if (this._event) {
            (_a = mp.events).call.apply(_a, __spreadArray([this._event.event, this], this._event.args));
        }
    };
    UIMenuItem.prototype.Draw = function () {
        this._rectangle.size = new Size_1.default(431 + this.Parent.WidthOffset, 38);
        this._selectedSprite.size = new Size_1.default(431 + this.Parent.WidthOffset, 38);
        if (this.Hovered && !this.Selected) {
            this._rectangle.color = new Color_1.default(255, 255, 255, 20);
            this._rectangle.Draw();
        }
        this._selectedSprite.color = this.Selected
            ? this.HighlightedBackColor
            : this.BackColor;
        this._selectedSprite.Draw();
        this._text.color = this.Enabled
            ? this.Selected
                ? this.HighlightedForeColor
                : this.ForeColor
            : new Color_1.default(163, 159, 148);
        if (this.LeftBadge != BadgeStyle_1.default.None) {
            this._text.pos = new Point_1.default(35 + this.Offset.X, this._text.pos.Y);
            this._badgeLeft.TextureDict = this.BadgeToSpriteLib(this.LeftBadge);
            this._badgeLeft.TextureName = this.BadgeToSpriteName(this.LeftBadge, this.Selected);
            this._badgeLeft.color = this.IsBagdeWhiteSprite(this.LeftBadge)
                ? this.Enabled
                    ? this.Selected
                        ? this.HighlightedForeColor
                        : this.ForeColor
                    : new Color_1.default(163, 159, 148)
                : Color_1.default.White;
            this._badgeLeft.Draw();
        }
        else {
            this._text.pos = new Point_1.default(8 + this.Offset.X, this._text.pos.Y);
        }
        if (this.RightBadge != BadgeStyle_1.default.None) {
            this._badgeRight.pos = new Point_1.default(385 + this.Offset.X + this.Parent.WidthOffset, this._badgeRight.pos.Y);
            this._badgeRight.TextureDict = this.BadgeToSpriteLib(this.RightBadge);
            this._badgeRight.TextureName = this.BadgeToSpriteName(this.RightBadge, this.Selected);
            this._badgeRight.color = this.IsBagdeWhiteSprite(this.RightBadge)
                ? this.Enabled
                    ? this.Selected
                        ? this.HighlightedForeColor
                        : this.ForeColor
                    : new Color_1.default(163, 159, 148)
                : Color_1.default.White;
            this._badgeRight.Draw();
        }
        if (this.RightLabel && this.RightLabel !== "") {
            this._labelText.pos = new Point_1.default(420 + this.Offset.X + this.Parent.WidthOffset, this._labelText.pos.Y);
            this._labelText.caption = this.RightLabel;
            this._labelText.color = this._text.color = this.Enabled
                ? this.Selected
                    ? this.HighlightedForeColor
                    : this.ForeColor
                : new Color_1.default(163, 159, 148);
            this._labelText.Draw();
        }
        this._text.Draw();
    };
    UIMenuItem.prototype.SetLeftBadge = function (badge) {
        this.LeftBadge = badge;
    };
    UIMenuItem.prototype.SetRightBadge = function (badge) {
        this.RightBadge = badge;
    };
    UIMenuItem.prototype.SetRightLabel = function (text) {
        this.RightLabel = text;
    };
    UIMenuItem.prototype.BadgeToSpriteLib = function (badge) {
        switch (badge) {
            case BadgeStyle_1.default.Sale:
                return "mpshopsale";
            case BadgeStyle_1.default.Audio1:
            case BadgeStyle_1.default.Audio2:
            case BadgeStyle_1.default.Audio3:
            case BadgeStyle_1.default.AudioInactive:
            case BadgeStyle_1.default.AudioMute:
                return "mpleaderboard";
            default:
                return "commonmenu";
        }
    };
    UIMenuItem.prototype.BadgeToSpriteName = function (badge, selected) {
        switch (badge) {
            case BadgeStyle_1.default.None:
                return "";
            case BadgeStyle_1.default.BronzeMedal:
                return "mp_medal_bronze";
            case BadgeStyle_1.default.GoldMedal:
                return "mp_medal_gold";
            case BadgeStyle_1.default.SilverMedal:
                return "medal_silver";
            case BadgeStyle_1.default.Alert:
                return "mp_alerttriangle";
            case BadgeStyle_1.default.Crown:
                return "mp_hostcrown";
            case BadgeStyle_1.default.Ammo:
                return selected ? "shop_ammo_icon_b" : "shop_ammo_icon_a";
            case BadgeStyle_1.default.Armour:
                return selected ? "shop_armour_icon_b" : "shop_armour_icon_a";
            case BadgeStyle_1.default.Barber:
                return selected ? "shop_barber_icon_b" : "shop_barber_icon_a";
            case BadgeStyle_1.default.Clothes:
                return selected ? "shop_clothing_icon_b" : "shop_clothing_icon_a";
            case BadgeStyle_1.default.Franklin:
                return selected ? "shop_franklin_icon_b" : "shop_franklin_icon_a";
            case BadgeStyle_1.default.Bike:
                return selected ? "shop_garage_bike_icon_b" : "shop_garage_bike_icon_a";
            case BadgeStyle_1.default.Car:
                return selected ? "shop_garage_icon_b" : "shop_garage_icon_a";
            case BadgeStyle_1.default.Gun:
                return selected ? "shop_gunclub_icon_b" : "shop_gunclub_icon_a";
            case BadgeStyle_1.default.Heart:
                return selected ? "shop_health_icon_b" : "shop_health_icon_a";
            case BadgeStyle_1.default.Lock:
                return "shop_lock";
            case BadgeStyle_1.default.Makeup:
                return selected ? "shop_makeup_icon_b" : "shop_makeup_icon_a";
            case BadgeStyle_1.default.Mask:
                return selected ? "shop_mask_icon_b" : "shop_mask_icon_a";
            case BadgeStyle_1.default.Michael:
                return selected ? "shop_michael_icon_b" : "shop_michael_icon_a";
            case BadgeStyle_1.default.Star:
                return "shop_new_star";
            case BadgeStyle_1.default.Tattoo:
                return selected ? "shop_tattoos_icon_b" : "shop_tattoos_icon_a";
            case BadgeStyle_1.default.Tick:
                return "shop_tick_icon";
            case BadgeStyle_1.default.Trevor:
                return selected ? "shop_trevor_icon_b" : "shop_trevor_icon_a";
            case BadgeStyle_1.default.Sale:
                return "saleicon";
            case BadgeStyle_1.default.ArrowLeft:
                return "arrowleft";
            case BadgeStyle_1.default.ArrowRight:
                return "arrowright";
            case BadgeStyle_1.default.Audio1:
                return "leaderboard_audio_1";
            case BadgeStyle_1.default.Audio2:
                return "leaderboard_audio_2";
            case BadgeStyle_1.default.Audio3:
                return "leaderboard_audio_3";
            case BadgeStyle_1.default.AudioInactive:
                return "leaderboard_audio_inactive";
            case BadgeStyle_1.default.AudioMute:
                return "leaderboard_audio_mute";
            default:
                return "";
        }
    };
    UIMenuItem.prototype.IsBagdeWhiteSprite = function (badge) {
        switch (badge) {
            case BadgeStyle_1.default.Lock:
            case BadgeStyle_1.default.Tick:
            case BadgeStyle_1.default.Crown:
                return true;
            default:
                return false;
        }
    };
    UIMenuItem.prototype.BadgeToColor = function (badge, selected) {
        switch (badge) {
            case BadgeStyle_1.default.Lock:
            case BadgeStyle_1.default.Tick:
            case BadgeStyle_1.default.Crown:
                return selected
                    ? new Color_1.default(255, 0, 0, 0)
                    : new Color_1.default(255, 255, 255, 255);
            default:
                return new Color_1.default(255, 255, 255, 255);
        }
    };
    UIMenuItem.DefaultBackColor = Color_1.default.Empty;
    UIMenuItem.DefaultHighlightedBackColor = Color_1.default.White;
    UIMenuItem.DefaultForeColor = Color_1.default.WhiteSmoke;
    UIMenuItem.DefaultHighlightedForeColor = Color_1.default.Black;
    return UIMenuItem;
}());
exports.default = UIMenuItem;
