(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("BackgroundDots", [], factory);
	else if(typeof exports === 'object')
		exports["BackgroundDots"] = factory();
	else
		root["BackgroundDots"] = factory();
})(typeof self !== 'undefined' ? self : window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/konva/lib/Animation.js":
/*!*********************************************!*\
  !*** ./node_modules/konva/lib/Animation.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = __webpack_require__(/*! ./Global */ "./node_modules/konva/lib/Global.js");
var now = (function () {
    if (Global_1.glob.performance && Global_1.glob.performance.now) {
        return function () {
            return Global_1.glob.performance.now();
        };
    }
    return function () {
        return new Date().getTime();
    };
})();
var Animation = (function () {
    function Animation(func, layers) {
        this.id = Animation.animIdCounter++;
        this.frame = {
            time: 0,
            timeDiff: 0,
            lastTime: now(),
            frameRate: 0
        };
        this.func = func;
        this.setLayers(layers);
    }
    Animation.prototype.setLayers = function (layers) {
        var lays = [];
        if (!layers) {
            lays = [];
        }
        else if (layers.length > 0) {
            lays = layers;
        }
        else {
            lays = [layers];
        }
        this.layers = lays;
        return this;
    };
    Animation.prototype.getLayers = function () {
        return this.layers;
    };
    Animation.prototype.addLayer = function (layer) {
        var layers = this.layers, len = layers.length, n;
        for (n = 0; n < len; n++) {
            if (layers[n]._id === layer._id) {
                return false;
            }
        }
        this.layers.push(layer);
        return true;
    };
    Animation.prototype.isRunning = function () {
        var a = Animation, animations = a.animations, len = animations.length, n;
        for (n = 0; n < len; n++) {
            if (animations[n].id === this.id) {
                return true;
            }
        }
        return false;
    };
    Animation.prototype.start = function () {
        this.stop();
        this.frame.timeDiff = 0;
        this.frame.lastTime = now();
        Animation._addAnimation(this);
        return this;
    };
    Animation.prototype.stop = function () {
        Animation._removeAnimation(this);
        return this;
    };
    Animation.prototype._updateFrameObject = function (time) {
        this.frame.timeDiff = time - this.frame.lastTime;
        this.frame.lastTime = time;
        this.frame.time += this.frame.timeDiff;
        this.frame.frameRate = 1000 / this.frame.timeDiff;
    };
    Animation._addAnimation = function (anim) {
        this.animations.push(anim);
        this._handleAnimation();
    };
    Animation._removeAnimation = function (anim) {
        var id = anim.id, animations = this.animations, len = animations.length, n;
        for (n = 0; n < len; n++) {
            if (animations[n].id === id) {
                this.animations.splice(n, 1);
                break;
            }
        }
    };
    Animation._runFrames = function () {
        var layerHash = {}, animations = this.animations, anim, layers, func, n, i, layersLen, layer, key, needRedraw;
        for (n = 0; n < animations.length; n++) {
            anim = animations[n];
            layers = anim.layers;
            func = anim.func;
            anim._updateFrameObject(now());
            layersLen = layers.length;
            if (func) {
                needRedraw = func.call(anim, anim.frame) !== false;
            }
            else {
                needRedraw = true;
            }
            if (!needRedraw) {
                continue;
            }
            for (i = 0; i < layersLen; i++) {
                layer = layers[i];
                if (layer._id !== undefined) {
                    layerHash[layer._id] = layer;
                }
            }
        }
        for (key in layerHash) {
            if (!layerHash.hasOwnProperty(key)) {
                continue;
            }
            layerHash[key].draw();
        }
    };
    Animation._animationLoop = function () {
        var Anim = Animation;
        if (Anim.animations.length) {
            Anim._runFrames();
            requestAnimationFrame(Anim._animationLoop);
        }
        else {
            Anim.animRunning = false;
        }
    };
    Animation._handleAnimation = function () {
        if (!this.animRunning) {
            this.animRunning = true;
            requestAnimationFrame(this._animationLoop);
        }
    };
    Animation.animations = [];
    Animation.animIdCounter = 0;
    Animation.animRunning = false;
    return Animation;
}());
exports.Animation = Animation;


/***/ }),

/***/ "./node_modules/konva/lib/BaseLayer.js":
/*!*********************************************!*\
  !*** ./node_modules/konva/lib/BaseLayer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(/*! ./Util */ "./node_modules/konva/lib/Util.js");
var Container_1 = __webpack_require__(/*! ./Container */ "./node_modules/konva/lib/Container.js");
var Node_1 = __webpack_require__(/*! ./Node */ "./node_modules/konva/lib/Node.js");
var Factory_1 = __webpack_require__(/*! ./Factory */ "./node_modules/konva/lib/Factory.js");
var Canvas_1 = __webpack_require__(/*! ./Canvas */ "./node_modules/konva/lib/Canvas.js");
var BaseLayer = (function (_super) {
    __extends(BaseLayer, _super);
    function BaseLayer(config) {
        var _this = _super.call(this, config) || this;
        _this.canvas = new Canvas_1.SceneCanvas();
        _this._waitingForDraw = false;
        _this.on('visibleChange', _this._checkVisibility);
        _this._checkVisibility();
        return _this;
    }
    BaseLayer.prototype.createPNGStream = function () {
        var c = this.canvas._canvas;
        return c.createPNGStream();
    };
    BaseLayer.prototype.getCanvas = function () {
        return this.canvas;
    };
    BaseLayer.prototype.getHitCanvas = function () {
        return this.hitCanvas;
    };
    BaseLayer.prototype.getContext = function () {
        return this.getCanvas().getContext();
    };
    BaseLayer.prototype.clear = function (bounds) {
        this.getContext().clear(bounds);
        return this;
    };
    BaseLayer.prototype.setZIndex = function (index) {
        _super.prototype.setZIndex.call(this, index);
        var stage = this.getStage();
        if (stage) {
            stage.content.removeChild(this.getCanvas()._canvas);
            if (index < stage.getChildren().length - 1) {
                stage.content.insertBefore(this.getCanvas()._canvas, stage.getChildren()[index + 1].getCanvas()._canvas);
            }
            else {
                stage.content.appendChild(this.getCanvas()._canvas);
            }
        }
        return this;
    };
    BaseLayer.prototype.moveToTop = function () {
        Node_1.Node.prototype.moveToTop.call(this);
        var stage = this.getStage();
        if (stage) {
            stage.content.removeChild(this.getCanvas()._canvas);
            stage.content.appendChild(this.getCanvas()._canvas);
        }
        return true;
    };
    BaseLayer.prototype.moveUp = function () {
        var moved = Node_1.Node.prototype.moveUp.call(this);
        if (!moved) {
            return false;
        }
        var stage = this.getStage();
        if (!stage) {
            return false;
        }
        stage.content.removeChild(this.getCanvas()._canvas);
        if (this.index < stage.getChildren().length - 1) {
            stage.content.insertBefore(this.getCanvas()._canvas, stage.getChildren()[this.index + 1].getCanvas()._canvas);
        }
        else {
            stage.content.appendChild(this.getCanvas()._canvas);
        }
        return true;
    };
    BaseLayer.prototype.moveDown = function () {
        if (Node_1.Node.prototype.moveDown.call(this)) {
            var stage = this.getStage();
            if (stage) {
                var children = stage.getChildren();
                stage.content.removeChild(this.getCanvas()._canvas);
                stage.content.insertBefore(this.getCanvas()._canvas, children[this.index + 1].getCanvas()._canvas);
            }
            return true;
        }
        return false;
    };
    BaseLayer.prototype.moveToBottom = function () {
        if (Node_1.Node.prototype.moveToBottom.call(this)) {
            var stage = this.getStage();
            if (stage) {
                var children = stage.getChildren();
                stage.content.removeChild(this.getCanvas()._canvas);
                stage.content.insertBefore(this.getCanvas()._canvas, children[1].getCanvas()._canvas);
            }
            return true;
        }
        return false;
    };
    BaseLayer.prototype.getLayer = function () {
        return this;
    };
    BaseLayer.prototype.remove = function () {
        var _canvas = this.getCanvas()._canvas;
        Node_1.Node.prototype.remove.call(this);
        if (_canvas && _canvas.parentNode && Util_1.Util._isInDocument(_canvas)) {
            _canvas.parentNode.removeChild(_canvas);
        }
        return this;
    };
    BaseLayer.prototype.getStage = function () {
        return this.parent;
    };
    BaseLayer.prototype.setSize = function (_a) {
        var width = _a.width, height = _a.height;
        this.canvas.setSize(width, height);
        return this;
    };
    BaseLayer.prototype._toKonvaCanvas = function (config) {
        config = config || {};
        config.width = config.width || this.getWidth();
        config.height = config.height || this.getHeight();
        config.x = config.x !== undefined ? config.x : this.x();
        config.y = config.y !== undefined ? config.y : this.y();
        return Node_1.Node.prototype._toKonvaCanvas.call(this, config);
    };
    BaseLayer.prototype._checkVisibility = function () {
        var visible = this.visible();
        if (visible) {
            this.canvas._canvas.style.display = 'block';
        }
        else {
            this.canvas._canvas.style.display = 'none';
        }
    };
    BaseLayer.prototype.getWidth = function () {
        if (this.parent) {
            return this.parent.width();
        }
    };
    BaseLayer.prototype.setWidth = function () {
        Util_1.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.');
    };
    BaseLayer.prototype.getHeight = function () {
        if (this.parent) {
            return this.parent.height();
        }
    };
    BaseLayer.prototype.setHeight = function () {
        Util_1.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.');
    };
    BaseLayer.prototype.getIntersection = function (pos, selector) {
        return null;
    };
    BaseLayer.prototype.batchDraw = function () {
        var _this = this;
        if (!this._waitingForDraw) {
            this._waitingForDraw = true;
            Util_1.Util.requestAnimFrame(function () {
                _this.draw();
                _this._waitingForDraw = false;
            });
        }
        return this;
    };
    BaseLayer.prototype._applyTransform = function (shape, context, top) {
        var m = shape.getAbsoluteTransform(top).getMatrix();
        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
    };
    return BaseLayer;
}(Container_1.Container));
exports.BaseLayer = BaseLayer;
BaseLayer.prototype.nodeType = 'BaseLayer';
Factory_1.Factory.addGetterSetter(BaseLayer, 'clearBeforeDraw', true);
Util_1.Collection.mapMethods(BaseLayer);


/***/ }),

/***/ "./node_modules/konva/lib/Canvas.js":
/*!******************************************!*\
  !*** ./node_modules/konva/lib/Canvas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(/*! ./Util */ "./node_modules/konva/lib/Util.js");
var Context_1 = __webpack_require__(/*! ./Context */ "./node_modules/konva/lib/Context.js");
var Global_1 = __webpack_require__(/*! ./Global */ "./node_modules/konva/lib/Global.js");
var Factory_1 = __webpack_require__(/*! ./Factory */ "./node_modules/konva/lib/Factory.js");
var Validators_1 = __webpack_require__(/*! ./Validators */ "./node_modules/konva/lib/Validators.js");
var _pixelRatio;
function getDevicePixelRatio() {
    if (_pixelRatio) {
        return _pixelRatio;
    }
    var canvas = Util_1.Util.createCanvasElement();
    var context = canvas.getContext('2d');
    _pixelRatio = (function () {
        var devicePixelRatio = Global_1.glob.window.devicePixelRatio || 1, backingStoreRatio = context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio ||
            1;
        return devicePixelRatio / backingStoreRatio;
    })();
    return _pixelRatio;
}
var Canvas = (function () {
    function Canvas(config) {
        this.pixelRatio = 1;
        this.width = 0;
        this.height = 0;
        this.isCache = false;
        var conf = config || {};
        var pixelRatio = conf.pixelRatio || Global_1.Konva.pixelRatio || getDevicePixelRatio();
        this.pixelRatio = pixelRatio;
        this._canvas = Util_1.Util.createCanvasElement();
        this._canvas.style.padding = '0';
        this._canvas.style.margin = '0';
        this._canvas.style.border = '0';
        this._canvas.style.background = 'transparent';
        this._canvas.style.position = 'absolute';
        this._canvas.style.top = '0';
        this._canvas.style.left = '0';
    }
    Canvas.prototype.getContext = function () {
        return this.context;
    };
    Canvas.prototype.getPixelRatio = function () {
        return this.pixelRatio;
    };
    Canvas.prototype.setPixelRatio = function (pixelRatio) {
        var previousRatio = this.pixelRatio;
        this.pixelRatio = pixelRatio;
        this.setSize(this.getWidth() / previousRatio, this.getHeight() / previousRatio);
    };
    Canvas.prototype.setWidth = function (width) {
        this.width = this._canvas.width = width * this.pixelRatio;
        this._canvas.style.width = width + 'px';
        var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
        _context.scale(pixelRatio, pixelRatio);
    };
    Canvas.prototype.setHeight = function (height) {
        this.height = this._canvas.height = height * this.pixelRatio;
        this._canvas.style.height = height + 'px';
        var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
        _context.scale(pixelRatio, pixelRatio);
    };
    Canvas.prototype.getWidth = function () {
        return this.width;
    };
    Canvas.prototype.getHeight = function () {
        return this.height;
    };
    Canvas.prototype.setSize = function (width, height) {
        this.setWidth(width);
        this.setHeight(height);
    };
    Canvas.prototype.toDataURL = function (mimeType, quality) {
        try {
            return this._canvas.toDataURL(mimeType, quality);
        }
        catch (e) {
            try {
                return this._canvas.toDataURL();
            }
            catch (err) {
                Util_1.Util.error('Unable to get data URL. ' + err.message);
                return '';
            }
        }
    };
    return Canvas;
}());
exports.Canvas = Canvas;
Factory_1.Factory.addGetterSetter(Canvas, 'pixelRatio', undefined, Validators_1.getNumberValidator());
var SceneCanvas = (function (_super) {
    __extends(SceneCanvas, _super);
    function SceneCanvas(config) {
        if (config === void 0) { config = { width: 0, height: 0 }; }
        var _this = _super.call(this, config) || this;
        _this.context = new Context_1.SceneContext(_this);
        _this.setSize(config.width, config.height);
        return _this;
    }
    return SceneCanvas;
}(Canvas));
exports.SceneCanvas = SceneCanvas;
var HitCanvas = (function (_super) {
    __extends(HitCanvas, _super);
    function HitCanvas(config) {
        if (config === void 0) { config = { width: 0, height: 0 }; }
        var _this = _super.call(this, config) || this;
        _this.hitCanvas = true;
        _this.context = new Context_1.HitContext(_this);
        _this.setSize(config.width, config.height);
        return _this;
    }
    return HitCanvas;
}(Canvas));
exports.HitCanvas = HitCanvas;


/***/ }),

/***/ "./node_modules/konva/lib/Container.js":
/*!*********************************************!*\
  !*** ./node_modules/konva/lib/Container.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(/*! ./Util */ "./node_modules/konva/lib/Util.js");
var Factory_1 = __webpack_require__(/*! ./Factory */ "./node_modules/konva/lib/Factory.js");
var Node_1 = __webpack_require__(/*! ./Node */ "./node_modules/konva/lib/Node.js");
var DragAndDrop_1 = __webpack_require__(/*! ./DragAndDrop */ "./node_modules/konva/lib/DragAndDrop.js");
var Validators_1 = __webpack_require__(/*! ./Validators */ "./node_modules/konva/lib/Validators.js");
var Container = (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = new Util_1.Collection();
        return _this;
    }
    Container.prototype.getChildren = function (filterFunc) {
        if (!filterFunc) {
            return this.children;
        }
        var results = new Util_1.Collection();
        this.children.each(function (child) {
            if (filterFunc(child)) {
                results.push(child);
            }
        });
        return results;
    };
    Container.prototype.hasChildren = function () {
        return this.getChildren().length > 0;
    };
    Container.prototype.removeChildren = function () {
        var child;
        for (var i = 0; i < this.children.length; i++) {
            child = this.children[i];
            child.parent = null;
            child.index = 0;
            child.remove();
        }
        this.children = new Util_1.Collection();
        return this;
    };
    Container.prototype.destroyChildren = function () {
        var child;
        for (var i = 0; i < this.children.length; i++) {
            child = this.children[i];
            child.parent = null;
            child.index = 0;
            child.destroy();
        }
        this.children = new Util_1.Collection();
        return this;
    };
    Container.prototype.add = function (child) {
        if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }
            return this;
        }
        if (child.getParent()) {
            child.moveTo(this);
            return this;
        }
        var children = this.children;
        this._validateAdd(child);
        child.index = children.length;
        child.parent = this;
        children.push(child);
        this._fire('add', {
            child: child
        });
        if (child.isDragging()) {
            DragAndDrop_1.DD.anim.setLayers(child.getLayer());
        }
        return this;
    };
    Container.prototype.destroy = function () {
        if (this.hasChildren()) {
            this.destroyChildren();
        }
        _super.prototype.destroy.call(this);
        return this;
    };
    Container.prototype.find = function (selector) {
        return this._generalFind(selector, false);
    };
    Container.prototype.get = function (selector) {
        Util_1.Util.warn('collection.get() method is deprecated. Please use collection.find() instead.');
        return this.find(selector);
    };
    Container.prototype.findOne = function (selector) {
        var result = this._generalFind(selector, true);
        return result.length > 0 ? result[0] : undefined;
    };
    Container.prototype._generalFind = function (selector, findOne) {
        var retArr = [];
        this._descendants(function (node) {
            var valid = node._isMatch(selector);
            if (valid) {
                retArr.push(node);
            }
            if (valid && findOne) {
                return true;
            }
            return false;
        });
        return Util_1.Collection.toCollection(retArr);
    };
    Container.prototype._descendants = function (fn) {
        var shouldStop = false;
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            shouldStop = fn(child);
            if (shouldStop) {
                return true;
            }
            if (!child.hasChildren()) {
                continue;
            }
            shouldStop = child._descendants(fn);
            if (shouldStop) {
                return true;
            }
        }
        return false;
    };
    Container.prototype.toObject = function () {
        var obj = Node_1.Node.prototype.toObject.call(this);
        obj.children = [];
        var children = this.getChildren();
        var len = children.length;
        for (var n = 0; n < len; n++) {
            var child = children[n];
            obj.children.push(child.toObject());
        }
        return obj;
    };
    Container.prototype._getDescendants = function (arr) {
        var retArr = [];
        var len = arr.length;
        for (var n = 0; n < len; n++) {
            var node = arr[n];
            if (this.isAncestorOf(node)) {
                retArr.push(node);
            }
        }
        return retArr;
    };
    Container.prototype.isAncestorOf = function (node) {
        var parent = node.getParent();
        while (parent) {
            if (parent._id === this._id) {
                return true;
            }
            parent = parent.getParent();
        }
        return false;
    };
    Container.prototype.clone = function (obj) {
        var node = Node_1.Node.prototype.clone.call(this, obj);
        this.getChildren().each(function (no) {
            node.add(no.clone());
        });
        return node;
    };
    Container.prototype.getAllIntersections = function (pos) {
        var arr = [];
        this.find('Shape').each(function (shape) {
            if (shape.isVisible() && shape.intersects(pos)) {
                arr.push(shape);
            }
        });
        return arr;
    };
    Container.prototype._setChildrenIndices = function () {
        this.children.each(function (child, n) {
            child.index = n;
        });
    };
    Container.prototype.drawScene = function (can, top, caching) {
        var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas()), context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedSceneCanvas = cachedCanvas && cachedCanvas.scene;
        if (this.isVisible() || caching) {
            if (!caching && cachedSceneCanvas) {
                context.save();
                layer._applyTransform(this, context, top);
                this._drawCachedSceneCanvas(context);
                context.restore();
            }
            else {
                this._drawChildren(canvas, 'drawScene', top, false, caching, caching);
            }
        }
        return this;
    };
    Container.prototype.drawHit = function (can, top, caching) {
        var layer = this.getLayer(), canvas = can || (layer && layer.hitCanvas), context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
        if (this.shouldDrawHit(canvas) || caching) {
            if (!caching && cachedHitCanvas) {
                context.save();
                layer._applyTransform(this, context, top);
                this._drawCachedHitCanvas(context);
                context.restore();
            }
            else {
                this._drawChildren(canvas, 'drawHit', top, false, caching, caching);
            }
        }
        return this;
    };
    Container.prototype._drawChildren = function (canvas, drawMethod, top, caching, skipBuffer, skipComposition) {
        var layer = this.getLayer(), context = canvas && canvas.getContext(), clipWidth = this.clipWidth(), clipHeight = this.clipHeight(), clipFunc = this.clipFunc(), hasClip = (clipWidth && clipHeight) || clipFunc, clipX, clipY;
        if (hasClip && layer) {
            context.save();
            var transform = this.getAbsoluteTransform(top);
            var m = transform.getMatrix();
            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
            context.beginPath();
            if (clipFunc) {
                clipFunc.call(this, context, this);
            }
            else {
                clipX = this.clipX();
                clipY = this.clipY();
                context.rect(clipX, clipY, clipWidth, clipHeight);
            }
            context.clip();
            m = transform
                .copy()
                .invert()
                .getMatrix();
            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        }
        var hasComposition = this.globalCompositeOperation() !== 'source-over' && !skipComposition;
        if (hasComposition && layer) {
            context.save();
            context._applyGlobalCompositeOperation(this);
        }
        this.children.each(function (child) {
            child[drawMethod](canvas, top, caching, skipBuffer);
        });
        if (hasComposition && layer) {
            context.restore();
        }
        if (hasClip && layer) {
            context.restore();
        }
    };
    Container.prototype.shouldDrawHit = function (canvas) {
        var layer = this.getLayer();
        var layerUnderDrag = DragAndDrop_1.DD.isDragging && DragAndDrop_1.DD.anim.getLayers().indexOf(layer) !== -1;
        return ((canvas && canvas.isCache) ||
            (layer && layer.hitGraphEnabled() && this.isVisible() && !layerUnderDrag));
    };
    Container.prototype.getClientRect = function (attrs) {
        attrs = attrs || {};
        var skipTransform = attrs.skipTransform;
        var relativeTo = attrs.relativeTo;
        var minX, minY, maxX, maxY;
        var selfRect = {
            x: Infinity,
            y: Infinity,
            width: 0,
            height: 0
        };
        var that = this;
        this.children.each(function (child) {
            if (!child.visible()) {
                return;
            }
            var rect = child.getClientRect({
                relativeTo: that,
                skipShadow: attrs.skipShadow,
                skipStroke: attrs.skipStroke
            });
            if (rect.width === 0 && rect.height === 0) {
                return;
            }
            if (minX === undefined) {
                minX = rect.x;
                minY = rect.y;
                maxX = rect.x + rect.width;
                maxY = rect.y + rect.height;
            }
            else {
                minX = Math.min(minX, rect.x);
                minY = Math.min(minY, rect.y);
                maxX = Math.max(maxX, rect.x + rect.width);
                maxY = Math.max(maxY, rect.y + rect.height);
            }
        });
        var shapes = this.find('Shape');
        var hasVisible = false;
        for (var i = 0; i < shapes.length; i++) {
            var shape = shapes[i];
            if (shape._isVisible(this)) {
                hasVisible = true;
                break;
            }
        }
        if (hasVisible) {
            selfRect = {
                x: minX,
                y: minY,
                width: maxX - minX,
                height: maxY - minY
            };
        }
        else {
            selfRect = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
        }
        if (!skipTransform) {
            return this._transformedRect(selfRect, relativeTo);
        }
        return selfRect;
    };
    return Container;
}(Node_1.Node));
exports.Container = Container;
Factory_1.Factory.addComponentsGetterSetter(Container, 'clip', [
    'x',
    'y',
    'width',
    'height'
]);
Factory_1.Factory.addGetterSetter(Container, 'clipX', undefined, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Container, 'clipY', undefined, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Container, 'clipWidth', undefined, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Container, 'clipHeight', undefined, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Container, 'clipFunc');
Util_1.Collection.mapMethods(Container);


/***/ }),

/***/ "./node_modules/konva/lib/Context.js":
/*!*******************************************!*\
  !*** ./node_modules/konva/lib/Context.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(/*! ./Util */ "./node_modules/konva/lib/Util.js");
var Global_1 = __webpack_require__(/*! ./Global */ "./node_modules/konva/lib/Global.js");
var COMMA = ',', OPEN_PAREN = '(', CLOSE_PAREN = ')', OPEN_PAREN_BRACKET = '([', CLOSE_BRACKET_PAREN = '])', SEMICOLON = ';', DOUBLE_PAREN = '()', EQUALS = '=', CONTEXT_METHODS = [
    'arc',
    'arcTo',
    'beginPath',
    'bezierCurveTo',
    'clearRect',
    'clip',
    'closePath',
    'createLinearGradient',
    'createPattern',
    'createRadialGradient',
    'drawImage',
    'fill',
    'fillText',
    'getImageData',
    'createImageData',
    'lineTo',
    'moveTo',
    'putImageData',
    'quadraticCurveTo',
    'rect',
    'restore',
    'rotate',
    'save',
    'scale',
    'setLineDash',
    'setTransform',
    'stroke',
    'strokeText',
    'transform',
    'translate'
];
var CONTEXT_PROPERTIES = [
    'fillStyle',
    'strokeStyle',
    'shadowColor',
    'shadowBlur',
    'shadowOffsetX',
    'shadowOffsetY',
    'lineCap',
    'lineDashOffset',
    'lineJoin',
    'lineWidth',
    'miterLimit',
    'font',
    'textAlign',
    'textBaseline',
    'globalAlpha',
    'globalCompositeOperation'
];
var traceArrMax = 100;
var Context = (function () {
    function Context(canvas) {
        this.canvas = canvas;
        this._context = canvas._canvas.getContext('2d');
        if (Global_1.Konva.enableTrace) {
            this.traceArr = [];
            this._enableTrace();
        }
    }
    Context.prototype.fillShape = function (shape) {
        if (shape.getFillEnabled()) {
            this._fill(shape);
        }
    };
    Context.prototype._fill = function (shape) {
    };
    Context.prototype.strokeShape = function (shape) {
        if (shape.getStrokeEnabled()) {
            this._stroke(shape);
        }
    };
    Context.prototype._stroke = function (shape) {
    };
    Context.prototype.fillStrokeShape = function (shape) {
        if (shape.getFillEnabled()) {
            this._fill(shape);
        }
        if (shape.getStrokeEnabled()) {
            this._stroke(shape);
        }
    };
    Context.prototype.getTrace = function (relaxed) {
        var traceArr = this.traceArr, len = traceArr.length, str = '', n, trace, method, args;
        for (n = 0; n < len; n++) {
            trace = traceArr[n];
            method = trace.method;
            if (method) {
                args = trace.args;
                str += method;
                if (relaxed) {
                    str += DOUBLE_PAREN;
                }
                else {
                    if (Util_1.Util._isArray(args[0])) {
                        str += OPEN_PAREN_BRACKET + args.join(COMMA) + CLOSE_BRACKET_PAREN;
                    }
                    else {
                        str += OPEN_PAREN + args.join(COMMA) + CLOSE_PAREN;
                    }
                }
            }
            else {
                str += trace.property;
                if (!relaxed) {
                    str += EQUALS + trace.val;
                }
            }
            str += SEMICOLON;
        }
        return str;
    };
    Context.prototype.clearTrace = function () {
        this.traceArr = [];
    };
    Context.prototype._trace = function (str) {
        var traceArr = this.traceArr, len;
        traceArr.push(str);
        len = traceArr.length;
        if (len >= traceArrMax) {
            traceArr.shift();
        }
    };
    Context.prototype.reset = function () {
        var pixelRatio = this.getCanvas().getPixelRatio();
        this.setTransform(1 * pixelRatio, 0, 0, 1 * pixelRatio, 0, 0);
    };
    Context.prototype.getCanvas = function () {
        return this.canvas;
    };
    Context.prototype.clear = function (bounds) {
        var canvas = this.getCanvas();
        if (bounds) {
            this.clearRect(bounds.x || 0, bounds.y || 0, bounds.width || 0, bounds.height || 0);
        }
        else {
            this.clearRect(0, 0, canvas.getWidth() / canvas.pixelRatio, canvas.getHeight() / canvas.pixelRatio);
        }
    };
    Context.prototype._applyLineCap = function (shape) {
        var lineCap = shape.getLineCap();
        if (lineCap) {
            this.setAttr('lineCap', lineCap);
        }
    };
    Context.prototype._applyOpacity = function (shape) {
        var absOpacity = shape.getAbsoluteOpacity();
        if (absOpacity !== 1) {
            this.setAttr('globalAlpha', absOpacity);
        }
    };
    Context.prototype._applyLineJoin = function (shape) {
        var lineJoin = shape.getLineJoin();
        if (lineJoin) {
            this.setAttr('lineJoin', lineJoin);
        }
    };
    Context.prototype.setAttr = function (attr, val) {
        this._context[attr] = val;
    };
    Context.prototype.arc = function (a0, a1, a2, a3, a4, a5) {
        this._context.arc(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.arcTo = function (a0, a1, a2, a3, a4, a5) {
        this._context.arc(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.beginPath = function () {
        this._context.beginPath();
    };
    Context.prototype.bezierCurveTo = function (a0, a1, a2, a3, a4, a5) {
        this._context.bezierCurveTo(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.clearRect = function (a0, a1, a2, a3) {
        this._context.clearRect(a0, a1, a2, a3);
    };
    Context.prototype.clip = function () {
        this._context.clip();
    };
    Context.prototype.closePath = function () {
        this._context.closePath();
    };
    Context.prototype.createImageData = function (a0, a1) {
        var a = arguments;
        if (a.length === 2) {
            return this._context.createImageData(a0, a1);
        }
        else if (a.length === 1) {
            return this._context.createImageData(a0);
        }
    };
    Context.prototype.createLinearGradient = function (a0, a1, a2, a3) {
        return this._context.createLinearGradient(a0, a1, a2, a3);
    };
    Context.prototype.createPattern = function (a0, a1) {
        return this._context.createPattern(a0, a1);
    };
    Context.prototype.createRadialGradient = function (a0, a1, a2, a3, a4, a5) {
        return this._context.createRadialGradient(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.drawImage = function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        var a = arguments, _context = this._context;
        if (a.length === 3) {
            _context.drawImage(a0, a1, a2);
        }
        else if (a.length === 5) {
            _context.drawImage(a0, a1, a2, a3, a4);
        }
        else if (a.length === 9) {
            _context.drawImage(a0, a1, a2, a3, a4, a5, a6, a7, a8);
        }
    };
    Context.prototype.isPointInPath = function (x, y) {
        return this._context.isPointInPath(x, y);
    };
    Context.prototype.fill = function () {
        this._context.fill();
    };
    Context.prototype.fillRect = function (x, y, width, height) {
        this._context.fillRect(x, y, width, height);
    };
    Context.prototype.strokeRect = function (x, y, width, height) {
        this._context.strokeRect(x, y, width, height);
    };
    Context.prototype.fillText = function (a0, a1, a2) {
        this._context.fillText(a0, a1, a2);
    };
    Context.prototype.measureText = function (text) {
        return this._context.measureText(text);
    };
    Context.prototype.getImageData = function (a0, a1, a2, a3) {
        return this._context.getImageData(a0, a1, a2, a3);
    };
    Context.prototype.lineTo = function (a0, a1) {
        this._context.lineTo(a0, a1);
    };
    Context.prototype.moveTo = function (a0, a1) {
        this._context.moveTo(a0, a1);
    };
    Context.prototype.rect = function (a0, a1, a2, a3) {
        this._context.rect(a0, a1, a2, a3);
    };
    Context.prototype.putImageData = function (a0, a1, a2) {
        this._context.putImageData(a0, a1, a2);
    };
    Context.prototype.quadraticCurveTo = function (a0, a1, a2, a3) {
        this._context.quadraticCurveTo(a0, a1, a2, a3);
    };
    Context.prototype.restore = function () {
        this._context.restore();
    };
    Context.prototype.rotate = function (a0) {
        this._context.rotate(a0);
    };
    Context.prototype.save = function () {
        this._context.save();
    };
    Context.prototype.scale = function (a0, a1) {
        this._context.scale(a0, a1);
    };
    Context.prototype.setLineDash = function (a0) {
        if (this._context.setLineDash) {
            this._context.setLineDash(a0);
        }
        else if ('mozDash' in this._context) {
            this._context['mozDash'] = a0;
        }
        else if ('webkitLineDash' in this._context) {
            this._context['webkitLineDash'] = a0;
        }
    };
    Context.prototype.getLineDash = function () {
        return this._context.getLineDash();
    };
    Context.prototype.setTransform = function (a0, a1, a2, a3, a4, a5) {
        this._context.setTransform(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.stroke = function () {
        this._context.stroke();
    };
    Context.prototype.strokeText = function (a0, a1, a2, a3) {
        this._context.strokeText(a0, a1, a2, a3);
    };
    Context.prototype.transform = function (a0, a1, a2, a3, a4, a5) {
        this._context.transform(a0, a1, a2, a3, a4, a5);
    };
    Context.prototype.translate = function (a0, a1) {
        this._context.translate(a0, a1);
    };
    Context.prototype._enableTrace = function () {
        var that = this, len = CONTEXT_METHODS.length, _simplifyArray = Util_1.Util._simplifyArray, origSetter = this.setAttr, n, args;
        var func = function (methodName) {
            var origMethod = that[methodName], ret;
            that[methodName] = function () {
                args = _simplifyArray(Array.prototype.slice.call(arguments, 0));
                ret = origMethod.apply(that, arguments);
                that._trace({
                    method: methodName,
                    args: args
                });
                return ret;
            };
        };
        for (n = 0; n < len; n++) {
            func(CONTEXT_METHODS[n]);
        }
        that.setAttr = function () {
            origSetter.apply(that, arguments);
            var prop = arguments[0];
            var val = arguments[1];
            if (prop === 'shadowOffsetX' ||
                prop === 'shadowOffsetY' ||
                prop === 'shadowBlur') {
                val = val / this.canvas.getPixelRatio();
            }
            that._trace({
                property: prop,
                val: val
            });
        };
    };
    Context.prototype._applyGlobalCompositeOperation = function (node) {
        var globalCompositeOperation = node.getGlobalCompositeOperation();
        if (globalCompositeOperation !== 'source-over') {
            this.setAttr('globalCompositeOperation', globalCompositeOperation);
        }
    };
    return Context;
}());
exports.Context = Context;
CONTEXT_PROPERTIES.forEach(function (prop) {
    Object.defineProperty(Context.prototype, prop, {
        get: function () {
            return this._context[prop];
        },
        set: function (val) {
            this._context[prop] = val;
        }
    });
});
var SceneContext = (function (_super) {
    __extends(SceneContext, _super);
    function SceneContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneContext.prototype._fillColor = function (shape) {
        var fill = shape.fill();
        this.setAttr('fillStyle', fill);
        shape._fillFunc(this);
    };
    SceneContext.prototype._fillPattern = function (shape) {
        var fillPatternX = shape.getFillPatternX(), fillPatternY = shape.getFillPatternY(), fillPatternScaleX = shape.getFillPatternScaleX(), fillPatternScaleY = shape.getFillPatternScaleY(), fillPatternRotation = Global_1.Konva.getAngle(shape.getFillPatternRotation()), fillPatternOffsetX = shape.getFillPatternOffsetX(), fillPatternOffsetY = shape.getFillPatternOffsetY();
        if (fillPatternX || fillPatternY) {
            this.translate(fillPatternX || 0, fillPatternY || 0);
        }
        if (fillPatternRotation) {
            this.rotate(fillPatternRotation);
        }
        if (fillPatternScaleX || fillPatternScaleY) {
            this.scale(fillPatternScaleX, fillPatternScaleY);
        }
        if (fillPatternOffsetX || fillPatternOffsetY) {
            this.translate(-1 * fillPatternOffsetX, -1 * fillPatternOffsetY);
        }
        this.setAttr('fillStyle', shape._getFillPattern());
        shape._fillFunc(this);
    };
    SceneContext.prototype._fillLinearGradient = function (shape) {
        var grd = shape._getLinearGradient();
        if (grd) {
            this.setAttr('fillStyle', grd);
            shape._fillFunc(this);
        }
    };
    SceneContext.prototype._fillRadialGradient = function (shape) {
        var grd = shape._getRadialGradient();
        if (grd) {
            this.setAttr('fillStyle', grd);
            shape._fillFunc(this);
        }
    };
    SceneContext.prototype._fill = function (shape) {
        var hasColor = shape.fill(), fillPriority = shape.getFillPriority();
        if (hasColor && fillPriority === 'color') {
            this._fillColor(shape);
            return;
        }
        var hasPattern = shape.getFillPatternImage();
        if (hasPattern && fillPriority === 'pattern') {
            this._fillPattern(shape);
            return;
        }
        var hasLinearGradient = shape.getFillLinearGradientColorStops();
        if (hasLinearGradient && fillPriority === 'linear-gradient') {
            this._fillLinearGradient(shape);
            return;
        }
        var hasRadialGradient = shape.getFillRadialGradientColorStops();
        if (hasRadialGradient && fillPriority === 'radial-gradient') {
            this._fillRadialGradient(shape);
            return;
        }
        if (hasColor) {
            this._fillColor(shape);
        }
        else if (hasPattern) {
            this._fillPattern(shape);
        }
        else if (hasLinearGradient) {
            this._fillLinearGradient(shape);
        }
        else if (hasRadialGradient) {
            this._fillRadialGradient(shape);
        }
    };
    SceneContext.prototype._strokeLinearGradient = function (shape) {
        var start = shape.getStrokeLinearGradientStartPoint(), end = shape.getStrokeLinearGradientEndPoint(), colorStops = shape.getStrokeLinearGradientColorStops(), grd = this.createLinearGradient(start.x, start.y, end.x, end.y);
        if (colorStops) {
            for (var n = 0; n < colorStops.length; n += 2) {
                grd.addColorStop(colorStops[n], colorStops[n + 1]);
            }
            this.setAttr('strokeStyle', grd);
        }
    };
    SceneContext.prototype._stroke = function (shape) {
        var dash = shape.dash(), strokeScaleEnabled = shape.getStrokeScaleEnabled();
        if (shape.hasStroke()) {
            if (!strokeScaleEnabled) {
                this.save();
                var pixelRatio = this.getCanvas().getPixelRatio();
                this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            }
            this._applyLineCap(shape);
            if (dash && shape.dashEnabled()) {
                this.setLineDash(dash);
                this.setAttr('lineDashOffset', shape.dashOffset());
            }
            this.setAttr('lineWidth', shape.strokeWidth());
            if (!shape.getShadowForStrokeEnabled()) {
                this.setAttr('shadowColor', 'rgba(0,0,0,0)');
            }
            var hasLinearGradient = shape.getStrokeLinearGradientColorStops();
            if (hasLinearGradient) {
                this._strokeLinearGradient(shape);
            }
            else {
                this.setAttr('strokeStyle', shape.stroke());
            }
            shape._strokeFunc(this);
            if (!strokeScaleEnabled) {
                this.restore();
            }
        }
    };
    SceneContext.prototype._applyShadow = function (shape) {
        var util = Util_1.Util, color = util.get(shape.getShadowRGBA(), 'black'), blur = util.get(shape.getShadowBlur(), 5), offset = util.get(shape.getShadowOffset(), {
            x: 0,
            y: 0
        }), scale = shape.getAbsoluteScale(), ratio = this.canvas.getPixelRatio(), scaleX = scale.x * ratio, scaleY = scale.y * ratio;
        this.setAttr('shadowColor', color);
        this.setAttr('shadowBlur', blur * Math.min(Math.abs(scaleX), Math.abs(scaleY)));
        this.setAttr('shadowOffsetX', offset.x * scaleX);
        this.setAttr('shadowOffsetY', offset.y * scaleY);
    };
    return SceneContext;
}(Context));
exports.SceneContext = SceneContext;
var HitContext = (function (_super) {
    __extends(HitContext, _super);
    function HitContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HitContext.prototype._fill = function (shape) {
        this.save();
        this.setAttr('fillStyle', shape.colorKey);
        shape._fillFuncHit(this);
        this.restore();
    };
    HitContext.prototype._stroke = function (shape) {
        if (shape.hasStroke() && shape.hitStrokeWidth()) {
            var strokeScaleEnabled = shape.getStrokeScaleEnabled();
            if (!strokeScaleEnabled) {
                this.save();
                var pixelRatio = this.getCanvas().getPixelRatio();
                this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            }
            this._applyLineCap(shape);
            var hitStrokeWidth = shape.hitStrokeWidth();
            var strokeWidth = hitStrokeWidth === 'auto' ? shape.strokeWidth() : hitStrokeWidth;
            this.setAttr('lineWidth', strokeWidth);
            this.setAttr('strokeStyle', shape.colorKey);
            shape._strokeFuncHit(this);
            if (!strokeScaleEnabled) {
                this.restore();
            }
        }
    };
    return HitContext;
}(Context));
exports.HitContext = HitContext;


/***/ }),

/***/ "./node_modules/konva/lib/DragAndDrop.js":
/*!***********************************************!*\
  !*** ./node_modules/konva/lib/DragAndDrop.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Animation_1 = __webpack_require__(/*! ./Animation */ "./node_modules/konva/lib/Animation.js");
var Global_1 = __webpack_require__(/*! ./Global */ "./node_modules/konva/lib/Global.js");
exports.DD = {
    startPointerPos: {
        x: 0,
        y: 0
    },
    anim: new Animation_1.Animation(function () {
        var b = this.dirty;
        this.dirty = false;
        return b;
    }),
    isDragging: false,
    justDragged: false,
    offset: {
        x: 0,
        y: 0
    },
    node: null,
    _drag: function (evt) {
        var node = exports.DD.node;
        if (node) {
            if (!exports.DD.isDragging) {
                var pos = node.getStage().getPointerPosition();
                if (!pos) {
                    node.getStage().setPointersPositions(evt);
                    pos = node.getStage().getPointerPosition();
                }
                var dragDistance = node.dragDistance();
                var distance = Math.max(Math.abs(pos.x - exports.DD.startPointerPos.x), Math.abs(pos.y - exports.DD.startPointerPos.y));
                if (distance < dragDistance) {
                    return;
                }
            }
            node.getStage().setPointersPositions(evt);
            if (!exports.DD.isDragging) {
                exports.DD.isDragging = true;
                node.fire('dragstart', {
                    type: 'dragstart',
                    target: node,
                    evt: evt
                }, true);
                if (!node.isDragging()) {
                    return;
                }
            }
            node._setDragPosition(evt);
            node.fire('dragmove', {
                type: 'dragmove',
                target: node,
                evt: evt
            }, true);
        }
    },
    _endDragBefore: function (evt) {
        var node = exports.DD.node;
        if (node) {
            exports.DD.anim.stop();
            if (exports.DD.isDragging) {
                exports.DD.isDragging = false;
                exports.DD.justDragged = true;
                Global_1.Konva.listenClickTap = false;
                if (evt) {
                    evt.dragEndNode = node;
                }
            }
            exports.DD.node = null;
            var drawNode = node.getLayer() || (node instanceof Global_1.Konva['Stage'] && node);
            if (drawNode) {
                drawNode.draw();
            }
        }
    },
    _endDragAfter: function (evt) {
        evt = evt || {};
        var dragEndNode = evt.dragEndNode;
        if (evt && dragEndNode) {
            dragEndNode.fire('dragend', {
                type: 'dragend',
                target: dragEndNode,
                evt: evt
            }, true);
        }
    }
};
if (Global_1.Konva.isBrowser) {
    window.addEventListener('mouseup', exports.DD._endDragBefore, true);
    window.addEventListener('touchend', exports.DD._endDragBefore, true);
    window.addEventListener('mousemove', exports.DD._drag);
    window.addEventListener('touchmove', exports.DD._drag);
    window.addEventListener('mouseup', exports.DD._endDragAfter, false);
    window.addEventListener('touchend', exports.DD._endDragAfter, false);
}


/***/ }),

/***/ "./node_modules/konva/lib/Factory.js":
/*!*******************************************!*\
  !*** ./node_modules/konva/lib/Factory.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(/*! ./Util */ "./node_modules/konva/lib/Util.js");
var Validators_1 = __webpack_require__(/*! ./Validators */ "./node_modules/konva/lib/Validators.js");
var GET = 'get', SET = 'set';
exports.Factory = {
    addGetterSetter: function (constructor, attr, def, validator, after) {
        this.addGetter(constructor, attr, def);
        this.addSetter(constructor, attr, validator, after);
        this.addOverloadedGetterSetter(constructor, attr);
    },
    addGetter: function (constructor, attr, def) {
        var method = GET + Util_1.Util._capitalize(attr);
        constructor.prototype[method] =
            constructor.prototype[method] ||
                function () {
                    var val = this.attrs[attr];
                    return val === undefined ? def : val;
                };
    },
    addSetter: function (constructor, attr, validator, after) {
        var method = SET + Util_1.Util._capitalize(attr);
        if (!constructor.prototype[method]) {
            exports.Factory.overWriteSetter(constructor, attr, validator, after);
        }
    },
    overWriteSetter: function (constructor, attr, validator, after) {
        var method = SET + Util_1.Util._capitalize(attr);
        constructor.prototype[method] = function (val) {
            if (validator && val !== undefined && val !== null) {
                val = validator.call(this, val, attr);
            }
            this._setAttr(attr, val);
            if (after) {
                after.call(this);
            }
            return this;
        };
    },
    addComponentsGetterSetter: function (constructor, attr, components, validator, after) {
        var len = components.length, capitalize = Util_1.Util._capitalize, getter = GET + capitalize(attr), setter = SET + capitalize(attr), n, component;
        constructor.prototype[getter] = function () {
            var ret = {};
            for (n = 0; n < len; n++) {
                component = components[n];
                ret[component] = this.getAttr(attr + capitalize(component));
            }
            return ret;
        };
        var basicValidator = Validators_1.getComponentValidator(components);
        constructor.prototype[setter] = function (val) {
            var oldVal = this.attrs[attr], key;
            if (validator) {
                val = validator.call(this, val);
            }
            if (basicValidator) {
                basicValidator.call(this, val, attr);
            }
            for (key in val) {
                if (!val.hasOwnProperty(key)) {
                    continue;
                }
                this._setAttr(attr + capitalize(key), val[key]);
            }
            this._fireChangeEvent(attr, oldVal, val);
            if (after) {
                after.call(this);
            }
            return this;
        };
        this.addOverloadedGetterSetter(constructor, attr);
    },
    addOverloadedGetterSetter: function (constructor, attr) {
        var capitalizedAttr = Util_1.Util._capitalize(attr), setter = SET + capitalizedAttr, getter = GET + capitalizedAttr;
        constructor.prototype[attr] = function () {
            if (arguments.length) {
                this[setter](arguments[0]);
                return this;
            }
            return this[getter]();
        };
    },
    addDeprecatedGetterSetter: function (constructor, attr, def, validator) {
        Util_1.Util.error('Adding deprecated ' + attr);
        var method = GET + Util_1.Util._capitalize(attr);
        var message = attr +
            ' property is deprecated and will be removed soon. Look at Konva change log for more information.';
        constructor.prototype[method] = function () {
            Util_1.Util.error(message);
            var val = this.attrs[attr];
            return val === undefined ? def : val;
        };
        this.addSetter(constructor, attr, validator, function () {
            Util_1.Util.error(message);
        });
        this.addOverloadedGetterSetter(constructor, attr);
    },
    backCompat: function (constructor, methods) {
        Util_1.Util.each(methods, function (oldMethodName, newMethodName) {
            var method = constructor.prototype[newMethodName];
            var oldGetter = GET + Util_1.Util._capitalize(oldMethodName);
            var oldSetter = SET + Util_1.Util._capitalize(oldMethodName);
            function deprecated() {
                method.apply(this, arguments);
                Util_1.Util.error('"' +
                    oldMethodName +
                    '" method is deprecated and will be removed soon. Use ""' +
                    newMethodName +
                    '" instead.');
            }
            constructor.prototype[oldMethodName] = deprecated;
            constructor.prototype[oldGetter] = deprecated;
            constructor.prototype[oldSetter] = deprecated;
        });
    },
    afterSetFilter: function () {
        this._filterUpToDate = false;
    }
};


/***/ }),

/***/ "./node_modules/konva/lib/Global.js":
/*!******************************************!*\
  !*** ./node_modules/konva/lib/Global.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var PI_OVER_180 = Math.PI / 180;
function detectBrowser() {
    return (typeof window !== 'undefined' &&
        ({}.toString.call(window) === '[object Window]' ||
            {}.toString.call(window) === '[object global]'));
}
var _detectIE = function (ua) {
    var msie = ua.indexOf('msie ');
    if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('trident/');
    if (trident > 0) {
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    var edge = ua.indexOf('edge/');
    if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    return false;
};
exports._parseUA = function (userAgent) {
    var ua = userAgent.toLowerCase(), match = /(chrome)[ /]([\w.]+)/.exec(ua) ||
        /(webkit)[ /]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ /]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        (ua.indexOf('compatible') < 0 &&
            /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
        [], mobile = !!userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i), ieMobile = !!userAgent.match(/IEMobile/i);
    return {
        browser: match[1] || '',
        version: match[2] || '0',
        isIE: _detectIE(ua),
        mobile: mobile,
        ieMobile: ieMobile
    };
};
exports.glob = typeof global !== 'undefined'
    ? global
    : typeof window !== 'undefined'
        ? window
        : typeof WorkerGlobalScope !== 'undefined'
            ? self
            : {};
exports.Konva = {
    version: '3.2.6',
    isBrowser: detectBrowser(),
    isUnminified: /param/.test(function (param) { }.toString()),
    dblClickWindow: 400,
    getAngle: function (angle) {
        return exports.Konva.angleDeg ? angle * PI_OVER_180 : angle;
    },
    enableTrace: false,
    listenClickTap: false,
    inDblClickWindow: false,
    pixelRatio: undefined,
    dragDistance: 3,
    angleDeg: true,
    showWarnings: true,
    dragButtons: [0, 1],
    isDragging: function () {
        return exports.Konva['DD'].isDragging;
    },
    isDragReady: function () {
        return !!exports.Konva['DD'].node;
    },
    UA: exports._parseUA((exports.glob.navigator && exports.glob.navigator.userAgent) || ''),
    document: exports.glob.document,
    _injectGlobal: function (Konva) {
        exports.glob.Konva = Konva;
    },
    _parseUA: exports._parseUA
};
exports._NODES_REGISTRY = {};
exports._registerNode = function (NodeClass) {
    exports._NODES_REGISTRY[NodeClass.prototype.getClassName()] = NodeClass;
    exports.Konva[NodeClass.prototype.getClassName()] = NodeClass;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/konva/lib/Layer.js":
/*!*****************************************!*\
  !*** ./node_modules/konva/lib/Layer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(/*! ./Util */ "./node_modules/konva/lib/Util.js");
var Container_1 = __webpack_require__(/*! ./Container */ "./node_modules/konva/lib/Container.js");
var Factory_1 = __webpack_require__(/*! ./Factory */ "./node_modules/konva/lib/Factory.js");
var BaseLayer_1 = __webpack_require__(/*! ./BaseLayer */ "./node_modules/konva/lib/BaseLayer.js");
var Canvas_1 = __webpack_require__(/*! ./Canvas */ "./node_modules/konva/lib/Canvas.js");
var Shape_1 = __webpack_require__(/*! ./Shape */ "./node_modules/konva/lib/Shape.js");
var Validators_1 = __webpack_require__(/*! ./Validators */ "./node_modules/konva/lib/Validators.js");
var Global_1 = __webpack_require__(/*! ./Global */ "./node_modules/konva/lib/Global.js");
var HASH = '#', BEFORE_DRAW = 'beforeDraw', DRAW = 'draw', INTERSECTION_OFFSETS = [
    { x: 0, y: 0 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 }
], INTERSECTION_OFFSETS_LEN = INTERSECTION_OFFSETS.length;
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hitCanvas = new Canvas_1.HitCanvas({
            pixelRatio: 1
        });
        return _this;
    }
    Layer.prototype._setCanvasSize = function (width, height) {
        this.canvas.setSize(width, height);
        this.hitCanvas.setSize(width, height);
    };
    Layer.prototype._validateAdd = function (child) {
        var type = child.getType();
        if (type !== 'Group' && type !== 'Shape') {
            Util_1.Util.throw('You may only add groups and shapes to a layer.');
        }
    };
    Layer.prototype.getIntersection = function (pos, selector) {
        var obj, i, intersectionOffset, shape;
        if (!this.hitGraphEnabled() || !this.isVisible()) {
            return null;
        }
        var spiralSearchDistance = 1;
        var continueSearch = false;
        while (true) {
            for (i = 0; i < INTERSECTION_OFFSETS_LEN; i++) {
                intersectionOffset = INTERSECTION_OFFSETS[i];
                obj = this._getIntersection({
                    x: pos.x + intersectionOffset.x * spiralSearchDistance,
                    y: pos.y + intersectionOffset.y * spiralSearchDistance
                });
                shape = obj.shape;
                if (shape && selector) {
                    return shape.findAncestor(selector, true);
                }
                else if (shape) {
                    return shape;
                }
                continueSearch = !!obj.antialiased;
                if (!obj.antialiased) {
                    break;
                }
            }
            if (continueSearch) {
                spiralSearchDistance += 1;
            }
            else {
                return null;
            }
        }
    };
    Layer.prototype._getIntersection = function (pos) {
        var ratio = this.hitCanvas.pixelRatio;
        var p = this.hitCanvas.context.getImageData(Math.round(pos.x * ratio), Math.round(pos.y * ratio), 1, 1).data, p3 = p[3], colorKey, shape;
        if (p3 === 255) {
            colorKey = Util_1.Util._rgbToHex(p[0], p[1], p[2]);
            shape = Shape_1.shapes[HASH + colorKey];
            if (shape) {
                return {
                    shape: shape
                };
            }
            return {
                antialiased: true
            };
        }
        else if (p3 > 0) {
            return {
                antialiased: true
            };
        }
        return {};
    };
    Layer.prototype.drawScene = function (can, top) {
        var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas());
        this._fire(BEFORE_DRAW, {
            node: this
        });
        if (this.clearBeforeDraw()) {
            canvas.getContext().clear();
        }
        Container_1.Container.prototype.drawScene.call(this, canvas, top);
        this._fire(DRAW, {
            node: this
        });
        return this;
    };
    Layer.prototype.drawHit = function (can, top) {
        var layer = this.getLayer(), canvas = can || (layer && layer.hitCanvas);
        if (layer && layer.clearBeforeDraw()) {
            layer
                .getHitCanvas()
                .getContext()
                .clear();
        }
        Container_1.Container.prototype.drawHit.call(this, canvas, top);
        return this;
    };
    Layer.prototype.clear = function (bounds) {
        BaseLayer_1.BaseLayer.prototype.clear.call(this, bounds);
        this.getHitCanvas()
            .getContext()
            .clear(bounds);
        return this;
    };
    Layer.prototype.enableHitGraph = function () {
        this.hitGraphEnabled(true);
        return this;
    };
    Layer.prototype.disableHitGraph = function () {
        this.hitGraphEnabled(false);
        return this;
    };
    Layer.prototype.toggleHitCanvas = function () {
        if (!this.parent) {
            return;
        }
        var parent = this.parent;
        var added = !!this.hitCanvas._canvas.parentNode;
        if (added) {
            parent.content.removeChild(this.hitCanvas._canvas);
        }
        else {
            parent.content.appendChild(this.hitCanvas._canvas);
        }
    };
    Layer.prototype.setSize = function (_a) {
        var width = _a.width, height = _a.height;
        _super.prototype.setSize.call(this, { width: width, height: height });
        this.hitCanvas.setSize(width, height);
        return this;
    };
    return Layer;
}(BaseLayer_1.BaseLayer));
exports.Layer = Layer;
Layer.prototype.nodeType = 'Layer';
Global_1._registerNode(Layer);
Factory_1.Factory.addGetterSetter(Layer, 'hitGraphEnabled', true, Validators_1.getBooleanValidator());
Util_1.Collection.mapMethods(Layer);


/***/ }),

/***/ "./node_modules/konva/lib/Node.js":
/*!****************************************!*\
  !*** ./node_modules/konva/lib/Node.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(/*! ./Util */ "./node_modules/konva/lib/Util.js");
var Factory_1 = __webpack_require__(/*! ./Factory */ "./node_modules/konva/lib/Factory.js");
var Canvas_1 = __webpack_require__(/*! ./Canvas */ "./node_modules/konva/lib/Canvas.js");
var Global_1 = __webpack_require__(/*! ./Global */ "./node_modules/konva/lib/Global.js");
var DragAndDrop_1 = __webpack_require__(/*! ./DragAndDrop */ "./node_modules/konva/lib/DragAndDrop.js");
var Validators_1 = __webpack_require__(/*! ./Validators */ "./node_modules/konva/lib/Validators.js");
exports.ids = {};
exports.names = {};
var _addId = function (node, id) {
    if (!id) {
        return;
    }
    exports.ids[id] = node;
};
exports._removeId = function (id, node) {
    if (!id) {
        return;
    }
    if (exports.ids[id] !== node) {
        return;
    }
    delete exports.ids[id];
};
exports._addName = function (node, name) {
    if (name) {
        if (!exports.names[name]) {
            exports.names[name] = [];
        }
        exports.names[name].push(node);
    }
};
exports._removeName = function (name, _id) {
    if (!name) {
        return;
    }
    var nodes = exports.names[name];
    if (!nodes) {
        return;
    }
    for (var n = 0; n < nodes.length; n++) {
        var no = nodes[n];
        if (no._id === _id) {
            nodes.splice(n, 1);
        }
    }
    if (nodes.length === 0) {
        delete exports.names[name];
    }
};
var ABSOLUTE_OPACITY = 'absoluteOpacity', ABSOLUTE_TRANSFORM = 'absoluteTransform', ABSOLUTE_SCALE = 'absoluteScale', CANVAS = 'canvas', CHANGE = 'Change', CHILDREN = 'children', KONVA = 'konva', LISTENING = 'listening', MOUSEENTER = 'mouseenter', MOUSELEAVE = 'mouseleave', NAME = 'name', SET = 'set', SHAPE = 'Shape', SPACE = ' ', STAGE = 'stage', TRANSFORM = 'transform', UPPER_STAGE = 'Stage', VISIBLE = 'visible', CLONE_BLACK_LIST = ['id'], TRANSFORM_CHANGE_STR = [
    'xChange.konva',
    'yChange.konva',
    'scaleXChange.konva',
    'scaleYChange.konva',
    'skewXChange.konva',
    'skewYChange.konva',
    'rotationChange.konva',
    'offsetXChange.konva',
    'offsetYChange.konva',
    'transformsEnabledChange.konva'
].join(SPACE), SCALE_CHANGE_STR = ['scaleXChange.konva', 'scaleYChange.konva'].join(SPACE);
var emptyChildren = new Util_1.Collection();
var idCounter = 1;
var Node = (function () {
    function Node(config) {
        this._id = idCounter++;
        this.eventListeners = {};
        this.attrs = {};
        this.index = 0;
        this.parent = null;
        this._cache = new Map();
        this._lastPos = null;
        this._filterUpToDate = false;
        this._isUnderCache = false;
        this.children = emptyChildren;
        this.setAttrs(config);
        this.on(TRANSFORM_CHANGE_STR, function () {
            this._clearCache(TRANSFORM);
            this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        });
        this.on(SCALE_CHANGE_STR, function () {
            this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
        });
        this.on('visibleChange.konva', function () {
            this._clearSelfAndDescendantCache(VISIBLE);
        });
        this.on('listeningChange.konva', function () {
            this._clearSelfAndDescendantCache(LISTENING);
        });
        this.on('opacityChange.konva', function () {
            this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
        });
    }
    Node.prototype.hasChildren = function () {
        return false;
    };
    Node.prototype.getChildren = function () {
        return emptyChildren;
    };
    Node.prototype._clearCache = function (attr) {
        if (attr) {
            this._cache.delete(attr);
        }
        else {
            this._cache.clear();
        }
    };
    Node.prototype._getCache = function (attr, privateGetter) {
        var cache = this._cache.get(attr);
        if (cache === undefined) {
            cache = privateGetter.call(this);
            this._cache.set(attr, cache);
        }
        return cache;
    };
    Node.prototype._getCanvasCache = function () {
        return this._cache.get(CANVAS);
    };
    Node.prototype._clearSelfAndDescendantCache = function (attr) {
        this._clearCache(attr);
        if (this._getCanvasCache()) {
            return;
        }
        if (this.children) {
            this.children.each(function (node) {
                node._clearSelfAndDescendantCache(attr);
            });
        }
    };
    Node.prototype.clearCache = function () {
        this._cache.delete(CANVAS);
        this._clearSelfAndDescendantCache();
        return this;
    };
    Node.prototype.cache = function (config) {
        var conf = config || {};
        var rect = {};
        if (conf.x === undefined ||
            conf.y === undefined ||
            conf.width === undefined ||
            conf.height === undefined) {
            rect = this.getClientRect({
                skipTransform: true,
                relativeTo: this.getParent()
            });
        }
        var width = conf.width || rect.width, height = conf.height || rect.height, pixelRatio = conf.pixelRatio, x = conf.x === undefined ? rect.x : conf.x, y = conf.y === undefined ? rect.y : conf.y, offset = conf.offset || 0, drawBorder = conf.drawBorder || false;
        if (!width || !height) {
            Util_1.Util.error('Can not cache the node. Width or height of the node equals 0. Caching is skipped.');
            return;
        }
        width += offset * 2;
        height += offset * 2;
        x -= offset;
        y -= offset;
        var cachedSceneCanvas = new Canvas_1.SceneCanvas({
            pixelRatio: pixelRatio,
            width: width,
            height: height
        }), cachedFilterCanvas = new Canvas_1.SceneCanvas({
            pixelRatio: pixelRatio,
            width: width,
            height: height
        }), cachedHitCanvas = new Canvas_1.HitCanvas({
            pixelRatio: 1,
            width: width,
            height: height
        }), sceneContext = cachedSceneCanvas.getContext(), hitContext = cachedHitCanvas.getContext();
        cachedHitCanvas.isCache = true;
        this._cache.delete('canvas');
        this._filterUpToDate = false;
        sceneContext.save();
        hitContext.save();
        sceneContext.translate(-x, -y);
        hitContext.translate(-x, -y);
        this._isUnderCache = true;
        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
        this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
        this.drawScene(cachedSceneCanvas, this, true);
        this.drawHit(cachedHitCanvas, this, true);
        this._isUnderCache = false;
        sceneContext.restore();
        hitContext.restore();
        if (drawBorder) {
            sceneContext.save();
            sceneContext.beginPath();
            sceneContext.rect(0, 0, width, height);
            sceneContext.closePath();
            sceneContext.setAttr('strokeStyle', 'red');
            sceneContext.setAttr('lineWidth', 5);
            sceneContext.stroke();
            sceneContext.restore();
        }
        this._cache.set(CANVAS, {
            scene: cachedSceneCanvas,
            filter: cachedFilterCanvas,
            hit: cachedHitCanvas,
            x: x,
            y: y
        });
        return this;
    };
    Node.prototype.getClientRect = function (config) {
        throw new Error('abstract "getClientRect" method call');
    };
    Node.prototype._transformedRect = function (rect, top) {
        var points = [
            { x: rect.x, y: rect.y },
            { x: rect.x + rect.width, y: rect.y },
            { x: rect.x + rect.width, y: rect.y + rect.height },
            { x: rect.x, y: rect.y + rect.height }
        ];
        var minX, minY, maxX, maxY;
        var trans = this.getAbsoluteTransform(top);
        points.forEach(function (point) {
            var transformed = trans.point(point);
            if (minX === undefined) {
                minX = maxX = transformed.x;
                minY = maxY = transformed.y;
            }
            minX = Math.min(minX, transformed.x);
            minY = Math.min(minY, transformed.y);
            maxX = Math.max(maxX, transformed.x);
            maxY = Math.max(maxY, transformed.y);
        });
        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
        };
    };
    Node.prototype._drawCachedSceneCanvas = function (context) {
        context.save();
        context._applyOpacity(this);
        context._applyGlobalCompositeOperation(this);
        var canvasCache = this._getCanvasCache();
        context.translate(canvasCache.x, canvasCache.y);
        var cacheCanvas = this._getCachedSceneCanvas();
        var ratio = cacheCanvas.pixelRatio;
        context.drawImage(cacheCanvas._canvas, 0, 0, cacheCanvas.width / ratio, cacheCanvas.height / ratio);
        context.restore();
    };
    Node.prototype._drawCachedHitCanvas = function (context) {
        var canvasCache = this._getCanvasCache(), hitCanvas = canvasCache.hit;
        context.save();
        context._applyGlobalCompositeOperation(this);
        context.translate(canvasCache.x, canvasCache.y);
        context.drawImage(hitCanvas._canvas, 0, 0);
        context.restore();
    };
    Node.prototype._getCachedSceneCanvas = function () {
        var filters = this.filters(), cachedCanvas = this._getCanvasCache(), sceneCanvas = cachedCanvas.scene, filterCanvas = cachedCanvas.filter, filterContext = filterCanvas.getContext(), len, imageData, n, filter;
        if (filters) {
            if (!this._filterUpToDate) {
                var ratio = sceneCanvas.pixelRatio;
                try {
                    len = filters.length;
                    filterContext.clear();
                    filterContext.drawImage(sceneCanvas._canvas, 0, 0, sceneCanvas.getWidth() / ratio, sceneCanvas.getHeight() / ratio);
                    imageData = filterContext.getImageData(0, 0, filterCanvas.getWidth(), filterCanvas.getHeight());
                    for (n = 0; n < len; n++) {
                        filter = filters[n];
                        if (typeof filter !== 'function') {
                            Util_1.Util.error('Filter should be type of function, but got ' +
                                typeof filter +
                                ' insted. Please check correct filters');
                            continue;
                        }
                        filter.call(this, imageData);
                        filterContext.putImageData(imageData, 0, 0);
                    }
                }
                catch (e) {
                    Util_1.Util.error('Unable to apply filter. ' + e.message);
                }
                this._filterUpToDate = true;
            }
            return filterCanvas;
        }
        return sceneCanvas;
    };
    Node.prototype.on = function (evtStr, handler) {
        if (arguments.length === 3) {
            return this._delegate.apply(this, arguments);
        }
        var events = evtStr.split(SPACE), len = events.length, n, event, parts, baseEvent, name;
        for (n = 0; n < len; n++) {
            event = events[n];
            parts = event.split('.');
            baseEvent = parts[0];
            name = parts[1] || '';
            if (!this.eventListeners[baseEvent]) {
                this.eventListeners[baseEvent] = [];
            }
            this.eventListeners[baseEvent].push({
                name: name,
                handler: handler
            });
        }
        return this;
    };
    Node.prototype.off = function (evtStr, callback) {
        var events = (evtStr || '').split(SPACE), len = events.length, n, t, event, parts, baseEvent, name;
        if (!evtStr) {
            for (t in this.eventListeners) {
                this._off(t);
            }
        }
        for (n = 0; n < len; n++) {
            event = events[n];
            parts = event.split('.');
            baseEvent = parts[0];
            name = parts[1];
            if (baseEvent) {
                if (this.eventListeners[baseEvent]) {
                    this._off(baseEvent, name, callback);
                }
            }
            else {
                for (t in this.eventListeners) {
                    this._off(t, name, callback);
                }
            }
        }
        return this;
    };
    Node.prototype.dispatchEvent = function (evt) {
        var e = {
            target: this,
            type: evt.type,
            evt: evt
        };
        this.fire(evt.type, e);
        return this;
    };
    Node.prototype.addEventListener = function (type, handler) {
        this.on(type, function (evt) {
            handler.call(this, evt.evt);
        });
        return this;
    };
    Node.prototype.removeEventListener = function (type) {
        this.off(type);
        return this;
    };
    Node.prototype._delegate = function (event, selector, handler) {
        var stopNode = this;
        this.on(event, function (evt) {
            var targets = evt.target.findAncestors(selector, true, stopNode);
            for (var i = 0; i < targets.length; i++) {
                evt = Util_1.Util.cloneObject(evt);
                evt.currentTarget = targets[i];
                handler.call(targets[i], evt);
            }
        });
    };
    Node.prototype.remove = function () {
        if (DragAndDrop_1.DD.node && DragAndDrop_1.DD.node === this) {
            this.stopDrag();
        }
        this._remove();
        return this;
    };
    Node.prototype._remove = function () {
        this._clearSelfAndDescendantCache(STAGE);
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        this._clearSelfAndDescendantCache(VISIBLE);
        this._clearSelfAndDescendantCache(LISTENING);
        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
        var parent = this.getParent();
        if (parent && parent.children) {
            parent.children.splice(this.index, 1);
            parent._setChildrenIndices();
            this.parent = null;
        }
    };
    Node.prototype.destroy = function () {
        exports._removeId(this.id(), this);
        var names = (this.name() || '').split(/\s/g);
        for (var i = 0; i < names.length; i++) {
            var subname = names[i];
            exports._removeName(subname, this._id);
        }
        this.remove();
        return this;
    };
    Node.prototype.getAttr = function (attr) {
        var method = 'get' + Util_1.Util._capitalize(attr);
        if (Util_1.Util._isFunction(this[method])) {
            return this[method]();
        }
        return this.attrs[attr];
    };
    Node.prototype.getAncestors = function () {
        var parent = this.getParent(), ancestors = new Util_1.Collection();
        while (parent) {
            ancestors.push(parent);
            parent = parent.getParent();
        }
        return ancestors;
    };
    Node.prototype.getAttrs = function () {
        return this.attrs || {};
    };
    Node.prototype.setAttrs = function (config) {
        var key, method;
        if (!config) {
            return this;
        }
        for (key in config) {
            if (key === CHILDREN) {
                continue;
            }
            method = SET + Util_1.Util._capitalize(key);
            if (Util_1.Util._isFunction(this[method])) {
                this[method](config[key]);
            }
            else {
                this._setAttr(key, config[key]);
            }
        }
        return this;
    };
    Node.prototype.isListening = function () {
        return this._getCache(LISTENING, this._isListening);
    };
    Node.prototype._isListening = function () {
        var listening = this.listening(), parent = this.getParent();
        if (listening === 'inherit') {
            if (parent) {
                return parent.isListening();
            }
            else {
                return true;
            }
        }
        else {
            return listening;
        }
    };
    Node.prototype.isVisible = function () {
        return this._getCache(VISIBLE, this._isVisible);
    };
    Node.prototype._isVisible = function (relativeTo) {
        var visible = this.visible(), parent = this.getParent();
        if (visible === 'inherit') {
            if (parent && parent !== relativeTo) {
                return parent._isVisible(relativeTo);
            }
            else {
                return true;
            }
        }
        else {
            return visible;
        }
    };
    Node.prototype.shouldDrawHit = function () {
        var layer = this.getLayer();
        return ((!layer && this.isListening() && this.isVisible()) ||
            (layer &&
                layer.hitGraphEnabled() &&
                this.isListening() &&
                this.isVisible()));
    };
    Node.prototype.show = function () {
        this.visible(true);
        return this;
    };
    Node.prototype.hide = function () {
        this.visible(false);
        return this;
    };
    Node.prototype.getZIndex = function () {
        return this.index || 0;
    };
    Node.prototype.getAbsoluteZIndex = function () {
        var depth = this.getDepth(), that = this, index = 0, nodes, len, n, child;
        function addChildren(children) {
            nodes = [];
            len = children.length;
            for (n = 0; n < len; n++) {
                child = children[n];
                index++;
                if (child.nodeType !== SHAPE) {
                    nodes = nodes.concat(child.getChildren().toArray());
                }
                if (child._id === that._id) {
                    n = len;
                }
            }
            if (nodes.length > 0 && nodes[0].getDepth() <= depth) {
                addChildren(nodes);
            }
        }
        if (that.nodeType !== UPPER_STAGE) {
            addChildren(that.getStage().getChildren());
        }
        return index;
    };
    Node.prototype.getDepth = function () {
        var depth = 0, parent = this.parent;
        while (parent) {
            depth++;
            parent = parent.parent;
        }
        return depth;
    };
    Node.prototype.setPosition = function (pos) {
        this.x(pos.x);
        this.y(pos.y);
        return this;
    };
    Node.prototype.getPosition = function () {
        return {
            x: this.x(),
            y: this.y()
        };
    };
    Node.prototype.getAbsolutePosition = function (top) {
        var absoluteMatrix = this.getAbsoluteTransform(top).getMatrix(), absoluteTransform = new Util_1.Transform(), offset = this.offset();
        absoluteTransform.m = absoluteMatrix.slice();
        absoluteTransform.translate(offset.x, offset.y);
        return absoluteTransform.getTranslation();
    };
    Node.prototype.setAbsolutePosition = function (pos) {
        var origTrans = this._clearTransform(), it;
        this.attrs.x = origTrans.x;
        this.attrs.y = origTrans.y;
        delete origTrans.x;
        delete origTrans.y;
        it = this.getAbsoluteTransform();
        it.invert();
        it.translate(pos.x, pos.y);
        pos = {
            x: this.attrs.x + it.getTranslation().x,
            y: this.attrs.y + it.getTranslation().y
        };
        this.setPosition({ x: pos.x, y: pos.y });
        this._setTransform(origTrans);
        return this;
    };
    Node.prototype._setTransform = function (trans) {
        var key;
        for (key in trans) {
            this.attrs[key] = trans[key];
        }
        this._clearCache(TRANSFORM);
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
    };
    Node.prototype._clearTransform = function () {
        var trans = {
            x: this.x(),
            y: this.y(),
            rotation: this.rotation(),
            scaleX: this.scaleX(),
            scaleY: this.scaleY(),
            offsetX: this.offsetX(),
            offsetY: this.offsetY(),
            skewX: this.skewX(),
            skewY: this.skewY()
        };
        this.attrs.x = 0;
        this.attrs.y = 0;
        this.attrs.rotation = 0;
        this.attrs.scaleX = 1;
        this.attrs.scaleY = 1;
        this.attrs.offsetX = 0;
        this.attrs.offsetY = 0;
        this.attrs.skewX = 0;
        this.attrs.skewY = 0;
        this._clearCache(TRANSFORM);
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        return trans;
    };
    Node.prototype.move = function (change) {
        var changeX = change.x, changeY = change.y, x = this.x(), y = this.y();
        if (changeX !== undefined) {
            x += changeX;
        }
        if (changeY !== undefined) {
            y += changeY;
        }
        this.setPosition({ x: x, y: y });
        return this;
    };
    Node.prototype._eachAncestorReverse = function (func, top) {
        var family = [], parent = this.getParent(), len, n;
        if (top && top._id === this._id) {
            func(this);
            return;
        }
        family.unshift(this);
        while (parent && (!top || parent._id !== top._id)) {
            family.unshift(parent);
            parent = parent.parent;
        }
        len = family.length;
        for (n = 0; n < len; n++) {
            func(family[n]);
        }
    };
    Node.prototype.rotate = function (theta) {
        this.rotation(this.rotation() + theta);
        return this;
    };
    Node.prototype.moveToTop = function () {
        if (!this.parent) {
            Util_1.Util.warn('Node has no parent. moveToTop function is ignored.');
            return false;
        }
        var index = this.index;
        this.parent.children.splice(index, 1);
        this.parent.children.push(this);
        this.parent._setChildrenIndices();
        return true;
    };
    Node.prototype.moveUp = function () {
        if (!this.parent) {
            Util_1.Util.warn('Node has no parent. moveUp function is ignored.');
            return false;
        }
        var index = this.index, len = this.parent.getChildren().length;
        if (index < len - 1) {
            this.parent.children.splice(index, 1);
            this.parent.children.splice(index + 1, 0, this);
            this.parent._setChildrenIndices();
            return true;
        }
        return false;
    };
    Node.prototype.moveDown = function () {
        if (!this.parent) {
            Util_1.Util.warn('Node has no parent. moveDown function is ignored.');
            return false;
        }
        var index = this.index;
        if (index > 0) {
            this.parent.children.splice(index, 1);
            this.parent.children.splice(index - 1, 0, this);
            this.parent._setChildrenIndices();
            return true;
        }
        return false;
    };
    Node.prototype.moveToBottom = function () {
        if (!this.parent) {
            Util_1.Util.warn('Node has no parent. moveToBottom function is ignored.');
            return false;
        }
        var index = this.index;
        if (index > 0) {
            this.parent.children.splice(index, 1);
            this.parent.children.unshift(this);
            this.parent._setChildrenIndices();
            return true;
        }
        return false;
    };
    Node.prototype.setZIndex = function (zIndex) {
        if (!this.parent) {
            Util_1.Util.warn('Node has no parent. zIndex parameter is ignored.');
            return this;
        }
        if (zIndex < 0 || zIndex >= this.parent.children.length) {
            Util_1.Util.warn('Unexpected value ' +
                zIndex +
                ' for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to ' +
                (this.parent.children.length - 1) +
                '.');
        }
        var index = this.index;
        this.parent.children.splice(index, 1);
        this.parent.children.splice(zIndex, 0, this);
        this.parent._setChildrenIndices();
        return this;
    };
    Node.prototype.getAbsoluteOpacity = function () {
        return this._getCache(ABSOLUTE_OPACITY, this._getAbsoluteOpacity);
    };
    Node.prototype._getAbsoluteOpacity = function () {
        var absOpacity = this.opacity();
        var parent = this.getParent();
        if (parent && !parent._isUnderCache) {
            absOpacity *= this.getParent().getAbsoluteOpacity();
        }
        return absOpacity;
    };
    Node.prototype.moveTo = function (newContainer) {
        if (this.getParent() !== newContainer) {
            this._remove();
            newContainer.add(this);
        }
        return this;
    };
    Node.prototype.toObject = function () {
        var obj = {}, attrs = this.getAttrs(), key, val, getter, defaultValue, nonPlainObject;
        obj.attrs = {};
        for (key in attrs) {
            val = attrs[key];
            nonPlainObject =
                Util_1.Util.isObject(val) && !Util_1.Util._isPlainObject(val) && !Util_1.Util._isArray(val);
            if (nonPlainObject) {
                continue;
            }
            getter = typeof this[key] === 'function' && this[key];
            delete attrs[key];
            defaultValue = getter ? getter.call(this) : null;
            attrs[key] = val;
            if (defaultValue !== val) {
                obj.attrs[key] = val;
            }
        }
        obj.className = this.getClassName();
        return Util_1.Util._prepareToStringify(obj);
    };
    Node.prototype.toJSON = function () {
        return JSON.stringify(this.toObject());
    };
    Node.prototype.getParent = function () {
        return this.parent;
    };
    Node.prototype.findAncestors = function (selector, includeSelf, stopNode) {
        var res = [];
        if (includeSelf && this._isMatch(selector)) {
            res.push(this);
        }
        var ancestor = this.parent;
        while (ancestor) {
            if (ancestor === stopNode) {
                return res;
            }
            if (ancestor._isMatch(selector)) {
                res.push(ancestor);
            }
            ancestor = ancestor.parent;
        }
        return res;
    };
    Node.prototype.isAncestorOf = function (node) {
        return false;
    };
    Node.prototype.findAncestor = function (selector, includeSelf, stopNode) {
        return this.findAncestors(selector, includeSelf, stopNode)[0];
    };
    Node.prototype._isMatch = function (selector) {
        if (!selector) {
            return false;
        }
        if (typeof selector === 'function') {
            return selector(this);
        }
        var selectorArr = selector.replace(/ /g, '').split(','), len = selectorArr.length, n, sel;
        for (n = 0; n < len; n++) {
            sel = selectorArr[n];
            if (!Util_1.Util.isValidSelector(sel)) {
                Util_1.Util.warn('Selector "' +
                    sel +
                    '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".');
                Util_1.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".');
                Util_1.Util.warn('Konva is awesome, right?');
            }
            if (sel.charAt(0) === '#') {
                if (this.id() === sel.slice(1)) {
                    return true;
                }
            }
            else if (sel.charAt(0) === '.') {
                if (this.hasName(sel.slice(1))) {
                    return true;
                }
            }
            else if (this.className === selector || this.nodeType === selector) {
                return true;
            }
        }
        return false;
    };
    Node.prototype.getLayer = function () {
        var parent = this.getParent();
        return parent ? parent.getLayer() : null;
    };
    Node.prototype.getStage = function () {
        return this._getCache(STAGE, this._getStage);
    };
    Node.prototype._getStage = function () {
        var parent = this.getParent();
        if (parent) {
            return parent.getStage();
        }
        else {
            return undefined;
        }
    };
    Node.prototype.fire = function (eventType, evt, bubble) {
        evt = evt || {};
        evt.target = evt.target || this;
        if (bubble) {
            this._fireAndBubble(eventType, evt);
        }
        else {
            this._fire(eventType, evt);
        }
        return this;
    };
    Node.prototype.getAbsoluteTransform = function (top) {
        if (top) {
            return this._getAbsoluteTransform(top);
        }
        else {
            return this._getCache(ABSOLUTE_TRANSFORM, this._getAbsoluteTransform);
        }
    };
    Node.prototype._getAbsoluteTransform = function (top) {
        var at = new Util_1.Transform();
        this._eachAncestorReverse(function (node) {
            var transformsEnabled = node.getTransformsEnabled();
            if (transformsEnabled === 'all') {
                at.multiply(node.getTransform());
            }
            else if (transformsEnabled === 'position') {
                at.translate(node.getX() - node.getOffsetX(), node.getY() - node.getOffsetY());
            }
        }, top);
        return at;
    };
    Node.prototype.getAbsoluteScale = function (top) {
        if (top) {
            return this._getAbsoluteScale(top);
        }
        else {
            return this._getCache(ABSOLUTE_SCALE, this._getAbsoluteScale);
        }
    };
    Node.prototype._getAbsoluteScale = function (top) {
        var parent = this;
        while (parent) {
            if (parent._isUnderCache) {
                top = parent;
            }
            parent = parent.getParent();
        }
        var scaleX = 1, scaleY = 1;
        this._eachAncestorReverse(function (node) {
            scaleX *= node.scaleX();
            scaleY *= node.scaleY();
        }, top);
        return {
            x: scaleX,
            y: scaleY
        };
    };
    Node.prototype.getTransform = function () {
        return this._getCache(TRANSFORM, this._getTransform);
    };
    Node.prototype._getTransform = function () {
        var m = new Util_1.Transform(), x = this.x(), y = this.y(), rotation = Global_1.Konva.getAngle(this.rotation()), scaleX = this.scaleX(), scaleY = this.scaleY(), skewX = this.skewX(), skewY = this.skewY(), offsetX = this.offsetX(), offsetY = this.offsetY();
        if (x !== 0 || y !== 0) {
            m.translate(x, y);
        }
        if (rotation !== 0) {
            m.rotate(rotation);
        }
        if (skewX !== 0 || skewY !== 0) {
            m.skew(skewX, skewY);
        }
        if (scaleX !== 1 || scaleY !== 1) {
            m.scale(scaleX, scaleY);
        }
        if (offsetX !== 0 || offsetY !== 0) {
            m.translate(-1 * offsetX, -1 * offsetY);
        }
        return m;
    };
    Node.prototype.clone = function (obj) {
        var attrs = Util_1.Util.cloneObject(this.attrs), key, allListeners, len, n, listener;
        for (var i in CLONE_BLACK_LIST) {
            var blockAttr = CLONE_BLACK_LIST[i];
            delete attrs[blockAttr];
        }
        for (key in obj) {
            attrs[key] = obj[key];
        }
        var node = new this.constructor(attrs);
        for (key in this.eventListeners) {
            allListeners = this.eventListeners[key];
            len = allListeners.length;
            for (n = 0; n < len; n++) {
                listener = allListeners[n];
                if (listener.name.indexOf(KONVA) < 0) {
                    if (!node.eventListeners[key]) {
                        node.eventListeners[key] = [];
                    }
                    node.eventListeners[key].push(listener);
                }
            }
        }
        return node;
    };
    Node.prototype._toKonvaCanvas = function (config) {
        config = config || {};
        var box = this.getClientRect();
        var stage = this.getStage(), x = config.x !== undefined ? config.x : box.x, y = config.y !== undefined ? config.y : box.y, pixelRatio = config.pixelRatio || 1, canvas = new Canvas_1.SceneCanvas({
            width: config.width || box.width || (stage ? stage.getWidth() : 0),
            height: config.height || box.height || (stage ? stage.getHeight() : 0),
            pixelRatio: pixelRatio
        }), context = canvas.getContext();
        context.save();
        if (x || y) {
            context.translate(-1 * x, -1 * y);
        }
        this.drawScene(canvas);
        context.restore();
        return canvas;
    };
    Node.prototype.toCanvas = function (config) {
        return this._toKonvaCanvas(config)._canvas;
    };
    Node.prototype.toDataURL = function (config) {
        config = config || {};
        var mimeType = config.mimeType || null, quality = config.quality || null;
        var url = this._toKonvaCanvas(config).toDataURL(mimeType, quality);
        if (config.callback) {
            config.callback(url);
        }
        return url;
    };
    Node.prototype.toImage = function (config) {
        if (!config || !config.callback) {
            throw 'callback required for toImage method config argument';
        }
        var callback = config.callback;
        delete config.callback;
        Util_1.Util._urlToImage(this.toDataURL(config), function (img) {
            callback(img);
        });
    };
    Node.prototype.setSize = function (size) {
        this.width(size.width);
        this.height(size.height);
        return this;
    };
    Node.prototype.getSize = function () {
        return {
            width: this.width(),
            height: this.height()
        };
    };
    Node.prototype.getClassName = function () {
        return this.className || this.nodeType;
    };
    Node.prototype.getType = function () {
        return this.nodeType;
    };
    Node.prototype.getDragDistance = function () {
        if (this.attrs.dragDistance !== undefined) {
            return this.attrs.dragDistance;
        }
        else if (this.parent) {
            return this.parent.getDragDistance();
        }
        else {
            return Global_1.Konva.dragDistance;
        }
    };
    Node.prototype._off = function (type, name, callback) {
        var evtListeners = this.eventListeners[type], i, evtName, handler;
        for (i = 0; i < evtListeners.length; i++) {
            evtName = evtListeners[i].name;
            handler = evtListeners[i].handler;
            if ((evtName !== 'konva' || name === 'konva') &&
                (!name || evtName === name) &&
                (!callback || callback === handler)) {
                evtListeners.splice(i, 1);
                if (evtListeners.length === 0) {
                    delete this.eventListeners[type];
                    break;
                }
                i--;
            }
        }
    };
    Node.prototype._fireChangeEvent = function (attr, oldVal, newVal) {
        this._fire(attr + CHANGE, {
            oldVal: oldVal,
            newVal: newVal
        });
    };
    Node.prototype.setId = function (id) {
        var oldId = this.id();
        exports._removeId(oldId, this);
        _addId(this, id);
        this._setAttr('id', id);
        return this;
    };
    Node.prototype.setName = function (name) {
        var oldNames = (this.name() || '').split(/\s/g);
        var newNames = (name || '').split(/\s/g);
        var subname, i;
        for (i = 0; i < oldNames.length; i++) {
            subname = oldNames[i];
            if (newNames.indexOf(subname) === -1 && subname) {
                exports._removeName(subname, this._id);
            }
        }
        for (i = 0; i < newNames.length; i++) {
            subname = newNames[i];
            if (oldNames.indexOf(subname) === -1 && subname) {
                exports._addName(this, subname);
            }
        }
        this._setAttr(NAME, name);
        return this;
    };
    Node.prototype.addName = function (name) {
        if (!this.hasName(name)) {
            var oldName = this.name();
            var newName = oldName ? oldName + ' ' + name : name;
            this.setName(newName);
        }
        return this;
    };
    Node.prototype.hasName = function (name) {
        if (!name) {
            return false;
        }
        var fullName = this.name();
        if (!fullName) {
            return false;
        }
        var names = (fullName || '').split(/\s/g);
        return names.indexOf(name) !== -1;
    };
    Node.prototype.removeName = function (name) {
        var names = (this.name() || '').split(/\s/g);
        var index = names.indexOf(name);
        if (index !== -1) {
            names.splice(index, 1);
            this.setName(names.join(' '));
        }
        return this;
    };
    Node.prototype.setAttr = function (attr, val) {
        var func = this[SET + Util_1.Util._capitalize(attr)];
        if (Util_1.Util._isFunction(func)) {
            func.call(this, val);
        }
        else {
            this._setAttr(attr, val);
        }
        return this;
    };
    Node.prototype._setAttr = function (key, val) {
        var oldVal = this.attrs[key];
        if (oldVal === val && !Util_1.Util.isObject(val)) {
            return;
        }
        if (val === undefined || val === null) {
            delete this.attrs[key];
        }
        else {
            this.attrs[key] = val;
        }
        this._fireChangeEvent(key, oldVal, val);
    };
    Node.prototype._setComponentAttr = function (key, component, val) {
        var oldVal;
        if (val !== undefined) {
            oldVal = this.attrs[key];
            if (!oldVal) {
                this.attrs[key] = this.getAttr(key);
            }
            this.attrs[key][component] = val;
            this._fireChangeEvent(key, oldVal, val);
        }
    };
    Node.prototype._fireAndBubble = function (eventType, evt, compareShape) {
        if (evt && this.nodeType === SHAPE) {
            evt.target = this;
        }
        var shouldStop = (eventType === MOUSEENTER || eventType === MOUSELEAVE) &&
            ((compareShape &&
                (this === compareShape ||
                    (this.isAncestorOf && this.isAncestorOf(compareShape)))) ||
                (this.nodeType === 'Stage' && !compareShape));
        if (!shouldStop) {
            this._fire(eventType, evt);
            var stopBubble = (eventType === MOUSEENTER || eventType === MOUSELEAVE) &&
                (compareShape &&
                    compareShape.isAncestorOf &&
                    compareShape.isAncestorOf(this) &&
                    !compareShape.isAncestorOf(this.parent));
            if (((evt && !evt.cancelBubble) || !evt) &&
                this.parent &&
                this.parent.isListening() &&
                !stopBubble) {
                if (compareShape && compareShape.parent) {
                    this._fireAndBubble.call(this.parent, eventType, evt, compareShape.parent);
                }
                else {
                    this._fireAndBubble.call(this.parent, eventType, evt);
                }
            }
        }
    };
    Node.prototype._fire = function (eventType, evt) {
        var events = this.eventListeners[eventType], i;
        if (events) {
            evt = evt || {};
            evt.currentTarget = this;
            evt.type = eventType;
            for (i = 0; i < events.length; i++) {
                events[i].handler.call(this, evt);
            }
        }
    };
    Node.prototype.draw = function () {
        this.drawScene();
        this.drawHit();
        return this;
    };
    Node.prototype.startDrag = function () {
        var stage = this.getStage(), layer = this.getLayer(), pos = stage.getPointerPosition(), ap = this.getAbsolutePosition();
        if (pos) {
            if (DragAndDrop_1.DD.node) {
                DragAndDrop_1.DD.node.stopDrag();
            }
            DragAndDrop_1.DD.node = this;
            DragAndDrop_1.DD.startPointerPos = pos;
            DragAndDrop_1.DD.offset.x = pos.x - ap.x;
            DragAndDrop_1.DD.offset.y = pos.y - ap.y;
            DragAndDrop_1.DD.anim.setLayers(layer || this['getLayers']());
            DragAndDrop_1.DD.anim.start();
            this._setDragPosition();
        }
    };
    Node.prototype._setDragPosition = function (evt) {
        var pos = this.getStage().getPointerPosition(), dbf = this.dragBoundFunc();
        if (!pos) {
            return;
        }
        var newNodePos = {
            x: pos.x - DragAndDrop_1.DD.offset.x,
            y: pos.y - DragAndDrop_1.DD.offset.y
        };
        if (dbf !== undefined) {
            newNodePos = dbf.call(this, newNodePos, evt);
        }
        this.setAbsolutePosition(newNodePos);
        if (!this._lastPos ||
            this._lastPos.x !== newNodePos.x ||
            this._lastPos.y !== newNodePos.y) {
            DragAndDrop_1.DD.anim['dirty'] = true;
        }
        this._lastPos = newNodePos;
    };
    Node.prototype.stopDrag = function () {
        var evt = {};
        DragAndDrop_1.DD._endDragBefore(evt);
        DragAndDrop_1.DD._endDragAfter(evt);
    };
    Node.prototype.setDraggable = function (draggable) {
        this._setAttr('draggable', draggable);
        this._dragChange();
    };
    Node.prototype.isDragging = function () {
        return !!(DragAndDrop_1.DD.node && DragAndDrop_1.DD.node === this && DragAndDrop_1.DD.isDragging);
    };
    Node.prototype._listenDrag = function () {
        this._dragCleanup();
        this.on('mousedown.konva touchstart.konva', function (evt) {
            var shouldCheckButton = evt.evt.button !== undefined;
            var canDrag = !shouldCheckButton || Global_1.Konva.dragButtons.indexOf(evt.evt.button) >= 0;
            if (!canDrag) {
                return;
            }
            if (!DragAndDrop_1.DD.node) {
                this.startDrag();
            }
        });
    };
    Node.prototype._dragChange = function () {
        if (this.attrs.draggable) {
            this._listenDrag();
        }
        else {
            this._dragCleanup();
            var stage = this.getStage();
            var dd = DragAndDrop_1.DD;
            if (stage && dd.node && dd.node._id === this._id) {
                dd.node.stopDrag();
            }
        }
    };
    Node.prototype._dragCleanup = function () {
        this.off('mousedown.konva');
        this.off('touchstart.konva');
    };
    Node.create = function (data, container) {
        if (Util_1.Util._isString(data)) {
            data = JSON.parse(data);
        }
        return this._createNode(data, container);
    };
    Node._createNode = function (obj, container) {
        var className = Node.prototype.getClassName.call(obj), children = obj.children, no, len, n;
        if (container) {
            obj.attrs.container = container;
        }
        if (!Global_1._NODES_REGISTRY[className]) {
            Util_1.Util.warn('Can not find a node with class name "' +
                className +
                '". Fallback to "Shape".');
            className = 'Shape';
        }
        var Class = Global_1._NODES_REGISTRY[className];
        no = new Class(obj.attrs);
        if (children) {
            len = children.length;
            for (n = 0; n < len; n++) {
                no.add(Node._createNode(children[n]));
            }
        }
        return no;
    };
    return Node;
}());
exports.Node = Node;
Node.prototype.nodeType = 'Node';
Node.prototype._attrsAffectingSize = [];
Factory_1.Factory.addGetterSetter(Node, 'zIndex');
Factory_1.Factory.addGetterSetter(Node, 'absolutePosition');
Factory_1.Factory.addGetterSetter(Node, 'position');
Factory_1.Factory.addGetterSetter(Node, 'x', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'y', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'globalCompositeOperation', 'source-over', Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Node, 'opacity', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'name', '', Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Node, 'id', '', Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Node, 'rotation', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Node, 'scale', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Node, 'scaleX', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'scaleY', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Node, 'skew', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Node, 'skewX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'skewY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Node, 'offset', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Node, 'offsetX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'offsetY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'dragDistance', null, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'width', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'height', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Node, 'listening', 'inherit', function (val) {
    var isValid = val === true || val === false || val === 'inherit';
    if (!isValid) {
        Util_1.Util.warn(val +
            ' is a not valid value for "listening" attribute. The value may be true, false or "inherit".');
    }
    return val;
});
Factory_1.Factory.addGetterSetter(Node, 'preventDefault', true, Validators_1.getBooleanValidator());
Factory_1.Factory.addGetterSetter(Node, 'filters', null, function (val) {
    this._filterUpToDate = false;
    return val;
});
Factory_1.Factory.addGetterSetter(Node, 'visible', 'inherit', function (val) {
    var isValid = val === true || val === false || val === 'inherit';
    if (!isValid) {
        Util_1.Util.warn(val +
            ' is a not valid value for "visible" attribute. The value may be true, false or "inherit".');
    }
    return val;
});
Factory_1.Factory.addGetterSetter(Node, 'transformsEnabled', 'all', Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Node, 'size');
Factory_1.Factory.addGetterSetter(Node, 'dragBoundFunc');
Factory_1.Factory.addGetterSetter(Node, 'draggable', false, Validators_1.getBooleanValidator());
Factory_1.Factory.backCompat(Node, {
    rotateDeg: 'rotate',
    setRotationDeg: 'setRotation',
    getRotationDeg: 'getRotation'
});
Util_1.Collection.mapMethods(Node);


/***/ }),

/***/ "./node_modules/konva/lib/Shape.js":
/*!*****************************************!*\
  !*** ./node_modules/konva/lib/Shape.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(/*! ./Util */ "./node_modules/konva/lib/Util.js");
var Factory_1 = __webpack_require__(/*! ./Factory */ "./node_modules/konva/lib/Factory.js");
var Node_1 = __webpack_require__(/*! ./Node */ "./node_modules/konva/lib/Node.js");
var Validators_1 = __webpack_require__(/*! ./Validators */ "./node_modules/konva/lib/Validators.js");
var Global_1 = __webpack_require__(/*! ./Global */ "./node_modules/konva/lib/Global.js");
var HAS_SHADOW = 'hasShadow';
var SHADOW_RGBA = 'shadowRGBA';
var patternImage = 'patternImage';
var linearGradient = 'linearGradient';
var radialGradient = 'radialGradient';
var dummyContext;
function getDummyContext() {
    if (dummyContext) {
        return dummyContext;
    }
    dummyContext = Util_1.Util.createCanvasElement().getContext('2d');
    return dummyContext;
}
exports.shapes = {};
function _fillFunc(context) {
    context.fill();
}
function _strokeFunc(context) {
    context.stroke();
}
function _fillFuncHit(context) {
    context.fill();
}
function _strokeFuncHit(context) {
    context.stroke();
}
function _clearHasShadowCache() {
    this._clearCache(HAS_SHADOW);
}
function _clearGetShadowRGBACache() {
    this._clearCache(SHADOW_RGBA);
}
function _clearFillPatternCache() {
    this._clearCache(patternImage);
}
function _clearLinearGradientCache() {
    this._clearCache(linearGradient);
}
function _clearRadialGradientCache() {
    this._clearCache(radialGradient);
}
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape(config) {
        var _this = _super.call(this, config) || this;
        var key;
        while (true) {
            key = Util_1.Util.getRandomColor();
            if (key && !(key in exports.shapes)) {
                break;
            }
        }
        _this.colorKey = key;
        exports.shapes[key] = _this;
        _this.on('shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva', _clearHasShadowCache);
        _this.on('shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva', _clearGetShadowRGBACache);
        _this.on('fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva', _clearFillPatternCache);
        _this.on('fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva', _clearLinearGradientCache);
        _this.on('fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva', _clearRadialGradientCache);
        return _this;
    }
    Shape.prototype.getContext = function () {
        return this.getLayer().getContext();
    };
    Shape.prototype.getCanvas = function () {
        return this.getLayer().getCanvas();
    };
    Shape.prototype.getSceneFunc = function () {
        return this.attrs.sceneFunc || this['_sceneFunc'];
    };
    Shape.prototype.getHitFunc = function () {
        return this.attrs.hitFunc || this['_hitFunc'];
    };
    Shape.prototype.hasShadow = function () {
        return this._getCache(HAS_SHADOW, this._hasShadow);
    };
    Shape.prototype._hasShadow = function () {
        return (this.shadowEnabled() &&
            (this.shadowOpacity() !== 0 &&
                !!(this.shadowColor() ||
                    this.shadowBlur() ||
                    this.shadowOffsetX() ||
                    this.shadowOffsetY())));
    };
    Shape.prototype._getFillPattern = function () {
        return this._getCache(patternImage, this.__getFillPattern);
    };
    Shape.prototype.__getFillPattern = function () {
        if (this.fillPatternImage()) {
            var ctx = getDummyContext();
            return ctx.createPattern(this.fillPatternImage(), this.fillPatternRepeat() || 'repeat');
        }
    };
    Shape.prototype._getLinearGradient = function () {
        return this._getCache(linearGradient, this.__getLinearGradient);
    };
    Shape.prototype.__getLinearGradient = function () {
        var colorStops = this.fillLinearGradientColorStops();
        if (colorStops) {
            var ctx = getDummyContext();
            var start = this.fillLinearGradientStartPoint();
            var end = this.fillLinearGradientEndPoint();
            var grd = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
            for (var n = 0; n < colorStops.length; n += 2) {
                grd.addColorStop(colorStops[n], colorStops[n + 1]);
            }
            return grd;
        }
    };
    Shape.prototype._getRadialGradient = function () {
        return this._getCache(radialGradient, this.__getRadialGradient);
    };
    Shape.prototype.__getRadialGradient = function () {
        var colorStops = this.fillRadialGradientColorStops();
        if (colorStops) {
            var ctx = getDummyContext();
            var start = this.fillRadialGradientStartPoint();
            var end = this.fillRadialGradientEndPoint();
            var grd = ctx.createRadialGradient(start.x, start.y, this.fillRadialGradientStartRadius(), end.x, end.y, this.fillRadialGradientEndRadius());
            for (var n = 0; n < colorStops.length; n += 2) {
                grd.addColorStop(colorStops[n], colorStops[n + 1]);
            }
            return grd;
        }
    };
    Shape.prototype.getShadowRGBA = function () {
        return this._getCache(SHADOW_RGBA, this._getShadowRGBA);
    };
    Shape.prototype._getShadowRGBA = function () {
        if (this.hasShadow()) {
            var rgba = Util_1.Util.colorToRGBA(this.shadowColor());
            return ('rgba(' +
                rgba.r +
                ',' +
                rgba.g +
                ',' +
                rgba.b +
                ',' +
                rgba.a * (this.shadowOpacity() || 1) +
                ')');
        }
    };
    Shape.prototype.hasFill = function () {
        return !!(this.fill() ||
            this.fillPatternImage() ||
            this.fillLinearGradientColorStops() ||
            this.fillRadialGradientColorStops());
    };
    Shape.prototype.hasStroke = function () {
        return (this.strokeEnabled() &&
            this.strokeWidth() &&
            !!(this.stroke() || this.strokeLinearGradientColorStops()));
    };
    Shape.prototype.intersects = function (point) {
        var stage = this.getStage(), bufferHitCanvas = stage.bufferHitCanvas, p;
        bufferHitCanvas.getContext().clear();
        this.drawHit(bufferHitCanvas);
        p = bufferHitCanvas.context.getImageData(Math.round(point.x), Math.round(point.y), 1, 1).data;
        return p[3] > 0;
    };
    Shape.prototype.destroy = function () {
        Node_1.Node.prototype.destroy.call(this);
        delete exports.shapes[this.colorKey];
        delete this.colorKey;
        return this;
    };
    Shape.prototype._useBufferCanvas = function (caching) {
        return ((!caching || this.hasShadow()) &&
            this.perfectDrawEnabled() &&
            this.getAbsoluteOpacity() !== 1 &&
            this.hasFill() &&
            this.hasStroke() &&
            this.getStage());
    };
    Shape.prototype.setStrokeHitEnabled = function (val) {
        if (val) {
            this.hitStrokeWidth('auto');
        }
        else {
            this.hitStrokeWidth(0);
        }
    };
    Shape.prototype.getStrokeHitEnabled = function () {
        if (this.hitStrokeWidth() === 0) {
            return false;
        }
        else {
            return true;
        }
    };
    Shape.prototype.getSelfRect = function () {
        var size = this.size();
        return {
            x: this._centroid ? Math.round(-size.width / 2) : 0,
            y: this._centroid ? Math.round(-size.height / 2) : 0,
            width: size.width,
            height: size.height
        };
    };
    Shape.prototype.getClientRect = function (attrs) {
        attrs = attrs || {};
        var skipTransform = attrs.skipTransform;
        var relativeTo = attrs.relativeTo;
        var fillRect = this.getSelfRect();
        var applyStroke = !attrs.skipStroke && this.hasStroke();
        var strokeWidth = (applyStroke && this.strokeWidth()) || 0;
        var fillAndStrokeWidth = fillRect.width + strokeWidth;
        var fillAndStrokeHeight = fillRect.height + strokeWidth;
        var applyShadow = !attrs.skipShadow && this.hasShadow();
        var shadowOffsetX = applyShadow ? this.shadowOffsetX() : 0;
        var shadowOffsetY = applyShadow ? this.shadowOffsetY() : 0;
        var preWidth = fillAndStrokeWidth + Math.abs(shadowOffsetX);
        var preHeight = fillAndStrokeHeight + Math.abs(shadowOffsetY);
        var blurRadius = (applyShadow && this.shadowBlur()) || 0;
        var width = preWidth + blurRadius * 2;
        var height = preHeight + blurRadius * 2;
        var roundingOffset = 0;
        if (Math.round(strokeWidth / 2) !== strokeWidth / 2) {
            roundingOffset = 1;
        }
        var rect = {
            width: width + roundingOffset,
            height: height + roundingOffset,
            x: -Math.round(strokeWidth / 2 + blurRadius) +
                Math.min(shadowOffsetX, 0) +
                fillRect.x,
            y: -Math.round(strokeWidth / 2 + blurRadius) +
                Math.min(shadowOffsetY, 0) +
                fillRect.y
        };
        if (!skipTransform) {
            return this._transformedRect(rect, relativeTo);
        }
        return rect;
    };
    Shape.prototype.drawScene = function (can, top, caching, skipBuffer) {
        var layer = this.getLayer(), canvas = can || layer.getCanvas(), context = canvas.getContext(), cachedCanvas = this._getCanvasCache(), drawFunc = this.sceneFunc(), hasShadow = this.hasShadow(), hasStroke = this.hasStroke(), stage, bufferCanvas, bufferContext;
        if (!this.isVisible() && !caching) {
            return this;
        }
        if (cachedCanvas) {
            context.save();
            layer._applyTransform(this, context, top);
            this._drawCachedSceneCanvas(context);
            context.restore();
            return this;
        }
        if (!drawFunc) {
            return this;
        }
        context.save();
        if (this._useBufferCanvas(caching) && !skipBuffer) {
            stage = this.getStage();
            bufferCanvas = stage.bufferCanvas;
            bufferContext = bufferCanvas.getContext();
            bufferContext.clear();
            bufferContext.save();
            bufferContext._applyLineJoin(this);
            if (!caching) {
                if (layer) {
                    layer._applyTransform(this, bufferContext, top);
                }
                else {
                    var m = this.getAbsoluteTransform(top).getMatrix();
                    context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
                }
            }
            drawFunc.call(this, bufferContext, this);
            bufferContext.restore();
            var ratio = bufferCanvas.pixelRatio;
            if (hasShadow && !canvas.hitCanvas) {
                context.save();
                context._applyShadow(this);
                context._applyOpacity(this);
                context._applyGlobalCompositeOperation(this);
                context.drawImage(bufferCanvas._canvas, 0, 0, bufferCanvas.width / ratio, bufferCanvas.height / ratio);
                context.restore();
            }
            else {
                context._applyOpacity(this);
                context._applyGlobalCompositeOperation(this);
                context.drawImage(bufferCanvas._canvas, 0, 0, bufferCanvas.width / ratio, bufferCanvas.height / ratio);
            }
        }
        else {
            context._applyLineJoin(this);
            if (!caching) {
                if (layer) {
                    layer._applyTransform(this, context, top);
                }
                else {
                    var o = this.getAbsoluteTransform(top).getMatrix();
                    context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
                }
            }
            if (hasShadow && hasStroke && !canvas.hitCanvas) {
                context.save();
                if (!caching) {
                    context._applyOpacity(this);
                    context._applyGlobalCompositeOperation(this);
                }
                context._applyShadow(this);
                drawFunc.call(this, context, this);
                context.restore();
                if (this.hasFill() && this.shadowForStrokeEnabled()) {
                    drawFunc.call(this, context, this);
                }
            }
            else if (hasShadow && !canvas.hitCanvas) {
                context.save();
                if (!caching) {
                    context._applyOpacity(this);
                    context._applyGlobalCompositeOperation(this);
                }
                context._applyShadow(this);
                drawFunc.call(this, context, this);
                context.restore();
            }
            else {
                if (!caching) {
                    context._applyOpacity(this);
                    context._applyGlobalCompositeOperation(this);
                }
                drawFunc.call(this, context, this);
            }
        }
        context.restore();
        return this;
    };
    Shape.prototype.drawHit = function (can, top, caching) {
        var layer = this.getLayer(), canvas = can || layer.hitCanvas, context = canvas && canvas.getContext(), drawFunc = this.hitFunc() || this.sceneFunc(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
        if (!this.colorKey) {
            Util_1.Util.warn('Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. See the shape in logs above. If you want to reuse shape you should call remove() instead of destroy()');
        }
        if (!this.shouldDrawHit() && !caching) {
            return this;
        }
        if (cachedHitCanvas) {
            context.save();
            layer._applyTransform(this, context, top);
            this._drawCachedHitCanvas(context);
            context.restore();
            return this;
        }
        if (!drawFunc) {
            return this;
        }
        context.save();
        context._applyLineJoin(this);
        if (!caching) {
            if (layer) {
                layer._applyTransform(this, context, top);
            }
            else {
                var o = this.getAbsoluteTransform(top).getMatrix();
                context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
            }
        }
        drawFunc.call(this, context, this);
        context.restore();
        return this;
    };
    Shape.prototype.drawHitFromCache = function (alphaThreshold) {
        var threshold = alphaThreshold || 0, cachedCanvas = this._getCanvasCache(), sceneCanvas = this._getCachedSceneCanvas(), hitCanvas = cachedCanvas.hit, hitContext = hitCanvas.getContext(), hitWidth = hitCanvas.getWidth(), hitHeight = hitCanvas.getHeight(), hitImageData, hitData, len, rgbColorKey, i, alpha;
        hitContext.clear();
        hitContext.drawImage(sceneCanvas._canvas, 0, 0, hitWidth, hitHeight);
        try {
            hitImageData = hitContext.getImageData(0, 0, hitWidth, hitHeight);
            hitData = hitImageData.data;
            len = hitData.length;
            rgbColorKey = Util_1.Util._hexToRgb(this.colorKey);
            for (i = 0; i < len; i += 4) {
                alpha = hitData[i + 3];
                if (alpha > threshold) {
                    hitData[i] = rgbColorKey.r;
                    hitData[i + 1] = rgbColorKey.g;
                    hitData[i + 2] = rgbColorKey.b;
                    hitData[i + 3] = 255;
                }
                else {
                    hitData[i + 3] = 0;
                }
            }
            hitContext.putImageData(hitImageData, 0, 0);
        }
        catch (e) {
            Util_1.Util.error('Unable to draw hit graph from cached scene canvas. ' + e.message);
        }
        return this;
    };
    return Shape;
}(Node_1.Node));
exports.Shape = Shape;
Shape.prototype._fillFunc = _fillFunc;
Shape.prototype._strokeFunc = _strokeFunc;
Shape.prototype._fillFuncHit = _fillFuncHit;
Shape.prototype._strokeFuncHit = _strokeFuncHit;
Shape.prototype._centroid = false;
Shape.prototype.nodeType = 'Shape';
Global_1._registerNode(Shape);
Factory_1.Factory.addGetterSetter(Shape, 'stroke', undefined, Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Shape, 'strokeWidth', 2, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'hitStrokeWidth', 'auto', Validators_1.getNumberOrAutoValidator());
Factory_1.Factory.addGetterSetter(Shape, 'strokeHitEnabled', true, Validators_1.getBooleanValidator());
Factory_1.Factory.addGetterSetter(Shape, 'perfectDrawEnabled', true, Validators_1.getBooleanValidator());
Factory_1.Factory.addGetterSetter(Shape, 'shadowForStrokeEnabled', true, Validators_1.getBooleanValidator());
Factory_1.Factory.addGetterSetter(Shape, 'lineJoin');
Factory_1.Factory.addGetterSetter(Shape, 'lineCap');
Factory_1.Factory.addGetterSetter(Shape, 'sceneFunc');
Factory_1.Factory.addGetterSetter(Shape, 'hitFunc');
Factory_1.Factory.addGetterSetter(Shape, 'dash');
Factory_1.Factory.addGetterSetter(Shape, 'dashOffset', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'shadowColor', undefined, Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Shape, 'shadowBlur', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'shadowOpacity', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Shape, 'shadowOffset', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Shape, 'shadowOffsetX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'shadowOffsetY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternImage');
Factory_1.Factory.addGetterSetter(Shape, 'fill', undefined, Validators_1.getStringValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillLinearGradientColorStops');
Factory_1.Factory.addGetterSetter(Shape, 'strokeLinearGradientColorStops');
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientStartRadius', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientEndRadius', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientColorStops');
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternRepeat', 'repeat');
Factory_1.Factory.addGetterSetter(Shape, 'fillEnabled', true);
Factory_1.Factory.addGetterSetter(Shape, 'strokeEnabled', true);
Factory_1.Factory.addGetterSetter(Shape, 'shadowEnabled', true);
Factory_1.Factory.addGetterSetter(Shape, 'dashEnabled', true);
Factory_1.Factory.addGetterSetter(Shape, 'strokeScaleEnabled', true);
Factory_1.Factory.addGetterSetter(Shape, 'fillPriority', 'color');
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillPatternOffset', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternOffsetX', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternOffsetY', 0, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillPatternScale', ['x', 'y']);
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternScaleX', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternScaleY', 1, Validators_1.getNumberValidator());
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillLinearGradientStartPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addComponentsGetterSetter(Shape, 'strokeLinearGradientStartPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addGetterSetter(Shape, 'fillLinearGradientStartPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'strokeLinearGradientStartPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillLinearGradientStartPointY', 0);
Factory_1.Factory.addGetterSetter(Shape, 'strokeLinearGradientStartPointY', 0);
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillLinearGradientEndPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addComponentsGetterSetter(Shape, 'strokeLinearGradientEndPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addGetterSetter(Shape, 'fillLinearGradientEndPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'strokeLinearGradientEndPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillLinearGradientEndPointY', 0);
Factory_1.Factory.addGetterSetter(Shape, 'strokeLinearGradientEndPointY', 0);
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillRadialGradientStartPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientStartPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientStartPointY', 0);
Factory_1.Factory.addComponentsGetterSetter(Shape, 'fillRadialGradientEndPoint', [
    'x',
    'y'
]);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientEndPointX', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillRadialGradientEndPointY', 0);
Factory_1.Factory.addGetterSetter(Shape, 'fillPatternRotation', 0);
Factory_1.Factory.backCompat(Shape, {
    dashArray: 'dash',
    getDashArray: 'getDash',
    setDashArray: 'getDash',
    drawFunc: 'sceneFunc',
    getDrawFunc: 'getSceneFunc',
    setDrawFunc: 'setSceneFunc',
    drawHitFunc: 'hitFunc',
    getDrawHitFunc: 'getHitFunc',
    setDrawHitFunc: 'setHitFunc'
});
Util_1.Collection.mapMethods(Shape);


/***/ }),

/***/ "./node_modules/konva/lib/Stage.js":
/*!*****************************************!*\
  !*** ./node_modules/konva/lib/Stage.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(/*! ./Util */ "./node_modules/konva/lib/Util.js");
var Factory_1 = __webpack_require__(/*! ./Factory */ "./node_modules/konva/lib/Factory.js");
var Container_1 = __webpack_require__(/*! ./Container */ "./node_modules/konva/lib/Container.js");
var Global_1 = __webpack_require__(/*! ./Global */ "./node_modules/konva/lib/Global.js");
var Canvas_1 = __webpack_require__(/*! ./Canvas */ "./node_modules/konva/lib/Canvas.js");
var DragAndDrop_1 = __webpack_require__(/*! ./DragAndDrop */ "./node_modules/konva/lib/DragAndDrop.js");
var Global_2 = __webpack_require__(/*! ./Global */ "./node_modules/konva/lib/Global.js");
var STAGE = 'Stage', STRING = 'string', PX = 'px', MOUSEOUT = 'mouseout', MOUSELEAVE = 'mouseleave', MOUSEOVER = 'mouseover', MOUSEENTER = 'mouseenter', MOUSEMOVE = 'mousemove', MOUSEDOWN = 'mousedown', MOUSEUP = 'mouseup', CONTEXTMENU = 'contextmenu', CLICK = 'click', DBL_CLICK = 'dblclick', TOUCHSTART = 'touchstart', TOUCHEND = 'touchend', TAP = 'tap', DBL_TAP = 'dbltap', TOUCHMOVE = 'touchmove', WHEEL = 'wheel', CONTENT_MOUSEOUT = 'contentMouseout', CONTENT_MOUSEOVER = 'contentMouseover', CONTENT_MOUSEMOVE = 'contentMousemove', CONTENT_MOUSEDOWN = 'contentMousedown', CONTENT_MOUSEUP = 'contentMouseup', CONTENT_CONTEXTMENU = 'contentContextmenu', CONTENT_CLICK = 'contentClick', CONTENT_DBL_CLICK = 'contentDblclick', CONTENT_TOUCHSTART = 'contentTouchstart', CONTENT_TOUCHEND = 'contentTouchend', CONTENT_DBL_TAP = 'contentDbltap', CONTENT_TAP = 'contentTap', CONTENT_TOUCHMOVE = 'contentTouchmove', CONTENT_WHEEL = 'contentWheel', RELATIVE = 'relative', KONVA_CONTENT = 'konvajs-content', SPACE = ' ', UNDERSCORE = '_', CONTAINER = 'container', MAX_LAYERS_NUMBER = 5, EMPTY_STRING = '', EVENTS = [
    MOUSEENTER,
    MOUSEDOWN,
    MOUSEMOVE,
    MOUSEUP,
    MOUSEOUT,
    TOUCHSTART,
    TOUCHMOVE,
    TOUCHEND,
    MOUSEOVER,
    WHEEL,
    CONTEXTMENU
], eventsLength = EVENTS.length;
function addEvent(ctx, eventName) {
    ctx.content.addEventListener(eventName, function (evt) {
        ctx[UNDERSCORE + eventName](evt);
    }, false);
}
var NO_POINTERS_MESSAGE = "Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);";
exports.stages = [];
function checkNoClip(attrs) {
    if (attrs === void 0) { attrs = {}; }
    if (attrs.clipFunc || attrs.clipWidth || attrs.clipHeight) {
        Util_1.Util.warn('Stage does not support clipping. Please use clip for Layers or Groups.');
    }
    return attrs;
}
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage(config) {
        var _this = _super.call(this, checkNoClip(config)) || this;
        _this._buildDOM();
        _this._bindContentEvents();
        exports.stages.push(_this);
        _this.on('widthChange.konva heightChange.konva', _this._resizeDOM);
        _this.on('visibleChange.konva', _this._checkVisibility);
        _this.on('clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva', function () {
            checkNoClip(_this.attrs);
        });
        _this._checkVisibility();
        return _this;
    }
    Stage.prototype._validateAdd = function (child) {
        var isLayer = child.getType() === 'Layer';
        var isFastLayer = child.getType() === 'FastLayer';
        var valid = isLayer || isFastLayer;
        if (!valid) {
            Util_1.Util.throw('You may only add layers to the stage.');
        }
    };
    Stage.prototype._checkVisibility = function () {
        var style = this.visible() ? '' : 'none';
        this.content.style.display = style;
    };
    Stage.prototype.setContainer = function (container) {
        if (typeof container === STRING) {
            if (container.charAt(0) === '.') {
                var className = container.slice(1);
                container = document.getElementsByClassName(className)[0];
            }
            else {
                var id;
                if (container.charAt(0) !== '#') {
                    id = container;
                }
                else {
                    id = container.slice(1);
                }
                container = document.getElementById(id);
            }
            if (!container) {
                throw 'Can not find container in document with id ' + id;
            }
        }
        this._setAttr(CONTAINER, container);
        if (this.content) {
            this.content.parentElement.removeChild(this.content);
            container.appendChild(this.content);
        }
        return this;
    };
    Stage.prototype.shouldDrawHit = function () {
        return true;
    };
    Stage.prototype.clear = function () {
        var layers = this.children, len = layers.length, n;
        for (n = 0; n < len; n++) {
            layers[n].clear();
        }
        return this;
    };
    Stage.prototype.clone = function (obj) {
        if (!obj) {
            obj = {};
        }
        obj.container = document.createElement('div');
        return Container_1.Container.prototype.clone.call(this, obj);
    };
    Stage.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        var content = this.content;
        if (content && Util_1.Util._isInDocument(content)) {
            this.container().removeChild(content);
        }
        var index = exports.stages.indexOf(this);
        if (index > -1) {
            exports.stages.splice(index, 1);
        }
        return this;
    };
    Stage.prototype.getPointerPosition = function () {
        if (!this.pointerPos) {
            Util_1.Util.warn(NO_POINTERS_MESSAGE);
        }
        return this.pointerPos;
    };
    Stage.prototype.getStage = function () {
        return this;
    };
    Stage.prototype.getContent = function () {
        return this.content;
    };
    Stage.prototype._toKonvaCanvas = function (config) {
        config = config || {};
        var x = config.x || 0, y = config.y || 0, canvas = new Canvas_1.SceneCanvas({
            width: config.width || this.width(),
            height: config.height || this.height(),
            pixelRatio: config.pixelRatio || 1
        }), _context = canvas.getContext()._context, layers = this.children;
        if (x || y) {
            _context.translate(-1 * x, -1 * y);
        }
        layers.each(function (layer) {
            if (!layer.isVisible()) {
                return;
            }
            var layerCanvas = layer._toKonvaCanvas(config);
            _context.drawImage(layerCanvas._canvas, x, y, layerCanvas.getWidth() / layerCanvas.getPixelRatio(), layerCanvas.getHeight() / layerCanvas.getPixelRatio());
        });
        return canvas;
    };
    Stage.prototype.getIntersection = function (pos, selector) {
        var layers = this.children, len = layers.length, end = len - 1, n, shape;
        for (n = end; n >= 0; n--) {
            shape = layers[n].getIntersection(pos, selector);
            if (shape) {
                return shape;
            }
        }
        return null;
    };
    Stage.prototype._resizeDOM = function () {
        if (this.content) {
            var width = this.width(), height = this.height(), layers = this.getChildren(), len = layers.length, n, layer;
            this.content.style.width = width + PX;
            this.content.style.height = height + PX;
            this.bufferCanvas.setSize(width, height);
            this.bufferHitCanvas.setSize(width, height);
            for (n = 0; n < len; n++) {
                layer = layers[n];
                layer.setSize({ width: width, height: height });
                layer.draw();
            }
        }
    };
    Stage.prototype.add = function (layer) {
        if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }
            return this;
        }
        _super.prototype.add.call(this, layer);
        var length = this.children.length;
        if (length > MAX_LAYERS_NUMBER) {
            Util_1.Util.warn('The stage has ' +
                length +
                ' layers. Recommended maximin number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group.');
        }
        layer._setCanvasSize(this.width(), this.height());
        layer.draw();
        if (Global_1.Konva.isBrowser) {
            this.content.appendChild(layer.canvas._canvas);
        }
        return this;
    };
    Stage.prototype.getParent = function () {
        return null;
    };
    Stage.prototype.getLayer = function () {
        return null;
    };
    Stage.prototype.getLayers = function () {
        return this.getChildren();
    };
    Stage.prototype._bindContentEvents = function () {
        if (!Global_1.Konva.isBrowser) {
            return;
        }
        for (var n = 0; n < eventsLength; n++) {
            addEvent(this, EVENTS[n]);
        }
    };
    Stage.prototype._mouseenter = function (evt) {
        this.setPointersPositions(evt);
        this._fire(MOUSEENTER, { evt: evt, target: this, currentTarget: this });
    };
    Stage.prototype._mouseover = function (evt) {
        this.setPointersPositions(evt);
        this._fire(CONTENT_MOUSEOVER, { evt: evt });
        this._fire(MOUSEOVER, { evt: evt, target: this, currentTarget: this });
    };
    Stage.prototype._mouseout = function (evt) {
        this.setPointersPositions(evt);
        var targetShape = this.targetShape;
        if (targetShape && !DragAndDrop_1.DD.isDragging) {
            targetShape._fireAndBubble(MOUSEOUT, { evt: evt });
            targetShape._fireAndBubble(MOUSELEAVE, { evt: evt });
            this.targetShape = null;
        }
        else if (!DragAndDrop_1.DD.isDragging) {
            this._fire(MOUSELEAVE, {
                evt: evt,
                target: this,
                currentTarget: this
            });
            this._fire(MOUSEOUT, {
                evt: evt,
                target: this,
                currentTarget: this
            });
        }
        this.pointerPos = undefined;
        this._fire(CONTENT_MOUSEOUT, { evt: evt });
    };
    Stage.prototype._mousemove = function (evt) {
        if (Global_1.Konva.UA.ieMobile) {
            return this._touchmove(evt);
        }
        this.setPointersPositions(evt);
        var shape;
        if (!DragAndDrop_1.DD.isDragging) {
            shape = this.getIntersection(this.getPointerPosition());
            if (shape && shape.isListening()) {
                var differentTarget = !this.targetShape || this.targetShape !== shape;
                if (!DragAndDrop_1.DD.isDragging && differentTarget) {
                    if (this.targetShape) {
                        this.targetShape._fireAndBubble(MOUSEOUT, { evt: evt }, shape);
                        this.targetShape._fireAndBubble(MOUSELEAVE, { evt: evt }, shape);
                    }
                    shape._fireAndBubble(MOUSEOVER, { evt: evt }, this.targetShape);
                    shape._fireAndBubble(MOUSEENTER, { evt: evt }, this.targetShape);
                    this.targetShape = shape;
                }
                else {
                    shape._fireAndBubble(MOUSEMOVE, { evt: evt });
                }
            }
            else {
                if (this.targetShape && !DragAndDrop_1.DD.isDragging) {
                    this.targetShape._fireAndBubble(MOUSEOUT, { evt: evt });
                    this.targetShape._fireAndBubble(MOUSELEAVE, { evt: evt });
                    this._fire(MOUSEOVER, {
                        evt: evt,
                        target: this,
                        currentTarget: this
                    });
                    this.targetShape = null;
                }
                this._fire(MOUSEMOVE, {
                    evt: evt,
                    target: this,
                    currentTarget: this
                });
            }
            this._fire(CONTENT_MOUSEMOVE, { evt: evt });
        }
        if (evt.cancelable) {
            evt.preventDefault();
        }
    };
    Stage.prototype._mousedown = function (evt) {
        if (Global_1.Konva.UA.ieMobile) {
            return this._touchstart(evt);
        }
        this.setPointersPositions(evt);
        var shape = this.getIntersection(this.getPointerPosition());
        Global_1.Konva.listenClickTap = true;
        if (shape && shape.isListening()) {
            this.clickStartShape = shape;
            shape._fireAndBubble(MOUSEDOWN, { evt: evt });
        }
        else {
            this._fire(MOUSEDOWN, {
                evt: evt,
                target: this,
                currentTarget: this
            });
        }
        this._fire(CONTENT_MOUSEDOWN, { evt: evt });
    };
    Stage.prototype._mouseup = function (evt) {
        if (Global_1.Konva.UA.ieMobile) {
            return this._touchend(evt);
        }
        this.setPointersPositions(evt);
        var shape = this.getIntersection(this.getPointerPosition()), clickStartShape = this.clickStartShape, clickEndShape = this.clickEndShape, fireDblClick = false;
        if (Global_1.Konva.inDblClickWindow) {
            fireDblClick = true;
            clearTimeout(this.dblTimeout);
        }
        else if (!DragAndDrop_1.DD.justDragged) {
            Global_1.Konva.inDblClickWindow = true;
            clearTimeout(this.dblTimeout);
        }
        else if (DragAndDrop_1.DD) {
            DragAndDrop_1.DD.justDragged = false;
        }
        this.dblTimeout = setTimeout(function () {
            Global_1.Konva.inDblClickWindow = false;
        }, Global_1.Konva.dblClickWindow);
        if (shape && shape.isListening()) {
            this.clickEndShape = shape;
            shape._fireAndBubble(MOUSEUP, { evt: evt });
            if (Global_1.Konva.listenClickTap &&
                clickStartShape &&
                clickStartShape._id === shape._id) {
                shape._fireAndBubble(CLICK, { evt: evt });
                if (fireDblClick && clickEndShape && clickEndShape._id === shape._id) {
                    shape._fireAndBubble(DBL_CLICK, { evt: evt });
                }
            }
        }
        else {
            this._fire(MOUSEUP, { evt: evt, target: this, currentTarget: this });
            if (Global_1.Konva.listenClickTap) {
                this._fire(CLICK, { evt: evt, target: this, currentTarget: this });
            }
            if (fireDblClick) {
                this._fire(DBL_CLICK, {
                    evt: evt,
                    target: this,
                    currentTarget: this
                });
            }
        }
        this._fire(CONTENT_MOUSEUP, { evt: evt });
        if (Global_1.Konva.listenClickTap) {
            this._fire(CONTENT_CLICK, { evt: evt });
            if (fireDblClick) {
                this._fire(CONTENT_DBL_CLICK, { evt: evt });
            }
        }
        Global_1.Konva.listenClickTap = false;
        if (evt.cancelable) {
            evt.preventDefault();
        }
    };
    Stage.prototype._contextmenu = function (evt) {
        this.setPointersPositions(evt);
        var shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
            shape._fireAndBubble(CONTEXTMENU, { evt: evt });
        }
        else {
            this._fire(CONTEXTMENU, {
                evt: evt,
                target: this,
                currentTarget: this
            });
        }
        this._fire(CONTENT_CONTEXTMENU, { evt: evt });
    };
    Stage.prototype._touchstart = function (evt) {
        this.setPointersPositions(evt);
        var shape = this.getIntersection(this.getPointerPosition());
        Global_1.Konva.listenClickTap = true;
        if (shape && shape.isListening()) {
            this.tapStartShape = shape;
            shape._fireAndBubble(TOUCHSTART, { evt: evt });
            if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
                evt.preventDefault();
            }
        }
        else {
            this._fire(TOUCHSTART, {
                evt: evt,
                target: this,
                currentTarget: this
            });
        }
        this._fire(CONTENT_TOUCHSTART, { evt: evt });
    };
    Stage.prototype._touchend = function (evt) {
        this.setPointersPositions(evt);
        var shape = this.getIntersection(this.getPointerPosition()), fireDblClick = false;
        if (Global_1.Konva.inDblClickWindow) {
            fireDblClick = true;
            clearTimeout(this.dblTimeout);
        }
        else {
            Global_1.Konva.inDblClickWindow = true;
            clearTimeout(this.dblTimeout);
        }
        this.dblTimeout = setTimeout(function () {
            Global_1.Konva.inDblClickWindow = false;
        }, Global_1.Konva.dblClickWindow);
        if (shape && shape.isListening()) {
            shape._fireAndBubble(TOUCHEND, { evt: evt });
            if (Global_1.Konva.listenClickTap &&
                this.tapStartShape &&
                shape._id === this.tapStartShape._id) {
                shape._fireAndBubble(TAP, { evt: evt });
                if (fireDblClick) {
                    shape._fireAndBubble(DBL_TAP, { evt: evt });
                }
            }
            if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
                evt.preventDefault();
            }
        }
        else {
            this._fire(TOUCHEND, { evt: evt, target: this, currentTarget: this });
            if (Global_1.Konva.listenClickTap) {
                this._fire(TAP, { evt: evt, target: this, currentTarget: this });
            }
            if (fireDblClick) {
                this._fire(DBL_TAP, {
                    evt: evt,
                    target: this,
                    currentTarget: this
                });
            }
        }
        this._fire(CONTENT_TOUCHEND, { evt: evt });
        if (Global_1.Konva.listenClickTap) {
            this._fire(CONTENT_TAP, { evt: evt });
            if (fireDblClick) {
                this._fire(CONTENT_DBL_TAP, { evt: evt });
            }
        }
        Global_1.Konva.listenClickTap = false;
    };
    Stage.prototype._touchmove = function (evt) {
        this.setPointersPositions(evt);
        var shape;
        if (!DragAndDrop_1.DD.isDragging) {
            shape = this.getIntersection(this.getPointerPosition());
            if (shape && shape.isListening()) {
                shape._fireAndBubble(TOUCHMOVE, { evt: evt });
                if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
                    evt.preventDefault();
                }
            }
            else {
                this._fire(TOUCHMOVE, {
                    evt: evt,
                    target: this,
                    currentTarget: this
                });
            }
            this._fire(CONTENT_TOUCHMOVE, { evt: evt });
        }
        if (DragAndDrop_1.DD.isDragging && DragAndDrop_1.DD.node.preventDefault() && evt.cancelable) {
            evt.preventDefault();
        }
    };
    Stage.prototype._wheel = function (evt) {
        this.setPointersPositions(evt);
        var shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
            shape._fireAndBubble(WHEEL, { evt: evt });
        }
        else {
            this._fire(WHEEL, {
                evt: evt,
                target: this,
                currentTarget: this
            });
        }
        this._fire(CONTENT_WHEEL, { evt: evt });
    };
    Stage.prototype.setPointersPositions = function (evt) {
        var contentPosition = this._getContentPosition(), x = null, y = null;
        evt = evt ? evt : window.event;
        if (evt.touches !== undefined) {
            if (evt.touches.length > 0) {
                var touch = evt.touches[0];
                x = touch.clientX - contentPosition.left;
                y = touch.clientY - contentPosition.top;
            }
        }
        else {
            x = evt.clientX - contentPosition.left;
            y = evt.clientY - contentPosition.top;
        }
        if (x !== null && y !== null) {
            this.pointerPos = {
                x: x,
                y: y
            };
        }
    };
    Stage.prototype._setPointerPosition = function (evt) {
        Util_1.Util.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.');
        this.setPointersPositions(evt);
    };
    Stage.prototype._getContentPosition = function () {
        var rect = this.content.getBoundingClientRect
            ? this.content.getBoundingClientRect()
            : { top: 0, left: 0 };
        return {
            top: rect.top,
            left: rect.left
        };
    };
    Stage.prototype._buildDOM = function () {
        this.bufferCanvas = new Canvas_1.SceneCanvas();
        this.bufferHitCanvas = new Canvas_1.HitCanvas({ pixelRatio: 1 });
        if (!Global_1.Konva.isBrowser) {
            return;
        }
        var container = this.container();
        if (!container) {
            throw 'Stage has no container. A container is required.';
        }
        container.innerHTML = EMPTY_STRING;
        this.content = document.createElement('div');
        this.content.style.position = RELATIVE;
        this.content.style.userSelect = 'none';
        this.content.className = KONVA_CONTENT;
        this.content.setAttribute('role', 'presentation');
        container.appendChild(this.content);
        this._resizeDOM();
    };
    Stage.prototype.cache = function () {
        Util_1.Util.warn('Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.');
        return this;
    };
    Stage.prototype.clearCache = function () {
        return this;
    };
    Stage.prototype.batchDraw = function () {
        this.children.each(function (layer) {
            layer.batchDraw();
        });
        return this;
    };
    return Stage;
}(Container_1.Container));
exports.Stage = Stage;
Stage.prototype.nodeType = STAGE;
Global_2._registerNode(Stage);
Factory_1.Factory.addGetterSetter(Stage, 'container');


/***/ }),

/***/ "./node_modules/konva/lib/Tween.js":
/*!*****************************************!*\
  !*** ./node_modules/konva/lib/Tween.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(/*! ./Util */ "./node_modules/konva/lib/Util.js");
var Animation_1 = __webpack_require__(/*! ./Animation */ "./node_modules/konva/lib/Animation.js");
var Node_1 = __webpack_require__(/*! ./Node */ "./node_modules/konva/lib/Node.js");
var Global_1 = __webpack_require__(/*! ./Global */ "./node_modules/konva/lib/Global.js");
var blacklist = {
    node: 1,
    duration: 1,
    easing: 1,
    onFinish: 1,
    yoyo: 1
}, PAUSED = 1, PLAYING = 2, REVERSING = 3, idCounter = 0, colorAttrs = ['fill', 'stroke', 'shadowColor'];
var TweenEngine = (function () {
    function TweenEngine(prop, propFunc, func, begin, finish, duration, yoyo) {
        this.prop = prop;
        this.propFunc = propFunc;
        this.begin = begin;
        this._pos = begin;
        this.duration = duration;
        this._change = 0;
        this.prevPos = 0;
        this.yoyo = yoyo;
        this._time = 0;
        this._position = 0;
        this._startTime = 0;
        this._finish = 0;
        this.func = func;
        this._change = finish - this.begin;
        this.pause();
    }
    TweenEngine.prototype.fire = function (str) {
        var handler = this[str];
        if (handler) {
            handler();
        }
    };
    TweenEngine.prototype.setTime = function (t) {
        if (t > this.duration) {
            if (this.yoyo) {
                this._time = this.duration;
                this.reverse();
            }
            else {
                this.finish();
            }
        }
        else if (t < 0) {
            if (this.yoyo) {
                this._time = 0;
                this.play();
            }
            else {
                this.reset();
            }
        }
        else {
            this._time = t;
            this.update();
        }
    };
    TweenEngine.prototype.getTime = function () {
        return this._time;
    };
    TweenEngine.prototype.setPosition = function (p) {
        this.prevPos = this._pos;
        this.propFunc(p);
        this._pos = p;
    };
    TweenEngine.prototype.getPosition = function (t) {
        if (t === undefined) {
            t = this._time;
        }
        return this.func(t, this.begin, this._change, this.duration);
    };
    TweenEngine.prototype.play = function () {
        this.state = PLAYING;
        this._startTime = this.getTimer() - this._time;
        this.onEnterFrame();
        this.fire('onPlay');
    };
    TweenEngine.prototype.reverse = function () {
        this.state = REVERSING;
        this._time = this.duration - this._time;
        this._startTime = this.getTimer() - this._time;
        this.onEnterFrame();
        this.fire('onReverse');
    };
    TweenEngine.prototype.seek = function (t) {
        this.pause();
        this._time = t;
        this.update();
        this.fire('onSeek');
    };
    TweenEngine.prototype.reset = function () {
        this.pause();
        this._time = 0;
        this.update();
        this.fire('onReset');
    };
    TweenEngine.prototype.finish = function () {
        this.pause();
        this._time = this.duration;
        this.update();
        this.fire('onFinish');
    };
    TweenEngine.prototype.update = function () {
        this.setPosition(this.getPosition(this._time));
    };
    TweenEngine.prototype.onEnterFrame = function () {
        var t = this.getTimer() - this._startTime;
        if (this.state === PLAYING) {
            this.setTime(t);
        }
        else if (this.state === REVERSING) {
            this.setTime(this.duration - t);
        }
    };
    TweenEngine.prototype.pause = function () {
        this.state = PAUSED;
        this.fire('onPause');
    };
    TweenEngine.prototype.getTimer = function () {
        return new Date().getTime();
    };
    return TweenEngine;
}());
var Tween = (function () {
    function Tween(config) {
        var that = this, node = config.node, nodeId = node._id, duration, easing = config.easing || exports.Easings.Linear, yoyo = !!config.yoyo, key;
        if (typeof config.duration === 'undefined') {
            duration = 0.3;
        }
        else if (config.duration === 0) {
            duration = 0.001;
        }
        else {
            duration = config.duration;
        }
        this.node = node;
        this._id = idCounter++;
        var layers = node.getLayer() ||
            (node instanceof Global_1.Konva['Stage'] ? node.getLayers() : null);
        if (!layers) {
            Util_1.Util.error('Tween constructor have `node` that is not in a layer. Please add node into layer first.');
        }
        this.anim = new Animation_1.Animation(function () {
            that.tween.onEnterFrame();
        }, layers);
        this.tween = new TweenEngine(key, function (i) {
            that._tweenFunc(i);
        }, easing, 0, 1, duration * 1000, yoyo);
        this._addListeners();
        if (!Tween.attrs[nodeId]) {
            Tween.attrs[nodeId] = {};
        }
        if (!Tween.attrs[nodeId][this._id]) {
            Tween.attrs[nodeId][this._id] = {};
        }
        if (!Tween.tweens[nodeId]) {
            Tween.tweens[nodeId] = {};
        }
        for (key in config) {
            if (blacklist[key] === undefined) {
                this._addAttr(key, config[key]);
            }
        }
        this.reset();
        this.onFinish = config.onFinish;
        this.onReset = config.onReset;
    }
    Tween.prototype._addAttr = function (key, end) {
        var node = this.node, nodeId = node._id, start, diff, tweenId, n, len, trueEnd, trueStart, endRGBA;
        tweenId = Tween.tweens[nodeId][key];
        if (tweenId) {
            delete Tween.attrs[nodeId][tweenId][key];
        }
        start = node.getAttr(key);
        if (Util_1.Util._isArray(end)) {
            diff = [];
            len = Math.max(end.length, start.length);
            if (key === 'points' && end.length !== start.length) {
                if (end.length > start.length) {
                    trueStart = start;
                    start = Util_1.Util._prepareArrayForTween(start, end, node.closed());
                }
                else {
                    trueEnd = end;
                    end = Util_1.Util._prepareArrayForTween(end, start, node.closed());
                }
            }
            if (key.indexOf('fill') === 0) {
                for (n = 0; n < len; n++) {
                    if (n % 2 === 0) {
                        diff.push(end[n] - start[n]);
                    }
                    else {
                        var startRGBA = Util_1.Util.colorToRGBA(start[n]);
                        endRGBA = Util_1.Util.colorToRGBA(end[n]);
                        start[n] = startRGBA;
                        diff.push({
                            r: endRGBA.r - startRGBA.r,
                            g: endRGBA.g - startRGBA.g,
                            b: endRGBA.b - startRGBA.b,
                            a: endRGBA.a - startRGBA.a
                        });
                    }
                }
            }
            else {
                for (n = 0; n < len; n++) {
                    diff.push(end[n] - start[n]);
                }
            }
        }
        else if (colorAttrs.indexOf(key) !== -1) {
            start = Util_1.Util.colorToRGBA(start);
            endRGBA = Util_1.Util.colorToRGBA(end);
            diff = {
                r: endRGBA.r - start.r,
                g: endRGBA.g - start.g,
                b: endRGBA.b - start.b,
                a: endRGBA.a - start.a
            };
        }
        else {
            diff = end - start;
        }
        Tween.attrs[nodeId][this._id][key] = {
            start: start,
            diff: diff,
            end: end,
            trueEnd: trueEnd,
            trueStart: trueStart
        };
        Tween.tweens[nodeId][key] = this._id;
    };
    Tween.prototype._tweenFunc = function (i) {
        var node = this.node, attrs = Tween.attrs[node._id][this._id], key, attr, start, diff, newVal, n, len, end;
        for (key in attrs) {
            attr = attrs[key];
            start = attr.start;
            diff = attr.diff;
            end = attr.end;
            if (Util_1.Util._isArray(start)) {
                newVal = [];
                len = Math.max(start.length, end.length);
                if (key.indexOf('fill') === 0) {
                    for (n = 0; n < len; n++) {
                        if (n % 2 === 0) {
                            newVal.push((start[n] || 0) + diff[n] * i);
                        }
                        else {
                            newVal.push('rgba(' +
                                Math.round(start[n].r + diff[n].r * i) +
                                ',' +
                                Math.round(start[n].g + diff[n].g * i) +
                                ',' +
                                Math.round(start[n].b + diff[n].b * i) +
                                ',' +
                                (start[n].a + diff[n].a * i) +
                                ')');
                        }
                    }
                }
                else {
                    for (n = 0; n < len; n++) {
                        newVal.push((start[n] || 0) + diff[n] * i);
                    }
                }
            }
            else if (colorAttrs.indexOf(key) !== -1) {
                newVal =
                    'rgba(' +
                        Math.round(start.r + diff.r * i) +
                        ',' +
                        Math.round(start.g + diff.g * i) +
                        ',' +
                        Math.round(start.b + diff.b * i) +
                        ',' +
                        (start.a + diff.a * i) +
                        ')';
            }
            else {
                newVal = start + diff * i;
            }
            node.setAttr(key, newVal);
        }
    };
    Tween.prototype._addListeners = function () {
        var _this = this;
        this.tween.onPlay = function () {
            _this.anim.start();
        };
        this.tween.onReverse = function () {
            _this.anim.start();
        };
        this.tween.onPause = function () {
            _this.anim.stop();
        };
        this.tween.onFinish = function () {
            var node = _this.node;
            var attrs = Tween.attrs[node._id][_this._id];
            if (attrs.points && attrs.points.trueEnd) {
                node.setAttr('points', attrs.points.trueEnd);
            }
            if (_this.onFinish) {
                _this.onFinish.call(_this);
            }
        };
        this.tween.onReset = function () {
            var node = _this.node;
            var attrs = Tween.attrs[node._id][_this._id];
            if (attrs.points && attrs.points.trueStart) {
                node.points(attrs.points.trueStart);
            }
            if (_this.onReset) {
                _this.onReset();
            }
        };
    };
    Tween.prototype.play = function () {
        this.tween.play();
        return this;
    };
    Tween.prototype.reverse = function () {
        this.tween.reverse();
        return this;
    };
    Tween.prototype.reset = function () {
        this.tween.reset();
        return this;
    };
    Tween.prototype.seek = function (t) {
        this.tween.seek(t * 1000);
        return this;
    };
    Tween.prototype.pause = function () {
        this.tween.pause();
        return this;
    };
    Tween.prototype.finish = function () {
        this.tween.finish();
        return this;
    };
    Tween.prototype.destroy = function () {
        var nodeId = this.node._id, thisId = this._id, attrs = Tween.tweens[nodeId], key;
        this.pause();
        for (key in attrs) {
            delete Tween.tweens[nodeId][key];
        }
        delete Tween.attrs[nodeId][thisId];
    };
    Tween.attrs = {};
    Tween.tweens = {};
    return Tween;
}());
exports.Tween = Tween;
Node_1.Node.prototype.to = function (params) {
    var onFinish = params.onFinish;
    params.node = this;
    params.onFinish = function () {
        this.destroy();
        if (onFinish) {
            onFinish();
        }
    };
    var tween = new Tween(params);
    tween.play();
};
exports.Easings = {
    BackEaseIn: function (t, b, c, d) {
        var s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    BackEaseOut: function (t, b, c, d) {
        var s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    BackEaseInOut: function (t, b, c, d) {
        var s = 1.70158;
        if ((t /= d / 2) < 1) {
            return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        }
        return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    },
    ElasticEaseIn: function (t, b, c, d, a, p) {
        var s = 0;
        if (t === 0) {
            return b;
        }
        if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        return (-(a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b);
    },
    ElasticEaseOut: function (t, b, c, d, a, p) {
        var s = 0;
        if (t === 0) {
            return b;
        }
        if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        return (a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
            c +
            b);
    },
    ElasticEaseInOut: function (t, b, c, d, a, p) {
        var s = 0;
        if (t === 0) {
            return b;
        }
        if ((t /= d / 2) === 2) {
            return b + c;
        }
        if (!p) {
            p = d * (0.3 * 1.5);
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        if (t < 1) {
            return (-0.5 *
                (a *
                    Math.pow(2, 10 * (t -= 1)) *
                    Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
                b);
        }
        return (a *
            Math.pow(2, -10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
            0.5 +
            c +
            b);
    },
    BounceEaseOut: function (t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
            return c * (7.5625 * t * t) + b;
        }
        else if (t < 2 / 2.75) {
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        }
        else if (t < 2.5 / 2.75) {
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        }
        else {
            return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
        }
    },
    BounceEaseIn: function (t, b, c, d) {
        return c - exports.Easings.BounceEaseOut(d - t, 0, c, d) + b;
    },
    BounceEaseInOut: function (t, b, c, d) {
        if (t < d / 2) {
            return exports.Easings.BounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
        }
        else {
            return exports.Easings.BounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
        }
    },
    EaseIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    EaseOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    EaseInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return (c / 2) * t * t + b;
        }
        return (-c / 2) * (--t * (t - 2) - 1) + b;
    },
    StrongEaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    StrongEaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    StrongEaseInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return (c / 2) * t * t * t * t * t + b;
        }
        return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
    },
    Linear: function (t, b, c, d) {
        return (c * t) / d + b;
    }
};


/***/ }),

/***/ "./node_modules/konva/lib/Util.js":
/*!****************************************!*\
  !*** ./node_modules/konva/lib/Util.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = __webpack_require__(/*! ./Global */ "./node_modules/konva/lib/Global.js");
var Collection = (function () {
    function Collection() {
    }
    Collection.toCollection = function (arr) {
        var collection = new Collection(), len = arr.length, n;
        for (n = 0; n < len; n++) {
            collection.push(arr[n]);
        }
        return collection;
    };
    Collection._mapMethod = function (methodName) {
        Collection.prototype[methodName] = function () {
            var len = this.length, i;
            var args = [].slice.call(arguments);
            for (i = 0; i < len; i++) {
                this[i][methodName].apply(this[i], args);
            }
            return this;
        };
    };
    Collection.mapMethods = function (constructor) {
        var prot = constructor.prototype;
        for (var methodName in prot) {
            Collection._mapMethod(methodName);
        }
    };
    return Collection;
}());
exports.Collection = Collection;
Collection.prototype = [];
Collection.prototype.each = function (func) {
    for (var n = 0; n < this.length; n++) {
        func(this[n], n);
    }
};
Collection.prototype.toArray = function () {
    var arr = [], len = this.length, n;
    for (n = 0; n < len; n++) {
        arr.push(this[n]);
    }
    return arr;
};
var Transform = (function () {
    function Transform(m) {
        if (m === void 0) { m = [1, 0, 0, 1, 0, 0]; }
        this.m = (m && m.slice()) || [1, 0, 0, 1, 0, 0];
    }
    Transform.prototype.copy = function () {
        return new Transform(this.m);
    };
    Transform.prototype.point = function (point) {
        var m = this.m;
        return {
            x: m[0] * point.x + m[2] * point.y + m[4],
            y: m[1] * point.x + m[3] * point.y + m[5]
        };
    };
    Transform.prototype.translate = function (x, y) {
        this.m[4] += this.m[0] * x + this.m[2] * y;
        this.m[5] += this.m[1] * x + this.m[3] * y;
        return this;
    };
    Transform.prototype.scale = function (sx, sy) {
        this.m[0] *= sx;
        this.m[1] *= sx;
        this.m[2] *= sy;
        this.m[3] *= sy;
        return this;
    };
    Transform.prototype.rotate = function (rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var m11 = this.m[0] * c + this.m[2] * s;
        var m12 = this.m[1] * c + this.m[3] * s;
        var m21 = this.m[0] * -s + this.m[2] * c;
        var m22 = this.m[1] * -s + this.m[3] * c;
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        return this;
    };
    Transform.prototype.getTranslation = function () {
        return {
            x: this.m[4],
            y: this.m[5]
        };
    };
    Transform.prototype.skew = function (sx, sy) {
        var m11 = this.m[0] + this.m[2] * sy;
        var m12 = this.m[1] + this.m[3] * sy;
        var m21 = this.m[2] + this.m[0] * sx;
        var m22 = this.m[3] + this.m[1] * sx;
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        return this;
    };
    Transform.prototype.multiply = function (matrix) {
        var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
        var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];
        var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
        var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];
        var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
        var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        this.m[4] = dx;
        this.m[5] = dy;
        return this;
    };
    Transform.prototype.invert = function () {
        var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
        var m0 = this.m[3] * d;
        var m1 = -this.m[1] * d;
        var m2 = -this.m[2] * d;
        var m3 = this.m[0] * d;
        var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
        var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
        this.m[0] = m0;
        this.m[1] = m1;
        this.m[2] = m2;
        this.m[3] = m3;
        this.m[4] = m4;
        this.m[5] = m5;
        return this;
    };
    Transform.prototype.getMatrix = function () {
        return this.m;
    };
    Transform.prototype.setAbsolutePosition = function (x, y) {
        var m0 = this.m[0], m1 = this.m[1], m2 = this.m[2], m3 = this.m[3], m4 = this.m[4], m5 = this.m[5], yt = (m0 * (y - m5) - m1 * (x - m4)) / (m0 * m3 - m1 * m2), xt = (x - m4 - m2 * yt) / m0;
        return this.translate(xt, yt);
    };
    return Transform;
}());
exports.Transform = Transform;
var OBJECT_ARRAY = '[object Array]', OBJECT_NUMBER = '[object Number]', OBJECT_STRING = '[object String]', OBJECT_BOOLEAN = '[object Boolean]', PI_OVER_DEG180 = Math.PI / 180, DEG180_OVER_PI = 180 / Math.PI, HASH = '#', EMPTY_STRING = '', ZERO = '0', KONVA_WARNING = 'Konva warning: ', KONVA_ERROR = 'Konva error: ', RGB_PAREN = 'rgb(', COLORS = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 132, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 255, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 203],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [119, 128, 144],
    slategrey: [119, 128, 144],
    snow: [255, 255, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    transparent: [255, 255, 255, 0],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 5]
}, RGB_REGEX = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/, animQueue = [];
exports.Util = {
    _isElement: function (obj) {
        return !!(obj && obj.nodeType == 1);
    },
    _isFunction: function (obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    },
    _isPlainObject: function (obj) {
        return !!obj && obj.constructor === Object;
    },
    _isArray: function (obj) {
        return Object.prototype.toString.call(obj) === OBJECT_ARRAY;
    },
    _isNumber: function (obj) {
        return (Object.prototype.toString.call(obj) === OBJECT_NUMBER &&
            !isNaN(obj) &&
            isFinite(obj));
    },
    _isString: function (obj) {
        return Object.prototype.toString.call(obj) === OBJECT_STRING;
    },
    _isBoolean: function (obj) {
        return Object.prototype.toString.call(obj) === OBJECT_BOOLEAN;
    },
    isObject: function (val) {
        return val instanceof Object;
    },
    isValidSelector: function (selector) {
        if (typeof selector !== 'string') {
            return false;
        }
        var firstChar = selector[0];
        return (firstChar === '#' ||
            firstChar === '.' ||
            firstChar === firstChar.toUpperCase());
    },
    _sign: function (number) {
        if (number === 0) {
            return 0;
        }
        if (number > 0) {
            return 1;
        }
        else {
            return -1;
        }
    },
    requestAnimFrame: function (callback) {
        animQueue.push(callback);
        if (animQueue.length === 1) {
            requestAnimationFrame(function () {
                var queue = animQueue;
                animQueue = [];
                queue.forEach(function (cb) {
                    cb();
                });
            });
        }
    },
    createCanvasElement: function () {
        var canvas = document.createElement('canvas');
        try {
            canvas.style = canvas.style || {};
        }
        catch (e) { }
        return canvas;
    },
    createImageElement: function () {
        return document.createElement('img');
    },
    _isInDocument: function (el) {
        while ((el = el.parentNode)) {
            if (el == document) {
                return true;
            }
        }
        return false;
    },
    _simplifyArray: function (arr) {
        var retArr = [], len = arr.length, util = exports.Util, n, val;
        for (n = 0; n < len; n++) {
            val = arr[n];
            if (util._isNumber(val)) {
                val = Math.round(val * 1000) / 1000;
            }
            else if (!util._isString(val)) {
                val = val.toString();
            }
            retArr.push(val);
        }
        return retArr;
    },
    _urlToImage: function (url, callback) {
        var imageObj = new Global_1.glob.Image();
        imageObj.onload = function () {
            callback(imageObj);
        };
        imageObj.src = url;
    },
    _rgbToHex: function (r, g, b) {
        return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    _hexToRgb: function (hex) {
        hex = hex.replace(HASH, EMPTY_STRING);
        var bigint = parseInt(hex, 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    },
    getRandomColor: function () {
        var randColor = ((Math.random() * 0xffffff) << 0).toString(16);
        while (randColor.length < 6) {
            randColor = ZERO + randColor;
        }
        return HASH + randColor;
    },
    get: function (val, def) {
        if (val === undefined) {
            return def;
        }
        else {
            return val;
        }
    },
    getRGB: function (color) {
        var rgb;
        if (color in COLORS) {
            rgb = COLORS[color];
            return {
                r: rgb[0],
                g: rgb[1],
                b: rgb[2]
            };
        }
        else if (color[0] === HASH) {
            return this._hexToRgb(color.substring(1));
        }
        else if (color.substr(0, 4) === RGB_PAREN) {
            rgb = RGB_REGEX.exec(color.replace(/ /g, ''));
            return {
                r: parseInt(rgb[1], 10),
                g: parseInt(rgb[2], 10),
                b: parseInt(rgb[3], 10)
            };
        }
        else {
            return {
                r: 0,
                g: 0,
                b: 0
            };
        }
    },
    colorToRGBA: function (str) {
        str = str || 'black';
        return (exports.Util._namedColorToRBA(str) ||
            exports.Util._hex3ColorToRGBA(str) ||
            exports.Util._hex6ColorToRGBA(str) ||
            exports.Util._rgbColorToRGBA(str) ||
            exports.Util._rgbaColorToRGBA(str));
    },
    _namedColorToRBA: function (str) {
        var c = COLORS[str.toLowerCase()];
        if (!c) {
            return null;
        }
        return {
            r: c[0],
            g: c[1],
            b: c[2],
            a: 1
        };
    },
    _rgbColorToRGBA: function (str) {
        if (str.indexOf('rgb(') === 0) {
            str = str.match(/rgb\(([^)]+)\)/)[1];
            var parts = str.split(/ *, */).map(Number);
            return {
                r: parts[0],
                g: parts[1],
                b: parts[2],
                a: 1
            };
        }
    },
    _rgbaColorToRGBA: function (str) {
        if (str.indexOf('rgba(') === 0) {
            str = str.match(/rgba\(([^)]+)\)/)[1];
            var parts = str.split(/ *, */).map(Number);
            return {
                r: parts[0],
                g: parts[1],
                b: parts[2],
                a: parts[3]
            };
        }
    },
    _hex6ColorToRGBA: function (str) {
        if (str[0] === '#' && str.length === 7) {
            return {
                r: parseInt(str.slice(1, 3), 16),
                g: parseInt(str.slice(3, 5), 16),
                b: parseInt(str.slice(5, 7), 16),
                a: 1
            };
        }
    },
    _hex3ColorToRGBA: function (str) {
        if (str[0] === '#' && str.length === 4) {
            return {
                r: parseInt(str[1] + str[1], 16),
                g: parseInt(str[2] + str[2], 16),
                b: parseInt(str[3] + str[3], 16),
                a: 1
            };
        }
    },
    haveIntersection: function (r1, r2) {
        return !(r2.x > r1.x + r1.width ||
            r2.x + r2.width < r1.x ||
            r2.y > r1.y + r1.height ||
            r2.y + r2.height < r1.y);
    },
    cloneObject: function (obj) {
        var retObj = {};
        for (var key in obj) {
            if (this._isPlainObject(obj[key])) {
                retObj[key] = this.cloneObject(obj[key]);
            }
            else if (this._isArray(obj[key])) {
                retObj[key] = this.cloneArray(obj[key]);
            }
            else {
                retObj[key] = obj[key];
            }
        }
        return retObj;
    },
    cloneArray: function (arr) {
        return arr.slice(0);
    },
    _degToRad: function (deg) {
        return deg * PI_OVER_DEG180;
    },
    _radToDeg: function (rad) {
        return rad * DEG180_OVER_PI;
    },
    _capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    throw: function (str) {
        throw new Error(KONVA_ERROR + str);
    },
    error: function (str) {
        console.error(KONVA_ERROR + str);
    },
    warn: function (str) {
        if (!Global_1.Konva.showWarnings) {
            return;
        }
        console.warn(KONVA_WARNING + str);
    },
    extend: function (child, parent) {
        function Ctor() {
            this.constructor = child;
        }
        Ctor.prototype = parent.prototype;
        var oldProto = child.prototype;
        child.prototype = new Ctor();
        for (var key in oldProto) {
            if (oldProto.hasOwnProperty(key)) {
                child.prototype[key] = oldProto[key];
            }
        }
        child.__super__ = parent.prototype;
        child.super = parent;
    },
    _getControlPoints: function (x0, y0, x1, y1, x2, y2, t) {
        var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)), d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), fa = (t * d01) / (d01 + d12), fb = (t * d12) / (d01 + d12), p1x = x1 - fa * (x2 - x0), p1y = y1 - fa * (y2 - y0), p2x = x1 + fb * (x2 - x0), p2y = y1 + fb * (y2 - y0);
        return [p1x, p1y, p2x, p2y];
    },
    _expandPoints: function (p, tension) {
        var len = p.length, allPoints = [], n, cp;
        for (n = 2; n < len - 2; n += 2) {
            cp = exports.Util._getControlPoints(p[n - 2], p[n - 1], p[n], p[n + 1], p[n + 2], p[n + 3], tension);
            allPoints.push(cp[0]);
            allPoints.push(cp[1]);
            allPoints.push(p[n]);
            allPoints.push(p[n + 1]);
            allPoints.push(cp[2]);
            allPoints.push(cp[3]);
        }
        return allPoints;
    },
    each: function (obj, func) {
        for (var key in obj) {
            func(key, obj[key]);
        }
    },
    _inRange: function (val, left, right) {
        return left <= val && val < right;
    },
    _getProjectionToSegment: function (x1, y1, x2, y2, x3, y3) {
        var x, y, dist;
        var pd2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
        if (pd2 == 0) {
            x = x1;
            y = y1;
            dist = (x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2);
        }
        else {
            var u = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / pd2;
            if (u < 0) {
                x = x1;
                y = y1;
                dist = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
            }
            else if (u > 1.0) {
                x = x2;
                y = y2;
                dist = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
            }
            else {
                x = x1 + u * (x2 - x1);
                y = y1 + u * (y2 - y1);
                dist = (x - x3) * (x - x3) + (y - y3) * (y - y3);
            }
        }
        return [x, y, dist];
    },
    _getProjectionToLine: function (pt, line, isClosed) {
        var pc = exports.Util.cloneObject(pt);
        var dist = Number.MAX_VALUE;
        line.forEach(function (p1, i) {
            if (!isClosed && i === line.length - 1) {
                return;
            }
            var p2 = line[(i + 1) % line.length];
            var proj = exports.Util._getProjectionToSegment(p1.x, p1.y, p2.x, p2.y, pt.x, pt.y);
            var px = proj[0], py = proj[1], pdist = proj[2];
            if (pdist < dist) {
                pc.x = px;
                pc.y = py;
                dist = pdist;
            }
        });
        return pc;
    },
    _prepareArrayForTween: function (startArray, endArray, isClosed) {
        var n, start = [], end = [];
        if (startArray.length > endArray.length) {
            var temp = endArray;
            endArray = startArray;
            startArray = temp;
        }
        for (n = 0; n < startArray.length; n += 2) {
            start.push({
                x: startArray[n],
                y: startArray[n + 1]
            });
        }
        for (n = 0; n < endArray.length; n += 2) {
            end.push({
                x: endArray[n],
                y: endArray[n + 1]
            });
        }
        var newStart = [];
        end.forEach(function (point) {
            var pr = exports.Util._getProjectionToLine(point, start, isClosed);
            newStart.push(pr.x);
            newStart.push(pr.y);
        });
        return newStart;
    },
    _prepareToStringify: function (obj) {
        var desc;
        obj.visitedByCircularReferenceRemoval = true;
        for (var key in obj) {
            if (!(obj.hasOwnProperty(key) && obj[key] && typeof obj[key] == 'object')) {
                continue;
            }
            desc = Object.getOwnPropertyDescriptor(obj, key);
            if (obj[key].visitedByCircularReferenceRemoval ||
                exports.Util._isElement(obj[key])) {
                if (desc.configurable) {
                    delete obj[key];
                }
                else {
                    return null;
                }
            }
            else if (exports.Util._prepareToStringify(obj[key]) === null) {
                if (desc.configurable) {
                    delete obj[key];
                }
                else {
                    return null;
                }
            }
        }
        delete obj.visitedByCircularReferenceRemoval;
        return obj;
    },
    _assign: function (target, source) {
        for (var key in source) {
            target[key] = source[key];
        }
        return target;
    }
};


/***/ }),

/***/ "./node_modules/konva/lib/Validators.js":
/*!**********************************************!*\
  !*** ./node_modules/konva/lib/Validators.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = __webpack_require__(/*! ./Global */ "./node_modules/konva/lib/Global.js");
var Util_1 = __webpack_require__(/*! ./Util */ "./node_modules/konva/lib/Util.js");
function _formatValue(val) {
    if (Util_1.Util._isString(val)) {
        return '"' + val + '"';
    }
    if (Object.prototype.toString.call(val) === '[object Number]') {
        return val;
    }
    if (Util_1.Util._isBoolean(val)) {
        return val;
    }
    return Object.prototype.toString.call(val);
}
function RGBComponent(val) {
    if (val > 255) {
        return 255;
    }
    else if (val < 0) {
        return 0;
    }
    return Math.round(val);
}
exports.RGBComponent = RGBComponent;
function alphaComponent(val) {
    if (val > 1) {
        return 1;
    }
    else if (val < 0.0001) {
        return 0.0001;
    }
    return val;
}
exports.alphaComponent = alphaComponent;
function getNumberValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            if (!Util_1.Util._isNumber(val)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a number.');
            }
            return val;
        };
    }
}
exports.getNumberValidator = getNumberValidator;
function getNumberOrAutoValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            var isNumber = Util_1.Util._isNumber(val);
            var isAuto = val === 'auto';
            if (!(isNumber || isAuto)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a number or "auto".');
            }
            return val;
        };
    }
}
exports.getNumberOrAutoValidator = getNumberOrAutoValidator;
function getStringValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            if (!Util_1.Util._isString(val)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a string.');
            }
            return val;
        };
    }
}
exports.getStringValidator = getStringValidator;
function getFunctionValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            if (!Util_1.Util._isFunction(val)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a function.');
            }
            return val;
        };
    }
}
exports.getFunctionValidator = getFunctionValidator;
function getNumberArrayValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            if (!Util_1.Util._isArray(val)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a array of numbers.');
            }
            else {
                val.forEach(function (item) {
                    if (!Util_1.Util._isNumber(item)) {
                        Util_1.Util.warn('"' +
                            attr +
                            '" attribute has non numeric element ' +
                            item +
                            '. Make sure that all elements are numbers.');
                    }
                });
            }
            return val;
        };
    }
}
exports.getNumberArrayValidator = getNumberArrayValidator;
function getBooleanValidator() {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            var isBool = val === true || val === false;
            if (!isBool) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a boolean.');
            }
            return val;
        };
    }
}
exports.getBooleanValidator = getBooleanValidator;
function getComponentValidator(components) {
    if (Global_1.Konva.isUnminified) {
        return function (val, attr) {
            if (!Util_1.Util.isObject(val)) {
                Util_1.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be an object with properties ' +
                    components);
            }
            return val;
        };
    }
}
exports.getComponentValidator = getComponentValidator;


/***/ }),

/***/ "./node_modules/konva/lib/shapes/Circle.js":
/*!*************************************************!*\
  !*** ./node_modules/konva/lib/shapes/Circle.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(/*! ../Util */ "./node_modules/konva/lib/Util.js");
var Factory_1 = __webpack_require__(/*! ../Factory */ "./node_modules/konva/lib/Factory.js");
var Shape_1 = __webpack_require__(/*! ../Shape */ "./node_modules/konva/lib/Shape.js");
var Validators_1 = __webpack_require__(/*! ../Validators */ "./node_modules/konva/lib/Validators.js");
var Global_1 = __webpack_require__(/*! ../Global */ "./node_modules/konva/lib/Global.js");
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Circle.prototype._sceneFunc = function (context) {
        context.beginPath();
        context.arc(0, 0, this.radius(), 0, Math.PI * 2, false);
        context.closePath();
        context.fillStrokeShape(this);
    };
    Circle.prototype.getWidth = function () {
        return this.radius() * 2;
    };
    Circle.prototype.getHeight = function () {
        return this.radius() * 2;
    };
    Circle.prototype.setWidth = function (width) {
        if (this.radius() !== width / 2) {
            this.radius(width / 2);
        }
    };
    Circle.prototype.setHeight = function (height) {
        if (this.radius() !== height / 2) {
            this.radius(height / 2);
        }
    };
    return Circle;
}(Shape_1.Shape));
exports.Circle = Circle;
Circle.prototype._centroid = true;
Circle.prototype.className = 'Circle';
Circle.prototype._attrsAffectingSize = ['radius'];
Global_1._registerNode(Circle);
Factory_1.Factory.addGetterSetter(Circle, 'radius', 0, Validators_1.getNumberValidator());
Util_1.Collection.mapMethods(Circle);


/***/ }),

/***/ "./node_modules/konva/lib/shapes/Rect.js":
/*!***********************************************!*\
  !*** ./node_modules/konva/lib/shapes/Rect.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(/*! ../Util */ "./node_modules/konva/lib/Util.js");
var Factory_1 = __webpack_require__(/*! ../Factory */ "./node_modules/konva/lib/Factory.js");
var Shape_1 = __webpack_require__(/*! ../Shape */ "./node_modules/konva/lib/Shape.js");
var Validators_1 = __webpack_require__(/*! ../Validators */ "./node_modules/konva/lib/Validators.js");
var Global_1 = __webpack_require__(/*! ../Global */ "./node_modules/konva/lib/Global.js");
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rect.prototype._sceneFunc = function (context) {
        var cornerRadius = this.cornerRadius(), width = this.width(), height = this.height();
        context.beginPath();
        if (!cornerRadius) {
            context.rect(0, 0, width, height);
        }
        else {
            cornerRadius = Math.min(cornerRadius, width / 2, height / 2);
            context.moveTo(cornerRadius, 0);
            context.lineTo(width - cornerRadius, 0);
            context.arc(width - cornerRadius, cornerRadius, cornerRadius, (Math.PI * 3) / 2, 0, false);
            context.lineTo(width, height - cornerRadius);
            context.arc(width - cornerRadius, height - cornerRadius, cornerRadius, 0, Math.PI / 2, false);
            context.lineTo(cornerRadius, height);
            context.arc(cornerRadius, height - cornerRadius, cornerRadius, Math.PI / 2, Math.PI, false);
            context.lineTo(0, cornerRadius);
            context.arc(cornerRadius, cornerRadius, cornerRadius, Math.PI, (Math.PI * 3) / 2, false);
        }
        context.closePath();
        context.fillStrokeShape(this);
    };
    return Rect;
}(Shape_1.Shape));
exports.Rect = Rect;
Rect.prototype.className = 'Rect';
Global_1._registerNode(Rect);
Factory_1.Factory.addGetterSetter(Rect, 'cornerRadius', 0, Validators_1.getNumberValidator());
Util_1.Collection.mapMethods(Rect);


/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/debounce.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/debounce.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    now = __webpack_require__(/*! ./now */ "./node_modules/lodash/now.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "./node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/now.js":
/*!************************************!*\
  !*** ./node_modules/lodash/now.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "./node_modules/lodash/throttle.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/throttle.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var debounce = __webpack_require__(/*! ./debounce */ "./node_modules/lodash/debounce.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;


/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Stage = __webpack_require__(/*! konva/lib/Stage */ "./node_modules/konva/lib/Stage.js");

var _Layer = __webpack_require__(/*! konva/lib/Layer */ "./node_modules/konva/lib/Layer.js");

var _Rect = __webpack_require__(/*! konva/lib/shapes/Rect */ "./node_modules/konva/lib/shapes/Rect.js");

var _Circle = __webpack_require__(/*! konva/lib/shapes/Circle */ "./node_modules/konva/lib/shapes/Circle.js");

var _Tween = __webpack_require__(/*! konva/lib/Tween */ "./node_modules/konva/lib/Tween.js");

var _throttle = _interopRequireDefault(__webpack_require__(/*! lodash/throttle */ "./node_modules/lodash/throttle.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BackgroundDots =
/*#__PURE__*/
function () {
  function BackgroundDots(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, BackgroundDots);

    this.element = element;
    this.isMouseOver = false;
    this.options = { ...BackgroundDots.defaultOptions,
      ...options
    };
    this.grid = [];
    this.stage = new _Stage.Stage({
      container: this.element,
      width: this.element.offsetWidth,
      height: this.element.offsetHeight
    });
    this.layer = new _Layer.Layer();
    this.stage.add(this.layer);
    window.addEventListener('resize', (0, _throttle.default)(this._resizeHandler.bind(this), 150));
    window.addEventListener('mousemove', this._mouseMoveHandler.bind(this));
    document.body.addEventListener('mouseout', this._documentMouseOutHandler.bind(this));

    this._drawHelpers();

    this._draw();
  }

  _createClass(BackgroundDots, [{
    key: "_draw",
    value: function _draw() {
      this._drawBackground();

      this._drawGrid();

      this._redraw();
    }
  }, {
    key: "_drawHelpers",
    value: function _drawHelpers() {
      this.helper = new _Circle.Circle({
        x: 0,
        y: 0,
        radius: 2,
        fill: '#ff0000'
      });

      if (this.options.debug) {
        this.layer.add(this.helper);
      }
    }
  }, {
    key: "_drawBackground",
    value: function _drawBackground() {
      this.background = new _Rect.Rect({
        x: 0,
        y: 0,
        width: this.stage.width(),
        height: this.stage.height(),
        fill: this.options.backgroundColor
      });
      this.layer.add(this.background);
    }
  }, {
    key: "_drawGrid",
    value: function _drawGrid() {
      var width = this.stage.width();
      var height = this.stage.height();
      var _this$options = this.options,
          gutter = _this$options.gutter,
          radius = _this$options.radius,
          dotColor = _this$options.dotColor;
      var xCount = Math.round(width / this.options.gutter);
      var yCount = Math.round(height / this.options.gutter);

      for (var y = 0; y < this.grid.length; y++) {
        var row = this.grid[y];

        for (var x = 0; x < row.length; x++) {
          var circle = row[x];
          circle.destroy();
        }
      }

      this.grid = [];

      for (var _y = 0; _y <= yCount; _y++) {
        var _row = [];

        for (var _x = 0; _x <= xCount; _x++) {
          var circleX = _x * gutter;
          var circleY = _y * gutter;

          var _circle = new _Circle.Circle({
            x: circleX,
            y: circleY,
            radius: radius,
            fill: dotColor,
            opacity: this.options.opacity
          });

          _circle.baseX = circleX;
          _circle.baseY = circleY;
          this.layer.add(_circle);

          _row.push(_circle);
        }

        this.grid.push(_row);
      }
    }
  }, {
    key: "_redraw",
    value: function _redraw() {
      this.layer.batchDraw();
    }
  }, {
    key: "_resizeHandler",
    value: function _resizeHandler() {
      var stage = this.stage,
          element = this.element;
      stage.width(element.offsetWidth);
      stage.height(element.offsetHeight);

      this._draw();
    }
  }, {
    key: "_mouseMoveHandler",
    value: function _mouseMoveHandler(event) {
      var clientX = event.clientX,
          clientY = event.clientY;

      if (!this._isOverStage(clientX, clientY)) {
        if (this.isMouseOver) {
          this._clean();
        }

        this.isMouseOver = false;
        return;
      }

      var clientRect = this.element.getBoundingClientRect();
      var stageX = clientX;
      var stageY = clientY - clientRect.y;
      this.isMouseOver = true;

      var _this$_getGridCoordin = this._getGridCoordinates(stageX, stageY),
          x = _this$_getGridCoordin.x,
          y = _this$_getGridCoordin.y;

      this.helper.x(x * this.options.gutter);
      this.helper.y(y * this.options.gutter);

      this._updateCirclesAround(stageX, stageY);

      this._redraw();
    }
  }, {
    key: "_documentMouseOutHandler",
    value: function _documentMouseOutHandler(e) {
      var event = e ? e : window.event;
      var target = event.relatedTarget;

      if (!target || target.nodeName === 'HTML') {
        this._clean();
      }
    }
  }, {
    key: "_isOverStage",
    value: function _isOverStage(x, y) {
      var clientRect = this.element.getBoundingClientRect();
      return clientRect.top <= y && clientRect.bottom >= y && clientRect.left <= x && clientRect.right >= x;
    }
  }, {
    key: "_getGridCoordinates",
    value: function _getGridCoordinates(x, y) {
      var gutter = this.options.gutter;
      var width = this.stage.width();
      var height = this.stage.height();
      return {
        x: Math.round(x / width * width / gutter),
        y: Math.round(y / height * height / gutter)
      };
    }
  }, {
    key: "_updateCirclesAround",
    value: function _updateCirclesAround(centerX, centerY) {
      // const result = [];
      var bubbleRadius = this.options.bubbleRadius;

      for (var y = 0; y < this.grid.length; y++) {
        var row = this.grid[y];

        for (var x = 0; x < row.length; x++) {
          var circle = row[x];
          var distance = Math.sqrt(Math.pow(circle.x() - centerX, 2) + Math.pow(circle.y() - centerY, 2));

          if (distance <= bubbleRadius) {
            this._updateCircleByDistance(circle, distance, centerX, centerY);
          } else {
            this._cleanCircle(circle);
          }
        }
      }
    }
  }, {
    key: "_updateCircleByDistance",
    value: function _updateCircleByDistance(circle, distance, centerX, centerY) {
      var distanceIndex = Math.pow(1 - distance / this.options.bubbleRadius, 3);
      var x = circle.baseX;
      var y = circle.baseY;
      var magneticPower = this.options.magneticPower;
      circle.opacity(this.options.opacity * (1 + distanceIndex));
      circle.x(x + (centerX - x) * distanceIndex * magneticPower);
      circle.y(y + (centerY - y) * distanceIndex * magneticPower);
    }
  }, {
    key: "_cleanCircle",
    value: function _cleanCircle(circle) {
      var withAnimation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (circle.tween) {
        circle.tween.destroy();
        circle.tween = null;
      }

      if (!withAnimation) {
        circle.opacity(this.options.opacity);
        circle.x(circle.baseX);
        circle.y(circle.baseY);
      } else {
        if (circle.opacity() !== this.options.opacity) {
          var tween = new _Tween.Tween({
            node: circle,
            duration: 0.5,
            x: circle.baseX,
            y: circle.baseY,
            opacity: this.options.opacity,
            easing: _Tween.Easings.StrongEaseOut
          });
          circle.tween = tween;
          tween.play();
        }
      }
    }
  }, {
    key: "_clean",
    value: function _clean() {
      for (var y = 0; y < this.grid.length; y++) {
        var row = this.grid[y];

        for (var x = 0; x < row.length; x++) {
          var circle = row[x];

          this._cleanCircle(circle, true);
        }
      }

      this._redraw();
    }
  }]);

  return BackgroundDots;
}();

exports.default = BackgroundDots;

_defineProperty(BackgroundDots, "defaultOptions", {
  backgroundColor: 'rgba(0, 0, 0, 1)',
  dotColor: 'rgba(255, 255, 255, 0.5)',
  gutter: 30,
  radius: 1,
  bubbleRadius: 300,
  magneticPower: 0.15,
  opacity: 0.5,
  debug: false
});

module.exports = exports["default"];

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL0FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9rb252YS9saWIvQmFzZUxheWVyLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9DYW52YXMuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL0NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9rb252YS9saWIvQ29udGV4dC5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9rb252YS9saWIvRHJhZ0FuZERyb3AuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL0dsb2JhbC5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9rb252YS9saWIvTGF5ZXIuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL05vZGUuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL1NoYXBlLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9TdGFnZS5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9rb252YS9saWIvVHdlZW4uanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL1V0aWwuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL1ZhbGlkYXRvcnMuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL3NoYXBlcy9DaXJjbGUuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL3NoYXBlcy9SZWN0LmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldFRhZy5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL2RlYm91bmNlLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvbm93LmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC90aHJvdHRsZS5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvdG9OdW1iZXIuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkJhY2tncm91bmREb3RzIiwiZWxlbWVudCIsIm9wdGlvbnMiLCJpc01vdXNlT3ZlciIsImRlZmF1bHRPcHRpb25zIiwiZ3JpZCIsInN0YWdlIiwiY29udGFpbmVyIiwid2lkdGgiLCJvZmZzZXRXaWR0aCIsImhlaWdodCIsIm9mZnNldEhlaWdodCIsImxheWVyIiwiYWRkIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9yZXNpemVIYW5kbGVyIiwiYmluZCIsIl9tb3VzZU1vdmVIYW5kbGVyIiwiZG9jdW1lbnQiLCJib2R5IiwiX2RvY3VtZW50TW91c2VPdXRIYW5kbGVyIiwiX2RyYXdIZWxwZXJzIiwiX2RyYXciLCJfZHJhd0JhY2tncm91bmQiLCJfZHJhd0dyaWQiLCJfcmVkcmF3IiwiaGVscGVyIiwieCIsInkiLCJyYWRpdXMiLCJmaWxsIiwiZGVidWciLCJiYWNrZ3JvdW5kIiwiYmFja2dyb3VuZENvbG9yIiwiZ3V0dGVyIiwiZG90Q29sb3IiLCJ4Q291bnQiLCJNYXRoIiwicm91bmQiLCJ5Q291bnQiLCJsZW5ndGgiLCJyb3ciLCJjaXJjbGUiLCJkZXN0cm95IiwiY2lyY2xlWCIsImNpcmNsZVkiLCJvcGFjaXR5IiwiYmFzZVgiLCJiYXNlWSIsInB1c2giLCJiYXRjaERyYXciLCJldmVudCIsImNsaWVudFgiLCJjbGllbnRZIiwiX2lzT3ZlclN0YWdlIiwiX2NsZWFuIiwiY2xpZW50UmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInN0YWdlWCIsInN0YWdlWSIsIl9nZXRHcmlkQ29vcmRpbmF0ZXMiLCJfdXBkYXRlQ2lyY2xlc0Fyb3VuZCIsImUiLCJ0YXJnZXQiLCJyZWxhdGVkVGFyZ2V0Iiwibm9kZU5hbWUiLCJ0b3AiLCJib3R0b20iLCJsZWZ0IiwicmlnaHQiLCJjZW50ZXJYIiwiY2VudGVyWSIsImJ1YmJsZVJhZGl1cyIsImRpc3RhbmNlIiwic3FydCIsInBvdyIsIl91cGRhdGVDaXJjbGVCeURpc3RhbmNlIiwiX2NsZWFuQ2lyY2xlIiwiZGlzdGFuY2VJbmRleCIsIm1hZ25ldGljUG93ZXIiLCJ3aXRoQW5pbWF0aW9uIiwidHdlZW4iLCJub2RlIiwiZHVyYXRpb24iLCJlYXNpbmciLCJTdHJvbmdFYXNlT3V0IiwicGxheSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FB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QUFzQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMEJBQTBCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMVZhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ3ZGLDZCQUE2Qix1REFBdUQ7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGdEQUFRO0FBQzdCLGVBQWUsbUJBQU8sQ0FBQyxvREFBVTtBQUNqQywySEFBMkg7QUFDM0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHVCQUF1QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUNuZ0JhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMsMERBQWE7QUFDdkMsZUFBZSxtQkFBTyxDQUFDLG9EQUFVO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHVCQUF1QjtBQUNwQyxhQUFhLG9DQUFvQztBQUNqRCxhQUFhLGtEQUFrRDtBQUMvRCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFNBQVM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsb0JBQW9CO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIscUJBQXFCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsYUFBYTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix5QkFBeUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7O0FDcndDYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGNBQWMsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUN2Riw2QkFBNkIsdURBQXVEO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxnREFBUTtBQUM3QixnQkFBZ0IsbUJBQU8sQ0FBQyxzREFBVztBQUNuQyxhQUFhLG1CQUFPLENBQUMsZ0RBQVE7QUFDN0IsbUJBQW1CLG1CQUFPLENBQUMsNERBQWM7QUFDekMsZUFBZSxtQkFBTyxDQUFDLG9EQUFVO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHVCQUF1QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsdUJBQXVCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFNBQVM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixTQUFTO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xnQmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxlQUFlLG1CQUFPLENBQUMsb0RBQVU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix3QkFBd0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx3QkFBd0IsSUFBSSxNQUFNLElBQUksTUFBTSxJQUFJO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUJBQW1CLGFBQWE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1QkFBdUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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UmUsQyIsImZpbGUiOiJiYWNrZ3JvdW5kLWRvdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIkJhY2tncm91bmREb3RzXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkJhY2tncm91bmREb3RzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkJhY2tncm91bmREb3RzXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBHbG9iYWxfMSA9IHJlcXVpcmUoXCIuL0dsb2JhbFwiKTtcbnZhciBub3cgPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmIChHbG9iYWxfMS5nbG9iLnBlcmZvcm1hbmNlICYmIEdsb2JhbF8xLmdsb2IucGVyZm9ybWFuY2Uubm93KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gR2xvYmFsXzEuZ2xvYi5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH07XG59KSgpO1xudmFyIEFuaW1hdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQW5pbWF0aW9uKGZ1bmMsIGxheWVycykge1xuICAgICAgICB0aGlzLmlkID0gQW5pbWF0aW9uLmFuaW1JZENvdW50ZXIrKztcbiAgICAgICAgdGhpcy5mcmFtZSA9IHtcbiAgICAgICAgICAgIHRpbWU6IDAsXG4gICAgICAgICAgICB0aW1lRGlmZjogMCxcbiAgICAgICAgICAgIGxhc3RUaW1lOiBub3coKSxcbiAgICAgICAgICAgIGZyYW1lUmF0ZTogMFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZ1bmMgPSBmdW5jO1xuICAgICAgICB0aGlzLnNldExheWVycyhsYXllcnMpO1xuICAgIH1cbiAgICBBbmltYXRpb24ucHJvdG90eXBlLnNldExheWVycyA9IGZ1bmN0aW9uIChsYXllcnMpIHtcbiAgICAgICAgdmFyIGxheXMgPSBbXTtcbiAgICAgICAgaWYgKCFsYXllcnMpIHtcbiAgICAgICAgICAgIGxheXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsYXllcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGF5cyA9IGxheWVycztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxheXMgPSBbbGF5ZXJzXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxheWVycyA9IGxheXM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQW5pbWF0aW9uLnByb3RvdHlwZS5nZXRMYXllcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxheWVycztcbiAgICB9O1xuICAgIEFuaW1hdGlvbi5wcm90b3R5cGUuYWRkTGF5ZXIgPSBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgdmFyIGxheWVycyA9IHRoaXMubGF5ZXJzLCBsZW4gPSBsYXllcnMubGVuZ3RoLCBuO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIGlmIChsYXllcnNbbl0uX2lkID09PSBsYXllci5faWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXllcnMucHVzaChsYXllcik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgQW5pbWF0aW9uLnByb3RvdHlwZS5pc1J1bm5pbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhID0gQW5pbWF0aW9uLCBhbmltYXRpb25zID0gYS5hbmltYXRpb25zLCBsZW4gPSBhbmltYXRpb25zLmxlbmd0aCwgbjtcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uc1tuXS5pZCA9PT0gdGhpcy5pZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIEFuaW1hdGlvbi5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICB0aGlzLmZyYW1lLnRpbWVEaWZmID0gMDtcbiAgICAgICAgdGhpcy5mcmFtZS5sYXN0VGltZSA9IG5vdygpO1xuICAgICAgICBBbmltYXRpb24uX2FkZEFuaW1hdGlvbih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBBbmltYXRpb24ucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIEFuaW1hdGlvbi5fcmVtb3ZlQW5pbWF0aW9uKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEFuaW1hdGlvbi5wcm90b3R5cGUuX3VwZGF0ZUZyYW1lT2JqZWN0ID0gZnVuY3Rpb24gKHRpbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZS50aW1lRGlmZiA9IHRpbWUgLSB0aGlzLmZyYW1lLmxhc3RUaW1lO1xuICAgICAgICB0aGlzLmZyYW1lLmxhc3RUaW1lID0gdGltZTtcbiAgICAgICAgdGhpcy5mcmFtZS50aW1lICs9IHRoaXMuZnJhbWUudGltZURpZmY7XG4gICAgICAgIHRoaXMuZnJhbWUuZnJhbWVSYXRlID0gMTAwMCAvIHRoaXMuZnJhbWUudGltZURpZmY7XG4gICAgfTtcbiAgICBBbmltYXRpb24uX2FkZEFuaW1hdGlvbiA9IGZ1bmN0aW9uIChhbmltKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucy5wdXNoKGFuaW0pO1xuICAgICAgICB0aGlzLl9oYW5kbGVBbmltYXRpb24oKTtcbiAgICB9O1xuICAgIEFuaW1hdGlvbi5fcmVtb3ZlQW5pbWF0aW9uID0gZnVuY3Rpb24gKGFuaW0pIHtcbiAgICAgICAgdmFyIGlkID0gYW5pbS5pZCwgYW5pbWF0aW9ucyA9IHRoaXMuYW5pbWF0aW9ucywgbGVuID0gYW5pbWF0aW9ucy5sZW5ndGgsIG47XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbnNbbl0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLnNwbGljZShuLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5pbWF0aW9uLl9ydW5GcmFtZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsYXllckhhc2ggPSB7fSwgYW5pbWF0aW9ucyA9IHRoaXMuYW5pbWF0aW9ucywgYW5pbSwgbGF5ZXJzLCBmdW5jLCBuLCBpLCBsYXllcnNMZW4sIGxheWVyLCBrZXksIG5lZWRSZWRyYXc7XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBhbmltYXRpb25zLmxlbmd0aDsgbisrKSB7XG4gICAgICAgICAgICBhbmltID0gYW5pbWF0aW9uc1tuXTtcbiAgICAgICAgICAgIGxheWVycyA9IGFuaW0ubGF5ZXJzO1xuICAgICAgICAgICAgZnVuYyA9IGFuaW0uZnVuYztcbiAgICAgICAgICAgIGFuaW0uX3VwZGF0ZUZyYW1lT2JqZWN0KG5vdygpKTtcbiAgICAgICAgICAgIGxheWVyc0xlbiA9IGxheWVycy5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoZnVuYykge1xuICAgICAgICAgICAgICAgIG5lZWRSZWRyYXcgPSBmdW5jLmNhbGwoYW5pbSwgYW5pbS5mcmFtZSkgIT09IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmVlZFJlZHJhdyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW5lZWRSZWRyYXcpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsYXllcnNMZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGxheWVyID0gbGF5ZXJzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChsYXllci5faWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBsYXllckhhc2hbbGF5ZXIuX2lkXSA9IGxheWVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGtleSBpbiBsYXllckhhc2gpIHtcbiAgICAgICAgICAgIGlmICghbGF5ZXJIYXNoLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxheWVySGFzaFtrZXldLmRyYXcoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5pbWF0aW9uLl9hbmltYXRpb25Mb29wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgQW5pbSA9IEFuaW1hdGlvbjtcbiAgICAgICAgaWYgKEFuaW0uYW5pbWF0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIEFuaW0uX3J1bkZyYW1lcygpO1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKEFuaW0uX2FuaW1hdGlvbkxvb3ApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgQW5pbS5hbmltUnVubmluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBbmltYXRpb24uX2hhbmRsZUFuaW1hdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFuaW1SdW5uaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1SdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl9hbmltYXRpb25Mb29wKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5pbWF0aW9uLmFuaW1hdGlvbnMgPSBbXTtcbiAgICBBbmltYXRpb24uYW5pbUlkQ291bnRlciA9IDA7XG4gICAgQW5pbWF0aW9uLmFuaW1SdW5uaW5nID0gZmFsc2U7XG4gICAgcmV0dXJuIEFuaW1hdGlvbjtcbn0oKSk7XG5leHBvcnRzLkFuaW1hdGlvbiA9IEFuaW1hdGlvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVXRpbF8xID0gcmVxdWlyZShcIi4vVXRpbFwiKTtcbnZhciBDb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL0NvbnRhaW5lclwiKTtcbnZhciBOb2RlXzEgPSByZXF1aXJlKFwiLi9Ob2RlXCIpO1xudmFyIEZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuL0ZhY3RvcnlcIik7XG52YXIgQ2FudmFzXzEgPSByZXF1aXJlKFwiLi9DYW52YXNcIik7XG52YXIgQmFzZUxheWVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQmFzZUxheWVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJhc2VMYXllcihjb25maWcpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5jYW52YXMgPSBuZXcgQ2FudmFzXzEuU2NlbmVDYW52YXMoKTtcbiAgICAgICAgX3RoaXMuX3dhaXRpbmdGb3JEcmF3ID0gZmFsc2U7XG4gICAgICAgIF90aGlzLm9uKCd2aXNpYmxlQ2hhbmdlJywgX3RoaXMuX2NoZWNrVmlzaWJpbGl0eSk7XG4gICAgICAgIF90aGlzLl9jaGVja1Zpc2liaWxpdHkoKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLmNyZWF0ZVBOR1N0cmVhbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzLmNhbnZhcy5fY2FudmFzO1xuICAgICAgICByZXR1cm4gYy5jcmVhdGVQTkdTdHJlYW0oKTtcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuZ2V0Q2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW52YXM7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLmdldEhpdENhbnZhcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGl0Q2FudmFzO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5nZXRDb250ZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYW52YXMoKS5nZXRDb250ZXh0KCk7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKGJvdW5kcykge1xuICAgICAgICB0aGlzLmdldENvbnRleHQoKS5jbGVhcihib3VuZHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuc2V0WkluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuc2V0WkluZGV4LmNhbGwodGhpcywgaW5kZXgpO1xuICAgICAgICB2YXIgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCk7XG4gICAgICAgIGlmIChzdGFnZSkge1xuICAgICAgICAgICAgc3RhZ2UuY29udGVudC5yZW1vdmVDaGlsZCh0aGlzLmdldENhbnZhcygpLl9jYW52YXMpO1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgc3RhZ2UuZ2V0Q2hpbGRyZW4oKS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgc3RhZ2UuY29udGVudC5pbnNlcnRCZWZvcmUodGhpcy5nZXRDYW52YXMoKS5fY2FudmFzLCBzdGFnZS5nZXRDaGlsZHJlbigpW2luZGV4ICsgMV0uZ2V0Q2FudmFzKCkuX2NhbnZhcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGFnZS5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuZ2V0Q2FudmFzKCkuX2NhbnZhcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLm1vdmVUb1RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgTm9kZV8xLk5vZGUucHJvdG90eXBlLm1vdmVUb1RvcC5jYWxsKHRoaXMpO1xuICAgICAgICB2YXIgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCk7XG4gICAgICAgIGlmIChzdGFnZSkge1xuICAgICAgICAgICAgc3RhZ2UuY29udGVudC5yZW1vdmVDaGlsZCh0aGlzLmdldENhbnZhcygpLl9jYW52YXMpO1xuICAgICAgICAgICAgc3RhZ2UuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmdldENhbnZhcygpLl9jYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5tb3ZlVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtb3ZlZCA9IE5vZGVfMS5Ob2RlLnByb3RvdHlwZS5tb3ZlVXAuY2FsbCh0aGlzKTtcbiAgICAgICAgaWYgKCFtb3ZlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGFnZSA9IHRoaXMuZ2V0U3RhZ2UoKTtcbiAgICAgICAgaWYgKCFzdGFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHN0YWdlLmNvbnRlbnQucmVtb3ZlQ2hpbGQodGhpcy5nZXRDYW52YXMoKS5fY2FudmFzKTtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggPCBzdGFnZS5nZXRDaGlsZHJlbigpLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZ2V0Q2FudmFzKCkuX2NhbnZhcywgc3RhZ2UuZ2V0Q2hpbGRyZW4oKVt0aGlzLmluZGV4ICsgMV0uZ2V0Q2FudmFzKCkuX2NhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdGFnZS5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuZ2V0Q2FudmFzKCkuX2NhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLm1vdmVEb3duID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoTm9kZV8xLk5vZGUucHJvdG90eXBlLm1vdmVEb3duLmNhbGwodGhpcykpIHtcbiAgICAgICAgICAgIHZhciBzdGFnZSA9IHRoaXMuZ2V0U3RhZ2UoKTtcbiAgICAgICAgICAgIGlmIChzdGFnZSkge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IHN0YWdlLmdldENoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgc3RhZ2UuY29udGVudC5yZW1vdmVDaGlsZCh0aGlzLmdldENhbnZhcygpLl9jYW52YXMpO1xuICAgICAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZ2V0Q2FudmFzKCkuX2NhbnZhcywgY2hpbGRyZW5bdGhpcy5pbmRleCArIDFdLmdldENhbnZhcygpLl9jYW52YXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5tb3ZlVG9Cb3R0b20gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChOb2RlXzEuTm9kZS5wcm90b3R5cGUubW92ZVRvQm90dG9tLmNhbGwodGhpcykpIHtcbiAgICAgICAgICAgIHZhciBzdGFnZSA9IHRoaXMuZ2V0U3RhZ2UoKTtcbiAgICAgICAgICAgIGlmIChzdGFnZSkge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IHN0YWdlLmdldENoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgc3RhZ2UuY29udGVudC5yZW1vdmVDaGlsZCh0aGlzLmdldENhbnZhcygpLl9jYW52YXMpO1xuICAgICAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZ2V0Q2FudmFzKCkuX2NhbnZhcywgY2hpbGRyZW5bMV0uZ2V0Q2FudmFzKCkuX2NhbnZhcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLmdldExheWVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2NhbnZhcyA9IHRoaXMuZ2V0Q2FudmFzKCkuX2NhbnZhcztcbiAgICAgICAgTm9kZV8xLk5vZGUucHJvdG90eXBlLnJlbW92ZS5jYWxsKHRoaXMpO1xuICAgICAgICBpZiAoX2NhbnZhcyAmJiBfY2FudmFzLnBhcmVudE5vZGUgJiYgVXRpbF8xLlV0aWwuX2lzSW5Eb2N1bWVudChfY2FudmFzKSkge1xuICAgICAgICAgICAgX2NhbnZhcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKF9jYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5nZXRTdGFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50O1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciB3aWR0aCA9IF9hLndpZHRoLCBoZWlnaHQgPSBfYS5oZWlnaHQ7XG4gICAgICAgIHRoaXMuY2FudmFzLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5fdG9Lb252YUNhbnZhcyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgICBjb25maWcud2lkdGggPSBjb25maWcud2lkdGggfHwgdGhpcy5nZXRXaWR0aCgpO1xuICAgICAgICBjb25maWcuaGVpZ2h0ID0gY29uZmlnLmhlaWdodCB8fCB0aGlzLmdldEhlaWdodCgpO1xuICAgICAgICBjb25maWcueCA9IGNvbmZpZy54ICE9PSB1bmRlZmluZWQgPyBjb25maWcueCA6IHRoaXMueCgpO1xuICAgICAgICBjb25maWcueSA9IGNvbmZpZy55ICE9PSB1bmRlZmluZWQgPyBjb25maWcueSA6IHRoaXMueSgpO1xuICAgICAgICByZXR1cm4gTm9kZV8xLk5vZGUucHJvdG90eXBlLl90b0tvbnZhQ2FudmFzLmNhbGwodGhpcywgY29uZmlnKTtcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuX2NoZWNrVmlzaWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZpc2libGUgPSB0aGlzLnZpc2libGUoKTtcbiAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLl9jYW52YXMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5fY2FudmFzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuZ2V0V2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50LndpZHRoKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuc2V0V2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ0NhbiBub3QgY2hhbmdlIHdpZHRoIG9mIGxheWVyLiBVc2UgXCJzdGFnZS53aWR0aCh2YWx1ZSlcIiBmdW5jdGlvbiBpbnN0ZWFkLicpO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5nZXRIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmhlaWdodCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLnNldEhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgVXRpbF8xLlV0aWwud2FybignQ2FuIG5vdCBjaGFuZ2UgaGVpZ2h0IG9mIGxheWVyLiBVc2UgXCJzdGFnZS5oZWlnaHQodmFsdWUpXCIgZnVuY3Rpb24gaW5zdGVhZC4nKTtcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuZ2V0SW50ZXJzZWN0aW9uID0gZnVuY3Rpb24gKHBvcywgc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLmJhdGNoRHJhdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLl93YWl0aW5nRm9yRHJhdykge1xuICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0ZvckRyYXcgPSB0cnVlO1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwucmVxdWVzdEFuaW1GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZHJhdygpO1xuICAgICAgICAgICAgICAgIF90aGlzLl93YWl0aW5nRm9yRHJhdyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLl9hcHBseVRyYW5zZm9ybSA9IGZ1bmN0aW9uIChzaGFwZSwgY29udGV4dCwgdG9wKSB7XG4gICAgICAgIHZhciBtID0gc2hhcGUuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0odG9wKS5nZXRNYXRyaXgoKTtcbiAgICAgICAgY29udGV4dC50cmFuc2Zvcm0obVswXSwgbVsxXSwgbVsyXSwgbVszXSwgbVs0XSwgbVs1XSk7XG4gICAgfTtcbiAgICByZXR1cm4gQmFzZUxheWVyO1xufShDb250YWluZXJfMS5Db250YWluZXIpKTtcbmV4cG9ydHMuQmFzZUxheWVyID0gQmFzZUxheWVyO1xuQmFzZUxheWVyLnByb3RvdHlwZS5ub2RlVHlwZSA9ICdCYXNlTGF5ZXInO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKEJhc2VMYXllciwgJ2NsZWFyQmVmb3JlRHJhdycsIHRydWUpO1xuVXRpbF8xLkNvbGxlY3Rpb24ubWFwTWV0aG9kcyhCYXNlTGF5ZXIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBVdGlsXzEgPSByZXF1aXJlKFwiLi9VdGlsXCIpO1xudmFyIENvbnRleHRfMSA9IHJlcXVpcmUoXCIuL0NvbnRleHRcIik7XG52YXIgR2xvYmFsXzEgPSByZXF1aXJlKFwiLi9HbG9iYWxcIik7XG52YXIgRmFjdG9yeV8xID0gcmVxdWlyZShcIi4vRmFjdG9yeVwiKTtcbnZhciBWYWxpZGF0b3JzXzEgPSByZXF1aXJlKFwiLi9WYWxpZGF0b3JzXCIpO1xudmFyIF9waXhlbFJhdGlvO1xuZnVuY3Rpb24gZ2V0RGV2aWNlUGl4ZWxSYXRpbygpIHtcbiAgICBpZiAoX3BpeGVsUmF0aW8pIHtcbiAgICAgICAgcmV0dXJuIF9waXhlbFJhdGlvO1xuICAgIH1cbiAgICB2YXIgY2FudmFzID0gVXRpbF8xLlV0aWwuY3JlYXRlQ2FudmFzRWxlbWVudCgpO1xuICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgX3BpeGVsUmF0aW8gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGV2aWNlUGl4ZWxSYXRpbyA9IEdsb2JhbF8xLmdsb2Iud2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSwgYmFja2luZ1N0b3JlUmF0aW8gPSBjb250ZXh0LndlYmtpdEJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgICAgICAgIGNvbnRleHQubW96QmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgICAgICAgY29udGV4dC5tc0JhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgICAgICAgIGNvbnRleHQub0JhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgICAgICAgIGNvbnRleHQuYmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgICAgICAgMTtcbiAgICAgICAgcmV0dXJuIGRldmljZVBpeGVsUmF0aW8gLyBiYWNraW5nU3RvcmVSYXRpbztcbiAgICB9KSgpO1xuICAgIHJldHVybiBfcGl4ZWxSYXRpbztcbn1cbnZhciBDYW52YXMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbnZhcyhjb25maWcpIHtcbiAgICAgICAgdGhpcy5waXhlbFJhdGlvID0gMTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcbiAgICAgICAgdGhpcy5pc0NhY2hlID0gZmFsc2U7XG4gICAgICAgIHZhciBjb25mID0gY29uZmlnIHx8IHt9O1xuICAgICAgICB2YXIgcGl4ZWxSYXRpbyA9IGNvbmYucGl4ZWxSYXRpbyB8fCBHbG9iYWxfMS5Lb252YS5waXhlbFJhdGlvIHx8IGdldERldmljZVBpeGVsUmF0aW8oKTtcbiAgICAgICAgdGhpcy5waXhlbFJhdGlvID0gcGl4ZWxSYXRpbztcbiAgICAgICAgdGhpcy5fY2FudmFzID0gVXRpbF8xLlV0aWwuY3JlYXRlQ2FudmFzRWxlbWVudCgpO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUucGFkZGluZyA9ICcwJztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLm1hcmdpbiA9ICcwJztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmJvcmRlciA9ICcwJztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmJhY2tncm91bmQgPSAndHJhbnNwYXJlbnQnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUudG9wID0gJzAnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUubGVmdCA9ICcwJztcbiAgICB9XG4gICAgQ2FudmFzLnByb3RvdHlwZS5nZXRDb250ZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0O1xuICAgIH07XG4gICAgQ2FudmFzLnByb3RvdHlwZS5nZXRQaXhlbFJhdGlvID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5waXhlbFJhdGlvO1xuICAgIH07XG4gICAgQ2FudmFzLnByb3RvdHlwZS5zZXRQaXhlbFJhdGlvID0gZnVuY3Rpb24gKHBpeGVsUmF0aW8pIHtcbiAgICAgICAgdmFyIHByZXZpb3VzUmF0aW8gPSB0aGlzLnBpeGVsUmF0aW87XG4gICAgICAgIHRoaXMucGl4ZWxSYXRpbyA9IHBpeGVsUmF0aW87XG4gICAgICAgIHRoaXMuc2V0U2l6ZSh0aGlzLmdldFdpZHRoKCkgLyBwcmV2aW91c1JhdGlvLCB0aGlzLmdldEhlaWdodCgpIC8gcHJldmlvdXNSYXRpbyk7XG4gICAgfTtcbiAgICBDYW52YXMucHJvdG90eXBlLnNldFdpZHRoID0gZnVuY3Rpb24gKHdpZHRoKSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLl9jYW52YXMud2lkdGggPSB3aWR0aCAqIHRoaXMucGl4ZWxSYXRpbztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICB2YXIgcGl4ZWxSYXRpbyA9IHRoaXMucGl4ZWxSYXRpbywgX2NvbnRleHQgPSB0aGlzLmdldENvbnRleHQoKS5fY29udGV4dDtcbiAgICAgICAgX2NvbnRleHQuc2NhbGUocGl4ZWxSYXRpbywgcGl4ZWxSYXRpbyk7XG4gICAgfTtcbiAgICBDYW52YXMucHJvdG90eXBlLnNldEhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0ICogdGhpcy5waXhlbFJhdGlvO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgdmFyIHBpeGVsUmF0aW8gPSB0aGlzLnBpeGVsUmF0aW8sIF9jb250ZXh0ID0gdGhpcy5nZXRDb250ZXh0KCkuX2NvbnRleHQ7XG4gICAgICAgIF9jb250ZXh0LnNjYWxlKHBpeGVsUmF0aW8sIHBpeGVsUmF0aW8pO1xuICAgIH07XG4gICAgQ2FudmFzLnByb3RvdHlwZS5nZXRXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGg7XG4gICAgfTtcbiAgICBDYW52YXMucHJvdG90eXBlLmdldEhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xuICAgIH07XG4gICAgQ2FudmFzLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5zZXRXaWR0aCh3aWR0aCk7XG4gICAgICAgIHRoaXMuc2V0SGVpZ2h0KGhlaWdodCk7XG4gICAgfTtcbiAgICBDYW52YXMucHJvdG90eXBlLnRvRGF0YVVSTCA9IGZ1bmN0aW9uIChtaW1lVHlwZSwgcXVhbGl0eSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcy50b0RhdGFVUkwobWltZVR5cGUsIHF1YWxpdHkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYW52YXMudG9EYXRhVVJMKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgVXRpbF8xLlV0aWwuZXJyb3IoJ1VuYWJsZSB0byBnZXQgZGF0YSBVUkwuICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2FudmFzO1xufSgpKTtcbmV4cG9ydHMuQ2FudmFzID0gQ2FudmFzO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKENhbnZhcywgJ3BpeGVsUmF0aW8nLCB1bmRlZmluZWQsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG52YXIgU2NlbmVDYW52YXMgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTY2VuZUNhbnZhcywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTY2VuZUNhbnZhcyhjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHsgd2lkdGg6IDAsIGhlaWdodDogMCB9OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0XzEuU2NlbmVDb250ZXh0KF90aGlzKTtcbiAgICAgICAgX3RoaXMuc2V0U2l6ZShjb25maWcud2lkdGgsIGNvbmZpZy5oZWlnaHQpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBTY2VuZUNhbnZhcztcbn0oQ2FudmFzKSk7XG5leHBvcnRzLlNjZW5lQ2FudmFzID0gU2NlbmVDYW52YXM7XG52YXIgSGl0Q2FudmFzID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSGl0Q2FudmFzLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEhpdENhbnZhcyhjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IHsgd2lkdGg6IDAsIGhlaWdodDogMCB9OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuaGl0Q2FudmFzID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0XzEuSGl0Q29udGV4dChfdGhpcyk7XG4gICAgICAgIF90aGlzLnNldFNpemUoY29uZmlnLndpZHRoLCBjb25maWcuaGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSGl0Q2FudmFzO1xufShDYW52YXMpKTtcbmV4cG9ydHMuSGl0Q2FudmFzID0gSGl0Q2FudmFzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBVdGlsXzEgPSByZXF1aXJlKFwiLi9VdGlsXCIpO1xudmFyIEZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuL0ZhY3RvcnlcIik7XG52YXIgTm9kZV8xID0gcmVxdWlyZShcIi4vTm9kZVwiKTtcbnZhciBEcmFnQW5kRHJvcF8xID0gcmVxdWlyZShcIi4vRHJhZ0FuZERyb3BcIik7XG52YXIgVmFsaWRhdG9yc18xID0gcmVxdWlyZShcIi4vVmFsaWRhdG9yc1wiKTtcbnZhciBDb250YWluZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb250YWluZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29udGFpbmVyKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY2hpbGRyZW4gPSBuZXcgVXRpbF8xLkNvbGxlY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldENoaWxkcmVuID0gZnVuY3Rpb24gKGZpbHRlckZ1bmMpIHtcbiAgICAgICAgaWYgKCFmaWx0ZXJGdW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0cyA9IG5ldyBVdGlsXzEuQ29sbGVjdGlvbigpO1xuICAgICAgICB0aGlzLmNoaWxkcmVuLmVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyRnVuYyhjaGlsZCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmhhc0NoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDaGlsZHJlbigpLmxlbmd0aCA+IDA7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnJlbW92ZUNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2hpbGQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGNoaWxkLmluZGV4ID0gMDtcbiAgICAgICAgICAgIGNoaWxkLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBuZXcgVXRpbF8xLkNvbGxlY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmRlc3Ryb3lDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoaWxkO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICBjaGlsZC5pbmRleCA9IDA7XG4gICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IG5ldyBVdGlsXzEuQ29sbGVjdGlvbigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChhcmd1bWVudHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoaWxkLmdldFBhcmVudCgpKSB7XG4gICAgICAgICAgICBjaGlsZC5tb3ZlVG8odGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuO1xuICAgICAgICB0aGlzLl92YWxpZGF0ZUFkZChjaGlsZCk7XG4gICAgICAgIGNoaWxkLmluZGV4ID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgICAgdGhpcy5fZmlyZSgnYWRkJywge1xuICAgICAgICAgICAgY2hpbGQ6IGNoaWxkXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2hpbGQuaXNEcmFnZ2luZygpKSB7XG4gICAgICAgICAgICBEcmFnQW5kRHJvcF8xLkRELmFuaW0uc2V0TGF5ZXJzKGNoaWxkLmdldExheWVyKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNDaGlsZHJlbigpKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lDaGlsZHJlbigpO1xuICAgICAgICB9XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2VuZXJhbEZpbmQoc2VsZWN0b3IsIGZhbHNlKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ2NvbGxlY3Rpb24uZ2V0KCkgbWV0aG9kIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgY29sbGVjdGlvbi5maW5kKCkgaW5zdGVhZC4nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZChzZWxlY3Rvcik7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmZpbmRPbmUgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2dlbmVyYWxGaW5kKHNlbGVjdG9yLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPiAwID8gcmVzdWx0WzBdIDogdW5kZWZpbmVkO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fZ2VuZXJhbEZpbmQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGZpbmRPbmUpIHtcbiAgICAgICAgdmFyIHJldEFyciA9IFtdO1xuICAgICAgICB0aGlzLl9kZXNjZW5kYW50cyhmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgdmFyIHZhbGlkID0gbm9kZS5faXNNYXRjaChzZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgICAgICAgICByZXRBcnIucHVzaChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWxpZCAmJiBmaW5kT25lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gVXRpbF8xLkNvbGxlY3Rpb24udG9Db2xsZWN0aW9uKHJldEFycik7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9kZXNjZW5kYW50cyA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICB2YXIgc2hvdWxkU3RvcCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBzaG91bGRTdG9wID0gZm4oY2hpbGQpO1xuICAgICAgICAgICAgaWYgKHNob3VsZFN0b3ApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY2hpbGQuaGFzQ2hpbGRyZW4oKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hvdWxkU3RvcCA9IGNoaWxkLl9kZXNjZW5kYW50cyhmbik7XG4gICAgICAgICAgICBpZiAoc2hvdWxkU3RvcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUudG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvYmogPSBOb2RlXzEuTm9kZS5wcm90b3R5cGUudG9PYmplY3QuY2FsbCh0aGlzKTtcbiAgICAgICAgb2JqLmNoaWxkcmVuID0gW107XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuZ2V0Q2hpbGRyZW4oKTtcbiAgICAgICAgdmFyIGxlbiA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5bbl07XG4gICAgICAgICAgICBvYmouY2hpbGRyZW4ucHVzaChjaGlsZC50b09iamVjdCgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fZ2V0RGVzY2VuZGFudHMgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgIHZhciByZXRBcnIgPSBbXTtcbiAgICAgICAgdmFyIGxlbiA9IGFyci5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gYXJyW25dO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNBbmNlc3Rvck9mKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0QXJyLnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldEFycjtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuaXNBbmNlc3Rvck9mID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IG5vZGUuZ2V0UGFyZW50KCk7XG4gICAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQuX2lkID09PSB0aGlzLl9pZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LmdldFBhcmVudCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHZhciBub2RlID0gTm9kZV8xLk5vZGUucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgb2JqKTtcbiAgICAgICAgdGhpcy5nZXRDaGlsZHJlbigpLmVhY2goZnVuY3Rpb24gKG5vKSB7XG4gICAgICAgICAgICBub2RlLmFkZChuby5jbG9uZSgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5nZXRBbGxJbnRlcnNlY3Rpb25zID0gZnVuY3Rpb24gKHBvcykge1xuICAgICAgICB2YXIgYXJyID0gW107XG4gICAgICAgIHRoaXMuZmluZCgnU2hhcGUnKS5lYWNoKGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICAgICAgaWYgKHNoYXBlLmlzVmlzaWJsZSgpICYmIHNoYXBlLmludGVyc2VjdHMocG9zKSkge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHNoYXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9zZXRDaGlsZHJlbkluZGljZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZWFjaChmdW5jdGlvbiAoY2hpbGQsIG4pIHtcbiAgICAgICAgICAgIGNoaWxkLmluZGV4ID0gbjtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmRyYXdTY2VuZSA9IGZ1bmN0aW9uIChjYW4sIHRvcCwgY2FjaGluZykge1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCksIGNhbnZhcyA9IGNhbiB8fCAobGF5ZXIgJiYgbGF5ZXIuZ2V0Q2FudmFzKCkpLCBjb250ZXh0ID0gY2FudmFzICYmIGNhbnZhcy5nZXRDb250ZXh0KCksIGNhY2hlZENhbnZhcyA9IHRoaXMuX2dldENhbnZhc0NhY2hlKCksIGNhY2hlZFNjZW5lQ2FudmFzID0gY2FjaGVkQ2FudmFzICYmIGNhY2hlZENhbnZhcy5zY2VuZTtcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKCkgfHwgY2FjaGluZykge1xuICAgICAgICAgICAgaWYgKCFjYWNoaW5nICYmIGNhY2hlZFNjZW5lQ2FudmFzKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgbGF5ZXIuX2FwcGx5VHJhbnNmb3JtKHRoaXMsIGNvbnRleHQsIHRvcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHJhd0NhY2hlZFNjZW5lQ2FudmFzKGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHJhd0NoaWxkcmVuKGNhbnZhcywgJ2RyYXdTY2VuZScsIHRvcCwgZmFsc2UsIGNhY2hpbmcsIGNhY2hpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5kcmF3SGl0ID0gZnVuY3Rpb24gKGNhbiwgdG9wLCBjYWNoaW5nKSB7XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKSwgY2FudmFzID0gY2FuIHx8IChsYXllciAmJiBsYXllci5oaXRDYW52YXMpLCBjb250ZXh0ID0gY2FudmFzICYmIGNhbnZhcy5nZXRDb250ZXh0KCksIGNhY2hlZENhbnZhcyA9IHRoaXMuX2dldENhbnZhc0NhY2hlKCksIGNhY2hlZEhpdENhbnZhcyA9IGNhY2hlZENhbnZhcyAmJiBjYWNoZWRDYW52YXMuaGl0O1xuICAgICAgICBpZiAodGhpcy5zaG91bGREcmF3SGl0KGNhbnZhcykgfHwgY2FjaGluZykge1xuICAgICAgICAgICAgaWYgKCFjYWNoaW5nICYmIGNhY2hlZEhpdENhbnZhcykge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgICAgIGxheWVyLl9hcHBseVRyYW5zZm9ybSh0aGlzLCBjb250ZXh0LCB0b3ApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RyYXdDYWNoZWRIaXRDYW52YXMoY29udGV4dCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmF3Q2hpbGRyZW4oY2FudmFzLCAnZHJhd0hpdCcsIHRvcCwgZmFsc2UsIGNhY2hpbmcsIGNhY2hpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fZHJhd0NoaWxkcmVuID0gZnVuY3Rpb24gKGNhbnZhcywgZHJhd01ldGhvZCwgdG9wLCBjYWNoaW5nLCBza2lwQnVmZmVyLCBza2lwQ29tcG9zaXRpb24pIHtcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpLCBjb250ZXh0ID0gY2FudmFzICYmIGNhbnZhcy5nZXRDb250ZXh0KCksIGNsaXBXaWR0aCA9IHRoaXMuY2xpcFdpZHRoKCksIGNsaXBIZWlnaHQgPSB0aGlzLmNsaXBIZWlnaHQoKSwgY2xpcEZ1bmMgPSB0aGlzLmNsaXBGdW5jKCksIGhhc0NsaXAgPSAoY2xpcFdpZHRoICYmIGNsaXBIZWlnaHQpIHx8IGNsaXBGdW5jLCBjbGlwWCwgY2xpcFk7XG4gICAgICAgIGlmIChoYXNDbGlwICYmIGxheWVyKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKHRvcCk7XG4gICAgICAgICAgICB2YXIgbSA9IHRyYW5zZm9ybS5nZXRNYXRyaXgoKTtcbiAgICAgICAgICAgIGNvbnRleHQudHJhbnNmb3JtKG1bMF0sIG1bMV0sIG1bMl0sIG1bM10sIG1bNF0sIG1bNV0pO1xuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGlmIChjbGlwRnVuYykge1xuICAgICAgICAgICAgICAgIGNsaXBGdW5jLmNhbGwodGhpcywgY29udGV4dCwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbGlwWCA9IHRoaXMuY2xpcFgoKTtcbiAgICAgICAgICAgICAgICBjbGlwWSA9IHRoaXMuY2xpcFkoKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJlY3QoY2xpcFgsIGNsaXBZLCBjbGlwV2lkdGgsIGNsaXBIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGV4dC5jbGlwKCk7XG4gICAgICAgICAgICBtID0gdHJhbnNmb3JtXG4gICAgICAgICAgICAgICAgLmNvcHkoKVxuICAgICAgICAgICAgICAgIC5pbnZlcnQoKVxuICAgICAgICAgICAgICAgIC5nZXRNYXRyaXgoKTtcbiAgICAgICAgICAgIGNvbnRleHQudHJhbnNmb3JtKG1bMF0sIG1bMV0sIG1bMl0sIG1bM10sIG1bNF0sIG1bNV0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoYXNDb21wb3NpdGlvbiA9IHRoaXMuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKCkgIT09ICdzb3VyY2Utb3ZlcicgJiYgIXNraXBDb21wb3NpdGlvbjtcbiAgICAgICAgaWYgKGhhc0NvbXBvc2l0aW9uICYmIGxheWVyKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5R2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIGNoaWxkW2RyYXdNZXRob2RdKGNhbnZhcywgdG9wLCBjYWNoaW5nLCBza2lwQnVmZmVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChoYXNDb21wb3NpdGlvbiAmJiBsYXllcikge1xuICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc0NsaXAgJiYgbGF5ZXIpIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnNob3VsZERyYXdIaXQgPSBmdW5jdGlvbiAoY2FudmFzKSB7XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKTtcbiAgICAgICAgdmFyIGxheWVyVW5kZXJEcmFnID0gRHJhZ0FuZERyb3BfMS5ERC5pc0RyYWdnaW5nICYmIERyYWdBbmREcm9wXzEuREQuYW5pbS5nZXRMYXllcnMoKS5pbmRleE9mKGxheWVyKSAhPT0gLTE7XG4gICAgICAgIHJldHVybiAoKGNhbnZhcyAmJiBjYW52YXMuaXNDYWNoZSkgfHxcbiAgICAgICAgICAgIChsYXllciAmJiBsYXllci5oaXRHcmFwaEVuYWJsZWQoKSAmJiB0aGlzLmlzVmlzaWJsZSgpICYmICFsYXllclVuZGVyRHJhZykpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5nZXRDbGllbnRSZWN0ID0gZnVuY3Rpb24gKGF0dHJzKSB7XG4gICAgICAgIGF0dHJzID0gYXR0cnMgfHwge307XG4gICAgICAgIHZhciBza2lwVHJhbnNmb3JtID0gYXR0cnMuc2tpcFRyYW5zZm9ybTtcbiAgICAgICAgdmFyIHJlbGF0aXZlVG8gPSBhdHRycy5yZWxhdGl2ZVRvO1xuICAgICAgICB2YXIgbWluWCwgbWluWSwgbWF4WCwgbWF4WTtcbiAgICAgICAgdmFyIHNlbGZSZWN0ID0ge1xuICAgICAgICAgICAgeDogSW5maW5pdHksXG4gICAgICAgICAgICB5OiBJbmZpbml0eSxcbiAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAwXG4gICAgICAgIH07XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5lYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgaWYgKCFjaGlsZC52aXNpYmxlKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmVjdCA9IGNoaWxkLmdldENsaWVudFJlY3Qoe1xuICAgICAgICAgICAgICAgIHJlbGF0aXZlVG86IHRoYXQsXG4gICAgICAgICAgICAgICAgc2tpcFNoYWRvdzogYXR0cnMuc2tpcFNoYWRvdyxcbiAgICAgICAgICAgICAgICBza2lwU3Ryb2tlOiBhdHRycy5za2lwU3Ryb2tlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChyZWN0LndpZHRoID09PSAwICYmIHJlY3QuaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1pblggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG1pblggPSByZWN0Lng7XG4gICAgICAgICAgICAgICAgbWluWSA9IHJlY3QueTtcbiAgICAgICAgICAgICAgICBtYXhYID0gcmVjdC54ICsgcmVjdC53aWR0aDtcbiAgICAgICAgICAgICAgICBtYXhZID0gcmVjdC55ICsgcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBtaW5YID0gTWF0aC5taW4obWluWCwgcmVjdC54KTtcbiAgICAgICAgICAgICAgICBtaW5ZID0gTWF0aC5taW4obWluWSwgcmVjdC55KTtcbiAgICAgICAgICAgICAgICBtYXhYID0gTWF0aC5tYXgobWF4WCwgcmVjdC54ICsgcmVjdC53aWR0aCk7XG4gICAgICAgICAgICAgICAgbWF4WSA9IE1hdGgubWF4KG1heFksIHJlY3QueSArIHJlY3QuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBzaGFwZXMgPSB0aGlzLmZpbmQoJ1NoYXBlJyk7XG4gICAgICAgIHZhciBoYXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2hhcGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc2hhcGUgPSBzaGFwZXNbaV07XG4gICAgICAgICAgICBpZiAoc2hhcGUuX2lzVmlzaWJsZSh0aGlzKSkge1xuICAgICAgICAgICAgICAgIGhhc1Zpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNWaXNpYmxlKSB7XG4gICAgICAgICAgICBzZWxmUmVjdCA9IHtcbiAgICAgICAgICAgICAgICB4OiBtaW5YLFxuICAgICAgICAgICAgICAgIHk6IG1pblksXG4gICAgICAgICAgICAgICAgd2lkdGg6IG1heFggLSBtaW5YLFxuICAgICAgICAgICAgICAgIGhlaWdodDogbWF4WSAtIG1pbllcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWxmUmVjdCA9IHtcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2tpcFRyYW5zZm9ybSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybWVkUmVjdChzZWxmUmVjdCwgcmVsYXRpdmVUbyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGZSZWN0O1xuICAgIH07XG4gICAgcmV0dXJuIENvbnRhaW5lcjtcbn0oTm9kZV8xLk5vZGUpKTtcbmV4cG9ydHMuQ29udGFpbmVyID0gQ29udGFpbmVyO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihDb250YWluZXIsICdjbGlwJywgW1xuICAgICd4JyxcbiAgICAneScsXG4gICAgJ3dpZHRoJyxcbiAgICAnaGVpZ2h0J1xuXSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoQ29udGFpbmVyLCAnY2xpcFgnLCB1bmRlZmluZWQsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoQ29udGFpbmVyLCAnY2xpcFknLCB1bmRlZmluZWQsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoQ29udGFpbmVyLCAnY2xpcFdpZHRoJywgdW5kZWZpbmVkLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKENvbnRhaW5lciwgJ2NsaXBIZWlnaHQnLCB1bmRlZmluZWQsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoQ29udGFpbmVyLCAnY2xpcEZ1bmMnKTtcblV0aWxfMS5Db2xsZWN0aW9uLm1hcE1ldGhvZHMoQ29udGFpbmVyKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVXRpbF8xID0gcmVxdWlyZShcIi4vVXRpbFwiKTtcbnZhciBHbG9iYWxfMSA9IHJlcXVpcmUoXCIuL0dsb2JhbFwiKTtcbnZhciBDT01NQSA9ICcsJywgT1BFTl9QQVJFTiA9ICcoJywgQ0xPU0VfUEFSRU4gPSAnKScsIE9QRU5fUEFSRU5fQlJBQ0tFVCA9ICcoWycsIENMT1NFX0JSQUNLRVRfUEFSRU4gPSAnXSknLCBTRU1JQ09MT04gPSAnOycsIERPVUJMRV9QQVJFTiA9ICcoKScsIEVRVUFMUyA9ICc9JywgQ09OVEVYVF9NRVRIT0RTID0gW1xuICAgICdhcmMnLFxuICAgICdhcmNUbycsXG4gICAgJ2JlZ2luUGF0aCcsXG4gICAgJ2JlemllckN1cnZlVG8nLFxuICAgICdjbGVhclJlY3QnLFxuICAgICdjbGlwJyxcbiAgICAnY2xvc2VQYXRoJyxcbiAgICAnY3JlYXRlTGluZWFyR3JhZGllbnQnLFxuICAgICdjcmVhdGVQYXR0ZXJuJyxcbiAgICAnY3JlYXRlUmFkaWFsR3JhZGllbnQnLFxuICAgICdkcmF3SW1hZ2UnLFxuICAgICdmaWxsJyxcbiAgICAnZmlsbFRleHQnLFxuICAgICdnZXRJbWFnZURhdGEnLFxuICAgICdjcmVhdGVJbWFnZURhdGEnLFxuICAgICdsaW5lVG8nLFxuICAgICdtb3ZlVG8nLFxuICAgICdwdXRJbWFnZURhdGEnLFxuICAgICdxdWFkcmF0aWNDdXJ2ZVRvJyxcbiAgICAncmVjdCcsXG4gICAgJ3Jlc3RvcmUnLFxuICAgICdyb3RhdGUnLFxuICAgICdzYXZlJyxcbiAgICAnc2NhbGUnLFxuICAgICdzZXRMaW5lRGFzaCcsXG4gICAgJ3NldFRyYW5zZm9ybScsXG4gICAgJ3N0cm9rZScsXG4gICAgJ3N0cm9rZVRleHQnLFxuICAgICd0cmFuc2Zvcm0nLFxuICAgICd0cmFuc2xhdGUnXG5dO1xudmFyIENPTlRFWFRfUFJPUEVSVElFUyA9IFtcbiAgICAnZmlsbFN0eWxlJyxcbiAgICAnc3Ryb2tlU3R5bGUnLFxuICAgICdzaGFkb3dDb2xvcicsXG4gICAgJ3NoYWRvd0JsdXInLFxuICAgICdzaGFkb3dPZmZzZXRYJyxcbiAgICAnc2hhZG93T2Zmc2V0WScsXG4gICAgJ2xpbmVDYXAnLFxuICAgICdsaW5lRGFzaE9mZnNldCcsXG4gICAgJ2xpbmVKb2luJyxcbiAgICAnbGluZVdpZHRoJyxcbiAgICAnbWl0ZXJMaW1pdCcsXG4gICAgJ2ZvbnQnLFxuICAgICd0ZXh0QWxpZ24nLFxuICAgICd0ZXh0QmFzZWxpbmUnLFxuICAgICdnbG9iYWxBbHBoYScsXG4gICAgJ2dsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbidcbl07XG52YXIgdHJhY2VBcnJNYXggPSAxMDA7XG52YXIgQ29udGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udGV4dChjYW52YXMpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBjYW52YXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBpZiAoR2xvYmFsXzEuS29udmEuZW5hYmxlVHJhY2UpIHtcbiAgICAgICAgICAgIHRoaXMudHJhY2VBcnIgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZVRyYWNlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ29udGV4dC5wcm90b3R5cGUuZmlsbFNoYXBlID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgIGlmIChzaGFwZS5nZXRGaWxsRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9maWxsKHNoYXBlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuX2ZpbGwgPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnN0cm9rZVNoYXBlID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgIGlmIChzaGFwZS5nZXRTdHJva2VFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0cm9rZShzaGFwZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLl9zdHJva2UgPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmZpbGxTdHJva2VTaGFwZSA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICBpZiAoc2hhcGUuZ2V0RmlsbEVuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fZmlsbChzaGFwZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNoYXBlLmdldFN0cm9rZUVuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fc3Ryb2tlKHNoYXBlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuZ2V0VHJhY2UgPSBmdW5jdGlvbiAocmVsYXhlZCkge1xuICAgICAgICB2YXIgdHJhY2VBcnIgPSB0aGlzLnRyYWNlQXJyLCBsZW4gPSB0cmFjZUFyci5sZW5ndGgsIHN0ciA9ICcnLCBuLCB0cmFjZSwgbWV0aG9kLCBhcmdzO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIHRyYWNlID0gdHJhY2VBcnJbbl07XG4gICAgICAgICAgICBtZXRob2QgPSB0cmFjZS5tZXRob2Q7XG4gICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgYXJncyA9IHRyYWNlLmFyZ3M7XG4gICAgICAgICAgICAgICAgc3RyICs9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBpZiAocmVsYXhlZCkge1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gRE9VQkxFX1BBUkVOO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxfMS5VdGlsLl9pc0FycmF5KGFyZ3NbMF0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gT1BFTl9QQVJFTl9CUkFDS0VUICsgYXJncy5qb2luKENPTU1BKSArIENMT1NFX0JSQUNLRVRfUEFSRU47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gT1BFTl9QQVJFTiArIGFyZ3Muam9pbihDT01NQSkgKyBDTE9TRV9QQVJFTjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0ciArPSB0cmFjZS5wcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlbGF4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9IEVRVUFMUyArIHRyYWNlLnZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHIgKz0gU0VNSUNPTE9OO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5jbGVhclRyYWNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRyYWNlQXJyID0gW107XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5fdHJhY2UgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHZhciB0cmFjZUFyciA9IHRoaXMudHJhY2VBcnIsIGxlbjtcbiAgICAgICAgdHJhY2VBcnIucHVzaChzdHIpO1xuICAgICAgICBsZW4gPSB0cmFjZUFyci5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gPj0gdHJhY2VBcnJNYXgpIHtcbiAgICAgICAgICAgIHRyYWNlQXJyLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGl4ZWxSYXRpbyA9IHRoaXMuZ2V0Q2FudmFzKCkuZ2V0UGl4ZWxSYXRpbygpO1xuICAgICAgICB0aGlzLnNldFRyYW5zZm9ybSgxICogcGl4ZWxSYXRpbywgMCwgMCwgMSAqIHBpeGVsUmF0aW8sIDAsIDApO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuZ2V0Q2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW52YXM7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICAgICAgdmFyIGNhbnZhcyA9IHRoaXMuZ2V0Q2FudmFzKCk7XG4gICAgICAgIGlmIChib3VuZHMpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJSZWN0KGJvdW5kcy54IHx8IDAsIGJvdW5kcy55IHx8IDAsIGJvdW5kcy53aWR0aCB8fCAwLCBib3VuZHMuaGVpZ2h0IHx8IDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbGVhclJlY3QoMCwgMCwgY2FudmFzLmdldFdpZHRoKCkgLyBjYW52YXMucGl4ZWxSYXRpbywgY2FudmFzLmdldEhlaWdodCgpIC8gY2FudmFzLnBpeGVsUmF0aW8pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5fYXBwbHlMaW5lQ2FwID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgIHZhciBsaW5lQ2FwID0gc2hhcGUuZ2V0TGluZUNhcCgpO1xuICAgICAgICBpZiAobGluZUNhcCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdsaW5lQ2FwJywgbGluZUNhcCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLl9hcHBseU9wYWNpdHkgPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgdmFyIGFic09wYWNpdHkgPSBzaGFwZS5nZXRBYnNvbHV0ZU9wYWNpdHkoKTtcbiAgICAgICAgaWYgKGFic09wYWNpdHkgIT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignZ2xvYmFsQWxwaGEnLCBhYnNPcGFjaXR5KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuX2FwcGx5TGluZUpvaW4gPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgdmFyIGxpbmVKb2luID0gc2hhcGUuZ2V0TGluZUpvaW4oKTtcbiAgICAgICAgaWYgKGxpbmVKb2luKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2xpbmVKb2luJywgbGluZUpvaW4pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5zZXRBdHRyID0gZnVuY3Rpb24gKGF0dHIsIHZhbCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0W2F0dHJdID0gdmFsO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuYXJjID0gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5hcmMoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5hcmNUbyA9IGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuYXJjKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuYmVnaW5QYXRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuYmV6aWVyQ3VydmVUbyA9IGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuYmV6aWVyQ3VydmVUbyhhMCwgYTEsIGEyLCBhMywgYTQsIGE1KTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmNsZWFyUmVjdCA9IGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMykge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmNsZWFyUmVjdChhMCwgYTEsIGEyLCBhMyk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5jbGlwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmNsaXAoKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmNsb3NlUGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmNyZWF0ZUltYWdlRGF0YSA9IGZ1bmN0aW9uIChhMCwgYTEpIHtcbiAgICAgICAgdmFyIGEgPSBhcmd1bWVudHM7XG4gICAgICAgIGlmIChhLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKGEwLCBhMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmNyZWF0ZUltYWdlRGF0YShhMCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmNyZWF0ZUxpbmVhckdyYWRpZW50ID0gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KGEwLCBhMSwgYTIsIGEzKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmNyZWF0ZVBhdHRlcm4gPSBmdW5jdGlvbiAoYTAsIGExKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmNyZWF0ZVBhdHRlcm4oYTAsIGExKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmNyZWF0ZVJhZGlhbEdyYWRpZW50ID0gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5kcmF3SW1hZ2UgPSBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCkge1xuICAgICAgICB2YXIgYSA9IGFyZ3VtZW50cywgX2NvbnRleHQgPSB0aGlzLl9jb250ZXh0O1xuICAgICAgICBpZiAoYS5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIF9jb250ZXh0LmRyYXdJbWFnZShhMCwgYTEsIGEyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhLmxlbmd0aCA9PT0gNSkge1xuICAgICAgICAgICAgX2NvbnRleHQuZHJhd0ltYWdlKGEwLCBhMSwgYTIsIGEzLCBhNCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYS5sZW5ndGggPT09IDkpIHtcbiAgICAgICAgICAgIF9jb250ZXh0LmRyYXdJbWFnZShhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuaXNQb2ludEluUGF0aCA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmlzUG9pbnRJblBhdGgoeCwgeSk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGwoKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmZpbGxSZWN0ID0gZnVuY3Rpb24gKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5maWxsUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnN0cm9rZVJlY3QgPSBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZVJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5maWxsVGV4dCA9IGZ1bmN0aW9uIChhMCwgYTEsIGEyKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFRleHQoYTAsIGExLCBhMik7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5tZWFzdXJlVGV4dCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0Lm1lYXN1cmVUZXh0KHRleHQpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuZ2V0SW1hZ2VEYXRhID0gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEltYWdlRGF0YShhMCwgYTEsIGEyLCBhMyk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5saW5lVG8gPSBmdW5jdGlvbiAoYTAsIGExKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubGluZVRvKGEwLCBhMSk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5tb3ZlVG8gPSBmdW5jdGlvbiAoYTAsIGExKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubW92ZVRvKGEwLCBhMSk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5yZWN0ID0gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQucmVjdChhMCwgYTEsIGEyLCBhMyk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5wdXRJbWFnZURhdGEgPSBmdW5jdGlvbiAoYTAsIGExLCBhMikge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnB1dEltYWdlRGF0YShhMCwgYTEsIGEyKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnF1YWRyYXRpY0N1cnZlVG8gPSBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKGEwLCBhMSwgYTIsIGEzKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnJlc3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUucm90YXRlID0gZnVuY3Rpb24gKGEwKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQucm90YXRlKGEwKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuc2F2ZSgpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuc2NhbGUgPSBmdW5jdGlvbiAoYTAsIGExKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuc2NhbGUoYTAsIGExKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnNldExpbmVEYXNoID0gZnVuY3Rpb24gKGEwKSB7XG4gICAgICAgIGlmICh0aGlzLl9jb250ZXh0LnNldExpbmVEYXNoKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnNldExpbmVEYXNoKGEwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgnbW96RGFzaCcgaW4gdGhpcy5fY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dFsnbW96RGFzaCddID0gYTA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoJ3dlYmtpdExpbmVEYXNoJyBpbiB0aGlzLl9jb250ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0Wyd3ZWJraXRMaW5lRGFzaCddID0gYTA7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmdldExpbmVEYXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRMaW5lRGFzaCgpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuc2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zZXRUcmFuc2Zvcm0oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5zdHJva2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlKCk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5zdHJva2VUZXh0ID0gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlVGV4dChhMCwgYTEsIGEyLCBhMyk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS50cmFuc2Zvcm0gPSBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnRyYW5zZm9ybShhMCwgYTEsIGEyLCBhMywgYTQsIGE1KTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uIChhMCwgYTEpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC50cmFuc2xhdGUoYTAsIGExKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLl9lbmFibGVUcmFjZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBsZW4gPSBDT05URVhUX01FVEhPRFMubGVuZ3RoLCBfc2ltcGxpZnlBcnJheSA9IFV0aWxfMS5VdGlsLl9zaW1wbGlmeUFycmF5LCBvcmlnU2V0dGVyID0gdGhpcy5zZXRBdHRyLCBuLCBhcmdzO1xuICAgICAgICB2YXIgZnVuYyA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICB2YXIgb3JpZ01ldGhvZCA9IHRoYXRbbWV0aG9kTmFtZV0sIHJldDtcbiAgICAgICAgICAgIHRoYXRbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYXJncyA9IF9zaW1wbGlmeUFycmF5KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICAgICAgICAgIHJldCA9IG9yaWdNZXRob2QuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB0aGF0Ll90cmFjZSh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYXJnczogYXJnc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIGZ1bmMoQ09OVEVYVF9NRVRIT0RTW25dKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnNldEF0dHIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvcmlnU2V0dGVyLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB2YXIgcHJvcCA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIHZhciB2YWwgPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ3NoYWRvd09mZnNldFgnIHx8XG4gICAgICAgICAgICAgICAgcHJvcCA9PT0gJ3NoYWRvd09mZnNldFknIHx8XG4gICAgICAgICAgICAgICAgcHJvcCA9PT0gJ3NoYWRvd0JsdXInKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsIC8gdGhpcy5jYW52YXMuZ2V0UGl4ZWxSYXRpbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5fdHJhY2Uoe1xuICAgICAgICAgICAgICAgIHByb3BlcnR5OiBwcm9wLFxuICAgICAgICAgICAgICAgIHZhbDogdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLl9hcHBseUdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHZhciBnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBub2RlLmdldEdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbigpO1xuICAgICAgICBpZiAoZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uICE9PSAnc291cmNlLW92ZXInKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2dsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbicsIGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDb250ZXh0O1xufSgpKTtcbmV4cG9ydHMuQ29udGV4dCA9IENvbnRleHQ7XG5DT05URVhUX1BST1BFUlRJRVMuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb250ZXh0LnByb3RvdHlwZSwgcHJvcCwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0W3Byb3BdO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHRbcHJvcF0gPSB2YWw7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xudmFyIFNjZW5lQ29udGV4dCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNjZW5lQ29udGV4dCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTY2VuZUNvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgU2NlbmVDb250ZXh0LnByb3RvdHlwZS5fZmlsbENvbG9yID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgIHZhciBmaWxsID0gc2hhcGUuZmlsbCgpO1xuICAgICAgICB0aGlzLnNldEF0dHIoJ2ZpbGxTdHlsZScsIGZpbGwpO1xuICAgICAgICBzaGFwZS5fZmlsbEZ1bmModGhpcyk7XG4gICAgfTtcbiAgICBTY2VuZUNvbnRleHQucHJvdG90eXBlLl9maWxsUGF0dGVybiA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICB2YXIgZmlsbFBhdHRlcm5YID0gc2hhcGUuZ2V0RmlsbFBhdHRlcm5YKCksIGZpbGxQYXR0ZXJuWSA9IHNoYXBlLmdldEZpbGxQYXR0ZXJuWSgpLCBmaWxsUGF0dGVyblNjYWxlWCA9IHNoYXBlLmdldEZpbGxQYXR0ZXJuU2NhbGVYKCksIGZpbGxQYXR0ZXJuU2NhbGVZID0gc2hhcGUuZ2V0RmlsbFBhdHRlcm5TY2FsZVkoKSwgZmlsbFBhdHRlcm5Sb3RhdGlvbiA9IEdsb2JhbF8xLktvbnZhLmdldEFuZ2xlKHNoYXBlLmdldEZpbGxQYXR0ZXJuUm90YXRpb24oKSksIGZpbGxQYXR0ZXJuT2Zmc2V0WCA9IHNoYXBlLmdldEZpbGxQYXR0ZXJuT2Zmc2V0WCgpLCBmaWxsUGF0dGVybk9mZnNldFkgPSBzaGFwZS5nZXRGaWxsUGF0dGVybk9mZnNldFkoKTtcbiAgICAgICAgaWYgKGZpbGxQYXR0ZXJuWCB8fCBmaWxsUGF0dGVyblkpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlKGZpbGxQYXR0ZXJuWCB8fCAwLCBmaWxsUGF0dGVyblkgfHwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbGxQYXR0ZXJuUm90YXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMucm90YXRlKGZpbGxQYXR0ZXJuUm90YXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWxsUGF0dGVyblNjYWxlWCB8fCBmaWxsUGF0dGVyblNjYWxlWSkge1xuICAgICAgICAgICAgdGhpcy5zY2FsZShmaWxsUGF0dGVyblNjYWxlWCwgZmlsbFBhdHRlcm5TY2FsZVkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWxsUGF0dGVybk9mZnNldFggfHwgZmlsbFBhdHRlcm5PZmZzZXRZKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZSgtMSAqIGZpbGxQYXR0ZXJuT2Zmc2V0WCwgLTEgKiBmaWxsUGF0dGVybk9mZnNldFkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0QXR0cignZmlsbFN0eWxlJywgc2hhcGUuX2dldEZpbGxQYXR0ZXJuKCkpO1xuICAgICAgICBzaGFwZS5fZmlsbEZ1bmModGhpcyk7XG4gICAgfTtcbiAgICBTY2VuZUNvbnRleHQucHJvdG90eXBlLl9maWxsTGluZWFyR3JhZGllbnQgPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgdmFyIGdyZCA9IHNoYXBlLl9nZXRMaW5lYXJHcmFkaWVudCgpO1xuICAgICAgICBpZiAoZ3JkKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2ZpbGxTdHlsZScsIGdyZCk7XG4gICAgICAgICAgICBzaGFwZS5fZmlsbEZ1bmModGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNjZW5lQ29udGV4dC5wcm90b3R5cGUuX2ZpbGxSYWRpYWxHcmFkaWVudCA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICB2YXIgZ3JkID0gc2hhcGUuX2dldFJhZGlhbEdyYWRpZW50KCk7XG4gICAgICAgIGlmIChncmQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignZmlsbFN0eWxlJywgZ3JkKTtcbiAgICAgICAgICAgIHNoYXBlLl9maWxsRnVuYyh0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2NlbmVDb250ZXh0LnByb3RvdHlwZS5fZmlsbCA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICB2YXIgaGFzQ29sb3IgPSBzaGFwZS5maWxsKCksIGZpbGxQcmlvcml0eSA9IHNoYXBlLmdldEZpbGxQcmlvcml0eSgpO1xuICAgICAgICBpZiAoaGFzQ29sb3IgJiYgZmlsbFByaW9yaXR5ID09PSAnY29sb3InKSB7XG4gICAgICAgICAgICB0aGlzLl9maWxsQ29sb3Ioc2hhcGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoYXNQYXR0ZXJuID0gc2hhcGUuZ2V0RmlsbFBhdHRlcm5JbWFnZSgpO1xuICAgICAgICBpZiAoaGFzUGF0dGVybiAmJiBmaWxsUHJpb3JpdHkgPT09ICdwYXR0ZXJuJykge1xuICAgICAgICAgICAgdGhpcy5fZmlsbFBhdHRlcm4oc2hhcGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoYXNMaW5lYXJHcmFkaWVudCA9IHNoYXBlLmdldEZpbGxMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMoKTtcbiAgICAgICAgaWYgKGhhc0xpbmVhckdyYWRpZW50ICYmIGZpbGxQcmlvcml0eSA9PT0gJ2xpbmVhci1ncmFkaWVudCcpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGxMaW5lYXJHcmFkaWVudChzaGFwZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhhc1JhZGlhbEdyYWRpZW50ID0gc2hhcGUuZ2V0RmlsbFJhZGlhbEdyYWRpZW50Q29sb3JTdG9wcygpO1xuICAgICAgICBpZiAoaGFzUmFkaWFsR3JhZGllbnQgJiYgZmlsbFByaW9yaXR5ID09PSAncmFkaWFsLWdyYWRpZW50Jykge1xuICAgICAgICAgICAgdGhpcy5fZmlsbFJhZGlhbEdyYWRpZW50KHNoYXBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzQ29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGxDb2xvcihzaGFwZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaGFzUGF0dGVybikge1xuICAgICAgICAgICAgdGhpcy5fZmlsbFBhdHRlcm4oc2hhcGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhhc0xpbmVhckdyYWRpZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9maWxsTGluZWFyR3JhZGllbnQoc2hhcGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhhc1JhZGlhbEdyYWRpZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9maWxsUmFkaWFsR3JhZGllbnQoc2hhcGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTY2VuZUNvbnRleHQucHJvdG90eXBlLl9zdHJva2VMaW5lYXJHcmFkaWVudCA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICB2YXIgc3RhcnQgPSBzaGFwZS5nZXRTdHJva2VMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnQoKSwgZW5kID0gc2hhcGUuZ2V0U3Ryb2tlTGluZWFyR3JhZGllbnRFbmRQb2ludCgpLCBjb2xvclN0b3BzID0gc2hhcGUuZ2V0U3Ryb2tlTGluZWFyR3JhZGllbnRDb2xvclN0b3BzKCksIGdyZCA9IHRoaXMuY3JlYXRlTGluZWFyR3JhZGllbnQoc3RhcnQueCwgc3RhcnQueSwgZW5kLngsIGVuZC55KTtcbiAgICAgICAgaWYgKGNvbG9yU3RvcHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgY29sb3JTdG9wcy5sZW5ndGg7IG4gKz0gMikge1xuICAgICAgICAgICAgICAgIGdyZC5hZGRDb2xvclN0b3AoY29sb3JTdG9wc1tuXSwgY29sb3JTdG9wc1tuICsgMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdzdHJva2VTdHlsZScsIGdyZCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNjZW5lQ29udGV4dC5wcm90b3R5cGUuX3N0cm9rZSA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICB2YXIgZGFzaCA9IHNoYXBlLmRhc2goKSwgc3Ryb2tlU2NhbGVFbmFibGVkID0gc2hhcGUuZ2V0U3Ryb2tlU2NhbGVFbmFibGVkKCk7XG4gICAgICAgIGlmIChzaGFwZS5oYXNTdHJva2UoKSkge1xuICAgICAgICAgICAgaWYgKCFzdHJva2VTY2FsZUVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICAgICAgICAgICAgICB2YXIgcGl4ZWxSYXRpbyA9IHRoaXMuZ2V0Q2FudmFzKCkuZ2V0UGl4ZWxSYXRpbygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKHBpeGVsUmF0aW8sIDAsIDAsIHBpeGVsUmF0aW8sIDAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYXBwbHlMaW5lQ2FwKHNoYXBlKTtcbiAgICAgICAgICAgIGlmIChkYXNoICYmIHNoYXBlLmRhc2hFbmFibGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldExpbmVEYXNoKGRhc2gpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cignbGluZURhc2hPZmZzZXQnLCBzaGFwZS5kYXNoT2Zmc2V0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdsaW5lV2lkdGgnLCBzaGFwZS5zdHJva2VXaWR0aCgpKTtcbiAgICAgICAgICAgIGlmICghc2hhcGUuZ2V0U2hhZG93Rm9yU3Ryb2tlRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdzaGFkb3dDb2xvcicsICdyZ2JhKDAsMCwwLDApJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaGFzTGluZWFyR3JhZGllbnQgPSBzaGFwZS5nZXRTdHJva2VMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMoKTtcbiAgICAgICAgICAgIGlmIChoYXNMaW5lYXJHcmFkaWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0cm9rZUxpbmVhckdyYWRpZW50KHNoYXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cignc3Ryb2tlU3R5bGUnLCBzaGFwZS5zdHJva2UoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaGFwZS5fc3Ryb2tlRnVuYyh0aGlzKTtcbiAgICAgICAgICAgIGlmICghc3Ryb2tlU2NhbGVFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNjZW5lQ29udGV4dC5wcm90b3R5cGUuX2FwcGx5U2hhZG93ID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgIHZhciB1dGlsID0gVXRpbF8xLlV0aWwsIGNvbG9yID0gdXRpbC5nZXQoc2hhcGUuZ2V0U2hhZG93UkdCQSgpLCAnYmxhY2snKSwgYmx1ciA9IHV0aWwuZ2V0KHNoYXBlLmdldFNoYWRvd0JsdXIoKSwgNSksIG9mZnNldCA9IHV0aWwuZ2V0KHNoYXBlLmdldFNoYWRvd09mZnNldCgpLCB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICB9KSwgc2NhbGUgPSBzaGFwZS5nZXRBYnNvbHV0ZVNjYWxlKCksIHJhdGlvID0gdGhpcy5jYW52YXMuZ2V0UGl4ZWxSYXRpbygpLCBzY2FsZVggPSBzY2FsZS54ICogcmF0aW8sIHNjYWxlWSA9IHNjYWxlLnkgKiByYXRpbztcbiAgICAgICAgdGhpcy5zZXRBdHRyKCdzaGFkb3dDb2xvcicsIGNvbG9yKTtcbiAgICAgICAgdGhpcy5zZXRBdHRyKCdzaGFkb3dCbHVyJywgYmx1ciAqIE1hdGgubWluKE1hdGguYWJzKHNjYWxlWCksIE1hdGguYWJzKHNjYWxlWSkpKTtcbiAgICAgICAgdGhpcy5zZXRBdHRyKCdzaGFkb3dPZmZzZXRYJywgb2Zmc2V0LnggKiBzY2FsZVgpO1xuICAgICAgICB0aGlzLnNldEF0dHIoJ3NoYWRvd09mZnNldFknLCBvZmZzZXQueSAqIHNjYWxlWSk7XG4gICAgfTtcbiAgICByZXR1cm4gU2NlbmVDb250ZXh0O1xufShDb250ZXh0KSk7XG5leHBvcnRzLlNjZW5lQ29udGV4dCA9IFNjZW5lQ29udGV4dDtcbnZhciBIaXRDb250ZXh0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSGl0Q29udGV4dCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBIaXRDb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIEhpdENvbnRleHQucHJvdG90eXBlLl9maWxsID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICB0aGlzLnNldEF0dHIoJ2ZpbGxTdHlsZScsIHNoYXBlLmNvbG9yS2V5KTtcbiAgICAgICAgc2hhcGUuX2ZpbGxGdW5jSGl0KHRoaXMpO1xuICAgICAgICB0aGlzLnJlc3RvcmUoKTtcbiAgICB9O1xuICAgIEhpdENvbnRleHQucHJvdG90eXBlLl9zdHJva2UgPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgaWYgKHNoYXBlLmhhc1N0cm9rZSgpICYmIHNoYXBlLmhpdFN0cm9rZVdpZHRoKCkpIHtcbiAgICAgICAgICAgIHZhciBzdHJva2VTY2FsZUVuYWJsZWQgPSBzaGFwZS5nZXRTdHJva2VTY2FsZUVuYWJsZWQoKTtcbiAgICAgICAgICAgIGlmICghc3Ryb2tlU2NhbGVFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgICAgICAgICAgdmFyIHBpeGVsUmF0aW8gPSB0aGlzLmdldENhbnZhcygpLmdldFBpeGVsUmF0aW8oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRyYW5zZm9ybShwaXhlbFJhdGlvLCAwLCAwLCBwaXhlbFJhdGlvLCAwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2FwcGx5TGluZUNhcChzaGFwZSk7XG4gICAgICAgICAgICB2YXIgaGl0U3Ryb2tlV2lkdGggPSBzaGFwZS5oaXRTdHJva2VXaWR0aCgpO1xuICAgICAgICAgICAgdmFyIHN0cm9rZVdpZHRoID0gaGl0U3Ryb2tlV2lkdGggPT09ICdhdXRvJyA/IHNoYXBlLnN0cm9rZVdpZHRoKCkgOiBoaXRTdHJva2VXaWR0aDtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignbGluZVdpZHRoJywgc3Ryb2tlV2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdzdHJva2VTdHlsZScsIHNoYXBlLmNvbG9yS2V5KTtcbiAgICAgICAgICAgIHNoYXBlLl9zdHJva2VGdW5jSGl0KHRoaXMpO1xuICAgICAgICAgICAgaWYgKCFzdHJva2VTY2FsZUVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEhpdENvbnRleHQ7XG59KENvbnRleHQpKTtcbmV4cG9ydHMuSGl0Q29udGV4dCA9IEhpdENvbnRleHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBBbmltYXRpb25fMSA9IHJlcXVpcmUoXCIuL0FuaW1hdGlvblwiKTtcbnZhciBHbG9iYWxfMSA9IHJlcXVpcmUoXCIuL0dsb2JhbFwiKTtcbmV4cG9ydHMuREQgPSB7XG4gICAgc3RhcnRQb2ludGVyUG9zOiB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICB9LFxuICAgIGFuaW06IG5ldyBBbmltYXRpb25fMS5BbmltYXRpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYiA9IHRoaXMuZGlydHk7XG4gICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGI7XG4gICAgfSksXG4gICAgaXNEcmFnZ2luZzogZmFsc2UsXG4gICAganVzdERyYWdnZWQ6IGZhbHNlLFxuICAgIG9mZnNldDoge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgfSxcbiAgICBub2RlOiBudWxsLFxuICAgIF9kcmFnOiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHZhciBub2RlID0gZXhwb3J0cy5ERC5ub2RlO1xuICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgaWYgKCFleHBvcnRzLkRELmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gbm9kZS5nZXRTdGFnZSgpLmdldFBvaW50ZXJQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmICghcG9zKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0U3RhZ2UoKS5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICAgICAgICAgICAgICBwb3MgPSBub2RlLmdldFN0YWdlKCkuZ2V0UG9pbnRlclBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBkcmFnRGlzdGFuY2UgPSBub2RlLmRyYWdEaXN0YW5jZSgpO1xuICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IE1hdGgubWF4KE1hdGguYWJzKHBvcy54IC0gZXhwb3J0cy5ERC5zdGFydFBvaW50ZXJQb3MueCksIE1hdGguYWJzKHBvcy55IC0gZXhwb3J0cy5ERC5zdGFydFBvaW50ZXJQb3MueSkpO1xuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IGRyYWdEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5nZXRTdGFnZSgpLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgICAgICBpZiAoIWV4cG9ydHMuREQuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgIGV4cG9ydHMuREQuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgbm9kZS5maXJlKCdkcmFnc3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkcmFnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IG5vZGUsXG4gICAgICAgICAgICAgICAgICAgIGV2dDogZXZ0XG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFub2RlLmlzRHJhZ2dpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5fc2V0RHJhZ1Bvc2l0aW9uKGV2dCk7XG4gICAgICAgICAgICBub2RlLmZpcmUoJ2RyYWdtb3ZlJywge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdkcmFnbW92ZScsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBub2RlLFxuICAgICAgICAgICAgICAgIGV2dDogZXZ0XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2VuZERyYWdCZWZvcmU6IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBleHBvcnRzLkRELm5vZGU7XG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICBleHBvcnRzLkRELmFuaW0uc3RvcCgpO1xuICAgICAgICAgICAgaWYgKGV4cG9ydHMuREQuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgIGV4cG9ydHMuREQuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGV4cG9ydHMuREQuanVzdERyYWdnZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIEdsb2JhbF8xLktvbnZhLmxpc3RlbkNsaWNrVGFwID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGV2dCkge1xuICAgICAgICAgICAgICAgICAgICBldnQuZHJhZ0VuZE5vZGUgPSBub2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4cG9ydHMuREQubm9kZSA9IG51bGw7XG4gICAgICAgICAgICB2YXIgZHJhd05vZGUgPSBub2RlLmdldExheWVyKCkgfHwgKG5vZGUgaW5zdGFuY2VvZiBHbG9iYWxfMS5Lb252YVsnU3RhZ2UnXSAmJiBub2RlKTtcbiAgICAgICAgICAgIGlmIChkcmF3Tm9kZSkge1xuICAgICAgICAgICAgICAgIGRyYXdOb2RlLmRyYXcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2VuZERyYWdBZnRlcjogZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBldnQgPSBldnQgfHwge307XG4gICAgICAgIHZhciBkcmFnRW5kTm9kZSA9IGV2dC5kcmFnRW5kTm9kZTtcbiAgICAgICAgaWYgKGV2dCAmJiBkcmFnRW5kTm9kZSkge1xuICAgICAgICAgICAgZHJhZ0VuZE5vZGUuZmlyZSgnZHJhZ2VuZCcsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZHJhZ2VuZCcsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBkcmFnRW5kTm9kZSxcbiAgICAgICAgICAgICAgICBldnQ6IGV2dFxuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuaWYgKEdsb2JhbF8xLktvbnZhLmlzQnJvd3Nlcikge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZXhwb3J0cy5ERC5fZW5kRHJhZ0JlZm9yZSwgdHJ1ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZXhwb3J0cy5ERC5fZW5kRHJhZ0JlZm9yZSwgdHJ1ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGV4cG9ydHMuREQuX2RyYWcpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBleHBvcnRzLkRELl9kcmFnKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGV4cG9ydHMuREQuX2VuZERyYWdBZnRlciwgZmFsc2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGV4cG9ydHMuREQuX2VuZERyYWdBZnRlciwgZmFsc2UpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVXRpbF8xID0gcmVxdWlyZShcIi4vVXRpbFwiKTtcbnZhciBWYWxpZGF0b3JzXzEgPSByZXF1aXJlKFwiLi9WYWxpZGF0b3JzXCIpO1xudmFyIEdFVCA9ICdnZXQnLCBTRVQgPSAnc2V0JztcbmV4cG9ydHMuRmFjdG9yeSA9IHtcbiAgICBhZGRHZXR0ZXJTZXR0ZXI6IGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgYXR0ciwgZGVmLCB2YWxpZGF0b3IsIGFmdGVyKSB7XG4gICAgICAgIHRoaXMuYWRkR2V0dGVyKGNvbnN0cnVjdG9yLCBhdHRyLCBkZWYpO1xuICAgICAgICB0aGlzLmFkZFNldHRlcihjb25zdHJ1Y3RvciwgYXR0ciwgdmFsaWRhdG9yLCBhZnRlcik7XG4gICAgICAgIHRoaXMuYWRkT3ZlcmxvYWRlZEdldHRlclNldHRlcihjb25zdHJ1Y3RvciwgYXR0cik7XG4gICAgfSxcbiAgICBhZGRHZXR0ZXI6IGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgYXR0ciwgZGVmKSB7XG4gICAgICAgIHZhciBtZXRob2QgPSBHRVQgKyBVdGlsXzEuVXRpbC5fY2FwaXRhbGl6ZShhdHRyKTtcbiAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZF0gPVxuICAgICAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZF0gfHxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSB0aGlzLmF0dHJzW2F0dHJdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsID09PSB1bmRlZmluZWQgPyBkZWYgOiB2YWw7XG4gICAgICAgICAgICAgICAgfTtcbiAgICB9LFxuICAgIGFkZFNldHRlcjogZnVuY3Rpb24gKGNvbnN0cnVjdG9yLCBhdHRyLCB2YWxpZGF0b3IsIGFmdGVyKSB7XG4gICAgICAgIHZhciBtZXRob2QgPSBTRVQgKyBVdGlsXzEuVXRpbC5fY2FwaXRhbGl6ZShhdHRyKTtcbiAgICAgICAgaWYgKCFjb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kXSkge1xuICAgICAgICAgICAgZXhwb3J0cy5GYWN0b3J5Lm92ZXJXcml0ZVNldHRlcihjb25zdHJ1Y3RvciwgYXR0ciwgdmFsaWRhdG9yLCBhZnRlcik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG92ZXJXcml0ZVNldHRlcjogZnVuY3Rpb24gKGNvbnN0cnVjdG9yLCBhdHRyLCB2YWxpZGF0b3IsIGFmdGVyKSB7XG4gICAgICAgIHZhciBtZXRob2QgPSBTRVQgKyBVdGlsXzEuVXRpbC5fY2FwaXRhbGl6ZShhdHRyKTtcbiAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdG9yICYmIHZhbCAhPT0gdW5kZWZpbmVkICYmIHZhbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhbCA9IHZhbGlkYXRvci5jYWxsKHRoaXMsIHZhbCwgYXR0cik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zZXRBdHRyKGF0dHIsIHZhbCk7XG4gICAgICAgICAgICBpZiAoYWZ0ZXIpIHtcbiAgICAgICAgICAgICAgICBhZnRlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBhZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyOiBmdW5jdGlvbiAoY29uc3RydWN0b3IsIGF0dHIsIGNvbXBvbmVudHMsIHZhbGlkYXRvciwgYWZ0ZXIpIHtcbiAgICAgICAgdmFyIGxlbiA9IGNvbXBvbmVudHMubGVuZ3RoLCBjYXBpdGFsaXplID0gVXRpbF8xLlV0aWwuX2NhcGl0YWxpemUsIGdldHRlciA9IEdFVCArIGNhcGl0YWxpemUoYXR0ciksIHNldHRlciA9IFNFVCArIGNhcGl0YWxpemUoYXR0ciksIG4sIGNvbXBvbmVudDtcbiAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW2dldHRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0ge307XG4gICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnRzW25dO1xuICAgICAgICAgICAgICAgIHJldFtjb21wb25lbnRdID0gdGhpcy5nZXRBdHRyKGF0dHIgKyBjYXBpdGFsaXplKGNvbXBvbmVudCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGJhc2ljVmFsaWRhdG9yID0gVmFsaWRhdG9yc18xLmdldENvbXBvbmVudFZhbGlkYXRvcihjb21wb25lbnRzKTtcbiAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW3NldHRlcl0gPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICB2YXIgb2xkVmFsID0gdGhpcy5hdHRyc1thdHRyXSwga2V5O1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgICAgICAgICAgIHZhbCA9IHZhbGlkYXRvci5jYWxsKHRoaXMsIHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmFzaWNWYWxpZGF0b3IpIHtcbiAgICAgICAgICAgICAgICBiYXNpY1ZhbGlkYXRvci5jYWxsKHRoaXMsIHZhbCwgYXR0cik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGtleSBpbiB2YWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRBdHRyKGF0dHIgKyBjYXBpdGFsaXplKGtleSksIHZhbFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2ZpcmVDaGFuZ2VFdmVudChhdHRyLCBvbGRWYWwsIHZhbCk7XG4gICAgICAgICAgICBpZiAoYWZ0ZXIpIHtcbiAgICAgICAgICAgICAgICBhZnRlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWRkT3ZlcmxvYWRlZEdldHRlclNldHRlcihjb25zdHJ1Y3RvciwgYXR0cik7XG4gICAgfSxcbiAgICBhZGRPdmVybG9hZGVkR2V0dGVyU2V0dGVyOiBmdW5jdGlvbiAoY29uc3RydWN0b3IsIGF0dHIpIHtcbiAgICAgICAgdmFyIGNhcGl0YWxpemVkQXR0ciA9IFV0aWxfMS5VdGlsLl9jYXBpdGFsaXplKGF0dHIpLCBzZXR0ZXIgPSBTRVQgKyBjYXBpdGFsaXplZEF0dHIsIGdldHRlciA9IEdFVCArIGNhcGl0YWxpemVkQXR0cjtcbiAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW2F0dHJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzW3NldHRlcl0oYXJndW1lbnRzWzBdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzW2dldHRlcl0oKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGFkZERlcHJlY2F0ZWRHZXR0ZXJTZXR0ZXI6IGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgYXR0ciwgZGVmLCB2YWxpZGF0b3IpIHtcbiAgICAgICAgVXRpbF8xLlV0aWwuZXJyb3IoJ0FkZGluZyBkZXByZWNhdGVkICcgKyBhdHRyKTtcbiAgICAgICAgdmFyIG1ldGhvZCA9IEdFVCArIFV0aWxfMS5VdGlsLl9jYXBpdGFsaXplKGF0dHIpO1xuICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dHIgK1xuICAgICAgICAgICAgJyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgc29vbi4gTG9vayBhdCBLb252YSBjaGFuZ2UgbG9nIGZvciBtb3JlIGluZm9ybWF0aW9uLic7XG4gICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgICAgICB2YXIgdmFsID0gdGhpcy5hdHRyc1thdHRyXTtcbiAgICAgICAgICAgIHJldHVybiB2YWwgPT09IHVuZGVmaW5lZCA/IGRlZiA6IHZhbDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hZGRTZXR0ZXIoY29uc3RydWN0b3IsIGF0dHIsIHZhbGlkYXRvciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFkZE92ZXJsb2FkZWRHZXR0ZXJTZXR0ZXIoY29uc3RydWN0b3IsIGF0dHIpO1xuICAgIH0sXG4gICAgYmFja0NvbXBhdDogZnVuY3Rpb24gKGNvbnN0cnVjdG9yLCBtZXRob2RzKSB7XG4gICAgICAgIFV0aWxfMS5VdGlsLmVhY2gobWV0aG9kcywgZnVuY3Rpb24gKG9sZE1ldGhvZE5hbWUsIG5ld01ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBtZXRob2QgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbbmV3TWV0aG9kTmFtZV07XG4gICAgICAgICAgICB2YXIgb2xkR2V0dGVyID0gR0VUICsgVXRpbF8xLlV0aWwuX2NhcGl0YWxpemUob2xkTWV0aG9kTmFtZSk7XG4gICAgICAgICAgICB2YXIgb2xkU2V0dGVyID0gU0VUICsgVXRpbF8xLlV0aWwuX2NhcGl0YWxpemUob2xkTWV0aG9kTmFtZSk7XG4gICAgICAgICAgICBmdW5jdGlvbiBkZXByZWNhdGVkKCkge1xuICAgICAgICAgICAgICAgIG1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIFV0aWxfMS5VdGlsLmVycm9yKCdcIicgK1xuICAgICAgICAgICAgICAgICAgICBvbGRNZXRob2ROYW1lICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIG1ldGhvZCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgc29vbi4gVXNlIFwiXCInICtcbiAgICAgICAgICAgICAgICAgICAgbmV3TWV0aG9kTmFtZSArXG4gICAgICAgICAgICAgICAgICAgICdcIiBpbnN0ZWFkLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW29sZE1ldGhvZE5hbWVdID0gZGVwcmVjYXRlZDtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZVtvbGRHZXR0ZXJdID0gZGVwcmVjYXRlZDtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZVtvbGRTZXR0ZXJdID0gZGVwcmVjYXRlZDtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBhZnRlclNldEZpbHRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9maWx0ZXJVcFRvRGF0ZSA9IGZhbHNlO1xuICAgIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBQSV9PVkVSXzE4MCA9IE1hdGguUEkgLyAxODA7XG5mdW5jdGlvbiBkZXRlY3RCcm93c2VyKCkge1xuICAgIHJldHVybiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgKHt9LnRvU3RyaW5nLmNhbGwod2luZG93KSA9PT0gJ1tvYmplY3QgV2luZG93XScgfHxcbiAgICAgICAgICAgIHt9LnRvU3RyaW5nLmNhbGwod2luZG93KSA9PT0gJ1tvYmplY3QgZ2xvYmFsXScpKTtcbn1cbnZhciBfZGV0ZWN0SUUgPSBmdW5jdGlvbiAodWEpIHtcbiAgICB2YXIgbXNpZSA9IHVhLmluZGV4T2YoJ21zaWUgJyk7XG4gICAgaWYgKG1zaWUgPiAwKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh1YS5zdWJzdHJpbmcobXNpZSArIDUsIHVhLmluZGV4T2YoJy4nLCBtc2llKSksIDEwKTtcbiAgICB9XG4gICAgdmFyIHRyaWRlbnQgPSB1YS5pbmRleE9mKCd0cmlkZW50LycpO1xuICAgIGlmICh0cmlkZW50ID4gMCkge1xuICAgICAgICB2YXIgcnYgPSB1YS5pbmRleE9mKCdydjonKTtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHVhLnN1YnN0cmluZyhydiArIDMsIHVhLmluZGV4T2YoJy4nLCBydikpLCAxMCk7XG4gICAgfVxuICAgIHZhciBlZGdlID0gdWEuaW5kZXhPZignZWRnZS8nKTtcbiAgICBpZiAoZWRnZSA+IDApIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHVhLnN1YnN0cmluZyhlZGdlICsgNSwgdWEuaW5kZXhPZignLicsIGVkZ2UpKSwgMTApO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuZXhwb3J0cy5fcGFyc2VVQSA9IGZ1bmN0aW9uICh1c2VyQWdlbnQpIHtcbiAgICB2YXIgdWEgPSB1c2VyQWdlbnQudG9Mb3dlckNhc2UoKSwgbWF0Y2ggPSAvKGNocm9tZSlbIC9dKFtcXHcuXSspLy5leGVjKHVhKSB8fFxuICAgICAgICAvKHdlYmtpdClbIC9dKFtcXHcuXSspLy5leGVjKHVhKSB8fFxuICAgICAgICAvKG9wZXJhKSg/Oi4qdmVyc2lvbnwpWyAvXShbXFx3Ll0rKS8uZXhlYyh1YSkgfHxcbiAgICAgICAgLyhtc2llKSAoW1xcdy5dKykvLmV4ZWModWEpIHx8XG4gICAgICAgICh1YS5pbmRleE9mKCdjb21wYXRpYmxlJykgPCAwICYmXG4gICAgICAgICAgICAvKG1vemlsbGEpKD86Lio/IHJ2OihbXFx3Ll0rKXwpLy5leGVjKHVhKSkgfHxcbiAgICAgICAgW10sIG1vYmlsZSA9ICEhdXNlckFnZW50Lm1hdGNoKC9BbmRyb2lkfEJsYWNrQmVycnl8aVBob25lfGlQYWR8aVBvZHxPcGVyYSBNaW5pfElFTW9iaWxlL2kpLCBpZU1vYmlsZSA9ICEhdXNlckFnZW50Lm1hdGNoKC9JRU1vYmlsZS9pKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBicm93c2VyOiBtYXRjaFsxXSB8fCAnJyxcbiAgICAgICAgdmVyc2lvbjogbWF0Y2hbMl0gfHwgJzAnLFxuICAgICAgICBpc0lFOiBfZGV0ZWN0SUUodWEpLFxuICAgICAgICBtb2JpbGU6IG1vYmlsZSxcbiAgICAgICAgaWVNb2JpbGU6IGllTW9iaWxlXG4gICAgfTtcbn07XG5leHBvcnRzLmdsb2IgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJ1xuICAgID8gZ2xvYmFsXG4gICAgOiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IHdpbmRvd1xuICAgICAgICA6IHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgID8gc2VsZlxuICAgICAgICAgICAgOiB7fTtcbmV4cG9ydHMuS29udmEgPSB7XG4gICAgdmVyc2lvbjogJzMuMi42JyxcbiAgICBpc0Jyb3dzZXI6IGRldGVjdEJyb3dzZXIoKSxcbiAgICBpc1VubWluaWZpZWQ6IC9wYXJhbS8udGVzdChmdW5jdGlvbiAocGFyYW0pIHsgfS50b1N0cmluZygpKSxcbiAgICBkYmxDbGlja1dpbmRvdzogNDAwLFxuICAgIGdldEFuZ2xlOiBmdW5jdGlvbiAoYW5nbGUpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuS29udmEuYW5nbGVEZWcgPyBhbmdsZSAqIFBJX09WRVJfMTgwIDogYW5nbGU7XG4gICAgfSxcbiAgICBlbmFibGVUcmFjZTogZmFsc2UsXG4gICAgbGlzdGVuQ2xpY2tUYXA6IGZhbHNlLFxuICAgIGluRGJsQ2xpY2tXaW5kb3c6IGZhbHNlLFxuICAgIHBpeGVsUmF0aW86IHVuZGVmaW5lZCxcbiAgICBkcmFnRGlzdGFuY2U6IDMsXG4gICAgYW5nbGVEZWc6IHRydWUsXG4gICAgc2hvd1dhcm5pbmdzOiB0cnVlLFxuICAgIGRyYWdCdXR0b25zOiBbMCwgMV0sXG4gICAgaXNEcmFnZ2luZzogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZXhwb3J0cy5Lb252YVsnREQnXS5pc0RyYWdnaW5nO1xuICAgIH0sXG4gICAgaXNEcmFnUmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICEhZXhwb3J0cy5Lb252YVsnREQnXS5ub2RlO1xuICAgIH0sXG4gICAgVUE6IGV4cG9ydHMuX3BhcnNlVUEoKGV4cG9ydHMuZ2xvYi5uYXZpZ2F0b3IgJiYgZXhwb3J0cy5nbG9iLm5hdmlnYXRvci51c2VyQWdlbnQpIHx8ICcnKSxcbiAgICBkb2N1bWVudDogZXhwb3J0cy5nbG9iLmRvY3VtZW50LFxuICAgIF9pbmplY3RHbG9iYWw6IGZ1bmN0aW9uIChLb252YSkge1xuICAgICAgICBleHBvcnRzLmdsb2IuS29udmEgPSBLb252YTtcbiAgICB9LFxuICAgIF9wYXJzZVVBOiBleHBvcnRzLl9wYXJzZVVBXG59O1xuZXhwb3J0cy5fTk9ERVNfUkVHSVNUUlkgPSB7fTtcbmV4cG9ydHMuX3JlZ2lzdGVyTm9kZSA9IGZ1bmN0aW9uIChOb2RlQ2xhc3MpIHtcbiAgICBleHBvcnRzLl9OT0RFU19SRUdJU1RSWVtOb2RlQ2xhc3MucHJvdG90eXBlLmdldENsYXNzTmFtZSgpXSA9IE5vZGVDbGFzcztcbiAgICBleHBvcnRzLktvbnZhW05vZGVDbGFzcy5wcm90b3R5cGUuZ2V0Q2xhc3NOYW1lKCldID0gTm9kZUNsYXNzO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVXRpbF8xID0gcmVxdWlyZShcIi4vVXRpbFwiKTtcbnZhciBDb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL0NvbnRhaW5lclwiKTtcbnZhciBGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi9GYWN0b3J5XCIpO1xudmFyIEJhc2VMYXllcl8xID0gcmVxdWlyZShcIi4vQmFzZUxheWVyXCIpO1xudmFyIENhbnZhc18xID0gcmVxdWlyZShcIi4vQ2FudmFzXCIpO1xudmFyIFNoYXBlXzEgPSByZXF1aXJlKFwiLi9TaGFwZVwiKTtcbnZhciBWYWxpZGF0b3JzXzEgPSByZXF1aXJlKFwiLi9WYWxpZGF0b3JzXCIpO1xudmFyIEdsb2JhbF8xID0gcmVxdWlyZShcIi4vR2xvYmFsXCIpO1xudmFyIEhBU0ggPSAnIycsIEJFRk9SRV9EUkFXID0gJ2JlZm9yZURyYXcnLCBEUkFXID0gJ2RyYXcnLCBJTlRFUlNFQ1RJT05fT0ZGU0VUUyA9IFtcbiAgICB7IHg6IDAsIHk6IDAgfSxcbiAgICB7IHg6IC0xLCB5OiAtMSB9LFxuICAgIHsgeDogMSwgeTogLTEgfSxcbiAgICB7IHg6IDEsIHk6IDEgfSxcbiAgICB7IHg6IC0xLCB5OiAxIH1cbl0sIElOVEVSU0VDVElPTl9PRkZTRVRTX0xFTiA9IElOVEVSU0VDVElPTl9PRkZTRVRTLmxlbmd0aDtcbnZhciBMYXllciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKExheWVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIExheWVyKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuaGl0Q2FudmFzID0gbmV3IENhbnZhc18xLkhpdENhbnZhcyh7XG4gICAgICAgICAgICBwaXhlbFJhdGlvOiAxXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIExheWVyLnByb3RvdHlwZS5fc2V0Q2FudmFzU2l6ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY2FudmFzLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuaGl0Q2FudmFzLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUuX3ZhbGlkYXRlQWRkID0gZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgIHZhciB0eXBlID0gY2hpbGQuZ2V0VHlwZSgpO1xuICAgICAgICBpZiAodHlwZSAhPT0gJ0dyb3VwJyAmJiB0eXBlICE9PSAnU2hhcGUnKSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC50aHJvdygnWW91IG1heSBvbmx5IGFkZCBncm91cHMgYW5kIHNoYXBlcyB0byBhIGxheWVyLicpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUuZ2V0SW50ZXJzZWN0aW9uID0gZnVuY3Rpb24gKHBvcywgc2VsZWN0b3IpIHtcbiAgICAgICAgdmFyIG9iaiwgaSwgaW50ZXJzZWN0aW9uT2Zmc2V0LCBzaGFwZTtcbiAgICAgICAgaWYgKCF0aGlzLmhpdEdyYXBoRW5hYmxlZCgpIHx8ICF0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3BpcmFsU2VhcmNoRGlzdGFuY2UgPSAxO1xuICAgICAgICB2YXIgY29udGludWVTZWFyY2ggPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBJTlRFUlNFQ1RJT05fT0ZGU0VUU19MRU47IGkrKykge1xuICAgICAgICAgICAgICAgIGludGVyc2VjdGlvbk9mZnNldCA9IElOVEVSU0VDVElPTl9PRkZTRVRTW2ldO1xuICAgICAgICAgICAgICAgIG9iaiA9IHRoaXMuX2dldEludGVyc2VjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIHg6IHBvcy54ICsgaW50ZXJzZWN0aW9uT2Zmc2V0LnggKiBzcGlyYWxTZWFyY2hEaXN0YW5jZSxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9zLnkgKyBpbnRlcnNlY3Rpb25PZmZzZXQueSAqIHNwaXJhbFNlYXJjaERpc3RhbmNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2hhcGUgPSBvYmouc2hhcGU7XG4gICAgICAgICAgICAgICAgaWYgKHNoYXBlICYmIHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzaGFwZS5maW5kQW5jZXN0b3Ioc2VsZWN0b3IsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzaGFwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hhcGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlU2VhcmNoID0gISFvYmouYW50aWFsaWFzZWQ7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmouYW50aWFsaWFzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbnRpbnVlU2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgc3BpcmFsU2VhcmNoRGlzdGFuY2UgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUuX2dldEludGVyc2VjdGlvbiA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgdmFyIHJhdGlvID0gdGhpcy5oaXRDYW52YXMucGl4ZWxSYXRpbztcbiAgICAgICAgdmFyIHAgPSB0aGlzLmhpdENhbnZhcy5jb250ZXh0LmdldEltYWdlRGF0YShNYXRoLnJvdW5kKHBvcy54ICogcmF0aW8pLCBNYXRoLnJvdW5kKHBvcy55ICogcmF0aW8pLCAxLCAxKS5kYXRhLCBwMyA9IHBbM10sIGNvbG9yS2V5LCBzaGFwZTtcbiAgICAgICAgaWYgKHAzID09PSAyNTUpIHtcbiAgICAgICAgICAgIGNvbG9yS2V5ID0gVXRpbF8xLlV0aWwuX3JnYlRvSGV4KHBbMF0sIHBbMV0sIHBbMl0pO1xuICAgICAgICAgICAgc2hhcGUgPSBTaGFwZV8xLnNoYXBlc1tIQVNIICsgY29sb3JLZXldO1xuICAgICAgICAgICAgaWYgKHNoYXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHNoYXBlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYW50aWFsaWFzZWQ6IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocDMgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFudGlhbGlhc2VkOiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9O1xuICAgIExheWVyLnByb3RvdHlwZS5kcmF3U2NlbmUgPSBmdW5jdGlvbiAoY2FuLCB0b3ApIHtcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpLCBjYW52YXMgPSBjYW4gfHwgKGxheWVyICYmIGxheWVyLmdldENhbnZhcygpKTtcbiAgICAgICAgdGhpcy5fZmlyZShCRUZPUkVfRFJBVywge1xuICAgICAgICAgICAgbm9kZTogdGhpc1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuY2xlYXJCZWZvcmVEcmF3KCkpIHtcbiAgICAgICAgICAgIGNhbnZhcy5nZXRDb250ZXh0KCkuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgICBDb250YWluZXJfMS5Db250YWluZXIucHJvdG90eXBlLmRyYXdTY2VuZS5jYWxsKHRoaXMsIGNhbnZhcywgdG9wKTtcbiAgICAgICAgdGhpcy5fZmlyZShEUkFXLCB7XG4gICAgICAgICAgICBub2RlOiB0aGlzXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIExheWVyLnByb3RvdHlwZS5kcmF3SGl0ID0gZnVuY3Rpb24gKGNhbiwgdG9wKSB7XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKSwgY2FudmFzID0gY2FuIHx8IChsYXllciAmJiBsYXllci5oaXRDYW52YXMpO1xuICAgICAgICBpZiAobGF5ZXIgJiYgbGF5ZXIuY2xlYXJCZWZvcmVEcmF3KCkpIHtcbiAgICAgICAgICAgIGxheWVyXG4gICAgICAgICAgICAgICAgLmdldEhpdENhbnZhcygpXG4gICAgICAgICAgICAgICAgLmdldENvbnRleHQoKVxuICAgICAgICAgICAgICAgIC5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIENvbnRhaW5lcl8xLkNvbnRhaW5lci5wcm90b3R5cGUuZHJhd0hpdC5jYWxsKHRoaXMsIGNhbnZhcywgdG9wKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoYm91bmRzKSB7XG4gICAgICAgIEJhc2VMYXllcl8xLkJhc2VMYXllci5wcm90b3R5cGUuY2xlYXIuY2FsbCh0aGlzLCBib3VuZHMpO1xuICAgICAgICB0aGlzLmdldEhpdENhbnZhcygpXG4gICAgICAgICAgICAuZ2V0Q29udGV4dCgpXG4gICAgICAgICAgICAuY2xlYXIoYm91bmRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUuZW5hYmxlSGl0R3JhcGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaGl0R3JhcGhFbmFibGVkKHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIExheWVyLnByb3RvdHlwZS5kaXNhYmxlSGl0R3JhcGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaGl0R3JhcGhFbmFibGVkKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUudG9nZ2xlSGl0Q2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50O1xuICAgICAgICB2YXIgYWRkZWQgPSAhIXRoaXMuaGl0Q2FudmFzLl9jYW52YXMucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKGFkZGVkKSB7XG4gICAgICAgICAgICBwYXJlbnQuY29udGVudC5yZW1vdmVDaGlsZCh0aGlzLmhpdENhbnZhcy5fY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudC5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuaGl0Q2FudmFzLl9jYW52YXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgd2lkdGggPSBfYS53aWR0aCwgaGVpZ2h0ID0gX2EuaGVpZ2h0O1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLnNldFNpemUuY2FsbCh0aGlzLCB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfSk7XG4gICAgICAgIHRoaXMuaGl0Q2FudmFzLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIExheWVyO1xufShCYXNlTGF5ZXJfMS5CYXNlTGF5ZXIpKTtcbmV4cG9ydHMuTGF5ZXIgPSBMYXllcjtcbkxheWVyLnByb3RvdHlwZS5ub2RlVHlwZSA9ICdMYXllcic7XG5HbG9iYWxfMS5fcmVnaXN0ZXJOb2RlKExheWVyKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihMYXllciwgJ2hpdEdyYXBoRW5hYmxlZCcsIHRydWUsIFZhbGlkYXRvcnNfMS5nZXRCb29sZWFuVmFsaWRhdG9yKCkpO1xuVXRpbF8xLkNvbGxlY3Rpb24ubWFwTWV0aG9kcyhMYXllcik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBVdGlsXzEgPSByZXF1aXJlKFwiLi9VdGlsXCIpO1xudmFyIEZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuL0ZhY3RvcnlcIik7XG52YXIgQ2FudmFzXzEgPSByZXF1aXJlKFwiLi9DYW52YXNcIik7XG52YXIgR2xvYmFsXzEgPSByZXF1aXJlKFwiLi9HbG9iYWxcIik7XG52YXIgRHJhZ0FuZERyb3BfMSA9IHJlcXVpcmUoXCIuL0RyYWdBbmREcm9wXCIpO1xudmFyIFZhbGlkYXRvcnNfMSA9IHJlcXVpcmUoXCIuL1ZhbGlkYXRvcnNcIik7XG5leHBvcnRzLmlkcyA9IHt9O1xuZXhwb3J0cy5uYW1lcyA9IHt9O1xudmFyIF9hZGRJZCA9IGZ1bmN0aW9uIChub2RlLCBpZCkge1xuICAgIGlmICghaWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBleHBvcnRzLmlkc1tpZF0gPSBub2RlO1xufTtcbmV4cG9ydHMuX3JlbW92ZUlkID0gZnVuY3Rpb24gKGlkLCBub2RlKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChleHBvcnRzLmlkc1tpZF0gIT09IG5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkZWxldGUgZXhwb3J0cy5pZHNbaWRdO1xufTtcbmV4cG9ydHMuX2FkZE5hbWUgPSBmdW5jdGlvbiAobm9kZSwgbmFtZSkge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICAgIGlmICghZXhwb3J0cy5uYW1lc1tuYW1lXSkge1xuICAgICAgICAgICAgZXhwb3J0cy5uYW1lc1tuYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydHMubmFtZXNbbmFtZV0ucHVzaChub2RlKTtcbiAgICB9XG59O1xuZXhwb3J0cy5fcmVtb3ZlTmFtZSA9IGZ1bmN0aW9uIChuYW1lLCBfaWQpIHtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbm9kZXMgPSBleHBvcnRzLm5hbWVzW25hbWVdO1xuICAgIGlmICghbm9kZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKHZhciBuID0gMDsgbiA8IG5vZGVzLmxlbmd0aDsgbisrKSB7XG4gICAgICAgIHZhciBubyA9IG5vZGVzW25dO1xuICAgICAgICBpZiAobm8uX2lkID09PSBfaWQpIHtcbiAgICAgICAgICAgIG5vZGVzLnNwbGljZShuLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGRlbGV0ZSBleHBvcnRzLm5hbWVzW25hbWVdO1xuICAgIH1cbn07XG52YXIgQUJTT0xVVEVfT1BBQ0lUWSA9ICdhYnNvbHV0ZU9wYWNpdHknLCBBQlNPTFVURV9UUkFOU0ZPUk0gPSAnYWJzb2x1dGVUcmFuc2Zvcm0nLCBBQlNPTFVURV9TQ0FMRSA9ICdhYnNvbHV0ZVNjYWxlJywgQ0FOVkFTID0gJ2NhbnZhcycsIENIQU5HRSA9ICdDaGFuZ2UnLCBDSElMRFJFTiA9ICdjaGlsZHJlbicsIEtPTlZBID0gJ2tvbnZhJywgTElTVEVOSU5HID0gJ2xpc3RlbmluZycsIE1PVVNFRU5URVIgPSAnbW91c2VlbnRlcicsIE1PVVNFTEVBVkUgPSAnbW91c2VsZWF2ZScsIE5BTUUgPSAnbmFtZScsIFNFVCA9ICdzZXQnLCBTSEFQRSA9ICdTaGFwZScsIFNQQUNFID0gJyAnLCBTVEFHRSA9ICdzdGFnZScsIFRSQU5TRk9STSA9ICd0cmFuc2Zvcm0nLCBVUFBFUl9TVEFHRSA9ICdTdGFnZScsIFZJU0lCTEUgPSAndmlzaWJsZScsIENMT05FX0JMQUNLX0xJU1QgPSBbJ2lkJ10sIFRSQU5TRk9STV9DSEFOR0VfU1RSID0gW1xuICAgICd4Q2hhbmdlLmtvbnZhJyxcbiAgICAneUNoYW5nZS5rb252YScsXG4gICAgJ3NjYWxlWENoYW5nZS5rb252YScsXG4gICAgJ3NjYWxlWUNoYW5nZS5rb252YScsXG4gICAgJ3NrZXdYQ2hhbmdlLmtvbnZhJyxcbiAgICAnc2tld1lDaGFuZ2Uua29udmEnLFxuICAgICdyb3RhdGlvbkNoYW5nZS5rb252YScsXG4gICAgJ29mZnNldFhDaGFuZ2Uua29udmEnLFxuICAgICdvZmZzZXRZQ2hhbmdlLmtvbnZhJyxcbiAgICAndHJhbnNmb3Jtc0VuYWJsZWRDaGFuZ2Uua29udmEnXG5dLmpvaW4oU1BBQ0UpLCBTQ0FMRV9DSEFOR0VfU1RSID0gWydzY2FsZVhDaGFuZ2Uua29udmEnLCAnc2NhbGVZQ2hhbmdlLmtvbnZhJ10uam9pbihTUEFDRSk7XG52YXIgZW1wdHlDaGlsZHJlbiA9IG5ldyBVdGlsXzEuQ29sbGVjdGlvbigpO1xudmFyIGlkQ291bnRlciA9IDE7XG52YXIgTm9kZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTm9kZShjb25maWcpIHtcbiAgICAgICAgdGhpcy5faWQgPSBpZENvdW50ZXIrKztcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycyA9IHt9O1xuICAgICAgICB0aGlzLmF0dHJzID0ge307XG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NhY2hlID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9sYXN0UG9zID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZmlsdGVyVXBUb0RhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNVbmRlckNhY2hlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBlbXB0eUNoaWxkcmVuO1xuICAgICAgICB0aGlzLnNldEF0dHJzKGNvbmZpZyk7XG4gICAgICAgIHRoaXMub24oVFJBTlNGT1JNX0NIQU5HRV9TVFIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyQ2FjaGUoVFJBTlNGT1JNKTtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShBQlNPTFVURV9UUkFOU0ZPUk0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbihTQ0FMRV9DSEFOR0VfU1RSLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoQUJTT0xVVEVfU0NBTEUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbigndmlzaWJsZUNoYW5nZS5rb252YScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShWSVNJQkxFKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub24oJ2xpc3RlbmluZ0NoYW5nZS5rb252YScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShMSVNURU5JTkcpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbignb3BhY2l0eUNoYW5nZS5rb252YScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShBQlNPTFVURV9PUEFDSVRZKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE5vZGUucHJvdG90eXBlLmhhc0NoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGVtcHR5Q2hpbGRyZW47XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICAgIGlmIChhdHRyKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZS5kZWxldGUoYXR0cik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZS5jbGVhcigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZ2V0Q2FjaGUgPSBmdW5jdGlvbiAoYXR0ciwgcHJpdmF0ZUdldHRlcikge1xuICAgICAgICB2YXIgY2FjaGUgPSB0aGlzLl9jYWNoZS5nZXQoYXR0cik7XG4gICAgICAgIGlmIChjYWNoZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjYWNoZSA9IHByaXZhdGVHZXR0ZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlLnNldChhdHRyLCBjYWNoZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhY2hlO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2dldENhbnZhc0NhY2hlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGUuZ2V0KENBTlZBUyk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlID0gZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgICAgdGhpcy5fY2xlYXJDYWNoZShhdHRyKTtcbiAgICAgICAgaWYgKHRoaXMuX2dldENhbnZhc0NhY2hlKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5lYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKGF0dHIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlLmRlbGV0ZShDQU5WQVMpO1xuICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5jYWNoZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgdmFyIGNvbmYgPSBjb25maWcgfHwge307XG4gICAgICAgIHZhciByZWN0ID0ge307XG4gICAgICAgIGlmIChjb25mLnggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgY29uZi55ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIGNvbmYud2lkdGggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgY29uZi5oZWlnaHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVjdCA9IHRoaXMuZ2V0Q2xpZW50UmVjdCh7XG4gICAgICAgICAgICAgICAgc2tpcFRyYW5zZm9ybTogdHJ1ZSxcbiAgICAgICAgICAgICAgICByZWxhdGl2ZVRvOiB0aGlzLmdldFBhcmVudCgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd2lkdGggPSBjb25mLndpZHRoIHx8IHJlY3Qud2lkdGgsIGhlaWdodCA9IGNvbmYuaGVpZ2h0IHx8IHJlY3QuaGVpZ2h0LCBwaXhlbFJhdGlvID0gY29uZi5waXhlbFJhdGlvLCB4ID0gY29uZi54ID09PSB1bmRlZmluZWQgPyByZWN0LnggOiBjb25mLngsIHkgPSBjb25mLnkgPT09IHVuZGVmaW5lZCA/IHJlY3QueSA6IGNvbmYueSwgb2Zmc2V0ID0gY29uZi5vZmZzZXQgfHwgMCwgZHJhd0JvcmRlciA9IGNvbmYuZHJhd0JvcmRlciB8fCBmYWxzZTtcbiAgICAgICAgaWYgKCF3aWR0aCB8fCAhaGVpZ2h0KSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC5lcnJvcignQ2FuIG5vdCBjYWNoZSB0aGUgbm9kZS4gV2lkdGggb3IgaGVpZ2h0IG9mIHRoZSBub2RlIGVxdWFscyAwLiBDYWNoaW5nIGlzIHNraXBwZWQuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd2lkdGggKz0gb2Zmc2V0ICogMjtcbiAgICAgICAgaGVpZ2h0ICs9IG9mZnNldCAqIDI7XG4gICAgICAgIHggLT0gb2Zmc2V0O1xuICAgICAgICB5IC09IG9mZnNldDtcbiAgICAgICAgdmFyIGNhY2hlZFNjZW5lQ2FudmFzID0gbmV3IENhbnZhc18xLlNjZW5lQ2FudmFzKHtcbiAgICAgICAgICAgIHBpeGVsUmF0aW86IHBpeGVsUmF0aW8sXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICB9KSwgY2FjaGVkRmlsdGVyQ2FudmFzID0gbmV3IENhbnZhc18xLlNjZW5lQ2FudmFzKHtcbiAgICAgICAgICAgIHBpeGVsUmF0aW86IHBpeGVsUmF0aW8sXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICB9KSwgY2FjaGVkSGl0Q2FudmFzID0gbmV3IENhbnZhc18xLkhpdENhbnZhcyh7XG4gICAgICAgICAgICBwaXhlbFJhdGlvOiAxLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgfSksIHNjZW5lQ29udGV4dCA9IGNhY2hlZFNjZW5lQ2FudmFzLmdldENvbnRleHQoKSwgaGl0Q29udGV4dCA9IGNhY2hlZEhpdENhbnZhcy5nZXRDb250ZXh0KCk7XG4gICAgICAgIGNhY2hlZEhpdENhbnZhcy5pc0NhY2hlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY2FjaGUuZGVsZXRlKCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5fZmlsdGVyVXBUb0RhdGUgPSBmYWxzZTtcbiAgICAgICAgc2NlbmVDb250ZXh0LnNhdmUoKTtcbiAgICAgICAgaGl0Q29udGV4dC5zYXZlKCk7XG4gICAgICAgIHNjZW5lQ29udGV4dC50cmFuc2xhdGUoLXgsIC15KTtcbiAgICAgICAgaGl0Q29udGV4dC50cmFuc2xhdGUoLXgsIC15KTtcbiAgICAgICAgdGhpcy5faXNVbmRlckNhY2hlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKEFCU09MVVRFX09QQUNJVFkpO1xuICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoQUJTT0xVVEVfU0NBTEUpO1xuICAgICAgICB0aGlzLmRyYXdTY2VuZShjYWNoZWRTY2VuZUNhbnZhcywgdGhpcywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZHJhd0hpdChjYWNoZWRIaXRDYW52YXMsIHRoaXMsIHRydWUpO1xuICAgICAgICB0aGlzLl9pc1VuZGVyQ2FjaGUgPSBmYWxzZTtcbiAgICAgICAgc2NlbmVDb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgaGl0Q29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIGlmIChkcmF3Qm9yZGVyKSB7XG4gICAgICAgICAgICBzY2VuZUNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgc2NlbmVDb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgc2NlbmVDb250ZXh0LnJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICBzY2VuZUNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICBzY2VuZUNvbnRleHQuc2V0QXR0cignc3Ryb2tlU3R5bGUnLCAncmVkJyk7XG4gICAgICAgICAgICBzY2VuZUNvbnRleHQuc2V0QXR0cignbGluZVdpZHRoJywgNSk7XG4gICAgICAgICAgICBzY2VuZUNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICBzY2VuZUNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NhY2hlLnNldChDQU5WQVMsIHtcbiAgICAgICAgICAgIHNjZW5lOiBjYWNoZWRTY2VuZUNhbnZhcyxcbiAgICAgICAgICAgIGZpbHRlcjogY2FjaGVkRmlsdGVyQ2FudmFzLFxuICAgICAgICAgICAgaGl0OiBjYWNoZWRIaXRDYW52YXMsXG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRDbGllbnRSZWN0ID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Fic3RyYWN0IFwiZ2V0Q2xpZW50UmVjdFwiIG1ldGhvZCBjYWxsJyk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fdHJhbnNmb3JtZWRSZWN0ID0gZnVuY3Rpb24gKHJlY3QsIHRvcCkge1xuICAgICAgICB2YXIgcG9pbnRzID0gW1xuICAgICAgICAgICAgeyB4OiByZWN0LngsIHk6IHJlY3QueSB9LFxuICAgICAgICAgICAgeyB4OiByZWN0LnggKyByZWN0LndpZHRoLCB5OiByZWN0LnkgfSxcbiAgICAgICAgICAgIHsgeDogcmVjdC54ICsgcmVjdC53aWR0aCwgeTogcmVjdC55ICsgcmVjdC5oZWlnaHQgfSxcbiAgICAgICAgICAgIHsgeDogcmVjdC54LCB5OiByZWN0LnkgKyByZWN0LmhlaWdodCB9XG4gICAgICAgIF07XG4gICAgICAgIHZhciBtaW5YLCBtaW5ZLCBtYXhYLCBtYXhZO1xuICAgICAgICB2YXIgdHJhbnMgPSB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKHRvcCk7XG4gICAgICAgIHBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybWVkID0gdHJhbnMucG9pbnQocG9pbnQpO1xuICAgICAgICAgICAgaWYgKG1pblggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG1pblggPSBtYXhYID0gdHJhbnNmb3JtZWQueDtcbiAgICAgICAgICAgICAgICBtaW5ZID0gbWF4WSA9IHRyYW5zZm9ybWVkLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtaW5YID0gTWF0aC5taW4obWluWCwgdHJhbnNmb3JtZWQueCk7XG4gICAgICAgICAgICBtaW5ZID0gTWF0aC5taW4obWluWSwgdHJhbnNmb3JtZWQueSk7XG4gICAgICAgICAgICBtYXhYID0gTWF0aC5tYXgobWF4WCwgdHJhbnNmb3JtZWQueCk7XG4gICAgICAgICAgICBtYXhZID0gTWF0aC5tYXgobWF4WSwgdHJhbnNmb3JtZWQueSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogbWluWCxcbiAgICAgICAgICAgIHk6IG1pblksXG4gICAgICAgICAgICB3aWR0aDogbWF4WCAtIG1pblgsXG4gICAgICAgICAgICBoZWlnaHQ6IG1heFkgLSBtaW5ZXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZHJhd0NhY2hlZFNjZW5lQ2FudmFzID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNvbnRleHQuX2FwcGx5T3BhY2l0eSh0aGlzKTtcbiAgICAgICAgY29udGV4dC5fYXBwbHlHbG9iYWxDb21wb3NpdGVPcGVyYXRpb24odGhpcyk7XG4gICAgICAgIHZhciBjYW52YXNDYWNoZSA9IHRoaXMuX2dldENhbnZhc0NhY2hlKCk7XG4gICAgICAgIGNvbnRleHQudHJhbnNsYXRlKGNhbnZhc0NhY2hlLngsIGNhbnZhc0NhY2hlLnkpO1xuICAgICAgICB2YXIgY2FjaGVDYW52YXMgPSB0aGlzLl9nZXRDYWNoZWRTY2VuZUNhbnZhcygpO1xuICAgICAgICB2YXIgcmF0aW8gPSBjYWNoZUNhbnZhcy5waXhlbFJhdGlvO1xuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShjYWNoZUNhbnZhcy5fY2FudmFzLCAwLCAwLCBjYWNoZUNhbnZhcy53aWR0aCAvIHJhdGlvLCBjYWNoZUNhbnZhcy5oZWlnaHQgLyByYXRpbyk7XG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2RyYXdDYWNoZWRIaXRDYW52YXMgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICB2YXIgY2FudmFzQ2FjaGUgPSB0aGlzLl9nZXRDYW52YXNDYWNoZSgpLCBoaXRDYW52YXMgPSBjYW52YXNDYWNoZS5oaXQ7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0Ll9hcHBseUdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbih0aGlzKTtcbiAgICAgICAgY29udGV4dC50cmFuc2xhdGUoY2FudmFzQ2FjaGUueCwgY2FudmFzQ2FjaGUueSk7XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGhpdENhbnZhcy5fY2FudmFzLCAwLCAwKTtcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZ2V0Q2FjaGVkU2NlbmVDYW52YXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBmaWx0ZXJzID0gdGhpcy5maWx0ZXJzKCksIGNhY2hlZENhbnZhcyA9IHRoaXMuX2dldENhbnZhc0NhY2hlKCksIHNjZW5lQ2FudmFzID0gY2FjaGVkQ2FudmFzLnNjZW5lLCBmaWx0ZXJDYW52YXMgPSBjYWNoZWRDYW52YXMuZmlsdGVyLCBmaWx0ZXJDb250ZXh0ID0gZmlsdGVyQ2FudmFzLmdldENvbnRleHQoKSwgbGVuLCBpbWFnZURhdGEsIG4sIGZpbHRlcjtcbiAgICAgICAgaWYgKGZpbHRlcnMpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZmlsdGVyVXBUb0RhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmF0aW8gPSBzY2VuZUNhbnZhcy5waXhlbFJhdGlvO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IGZpbHRlcnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJDb250ZXh0LmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlckNvbnRleHQuZHJhd0ltYWdlKHNjZW5lQ2FudmFzLl9jYW52YXMsIDAsIDAsIHNjZW5lQ2FudmFzLmdldFdpZHRoKCkgLyByYXRpbywgc2NlbmVDYW52YXMuZ2V0SGVpZ2h0KCkgLyByYXRpbyk7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlRGF0YSA9IGZpbHRlckNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGZpbHRlckNhbnZhcy5nZXRXaWR0aCgpLCBmaWx0ZXJDYW52YXMuZ2V0SGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGZpbHRlcnNbbl07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZpbHRlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxfMS5VdGlsLmVycm9yKCdGaWx0ZXIgc2hvdWxkIGJlIHR5cGUgb2YgZnVuY3Rpb24sIGJ1dCBnb3QgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBmaWx0ZXIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIGluc3RlZC4gUGxlYXNlIGNoZWNrIGNvcnJlY3QgZmlsdGVycycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmNhbGwodGhpcywgaW1hZ2VEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckNvbnRleHQucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbF8xLlV0aWwuZXJyb3IoJ1VuYWJsZSB0byBhcHBseSBmaWx0ZXIuICcgKyBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXJVcFRvRGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyQ2FudmFzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzY2VuZUNhbnZhcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2dFN0ciwgaGFuZGxlcikge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV2ZW50cyA9IGV2dFN0ci5zcGxpdChTUEFDRSksIGxlbiA9IGV2ZW50cy5sZW5ndGgsIG4sIGV2ZW50LCBwYXJ0cywgYmFzZUV2ZW50LCBuYW1lO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW25dO1xuICAgICAgICAgICAgcGFydHMgPSBldmVudC5zcGxpdCgnLicpO1xuICAgICAgICAgICAgYmFzZUV2ZW50ID0gcGFydHNbMF07XG4gICAgICAgICAgICBuYW1lID0gcGFydHNbMV0gfHwgJyc7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZXZlbnRMaXN0ZW5lcnNbYmFzZUV2ZW50XSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnNbYmFzZUV2ZW50XSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyc1tiYXNlRXZlbnRdLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogaGFuZGxlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZ0U3RyLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgZXZlbnRzID0gKGV2dFN0ciB8fCAnJykuc3BsaXQoU1BBQ0UpLCBsZW4gPSBldmVudHMubGVuZ3RoLCBuLCB0LCBldmVudCwgcGFydHMsIGJhc2VFdmVudCwgbmFtZTtcbiAgICAgICAgaWYgKCFldnRTdHIpIHtcbiAgICAgICAgICAgIGZvciAodCBpbiB0aGlzLmV2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb2ZmKHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbbl07XG4gICAgICAgICAgICBwYXJ0cyA9IGV2ZW50LnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBiYXNlRXZlbnQgPSBwYXJ0c1swXTtcbiAgICAgICAgICAgIG5hbWUgPSBwYXJ0c1sxXTtcbiAgICAgICAgICAgIGlmIChiYXNlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudExpc3RlbmVyc1tiYXNlRXZlbnRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29mZihiYXNlRXZlbnQsIG5hbWUsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHQgaW4gdGhpcy5ldmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vZmYodCwgbmFtZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHZhciBlID0ge1xuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgdHlwZTogZXZ0LnR5cGUsXG4gICAgICAgICAgICBldnQ6IGV2dFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZpcmUoZXZ0LnR5cGUsIGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSwgaGFuZGxlcikge1xuICAgICAgICB0aGlzLm9uKHR5cGUsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBldnQuZXZ0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHRoaXMub2ZmKHR5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9kZWxlZ2F0ZSA9IGZ1bmN0aW9uIChldmVudCwgc2VsZWN0b3IsIGhhbmRsZXIpIHtcbiAgICAgICAgdmFyIHN0b3BOb2RlID0gdGhpcztcbiAgICAgICAgdGhpcy5vbihldmVudCwgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgdmFyIHRhcmdldHMgPSBldnQudGFyZ2V0LmZpbmRBbmNlc3RvcnMoc2VsZWN0b3IsIHRydWUsIHN0b3BOb2RlKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGV2dCA9IFV0aWxfMS5VdGlsLmNsb25lT2JqZWN0KGV2dCk7XG4gICAgICAgICAgICAgICAgZXZ0LmN1cnJlbnRUYXJnZXQgPSB0YXJnZXRzW2ldO1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbCh0YXJnZXRzW2ldLCBldnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKERyYWdBbmREcm9wXzEuREQubm9kZSAmJiBEcmFnQW5kRHJvcF8xLkRELm5vZGUgPT09IHRoaXMpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcERyYWcoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZW1vdmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fcmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoU1RBR0UpO1xuICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoQUJTT0xVVEVfVFJBTlNGT1JNKTtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKFZJU0lCTEUpO1xuICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoTElTVEVOSU5HKTtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKEFCU09MVVRFX09QQUNJVFkpO1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKTtcbiAgICAgICAgaWYgKHBhcmVudCAmJiBwYXJlbnQuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbi5zcGxpY2UodGhpcy5pbmRleCwgMSk7XG4gICAgICAgICAgICBwYXJlbnQuX3NldENoaWxkcmVuSW5kaWNlcygpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBvcnRzLl9yZW1vdmVJZCh0aGlzLmlkKCksIHRoaXMpO1xuICAgICAgICB2YXIgbmFtZXMgPSAodGhpcy5uYW1lKCkgfHwgJycpLnNwbGl0KC9cXHMvZyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzdWJuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICBleHBvcnRzLl9yZW1vdmVOYW1lKHN1Ym5hbWUsIHRoaXMuX2lkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldEF0dHIgPSBmdW5jdGlvbiAoYXR0cikge1xuICAgICAgICB2YXIgbWV0aG9kID0gJ2dldCcgKyBVdGlsXzEuVXRpbC5fY2FwaXRhbGl6ZShhdHRyKTtcbiAgICAgICAgaWYgKFV0aWxfMS5VdGlsLl9pc0Z1bmN0aW9uKHRoaXNbbWV0aG9kXSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW21ldGhvZF0oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyc1thdHRyXTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldEFuY2VzdG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCksIGFuY2VzdG9ycyA9IG5ldyBVdGlsXzEuQ29sbGVjdGlvbigpO1xuICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICBhbmNlc3RvcnMucHVzaChwYXJlbnQpO1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LmdldFBhcmVudCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhbmNlc3RvcnM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRBdHRycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cnMgfHwge307XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5zZXRBdHRycyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgdmFyIGtleSwgbWV0aG9kO1xuICAgICAgICBpZiAoIWNvbmZpZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChrZXkgaW4gY29uZmlnKSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBDSElMRFJFTikge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWV0aG9kID0gU0VUICsgVXRpbF8xLlV0aWwuX2NhcGl0YWxpemUoa2V5KTtcbiAgICAgICAgICAgIGlmIChVdGlsXzEuVXRpbC5faXNGdW5jdGlvbih0aGlzW21ldGhvZF0pKSB7XG4gICAgICAgICAgICAgICAgdGhpc1ttZXRob2RdKGNvbmZpZ1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldEF0dHIoa2V5LCBjb25maWdba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5pc0xpc3RlbmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKExJU1RFTklORywgdGhpcy5faXNMaXN0ZW5pbmcpO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2lzTGlzdGVuaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGlzdGVuaW5nID0gdGhpcy5saXN0ZW5pbmcoKSwgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKTtcbiAgICAgICAgaWYgKGxpc3RlbmluZyA9PT0gJ2luaGVyaXQnKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5pc0xpc3RlbmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdGVuaW5nO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5pc1Zpc2libGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShWSVNJQkxFLCB0aGlzLl9pc1Zpc2libGUpO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2lzVmlzaWJsZSA9IGZ1bmN0aW9uIChyZWxhdGl2ZVRvKSB7XG4gICAgICAgIHZhciB2aXNpYmxlID0gdGhpcy52aXNpYmxlKCksIHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICAgIGlmICh2aXNpYmxlID09PSAnaW5oZXJpdCcpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQgJiYgcGFyZW50ICE9PSByZWxhdGl2ZVRvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5faXNWaXNpYmxlKHJlbGF0aXZlVG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdmlzaWJsZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuc2hvdWxkRHJhd0hpdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpO1xuICAgICAgICByZXR1cm4gKCghbGF5ZXIgJiYgdGhpcy5pc0xpc3RlbmluZygpICYmIHRoaXMuaXNWaXNpYmxlKCkpIHx8XG4gICAgICAgICAgICAobGF5ZXIgJiZcbiAgICAgICAgICAgICAgICBsYXllci5oaXRHcmFwaEVuYWJsZWQoKSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuaXNMaXN0ZW5pbmcoKSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlKCkpKTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZSh0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnZpc2libGUoZmFsc2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldFpJbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXggfHwgMDtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldEFic29sdXRlWkluZGV4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGVwdGggPSB0aGlzLmdldERlcHRoKCksIHRoYXQgPSB0aGlzLCBpbmRleCA9IDAsIG5vZGVzLCBsZW4sIG4sIGNoaWxkO1xuICAgICAgICBmdW5jdGlvbiBhZGRDaGlsZHJlbihjaGlsZHJlbikge1xuICAgICAgICAgICAgbm9kZXMgPSBbXTtcbiAgICAgICAgICAgIGxlbiA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgICAgIGNoaWxkID0gY2hpbGRyZW5bbl07XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQubm9kZVR5cGUgIT09IFNIQVBFKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuY29uY2F0KGNoaWxkLmdldENoaWxkcmVuKCkudG9BcnJheSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLl9pZCA9PT0gdGhhdC5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbiA9IGxlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZXMubGVuZ3RoID4gMCAmJiBub2Rlc1swXS5nZXREZXB0aCgpIDw9IGRlcHRoKSB7XG4gICAgICAgICAgICAgICAgYWRkQ2hpbGRyZW4obm9kZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGF0Lm5vZGVUeXBlICE9PSBVUFBFUl9TVEFHRSkge1xuICAgICAgICAgICAgYWRkQ2hpbGRyZW4odGhhdC5nZXRTdGFnZSgpLmdldENoaWxkcmVuKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldERlcHRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGVwdGggPSAwLCBwYXJlbnQgPSB0aGlzLnBhcmVudDtcbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgICAgZGVwdGgrKztcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlcHRoO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuc2V0UG9zaXRpb24gPSBmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgIHRoaXMueChwb3MueCk7XG4gICAgICAgIHRoaXMueShwb3MueSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0aGlzLngoKSxcbiAgICAgICAgICAgIHk6IHRoaXMueSgpXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRBYnNvbHV0ZVBvc2l0aW9uID0gZnVuY3Rpb24gKHRvcCkge1xuICAgICAgICB2YXIgYWJzb2x1dGVNYXRyaXggPSB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKHRvcCkuZ2V0TWF0cml4KCksIGFic29sdXRlVHJhbnNmb3JtID0gbmV3IFV0aWxfMS5UcmFuc2Zvcm0oKSwgb2Zmc2V0ID0gdGhpcy5vZmZzZXQoKTtcbiAgICAgICAgYWJzb2x1dGVUcmFuc2Zvcm0ubSA9IGFic29sdXRlTWF0cml4LnNsaWNlKCk7XG4gICAgICAgIGFic29sdXRlVHJhbnNmb3JtLnRyYW5zbGF0ZShvZmZzZXQueCwgb2Zmc2V0LnkpO1xuICAgICAgICByZXR1cm4gYWJzb2x1dGVUcmFuc2Zvcm0uZ2V0VHJhbnNsYXRpb24oKTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnNldEFic29sdXRlUG9zaXRpb24gPSBmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgIHZhciBvcmlnVHJhbnMgPSB0aGlzLl9jbGVhclRyYW5zZm9ybSgpLCBpdDtcbiAgICAgICAgdGhpcy5hdHRycy54ID0gb3JpZ1RyYW5zLng7XG4gICAgICAgIHRoaXMuYXR0cnMueSA9IG9yaWdUcmFucy55O1xuICAgICAgICBkZWxldGUgb3JpZ1RyYW5zLng7XG4gICAgICAgIGRlbGV0ZSBvcmlnVHJhbnMueTtcbiAgICAgICAgaXQgPSB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKCk7XG4gICAgICAgIGl0LmludmVydCgpO1xuICAgICAgICBpdC50cmFuc2xhdGUocG9zLngsIHBvcy55KTtcbiAgICAgICAgcG9zID0ge1xuICAgICAgICAgICAgeDogdGhpcy5hdHRycy54ICsgaXQuZ2V0VHJhbnNsYXRpb24oKS54LFxuICAgICAgICAgICAgeTogdGhpcy5hdHRycy55ICsgaXQuZ2V0VHJhbnNsYXRpb24oKS55XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24oeyB4OiBwb3MueCwgeTogcG9zLnkgfSk7XG4gICAgICAgIHRoaXMuX3NldFRyYW5zZm9ybShvcmlnVHJhbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9zZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiAodHJhbnMpIHtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChrZXkgaW4gdHJhbnMpIHtcbiAgICAgICAgICAgIHRoaXMuYXR0cnNba2V5XSA9IHRyYW5zW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2xlYXJDYWNoZShUUkFOU0ZPUk0pO1xuICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoQUJTT0xVVEVfVFJBTlNGT1JNKTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9jbGVhclRyYW5zZm9ybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRyYW5zID0ge1xuICAgICAgICAgICAgeDogdGhpcy54KCksXG4gICAgICAgICAgICB5OiB0aGlzLnkoKSxcbiAgICAgICAgICAgIHJvdGF0aW9uOiB0aGlzLnJvdGF0aW9uKCksXG4gICAgICAgICAgICBzY2FsZVg6IHRoaXMuc2NhbGVYKCksXG4gICAgICAgICAgICBzY2FsZVk6IHRoaXMuc2NhbGVZKCksXG4gICAgICAgICAgICBvZmZzZXRYOiB0aGlzLm9mZnNldFgoKSxcbiAgICAgICAgICAgIG9mZnNldFk6IHRoaXMub2Zmc2V0WSgpLFxuICAgICAgICAgICAgc2tld1g6IHRoaXMuc2tld1goKSxcbiAgICAgICAgICAgIHNrZXdZOiB0aGlzLnNrZXdZKClcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hdHRycy54ID0gMDtcbiAgICAgICAgdGhpcy5hdHRycy55ID0gMDtcbiAgICAgICAgdGhpcy5hdHRycy5yb3RhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuYXR0cnMuc2NhbGVYID0gMTtcbiAgICAgICAgdGhpcy5hdHRycy5zY2FsZVkgPSAxO1xuICAgICAgICB0aGlzLmF0dHJzLm9mZnNldFggPSAwO1xuICAgICAgICB0aGlzLmF0dHJzLm9mZnNldFkgPSAwO1xuICAgICAgICB0aGlzLmF0dHJzLnNrZXdYID0gMDtcbiAgICAgICAgdGhpcy5hdHRycy5za2V3WSA9IDA7XG4gICAgICAgIHRoaXMuX2NsZWFyQ2FjaGUoVFJBTlNGT1JNKTtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKEFCU09MVVRFX1RSQU5TRk9STSk7XG4gICAgICAgIHJldHVybiB0cmFucztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbiAoY2hhbmdlKSB7XG4gICAgICAgIHZhciBjaGFuZ2VYID0gY2hhbmdlLngsIGNoYW5nZVkgPSBjaGFuZ2UueSwgeCA9IHRoaXMueCgpLCB5ID0gdGhpcy55KCk7XG4gICAgICAgIGlmIChjaGFuZ2VYICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHggKz0gY2hhbmdlWDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlWSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB5ICs9IGNoYW5nZVk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih7IHg6IHgsIHk6IHkgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2VhY2hBbmNlc3RvclJldmVyc2UgPSBmdW5jdGlvbiAoZnVuYywgdG9wKSB7XG4gICAgICAgIHZhciBmYW1pbHkgPSBbXSwgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKSwgbGVuLCBuO1xuICAgICAgICBpZiAodG9wICYmIHRvcC5faWQgPT09IHRoaXMuX2lkKSB7XG4gICAgICAgICAgICBmdW5jKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZhbWlseS51bnNoaWZ0KHRoaXMpO1xuICAgICAgICB3aGlsZSAocGFyZW50ICYmICghdG9wIHx8IHBhcmVudC5faWQgIT09IHRvcC5faWQpKSB7XG4gICAgICAgICAgICBmYW1pbHkudW5zaGlmdChwYXJlbnQpO1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBsZW4gPSBmYW1pbHkubGVuZ3RoO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIGZ1bmMoZmFtaWx5W25dKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUucm90YXRlID0gZnVuY3Rpb24gKHRoZXRhKSB7XG4gICAgICAgIHRoaXMucm90YXRpb24odGhpcy5yb3RhdGlvbigpICsgdGhldGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLm1vdmVUb1RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybignTm9kZSBoYXMgbm8gcGFyZW50LiBtb3ZlVG9Ub3AgZnVuY3Rpb24gaXMgaWdub3JlZC4nKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmluZGV4O1xuICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5wdXNoKHRoaXMpO1xuICAgICAgICB0aGlzLnBhcmVudC5fc2V0Q2hpbGRyZW5JbmRpY2VzKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUubW92ZVVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdOb2RlIGhhcyBubyBwYXJlbnQuIG1vdmVVcCBmdW5jdGlvbiBpcyBpZ25vcmVkLicpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuaW5kZXgsIGxlbiA9IHRoaXMucGFyZW50LmdldENoaWxkcmVuKCkubGVuZ3RoO1xuICAgICAgICBpZiAoaW5kZXggPCBsZW4gLSAxKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4ICsgMSwgMCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5fc2V0Q2hpbGRyZW5JbmRpY2VzKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5tb3ZlRG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybignTm9kZSBoYXMgbm8gcGFyZW50LiBtb3ZlRG93biBmdW5jdGlvbiBpcyBpZ25vcmVkLicpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXggLSAxLCAwLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50Ll9zZXRDaGlsZHJlbkluZGljZXMoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLm1vdmVUb0JvdHRvbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybignTm9kZSBoYXMgbm8gcGFyZW50LiBtb3ZlVG9Cb3R0b20gZnVuY3Rpb24gaXMgaWdub3JlZC4nKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmluZGV4O1xuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4udW5zaGlmdCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50Ll9zZXRDaGlsZHJlbkluZGljZXMoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnNldFpJbmRleCA9IGZ1bmN0aW9uICh6SW5kZXgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybignTm9kZSBoYXMgbm8gcGFyZW50LiB6SW5kZXggcGFyYW1ldGVyIGlzIGlnbm9yZWQuJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoekluZGV4IDwgMCB8fCB6SW5kZXggPj0gdGhpcy5wYXJlbnQuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdVbmV4cGVjdGVkIHZhbHVlICcgK1xuICAgICAgICAgICAgICAgIHpJbmRleCArXG4gICAgICAgICAgICAgICAgJyBmb3IgekluZGV4IHByb3BlcnR5LiB6SW5kZXggaXMganVzdCBpbmRleCBvZiBhIG5vZGUgaW4gY2hpbGRyZW4gb2YgaXRzIHBhcmVudC4gRXhwZWN0ZWQgdmFsdWUgaXMgZnJvbSAwIHRvICcgK1xuICAgICAgICAgICAgICAgICh0aGlzLnBhcmVudC5jaGlsZHJlbi5sZW5ndGggLSAxKSArXG4gICAgICAgICAgICAgICAgJy4nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmluZGV4O1xuICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoekluZGV4LCAwLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wYXJlbnQuX3NldENoaWxkcmVuSW5kaWNlcygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldEFic29sdXRlT3BhY2l0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKEFCU09MVVRFX09QQUNJVFksIHRoaXMuX2dldEFic29sdXRlT3BhY2l0eSk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZ2V0QWJzb2x1dGVPcGFjaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWJzT3BhY2l0eSA9IHRoaXMub3BhY2l0eSgpO1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKTtcbiAgICAgICAgaWYgKHBhcmVudCAmJiAhcGFyZW50Ll9pc1VuZGVyQ2FjaGUpIHtcbiAgICAgICAgICAgIGFic09wYWNpdHkgKj0gdGhpcy5nZXRQYXJlbnQoKS5nZXRBYnNvbHV0ZU9wYWNpdHkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWJzT3BhY2l0eTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLm1vdmVUbyA9IGZ1bmN0aW9uIChuZXdDb250YWluZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0UGFyZW50KCkgIT09IG5ld0NvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlKCk7XG4gICAgICAgICAgICBuZXdDb250YWluZXIuYWRkKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUudG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvYmogPSB7fSwgYXR0cnMgPSB0aGlzLmdldEF0dHJzKCksIGtleSwgdmFsLCBnZXR0ZXIsIGRlZmF1bHRWYWx1ZSwgbm9uUGxhaW5PYmplY3Q7XG4gICAgICAgIG9iai5hdHRycyA9IHt9O1xuICAgICAgICBmb3IgKGtleSBpbiBhdHRycykge1xuICAgICAgICAgICAgdmFsID0gYXR0cnNba2V5XTtcbiAgICAgICAgICAgIG5vblBsYWluT2JqZWN0ID1cbiAgICAgICAgICAgICAgICBVdGlsXzEuVXRpbC5pc09iamVjdCh2YWwpICYmICFVdGlsXzEuVXRpbC5faXNQbGFpbk9iamVjdCh2YWwpICYmICFVdGlsXzEuVXRpbC5faXNBcnJheSh2YWwpO1xuICAgICAgICAgICAgaWYgKG5vblBsYWluT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZXR0ZXIgPSB0eXBlb2YgdGhpc1trZXldID09PSAnZnVuY3Rpb24nICYmIHRoaXNba2V5XTtcbiAgICAgICAgICAgIGRlbGV0ZSBhdHRyc1trZXldO1xuICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwodGhpcykgOiBudWxsO1xuICAgICAgICAgICAgYXR0cnNba2V5XSA9IHZhbDtcbiAgICAgICAgICAgIGlmIChkZWZhdWx0VmFsdWUgIT09IHZhbCkge1xuICAgICAgICAgICAgICAgIG9iai5hdHRyc1trZXldID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9iai5jbGFzc05hbWUgPSB0aGlzLmdldENsYXNzTmFtZSgpO1xuICAgICAgICByZXR1cm4gVXRpbF8xLlV0aWwuX3ByZXBhcmVUb1N0cmluZ2lmeShvYmopO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50b09iamVjdCgpKTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldFBhcmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50O1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZmluZEFuY2VzdG9ycyA9IGZ1bmN0aW9uIChzZWxlY3RvciwgaW5jbHVkZVNlbGYsIHN0b3BOb2RlKSB7XG4gICAgICAgIHZhciByZXMgPSBbXTtcbiAgICAgICAgaWYgKGluY2x1ZGVTZWxmICYmIHRoaXMuX2lzTWF0Y2goc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXMucHVzaCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYW5jZXN0b3IgPSB0aGlzLnBhcmVudDtcbiAgICAgICAgd2hpbGUgKGFuY2VzdG9yKSB7XG4gICAgICAgICAgICBpZiAoYW5jZXN0b3IgPT09IHN0b3BOb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbmNlc3Rvci5faXNNYXRjaChzZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICByZXMucHVzaChhbmNlc3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbmNlc3RvciA9IGFuY2VzdG9yLnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuaXNBbmNlc3Rvck9mID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZmluZEFuY2VzdG9yID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBpbmNsdWRlU2VsZiwgc3RvcE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZEFuY2VzdG9ycyhzZWxlY3RvciwgaW5jbHVkZVNlbGYsIHN0b3BOb2RlKVswXTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9pc01hdGNoID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNlbGVjdG9yQXJyID0gc2VsZWN0b3IucmVwbGFjZSgvIC9nLCAnJykuc3BsaXQoJywnKSwgbGVuID0gc2VsZWN0b3JBcnIubGVuZ3RoLCBuLCBzZWw7XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgc2VsID0gc2VsZWN0b3JBcnJbbl07XG4gICAgICAgICAgICBpZiAoIVV0aWxfMS5VdGlsLmlzVmFsaWRTZWxlY3RvcihzZWwpKSB7XG4gICAgICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybignU2VsZWN0b3IgXCInICtcbiAgICAgICAgICAgICAgICAgICAgc2VsICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGlzIGludmFsaWQuIEFsbG93ZWQgc2VsZWN0b3JzIGV4YW1wbGVzIGFyZSBcIiNmb29cIiwgXCIuYmFyXCIgb3IgXCJHcm91cFwiLicpO1xuICAgICAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ0lmIHlvdSBoYXZlIGEgY3VzdG9tIHNoYXBlIHdpdGggc3VjaCBjbGFzc05hbWUsIHBsZWFzZSBjaGFuZ2UgaXQgdG8gc3RhcnQgd2l0aCB1cHBlciBsZXR0ZXIgbGlrZSBcIlRyaWFuZ2xlXCIuJyk7XG4gICAgICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybignS29udmEgaXMgYXdlc29tZSwgcmlnaHQ/Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2VsLmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaWQoKSA9PT0gc2VsLnNsaWNlKDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNlbC5jaGFyQXQoMCkgPT09ICcuJykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhc05hbWUoc2VsLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNsYXNzTmFtZSA9PT0gc2VsZWN0b3IgfHwgdGhpcy5ub2RlVHlwZSA9PT0gc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRMYXllciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICAgIHJldHVybiBwYXJlbnQgPyBwYXJlbnQuZ2V0TGF5ZXIoKSA6IG51bGw7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRTdGFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKFNUQUdFLCB0aGlzLl9nZXRTdGFnZSk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZ2V0U3RhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50LmdldFN0YWdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24gKGV2ZW50VHlwZSwgZXZ0LCBidWJibGUpIHtcbiAgICAgICAgZXZ0ID0gZXZ0IHx8IHt9O1xuICAgICAgICBldnQudGFyZ2V0ID0gZXZ0LnRhcmdldCB8fCB0aGlzO1xuICAgICAgICBpZiAoYnViYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlQW5kQnViYmxlKGV2ZW50VHlwZSwgZXZ0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoZXZlbnRUeXBlLCBldnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0gPSBmdW5jdGlvbiAodG9wKSB7XG4gICAgICAgIGlmICh0b3ApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKEFCU09MVVRFX1RSQU5TRk9STSwgdGhpcy5fZ2V0QWJzb2x1dGVUcmFuc2Zvcm0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZ2V0QWJzb2x1dGVUcmFuc2Zvcm0gPSBmdW5jdGlvbiAodG9wKSB7XG4gICAgICAgIHZhciBhdCA9IG5ldyBVdGlsXzEuVHJhbnNmb3JtKCk7XG4gICAgICAgIHRoaXMuX2VhY2hBbmNlc3RvclJldmVyc2UoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1zRW5hYmxlZCA9IG5vZGUuZ2V0VHJhbnNmb3Jtc0VuYWJsZWQoKTtcbiAgICAgICAgICAgIGlmICh0cmFuc2Zvcm1zRW5hYmxlZCA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICAgICAgICBhdC5tdWx0aXBseShub2RlLmdldFRyYW5zZm9ybSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRyYW5zZm9ybXNFbmFibGVkID09PSAncG9zaXRpb24nKSB7XG4gICAgICAgICAgICAgICAgYXQudHJhbnNsYXRlKG5vZGUuZ2V0WCgpIC0gbm9kZS5nZXRPZmZzZXRYKCksIG5vZGUuZ2V0WSgpIC0gbm9kZS5nZXRPZmZzZXRZKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0b3ApO1xuICAgICAgICByZXR1cm4gYXQ7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRBYnNvbHV0ZVNjYWxlID0gZnVuY3Rpb24gKHRvcCkge1xuICAgICAgICBpZiAodG9wKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QWJzb2x1dGVTY2FsZSh0b3ApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKEFCU09MVVRFX1NDQUxFLCB0aGlzLl9nZXRBYnNvbHV0ZVNjYWxlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2dldEFic29sdXRlU2NhbGUgPSBmdW5jdGlvbiAodG9wKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzO1xuICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICBpZiAocGFyZW50Ll9pc1VuZGVyQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICB0b3AgPSBwYXJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQuZ2V0UGFyZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNjYWxlWCA9IDEsIHNjYWxlWSA9IDE7XG4gICAgICAgIHRoaXMuX2VhY2hBbmNlc3RvclJldmVyc2UoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIHNjYWxlWCAqPSBub2RlLnNjYWxlWCgpO1xuICAgICAgICAgICAgc2NhbGVZICo9IG5vZGUuc2NhbGVZKCk7XG4gICAgICAgIH0sIHRvcCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBzY2FsZVgsXG4gICAgICAgICAgICB5OiBzY2FsZVlcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldFRyYW5zZm9ybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKFRSQU5TRk9STSwgdGhpcy5fZ2V0VHJhbnNmb3JtKTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9nZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtID0gbmV3IFV0aWxfMS5UcmFuc2Zvcm0oKSwgeCA9IHRoaXMueCgpLCB5ID0gdGhpcy55KCksIHJvdGF0aW9uID0gR2xvYmFsXzEuS29udmEuZ2V0QW5nbGUodGhpcy5yb3RhdGlvbigpKSwgc2NhbGVYID0gdGhpcy5zY2FsZVgoKSwgc2NhbGVZID0gdGhpcy5zY2FsZVkoKSwgc2tld1ggPSB0aGlzLnNrZXdYKCksIHNrZXdZID0gdGhpcy5za2V3WSgpLCBvZmZzZXRYID0gdGhpcy5vZmZzZXRYKCksIG9mZnNldFkgPSB0aGlzLm9mZnNldFkoKTtcbiAgICAgICAgaWYgKHggIT09IDAgfHwgeSAhPT0gMCkge1xuICAgICAgICAgICAgbS50cmFuc2xhdGUoeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvdGF0aW9uICE9PSAwKSB7XG4gICAgICAgICAgICBtLnJvdGF0ZShyb3RhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNrZXdYICE9PSAwIHx8IHNrZXdZICE9PSAwKSB7XG4gICAgICAgICAgICBtLnNrZXcoc2tld1gsIHNrZXdZKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NhbGVYICE9PSAxIHx8IHNjYWxlWSAhPT0gMSkge1xuICAgICAgICAgICAgbS5zY2FsZShzY2FsZVgsIHNjYWxlWSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9mZnNldFggIT09IDAgfHwgb2Zmc2V0WSAhPT0gMCkge1xuICAgICAgICAgICAgbS50cmFuc2xhdGUoLTEgKiBvZmZzZXRYLCAtMSAqIG9mZnNldFkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHZhciBhdHRycyA9IFV0aWxfMS5VdGlsLmNsb25lT2JqZWN0KHRoaXMuYXR0cnMpLCBrZXksIGFsbExpc3RlbmVycywgbGVuLCBuLCBsaXN0ZW5lcjtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBDTE9ORV9CTEFDS19MSVNUKSB7XG4gICAgICAgICAgICB2YXIgYmxvY2tBdHRyID0gQ0xPTkVfQkxBQ0tfTElTVFtpXTtcbiAgICAgICAgICAgIGRlbGV0ZSBhdHRyc1tibG9ja0F0dHJdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgICAgYXR0cnNba2V5XSA9IG9ialtrZXldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBub2RlID0gbmV3IHRoaXMuY29uc3RydWN0b3IoYXR0cnMpO1xuICAgICAgICBmb3IgKGtleSBpbiB0aGlzLmV2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBhbGxMaXN0ZW5lcnMgPSB0aGlzLmV2ZW50TGlzdGVuZXJzW2tleV07XG4gICAgICAgICAgICBsZW4gPSBhbGxMaXN0ZW5lcnMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBhbGxMaXN0ZW5lcnNbbl07XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyLm5hbWUuaW5kZXhPZihLT05WQSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbm9kZS5ldmVudExpc3RlbmVyc1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmV2ZW50TGlzdGVuZXJzW2tleV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBub2RlLmV2ZW50TGlzdGVuZXJzW2tleV0ucHVzaChsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX3RvS29udmFDYW52YXMgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgICAgdmFyIGJveCA9IHRoaXMuZ2V0Q2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCksIHggPSBjb25maWcueCAhPT0gdW5kZWZpbmVkID8gY29uZmlnLnggOiBib3gueCwgeSA9IGNvbmZpZy55ICE9PSB1bmRlZmluZWQgPyBjb25maWcueSA6IGJveC55LCBwaXhlbFJhdGlvID0gY29uZmlnLnBpeGVsUmF0aW8gfHwgMSwgY2FudmFzID0gbmV3IENhbnZhc18xLlNjZW5lQ2FudmFzKHtcbiAgICAgICAgICAgIHdpZHRoOiBjb25maWcud2lkdGggfHwgYm94LndpZHRoIHx8IChzdGFnZSA/IHN0YWdlLmdldFdpZHRoKCkgOiAwKSxcbiAgICAgICAgICAgIGhlaWdodDogY29uZmlnLmhlaWdodCB8fCBib3guaGVpZ2h0IHx8IChzdGFnZSA/IHN0YWdlLmdldEhlaWdodCgpIDogMCksXG4gICAgICAgICAgICBwaXhlbFJhdGlvOiBwaXhlbFJhdGlvXG4gICAgICAgIH0pLCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoKTtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGlmICh4IHx8IHkpIHtcbiAgICAgICAgICAgIGNvbnRleHQudHJhbnNsYXRlKC0xICogeCwgLTEgKiB5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdTY2VuZShjYW52YXMpO1xuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnRvQ2FudmFzID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG9Lb252YUNhbnZhcyhjb25maWcpLl9jYW52YXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS50b0RhdGFVUkwgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgICAgdmFyIG1pbWVUeXBlID0gY29uZmlnLm1pbWVUeXBlIHx8IG51bGwsIHF1YWxpdHkgPSBjb25maWcucXVhbGl0eSB8fCBudWxsO1xuICAgICAgICB2YXIgdXJsID0gdGhpcy5fdG9Lb252YUNhbnZhcyhjb25maWcpLnRvRGF0YVVSTChtaW1lVHlwZSwgcXVhbGl0eSk7XG4gICAgICAgIGlmIChjb25maWcuY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNvbmZpZy5jYWxsYmFjayh1cmwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS50b0ltYWdlID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICBpZiAoIWNvbmZpZyB8fCAhY29uZmlnLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aHJvdyAnY2FsbGJhY2sgcmVxdWlyZWQgZm9yIHRvSW1hZ2UgbWV0aG9kIGNvbmZpZyBhcmd1bWVudCc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbGxiYWNrID0gY29uZmlnLmNhbGxiYWNrO1xuICAgICAgICBkZWxldGUgY29uZmlnLmNhbGxiYWNrO1xuICAgICAgICBVdGlsXzEuVXRpbC5fdXJsVG9JbWFnZSh0aGlzLnRvRGF0YVVSTChjb25maWcpLCBmdW5jdGlvbiAoaW1nKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhpbWcpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICAgICAgICB0aGlzLndpZHRoKHNpemUud2lkdGgpO1xuICAgICAgICB0aGlzLmhlaWdodChzaXplLmhlaWdodCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoKCksXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0KClcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldENsYXNzTmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NOYW1lIHx8IHRoaXMubm9kZVR5cGU7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRUeXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlVHlwZTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldERyYWdEaXN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXR0cnMuZHJhZ0Rpc3RhbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmF0dHJzLmRyYWdEaXN0YW5jZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmdldERyYWdEaXN0YW5jZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIEdsb2JhbF8xLktvbnZhLmRyYWdEaXN0YW5jZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX29mZiA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgZXZ0TGlzdGVuZXJzID0gdGhpcy5ldmVudExpc3RlbmVyc1t0eXBlXSwgaSwgZXZ0TmFtZSwgaGFuZGxlcjtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGV2dExpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZXZ0TmFtZSA9IGV2dExpc3RlbmVyc1tpXS5uYW1lO1xuICAgICAgICAgICAgaGFuZGxlciA9IGV2dExpc3RlbmVyc1tpXS5oYW5kbGVyO1xuICAgICAgICAgICAgaWYgKChldnROYW1lICE9PSAna29udmEnIHx8IG5hbWUgPT09ICdrb252YScpICYmXG4gICAgICAgICAgICAgICAgKCFuYW1lIHx8IGV2dE5hbWUgPT09IG5hbWUpICYmXG4gICAgICAgICAgICAgICAgKCFjYWxsYmFjayB8fCBjYWxsYmFjayA9PT0gaGFuZGxlcikpIHtcbiAgICAgICAgICAgICAgICBldnRMaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGlmIChldnRMaXN0ZW5lcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50TGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZmlyZUNoYW5nZUV2ZW50ID0gZnVuY3Rpb24gKGF0dHIsIG9sZFZhbCwgbmV3VmFsKSB7XG4gICAgICAgIHRoaXMuX2ZpcmUoYXR0ciArIENIQU5HRSwge1xuICAgICAgICAgICAgb2xkVmFsOiBvbGRWYWwsXG4gICAgICAgICAgICBuZXdWYWw6IG5ld1ZhbFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnNldElkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHZhciBvbGRJZCA9IHRoaXMuaWQoKTtcbiAgICAgICAgZXhwb3J0cy5fcmVtb3ZlSWQob2xkSWQsIHRoaXMpO1xuICAgICAgICBfYWRkSWQodGhpcywgaWQpO1xuICAgICAgICB0aGlzLl9zZXRBdHRyKCdpZCcsIGlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5zZXROYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdmFyIG9sZE5hbWVzID0gKHRoaXMubmFtZSgpIHx8ICcnKS5zcGxpdCgvXFxzL2cpO1xuICAgICAgICB2YXIgbmV3TmFtZXMgPSAobmFtZSB8fCAnJykuc3BsaXQoL1xccy9nKTtcbiAgICAgICAgdmFyIHN1Ym5hbWUsIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBvbGROYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc3VibmFtZSA9IG9sZE5hbWVzW2ldO1xuICAgICAgICAgICAgaWYgKG5ld05hbWVzLmluZGV4T2Yoc3VibmFtZSkgPT09IC0xICYmIHN1Ym5hbWUpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRzLl9yZW1vdmVOYW1lKHN1Ym5hbWUsIHRoaXMuX2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmV3TmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN1Ym5hbWUgPSBuZXdOYW1lc1tpXTtcbiAgICAgICAgICAgIGlmIChvbGROYW1lcy5pbmRleE9mKHN1Ym5hbWUpID09PSAtMSAmJiBzdWJuYW1lKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0cy5fYWRkTmFtZSh0aGlzLCBzdWJuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXRBdHRyKE5BTUUsIG5hbWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmFkZE5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBpZiAoIXRoaXMuaGFzTmFtZShuYW1lKSkge1xuICAgICAgICAgICAgdmFyIG9sZE5hbWUgPSB0aGlzLm5hbWUoKTtcbiAgICAgICAgICAgIHZhciBuZXdOYW1lID0gb2xkTmFtZSA/IG9sZE5hbWUgKyAnICcgKyBuYW1lIDogbmFtZTtcbiAgICAgICAgICAgIHRoaXMuc2V0TmFtZShuZXdOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmhhc05hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZnVsbE5hbWUgPSB0aGlzLm5hbWUoKTtcbiAgICAgICAgaWYgKCFmdWxsTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuYW1lcyA9IChmdWxsTmFtZSB8fCAnJykuc3BsaXQoL1xccy9nKTtcbiAgICAgICAgcmV0dXJuIG5hbWVzLmluZGV4T2YobmFtZSkgIT09IC0xO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUucmVtb3ZlTmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciBuYW1lcyA9ICh0aGlzLm5hbWUoKSB8fCAnJykuc3BsaXQoL1xccy9nKTtcbiAgICAgICAgdmFyIGluZGV4ID0gbmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgbmFtZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuc2V0TmFtZShuYW1lcy5qb2luKCcgJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuc2V0QXR0ciA9IGZ1bmN0aW9uIChhdHRyLCB2YWwpIHtcbiAgICAgICAgdmFyIGZ1bmMgPSB0aGlzW1NFVCArIFV0aWxfMS5VdGlsLl9jYXBpdGFsaXplKGF0dHIpXTtcbiAgICAgICAgaWYgKFV0aWxfMS5VdGlsLl9pc0Z1bmN0aW9uKGZ1bmMpKSB7XG4gICAgICAgICAgICBmdW5jLmNhbGwodGhpcywgdmFsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NldEF0dHIoYXR0ciwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9zZXRBdHRyID0gZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gICAgICAgIHZhciBvbGRWYWwgPSB0aGlzLmF0dHJzW2tleV07XG4gICAgICAgIGlmIChvbGRWYWwgPT09IHZhbCAmJiAhVXRpbF8xLlV0aWwuaXNPYmplY3QodmFsKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmF0dHJzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmF0dHJzW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmlyZUNoYW5nZUV2ZW50KGtleSwgb2xkVmFsLCB2YWwpO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX3NldENvbXBvbmVudEF0dHIgPSBmdW5jdGlvbiAoa2V5LCBjb21wb25lbnQsIHZhbCkge1xuICAgICAgICB2YXIgb2xkVmFsO1xuICAgICAgICBpZiAodmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9sZFZhbCA9IHRoaXMuYXR0cnNba2V5XTtcbiAgICAgICAgICAgIGlmICghb2xkVmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyc1trZXldID0gdGhpcy5nZXRBdHRyKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmF0dHJzW2tleV1bY29tcG9uZW50XSA9IHZhbDtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmVDaGFuZ2VFdmVudChrZXksIG9sZFZhbCwgdmFsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2ZpcmVBbmRCdWJibGUgPSBmdW5jdGlvbiAoZXZlbnRUeXBlLCBldnQsIGNvbXBhcmVTaGFwZSkge1xuICAgICAgICBpZiAoZXZ0ICYmIHRoaXMubm9kZVR5cGUgPT09IFNIQVBFKSB7XG4gICAgICAgICAgICBldnQudGFyZ2V0ID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2hvdWxkU3RvcCA9IChldmVudFR5cGUgPT09IE1PVVNFRU5URVIgfHwgZXZlbnRUeXBlID09PSBNT1VTRUxFQVZFKSAmJlxuICAgICAgICAgICAgKChjb21wYXJlU2hhcGUgJiZcbiAgICAgICAgICAgICAgICAodGhpcyA9PT0gY29tcGFyZVNoYXBlIHx8XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmlzQW5jZXN0b3JPZiAmJiB0aGlzLmlzQW5jZXN0b3JPZihjb21wYXJlU2hhcGUpKSkpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMubm9kZVR5cGUgPT09ICdTdGFnZScgJiYgIWNvbXBhcmVTaGFwZSkpO1xuICAgICAgICBpZiAoIXNob3VsZFN0b3ApIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoZXZlbnRUeXBlLCBldnQpO1xuICAgICAgICAgICAgdmFyIHN0b3BCdWJibGUgPSAoZXZlbnRUeXBlID09PSBNT1VTRUVOVEVSIHx8IGV2ZW50VHlwZSA9PT0gTU9VU0VMRUFWRSkgJiZcbiAgICAgICAgICAgICAgICAoY29tcGFyZVNoYXBlICYmXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmVTaGFwZS5pc0FuY2VzdG9yT2YgJiZcbiAgICAgICAgICAgICAgICAgICAgY29tcGFyZVNoYXBlLmlzQW5jZXN0b3JPZih0aGlzKSAmJlxuICAgICAgICAgICAgICAgICAgICAhY29tcGFyZVNoYXBlLmlzQW5jZXN0b3JPZih0aGlzLnBhcmVudCkpO1xuICAgICAgICAgICAgaWYgKCgoZXZ0ICYmICFldnQuY2FuY2VsQnViYmxlKSB8fCAhZXZ0KSAmJlxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50ICYmXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuaXNMaXN0ZW5pbmcoKSAmJlxuICAgICAgICAgICAgICAgICFzdG9wQnViYmxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhcmVTaGFwZSAmJiBjb21wYXJlU2hhcGUucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmVBbmRCdWJibGUuY2FsbCh0aGlzLnBhcmVudCwgZXZlbnRUeXBlLCBldnQsIGNvbXBhcmVTaGFwZS5wYXJlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlyZUFuZEJ1YmJsZS5jYWxsKHRoaXMucGFyZW50LCBldmVudFR5cGUsIGV2dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZmlyZSA9IGZ1bmN0aW9uIChldmVudFR5cGUsIGV2dCkge1xuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5ldmVudExpc3RlbmVyc1tldmVudFR5cGVdLCBpO1xuICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICBldnQgPSBldnQgfHwge307XG4gICAgICAgICAgICBldnQuY3VycmVudFRhcmdldCA9IHRoaXM7XG4gICAgICAgICAgICBldnQudHlwZSA9IGV2ZW50VHlwZTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBldmVudHNbaV0uaGFuZGxlci5jYWxsKHRoaXMsIGV2dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZHJhd1NjZW5lKCk7XG4gICAgICAgIHRoaXMuZHJhd0hpdCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnN0YXJ0RHJhZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpLCBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKSwgcG9zID0gc3RhZ2UuZ2V0UG9pbnRlclBvc2l0aW9uKCksIGFwID0gdGhpcy5nZXRBYnNvbHV0ZVBvc2l0aW9uKCk7XG4gICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgIGlmIChEcmFnQW5kRHJvcF8xLkRELm5vZGUpIHtcbiAgICAgICAgICAgICAgICBEcmFnQW5kRHJvcF8xLkRELm5vZGUuc3RvcERyYWcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIERyYWdBbmREcm9wXzEuREQubm9kZSA9IHRoaXM7XG4gICAgICAgICAgICBEcmFnQW5kRHJvcF8xLkRELnN0YXJ0UG9pbnRlclBvcyA9IHBvcztcbiAgICAgICAgICAgIERyYWdBbmREcm9wXzEuREQub2Zmc2V0LnggPSBwb3MueCAtIGFwLng7XG4gICAgICAgICAgICBEcmFnQW5kRHJvcF8xLkRELm9mZnNldC55ID0gcG9zLnkgLSBhcC55O1xuICAgICAgICAgICAgRHJhZ0FuZERyb3BfMS5ERC5hbmltLnNldExheWVycyhsYXllciB8fCB0aGlzWydnZXRMYXllcnMnXSgpKTtcbiAgICAgICAgICAgIERyYWdBbmREcm9wXzEuREQuYW5pbS5zdGFydCgpO1xuICAgICAgICAgICAgdGhpcy5fc2V0RHJhZ1Bvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9zZXREcmFnUG9zaXRpb24gPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLmdldFN0YWdlKCkuZ2V0UG9pbnRlclBvc2l0aW9uKCksIGRiZiA9IHRoaXMuZHJhZ0JvdW5kRnVuYygpO1xuICAgICAgICBpZiAoIXBvcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdOb2RlUG9zID0ge1xuICAgICAgICAgICAgeDogcG9zLnggLSBEcmFnQW5kRHJvcF8xLkRELm9mZnNldC54LFxuICAgICAgICAgICAgeTogcG9zLnkgLSBEcmFnQW5kRHJvcF8xLkRELm9mZnNldC55XG4gICAgICAgIH07XG4gICAgICAgIGlmIChkYmYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbmV3Tm9kZVBvcyA9IGRiZi5jYWxsKHRoaXMsIG5ld05vZGVQb3MsIGV2dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRBYnNvbHV0ZVBvc2l0aW9uKG5ld05vZGVQb3MpO1xuICAgICAgICBpZiAoIXRoaXMuX2xhc3RQb3MgfHxcbiAgICAgICAgICAgIHRoaXMuX2xhc3RQb3MueCAhPT0gbmV3Tm9kZVBvcy54IHx8XG4gICAgICAgICAgICB0aGlzLl9sYXN0UG9zLnkgIT09IG5ld05vZGVQb3MueSkge1xuICAgICAgICAgICAgRHJhZ0FuZERyb3BfMS5ERC5hbmltWydkaXJ0eSddID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYXN0UG9zID0gbmV3Tm9kZVBvcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnN0b3BEcmFnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZXZ0ID0ge307XG4gICAgICAgIERyYWdBbmREcm9wXzEuREQuX2VuZERyYWdCZWZvcmUoZXZ0KTtcbiAgICAgICAgRHJhZ0FuZERyb3BfMS5ERC5fZW5kRHJhZ0FmdGVyKGV2dCk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5zZXREcmFnZ2FibGUgPSBmdW5jdGlvbiAoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHRoaXMuX3NldEF0dHIoJ2RyYWdnYWJsZScsIGRyYWdnYWJsZSk7XG4gICAgICAgIHRoaXMuX2RyYWdDaGFuZ2UoKTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmlzRHJhZ2dpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhIShEcmFnQW5kRHJvcF8xLkRELm5vZGUgJiYgRHJhZ0FuZERyb3BfMS5ERC5ub2RlID09PSB0aGlzICYmIERyYWdBbmREcm9wXzEuREQuaXNEcmFnZ2luZyk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fbGlzdGVuRHJhZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZHJhZ0NsZWFudXAoKTtcbiAgICAgICAgdGhpcy5vbignbW91c2Vkb3duLmtvbnZhIHRvdWNoc3RhcnQua29udmEnLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICB2YXIgc2hvdWxkQ2hlY2tCdXR0b24gPSBldnQuZXZ0LmJ1dHRvbiAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIGNhbkRyYWcgPSAhc2hvdWxkQ2hlY2tCdXR0b24gfHwgR2xvYmFsXzEuS29udmEuZHJhZ0J1dHRvbnMuaW5kZXhPZihldnQuZXZ0LmJ1dHRvbikgPj0gMDtcbiAgICAgICAgICAgIGlmICghY2FuRHJhZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghRHJhZ0FuZERyb3BfMS5ERC5ub2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydERyYWcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZHJhZ0NoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXR0cnMuZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5EcmFnKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kcmFnQ2xlYW51cCgpO1xuICAgICAgICAgICAgdmFyIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpO1xuICAgICAgICAgICAgdmFyIGRkID0gRHJhZ0FuZERyb3BfMS5ERDtcbiAgICAgICAgICAgIGlmIChzdGFnZSAmJiBkZC5ub2RlICYmIGRkLm5vZGUuX2lkID09PSB0aGlzLl9pZCkge1xuICAgICAgICAgICAgICAgIGRkLm5vZGUuc3RvcERyYWcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2RyYWdDbGVhbnVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm9mZignbW91c2Vkb3duLmtvbnZhJyk7XG4gICAgICAgIHRoaXMub2ZmKCd0b3VjaHN0YXJ0LmtvbnZhJyk7XG4gICAgfTtcbiAgICBOb2RlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhLCBjb250YWluZXIpIHtcbiAgICAgICAgaWYgKFV0aWxfMS5VdGlsLl9pc1N0cmluZyhkYXRhKSkge1xuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZU5vZGUoZGF0YSwgY29udGFpbmVyKTtcbiAgICB9O1xuICAgIE5vZGUuX2NyZWF0ZU5vZGUgPSBmdW5jdGlvbiAob2JqLCBjb250YWluZXIpIHtcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IE5vZGUucHJvdG90eXBlLmdldENsYXNzTmFtZS5jYWxsKG9iaiksIGNoaWxkcmVuID0gb2JqLmNoaWxkcmVuLCBubywgbGVuLCBuO1xuICAgICAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgICAgICBvYmouYXR0cnMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB9XG4gICAgICAgIGlmICghR2xvYmFsXzEuX05PREVTX1JFR0lTVFJZW2NsYXNzTmFtZV0pIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ0NhbiBub3QgZmluZCBhIG5vZGUgd2l0aCBjbGFzcyBuYW1lIFwiJyArXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lICtcbiAgICAgICAgICAgICAgICAnXCIuIEZhbGxiYWNrIHRvIFwiU2hhcGVcIi4nKTtcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdTaGFwZSc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIENsYXNzID0gR2xvYmFsXzEuX05PREVTX1JFR0lTVFJZW2NsYXNzTmFtZV07XG4gICAgICAgIG5vID0gbmV3IENsYXNzKG9iai5hdHRycyk7XG4gICAgICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgICAgICAgbGVuID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgbm8uYWRkKE5vZGUuX2NyZWF0ZU5vZGUoY2hpbGRyZW5bbl0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm87XG4gICAgfTtcbiAgICByZXR1cm4gTm9kZTtcbn0oKSk7XG5leHBvcnRzLk5vZGUgPSBOb2RlO1xuTm9kZS5wcm90b3R5cGUubm9kZVR5cGUgPSAnTm9kZSc7XG5Ob2RlLnByb3RvdHlwZS5fYXR0cnNBZmZlY3RpbmdTaXplID0gW107XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3pJbmRleCcpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdhYnNvbHV0ZVBvc2l0aW9uJyk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3Bvc2l0aW9uJyk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3gnLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICd5JywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uJywgJ3NvdXJjZS1vdmVyJywgVmFsaWRhdG9yc18xLmdldFN0cmluZ1ZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnb3BhY2l0eScsIDEsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ25hbWUnLCAnJywgVmFsaWRhdG9yc18xLmdldFN0cmluZ1ZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnaWQnLCAnJywgVmFsaWRhdG9yc18xLmdldFN0cmluZ1ZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAncm90YXRpb24nLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihOb2RlLCAnc2NhbGUnLCBbJ3gnLCAneSddKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnc2NhbGVYJywgMSwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnc2NhbGVZJywgMSwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3NrZXcnLCBbJ3gnLCAneSddKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnc2tld1gnLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdza2V3WScsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKE5vZGUsICdvZmZzZXQnLCBbJ3gnLCAneSddKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnb2Zmc2V0WCcsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ29mZnNldFknLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdkcmFnRGlzdGFuY2UnLCBudWxsLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICd3aWR0aCcsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ2hlaWdodCcsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ2xpc3RlbmluZycsICdpbmhlcml0JywgZnVuY3Rpb24gKHZhbCkge1xuICAgIHZhciBpc1ZhbGlkID0gdmFsID09PSB0cnVlIHx8IHZhbCA9PT0gZmFsc2UgfHwgdmFsID09PSAnaW5oZXJpdCc7XG4gICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgIFV0aWxfMS5VdGlsLndhcm4odmFsICtcbiAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwibGlzdGVuaW5nXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgbWF5IGJlIHRydWUsIGZhbHNlIG9yIFwiaW5oZXJpdFwiLicpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xufSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3ByZXZlbnREZWZhdWx0JywgdHJ1ZSwgVmFsaWRhdG9yc18xLmdldEJvb2xlYW5WYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ2ZpbHRlcnMnLCBudWxsLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgdGhpcy5fZmlsdGVyVXBUb0RhdGUgPSBmYWxzZTtcbiAgICByZXR1cm4gdmFsO1xufSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3Zpc2libGUnLCAnaW5oZXJpdCcsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICB2YXIgaXNWYWxpZCA9IHZhbCA9PT0gdHJ1ZSB8fCB2YWwgPT09IGZhbHNlIHx8IHZhbCA9PT0gJ2luaGVyaXQnO1xuICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICBVdGlsXzEuVXRpbC53YXJuKHZhbCArXG4gICAgICAgICAgICAnIGlzIGEgbm90IHZhbGlkIHZhbHVlIGZvciBcInZpc2libGVcIiBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBtYXkgYmUgdHJ1ZSwgZmFsc2Ugb3IgXCJpbmhlcml0XCIuJyk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG59KTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAndHJhbnNmb3Jtc0VuYWJsZWQnLCAnYWxsJywgVmFsaWRhdG9yc18xLmdldFN0cmluZ1ZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnc2l6ZScpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdkcmFnQm91bmRGdW5jJyk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ2RyYWdnYWJsZScsIGZhbHNlLCBWYWxpZGF0b3JzXzEuZ2V0Qm9vbGVhblZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmJhY2tDb21wYXQoTm9kZSwge1xuICAgIHJvdGF0ZURlZzogJ3JvdGF0ZScsXG4gICAgc2V0Um90YXRpb25EZWc6ICdzZXRSb3RhdGlvbicsXG4gICAgZ2V0Um90YXRpb25EZWc6ICdnZXRSb3RhdGlvbidcbn0pO1xuVXRpbF8xLkNvbGxlY3Rpb24ubWFwTWV0aG9kcyhOb2RlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVXRpbF8xID0gcmVxdWlyZShcIi4vVXRpbFwiKTtcbnZhciBGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi9GYWN0b3J5XCIpO1xudmFyIE5vZGVfMSA9IHJlcXVpcmUoXCIuL05vZGVcIik7XG52YXIgVmFsaWRhdG9yc18xID0gcmVxdWlyZShcIi4vVmFsaWRhdG9yc1wiKTtcbnZhciBHbG9iYWxfMSA9IHJlcXVpcmUoXCIuL0dsb2JhbFwiKTtcbnZhciBIQVNfU0hBRE9XID0gJ2hhc1NoYWRvdyc7XG52YXIgU0hBRE9XX1JHQkEgPSAnc2hhZG93UkdCQSc7XG52YXIgcGF0dGVybkltYWdlID0gJ3BhdHRlcm5JbWFnZSc7XG52YXIgbGluZWFyR3JhZGllbnQgPSAnbGluZWFyR3JhZGllbnQnO1xudmFyIHJhZGlhbEdyYWRpZW50ID0gJ3JhZGlhbEdyYWRpZW50JztcbnZhciBkdW1teUNvbnRleHQ7XG5mdW5jdGlvbiBnZXREdW1teUNvbnRleHQoKSB7XG4gICAgaWYgKGR1bW15Q29udGV4dCkge1xuICAgICAgICByZXR1cm4gZHVtbXlDb250ZXh0O1xuICAgIH1cbiAgICBkdW1teUNvbnRleHQgPSBVdGlsXzEuVXRpbC5jcmVhdGVDYW52YXNFbGVtZW50KCkuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICByZXR1cm4gZHVtbXlDb250ZXh0O1xufVxuZXhwb3J0cy5zaGFwZXMgPSB7fTtcbmZ1bmN0aW9uIF9maWxsRnVuYyhjb250ZXh0KSB7XG4gICAgY29udGV4dC5maWxsKCk7XG59XG5mdW5jdGlvbiBfc3Ryb2tlRnVuYyhjb250ZXh0KSB7XG4gICAgY29udGV4dC5zdHJva2UoKTtcbn1cbmZ1bmN0aW9uIF9maWxsRnVuY0hpdChjb250ZXh0KSB7XG4gICAgY29udGV4dC5maWxsKCk7XG59XG5mdW5jdGlvbiBfc3Ryb2tlRnVuY0hpdChjb250ZXh0KSB7XG4gICAgY29udGV4dC5zdHJva2UoKTtcbn1cbmZ1bmN0aW9uIF9jbGVhckhhc1NoYWRvd0NhY2hlKCkge1xuICAgIHRoaXMuX2NsZWFyQ2FjaGUoSEFTX1NIQURPVyk7XG59XG5mdW5jdGlvbiBfY2xlYXJHZXRTaGFkb3dSR0JBQ2FjaGUoKSB7XG4gICAgdGhpcy5fY2xlYXJDYWNoZShTSEFET1dfUkdCQSk7XG59XG5mdW5jdGlvbiBfY2xlYXJGaWxsUGF0dGVybkNhY2hlKCkge1xuICAgIHRoaXMuX2NsZWFyQ2FjaGUocGF0dGVybkltYWdlKTtcbn1cbmZ1bmN0aW9uIF9jbGVhckxpbmVhckdyYWRpZW50Q2FjaGUoKSB7XG4gICAgdGhpcy5fY2xlYXJDYWNoZShsaW5lYXJHcmFkaWVudCk7XG59XG5mdW5jdGlvbiBfY2xlYXJSYWRpYWxHcmFkaWVudENhY2hlKCkge1xuICAgIHRoaXMuX2NsZWFyQ2FjaGUocmFkaWFsR3JhZGllbnQpO1xufVxudmFyIFNoYXBlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2hhcGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2hhcGUoY29uZmlnKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGtleSA9IFV0aWxfMS5VdGlsLmdldFJhbmRvbUNvbG9yKCk7XG4gICAgICAgICAgICBpZiAoa2V5ICYmICEoa2V5IGluIGV4cG9ydHMuc2hhcGVzKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLmNvbG9yS2V5ID0ga2V5O1xuICAgICAgICBleHBvcnRzLnNoYXBlc1trZXldID0gX3RoaXM7XG4gICAgICAgIF90aGlzLm9uKCdzaGFkb3dDb2xvckNoYW5nZS5rb252YSBzaGFkb3dCbHVyQ2hhbmdlLmtvbnZhIHNoYWRvd09mZnNldENoYW5nZS5rb252YSBzaGFkb3dPcGFjaXR5Q2hhbmdlLmtvbnZhIHNoYWRvd0VuYWJsZWRDaGFuZ2Uua29udmEnLCBfY2xlYXJIYXNTaGFkb3dDYWNoZSk7XG4gICAgICAgIF90aGlzLm9uKCdzaGFkb3dDb2xvckNoYW5nZS5rb252YSBzaGFkb3dPcGFjaXR5Q2hhbmdlLmtvbnZhIHNoYWRvd0VuYWJsZWRDaGFuZ2Uua29udmEnLCBfY2xlYXJHZXRTaGFkb3dSR0JBQ2FjaGUpO1xuICAgICAgICBfdGhpcy5vbignZmlsbFByaW9yaXR5Q2hhbmdlLmtvbnZhIGZpbGxQYXR0ZXJuSW1hZ2VDaGFuZ2Uua29udmEgZmlsbFBhdHRlcm5SZXBlYXRDaGFuZ2Uua29udmEnLCBfY2xlYXJGaWxsUGF0dGVybkNhY2hlKTtcbiAgICAgICAgX3RoaXMub24oJ2ZpbGxQcmlvcml0eUNoYW5nZS5rb252YSBmaWxsTGluZWFyR3JhZGllbnRDb2xvclN0b3BzQ2hhbmdlLmtvbnZhIGZpbGxMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnRYQ2hhbmdlLmtvbnZhIGZpbGxMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnRZQ2hhbmdlLmtvbnZhIGZpbGxMaW5lYXJHcmFkaWVudEVuZFBvaW50WENoYW5nZS5rb252YSBmaWxsTGluZWFyR3JhZGllbnRFbmRQb2ludFlDaGFuZ2Uua29udmEnLCBfY2xlYXJMaW5lYXJHcmFkaWVudENhY2hlKTtcbiAgICAgICAgX3RoaXMub24oJ2ZpbGxQcmlvcml0eUNoYW5nZS5rb252YSBmaWxsUmFkaWFsR3JhZGllbnRDb2xvclN0b3BzQ2hhbmdlLmtvbnZhIGZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UG9pbnRYQ2hhbmdlLmtvbnZhIGZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UG9pbnRZQ2hhbmdlLmtvbnZhIGZpbGxSYWRpYWxHcmFkaWVudEVuZFBvaW50WENoYW5nZS5rb252YSBmaWxsUmFkaWFsR3JhZGllbnRFbmRQb2ludFlDaGFuZ2Uua29udmEgZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRSYWRpdXNDaGFuZ2Uua29udmEgZmlsbFJhZGlhbEdyYWRpZW50RW5kUmFkaXVzQ2hhbmdlLmtvbnZhJywgX2NsZWFyUmFkaWFsR3JhZGllbnRDYWNoZSk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU2hhcGUucHJvdG90eXBlLmdldENvbnRleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldExheWVyKCkuZ2V0Q29udGV4dCgpO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLmdldENhbnZhcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGF5ZXIoKS5nZXRDYW52YXMoKTtcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5nZXRTY2VuZUZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJzLnNjZW5lRnVuYyB8fCB0aGlzWydfc2NlbmVGdW5jJ107XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuZ2V0SGl0RnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cnMuaGl0RnVuYyB8fCB0aGlzWydfaGl0RnVuYyddO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLmhhc1NoYWRvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKEhBU19TSEFET1csIHRoaXMuX2hhc1NoYWRvdyk7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuX2hhc1NoYWRvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnNoYWRvd0VuYWJsZWQoKSAmJlxuICAgICAgICAgICAgKHRoaXMuc2hhZG93T3BhY2l0eSgpICE9PSAwICYmXG4gICAgICAgICAgICAgICAgISEodGhpcy5zaGFkb3dDb2xvcigpIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhZG93Qmx1cigpIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhZG93T2Zmc2V0WCgpIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhZG93T2Zmc2V0WSgpKSkpO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLl9nZXRGaWxsUGF0dGVybiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKHBhdHRlcm5JbWFnZSwgdGhpcy5fX2dldEZpbGxQYXR0ZXJuKTtcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5fX2dldEZpbGxQYXR0ZXJuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5maWxsUGF0dGVybkltYWdlKCkpIHtcbiAgICAgICAgICAgIHZhciBjdHggPSBnZXREdW1teUNvbnRleHQoKTtcbiAgICAgICAgICAgIHJldHVybiBjdHguY3JlYXRlUGF0dGVybih0aGlzLmZpbGxQYXR0ZXJuSW1hZ2UoKSwgdGhpcy5maWxsUGF0dGVyblJlcGVhdCgpIHx8ICdyZXBlYXQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLl9nZXRMaW5lYXJHcmFkaWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKGxpbmVhckdyYWRpZW50LCB0aGlzLl9fZ2V0TGluZWFyR3JhZGllbnQpO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLl9fZ2V0TGluZWFyR3JhZGllbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb2xvclN0b3BzID0gdGhpcy5maWxsTGluZWFyR3JhZGllbnRDb2xvclN0b3BzKCk7XG4gICAgICAgIGlmIChjb2xvclN0b3BzKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gZ2V0RHVtbXlDb250ZXh0KCk7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLmZpbGxMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnQoKTtcbiAgICAgICAgICAgIHZhciBlbmQgPSB0aGlzLmZpbGxMaW5lYXJHcmFkaWVudEVuZFBvaW50KCk7XG4gICAgICAgICAgICB2YXIgZ3JkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KHN0YXJ0LngsIHN0YXJ0LnksIGVuZC54LCBlbmQueSk7XG4gICAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGNvbG9yU3RvcHMubGVuZ3RoOyBuICs9IDIpIHtcbiAgICAgICAgICAgICAgICBncmQuYWRkQ29sb3JTdG9wKGNvbG9yU3RvcHNbbl0sIGNvbG9yU3RvcHNbbiArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBncmQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5fZ2V0UmFkaWFsR3JhZGllbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShyYWRpYWxHcmFkaWVudCwgdGhpcy5fX2dldFJhZGlhbEdyYWRpZW50KTtcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5fX2dldFJhZGlhbEdyYWRpZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sb3JTdG9wcyA9IHRoaXMuZmlsbFJhZGlhbEdyYWRpZW50Q29sb3JTdG9wcygpO1xuICAgICAgICBpZiAoY29sb3JTdG9wcykge1xuICAgICAgICAgICAgdmFyIGN0eCA9IGdldER1bW15Q29udGV4dCgpO1xuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5maWxsUmFkaWFsR3JhZGllbnRTdGFydFBvaW50KCk7XG4gICAgICAgICAgICB2YXIgZW5kID0gdGhpcy5maWxsUmFkaWFsR3JhZGllbnRFbmRQb2ludCgpO1xuICAgICAgICAgICAgdmFyIGdyZCA9IGN0eC5jcmVhdGVSYWRpYWxHcmFkaWVudChzdGFydC54LCBzdGFydC55LCB0aGlzLmZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UmFkaXVzKCksIGVuZC54LCBlbmQueSwgdGhpcy5maWxsUmFkaWFsR3JhZGllbnRFbmRSYWRpdXMoKSk7XG4gICAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGNvbG9yU3RvcHMubGVuZ3RoOyBuICs9IDIpIHtcbiAgICAgICAgICAgICAgICBncmQuYWRkQ29sb3JTdG9wKGNvbG9yU3RvcHNbbl0sIGNvbG9yU3RvcHNbbiArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBncmQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5nZXRTaGFkb3dSR0JBID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUoU0hBRE9XX1JHQkEsIHRoaXMuX2dldFNoYWRvd1JHQkEpO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLl9nZXRTaGFkb3dSR0JBID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNTaGFkb3coKSkge1xuICAgICAgICAgICAgdmFyIHJnYmEgPSBVdGlsXzEuVXRpbC5jb2xvclRvUkdCQSh0aGlzLnNoYWRvd0NvbG9yKCkpO1xuICAgICAgICAgICAgcmV0dXJuICgncmdiYSgnICtcbiAgICAgICAgICAgICAgICByZ2JhLnIgK1xuICAgICAgICAgICAgICAgICcsJyArXG4gICAgICAgICAgICAgICAgcmdiYS5nICtcbiAgICAgICAgICAgICAgICAnLCcgK1xuICAgICAgICAgICAgICAgIHJnYmEuYiArXG4gICAgICAgICAgICAgICAgJywnICtcbiAgICAgICAgICAgICAgICByZ2JhLmEgKiAodGhpcy5zaGFkb3dPcGFjaXR5KCkgfHwgMSkgK1xuICAgICAgICAgICAgICAgICcpJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5oYXNGaWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gISEodGhpcy5maWxsKCkgfHxcbiAgICAgICAgICAgIHRoaXMuZmlsbFBhdHRlcm5JbWFnZSgpIHx8XG4gICAgICAgICAgICB0aGlzLmZpbGxMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMoKSB8fFxuICAgICAgICAgICAgdGhpcy5maWxsUmFkaWFsR3JhZGllbnRDb2xvclN0b3BzKCkpO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLmhhc1N0cm9rZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnN0cm9rZUVuYWJsZWQoKSAmJlxuICAgICAgICAgICAgdGhpcy5zdHJva2VXaWR0aCgpICYmXG4gICAgICAgICAgICAhISh0aGlzLnN0cm9rZSgpIHx8IHRoaXMuc3Ryb2tlTGluZWFyR3JhZGllbnRDb2xvclN0b3BzKCkpKTtcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5pbnRlcnNlY3RzID0gZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgIHZhciBzdGFnZSA9IHRoaXMuZ2V0U3RhZ2UoKSwgYnVmZmVySGl0Q2FudmFzID0gc3RhZ2UuYnVmZmVySGl0Q2FudmFzLCBwO1xuICAgICAgICBidWZmZXJIaXRDYW52YXMuZ2V0Q29udGV4dCgpLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuZHJhd0hpdChidWZmZXJIaXRDYW52YXMpO1xuICAgICAgICBwID0gYnVmZmVySGl0Q2FudmFzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKE1hdGgucm91bmQocG9pbnQueCksIE1hdGgucm91bmQocG9pbnQueSksIDEsIDEpLmRhdGE7XG4gICAgICAgIHJldHVybiBwWzNdID4gMDtcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBOb2RlXzEuTm9kZS5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xuICAgICAgICBkZWxldGUgZXhwb3J0cy5zaGFwZXNbdGhpcy5jb2xvcktleV07XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvbG9yS2V5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5fdXNlQnVmZmVyQ2FudmFzID0gZnVuY3Rpb24gKGNhY2hpbmcpIHtcbiAgICAgICAgcmV0dXJuICgoIWNhY2hpbmcgfHwgdGhpcy5oYXNTaGFkb3coKSkgJiZcbiAgICAgICAgICAgIHRoaXMucGVyZmVjdERyYXdFbmFibGVkKCkgJiZcbiAgICAgICAgICAgIHRoaXMuZ2V0QWJzb2x1dGVPcGFjaXR5KCkgIT09IDEgJiZcbiAgICAgICAgICAgIHRoaXMuaGFzRmlsbCgpICYmXG4gICAgICAgICAgICB0aGlzLmhhc1N0cm9rZSgpICYmXG4gICAgICAgICAgICB0aGlzLmdldFN0YWdlKCkpO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLnNldFN0cm9rZUhpdEVuYWJsZWQgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuaGl0U3Ryb2tlV2lkdGgoJ2F1dG8nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGl0U3Ryb2tlV2lkdGgoMCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5nZXRTdHJva2VIaXRFbmFibGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5oaXRTdHJva2VXaWR0aCgpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLmdldFNlbGZSZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZSgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy5fY2VudHJvaWQgPyBNYXRoLnJvdW5kKC1zaXplLndpZHRoIC8gMikgOiAwLFxuICAgICAgICAgICAgeTogdGhpcy5fY2VudHJvaWQgPyBNYXRoLnJvdW5kKC1zaXplLmhlaWdodCAvIDIpIDogMCxcbiAgICAgICAgICAgIHdpZHRoOiBzaXplLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBzaXplLmhlaWdodFxuICAgICAgICB9O1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLmdldENsaWVudFJlY3QgPSBmdW5jdGlvbiAoYXR0cnMpIHtcbiAgICAgICAgYXR0cnMgPSBhdHRycyB8fCB7fTtcbiAgICAgICAgdmFyIHNraXBUcmFuc2Zvcm0gPSBhdHRycy5za2lwVHJhbnNmb3JtO1xuICAgICAgICB2YXIgcmVsYXRpdmVUbyA9IGF0dHJzLnJlbGF0aXZlVG87XG4gICAgICAgIHZhciBmaWxsUmVjdCA9IHRoaXMuZ2V0U2VsZlJlY3QoKTtcbiAgICAgICAgdmFyIGFwcGx5U3Ryb2tlID0gIWF0dHJzLnNraXBTdHJva2UgJiYgdGhpcy5oYXNTdHJva2UoKTtcbiAgICAgICAgdmFyIHN0cm9rZVdpZHRoID0gKGFwcGx5U3Ryb2tlICYmIHRoaXMuc3Ryb2tlV2lkdGgoKSkgfHwgMDtcbiAgICAgICAgdmFyIGZpbGxBbmRTdHJva2VXaWR0aCA9IGZpbGxSZWN0LndpZHRoICsgc3Ryb2tlV2lkdGg7XG4gICAgICAgIHZhciBmaWxsQW5kU3Ryb2tlSGVpZ2h0ID0gZmlsbFJlY3QuaGVpZ2h0ICsgc3Ryb2tlV2lkdGg7XG4gICAgICAgIHZhciBhcHBseVNoYWRvdyA9ICFhdHRycy5za2lwU2hhZG93ICYmIHRoaXMuaGFzU2hhZG93KCk7XG4gICAgICAgIHZhciBzaGFkb3dPZmZzZXRYID0gYXBwbHlTaGFkb3cgPyB0aGlzLnNoYWRvd09mZnNldFgoKSA6IDA7XG4gICAgICAgIHZhciBzaGFkb3dPZmZzZXRZID0gYXBwbHlTaGFkb3cgPyB0aGlzLnNoYWRvd09mZnNldFkoKSA6IDA7XG4gICAgICAgIHZhciBwcmVXaWR0aCA9IGZpbGxBbmRTdHJva2VXaWR0aCArIE1hdGguYWJzKHNoYWRvd09mZnNldFgpO1xuICAgICAgICB2YXIgcHJlSGVpZ2h0ID0gZmlsbEFuZFN0cm9rZUhlaWdodCArIE1hdGguYWJzKHNoYWRvd09mZnNldFkpO1xuICAgICAgICB2YXIgYmx1clJhZGl1cyA9IChhcHBseVNoYWRvdyAmJiB0aGlzLnNoYWRvd0JsdXIoKSkgfHwgMDtcbiAgICAgICAgdmFyIHdpZHRoID0gcHJlV2lkdGggKyBibHVyUmFkaXVzICogMjtcbiAgICAgICAgdmFyIGhlaWdodCA9IHByZUhlaWdodCArIGJsdXJSYWRpdXMgKiAyO1xuICAgICAgICB2YXIgcm91bmRpbmdPZmZzZXQgPSAwO1xuICAgICAgICBpZiAoTWF0aC5yb3VuZChzdHJva2VXaWR0aCAvIDIpICE9PSBzdHJva2VXaWR0aCAvIDIpIHtcbiAgICAgICAgICAgIHJvdW5kaW5nT2Zmc2V0ID0gMTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVjdCA9IHtcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCArIHJvdW5kaW5nT2Zmc2V0LFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQgKyByb3VuZGluZ09mZnNldCxcbiAgICAgICAgICAgIHg6IC1NYXRoLnJvdW5kKHN0cm9rZVdpZHRoIC8gMiArIGJsdXJSYWRpdXMpICtcbiAgICAgICAgICAgICAgICBNYXRoLm1pbihzaGFkb3dPZmZzZXRYLCAwKSArXG4gICAgICAgICAgICAgICAgZmlsbFJlY3QueCxcbiAgICAgICAgICAgIHk6IC1NYXRoLnJvdW5kKHN0cm9rZVdpZHRoIC8gMiArIGJsdXJSYWRpdXMpICtcbiAgICAgICAgICAgICAgICBNYXRoLm1pbihzaGFkb3dPZmZzZXRZLCAwKSArXG4gICAgICAgICAgICAgICAgZmlsbFJlY3QueVxuICAgICAgICB9O1xuICAgICAgICBpZiAoIXNraXBUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1lZFJlY3QocmVjdCwgcmVsYXRpdmVUbyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY3Q7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuZHJhd1NjZW5lID0gZnVuY3Rpb24gKGNhbiwgdG9wLCBjYWNoaW5nLCBza2lwQnVmZmVyKSB7XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKSwgY2FudmFzID0gY2FuIHx8IGxheWVyLmdldENhbnZhcygpLCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoKSwgY2FjaGVkQ2FudmFzID0gdGhpcy5fZ2V0Q2FudmFzQ2FjaGUoKSwgZHJhd0Z1bmMgPSB0aGlzLnNjZW5lRnVuYygpLCBoYXNTaGFkb3cgPSB0aGlzLmhhc1NoYWRvdygpLCBoYXNTdHJva2UgPSB0aGlzLmhhc1N0cm9rZSgpLCBzdGFnZSwgYnVmZmVyQ2FudmFzLCBidWZmZXJDb250ZXh0O1xuICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKCkgJiYgIWNhY2hpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYWNoZWRDYW52YXMpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgbGF5ZXIuX2FwcGx5VHJhbnNmb3JtKHRoaXMsIGNvbnRleHQsIHRvcCk7XG4gICAgICAgICAgICB0aGlzLl9kcmF3Q2FjaGVkU2NlbmVDYW52YXMoY29udGV4dCk7XG4gICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZHJhd0Z1bmMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBpZiAodGhpcy5fdXNlQnVmZmVyQ2FudmFzKGNhY2hpbmcpICYmICFza2lwQnVmZmVyKSB7XG4gICAgICAgICAgICBzdGFnZSA9IHRoaXMuZ2V0U3RhZ2UoKTtcbiAgICAgICAgICAgIGJ1ZmZlckNhbnZhcyA9IHN0YWdlLmJ1ZmZlckNhbnZhcztcbiAgICAgICAgICAgIGJ1ZmZlckNvbnRleHQgPSBidWZmZXJDYW52YXMuZ2V0Q29udGV4dCgpO1xuICAgICAgICAgICAgYnVmZmVyQ29udGV4dC5jbGVhcigpO1xuICAgICAgICAgICAgYnVmZmVyQ29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICBidWZmZXJDb250ZXh0Ll9hcHBseUxpbmVKb2luKHRoaXMpO1xuICAgICAgICAgICAgaWYgKCFjYWNoaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyLl9hcHBseVRyYW5zZm9ybSh0aGlzLCBidWZmZXJDb250ZXh0LCB0b3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG0gPSB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKHRvcCkuZ2V0TWF0cml4KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQudHJhbnNmb3JtKG1bMF0sIG1bMV0sIG1bMl0sIG1bM10sIG1bNF0sIG1bNV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRyYXdGdW5jLmNhbGwodGhpcywgYnVmZmVyQ29udGV4dCwgdGhpcyk7XG4gICAgICAgICAgICBidWZmZXJDb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgICAgIHZhciByYXRpbyA9IGJ1ZmZlckNhbnZhcy5waXhlbFJhdGlvO1xuICAgICAgICAgICAgaWYgKGhhc1NoYWRvdyAmJiAhY2FudmFzLmhpdENhbnZhcykge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5U2hhZG93KHRoaXMpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5T3BhY2l0eSh0aGlzKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0Ll9hcHBseUdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbih0aGlzKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShidWZmZXJDYW52YXMuX2NhbnZhcywgMCwgMCwgYnVmZmVyQ2FudmFzLndpZHRoIC8gcmF0aW8sIGJ1ZmZlckNhbnZhcy5oZWlnaHQgLyByYXRpbyk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0Ll9hcHBseU9wYWNpdHkodGhpcyk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlHbG9iYWxDb21wb3NpdGVPcGVyYXRpb24odGhpcyk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoYnVmZmVyQ2FudmFzLl9jYW52YXMsIDAsIDAsIGJ1ZmZlckNhbnZhcy53aWR0aCAvIHJhdGlvLCBidWZmZXJDYW52YXMuaGVpZ2h0IC8gcmF0aW8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5fYXBwbHlMaW5lSm9pbih0aGlzKTtcbiAgICAgICAgICAgIGlmICghY2FjaGluZykge1xuICAgICAgICAgICAgICAgIGlmIChsYXllcikge1xuICAgICAgICAgICAgICAgICAgICBsYXllci5fYXBwbHlUcmFuc2Zvcm0odGhpcywgY29udGV4dCwgdG9wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvID0gdGhpcy5nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApLmdldE1hdHJpeCgpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnRyYW5zZm9ybShvWzBdLCBvWzFdLCBvWzJdLCBvWzNdLCBvWzRdLCBvWzVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFzU2hhZG93ICYmIGhhc1N0cm9rZSAmJiAhY2FudmFzLmhpdENhbnZhcykge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgICAgIGlmICghY2FjaGluZykge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Ll9hcHBseU9wYWNpdHkodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5R2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250ZXh0Ll9hcHBseVNoYWRvdyh0aGlzKTtcbiAgICAgICAgICAgICAgICBkcmF3RnVuYy5jYWxsKHRoaXMsIGNvbnRleHQsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhc0ZpbGwoKSAmJiB0aGlzLnNoYWRvd0ZvclN0cm9rZUVuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICBkcmF3RnVuYy5jYWxsKHRoaXMsIGNvbnRleHQsIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGhhc1NoYWRvdyAmJiAhY2FudmFzLmhpdENhbnZhcykge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgICAgIGlmICghY2FjaGluZykge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Ll9hcHBseU9wYWNpdHkodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5R2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250ZXh0Ll9hcHBseVNoYWRvdyh0aGlzKTtcbiAgICAgICAgICAgICAgICBkcmF3RnVuYy5jYWxsKHRoaXMsIGNvbnRleHQsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjYWNoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5T3BhY2l0eSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlHbG9iYWxDb21wb3NpdGVPcGVyYXRpb24odGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRyYXdGdW5jLmNhbGwodGhpcywgY29udGV4dCwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLmRyYXdIaXQgPSBmdW5jdGlvbiAoY2FuLCB0b3AsIGNhY2hpbmcpIHtcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpLCBjYW52YXMgPSBjYW4gfHwgbGF5ZXIuaGl0Q2FudmFzLCBjb250ZXh0ID0gY2FudmFzICYmIGNhbnZhcy5nZXRDb250ZXh0KCksIGRyYXdGdW5jID0gdGhpcy5oaXRGdW5jKCkgfHwgdGhpcy5zY2VuZUZ1bmMoKSwgY2FjaGVkQ2FudmFzID0gdGhpcy5fZ2V0Q2FudmFzQ2FjaGUoKSwgY2FjaGVkSGl0Q2FudmFzID0gY2FjaGVkQ2FudmFzICYmIGNhY2hlZENhbnZhcy5oaXQ7XG4gICAgICAgIGlmICghdGhpcy5jb2xvcktleSkge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybignTG9va3MgbGlrZSB5b3VyIGNhbnZhcyBoYXMgYSBkZXN0cm95ZWQgc2hhcGUgaW4gaXQuIERvIG5vdCByZXVzZSBzaGFwZSBhZnRlciB5b3UgZGVzdHJveWVkIGl0LiBTZWUgdGhlIHNoYXBlIGluIGxvZ3MgYWJvdmUuIElmIHlvdSB3YW50IHRvIHJldXNlIHNoYXBlIHlvdSBzaG91bGQgY2FsbCByZW1vdmUoKSBpbnN0ZWFkIG9mIGRlc3Ryb3koKScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zaG91bGREcmF3SGl0KCkgJiYgIWNhY2hpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYWNoZWRIaXRDYW52YXMpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgbGF5ZXIuX2FwcGx5VHJhbnNmb3JtKHRoaXMsIGNvbnRleHQsIHRvcCk7XG4gICAgICAgICAgICB0aGlzLl9kcmF3Q2FjaGVkSGl0Q2FudmFzKGNvbnRleHQpO1xuICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRyYXdGdW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC5fYXBwbHlMaW5lSm9pbih0aGlzKTtcbiAgICAgICAgaWYgKCFjYWNoaW5nKSB7XG4gICAgICAgICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgICAgICAgICBsYXllci5fYXBwbHlUcmFuc2Zvcm0odGhpcywgY29udGV4dCwgdG9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBvID0gdGhpcy5nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApLmdldE1hdHJpeCgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQudHJhbnNmb3JtKG9bMF0sIG9bMV0sIG9bMl0sIG9bM10sIG9bNF0sIG9bNV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRyYXdGdW5jLmNhbGwodGhpcywgY29udGV4dCwgdGhpcyk7XG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5kcmF3SGl0RnJvbUNhY2hlID0gZnVuY3Rpb24gKGFscGhhVGhyZXNob2xkKSB7XG4gICAgICAgIHZhciB0aHJlc2hvbGQgPSBhbHBoYVRocmVzaG9sZCB8fCAwLCBjYWNoZWRDYW52YXMgPSB0aGlzLl9nZXRDYW52YXNDYWNoZSgpLCBzY2VuZUNhbnZhcyA9IHRoaXMuX2dldENhY2hlZFNjZW5lQ2FudmFzKCksIGhpdENhbnZhcyA9IGNhY2hlZENhbnZhcy5oaXQsIGhpdENvbnRleHQgPSBoaXRDYW52YXMuZ2V0Q29udGV4dCgpLCBoaXRXaWR0aCA9IGhpdENhbnZhcy5nZXRXaWR0aCgpLCBoaXRIZWlnaHQgPSBoaXRDYW52YXMuZ2V0SGVpZ2h0KCksIGhpdEltYWdlRGF0YSwgaGl0RGF0YSwgbGVuLCByZ2JDb2xvcktleSwgaSwgYWxwaGE7XG4gICAgICAgIGhpdENvbnRleHQuY2xlYXIoKTtcbiAgICAgICAgaGl0Q29udGV4dC5kcmF3SW1hZ2Uoc2NlbmVDYW52YXMuX2NhbnZhcywgMCwgMCwgaGl0V2lkdGgsIGhpdEhlaWdodCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBoaXRJbWFnZURhdGEgPSBoaXRDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBoaXRXaWR0aCwgaGl0SGVpZ2h0KTtcbiAgICAgICAgICAgIGhpdERhdGEgPSBoaXRJbWFnZURhdGEuZGF0YTtcbiAgICAgICAgICAgIGxlbiA9IGhpdERhdGEubGVuZ3RoO1xuICAgICAgICAgICAgcmdiQ29sb3JLZXkgPSBVdGlsXzEuVXRpbC5faGV4VG9SZ2IodGhpcy5jb2xvcktleSk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICAgICAgICAgICAgICBhbHBoYSA9IGhpdERhdGFbaSArIDNdO1xuICAgICAgICAgICAgICAgIGlmIChhbHBoYSA+IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICBoaXREYXRhW2ldID0gcmdiQ29sb3JLZXkucjtcbiAgICAgICAgICAgICAgICAgICAgaGl0RGF0YVtpICsgMV0gPSByZ2JDb2xvcktleS5nO1xuICAgICAgICAgICAgICAgICAgICBoaXREYXRhW2kgKyAyXSA9IHJnYkNvbG9yS2V5LmI7XG4gICAgICAgICAgICAgICAgICAgIGhpdERhdGFbaSArIDNdID0gMjU1O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGl0RGF0YVtpICsgM10gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhpdENvbnRleHQucHV0SW1hZ2VEYXRhKGhpdEltYWdlRGF0YSwgMCwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLmVycm9yKCdVbmFibGUgdG8gZHJhdyBoaXQgZ3JhcGggZnJvbSBjYWNoZWQgc2NlbmUgY2FudmFzLiAnICsgZS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBTaGFwZTtcbn0oTm9kZV8xLk5vZGUpKTtcbmV4cG9ydHMuU2hhcGUgPSBTaGFwZTtcblNoYXBlLnByb3RvdHlwZS5fZmlsbEZ1bmMgPSBfZmlsbEZ1bmM7XG5TaGFwZS5wcm90b3R5cGUuX3N0cm9rZUZ1bmMgPSBfc3Ryb2tlRnVuYztcblNoYXBlLnByb3RvdHlwZS5fZmlsbEZ1bmNIaXQgPSBfZmlsbEZ1bmNIaXQ7XG5TaGFwZS5wcm90b3R5cGUuX3N0cm9rZUZ1bmNIaXQgPSBfc3Ryb2tlRnVuY0hpdDtcblNoYXBlLnByb3RvdHlwZS5fY2VudHJvaWQgPSBmYWxzZTtcblNoYXBlLnByb3RvdHlwZS5ub2RlVHlwZSA9ICdTaGFwZSc7XG5HbG9iYWxfMS5fcmVnaXN0ZXJOb2RlKFNoYXBlKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZScsIHVuZGVmaW5lZCwgVmFsaWRhdG9yc18xLmdldFN0cmluZ1ZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZVdpZHRoJywgMiwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2hpdFN0cm9rZVdpZHRoJywgJ2F1dG8nLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyT3JBdXRvVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlSGl0RW5hYmxlZCcsIHRydWUsIFZhbGlkYXRvcnNfMS5nZXRCb29sZWFuVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAncGVyZmVjdERyYXdFbmFibGVkJywgdHJ1ZSwgVmFsaWRhdG9yc18xLmdldEJvb2xlYW5WYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzaGFkb3dGb3JTdHJva2VFbmFibGVkJywgdHJ1ZSwgVmFsaWRhdG9yc18xLmdldEJvb2xlYW5WYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdsaW5lSm9pbicpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnbGluZUNhcCcpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc2NlbmVGdW5jJyk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdoaXRGdW5jJyk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdkYXNoJyk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdkYXNoT2Zmc2V0JywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3NoYWRvd0NvbG9yJywgdW5kZWZpbmVkLCBWYWxpZGF0b3JzXzEuZ2V0U3RyaW5nVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc2hhZG93Qmx1cicsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzaGFkb3dPcGFjaXR5JywgMSwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzaGFkb3dPZmZzZXQnLCBbJ3gnLCAneSddKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3NoYWRvd09mZnNldFgnLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc2hhZG93T2Zmc2V0WScsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVybkltYWdlJyk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsJywgdW5kZWZpbmVkLCBWYWxpZGF0b3JzXzEuZ2V0U3RyaW5nVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5YJywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuWScsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsTGluZWFyR3JhZGllbnRDb2xvclN0b3BzJyk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMnKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UmFkaXVzJywgMCk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUmFkaWFsR3JhZGllbnRFbmRSYWRpdXMnLCAwKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudENvbG9yU3RvcHMnKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuUmVwZWF0JywgJ3JlcGVhdCcpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbEVuYWJsZWQnLCB0cnVlKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZUVuYWJsZWQnLCB0cnVlKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3NoYWRvd0VuYWJsZWQnLCB0cnVlKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2Rhc2hFbmFibGVkJywgdHJ1ZSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VTY2FsZUVuYWJsZWQnLCB0cnVlKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQcmlvcml0eScsICdjb2xvcicpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuT2Zmc2V0JywgWyd4JywgJ3knXSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVybk9mZnNldFgnLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5PZmZzZXRZJywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVyblNjYWxlJywgWyd4JywgJ3knXSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVyblNjYWxlWCcsIDEsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVyblNjYWxlWScsIDEsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbExpbmVhckdyYWRpZW50U3RhcnRQb2ludCcsIFtcbiAgICAneCcsXG4gICAgJ3knXG5dKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnQnLCBbXG4gICAgJ3gnLFxuICAgICd5J1xuXSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsTGluZWFyR3JhZGllbnRTdGFydFBvaW50WCcsIDApO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlTGluZWFyR3JhZGllbnRTdGFydFBvaW50WCcsIDApO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbExpbmVhckdyYWRpZW50U3RhcnRQb2ludFknLCAwKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZUxpbmVhckdyYWRpZW50U3RhcnRQb2ludFknLCAwKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsTGluZWFyR3JhZGllbnRFbmRQb2ludCcsIFtcbiAgICAneCcsXG4gICAgJ3knXG5dKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VMaW5lYXJHcmFkaWVudEVuZFBvaW50JywgW1xuICAgICd4JyxcbiAgICAneSdcbl0pO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbExpbmVhckdyYWRpZW50RW5kUG9pbnRYJywgMCk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VMaW5lYXJHcmFkaWVudEVuZFBvaW50WCcsIDApO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbExpbmVhckdyYWRpZW50RW5kUG9pbnRZJywgMCk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VMaW5lYXJHcmFkaWVudEVuZFBvaW50WScsIDApO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UG9pbnQnLCBbXG4gICAgJ3gnLFxuICAgICd5J1xuXSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUmFkaWFsR3JhZGllbnRTdGFydFBvaW50WCcsIDApO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRQb2ludFknLCAwKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUmFkaWFsR3JhZGllbnRFbmRQb2ludCcsIFtcbiAgICAneCcsXG4gICAgJ3knXG5dKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudEVuZFBvaW50WCcsIDApO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFJhZGlhbEdyYWRpZW50RW5kUG9pbnRZJywgMCk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVyblJvdGF0aW9uJywgMCk7XG5GYWN0b3J5XzEuRmFjdG9yeS5iYWNrQ29tcGF0KFNoYXBlLCB7XG4gICAgZGFzaEFycmF5OiAnZGFzaCcsXG4gICAgZ2V0RGFzaEFycmF5OiAnZ2V0RGFzaCcsXG4gICAgc2V0RGFzaEFycmF5OiAnZ2V0RGFzaCcsXG4gICAgZHJhd0Z1bmM6ICdzY2VuZUZ1bmMnLFxuICAgIGdldERyYXdGdW5jOiAnZ2V0U2NlbmVGdW5jJyxcbiAgICBzZXREcmF3RnVuYzogJ3NldFNjZW5lRnVuYycsXG4gICAgZHJhd0hpdEZ1bmM6ICdoaXRGdW5jJyxcbiAgICBnZXREcmF3SGl0RnVuYzogJ2dldEhpdEZ1bmMnLFxuICAgIHNldERyYXdIaXRGdW5jOiAnc2V0SGl0RnVuYydcbn0pO1xuVXRpbF8xLkNvbGxlY3Rpb24ubWFwTWV0aG9kcyhTaGFwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFV0aWxfMSA9IHJlcXVpcmUoXCIuL1V0aWxcIik7XG52YXIgRmFjdG9yeV8xID0gcmVxdWlyZShcIi4vRmFjdG9yeVwiKTtcbnZhciBDb250YWluZXJfMSA9IHJlcXVpcmUoXCIuL0NvbnRhaW5lclwiKTtcbnZhciBHbG9iYWxfMSA9IHJlcXVpcmUoXCIuL0dsb2JhbFwiKTtcbnZhciBDYW52YXNfMSA9IHJlcXVpcmUoXCIuL0NhbnZhc1wiKTtcbnZhciBEcmFnQW5kRHJvcF8xID0gcmVxdWlyZShcIi4vRHJhZ0FuZERyb3BcIik7XG52YXIgR2xvYmFsXzIgPSByZXF1aXJlKFwiLi9HbG9iYWxcIik7XG52YXIgU1RBR0UgPSAnU3RhZ2UnLCBTVFJJTkcgPSAnc3RyaW5nJywgUFggPSAncHgnLCBNT1VTRU9VVCA9ICdtb3VzZW91dCcsIE1PVVNFTEVBVkUgPSAnbW91c2VsZWF2ZScsIE1PVVNFT1ZFUiA9ICdtb3VzZW92ZXInLCBNT1VTRUVOVEVSID0gJ21vdXNlZW50ZXInLCBNT1VTRU1PVkUgPSAnbW91c2Vtb3ZlJywgTU9VU0VET1dOID0gJ21vdXNlZG93bicsIE1PVVNFVVAgPSAnbW91c2V1cCcsIENPTlRFWFRNRU5VID0gJ2NvbnRleHRtZW51JywgQ0xJQ0sgPSAnY2xpY2snLCBEQkxfQ0xJQ0sgPSAnZGJsY2xpY2snLCBUT1VDSFNUQVJUID0gJ3RvdWNoc3RhcnQnLCBUT1VDSEVORCA9ICd0b3VjaGVuZCcsIFRBUCA9ICd0YXAnLCBEQkxfVEFQID0gJ2RibHRhcCcsIFRPVUNITU9WRSA9ICd0b3VjaG1vdmUnLCBXSEVFTCA9ICd3aGVlbCcsIENPTlRFTlRfTU9VU0VPVVQgPSAnY29udGVudE1vdXNlb3V0JywgQ09OVEVOVF9NT1VTRU9WRVIgPSAnY29udGVudE1vdXNlb3ZlcicsIENPTlRFTlRfTU9VU0VNT1ZFID0gJ2NvbnRlbnRNb3VzZW1vdmUnLCBDT05URU5UX01PVVNFRE9XTiA9ICdjb250ZW50TW91c2Vkb3duJywgQ09OVEVOVF9NT1VTRVVQID0gJ2NvbnRlbnRNb3VzZXVwJywgQ09OVEVOVF9DT05URVhUTUVOVSA9ICdjb250ZW50Q29udGV4dG1lbnUnLCBDT05URU5UX0NMSUNLID0gJ2NvbnRlbnRDbGljaycsIENPTlRFTlRfREJMX0NMSUNLID0gJ2NvbnRlbnREYmxjbGljaycsIENPTlRFTlRfVE9VQ0hTVEFSVCA9ICdjb250ZW50VG91Y2hzdGFydCcsIENPTlRFTlRfVE9VQ0hFTkQgPSAnY29udGVudFRvdWNoZW5kJywgQ09OVEVOVF9EQkxfVEFQID0gJ2NvbnRlbnREYmx0YXAnLCBDT05URU5UX1RBUCA9ICdjb250ZW50VGFwJywgQ09OVEVOVF9UT1VDSE1PVkUgPSAnY29udGVudFRvdWNobW92ZScsIENPTlRFTlRfV0hFRUwgPSAnY29udGVudFdoZWVsJywgUkVMQVRJVkUgPSAncmVsYXRpdmUnLCBLT05WQV9DT05URU5UID0gJ2tvbnZhanMtY29udGVudCcsIFNQQUNFID0gJyAnLCBVTkRFUlNDT1JFID0gJ18nLCBDT05UQUlORVIgPSAnY29udGFpbmVyJywgTUFYX0xBWUVSU19OVU1CRVIgPSA1LCBFTVBUWV9TVFJJTkcgPSAnJywgRVZFTlRTID0gW1xuICAgIE1PVVNFRU5URVIsXG4gICAgTU9VU0VET1dOLFxuICAgIE1PVVNFTU9WRSxcbiAgICBNT1VTRVVQLFxuICAgIE1PVVNFT1VULFxuICAgIFRPVUNIU1RBUlQsXG4gICAgVE9VQ0hNT1ZFLFxuICAgIFRPVUNIRU5ELFxuICAgIE1PVVNFT1ZFUixcbiAgICBXSEVFTCxcbiAgICBDT05URVhUTUVOVVxuXSwgZXZlbnRzTGVuZ3RoID0gRVZFTlRTLmxlbmd0aDtcbmZ1bmN0aW9uIGFkZEV2ZW50KGN0eCwgZXZlbnROYW1lKSB7XG4gICAgY3R4LmNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgY3R4W1VOREVSU0NPUkUgKyBldmVudE5hbWVdKGV2dCk7XG4gICAgfSwgZmFsc2UpO1xufVxudmFyIE5PX1BPSU5URVJTX01FU1NBR0UgPSBcIlBvaW50ZXIgcG9zaXRpb24gaXMgbWlzc2luZyBhbmQgbm90IHJlZ2lzdGVyZWQgYnkgdGhlIHN0YWdlLiBMb29rcyBsaWtlIGl0IGlzIG91dHNpZGUgb2YgdGhlIHN0YWdlIGNvbnRhaW5lci4gWW91IGNhbiBzZXQgaXQgbWFudWFsbHkgZnJvbSBldmVudDogc3RhZ2Uuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZlbnQpO1wiO1xuZXhwb3J0cy5zdGFnZXMgPSBbXTtcbmZ1bmN0aW9uIGNoZWNrTm9DbGlwKGF0dHJzKSB7XG4gICAgaWYgKGF0dHJzID09PSB2b2lkIDApIHsgYXR0cnMgPSB7fTsgfVxuICAgIGlmIChhdHRycy5jbGlwRnVuYyB8fCBhdHRycy5jbGlwV2lkdGggfHwgYXR0cnMuY2xpcEhlaWdodCkge1xuICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdTdGFnZSBkb2VzIG5vdCBzdXBwb3J0IGNsaXBwaW5nLiBQbGVhc2UgdXNlIGNsaXAgZm9yIExheWVycyBvciBHcm91cHMuJyk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbn1cbnZhciBTdGFnZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN0YWdlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN0YWdlKGNvbmZpZykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjaGVja05vQ2xpcChjb25maWcpKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fYnVpbGRET00oKTtcbiAgICAgICAgX3RoaXMuX2JpbmRDb250ZW50RXZlbnRzKCk7XG4gICAgICAgIGV4cG9ydHMuc3RhZ2VzLnB1c2goX3RoaXMpO1xuICAgICAgICBfdGhpcy5vbignd2lkdGhDaGFuZ2Uua29udmEgaGVpZ2h0Q2hhbmdlLmtvbnZhJywgX3RoaXMuX3Jlc2l6ZURPTSk7XG4gICAgICAgIF90aGlzLm9uKCd2aXNpYmxlQ2hhbmdlLmtvbnZhJywgX3RoaXMuX2NoZWNrVmlzaWJpbGl0eSk7XG4gICAgICAgIF90aGlzLm9uKCdjbGlwV2lkdGhDaGFuZ2Uua29udmEgY2xpcEhlaWdodENoYW5nZS5rb252YSBjbGlwRnVuY0NoYW5nZS5rb252YScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoZWNrTm9DbGlwKF90aGlzLmF0dHJzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIF90aGlzLl9jaGVja1Zpc2liaWxpdHkoKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTdGFnZS5wcm90b3R5cGUuX3ZhbGlkYXRlQWRkID0gZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgIHZhciBpc0xheWVyID0gY2hpbGQuZ2V0VHlwZSgpID09PSAnTGF5ZXInO1xuICAgICAgICB2YXIgaXNGYXN0TGF5ZXIgPSBjaGlsZC5nZXRUeXBlKCkgPT09ICdGYXN0TGF5ZXInO1xuICAgICAgICB2YXIgdmFsaWQgPSBpc0xheWVyIHx8IGlzRmFzdExheWVyO1xuICAgICAgICBpZiAoIXZhbGlkKSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC50aHJvdygnWW91IG1heSBvbmx5IGFkZCBsYXllcnMgdG8gdGhlIHN0YWdlLicpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX2NoZWNrVmlzaWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0eWxlID0gdGhpcy52aXNpYmxlKCkgPyAnJyA6ICdub25lJztcbiAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLmRpc3BsYXkgPSBzdHlsZTtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5zZXRDb250YWluZXIgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29udGFpbmVyID09PSBTVFJJTkcpIHtcbiAgICAgICAgICAgIGlmIChjb250YWluZXIuY2hhckF0KDApID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gY29udGFpbmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBpZDtcbiAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyLmNoYXJBdCgwKSAhPT0gJyMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkID0gY29udGFpbmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBjb250YWluZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ0NhbiBub3QgZmluZCBjb250YWluZXIgaW4gZG9jdW1lbnQgd2l0aCBpZCAnICsgaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0QXR0cihDT05UQUlORVIsIGNvbnRhaW5lcik7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuY29udGVudCk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5zaG91bGREcmF3SGl0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxheWVycyA9IHRoaXMuY2hpbGRyZW4sIGxlbiA9IGxheWVycy5sZW5ndGgsIG47XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgbGF5ZXJzW25dLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBvYmouY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHJldHVybiBDb250YWluZXJfMS5Db250YWluZXIucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgb2JqKTtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcbiAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLmNvbnRlbnQ7XG4gICAgICAgIGlmIChjb250ZW50ICYmIFV0aWxfMS5VdGlsLl9pc0luRG9jdW1lbnQoY29udGVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyKCkucmVtb3ZlQ2hpbGQoY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gZXhwb3J0cy5zdGFnZXMuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIGV4cG9ydHMuc3RhZ2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuZ2V0UG9pbnRlclBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucG9pbnRlclBvcykge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybihOT19QT0lOVEVSU19NRVNTQUdFKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wb2ludGVyUG9zO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLmdldFN0YWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5nZXRDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50O1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl90b0tvbnZhQ2FudmFzID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICAgIHZhciB4ID0gY29uZmlnLnggfHwgMCwgeSA9IGNvbmZpZy55IHx8IDAsIGNhbnZhcyA9IG5ldyBDYW52YXNfMS5TY2VuZUNhbnZhcyh7XG4gICAgICAgICAgICB3aWR0aDogY29uZmlnLndpZHRoIHx8IHRoaXMud2lkdGgoKSxcbiAgICAgICAgICAgIGhlaWdodDogY29uZmlnLmhlaWdodCB8fCB0aGlzLmhlaWdodCgpLFxuICAgICAgICAgICAgcGl4ZWxSYXRpbzogY29uZmlnLnBpeGVsUmF0aW8gfHwgMVxuICAgICAgICB9KSwgX2NvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgpLl9jb250ZXh0LCBsYXllcnMgPSB0aGlzLmNoaWxkcmVuO1xuICAgICAgICBpZiAoeCB8fCB5KSB7XG4gICAgICAgICAgICBfY29udGV4dC50cmFuc2xhdGUoLTEgKiB4LCAtMSAqIHkpO1xuICAgICAgICB9XG4gICAgICAgIGxheWVycy5lYWNoKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgICAgaWYgKCFsYXllci5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBsYXllckNhbnZhcyA9IGxheWVyLl90b0tvbnZhQ2FudmFzKGNvbmZpZyk7XG4gICAgICAgICAgICBfY29udGV4dC5kcmF3SW1hZ2UobGF5ZXJDYW52YXMuX2NhbnZhcywgeCwgeSwgbGF5ZXJDYW52YXMuZ2V0V2lkdGgoKSAvIGxheWVyQ2FudmFzLmdldFBpeGVsUmF0aW8oKSwgbGF5ZXJDYW52YXMuZ2V0SGVpZ2h0KCkgLyBsYXllckNhbnZhcy5nZXRQaXhlbFJhdGlvKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5nZXRJbnRlcnNlY3Rpb24gPSBmdW5jdGlvbiAocG9zLCBzZWxlY3Rvcikge1xuICAgICAgICB2YXIgbGF5ZXJzID0gdGhpcy5jaGlsZHJlbiwgbGVuID0gbGF5ZXJzLmxlbmd0aCwgZW5kID0gbGVuIC0gMSwgbiwgc2hhcGU7XG4gICAgICAgIGZvciAobiA9IGVuZDsgbiA+PSAwOyBuLS0pIHtcbiAgICAgICAgICAgIHNoYXBlID0gbGF5ZXJzW25dLmdldEludGVyc2VjdGlvbihwb3MsIHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGlmIChzaGFwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaGFwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fcmVzaXplRE9NID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jb250ZW50KSB7XG4gICAgICAgICAgICB2YXIgd2lkdGggPSB0aGlzLndpZHRoKCksIGhlaWdodCA9IHRoaXMuaGVpZ2h0KCksIGxheWVycyA9IHRoaXMuZ2V0Q2hpbGRyZW4oKSwgbGVuID0gbGF5ZXJzLmxlbmd0aCwgbiwgbGF5ZXI7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUud2lkdGggPSB3aWR0aCArIFBYO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLmhlaWdodCA9IGhlaWdodCArIFBYO1xuICAgICAgICAgICAgdGhpcy5idWZmZXJDYW52YXMuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuYnVmZmVySGl0Q2FudmFzLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgICAgICBsYXllciA9IGxheWVyc1tuXTtcbiAgICAgICAgICAgICAgICBsYXllci5zZXRTaXplKHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9KTtcbiAgICAgICAgICAgICAgICBsYXllci5kcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKGFyZ3VtZW50c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmFkZC5jYWxsKHRoaXMsIGxheWVyKTtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBpZiAobGVuZ3RoID4gTUFYX0xBWUVSU19OVU1CRVIpIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ1RoZSBzdGFnZSBoYXMgJyArXG4gICAgICAgICAgICAgICAgbGVuZ3RoICtcbiAgICAgICAgICAgICAgICAnIGxheWVycy4gUmVjb21tZW5kZWQgbWF4aW1pbiBudW1iZXIgb2YgbGF5ZXJzIGlzIDMtNS4gQWRkaW5nIG1vcmUgbGF5ZXJzIGludG8gdGhlIHN0YWdlIG1heSBkcm9wIHRoZSBwZXJmb3JtYW5jZS4gUmV0aGluayB5b3VyIHRyZWUgc3RydWN0dXJlLCB5b3UgY2FuIHVzZSBLb252YS5Hcm91cC4nKTtcbiAgICAgICAgfVxuICAgICAgICBsYXllci5fc2V0Q2FudmFzU2l6ZSh0aGlzLndpZHRoKCksIHRoaXMuaGVpZ2h0KCkpO1xuICAgICAgICBsYXllci5kcmF3KCk7XG4gICAgICAgIGlmIChHbG9iYWxfMS5Lb252YS5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChsYXllci5jYW52YXMuX2NhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuZ2V0UGFyZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5nZXRMYXllciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuZ2V0TGF5ZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDaGlsZHJlbigpO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl9iaW5kQ29udGVudEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFHbG9iYWxfMS5Lb252YS5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGV2ZW50c0xlbmd0aDsgbisrKSB7XG4gICAgICAgICAgICBhZGRFdmVudCh0aGlzLCBFVkVOVFNbbl0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX21vdXNlZW50ZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgdGhpcy5fZmlyZShNT1VTRUVOVEVSLCB7IGV2dDogZXZ0LCB0YXJnZXQ6IHRoaXMsIGN1cnJlbnRUYXJnZXQ6IHRoaXMgfSk7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX21vdXNlb3ZlciA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICB0aGlzLl9maXJlKENPTlRFTlRfTU9VU0VPVkVSLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICB0aGlzLl9maXJlKE1PVVNFT1ZFUiwgeyBldnQ6IGV2dCwgdGFyZ2V0OiB0aGlzLCBjdXJyZW50VGFyZ2V0OiB0aGlzIH0pO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl9tb3VzZW91dCA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICB2YXIgdGFyZ2V0U2hhcGUgPSB0aGlzLnRhcmdldFNoYXBlO1xuICAgICAgICBpZiAodGFyZ2V0U2hhcGUgJiYgIURyYWdBbmREcm9wXzEuREQuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgdGFyZ2V0U2hhcGUuX2ZpcmVBbmRCdWJibGUoTU9VU0VPVVQsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICB0YXJnZXRTaGFwZS5fZmlyZUFuZEJ1YmJsZShNT1VTRUxFQVZFLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgdGhpcy50YXJnZXRTaGFwZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIURyYWdBbmREcm9wXzEuREQuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5fZmlyZShNT1VTRUxFQVZFLCB7XG4gICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fZmlyZShNT1VTRU9VVCwge1xuICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvaW50ZXJQb3MgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX2ZpcmUoQ09OVEVOVF9NT1VTRU9VVCwgeyBldnQ6IGV2dCB9KTtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fbW91c2Vtb3ZlID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBpZiAoR2xvYmFsXzEuS29udmEuVUEuaWVNb2JpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90b3VjaG1vdmUoZXZ0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIHZhciBzaGFwZTtcbiAgICAgICAgaWYgKCFEcmFnQW5kRHJvcF8xLkRELmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHNoYXBlID0gdGhpcy5nZXRJbnRlcnNlY3Rpb24odGhpcy5nZXRQb2ludGVyUG9zaXRpb24oKSk7XG4gICAgICAgICAgICBpZiAoc2hhcGUgJiYgc2hhcGUuaXNMaXN0ZW5pbmcoKSkge1xuICAgICAgICAgICAgICAgIHZhciBkaWZmZXJlbnRUYXJnZXQgPSAhdGhpcy50YXJnZXRTaGFwZSB8fCB0aGlzLnRhcmdldFNoYXBlICE9PSBzaGFwZTtcbiAgICAgICAgICAgICAgICBpZiAoIURyYWdBbmREcm9wXzEuREQuaXNEcmFnZ2luZyAmJiBkaWZmZXJlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0U2hhcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0U2hhcGUuX2ZpcmVBbmRCdWJibGUoTU9VU0VPVVQsIHsgZXZ0OiBldnQgfSwgc2hhcGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXRTaGFwZS5fZmlyZUFuZEJ1YmJsZShNT1VTRUxFQVZFLCB7IGV2dDogZXZ0IH0sIHNoYXBlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShNT1VTRU9WRVIsIHsgZXZ0OiBldnQgfSwgdGhpcy50YXJnZXRTaGFwZSk7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKE1PVVNFRU5URVIsIHsgZXZ0OiBldnQgfSwgdGhpcy50YXJnZXRTaGFwZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0U2hhcGUgPSBzaGFwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKE1PVVNFTU9WRSwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YXJnZXRTaGFwZSAmJiAhRHJhZ0FuZERyb3BfMS5ERC5pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0U2hhcGUuX2ZpcmVBbmRCdWJibGUoTU9VU0VPVVQsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0U2hhcGUuX2ZpcmVBbmRCdWJibGUoTU9VU0VMRUFWRSwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlyZShNT1VTRU9WRVIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpc1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXRTaGFwZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUoTU9VU0VNT1ZFLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoQ09OVEVOVF9NT1VTRU1PVkUsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2dC5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl9tb3VzZWRvd24gPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGlmIChHbG9iYWxfMS5Lb252YS5VQS5pZU1vYmlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RvdWNoc3RhcnQoZXZ0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIHZhciBzaGFwZSA9IHRoaXMuZ2V0SW50ZXJzZWN0aW9uKHRoaXMuZ2V0UG9pbnRlclBvc2l0aW9uKCkpO1xuICAgICAgICBHbG9iYWxfMS5Lb252YS5saXN0ZW5DbGlja1RhcCA9IHRydWU7XG4gICAgICAgIGlmIChzaGFwZSAmJiBzaGFwZS5pc0xpc3RlbmluZygpKSB7XG4gICAgICAgICAgICB0aGlzLmNsaWNrU3RhcnRTaGFwZSA9IHNoYXBlO1xuICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoTU9VU0VET1dOLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZmlyZShNT1VTRURPV04sIHtcbiAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmlyZShDT05URU5UX01PVVNFRE9XTiwgeyBldnQ6IGV2dCB9KTtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fbW91c2V1cCA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgaWYgKEdsb2JhbF8xLktvbnZhLlVBLmllTW9iaWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdG91Y2hlbmQoZXZ0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIHZhciBzaGFwZSA9IHRoaXMuZ2V0SW50ZXJzZWN0aW9uKHRoaXMuZ2V0UG9pbnRlclBvc2l0aW9uKCkpLCBjbGlja1N0YXJ0U2hhcGUgPSB0aGlzLmNsaWNrU3RhcnRTaGFwZSwgY2xpY2tFbmRTaGFwZSA9IHRoaXMuY2xpY2tFbmRTaGFwZSwgZmlyZURibENsaWNrID0gZmFsc2U7XG4gICAgICAgIGlmIChHbG9iYWxfMS5Lb252YS5pbkRibENsaWNrV2luZG93KSB7XG4gICAgICAgICAgICBmaXJlRGJsQ2xpY2sgPSB0cnVlO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZGJsVGltZW91dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIURyYWdBbmREcm9wXzEuREQuanVzdERyYWdnZWQpIHtcbiAgICAgICAgICAgIEdsb2JhbF8xLktvbnZhLmluRGJsQ2xpY2tXaW5kb3cgPSB0cnVlO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZGJsVGltZW91dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoRHJhZ0FuZERyb3BfMS5ERCkge1xuICAgICAgICAgICAgRHJhZ0FuZERyb3BfMS5ERC5qdXN0RHJhZ2dlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGJsVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgR2xvYmFsXzEuS29udmEuaW5EYmxDbGlja1dpbmRvdyA9IGZhbHNlO1xuICAgICAgICB9LCBHbG9iYWxfMS5Lb252YS5kYmxDbGlja1dpbmRvdyk7XG4gICAgICAgIGlmIChzaGFwZSAmJiBzaGFwZS5pc0xpc3RlbmluZygpKSB7XG4gICAgICAgICAgICB0aGlzLmNsaWNrRW5kU2hhcGUgPSBzaGFwZTtcbiAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKE1PVVNFVVAsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICBpZiAoR2xvYmFsXzEuS29udmEubGlzdGVuQ2xpY2tUYXAgJiZcbiAgICAgICAgICAgICAgICBjbGlja1N0YXJ0U2hhcGUgJiZcbiAgICAgICAgICAgICAgICBjbGlja1N0YXJ0U2hhcGUuX2lkID09PSBzaGFwZS5faWQpIHtcbiAgICAgICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShDTElDSywgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgICAgICBpZiAoZmlyZURibENsaWNrICYmIGNsaWNrRW5kU2hhcGUgJiYgY2xpY2tFbmRTaGFwZS5faWQgPT09IHNoYXBlLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShEQkxfQ0xJQ0ssIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZmlyZShNT1VTRVVQLCB7IGV2dDogZXZ0LCB0YXJnZXQ6IHRoaXMsIGN1cnJlbnRUYXJnZXQ6IHRoaXMgfSk7XG4gICAgICAgICAgICBpZiAoR2xvYmFsXzEuS29udmEubGlzdGVuQ2xpY2tUYXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlKENMSUNLLCB7IGV2dDogZXZ0LCB0YXJnZXQ6IHRoaXMsIGN1cnJlbnRUYXJnZXQ6IHRoaXMgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyZURibENsaWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZShEQkxfQ0xJQ0ssIHtcbiAgICAgICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpcmUoQ09OVEVOVF9NT1VTRVVQLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICBpZiAoR2xvYmFsXzEuS29udmEubGlzdGVuQ2xpY2tUYXApIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoQ09OVEVOVF9DTElDSywgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgIGlmIChmaXJlRGJsQ2xpY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlKENPTlRFTlRfREJMX0NMSUNLLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIEdsb2JhbF8xLktvbnZhLmxpc3RlbkNsaWNrVGFwID0gZmFsc2U7XG4gICAgICAgIGlmIChldnQuY2FuY2VsYWJsZSkge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fY29udGV4dG1lbnUgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgdmFyIHNoYXBlID0gdGhpcy5nZXRJbnRlcnNlY3Rpb24odGhpcy5nZXRQb2ludGVyUG9zaXRpb24oKSk7XG4gICAgICAgIGlmIChzaGFwZSAmJiBzaGFwZS5pc0xpc3RlbmluZygpKSB7XG4gICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShDT05URVhUTUVOVSwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoQ09OVEVYVE1FTlUsIHtcbiAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmlyZShDT05URU5UX0NPTlRFWFRNRU5VLCB7IGV2dDogZXZ0IH0pO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl90b3VjaHN0YXJ0ID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIHZhciBzaGFwZSA9IHRoaXMuZ2V0SW50ZXJzZWN0aW9uKHRoaXMuZ2V0UG9pbnRlclBvc2l0aW9uKCkpO1xuICAgICAgICBHbG9iYWxfMS5Lb252YS5saXN0ZW5DbGlja1RhcCA9IHRydWU7XG4gICAgICAgIGlmIChzaGFwZSAmJiBzaGFwZS5pc0xpc3RlbmluZygpKSB7XG4gICAgICAgICAgICB0aGlzLnRhcFN0YXJ0U2hhcGUgPSBzaGFwZTtcbiAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKFRPVUNIU1RBUlQsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICBpZiAoc2hhcGUuaXNMaXN0ZW5pbmcoKSAmJiBzaGFwZS5wcmV2ZW50RGVmYXVsdCgpICYmIGV2dC5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKFRPVUNIU1RBUlQsIHtcbiAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmlyZShDT05URU5UX1RPVUNIU1RBUlQsIHsgZXZ0OiBldnQgfSk7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX3RvdWNoZW5kID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIHZhciBzaGFwZSA9IHRoaXMuZ2V0SW50ZXJzZWN0aW9uKHRoaXMuZ2V0UG9pbnRlclBvc2l0aW9uKCkpLCBmaXJlRGJsQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgaWYgKEdsb2JhbF8xLktvbnZhLmluRGJsQ2xpY2tXaW5kb3cpIHtcbiAgICAgICAgICAgIGZpcmVEYmxDbGljayA9IHRydWU7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5kYmxUaW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIEdsb2JhbF8xLktvbnZhLmluRGJsQ2xpY2tXaW5kb3cgPSB0cnVlO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZGJsVGltZW91dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYmxUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBHbG9iYWxfMS5Lb252YS5pbkRibENsaWNrV2luZG93ID0gZmFsc2U7XG4gICAgICAgIH0sIEdsb2JhbF8xLktvbnZhLmRibENsaWNrV2luZG93KTtcbiAgICAgICAgaWYgKHNoYXBlICYmIHNoYXBlLmlzTGlzdGVuaW5nKCkpIHtcbiAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKFRPVUNIRU5ELCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgaWYgKEdsb2JhbF8xLktvbnZhLmxpc3RlbkNsaWNrVGFwICYmXG4gICAgICAgICAgICAgICAgdGhpcy50YXBTdGFydFNoYXBlICYmXG4gICAgICAgICAgICAgICAgc2hhcGUuX2lkID09PSB0aGlzLnRhcFN0YXJ0U2hhcGUuX2lkKSB7XG4gICAgICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoVEFQLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgICAgIGlmIChmaXJlRGJsQ2xpY2spIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoREJMX1RBUCwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2hhcGUuaXNMaXN0ZW5pbmcoKSAmJiBzaGFwZS5wcmV2ZW50RGVmYXVsdCgpICYmIGV2dC5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKFRPVUNIRU5ELCB7IGV2dDogZXZ0LCB0YXJnZXQ6IHRoaXMsIGN1cnJlbnRUYXJnZXQ6IHRoaXMgfSk7XG4gICAgICAgICAgICBpZiAoR2xvYmFsXzEuS29udmEubGlzdGVuQ2xpY2tUYXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlKFRBUCwgeyBldnQ6IGV2dCwgdGFyZ2V0OiB0aGlzLCBjdXJyZW50VGFyZ2V0OiB0aGlzIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpcmVEYmxDbGljaykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUoREJMX1RBUCwge1xuICAgICAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmlyZShDT05URU5UX1RPVUNIRU5ELCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICBpZiAoR2xvYmFsXzEuS29udmEubGlzdGVuQ2xpY2tUYXApIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoQ09OVEVOVF9UQVAsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICBpZiAoZmlyZURibENsaWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZShDT05URU5UX0RCTF9UQVAsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgR2xvYmFsXzEuS29udmEubGlzdGVuQ2xpY2tUYXAgPSBmYWxzZTtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fdG91Y2htb3ZlID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIHZhciBzaGFwZTtcbiAgICAgICAgaWYgKCFEcmFnQW5kRHJvcF8xLkRELmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHNoYXBlID0gdGhpcy5nZXRJbnRlcnNlY3Rpb24odGhpcy5nZXRQb2ludGVyUG9zaXRpb24oKSk7XG4gICAgICAgICAgICBpZiAoc2hhcGUgJiYgc2hhcGUuaXNMaXN0ZW5pbmcoKSkge1xuICAgICAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKFRPVUNITU9WRSwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgICAgICBpZiAoc2hhcGUuaXNMaXN0ZW5pbmcoKSAmJiBzaGFwZS5wcmV2ZW50RGVmYXVsdCgpICYmIGV2dC5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUoVE9VQ0hNT1ZFLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoQ09OVEVOVF9UT1VDSE1PVkUsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKERyYWdBbmREcm9wXzEuREQuaXNEcmFnZ2luZyAmJiBEcmFnQW5kRHJvcF8xLkRELm5vZGUucHJldmVudERlZmF1bHQoKSAmJiBldnQuY2FuY2VsYWJsZSkge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fd2hlZWwgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgdmFyIHNoYXBlID0gdGhpcy5nZXRJbnRlcnNlY3Rpb24odGhpcy5nZXRQb2ludGVyUG9zaXRpb24oKSk7XG4gICAgICAgIGlmIChzaGFwZSAmJiBzaGFwZS5pc0xpc3RlbmluZygpKSB7XG4gICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShXSEVFTCwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoV0hFRUwsIHtcbiAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmlyZShDT05URU5UX1dIRUVMLCB7IGV2dDogZXZ0IH0pO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLnNldFBvaW50ZXJzUG9zaXRpb25zID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICB2YXIgY29udGVudFBvc2l0aW9uID0gdGhpcy5fZ2V0Q29udGVudFBvc2l0aW9uKCksIHggPSBudWxsLCB5ID0gbnVsbDtcbiAgICAgICAgZXZ0ID0gZXZ0ID8gZXZ0IDogd2luZG93LmV2ZW50O1xuICAgICAgICBpZiAoZXZ0LnRvdWNoZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGV2dC50b3VjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgdG91Y2ggPSBldnQudG91Y2hlc1swXTtcbiAgICAgICAgICAgICAgICB4ID0gdG91Y2guY2xpZW50WCAtIGNvbnRlbnRQb3NpdGlvbi5sZWZ0O1xuICAgICAgICAgICAgICAgIHkgPSB0b3VjaC5jbGllbnRZIC0gY29udGVudFBvc2l0aW9uLnRvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHggPSBldnQuY2xpZW50WCAtIGNvbnRlbnRQb3NpdGlvbi5sZWZ0O1xuICAgICAgICAgICAgeSA9IGV2dC5jbGllbnRZIC0gY29udGVudFBvc2l0aW9uLnRvcDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCAhPT0gbnVsbCAmJiB5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnBvaW50ZXJQb3MgPSB7XG4gICAgICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgICAgICB5OiB5XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX3NldFBvaW50ZXJQb3NpdGlvbiA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgVXRpbF8xLlV0aWwud2FybignTWV0aG9kIF9zZXRQb2ludGVyUG9zaXRpb24gaXMgZGVwcmVjYXRlZC4gVXNlIFwic3RhZ2Uuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZlbnQpXCIgaW5zdGVhZC4nKTtcbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl9nZXRDb250ZW50UG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZWN0ID0gdGhpcy5jb250ZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdFxuICAgICAgICAgICAgPyB0aGlzLmNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgIDogeyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AsXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnRcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fYnVpbGRET00gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyQ2FudmFzID0gbmV3IENhbnZhc18xLlNjZW5lQ2FudmFzKCk7XG4gICAgICAgIHRoaXMuYnVmZmVySGl0Q2FudmFzID0gbmV3IENhbnZhc18xLkhpdENhbnZhcyh7IHBpeGVsUmF0aW86IDEgfSk7XG4gICAgICAgIGlmICghR2xvYmFsXzEuS29udmEuaXNCcm93c2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyKCk7XG4gICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aHJvdyAnU3RhZ2UgaGFzIG5vIGNvbnRhaW5lci4gQSBjb250YWluZXIgaXMgcmVxdWlyZWQuJztcbiAgICAgICAgfVxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gRU1QVFlfU1RSSU5HO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLnBvc2l0aW9uID0gUkVMQVRJVkU7XG4gICAgICAgIHRoaXMuY29udGVudC5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NOYW1lID0gS09OVkFfQ09OVEVOVDtcbiAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdwcmVzZW50YXRpb24nKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZURPTSgpO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLmNhY2hlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdDYWNoZSBmdW5jdGlvbiBpcyBub3QgYWxsb3dlZCBmb3Igc3RhZ2UuIFlvdSBtYXkgdXNlIGNhY2hlIG9ubHkgZm9yIGxheWVycywgZ3JvdXBzIGFuZCBzaGFwZXMuJyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLmJhdGNoRHJhdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5lYWNoKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgICAgbGF5ZXIuYmF0Y2hEcmF3KCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBTdGFnZTtcbn0oQ29udGFpbmVyXzEuQ29udGFpbmVyKSk7XG5leHBvcnRzLlN0YWdlID0gU3RhZ2U7XG5TdGFnZS5wcm90b3R5cGUubm9kZVR5cGUgPSBTVEFHRTtcbkdsb2JhbF8yLl9yZWdpc3Rlck5vZGUoU3RhZ2UpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFN0YWdlLCAnY29udGFpbmVyJyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBVdGlsXzEgPSByZXF1aXJlKFwiLi9VdGlsXCIpO1xudmFyIEFuaW1hdGlvbl8xID0gcmVxdWlyZShcIi4vQW5pbWF0aW9uXCIpO1xudmFyIE5vZGVfMSA9IHJlcXVpcmUoXCIuL05vZGVcIik7XG52YXIgR2xvYmFsXzEgPSByZXF1aXJlKFwiLi9HbG9iYWxcIik7XG52YXIgYmxhY2tsaXN0ID0ge1xuICAgIG5vZGU6IDEsXG4gICAgZHVyYXRpb246IDEsXG4gICAgZWFzaW5nOiAxLFxuICAgIG9uRmluaXNoOiAxLFxuICAgIHlveW86IDFcbn0sIFBBVVNFRCA9IDEsIFBMQVlJTkcgPSAyLCBSRVZFUlNJTkcgPSAzLCBpZENvdW50ZXIgPSAwLCBjb2xvckF0dHJzID0gWydmaWxsJywgJ3N0cm9rZScsICdzaGFkb3dDb2xvciddO1xudmFyIFR3ZWVuRW5naW5lID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUd2VlbkVuZ2luZShwcm9wLCBwcm9wRnVuYywgZnVuYywgYmVnaW4sIGZpbmlzaCwgZHVyYXRpb24sIHlveW8pIHtcbiAgICAgICAgdGhpcy5wcm9wID0gcHJvcDtcbiAgICAgICAgdGhpcy5wcm9wRnVuYyA9IHByb3BGdW5jO1xuICAgICAgICB0aGlzLmJlZ2luID0gYmVnaW47XG4gICAgICAgIHRoaXMuX3BvcyA9IGJlZ2luO1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAgIHRoaXMuX2NoYW5nZSA9IDA7XG4gICAgICAgIHRoaXMucHJldlBvcyA9IDA7XG4gICAgICAgIHRoaXMueW95byA9IHlveW87XG4gICAgICAgIHRoaXMuX3RpbWUgPSAwO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2ZpbmlzaCA9IDA7XG4gICAgICAgIHRoaXMuZnVuYyA9IGZ1bmM7XG4gICAgICAgIHRoaXMuX2NoYW5nZSA9IGZpbmlzaCAtIHRoaXMuYmVnaW47XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICB9XG4gICAgVHdlZW5FbmdpbmUucHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHZhciBoYW5kbGVyID0gdGhpc1tzdHJdO1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgaGFuZGxlcigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBUd2VlbkVuZ2luZS5wcm90b3R5cGUuc2V0VGltZSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIGlmICh0ID4gdGhpcy5kdXJhdGlvbikge1xuICAgICAgICAgICAgaWYgKHRoaXMueW95bykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWUgPSB0aGlzLmR1cmF0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMucmV2ZXJzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0IDwgMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMueW95bykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWUgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGltZSA9IHQ7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBUd2VlbkVuZ2luZS5wcm90b3R5cGUuZ2V0VGltZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWU7XG4gICAgfTtcbiAgICBUd2VlbkVuZ2luZS5wcm90b3R5cGUuc2V0UG9zaXRpb24gPSBmdW5jdGlvbiAocCkge1xuICAgICAgICB0aGlzLnByZXZQb3MgPSB0aGlzLl9wb3M7XG4gICAgICAgIHRoaXMucHJvcEZ1bmMocCk7XG4gICAgICAgIHRoaXMuX3BvcyA9IHA7XG4gICAgfTtcbiAgICBUd2VlbkVuZ2luZS5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbiAodCkge1xuICAgICAgICBpZiAodCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0ID0gdGhpcy5fdGltZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5mdW5jKHQsIHRoaXMuYmVnaW4sIHRoaXMuX2NoYW5nZSwgdGhpcy5kdXJhdGlvbik7XG4gICAgfTtcbiAgICBUd2VlbkVuZ2luZS5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFBMQVlJTkc7XG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IHRoaXMuZ2V0VGltZXIoKSAtIHRoaXMuX3RpbWU7XG4gICAgICAgIHRoaXMub25FbnRlckZyYW1lKCk7XG4gICAgICAgIHRoaXMuZmlyZSgnb25QbGF5Jyk7XG4gICAgfTtcbiAgICBUd2VlbkVuZ2luZS5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFJFVkVSU0lORztcbiAgICAgICAgdGhpcy5fdGltZSA9IHRoaXMuZHVyYXRpb24gLSB0aGlzLl90aW1lO1xuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSB0aGlzLmdldFRpbWVyKCkgLSB0aGlzLl90aW1lO1xuICAgICAgICB0aGlzLm9uRW50ZXJGcmFtZSgpO1xuICAgICAgICB0aGlzLmZpcmUoJ29uUmV2ZXJzZScpO1xuICAgIH07XG4gICAgVHdlZW5FbmdpbmUucHJvdG90eXBlLnNlZWsgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIHRoaXMuX3RpbWUgPSB0O1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLmZpcmUoJ29uU2VlaycpO1xuICAgIH07XG4gICAgVHdlZW5FbmdpbmUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIHRoaXMuX3RpbWUgPSAwO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLmZpcmUoJ29uUmVzZXQnKTtcbiAgICB9O1xuICAgIFR3ZWVuRW5naW5lLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgdGhpcy5fdGltZSA9IHRoaXMuZHVyYXRpb247XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuZmlyZSgnb25GaW5pc2gnKTtcbiAgICB9O1xuICAgIFR3ZWVuRW5naW5lLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5nZXRQb3NpdGlvbih0aGlzLl90aW1lKSk7XG4gICAgfTtcbiAgICBUd2VlbkVuZ2luZS5wcm90b3R5cGUub25FbnRlckZyYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdCA9IHRoaXMuZ2V0VGltZXIoKSAtIHRoaXMuX3N0YXJ0VGltZTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IFBMQVlJTkcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZSh0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlID09PSBSRVZFUlNJTkcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZSh0aGlzLmR1cmF0aW9uIC0gdCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFR3ZWVuRW5naW5lLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFBBVVNFRDtcbiAgICAgICAgdGhpcy5maXJlKCdvblBhdXNlJyk7XG4gICAgfTtcbiAgICBUd2VlbkVuZ2luZS5wcm90b3R5cGUuZ2V0VGltZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB9O1xuICAgIHJldHVybiBUd2VlbkVuZ2luZTtcbn0oKSk7XG52YXIgVHdlZW4gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFR3ZWVuKGNvbmZpZykge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIG5vZGUgPSBjb25maWcubm9kZSwgbm9kZUlkID0gbm9kZS5faWQsIGR1cmF0aW9uLCBlYXNpbmcgPSBjb25maWcuZWFzaW5nIHx8IGV4cG9ydHMuRWFzaW5ncy5MaW5lYXIsIHlveW8gPSAhIWNvbmZpZy55b3lvLCBrZXk7XG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLmR1cmF0aW9uID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgZHVyYXRpb24gPSAwLjM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29uZmlnLmR1cmF0aW9uID09PSAwKSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IDAuMDAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZHVyYXRpb24gPSBjb25maWcuZHVyYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICAgICAgdGhpcy5faWQgPSBpZENvdW50ZXIrKztcbiAgICAgICAgdmFyIGxheWVycyA9IG5vZGUuZ2V0TGF5ZXIoKSB8fFxuICAgICAgICAgICAgKG5vZGUgaW5zdGFuY2VvZiBHbG9iYWxfMS5Lb252YVsnU3RhZ2UnXSA/IG5vZGUuZ2V0TGF5ZXJzKCkgOiBudWxsKTtcbiAgICAgICAgaWYgKCFsYXllcnMpIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLmVycm9yKCdUd2VlbiBjb25zdHJ1Y3RvciBoYXZlIGBub2RlYCB0aGF0IGlzIG5vdCBpbiBhIGxheWVyLiBQbGVhc2UgYWRkIG5vZGUgaW50byBsYXllciBmaXJzdC4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFuaW0gPSBuZXcgQW5pbWF0aW9uXzEuQW5pbWF0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoYXQudHdlZW4ub25FbnRlckZyYW1lKCk7XG4gICAgICAgIH0sIGxheWVycyk7XG4gICAgICAgIHRoaXMudHdlZW4gPSBuZXcgVHdlZW5FbmdpbmUoa2V5LCBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgdGhhdC5fdHdlZW5GdW5jKGkpO1xuICAgICAgICB9LCBlYXNpbmcsIDAsIDEsIGR1cmF0aW9uICogMTAwMCwgeW95byk7XG4gICAgICAgIHRoaXMuX2FkZExpc3RlbmVycygpO1xuICAgICAgICBpZiAoIVR3ZWVuLmF0dHJzW25vZGVJZF0pIHtcbiAgICAgICAgICAgIFR3ZWVuLmF0dHJzW25vZGVJZF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVR3ZWVuLmF0dHJzW25vZGVJZF1bdGhpcy5faWRdKSB7XG4gICAgICAgICAgICBUd2Vlbi5hdHRyc1tub2RlSWRdW3RoaXMuX2lkXSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghVHdlZW4udHdlZW5zW25vZGVJZF0pIHtcbiAgICAgICAgICAgIFR3ZWVuLnR3ZWVuc1tub2RlSWRdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChrZXkgaW4gY29uZmlnKSB7XG4gICAgICAgICAgICBpZiAoYmxhY2tsaXN0W2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZEF0dHIoa2V5LCBjb25maWdba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB0aGlzLm9uRmluaXNoID0gY29uZmlnLm9uRmluaXNoO1xuICAgICAgICB0aGlzLm9uUmVzZXQgPSBjb25maWcub25SZXNldDtcbiAgICB9XG4gICAgVHdlZW4ucHJvdG90eXBlLl9hZGRBdHRyID0gZnVuY3Rpb24gKGtleSwgZW5kKSB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlLCBub2RlSWQgPSBub2RlLl9pZCwgc3RhcnQsIGRpZmYsIHR3ZWVuSWQsIG4sIGxlbiwgdHJ1ZUVuZCwgdHJ1ZVN0YXJ0LCBlbmRSR0JBO1xuICAgICAgICB0d2VlbklkID0gVHdlZW4udHdlZW5zW25vZGVJZF1ba2V5XTtcbiAgICAgICAgaWYgKHR3ZWVuSWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBUd2Vlbi5hdHRyc1tub2RlSWRdW3R3ZWVuSWRdW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgc3RhcnQgPSBub2RlLmdldEF0dHIoa2V5KTtcbiAgICAgICAgaWYgKFV0aWxfMS5VdGlsLl9pc0FycmF5KGVuZCkpIHtcbiAgICAgICAgICAgIGRpZmYgPSBbXTtcbiAgICAgICAgICAgIGxlbiA9IE1hdGgubWF4KGVuZC5sZW5ndGgsIHN0YXJ0Lmxlbmd0aCk7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSAncG9pbnRzJyAmJiBlbmQubGVuZ3RoICE9PSBzdGFydC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZW5kLmxlbmd0aCA+IHN0YXJ0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0cnVlU3RhcnQgPSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBVdGlsXzEuVXRpbC5fcHJlcGFyZUFycmF5Rm9yVHdlZW4oc3RhcnQsIGVuZCwgbm9kZS5jbG9zZWQoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0cnVlRW5kID0gZW5kO1xuICAgICAgICAgICAgICAgICAgICBlbmQgPSBVdGlsXzEuVXRpbC5fcHJlcGFyZUFycmF5Rm9yVHdlZW4oZW5kLCBzdGFydCwgbm9kZS5jbG9zZWQoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGtleS5pbmRleE9mKCdmaWxsJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4gJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWZmLnB1c2goZW5kW25dIC0gc3RhcnRbbl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0UkdCQSA9IFV0aWxfMS5VdGlsLmNvbG9yVG9SR0JBKHN0YXJ0W25dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZFJHQkEgPSBVdGlsXzEuVXRpbC5jb2xvclRvUkdCQShlbmRbbl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbbl0gPSBzdGFydFJHQkE7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWZmLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHI6IGVuZFJHQkEuciAtIHN0YXJ0UkdCQS5yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGc6IGVuZFJHQkEuZyAtIHN0YXJ0UkdCQS5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGI6IGVuZFJHQkEuYiAtIHN0YXJ0UkdCQS5iLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGE6IGVuZFJHQkEuYSAtIHN0YXJ0UkdCQS5hXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgICAgICAgICBkaWZmLnB1c2goZW5kW25dIC0gc3RhcnRbbl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2xvckF0dHJzLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHN0YXJ0ID0gVXRpbF8xLlV0aWwuY29sb3JUb1JHQkEoc3RhcnQpO1xuICAgICAgICAgICAgZW5kUkdCQSA9IFV0aWxfMS5VdGlsLmNvbG9yVG9SR0JBKGVuZCk7XG4gICAgICAgICAgICBkaWZmID0ge1xuICAgICAgICAgICAgICAgIHI6IGVuZFJHQkEuciAtIHN0YXJ0LnIsXG4gICAgICAgICAgICAgICAgZzogZW5kUkdCQS5nIC0gc3RhcnQuZyxcbiAgICAgICAgICAgICAgICBiOiBlbmRSR0JBLmIgLSBzdGFydC5iLFxuICAgICAgICAgICAgICAgIGE6IGVuZFJHQkEuYSAtIHN0YXJ0LmFcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkaWZmID0gZW5kIC0gc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgVHdlZW4uYXR0cnNbbm9kZUlkXVt0aGlzLl9pZF1ba2V5XSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgIGRpZmY6IGRpZmYsXG4gICAgICAgICAgICBlbmQ6IGVuZCxcbiAgICAgICAgICAgIHRydWVFbmQ6IHRydWVFbmQsXG4gICAgICAgICAgICB0cnVlU3RhcnQ6IHRydWVTdGFydFxuICAgICAgICB9O1xuICAgICAgICBUd2Vlbi50d2VlbnNbbm9kZUlkXVtrZXldID0gdGhpcy5faWQ7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUuX3R3ZWVuRnVuYyA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlLCBhdHRycyA9IFR3ZWVuLmF0dHJzW25vZGUuX2lkXVt0aGlzLl9pZF0sIGtleSwgYXR0ciwgc3RhcnQsIGRpZmYsIG5ld1ZhbCwgbiwgbGVuLCBlbmQ7XG4gICAgICAgIGZvciAoa2V5IGluIGF0dHJzKSB7XG4gICAgICAgICAgICBhdHRyID0gYXR0cnNba2V5XTtcbiAgICAgICAgICAgIHN0YXJ0ID0gYXR0ci5zdGFydDtcbiAgICAgICAgICAgIGRpZmYgPSBhdHRyLmRpZmY7XG4gICAgICAgICAgICBlbmQgPSBhdHRyLmVuZDtcbiAgICAgICAgICAgIGlmIChVdGlsXzEuVXRpbC5faXNBcnJheShzdGFydCkpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBbXTtcbiAgICAgICAgICAgICAgICBsZW4gPSBNYXRoLm1heChzdGFydC5sZW5ndGgsIGVuZC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGlmIChrZXkuaW5kZXhPZignZmlsbCcpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4gJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsLnB1c2goKHN0YXJ0W25dIHx8IDApICsgZGlmZltuXSAqIGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsLnB1c2goJ3JnYmEoJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoc3RhcnRbbl0uciArIGRpZmZbbl0uciAqIGkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJywnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZChzdGFydFtuXS5nICsgZGlmZltuXS5nICogaSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKHN0YXJ0W25dLmIgKyBkaWZmW25dLmIgKiBpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcsJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzdGFydFtuXS5hICsgZGlmZltuXS5hICogaSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbC5wdXNoKChzdGFydFtuXSB8fCAwKSArIGRpZmZbbl0gKiBpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbG9yQXR0cnMuaW5kZXhPZihrZXkpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbCA9XG4gICAgICAgICAgICAgICAgICAgICdyZ2JhKCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZChzdGFydC5yICsgZGlmZi5yICogaSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJywnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoc3RhcnQuZyArIGRpZmYuZyAqIGkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcsJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKHN0YXJ0LmIgKyBkaWZmLmIgKiBpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKHN0YXJ0LmEgKyBkaWZmLmEgKiBpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBzdGFydCArIGRpZmYgKiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5zZXRBdHRyKGtleSwgbmV3VmFsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVHdlZW4ucHJvdG90eXBlLl9hZGRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMudHdlZW4ub25QbGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuYW5pbS5zdGFydCgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnR3ZWVuLm9uUmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmFuaW0uc3RhcnQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50d2Vlbi5vblBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuYW5pbS5zdG9wKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHdlZW4ub25GaW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IF90aGlzLm5vZGU7XG4gICAgICAgICAgICB2YXIgYXR0cnMgPSBUd2Vlbi5hdHRyc1tub2RlLl9pZF1bX3RoaXMuX2lkXTtcbiAgICAgICAgICAgIGlmIChhdHRycy5wb2ludHMgJiYgYXR0cnMucG9pbnRzLnRydWVFbmQpIHtcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHIoJ3BvaW50cycsIGF0dHJzLnBvaW50cy50cnVlRW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5vbkZpbmlzaCkge1xuICAgICAgICAgICAgICAgIF90aGlzLm9uRmluaXNoLmNhbGwoX3RoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnR3ZWVuLm9uUmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IF90aGlzLm5vZGU7XG4gICAgICAgICAgICB2YXIgYXR0cnMgPSBUd2Vlbi5hdHRyc1tub2RlLl9pZF1bX3RoaXMuX2lkXTtcbiAgICAgICAgICAgIGlmIChhdHRycy5wb2ludHMgJiYgYXR0cnMucG9pbnRzLnRydWVTdGFydCkge1xuICAgICAgICAgICAgICAgIG5vZGUucG9pbnRzKGF0dHJzLnBvaW50cy50cnVlU3RhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF90aGlzLm9uUmVzZXQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vblJlc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50d2Vlbi5wbGF5KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHdlZW4ucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudHdlZW4ucmV2ZXJzZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50d2Vlbi5yZXNldCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS5zZWVrID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgdGhpcy50d2Vlbi5zZWVrKHQgKiAxMDAwKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudHdlZW4ucGF1c2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnR3ZWVuLmZpbmlzaCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbm9kZUlkID0gdGhpcy5ub2RlLl9pZCwgdGhpc0lkID0gdGhpcy5faWQsIGF0dHJzID0gVHdlZW4udHdlZW5zW25vZGVJZF0sIGtleTtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICBmb3IgKGtleSBpbiBhdHRycykge1xuICAgICAgICAgICAgZGVsZXRlIFR3ZWVuLnR3ZWVuc1tub2RlSWRdW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIFR3ZWVuLmF0dHJzW25vZGVJZF1bdGhpc0lkXTtcbiAgICB9O1xuICAgIFR3ZWVuLmF0dHJzID0ge307XG4gICAgVHdlZW4udHdlZW5zID0ge307XG4gICAgcmV0dXJuIFR3ZWVuO1xufSgpKTtcbmV4cG9ydHMuVHdlZW4gPSBUd2Vlbjtcbk5vZGVfMS5Ob2RlLnByb3RvdHlwZS50byA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICB2YXIgb25GaW5pc2ggPSBwYXJhbXMub25GaW5pc2g7XG4gICAgcGFyYW1zLm5vZGUgPSB0aGlzO1xuICAgIHBhcmFtcy5vbkZpbmlzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgIGlmIChvbkZpbmlzaCkge1xuICAgICAgICAgICAgb25GaW5pc2goKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIHR3ZWVuID0gbmV3IFR3ZWVuKHBhcmFtcyk7XG4gICAgdHdlZW4ucGxheSgpO1xufTtcbmV4cG9ydHMuRWFzaW5ncyA9IHtcbiAgICBCYWNrRWFzZUluOiBmdW5jdGlvbiAodCwgYiwgYywgZCkge1xuICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogKChzICsgMSkgKiB0IC0gcykgKyBiO1xuICAgIH0sXG4gICAgQmFja0Vhc2VPdXQ6IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgICAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqICgocyArIDEpICogdCArIHMpICsgMSkgKyBiO1xuICAgIH0sXG4gICAgQmFja0Vhc2VJbk91dDogZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIChjIC8gMikgKiAodCAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCAtIHMpKSArIGI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChjIC8gMikgKiAoKHQgLT0gMikgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgKyBzKSArIDIpICsgYjtcbiAgICB9LFxuICAgIEVsYXN0aWNFYXNlSW46IGZ1bmN0aW9uICh0LCBiLCBjLCBkLCBhLCBwKSB7XG4gICAgICAgIHZhciBzID0gMDtcbiAgICAgICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodCAvPSBkKSA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcCkge1xuICAgICAgICAgICAgcCA9IGQgKiAwLjM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhIHx8IGEgPCBNYXRoLmFicyhjKSkge1xuICAgICAgICAgICAgYSA9IGM7XG4gICAgICAgICAgICBzID0gcCAvIDQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzID0gKHAgLyAoMiAqIE1hdGguUEkpKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICgtKGEgKlxuICAgICAgICAgICAgTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKlxuICAgICAgICAgICAgTWF0aC5zaW4oKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSkgLyBwKSkgKyBiKTtcbiAgICB9LFxuICAgIEVsYXN0aWNFYXNlT3V0OiBmdW5jdGlvbiAodCwgYiwgYywgZCwgYSwgcCkge1xuICAgICAgICB2YXIgcyA9IDA7XG4gICAgICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHQgLz0gZCkgPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBiICsgYztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXApIHtcbiAgICAgICAgICAgIHAgPSBkICogMC4zO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYSB8fCBhIDwgTWF0aC5hYnMoYykpIHtcbiAgICAgICAgICAgIGEgPSBjO1xuICAgICAgICAgICAgcyA9IHAgLyA0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcyA9IChwIC8gKDIgKiBNYXRoLlBJKSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoYSAqIE1hdGgucG93KDIsIC0xMCAqIHQpICogTWF0aC5zaW4oKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSkgLyBwKSArXG4gICAgICAgICAgICBjICtcbiAgICAgICAgICAgIGIpO1xuICAgIH0sXG4gICAgRWxhc3RpY0Vhc2VJbk91dDogZnVuY3Rpb24gKHQsIGIsIGMsIGQsIGEsIHApIHtcbiAgICAgICAgdmFyIHMgPSAwO1xuICAgICAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA9PT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcCkge1xuICAgICAgICAgICAgcCA9IGQgKiAoMC4zICogMS41KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWEgfHwgYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgICAgICAgICBhID0gYztcbiAgICAgICAgICAgIHMgPSBwIC8gNDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHMgPSAocCAvICgyICogTWF0aC5QSSkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAoLTAuNSAqXG4gICAgICAgICAgICAgICAgKGEgKlxuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdygyLCAxMCAqICh0IC09IDEpKSAqXG4gICAgICAgICAgICAgICAgICAgIE1hdGguc2luKCgodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkpIC8gcCkpICtcbiAgICAgICAgICAgICAgICBiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGEgKlxuICAgICAgICAgICAgTWF0aC5wb3coMiwgLTEwICogKHQgLT0gMSkpICpcbiAgICAgICAgICAgIE1hdGguc2luKCgodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkpIC8gcCkgKlxuICAgICAgICAgICAgMC41ICtcbiAgICAgICAgICAgIGMgK1xuICAgICAgICAgICAgYik7XG4gICAgfSxcbiAgICBCb3VuY2VFYXNlT3V0OiBmdW5jdGlvbiAodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoKHQgLz0gZCkgPCAxIC8gMi43NSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogdCAqIHQpICsgYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0IDwgMiAvIDIuNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDEuNSAvIDIuNzUpICogdCArIDAuNzUpICsgYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0IDwgMi41IC8gMi43NSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMi4yNSAvIDIuNzUpICogdCArIDAuOTM3NSkgKyBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMi42MjUgLyAyLjc1KSAqIHQgKyAwLjk4NDM3NSkgKyBiO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBCb3VuY2VFYXNlSW46IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiBjIC0gZXhwb3J0cy5FYXNpbmdzLkJvdW5jZUVhc2VPdXQoZCAtIHQsIDAsIGMsIGQpICsgYjtcbiAgICB9LFxuICAgIEJvdW5jZUVhc2VJbk91dDogZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKHQgPCBkIC8gMikge1xuICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHMuRWFzaW5ncy5Cb3VuY2VFYXNlSW4odCAqIDIsIDAsIGMsIGQpICogMC41ICsgYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBleHBvcnRzLkVhc2luZ3MuQm91bmNlRWFzZU91dCh0ICogMiAtIGQsIDAsIGMsIGQpICogMC41ICsgYyAqIDAuNSArIGI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVhc2VJbjogZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKyBiO1xuICAgIH0sXG4gICAgRWFzZU91dDogZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIC1jICogKHQgLz0gZCkgKiAodCAtIDIpICsgYjtcbiAgICB9LFxuICAgIEVhc2VJbk91dDogZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAoYyAvIDIpICogdCAqIHQgKyBiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoLWMgLyAyKSAqICgtLXQgKiAodCAtIDIpIC0gMSkgKyBiO1xuICAgIH0sXG4gICAgU3Ryb25nRWFzZUluOiBmdW5jdGlvbiAodCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICogdCArIGI7XG4gICAgfSxcbiAgICBTdHJvbmdFYXNlT3V0OiBmdW5jdGlvbiAodCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCAqIHQgKiB0ICsgMSkgKyBiO1xuICAgIH0sXG4gICAgU3Ryb25nRWFzZUluT3V0OiBmdW5jdGlvbiAodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIChjIC8gMikgKiB0ICogdCAqIHQgKiB0ICogdCArIGI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChjIC8gMikgKiAoKHQgLT0gMikgKiB0ICogdCAqIHQgKiB0ICsgMikgKyBiO1xuICAgIH0sXG4gICAgTGluZWFyOiBmdW5jdGlvbiAodCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gKGMgKiB0KSAvIGQgKyBiO1xuICAgIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBHbG9iYWxfMSA9IHJlcXVpcmUoXCIuL0dsb2JhbFwiKTtcbnZhciBDb2xsZWN0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb2xsZWN0aW9uKCkge1xuICAgIH1cbiAgICBDb2xsZWN0aW9uLnRvQ29sbGVjdGlvbiA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgQ29sbGVjdGlvbigpLCBsZW4gPSBhcnIubGVuZ3RoLCBuO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24ucHVzaChhcnJbbl0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgIH07XG4gICAgQ29sbGVjdGlvbi5fbWFwTWV0aG9kID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5sZW5ndGgsIGk7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXNbaV1bbWV0aG9kTmFtZV0uYXBwbHkodGhpc1tpXSwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIENvbGxlY3Rpb24ubWFwTWV0aG9kcyA9IGZ1bmN0aW9uIChjb25zdHJ1Y3Rvcikge1xuICAgICAgICB2YXIgcHJvdCA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICAgICAgZm9yICh2YXIgbWV0aG9kTmFtZSBpbiBwcm90KSB7XG4gICAgICAgICAgICBDb2xsZWN0aW9uLl9tYXBNZXRob2QobWV0aG9kTmFtZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDb2xsZWN0aW9uO1xufSgpKTtcbmV4cG9ydHMuQ29sbGVjdGlvbiA9IENvbGxlY3Rpb247XG5Db2xsZWN0aW9uLnByb3RvdHlwZSA9IFtdO1xuQ29sbGVjdGlvbi5wcm90b3R5cGUuZWFjaCA9IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgZm9yICh2YXIgbiA9IDA7IG4gPCB0aGlzLmxlbmd0aDsgbisrKSB7XG4gICAgICAgIGZ1bmModGhpc1tuXSwgbik7XG4gICAgfVxufTtcbkNvbGxlY3Rpb24ucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyciA9IFtdLCBsZW4gPSB0aGlzLmxlbmd0aCwgbjtcbiAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgYXJyLnB1c2godGhpc1tuXSk7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG59O1xudmFyIFRyYW5zZm9ybSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVHJhbnNmb3JtKG0pIHtcbiAgICAgICAgaWYgKG0gPT09IHZvaWQgMCkgeyBtID0gWzEsIDAsIDAsIDEsIDAsIDBdOyB9XG4gICAgICAgIHRoaXMubSA9IChtICYmIG0uc2xpY2UoKSkgfHwgWzEsIDAsIDAsIDEsIDAsIDBdO1xuICAgIH1cbiAgICBUcmFuc2Zvcm0ucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVHJhbnNmb3JtKHRoaXMubSk7XG4gICAgfTtcbiAgICBUcmFuc2Zvcm0ucHJvdG90eXBlLnBvaW50ID0gZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgIHZhciBtID0gdGhpcy5tO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogbVswXSAqIHBvaW50LnggKyBtWzJdICogcG9pbnQueSArIG1bNF0sXG4gICAgICAgICAgICB5OiBtWzFdICogcG9pbnQueCArIG1bM10gKiBwb2ludC55ICsgbVs1XVxuICAgICAgICB9O1xuICAgIH07XG4gICAgVHJhbnNmb3JtLnByb3RvdHlwZS50cmFuc2xhdGUgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICB0aGlzLm1bNF0gKz0gdGhpcy5tWzBdICogeCArIHRoaXMubVsyXSAqIHk7XG4gICAgICAgIHRoaXMubVs1XSArPSB0aGlzLm1bMV0gKiB4ICsgdGhpcy5tWzNdICogeTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUcmFuc2Zvcm0ucHJvdG90eXBlLnNjYWxlID0gZnVuY3Rpb24gKHN4LCBzeSkge1xuICAgICAgICB0aGlzLm1bMF0gKj0gc3g7XG4gICAgICAgIHRoaXMubVsxXSAqPSBzeDtcbiAgICAgICAgdGhpcy5tWzJdICo9IHN5O1xuICAgICAgICB0aGlzLm1bM10gKj0gc3k7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHJhbnNmb3JtLnByb3RvdHlwZS5yb3RhdGUgPSBmdW5jdGlvbiAocmFkKSB7XG4gICAgICAgIHZhciBjID0gTWF0aC5jb3MocmFkKTtcbiAgICAgICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICAgICAgICB2YXIgbTExID0gdGhpcy5tWzBdICogYyArIHRoaXMubVsyXSAqIHM7XG4gICAgICAgIHZhciBtMTIgPSB0aGlzLm1bMV0gKiBjICsgdGhpcy5tWzNdICogcztcbiAgICAgICAgdmFyIG0yMSA9IHRoaXMubVswXSAqIC1zICsgdGhpcy5tWzJdICogYztcbiAgICAgICAgdmFyIG0yMiA9IHRoaXMubVsxXSAqIC1zICsgdGhpcy5tWzNdICogYztcbiAgICAgICAgdGhpcy5tWzBdID0gbTExO1xuICAgICAgICB0aGlzLm1bMV0gPSBtMTI7XG4gICAgICAgIHRoaXMubVsyXSA9IG0yMTtcbiAgICAgICAgdGhpcy5tWzNdID0gbTIyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFRyYW5zZm9ybS5wcm90b3R5cGUuZ2V0VHJhbnNsYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0aGlzLm1bNF0sXG4gICAgICAgICAgICB5OiB0aGlzLm1bNV1cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFRyYW5zZm9ybS5wcm90b3R5cGUuc2tldyA9IGZ1bmN0aW9uIChzeCwgc3kpIHtcbiAgICAgICAgdmFyIG0xMSA9IHRoaXMubVswXSArIHRoaXMubVsyXSAqIHN5O1xuICAgICAgICB2YXIgbTEyID0gdGhpcy5tWzFdICsgdGhpcy5tWzNdICogc3k7XG4gICAgICAgIHZhciBtMjEgPSB0aGlzLm1bMl0gKyB0aGlzLm1bMF0gKiBzeDtcbiAgICAgICAgdmFyIG0yMiA9IHRoaXMubVszXSArIHRoaXMubVsxXSAqIHN4O1xuICAgICAgICB0aGlzLm1bMF0gPSBtMTE7XG4gICAgICAgIHRoaXMubVsxXSA9IG0xMjtcbiAgICAgICAgdGhpcy5tWzJdID0gbTIxO1xuICAgICAgICB0aGlzLm1bM10gPSBtMjI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHJhbnNmb3JtLnByb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uIChtYXRyaXgpIHtcbiAgICAgICAgdmFyIG0xMSA9IHRoaXMubVswXSAqIG1hdHJpeC5tWzBdICsgdGhpcy5tWzJdICogbWF0cml4Lm1bMV07XG4gICAgICAgIHZhciBtMTIgPSB0aGlzLm1bMV0gKiBtYXRyaXgubVswXSArIHRoaXMubVszXSAqIG1hdHJpeC5tWzFdO1xuICAgICAgICB2YXIgbTIxID0gdGhpcy5tWzBdICogbWF0cml4Lm1bMl0gKyB0aGlzLm1bMl0gKiBtYXRyaXgubVszXTtcbiAgICAgICAgdmFyIG0yMiA9IHRoaXMubVsxXSAqIG1hdHJpeC5tWzJdICsgdGhpcy5tWzNdICogbWF0cml4Lm1bM107XG4gICAgICAgIHZhciBkeCA9IHRoaXMubVswXSAqIG1hdHJpeC5tWzRdICsgdGhpcy5tWzJdICogbWF0cml4Lm1bNV0gKyB0aGlzLm1bNF07XG4gICAgICAgIHZhciBkeSA9IHRoaXMubVsxXSAqIG1hdHJpeC5tWzRdICsgdGhpcy5tWzNdICogbWF0cml4Lm1bNV0gKyB0aGlzLm1bNV07XG4gICAgICAgIHRoaXMubVswXSA9IG0xMTtcbiAgICAgICAgdGhpcy5tWzFdID0gbTEyO1xuICAgICAgICB0aGlzLm1bMl0gPSBtMjE7XG4gICAgICAgIHRoaXMubVszXSA9IG0yMjtcbiAgICAgICAgdGhpcy5tWzRdID0gZHg7XG4gICAgICAgIHRoaXMubVs1XSA9IGR5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFRyYW5zZm9ybS5wcm90b3R5cGUuaW52ZXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZCA9IDEgLyAodGhpcy5tWzBdICogdGhpcy5tWzNdIC0gdGhpcy5tWzFdICogdGhpcy5tWzJdKTtcbiAgICAgICAgdmFyIG0wID0gdGhpcy5tWzNdICogZDtcbiAgICAgICAgdmFyIG0xID0gLXRoaXMubVsxXSAqIGQ7XG4gICAgICAgIHZhciBtMiA9IC10aGlzLm1bMl0gKiBkO1xuICAgICAgICB2YXIgbTMgPSB0aGlzLm1bMF0gKiBkO1xuICAgICAgICB2YXIgbTQgPSBkICogKHRoaXMubVsyXSAqIHRoaXMubVs1XSAtIHRoaXMubVszXSAqIHRoaXMubVs0XSk7XG4gICAgICAgIHZhciBtNSA9IGQgKiAodGhpcy5tWzFdICogdGhpcy5tWzRdIC0gdGhpcy5tWzBdICogdGhpcy5tWzVdKTtcbiAgICAgICAgdGhpcy5tWzBdID0gbTA7XG4gICAgICAgIHRoaXMubVsxXSA9IG0xO1xuICAgICAgICB0aGlzLm1bMl0gPSBtMjtcbiAgICAgICAgdGhpcy5tWzNdID0gbTM7XG4gICAgICAgIHRoaXMubVs0XSA9IG00O1xuICAgICAgICB0aGlzLm1bNV0gPSBtNTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUcmFuc2Zvcm0ucHJvdG90eXBlLmdldE1hdHJpeCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubTtcbiAgICB9O1xuICAgIFRyYW5zZm9ybS5wcm90b3R5cGUuc2V0QWJzb2x1dGVQb3NpdGlvbiA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHZhciBtMCA9IHRoaXMubVswXSwgbTEgPSB0aGlzLm1bMV0sIG0yID0gdGhpcy5tWzJdLCBtMyA9IHRoaXMubVszXSwgbTQgPSB0aGlzLm1bNF0sIG01ID0gdGhpcy5tWzVdLCB5dCA9IChtMCAqICh5IC0gbTUpIC0gbTEgKiAoeCAtIG00KSkgLyAobTAgKiBtMyAtIG0xICogbTIpLCB4dCA9ICh4IC0gbTQgLSBtMiAqIHl0KSAvIG0wO1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUoeHQsIHl0KTtcbiAgICB9O1xuICAgIHJldHVybiBUcmFuc2Zvcm07XG59KCkpO1xuZXhwb3J0cy5UcmFuc2Zvcm0gPSBUcmFuc2Zvcm07XG52YXIgT0JKRUNUX0FSUkFZID0gJ1tvYmplY3QgQXJyYXldJywgT0JKRUNUX05VTUJFUiA9ICdbb2JqZWN0IE51bWJlcl0nLCBPQkpFQ1RfU1RSSU5HID0gJ1tvYmplY3QgU3RyaW5nXScsIE9CSkVDVF9CT09MRUFOID0gJ1tvYmplY3QgQm9vbGVhbl0nLCBQSV9PVkVSX0RFRzE4MCA9IE1hdGguUEkgLyAxODAsIERFRzE4MF9PVkVSX1BJID0gMTgwIC8gTWF0aC5QSSwgSEFTSCA9ICcjJywgRU1QVFlfU1RSSU5HID0gJycsIFpFUk8gPSAnMCcsIEtPTlZBX1dBUk5JTkcgPSAnS29udmEgd2FybmluZzogJywgS09OVkFfRVJST1IgPSAnS29udmEgZXJyb3I6ICcsIFJHQl9QQVJFTiA9ICdyZ2IoJywgQ09MT1JTID0ge1xuICAgIGFsaWNlYmx1ZTogWzI0MCwgMjQ4LCAyNTVdLFxuICAgIGFudGlxdWV3aGl0ZTogWzI1MCwgMjM1LCAyMTVdLFxuICAgIGFxdWE6IFswLCAyNTUsIDI1NV0sXG4gICAgYXF1YW1hcmluZTogWzEyNywgMjU1LCAyMTJdLFxuICAgIGF6dXJlOiBbMjQwLCAyNTUsIDI1NV0sXG4gICAgYmVpZ2U6IFsyNDUsIDI0NSwgMjIwXSxcbiAgICBiaXNxdWU6IFsyNTUsIDIyOCwgMTk2XSxcbiAgICBibGFjazogWzAsIDAsIDBdLFxuICAgIGJsYW5jaGVkYWxtb25kOiBbMjU1LCAyMzUsIDIwNV0sXG4gICAgYmx1ZTogWzAsIDAsIDI1NV0sXG4gICAgYmx1ZXZpb2xldDogWzEzOCwgNDMsIDIyNl0sXG4gICAgYnJvd246IFsxNjUsIDQyLCA0Ml0sXG4gICAgYnVybHl3b29kOiBbMjIyLCAxODQsIDEzNV0sXG4gICAgY2FkZXRibHVlOiBbOTUsIDE1OCwgMTYwXSxcbiAgICBjaGFydHJldXNlOiBbMTI3LCAyNTUsIDBdLFxuICAgIGNob2NvbGF0ZTogWzIxMCwgMTA1LCAzMF0sXG4gICAgY29yYWw6IFsyNTUsIDEyNywgODBdLFxuICAgIGNvcm5mbG93ZXJibHVlOiBbMTAwLCAxNDksIDIzN10sXG4gICAgY29ybnNpbGs6IFsyNTUsIDI0OCwgMjIwXSxcbiAgICBjcmltc29uOiBbMjIwLCAyMCwgNjBdLFxuICAgIGN5YW46IFswLCAyNTUsIDI1NV0sXG4gICAgZGFya2JsdWU6IFswLCAwLCAxMzldLFxuICAgIGRhcmtjeWFuOiBbMCwgMTM5LCAxMzldLFxuICAgIGRhcmtnb2xkZW5yb2Q6IFsxODQsIDEzMiwgMTFdLFxuICAgIGRhcmtncmF5OiBbMTY5LCAxNjksIDE2OV0sXG4gICAgZGFya2dyZWVuOiBbMCwgMTAwLCAwXSxcbiAgICBkYXJrZ3JleTogWzE2OSwgMTY5LCAxNjldLFxuICAgIGRhcmtraGFraTogWzE4OSwgMTgzLCAxMDddLFxuICAgIGRhcmttYWdlbnRhOiBbMTM5LCAwLCAxMzldLFxuICAgIGRhcmtvbGl2ZWdyZWVuOiBbODUsIDEwNywgNDddLFxuICAgIGRhcmtvcmFuZ2U6IFsyNTUsIDE0MCwgMF0sXG4gICAgZGFya29yY2hpZDogWzE1MywgNTAsIDIwNF0sXG4gICAgZGFya3JlZDogWzEzOSwgMCwgMF0sXG4gICAgZGFya3NhbG1vbjogWzIzMywgMTUwLCAxMjJdLFxuICAgIGRhcmtzZWFncmVlbjogWzE0MywgMTg4LCAxNDNdLFxuICAgIGRhcmtzbGF0ZWJsdWU6IFs3MiwgNjEsIDEzOV0sXG4gICAgZGFya3NsYXRlZ3JheTogWzQ3LCA3OSwgNzldLFxuICAgIGRhcmtzbGF0ZWdyZXk6IFs0NywgNzksIDc5XSxcbiAgICBkYXJrdHVycXVvaXNlOiBbMCwgMjA2LCAyMDldLFxuICAgIGRhcmt2aW9sZXQ6IFsxNDgsIDAsIDIxMV0sXG4gICAgZGVlcHBpbms6IFsyNTUsIDIwLCAxNDddLFxuICAgIGRlZXBza3libHVlOiBbMCwgMTkxLCAyNTVdLFxuICAgIGRpbWdyYXk6IFsxMDUsIDEwNSwgMTA1XSxcbiAgICBkaW1ncmV5OiBbMTA1LCAxMDUsIDEwNV0sXG4gICAgZG9kZ2VyYmx1ZTogWzMwLCAxNDQsIDI1NV0sXG4gICAgZmlyZWJyaWNrOiBbMTc4LCAzNCwgMzRdLFxuICAgIGZsb3JhbHdoaXRlOiBbMjU1LCAyNTUsIDI0MF0sXG4gICAgZm9yZXN0Z3JlZW46IFszNCwgMTM5LCAzNF0sXG4gICAgZnVjaHNpYTogWzI1NSwgMCwgMjU1XSxcbiAgICBnYWluc2Jvcm86IFsyMjAsIDIyMCwgMjIwXSxcbiAgICBnaG9zdHdoaXRlOiBbMjQ4LCAyNDgsIDI1NV0sXG4gICAgZ29sZDogWzI1NSwgMjE1LCAwXSxcbiAgICBnb2xkZW5yb2Q6IFsyMTgsIDE2NSwgMzJdLFxuICAgIGdyYXk6IFsxMjgsIDEyOCwgMTI4XSxcbiAgICBncmVlbjogWzAsIDEyOCwgMF0sXG4gICAgZ3JlZW55ZWxsb3c6IFsxNzMsIDI1NSwgNDddLFxuICAgIGdyZXk6IFsxMjgsIDEyOCwgMTI4XSxcbiAgICBob25leWRldzogWzI0MCwgMjU1LCAyNDBdLFxuICAgIGhvdHBpbms6IFsyNTUsIDEwNSwgMTgwXSxcbiAgICBpbmRpYW5yZWQ6IFsyMDUsIDkyLCA5Ml0sXG4gICAgaW5kaWdvOiBbNzUsIDAsIDEzMF0sXG4gICAgaXZvcnk6IFsyNTUsIDI1NSwgMjQwXSxcbiAgICBraGFraTogWzI0MCwgMjMwLCAxNDBdLFxuICAgIGxhdmVuZGVyOiBbMjMwLCAyMzAsIDI1MF0sXG4gICAgbGF2ZW5kZXJibHVzaDogWzI1NSwgMjQwLCAyNDVdLFxuICAgIGxhd25ncmVlbjogWzEyNCwgMjUyLCAwXSxcbiAgICBsZW1vbmNoaWZmb246IFsyNTUsIDI1MCwgMjA1XSxcbiAgICBsaWdodGJsdWU6IFsxNzMsIDIxNiwgMjMwXSxcbiAgICBsaWdodGNvcmFsOiBbMjQwLCAxMjgsIDEyOF0sXG4gICAgbGlnaHRjeWFuOiBbMjI0LCAyNTUsIDI1NV0sXG4gICAgbGlnaHRnb2xkZW5yb2R5ZWxsb3c6IFsyNTAsIDI1MCwgMjEwXSxcbiAgICBsaWdodGdyYXk6IFsyMTEsIDIxMSwgMjExXSxcbiAgICBsaWdodGdyZWVuOiBbMTQ0LCAyMzgsIDE0NF0sXG4gICAgbGlnaHRncmV5OiBbMjExLCAyMTEsIDIxMV0sXG4gICAgbGlnaHRwaW5rOiBbMjU1LCAxODIsIDE5M10sXG4gICAgbGlnaHRzYWxtb246IFsyNTUsIDE2MCwgMTIyXSxcbiAgICBsaWdodHNlYWdyZWVuOiBbMzIsIDE3OCwgMTcwXSxcbiAgICBsaWdodHNreWJsdWU6IFsxMzUsIDIwNiwgMjUwXSxcbiAgICBsaWdodHNsYXRlZ3JheTogWzExOSwgMTM2LCAxNTNdLFxuICAgIGxpZ2h0c2xhdGVncmV5OiBbMTE5LCAxMzYsIDE1M10sXG4gICAgbGlnaHRzdGVlbGJsdWU6IFsxNzYsIDE5NiwgMjIyXSxcbiAgICBsaWdodHllbGxvdzogWzI1NSwgMjU1LCAyMjRdLFxuICAgIGxpbWU6IFswLCAyNTUsIDBdLFxuICAgIGxpbWVncmVlbjogWzUwLCAyMDUsIDUwXSxcbiAgICBsaW5lbjogWzI1MCwgMjQwLCAyMzBdLFxuICAgIG1hZ2VudGE6IFsyNTUsIDAsIDI1NV0sXG4gICAgbWFyb29uOiBbMTI4LCAwLCAwXSxcbiAgICBtZWRpdW1hcXVhbWFyaW5lOiBbMTAyLCAyMDUsIDE3MF0sXG4gICAgbWVkaXVtYmx1ZTogWzAsIDAsIDIwNV0sXG4gICAgbWVkaXVtb3JjaGlkOiBbMTg2LCA4NSwgMjExXSxcbiAgICBtZWRpdW1wdXJwbGU6IFsxNDcsIDExMiwgMjE5XSxcbiAgICBtZWRpdW1zZWFncmVlbjogWzYwLCAxNzksIDExM10sXG4gICAgbWVkaXVtc2xhdGVibHVlOiBbMTIzLCAxMDQsIDIzOF0sXG4gICAgbWVkaXVtc3ByaW5nZ3JlZW46IFswLCAyNTAsIDE1NF0sXG4gICAgbWVkaXVtdHVycXVvaXNlOiBbNzIsIDIwOSwgMjA0XSxcbiAgICBtZWRpdW12aW9sZXRyZWQ6IFsxOTksIDIxLCAxMzNdLFxuICAgIG1pZG5pZ2h0Ymx1ZTogWzI1LCAyNSwgMTEyXSxcbiAgICBtaW50Y3JlYW06IFsyNDUsIDI1NSwgMjUwXSxcbiAgICBtaXN0eXJvc2U6IFsyNTUsIDIyOCwgMjI1XSxcbiAgICBtb2NjYXNpbjogWzI1NSwgMjI4LCAxODFdLFxuICAgIG5hdmFqb3doaXRlOiBbMjU1LCAyMjIsIDE3M10sXG4gICAgbmF2eTogWzAsIDAsIDEyOF0sXG4gICAgb2xkbGFjZTogWzI1MywgMjQ1LCAyMzBdLFxuICAgIG9saXZlOiBbMTI4LCAxMjgsIDBdLFxuICAgIG9saXZlZHJhYjogWzEwNywgMTQyLCAzNV0sXG4gICAgb3JhbmdlOiBbMjU1LCAxNjUsIDBdLFxuICAgIG9yYW5nZXJlZDogWzI1NSwgNjksIDBdLFxuICAgIG9yY2hpZDogWzIxOCwgMTEyLCAyMTRdLFxuICAgIHBhbGVnb2xkZW5yb2Q6IFsyMzgsIDIzMiwgMTcwXSxcbiAgICBwYWxlZ3JlZW46IFsxNTIsIDI1MSwgMTUyXSxcbiAgICBwYWxldHVycXVvaXNlOiBbMTc1LCAyMzgsIDIzOF0sXG4gICAgcGFsZXZpb2xldHJlZDogWzIxOSwgMTEyLCAxNDddLFxuICAgIHBhcGF5YXdoaXA6IFsyNTUsIDIzOSwgMjEzXSxcbiAgICBwZWFjaHB1ZmY6IFsyNTUsIDIxOCwgMTg1XSxcbiAgICBwZXJ1OiBbMjA1LCAxMzMsIDYzXSxcbiAgICBwaW5rOiBbMjU1LCAxOTIsIDIwM10sXG4gICAgcGx1bTogWzIyMSwgMTYwLCAyMDNdLFxuICAgIHBvd2RlcmJsdWU6IFsxNzYsIDIyNCwgMjMwXSxcbiAgICBwdXJwbGU6IFsxMjgsIDAsIDEyOF0sXG4gICAgcmViZWNjYXB1cnBsZTogWzEwMiwgNTEsIDE1M10sXG4gICAgcmVkOiBbMjU1LCAwLCAwXSxcbiAgICByb3N5YnJvd246IFsxODgsIDE0MywgMTQzXSxcbiAgICByb3lhbGJsdWU6IFs2NSwgMTA1LCAyMjVdLFxuICAgIHNhZGRsZWJyb3duOiBbMTM5LCA2OSwgMTldLFxuICAgIHNhbG1vbjogWzI1MCwgMTI4LCAxMTRdLFxuICAgIHNhbmR5YnJvd246IFsyNDQsIDE2NCwgOTZdLFxuICAgIHNlYWdyZWVuOiBbNDYsIDEzOSwgODddLFxuICAgIHNlYXNoZWxsOiBbMjU1LCAyNDUsIDIzOF0sXG4gICAgc2llbm5hOiBbMTYwLCA4MiwgNDVdLFxuICAgIHNpbHZlcjogWzE5MiwgMTkyLCAxOTJdLFxuICAgIHNreWJsdWU6IFsxMzUsIDIwNiwgMjM1XSxcbiAgICBzbGF0ZWJsdWU6IFsxMDYsIDkwLCAyMDVdLFxuICAgIHNsYXRlZ3JheTogWzExOSwgMTI4LCAxNDRdLFxuICAgIHNsYXRlZ3JleTogWzExOSwgMTI4LCAxNDRdLFxuICAgIHNub3c6IFsyNTUsIDI1NSwgMjUwXSxcbiAgICBzcHJpbmdncmVlbjogWzAsIDI1NSwgMTI3XSxcbiAgICBzdGVlbGJsdWU6IFs3MCwgMTMwLCAxODBdLFxuICAgIHRhbjogWzIxMCwgMTgwLCAxNDBdLFxuICAgIHRlYWw6IFswLCAxMjgsIDEyOF0sXG4gICAgdGhpc3RsZTogWzIxNiwgMTkxLCAyMTZdLFxuICAgIHRyYW5zcGFyZW50OiBbMjU1LCAyNTUsIDI1NSwgMF0sXG4gICAgdG9tYXRvOiBbMjU1LCA5OSwgNzFdLFxuICAgIHR1cnF1b2lzZTogWzY0LCAyMjQsIDIwOF0sXG4gICAgdmlvbGV0OiBbMjM4LCAxMzAsIDIzOF0sXG4gICAgd2hlYXQ6IFsyNDUsIDIyMiwgMTc5XSxcbiAgICB3aGl0ZTogWzI1NSwgMjU1LCAyNTVdLFxuICAgIHdoaXRlc21va2U6IFsyNDUsIDI0NSwgMjQ1XSxcbiAgICB5ZWxsb3c6IFsyNTUsIDI1NSwgMF0sXG4gICAgeWVsbG93Z3JlZW46IFsxNTQsIDIwNSwgNV1cbn0sIFJHQl9SRUdFWCA9IC9yZ2JcXCgoXFxkezEsM30pLChcXGR7MSwzfSksKFxcZHsxLDN9KVxcKS8sIGFuaW1RdWV1ZSA9IFtdO1xuZXhwb3J0cy5VdGlsID0ge1xuICAgIF9pc0VsZW1lbnQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgPT0gMSk7XG4gICAgfSxcbiAgICBfaXNGdW5jdGlvbjogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gISEob2JqICYmIG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY2FsbCAmJiBvYmouYXBwbHkpO1xuICAgIH0sXG4gICAgX2lzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuICEhb2JqICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xuICAgIH0sXG4gICAgX2lzQXJyYXk6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBPQkpFQ1RfQVJSQVk7XG4gICAgfSxcbiAgICBfaXNOdW1iZXI6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gT0JKRUNUX05VTUJFUiAmJlxuICAgICAgICAgICAgIWlzTmFOKG9iaikgJiZcbiAgICAgICAgICAgIGlzRmluaXRlKG9iaikpO1xuICAgIH0sXG4gICAgX2lzU3RyaW5nOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gT0JKRUNUX1NUUklORztcbiAgICB9LFxuICAgIF9pc0Jvb2xlYW46IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBPQkpFQ1RfQk9PTEVBTjtcbiAgICB9LFxuICAgIGlzT2JqZWN0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiB2YWwgaW5zdGFuY2VvZiBPYmplY3Q7XG4gICAgfSxcbiAgICBpc1ZhbGlkU2VsZWN0b3I6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmaXJzdENoYXIgPSBzZWxlY3RvclswXTtcbiAgICAgICAgcmV0dXJuIChmaXJzdENoYXIgPT09ICcjJyB8fFxuICAgICAgICAgICAgZmlyc3RDaGFyID09PSAnLicgfHxcbiAgICAgICAgICAgIGZpcnN0Q2hhciA9PT0gZmlyc3RDaGFyLnRvVXBwZXJDYXNlKCkpO1xuICAgIH0sXG4gICAgX3NpZ246IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgaWYgKG51bWJlciA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG51bWJlciA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZXF1ZXN0QW5pbUZyYW1lOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgYW5pbVF1ZXVlLnB1c2goY2FsbGJhY2spO1xuICAgICAgICBpZiAoYW5pbVF1ZXVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcXVldWUgPSBhbmltUXVldWU7XG4gICAgICAgICAgICAgICAgYW5pbVF1ZXVlID0gW107XG4gICAgICAgICAgICAgICAgcXVldWUuZm9yRWFjaChmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjcmVhdGVDYW52YXNFbGVtZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNhbnZhcy5zdHlsZSA9IGNhbnZhcy5zdHlsZSB8fCB7fTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgIHJldHVybiBjYW52YXM7XG4gICAgfSxcbiAgICBjcmVhdGVJbWFnZUVsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIH0sXG4gICAgX2lzSW5Eb2N1bWVudDogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHdoaWxlICgoZWwgPSBlbC5wYXJlbnROb2RlKSkge1xuICAgICAgICAgICAgaWYgKGVsID09IGRvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgX3NpbXBsaWZ5QXJyYXk6IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgdmFyIHJldEFyciA9IFtdLCBsZW4gPSBhcnIubGVuZ3RoLCB1dGlsID0gZXhwb3J0cy5VdGlsLCBuLCB2YWw7XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgdmFsID0gYXJyW25dO1xuICAgICAgICAgICAgaWYgKHV0aWwuX2lzTnVtYmVyKHZhbCkpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSBNYXRoLnJvdW5kKHZhbCAqIDEwMDApIC8gMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF1dGlsLl9pc1N0cmluZyh2YWwpKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXRBcnIucHVzaCh2YWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXRBcnI7XG4gICAgfSxcbiAgICBfdXJsVG9JbWFnZTogZnVuY3Rpb24gKHVybCwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGltYWdlT2JqID0gbmV3IEdsb2JhbF8xLmdsb2IuSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2VPYmoub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FsbGJhY2soaW1hZ2VPYmopO1xuICAgICAgICB9O1xuICAgICAgICBpbWFnZU9iai5zcmMgPSB1cmw7XG4gICAgfSxcbiAgICBfcmdiVG9IZXg6IGZ1bmN0aW9uIChyLCBnLCBiKSB7XG4gICAgICAgIHJldHVybiAoKDEgPDwgMjQpICsgKHIgPDwgMTYpICsgKGcgPDwgOCkgKyBiKS50b1N0cmluZygxNikuc2xpY2UoMSk7XG4gICAgfSxcbiAgICBfaGV4VG9SZ2I6IGZ1bmN0aW9uIChoZXgpIHtcbiAgICAgICAgaGV4ID0gaGV4LnJlcGxhY2UoSEFTSCwgRU1QVFlfU1RSSU5HKTtcbiAgICAgICAgdmFyIGJpZ2ludCA9IHBhcnNlSW50KGhleCwgMTYpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcjogKGJpZ2ludCA+PiAxNikgJiAyNTUsXG4gICAgICAgICAgICBnOiAoYmlnaW50ID4+IDgpICYgMjU1LFxuICAgICAgICAgICAgYjogYmlnaW50ICYgMjU1XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBnZXRSYW5kb21Db2xvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmFuZENvbG9yID0gKChNYXRoLnJhbmRvbSgpICogMHhmZmZmZmYpIDw8IDApLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgd2hpbGUgKHJhbmRDb2xvci5sZW5ndGggPCA2KSB7XG4gICAgICAgICAgICByYW5kQ29sb3IgPSBaRVJPICsgcmFuZENvbG9yO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBIQVNIICsgcmFuZENvbG9yO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbiAodmFsLCBkZWYpIHtcbiAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVmO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0UkdCOiBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICAgICAgdmFyIHJnYjtcbiAgICAgICAgaWYgKGNvbG9yIGluIENPTE9SUykge1xuICAgICAgICAgICAgcmdiID0gQ09MT1JTW2NvbG9yXTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcjogcmdiWzBdLFxuICAgICAgICAgICAgICAgIGc6IHJnYlsxXSxcbiAgICAgICAgICAgICAgICBiOiByZ2JbMl1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29sb3JbMF0gPT09IEhBU0gpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZXhUb1JnYihjb2xvci5zdWJzdHJpbmcoMSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbG9yLnN1YnN0cigwLCA0KSA9PT0gUkdCX1BBUkVOKSB7XG4gICAgICAgICAgICByZ2IgPSBSR0JfUkVHRVguZXhlYyhjb2xvci5yZXBsYWNlKC8gL2csICcnKSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IHBhcnNlSW50KHJnYlsxXSwgMTApLFxuICAgICAgICAgICAgICAgIGc6IHBhcnNlSW50KHJnYlsyXSwgMTApLFxuICAgICAgICAgICAgICAgIGI6IHBhcnNlSW50KHJnYlszXSwgMTApXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByOiAwLFxuICAgICAgICAgICAgICAgIGc6IDAsXG4gICAgICAgICAgICAgICAgYjogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29sb3JUb1JHQkE6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgc3RyID0gc3RyIHx8ICdibGFjayc7XG4gICAgICAgIHJldHVybiAoZXhwb3J0cy5VdGlsLl9uYW1lZENvbG9yVG9SQkEoc3RyKSB8fFxuICAgICAgICAgICAgZXhwb3J0cy5VdGlsLl9oZXgzQ29sb3JUb1JHQkEoc3RyKSB8fFxuICAgICAgICAgICAgZXhwb3J0cy5VdGlsLl9oZXg2Q29sb3JUb1JHQkEoc3RyKSB8fFxuICAgICAgICAgICAgZXhwb3J0cy5VdGlsLl9yZ2JDb2xvclRvUkdCQShzdHIpIHx8XG4gICAgICAgICAgICBleHBvcnRzLlV0aWwuX3JnYmFDb2xvclRvUkdCQShzdHIpKTtcbiAgICB9LFxuICAgIF9uYW1lZENvbG9yVG9SQkE6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgdmFyIGMgPSBDT0xPUlNbc3RyLnRvTG93ZXJDYXNlKCldO1xuICAgICAgICBpZiAoIWMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiBjWzBdLFxuICAgICAgICAgICAgZzogY1sxXSxcbiAgICAgICAgICAgIGI6IGNbMl0sXG4gICAgICAgICAgICBhOiAxXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBfcmdiQ29sb3JUb1JHQkE6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgaWYgKHN0ci5pbmRleE9mKCdyZ2IoJykgPT09IDApIHtcbiAgICAgICAgICAgIHN0ciA9IHN0ci5tYXRjaCgvcmdiXFwoKFteKV0rKVxcKS8pWzFdO1xuICAgICAgICAgICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KC8gKiwgKi8pLm1hcChOdW1iZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByOiBwYXJ0c1swXSxcbiAgICAgICAgICAgICAgICBnOiBwYXJ0c1sxXSxcbiAgICAgICAgICAgICAgICBiOiBwYXJ0c1syXSxcbiAgICAgICAgICAgICAgICBhOiAxXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfcmdiYUNvbG9yVG9SR0JBOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIGlmIChzdHIuaW5kZXhPZigncmdiYSgnKSA9PT0gMCkge1xuICAgICAgICAgICAgc3RyID0gc3RyLm1hdGNoKC9yZ2JhXFwoKFteKV0rKVxcKS8pWzFdO1xuICAgICAgICAgICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KC8gKiwgKi8pLm1hcChOdW1iZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByOiBwYXJ0c1swXSxcbiAgICAgICAgICAgICAgICBnOiBwYXJ0c1sxXSxcbiAgICAgICAgICAgICAgICBiOiBwYXJ0c1syXSxcbiAgICAgICAgICAgICAgICBhOiBwYXJ0c1szXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2hleDZDb2xvclRvUkdCQTogZnVuY3Rpb24gKHN0cikge1xuICAgICAgICBpZiAoc3RyWzBdID09PSAnIycgJiYgc3RyLmxlbmd0aCA9PT0gNykge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByOiBwYXJzZUludChzdHIuc2xpY2UoMSwgMyksIDE2KSxcbiAgICAgICAgICAgICAgICBnOiBwYXJzZUludChzdHIuc2xpY2UoMywgNSksIDE2KSxcbiAgICAgICAgICAgICAgICBiOiBwYXJzZUludChzdHIuc2xpY2UoNSwgNyksIDE2KSxcbiAgICAgICAgICAgICAgICBhOiAxXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfaGV4M0NvbG9yVG9SR0JBOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIGlmIChzdHJbMF0gPT09ICcjJyAmJiBzdHIubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IHBhcnNlSW50KHN0clsxXSArIHN0clsxXSwgMTYpLFxuICAgICAgICAgICAgICAgIGc6IHBhcnNlSW50KHN0clsyXSArIHN0clsyXSwgMTYpLFxuICAgICAgICAgICAgICAgIGI6IHBhcnNlSW50KHN0clszXSArIHN0clszXSwgMTYpLFxuICAgICAgICAgICAgICAgIGE6IDFcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGhhdmVJbnRlcnNlY3Rpb246IGZ1bmN0aW9uIChyMSwgcjIpIHtcbiAgICAgICAgcmV0dXJuICEocjIueCA+IHIxLnggKyByMS53aWR0aCB8fFxuICAgICAgICAgICAgcjIueCArIHIyLndpZHRoIDwgcjEueCB8fFxuICAgICAgICAgICAgcjIueSA+IHIxLnkgKyByMS5oZWlnaHQgfHxcbiAgICAgICAgICAgIHIyLnkgKyByMi5oZWlnaHQgPCByMS55KTtcbiAgICB9LFxuICAgIGNsb25lT2JqZWN0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHZhciByZXRPYmogPSB7fTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzUGxhaW5PYmplY3Qob2JqW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0T2JqW2tleV0gPSB0aGlzLmNsb25lT2JqZWN0KG9ialtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX2lzQXJyYXkob2JqW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0T2JqW2tleV0gPSB0aGlzLmNsb25lQXJyYXkob2JqW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0T2JqW2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0T2JqO1xuICAgIH0sXG4gICAgY2xvbmVBcnJheTogZnVuY3Rpb24gKGFycikge1xuICAgICAgICByZXR1cm4gYXJyLnNsaWNlKDApO1xuICAgIH0sXG4gICAgX2RlZ1RvUmFkOiBmdW5jdGlvbiAoZGVnKSB7XG4gICAgICAgIHJldHVybiBkZWcgKiBQSV9PVkVSX0RFRzE4MDtcbiAgICB9LFxuICAgIF9yYWRUb0RlZzogZnVuY3Rpb24gKHJhZCkge1xuICAgICAgICByZXR1cm4gcmFkICogREVHMTgwX09WRVJfUEk7XG4gICAgfSxcbiAgICBfY2FwaXRhbGl6ZTogZnVuY3Rpb24gKHN0cikge1xuICAgICAgICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuICAgIH0sXG4gICAgdGhyb3c6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEtPTlZBX0VSUk9SICsgc3RyKTtcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoS09OVkFfRVJST1IgKyBzdHIpO1xuICAgIH0sXG4gICAgd2FybjogZnVuY3Rpb24gKHN0cikge1xuICAgICAgICBpZiAoIUdsb2JhbF8xLktvbnZhLnNob3dXYXJuaW5ncykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUud2FybihLT05WQV9XQVJOSU5HICsgc3RyKTtcbiAgICB9LFxuICAgIGV4dGVuZDogZnVuY3Rpb24gKGNoaWxkLCBwYXJlbnQpIHtcbiAgICAgICAgZnVuY3Rpb24gQ3RvcigpIHtcbiAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgICBDdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7XG4gICAgICAgIHZhciBvbGRQcm90byA9IGNoaWxkLnByb3RvdHlwZTtcbiAgICAgICAgY2hpbGQucHJvdG90eXBlID0gbmV3IEN0b3IoKTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9sZFByb3RvKSB7XG4gICAgICAgICAgICBpZiAob2xkUHJvdG8uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNoaWxkLnByb3RvdHlwZVtrZXldID0gb2xkUHJvdG9ba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlO1xuICAgICAgICBjaGlsZC5zdXBlciA9IHBhcmVudDtcbiAgICB9LFxuICAgIF9nZXRDb250cm9sUG9pbnRzOiBmdW5jdGlvbiAoeDAsIHkwLCB4MSwgeTEsIHgyLCB5MiwgdCkge1xuICAgICAgICB2YXIgZDAxID0gTWF0aC5zcXJ0KE1hdGgucG93KHgxIC0geDAsIDIpICsgTWF0aC5wb3coeTEgLSB5MCwgMikpLCBkMTIgPSBNYXRoLnNxcnQoTWF0aC5wb3coeDIgLSB4MSwgMikgKyBNYXRoLnBvdyh5MiAtIHkxLCAyKSksIGZhID0gKHQgKiBkMDEpIC8gKGQwMSArIGQxMiksIGZiID0gKHQgKiBkMTIpIC8gKGQwMSArIGQxMiksIHAxeCA9IHgxIC0gZmEgKiAoeDIgLSB4MCksIHAxeSA9IHkxIC0gZmEgKiAoeTIgLSB5MCksIHAyeCA9IHgxICsgZmIgKiAoeDIgLSB4MCksIHAyeSA9IHkxICsgZmIgKiAoeTIgLSB5MCk7XG4gICAgICAgIHJldHVybiBbcDF4LCBwMXksIHAyeCwgcDJ5XTtcbiAgICB9LFxuICAgIF9leHBhbmRQb2ludHM6IGZ1bmN0aW9uIChwLCB0ZW5zaW9uKSB7XG4gICAgICAgIHZhciBsZW4gPSBwLmxlbmd0aCwgYWxsUG9pbnRzID0gW10sIG4sIGNwO1xuICAgICAgICBmb3IgKG4gPSAyOyBuIDwgbGVuIC0gMjsgbiArPSAyKSB7XG4gICAgICAgICAgICBjcCA9IGV4cG9ydHMuVXRpbC5fZ2V0Q29udHJvbFBvaW50cyhwW24gLSAyXSwgcFtuIC0gMV0sIHBbbl0sIHBbbiArIDFdLCBwW24gKyAyXSwgcFtuICsgM10sIHRlbnNpb24pO1xuICAgICAgICAgICAgYWxsUG9pbnRzLnB1c2goY3BbMF0pO1xuICAgICAgICAgICAgYWxsUG9pbnRzLnB1c2goY3BbMV0pO1xuICAgICAgICAgICAgYWxsUG9pbnRzLnB1c2gocFtuXSk7XG4gICAgICAgICAgICBhbGxQb2ludHMucHVzaChwW24gKyAxXSk7XG4gICAgICAgICAgICBhbGxQb2ludHMucHVzaChjcFsyXSk7XG4gICAgICAgICAgICBhbGxQb2ludHMucHVzaChjcFszXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFsbFBvaW50cztcbiAgICB9LFxuICAgIGVhY2g6IGZ1bmN0aW9uIChvYmosIGZ1bmMpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgICAgZnVuYyhrZXksIG9ialtrZXldKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2luUmFuZ2U6IGZ1bmN0aW9uICh2YWwsIGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgIHJldHVybiBsZWZ0IDw9IHZhbCAmJiB2YWwgPCByaWdodDtcbiAgICB9LFxuICAgIF9nZXRQcm9qZWN0aW9uVG9TZWdtZW50OiBmdW5jdGlvbiAoeDEsIHkxLCB4MiwgeTIsIHgzLCB5Mykge1xuICAgICAgICB2YXIgeCwgeSwgZGlzdDtcbiAgICAgICAgdmFyIHBkMiA9ICh4MSAtIHgyKSAqICh4MSAtIHgyKSArICh5MSAtIHkyKSAqICh5MSAtIHkyKTtcbiAgICAgICAgaWYgKHBkMiA9PSAwKSB7XG4gICAgICAgICAgICB4ID0geDE7XG4gICAgICAgICAgICB5ID0geTE7XG4gICAgICAgICAgICBkaXN0ID0gKHgzIC0geDIpICogKHgzIC0geDIpICsgKHkzIC0geTIpICogKHkzIC0geTIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHUgPSAoKHgzIC0geDEpICogKHgyIC0geDEpICsgKHkzIC0geTEpICogKHkyIC0geTEpKSAvIHBkMjtcbiAgICAgICAgICAgIGlmICh1IDwgMCkge1xuICAgICAgICAgICAgICAgIHggPSB4MTtcbiAgICAgICAgICAgICAgICB5ID0geTE7XG4gICAgICAgICAgICAgICAgZGlzdCA9ICh4MSAtIHgzKSAqICh4MSAtIHgzKSArICh5MSAtIHkzKSAqICh5MSAtIHkzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHUgPiAxLjApIHtcbiAgICAgICAgICAgICAgICB4ID0geDI7XG4gICAgICAgICAgICAgICAgeSA9IHkyO1xuICAgICAgICAgICAgICAgIGRpc3QgPSAoeDIgLSB4MykgKiAoeDIgLSB4MykgKyAoeTIgLSB5MykgKiAoeTIgLSB5Myk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB4ID0geDEgKyB1ICogKHgyIC0geDEpO1xuICAgICAgICAgICAgICAgIHkgPSB5MSArIHUgKiAoeTIgLSB5MSk7XG4gICAgICAgICAgICAgICAgZGlzdCA9ICh4IC0geDMpICogKHggLSB4MykgKyAoeSAtIHkzKSAqICh5IC0geTMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbeCwgeSwgZGlzdF07XG4gICAgfSxcbiAgICBfZ2V0UHJvamVjdGlvblRvTGluZTogZnVuY3Rpb24gKHB0LCBsaW5lLCBpc0Nsb3NlZCkge1xuICAgICAgICB2YXIgcGMgPSBleHBvcnRzLlV0aWwuY2xvbmVPYmplY3QocHQpO1xuICAgICAgICB2YXIgZGlzdCA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgIGxpbmUuZm9yRWFjaChmdW5jdGlvbiAocDEsIGkpIHtcbiAgICAgICAgICAgIGlmICghaXNDbG9zZWQgJiYgaSA9PT0gbGluZS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHAyID0gbGluZVsoaSArIDEpICUgbGluZS5sZW5ndGhdO1xuICAgICAgICAgICAgdmFyIHByb2ogPSBleHBvcnRzLlV0aWwuX2dldFByb2plY3Rpb25Ub1NlZ21lbnQocDEueCwgcDEueSwgcDIueCwgcDIueSwgcHQueCwgcHQueSk7XG4gICAgICAgICAgICB2YXIgcHggPSBwcm9qWzBdLCBweSA9IHByb2pbMV0sIHBkaXN0ID0gcHJvalsyXTtcbiAgICAgICAgICAgIGlmIChwZGlzdCA8IGRpc3QpIHtcbiAgICAgICAgICAgICAgICBwYy54ID0gcHg7XG4gICAgICAgICAgICAgICAgcGMueSA9IHB5O1xuICAgICAgICAgICAgICAgIGRpc3QgPSBwZGlzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwYztcbiAgICB9LFxuICAgIF9wcmVwYXJlQXJyYXlGb3JUd2VlbjogZnVuY3Rpb24gKHN0YXJ0QXJyYXksIGVuZEFycmF5LCBpc0Nsb3NlZCkge1xuICAgICAgICB2YXIgbiwgc3RhcnQgPSBbXSwgZW5kID0gW107XG4gICAgICAgIGlmIChzdGFydEFycmF5Lmxlbmd0aCA+IGVuZEFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIHRlbXAgPSBlbmRBcnJheTtcbiAgICAgICAgICAgIGVuZEFycmF5ID0gc3RhcnRBcnJheTtcbiAgICAgICAgICAgIHN0YXJ0QXJyYXkgPSB0ZW1wO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBzdGFydEFycmF5Lmxlbmd0aDsgbiArPSAyKSB7XG4gICAgICAgICAgICBzdGFydC5wdXNoKHtcbiAgICAgICAgICAgICAgICB4OiBzdGFydEFycmF5W25dLFxuICAgICAgICAgICAgICAgIHk6IHN0YXJ0QXJyYXlbbiArIDFdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgZW5kQXJyYXkubGVuZ3RoOyBuICs9IDIpIHtcbiAgICAgICAgICAgIGVuZC5wdXNoKHtcbiAgICAgICAgICAgICAgICB4OiBlbmRBcnJheVtuXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRBcnJheVtuICsgMV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdTdGFydCA9IFtdO1xuICAgICAgICBlbmQuZm9yRWFjaChmdW5jdGlvbiAocG9pbnQpIHtcbiAgICAgICAgICAgIHZhciBwciA9IGV4cG9ydHMuVXRpbC5fZ2V0UHJvamVjdGlvblRvTGluZShwb2ludCwgc3RhcnQsIGlzQ2xvc2VkKTtcbiAgICAgICAgICAgIG5ld1N0YXJ0LnB1c2gocHIueCk7XG4gICAgICAgICAgICBuZXdTdGFydC5wdXNoKHByLnkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ld1N0YXJ0O1xuICAgIH0sXG4gICAgX3ByZXBhcmVUb1N0cmluZ2lmeTogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB2YXIgZGVzYztcbiAgICAgICAgb2JqLnZpc2l0ZWRCeUNpcmN1bGFyUmVmZXJlbmNlUmVtb3ZhbCA9IHRydWU7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmICghKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIG9ialtrZXldICYmIHR5cGVvZiBvYmpba2V5XSA9PSAnb2JqZWN0JykpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgICAgIGlmIChvYmpba2V5XS52aXNpdGVkQnlDaXJjdWxhclJlZmVyZW5jZVJlbW92YWwgfHxcbiAgICAgICAgICAgICAgICBleHBvcnRzLlV0aWwuX2lzRWxlbWVudChvYmpba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVzYy5jb25maWd1cmFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZXhwb3J0cy5VdGlsLl9wcmVwYXJlVG9TdHJpbmdpZnkob2JqW2tleV0pID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlc2MuY29uZmlndXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmpba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgb2JqLnZpc2l0ZWRCeUNpcmN1bGFyUmVmZXJlbmNlUmVtb3ZhbDtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9LFxuICAgIF9hc3NpZ246IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEdsb2JhbF8xID0gcmVxdWlyZShcIi4vR2xvYmFsXCIpO1xudmFyIFV0aWxfMSA9IHJlcXVpcmUoXCIuL1V0aWxcIik7XG5mdW5jdGlvbiBfZm9ybWF0VmFsdWUodmFsKSB7XG4gICAgaWYgKFV0aWxfMS5VdGlsLl9pc1N0cmluZyh2YWwpKSB7XG4gICAgICAgIHJldHVybiAnXCInICsgdmFsICsgJ1wiJztcbiAgICB9XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBOdW1iZXJdJykge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgICBpZiAoVXRpbF8xLlV0aWwuX2lzQm9vbGVhbih2YWwpKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKTtcbn1cbmZ1bmN0aW9uIFJHQkNvbXBvbmVudCh2YWwpIHtcbiAgICBpZiAodmFsID4gMjU1KSB7XG4gICAgICAgIHJldHVybiAyNTU7XG4gICAgfVxuICAgIGVsc2UgaWYgKHZhbCA8IDApIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbCk7XG59XG5leHBvcnRzLlJHQkNvbXBvbmVudCA9IFJHQkNvbXBvbmVudDtcbmZ1bmN0aW9uIGFscGhhQ29tcG9uZW50KHZhbCkge1xuICAgIGlmICh2YWwgPiAxKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBlbHNlIGlmICh2YWwgPCAwLjAwMDEpIHtcbiAgICAgICAgcmV0dXJuIDAuMDAwMTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbn1cbmV4cG9ydHMuYWxwaGFDb21wb25lbnQgPSBhbHBoYUNvbXBvbmVudDtcbmZ1bmN0aW9uIGdldE51bWJlclZhbGlkYXRvcigpIHtcbiAgICBpZiAoR2xvYmFsXzEuS29udmEuaXNVbm1pbmlmaWVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgICBpZiAoIVV0aWxfMS5VdGlsLl9pc051bWJlcih2YWwpKSB7XG4gICAgICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybihfZm9ybWF0VmFsdWUodmFsKSArXG4gICAgICAgICAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgc2hvdWxkIGJlIGEgbnVtYmVyLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLmdldE51bWJlclZhbGlkYXRvciA9IGdldE51bWJlclZhbGlkYXRvcjtcbmZ1bmN0aW9uIGdldE51bWJlck9yQXV0b1ZhbGlkYXRvcigpIHtcbiAgICBpZiAoR2xvYmFsXzEuS29udmEuaXNVbm1pbmlmaWVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgICB2YXIgaXNOdW1iZXIgPSBVdGlsXzEuVXRpbC5faXNOdW1iZXIodmFsKTtcbiAgICAgICAgICAgIHZhciBpc0F1dG8gPSB2YWwgPT09ICdhdXRvJztcbiAgICAgICAgICAgIGlmICghKGlzTnVtYmVyIHx8IGlzQXV0bykpIHtcbiAgICAgICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKF9mb3JtYXRWYWx1ZSh2YWwpICtcbiAgICAgICAgICAgICAgICAgICAgJyBpcyBhIG5vdCB2YWxpZCB2YWx1ZSBmb3IgXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ciArXG4gICAgICAgICAgICAgICAgICAgICdcIiBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBzaG91bGQgYmUgYSBudW1iZXIgb3IgXCJhdXRvXCIuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0TnVtYmVyT3JBdXRvVmFsaWRhdG9yID0gZ2V0TnVtYmVyT3JBdXRvVmFsaWRhdG9yO1xuZnVuY3Rpb24gZ2V0U3RyaW5nVmFsaWRhdG9yKCkge1xuICAgIGlmIChHbG9iYWxfMS5Lb252YS5pc1VubWluaWZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIGF0dHIpIHtcbiAgICAgICAgICAgIGlmICghVXRpbF8xLlV0aWwuX2lzU3RyaW5nKHZhbCkpIHtcbiAgICAgICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKF9mb3JtYXRWYWx1ZSh2YWwpICtcbiAgICAgICAgICAgICAgICAgICAgJyBpcyBhIG5vdCB2YWxpZCB2YWx1ZSBmb3IgXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ciArXG4gICAgICAgICAgICAgICAgICAgICdcIiBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBzaG91bGQgYmUgYSBzdHJpbmcuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0U3RyaW5nVmFsaWRhdG9yID0gZ2V0U3RyaW5nVmFsaWRhdG9yO1xuZnVuY3Rpb24gZ2V0RnVuY3Rpb25WYWxpZGF0b3IoKSB7XG4gICAgaWYgKEdsb2JhbF8xLktvbnZhLmlzVW5taW5pZmllZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCwgYXR0cikge1xuICAgICAgICAgICAgaWYgKCFVdGlsXzEuVXRpbC5faXNGdW5jdGlvbih2YWwpKSB7XG4gICAgICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybihfZm9ybWF0VmFsdWUodmFsKSArXG4gICAgICAgICAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgc2hvdWxkIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0RnVuY3Rpb25WYWxpZGF0b3IgPSBnZXRGdW5jdGlvblZhbGlkYXRvcjtcbmZ1bmN0aW9uIGdldE51bWJlckFycmF5VmFsaWRhdG9yKCkge1xuICAgIGlmIChHbG9iYWxfMS5Lb252YS5pc1VubWluaWZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIGF0dHIpIHtcbiAgICAgICAgICAgIGlmICghVXRpbF8xLlV0aWwuX2lzQXJyYXkodmFsKSkge1xuICAgICAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oX2Zvcm1hdFZhbHVlKHZhbCkgK1xuICAgICAgICAgICAgICAgICAgICAnIGlzIGEgbm90IHZhbGlkIHZhbHVlIGZvciBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRyICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGF0dHJpYnV0ZS4gVGhlIHZhbHVlIHNob3VsZCBiZSBhIGFycmF5IG9mIG51bWJlcnMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWwuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIVV0aWxfMS5VdGlsLl9pc051bWJlcihpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybignXCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlIGhhcyBub24gbnVtZXJpYyBlbGVtZW50ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuIE1ha2Ugc3VyZSB0aGF0IGFsbCBlbGVtZW50cyBhcmUgbnVtYmVycy4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLmdldE51bWJlckFycmF5VmFsaWRhdG9yID0gZ2V0TnVtYmVyQXJyYXlWYWxpZGF0b3I7XG5mdW5jdGlvbiBnZXRCb29sZWFuVmFsaWRhdG9yKCkge1xuICAgIGlmIChHbG9iYWxfMS5Lb252YS5pc1VubWluaWZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIGF0dHIpIHtcbiAgICAgICAgICAgIHZhciBpc0Jvb2wgPSB2YWwgPT09IHRydWUgfHwgdmFsID09PSBmYWxzZTtcbiAgICAgICAgICAgIGlmICghaXNCb29sKSB7XG4gICAgICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybihfZm9ybWF0VmFsdWUodmFsKSArXG4gICAgICAgICAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgc2hvdWxkIGJlIGEgYm9vbGVhbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5nZXRCb29sZWFuVmFsaWRhdG9yID0gZ2V0Qm9vbGVhblZhbGlkYXRvcjtcbmZ1bmN0aW9uIGdldENvbXBvbmVudFZhbGlkYXRvcihjb21wb25lbnRzKSB7XG4gICAgaWYgKEdsb2JhbF8xLktvbnZhLmlzVW5taW5pZmllZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCwgYXR0cikge1xuICAgICAgICAgICAgaWYgKCFVdGlsXzEuVXRpbC5pc09iamVjdCh2YWwpKSB7XG4gICAgICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybihfZm9ybWF0VmFsdWUodmFsKSArXG4gICAgICAgICAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgc2hvdWxkIGJlIGFuIG9iamVjdCB3aXRoIHByb3BlcnRpZXMgJyArXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLmdldENvbXBvbmVudFZhbGlkYXRvciA9IGdldENvbXBvbmVudFZhbGlkYXRvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVXRpbF8xID0gcmVxdWlyZShcIi4uL1V0aWxcIik7XG52YXIgRmFjdG9yeV8xID0gcmVxdWlyZShcIi4uL0ZhY3RvcnlcIik7XG52YXIgU2hhcGVfMSA9IHJlcXVpcmUoXCIuLi9TaGFwZVwiKTtcbnZhciBWYWxpZGF0b3JzXzEgPSByZXF1aXJlKFwiLi4vVmFsaWRhdG9yc1wiKTtcbnZhciBHbG9iYWxfMSA9IHJlcXVpcmUoXCIuLi9HbG9iYWxcIik7XG52YXIgQ2lyY2xlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ2lyY2xlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENpcmNsZSgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBDaXJjbGUucHJvdG90eXBlLl9zY2VuZUZ1bmMgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmFyYygwLCAwLCB0aGlzLnJhZGl1cygpLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHJva2VTaGFwZSh0aGlzKTtcbiAgICB9O1xuICAgIENpcmNsZS5wcm90b3R5cGUuZ2V0V2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhZGl1cygpICogMjtcbiAgICB9O1xuICAgIENpcmNsZS5wcm90b3R5cGUuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yYWRpdXMoKSAqIDI7XG4gICAgfTtcbiAgICBDaXJjbGUucHJvdG90eXBlLnNldFdpZHRoID0gZnVuY3Rpb24gKHdpZHRoKSB7XG4gICAgICAgIGlmICh0aGlzLnJhZGl1cygpICE9PSB3aWR0aCAvIDIpIHtcbiAgICAgICAgICAgIHRoaXMucmFkaXVzKHdpZHRoIC8gMik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENpcmNsZS5wcm90b3R5cGUuc2V0SGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodCkge1xuICAgICAgICBpZiAodGhpcy5yYWRpdXMoKSAhPT0gaGVpZ2h0IC8gMikge1xuICAgICAgICAgICAgdGhpcy5yYWRpdXMoaGVpZ2h0IC8gMik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDaXJjbGU7XG59KFNoYXBlXzEuU2hhcGUpKTtcbmV4cG9ydHMuQ2lyY2xlID0gQ2lyY2xlO1xuQ2lyY2xlLnByb3RvdHlwZS5fY2VudHJvaWQgPSB0cnVlO1xuQ2lyY2xlLnByb3RvdHlwZS5jbGFzc05hbWUgPSAnQ2lyY2xlJztcbkNpcmNsZS5wcm90b3R5cGUuX2F0dHJzQWZmZWN0aW5nU2l6ZSA9IFsncmFkaXVzJ107XG5HbG9iYWxfMS5fcmVnaXN0ZXJOb2RlKENpcmNsZSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoQ2lyY2xlLCAncmFkaXVzJywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcblV0aWxfMS5Db2xsZWN0aW9uLm1hcE1ldGhvZHMoQ2lyY2xlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVXRpbF8xID0gcmVxdWlyZShcIi4uL1V0aWxcIik7XG52YXIgRmFjdG9yeV8xID0gcmVxdWlyZShcIi4uL0ZhY3RvcnlcIik7XG52YXIgU2hhcGVfMSA9IHJlcXVpcmUoXCIuLi9TaGFwZVwiKTtcbnZhciBWYWxpZGF0b3JzXzEgPSByZXF1aXJlKFwiLi4vVmFsaWRhdG9yc1wiKTtcbnZhciBHbG9iYWxfMSA9IHJlcXVpcmUoXCIuLi9HbG9iYWxcIik7XG52YXIgUmVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJlY3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBSZWN0LnByb3RvdHlwZS5fc2NlbmVGdW5jID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGNvcm5lclJhZGl1cyA9IHRoaXMuY29ybmVyUmFkaXVzKCksIHdpZHRoID0gdGhpcy53aWR0aCgpLCBoZWlnaHQgPSB0aGlzLmhlaWdodCgpO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBpZiAoIWNvcm5lclJhZGl1cykge1xuICAgICAgICAgICAgY29udGV4dC5yZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29ybmVyUmFkaXVzID0gTWF0aC5taW4oY29ybmVyUmFkaXVzLCB3aWR0aCAvIDIsIGhlaWdodCAvIDIpO1xuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oY29ybmVyUmFkaXVzLCAwKTtcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHdpZHRoIC0gY29ybmVyUmFkaXVzLCAwKTtcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKHdpZHRoIC0gY29ybmVyUmFkaXVzLCBjb3JuZXJSYWRpdXMsIGNvcm5lclJhZGl1cywgKE1hdGguUEkgKiAzKSAvIDIsIDAsIGZhbHNlKTtcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHdpZHRoLCBoZWlnaHQgLSBjb3JuZXJSYWRpdXMpO1xuICAgICAgICAgICAgY29udGV4dC5hcmMod2lkdGggLSBjb3JuZXJSYWRpdXMsIGhlaWdodCAtIGNvcm5lclJhZGl1cywgY29ybmVyUmFkaXVzLCAwLCBNYXRoLlBJIC8gMiwgZmFsc2UpO1xuICAgICAgICAgICAgY29udGV4dC5saW5lVG8oY29ybmVyUmFkaXVzLCBoZWlnaHQpO1xuICAgICAgICAgICAgY29udGV4dC5hcmMoY29ybmVyUmFkaXVzLCBoZWlnaHQgLSBjb3JuZXJSYWRpdXMsIGNvcm5lclJhZGl1cywgTWF0aC5QSSAvIDIsIE1hdGguUEksIGZhbHNlKTtcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKDAsIGNvcm5lclJhZGl1cyk7XG4gICAgICAgICAgICBjb250ZXh0LmFyYyhjb3JuZXJSYWRpdXMsIGNvcm5lclJhZGl1cywgY29ybmVyUmFkaXVzLCBNYXRoLlBJLCAoTWF0aC5QSSAqIDMpIC8gMiwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0cm9rZVNoYXBlKHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIFJlY3Q7XG59KFNoYXBlXzEuU2hhcGUpKTtcbmV4cG9ydHMuUmVjdCA9IFJlY3Q7XG5SZWN0LnByb3RvdHlwZS5jbGFzc05hbWUgPSAnUmVjdCc7XG5HbG9iYWxfMS5fcmVnaXN0ZXJOb2RlKFJlY3QpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFJlY3QsICdjb3JuZXJSYWRpdXMnLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuVXRpbF8xLkNvbGxlY3Rpb24ubWFwTWV0aG9kcyhSZWN0KTtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxubW9kdWxlLmV4cG9ydHMgPSBTeW1ib2w7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgZ2V0UmF3VGFnID0gcmVxdWlyZSgnLi9fZ2V0UmF3VGFnJyksXG4gICAgb2JqZWN0VG9TdHJpbmcgPSByZXF1aXJlKCcuL19vYmplY3RUb1N0cmluZycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0VGFnO1xuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmF3VGFnO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0VG9TdHJpbmc7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgbm93ID0gcmVxdWlyZSgnLi9ub3cnKSxcbiAgICB0b051bWJlciA9IHJlcXVpcmUoJy4vdG9OdW1iZXInKTtcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHRpbWVXYWl0aW5nID0gd2FpdCAtIHRpbWVTaW5jZUxhc3RDYWxsO1xuXG4gICAgcmV0dXJuIG1heGluZ1xuICAgICAgPyBuYXRpdmVNaW4odGltZVdhaXRpbmcsIG1heFdhaXQgLSB0aW1lU2luY2VMYXN0SW52b2tlKVxuICAgICAgOiB0aW1lV2FpdGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEludm9rZSh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcblxuICAgIC8vIEVpdGhlciB0aGlzIGlzIHRoZSBmaXJzdCBjYWxsLCBhY3Rpdml0eSBoYXMgc3RvcHBlZCBhbmQgd2UncmUgYXQgdGhlXG4gICAgLy8gdHJhaWxpbmcgZWRnZSwgdGhlIHN5c3RlbSB0aW1lIGhhcyBnb25lIGJhY2t3YXJkcyBhbmQgd2UncmUgdHJlYXRpbmdcbiAgICAvLyBpdCBhcyB0aGUgdHJhaWxpbmcgZWRnZSwgb3Igd2UndmUgaGl0IHRoZSBgbWF4V2FpdGAgbGltaXQuXG4gICAgcmV0dXJuIChsYXN0Q2FsbFRpbWUgPT09IHVuZGVmaW5lZCB8fCAodGltZVNpbmNlTGFzdENhbGwgPj0gd2FpdCkgfHxcbiAgICAgICh0aW1lU2luY2VMYXN0Q2FsbCA8IDApIHx8IChtYXhpbmcgJiYgdGltZVNpbmNlTGFzdEludm9rZSA+PSBtYXhXYWl0KSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lckV4cGlyZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICBpZiAoc2hvdWxkSW52b2tlKHRpbWUpKSB7XG4gICAgICByZXR1cm4gdHJhaWxpbmdFZGdlKHRpbWUpO1xuICAgIH1cbiAgICAvLyBSZXN0YXJ0IHRoZSB0aW1lci5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHJlbWFpbmluZ1dhaXQodGltZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxpbmdFZGdlKHRpbWUpIHtcbiAgICB0aW1lcklkID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gT25seSBpbnZva2UgaWYgd2UgaGF2ZSBgbGFzdEFyZ3NgIHdoaWNoIG1lYW5zIGBmdW5jYCBoYXMgYmVlblxuICAgIC8vIGRlYm91bmNlZCBhdCBsZWFzdCBvbmNlLlxuICAgIGlmICh0cmFpbGluZyAmJiBsYXN0QXJncykge1xuICAgICAgcmV0dXJuIGludm9rZUZ1bmModGltZSk7XG4gICAgfVxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHJldHVybiB0aW1lcklkID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiB0cmFpbGluZ0VkZ2Uobm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCksXG4gICAgICAgIGlzSW52b2tpbmcgPSBzaG91bGRJbnZva2UodGltZSk7XG5cbiAgICBsYXN0QXJncyA9IGFyZ3VtZW50cztcbiAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgbGFzdENhbGxUaW1lID0gdGltZTtcblxuICAgIGlmIChpc0ludm9raW5nKSB7XG4gICAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG1heGluZykge1xuICAgICAgICAvLyBIYW5kbGUgaW52b2NhdGlvbnMgaW4gYSB0aWdodCBsb29wLlxuICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgICAgICByZXR1cm4gaW52b2tlRnVuYyhsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGRlYm91bmNlZC5jYW5jZWwgPSBjYW5jZWw7XG4gIGRlYm91bmNlZC5mbHVzaCA9IGZsdXNoO1xuICByZXR1cm4gZGVib3VuY2VkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG4iLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTeW1ib2w7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSB0aW1lc3RhbXAgb2YgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2VcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBEYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcbiAqICAgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTtcbiAqIH0sIF8ubm93KCkpO1xuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cbiAqL1xudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBub3c7XG4iLCJ2YXIgZGVib3VuY2UgPSByZXF1aXJlKCcuL2RlYm91bmNlJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHRocm90dGxlZCBmdW5jdGlvbiB0aGF0IG9ubHkgaW52b2tlcyBgZnVuY2AgYXQgbW9zdCBvbmNlIHBlclxuICogZXZlcnkgYHdhaXRgIG1pbGxpc2Vjb25kcy4gVGhlIHRocm90dGxlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGBcbiAqIG1ldGhvZCB0byBjYW5jZWwgZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG9cbiAqIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYFxuICogc2hvdWxkIGJlIGludm9rZWQgb24gdGhlIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YFxuICogdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZVxuICogdGhyb3R0bGVkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50IGNhbGxzIHRvIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gcmV0dXJuIHRoZVxuICogcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLnRocm90dGxlYCBhbmQgYF8uZGVib3VuY2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gdGhyb3R0bGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhyb3R0bGUgaW52b2NhdGlvbnMgdG8uXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgdGhyb3R0bGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBleGNlc3NpdmVseSB1cGRhdGluZyB0aGUgcG9zaXRpb24gd2hpbGUgc2Nyb2xsaW5nLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Njcm9sbCcsIF8udGhyb3R0bGUodXBkYXRlUG9zaXRpb24sIDEwMCkpO1xuICpcbiAqIC8vIEludm9rZSBgcmVuZXdUb2tlbmAgd2hlbiB0aGUgY2xpY2sgZXZlbnQgaXMgZmlyZWQsIGJ1dCBub3QgbW9yZSB0aGFuIG9uY2UgZXZlcnkgNSBtaW51dGVzLlxuICogdmFyIHRocm90dGxlZCA9IF8udGhyb3R0bGUocmVuZXdUb2tlbiwgMzAwMDAwLCB7ICd0cmFpbGluZyc6IGZhbHNlIH0pO1xuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIHRocm90dGxlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyB0aHJvdHRsZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIHRocm90dGxlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsZWFkaW5nID0gdHJ1ZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gJ2xlYWRpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMubGVhZGluZyA6IGxlYWRpbmc7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuICByZXR1cm4gZGVib3VuY2UoZnVuYywgd2FpdCwge1xuICAgICdsZWFkaW5nJzogbGVhZGluZyxcbiAgICAnbWF4V2FpdCc6IHdhaXQsXG4gICAgJ3RyYWlsaW5nJzogdHJhaWxpbmdcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGhyb3R0bGU7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b051bWJlcjtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsImltcG9ydCB7U3RhZ2V9IGZyb20gJ2tvbnZhL2xpYi9TdGFnZSc7XG5pbXBvcnQge0xheWVyfSBmcm9tICdrb252YS9saWIvTGF5ZXInO1xuaW1wb3J0IHtSZWN0fSBmcm9tICdrb252YS9saWIvc2hhcGVzL1JlY3QnO1xuaW1wb3J0IHtDaXJjbGV9IGZyb20gJ2tvbnZhL2xpYi9zaGFwZXMvQ2lyY2xlJztcbmltcG9ydCB7VHdlZW4sIEVhc2luZ3N9IGZyb20gJ2tvbnZhL2xpYi9Ud2Vlbic7XG5pbXBvcnQgdGhyb3R0bGUgZnJvbSAnbG9kYXNoL3Rocm90dGxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja2dyb3VuZERvdHMge1xuICBzdGF0aWMgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAxKScsXG4gICAgZG90Q29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSknLFxuICAgIGd1dHRlcjogMzAsXG4gICAgcmFkaXVzOiAxLFxuICAgIGJ1YmJsZVJhZGl1czogMzAwLFxuICAgIG1hZ25ldGljUG93ZXI6IDAuMTUsXG4gICAgb3BhY2l0eTogMC41LFxuICAgIGRlYnVnOiBmYWxzZVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5pc01vdXNlT3ZlciA9IGZhbHNlO1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIC4uLkJhY2tncm91bmREb3RzLmRlZmF1bHRPcHRpb25zLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG5cbiAgICB0aGlzLmdyaWQgPSBbXTtcblxuICAgIHRoaXMuc3RhZ2UgPSBuZXcgU3RhZ2Uoe1xuICAgICAgY29udGFpbmVyOiB0aGlzLmVsZW1lbnQsXG4gICAgICB3aWR0aDogdGhpcy5lbGVtZW50Lm9mZnNldFdpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0XG4gICAgfSk7XG5cbiAgICB0aGlzLmxheWVyID0gbmV3IExheWVyKCk7XG4gICAgdGhpcy5zdGFnZS5hZGQodGhpcy5sYXllcik7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhyb3R0bGUodGhpcy5fcmVzaXplSGFuZGxlci5iaW5kKHRoaXMpLCAxNTApKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fbW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5fZG9jdW1lbnRNb3VzZU91dEhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fZHJhd0hlbHBlcnMoKTtcblxuICAgIHRoaXMuX2RyYXcoKTtcbiAgfVxuXG4gIF9kcmF3KCkge1xuICAgIHRoaXMuX2RyYXdCYWNrZ3JvdW5kKCk7XG4gICAgdGhpcy5fZHJhd0dyaWQoKTtcbiAgICB0aGlzLl9yZWRyYXcoKTtcbiAgfVxuXG4gIF9kcmF3SGVscGVycygpIHtcbiAgICB0aGlzLmhlbHBlciA9IG5ldyBDaXJjbGUoe1xuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgICByYWRpdXM6IDIsXG4gICAgICBmaWxsOiAnI2ZmMDAwMCdcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcpIHtcbiAgICAgIHRoaXMubGF5ZXIuYWRkKHRoaXMuaGVscGVyKTtcbiAgICB9XG4gIH1cblxuICBfZHJhd0JhY2tncm91bmQoKSB7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IFJlY3Qoe1xuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgICB3aWR0aDogdGhpcy5zdGFnZS53aWR0aCgpLFxuICAgICAgaGVpZ2h0OiB0aGlzLnN0YWdlLmhlaWdodCgpLFxuICAgICAgZmlsbDogdGhpcy5vcHRpb25zLmJhY2tncm91bmRDb2xvclxuICAgIH0pO1xuXG4gICAgdGhpcy5sYXllci5hZGQodGhpcy5iYWNrZ3JvdW5kKTtcbiAgfVxuXG4gIF9kcmF3R3JpZCgpIHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuc3RhZ2Uud2lkdGgoKTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnN0YWdlLmhlaWdodCgpO1xuICAgIGNvbnN0IHtndXR0ZXIsIHJhZGl1cywgZG90Q29sb3J9ID0gdGhpcy5vcHRpb25zO1xuICAgIGNvbnN0IHhDb3VudCA9IE1hdGgucm91bmQod2lkdGggLyB0aGlzLm9wdGlvbnMuZ3V0dGVyKTtcbiAgICBjb25zdCB5Q291bnQgPSBNYXRoLnJvdW5kKGhlaWdodCAvIHRoaXMub3B0aW9ucy5ndXR0ZXIpO1xuXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmdyaWQubGVuZ3RoOyB5KyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZFt5XTtcblxuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCByb3cubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgY29uc3QgY2lyY2xlID0gcm93W3hdO1xuXG4gICAgICAgIGNpcmNsZS5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5ncmlkID0gW107XG5cbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSB5Q291bnQ7IHkrKykge1xuICAgICAgY29uc3Qgcm93ID0gW107XG5cbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDw9IHhDb3VudDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IGNpcmNsZVggPSB4ICogZ3V0dGVyO1xuICAgICAgICBjb25zdCBjaXJjbGVZID0geSAqIGd1dHRlcjtcblxuICAgICAgICBjb25zdCBjaXJjbGUgPSBuZXcgQ2lyY2xlKHtcbiAgICAgICAgICB4OiBjaXJjbGVYLFxuICAgICAgICAgIHk6IGNpcmNsZVksXG4gICAgICAgICAgcmFkaXVzLFxuICAgICAgICAgIGZpbGw6IGRvdENvbG9yLFxuICAgICAgICAgIG9wYWNpdHk6IHRoaXMub3B0aW9ucy5vcGFjaXR5XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNpcmNsZS5iYXNlWCA9IGNpcmNsZVg7XG4gICAgICAgIGNpcmNsZS5iYXNlWSA9IGNpcmNsZVk7XG5cbiAgICAgICAgdGhpcy5sYXllci5hZGQoY2lyY2xlKTtcbiAgICAgICAgcm93LnB1c2goY2lyY2xlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZ3JpZC5wdXNoKHJvdyk7XG4gICAgfVxuICB9XG5cbiAgX3JlZHJhdygpIHtcbiAgICB0aGlzLmxheWVyLmJhdGNoRHJhdygpO1xuICB9XG5cbiAgX3Jlc2l6ZUhhbmRsZXIoKSB7XG4gICAgY29uc3Qge3N0YWdlLCBlbGVtZW50fSA9IHRoaXM7XG5cbiAgICBzdGFnZS53aWR0aChlbGVtZW50Lm9mZnNldFdpZHRoKTtcbiAgICBzdGFnZS5oZWlnaHQoZWxlbWVudC5vZmZzZXRIZWlnaHQpO1xuXG4gICAgdGhpcy5fZHJhdygpO1xuICB9XG5cbiAgX21vdXNlTW92ZUhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zdCB7Y2xpZW50WCwgY2xpZW50WX0gPSBldmVudDtcblxuICAgIGlmICghdGhpcy5faXNPdmVyU3RhZ2UoY2xpZW50WCwgY2xpZW50WSkpIHtcbiAgICAgIGlmICh0aGlzLmlzTW91c2VPdmVyKSB7XG4gICAgICAgIHRoaXMuX2NsZWFuKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmlzTW91c2VPdmVyID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNsaWVudFJlY3QgPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgc3RhZ2VYID0gY2xpZW50WDtcbiAgICBjb25zdCBzdGFnZVkgPSBjbGllbnRZIC0gY2xpZW50UmVjdC55O1xuXG4gICAgdGhpcy5pc01vdXNlT3ZlciA9IHRydWU7XG5cbiAgICBjb25zdCB7eCwgeX0gPSB0aGlzLl9nZXRHcmlkQ29vcmRpbmF0ZXMoc3RhZ2VYLCBzdGFnZVkpO1xuXG4gICAgdGhpcy5oZWxwZXIueCh4ICogdGhpcy5vcHRpb25zLmd1dHRlcik7XG4gICAgdGhpcy5oZWxwZXIueSh5ICogdGhpcy5vcHRpb25zLmd1dHRlcik7XG5cbiAgICB0aGlzLl91cGRhdGVDaXJjbGVzQXJvdW5kKHN0YWdlWCwgc3RhZ2VZKTtcblxuICAgIHRoaXMuX3JlZHJhdygpO1xuICB9XG5cbiAgX2RvY3VtZW50TW91c2VPdXRIYW5kbGVyKGUpIHtcbiAgICBjb25zdCBldmVudCA9IGUgPyBlIDogd2luZG93LmV2ZW50O1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG5cbiAgICBpZiAoIXRhcmdldCB8fCB0YXJnZXQubm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgICAgdGhpcy5fY2xlYW4oKTtcbiAgICB9XG4gIH1cblxuICBfaXNPdmVyU3RhZ2UoeCwgeSkge1xuICAgIGNvbnN0IGNsaWVudFJlY3QgPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICByZXR1cm4gKGNsaWVudFJlY3QudG9wIDw9IHkgJiYgY2xpZW50UmVjdC5ib3R0b20gPj0geSAmJiBjbGllbnRSZWN0LmxlZnQgPD0geCAmJiBjbGllbnRSZWN0LnJpZ2h0ID49IHgpO1xuICB9XG5cbiAgX2dldEdyaWRDb29yZGluYXRlcyh4LCB5KSB7XG4gICAgY29uc3Qge2d1dHRlcn0gPSB0aGlzLm9wdGlvbnM7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLnN0YWdlLndpZHRoKCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5zdGFnZS5oZWlnaHQoKTtcblxuICAgIHJldHVybiB7XG4gICAgICB4OiBNYXRoLnJvdW5kKHggLyB3aWR0aCAqIHdpZHRoIC8gZ3V0dGVyKSxcbiAgICAgIHk6IE1hdGgucm91bmQoeSAvIGhlaWdodCAqIGhlaWdodCAvIGd1dHRlcilcbiAgICB9O1xuICB9XG5cbiAgX3VwZGF0ZUNpcmNsZXNBcm91bmQoY2VudGVyWCwgY2VudGVyWSkge1xuICAgIC8vIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGNvbnN0IHtidWJibGVSYWRpdXN9ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmdyaWQubGVuZ3RoOyB5KyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZFt5XTtcblxuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCByb3cubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgY29uc3QgY2lyY2xlID0gcm93W3hdO1xuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhjaXJjbGUueCgpIC0gY2VudGVyWCwgMikgKyBNYXRoLnBvdyhjaXJjbGUueSgpIC0gY2VudGVyWSwgMikpO1xuXG4gICAgICAgIGlmIChkaXN0YW5jZSA8PSBidWJibGVSYWRpdXMpIHtcbiAgICAgICAgICB0aGlzLl91cGRhdGVDaXJjbGVCeURpc3RhbmNlKGNpcmNsZSwgZGlzdGFuY2UsIGNlbnRlclgsIGNlbnRlclkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2NsZWFuQ2lyY2xlKGNpcmNsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfdXBkYXRlQ2lyY2xlQnlEaXN0YW5jZShjaXJjbGUsIGRpc3RhbmNlLCBjZW50ZXJYLCBjZW50ZXJZKSB7XG4gICAgY29uc3QgZGlzdGFuY2VJbmRleCA9IE1hdGgucG93KDEgLSBkaXN0YW5jZSAvIHRoaXMub3B0aW9ucy5idWJibGVSYWRpdXMsIDMpO1xuICAgIGNvbnN0IHggPSBjaXJjbGUuYmFzZVg7XG4gICAgY29uc3QgeSA9IGNpcmNsZS5iYXNlWTtcbiAgICBjb25zdCB7bWFnbmV0aWNQb3dlcn0gPSB0aGlzLm9wdGlvbnM7XG5cbiAgICBjaXJjbGUub3BhY2l0eSh0aGlzLm9wdGlvbnMub3BhY2l0eSAqICgxICsgZGlzdGFuY2VJbmRleCkpO1xuICAgIGNpcmNsZS54KHggKyAoY2VudGVyWCAtIHgpICogZGlzdGFuY2VJbmRleCAqIG1hZ25ldGljUG93ZXIpO1xuICAgIGNpcmNsZS55KHkgKyAoY2VudGVyWSAtIHkpICogZGlzdGFuY2VJbmRleCAqIG1hZ25ldGljUG93ZXIpO1xuICB9XG5cbiAgX2NsZWFuQ2lyY2xlKGNpcmNsZSwgd2l0aEFuaW1hdGlvbiA9IGZhbHNlKSB7XG4gICAgaWYgKGNpcmNsZS50d2Vlbikge1xuICAgICAgY2lyY2xlLnR3ZWVuLmRlc3Ryb3koKTtcbiAgICAgIGNpcmNsZS50d2VlbiA9IG51bGw7XG4gICAgfVxuICAgIGlmICghd2l0aEFuaW1hdGlvbikge1xuICAgICAgY2lyY2xlLm9wYWNpdHkodGhpcy5vcHRpb25zLm9wYWNpdHkpO1xuICAgICAgY2lyY2xlLngoY2lyY2xlLmJhc2VYKTtcbiAgICAgIGNpcmNsZS55KGNpcmNsZS5iYXNlWSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjaXJjbGUub3BhY2l0eSgpICE9PSB0aGlzLm9wdGlvbnMub3BhY2l0eSkge1xuICAgICAgICBjb25zdCB0d2VlbiA9IG5ldyBUd2Vlbih7XG4gICAgICAgICAgbm9kZTogY2lyY2xlLFxuICAgICAgICAgIGR1cmF0aW9uOiAwLjUsXG4gICAgICAgICAgeDogY2lyY2xlLmJhc2VYLFxuICAgICAgICAgIHk6IGNpcmNsZS5iYXNlWSxcbiAgICAgICAgICBvcGFjaXR5OiB0aGlzLm9wdGlvbnMub3BhY2l0eSxcbiAgICAgICAgICBlYXNpbmc6IEVhc2luZ3MuU3Ryb25nRWFzZU91dFxuICAgICAgICB9KTtcblxuICAgICAgICBjaXJjbGUudHdlZW4gPSB0d2VlbjtcbiAgICAgICAgdHdlZW4ucGxheSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9jbGVhbigpIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuZ3JpZC5sZW5ndGg7IHkrKykge1xuICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkW3ldO1xuXG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHJvdy5sZW5ndGg7IHgrKykge1xuICAgICAgICBjb25zdCBjaXJjbGUgPSByb3dbeF07XG5cbiAgICAgICAgdGhpcy5fY2xlYW5DaXJjbGUoY2lyY2xlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcmVkcmF3KCk7XG4gIH1cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==