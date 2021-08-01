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
var ItemsCollection_1 = __importDefault(require("../modules/ItemsCollection"));
var ListItem_1 = __importDefault(require("../modules/ListItem"));
var ResText_1 = __importStar(require("../modules/ResText"));
var Sprite_1 = __importDefault(require("../modules/Sprite"));
var Color_1 = __importDefault(require("../utils/Color"));
var Point_1 = __importDefault(require("../utils/Point"));
var Size_1 = __importDefault(require("../utils/Size"));
var Screen_1 = require("../utils/Screen");
var UIMenuItem_1 = __importDefault(require("./UIMenuItem"));
var UIMenuListItem = /** @class */ (function (_super) {
    __extends(UIMenuListItem, _super);
    function UIMenuListItem(text, description, collection, startIndex, data) {
        if (description === void 0) { description = ''; }
        if (collection === void 0) { collection = new ItemsCollection_1.default([]); }
        if (startIndex === void 0) { startIndex = 0; }
        if (data === void 0) { data = null; }
        var _this = _super.call(this, text, description, data) || this;
        _this.ScrollingEnabled = true;
        _this.HoldTimeBeforeScroll = 200;
        _this.currOffset = 0;
        _this.collection = [];
        _this._index = 0;
        var y = 0;
        _this.Collection = collection.getListItems();
        _this.Index = startIndex;
        _this._arrowLeft = new Sprite_1.default("commonmenu", "arrowleft", new Point_1.default(110, 105 + y), new Size_1.default(30, 30));
        _this._arrowRight = new Sprite_1.default("commonmenu", "arrowright", new Point_1.default(280, 105 + y), new Size_1.default(30, 30));
        _this._itemText = new ResText_1.default("", new Point_1.default(290, y + 104), 0.35, Color_1.default.White, Font_1.default.ChaletLondon, ResText_1.Alignment.Right);
        return _this;
    }
    Object.defineProperty(UIMenuListItem.prototype, "Collection", {
        get: function () {
            return this.collection;
        },
        set: function (v) {
            if (!v)
                throw new Error("The collection can't be null");
            this.collection = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIMenuListItem.prototype, "SelectedItem", {
        get: function () {
            return this.Collection.length > 0 ? this.Collection[this.Index] : null;
        },
        set: function (v) {
            var idx = this.Collection.findIndex(function (li) { return li.Id === v.Id; });
            if (idx > 0)
                this.Index = idx;
            else
                this.Index = 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIMenuListItem.prototype, "SelectedValue", {
        get: function () {
            return this.SelectedItem == null
                ? null
                : this.SelectedItem.Data == null
                    ? this.SelectedItem.DisplayText
                    : this.SelectedItem.Data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIMenuListItem.prototype, "Index", {
        get: function () {
            if (this.Collection == null)
                return -1;
            if (this.Collection != null && this.Collection.length == 0)
                return -1;
            return this._index % this.Collection.length;
        },
        set: function (value) {
            if (this.Collection == null)
                return;
            if (this.Collection != null && this.Collection.length == 0)
                return;
            this._index = 100000 - (100000 % this.Collection.length) + value;
            var caption = this.Collection.length >= this.Index
                ? this.Collection[this.Index].DisplayText
                : " ";
            this.currOffset = Screen_1.Screen.GetTextWidth(caption, this._itemText && this._itemText.font ? this._itemText.font : 0, 0.35); // this._itemText && this._itemText.font ? this._itemText.font : 0, this._itemText && this._itemText.scale ? this._itemText.scale : 0.35
        },
        enumerable: false,
        configurable: true
    });
    UIMenuListItem.prototype.setCollection = function (collection) {
        this.Collection = collection.getListItems();
    };
    UIMenuListItem.prototype.setCollectionItem = function (index, item, resetSelection) {
        if (resetSelection === void 0) { resetSelection = true; }
        if (index > this.Collection.length)
            // Placeholder for formatting
            throw new Error("Index out of bounds");
        if (typeof item === "string")
            // Placeholder for formatting
            item = new ListItem_1.default(item);
        this.Collection.splice(index, 1, item);
        if (resetSelection)
            // Placeholder for formatting
            this.Index = 0;
    };
    UIMenuListItem.prototype.SetVerticalPosition = function (y) {
        this._arrowLeft.pos = new Point_1.default(300 + this.Offset.X + this.Parent.WidthOffset, 147 + y + this.Offset.Y);
        this._arrowRight.pos = new Point_1.default(400 + this.Offset.X + this.Parent.WidthOffset, 147 + y + this.Offset.Y);
        this._itemText.pos = new Point_1.default(300 + this.Offset.X + this.Parent.WidthOffset, y + 147 + this.Offset.Y);
        _super.prototype.SetVerticalPosition.call(this, y);
    };
    UIMenuListItem.prototype.SetRightLabel = function (text) {
        return this;
    };
    UIMenuListItem.prototype.SetRightBadge = function (badge) {
        return this;
    };
    UIMenuListItem.prototype.Draw = function () {
        _super.prototype.Draw.call(this);
        var caption = this.Collection.length >= this.Index
            ? this.Collection[this.Index].DisplayText
            : " ";
        var offset = this.currOffset;
        this._itemText.color = this.Enabled
            ? this.Selected
                ? this.HighlightedForeColor
                : this.ForeColor
            : new Color_1.default(163, 159, 148);
        this._itemText.caption = caption;
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
    return UIMenuListItem;
}(UIMenuItem_1.default));
exports.default = UIMenuListItem;
