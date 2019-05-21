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

      this.isMouseOver = true;

      var _this$_getGridCoordin = this._getGridCoordinates(clientX, clientY),
          x = _this$_getGridCoordin.x,
          y = _this$_getGridCoordin.y;

      this.helper.x(x * this.options.gutter);
      this.helper.y(y * this.options.gutter);

      this._updateCirclesAround(clientX, clientY);

      this._redraw();
    }
  }, {
    key: "_documentMouseOutHandler",
    value: function _documentMouseOutHandler() {
      this._clean();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL0FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9rb252YS9saWIvQmFzZUxheWVyLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9DYW52YXMuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL0NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9rb252YS9saWIvQ29udGV4dC5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9rb252YS9saWIvRHJhZ0FuZERyb3AuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL0dsb2JhbC5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9rb252YS9saWIvTGF5ZXIuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL05vZGUuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL1NoYXBlLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9TdGFnZS5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9rb252YS9saWIvVHdlZW4uanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL1V0aWwuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL1ZhbGlkYXRvcnMuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL3NoYXBlcy9DaXJjbGUuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL3NoYXBlcy9SZWN0LmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldFRhZy5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL2RlYm91bmNlLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvbm93LmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC90aHJvdHRsZS5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvdG9OdW1iZXIuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkJhY2tncm91bmREb3RzIiwiZWxlbWVudCIsIm9wdGlvbnMiLCJpc01vdXNlT3ZlciIsImRlZmF1bHRPcHRpb25zIiwiZ3JpZCIsInN0YWdlIiwiY29udGFpbmVyIiwid2lkdGgiLCJvZmZzZXRXaWR0aCIsImhlaWdodCIsIm9mZnNldEhlaWdodCIsImxheWVyIiwiYWRkIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9yZXNpemVIYW5kbGVyIiwiYmluZCIsIl9tb3VzZU1vdmVIYW5kbGVyIiwiZG9jdW1lbnQiLCJib2R5IiwiX2RvY3VtZW50TW91c2VPdXRIYW5kbGVyIiwiX2RyYXdIZWxwZXJzIiwiX2RyYXciLCJfZHJhd0JhY2tncm91bmQiLCJfZHJhd0dyaWQiLCJfcmVkcmF3IiwiaGVscGVyIiwieCIsInkiLCJyYWRpdXMiLCJmaWxsIiwiZGVidWciLCJiYWNrZ3JvdW5kIiwiYmFja2dyb3VuZENvbG9yIiwiZ3V0dGVyIiwiZG90Q29sb3IiLCJ4Q291bnQiLCJNYXRoIiwicm91bmQiLCJ5Q291bnQiLCJsZW5ndGgiLCJyb3ciLCJjaXJjbGUiLCJkZXN0cm95IiwiY2lyY2xlWCIsImNpcmNsZVkiLCJvcGFjaXR5IiwiYmFzZVgiLCJiYXNlWSIsInB1c2giLCJiYXRjaERyYXciLCJldmVudCIsImNsaWVudFgiLCJjbGllbnRZIiwiX2lzT3ZlclN0YWdlIiwiX2NsZWFuIiwiX2dldEdyaWRDb29yZGluYXRlcyIsIl91cGRhdGVDaXJjbGVzQXJvdW5kIiwiY2xpZW50UmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsImNlbnRlclgiLCJjZW50ZXJZIiwiYnViYmxlUmFkaXVzIiwiZGlzdGFuY2UiLCJzcXJ0IiwicG93IiwiX3VwZGF0ZUNpcmNsZUJ5RGlzdGFuY2UiLCJfY2xlYW5DaXJjbGUiLCJkaXN0YW5jZUluZGV4IiwibWFnbmV0aWNQb3dlciIsIndpdGhBbmltYXRpb24iLCJ0d2VlbiIsIm5vZGUiLCJkdXJhdGlvbiIsImVhc2luZyIsIlN0cm9uZ0Vhc2VPdXQiLCJwbGF5Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwQkFBMEI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMxVmE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxjQUFjLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDdkYsNkJBQTZCLHVEQUF1RDtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsZ0RBQVE7QUFDN0IsZUFBZSxtQkFBTyxDQUFDLG9EQUFVO0FBQ2pDLDJIQUEySDtBQUMzSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixvQkFBb0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixxQkFBcUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixhQUFhO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHlCQUF5QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUNyd0NhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ3ZGLDZCQUE2Qix1REFBdUQ7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGdEQUFRO0FBQzdCLGdCQUFnQixtQkFBTyxDQUFDLHNEQUFXO0FBQ25DLGFBQWEsbUJBQU8sQ0FBQyxnREFBUTtBQUM3QixtQkFBbUIsbUJBQU8sQ0FBQyw0REFBYztBQUN6QyxlQUFlLG1CQUFPLENBQUMsb0RBQVU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsdUJBQXVCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix1QkFBdUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsU0FBUztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFNBQVM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbGdCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGVBQWUsbUJBQU8sQ0FBQyxvREFBVTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHdCQUF3QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHdCQUF3QixJQUFJLE1BQU0sSUFBSSxNQUFNLElBQUk7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQkFBbUIsYUFBYTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVCQUF1QjtBQUMxQztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FB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QUFHLEtBQUt4QixJQUFMLENBQVVvQyxNQUE5QixFQUFzQ1osQ0FBQyxFQUF2QyxFQUEyQztBQUN6QyxZQUFNYSxHQUFHLEdBQUcsS0FBS3JDLElBQUwsQ0FBVXdCLENBQVYsQ0FBWjs7QUFFQSxhQUFLLElBQUlELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdjLEdBQUcsQ0FBQ0QsTUFBeEIsRUFBZ0NiLENBQUMsRUFBakMsRUFBcUM7QUFDbkMsY0FBTWUsTUFBTSxHQUFHRCxHQUFHLENBQUNkLENBQUQsQ0FBbEI7O0FBRUEsZUFBSzRDLFlBQUwsQ0FBa0I3QixNQUFsQixFQUEwQixJQUExQjtBQUNEO0FBQ0Y7O0FBQ0QsV0FBS2pCLE9BQUw7QUFDRDs7Ozs7Ozs7Z0JBOU9rQjFCLGMsb0JBQ0s7QUFDdEJrQyxpQkFBZSxFQUFFLGtCQURLO0FBRXRCRSxVQUFRLEVBQUUsMEJBRlk7QUFHdEJELFFBQU0sRUFBRSxFQUhjO0FBSXRCTCxRQUFNLEVBQUUsQ0FKYztBQUt0QnFDLGNBQVksRUFBRSxHQUxRO0FBTXRCTyxlQUFhLEVBQUUsSUFOTztBQU90QjNCLFNBQU8sRUFBRSxHQVBhO0FBUXRCZixPQUFLLEVBQUU7QUFSZSxDIiwiZmlsZSI6ImJhY2tncm91bmQtZG90cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiQmFja2dyb3VuZERvdHNcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQmFja2dyb3VuZERvdHNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQmFja2dyb3VuZERvdHNcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogd2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEdsb2JhbF8xID0gcmVxdWlyZShcIi4vR2xvYmFsXCIpO1xudmFyIG5vdyA9IChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKEdsb2JhbF8xLmdsb2IucGVyZm9ybWFuY2UgJiYgR2xvYmFsXzEuZ2xvYi5wZXJmb3JtYW5jZS5ub3cpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBHbG9iYWxfMS5nbG9iLnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgfTtcbn0pKCk7XG52YXIgQW5pbWF0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBbmltYXRpb24oZnVuYywgbGF5ZXJzKSB7XG4gICAgICAgIHRoaXMuaWQgPSBBbmltYXRpb24uYW5pbUlkQ291bnRlcisrO1xuICAgICAgICB0aGlzLmZyYW1lID0ge1xuICAgICAgICAgICAgdGltZTogMCxcbiAgICAgICAgICAgIHRpbWVEaWZmOiAwLFxuICAgICAgICAgICAgbGFzdFRpbWU6IG5vdygpLFxuICAgICAgICAgICAgZnJhbWVSYXRlOiAwXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZnVuYyA9IGZ1bmM7XG4gICAgICAgIHRoaXMuc2V0TGF5ZXJzKGxheWVycyk7XG4gICAgfVxuICAgIEFuaW1hdGlvbi5wcm90b3R5cGUuc2V0TGF5ZXJzID0gZnVuY3Rpb24gKGxheWVycykge1xuICAgICAgICB2YXIgbGF5cyA9IFtdO1xuICAgICAgICBpZiAoIWxheWVycykge1xuICAgICAgICAgICAgbGF5cyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxheWVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXlzID0gbGF5ZXJzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGF5cyA9IFtsYXllcnNdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGF5ZXJzID0gbGF5cztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBBbmltYXRpb24ucHJvdG90eXBlLmdldExheWVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXJzO1xuICAgIH07XG4gICAgQW5pbWF0aW9uLnByb3RvdHlwZS5hZGRMYXllciA9IGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICB2YXIgbGF5ZXJzID0gdGhpcy5sYXllcnMsIGxlbiA9IGxheWVycy5sZW5ndGgsIG47XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgaWYgKGxheWVyc1tuXS5faWQgPT09IGxheWVyLl9pZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxheWVycy5wdXNoKGxheWVyKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBBbmltYXRpb24ucHJvdG90eXBlLmlzUnVubmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGEgPSBBbmltYXRpb24sIGFuaW1hdGlvbnMgPSBhLmFuaW1hdGlvbnMsIGxlbiA9IGFuaW1hdGlvbnMubGVuZ3RoLCBuO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIGlmIChhbmltYXRpb25zW25dLmlkID09PSB0aGlzLmlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgQW5pbWF0aW9uLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgIHRoaXMuZnJhbWUudGltZURpZmYgPSAwO1xuICAgICAgICB0aGlzLmZyYW1lLmxhc3RUaW1lID0gbm93KCk7XG4gICAgICAgIEFuaW1hdGlvbi5fYWRkQW5pbWF0aW9uKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEFuaW1hdGlvbi5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgQW5pbWF0aW9uLl9yZW1vdmVBbmltYXRpb24odGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQW5pbWF0aW9uLnByb3RvdHlwZS5fdXBkYXRlRnJhbWVPYmplY3QgPSBmdW5jdGlvbiAodGltZSkge1xuICAgICAgICB0aGlzLmZyYW1lLnRpbWVEaWZmID0gdGltZSAtIHRoaXMuZnJhbWUubGFzdFRpbWU7XG4gICAgICAgIHRoaXMuZnJhbWUubGFzdFRpbWUgPSB0aW1lO1xuICAgICAgICB0aGlzLmZyYW1lLnRpbWUgKz0gdGhpcy5mcmFtZS50aW1lRGlmZjtcbiAgICAgICAgdGhpcy5mcmFtZS5mcmFtZVJhdGUgPSAxMDAwIC8gdGhpcy5mcmFtZS50aW1lRGlmZjtcbiAgICB9O1xuICAgIEFuaW1hdGlvbi5fYWRkQW5pbWF0aW9uID0gZnVuY3Rpb24gKGFuaW0pIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnB1c2goYW5pbSk7XG4gICAgICAgIHRoaXMuX2hhbmRsZUFuaW1hdGlvbigpO1xuICAgIH07XG4gICAgQW5pbWF0aW9uLl9yZW1vdmVBbmltYXRpb24gPSBmdW5jdGlvbiAoYW5pbSkge1xuICAgICAgICB2YXIgaWQgPSBhbmltLmlkLCBhbmltYXRpb25zID0gdGhpcy5hbmltYXRpb25zLCBsZW4gPSBhbmltYXRpb25zLmxlbmd0aCwgbjtcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uc1tuXS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnMuc3BsaWNlKG4sIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBBbmltYXRpb24uX3J1bkZyYW1lcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxheWVySGFzaCA9IHt9LCBhbmltYXRpb25zID0gdGhpcy5hbmltYXRpb25zLCBhbmltLCBsYXllcnMsIGZ1bmMsIG4sIGksIGxheWVyc0xlbiwgbGF5ZXIsIGtleSwgbmVlZFJlZHJhdztcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGFuaW1hdGlvbnMubGVuZ3RoOyBuKyspIHtcbiAgICAgICAgICAgIGFuaW0gPSBhbmltYXRpb25zW25dO1xuICAgICAgICAgICAgbGF5ZXJzID0gYW5pbS5sYXllcnM7XG4gICAgICAgICAgICBmdW5jID0gYW5pbS5mdW5jO1xuICAgICAgICAgICAgYW5pbS5fdXBkYXRlRnJhbWVPYmplY3Qobm93KCkpO1xuICAgICAgICAgICAgbGF5ZXJzTGVuID0gbGF5ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChmdW5jKSB7XG4gICAgICAgICAgICAgICAgbmVlZFJlZHJhdyA9IGZ1bmMuY2FsbChhbmltLCBhbmltLmZyYW1lKSAhPT0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZWVkUmVkcmF3ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbmVlZFJlZHJhdykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxheWVyc0xlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXIgPSBsYXllcnNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGxheWVyLl9pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVySGFzaFtsYXllci5faWRdID0gbGF5ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoa2V5IGluIGxheWVySGFzaCkge1xuICAgICAgICAgICAgaWYgKCFsYXllckhhc2guaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGF5ZXJIYXNoW2tleV0uZHJhdygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBbmltYXRpb24uX2FuaW1hdGlvbkxvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBBbmltID0gQW5pbWF0aW9uO1xuICAgICAgICBpZiAoQW5pbS5hbmltYXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgQW5pbS5fcnVuRnJhbWVzKCk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoQW5pbS5fYW5pbWF0aW9uTG9vcCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBBbmltLmFuaW1SdW5uaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFuaW1hdGlvbi5faGFuZGxlQW5pbWF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuYW5pbVJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbVJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX2FuaW1hdGlvbkxvb3ApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBbmltYXRpb24uYW5pbWF0aW9ucyA9IFtdO1xuICAgIEFuaW1hdGlvbi5hbmltSWRDb3VudGVyID0gMDtcbiAgICBBbmltYXRpb24uYW5pbVJ1bm5pbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gQW5pbWF0aW9uO1xufSgpKTtcbmV4cG9ydHMuQW5pbWF0aW9uID0gQW5pbWF0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBVdGlsXzEgPSByZXF1aXJlKFwiLi9VdGlsXCIpO1xudmFyIENvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vQ29udGFpbmVyXCIpO1xudmFyIE5vZGVfMSA9IHJlcXVpcmUoXCIuL05vZGVcIik7XG52YXIgRmFjdG9yeV8xID0gcmVxdWlyZShcIi4vRmFjdG9yeVwiKTtcbnZhciBDYW52YXNfMSA9IHJlcXVpcmUoXCIuL0NhbnZhc1wiKTtcbnZhciBCYXNlTGF5ZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCYXNlTGF5ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQmFzZUxheWVyKGNvbmZpZykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmNhbnZhcyA9IG5ldyBDYW52YXNfMS5TY2VuZUNhbnZhcygpO1xuICAgICAgICBfdGhpcy5fd2FpdGluZ0ZvckRyYXcgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMub24oJ3Zpc2libGVDaGFuZ2UnLCBfdGhpcy5fY2hlY2tWaXNpYmlsaXR5KTtcbiAgICAgICAgX3RoaXMuX2NoZWNrVmlzaWJpbGl0eSgpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEJhc2VMYXllci5wcm90b3R5cGUuY3JlYXRlUE5HU3RyZWFtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYyA9IHRoaXMuY2FudmFzLl9jYW52YXM7XG4gICAgICAgIHJldHVybiBjLmNyZWF0ZVBOR1N0cmVhbSgpO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5nZXRDYW52YXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbnZhcztcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuZ2V0SGl0Q2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oaXRDYW52YXM7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLmdldENvbnRleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbnZhcygpLmdldENvbnRleHQoKTtcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoYm91bmRzKSB7XG4gICAgICAgIHRoaXMuZ2V0Q29udGV4dCgpLmNsZWFyKGJvdW5kcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5zZXRaSW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5zZXRaSW5kZXguY2FsbCh0aGlzLCBpbmRleCk7XG4gICAgICAgIHZhciBzdGFnZSA9IHRoaXMuZ2V0U3RhZ2UoKTtcbiAgICAgICAgaWYgKHN0YWdlKSB7XG4gICAgICAgICAgICBzdGFnZS5jb250ZW50LnJlbW92ZUNoaWxkKHRoaXMuZ2V0Q2FudmFzKCkuX2NhbnZhcyk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBzdGFnZS5nZXRDaGlsZHJlbigpLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBzdGFnZS5jb250ZW50Lmluc2VydEJlZm9yZSh0aGlzLmdldENhbnZhcygpLl9jYW52YXMsIHN0YWdlLmdldENoaWxkcmVuKClbaW5kZXggKyAxXS5nZXRDYW52YXMoKS5fY2FudmFzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5nZXRDYW52YXMoKS5fY2FudmFzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUubW92ZVRvVG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBOb2RlXzEuTm9kZS5wcm90b3R5cGUubW92ZVRvVG9wLmNhbGwodGhpcyk7XG4gICAgICAgIHZhciBzdGFnZSA9IHRoaXMuZ2V0U3RhZ2UoKTtcbiAgICAgICAgaWYgKHN0YWdlKSB7XG4gICAgICAgICAgICBzdGFnZS5jb250ZW50LnJlbW92ZUNoaWxkKHRoaXMuZ2V0Q2FudmFzKCkuX2NhbnZhcyk7XG4gICAgICAgICAgICBzdGFnZS5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuZ2V0Q2FudmFzKCkuX2NhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLm1vdmVVcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1vdmVkID0gTm9kZV8xLk5vZGUucHJvdG90eXBlLm1vdmVVcC5jYWxsKHRoaXMpO1xuICAgICAgICBpZiAoIW1vdmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpO1xuICAgICAgICBpZiAoIXN0YWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc3RhZ2UuY29udGVudC5yZW1vdmVDaGlsZCh0aGlzLmdldENhbnZhcygpLl9jYW52YXMpO1xuICAgICAgICBpZiAodGhpcy5pbmRleCA8IHN0YWdlLmdldENoaWxkcmVuKCkubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgc3RhZ2UuY29udGVudC5pbnNlcnRCZWZvcmUodGhpcy5nZXRDYW52YXMoKS5fY2FudmFzLCBzdGFnZS5nZXRDaGlsZHJlbigpW3RoaXMuaW5kZXggKyAxXS5nZXRDYW52YXMoKS5fY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5nZXRDYW52YXMoKS5fY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUubW92ZURvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChOb2RlXzEuTm9kZS5wcm90b3R5cGUubW92ZURvd24uY2FsbCh0aGlzKSkge1xuICAgICAgICAgICAgdmFyIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpO1xuICAgICAgICAgICAgaWYgKHN0YWdlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gc3RhZ2UuZ2V0Q2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICBzdGFnZS5jb250ZW50LnJlbW92ZUNoaWxkKHRoaXMuZ2V0Q2FudmFzKCkuX2NhbnZhcyk7XG4gICAgICAgICAgICAgICAgc3RhZ2UuY29udGVudC5pbnNlcnRCZWZvcmUodGhpcy5nZXRDYW52YXMoKS5fY2FudmFzLCBjaGlsZHJlblt0aGlzLmluZGV4ICsgMV0uZ2V0Q2FudmFzKCkuX2NhbnZhcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLm1vdmVUb0JvdHRvbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKE5vZGVfMS5Ob2RlLnByb3RvdHlwZS5tb3ZlVG9Cb3R0b20uY2FsbCh0aGlzKSkge1xuICAgICAgICAgICAgdmFyIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpO1xuICAgICAgICAgICAgaWYgKHN0YWdlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gc3RhZ2UuZ2V0Q2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICBzdGFnZS5jb250ZW50LnJlbW92ZUNoaWxkKHRoaXMuZ2V0Q2FudmFzKCkuX2NhbnZhcyk7XG4gICAgICAgICAgICAgICAgc3RhZ2UuY29udGVudC5pbnNlcnRCZWZvcmUodGhpcy5nZXRDYW52YXMoKS5fY2FudmFzLCBjaGlsZHJlblsxXS5nZXRDYW52YXMoKS5fY2FudmFzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuZ2V0TGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfY2FudmFzID0gdGhpcy5nZXRDYW52YXMoKS5fY2FudmFzO1xuICAgICAgICBOb2RlXzEuTm9kZS5wcm90b3R5cGUucmVtb3ZlLmNhbGwodGhpcyk7XG4gICAgICAgIGlmIChfY2FudmFzICYmIF9jYW52YXMucGFyZW50Tm9kZSAmJiBVdGlsXzEuVXRpbC5faXNJbkRvY3VtZW50KF9jYW52YXMpKSB7XG4gICAgICAgICAgICBfY2FudmFzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoX2NhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLmdldFN0YWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIHdpZHRoID0gX2Eud2lkdGgsIGhlaWdodCA9IF9hLmhlaWdodDtcbiAgICAgICAgdGhpcy5jYW52YXMuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLl90b0tvbnZhQ2FudmFzID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICAgIGNvbmZpZy53aWR0aCA9IGNvbmZpZy53aWR0aCB8fCB0aGlzLmdldFdpZHRoKCk7XG4gICAgICAgIGNvbmZpZy5oZWlnaHQgPSBjb25maWcuaGVpZ2h0IHx8IHRoaXMuZ2V0SGVpZ2h0KCk7XG4gICAgICAgIGNvbmZpZy54ID0gY29uZmlnLnggIT09IHVuZGVmaW5lZCA/IGNvbmZpZy54IDogdGhpcy54KCk7XG4gICAgICAgIGNvbmZpZy55ID0gY29uZmlnLnkgIT09IHVuZGVmaW5lZCA/IGNvbmZpZy55IDogdGhpcy55KCk7XG4gICAgICAgIHJldHVybiBOb2RlXzEuTm9kZS5wcm90b3R5cGUuX3RvS29udmFDYW52YXMuY2FsbCh0aGlzLCBjb25maWcpO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5fY2hlY2tWaXNpYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmlzaWJsZSA9IHRoaXMudmlzaWJsZSgpO1xuICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuX2NhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLl9jYW52YXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5nZXRXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQud2lkdGgoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5zZXRXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgVXRpbF8xLlV0aWwud2FybignQ2FuIG5vdCBjaGFuZ2Ugd2lkdGggb2YgbGF5ZXIuIFVzZSBcInN0YWdlLndpZHRoKHZhbHVlKVwiIGZ1bmN0aW9uIGluc3RlYWQuJyk7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLmdldEhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuaGVpZ2h0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuc2V0SGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdDYW4gbm90IGNoYW5nZSBoZWlnaHQgb2YgbGF5ZXIuIFVzZSBcInN0YWdlLmhlaWdodCh2YWx1ZSlcIiBmdW5jdGlvbiBpbnN0ZWFkLicpO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5nZXRJbnRlcnNlY3Rpb24gPSBmdW5jdGlvbiAocG9zLCBzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuYmF0Y2hEcmF3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuX3dhaXRpbmdGb3JEcmF3KSB7XG4gICAgICAgICAgICB0aGlzLl93YWl0aW5nRm9yRHJhdyA9IHRydWU7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5kcmF3KCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3dhaXRpbmdGb3JEcmF3ID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuX2FwcGx5VHJhbnNmb3JtID0gZnVuY3Rpb24gKHNoYXBlLCBjb250ZXh0LCB0b3ApIHtcbiAgICAgICAgdmFyIG0gPSBzaGFwZS5nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApLmdldE1hdHJpeCgpO1xuICAgICAgICBjb250ZXh0LnRyYW5zZm9ybShtWzBdLCBtWzFdLCBtWzJdLCBtWzNdLCBtWzRdLCBtWzVdKTtcbiAgICB9O1xuICAgIHJldHVybiBCYXNlTGF5ZXI7XG59KENvbnRhaW5lcl8xLkNvbnRhaW5lcikpO1xuZXhwb3J0cy5CYXNlTGF5ZXIgPSBCYXNlTGF5ZXI7XG5CYXNlTGF5ZXIucHJvdG90eXBlLm5vZGVUeXBlID0gJ0Jhc2VMYXllcic7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoQmFzZUxheWVyLCAnY2xlYXJCZWZvcmVEcmF3JywgdHJ1ZSk7XG5VdGlsXzEuQ29sbGVjdGlvbi5tYXBNZXRob2RzKEJhc2VMYXllcik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFV0aWxfMSA9IHJlcXVpcmUoXCIuL1V0aWxcIik7XG52YXIgQ29udGV4dF8xID0gcmVxdWlyZShcIi4vQ29udGV4dFwiKTtcbnZhciBHbG9iYWxfMSA9IHJlcXVpcmUoXCIuL0dsb2JhbFwiKTtcbnZhciBGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi9GYWN0b3J5XCIpO1xudmFyIFZhbGlkYXRvcnNfMSA9IHJlcXVpcmUoXCIuL1ZhbGlkYXRvcnNcIik7XG52YXIgX3BpeGVsUmF0aW87XG5mdW5jdGlvbiBnZXREZXZpY2VQaXhlbFJhdGlvKCkge1xuICAgIGlmIChfcGl4ZWxSYXRpbykge1xuICAgICAgICByZXR1cm4gX3BpeGVsUmF0aW87XG4gICAgfVxuICAgIHZhciBjYW52YXMgPSBVdGlsXzEuVXRpbC5jcmVhdGVDYW52YXNFbGVtZW50KCk7XG4gICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBfcGl4ZWxSYXRpbyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZXZpY2VQaXhlbFJhdGlvID0gR2xvYmFsXzEuZ2xvYi53aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLCBiYWNraW5nU3RvcmVSYXRpbyA9IGNvbnRleHQud2Via2l0QmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgICAgICAgY29udGV4dC5tb3pCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICAgICAgICBjb250ZXh0Lm1zQmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgICAgICAgY29udGV4dC5vQmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgICAgICAgY29udGV4dC5iYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICAgICAgICAxO1xuICAgICAgICByZXR1cm4gZGV2aWNlUGl4ZWxSYXRpbyAvIGJhY2tpbmdTdG9yZVJhdGlvO1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIF9waXhlbFJhdGlvO1xufVxudmFyIENhbnZhcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2FudmFzKGNvbmZpZykge1xuICAgICAgICB0aGlzLnBpeGVsUmF0aW8gPSAxO1xuICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLmlzQ2FjaGUgPSBmYWxzZTtcbiAgICAgICAgdmFyIGNvbmYgPSBjb25maWcgfHwge307XG4gICAgICAgIHZhciBwaXhlbFJhdGlvID0gY29uZi5waXhlbFJhdGlvIHx8IEdsb2JhbF8xLktvbnZhLnBpeGVsUmF0aW8gfHwgZ2V0RGV2aWNlUGl4ZWxSYXRpbygpO1xuICAgICAgICB0aGlzLnBpeGVsUmF0aW8gPSBwaXhlbFJhdGlvO1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBVdGlsXzEuVXRpbC5jcmVhdGVDYW52YXNFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5wYWRkaW5nID0gJzAnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUubWFyZ2luID0gJzAnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuYm9yZGVyID0gJzAnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuYmFja2dyb3VuZCA9ICd0cmFuc3BhcmVudCc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS50b3AgPSAnMCc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5sZWZ0ID0gJzAnO1xuICAgIH1cbiAgICBDYW52YXMucHJvdG90eXBlLmdldENvbnRleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XG4gICAgfTtcbiAgICBDYW52YXMucHJvdG90eXBlLmdldFBpeGVsUmF0aW8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpeGVsUmF0aW87XG4gICAgfTtcbiAgICBDYW52YXMucHJvdG90eXBlLnNldFBpeGVsUmF0aW8gPSBmdW5jdGlvbiAocGl4ZWxSYXRpbykge1xuICAgICAgICB2YXIgcHJldmlvdXNSYXRpbyA9IHRoaXMucGl4ZWxSYXRpbztcbiAgICAgICAgdGhpcy5waXhlbFJhdGlvID0gcGl4ZWxSYXRpbztcbiAgICAgICAgdGhpcy5zZXRTaXplKHRoaXMuZ2V0V2lkdGgoKSAvIHByZXZpb3VzUmF0aW8sIHRoaXMuZ2V0SGVpZ2h0KCkgLyBwcmV2aW91c1JhdGlvKTtcbiAgICB9O1xuICAgIENhbnZhcy5wcm90b3R5cGUuc2V0V2lkdGggPSBmdW5jdGlvbiAod2lkdGgpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuX2NhbnZhcy53aWR0aCA9IHdpZHRoICogdGhpcy5waXhlbFJhdGlvO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICAgIHZhciBwaXhlbFJhdGlvID0gdGhpcy5waXhlbFJhdGlvLCBfY29udGV4dCA9IHRoaXMuZ2V0Q29udGV4dCgpLl9jb250ZXh0O1xuICAgICAgICBfY29udGV4dC5zY2FsZShwaXhlbFJhdGlvLCBwaXhlbFJhdGlvKTtcbiAgICB9O1xuICAgIENhbnZhcy5wcm90b3R5cGUuc2V0SGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodCkge1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBoZWlnaHQgKiB0aGlzLnBpeGVsUmF0aW87XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgICAgICB2YXIgcGl4ZWxSYXRpbyA9IHRoaXMucGl4ZWxSYXRpbywgX2NvbnRleHQgPSB0aGlzLmdldENvbnRleHQoKS5fY29udGV4dDtcbiAgICAgICAgX2NvbnRleHQuc2NhbGUocGl4ZWxSYXRpbywgcGl4ZWxSYXRpbyk7XG4gICAgfTtcbiAgICBDYW52YXMucHJvdG90eXBlLmdldFdpZHRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWR0aDtcbiAgICB9O1xuICAgIENhbnZhcy5wcm90b3R5cGUuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XG4gICAgfTtcbiAgICBDYW52YXMucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLnNldFdpZHRoKHdpZHRoKTtcbiAgICAgICAgdGhpcy5zZXRIZWlnaHQoaGVpZ2h0KTtcbiAgICB9O1xuICAgIENhbnZhcy5wcm90b3R5cGUudG9EYXRhVVJMID0gZnVuY3Rpb24gKG1pbWVUeXBlLCBxdWFsaXR5KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FudmFzLnRvRGF0YVVSTChtaW1lVHlwZSwgcXVhbGl0eSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcy50b0RhdGFVUkwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBVdGlsXzEuVXRpbC5lcnJvcignVW5hYmxlIHRvIGdldCBkYXRhIFVSTC4gJyArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDYW52YXM7XG59KCkpO1xuZXhwb3J0cy5DYW52YXMgPSBDYW52YXM7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoQ2FudmFzLCAncGl4ZWxSYXRpbycsIHVuZGVmaW5lZCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbnZhciBTY2VuZUNhbnZhcyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNjZW5lQ2FudmFzLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNjZW5lQ2FudmFzKGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0geyB3aWR0aDogMCwgaGVpZ2h0OiAwIH07IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5jb250ZXh0ID0gbmV3IENvbnRleHRfMS5TY2VuZUNvbnRleHQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5zZXRTaXplKGNvbmZpZy53aWR0aCwgY29uZmlnLmhlaWdodCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFNjZW5lQ2FudmFzO1xufShDYW52YXMpKTtcbmV4cG9ydHMuU2NlbmVDYW52YXMgPSBTY2VuZUNhbnZhcztcbnZhciBIaXRDYW52YXMgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhIaXRDYW52YXMsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSGl0Q2FudmFzKGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHsgY29uZmlnID0geyB3aWR0aDogMCwgaGVpZ2h0OiAwIH07IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5oaXRDYW52YXMgPSB0cnVlO1xuICAgICAgICBfdGhpcy5jb250ZXh0ID0gbmV3IENvbnRleHRfMS5IaXRDb250ZXh0KF90aGlzKTtcbiAgICAgICAgX3RoaXMuc2V0U2l6ZShjb25maWcud2lkdGgsIGNvbmZpZy5oZWlnaHQpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBIaXRDYW52YXM7XG59KENhbnZhcykpO1xuZXhwb3J0cy5IaXRDYW52YXMgPSBIaXRDYW52YXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFV0aWxfMSA9IHJlcXVpcmUoXCIuL1V0aWxcIik7XG52YXIgRmFjdG9yeV8xID0gcmVxdWlyZShcIi4vRmFjdG9yeVwiKTtcbnZhciBOb2RlXzEgPSByZXF1aXJlKFwiLi9Ob2RlXCIpO1xudmFyIERyYWdBbmREcm9wXzEgPSByZXF1aXJlKFwiLi9EcmFnQW5kRHJvcFwiKTtcbnZhciBWYWxpZGF0b3JzXzEgPSByZXF1aXJlKFwiLi9WYWxpZGF0b3JzXCIpO1xudmFyIENvbnRhaW5lciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbnRhaW5lciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb250YWluZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5jaGlsZHJlbiA9IG5ldyBVdGlsXzEuQ29sbGVjdGlvbigpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbiAoZmlsdGVyRnVuYykge1xuICAgICAgICBpZiAoIWZpbHRlckZ1bmMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHRzID0gbmV3IFV0aWxfMS5Db2xsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXJGdW5jKGNoaWxkKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuaGFzQ2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENoaWxkcmVuKCkubGVuZ3RoID4gMDtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUucmVtb3ZlQ2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGlsZDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgY2hpbGQuaW5kZXggPSAwO1xuICAgICAgICAgICAgY2hpbGQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IG5ldyBVdGlsXzEuQ29sbGVjdGlvbigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZGVzdHJveUNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2hpbGQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGNoaWxkLmluZGV4ID0gMDtcbiAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gbmV3IFV0aWxfMS5Db2xsZWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKGFyZ3VtZW50c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hpbGQuZ2V0UGFyZW50KCkpIHtcbiAgICAgICAgICAgIGNoaWxkLm1vdmVUbyh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW47XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlQWRkKGNoaWxkKTtcbiAgICAgICAgY2hpbGQuaW5kZXggPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgICB0aGlzLl9maXJlKCdhZGQnLCB7XG4gICAgICAgICAgICBjaGlsZDogY2hpbGRcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjaGlsZC5pc0RyYWdnaW5nKCkpIHtcbiAgICAgICAgICAgIERyYWdBbmREcm9wXzEuREQuYW5pbS5zZXRMYXllcnMoY2hpbGQuZ2V0TGF5ZXIoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc0NoaWxkcmVuKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUNoaWxkcmVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZW5lcmFsRmluZChzZWxlY3RvciwgZmFsc2UpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgVXRpbF8xLlV0aWwud2FybignY29sbGVjdGlvbi5nZXQoKSBtZXRob2QgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBjb2xsZWN0aW9uLmZpbmQoKSBpbnN0ZWFkLicpO1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kKHNlbGVjdG9yKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZmluZE9uZSA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fZ2VuZXJhbEZpbmQoc2VsZWN0b3IsIHRydWUpO1xuICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDAgPyByZXN1bHRbMF0gOiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9nZW5lcmFsRmluZCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgZmluZE9uZSkge1xuICAgICAgICB2YXIgcmV0QXJyID0gW107XG4gICAgICAgIHRoaXMuX2Rlc2NlbmRhbnRzKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICB2YXIgdmFsaWQgPSBub2RlLl9pc01hdGNoKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGlmICh2YWxpZCkge1xuICAgICAgICAgICAgICAgIHJldEFyci5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbGlkICYmIGZpbmRPbmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBVdGlsXzEuQ29sbGVjdGlvbi50b0NvbGxlY3Rpb24ocmV0QXJyKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuX2Rlc2NlbmRhbnRzID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHZhciBzaG91bGRTdG9wID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIHNob3VsZFN0b3AgPSBmbihjaGlsZCk7XG4gICAgICAgICAgICBpZiAoc2hvdWxkU3RvcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjaGlsZC5oYXNDaGlsZHJlbigpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaG91bGRTdG9wID0gY2hpbGQuX2Rlc2NlbmRhbnRzKGZuKTtcbiAgICAgICAgICAgIGlmIChzaG91bGRTdG9wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS50b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9iaiA9IE5vZGVfMS5Ob2RlLnByb3RvdHlwZS50b09iamVjdC5jYWxsKHRoaXMpO1xuICAgICAgICBvYmouY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5nZXRDaGlsZHJlbigpO1xuICAgICAgICB2YXIgbGVuID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltuXTtcbiAgICAgICAgICAgIG9iai5jaGlsZHJlbi5wdXNoKGNoaWxkLnRvT2JqZWN0KCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9nZXREZXNjZW5kYW50cyA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgdmFyIHJldEFyciA9IFtdO1xuICAgICAgICB2YXIgbGVuID0gYXJyLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBhcnJbbl07XG4gICAgICAgICAgICBpZiAodGhpcy5pc0FuY2VzdG9yT2Yobm9kZSkpIHtcbiAgICAgICAgICAgICAgICByZXRBcnIucHVzaChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0QXJyO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5pc0FuY2VzdG9yT2YgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB2YXIgcGFyZW50ID0gbm9kZS5nZXRQYXJlbnQoKTtcbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgICAgaWYgKHBhcmVudC5faWQgPT09IHRoaXMuX2lkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQuZ2V0UGFyZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgdmFyIG5vZGUgPSBOb2RlXzEuTm9kZS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCBvYmopO1xuICAgICAgICB0aGlzLmdldENoaWxkcmVuKCkuZWFjaChmdW5jdGlvbiAobm8pIHtcbiAgICAgICAgICAgIG5vZGUuYWRkKG5vLmNsb25lKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldEFsbEludGVyc2VjdGlvbnMgPSBmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgICAgdGhpcy5maW5kKCdTaGFwZScpLmVhY2goZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgICAgICBpZiAoc2hhcGUuaXNWaXNpYmxlKCkgJiYgc2hhcGUuaW50ZXJzZWN0cyhwb3MpKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goc2hhcGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuX3NldENoaWxkcmVuSW5kaWNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5lYWNoKGZ1bmN0aW9uIChjaGlsZCwgbikge1xuICAgICAgICAgICAgY2hpbGQuaW5kZXggPSBuO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZHJhd1NjZW5lID0gZnVuY3Rpb24gKGNhbiwgdG9wLCBjYWNoaW5nKSB7XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKSwgY2FudmFzID0gY2FuIHx8IChsYXllciAmJiBsYXllci5nZXRDYW52YXMoKSksIGNvbnRleHQgPSBjYW52YXMgJiYgY2FudmFzLmdldENvbnRleHQoKSwgY2FjaGVkQ2FudmFzID0gdGhpcy5fZ2V0Q2FudmFzQ2FjaGUoKSwgY2FjaGVkU2NlbmVDYW52YXMgPSBjYWNoZWRDYW52YXMgJiYgY2FjaGVkQ2FudmFzLnNjZW5lO1xuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUoKSB8fCBjYWNoaW5nKSB7XG4gICAgICAgICAgICBpZiAoIWNhY2hpbmcgJiYgY2FjaGVkU2NlbmVDYW52YXMpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgICAgICBsYXllci5fYXBwbHlUcmFuc2Zvcm0odGhpcywgY29udGV4dCwgdG9wKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmF3Q2FjaGVkU2NlbmVDYW52YXMoY29udGV4dCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmF3Q2hpbGRyZW4oY2FudmFzLCAnZHJhd1NjZW5lJywgdG9wLCBmYWxzZSwgY2FjaGluZywgY2FjaGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmRyYXdIaXQgPSBmdW5jdGlvbiAoY2FuLCB0b3AsIGNhY2hpbmcpIHtcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpLCBjYW52YXMgPSBjYW4gfHwgKGxheWVyICYmIGxheWVyLmhpdENhbnZhcyksIGNvbnRleHQgPSBjYW52YXMgJiYgY2FudmFzLmdldENvbnRleHQoKSwgY2FjaGVkQ2FudmFzID0gdGhpcy5fZ2V0Q2FudmFzQ2FjaGUoKSwgY2FjaGVkSGl0Q2FudmFzID0gY2FjaGVkQ2FudmFzICYmIGNhY2hlZENhbnZhcy5oaXQ7XG4gICAgICAgIGlmICh0aGlzLnNob3VsZERyYXdIaXQoY2FudmFzKSB8fCBjYWNoaW5nKSB7XG4gICAgICAgICAgICBpZiAoIWNhY2hpbmcgJiYgY2FjaGVkSGl0Q2FudmFzKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgbGF5ZXIuX2FwcGx5VHJhbnNmb3JtKHRoaXMsIGNvbnRleHQsIHRvcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHJhd0NhY2hlZEhpdENhbnZhcyhjb250ZXh0KTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RyYXdDaGlsZHJlbihjYW52YXMsICdkcmF3SGl0JywgdG9wLCBmYWxzZSwgY2FjaGluZywgY2FjaGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLl9kcmF3Q2hpbGRyZW4gPSBmdW5jdGlvbiAoY2FudmFzLCBkcmF3TWV0aG9kLCB0b3AsIGNhY2hpbmcsIHNraXBCdWZmZXIsIHNraXBDb21wb3NpdGlvbikge1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCksIGNvbnRleHQgPSBjYW52YXMgJiYgY2FudmFzLmdldENvbnRleHQoKSwgY2xpcFdpZHRoID0gdGhpcy5jbGlwV2lkdGgoKSwgY2xpcEhlaWdodCA9IHRoaXMuY2xpcEhlaWdodCgpLCBjbGlwRnVuYyA9IHRoaXMuY2xpcEZ1bmMoKSwgaGFzQ2xpcCA9IChjbGlwV2lkdGggJiYgY2xpcEhlaWdodCkgfHwgY2xpcEZ1bmMsIGNsaXBYLCBjbGlwWTtcbiAgICAgICAgaWYgKGhhc0NsaXAgJiYgbGF5ZXIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybSA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0odG9wKTtcbiAgICAgICAgICAgIHZhciBtID0gdHJhbnNmb3JtLmdldE1hdHJpeCgpO1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2Zvcm0obVswXSwgbVsxXSwgbVsyXSwgbVszXSwgbVs0XSwgbVs1XSk7XG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgaWYgKGNsaXBGdW5jKSB7XG4gICAgICAgICAgICAgICAgY2xpcEZ1bmMuY2FsbCh0aGlzLCBjb250ZXh0LCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsaXBYID0gdGhpcy5jbGlwWCgpO1xuICAgICAgICAgICAgICAgIGNsaXBZID0gdGhpcy5jbGlwWSgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQucmVjdChjbGlwWCwgY2xpcFksIGNsaXBXaWR0aCwgY2xpcEhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250ZXh0LmNsaXAoKTtcbiAgICAgICAgICAgIG0gPSB0cmFuc2Zvcm1cbiAgICAgICAgICAgICAgICAuY29weSgpXG4gICAgICAgICAgICAgICAgLmludmVydCgpXG4gICAgICAgICAgICAgICAgLmdldE1hdHJpeCgpO1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2Zvcm0obVswXSwgbVsxXSwgbVsyXSwgbVszXSwgbVs0XSwgbVs1XSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhhc0NvbXBvc2l0aW9uID0gdGhpcy5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24oKSAhPT0gJ3NvdXJjZS1vdmVyJyAmJiAhc2tpcENvbXBvc2l0aW9uO1xuICAgICAgICBpZiAoaGFzQ29tcG9zaXRpb24gJiYgbGF5ZXIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgY29udGV4dC5fYXBwbHlHbG9iYWxDb21wb3NpdGVPcGVyYXRpb24odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5lYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgY2hpbGRbZHJhd01ldGhvZF0oY2FudmFzLCB0b3AsIGNhY2hpbmcsIHNraXBCdWZmZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGhhc0NvbXBvc2l0aW9uICYmIGxheWVyKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzQ2xpcCAmJiBsYXllcikge1xuICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuc2hvdWxkRHJhd0hpdCA9IGZ1bmN0aW9uIChjYW52YXMpIHtcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpO1xuICAgICAgICB2YXIgbGF5ZXJVbmRlckRyYWcgPSBEcmFnQW5kRHJvcF8xLkRELmlzRHJhZ2dpbmcgJiYgRHJhZ0FuZERyb3BfMS5ERC5hbmltLmdldExheWVycygpLmluZGV4T2YobGF5ZXIpICE9PSAtMTtcbiAgICAgICAgcmV0dXJuICgoY2FudmFzICYmIGNhbnZhcy5pc0NhY2hlKSB8fFxuICAgICAgICAgICAgKGxheWVyICYmIGxheWVyLmhpdEdyYXBoRW5hYmxlZCgpICYmIHRoaXMuaXNWaXNpYmxlKCkgJiYgIWxheWVyVW5kZXJEcmFnKSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldENsaWVudFJlY3QgPSBmdW5jdGlvbiAoYXR0cnMpIHtcbiAgICAgICAgYXR0cnMgPSBhdHRycyB8fCB7fTtcbiAgICAgICAgdmFyIHNraXBUcmFuc2Zvcm0gPSBhdHRycy5za2lwVHJhbnNmb3JtO1xuICAgICAgICB2YXIgcmVsYXRpdmVUbyA9IGF0dHJzLnJlbGF0aXZlVG87XG4gICAgICAgIHZhciBtaW5YLCBtaW5ZLCBtYXhYLCBtYXhZO1xuICAgICAgICB2YXIgc2VsZlJlY3QgPSB7XG4gICAgICAgICAgICB4OiBJbmZpbml0eSxcbiAgICAgICAgICAgIHk6IEluZmluaXR5LFxuICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDBcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGlzLmNoaWxkcmVuLmVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICBpZiAoIWNoaWxkLnZpc2libGUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZWN0ID0gY2hpbGQuZ2V0Q2xpZW50UmVjdCh7XG4gICAgICAgICAgICAgICAgcmVsYXRpdmVUbzogdGhhdCxcbiAgICAgICAgICAgICAgICBza2lwU2hhZG93OiBhdHRycy5za2lwU2hhZG93LFxuICAgICAgICAgICAgICAgIHNraXBTdHJva2U6IGF0dHJzLnNraXBTdHJva2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHJlY3Qud2lkdGggPT09IDAgJiYgcmVjdC5oZWlnaHQgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWluWCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbWluWCA9IHJlY3QueDtcbiAgICAgICAgICAgICAgICBtaW5ZID0gcmVjdC55O1xuICAgICAgICAgICAgICAgIG1heFggPSByZWN0LnggKyByZWN0LndpZHRoO1xuICAgICAgICAgICAgICAgIG1heFkgPSByZWN0LnkgKyByZWN0LmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG1pblggPSBNYXRoLm1pbihtaW5YLCByZWN0LngpO1xuICAgICAgICAgICAgICAgIG1pblkgPSBNYXRoLm1pbihtaW5ZLCByZWN0LnkpO1xuICAgICAgICAgICAgICAgIG1heFggPSBNYXRoLm1heChtYXhYLCByZWN0LnggKyByZWN0LndpZHRoKTtcbiAgICAgICAgICAgICAgICBtYXhZID0gTWF0aC5tYXgobWF4WSwgcmVjdC55ICsgcmVjdC5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHNoYXBlcyA9IHRoaXMuZmluZCgnU2hhcGUnKTtcbiAgICAgICAgdmFyIGhhc1Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaGFwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzaGFwZSA9IHNoYXBlc1tpXTtcbiAgICAgICAgICAgIGlmIChzaGFwZS5faXNWaXNpYmxlKHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgaGFzVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc1Zpc2libGUpIHtcbiAgICAgICAgICAgIHNlbGZSZWN0ID0ge1xuICAgICAgICAgICAgICAgIHg6IG1pblgsXG4gICAgICAgICAgICAgICAgeTogbWluWSxcbiAgICAgICAgICAgICAgICB3aWR0aDogbWF4WCAtIG1pblgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBtYXhZIC0gbWluWVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGZSZWN0ID0ge1xuICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFza2lwVHJhbnNmb3JtKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtZWRSZWN0KHNlbGZSZWN0LCByZWxhdGl2ZVRvKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZlJlY3Q7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGFpbmVyO1xufShOb2RlXzEuTm9kZSkpO1xuZXhwb3J0cy5Db250YWluZXIgPSBDb250YWluZXI7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKENvbnRhaW5lciwgJ2NsaXAnLCBbXG4gICAgJ3gnLFxuICAgICd5JyxcbiAgICAnd2lkdGgnLFxuICAgICdoZWlnaHQnXG5dKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihDb250YWluZXIsICdjbGlwWCcsIHVuZGVmaW5lZCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihDb250YWluZXIsICdjbGlwWScsIHVuZGVmaW5lZCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihDb250YWluZXIsICdjbGlwV2lkdGgnLCB1bmRlZmluZWQsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoQ29udGFpbmVyLCAnY2xpcEhlaWdodCcsIHVuZGVmaW5lZCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihDb250YWluZXIsICdjbGlwRnVuYycpO1xuVXRpbF8xLkNvbGxlY3Rpb24ubWFwTWV0aG9kcyhDb250YWluZXIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBVdGlsXzEgPSByZXF1aXJlKFwiLi9VdGlsXCIpO1xudmFyIEdsb2JhbF8xID0gcmVxdWlyZShcIi4vR2xvYmFsXCIpO1xudmFyIENPTU1BID0gJywnLCBPUEVOX1BBUkVOID0gJygnLCBDTE9TRV9QQVJFTiA9ICcpJywgT1BFTl9QQVJFTl9CUkFDS0VUID0gJyhbJywgQ0xPU0VfQlJBQ0tFVF9QQVJFTiA9ICddKScsIFNFTUlDT0xPTiA9ICc7JywgRE9VQkxFX1BBUkVOID0gJygpJywgRVFVQUxTID0gJz0nLCBDT05URVhUX01FVEhPRFMgPSBbXG4gICAgJ2FyYycsXG4gICAgJ2FyY1RvJyxcbiAgICAnYmVnaW5QYXRoJyxcbiAgICAnYmV6aWVyQ3VydmVUbycsXG4gICAgJ2NsZWFyUmVjdCcsXG4gICAgJ2NsaXAnLFxuICAgICdjbG9zZVBhdGgnLFxuICAgICdjcmVhdGVMaW5lYXJHcmFkaWVudCcsXG4gICAgJ2NyZWF0ZVBhdHRlcm4nLFxuICAgICdjcmVhdGVSYWRpYWxHcmFkaWVudCcsXG4gICAgJ2RyYXdJbWFnZScsXG4gICAgJ2ZpbGwnLFxuICAgICdmaWxsVGV4dCcsXG4gICAgJ2dldEltYWdlRGF0YScsXG4gICAgJ2NyZWF0ZUltYWdlRGF0YScsXG4gICAgJ2xpbmVUbycsXG4gICAgJ21vdmVUbycsXG4gICAgJ3B1dEltYWdlRGF0YScsXG4gICAgJ3F1YWRyYXRpY0N1cnZlVG8nLFxuICAgICdyZWN0JyxcbiAgICAncmVzdG9yZScsXG4gICAgJ3JvdGF0ZScsXG4gICAgJ3NhdmUnLFxuICAgICdzY2FsZScsXG4gICAgJ3NldExpbmVEYXNoJyxcbiAgICAnc2V0VHJhbnNmb3JtJyxcbiAgICAnc3Ryb2tlJyxcbiAgICAnc3Ryb2tlVGV4dCcsXG4gICAgJ3RyYW5zZm9ybScsXG4gICAgJ3RyYW5zbGF0ZSdcbl07XG52YXIgQ09OVEVYVF9QUk9QRVJUSUVTID0gW1xuICAgICdmaWxsU3R5bGUnLFxuICAgICdzdHJva2VTdHlsZScsXG4gICAgJ3NoYWRvd0NvbG9yJyxcbiAgICAnc2hhZG93Qmx1cicsXG4gICAgJ3NoYWRvd09mZnNldFgnLFxuICAgICdzaGFkb3dPZmZzZXRZJyxcbiAgICAnbGluZUNhcCcsXG4gICAgJ2xpbmVEYXNoT2Zmc2V0JyxcbiAgICAnbGluZUpvaW4nLFxuICAgICdsaW5lV2lkdGgnLFxuICAgICdtaXRlckxpbWl0JyxcbiAgICAnZm9udCcsXG4gICAgJ3RleHRBbGlnbicsXG4gICAgJ3RleHRCYXNlbGluZScsXG4gICAgJ2dsb2JhbEFscGhhJyxcbiAgICAnZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uJ1xuXTtcbnZhciB0cmFjZUFyck1heCA9IDEwMDtcbnZhciBDb250ZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250ZXh0KGNhbnZhcykge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IGNhbnZhcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmIChHbG9iYWxfMS5Lb252YS5lbmFibGVUcmFjZSkge1xuICAgICAgICAgICAgdGhpcy50cmFjZUFyciA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fZW5hYmxlVHJhY2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDb250ZXh0LnByb3RvdHlwZS5maWxsU2hhcGUgPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgaWYgKHNoYXBlLmdldEZpbGxFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGwoc2hhcGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5fZmlsbCA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuc3Ryb2tlU2hhcGUgPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgaWYgKHNoYXBlLmdldFN0cm9rZUVuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fc3Ryb2tlKHNoYXBlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuX3N0cm9rZSA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuZmlsbFN0cm9rZVNoYXBlID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgIGlmIChzaGFwZS5nZXRGaWxsRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9maWxsKHNoYXBlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2hhcGUuZ2V0U3Ryb2tlRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9zdHJva2Uoc2hhcGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5nZXRUcmFjZSA9IGZ1bmN0aW9uIChyZWxheGVkKSB7XG4gICAgICAgIHZhciB0cmFjZUFyciA9IHRoaXMudHJhY2VBcnIsIGxlbiA9IHRyYWNlQXJyLmxlbmd0aCwgc3RyID0gJycsIG4sIHRyYWNlLCBtZXRob2QsIGFyZ3M7XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgdHJhY2UgPSB0cmFjZUFycltuXTtcbiAgICAgICAgICAgIG1ldGhvZCA9IHRyYWNlLm1ldGhvZDtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBhcmdzID0gdHJhY2UuYXJncztcbiAgICAgICAgICAgICAgICBzdHIgKz0gbWV0aG9kO1xuICAgICAgICAgICAgICAgIGlmIChyZWxheGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBET1VCTEVfUEFSRU47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbF8xLlV0aWwuX2lzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSBPUEVOX1BBUkVOX0JSQUNLRVQgKyBhcmdzLmpvaW4oQ09NTUEpICsgQ0xPU0VfQlJBQ0tFVF9QQVJFTjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSBPUEVOX1BBUkVOICsgYXJncy5qb2luKENPTU1BKSArIENMT1NFX1BBUkVOO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IHRyYWNlLnByb3BlcnR5O1xuICAgICAgICAgICAgICAgIGlmICghcmVsYXhlZCkge1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gRVFVQUxTICsgdHJhY2UudmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ciArPSBTRU1JQ09MT047XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmNsZWFyVHJhY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudHJhY2VBcnIgPSBbXTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLl90cmFjZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgdmFyIHRyYWNlQXJyID0gdGhpcy50cmFjZUFyciwgbGVuO1xuICAgICAgICB0cmFjZUFyci5wdXNoKHN0cik7XG4gICAgICAgIGxlbiA9IHRyYWNlQXJyLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA+PSB0cmFjZUFyck1heCkge1xuICAgICAgICAgICAgdHJhY2VBcnIuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwaXhlbFJhdGlvID0gdGhpcy5nZXRDYW52YXMoKS5nZXRQaXhlbFJhdGlvKCk7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKDEgKiBwaXhlbFJhdGlvLCAwLCAwLCAxICogcGl4ZWxSYXRpbywgMCwgMCk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5nZXRDYW52YXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbnZhcztcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKGJvdW5kcykge1xuICAgICAgICB2YXIgY2FudmFzID0gdGhpcy5nZXRDYW52YXMoKTtcbiAgICAgICAgaWYgKGJvdW5kcykge1xuICAgICAgICAgICAgdGhpcy5jbGVhclJlY3QoYm91bmRzLnggfHwgMCwgYm91bmRzLnkgfHwgMCwgYm91bmRzLndpZHRoIHx8IDAsIGJvdW5kcy5oZWlnaHQgfHwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyUmVjdCgwLCAwLCBjYW52YXMuZ2V0V2lkdGgoKSAvIGNhbnZhcy5waXhlbFJhdGlvLCBjYW52YXMuZ2V0SGVpZ2h0KCkgLyBjYW52YXMucGl4ZWxSYXRpbyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLl9hcHBseUxpbmVDYXAgPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgdmFyIGxpbmVDYXAgPSBzaGFwZS5nZXRMaW5lQ2FwKCk7XG4gICAgICAgIGlmIChsaW5lQ2FwKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2xpbmVDYXAnLCBsaW5lQ2FwKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuX2FwcGx5T3BhY2l0eSA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICB2YXIgYWJzT3BhY2l0eSA9IHNoYXBlLmdldEFic29sdXRlT3BhY2l0eSgpO1xuICAgICAgICBpZiAoYWJzT3BhY2l0eSAhPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdnbG9iYWxBbHBoYScsIGFic09wYWNpdHkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5fYXBwbHlMaW5lSm9pbiA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICB2YXIgbGluZUpvaW4gPSBzaGFwZS5nZXRMaW5lSm9pbigpO1xuICAgICAgICBpZiAobGluZUpvaW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignbGluZUpvaW4nLCBsaW5lSm9pbik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnNldEF0dHIgPSBmdW5jdGlvbiAoYXR0ciwgdmFsKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHRbYXR0cl0gPSB2YWw7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5hcmMgPSBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmFyYyhhMCwgYTEsIGEyLCBhMywgYTQsIGE1KTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmFyY1RvID0gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5hcmMoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5iZWdpblBhdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5iZXppZXJDdXJ2ZVRvID0gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5iZXppZXJDdXJ2ZVRvKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuY2xlYXJSZWN0ID0gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuY2xlYXJSZWN0KGEwLCBhMSwgYTIsIGEzKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmNsaXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuY2xpcCgpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuY2xvc2VQYXRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlSW1hZ2VEYXRhID0gZnVuY3Rpb24gKGEwLCBhMSkge1xuICAgICAgICB2YXIgYSA9IGFyZ3VtZW50cztcbiAgICAgICAgaWYgKGEubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5jcmVhdGVJbWFnZURhdGEoYTAsIGExKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKGEwKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlTGluZWFyR3JhZGllbnQgPSBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoYTAsIGExLCBhMiwgYTMpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlUGF0dGVybiA9IGZ1bmN0aW9uIChhMCwgYTEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuY3JlYXRlUGF0dGVybihhMCwgYTEpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlUmFkaWFsR3JhZGllbnQgPSBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudChhMCwgYTEsIGEyLCBhMywgYTQsIGE1KTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmRyYXdJbWFnZSA9IGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4KSB7XG4gICAgICAgIHZhciBhID0gYXJndW1lbnRzLCBfY29udGV4dCA9IHRoaXMuX2NvbnRleHQ7XG4gICAgICAgIGlmIChhLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgX2NvbnRleHQuZHJhd0ltYWdlKGEwLCBhMSwgYTIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGEubGVuZ3RoID09PSA1KSB7XG4gICAgICAgICAgICBfY29udGV4dC5kcmF3SW1hZ2UoYTAsIGExLCBhMiwgYTMsIGE0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhLmxlbmd0aCA9PT0gOSkge1xuICAgICAgICAgICAgX2NvbnRleHQuZHJhd0ltYWdlKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5pc1BvaW50SW5QYXRoID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuaXNQb2ludEluUGF0aCh4LCB5KTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbCgpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuZmlsbFJlY3QgPSBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuc3Ryb2tlUmVjdCA9IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmZpbGxUZXh0ID0gZnVuY3Rpb24gKGEwLCBhMSwgYTIpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5maWxsVGV4dChhMCwgYTEsIGEyKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLm1lYXN1cmVUZXh0ID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQubWVhc3VyZVRleHQodGV4dCk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5nZXRJbWFnZURhdGEgPSBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKGEwLCBhMSwgYTIsIGEzKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmxpbmVUbyA9IGZ1bmN0aW9uIChhMCwgYTEpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5saW5lVG8oYTAsIGExKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLm1vdmVUbyA9IGZ1bmN0aW9uIChhMCwgYTEpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tb3ZlVG8oYTAsIGExKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnJlY3QgPSBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5yZWN0KGEwLCBhMSwgYTIsIGEzKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnB1dEltYWdlRGF0YSA9IGZ1bmN0aW9uIChhMCwgYTEsIGEyKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQucHV0SW1hZ2VEYXRhKGEwLCBhMSwgYTIpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUucXVhZHJhdGljQ3VydmVUbyA9IGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMykge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8oYTAsIGExLCBhMiwgYTMpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUucmVzdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5yb3RhdGUgPSBmdW5jdGlvbiAoYTApIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5yb3RhdGUoYTApO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zYXZlKCk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5zY2FsZSA9IGZ1bmN0aW9uIChhMCwgYTEpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zY2FsZShhMCwgYTEpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuc2V0TGluZURhc2ggPSBmdW5jdGlvbiAoYTApIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRleHQuc2V0TGluZURhc2gpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc2V0TGluZURhc2goYTApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCdtb3pEYXNoJyBpbiB0aGlzLl9jb250ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0Wydtb3pEYXNoJ10gPSBhMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgnd2Via2l0TGluZURhc2gnIGluIHRoaXMuX2NvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHRbJ3dlYmtpdExpbmVEYXNoJ10gPSBhMDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuZ2V0TGluZURhc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldExpbmVEYXNoKCk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5zZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnNldFRyYW5zZm9ybShhMCwgYTEsIGEyLCBhMywgYTQsIGE1KTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnN0cm9rZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2UoKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnN0cm9rZVRleHQgPSBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2VUZXh0KGEwLCBhMSwgYTIsIGEzKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnRyYW5zZm9ybSA9IGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQudHJhbnNmb3JtKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUudHJhbnNsYXRlID0gZnVuY3Rpb24gKGEwLCBhMSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnRyYW5zbGF0ZShhMCwgYTEpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuX2VuYWJsZVRyYWNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGxlbiA9IENPTlRFWFRfTUVUSE9EUy5sZW5ndGgsIF9zaW1wbGlmeUFycmF5ID0gVXRpbF8xLlV0aWwuX3NpbXBsaWZ5QXJyYXksIG9yaWdTZXR0ZXIgPSB0aGlzLnNldEF0dHIsIG4sIGFyZ3M7XG4gICAgICAgIHZhciBmdW5jID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBvcmlnTWV0aG9kID0gdGhhdFttZXRob2ROYW1lXSwgcmV0O1xuICAgICAgICAgICAgdGhhdFttZXRob2ROYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBhcmdzID0gX3NpbXBsaWZ5QXJyYXkoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICAgICAgcmV0ID0gb3JpZ01ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIHRoYXQuX3RyYWNlKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBhcmdzOiBhcmdzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgZnVuYyhDT05URVhUX01FVEhPRFNbbl0pO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuc2V0QXR0ciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9yaWdTZXR0ZXIuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHZhciBwcm9wID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgdmFyIHZhbCA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnc2hhZG93T2Zmc2V0WCcgfHxcbiAgICAgICAgICAgICAgICBwcm9wID09PSAnc2hhZG93T2Zmc2V0WScgfHxcbiAgICAgICAgICAgICAgICBwcm9wID09PSAnc2hhZG93Qmx1cicpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWwgLyB0aGlzLmNhbnZhcy5nZXRQaXhlbFJhdGlvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0Ll90cmFjZSh7XG4gICAgICAgICAgICAgICAgcHJvcGVydHk6IHByb3AsXG4gICAgICAgICAgICAgICAgdmFsOiB2YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuX2FwcGx5R2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdmFyIGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IG5vZGUuZ2V0R2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKCk7XG4gICAgICAgIGlmIChnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gIT09ICdzb3VyY2Utb3ZlcicpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uJywgZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbnRleHQ7XG59KCkpO1xuZXhwb3J0cy5Db250ZXh0ID0gQ29udGV4dDtcbkNPTlRFWFRfUFJPUEVSVElFUy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnRleHQucHJvdG90eXBlLCBwcm9wLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHRbcHJvcF07XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dFtwcm9wXSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG52YXIgU2NlbmVDb250ZXh0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2NlbmVDb250ZXh0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNjZW5lQ29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBTY2VuZUNvbnRleHQucHJvdG90eXBlLl9maWxsQ29sb3IgPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgdmFyIGZpbGwgPSBzaGFwZS5maWxsKCk7XG4gICAgICAgIHRoaXMuc2V0QXR0cignZmlsbFN0eWxlJywgZmlsbCk7XG4gICAgICAgIHNoYXBlLl9maWxsRnVuYyh0aGlzKTtcbiAgICB9O1xuICAgIFNjZW5lQ29udGV4dC5wcm90b3R5cGUuX2ZpbGxQYXR0ZXJuID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgIHZhciBmaWxsUGF0dGVyblggPSBzaGFwZS5nZXRGaWxsUGF0dGVyblgoKSwgZmlsbFBhdHRlcm5ZID0gc2hhcGUuZ2V0RmlsbFBhdHRlcm5ZKCksIGZpbGxQYXR0ZXJuU2NhbGVYID0gc2hhcGUuZ2V0RmlsbFBhdHRlcm5TY2FsZVgoKSwgZmlsbFBhdHRlcm5TY2FsZVkgPSBzaGFwZS5nZXRGaWxsUGF0dGVyblNjYWxlWSgpLCBmaWxsUGF0dGVyblJvdGF0aW9uID0gR2xvYmFsXzEuS29udmEuZ2V0QW5nbGUoc2hhcGUuZ2V0RmlsbFBhdHRlcm5Sb3RhdGlvbigpKSwgZmlsbFBhdHRlcm5PZmZzZXRYID0gc2hhcGUuZ2V0RmlsbFBhdHRlcm5PZmZzZXRYKCksIGZpbGxQYXR0ZXJuT2Zmc2V0WSA9IHNoYXBlLmdldEZpbGxQYXR0ZXJuT2Zmc2V0WSgpO1xuICAgICAgICBpZiAoZmlsbFBhdHRlcm5YIHx8IGZpbGxQYXR0ZXJuWSkge1xuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGUoZmlsbFBhdHRlcm5YIHx8IDAsIGZpbGxQYXR0ZXJuWSB8fCAwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlsbFBhdHRlcm5Sb3RhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5yb3RhdGUoZmlsbFBhdHRlcm5Sb3RhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbGxQYXR0ZXJuU2NhbGVYIHx8IGZpbGxQYXR0ZXJuU2NhbGVZKSB7XG4gICAgICAgICAgICB0aGlzLnNjYWxlKGZpbGxQYXR0ZXJuU2NhbGVYLCBmaWxsUGF0dGVyblNjYWxlWSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbGxQYXR0ZXJuT2Zmc2V0WCB8fCBmaWxsUGF0dGVybk9mZnNldFkpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlKC0xICogZmlsbFBhdHRlcm5PZmZzZXRYLCAtMSAqIGZpbGxQYXR0ZXJuT2Zmc2V0WSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRBdHRyKCdmaWxsU3R5bGUnLCBzaGFwZS5fZ2V0RmlsbFBhdHRlcm4oKSk7XG4gICAgICAgIHNoYXBlLl9maWxsRnVuYyh0aGlzKTtcbiAgICB9O1xuICAgIFNjZW5lQ29udGV4dC5wcm90b3R5cGUuX2ZpbGxMaW5lYXJHcmFkaWVudCA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICB2YXIgZ3JkID0gc2hhcGUuX2dldExpbmVhckdyYWRpZW50KCk7XG4gICAgICAgIGlmIChncmQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignZmlsbFN0eWxlJywgZ3JkKTtcbiAgICAgICAgICAgIHNoYXBlLl9maWxsRnVuYyh0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2NlbmVDb250ZXh0LnByb3RvdHlwZS5fZmlsbFJhZGlhbEdyYWRpZW50ID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgIHZhciBncmQgPSBzaGFwZS5fZ2V0UmFkaWFsR3JhZGllbnQoKTtcbiAgICAgICAgaWYgKGdyZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdmaWxsU3R5bGUnLCBncmQpO1xuICAgICAgICAgICAgc2hhcGUuX2ZpbGxGdW5jKHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTY2VuZUNvbnRleHQucHJvdG90eXBlLl9maWxsID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgIHZhciBoYXNDb2xvciA9IHNoYXBlLmZpbGwoKSwgZmlsbFByaW9yaXR5ID0gc2hhcGUuZ2V0RmlsbFByaW9yaXR5KCk7XG4gICAgICAgIGlmIChoYXNDb2xvciAmJiBmaWxsUHJpb3JpdHkgPT09ICdjb2xvcicpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGxDb2xvcihzaGFwZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhhc1BhdHRlcm4gPSBzaGFwZS5nZXRGaWxsUGF0dGVybkltYWdlKCk7XG4gICAgICAgIGlmIChoYXNQYXR0ZXJuICYmIGZpbGxQcmlvcml0eSA9PT0gJ3BhdHRlcm4nKSB7XG4gICAgICAgICAgICB0aGlzLl9maWxsUGF0dGVybihzaGFwZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhhc0xpbmVhckdyYWRpZW50ID0gc2hhcGUuZ2V0RmlsbExpbmVhckdyYWRpZW50Q29sb3JTdG9wcygpO1xuICAgICAgICBpZiAoaGFzTGluZWFyR3JhZGllbnQgJiYgZmlsbFByaW9yaXR5ID09PSAnbGluZWFyLWdyYWRpZW50Jykge1xuICAgICAgICAgICAgdGhpcy5fZmlsbExpbmVhckdyYWRpZW50KHNoYXBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaGFzUmFkaWFsR3JhZGllbnQgPSBzaGFwZS5nZXRGaWxsUmFkaWFsR3JhZGllbnRDb2xvclN0b3BzKCk7XG4gICAgICAgIGlmIChoYXNSYWRpYWxHcmFkaWVudCAmJiBmaWxsUHJpb3JpdHkgPT09ICdyYWRpYWwtZ3JhZGllbnQnKSB7XG4gICAgICAgICAgICB0aGlzLl9maWxsUmFkaWFsR3JhZGllbnQoc2hhcGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNDb2xvcikge1xuICAgICAgICAgICAgdGhpcy5fZmlsbENvbG9yKHNoYXBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChoYXNQYXR0ZXJuKSB7XG4gICAgICAgICAgICB0aGlzLl9maWxsUGF0dGVybihzaGFwZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaGFzTGluZWFyR3JhZGllbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGxMaW5lYXJHcmFkaWVudChzaGFwZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaGFzUmFkaWFsR3JhZGllbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGxSYWRpYWxHcmFkaWVudChzaGFwZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNjZW5lQ29udGV4dC5wcm90b3R5cGUuX3N0cm9rZUxpbmVhckdyYWRpZW50ID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgIHZhciBzdGFydCA9IHNoYXBlLmdldFN0cm9rZUxpbmVhckdyYWRpZW50U3RhcnRQb2ludCgpLCBlbmQgPSBzaGFwZS5nZXRTdHJva2VMaW5lYXJHcmFkaWVudEVuZFBvaW50KCksIGNvbG9yU3RvcHMgPSBzaGFwZS5nZXRTdHJva2VMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMoKSwgZ3JkID0gdGhpcy5jcmVhdGVMaW5lYXJHcmFkaWVudChzdGFydC54LCBzdGFydC55LCBlbmQueCwgZW5kLnkpO1xuICAgICAgICBpZiAoY29sb3JTdG9wcykge1xuICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBjb2xvclN0b3BzLmxlbmd0aDsgbiArPSAyKSB7XG4gICAgICAgICAgICAgICAgZ3JkLmFkZENvbG9yU3RvcChjb2xvclN0b3BzW25dLCBjb2xvclN0b3BzW24gKyAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ3N0cm9rZVN0eWxlJywgZ3JkKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2NlbmVDb250ZXh0LnByb3RvdHlwZS5fc3Ryb2tlID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgIHZhciBkYXNoID0gc2hhcGUuZGFzaCgpLCBzdHJva2VTY2FsZUVuYWJsZWQgPSBzaGFwZS5nZXRTdHJva2VTY2FsZUVuYWJsZWQoKTtcbiAgICAgICAgaWYgKHNoYXBlLmhhc1N0cm9rZSgpKSB7XG4gICAgICAgICAgICBpZiAoIXN0cm9rZVNjYWxlRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBwaXhlbFJhdGlvID0gdGhpcy5nZXRDYW52YXMoKS5nZXRQaXhlbFJhdGlvKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0ocGl4ZWxSYXRpbywgMCwgMCwgcGl4ZWxSYXRpbywgMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hcHBseUxpbmVDYXAoc2hhcGUpO1xuICAgICAgICAgICAgaWYgKGRhc2ggJiYgc2hhcGUuZGFzaEVuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TGluZURhc2goZGFzaCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdsaW5lRGFzaE9mZnNldCcsIHNoYXBlLmRhc2hPZmZzZXQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2xpbmVXaWR0aCcsIHNoYXBlLnN0cm9rZVdpZHRoKCkpO1xuICAgICAgICAgICAgaWYgKCFzaGFwZS5nZXRTaGFkb3dGb3JTdHJva2VFbmFibGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHIoJ3NoYWRvd0NvbG9yJywgJ3JnYmEoMCwwLDAsMCknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBoYXNMaW5lYXJHcmFkaWVudCA9IHNoYXBlLmdldFN0cm9rZUxpbmVhckdyYWRpZW50Q29sb3JTdG9wcygpO1xuICAgICAgICAgICAgaWYgKGhhc0xpbmVhckdyYWRpZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3Ryb2tlTGluZWFyR3JhZGllbnQoc2hhcGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdzdHJva2VTdHlsZScsIHNoYXBlLnN0cm9rZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNoYXBlLl9zdHJva2VGdW5jKHRoaXMpO1xuICAgICAgICAgICAgaWYgKCFzdHJva2VTY2FsZUVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2NlbmVDb250ZXh0LnByb3RvdHlwZS5fYXBwbHlTaGFkb3cgPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgdmFyIHV0aWwgPSBVdGlsXzEuVXRpbCwgY29sb3IgPSB1dGlsLmdldChzaGFwZS5nZXRTaGFkb3dSR0JBKCksICdibGFjaycpLCBibHVyID0gdXRpbC5nZXQoc2hhcGUuZ2V0U2hhZG93Qmx1cigpLCA1KSwgb2Zmc2V0ID0gdXRpbC5nZXQoc2hhcGUuZ2V0U2hhZG93T2Zmc2V0KCksIHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH0pLCBzY2FsZSA9IHNoYXBlLmdldEFic29sdXRlU2NhbGUoKSwgcmF0aW8gPSB0aGlzLmNhbnZhcy5nZXRQaXhlbFJhdGlvKCksIHNjYWxlWCA9IHNjYWxlLnggKiByYXRpbywgc2NhbGVZID0gc2NhbGUueSAqIHJhdGlvO1xuICAgICAgICB0aGlzLnNldEF0dHIoJ3NoYWRvd0NvbG9yJywgY29sb3IpO1xuICAgICAgICB0aGlzLnNldEF0dHIoJ3NoYWRvd0JsdXInLCBibHVyICogTWF0aC5taW4oTWF0aC5hYnMoc2NhbGVYKSwgTWF0aC5hYnMoc2NhbGVZKSkpO1xuICAgICAgICB0aGlzLnNldEF0dHIoJ3NoYWRvd09mZnNldFgnLCBvZmZzZXQueCAqIHNjYWxlWCk7XG4gICAgICAgIHRoaXMuc2V0QXR0cignc2hhZG93T2Zmc2V0WScsIG9mZnNldC55ICogc2NhbGVZKTtcbiAgICB9O1xuICAgIHJldHVybiBTY2VuZUNvbnRleHQ7XG59KENvbnRleHQpKTtcbmV4cG9ydHMuU2NlbmVDb250ZXh0ID0gU2NlbmVDb250ZXh0O1xudmFyIEhpdENvbnRleHQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhIaXRDb250ZXh0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEhpdENvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgSGl0Q29udGV4dC5wcm90b3R5cGUuX2ZpbGwgPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgIHRoaXMuc2V0QXR0cignZmlsbFN0eWxlJywgc2hhcGUuY29sb3JLZXkpO1xuICAgICAgICBzaGFwZS5fZmlsbEZ1bmNIaXQodGhpcyk7XG4gICAgICAgIHRoaXMucmVzdG9yZSgpO1xuICAgIH07XG4gICAgSGl0Q29udGV4dC5wcm90b3R5cGUuX3N0cm9rZSA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICBpZiAoc2hhcGUuaGFzU3Ryb2tlKCkgJiYgc2hhcGUuaGl0U3Ryb2tlV2lkdGgoKSkge1xuICAgICAgICAgICAgdmFyIHN0cm9rZVNjYWxlRW5hYmxlZCA9IHNoYXBlLmdldFN0cm9rZVNjYWxlRW5hYmxlZCgpO1xuICAgICAgICAgICAgaWYgKCFzdHJva2VTY2FsZUVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICAgICAgICAgICAgICB2YXIgcGl4ZWxSYXRpbyA9IHRoaXMuZ2V0Q2FudmFzKCkuZ2V0UGl4ZWxSYXRpbygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKHBpeGVsUmF0aW8sIDAsIDAsIHBpeGVsUmF0aW8sIDAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYXBwbHlMaW5lQ2FwKHNoYXBlKTtcbiAgICAgICAgICAgIHZhciBoaXRTdHJva2VXaWR0aCA9IHNoYXBlLmhpdFN0cm9rZVdpZHRoKCk7XG4gICAgICAgICAgICB2YXIgc3Ryb2tlV2lkdGggPSBoaXRTdHJva2VXaWR0aCA9PT0gJ2F1dG8nID8gc2hhcGUuc3Ryb2tlV2lkdGgoKSA6IGhpdFN0cm9rZVdpZHRoO1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdsaW5lV2lkdGgnLCBzdHJva2VXaWR0aCk7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ3N0cm9rZVN0eWxlJywgc2hhcGUuY29sb3JLZXkpO1xuICAgICAgICAgICAgc2hhcGUuX3N0cm9rZUZ1bmNIaXQodGhpcyk7XG4gICAgICAgICAgICBpZiAoIXN0cm9rZVNjYWxlRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gSGl0Q29udGV4dDtcbn0oQ29udGV4dCkpO1xuZXhwb3J0cy5IaXRDb250ZXh0ID0gSGl0Q29udGV4dDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEFuaW1hdGlvbl8xID0gcmVxdWlyZShcIi4vQW5pbWF0aW9uXCIpO1xudmFyIEdsb2JhbF8xID0gcmVxdWlyZShcIi4vR2xvYmFsXCIpO1xuZXhwb3J0cy5ERCA9IHtcbiAgICBzdGFydFBvaW50ZXJQb3M6IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgIH0sXG4gICAgYW5pbTogbmV3IEFuaW1hdGlvbl8xLkFuaW1hdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBiID0gdGhpcy5kaXJ0eTtcbiAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gYjtcbiAgICB9KSxcbiAgICBpc0RyYWdnaW5nOiBmYWxzZSxcbiAgICBqdXN0RHJhZ2dlZDogZmFsc2UsXG4gICAgb2Zmc2V0OiB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICB9LFxuICAgIG5vZGU6IG51bGwsXG4gICAgX2RyYWc6IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBleHBvcnRzLkRELm5vZGU7XG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICBpZiAoIWV4cG9ydHMuREQuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBub2RlLmdldFN0YWdlKCkuZ2V0UG9pbnRlclBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFwb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRTdGFnZSgpLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgICAgICAgICAgICAgIHBvcyA9IG5vZGUuZ2V0U3RhZ2UoKS5nZXRQb2ludGVyUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGRyYWdEaXN0YW5jZSA9IG5vZGUuZHJhZ0Rpc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gTWF0aC5tYXgoTWF0aC5hYnMocG9zLnggLSBleHBvcnRzLkRELnN0YXJ0UG9pbnRlclBvcy54KSwgTWF0aC5hYnMocG9zLnkgLSBleHBvcnRzLkRELnN0YXJ0UG9pbnRlclBvcy55KSk7XG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgZHJhZ0Rpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLmdldFN0YWdlKCkuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgICAgIGlmICghZXhwb3J0cy5ERC5pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0cy5ERC5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBub2RlLmZpcmUoJ2RyYWdzdGFydCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RyYWdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogbm9kZSxcbiAgICAgICAgICAgICAgICAgICAgZXZ0OiBldnRcbiAgICAgICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUuaXNEcmFnZ2luZygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLl9zZXREcmFnUG9zaXRpb24oZXZ0KTtcbiAgICAgICAgICAgIG5vZGUuZmlyZSgnZHJhZ21vdmUnLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2RyYWdtb3ZlJyxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IG5vZGUsXG4gICAgICAgICAgICAgICAgZXZ0OiBldnRcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfZW5kRHJhZ0JlZm9yZTogZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICB2YXIgbm9kZSA9IGV4cG9ydHMuREQubm9kZTtcbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIGV4cG9ydHMuREQuYW5pbS5zdG9wKCk7XG4gICAgICAgICAgICBpZiAoZXhwb3J0cy5ERC5pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0cy5ERC5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXhwb3J0cy5ERC5qdXN0RHJhZ2dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgR2xvYmFsXzEuS29udmEubGlzdGVuQ2xpY2tUYXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2dC5kcmFnRW5kTm9kZSA9IG5vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhwb3J0cy5ERC5ub2RlID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBkcmF3Tm9kZSA9IG5vZGUuZ2V0TGF5ZXIoKSB8fCAobm9kZSBpbnN0YW5jZW9mIEdsb2JhbF8xLktvbnZhWydTdGFnZSddICYmIG5vZGUpO1xuICAgICAgICAgICAgaWYgKGRyYXdOb2RlKSB7XG4gICAgICAgICAgICAgICAgZHJhd05vZGUuZHJhdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBfZW5kRHJhZ0FmdGVyOiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGV2dCA9IGV2dCB8fCB7fTtcbiAgICAgICAgdmFyIGRyYWdFbmROb2RlID0gZXZ0LmRyYWdFbmROb2RlO1xuICAgICAgICBpZiAoZXZ0ICYmIGRyYWdFbmROb2RlKSB7XG4gICAgICAgICAgICBkcmFnRW5kTm9kZS5maXJlKCdkcmFnZW5kJywge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdkcmFnZW5kJyxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IGRyYWdFbmROb2RlLFxuICAgICAgICAgICAgICAgIGV2dDogZXZ0XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5pZiAoR2xvYmFsXzEuS29udmEuaXNCcm93c2VyKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBleHBvcnRzLkRELl9lbmREcmFnQmVmb3JlLCB0cnVlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBleHBvcnRzLkRELl9lbmREcmFnQmVmb3JlLCB0cnVlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZXhwb3J0cy5ERC5fZHJhZyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGV4cG9ydHMuREQuX2RyYWcpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZXhwb3J0cy5ERC5fZW5kRHJhZ0FmdGVyLCBmYWxzZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZXhwb3J0cy5ERC5fZW5kRHJhZ0FmdGVyLCBmYWxzZSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBVdGlsXzEgPSByZXF1aXJlKFwiLi9VdGlsXCIpO1xudmFyIFZhbGlkYXRvcnNfMSA9IHJlcXVpcmUoXCIuL1ZhbGlkYXRvcnNcIik7XG52YXIgR0VUID0gJ2dldCcsIFNFVCA9ICdzZXQnO1xuZXhwb3J0cy5GYWN0b3J5ID0ge1xuICAgIGFkZEdldHRlclNldHRlcjogZnVuY3Rpb24gKGNvbnN0cnVjdG9yLCBhdHRyLCBkZWYsIHZhbGlkYXRvciwgYWZ0ZXIpIHtcbiAgICAgICAgdGhpcy5hZGRHZXR0ZXIoY29uc3RydWN0b3IsIGF0dHIsIGRlZik7XG4gICAgICAgIHRoaXMuYWRkU2V0dGVyKGNvbnN0cnVjdG9yLCBhdHRyLCB2YWxpZGF0b3IsIGFmdGVyKTtcbiAgICAgICAgdGhpcy5hZGRPdmVybG9hZGVkR2V0dGVyU2V0dGVyKGNvbnN0cnVjdG9yLCBhdHRyKTtcbiAgICB9LFxuICAgIGFkZEdldHRlcjogZnVuY3Rpb24gKGNvbnN0cnVjdG9yLCBhdHRyLCBkZWYpIHtcbiAgICAgICAgdmFyIG1ldGhvZCA9IEdFVCArIFV0aWxfMS5VdGlsLl9jYXBpdGFsaXplKGF0dHIpO1xuICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kXSA9XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kXSB8fFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IHRoaXMuYXR0cnNbYXR0cl07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgPT09IHVuZGVmaW5lZCA/IGRlZiA6IHZhbDtcbiAgICAgICAgICAgICAgICB9O1xuICAgIH0sXG4gICAgYWRkU2V0dGVyOiBmdW5jdGlvbiAoY29uc3RydWN0b3IsIGF0dHIsIHZhbGlkYXRvciwgYWZ0ZXIpIHtcbiAgICAgICAgdmFyIG1ldGhvZCA9IFNFVCArIFV0aWxfMS5VdGlsLl9jYXBpdGFsaXplKGF0dHIpO1xuICAgICAgICBpZiAoIWNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2RdKSB7XG4gICAgICAgICAgICBleHBvcnRzLkZhY3Rvcnkub3ZlcldyaXRlU2V0dGVyKGNvbnN0cnVjdG9yLCBhdHRyLCB2YWxpZGF0b3IsIGFmdGVyKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgb3ZlcldyaXRlU2V0dGVyOiBmdW5jdGlvbiAoY29uc3RydWN0b3IsIGF0dHIsIHZhbGlkYXRvciwgYWZ0ZXIpIHtcbiAgICAgICAgdmFyIG1ldGhvZCA9IFNFVCArIFV0aWxfMS5VdGlsLl9jYXBpdGFsaXplKGF0dHIpO1xuICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0b3IgJiYgdmFsICE9PSB1bmRlZmluZWQgJiYgdmFsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsaWRhdG9yLmNhbGwodGhpcywgdmFsLCBhdHRyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3NldEF0dHIoYXR0ciwgdmFsKTtcbiAgICAgICAgICAgIGlmIChhZnRlcikge1xuICAgICAgICAgICAgICAgIGFmdGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXI6IGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgYXR0ciwgY29tcG9uZW50cywgdmFsaWRhdG9yLCBhZnRlcikge1xuICAgICAgICB2YXIgbGVuID0gY29tcG9uZW50cy5sZW5ndGgsIGNhcGl0YWxpemUgPSBVdGlsXzEuVXRpbC5fY2FwaXRhbGl6ZSwgZ2V0dGVyID0gR0VUICsgY2FwaXRhbGl6ZShhdHRyKSwgc2V0dGVyID0gU0VUICsgY2FwaXRhbGl6ZShhdHRyKSwgbiwgY29tcG9uZW50O1xuICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbZ2V0dGVyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudHNbbl07XG4gICAgICAgICAgICAgICAgcmV0W2NvbXBvbmVudF0gPSB0aGlzLmdldEF0dHIoYXR0ciArIGNhcGl0YWxpemUoY29tcG9uZW50KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgYmFzaWNWYWxpZGF0b3IgPSBWYWxpZGF0b3JzXzEuZ2V0Q29tcG9uZW50VmFsaWRhdG9yKGNvbXBvbmVudHMpO1xuICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbc2V0dGVyXSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIHZhciBvbGRWYWwgPSB0aGlzLmF0dHJzW2F0dHJdLCBrZXk7XG4gICAgICAgICAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsaWRhdG9yLmNhbGwodGhpcywgdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiYXNpY1ZhbGlkYXRvcikge1xuICAgICAgICAgICAgICAgIGJhc2ljVmFsaWRhdG9yLmNhbGwodGhpcywgdmFsLCBhdHRyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoa2V5IGluIHZhbCkge1xuICAgICAgICAgICAgICAgIGlmICghdmFsLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3NldEF0dHIoYXR0ciArIGNhcGl0YWxpemUoa2V5KSwgdmFsW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZmlyZUNoYW5nZUV2ZW50KGF0dHIsIG9sZFZhbCwgdmFsKTtcbiAgICAgICAgICAgIGlmIChhZnRlcikge1xuICAgICAgICAgICAgICAgIGFmdGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hZGRPdmVybG9hZGVkR2V0dGVyU2V0dGVyKGNvbnN0cnVjdG9yLCBhdHRyKTtcbiAgICB9LFxuICAgIGFkZE92ZXJsb2FkZWRHZXR0ZXJTZXR0ZXI6IGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgYXR0cikge1xuICAgICAgICB2YXIgY2FwaXRhbGl6ZWRBdHRyID0gVXRpbF8xLlV0aWwuX2NhcGl0YWxpemUoYXR0ciksIHNldHRlciA9IFNFVCArIGNhcGl0YWxpemVkQXR0ciwgZ2V0dGVyID0gR0VUICsgY2FwaXRhbGl6ZWRBdHRyO1xuICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbYXR0cl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXNbc2V0dGVyXShhcmd1bWVudHNbMF0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNbZ2V0dGVyXSgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgYWRkRGVwcmVjYXRlZEdldHRlclNldHRlcjogZnVuY3Rpb24gKGNvbnN0cnVjdG9yLCBhdHRyLCBkZWYsIHZhbGlkYXRvcikge1xuICAgICAgICBVdGlsXzEuVXRpbC5lcnJvcignQWRkaW5nIGRlcHJlY2F0ZWQgJyArIGF0dHIpO1xuICAgICAgICB2YXIgbWV0aG9kID0gR0VUICsgVXRpbF8xLlV0aWwuX2NhcGl0YWxpemUoYXR0cik7XG4gICAgICAgIHZhciBtZXNzYWdlID0gYXR0ciArXG4gICAgICAgICAgICAnIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBzb29uLiBMb29rIGF0IEtvbnZhIGNoYW5nZSBsb2cgZm9yIG1vcmUgaW5mb3JtYXRpb24uJztcbiAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgICAgIHZhciB2YWwgPSB0aGlzLmF0dHJzW2F0dHJdO1xuICAgICAgICAgICAgcmV0dXJuIHZhbCA9PT0gdW5kZWZpbmVkID8gZGVmIDogdmFsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFkZFNldHRlcihjb25zdHJ1Y3RvciwgYXR0ciwgdmFsaWRhdG9yLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWRkT3ZlcmxvYWRlZEdldHRlclNldHRlcihjb25zdHJ1Y3RvciwgYXR0cik7XG4gICAgfSxcbiAgICBiYWNrQ29tcGF0OiBmdW5jdGlvbiAoY29uc3RydWN0b3IsIG1ldGhvZHMpIHtcbiAgICAgICAgVXRpbF8xLlV0aWwuZWFjaChtZXRob2RzLCBmdW5jdGlvbiAob2xkTWV0aG9kTmFtZSwgbmV3TWV0aG9kTmFtZSkge1xuICAgICAgICAgICAgdmFyIG1ldGhvZCA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZVtuZXdNZXRob2ROYW1lXTtcbiAgICAgICAgICAgIHZhciBvbGRHZXR0ZXIgPSBHRVQgKyBVdGlsXzEuVXRpbC5fY2FwaXRhbGl6ZShvbGRNZXRob2ROYW1lKTtcbiAgICAgICAgICAgIHZhciBvbGRTZXR0ZXIgPSBTRVQgKyBVdGlsXzEuVXRpbC5fY2FwaXRhbGl6ZShvbGRNZXRob2ROYW1lKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlcHJlY2F0ZWQoKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgVXRpbF8xLlV0aWwuZXJyb3IoJ1wiJyArXG4gICAgICAgICAgICAgICAgICAgIG9sZE1ldGhvZE5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBzb29uLiBVc2UgXCJcIicgK1xuICAgICAgICAgICAgICAgICAgICBuZXdNZXRob2ROYW1lICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGluc3RlYWQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbb2xkTWV0aG9kTmFtZV0gPSBkZXByZWNhdGVkO1xuICAgICAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW29sZEdldHRlcl0gPSBkZXByZWNhdGVkO1xuICAgICAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW29sZFNldHRlcl0gPSBkZXByZWNhdGVkO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGFmdGVyU2V0RmlsdGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2ZpbHRlclVwVG9EYXRlID0gZmFsc2U7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFBJX09WRVJfMTgwID0gTWF0aC5QSSAvIDE4MDtcbmZ1bmN0aW9uIGRldGVjdEJyb3dzZXIoKSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAoe30udG9TdHJpbmcuY2FsbCh3aW5kb3cpID09PSAnW29iamVjdCBXaW5kb3ddJyB8fFxuICAgICAgICAgICAge30udG9TdHJpbmcuY2FsbCh3aW5kb3cpID09PSAnW29iamVjdCBnbG9iYWxdJykpO1xufVxudmFyIF9kZXRlY3RJRSA9IGZ1bmN0aW9uICh1YSkge1xuICAgIHZhciBtc2llID0gdWEuaW5kZXhPZignbXNpZSAnKTtcbiAgICBpZiAobXNpZSA+IDApIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHVhLnN1YnN0cmluZyhtc2llICsgNSwgdWEuaW5kZXhPZignLicsIG1zaWUpKSwgMTApO1xuICAgIH1cbiAgICB2YXIgdHJpZGVudCA9IHVhLmluZGV4T2YoJ3RyaWRlbnQvJyk7XG4gICAgaWYgKHRyaWRlbnQgPiAwKSB7XG4gICAgICAgIHZhciBydiA9IHVhLmluZGV4T2YoJ3J2OicpO1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodWEuc3Vic3RyaW5nKHJ2ICsgMywgdWEuaW5kZXhPZignLicsIHJ2KSksIDEwKTtcbiAgICB9XG4gICAgdmFyIGVkZ2UgPSB1YS5pbmRleE9mKCdlZGdlLycpO1xuICAgIGlmIChlZGdlID4gMCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodWEuc3Vic3RyaW5nKGVkZ2UgKyA1LCB1YS5pbmRleE9mKCcuJywgZWRnZSkpLCAxMCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5leHBvcnRzLl9wYXJzZVVBID0gZnVuY3Rpb24gKHVzZXJBZ2VudCkge1xuICAgIHZhciB1YSA9IHVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLCBtYXRjaCA9IC8oY2hyb21lKVsgL10oW1xcdy5dKykvLmV4ZWModWEpIHx8XG4gICAgICAgIC8od2Via2l0KVsgL10oW1xcdy5dKykvLmV4ZWModWEpIHx8XG4gICAgICAgIC8ob3BlcmEpKD86Lip2ZXJzaW9ufClbIC9dKFtcXHcuXSspLy5leGVjKHVhKSB8fFxuICAgICAgICAvKG1zaWUpIChbXFx3Ll0rKS8uZXhlYyh1YSkgfHxcbiAgICAgICAgKHVhLmluZGV4T2YoJ2NvbXBhdGlibGUnKSA8IDAgJiZcbiAgICAgICAgICAgIC8obW96aWxsYSkoPzouKj8gcnY6KFtcXHcuXSspfCkvLmV4ZWModWEpKSB8fFxuICAgICAgICBbXSwgbW9iaWxlID0gISF1c2VyQWdlbnQubWF0Y2goL0FuZHJvaWR8QmxhY2tCZXJyeXxpUGhvbmV8aVBhZHxpUG9kfE9wZXJhIE1pbml8SUVNb2JpbGUvaSksIGllTW9iaWxlID0gISF1c2VyQWdlbnQubWF0Y2goL0lFTW9iaWxlL2kpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGJyb3dzZXI6IG1hdGNoWzFdIHx8ICcnLFxuICAgICAgICB2ZXJzaW9uOiBtYXRjaFsyXSB8fCAnMCcsXG4gICAgICAgIGlzSUU6IF9kZXRlY3RJRSh1YSksXG4gICAgICAgIG1vYmlsZTogbW9iaWxlLFxuICAgICAgICBpZU1vYmlsZTogaWVNb2JpbGVcbiAgICB9O1xufTtcbmV4cG9ydHMuZ2xvYiA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnXG4gICAgPyBnbG9iYWxcbiAgICA6IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gd2luZG93XG4gICAgICAgIDogdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgPyBzZWxmXG4gICAgICAgICAgICA6IHt9O1xuZXhwb3J0cy5Lb252YSA9IHtcbiAgICB2ZXJzaW9uOiAnMy4yLjYnLFxuICAgIGlzQnJvd3NlcjogZGV0ZWN0QnJvd3NlcigpLFxuICAgIGlzVW5taW5pZmllZDogL3BhcmFtLy50ZXN0KGZ1bmN0aW9uIChwYXJhbSkgeyB9LnRvU3RyaW5nKCkpLFxuICAgIGRibENsaWNrV2luZG93OiA0MDAsXG4gICAgZ2V0QW5nbGU6IGZ1bmN0aW9uIChhbmdsZSkge1xuICAgICAgICByZXR1cm4gZXhwb3J0cy5Lb252YS5hbmdsZURlZyA/IGFuZ2xlICogUElfT1ZFUl8xODAgOiBhbmdsZTtcbiAgICB9LFxuICAgIGVuYWJsZVRyYWNlOiBmYWxzZSxcbiAgICBsaXN0ZW5DbGlja1RhcDogZmFsc2UsXG4gICAgaW5EYmxDbGlja1dpbmRvdzogZmFsc2UsXG4gICAgcGl4ZWxSYXRpbzogdW5kZWZpbmVkLFxuICAgIGRyYWdEaXN0YW5jZTogMyxcbiAgICBhbmdsZURlZzogdHJ1ZSxcbiAgICBzaG93V2FybmluZ3M6IHRydWUsXG4gICAgZHJhZ0J1dHRvbnM6IFswLCAxXSxcbiAgICBpc0RyYWdnaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBleHBvcnRzLktvbnZhWydERCddLmlzRHJhZ2dpbmc7XG4gICAgfSxcbiAgICBpc0RyYWdSZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gISFleHBvcnRzLktvbnZhWydERCddLm5vZGU7XG4gICAgfSxcbiAgICBVQTogZXhwb3J0cy5fcGFyc2VVQSgoZXhwb3J0cy5nbG9iLm5hdmlnYXRvciAmJiBleHBvcnRzLmdsb2IubmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgJycpLFxuICAgIGRvY3VtZW50OiBleHBvcnRzLmdsb2IuZG9jdW1lbnQsXG4gICAgX2luamVjdEdsb2JhbDogZnVuY3Rpb24gKEtvbnZhKSB7XG4gICAgICAgIGV4cG9ydHMuZ2xvYi5Lb252YSA9IEtvbnZhO1xuICAgIH0sXG4gICAgX3BhcnNlVUE6IGV4cG9ydHMuX3BhcnNlVUFcbn07XG5leHBvcnRzLl9OT0RFU19SRUdJU1RSWSA9IHt9O1xuZXhwb3J0cy5fcmVnaXN0ZXJOb2RlID0gZnVuY3Rpb24gKE5vZGVDbGFzcykge1xuICAgIGV4cG9ydHMuX05PREVTX1JFR0lTVFJZW05vZGVDbGFzcy5wcm90b3R5cGUuZ2V0Q2xhc3NOYW1lKCldID0gTm9kZUNsYXNzO1xuICAgIGV4cG9ydHMuS29udmFbTm9kZUNsYXNzLnByb3RvdHlwZS5nZXRDbGFzc05hbWUoKV0gPSBOb2RlQ2xhc3M7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBVdGlsXzEgPSByZXF1aXJlKFwiLi9VdGlsXCIpO1xudmFyIENvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vQ29udGFpbmVyXCIpO1xudmFyIEZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuL0ZhY3RvcnlcIik7XG52YXIgQmFzZUxheWVyXzEgPSByZXF1aXJlKFwiLi9CYXNlTGF5ZXJcIik7XG52YXIgQ2FudmFzXzEgPSByZXF1aXJlKFwiLi9DYW52YXNcIik7XG52YXIgU2hhcGVfMSA9IHJlcXVpcmUoXCIuL1NoYXBlXCIpO1xudmFyIFZhbGlkYXRvcnNfMSA9IHJlcXVpcmUoXCIuL1ZhbGlkYXRvcnNcIik7XG52YXIgR2xvYmFsXzEgPSByZXF1aXJlKFwiLi9HbG9iYWxcIik7XG52YXIgSEFTSCA9ICcjJywgQkVGT1JFX0RSQVcgPSAnYmVmb3JlRHJhdycsIERSQVcgPSAnZHJhdycsIElOVEVSU0VDVElPTl9PRkZTRVRTID0gW1xuICAgIHsgeDogMCwgeTogMCB9LFxuICAgIHsgeDogLTEsIHk6IC0xIH0sXG4gICAgeyB4OiAxLCB5OiAtMSB9LFxuICAgIHsgeDogMSwgeTogMSB9LFxuICAgIHsgeDogLTEsIHk6IDEgfVxuXSwgSU5URVJTRUNUSU9OX09GRlNFVFNfTEVOID0gSU5URVJTRUNUSU9OX09GRlNFVFMubGVuZ3RoO1xudmFyIExheWVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTGF5ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTGF5ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5oaXRDYW52YXMgPSBuZXcgQ2FudmFzXzEuSGl0Q2FudmFzKHtcbiAgICAgICAgICAgIHBpeGVsUmF0aW86IDFcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgTGF5ZXIucHJvdG90eXBlLl9zZXRDYW52YXNTaXplID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5jYW52YXMuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5oaXRDYW52YXMuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICB9O1xuICAgIExheWVyLnByb3RvdHlwZS5fdmFsaWRhdGVBZGQgPSBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBjaGlsZC5nZXRUeXBlKCk7XG4gICAgICAgIGlmICh0eXBlICE9PSAnR3JvdXAnICYmIHR5cGUgIT09ICdTaGFwZScpIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLnRocm93KCdZb3UgbWF5IG9ubHkgYWRkIGdyb3VwcyBhbmQgc2hhcGVzIHRvIGEgbGF5ZXIuJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExheWVyLnByb3RvdHlwZS5nZXRJbnRlcnNlY3Rpb24gPSBmdW5jdGlvbiAocG9zLCBzZWxlY3Rvcikge1xuICAgICAgICB2YXIgb2JqLCBpLCBpbnRlcnNlY3Rpb25PZmZzZXQsIHNoYXBlO1xuICAgICAgICBpZiAoIXRoaXMuaGl0R3JhcGhFbmFibGVkKCkgfHwgIXRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzcGlyYWxTZWFyY2hEaXN0YW5jZSA9IDE7XG4gICAgICAgIHZhciBjb250aW51ZVNlYXJjaCA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IElOVEVSU0VDVElPTl9PRkZTRVRTX0xFTjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaW50ZXJzZWN0aW9uT2Zmc2V0ID0gSU5URVJTRUNUSU9OX09GRlNFVFNbaV07XG4gICAgICAgICAgICAgICAgb2JqID0gdGhpcy5fZ2V0SW50ZXJzZWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgeDogcG9zLnggKyBpbnRlcnNlY3Rpb25PZmZzZXQueCAqIHNwaXJhbFNlYXJjaERpc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICB5OiBwb3MueSArIGludGVyc2VjdGlvbk9mZnNldC55ICogc3BpcmFsU2VhcmNoRGlzdGFuY2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzaGFwZSA9IG9iai5zaGFwZTtcbiAgICAgICAgICAgICAgICBpZiAoc2hhcGUgJiYgc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNoYXBlLmZpbmRBbmNlc3RvcihzZWxlY3RvciwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNoYXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzaGFwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGludWVTZWFyY2ggPSAhIW9iai5hbnRpYWxpYXNlZDtcbiAgICAgICAgICAgICAgICBpZiAoIW9iai5hbnRpYWxpYXNlZCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29udGludWVTZWFyY2gpIHtcbiAgICAgICAgICAgICAgICBzcGlyYWxTZWFyY2hEaXN0YW5jZSArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExheWVyLnByb3RvdHlwZS5fZ2V0SW50ZXJzZWN0aW9uID0gZnVuY3Rpb24gKHBvcykge1xuICAgICAgICB2YXIgcmF0aW8gPSB0aGlzLmhpdENhbnZhcy5waXhlbFJhdGlvO1xuICAgICAgICB2YXIgcCA9IHRoaXMuaGl0Q2FudmFzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKE1hdGgucm91bmQocG9zLnggKiByYXRpbyksIE1hdGgucm91bmQocG9zLnkgKiByYXRpbyksIDEsIDEpLmRhdGEsIHAzID0gcFszXSwgY29sb3JLZXksIHNoYXBlO1xuICAgICAgICBpZiAocDMgPT09IDI1NSkge1xuICAgICAgICAgICAgY29sb3JLZXkgPSBVdGlsXzEuVXRpbC5fcmdiVG9IZXgocFswXSwgcFsxXSwgcFsyXSk7XG4gICAgICAgICAgICBzaGFwZSA9IFNoYXBlXzEuc2hhcGVzW0hBU0ggKyBjb2xvcktleV07XG4gICAgICAgICAgICBpZiAoc2hhcGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzaGFwZTogc2hhcGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhbnRpYWxpYXNlZDogdHJ1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwMyA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYW50aWFsaWFzZWQ6IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH07XG4gICAgTGF5ZXIucHJvdG90eXBlLmRyYXdTY2VuZSA9IGZ1bmN0aW9uIChjYW4sIHRvcCkge1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCksIGNhbnZhcyA9IGNhbiB8fCAobGF5ZXIgJiYgbGF5ZXIuZ2V0Q2FudmFzKCkpO1xuICAgICAgICB0aGlzLl9maXJlKEJFRk9SRV9EUkFXLCB7XG4gICAgICAgICAgICBub2RlOiB0aGlzXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5jbGVhckJlZm9yZURyYXcoKSkge1xuICAgICAgICAgICAgY2FudmFzLmdldENvbnRleHQoKS5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIENvbnRhaW5lcl8xLkNvbnRhaW5lci5wcm90b3R5cGUuZHJhd1NjZW5lLmNhbGwodGhpcywgY2FudmFzLCB0b3ApO1xuICAgICAgICB0aGlzLl9maXJlKERSQVcsIHtcbiAgICAgICAgICAgIG5vZGU6IHRoaXNcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTGF5ZXIucHJvdG90eXBlLmRyYXdIaXQgPSBmdW5jdGlvbiAoY2FuLCB0b3ApIHtcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpLCBjYW52YXMgPSBjYW4gfHwgKGxheWVyICYmIGxheWVyLmhpdENhbnZhcyk7XG4gICAgICAgIGlmIChsYXllciAmJiBsYXllci5jbGVhckJlZm9yZURyYXcoKSkge1xuICAgICAgICAgICAgbGF5ZXJcbiAgICAgICAgICAgICAgICAuZ2V0SGl0Q2FudmFzKClcbiAgICAgICAgICAgICAgICAuZ2V0Q29udGV4dCgpXG4gICAgICAgICAgICAgICAgLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgQ29udGFpbmVyXzEuQ29udGFpbmVyLnByb3RvdHlwZS5kcmF3SGl0LmNhbGwodGhpcywgY2FudmFzLCB0b3ApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIExheWVyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICAgICAgQmFzZUxheWVyXzEuQmFzZUxheWVyLnByb3RvdHlwZS5jbGVhci5jYWxsKHRoaXMsIGJvdW5kcyk7XG4gICAgICAgIHRoaXMuZ2V0SGl0Q2FudmFzKClcbiAgICAgICAgICAgIC5nZXRDb250ZXh0KClcbiAgICAgICAgICAgIC5jbGVhcihib3VuZHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIExheWVyLnByb3RvdHlwZS5lbmFibGVIaXRHcmFwaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5oaXRHcmFwaEVuYWJsZWQodHJ1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTGF5ZXIucHJvdG90eXBlLmRpc2FibGVIaXRHcmFwaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5oaXRHcmFwaEVuYWJsZWQoZmFsc2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIExheWVyLnByb3RvdHlwZS50b2dnbGVIaXRDYW52YXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQ7XG4gICAgICAgIHZhciBhZGRlZCA9ICEhdGhpcy5oaXRDYW52YXMuX2NhbnZhcy5wYXJlbnROb2RlO1xuICAgICAgICBpZiAoYWRkZWQpIHtcbiAgICAgICAgICAgIHBhcmVudC5jb250ZW50LnJlbW92ZUNoaWxkKHRoaXMuaGl0Q2FudmFzLl9jYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50LmNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5oaXRDYW52YXMuX2NhbnZhcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExheWVyLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciB3aWR0aCA9IF9hLndpZHRoLCBoZWlnaHQgPSBfYS5oZWlnaHQ7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuc2V0U2l6ZS5jYWxsKHRoaXMsIHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9KTtcbiAgICAgICAgdGhpcy5oaXRDYW52YXMuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gTGF5ZXI7XG59KEJhc2VMYXllcl8xLkJhc2VMYXllcikpO1xuZXhwb3J0cy5MYXllciA9IExheWVyO1xuTGF5ZXIucHJvdG90eXBlLm5vZGVUeXBlID0gJ0xheWVyJztcbkdsb2JhbF8xLl9yZWdpc3Rlck5vZGUoTGF5ZXIpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKExheWVyLCAnaGl0R3JhcGhFbmFibGVkJywgdHJ1ZSwgVmFsaWRhdG9yc18xLmdldEJvb2xlYW5WYWxpZGF0b3IoKSk7XG5VdGlsXzEuQ29sbGVjdGlvbi5tYXBNZXRob2RzKExheWVyKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFV0aWxfMSA9IHJlcXVpcmUoXCIuL1V0aWxcIik7XG52YXIgRmFjdG9yeV8xID0gcmVxdWlyZShcIi4vRmFjdG9yeVwiKTtcbnZhciBDYW52YXNfMSA9IHJlcXVpcmUoXCIuL0NhbnZhc1wiKTtcbnZhciBHbG9iYWxfMSA9IHJlcXVpcmUoXCIuL0dsb2JhbFwiKTtcbnZhciBEcmFnQW5kRHJvcF8xID0gcmVxdWlyZShcIi4vRHJhZ0FuZERyb3BcIik7XG52YXIgVmFsaWRhdG9yc18xID0gcmVxdWlyZShcIi4vVmFsaWRhdG9yc1wiKTtcbmV4cG9ydHMuaWRzID0ge307XG5leHBvcnRzLm5hbWVzID0ge307XG52YXIgX2FkZElkID0gZnVuY3Rpb24gKG5vZGUsIGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGV4cG9ydHMuaWRzW2lkXSA9IG5vZGU7XG59O1xuZXhwb3J0cy5fcmVtb3ZlSWQgPSBmdW5jdGlvbiAoaWQsIG5vZGUpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGV4cG9ydHMuaWRzW2lkXSAhPT0gbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlbGV0ZSBleHBvcnRzLmlkc1tpZF07XG59O1xuZXhwb3J0cy5fYWRkTmFtZSA9IGZ1bmN0aW9uIChub2RlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgICAgaWYgKCFleHBvcnRzLm5hbWVzW25hbWVdKSB7XG4gICAgICAgICAgICBleHBvcnRzLm5hbWVzW25hbWVdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0cy5uYW1lc1tuYW1lXS5wdXNoKG5vZGUpO1xuICAgIH1cbn07XG5leHBvcnRzLl9yZW1vdmVOYW1lID0gZnVuY3Rpb24gKG5hbWUsIF9pZCkge1xuICAgIGlmICghbmFtZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBub2RlcyA9IGV4cG9ydHMubmFtZXNbbmFtZV07XG4gICAgaWYgKCFub2Rlcykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAodmFyIG4gPSAwOyBuIDwgbm9kZXMubGVuZ3RoOyBuKyspIHtcbiAgICAgICAgdmFyIG5vID0gbm9kZXNbbl07XG4gICAgICAgIGlmIChuby5faWQgPT09IF9pZCkge1xuICAgICAgICAgICAgbm9kZXMuc3BsaWNlKG4sIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZGVsZXRlIGV4cG9ydHMubmFtZXNbbmFtZV07XG4gICAgfVxufTtcbnZhciBBQlNPTFVURV9PUEFDSVRZID0gJ2Fic29sdXRlT3BhY2l0eScsIEFCU09MVVRFX1RSQU5TRk9STSA9ICdhYnNvbHV0ZVRyYW5zZm9ybScsIEFCU09MVVRFX1NDQUxFID0gJ2Fic29sdXRlU2NhbGUnLCBDQU5WQVMgPSAnY2FudmFzJywgQ0hBTkdFID0gJ0NoYW5nZScsIENISUxEUkVOID0gJ2NoaWxkcmVuJywgS09OVkEgPSAna29udmEnLCBMSVNURU5JTkcgPSAnbGlzdGVuaW5nJywgTU9VU0VFTlRFUiA9ICdtb3VzZWVudGVyJywgTU9VU0VMRUFWRSA9ICdtb3VzZWxlYXZlJywgTkFNRSA9ICduYW1lJywgU0VUID0gJ3NldCcsIFNIQVBFID0gJ1NoYXBlJywgU1BBQ0UgPSAnICcsIFNUQUdFID0gJ3N0YWdlJywgVFJBTlNGT1JNID0gJ3RyYW5zZm9ybScsIFVQUEVSX1NUQUdFID0gJ1N0YWdlJywgVklTSUJMRSA9ICd2aXNpYmxlJywgQ0xPTkVfQkxBQ0tfTElTVCA9IFsnaWQnXSwgVFJBTlNGT1JNX0NIQU5HRV9TVFIgPSBbXG4gICAgJ3hDaGFuZ2Uua29udmEnLFxuICAgICd5Q2hhbmdlLmtvbnZhJyxcbiAgICAnc2NhbGVYQ2hhbmdlLmtvbnZhJyxcbiAgICAnc2NhbGVZQ2hhbmdlLmtvbnZhJyxcbiAgICAnc2tld1hDaGFuZ2Uua29udmEnLFxuICAgICdza2V3WUNoYW5nZS5rb252YScsXG4gICAgJ3JvdGF0aW9uQ2hhbmdlLmtvbnZhJyxcbiAgICAnb2Zmc2V0WENoYW5nZS5rb252YScsXG4gICAgJ29mZnNldFlDaGFuZ2Uua29udmEnLFxuICAgICd0cmFuc2Zvcm1zRW5hYmxlZENoYW5nZS5rb252YSdcbl0uam9pbihTUEFDRSksIFNDQUxFX0NIQU5HRV9TVFIgPSBbJ3NjYWxlWENoYW5nZS5rb252YScsICdzY2FsZVlDaGFuZ2Uua29udmEnXS5qb2luKFNQQUNFKTtcbnZhciBlbXB0eUNoaWxkcmVuID0gbmV3IFV0aWxfMS5Db2xsZWN0aW9uKCk7XG52YXIgaWRDb3VudGVyID0gMTtcbnZhciBOb2RlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOb2RlKGNvbmZpZykge1xuICAgICAgICB0aGlzLl9pZCA9IGlkQ291bnRlcisrO1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzID0ge307XG4gICAgICAgIHRoaXMuYXR0cnMgPSB7fTtcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY2FjaGUgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX2xhc3RQb3MgPSBudWxsO1xuICAgICAgICB0aGlzLl9maWx0ZXJVcFRvRGF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1VuZGVyQ2FjaGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IGVtcHR5Q2hpbGRyZW47XG4gICAgICAgIHRoaXMuc2V0QXR0cnMoY29uZmlnKTtcbiAgICAgICAgdGhpcy5vbihUUkFOU0ZPUk1fQ0hBTkdFX1NUUiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fY2xlYXJDYWNoZShUUkFOU0ZPUk0pO1xuICAgICAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKEFCU09MVVRFX1RSQU5TRk9STSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uKFNDQUxFX0NIQU5HRV9TVFIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShBQlNPTFVURV9TQ0FMRSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uKCd2aXNpYmxlQ2hhbmdlLmtvbnZhJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKFZJU0lCTEUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbignbGlzdGVuaW5nQ2hhbmdlLmtvbnZhJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKExJU1RFTklORyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uKCdvcGFjaXR5Q2hhbmdlLmtvbnZhJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKEFCU09MVVRFX09QQUNJVFkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgTm9kZS5wcm90b3R5cGUuaGFzQ2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldENoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZW1wdHlDaGlsZHJlbjtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9jbGVhckNhY2hlID0gZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgICAgaWYgKGF0dHIpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlLmRlbGV0ZShhdHRyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9nZXRDYWNoZSA9IGZ1bmN0aW9uIChhdHRyLCBwcml2YXRlR2V0dGVyKSB7XG4gICAgICAgIHZhciBjYWNoZSA9IHRoaXMuX2NhY2hlLmdldChhdHRyKTtcbiAgICAgICAgaWYgKGNhY2hlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNhY2hlID0gcHJpdmF0ZUdldHRlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fY2FjaGUuc2V0KGF0dHIsIGNhY2hlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FjaGU7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZ2V0Q2FudmFzQ2FjaGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZS5nZXQoQ0FOVkFTKTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUgPSBmdW5jdGlvbiAoYXR0cikge1xuICAgICAgICB0aGlzLl9jbGVhckNhY2hlKGF0dHIpO1xuICAgICAgICBpZiAodGhpcy5fZ2V0Q2FudmFzQ2FjaGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBub2RlLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoYXR0cik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY2FjaGUuZGVsZXRlKENBTlZBUyk7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmNhY2hlID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICB2YXIgY29uZiA9IGNvbmZpZyB8fCB7fTtcbiAgICAgICAgdmFyIHJlY3QgPSB7fTtcbiAgICAgICAgaWYgKGNvbmYueCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBjb25mLnkgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgY29uZi53aWR0aCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBjb25mLmhlaWdodCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZWN0ID0gdGhpcy5nZXRDbGllbnRSZWN0KHtcbiAgICAgICAgICAgICAgICBza2lwVHJhbnNmb3JtOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJlbGF0aXZlVG86IHRoaXMuZ2V0UGFyZW50KClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3aWR0aCA9IGNvbmYud2lkdGggfHwgcmVjdC53aWR0aCwgaGVpZ2h0ID0gY29uZi5oZWlnaHQgfHwgcmVjdC5oZWlnaHQsIHBpeGVsUmF0aW8gPSBjb25mLnBpeGVsUmF0aW8sIHggPSBjb25mLnggPT09IHVuZGVmaW5lZCA/IHJlY3QueCA6IGNvbmYueCwgeSA9IGNvbmYueSA9PT0gdW5kZWZpbmVkID8gcmVjdC55IDogY29uZi55LCBvZmZzZXQgPSBjb25mLm9mZnNldCB8fCAwLCBkcmF3Qm9yZGVyID0gY29uZi5kcmF3Qm9yZGVyIHx8IGZhbHNlO1xuICAgICAgICBpZiAoIXdpZHRoIHx8ICFoZWlnaHQpIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLmVycm9yKCdDYW4gbm90IGNhY2hlIHRoZSBub2RlLiBXaWR0aCBvciBoZWlnaHQgb2YgdGhlIG5vZGUgZXF1YWxzIDAuIENhY2hpbmcgaXMgc2tpcHBlZC4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3aWR0aCArPSBvZmZzZXQgKiAyO1xuICAgICAgICBoZWlnaHQgKz0gb2Zmc2V0ICogMjtcbiAgICAgICAgeCAtPSBvZmZzZXQ7XG4gICAgICAgIHkgLT0gb2Zmc2V0O1xuICAgICAgICB2YXIgY2FjaGVkU2NlbmVDYW52YXMgPSBuZXcgQ2FudmFzXzEuU2NlbmVDYW52YXMoe1xuICAgICAgICAgICAgcGl4ZWxSYXRpbzogcGl4ZWxSYXRpbyxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgIH0pLCBjYWNoZWRGaWx0ZXJDYW52YXMgPSBuZXcgQ2FudmFzXzEuU2NlbmVDYW52YXMoe1xuICAgICAgICAgICAgcGl4ZWxSYXRpbzogcGl4ZWxSYXRpbyxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgIH0pLCBjYWNoZWRIaXRDYW52YXMgPSBuZXcgQ2FudmFzXzEuSGl0Q2FudmFzKHtcbiAgICAgICAgICAgIHBpeGVsUmF0aW86IDEsXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICB9KSwgc2NlbmVDb250ZXh0ID0gY2FjaGVkU2NlbmVDYW52YXMuZ2V0Q29udGV4dCgpLCBoaXRDb250ZXh0ID0gY2FjaGVkSGl0Q2FudmFzLmdldENvbnRleHQoKTtcbiAgICAgICAgY2FjaGVkSGl0Q2FudmFzLmlzQ2FjaGUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jYWNoZS5kZWxldGUoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLl9maWx0ZXJVcFRvRGF0ZSA9IGZhbHNlO1xuICAgICAgICBzY2VuZUNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBoaXRDb250ZXh0LnNhdmUoKTtcbiAgICAgICAgc2NlbmVDb250ZXh0LnRyYW5zbGF0ZSgteCwgLXkpO1xuICAgICAgICBoaXRDb250ZXh0LnRyYW5zbGF0ZSgteCwgLXkpO1xuICAgICAgICB0aGlzLl9pc1VuZGVyQ2FjaGUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoQUJTT0xVVEVfT1BBQ0lUWSk7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShBQlNPTFVURV9TQ0FMRSk7XG4gICAgICAgIHRoaXMuZHJhd1NjZW5lKGNhY2hlZFNjZW5lQ2FudmFzLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5kcmF3SGl0KGNhY2hlZEhpdENhbnZhcywgdGhpcywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2lzVW5kZXJDYWNoZSA9IGZhbHNlO1xuICAgICAgICBzY2VuZUNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICBoaXRDb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgaWYgKGRyYXdCb3JkZXIpIHtcbiAgICAgICAgICAgIHNjZW5lQ29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICBzY2VuZUNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBzY2VuZUNvbnRleHQucmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHNjZW5lQ29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIHNjZW5lQ29udGV4dC5zZXRBdHRyKCdzdHJva2VTdHlsZScsICdyZWQnKTtcbiAgICAgICAgICAgIHNjZW5lQ29udGV4dC5zZXRBdHRyKCdsaW5lV2lkdGgnLCA1KTtcbiAgICAgICAgICAgIHNjZW5lQ29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgIHNjZW5lQ29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2FjaGUuc2V0KENBTlZBUywge1xuICAgICAgICAgICAgc2NlbmU6IGNhY2hlZFNjZW5lQ2FudmFzLFxuICAgICAgICAgICAgZmlsdGVyOiBjYWNoZWRGaWx0ZXJDYW52YXMsXG4gICAgICAgICAgICBoaXQ6IGNhY2hlZEhpdENhbnZhcyxcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldENsaWVudFJlY3QgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYWJzdHJhY3QgXCJnZXRDbGllbnRSZWN0XCIgbWV0aG9kIGNhbGwnKTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl90cmFuc2Zvcm1lZFJlY3QgPSBmdW5jdGlvbiAocmVjdCwgdG9wKSB7XG4gICAgICAgIHZhciBwb2ludHMgPSBbXG4gICAgICAgICAgICB7IHg6IHJlY3QueCwgeTogcmVjdC55IH0sXG4gICAgICAgICAgICB7IHg6IHJlY3QueCArIHJlY3Qud2lkdGgsIHk6IHJlY3QueSB9LFxuICAgICAgICAgICAgeyB4OiByZWN0LnggKyByZWN0LndpZHRoLCB5OiByZWN0LnkgKyByZWN0LmhlaWdodCB9LFxuICAgICAgICAgICAgeyB4OiByZWN0LngsIHk6IHJlY3QueSArIHJlY3QuaGVpZ2h0IH1cbiAgICAgICAgXTtcbiAgICAgICAgdmFyIG1pblgsIG1pblksIG1heFgsIG1heFk7XG4gICAgICAgIHZhciB0cmFucyA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0odG9wKTtcbiAgICAgICAgcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtZWQgPSB0cmFucy5wb2ludChwb2ludCk7XG4gICAgICAgICAgICBpZiAobWluWCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbWluWCA9IG1heFggPSB0cmFuc2Zvcm1lZC54O1xuICAgICAgICAgICAgICAgIG1pblkgPSBtYXhZID0gdHJhbnNmb3JtZWQueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1pblggPSBNYXRoLm1pbihtaW5YLCB0cmFuc2Zvcm1lZC54KTtcbiAgICAgICAgICAgIG1pblkgPSBNYXRoLm1pbihtaW5ZLCB0cmFuc2Zvcm1lZC55KTtcbiAgICAgICAgICAgIG1heFggPSBNYXRoLm1heChtYXhYLCB0cmFuc2Zvcm1lZC54KTtcbiAgICAgICAgICAgIG1heFkgPSBNYXRoLm1heChtYXhZLCB0cmFuc2Zvcm1lZC55KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBtaW5YLFxuICAgICAgICAgICAgeTogbWluWSxcbiAgICAgICAgICAgIHdpZHRoOiBtYXhYIC0gbWluWCxcbiAgICAgICAgICAgIGhlaWdodDogbWF4WSAtIG1pbllcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9kcmF3Q2FjaGVkU2NlbmVDYW52YXMgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC5fYXBwbHlPcGFjaXR5KHRoaXMpO1xuICAgICAgICBjb250ZXh0Ll9hcHBseUdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbih0aGlzKTtcbiAgICAgICAgdmFyIGNhbnZhc0NhY2hlID0gdGhpcy5fZ2V0Q2FudmFzQ2FjaGUoKTtcbiAgICAgICAgY29udGV4dC50cmFuc2xhdGUoY2FudmFzQ2FjaGUueCwgY2FudmFzQ2FjaGUueSk7XG4gICAgICAgIHZhciBjYWNoZUNhbnZhcyA9IHRoaXMuX2dldENhY2hlZFNjZW5lQ2FudmFzKCk7XG4gICAgICAgIHZhciByYXRpbyA9IGNhY2hlQ2FudmFzLnBpeGVsUmF0aW87XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGNhY2hlQ2FudmFzLl9jYW52YXMsIDAsIDAsIGNhY2hlQ2FudmFzLndpZHRoIC8gcmF0aW8sIGNhY2hlQ2FudmFzLmhlaWdodCAvIHJhdGlvKTtcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZHJhd0NhY2hlZEhpdENhbnZhcyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHZhciBjYW52YXNDYWNoZSA9IHRoaXMuX2dldENhbnZhc0NhY2hlKCksIGhpdENhbnZhcyA9IGNhbnZhc0NhY2hlLmhpdDtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNvbnRleHQuX2FwcGx5R2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKHRoaXMpO1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShjYW52YXNDYWNoZS54LCBjYW52YXNDYWNoZS55KTtcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaGl0Q2FudmFzLl9jYW52YXMsIDAsIDApO1xuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9nZXRDYWNoZWRTY2VuZUNhbnZhcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGZpbHRlcnMgPSB0aGlzLmZpbHRlcnMoKSwgY2FjaGVkQ2FudmFzID0gdGhpcy5fZ2V0Q2FudmFzQ2FjaGUoKSwgc2NlbmVDYW52YXMgPSBjYWNoZWRDYW52YXMuc2NlbmUsIGZpbHRlckNhbnZhcyA9IGNhY2hlZENhbnZhcy5maWx0ZXIsIGZpbHRlckNvbnRleHQgPSBmaWx0ZXJDYW52YXMuZ2V0Q29udGV4dCgpLCBsZW4sIGltYWdlRGF0YSwgbiwgZmlsdGVyO1xuICAgICAgICBpZiAoZmlsdGVycykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9maWx0ZXJVcFRvRGF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciByYXRpbyA9IHNjZW5lQ2FudmFzLnBpeGVsUmF0aW87XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gZmlsdGVycy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlckNvbnRleHQuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyQ29udGV4dC5kcmF3SW1hZ2Uoc2NlbmVDYW52YXMuX2NhbnZhcywgMCwgMCwgc2NlbmVDYW52YXMuZ2V0V2lkdGgoKSAvIHJhdGlvLCBzY2VuZUNhbnZhcy5nZXRIZWlnaHQoKSAvIHJhdGlvKTtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VEYXRhID0gZmlsdGVyQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgZmlsdGVyQ2FudmFzLmdldFdpZHRoKCksIGZpbHRlckNhbnZhcy5nZXRIZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gZmlsdGVyc1tuXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZmlsdGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbF8xLlV0aWwuZXJyb3IoJ0ZpbHRlciBzaG91bGQgYmUgdHlwZSBvZiBmdW5jdGlvbiwgYnV0IGdvdCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGZpbHRlciArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgaW5zdGVkLiBQbGVhc2UgY2hlY2sgY29ycmVjdCBmaWx0ZXJzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuY2FsbCh0aGlzLCBpbWFnZURhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyQ29udGV4dC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBVdGlsXzEuVXRpbC5lcnJvcignVW5hYmxlIHRvIGFwcGx5IGZpbHRlci4gJyArIGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbHRlclVwVG9EYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJDYW52YXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNjZW5lQ2FudmFzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZ0U3RyLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXZlbnRzID0gZXZ0U3RyLnNwbGl0KFNQQUNFKSwgbGVuID0gZXZlbnRzLmxlbmd0aCwgbiwgZXZlbnQsIHBhcnRzLCBiYXNlRXZlbnQsIG5hbWU7XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbbl07XG4gICAgICAgICAgICBwYXJ0cyA9IGV2ZW50LnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBiYXNlRXZlbnQgPSBwYXJ0c1swXTtcbiAgICAgICAgICAgIG5hbWUgPSBwYXJ0c1sxXSB8fCAnJztcbiAgICAgICAgICAgIGlmICghdGhpcy5ldmVudExpc3RlbmVyc1tiYXNlRXZlbnRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyc1tiYXNlRXZlbnRdID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzW2Jhc2VFdmVudF0ucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBoYW5kbGVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldnRTdHIsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBldmVudHMgPSAoZXZ0U3RyIHx8ICcnKS5zcGxpdChTUEFDRSksIGxlbiA9IGV2ZW50cy5sZW5ndGgsIG4sIHQsIGV2ZW50LCBwYXJ0cywgYmFzZUV2ZW50LCBuYW1lO1xuICAgICAgICBpZiAoIWV2dFN0cikge1xuICAgICAgICAgICAgZm9yICh0IGluIHRoaXMuZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vZmYodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICBldmVudCA9IGV2ZW50c1tuXTtcbiAgICAgICAgICAgIHBhcnRzID0gZXZlbnQuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGJhc2VFdmVudCA9IHBhcnRzWzBdO1xuICAgICAgICAgICAgbmFtZSA9IHBhcnRzWzFdO1xuICAgICAgICAgICAgaWYgKGJhc2VFdmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50TGlzdGVuZXJzW2Jhc2VFdmVudF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb2ZmKGJhc2VFdmVudCwgbmFtZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAodCBpbiB0aGlzLmV2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29mZih0LCBuYW1lLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgdmFyIGUgPSB7XG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICB0eXBlOiBldnQudHlwZSxcbiAgICAgICAgICAgIGV2dDogZXZ0XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmlyZShldnQudHlwZSwgZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0eXBlLCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMub24odHlwZSwgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGV2dC5ldnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgdGhpcy5vZmYodHlwZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2RlbGVnYXRlID0gZnVuY3Rpb24gKGV2ZW50LCBzZWxlY3RvciwgaGFuZGxlcikge1xuICAgICAgICB2YXIgc3RvcE5vZGUgPSB0aGlzO1xuICAgICAgICB0aGlzLm9uKGV2ZW50LCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0cyA9IGV2dC50YXJnZXQuZmluZEFuY2VzdG9ycyhzZWxlY3RvciwgdHJ1ZSwgc3RvcE5vZGUpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZXZ0ID0gVXRpbF8xLlV0aWwuY2xvbmVPYmplY3QoZXZ0KTtcbiAgICAgICAgICAgICAgICBldnQuY3VycmVudFRhcmdldCA9IHRhcmdldHNbaV07XG4gICAgICAgICAgICAgICAgaGFuZGxlci5jYWxsKHRhcmdldHNbaV0sIGV2dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoRHJhZ0FuZERyb3BfMS5ERC5ub2RlICYmIERyYWdBbmREcm9wXzEuREQubm9kZSA9PT0gdGhpcykge1xuICAgICAgICAgICAgdGhpcy5zdG9wRHJhZygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlbW92ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShTVEFHRSk7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShBQlNPTFVURV9UUkFOU0ZPUk0pO1xuICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoVklTSUJMRSk7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShMSVNURU5JTkcpO1xuICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoQUJTT0xVVEVfT1BBQ0lUWSk7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xuICAgICAgICBpZiAocGFyZW50ICYmIHBhcmVudC5jaGlsZHJlbikge1xuICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuLnNwbGljZSh0aGlzLmluZGV4LCAxKTtcbiAgICAgICAgICAgIHBhcmVudC5fc2V0Q2hpbGRyZW5JbmRpY2VzKCk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGV4cG9ydHMuX3JlbW92ZUlkKHRoaXMuaWQoKSwgdGhpcyk7XG4gICAgICAgIHZhciBuYW1lcyA9ICh0aGlzLm5hbWUoKSB8fCAnJykuc3BsaXQoL1xccy9nKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHN1Ym5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgICAgIGV4cG9ydHMuX3JlbW92ZU5hbWUoc3VibmFtZSwgdGhpcy5faWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0QXR0ciA9IGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICAgIHZhciBtZXRob2QgPSAnZ2V0JyArIFV0aWxfMS5VdGlsLl9jYXBpdGFsaXplKGF0dHIpO1xuICAgICAgICBpZiAoVXRpbF8xLlV0aWwuX2lzRnVuY3Rpb24odGhpc1ttZXRob2RdKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbbWV0aG9kXSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJzW2F0dHJdO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0QW5jZXN0b3JzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKSwgYW5jZXN0b3JzID0gbmV3IFV0aWxfMS5Db2xsZWN0aW9uKCk7XG4gICAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGFuY2VzdG9ycy5wdXNoKHBhcmVudCk7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQuZ2V0UGFyZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFuY2VzdG9ycztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldEF0dHJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRycyB8fCB7fTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnNldEF0dHJzID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICB2YXIga2V5LCBtZXRob2Q7XG4gICAgICAgIGlmICghY29uZmlnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGtleSBpbiBjb25maWcpIHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IENISUxEUkVOKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZXRob2QgPSBTRVQgKyBVdGlsXzEuVXRpbC5fY2FwaXRhbGl6ZShrZXkpO1xuICAgICAgICAgICAgaWYgKFV0aWxfMS5VdGlsLl9pc0Z1bmN0aW9uKHRoaXNbbWV0aG9kXSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzW21ldGhvZF0oY29uZmlnW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0QXR0cihrZXksIGNvbmZpZ1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmlzTGlzdGVuaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUoTElTVEVOSU5HLCB0aGlzLl9pc0xpc3RlbmluZyk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5faXNMaXN0ZW5pbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsaXN0ZW5pbmcgPSB0aGlzLmxpc3RlbmluZygpLCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xuICAgICAgICBpZiAobGlzdGVuaW5nID09PSAnaW5oZXJpdCcpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50LmlzTGlzdGVuaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZW5pbmc7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKFZJU0lCTEUsIHRoaXMuX2lzVmlzaWJsZSk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5faXNWaXNpYmxlID0gZnVuY3Rpb24gKHJlbGF0aXZlVG8pIHtcbiAgICAgICAgdmFyIHZpc2libGUgPSB0aGlzLnZpc2libGUoKSwgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKTtcbiAgICAgICAgaWYgKHZpc2libGUgPT09ICdpbmhlcml0Jykge1xuICAgICAgICAgICAgaWYgKHBhcmVudCAmJiBwYXJlbnQgIT09IHJlbGF0aXZlVG8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50Ll9pc1Zpc2libGUocmVsYXRpdmVUbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2aXNpYmxlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5zaG91bGREcmF3SGl0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCk7XG4gICAgICAgIHJldHVybiAoKCFsYXllciAmJiB0aGlzLmlzTGlzdGVuaW5nKCkgJiYgdGhpcy5pc1Zpc2libGUoKSkgfHxcbiAgICAgICAgICAgIChsYXllciAmJlxuICAgICAgICAgICAgICAgIGxheWVyLmhpdEdyYXBoRW5hYmxlZCgpICYmXG4gICAgICAgICAgICAgICAgdGhpcy5pc0xpc3RlbmluZygpICYmXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUoKSkpO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlKHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZShmYWxzZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0WkluZGV4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRleCB8fCAwO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0QWJzb2x1dGVaSW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZXB0aCA9IHRoaXMuZ2V0RGVwdGgoKSwgdGhhdCA9IHRoaXMsIGluZGV4ID0gMCwgbm9kZXMsIGxlbiwgbiwgY2hpbGQ7XG4gICAgICAgIGZ1bmN0aW9uIGFkZENoaWxkcmVuKGNoaWxkcmVuKSB7XG4gICAgICAgICAgICBub2RlcyA9IFtdO1xuICAgICAgICAgICAgbGVuID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQgPSBjaGlsZHJlbltuXTtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5ub2RlVHlwZSAhPT0gU0hBUEUpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMgPSBub2Rlcy5jb25jYXQoY2hpbGQuZ2V0Q2hpbGRyZW4oKS50b0FycmF5KCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuX2lkID09PSB0aGF0Ll9pZCkge1xuICAgICAgICAgICAgICAgICAgICBuID0gbGVuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2Rlcy5sZW5ndGggPiAwICYmIG5vZGVzWzBdLmdldERlcHRoKCkgPD0gZGVwdGgpIHtcbiAgICAgICAgICAgICAgICBhZGRDaGlsZHJlbihub2Rlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoYXQubm9kZVR5cGUgIT09IFVQUEVSX1NUQUdFKSB7XG4gICAgICAgICAgICBhZGRDaGlsZHJlbih0aGF0LmdldFN0YWdlKCkuZ2V0Q2hpbGRyZW4oKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0RGVwdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZXB0aCA9IDAsIHBhcmVudCA9IHRoaXMucGFyZW50O1xuICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICBkZXB0aCsrO1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVwdGg7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgdGhpcy54KHBvcy54KTtcbiAgICAgICAgdGhpcy55KHBvcy55KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMueCgpLFxuICAgICAgICAgICAgeTogdGhpcy55KClcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldEFic29sdXRlUG9zaXRpb24gPSBmdW5jdGlvbiAodG9wKSB7XG4gICAgICAgIHZhciBhYnNvbHV0ZU1hdHJpeCA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0odG9wKS5nZXRNYXRyaXgoKSwgYWJzb2x1dGVUcmFuc2Zvcm0gPSBuZXcgVXRpbF8xLlRyYW5zZm9ybSgpLCBvZmZzZXQgPSB0aGlzLm9mZnNldCgpO1xuICAgICAgICBhYnNvbHV0ZVRyYW5zZm9ybS5tID0gYWJzb2x1dGVNYXRyaXguc2xpY2UoKTtcbiAgICAgICAgYWJzb2x1dGVUcmFuc2Zvcm0udHJhbnNsYXRlKG9mZnNldC54LCBvZmZzZXQueSk7XG4gICAgICAgIHJldHVybiBhYnNvbHV0ZVRyYW5zZm9ybS5nZXRUcmFuc2xhdGlvbigpO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuc2V0QWJzb2x1dGVQb3NpdGlvbiA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgdmFyIG9yaWdUcmFucyA9IHRoaXMuX2NsZWFyVHJhbnNmb3JtKCksIGl0O1xuICAgICAgICB0aGlzLmF0dHJzLnggPSBvcmlnVHJhbnMueDtcbiAgICAgICAgdGhpcy5hdHRycy55ID0gb3JpZ1RyYW5zLnk7XG4gICAgICAgIGRlbGV0ZSBvcmlnVHJhbnMueDtcbiAgICAgICAgZGVsZXRlIG9yaWdUcmFucy55O1xuICAgICAgICBpdCA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0oKTtcbiAgICAgICAgaXQuaW52ZXJ0KCk7XG4gICAgICAgIGl0LnRyYW5zbGF0ZShwb3MueCwgcG9zLnkpO1xuICAgICAgICBwb3MgPSB7XG4gICAgICAgICAgICB4OiB0aGlzLmF0dHJzLnggKyBpdC5nZXRUcmFuc2xhdGlvbigpLngsXG4gICAgICAgICAgICB5OiB0aGlzLmF0dHJzLnkgKyBpdC5nZXRUcmFuc2xhdGlvbigpLnlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih7IHg6IHBvcy54LCB5OiBwb3MueSB9KTtcbiAgICAgICAgdGhpcy5fc2V0VHJhbnNmb3JtKG9yaWdUcmFucyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX3NldFRyYW5zZm9ybSA9IGZ1bmN0aW9uICh0cmFucykge1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGtleSBpbiB0cmFucykge1xuICAgICAgICAgICAgdGhpcy5hdHRyc1trZXldID0gdHJhbnNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jbGVhckNhY2hlKFRSQU5TRk9STSk7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShBQlNPTFVURV9UUkFOU0ZPUk0pO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2NsZWFyVHJhbnNmb3JtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHJhbnMgPSB7XG4gICAgICAgICAgICB4OiB0aGlzLngoKSxcbiAgICAgICAgICAgIHk6IHRoaXMueSgpLFxuICAgICAgICAgICAgcm90YXRpb246IHRoaXMucm90YXRpb24oKSxcbiAgICAgICAgICAgIHNjYWxlWDogdGhpcy5zY2FsZVgoKSxcbiAgICAgICAgICAgIHNjYWxlWTogdGhpcy5zY2FsZVkoKSxcbiAgICAgICAgICAgIG9mZnNldFg6IHRoaXMub2Zmc2V0WCgpLFxuICAgICAgICAgICAgb2Zmc2V0WTogdGhpcy5vZmZzZXRZKCksXG4gICAgICAgICAgICBza2V3WDogdGhpcy5za2V3WCgpLFxuICAgICAgICAgICAgc2tld1k6IHRoaXMuc2tld1koKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmF0dHJzLnggPSAwO1xuICAgICAgICB0aGlzLmF0dHJzLnkgPSAwO1xuICAgICAgICB0aGlzLmF0dHJzLnJvdGF0aW9uID0gMDtcbiAgICAgICAgdGhpcy5hdHRycy5zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLmF0dHJzLnNjYWxlWSA9IDE7XG4gICAgICAgIHRoaXMuYXR0cnMub2Zmc2V0WCA9IDA7XG4gICAgICAgIHRoaXMuYXR0cnMub2Zmc2V0WSA9IDA7XG4gICAgICAgIHRoaXMuYXR0cnMuc2tld1ggPSAwO1xuICAgICAgICB0aGlzLmF0dHJzLnNrZXdZID0gMDtcbiAgICAgICAgdGhpcy5fY2xlYXJDYWNoZShUUkFOU0ZPUk0pO1xuICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoQUJTT0xVVEVfVFJBTlNGT1JNKTtcbiAgICAgICAgcmV0dXJuIHRyYW5zO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uIChjaGFuZ2UpIHtcbiAgICAgICAgdmFyIGNoYW5nZVggPSBjaGFuZ2UueCwgY2hhbmdlWSA9IGNoYW5nZS55LCB4ID0gdGhpcy54KCksIHkgPSB0aGlzLnkoKTtcbiAgICAgICAgaWYgKGNoYW5nZVggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgeCArPSBjaGFuZ2VYO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VZICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHkgKz0gY2hhbmdlWTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHsgeDogeCwgeTogeSB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZWFjaEFuY2VzdG9yUmV2ZXJzZSA9IGZ1bmN0aW9uIChmdW5jLCB0b3ApIHtcbiAgICAgICAgdmFyIGZhbWlseSA9IFtdLCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpLCBsZW4sIG47XG4gICAgICAgIGlmICh0b3AgJiYgdG9wLl9pZCA9PT0gdGhpcy5faWQpIHtcbiAgICAgICAgICAgIGZ1bmModGhpcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZmFtaWx5LnVuc2hpZnQodGhpcyk7XG4gICAgICAgIHdoaWxlIChwYXJlbnQgJiYgKCF0b3AgfHwgcGFyZW50Ll9pZCAhPT0gdG9wLl9pZCkpIHtcbiAgICAgICAgICAgIGZhbWlseS51bnNoaWZ0KHBhcmVudCk7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIGxlbiA9IGZhbWlseS5sZW5ndGg7XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgZnVuYyhmYW1pbHlbbl0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5yb3RhdGUgPSBmdW5jdGlvbiAodGhldGEpIHtcbiAgICAgICAgdGhpcy5yb3RhdGlvbih0aGlzLnJvdGF0aW9uKCkgKyB0aGV0YSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUubW92ZVRvVG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdOb2RlIGhhcyBubyBwYXJlbnQuIG1vdmVUb1RvcCBmdW5jdGlvbiBpcyBpZ25vcmVkLicpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnB1c2godGhpcyk7XG4gICAgICAgIHRoaXMucGFyZW50Ll9zZXRDaGlsZHJlbkluZGljZXMoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5tb3ZlVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ05vZGUgaGFzIG5vIHBhcmVudC4gbW92ZVVwIGZ1bmN0aW9uIGlzIGlnbm9yZWQuJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5pbmRleCwgbGVuID0gdGhpcy5wYXJlbnQuZ2V0Q2hpbGRyZW4oKS5sZW5ndGg7XG4gICAgICAgIGlmIChpbmRleCA8IGxlbiAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXggKyAxLCAwLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50Ll9zZXRDaGlsZHJlbkluZGljZXMoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLm1vdmVEb3duID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdOb2RlIGhhcyBubyBwYXJlbnQuIG1vdmVEb3duIGZ1bmN0aW9uIGlzIGlnbm9yZWQuJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5pbmRleDtcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCAtIDEsIDAsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuX3NldENoaWxkcmVuSW5kaWNlcygpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUubW92ZVRvQm90dG9tID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdOb2RlIGhhcyBubyBwYXJlbnQuIG1vdmVUb0JvdHRvbSBmdW5jdGlvbiBpcyBpZ25vcmVkLicpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi51bnNoaWZ0KHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuX3NldENoaWxkcmVuSW5kaWNlcygpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuc2V0WkluZGV4ID0gZnVuY3Rpb24gKHpJbmRleCkge1xuICAgICAgICBpZiAoIXRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdOb2RlIGhhcyBubyBwYXJlbnQuIHpJbmRleCBwYXJhbWV0ZXIgaXMgaWdub3JlZC4nKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh6SW5kZXggPCAwIHx8IHpJbmRleCA+PSB0aGlzLnBhcmVudC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ1VuZXhwZWN0ZWQgdmFsdWUgJyArXG4gICAgICAgICAgICAgICAgekluZGV4ICtcbiAgICAgICAgICAgICAgICAnIGZvciB6SW5kZXggcHJvcGVydHkuIHpJbmRleCBpcyBqdXN0IGluZGV4IG9mIGEgbm9kZSBpbiBjaGlsZHJlbiBvZiBpdHMgcGFyZW50LiBFeHBlY3RlZCB2YWx1ZSBpcyBmcm9tIDAgdG8gJyArXG4gICAgICAgICAgICAgICAgKHRoaXMucGFyZW50LmNoaWxkcmVuLmxlbmd0aCAtIDEpICtcbiAgICAgICAgICAgICAgICAnLicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZSh6SW5kZXgsIDAsIHRoaXMpO1xuICAgICAgICB0aGlzLnBhcmVudC5fc2V0Q2hpbGRyZW5JbmRpY2VzKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0QWJzb2x1dGVPcGFjaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUoQUJTT0xVVEVfT1BBQ0lUWSwgdGhpcy5fZ2V0QWJzb2x1dGVPcGFjaXR5KTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9nZXRBYnNvbHV0ZU9wYWNpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhYnNPcGFjaXR5ID0gdGhpcy5vcGFjaXR5KCk7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xuICAgICAgICBpZiAocGFyZW50ICYmICFwYXJlbnQuX2lzVW5kZXJDYWNoZSkge1xuICAgICAgICAgICAgYWJzT3BhY2l0eSAqPSB0aGlzLmdldFBhcmVudCgpLmdldEFic29sdXRlT3BhY2l0eSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhYnNPcGFjaXR5O1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUubW92ZVRvID0gZnVuY3Rpb24gKG5ld0NvbnRhaW5lcikge1xuICAgICAgICBpZiAodGhpcy5nZXRQYXJlbnQoKSAhPT0gbmV3Q29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmUoKTtcbiAgICAgICAgICAgIG5ld0NvbnRhaW5lci5hZGQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS50b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9iaiA9IHt9LCBhdHRycyA9IHRoaXMuZ2V0QXR0cnMoKSwga2V5LCB2YWwsIGdldHRlciwgZGVmYXVsdFZhbHVlLCBub25QbGFpbk9iamVjdDtcbiAgICAgICAgb2JqLmF0dHJzID0ge307XG4gICAgICAgIGZvciAoa2V5IGluIGF0dHJzKSB7XG4gICAgICAgICAgICB2YWwgPSBhdHRyc1trZXldO1xuICAgICAgICAgICAgbm9uUGxhaW5PYmplY3QgPVxuICAgICAgICAgICAgICAgIFV0aWxfMS5VdGlsLmlzT2JqZWN0KHZhbCkgJiYgIVV0aWxfMS5VdGlsLl9pc1BsYWluT2JqZWN0KHZhbCkgJiYgIVV0aWxfMS5VdGlsLl9pc0FycmF5KHZhbCk7XG4gICAgICAgICAgICBpZiAobm9uUGxhaW5PYmplY3QpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdldHRlciA9IHR5cGVvZiB0aGlzW2tleV0gPT09ICdmdW5jdGlvbicgJiYgdGhpc1trZXldO1xuICAgICAgICAgICAgZGVsZXRlIGF0dHJzW2tleV07XG4gICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSBnZXR0ZXIgPyBnZXR0ZXIuY2FsbCh0aGlzKSA6IG51bGw7XG4gICAgICAgICAgICBhdHRyc1trZXldID0gdmFsO1xuICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSAhPT0gdmFsKSB7XG4gICAgICAgICAgICAgICAgb2JqLmF0dHJzW2tleV0gPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb2JqLmNsYXNzTmFtZSA9IHRoaXMuZ2V0Q2xhc3NOYW1lKCk7XG4gICAgICAgIHJldHVybiBVdGlsXzEuVXRpbC5fcHJlcGFyZVRvU3RyaW5naWZ5KG9iaik7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnRvT2JqZWN0KCkpO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0UGFyZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5maW5kQW5jZXN0b3JzID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBpbmNsdWRlU2VsZiwgc3RvcE5vZGUpIHtcbiAgICAgICAgdmFyIHJlcyA9IFtdO1xuICAgICAgICBpZiAoaW5jbHVkZVNlbGYgJiYgdGhpcy5faXNNYXRjaChzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhbmNlc3RvciA9IHRoaXMucGFyZW50O1xuICAgICAgICB3aGlsZSAoYW5jZXN0b3IpIHtcbiAgICAgICAgICAgIGlmIChhbmNlc3RvciA9PT0gc3RvcE5vZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFuY2VzdG9yLl9pc01hdGNoKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgIHJlcy5wdXNoKGFuY2VzdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFuY2VzdG9yID0gYW5jZXN0b3IucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5pc0FuY2VzdG9yT2YgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5maW5kQW5jZXN0b3IgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGluY2x1ZGVTZWxmLCBzdG9wTm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kQW5jZXN0b3JzKHNlbGVjdG9yLCBpbmNsdWRlU2VsZiwgc3RvcE5vZGUpWzBdO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2lzTWF0Y2ggPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3Rvcih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2VsZWN0b3JBcnIgPSBzZWxlY3Rvci5yZXBsYWNlKC8gL2csICcnKS5zcGxpdCgnLCcpLCBsZW4gPSBzZWxlY3RvckFyci5sZW5ndGgsIG4sIHNlbDtcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICBzZWwgPSBzZWxlY3RvckFycltuXTtcbiAgICAgICAgICAgIGlmICghVXRpbF8xLlV0aWwuaXNWYWxpZFNlbGVjdG9yKHNlbCkpIHtcbiAgICAgICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdTZWxlY3RvciBcIicgK1xuICAgICAgICAgICAgICAgICAgICBzZWwgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgaXMgaW52YWxpZC4gQWxsb3dlZCBzZWxlY3RvcnMgZXhhbXBsZXMgYXJlIFwiI2Zvb1wiLCBcIi5iYXJcIiBvciBcIkdyb3VwXCIuJyk7XG4gICAgICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybignSWYgeW91IGhhdmUgYSBjdXN0b20gc2hhcGUgd2l0aCBzdWNoIGNsYXNzTmFtZSwgcGxlYXNlIGNoYW5nZSBpdCB0byBzdGFydCB3aXRoIHVwcGVyIGxldHRlciBsaWtlIFwiVHJpYW5nbGVcIi4nKTtcbiAgICAgICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdLb252YSBpcyBhd2Vzb21lLCByaWdodD8nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWwuY2hhckF0KDApID09PSAnIycpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pZCgpID09PSBzZWwuc2xpY2UoMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2VsLmNoYXJBdCgwKSA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzTmFtZShzZWwuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY2xhc3NOYW1lID09PSBzZWxlY3RvciB8fCB0aGlzLm5vZGVUeXBlID09PSBzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldExheWVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKTtcbiAgICAgICAgcmV0dXJuIHBhcmVudCA/IHBhcmVudC5nZXRMYXllcigpIDogbnVsbDtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldFN0YWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUoU1RBR0UsIHRoaXMuX2dldFN0YWdlKTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9nZXRTdGFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQuZ2V0U3RhZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbiAoZXZlbnRUeXBlLCBldnQsIGJ1YmJsZSkge1xuICAgICAgICBldnQgPSBldnQgfHwge307XG4gICAgICAgIGV2dC50YXJnZXQgPSBldnQudGFyZ2V0IHx8IHRoaXM7XG4gICAgICAgIGlmIChidWJibGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmVBbmRCdWJibGUoZXZlbnRUeXBlLCBldnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZmlyZShldmVudFR5cGUsIGV2dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRBYnNvbHV0ZVRyYW5zZm9ybSA9IGZ1bmN0aW9uICh0b3ApIHtcbiAgICAgICAgaWYgKHRvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFic29sdXRlVHJhbnNmb3JtKHRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUoQUJTT0xVVEVfVFJBTlNGT1JNLCB0aGlzLl9nZXRBYnNvbHV0ZVRyYW5zZm9ybSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9nZXRBYnNvbHV0ZVRyYW5zZm9ybSA9IGZ1bmN0aW9uICh0b3ApIHtcbiAgICAgICAgdmFyIGF0ID0gbmV3IFV0aWxfMS5UcmFuc2Zvcm0oKTtcbiAgICAgICAgdGhpcy5fZWFjaEFuY2VzdG9yUmV2ZXJzZShmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybXNFbmFibGVkID0gbm9kZS5nZXRUcmFuc2Zvcm1zRW5hYmxlZCgpO1xuICAgICAgICAgICAgaWYgKHRyYW5zZm9ybXNFbmFibGVkID09PSAnYWxsJykge1xuICAgICAgICAgICAgICAgIGF0Lm11bHRpcGx5KG5vZGUuZ2V0VHJhbnNmb3JtKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHJhbnNmb3Jtc0VuYWJsZWQgPT09ICdwb3NpdGlvbicpIHtcbiAgICAgICAgICAgICAgICBhdC50cmFuc2xhdGUobm9kZS5nZXRYKCkgLSBub2RlLmdldE9mZnNldFgoKSwgbm9kZS5nZXRZKCkgLSBub2RlLmdldE9mZnNldFkoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRvcCk7XG4gICAgICAgIHJldHVybiBhdDtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldEFic29sdXRlU2NhbGUgPSBmdW5jdGlvbiAodG9wKSB7XG4gICAgICAgIGlmICh0b3ApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRBYnNvbHV0ZVNjYWxlKHRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUoQUJTT0xVVEVfU0NBTEUsIHRoaXMuX2dldEFic29sdXRlU2NhbGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZ2V0QWJzb2x1dGVTY2FsZSA9IGZ1bmN0aW9uICh0b3ApIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXM7XG4gICAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQuX2lzVW5kZXJDYWNoZSkge1xuICAgICAgICAgICAgICAgIHRvcCA9IHBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5nZXRQYXJlbnQoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2NhbGVYID0gMSwgc2NhbGVZID0gMTtcbiAgICAgICAgdGhpcy5fZWFjaEFuY2VzdG9yUmV2ZXJzZShmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgc2NhbGVYICo9IG5vZGUuc2NhbGVYKCk7XG4gICAgICAgICAgICBzY2FsZVkgKj0gbm9kZS5zY2FsZVkoKTtcbiAgICAgICAgfSwgdG9wKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHNjYWxlWCxcbiAgICAgICAgICAgIHk6IHNjYWxlWVxuICAgICAgICB9O1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUoVFJBTlNGT1JNLCB0aGlzLl9nZXRUcmFuc2Zvcm0pO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2dldFRyYW5zZm9ybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG0gPSBuZXcgVXRpbF8xLlRyYW5zZm9ybSgpLCB4ID0gdGhpcy54KCksIHkgPSB0aGlzLnkoKSwgcm90YXRpb24gPSBHbG9iYWxfMS5Lb252YS5nZXRBbmdsZSh0aGlzLnJvdGF0aW9uKCkpLCBzY2FsZVggPSB0aGlzLnNjYWxlWCgpLCBzY2FsZVkgPSB0aGlzLnNjYWxlWSgpLCBza2V3WCA9IHRoaXMuc2tld1goKSwgc2tld1kgPSB0aGlzLnNrZXdZKCksIG9mZnNldFggPSB0aGlzLm9mZnNldFgoKSwgb2Zmc2V0WSA9IHRoaXMub2Zmc2V0WSgpO1xuICAgICAgICBpZiAoeCAhPT0gMCB8fCB5ICE9PSAwKSB7XG4gICAgICAgICAgICBtLnRyYW5zbGF0ZSh4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocm90YXRpb24gIT09IDApIHtcbiAgICAgICAgICAgIG0ucm90YXRlKHJvdGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2tld1ggIT09IDAgfHwgc2tld1kgIT09IDApIHtcbiAgICAgICAgICAgIG0uc2tldyhza2V3WCwgc2tld1kpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY2FsZVggIT09IDEgfHwgc2NhbGVZICE9PSAxKSB7XG4gICAgICAgICAgICBtLnNjYWxlKHNjYWxlWCwgc2NhbGVZKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2Zmc2V0WCAhPT0gMCB8fCBvZmZzZXRZICE9PSAwKSB7XG4gICAgICAgICAgICBtLnRyYW5zbGF0ZSgtMSAqIG9mZnNldFgsIC0xICogb2Zmc2V0WSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG07XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgdmFyIGF0dHJzID0gVXRpbF8xLlV0aWwuY2xvbmVPYmplY3QodGhpcy5hdHRycyksIGtleSwgYWxsTGlzdGVuZXJzLCBsZW4sIG4sIGxpc3RlbmVyO1xuICAgICAgICBmb3IgKHZhciBpIGluIENMT05FX0JMQUNLX0xJU1QpIHtcbiAgICAgICAgICAgIHZhciBibG9ja0F0dHIgPSBDTE9ORV9CTEFDS19MSVNUW2ldO1xuICAgICAgICAgICAgZGVsZXRlIGF0dHJzW2Jsb2NrQXR0cl07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBhdHRyc1trZXldID0gb2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vZGUgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihhdHRycyk7XG4gICAgICAgIGZvciAoa2V5IGluIHRoaXMuZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGFsbExpc3RlbmVycyA9IHRoaXMuZXZlbnRMaXN0ZW5lcnNba2V5XTtcbiAgICAgICAgICAgIGxlbiA9IGFsbExpc3RlbmVycy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGFsbExpc3RlbmVyc1tuXTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIubmFtZS5pbmRleE9mKEtPTlZBKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFub2RlLmV2ZW50TGlzdGVuZXJzW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZXZlbnRMaXN0ZW5lcnNba2V5XSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZXZlbnRMaXN0ZW5lcnNba2V5XS5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fdG9Lb252YUNhbnZhcyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgICB2YXIgYm94ID0gdGhpcy5nZXRDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBzdGFnZSA9IHRoaXMuZ2V0U3RhZ2UoKSwgeCA9IGNvbmZpZy54ICE9PSB1bmRlZmluZWQgPyBjb25maWcueCA6IGJveC54LCB5ID0gY29uZmlnLnkgIT09IHVuZGVmaW5lZCA/IGNvbmZpZy55IDogYm94LnksIHBpeGVsUmF0aW8gPSBjb25maWcucGl4ZWxSYXRpbyB8fCAxLCBjYW52YXMgPSBuZXcgQ2FudmFzXzEuU2NlbmVDYW52YXMoe1xuICAgICAgICAgICAgd2lkdGg6IGNvbmZpZy53aWR0aCB8fCBib3gud2lkdGggfHwgKHN0YWdlID8gc3RhZ2UuZ2V0V2lkdGgoKSA6IDApLFxuICAgICAgICAgICAgaGVpZ2h0OiBjb25maWcuaGVpZ2h0IHx8IGJveC5oZWlnaHQgfHwgKHN0YWdlID8gc3RhZ2UuZ2V0SGVpZ2h0KCkgOiAwKSxcbiAgICAgICAgICAgIHBpeGVsUmF0aW86IHBpeGVsUmF0aW9cbiAgICAgICAgfSksIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgpO1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgaWYgKHggfHwgeSkge1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2xhdGUoLTEgKiB4LCAtMSAqIHkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd1NjZW5lKGNhbnZhcyk7XG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICByZXR1cm4gY2FudmFzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUudG9DYW52YXMgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90b0tvbnZhQ2FudmFzKGNvbmZpZykuX2NhbnZhcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnRvRGF0YVVSTCA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgICB2YXIgbWltZVR5cGUgPSBjb25maWcubWltZVR5cGUgfHwgbnVsbCwgcXVhbGl0eSA9IGNvbmZpZy5xdWFsaXR5IHx8IG51bGw7XG4gICAgICAgIHZhciB1cmwgPSB0aGlzLl90b0tvbnZhQ2FudmFzKGNvbmZpZykudG9EYXRhVVJMKG1pbWVUeXBlLCBxdWFsaXR5KTtcbiAgICAgICAgaWYgKGNvbmZpZy5jYWxsYmFjaykge1xuICAgICAgICAgICAgY29uZmlnLmNhbGxiYWNrKHVybCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnRvSW1hZ2UgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIGlmICghY29uZmlnIHx8ICFjb25maWcuY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRocm93ICdjYWxsYmFjayByZXF1aXJlZCBmb3IgdG9JbWFnZSBtZXRob2QgY29uZmlnIGFyZ3VtZW50JztcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBjb25maWcuY2FsbGJhY2s7XG4gICAgICAgIGRlbGV0ZSBjb25maWcuY2FsbGJhY2s7XG4gICAgICAgIFV0aWxfMS5VdGlsLl91cmxUb0ltYWdlKHRoaXMudG9EYXRhVVJMKGNvbmZpZyksIGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGltZyk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gICAgICAgIHRoaXMud2lkdGgoc2l6ZS53aWR0aCk7XG4gICAgICAgIHRoaXMuaGVpZ2h0KHNpemUuaGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgoKSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQoKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0Q2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGFzc05hbWUgfHwgdGhpcy5ub2RlVHlwZTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldFR5cGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVUeXBlO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0RHJhZ0Rpc3RhbmNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5hdHRycy5kcmFnRGlzdGFuY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXR0cnMuZHJhZ0Rpc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZ2V0RHJhZ0Rpc3RhbmNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gR2xvYmFsXzEuS29udmEuZHJhZ0Rpc3RhbmNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fb2ZmID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBldnRMaXN0ZW5lcnMgPSB0aGlzLmV2ZW50TGlzdGVuZXJzW3R5cGVdLCBpLCBldnROYW1lLCBoYW5kbGVyO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZXZ0TGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBldnROYW1lID0gZXZ0TGlzdGVuZXJzW2ldLm5hbWU7XG4gICAgICAgICAgICBoYW5kbGVyID0gZXZ0TGlzdGVuZXJzW2ldLmhhbmRsZXI7XG4gICAgICAgICAgICBpZiAoKGV2dE5hbWUgIT09ICdrb252YScgfHwgbmFtZSA9PT0gJ2tvbnZhJykgJiZcbiAgICAgICAgICAgICAgICAoIW5hbWUgfHwgZXZ0TmFtZSA9PT0gbmFtZSkgJiZcbiAgICAgICAgICAgICAgICAoIWNhbGxiYWNrIHx8IGNhbGxiYWNrID09PSBoYW5kbGVyKSkge1xuICAgICAgICAgICAgICAgIGV2dExpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgaWYgKGV2dExpc3RlbmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZXZlbnRMaXN0ZW5lcnNbdHlwZV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9maXJlQ2hhbmdlRXZlbnQgPSBmdW5jdGlvbiAoYXR0ciwgb2xkVmFsLCBuZXdWYWwpIHtcbiAgICAgICAgdGhpcy5fZmlyZShhdHRyICsgQ0hBTkdFLCB7XG4gICAgICAgICAgICBvbGRWYWw6IG9sZFZhbCxcbiAgICAgICAgICAgIG5ld1ZhbDogbmV3VmFsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuc2V0SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgdmFyIG9sZElkID0gdGhpcy5pZCgpO1xuICAgICAgICBleHBvcnRzLl9yZW1vdmVJZChvbGRJZCwgdGhpcyk7XG4gICAgICAgIF9hZGRJZCh0aGlzLCBpZCk7XG4gICAgICAgIHRoaXMuX3NldEF0dHIoJ2lkJywgaWQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnNldE5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB2YXIgb2xkTmFtZXMgPSAodGhpcy5uYW1lKCkgfHwgJycpLnNwbGl0KC9cXHMvZyk7XG4gICAgICAgIHZhciBuZXdOYW1lcyA9IChuYW1lIHx8ICcnKS5zcGxpdCgvXFxzL2cpO1xuICAgICAgICB2YXIgc3VibmFtZSwgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG9sZE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzdWJuYW1lID0gb2xkTmFtZXNbaV07XG4gICAgICAgICAgICBpZiAobmV3TmFtZXMuaW5kZXhPZihzdWJuYW1lKSA9PT0gLTEgJiYgc3VibmFtZSkge1xuICAgICAgICAgICAgICAgIGV4cG9ydHMuX3JlbW92ZU5hbWUoc3VibmFtZSwgdGhpcy5faWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuZXdOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc3VibmFtZSA9IG5ld05hbWVzW2ldO1xuICAgICAgICAgICAgaWYgKG9sZE5hbWVzLmluZGV4T2Yoc3VibmFtZSkgPT09IC0xICYmIHN1Ym5hbWUpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRzLl9hZGROYW1lKHRoaXMsIHN1Ym5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NldEF0dHIoTkFNRSwgbmFtZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuYWRkTmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNOYW1lKG5hbWUpKSB7XG4gICAgICAgICAgICB2YXIgb2xkTmFtZSA9IHRoaXMubmFtZSgpO1xuICAgICAgICAgICAgdmFyIG5ld05hbWUgPSBvbGROYW1lID8gb2xkTmFtZSArICcgJyArIG5hbWUgOiBuYW1lO1xuICAgICAgICAgICAgdGhpcy5zZXROYW1lKG5ld05hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuaGFzTmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGlmICghbmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmdWxsTmFtZSA9IHRoaXMubmFtZSgpO1xuICAgICAgICBpZiAoIWZ1bGxOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5hbWVzID0gKGZ1bGxOYW1lIHx8ICcnKS5zcGxpdCgvXFxzL2cpO1xuICAgICAgICByZXR1cm4gbmFtZXMuaW5kZXhPZihuYW1lKSAhPT0gLTE7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5yZW1vdmVOYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdmFyIG5hbWVzID0gKHRoaXMubmFtZSgpIHx8ICcnKS5zcGxpdCgvXFxzL2cpO1xuICAgICAgICB2YXIgaW5kZXggPSBuYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBuYW1lcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5zZXROYW1lKG5hbWVzLmpvaW4oJyAnKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5zZXRBdHRyID0gZnVuY3Rpb24gKGF0dHIsIHZhbCkge1xuICAgICAgICB2YXIgZnVuYyA9IHRoaXNbU0VUICsgVXRpbF8xLlV0aWwuX2NhcGl0YWxpemUoYXR0cildO1xuICAgICAgICBpZiAoVXRpbF8xLlV0aWwuX2lzRnVuY3Rpb24oZnVuYykpIHtcbiAgICAgICAgICAgIGZ1bmMuY2FsbCh0aGlzLCB2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2V0QXR0cihhdHRyLCB2YWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX3NldEF0dHIgPSBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgICAgICAgdmFyIG9sZFZhbCA9IHRoaXMuYXR0cnNba2V5XTtcbiAgICAgICAgaWYgKG9sZFZhbCA9PT0gdmFsICYmICFVdGlsXzEuVXRpbC5pc09iamVjdCh2YWwpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuYXR0cnNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXR0cnNba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9maXJlQ2hhbmdlRXZlbnQoa2V5LCBvbGRWYWwsIHZhbCk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fc2V0Q29tcG9uZW50QXR0ciA9IGZ1bmN0aW9uIChrZXksIGNvbXBvbmVudCwgdmFsKSB7XG4gICAgICAgIHZhciBvbGRWYWw7XG4gICAgICAgIGlmICh2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb2xkVmFsID0gdGhpcy5hdHRyc1trZXldO1xuICAgICAgICAgICAgaWYgKCFvbGRWYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJzW2tleV0gPSB0aGlzLmdldEF0dHIoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYXR0cnNba2V5XVtjb21wb25lbnRdID0gdmFsO1xuICAgICAgICAgICAgdGhpcy5fZmlyZUNoYW5nZUV2ZW50KGtleSwgb2xkVmFsLCB2YWwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZmlyZUFuZEJ1YmJsZSA9IGZ1bmN0aW9uIChldmVudFR5cGUsIGV2dCwgY29tcGFyZVNoYXBlKSB7XG4gICAgICAgIGlmIChldnQgJiYgdGhpcy5ub2RlVHlwZSA9PT0gU0hBUEUpIHtcbiAgICAgICAgICAgIGV2dC50YXJnZXQgPSB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzaG91bGRTdG9wID0gKGV2ZW50VHlwZSA9PT0gTU9VU0VFTlRFUiB8fCBldmVudFR5cGUgPT09IE1PVVNFTEVBVkUpICYmXG4gICAgICAgICAgICAoKGNvbXBhcmVTaGFwZSAmJlxuICAgICAgICAgICAgICAgICh0aGlzID09PSBjb21wYXJlU2hhcGUgfHxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuaXNBbmNlc3Rvck9mICYmIHRoaXMuaXNBbmNlc3Rvck9mKGNvbXBhcmVTaGFwZSkpKSkgfHxcbiAgICAgICAgICAgICAgICAodGhpcy5ub2RlVHlwZSA9PT0gJ1N0YWdlJyAmJiAhY29tcGFyZVNoYXBlKSk7XG4gICAgICAgIGlmICghc2hvdWxkU3RvcCkge1xuICAgICAgICAgICAgdGhpcy5fZmlyZShldmVudFR5cGUsIGV2dCk7XG4gICAgICAgICAgICB2YXIgc3RvcEJ1YmJsZSA9IChldmVudFR5cGUgPT09IE1PVVNFRU5URVIgfHwgZXZlbnRUeXBlID09PSBNT1VTRUxFQVZFKSAmJlxuICAgICAgICAgICAgICAgIChjb21wYXJlU2hhcGUgJiZcbiAgICAgICAgICAgICAgICAgICAgY29tcGFyZVNoYXBlLmlzQW5jZXN0b3JPZiAmJlxuICAgICAgICAgICAgICAgICAgICBjb21wYXJlU2hhcGUuaXNBbmNlc3Rvck9mKHRoaXMpICYmXG4gICAgICAgICAgICAgICAgICAgICFjb21wYXJlU2hhcGUuaXNBbmNlc3Rvck9mKHRoaXMucGFyZW50KSk7XG4gICAgICAgICAgICBpZiAoKChldnQgJiYgIWV2dC5jYW5jZWxCdWJibGUpIHx8ICFldnQpICYmXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5pc0xpc3RlbmluZygpICYmXG4gICAgICAgICAgICAgICAgIXN0b3BCdWJibGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGFyZVNoYXBlICYmIGNvbXBhcmVTaGFwZS5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlyZUFuZEJ1YmJsZS5jYWxsKHRoaXMucGFyZW50LCBldmVudFR5cGUsIGV2dCwgY29tcGFyZVNoYXBlLnBhcmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXJlQW5kQnViYmxlLmNhbGwodGhpcy5wYXJlbnQsIGV2ZW50VHlwZSwgZXZ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9maXJlID0gZnVuY3Rpb24gKGV2ZW50VHlwZSwgZXZ0KSB7XG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLmV2ZW50TGlzdGVuZXJzW2V2ZW50VHlwZV0sIGk7XG4gICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgIGV2dCA9IGV2dCB8fCB7fTtcbiAgICAgICAgICAgIGV2dC5jdXJyZW50VGFyZ2V0ID0gdGhpcztcbiAgICAgICAgICAgIGV2dC50eXBlID0gZXZlbnRUeXBlO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGV2ZW50c1tpXS5oYW5kbGVyLmNhbGwodGhpcywgZXZ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kcmF3U2NlbmUoKTtcbiAgICAgICAgdGhpcy5kcmF3SGl0KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuc3RhcnREcmFnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCksIGxheWVyID0gdGhpcy5nZXRMYXllcigpLCBwb3MgPSBzdGFnZS5nZXRQb2ludGVyUG9zaXRpb24oKSwgYXAgPSB0aGlzLmdldEFic29sdXRlUG9zaXRpb24oKTtcbiAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgaWYgKERyYWdBbmREcm9wXzEuREQubm9kZSkge1xuICAgICAgICAgICAgICAgIERyYWdBbmREcm9wXzEuREQubm9kZS5zdG9wRHJhZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgRHJhZ0FuZERyb3BfMS5ERC5ub2RlID0gdGhpcztcbiAgICAgICAgICAgIERyYWdBbmREcm9wXzEuREQuc3RhcnRQb2ludGVyUG9zID0gcG9zO1xuICAgICAgICAgICAgRHJhZ0FuZERyb3BfMS5ERC5vZmZzZXQueCA9IHBvcy54IC0gYXAueDtcbiAgICAgICAgICAgIERyYWdBbmREcm9wXzEuREQub2Zmc2V0LnkgPSBwb3MueSAtIGFwLnk7XG4gICAgICAgICAgICBEcmFnQW5kRHJvcF8xLkRELmFuaW0uc2V0TGF5ZXJzKGxheWVyIHx8IHRoaXNbJ2dldExheWVycyddKCkpO1xuICAgICAgICAgICAgRHJhZ0FuZERyb3BfMS5ERC5hbmltLnN0YXJ0KCk7XG4gICAgICAgICAgICB0aGlzLl9zZXREcmFnUG9zaXRpb24oKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX3NldERyYWdQb3NpdGlvbiA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMuZ2V0U3RhZ2UoKS5nZXRQb2ludGVyUG9zaXRpb24oKSwgZGJmID0gdGhpcy5kcmFnQm91bmRGdW5jKCk7XG4gICAgICAgIGlmICghcG9zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld05vZGVQb3MgPSB7XG4gICAgICAgICAgICB4OiBwb3MueCAtIERyYWdBbmREcm9wXzEuREQub2Zmc2V0LngsXG4gICAgICAgICAgICB5OiBwb3MueSAtIERyYWdBbmREcm9wXzEuREQub2Zmc2V0LnlcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGRiZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBuZXdOb2RlUG9zID0gZGJmLmNhbGwodGhpcywgbmV3Tm9kZVBvcywgZXZ0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEFic29sdXRlUG9zaXRpb24obmV3Tm9kZVBvcyk7XG4gICAgICAgIGlmICghdGhpcy5fbGFzdFBvcyB8fFxuICAgICAgICAgICAgdGhpcy5fbGFzdFBvcy54ICE9PSBuZXdOb2RlUG9zLnggfHxcbiAgICAgICAgICAgIHRoaXMuX2xhc3RQb3MueSAhPT0gbmV3Tm9kZVBvcy55KSB7XG4gICAgICAgICAgICBEcmFnQW5kRHJvcF8xLkRELmFuaW1bJ2RpcnR5J10gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xhc3RQb3MgPSBuZXdOb2RlUG9zO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuc3RvcERyYWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBldnQgPSB7fTtcbiAgICAgICAgRHJhZ0FuZERyb3BfMS5ERC5fZW5kRHJhZ0JlZm9yZShldnQpO1xuICAgICAgICBEcmFnQW5kRHJvcF8xLkRELl9lbmREcmFnQWZ0ZXIoZXZ0KTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnNldERyYWdnYWJsZSA9IGZ1bmN0aW9uIChkcmFnZ2FibGUpIHtcbiAgICAgICAgdGhpcy5fc2V0QXR0cignZHJhZ2dhYmxlJywgZHJhZ2dhYmxlKTtcbiAgICAgICAgdGhpcy5fZHJhZ0NoYW5nZSgpO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuaXNEcmFnZ2luZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICEhKERyYWdBbmREcm9wXzEuREQubm9kZSAmJiBEcmFnQW5kRHJvcF8xLkRELm5vZGUgPT09IHRoaXMgJiYgRHJhZ0FuZERyb3BfMS5ERC5pc0RyYWdnaW5nKTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9saXN0ZW5EcmFnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9kcmFnQ2xlYW51cCgpO1xuICAgICAgICB0aGlzLm9uKCdtb3VzZWRvd24ua29udmEgdG91Y2hzdGFydC5rb252YScsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgIHZhciBzaG91bGRDaGVja0J1dHRvbiA9IGV2dC5ldnQuYnV0dG9uICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YXIgY2FuRHJhZyA9ICFzaG91bGRDaGVja0J1dHRvbiB8fCBHbG9iYWxfMS5Lb252YS5kcmFnQnV0dG9ucy5pbmRleE9mKGV2dC5ldnQuYnV0dG9uKSA+PSAwO1xuICAgICAgICAgICAgaWYgKCFjYW5EcmFnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFEcmFnQW5kRHJvcF8xLkRELm5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9kcmFnQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5hdHRycy5kcmFnZ2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbkRyYWcoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdDbGVhbnVwKCk7XG4gICAgICAgICAgICB2YXIgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCk7XG4gICAgICAgICAgICB2YXIgZGQgPSBEcmFnQW5kRHJvcF8xLkREO1xuICAgICAgICAgICAgaWYgKHN0YWdlICYmIGRkLm5vZGUgJiYgZGQubm9kZS5faWQgPT09IHRoaXMuX2lkKSB7XG4gICAgICAgICAgICAgICAgZGQubm9kZS5zdG9wRHJhZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZHJhZ0NsZWFudXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMub2ZmKCdtb3VzZWRvd24ua29udmEnKTtcbiAgICAgICAgdGhpcy5vZmYoJ3RvdWNoc3RhcnQua29udmEnKTtcbiAgICB9O1xuICAgIE5vZGUuY3JlYXRlID0gZnVuY3Rpb24gKGRhdGEsIGNvbnRhaW5lcikge1xuICAgICAgICBpZiAoVXRpbF8xLlV0aWwuX2lzU3RyaW5nKGRhdGEpKSB7XG4gICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlTm9kZShkYXRhLCBjb250YWluZXIpO1xuICAgIH07XG4gICAgTm9kZS5fY3JlYXRlTm9kZSA9IGZ1bmN0aW9uIChvYmosIGNvbnRhaW5lcikge1xuICAgICAgICB2YXIgY2xhc3NOYW1lID0gTm9kZS5wcm90b3R5cGUuZ2V0Q2xhc3NOYW1lLmNhbGwob2JqKSwgY2hpbGRyZW4gPSBvYmouY2hpbGRyZW4sIG5vLCBsZW4sIG47XG4gICAgICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgICAgIG9iai5hdHRycy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFHbG9iYWxfMS5fTk9ERVNfUkVHSVNUUllbY2xhc3NOYW1lXSkge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybignQ2FuIG5vdCBmaW5kIGEgbm9kZSB3aXRoIGNsYXNzIG5hbWUgXCInICtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgK1xuICAgICAgICAgICAgICAgICdcIi4gRmFsbGJhY2sgdG8gXCJTaGFwZVwiLicpO1xuICAgICAgICAgICAgY2xhc3NOYW1lID0gJ1NoYXBlJztcbiAgICAgICAgfVxuICAgICAgICB2YXIgQ2xhc3MgPSBHbG9iYWxfMS5fTk9ERVNfUkVHSVNUUllbY2xhc3NOYW1lXTtcbiAgICAgICAgbm8gPSBuZXcgQ2xhc3Mob2JqLmF0dHJzKTtcbiAgICAgICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgICAgICBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgICAgICBuby5hZGQoTm9kZS5fY3JlYXRlTm9kZShjaGlsZHJlbltuXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBubztcbiAgICB9O1xuICAgIHJldHVybiBOb2RlO1xufSgpKTtcbmV4cG9ydHMuTm9kZSA9IE5vZGU7XG5Ob2RlLnByb3RvdHlwZS5ub2RlVHlwZSA9ICdOb2RlJztcbk5vZGUucHJvdG90eXBlLl9hdHRyc0FmZmVjdGluZ1NpemUgPSBbXTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnekluZGV4Jyk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ2Fic29sdXRlUG9zaXRpb24nKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAncG9zaXRpb24nKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAneCcsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3knLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24nLCAnc291cmNlLW92ZXInLCBWYWxpZGF0b3JzXzEuZ2V0U3RyaW5nVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdvcGFjaXR5JywgMSwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnbmFtZScsICcnLCBWYWxpZGF0b3JzXzEuZ2V0U3RyaW5nVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdpZCcsICcnLCBWYWxpZGF0b3JzXzEuZ2V0U3RyaW5nVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdyb3RhdGlvbicsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKE5vZGUsICdzY2FsZScsIFsneCcsICd5J10pO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdzY2FsZVgnLCAxLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdzY2FsZVknLCAxLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihOb2RlLCAnc2tldycsIFsneCcsICd5J10pO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdza2V3WCcsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3NrZXdZJywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoTm9kZSwgJ29mZnNldCcsIFsneCcsICd5J10pO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdvZmZzZXRYJywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnb2Zmc2V0WScsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ2RyYWdEaXN0YW5jZScsIG51bGwsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3dpZHRoJywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnaGVpZ2h0JywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnbGlzdGVuaW5nJywgJ2luaGVyaXQnLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgdmFyIGlzVmFsaWQgPSB2YWwgPT09IHRydWUgfHwgdmFsID09PSBmYWxzZSB8fCB2YWwgPT09ICdpbmhlcml0JztcbiAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgVXRpbF8xLlV0aWwud2Fybih2YWwgK1xuICAgICAgICAgICAgJyBpcyBhIG5vdCB2YWxpZCB2YWx1ZSBmb3IgXCJsaXN0ZW5pbmdcIiBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBtYXkgYmUgdHJ1ZSwgZmFsc2Ugb3IgXCJpbmhlcml0XCIuJyk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG59KTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAncHJldmVudERlZmF1bHQnLCB0cnVlLCBWYWxpZGF0b3JzXzEuZ2V0Qm9vbGVhblZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnZmlsdGVycycsIG51bGwsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICB0aGlzLl9maWx0ZXJVcFRvRGF0ZSA9IGZhbHNlO1xuICAgIHJldHVybiB2YWw7XG59KTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAndmlzaWJsZScsICdpbmhlcml0JywgZnVuY3Rpb24gKHZhbCkge1xuICAgIHZhciBpc1ZhbGlkID0gdmFsID09PSB0cnVlIHx8IHZhbCA9PT0gZmFsc2UgfHwgdmFsID09PSAnaW5oZXJpdCc7XG4gICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgIFV0aWxfMS5VdGlsLndhcm4odmFsICtcbiAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwidmlzaWJsZVwiIGF0dHJpYnV0ZS4gVGhlIHZhbHVlIG1heSBiZSB0cnVlLCBmYWxzZSBvciBcImluaGVyaXRcIi4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbn0pO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICd0cmFuc2Zvcm1zRW5hYmxlZCcsICdhbGwnLCBWYWxpZGF0b3JzXzEuZ2V0U3RyaW5nVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdzaXplJyk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ2RyYWdCb3VuZEZ1bmMnKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnZHJhZ2dhYmxlJywgZmFsc2UsIFZhbGlkYXRvcnNfMS5nZXRCb29sZWFuVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYmFja0NvbXBhdChOb2RlLCB7XG4gICAgcm90YXRlRGVnOiAncm90YXRlJyxcbiAgICBzZXRSb3RhdGlvbkRlZzogJ3NldFJvdGF0aW9uJyxcbiAgICBnZXRSb3RhdGlvbkRlZzogJ2dldFJvdGF0aW9uJ1xufSk7XG5VdGlsXzEuQ29sbGVjdGlvbi5tYXBNZXRob2RzKE5vZGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBVdGlsXzEgPSByZXF1aXJlKFwiLi9VdGlsXCIpO1xudmFyIEZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuL0ZhY3RvcnlcIik7XG52YXIgTm9kZV8xID0gcmVxdWlyZShcIi4vTm9kZVwiKTtcbnZhciBWYWxpZGF0b3JzXzEgPSByZXF1aXJlKFwiLi9WYWxpZGF0b3JzXCIpO1xudmFyIEdsb2JhbF8xID0gcmVxdWlyZShcIi4vR2xvYmFsXCIpO1xudmFyIEhBU19TSEFET1cgPSAnaGFzU2hhZG93JztcbnZhciBTSEFET1dfUkdCQSA9ICdzaGFkb3dSR0JBJztcbnZhciBwYXR0ZXJuSW1hZ2UgPSAncGF0dGVybkltYWdlJztcbnZhciBsaW5lYXJHcmFkaWVudCA9ICdsaW5lYXJHcmFkaWVudCc7XG52YXIgcmFkaWFsR3JhZGllbnQgPSAncmFkaWFsR3JhZGllbnQnO1xudmFyIGR1bW15Q29udGV4dDtcbmZ1bmN0aW9uIGdldER1bW15Q29udGV4dCgpIHtcbiAgICBpZiAoZHVtbXlDb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBkdW1teUNvbnRleHQ7XG4gICAgfVxuICAgIGR1bW15Q29udGV4dCA9IFV0aWxfMS5VdGlsLmNyZWF0ZUNhbnZhc0VsZW1lbnQoKS5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHJldHVybiBkdW1teUNvbnRleHQ7XG59XG5leHBvcnRzLnNoYXBlcyA9IHt9O1xuZnVuY3Rpb24gX2ZpbGxGdW5jKGNvbnRleHQpIHtcbiAgICBjb250ZXh0LmZpbGwoKTtcbn1cbmZ1bmN0aW9uIF9zdHJva2VGdW5jKGNvbnRleHQpIHtcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xufVxuZnVuY3Rpb24gX2ZpbGxGdW5jSGl0KGNvbnRleHQpIHtcbiAgICBjb250ZXh0LmZpbGwoKTtcbn1cbmZ1bmN0aW9uIF9zdHJva2VGdW5jSGl0KGNvbnRleHQpIHtcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xufVxuZnVuY3Rpb24gX2NsZWFySGFzU2hhZG93Q2FjaGUoKSB7XG4gICAgdGhpcy5fY2xlYXJDYWNoZShIQVNfU0hBRE9XKTtcbn1cbmZ1bmN0aW9uIF9jbGVhckdldFNoYWRvd1JHQkFDYWNoZSgpIHtcbiAgICB0aGlzLl9jbGVhckNhY2hlKFNIQURPV19SR0JBKTtcbn1cbmZ1bmN0aW9uIF9jbGVhckZpbGxQYXR0ZXJuQ2FjaGUoKSB7XG4gICAgdGhpcy5fY2xlYXJDYWNoZShwYXR0ZXJuSW1hZ2UpO1xufVxuZnVuY3Rpb24gX2NsZWFyTGluZWFyR3JhZGllbnRDYWNoZSgpIHtcbiAgICB0aGlzLl9jbGVhckNhY2hlKGxpbmVhckdyYWRpZW50KTtcbn1cbmZ1bmN0aW9uIF9jbGVhclJhZGlhbEdyYWRpZW50Q2FjaGUoKSB7XG4gICAgdGhpcy5fY2xlYXJDYWNoZShyYWRpYWxHcmFkaWVudCk7XG59XG52YXIgU2hhcGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTaGFwZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTaGFwZShjb25maWcpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY29uZmlnKSB8fCB0aGlzO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAga2V5ID0gVXRpbF8xLlV0aWwuZ2V0UmFuZG9tQ29sb3IoKTtcbiAgICAgICAgICAgIGlmIChrZXkgJiYgIShrZXkgaW4gZXhwb3J0cy5zaGFwZXMpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuY29sb3JLZXkgPSBrZXk7XG4gICAgICAgIGV4cG9ydHMuc2hhcGVzW2tleV0gPSBfdGhpcztcbiAgICAgICAgX3RoaXMub24oJ3NoYWRvd0NvbG9yQ2hhbmdlLmtvbnZhIHNoYWRvd0JsdXJDaGFuZ2Uua29udmEgc2hhZG93T2Zmc2V0Q2hhbmdlLmtvbnZhIHNoYWRvd09wYWNpdHlDaGFuZ2Uua29udmEgc2hhZG93RW5hYmxlZENoYW5nZS5rb252YScsIF9jbGVhckhhc1NoYWRvd0NhY2hlKTtcbiAgICAgICAgX3RoaXMub24oJ3NoYWRvd0NvbG9yQ2hhbmdlLmtvbnZhIHNoYWRvd09wYWNpdHlDaGFuZ2Uua29udmEgc2hhZG93RW5hYmxlZENoYW5nZS5rb252YScsIF9jbGVhckdldFNoYWRvd1JHQkFDYWNoZSk7XG4gICAgICAgIF90aGlzLm9uKCdmaWxsUHJpb3JpdHlDaGFuZ2Uua29udmEgZmlsbFBhdHRlcm5JbWFnZUNoYW5nZS5rb252YSBmaWxsUGF0dGVyblJlcGVhdENoYW5nZS5rb252YScsIF9jbGVhckZpbGxQYXR0ZXJuQ2FjaGUpO1xuICAgICAgICBfdGhpcy5vbignZmlsbFByaW9yaXR5Q2hhbmdlLmtvbnZhIGZpbGxMaW5lYXJHcmFkaWVudENvbG9yU3RvcHNDaGFuZ2Uua29udmEgZmlsbExpbmVhckdyYWRpZW50U3RhcnRQb2ludFhDaGFuZ2Uua29udmEgZmlsbExpbmVhckdyYWRpZW50U3RhcnRQb2ludFlDaGFuZ2Uua29udmEgZmlsbExpbmVhckdyYWRpZW50RW5kUG9pbnRYQ2hhbmdlLmtvbnZhIGZpbGxMaW5lYXJHcmFkaWVudEVuZFBvaW50WUNoYW5nZS5rb252YScsIF9jbGVhckxpbmVhckdyYWRpZW50Q2FjaGUpO1xuICAgICAgICBfdGhpcy5vbignZmlsbFByaW9yaXR5Q2hhbmdlLmtvbnZhIGZpbGxSYWRpYWxHcmFkaWVudENvbG9yU3RvcHNDaGFuZ2Uua29udmEgZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRQb2ludFhDaGFuZ2Uua29udmEgZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRQb2ludFlDaGFuZ2Uua29udmEgZmlsbFJhZGlhbEdyYWRpZW50RW5kUG9pbnRYQ2hhbmdlLmtvbnZhIGZpbGxSYWRpYWxHcmFkaWVudEVuZFBvaW50WUNoYW5nZS5rb252YSBmaWxsUmFkaWFsR3JhZGllbnRTdGFydFJhZGl1c0NoYW5nZS5rb252YSBmaWxsUmFkaWFsR3JhZGllbnRFbmRSYWRpdXNDaGFuZ2Uua29udmEnLCBfY2xlYXJSYWRpYWxHcmFkaWVudENhY2hlKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTaGFwZS5wcm90b3R5cGUuZ2V0Q29udGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGF5ZXIoKS5nZXRDb250ZXh0KCk7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuZ2V0Q2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRMYXllcigpLmdldENhbnZhcygpO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLmdldFNjZW5lRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cnMuc2NlbmVGdW5jIHx8IHRoaXNbJ19zY2VuZUZ1bmMnXTtcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5nZXRIaXRGdW5jID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRycy5oaXRGdW5jIHx8IHRoaXNbJ19oaXRGdW5jJ107XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuaGFzU2hhZG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUoSEFTX1NIQURPVywgdGhpcy5faGFzU2hhZG93KTtcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5faGFzU2hhZG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuc2hhZG93RW5hYmxlZCgpICYmXG4gICAgICAgICAgICAodGhpcy5zaGFkb3dPcGFjaXR5KCkgIT09IDAgJiZcbiAgICAgICAgICAgICAgICAhISh0aGlzLnNoYWRvd0NvbG9yKCkgfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFkb3dCbHVyKCkgfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFkb3dPZmZzZXRYKCkgfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFkb3dPZmZzZXRZKCkpKSk7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuX2dldEZpbGxQYXR0ZXJuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUocGF0dGVybkltYWdlLCB0aGlzLl9fZ2V0RmlsbFBhdHRlcm4pO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLl9fZ2V0RmlsbFBhdHRlcm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmZpbGxQYXR0ZXJuSW1hZ2UoKSkge1xuICAgICAgICAgICAgdmFyIGN0eCA9IGdldER1bW15Q29udGV4dCgpO1xuICAgICAgICAgICAgcmV0dXJuIGN0eC5jcmVhdGVQYXR0ZXJuKHRoaXMuZmlsbFBhdHRlcm5JbWFnZSgpLCB0aGlzLmZpbGxQYXR0ZXJuUmVwZWF0KCkgfHwgJ3JlcGVhdCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuX2dldExpbmVhckdyYWRpZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUobGluZWFyR3JhZGllbnQsIHRoaXMuX19nZXRMaW5lYXJHcmFkaWVudCk7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuX19nZXRMaW5lYXJHcmFkaWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbG9yU3RvcHMgPSB0aGlzLmZpbGxMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMoKTtcbiAgICAgICAgaWYgKGNvbG9yU3RvcHMpIHtcbiAgICAgICAgICAgIHZhciBjdHggPSBnZXREdW1teUNvbnRleHQoKTtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuZmlsbExpbmVhckdyYWRpZW50U3RhcnRQb2ludCgpO1xuICAgICAgICAgICAgdmFyIGVuZCA9IHRoaXMuZmlsbExpbmVhckdyYWRpZW50RW5kUG9pbnQoKTtcbiAgICAgICAgICAgIHZhciBncmQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoc3RhcnQueCwgc3RhcnQueSwgZW5kLngsIGVuZC55KTtcbiAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgY29sb3JTdG9wcy5sZW5ndGg7IG4gKz0gMikge1xuICAgICAgICAgICAgICAgIGdyZC5hZGRDb2xvclN0b3AoY29sb3JTdG9wc1tuXSwgY29sb3JTdG9wc1tuICsgMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGdyZDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLl9nZXRSYWRpYWxHcmFkaWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKHJhZGlhbEdyYWRpZW50LCB0aGlzLl9fZ2V0UmFkaWFsR3JhZGllbnQpO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLl9fZ2V0UmFkaWFsR3JhZGllbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb2xvclN0b3BzID0gdGhpcy5maWxsUmFkaWFsR3JhZGllbnRDb2xvclN0b3BzKCk7XG4gICAgICAgIGlmIChjb2xvclN0b3BzKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gZ2V0RHVtbXlDb250ZXh0KCk7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLmZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UG9pbnQoKTtcbiAgICAgICAgICAgIHZhciBlbmQgPSB0aGlzLmZpbGxSYWRpYWxHcmFkaWVudEVuZFBvaW50KCk7XG4gICAgICAgICAgICB2YXIgZ3JkID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KHN0YXJ0LngsIHN0YXJ0LnksIHRoaXMuZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRSYWRpdXMoKSwgZW5kLngsIGVuZC55LCB0aGlzLmZpbGxSYWRpYWxHcmFkaWVudEVuZFJhZGl1cygpKTtcbiAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgY29sb3JTdG9wcy5sZW5ndGg7IG4gKz0gMikge1xuICAgICAgICAgICAgICAgIGdyZC5hZGRDb2xvclN0b3AoY29sb3JTdG9wc1tuXSwgY29sb3JTdG9wc1tuICsgMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGdyZDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLmdldFNoYWRvd1JHQkEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShTSEFET1dfUkdCQSwgdGhpcy5fZ2V0U2hhZG93UkdCQSk7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuX2dldFNoYWRvd1JHQkEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc1NoYWRvdygpKSB7XG4gICAgICAgICAgICB2YXIgcmdiYSA9IFV0aWxfMS5VdGlsLmNvbG9yVG9SR0JBKHRoaXMuc2hhZG93Q29sb3IoKSk7XG4gICAgICAgICAgICByZXR1cm4gKCdyZ2JhKCcgK1xuICAgICAgICAgICAgICAgIHJnYmEuciArXG4gICAgICAgICAgICAgICAgJywnICtcbiAgICAgICAgICAgICAgICByZ2JhLmcgK1xuICAgICAgICAgICAgICAgICcsJyArXG4gICAgICAgICAgICAgICAgcmdiYS5iICtcbiAgICAgICAgICAgICAgICAnLCcgK1xuICAgICAgICAgICAgICAgIHJnYmEuYSAqICh0aGlzLnNoYWRvd09wYWNpdHkoKSB8fCAxKSArXG4gICAgICAgICAgICAgICAgJyknKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLmhhc0ZpbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhISh0aGlzLmZpbGwoKSB8fFxuICAgICAgICAgICAgdGhpcy5maWxsUGF0dGVybkltYWdlKCkgfHxcbiAgICAgICAgICAgIHRoaXMuZmlsbExpbmVhckdyYWRpZW50Q29sb3JTdG9wcygpIHx8XG4gICAgICAgICAgICB0aGlzLmZpbGxSYWRpYWxHcmFkaWVudENvbG9yU3RvcHMoKSk7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuaGFzU3Ryb2tlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuc3Ryb2tlRW5hYmxlZCgpICYmXG4gICAgICAgICAgICB0aGlzLnN0cm9rZVdpZHRoKCkgJiZcbiAgICAgICAgICAgICEhKHRoaXMuc3Ryb2tlKCkgfHwgdGhpcy5zdHJva2VMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMoKSkpO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLmludGVyc2VjdHMgPSBmdW5jdGlvbiAocG9pbnQpIHtcbiAgICAgICAgdmFyIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpLCBidWZmZXJIaXRDYW52YXMgPSBzdGFnZS5idWZmZXJIaXRDYW52YXMsIHA7XG4gICAgICAgIGJ1ZmZlckhpdENhbnZhcy5nZXRDb250ZXh0KCkuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5kcmF3SGl0KGJ1ZmZlckhpdENhbnZhcyk7XG4gICAgICAgIHAgPSBidWZmZXJIaXRDYW52YXMuY29udGV4dC5nZXRJbWFnZURhdGEoTWF0aC5yb3VuZChwb2ludC54KSwgTWF0aC5yb3VuZChwb2ludC55KSwgMSwgMSkuZGF0YTtcbiAgICAgICAgcmV0dXJuIHBbM10gPiAwO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIE5vZGVfMS5Ob2RlLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XG4gICAgICAgIGRlbGV0ZSBleHBvcnRzLnNoYXBlc1t0aGlzLmNvbG9yS2V5XTtcbiAgICAgICAgZGVsZXRlIHRoaXMuY29sb3JLZXk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLl91c2VCdWZmZXJDYW52YXMgPSBmdW5jdGlvbiAoY2FjaGluZykge1xuICAgICAgICByZXR1cm4gKCghY2FjaGluZyB8fCB0aGlzLmhhc1NoYWRvdygpKSAmJlxuICAgICAgICAgICAgdGhpcy5wZXJmZWN0RHJhd0VuYWJsZWQoKSAmJlxuICAgICAgICAgICAgdGhpcy5nZXRBYnNvbHV0ZU9wYWNpdHkoKSAhPT0gMSAmJlxuICAgICAgICAgICAgdGhpcy5oYXNGaWxsKCkgJiZcbiAgICAgICAgICAgIHRoaXMuaGFzU3Ryb2tlKCkgJiZcbiAgICAgICAgICAgIHRoaXMuZ2V0U3RhZ2UoKSk7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuc2V0U3Ryb2tlSGl0RW5hYmxlZCA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5oaXRTdHJva2VXaWR0aCgnYXV0bycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaXRTdHJva2VXaWR0aCgwKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLmdldFN0cm9rZUhpdEVuYWJsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmhpdFN0cm9rZVdpZHRoKCkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuZ2V0U2VsZlJlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzaXplID0gdGhpcy5zaXplKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0aGlzLl9jZW50cm9pZCA/IE1hdGgucm91bmQoLXNpemUud2lkdGggLyAyKSA6IDAsXG4gICAgICAgICAgICB5OiB0aGlzLl9jZW50cm9pZCA/IE1hdGgucm91bmQoLXNpemUuaGVpZ2h0IC8gMikgOiAwLFxuICAgICAgICAgICAgd2lkdGg6IHNpemUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHNpemUuaGVpZ2h0XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuZ2V0Q2xpZW50UmVjdCA9IGZ1bmN0aW9uIChhdHRycykge1xuICAgICAgICBhdHRycyA9IGF0dHJzIHx8IHt9O1xuICAgICAgICB2YXIgc2tpcFRyYW5zZm9ybSA9IGF0dHJzLnNraXBUcmFuc2Zvcm07XG4gICAgICAgIHZhciByZWxhdGl2ZVRvID0gYXR0cnMucmVsYXRpdmVUbztcbiAgICAgICAgdmFyIGZpbGxSZWN0ID0gdGhpcy5nZXRTZWxmUmVjdCgpO1xuICAgICAgICB2YXIgYXBwbHlTdHJva2UgPSAhYXR0cnMuc2tpcFN0cm9rZSAmJiB0aGlzLmhhc1N0cm9rZSgpO1xuICAgICAgICB2YXIgc3Ryb2tlV2lkdGggPSAoYXBwbHlTdHJva2UgJiYgdGhpcy5zdHJva2VXaWR0aCgpKSB8fCAwO1xuICAgICAgICB2YXIgZmlsbEFuZFN0cm9rZVdpZHRoID0gZmlsbFJlY3Qud2lkdGggKyBzdHJva2VXaWR0aDtcbiAgICAgICAgdmFyIGZpbGxBbmRTdHJva2VIZWlnaHQgPSBmaWxsUmVjdC5oZWlnaHQgKyBzdHJva2VXaWR0aDtcbiAgICAgICAgdmFyIGFwcGx5U2hhZG93ID0gIWF0dHJzLnNraXBTaGFkb3cgJiYgdGhpcy5oYXNTaGFkb3coKTtcbiAgICAgICAgdmFyIHNoYWRvd09mZnNldFggPSBhcHBseVNoYWRvdyA/IHRoaXMuc2hhZG93T2Zmc2V0WCgpIDogMDtcbiAgICAgICAgdmFyIHNoYWRvd09mZnNldFkgPSBhcHBseVNoYWRvdyA/IHRoaXMuc2hhZG93T2Zmc2V0WSgpIDogMDtcbiAgICAgICAgdmFyIHByZVdpZHRoID0gZmlsbEFuZFN0cm9rZVdpZHRoICsgTWF0aC5hYnMoc2hhZG93T2Zmc2V0WCk7XG4gICAgICAgIHZhciBwcmVIZWlnaHQgPSBmaWxsQW5kU3Ryb2tlSGVpZ2h0ICsgTWF0aC5hYnMoc2hhZG93T2Zmc2V0WSk7XG4gICAgICAgIHZhciBibHVyUmFkaXVzID0gKGFwcGx5U2hhZG93ICYmIHRoaXMuc2hhZG93Qmx1cigpKSB8fCAwO1xuICAgICAgICB2YXIgd2lkdGggPSBwcmVXaWR0aCArIGJsdXJSYWRpdXMgKiAyO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gcHJlSGVpZ2h0ICsgYmx1clJhZGl1cyAqIDI7XG4gICAgICAgIHZhciByb3VuZGluZ09mZnNldCA9IDA7XG4gICAgICAgIGlmIChNYXRoLnJvdW5kKHN0cm9rZVdpZHRoIC8gMikgIT09IHN0cm9rZVdpZHRoIC8gMikge1xuICAgICAgICAgICAgcm91bmRpbmdPZmZzZXQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZWN0ID0ge1xuICAgICAgICAgICAgd2lkdGg6IHdpZHRoICsgcm91bmRpbmdPZmZzZXQsXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCArIHJvdW5kaW5nT2Zmc2V0LFxuICAgICAgICAgICAgeDogLU1hdGgucm91bmQoc3Ryb2tlV2lkdGggLyAyICsgYmx1clJhZGl1cykgK1xuICAgICAgICAgICAgICAgIE1hdGgubWluKHNoYWRvd09mZnNldFgsIDApICtcbiAgICAgICAgICAgICAgICBmaWxsUmVjdC54LFxuICAgICAgICAgICAgeTogLU1hdGgucm91bmQoc3Ryb2tlV2lkdGggLyAyICsgYmx1clJhZGl1cykgK1xuICAgICAgICAgICAgICAgIE1hdGgubWluKHNoYWRvd09mZnNldFksIDApICtcbiAgICAgICAgICAgICAgICBmaWxsUmVjdC55XG4gICAgICAgIH07XG4gICAgICAgIGlmICghc2tpcFRyYW5zZm9ybSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybWVkUmVjdChyZWN0LCByZWxhdGl2ZVRvKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVjdDtcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5kcmF3U2NlbmUgPSBmdW5jdGlvbiAoY2FuLCB0b3AsIGNhY2hpbmcsIHNraXBCdWZmZXIpIHtcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpLCBjYW52YXMgPSBjYW4gfHwgbGF5ZXIuZ2V0Q2FudmFzKCksIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgpLCBjYWNoZWRDYW52YXMgPSB0aGlzLl9nZXRDYW52YXNDYWNoZSgpLCBkcmF3RnVuYyA9IHRoaXMuc2NlbmVGdW5jKCksIGhhc1NoYWRvdyA9IHRoaXMuaGFzU2hhZG93KCksIGhhc1N0cm9rZSA9IHRoaXMuaGFzU3Ryb2tlKCksIHN0YWdlLCBidWZmZXJDYW52YXMsIGJ1ZmZlckNvbnRleHQ7XG4gICAgICAgIGlmICghdGhpcy5pc1Zpc2libGUoKSAmJiAhY2FjaGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhY2hlZENhbnZhcykge1xuICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICBsYXllci5fYXBwbHlUcmFuc2Zvcm0odGhpcywgY29udGV4dCwgdG9wKTtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdDYWNoZWRTY2VuZUNhbnZhcyhjb250ZXh0KTtcbiAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkcmF3RnVuYykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGlmICh0aGlzLl91c2VCdWZmZXJDYW52YXMoY2FjaGluZykgJiYgIXNraXBCdWZmZXIpIHtcbiAgICAgICAgICAgIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpO1xuICAgICAgICAgICAgYnVmZmVyQ2FudmFzID0gc3RhZ2UuYnVmZmVyQ2FudmFzO1xuICAgICAgICAgICAgYnVmZmVyQ29udGV4dCA9IGJ1ZmZlckNhbnZhcy5nZXRDb250ZXh0KCk7XG4gICAgICAgICAgICBidWZmZXJDb250ZXh0LmNsZWFyKCk7XG4gICAgICAgICAgICBidWZmZXJDb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIGJ1ZmZlckNvbnRleHQuX2FwcGx5TGluZUpvaW4odGhpcyk7XG4gICAgICAgICAgICBpZiAoIWNhY2hpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuX2FwcGx5VHJhbnNmb3JtKHRoaXMsIGJ1ZmZlckNvbnRleHQsIHRvcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbSA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0odG9wKS5nZXRNYXRyaXgoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC50cmFuc2Zvcm0obVswXSwgbVsxXSwgbVsyXSwgbVszXSwgbVs0XSwgbVs1XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZHJhd0Z1bmMuY2FsbCh0aGlzLCBidWZmZXJDb250ZXh0LCB0aGlzKTtcbiAgICAgICAgICAgIGJ1ZmZlckNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICAgICAgdmFyIHJhdGlvID0gYnVmZmVyQ2FudmFzLnBpeGVsUmF0aW87XG4gICAgICAgICAgICBpZiAoaGFzU2hhZG93ICYmICFjYW52YXMuaGl0Q2FudmFzKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlTaGFkb3codGhpcyk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlPcGFjaXR5KHRoaXMpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5R2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKHRoaXMpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGJ1ZmZlckNhbnZhcy5fY2FudmFzLCAwLCAwLCBidWZmZXJDYW52YXMud2lkdGggLyByYXRpbywgYnVmZmVyQ2FudmFzLmhlaWdodCAvIHJhdGlvKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5T3BhY2l0eSh0aGlzKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0Ll9hcHBseUdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbih0aGlzKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShidWZmZXJDYW52YXMuX2NhbnZhcywgMCwgMCwgYnVmZmVyQ2FudmFzLndpZHRoIC8gcmF0aW8sIGJ1ZmZlckNhbnZhcy5oZWlnaHQgLyByYXRpbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb250ZXh0Ll9hcHBseUxpbmVKb2luKHRoaXMpO1xuICAgICAgICAgICAgaWYgKCFjYWNoaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyLl9hcHBseVRyYW5zZm9ybSh0aGlzLCBjb250ZXh0LCB0b3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG8gPSB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKHRvcCkuZ2V0TWF0cml4KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQudHJhbnNmb3JtKG9bMF0sIG9bMV0sIG9bMl0sIG9bM10sIG9bNF0sIG9bNV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoYXNTaGFkb3cgJiYgaGFzU3Ryb2tlICYmICFjYW52YXMuaGl0Q2FudmFzKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFjYWNoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5T3BhY2l0eSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlHbG9iYWxDb21wb3NpdGVPcGVyYXRpb24odGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5U2hhZG93KHRoaXMpO1xuICAgICAgICAgICAgICAgIGRyYXdGdW5jLmNhbGwodGhpcywgY29udGV4dCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzRmlsbCgpICYmIHRoaXMuc2hhZG93Rm9yU3Ryb2tlRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRyYXdGdW5jLmNhbGwodGhpcywgY29udGV4dCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaGFzU2hhZG93ICYmICFjYW52YXMuaGl0Q2FudmFzKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFjYWNoaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5T3BhY2l0eSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlHbG9iYWxDb21wb3NpdGVPcGVyYXRpb24odGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5U2hhZG93KHRoaXMpO1xuICAgICAgICAgICAgICAgIGRyYXdGdW5jLmNhbGwodGhpcywgY29udGV4dCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNhY2hpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlPcGFjaXR5KHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Ll9hcHBseUdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbih0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZHJhd0Z1bmMuY2FsbCh0aGlzLCBjb250ZXh0LCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuZHJhd0hpdCA9IGZ1bmN0aW9uIChjYW4sIHRvcCwgY2FjaGluZykge1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCksIGNhbnZhcyA9IGNhbiB8fCBsYXllci5oaXRDYW52YXMsIGNvbnRleHQgPSBjYW52YXMgJiYgY2FudmFzLmdldENvbnRleHQoKSwgZHJhd0Z1bmMgPSB0aGlzLmhpdEZ1bmMoKSB8fCB0aGlzLnNjZW5lRnVuYygpLCBjYWNoZWRDYW52YXMgPSB0aGlzLl9nZXRDYW52YXNDYWNoZSgpLCBjYWNoZWRIaXRDYW52YXMgPSBjYWNoZWRDYW52YXMgJiYgY2FjaGVkQ2FudmFzLmhpdDtcbiAgICAgICAgaWYgKCF0aGlzLmNvbG9yS2V5KSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdMb29rcyBsaWtlIHlvdXIgY2FudmFzIGhhcyBhIGRlc3Ryb3llZCBzaGFwZSBpbiBpdC4gRG8gbm90IHJldXNlIHNoYXBlIGFmdGVyIHlvdSBkZXN0cm95ZWQgaXQuIFNlZSB0aGUgc2hhcGUgaW4gbG9ncyBhYm92ZS4gSWYgeW91IHdhbnQgdG8gcmV1c2Ugc2hhcGUgeW91IHNob3VsZCBjYWxsIHJlbW92ZSgpIGluc3RlYWQgb2YgZGVzdHJveSgpJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnNob3VsZERyYXdIaXQoKSAmJiAhY2FjaGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhY2hlZEhpdENhbnZhcykge1xuICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICBsYXllci5fYXBwbHlUcmFuc2Zvcm0odGhpcywgY29udGV4dCwgdG9wKTtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdDYWNoZWRIaXRDYW52YXMoY29udGV4dCk7XG4gICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZHJhd0Z1bmMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0Ll9hcHBseUxpbmVKb2luKHRoaXMpO1xuICAgICAgICBpZiAoIWNhY2hpbmcpIHtcbiAgICAgICAgICAgIGlmIChsYXllcikge1xuICAgICAgICAgICAgICAgIGxheWVyLl9hcHBseVRyYW5zZm9ybSh0aGlzLCBjb250ZXh0LCB0b3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIG8gPSB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKHRvcCkuZ2V0TWF0cml4KCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC50cmFuc2Zvcm0ob1swXSwgb1sxXSwgb1syXSwgb1szXSwgb1s0XSwgb1s1XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZHJhd0Z1bmMuY2FsbCh0aGlzLCBjb250ZXh0LCB0aGlzKTtcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLmRyYXdIaXRGcm9tQ2FjaGUgPSBmdW5jdGlvbiAoYWxwaGFUaHJlc2hvbGQpIHtcbiAgICAgICAgdmFyIHRocmVzaG9sZCA9IGFscGhhVGhyZXNob2xkIHx8IDAsIGNhY2hlZENhbnZhcyA9IHRoaXMuX2dldENhbnZhc0NhY2hlKCksIHNjZW5lQ2FudmFzID0gdGhpcy5fZ2V0Q2FjaGVkU2NlbmVDYW52YXMoKSwgaGl0Q2FudmFzID0gY2FjaGVkQ2FudmFzLmhpdCwgaGl0Q29udGV4dCA9IGhpdENhbnZhcy5nZXRDb250ZXh0KCksIGhpdFdpZHRoID0gaGl0Q2FudmFzLmdldFdpZHRoKCksIGhpdEhlaWdodCA9IGhpdENhbnZhcy5nZXRIZWlnaHQoKSwgaGl0SW1hZ2VEYXRhLCBoaXREYXRhLCBsZW4sIHJnYkNvbG9yS2V5LCBpLCBhbHBoYTtcbiAgICAgICAgaGl0Q29udGV4dC5jbGVhcigpO1xuICAgICAgICBoaXRDb250ZXh0LmRyYXdJbWFnZShzY2VuZUNhbnZhcy5fY2FudmFzLCAwLCAwLCBoaXRXaWR0aCwgaGl0SGVpZ2h0KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGhpdEltYWdlRGF0YSA9IGhpdENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGhpdFdpZHRoLCBoaXRIZWlnaHQpO1xuICAgICAgICAgICAgaGl0RGF0YSA9IGhpdEltYWdlRGF0YS5kYXRhO1xuICAgICAgICAgICAgbGVuID0gaGl0RGF0YS5sZW5ndGg7XG4gICAgICAgICAgICByZ2JDb2xvcktleSA9IFV0aWxfMS5VdGlsLl9oZXhUb1JnYih0aGlzLmNvbG9yS2V5KTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgICAgICAgICAgICAgIGFscGhhID0gaGl0RGF0YVtpICsgM107XG4gICAgICAgICAgICAgICAgaWYgKGFscGhhID4gdGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgIGhpdERhdGFbaV0gPSByZ2JDb2xvcktleS5yO1xuICAgICAgICAgICAgICAgICAgICBoaXREYXRhW2kgKyAxXSA9IHJnYkNvbG9yS2V5Lmc7XG4gICAgICAgICAgICAgICAgICAgIGhpdERhdGFbaSArIDJdID0gcmdiQ29sb3JLZXkuYjtcbiAgICAgICAgICAgICAgICAgICAgaGl0RGF0YVtpICsgM10gPSAyNTU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBoaXREYXRhW2kgKyAzXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGl0Q29udGV4dC5wdXRJbWFnZURhdGEoaGl0SW1hZ2VEYXRhLCAwLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwuZXJyb3IoJ1VuYWJsZSB0byBkcmF3IGhpdCBncmFwaCBmcm9tIGNhY2hlZCBzY2VuZSBjYW52YXMuICcgKyBlLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIFNoYXBlO1xufShOb2RlXzEuTm9kZSkpO1xuZXhwb3J0cy5TaGFwZSA9IFNoYXBlO1xuU2hhcGUucHJvdG90eXBlLl9maWxsRnVuYyA9IF9maWxsRnVuYztcblNoYXBlLnByb3RvdHlwZS5fc3Ryb2tlRnVuYyA9IF9zdHJva2VGdW5jO1xuU2hhcGUucHJvdG90eXBlLl9maWxsRnVuY0hpdCA9IF9maWxsRnVuY0hpdDtcblNoYXBlLnByb3RvdHlwZS5fc3Ryb2tlRnVuY0hpdCA9IF9zdHJva2VGdW5jSGl0O1xuU2hhcGUucHJvdG90eXBlLl9jZW50cm9pZCA9IGZhbHNlO1xuU2hhcGUucHJvdG90eXBlLm5vZGVUeXBlID0gJ1NoYXBlJztcbkdsb2JhbF8xLl9yZWdpc3Rlck5vZGUoU2hhcGUpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlJywgdW5kZWZpbmVkLCBWYWxpZGF0b3JzXzEuZ2V0U3RyaW5nVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlV2lkdGgnLCAyLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnaGl0U3Ryb2tlV2lkdGgnLCAnYXV0bycsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJPckF1dG9WYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VIaXRFbmFibGVkJywgdHJ1ZSwgVmFsaWRhdG9yc18xLmdldEJvb2xlYW5WYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdwZXJmZWN0RHJhd0VuYWJsZWQnLCB0cnVlLCBWYWxpZGF0b3JzXzEuZ2V0Qm9vbGVhblZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3NoYWRvd0ZvclN0cm9rZUVuYWJsZWQnLCB0cnVlLCBWYWxpZGF0b3JzXzEuZ2V0Qm9vbGVhblZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2xpbmVKb2luJyk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdsaW5lQ2FwJyk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzY2VuZUZ1bmMnKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2hpdEZ1bmMnKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2Rhc2gnKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2Rhc2hPZmZzZXQnLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc2hhZG93Q29sb3InLCB1bmRlZmluZWQsIFZhbGlkYXRvcnNfMS5nZXRTdHJpbmdWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzaGFkb3dCbHVyJywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3NoYWRvd09wYWNpdHknLCAxLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihTaGFwZSwgJ3NoYWRvd09mZnNldCcsIFsneCcsICd5J10pO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc2hhZG93T2Zmc2V0WCcsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzaGFkb3dPZmZzZXRZJywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuSW1hZ2UnKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGwnLCB1bmRlZmluZWQsIFZhbGlkYXRvcnNfMS5nZXRTdHJpbmdWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVyblgnLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5ZJywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMnKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZUxpbmVhckdyYWRpZW50Q29sb3JTdG9wcycpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRSYWRpdXMnLCAwKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudEVuZFJhZGl1cycsIDApO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFJhZGlhbEdyYWRpZW50Q29sb3JTdG9wcycpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5SZXBlYXQnLCAncmVwZWF0Jyk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsRW5hYmxlZCcsIHRydWUpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlRW5hYmxlZCcsIHRydWUpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc2hhZG93RW5hYmxlZCcsIHRydWUpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZGFzaEVuYWJsZWQnLCB0cnVlKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZVNjYWxlRW5hYmxlZCcsIHRydWUpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFByaW9yaXR5JywgJ2NvbG9yJyk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5PZmZzZXQnLCBbJ3gnLCAneSddKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuT2Zmc2V0WCcsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVybk9mZnNldFknLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuU2NhbGUnLCBbJ3gnLCAneSddKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuU2NhbGVYJywgMSwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuU2NhbGVZJywgMSwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsTGluZWFyR3JhZGllbnRTdGFydFBvaW50JywgW1xuICAgICd4JyxcbiAgICAneSdcbl0pO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZUxpbmVhckdyYWRpZW50U3RhcnRQb2ludCcsIFtcbiAgICAneCcsXG4gICAgJ3knXG5dKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnRYJywgMCk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnRYJywgMCk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsTGluZWFyR3JhZGllbnRTdGFydFBvaW50WScsIDApO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlTGluZWFyR3JhZGllbnRTdGFydFBvaW50WScsIDApO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxMaW5lYXJHcmFkaWVudEVuZFBvaW50JywgW1xuICAgICd4JyxcbiAgICAneSdcbl0pO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZUxpbmVhckdyYWRpZW50RW5kUG9pbnQnLCBbXG4gICAgJ3gnLFxuICAgICd5J1xuXSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsTGluZWFyR3JhZGllbnRFbmRQb2ludFgnLCAwKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZUxpbmVhckdyYWRpZW50RW5kUG9pbnRYJywgMCk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsTGluZWFyR3JhZGllbnRFbmRQb2ludFknLCAwKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZUxpbmVhckdyYWRpZW50RW5kUG9pbnRZJywgMCk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRQb2ludCcsIFtcbiAgICAneCcsXG4gICAgJ3knXG5dKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UG9pbnRYJywgMCk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUmFkaWFsR3JhZGllbnRTdGFydFBvaW50WScsIDApO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudEVuZFBvaW50JywgW1xuICAgICd4JyxcbiAgICAneSdcbl0pO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFJhZGlhbEdyYWRpZW50RW5kUG9pbnRYJywgMCk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUmFkaWFsR3JhZGllbnRFbmRQb2ludFknLCAwKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuUm90YXRpb24nLCAwKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmJhY2tDb21wYXQoU2hhcGUsIHtcbiAgICBkYXNoQXJyYXk6ICdkYXNoJyxcbiAgICBnZXREYXNoQXJyYXk6ICdnZXREYXNoJyxcbiAgICBzZXREYXNoQXJyYXk6ICdnZXREYXNoJyxcbiAgICBkcmF3RnVuYzogJ3NjZW5lRnVuYycsXG4gICAgZ2V0RHJhd0Z1bmM6ICdnZXRTY2VuZUZ1bmMnLFxuICAgIHNldERyYXdGdW5jOiAnc2V0U2NlbmVGdW5jJyxcbiAgICBkcmF3SGl0RnVuYzogJ2hpdEZ1bmMnLFxuICAgIGdldERyYXdIaXRGdW5jOiAnZ2V0SGl0RnVuYycsXG4gICAgc2V0RHJhd0hpdEZ1bmM6ICdzZXRIaXRGdW5jJ1xufSk7XG5VdGlsXzEuQ29sbGVjdGlvbi5tYXBNZXRob2RzKFNoYXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVXRpbF8xID0gcmVxdWlyZShcIi4vVXRpbFwiKTtcbnZhciBGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi9GYWN0b3J5XCIpO1xudmFyIENvbnRhaW5lcl8xID0gcmVxdWlyZShcIi4vQ29udGFpbmVyXCIpO1xudmFyIEdsb2JhbF8xID0gcmVxdWlyZShcIi4vR2xvYmFsXCIpO1xudmFyIENhbnZhc18xID0gcmVxdWlyZShcIi4vQ2FudmFzXCIpO1xudmFyIERyYWdBbmREcm9wXzEgPSByZXF1aXJlKFwiLi9EcmFnQW5kRHJvcFwiKTtcbnZhciBHbG9iYWxfMiA9IHJlcXVpcmUoXCIuL0dsb2JhbFwiKTtcbnZhciBTVEFHRSA9ICdTdGFnZScsIFNUUklORyA9ICdzdHJpbmcnLCBQWCA9ICdweCcsIE1PVVNFT1VUID0gJ21vdXNlb3V0JywgTU9VU0VMRUFWRSA9ICdtb3VzZWxlYXZlJywgTU9VU0VPVkVSID0gJ21vdXNlb3ZlcicsIE1PVVNFRU5URVIgPSAnbW91c2VlbnRlcicsIE1PVVNFTU9WRSA9ICdtb3VzZW1vdmUnLCBNT1VTRURPV04gPSAnbW91c2Vkb3duJywgTU9VU0VVUCA9ICdtb3VzZXVwJywgQ09OVEVYVE1FTlUgPSAnY29udGV4dG1lbnUnLCBDTElDSyA9ICdjbGljaycsIERCTF9DTElDSyA9ICdkYmxjbGljaycsIFRPVUNIU1RBUlQgPSAndG91Y2hzdGFydCcsIFRPVUNIRU5EID0gJ3RvdWNoZW5kJywgVEFQID0gJ3RhcCcsIERCTF9UQVAgPSAnZGJsdGFwJywgVE9VQ0hNT1ZFID0gJ3RvdWNobW92ZScsIFdIRUVMID0gJ3doZWVsJywgQ09OVEVOVF9NT1VTRU9VVCA9ICdjb250ZW50TW91c2VvdXQnLCBDT05URU5UX01PVVNFT1ZFUiA9ICdjb250ZW50TW91c2VvdmVyJywgQ09OVEVOVF9NT1VTRU1PVkUgPSAnY29udGVudE1vdXNlbW92ZScsIENPTlRFTlRfTU9VU0VET1dOID0gJ2NvbnRlbnRNb3VzZWRvd24nLCBDT05URU5UX01PVVNFVVAgPSAnY29udGVudE1vdXNldXAnLCBDT05URU5UX0NPTlRFWFRNRU5VID0gJ2NvbnRlbnRDb250ZXh0bWVudScsIENPTlRFTlRfQ0xJQ0sgPSAnY29udGVudENsaWNrJywgQ09OVEVOVF9EQkxfQ0xJQ0sgPSAnY29udGVudERibGNsaWNrJywgQ09OVEVOVF9UT1VDSFNUQVJUID0gJ2NvbnRlbnRUb3VjaHN0YXJ0JywgQ09OVEVOVF9UT1VDSEVORCA9ICdjb250ZW50VG91Y2hlbmQnLCBDT05URU5UX0RCTF9UQVAgPSAnY29udGVudERibHRhcCcsIENPTlRFTlRfVEFQID0gJ2NvbnRlbnRUYXAnLCBDT05URU5UX1RPVUNITU9WRSA9ICdjb250ZW50VG91Y2htb3ZlJywgQ09OVEVOVF9XSEVFTCA9ICdjb250ZW50V2hlZWwnLCBSRUxBVElWRSA9ICdyZWxhdGl2ZScsIEtPTlZBX0NPTlRFTlQgPSAna29udmFqcy1jb250ZW50JywgU1BBQ0UgPSAnICcsIFVOREVSU0NPUkUgPSAnXycsIENPTlRBSU5FUiA9ICdjb250YWluZXInLCBNQVhfTEFZRVJTX05VTUJFUiA9IDUsIEVNUFRZX1NUUklORyA9ICcnLCBFVkVOVFMgPSBbXG4gICAgTU9VU0VFTlRFUixcbiAgICBNT1VTRURPV04sXG4gICAgTU9VU0VNT1ZFLFxuICAgIE1PVVNFVVAsXG4gICAgTU9VU0VPVVQsXG4gICAgVE9VQ0hTVEFSVCxcbiAgICBUT1VDSE1PVkUsXG4gICAgVE9VQ0hFTkQsXG4gICAgTU9VU0VPVkVSLFxuICAgIFdIRUVMLFxuICAgIENPTlRFWFRNRU5VXG5dLCBldmVudHNMZW5ndGggPSBFVkVOVFMubGVuZ3RoO1xuZnVuY3Rpb24gYWRkRXZlbnQoY3R4LCBldmVudE5hbWUpIHtcbiAgICBjdHguY29udGVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBjdHhbVU5ERVJTQ09SRSArIGV2ZW50TmFtZV0oZXZ0KTtcbiAgICB9LCBmYWxzZSk7XG59XG52YXIgTk9fUE9JTlRFUlNfTUVTU0FHRSA9IFwiUG9pbnRlciBwb3NpdGlvbiBpcyBtaXNzaW5nIGFuZCBub3QgcmVnaXN0ZXJlZCBieSB0aGUgc3RhZ2UuIExvb2tzIGxpa2UgaXQgaXMgb3V0c2lkZSBvZiB0aGUgc3RhZ2UgY29udGFpbmVyLiBZb3UgY2FuIHNldCBpdCBtYW51YWxseSBmcm9tIGV2ZW50OiBzdGFnZS5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldmVudCk7XCI7XG5leHBvcnRzLnN0YWdlcyA9IFtdO1xuZnVuY3Rpb24gY2hlY2tOb0NsaXAoYXR0cnMpIHtcbiAgICBpZiAoYXR0cnMgPT09IHZvaWQgMCkgeyBhdHRycyA9IHt9OyB9XG4gICAgaWYgKGF0dHJzLmNsaXBGdW5jIHx8IGF0dHJzLmNsaXBXaWR0aCB8fCBhdHRycy5jbGlwSGVpZ2h0KSB7XG4gICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ1N0YWdlIGRvZXMgbm90IHN1cHBvcnQgY2xpcHBpbmcuIFBsZWFzZSB1c2UgY2xpcCBmb3IgTGF5ZXJzIG9yIEdyb3Vwcy4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xufVxudmFyIFN0YWdlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3RhZ2UsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3RhZ2UoY29uZmlnKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNoZWNrTm9DbGlwKGNvbmZpZykpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl9idWlsZERPTSgpO1xuICAgICAgICBfdGhpcy5fYmluZENvbnRlbnRFdmVudHMoKTtcbiAgICAgICAgZXhwb3J0cy5zdGFnZXMucHVzaChfdGhpcyk7XG4gICAgICAgIF90aGlzLm9uKCd3aWR0aENoYW5nZS5rb252YSBoZWlnaHRDaGFuZ2Uua29udmEnLCBfdGhpcy5fcmVzaXplRE9NKTtcbiAgICAgICAgX3RoaXMub24oJ3Zpc2libGVDaGFuZ2Uua29udmEnLCBfdGhpcy5fY2hlY2tWaXNpYmlsaXR5KTtcbiAgICAgICAgX3RoaXMub24oJ2NsaXBXaWR0aENoYW5nZS5rb252YSBjbGlwSGVpZ2h0Q2hhbmdlLmtvbnZhIGNsaXBGdW5jQ2hhbmdlLmtvbnZhJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2hlY2tOb0NsaXAoX3RoaXMuYXR0cnMpO1xuICAgICAgICB9KTtcbiAgICAgICAgX3RoaXMuX2NoZWNrVmlzaWJpbGl0eSgpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFN0YWdlLnByb3RvdHlwZS5fdmFsaWRhdGVBZGQgPSBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgdmFyIGlzTGF5ZXIgPSBjaGlsZC5nZXRUeXBlKCkgPT09ICdMYXllcic7XG4gICAgICAgIHZhciBpc0Zhc3RMYXllciA9IGNoaWxkLmdldFR5cGUoKSA9PT0gJ0Zhc3RMYXllcic7XG4gICAgICAgIHZhciB2YWxpZCA9IGlzTGF5ZXIgfHwgaXNGYXN0TGF5ZXI7XG4gICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLnRocm93KCdZb3UgbWF5IG9ubHkgYWRkIGxheWVycyB0byB0aGUgc3RhZ2UuJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fY2hlY2tWaXNpYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3R5bGUgPSB0aGlzLnZpc2libGUoKSA/ICcnIDogJ25vbmUnO1xuICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IHN0eWxlO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLnNldENvbnRhaW5lciA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb250YWluZXIgPT09IFNUUklORykge1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5jaGFyQXQoMCkgPT09ICcuJykge1xuICAgICAgICAgICAgICAgIHZhciBjbGFzc05hbWUgPSBjb250YWluZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkO1xuICAgICAgICAgICAgICAgIGlmIChjb250YWluZXIuY2hhckF0KDApICE9PSAnIycpIHtcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBjb250YWluZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZCA9IGNvbnRhaW5lci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyAnQ2FuIG5vdCBmaW5kIGNvbnRhaW5lciBpbiBkb2N1bWVudCB3aXRoIGlkICcgKyBpZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXRBdHRyKENPTlRBSU5FUiwgY29udGFpbmVyKTtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5jb250ZW50KTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLnNob3VsZERyYXdIaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGF5ZXJzID0gdGhpcy5jaGlsZHJlbiwgbGVuID0gbGF5ZXJzLmxlbmd0aCwgbjtcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICBsYXllcnNbbl0uY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgIG9iaiA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIG9iai5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcmV0dXJuIENvbnRhaW5lcl8xLkNvbnRhaW5lci5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCBvYmopO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xuICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuY29udGVudDtcbiAgICAgICAgaWYgKGNvbnRlbnQgJiYgVXRpbF8xLlV0aWwuX2lzSW5Eb2N1bWVudChjb250ZW50KSkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIoKS5yZW1vdmVDaGlsZChjb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSBleHBvcnRzLnN0YWdlcy5pbmRleE9mKHRoaXMpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgZXhwb3J0cy5zdGFnZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5nZXRQb2ludGVyUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5wb2ludGVyUG9zKSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKE5PX1BPSU5URVJTX01FU1NBR0UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBvaW50ZXJQb3M7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuZ2V0U3RhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLmdldENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX3RvS29udmFDYW52YXMgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgICAgdmFyIHggPSBjb25maWcueCB8fCAwLCB5ID0gY29uZmlnLnkgfHwgMCwgY2FudmFzID0gbmV3IENhbnZhc18xLlNjZW5lQ2FudmFzKHtcbiAgICAgICAgICAgIHdpZHRoOiBjb25maWcud2lkdGggfHwgdGhpcy53aWR0aCgpLFxuICAgICAgICAgICAgaGVpZ2h0OiBjb25maWcuaGVpZ2h0IHx8IHRoaXMuaGVpZ2h0KCksXG4gICAgICAgICAgICBwaXhlbFJhdGlvOiBjb25maWcucGl4ZWxSYXRpbyB8fCAxXG4gICAgICAgIH0pLCBfY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCkuX2NvbnRleHQsIGxheWVycyA9IHRoaXMuY2hpbGRyZW47XG4gICAgICAgIGlmICh4IHx8IHkpIHtcbiAgICAgICAgICAgIF9jb250ZXh0LnRyYW5zbGF0ZSgtMSAqIHgsIC0xICogeSk7XG4gICAgICAgIH1cbiAgICAgICAgbGF5ZXJzLmVhY2goZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgICAgICBpZiAoIWxheWVyLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGxheWVyQ2FudmFzID0gbGF5ZXIuX3RvS29udmFDYW52YXMoY29uZmlnKTtcbiAgICAgICAgICAgIF9jb250ZXh0LmRyYXdJbWFnZShsYXllckNhbnZhcy5fY2FudmFzLCB4LCB5LCBsYXllckNhbnZhcy5nZXRXaWR0aCgpIC8gbGF5ZXJDYW52YXMuZ2V0UGl4ZWxSYXRpbygpLCBsYXllckNhbnZhcy5nZXRIZWlnaHQoKSAvIGxheWVyQ2FudmFzLmdldFBpeGVsUmF0aW8oKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2FudmFzO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLmdldEludGVyc2VjdGlvbiA9IGZ1bmN0aW9uIChwb3MsIHNlbGVjdG9yKSB7XG4gICAgICAgIHZhciBsYXllcnMgPSB0aGlzLmNoaWxkcmVuLCBsZW4gPSBsYXllcnMubGVuZ3RoLCBlbmQgPSBsZW4gLSAxLCBuLCBzaGFwZTtcbiAgICAgICAgZm9yIChuID0gZW5kOyBuID49IDA7IG4tLSkge1xuICAgICAgICAgICAgc2hhcGUgPSBsYXllcnNbbl0uZ2V0SW50ZXJzZWN0aW9uKHBvcywgc2VsZWN0b3IpO1xuICAgICAgICAgICAgaWYgKHNoYXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNoYXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl9yZXNpemVET00gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHRoaXMud2lkdGgoKSwgaGVpZ2h0ID0gdGhpcy5oZWlnaHQoKSwgbGF5ZXJzID0gdGhpcy5nZXRDaGlsZHJlbigpLCBsZW4gPSBsYXllcnMubGVuZ3RoLCBuLCBsYXllcjtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgUFg7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgUFg7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlckNhbnZhcy5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5idWZmZXJIaXRDYW52YXMuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgICAgIGxheWVyID0gbGF5ZXJzW25dO1xuICAgICAgICAgICAgICAgIGxheWVyLnNldFNpemUoeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH0pO1xuICAgICAgICAgICAgICAgIGxheWVyLmRyYXcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoYXJndW1lbnRzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuYWRkLmNhbGwodGhpcywgbGF5ZXIpO1xuICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgIGlmIChsZW5ndGggPiBNQVhfTEFZRVJTX05VTUJFUikge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybignVGhlIHN0YWdlIGhhcyAnICtcbiAgICAgICAgICAgICAgICBsZW5ndGggK1xuICAgICAgICAgICAgICAgICcgbGF5ZXJzLiBSZWNvbW1lbmRlZCBtYXhpbWluIG51bWJlciBvZiBsYXllcnMgaXMgMy01LiBBZGRpbmcgbW9yZSBsYXllcnMgaW50byB0aGUgc3RhZ2UgbWF5IGRyb3AgdGhlIHBlcmZvcm1hbmNlLiBSZXRoaW5rIHlvdXIgdHJlZSBzdHJ1Y3R1cmUsIHlvdSBjYW4gdXNlIEtvbnZhLkdyb3VwLicpO1xuICAgICAgICB9XG4gICAgICAgIGxheWVyLl9zZXRDYW52YXNTaXplKHRoaXMud2lkdGgoKSwgdGhpcy5oZWlnaHQoKSk7XG4gICAgICAgIGxheWVyLmRyYXcoKTtcbiAgICAgICAgaWYgKEdsb2JhbF8xLktvbnZhLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKGxheWVyLmNhbnZhcy5fY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5nZXRQYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLmdldExheWVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5nZXRMYXllcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENoaWxkcmVuKCk7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX2JpbmRDb250ZW50RXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIUdsb2JhbF8xLktvbnZhLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgZXZlbnRzTGVuZ3RoOyBuKyspIHtcbiAgICAgICAgICAgIGFkZEV2ZW50KHRoaXMsIEVWRU5UU1tuXSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fbW91c2VlbnRlciA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICB0aGlzLl9maXJlKE1PVVNFRU5URVIsIHsgZXZ0OiBldnQsIHRhcmdldDogdGhpcywgY3VycmVudFRhcmdldDogdGhpcyB9KTtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fbW91c2VvdmVyID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIHRoaXMuX2ZpcmUoQ09OVEVOVF9NT1VTRU9WRVIsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgIHRoaXMuX2ZpcmUoTU9VU0VPVkVSLCB7IGV2dDogZXZ0LCB0YXJnZXQ6IHRoaXMsIGN1cnJlbnRUYXJnZXQ6IHRoaXMgfSk7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX21vdXNlb3V0ID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIHZhciB0YXJnZXRTaGFwZSA9IHRoaXMudGFyZ2V0U2hhcGU7XG4gICAgICAgIGlmICh0YXJnZXRTaGFwZSAmJiAhRHJhZ0FuZERyb3BfMS5ERC5pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICB0YXJnZXRTaGFwZS5fZmlyZUFuZEJ1YmJsZShNT1VTRU9VVCwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgIHRhcmdldFNoYXBlLl9maXJlQW5kQnViYmxlKE1PVVNFTEVBVkUsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICB0aGlzLnRhcmdldFNoYXBlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghRHJhZ0FuZERyb3BfMS5ERC5pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKE1PVVNFTEVBVkUsIHtcbiAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9maXJlKE1PVVNFT1VULCB7XG4gICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9pbnRlclBvcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fZmlyZShDT05URU5UX01PVVNFT1VULCB7IGV2dDogZXZ0IH0pO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl9tb3VzZW1vdmUgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGlmIChHbG9iYWxfMS5Lb252YS5VQS5pZU1vYmlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RvdWNobW92ZShldnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgdmFyIHNoYXBlO1xuICAgICAgICBpZiAoIURyYWdBbmREcm9wXzEuREQuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgc2hhcGUgPSB0aGlzLmdldEludGVyc2VjdGlvbih0aGlzLmdldFBvaW50ZXJQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIGlmIChzaGFwZSAmJiBzaGFwZS5pc0xpc3RlbmluZygpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpZmZlcmVudFRhcmdldCA9ICF0aGlzLnRhcmdldFNoYXBlIHx8IHRoaXMudGFyZ2V0U2hhcGUgIT09IHNoYXBlO1xuICAgICAgICAgICAgICAgIGlmICghRHJhZ0FuZERyb3BfMS5ERC5pc0RyYWdnaW5nICYmIGRpZmZlcmVudFRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50YXJnZXRTaGFwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXRTaGFwZS5fZmlyZUFuZEJ1YmJsZShNT1VTRU9VVCwgeyBldnQ6IGV2dCB9LCBzaGFwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldFNoYXBlLl9maXJlQW5kQnViYmxlKE1PVVNFTEVBVkUsIHsgZXZ0OiBldnQgfSwgc2hhcGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKE1PVVNFT1ZFUiwgeyBldnQ6IGV2dCB9LCB0aGlzLnRhcmdldFNoYXBlKTtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoTU9VU0VFTlRFUiwgeyBldnQ6IGV2dCB9LCB0aGlzLnRhcmdldFNoYXBlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXRTaGFwZSA9IHNoYXBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoTU9VU0VNT1ZFLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldFNoYXBlICYmICFEcmFnQW5kRHJvcF8xLkRELmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXRTaGFwZS5fZmlyZUFuZEJ1YmJsZShNT1VTRU9VVCwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXRTaGFwZS5fZmlyZUFuZEJ1YmJsZShNT1VTRUxFQVZFLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXJlKE1PVVNFT1ZFUiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldFNoYXBlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZShNT1VTRU1PVkUsIHtcbiAgICAgICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZmlyZShDT05URU5UX01PVVNFTU9WRSwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZ0LmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX21vdXNlZG93biA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgaWYgKEdsb2JhbF8xLktvbnZhLlVBLmllTW9iaWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdG91Y2hzdGFydChldnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgdmFyIHNoYXBlID0gdGhpcy5nZXRJbnRlcnNlY3Rpb24odGhpcy5nZXRQb2ludGVyUG9zaXRpb24oKSk7XG4gICAgICAgIEdsb2JhbF8xLktvbnZhLmxpc3RlbkNsaWNrVGFwID0gdHJ1ZTtcbiAgICAgICAgaWYgKHNoYXBlICYmIHNoYXBlLmlzTGlzdGVuaW5nKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tTdGFydFNoYXBlID0gc2hhcGU7XG4gICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShNT1VTRURPV04sIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKE1PVVNFRE9XTiwge1xuICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9maXJlKENPTlRFTlRfTU9VU0VET1dOLCB7IGV2dDogZXZ0IH0pO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl9tb3VzZXVwID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBpZiAoR2xvYmFsXzEuS29udmEuVUEuaWVNb2JpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90b3VjaGVuZChldnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgdmFyIHNoYXBlID0gdGhpcy5nZXRJbnRlcnNlY3Rpb24odGhpcy5nZXRQb2ludGVyUG9zaXRpb24oKSksIGNsaWNrU3RhcnRTaGFwZSA9IHRoaXMuY2xpY2tTdGFydFNoYXBlLCBjbGlja0VuZFNoYXBlID0gdGhpcy5jbGlja0VuZFNoYXBlLCBmaXJlRGJsQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgaWYgKEdsb2JhbF8xLktvbnZhLmluRGJsQ2xpY2tXaW5kb3cpIHtcbiAgICAgICAgICAgIGZpcmVEYmxDbGljayA9IHRydWU7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5kYmxUaW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghRHJhZ0FuZERyb3BfMS5ERC5qdXN0RHJhZ2dlZCkge1xuICAgICAgICAgICAgR2xvYmFsXzEuS29udmEuaW5EYmxDbGlja1dpbmRvdyA9IHRydWU7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5kYmxUaW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChEcmFnQW5kRHJvcF8xLkREKSB7XG4gICAgICAgICAgICBEcmFnQW5kRHJvcF8xLkRELmp1c3REcmFnZ2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYmxUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBHbG9iYWxfMS5Lb252YS5pbkRibENsaWNrV2luZG93ID0gZmFsc2U7XG4gICAgICAgIH0sIEdsb2JhbF8xLktvbnZhLmRibENsaWNrV2luZG93KTtcbiAgICAgICAgaWYgKHNoYXBlICYmIHNoYXBlLmlzTGlzdGVuaW5nKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tFbmRTaGFwZSA9IHNoYXBlO1xuICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoTU9VU0VVUCwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgIGlmIChHbG9iYWxfMS5Lb252YS5saXN0ZW5DbGlja1RhcCAmJlxuICAgICAgICAgICAgICAgIGNsaWNrU3RhcnRTaGFwZSAmJlxuICAgICAgICAgICAgICAgIGNsaWNrU3RhcnRTaGFwZS5faWQgPT09IHNoYXBlLl9pZCkge1xuICAgICAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKENMSUNLLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgICAgIGlmIChmaXJlRGJsQ2xpY2sgJiYgY2xpY2tFbmRTaGFwZSAmJiBjbGlja0VuZFNoYXBlLl9pZCA9PT0gc2hhcGUuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKERCTF9DTElDSywgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKE1PVVNFVVAsIHsgZXZ0OiBldnQsIHRhcmdldDogdGhpcywgY3VycmVudFRhcmdldDogdGhpcyB9KTtcbiAgICAgICAgICAgIGlmIChHbG9iYWxfMS5Lb252YS5saXN0ZW5DbGlja1RhcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUoQ0xJQ0ssIHsgZXZ0OiBldnQsIHRhcmdldDogdGhpcywgY3VycmVudFRhcmdldDogdGhpcyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJlRGJsQ2xpY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlKERCTF9DTElDSywge1xuICAgICAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmlyZShDT05URU5UX01PVVNFVVAsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgIGlmIChHbG9iYWxfMS5Lb252YS5saXN0ZW5DbGlja1RhcCkge1xuICAgICAgICAgICAgdGhpcy5fZmlyZShDT05URU5UX0NMSUNLLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgaWYgKGZpcmVEYmxDbGljaykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUoQ09OVEVOVF9EQkxfQ0xJQ0ssIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgR2xvYmFsXzEuS29udmEubGlzdGVuQ2xpY2tUYXAgPSBmYWxzZTtcbiAgICAgICAgaWYgKGV2dC5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl9jb250ZXh0bWVudSA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICB2YXIgc2hhcGUgPSB0aGlzLmdldEludGVyc2VjdGlvbih0aGlzLmdldFBvaW50ZXJQb3NpdGlvbigpKTtcbiAgICAgICAgaWYgKHNoYXBlICYmIHNoYXBlLmlzTGlzdGVuaW5nKCkpIHtcbiAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKENPTlRFWFRNRU5VLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZmlyZShDT05URVhUTUVOVSwge1xuICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9maXJlKENPTlRFTlRfQ09OVEVYVE1FTlUsIHsgZXZ0OiBldnQgfSk7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX3RvdWNoc3RhcnQgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgdmFyIHNoYXBlID0gdGhpcy5nZXRJbnRlcnNlY3Rpb24odGhpcy5nZXRQb2ludGVyUG9zaXRpb24oKSk7XG4gICAgICAgIEdsb2JhbF8xLktvbnZhLmxpc3RlbkNsaWNrVGFwID0gdHJ1ZTtcbiAgICAgICAgaWYgKHNoYXBlICYmIHNoYXBlLmlzTGlzdGVuaW5nKCkpIHtcbiAgICAgICAgICAgIHRoaXMudGFwU3RhcnRTaGFwZSA9IHNoYXBlO1xuICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoVE9VQ0hTVEFSVCwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgIGlmIChzaGFwZS5pc0xpc3RlbmluZygpICYmIHNoYXBlLnByZXZlbnREZWZhdWx0KCkgJiYgZXZ0LmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoVE9VQ0hTVEFSVCwge1xuICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9maXJlKENPTlRFTlRfVE9VQ0hTVEFSVCwgeyBldnQ6IGV2dCB9KTtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fdG91Y2hlbmQgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgdmFyIHNoYXBlID0gdGhpcy5nZXRJbnRlcnNlY3Rpb24odGhpcy5nZXRQb2ludGVyUG9zaXRpb24oKSksIGZpcmVEYmxDbGljayA9IGZhbHNlO1xuICAgICAgICBpZiAoR2xvYmFsXzEuS29udmEuaW5EYmxDbGlja1dpbmRvdykge1xuICAgICAgICAgICAgZmlyZURibENsaWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRibFRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgR2xvYmFsXzEuS29udmEuaW5EYmxDbGlja1dpbmRvdyA9IHRydWU7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5kYmxUaW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRibFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEdsb2JhbF8xLktvbnZhLmluRGJsQ2xpY2tXaW5kb3cgPSBmYWxzZTtcbiAgICAgICAgfSwgR2xvYmFsXzEuS29udmEuZGJsQ2xpY2tXaW5kb3cpO1xuICAgICAgICBpZiAoc2hhcGUgJiYgc2hhcGUuaXNMaXN0ZW5pbmcoKSkge1xuICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoVE9VQ0hFTkQsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICBpZiAoR2xvYmFsXzEuS29udmEubGlzdGVuQ2xpY2tUYXAgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnRhcFN0YXJ0U2hhcGUgJiZcbiAgICAgICAgICAgICAgICBzaGFwZS5faWQgPT09IHRoaXMudGFwU3RhcnRTaGFwZS5faWQpIHtcbiAgICAgICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShUQVAsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGZpcmVEYmxDbGljaykge1xuICAgICAgICAgICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShEQkxfVEFQLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaGFwZS5pc0xpc3RlbmluZygpICYmIHNoYXBlLnByZXZlbnREZWZhdWx0KCkgJiYgZXZ0LmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoVE9VQ0hFTkQsIHsgZXZ0OiBldnQsIHRhcmdldDogdGhpcywgY3VycmVudFRhcmdldDogdGhpcyB9KTtcbiAgICAgICAgICAgIGlmIChHbG9iYWxfMS5Lb252YS5saXN0ZW5DbGlja1RhcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUoVEFQLCB7IGV2dDogZXZ0LCB0YXJnZXQ6IHRoaXMsIGN1cnJlbnRUYXJnZXQ6IHRoaXMgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmlyZURibENsaWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZShEQkxfVEFQLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9maXJlKENPTlRFTlRfVE9VQ0hFTkQsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgIGlmIChHbG9iYWxfMS5Lb252YS5saXN0ZW5DbGlja1RhcCkge1xuICAgICAgICAgICAgdGhpcy5fZmlyZShDT05URU5UX1RBUCwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgIGlmIChmaXJlRGJsQ2xpY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlKENPTlRFTlRfREJMX1RBUCwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBHbG9iYWxfMS5Lb252YS5saXN0ZW5DbGlja1RhcCA9IGZhbHNlO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl90b3VjaG1vdmUgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgdmFyIHNoYXBlO1xuICAgICAgICBpZiAoIURyYWdBbmREcm9wXzEuREQuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgc2hhcGUgPSB0aGlzLmdldEludGVyc2VjdGlvbih0aGlzLmdldFBvaW50ZXJQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIGlmIChzaGFwZSAmJiBzaGFwZS5pc0xpc3RlbmluZygpKSB7XG4gICAgICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoVE9VQ0hNT1ZFLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgICAgIGlmIChzaGFwZS5pc0xpc3RlbmluZygpICYmIHNoYXBlLnByZXZlbnREZWZhdWx0KCkgJiYgZXZ0LmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZShUT1VDSE1PVkUsIHtcbiAgICAgICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZmlyZShDT05URU5UX1RPVUNITU9WRSwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoRHJhZ0FuZERyb3BfMS5ERC5pc0RyYWdnaW5nICYmIERyYWdBbmREcm9wXzEuREQubm9kZS5wcmV2ZW50RGVmYXVsdCgpICYmIGV2dC5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl93aGVlbCA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICB2YXIgc2hhcGUgPSB0aGlzLmdldEludGVyc2VjdGlvbih0aGlzLmdldFBvaW50ZXJQb3NpdGlvbigpKTtcbiAgICAgICAgaWYgKHNoYXBlICYmIHNoYXBlLmlzTGlzdGVuaW5nKCkpIHtcbiAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKFdIRUVMLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZmlyZShXSEVFTCwge1xuICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9maXJlKENPTlRFTlRfV0hFRUwsIHsgZXZ0OiBldnQgfSk7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuc2V0UG9pbnRlcnNQb3NpdGlvbnMgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHZhciBjb250ZW50UG9zaXRpb24gPSB0aGlzLl9nZXRDb250ZW50UG9zaXRpb24oKSwgeCA9IG51bGwsIHkgPSBudWxsO1xuICAgICAgICBldnQgPSBldnQgPyBldnQgOiB3aW5kb3cuZXZlbnQ7XG4gICAgICAgIGlmIChldnQudG91Y2hlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZXZ0LnRvdWNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciB0b3VjaCA9IGV2dC50b3VjaGVzWzBdO1xuICAgICAgICAgICAgICAgIHggPSB0b3VjaC5jbGllbnRYIC0gY29udGVudFBvc2l0aW9uLmxlZnQ7XG4gICAgICAgICAgICAgICAgeSA9IHRvdWNoLmNsaWVudFkgLSBjb250ZW50UG9zaXRpb24udG9wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeCA9IGV2dC5jbGllbnRYIC0gY29udGVudFBvc2l0aW9uLmxlZnQ7XG4gICAgICAgICAgICB5ID0gZXZ0LmNsaWVudFkgLSBjb250ZW50UG9zaXRpb24udG9wO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4ICE9PSBudWxsICYmIHkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucG9pbnRlclBvcyA9IHtcbiAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgIHk6IHlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fc2V0UG9pbnRlclBvc2l0aW9uID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdNZXRob2QgX3NldFBvaW50ZXJQb3NpdGlvbiBpcyBkZXByZWNhdGVkLiBVc2UgXCJzdGFnZS5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldmVudClcIiBpbnN0ZWFkLicpO1xuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX2dldENvbnRlbnRQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0XG4gICAgICAgICAgICA/IHRoaXMuY29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgOiB7IHRvcDogMCwgbGVmdDogMCB9O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCxcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdFxuICAgICAgICB9O1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl9idWlsZERPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5idWZmZXJDYW52YXMgPSBuZXcgQ2FudmFzXzEuU2NlbmVDYW52YXMoKTtcbiAgICAgICAgdGhpcy5idWZmZXJIaXRDYW52YXMgPSBuZXcgQ2FudmFzXzEuSGl0Q2FudmFzKHsgcGl4ZWxSYXRpbzogMSB9KTtcbiAgICAgICAgaWYgKCFHbG9iYWxfMS5Lb252YS5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXIoKTtcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgICAgIHRocm93ICdTdGFnZSBoYXMgbm8gY29udGFpbmVyLiBBIGNvbnRhaW5lciBpcyByZXF1aXJlZC4nO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBFTVBUWV9TVFJJTkc7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUucG9zaXRpb24gPSBSRUxBVElWRTtcbiAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuY29udGVudC5jbGFzc05hbWUgPSBLT05WQV9DT05URU5UO1xuICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3ByZXNlbnRhdGlvbicpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcbiAgICAgICAgdGhpcy5fcmVzaXplRE9NKCk7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuY2FjaGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ0NhY2hlIGZ1bmN0aW9uIGlzIG5vdCBhbGxvd2VkIGZvciBzdGFnZS4gWW91IG1heSB1c2UgY2FjaGUgb25seSBmb3IgbGF5ZXJzLCBncm91cHMgYW5kIHNoYXBlcy4nKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuYmF0Y2hEcmF3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNoaWxkcmVuLmVhY2goZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgICAgICBsYXllci5iYXRjaERyYXcoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIFN0YWdlO1xufShDb250YWluZXJfMS5Db250YWluZXIpKTtcbmV4cG9ydHMuU3RhZ2UgPSBTdGFnZTtcblN0YWdlLnByb3RvdHlwZS5ub2RlVHlwZSA9IFNUQUdFO1xuR2xvYmFsXzIuX3JlZ2lzdGVyTm9kZShTdGFnZSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU3RhZ2UsICdjb250YWluZXInKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFV0aWxfMSA9IHJlcXVpcmUoXCIuL1V0aWxcIik7XG52YXIgQW5pbWF0aW9uXzEgPSByZXF1aXJlKFwiLi9BbmltYXRpb25cIik7XG52YXIgTm9kZV8xID0gcmVxdWlyZShcIi4vTm9kZVwiKTtcbnZhciBHbG9iYWxfMSA9IHJlcXVpcmUoXCIuL0dsb2JhbFwiKTtcbnZhciBibGFja2xpc3QgPSB7XG4gICAgbm9kZTogMSxcbiAgICBkdXJhdGlvbjogMSxcbiAgICBlYXNpbmc6IDEsXG4gICAgb25GaW5pc2g6IDEsXG4gICAgeW95bzogMVxufSwgUEFVU0VEID0gMSwgUExBWUlORyA9IDIsIFJFVkVSU0lORyA9IDMsIGlkQ291bnRlciA9IDAsIGNvbG9yQXR0cnMgPSBbJ2ZpbGwnLCAnc3Ryb2tlJywgJ3NoYWRvd0NvbG9yJ107XG52YXIgVHdlZW5FbmdpbmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFR3ZWVuRW5naW5lKHByb3AsIHByb3BGdW5jLCBmdW5jLCBiZWdpbiwgZmluaXNoLCBkdXJhdGlvbiwgeW95bykge1xuICAgICAgICB0aGlzLnByb3AgPSBwcm9wO1xuICAgICAgICB0aGlzLnByb3BGdW5jID0gcHJvcEZ1bmM7XG4gICAgICAgIHRoaXMuYmVnaW4gPSBiZWdpbjtcbiAgICAgICAgdGhpcy5fcG9zID0gYmVnaW47XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgdGhpcy5fY2hhbmdlID0gMDtcbiAgICAgICAgdGhpcy5wcmV2UG9zID0gMDtcbiAgICAgICAgdGhpcy55b3lvID0geW95bztcbiAgICAgICAgdGhpcy5fdGltZSA9IDA7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fZmluaXNoID0gMDtcbiAgICAgICAgdGhpcy5mdW5jID0gZnVuYztcbiAgICAgICAgdGhpcy5fY2hhbmdlID0gZmluaXNoIC0gdGhpcy5iZWdpbjtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgIH1cbiAgICBUd2VlbkVuZ2luZS5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSB0aGlzW3N0cl07XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICBoYW5kbGVyKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFR3ZWVuRW5naW5lLnByb3RvdHlwZS5zZXRUaW1lID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKHQgPiB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICBpZiAodGhpcy55b3lvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZSA9IHRoaXMuZHVyYXRpb247XG4gICAgICAgICAgICAgICAgdGhpcy5yZXZlcnNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHQgPCAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy55b3lvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90aW1lID0gdDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFR3ZWVuRW5naW5lLnByb3RvdHlwZS5nZXRUaW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGltZTtcbiAgICB9O1xuICAgIFR3ZWVuRW5naW5lLnByb3RvdHlwZS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIHRoaXMucHJldlBvcyA9IHRoaXMuX3BvcztcbiAgICAgICAgdGhpcy5wcm9wRnVuYyhwKTtcbiAgICAgICAgdGhpcy5fcG9zID0gcDtcbiAgICB9O1xuICAgIFR3ZWVuRW5naW5lLnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIGlmICh0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHQgPSB0aGlzLl90aW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmZ1bmModCwgdGhpcy5iZWdpbiwgdGhpcy5fY2hhbmdlLCB0aGlzLmR1cmF0aW9uKTtcbiAgICB9O1xuICAgIFR3ZWVuRW5naW5lLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gUExBWUlORztcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gdGhpcy5nZXRUaW1lcigpIC0gdGhpcy5fdGltZTtcbiAgICAgICAgdGhpcy5vbkVudGVyRnJhbWUoKTtcbiAgICAgICAgdGhpcy5maXJlKCdvblBsYXknKTtcbiAgICB9O1xuICAgIFR3ZWVuRW5naW5lLnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gUkVWRVJTSU5HO1xuICAgICAgICB0aGlzLl90aW1lID0gdGhpcy5kdXJhdGlvbiAtIHRoaXMuX3RpbWU7XG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IHRoaXMuZ2V0VGltZXIoKSAtIHRoaXMuX3RpbWU7XG4gICAgICAgIHRoaXMub25FbnRlckZyYW1lKCk7XG4gICAgICAgIHRoaXMuZmlyZSgnb25SZXZlcnNlJyk7XG4gICAgfTtcbiAgICBUd2VlbkVuZ2luZS5wcm90b3R5cGUuc2VlayA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgdGhpcy5fdGltZSA9IHQ7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuZmlyZSgnb25TZWVrJyk7XG4gICAgfTtcbiAgICBUd2VlbkVuZ2luZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgdGhpcy5fdGltZSA9IDA7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuZmlyZSgnb25SZXNldCcpO1xuICAgIH07XG4gICAgVHdlZW5FbmdpbmUucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB0aGlzLl90aW1lID0gdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5maXJlKCdvbkZpbmlzaCcpO1xuICAgIH07XG4gICAgVHdlZW5FbmdpbmUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLmdldFBvc2l0aW9uKHRoaXMuX3RpbWUpKTtcbiAgICB9O1xuICAgIFR3ZWVuRW5naW5lLnByb3RvdHlwZS5vbkVudGVyRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0ID0gdGhpcy5nZXRUaW1lcigpIC0gdGhpcy5fc3RhcnRUaW1lO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gUExBWUlORykge1xuICAgICAgICAgICAgdGhpcy5zZXRUaW1lKHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUgPT09IFJFVkVSU0lORykge1xuICAgICAgICAgICAgdGhpcy5zZXRUaW1lKHRoaXMuZHVyYXRpb24gLSB0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVHdlZW5FbmdpbmUucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gUEFVU0VEO1xuICAgICAgICB0aGlzLmZpcmUoJ29uUGF1c2UnKTtcbiAgICB9O1xuICAgIFR3ZWVuRW5naW5lLnByb3RvdHlwZS5nZXRUaW1lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIFR3ZWVuRW5naW5lO1xufSgpKTtcbnZhciBUd2VlbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVHdlZW4oY29uZmlnKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcywgbm9kZSA9IGNvbmZpZy5ub2RlLCBub2RlSWQgPSBub2RlLl9pZCwgZHVyYXRpb24sIGVhc2luZyA9IGNvbmZpZy5lYXNpbmcgfHwgZXhwb3J0cy5FYXNpbmdzLkxpbmVhciwgeW95byA9ICEhY29uZmlnLnlveW8sIGtleTtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcuZHVyYXRpb24gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IDAuMztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb25maWcuZHVyYXRpb24gPT09IDApIHtcbiAgICAgICAgICAgIGR1cmF0aW9uID0gMC4wMDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IGNvbmZpZy5kdXJhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgICAgICB0aGlzLl9pZCA9IGlkQ291bnRlcisrO1xuICAgICAgICB2YXIgbGF5ZXJzID0gbm9kZS5nZXRMYXllcigpIHx8XG4gICAgICAgICAgICAobm9kZSBpbnN0YW5jZW9mIEdsb2JhbF8xLktvbnZhWydTdGFnZSddID8gbm9kZS5nZXRMYXllcnMoKSA6IG51bGwpO1xuICAgICAgICBpZiAoIWxheWVycykge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwuZXJyb3IoJ1R3ZWVuIGNvbnN0cnVjdG9yIGhhdmUgYG5vZGVgIHRoYXQgaXMgbm90IGluIGEgbGF5ZXIuIFBsZWFzZSBhZGQgbm9kZSBpbnRvIGxheWVyIGZpcnN0LicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYW5pbSA9IG5ldyBBbmltYXRpb25fMS5BbmltYXRpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC50d2Vlbi5vbkVudGVyRnJhbWUoKTtcbiAgICAgICAgfSwgbGF5ZXJzKTtcbiAgICAgICAgdGhpcy50d2VlbiA9IG5ldyBUd2VlbkVuZ2luZShrZXksIGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICB0aGF0Ll90d2VlbkZ1bmMoaSk7XG4gICAgICAgIH0sIGVhc2luZywgMCwgMSwgZHVyYXRpb24gKiAxMDAwLCB5b3lvKTtcbiAgICAgICAgdGhpcy5fYWRkTGlzdGVuZXJzKCk7XG4gICAgICAgIGlmICghVHdlZW4uYXR0cnNbbm9kZUlkXSkge1xuICAgICAgICAgICAgVHdlZW4uYXR0cnNbbm9kZUlkXSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghVHdlZW4uYXR0cnNbbm9kZUlkXVt0aGlzLl9pZF0pIHtcbiAgICAgICAgICAgIFR3ZWVuLmF0dHJzW25vZGVJZF1bdGhpcy5faWRdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFUd2Vlbi50d2VlbnNbbm9kZUlkXSkge1xuICAgICAgICAgICAgVHdlZW4udHdlZW5zW25vZGVJZF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGtleSBpbiBjb25maWcpIHtcbiAgICAgICAgICAgIGlmIChibGFja2xpc3Rba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkQXR0cihrZXksIGNvbmZpZ1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMub25GaW5pc2ggPSBjb25maWcub25GaW5pc2g7XG4gICAgICAgIHRoaXMub25SZXNldCA9IGNvbmZpZy5vblJlc2V0O1xuICAgIH1cbiAgICBUd2Vlbi5wcm90b3R5cGUuX2FkZEF0dHIgPSBmdW5jdGlvbiAoa2V5LCBlbmQpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGUsIG5vZGVJZCA9IG5vZGUuX2lkLCBzdGFydCwgZGlmZiwgdHdlZW5JZCwgbiwgbGVuLCB0cnVlRW5kLCB0cnVlU3RhcnQsIGVuZFJHQkE7XG4gICAgICAgIHR3ZWVuSWQgPSBUd2Vlbi50d2VlbnNbbm9kZUlkXVtrZXldO1xuICAgICAgICBpZiAodHdlZW5JZCkge1xuICAgICAgICAgICAgZGVsZXRlIFR3ZWVuLmF0dHJzW25vZGVJZF1bdHdlZW5JZF1ba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBzdGFydCA9IG5vZGUuZ2V0QXR0cihrZXkpO1xuICAgICAgICBpZiAoVXRpbF8xLlV0aWwuX2lzQXJyYXkoZW5kKSkge1xuICAgICAgICAgICAgZGlmZiA9IFtdO1xuICAgICAgICAgICAgbGVuID0gTWF0aC5tYXgoZW5kLmxlbmd0aCwgc3RhcnQubGVuZ3RoKTtcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdwb2ludHMnICYmIGVuZC5sZW5ndGggIT09IHN0YXJ0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmIChlbmQubGVuZ3RoID4gc3RhcnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRydWVTdGFydCA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICBzdGFydCA9IFV0aWxfMS5VdGlsLl9wcmVwYXJlQXJyYXlGb3JUd2VlbihzdGFydCwgZW5kLCBub2RlLmNsb3NlZCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRydWVFbmQgPSBlbmQ7XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IFV0aWxfMS5VdGlsLl9wcmVwYXJlQXJyYXlGb3JUd2VlbihlbmQsIHN0YXJ0LCBub2RlLmNsb3NlZCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoa2V5LmluZGV4T2YoJ2ZpbGwnKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobiAlIDIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZmYucHVzaChlbmRbbl0gLSBzdGFydFtuXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRSR0JBID0gVXRpbF8xLlV0aWwuY29sb3JUb1JHQkEoc3RhcnRbbl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5kUkdCQSA9IFV0aWxfMS5VdGlsLmNvbG9yVG9SR0JBKGVuZFtuXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFtuXSA9IHN0YXJ0UkdCQTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZmYucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcjogZW5kUkdCQS5yIC0gc3RhcnRSR0JBLnIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZzogZW5kUkdCQS5nIC0gc3RhcnRSR0JBLmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYjogZW5kUkdCQS5iIC0gc3RhcnRSR0JBLmIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYTogZW5kUkdCQS5hIC0gc3RhcnRSR0JBLmFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpZmYucHVzaChlbmRbbl0gLSBzdGFydFtuXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbG9yQXR0cnMuaW5kZXhPZihrZXkpICE9PSAtMSkge1xuICAgICAgICAgICAgc3RhcnQgPSBVdGlsXzEuVXRpbC5jb2xvclRvUkdCQShzdGFydCk7XG4gICAgICAgICAgICBlbmRSR0JBID0gVXRpbF8xLlV0aWwuY29sb3JUb1JHQkEoZW5kKTtcbiAgICAgICAgICAgIGRpZmYgPSB7XG4gICAgICAgICAgICAgICAgcjogZW5kUkdCQS5yIC0gc3RhcnQucixcbiAgICAgICAgICAgICAgICBnOiBlbmRSR0JBLmcgLSBzdGFydC5nLFxuICAgICAgICAgICAgICAgIGI6IGVuZFJHQkEuYiAtIHN0YXJ0LmIsXG4gICAgICAgICAgICAgICAgYTogZW5kUkdCQS5hIC0gc3RhcnQuYVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRpZmYgPSBlbmQgLSBzdGFydDtcbiAgICAgICAgfVxuICAgICAgICBUd2Vlbi5hdHRyc1tub2RlSWRdW3RoaXMuX2lkXVtrZXldID0ge1xuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgZGlmZjogZGlmZixcbiAgICAgICAgICAgIGVuZDogZW5kLFxuICAgICAgICAgICAgdHJ1ZUVuZDogdHJ1ZUVuZCxcbiAgICAgICAgICAgIHRydWVTdGFydDogdHJ1ZVN0YXJ0XG4gICAgICAgIH07XG4gICAgICAgIFR3ZWVuLnR3ZWVuc1tub2RlSWRdW2tleV0gPSB0aGlzLl9pZDtcbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS5fdHdlZW5GdW5jID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGUsIGF0dHJzID0gVHdlZW4uYXR0cnNbbm9kZS5faWRdW3RoaXMuX2lkXSwga2V5LCBhdHRyLCBzdGFydCwgZGlmZiwgbmV3VmFsLCBuLCBsZW4sIGVuZDtcbiAgICAgICAgZm9yIChrZXkgaW4gYXR0cnMpIHtcbiAgICAgICAgICAgIGF0dHIgPSBhdHRyc1trZXldO1xuICAgICAgICAgICAgc3RhcnQgPSBhdHRyLnN0YXJ0O1xuICAgICAgICAgICAgZGlmZiA9IGF0dHIuZGlmZjtcbiAgICAgICAgICAgIGVuZCA9IGF0dHIuZW5kO1xuICAgICAgICAgICAgaWYgKFV0aWxfMS5VdGlsLl9pc0FycmF5KHN0YXJ0KSkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IFtdO1xuICAgICAgICAgICAgICAgIGxlbiA9IE1hdGgubWF4KHN0YXJ0Lmxlbmd0aCwgZW5kLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgaWYgKGtleS5pbmRleE9mKCdmaWxsJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobiAlIDIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWwucHVzaCgoc3RhcnRbbl0gfHwgMCkgKyBkaWZmW25dICogaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWwucHVzaCgncmdiYSgnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZChzdGFydFtuXS5yICsgZGlmZltuXS5yICogaSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKHN0YXJ0W25dLmcgKyBkaWZmW25dLmcgKiBpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcsJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoc3RhcnRbbl0uYiArIGRpZmZbbl0uYiAqIGkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJywnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN0YXJ0W25dLmEgKyBkaWZmW25dLmEgKiBpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsLnB1c2goKHN0YXJ0W25dIHx8IDApICsgZGlmZltuXSAqIGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29sb3JBdHRycy5pbmRleE9mKGtleSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsID1cbiAgICAgICAgICAgICAgICAgICAgJ3JnYmEoJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKHN0YXJ0LnIgKyBkaWZmLnIgKiBpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZChzdGFydC5nICsgZGlmZi5nICogaSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJywnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoc3RhcnQuYiArIGRpZmYuYiAqIGkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcsJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAoc3RhcnQuYSArIGRpZmYuYSAqIGkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IHN0YXJ0ICsgZGlmZiAqIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLnNldEF0dHIoa2V5LCBuZXdWYWwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUuX2FkZExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy50d2Vlbi5vblBsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5hbmltLnN0YXJ0KCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHdlZW4ub25SZXZlcnNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuYW5pbS5zdGFydCgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnR3ZWVuLm9uUGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5hbmltLnN0b3AoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50d2Vlbi5vbkZpbmlzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gX3RoaXMubm9kZTtcbiAgICAgICAgICAgIHZhciBhdHRycyA9IFR3ZWVuLmF0dHJzW25vZGUuX2lkXVtfdGhpcy5faWRdO1xuICAgICAgICAgICAgaWYgKGF0dHJzLnBvaW50cyAmJiBhdHRycy5wb2ludHMudHJ1ZUVuZCkge1xuICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cigncG9pbnRzJywgYXR0cnMucG9pbnRzLnRydWVFbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF90aGlzLm9uRmluaXNoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25GaW5pc2guY2FsbChfdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHdlZW4ub25SZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gX3RoaXMubm9kZTtcbiAgICAgICAgICAgIHZhciBhdHRycyA9IFR3ZWVuLmF0dHJzW25vZGUuX2lkXVtfdGhpcy5faWRdO1xuICAgICAgICAgICAgaWYgKGF0dHJzLnBvaW50cyAmJiBhdHRycy5wb2ludHMudHJ1ZVN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgbm9kZS5wb2ludHMoYXR0cnMucG9pbnRzLnRydWVTdGFydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX3RoaXMub25SZXNldCkge1xuICAgICAgICAgICAgICAgIF90aGlzLm9uUmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnR3ZWVuLnBsYXkoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50d2Vlbi5yZXZlcnNlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHdlZW4ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnR3ZWVuLnJlc2V0KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHdlZW4ucHJvdG90eXBlLnNlZWsgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICB0aGlzLnR3ZWVuLnNlZWsodCAqIDEwMDApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50d2Vlbi5wYXVzZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudHdlZW4uZmluaXNoKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHdlZW4ucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBub2RlSWQgPSB0aGlzLm5vZGUuX2lkLCB0aGlzSWQgPSB0aGlzLl9pZCwgYXR0cnMgPSBUd2Vlbi50d2VlbnNbbm9kZUlkXSwga2V5O1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIGZvciAoa2V5IGluIGF0dHJzKSB7XG4gICAgICAgICAgICBkZWxldGUgVHdlZW4udHdlZW5zW25vZGVJZF1ba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgVHdlZW4uYXR0cnNbbm9kZUlkXVt0aGlzSWRdO1xuICAgIH07XG4gICAgVHdlZW4uYXR0cnMgPSB7fTtcbiAgICBUd2Vlbi50d2VlbnMgPSB7fTtcbiAgICByZXR1cm4gVHdlZW47XG59KCkpO1xuZXhwb3J0cy5Ud2VlbiA9IFR3ZWVuO1xuTm9kZV8xLk5vZGUucHJvdG90eXBlLnRvID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgIHZhciBvbkZpbmlzaCA9IHBhcmFtcy5vbkZpbmlzaDtcbiAgICBwYXJhbXMubm9kZSA9IHRoaXM7XG4gICAgcGFyYW1zLm9uRmluaXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgaWYgKG9uRmluaXNoKSB7XG4gICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgdHdlZW4gPSBuZXcgVHdlZW4ocGFyYW1zKTtcbiAgICB0d2Vlbi5wbGF5KCk7XG59O1xuZXhwb3J0cy5FYXNpbmdzID0ge1xuICAgIEJhY2tFYXNlSW46IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKSArIGI7XG4gICAgfSxcbiAgICBCYWNrRWFzZU91dDogZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogKChzICsgMSkgKiB0ICsgcykgKyAxKSArIGI7XG4gICAgfSxcbiAgICBCYWNrRWFzZUluT3V0OiBmdW5jdGlvbiAodCwgYiwgYywgZCkge1xuICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gKGMgLyAyKSAqICh0ICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0IC0gcykpICsgYjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGMgLyAyKSAqICgodCAtPSAyKSAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCArIHMpICsgMikgKyBiO1xuICAgIH0sXG4gICAgRWxhc3RpY0Vhc2VJbjogZnVuY3Rpb24gKHQsIGIsIGMsIGQsIGEsIHApIHtcbiAgICAgICAgdmFyIHMgPSAwO1xuICAgICAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0IC89IGQpID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwKSB7XG4gICAgICAgICAgICBwID0gZCAqIDAuMztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWEgfHwgYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgICAgICAgICBhID0gYztcbiAgICAgICAgICAgIHMgPSBwIC8gNDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHMgPSAocCAvICgyICogTWF0aC5QSSkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKC0oYSAqXG4gICAgICAgICAgICBNYXRoLnBvdygyLCAxMCAqICh0IC09IDEpKSAqXG4gICAgICAgICAgICBNYXRoLnNpbigoKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpKSAvIHApKSArIGIpO1xuICAgIH0sXG4gICAgRWxhc3RpY0Vhc2VPdXQ6IGZ1bmN0aW9uICh0LCBiLCBjLCBkLCBhLCBwKSB7XG4gICAgICAgIHZhciBzID0gMDtcbiAgICAgICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodCAvPSBkKSA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcCkge1xuICAgICAgICAgICAgcCA9IGQgKiAwLjM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhIHx8IGEgPCBNYXRoLmFicyhjKSkge1xuICAgICAgICAgICAgYSA9IGM7XG4gICAgICAgICAgICBzID0gcCAvIDQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzID0gKHAgLyAoMiAqIE1hdGguUEkpKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChhICogTWF0aC5wb3coMiwgLTEwICogdCkgKiBNYXRoLnNpbigoKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpKSAvIHApICtcbiAgICAgICAgICAgIGMgK1xuICAgICAgICAgICAgYik7XG4gICAgfSxcbiAgICBFbGFzdGljRWFzZUluT3V0OiBmdW5jdGlvbiAodCwgYiwgYywgZCwgYSwgcCkge1xuICAgICAgICB2YXIgcyA9IDA7XG4gICAgICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHQgLz0gZCAvIDIpID09PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwKSB7XG4gICAgICAgICAgICBwID0gZCAqICgwLjMgKiAxLjUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYSB8fCBhIDwgTWF0aC5hYnMoYykpIHtcbiAgICAgICAgICAgIGEgPSBjO1xuICAgICAgICAgICAgcyA9IHAgLyA0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcyA9IChwIC8gKDIgKiBNYXRoLlBJKSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0IDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuICgtMC41ICpcbiAgICAgICAgICAgICAgICAoYSAqXG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KDIsIDEwICogKHQgLT0gMSkpICpcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5zaW4oKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSkgLyBwKSkgK1xuICAgICAgICAgICAgICAgIGIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoYSAqXG4gICAgICAgICAgICBNYXRoLnBvdygyLCAtMTAgKiAodCAtPSAxKSkgKlxuICAgICAgICAgICAgTWF0aC5zaW4oKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSkgLyBwKSAqXG4gICAgICAgICAgICAwLjUgK1xuICAgICAgICAgICAgYyArXG4gICAgICAgICAgICBiKTtcbiAgICB9LFxuICAgIEJvdW5jZUVhc2VPdXQ6IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmICgodCAvPSBkKSA8IDEgLyAyLjc1KSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiB0ICogdCkgKyBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHQgPCAyIC8gMi43NSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMS41IC8gMi43NSkgKiB0ICsgMC43NSkgKyBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHQgPCAyLjUgLyAyLjc1KSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAyLjI1IC8gMi43NSkgKiB0ICsgMC45Mzc1KSArIGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAyLjYyNSAvIDIuNzUpICogdCArIDAuOTg0Mzc1KSArIGI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIEJvdW5jZUVhc2VJbjogZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIGMgLSBleHBvcnRzLkVhc2luZ3MuQm91bmNlRWFzZU91dChkIC0gdCwgMCwgYywgZCkgKyBiO1xuICAgIH0sXG4gICAgQm91bmNlRWFzZUluT3V0OiBmdW5jdGlvbiAodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAodCA8IGQgLyAyKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwb3J0cy5FYXNpbmdzLkJvdW5jZUVhc2VJbih0ICogMiwgMCwgYywgZCkgKiAwLjUgKyBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHMuRWFzaW5ncy5Cb3VuY2VFYXNlT3V0KHQgKiAyIC0gZCwgMCwgYywgZCkgKiAwLjUgKyBjICogMC41ICsgYjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRWFzZUluOiBmdW5jdGlvbiAodCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCArIGI7XG4gICAgfSxcbiAgICBFYXNlT3V0OiBmdW5jdGlvbiAodCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gLWMgKiAodCAvPSBkKSAqICh0IC0gMikgKyBiO1xuICAgIH0sXG4gICAgRWFzZUluT3V0OiBmdW5jdGlvbiAodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIChjIC8gMikgKiB0ICogdCArIGI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICgtYyAvIDIpICogKC0tdCAqICh0IC0gMikgLSAxKSArIGI7XG4gICAgfSxcbiAgICBTdHJvbmdFYXNlSW46IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCAqIHQgKiB0ICsgYjtcbiAgICB9LFxuICAgIFN0cm9uZ0Vhc2VPdXQ6IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAqIHQgKyAxKSArIGI7XG4gICAgfSxcbiAgICBTdHJvbmdFYXNlSW5PdXQ6IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gKGMgLyAyKSAqIHQgKiB0ICogdCAqIHQgKiB0ICsgYjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGMgLyAyKSAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKSArIGI7XG4gICAgfSxcbiAgICBMaW5lYXI6IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiAoYyAqIHQpIC8gZCArIGI7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEdsb2JhbF8xID0gcmVxdWlyZShcIi4vR2xvYmFsXCIpO1xudmFyIENvbGxlY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbGxlY3Rpb24oKSB7XG4gICAgfVxuICAgIENvbGxlY3Rpb24udG9Db2xsZWN0aW9uID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBDb2xsZWN0aW9uKCksIGxlbiA9IGFyci5sZW5ndGgsIG47XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgY29sbGVjdGlvbi5wdXNoKGFycltuXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgfTtcbiAgICBDb2xsZWN0aW9uLl9tYXBNZXRob2QgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmxlbmd0aCwgaTtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpc1tpXVttZXRob2ROYW1lXS5hcHBseSh0aGlzW2ldLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgQ29sbGVjdGlvbi5tYXBNZXRob2RzID0gZnVuY3Rpb24gKGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHZhciBwcm90ID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgICAgICBmb3IgKHZhciBtZXRob2ROYW1lIGluIHByb3QpIHtcbiAgICAgICAgICAgIENvbGxlY3Rpb24uX21hcE1ldGhvZChtZXRob2ROYW1lKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENvbGxlY3Rpb247XG59KCkpO1xuZXhwb3J0cy5Db2xsZWN0aW9uID0gQ29sbGVjdGlvbjtcbkNvbGxlY3Rpb24ucHJvdG90eXBlID0gW107XG5Db2xsZWN0aW9uLnByb3RvdHlwZS5lYWNoID0gZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICBmb3IgKHZhciBuID0gMDsgbiA8IHRoaXMubGVuZ3RoOyBuKyspIHtcbiAgICAgICAgZnVuYyh0aGlzW25dLCBuKTtcbiAgICB9XG59O1xuQ29sbGVjdGlvbi5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJyID0gW10sIGxlbiA9IHRoaXMubGVuZ3RoLCBuO1xuICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICBhcnIucHVzaCh0aGlzW25dKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbn07XG52YXIgVHJhbnNmb3JtID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUcmFuc2Zvcm0obSkge1xuICAgICAgICBpZiAobSA9PT0gdm9pZCAwKSB7IG0gPSBbMSwgMCwgMCwgMSwgMCwgMF07IH1cbiAgICAgICAgdGhpcy5tID0gKG0gJiYgbS5zbGljZSgpKSB8fCBbMSwgMCwgMCwgMSwgMCwgMF07XG4gICAgfVxuICAgIFRyYW5zZm9ybS5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUcmFuc2Zvcm0odGhpcy5tKTtcbiAgICB9O1xuICAgIFRyYW5zZm9ybS5wcm90b3R5cGUucG9pbnQgPSBmdW5jdGlvbiAocG9pbnQpIHtcbiAgICAgICAgdmFyIG0gPSB0aGlzLm07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBtWzBdICogcG9pbnQueCArIG1bMl0gKiBwb2ludC55ICsgbVs0XSxcbiAgICAgICAgICAgIHk6IG1bMV0gKiBwb2ludC54ICsgbVszXSAqIHBvaW50LnkgKyBtWzVdXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBUcmFuc2Zvcm0ucHJvdG90eXBlLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHRoaXMubVs0XSArPSB0aGlzLm1bMF0gKiB4ICsgdGhpcy5tWzJdICogeTtcbiAgICAgICAgdGhpcy5tWzVdICs9IHRoaXMubVsxXSAqIHggKyB0aGlzLm1bM10gKiB5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFRyYW5zZm9ybS5wcm90b3R5cGUuc2NhbGUgPSBmdW5jdGlvbiAoc3gsIHN5KSB7XG4gICAgICAgIHRoaXMubVswXSAqPSBzeDtcbiAgICAgICAgdGhpcy5tWzFdICo9IHN4O1xuICAgICAgICB0aGlzLm1bMl0gKj0gc3k7XG4gICAgICAgIHRoaXMubVszXSAqPSBzeTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUcmFuc2Zvcm0ucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uIChyYWQpIHtcbiAgICAgICAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIHZhciBtMTEgPSB0aGlzLm1bMF0gKiBjICsgdGhpcy5tWzJdICogcztcbiAgICAgICAgdmFyIG0xMiA9IHRoaXMubVsxXSAqIGMgKyB0aGlzLm1bM10gKiBzO1xuICAgICAgICB2YXIgbTIxID0gdGhpcy5tWzBdICogLXMgKyB0aGlzLm1bMl0gKiBjO1xuICAgICAgICB2YXIgbTIyID0gdGhpcy5tWzFdICogLXMgKyB0aGlzLm1bM10gKiBjO1xuICAgICAgICB0aGlzLm1bMF0gPSBtMTE7XG4gICAgICAgIHRoaXMubVsxXSA9IG0xMjtcbiAgICAgICAgdGhpcy5tWzJdID0gbTIxO1xuICAgICAgICB0aGlzLm1bM10gPSBtMjI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHJhbnNmb3JtLnByb3RvdHlwZS5nZXRUcmFuc2xhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMubVs0XSxcbiAgICAgICAgICAgIHk6IHRoaXMubVs1XVxuICAgICAgICB9O1xuICAgIH07XG4gICAgVHJhbnNmb3JtLnByb3RvdHlwZS5za2V3ID0gZnVuY3Rpb24gKHN4LCBzeSkge1xuICAgICAgICB2YXIgbTExID0gdGhpcy5tWzBdICsgdGhpcy5tWzJdICogc3k7XG4gICAgICAgIHZhciBtMTIgPSB0aGlzLm1bMV0gKyB0aGlzLm1bM10gKiBzeTtcbiAgICAgICAgdmFyIG0yMSA9IHRoaXMubVsyXSArIHRoaXMubVswXSAqIHN4O1xuICAgICAgICB2YXIgbTIyID0gdGhpcy5tWzNdICsgdGhpcy5tWzFdICogc3g7XG4gICAgICAgIHRoaXMubVswXSA9IG0xMTtcbiAgICAgICAgdGhpcy5tWzFdID0gbTEyO1xuICAgICAgICB0aGlzLm1bMl0gPSBtMjE7XG4gICAgICAgIHRoaXMubVszXSA9IG0yMjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUcmFuc2Zvcm0ucHJvdG90eXBlLm11bHRpcGx5ID0gZnVuY3Rpb24gKG1hdHJpeCkge1xuICAgICAgICB2YXIgbTExID0gdGhpcy5tWzBdICogbWF0cml4Lm1bMF0gKyB0aGlzLm1bMl0gKiBtYXRyaXgubVsxXTtcbiAgICAgICAgdmFyIG0xMiA9IHRoaXMubVsxXSAqIG1hdHJpeC5tWzBdICsgdGhpcy5tWzNdICogbWF0cml4Lm1bMV07XG4gICAgICAgIHZhciBtMjEgPSB0aGlzLm1bMF0gKiBtYXRyaXgubVsyXSArIHRoaXMubVsyXSAqIG1hdHJpeC5tWzNdO1xuICAgICAgICB2YXIgbTIyID0gdGhpcy5tWzFdICogbWF0cml4Lm1bMl0gKyB0aGlzLm1bM10gKiBtYXRyaXgubVszXTtcbiAgICAgICAgdmFyIGR4ID0gdGhpcy5tWzBdICogbWF0cml4Lm1bNF0gKyB0aGlzLm1bMl0gKiBtYXRyaXgubVs1XSArIHRoaXMubVs0XTtcbiAgICAgICAgdmFyIGR5ID0gdGhpcy5tWzFdICogbWF0cml4Lm1bNF0gKyB0aGlzLm1bM10gKiBtYXRyaXgubVs1XSArIHRoaXMubVs1XTtcbiAgICAgICAgdGhpcy5tWzBdID0gbTExO1xuICAgICAgICB0aGlzLm1bMV0gPSBtMTI7XG4gICAgICAgIHRoaXMubVsyXSA9IG0yMTtcbiAgICAgICAgdGhpcy5tWzNdID0gbTIyO1xuICAgICAgICB0aGlzLm1bNF0gPSBkeDtcbiAgICAgICAgdGhpcy5tWzVdID0gZHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHJhbnNmb3JtLnByb3RvdHlwZS5pbnZlcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkID0gMSAvICh0aGlzLm1bMF0gKiB0aGlzLm1bM10gLSB0aGlzLm1bMV0gKiB0aGlzLm1bMl0pO1xuICAgICAgICB2YXIgbTAgPSB0aGlzLm1bM10gKiBkO1xuICAgICAgICB2YXIgbTEgPSAtdGhpcy5tWzFdICogZDtcbiAgICAgICAgdmFyIG0yID0gLXRoaXMubVsyXSAqIGQ7XG4gICAgICAgIHZhciBtMyA9IHRoaXMubVswXSAqIGQ7XG4gICAgICAgIHZhciBtNCA9IGQgKiAodGhpcy5tWzJdICogdGhpcy5tWzVdIC0gdGhpcy5tWzNdICogdGhpcy5tWzRdKTtcbiAgICAgICAgdmFyIG01ID0gZCAqICh0aGlzLm1bMV0gKiB0aGlzLm1bNF0gLSB0aGlzLm1bMF0gKiB0aGlzLm1bNV0pO1xuICAgICAgICB0aGlzLm1bMF0gPSBtMDtcbiAgICAgICAgdGhpcy5tWzFdID0gbTE7XG4gICAgICAgIHRoaXMubVsyXSA9IG0yO1xuICAgICAgICB0aGlzLm1bM10gPSBtMztcbiAgICAgICAgdGhpcy5tWzRdID0gbTQ7XG4gICAgICAgIHRoaXMubVs1XSA9IG01O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFRyYW5zZm9ybS5wcm90b3R5cGUuZ2V0TWF0cml4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tO1xuICAgIH07XG4gICAgVHJhbnNmb3JtLnByb3RvdHlwZS5zZXRBYnNvbHV0ZVBvc2l0aW9uID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgdmFyIG0wID0gdGhpcy5tWzBdLCBtMSA9IHRoaXMubVsxXSwgbTIgPSB0aGlzLm1bMl0sIG0zID0gdGhpcy5tWzNdLCBtNCA9IHRoaXMubVs0XSwgbTUgPSB0aGlzLm1bNV0sIHl0ID0gKG0wICogKHkgLSBtNSkgLSBtMSAqICh4IC0gbTQpKSAvIChtMCAqIG0zIC0gbTEgKiBtMiksIHh0ID0gKHggLSBtNCAtIG0yICogeXQpIC8gbTA7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZSh4dCwgeXQpO1xuICAgIH07XG4gICAgcmV0dXJuIFRyYW5zZm9ybTtcbn0oKSk7XG5leHBvcnRzLlRyYW5zZm9ybSA9IFRyYW5zZm9ybTtcbnZhciBPQkpFQ1RfQVJSQVkgPSAnW29iamVjdCBBcnJheV0nLCBPQkpFQ1RfTlVNQkVSID0gJ1tvYmplY3QgTnVtYmVyXScsIE9CSkVDVF9TVFJJTkcgPSAnW29iamVjdCBTdHJpbmddJywgT0JKRUNUX0JPT0xFQU4gPSAnW29iamVjdCBCb29sZWFuXScsIFBJX09WRVJfREVHMTgwID0gTWF0aC5QSSAvIDE4MCwgREVHMTgwX09WRVJfUEkgPSAxODAgLyBNYXRoLlBJLCBIQVNIID0gJyMnLCBFTVBUWV9TVFJJTkcgPSAnJywgWkVSTyA9ICcwJywgS09OVkFfV0FSTklORyA9ICdLb252YSB3YXJuaW5nOiAnLCBLT05WQV9FUlJPUiA9ICdLb252YSBlcnJvcjogJywgUkdCX1BBUkVOID0gJ3JnYignLCBDT0xPUlMgPSB7XG4gICAgYWxpY2VibHVlOiBbMjQwLCAyNDgsIDI1NV0sXG4gICAgYW50aXF1ZXdoaXRlOiBbMjUwLCAyMzUsIDIxNV0sXG4gICAgYXF1YTogWzAsIDI1NSwgMjU1XSxcbiAgICBhcXVhbWFyaW5lOiBbMTI3LCAyNTUsIDIxMl0sXG4gICAgYXp1cmU6IFsyNDAsIDI1NSwgMjU1XSxcbiAgICBiZWlnZTogWzI0NSwgMjQ1LCAyMjBdLFxuICAgIGJpc3F1ZTogWzI1NSwgMjI4LCAxOTZdLFxuICAgIGJsYWNrOiBbMCwgMCwgMF0sXG4gICAgYmxhbmNoZWRhbG1vbmQ6IFsyNTUsIDIzNSwgMjA1XSxcbiAgICBibHVlOiBbMCwgMCwgMjU1XSxcbiAgICBibHVldmlvbGV0OiBbMTM4LCA0MywgMjI2XSxcbiAgICBicm93bjogWzE2NSwgNDIsIDQyXSxcbiAgICBidXJseXdvb2Q6IFsyMjIsIDE4NCwgMTM1XSxcbiAgICBjYWRldGJsdWU6IFs5NSwgMTU4LCAxNjBdLFxuICAgIGNoYXJ0cmV1c2U6IFsxMjcsIDI1NSwgMF0sXG4gICAgY2hvY29sYXRlOiBbMjEwLCAxMDUsIDMwXSxcbiAgICBjb3JhbDogWzI1NSwgMTI3LCA4MF0sXG4gICAgY29ybmZsb3dlcmJsdWU6IFsxMDAsIDE0OSwgMjM3XSxcbiAgICBjb3Juc2lsazogWzI1NSwgMjQ4LCAyMjBdLFxuICAgIGNyaW1zb246IFsyMjAsIDIwLCA2MF0sXG4gICAgY3lhbjogWzAsIDI1NSwgMjU1XSxcbiAgICBkYXJrYmx1ZTogWzAsIDAsIDEzOV0sXG4gICAgZGFya2N5YW46IFswLCAxMzksIDEzOV0sXG4gICAgZGFya2dvbGRlbnJvZDogWzE4NCwgMTMyLCAxMV0sXG4gICAgZGFya2dyYXk6IFsxNjksIDE2OSwgMTY5XSxcbiAgICBkYXJrZ3JlZW46IFswLCAxMDAsIDBdLFxuICAgIGRhcmtncmV5OiBbMTY5LCAxNjksIDE2OV0sXG4gICAgZGFya2toYWtpOiBbMTg5LCAxODMsIDEwN10sXG4gICAgZGFya21hZ2VudGE6IFsxMzksIDAsIDEzOV0sXG4gICAgZGFya29saXZlZ3JlZW46IFs4NSwgMTA3LCA0N10sXG4gICAgZGFya29yYW5nZTogWzI1NSwgMTQwLCAwXSxcbiAgICBkYXJrb3JjaGlkOiBbMTUzLCA1MCwgMjA0XSxcbiAgICBkYXJrcmVkOiBbMTM5LCAwLCAwXSxcbiAgICBkYXJrc2FsbW9uOiBbMjMzLCAxNTAsIDEyMl0sXG4gICAgZGFya3NlYWdyZWVuOiBbMTQzLCAxODgsIDE0M10sXG4gICAgZGFya3NsYXRlYmx1ZTogWzcyLCA2MSwgMTM5XSxcbiAgICBkYXJrc2xhdGVncmF5OiBbNDcsIDc5LCA3OV0sXG4gICAgZGFya3NsYXRlZ3JleTogWzQ3LCA3OSwgNzldLFxuICAgIGRhcmt0dXJxdW9pc2U6IFswLCAyMDYsIDIwOV0sXG4gICAgZGFya3Zpb2xldDogWzE0OCwgMCwgMjExXSxcbiAgICBkZWVwcGluazogWzI1NSwgMjAsIDE0N10sXG4gICAgZGVlcHNreWJsdWU6IFswLCAxOTEsIDI1NV0sXG4gICAgZGltZ3JheTogWzEwNSwgMTA1LCAxMDVdLFxuICAgIGRpbWdyZXk6IFsxMDUsIDEwNSwgMTA1XSxcbiAgICBkb2RnZXJibHVlOiBbMzAsIDE0NCwgMjU1XSxcbiAgICBmaXJlYnJpY2s6IFsxNzgsIDM0LCAzNF0sXG4gICAgZmxvcmFsd2hpdGU6IFsyNTUsIDI1NSwgMjQwXSxcbiAgICBmb3Jlc3RncmVlbjogWzM0LCAxMzksIDM0XSxcbiAgICBmdWNoc2lhOiBbMjU1LCAwLCAyNTVdLFxuICAgIGdhaW5zYm9ybzogWzIyMCwgMjIwLCAyMjBdLFxuICAgIGdob3N0d2hpdGU6IFsyNDgsIDI0OCwgMjU1XSxcbiAgICBnb2xkOiBbMjU1LCAyMTUsIDBdLFxuICAgIGdvbGRlbnJvZDogWzIxOCwgMTY1LCAzMl0sXG4gICAgZ3JheTogWzEyOCwgMTI4LCAxMjhdLFxuICAgIGdyZWVuOiBbMCwgMTI4LCAwXSxcbiAgICBncmVlbnllbGxvdzogWzE3MywgMjU1LCA0N10sXG4gICAgZ3JleTogWzEyOCwgMTI4LCAxMjhdLFxuICAgIGhvbmV5ZGV3OiBbMjQwLCAyNTUsIDI0MF0sXG4gICAgaG90cGluazogWzI1NSwgMTA1LCAxODBdLFxuICAgIGluZGlhbnJlZDogWzIwNSwgOTIsIDkyXSxcbiAgICBpbmRpZ286IFs3NSwgMCwgMTMwXSxcbiAgICBpdm9yeTogWzI1NSwgMjU1LCAyNDBdLFxuICAgIGtoYWtpOiBbMjQwLCAyMzAsIDE0MF0sXG4gICAgbGF2ZW5kZXI6IFsyMzAsIDIzMCwgMjUwXSxcbiAgICBsYXZlbmRlcmJsdXNoOiBbMjU1LCAyNDAsIDI0NV0sXG4gICAgbGF3bmdyZWVuOiBbMTI0LCAyNTIsIDBdLFxuICAgIGxlbW9uY2hpZmZvbjogWzI1NSwgMjUwLCAyMDVdLFxuICAgIGxpZ2h0Ymx1ZTogWzE3MywgMjE2LCAyMzBdLFxuICAgIGxpZ2h0Y29yYWw6IFsyNDAsIDEyOCwgMTI4XSxcbiAgICBsaWdodGN5YW46IFsyMjQsIDI1NSwgMjU1XSxcbiAgICBsaWdodGdvbGRlbnJvZHllbGxvdzogWzI1MCwgMjUwLCAyMTBdLFxuICAgIGxpZ2h0Z3JheTogWzIxMSwgMjExLCAyMTFdLFxuICAgIGxpZ2h0Z3JlZW46IFsxNDQsIDIzOCwgMTQ0XSxcbiAgICBsaWdodGdyZXk6IFsyMTEsIDIxMSwgMjExXSxcbiAgICBsaWdodHBpbms6IFsyNTUsIDE4MiwgMTkzXSxcbiAgICBsaWdodHNhbG1vbjogWzI1NSwgMTYwLCAxMjJdLFxuICAgIGxpZ2h0c2VhZ3JlZW46IFszMiwgMTc4LCAxNzBdLFxuICAgIGxpZ2h0c2t5Ymx1ZTogWzEzNSwgMjA2LCAyNTBdLFxuICAgIGxpZ2h0c2xhdGVncmF5OiBbMTE5LCAxMzYsIDE1M10sXG4gICAgbGlnaHRzbGF0ZWdyZXk6IFsxMTksIDEzNiwgMTUzXSxcbiAgICBsaWdodHN0ZWVsYmx1ZTogWzE3NiwgMTk2LCAyMjJdLFxuICAgIGxpZ2h0eWVsbG93OiBbMjU1LCAyNTUsIDIyNF0sXG4gICAgbGltZTogWzAsIDI1NSwgMF0sXG4gICAgbGltZWdyZWVuOiBbNTAsIDIwNSwgNTBdLFxuICAgIGxpbmVuOiBbMjUwLCAyNDAsIDIzMF0sXG4gICAgbWFnZW50YTogWzI1NSwgMCwgMjU1XSxcbiAgICBtYXJvb246IFsxMjgsIDAsIDBdLFxuICAgIG1lZGl1bWFxdWFtYXJpbmU6IFsxMDIsIDIwNSwgMTcwXSxcbiAgICBtZWRpdW1ibHVlOiBbMCwgMCwgMjA1XSxcbiAgICBtZWRpdW1vcmNoaWQ6IFsxODYsIDg1LCAyMTFdLFxuICAgIG1lZGl1bXB1cnBsZTogWzE0NywgMTEyLCAyMTldLFxuICAgIG1lZGl1bXNlYWdyZWVuOiBbNjAsIDE3OSwgMTEzXSxcbiAgICBtZWRpdW1zbGF0ZWJsdWU6IFsxMjMsIDEwNCwgMjM4XSxcbiAgICBtZWRpdW1zcHJpbmdncmVlbjogWzAsIDI1MCwgMTU0XSxcbiAgICBtZWRpdW10dXJxdW9pc2U6IFs3MiwgMjA5LCAyMDRdLFxuICAgIG1lZGl1bXZpb2xldHJlZDogWzE5OSwgMjEsIDEzM10sXG4gICAgbWlkbmlnaHRibHVlOiBbMjUsIDI1LCAxMTJdLFxuICAgIG1pbnRjcmVhbTogWzI0NSwgMjU1LCAyNTBdLFxuICAgIG1pc3R5cm9zZTogWzI1NSwgMjI4LCAyMjVdLFxuICAgIG1vY2Nhc2luOiBbMjU1LCAyMjgsIDE4MV0sXG4gICAgbmF2YWpvd2hpdGU6IFsyNTUsIDIyMiwgMTczXSxcbiAgICBuYXZ5OiBbMCwgMCwgMTI4XSxcbiAgICBvbGRsYWNlOiBbMjUzLCAyNDUsIDIzMF0sXG4gICAgb2xpdmU6IFsxMjgsIDEyOCwgMF0sXG4gICAgb2xpdmVkcmFiOiBbMTA3LCAxNDIsIDM1XSxcbiAgICBvcmFuZ2U6IFsyNTUsIDE2NSwgMF0sXG4gICAgb3JhbmdlcmVkOiBbMjU1LCA2OSwgMF0sXG4gICAgb3JjaGlkOiBbMjE4LCAxMTIsIDIxNF0sXG4gICAgcGFsZWdvbGRlbnJvZDogWzIzOCwgMjMyLCAxNzBdLFxuICAgIHBhbGVncmVlbjogWzE1MiwgMjUxLCAxNTJdLFxuICAgIHBhbGV0dXJxdW9pc2U6IFsxNzUsIDIzOCwgMjM4XSxcbiAgICBwYWxldmlvbGV0cmVkOiBbMjE5LCAxMTIsIDE0N10sXG4gICAgcGFwYXlhd2hpcDogWzI1NSwgMjM5LCAyMTNdLFxuICAgIHBlYWNocHVmZjogWzI1NSwgMjE4LCAxODVdLFxuICAgIHBlcnU6IFsyMDUsIDEzMywgNjNdLFxuICAgIHBpbms6IFsyNTUsIDE5MiwgMjAzXSxcbiAgICBwbHVtOiBbMjIxLCAxNjAsIDIwM10sXG4gICAgcG93ZGVyYmx1ZTogWzE3NiwgMjI0LCAyMzBdLFxuICAgIHB1cnBsZTogWzEyOCwgMCwgMTI4XSxcbiAgICByZWJlY2NhcHVycGxlOiBbMTAyLCA1MSwgMTUzXSxcbiAgICByZWQ6IFsyNTUsIDAsIDBdLFxuICAgIHJvc3licm93bjogWzE4OCwgMTQzLCAxNDNdLFxuICAgIHJveWFsYmx1ZTogWzY1LCAxMDUsIDIyNV0sXG4gICAgc2FkZGxlYnJvd246IFsxMzksIDY5LCAxOV0sXG4gICAgc2FsbW9uOiBbMjUwLCAxMjgsIDExNF0sXG4gICAgc2FuZHlicm93bjogWzI0NCwgMTY0LCA5Nl0sXG4gICAgc2VhZ3JlZW46IFs0NiwgMTM5LCA4N10sXG4gICAgc2Vhc2hlbGw6IFsyNTUsIDI0NSwgMjM4XSxcbiAgICBzaWVubmE6IFsxNjAsIDgyLCA0NV0sXG4gICAgc2lsdmVyOiBbMTkyLCAxOTIsIDE5Ml0sXG4gICAgc2t5Ymx1ZTogWzEzNSwgMjA2LCAyMzVdLFxuICAgIHNsYXRlYmx1ZTogWzEwNiwgOTAsIDIwNV0sXG4gICAgc2xhdGVncmF5OiBbMTE5LCAxMjgsIDE0NF0sXG4gICAgc2xhdGVncmV5OiBbMTE5LCAxMjgsIDE0NF0sXG4gICAgc25vdzogWzI1NSwgMjU1LCAyNTBdLFxuICAgIHNwcmluZ2dyZWVuOiBbMCwgMjU1LCAxMjddLFxuICAgIHN0ZWVsYmx1ZTogWzcwLCAxMzAsIDE4MF0sXG4gICAgdGFuOiBbMjEwLCAxODAsIDE0MF0sXG4gICAgdGVhbDogWzAsIDEyOCwgMTI4XSxcbiAgICB0aGlzdGxlOiBbMjE2LCAxOTEsIDIxNl0sXG4gICAgdHJhbnNwYXJlbnQ6IFsyNTUsIDI1NSwgMjU1LCAwXSxcbiAgICB0b21hdG86IFsyNTUsIDk5LCA3MV0sXG4gICAgdHVycXVvaXNlOiBbNjQsIDIyNCwgMjA4XSxcbiAgICB2aW9sZXQ6IFsyMzgsIDEzMCwgMjM4XSxcbiAgICB3aGVhdDogWzI0NSwgMjIyLCAxNzldLFxuICAgIHdoaXRlOiBbMjU1LCAyNTUsIDI1NV0sXG4gICAgd2hpdGVzbW9rZTogWzI0NSwgMjQ1LCAyNDVdLFxuICAgIHllbGxvdzogWzI1NSwgMjU1LCAwXSxcbiAgICB5ZWxsb3dncmVlbjogWzE1NCwgMjA1LCA1XVxufSwgUkdCX1JFR0VYID0gL3JnYlxcKChcXGR7MSwzfSksKFxcZHsxLDN9KSwoXFxkezEsM30pXFwpLywgYW5pbVF1ZXVlID0gW107XG5leHBvcnRzLlV0aWwgPSB7XG4gICAgX2lzRWxlbWVudDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gISEob2JqICYmIG9iai5ub2RlVHlwZSA9PSAxKTtcbiAgICB9LFxuICAgIF9pc0Z1bmN0aW9uOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiAhIShvYmogJiYgb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jYWxsICYmIG9iai5hcHBseSk7XG4gICAgfSxcbiAgICBfaXNQbGFpbk9iamVjdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gISFvYmogJiYgb2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG4gICAgfSxcbiAgICBfaXNBcnJheTogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IE9CSkVDVF9BUlJBWTtcbiAgICB9LFxuICAgIF9pc051bWJlcjogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBPQkpFQ1RfTlVNQkVSICYmXG4gICAgICAgICAgICAhaXNOYU4ob2JqKSAmJlxuICAgICAgICAgICAgaXNGaW5pdGUob2JqKSk7XG4gICAgfSxcbiAgICBfaXNTdHJpbmc6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBPQkpFQ1RfU1RSSU5HO1xuICAgIH0sXG4gICAgX2lzQm9vbGVhbjogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IE9CSkVDVF9CT09MRUFOO1xuICAgIH0sXG4gICAgaXNPYmplY3Q6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHZhbCBpbnN0YW5jZW9mIE9iamVjdDtcbiAgICB9LFxuICAgIGlzVmFsaWRTZWxlY3RvcjogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZpcnN0Q2hhciA9IHNlbGVjdG9yWzBdO1xuICAgICAgICByZXR1cm4gKGZpcnN0Q2hhciA9PT0gJyMnIHx8XG4gICAgICAgICAgICBmaXJzdENoYXIgPT09ICcuJyB8fFxuICAgICAgICAgICAgZmlyc3RDaGFyID09PSBmaXJzdENoYXIudG9VcHBlckNhc2UoKSk7XG4gICAgfSxcbiAgICBfc2lnbjogZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgICBpZiAobnVtYmVyID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobnVtYmVyID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlcXVlc3RBbmltRnJhbWU6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICBhbmltUXVldWUucHVzaChjYWxsYmFjayk7XG4gICAgICAgIGlmIChhbmltUXVldWUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBxdWV1ZSA9IGFuaW1RdWV1ZTtcbiAgICAgICAgICAgICAgICBhbmltUXVldWUgPSBbXTtcbiAgICAgICAgICAgICAgICBxdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNyZWF0ZUNhbnZhc0VsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY2FudmFzLnN0eWxlID0gY2FudmFzLnN0eWxlIHx8IHt9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICB9LFxuICAgIGNyZWF0ZUltYWdlRWxlbWVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgfSxcbiAgICBfaXNJbkRvY3VtZW50OiBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgd2hpbGUgKChlbCA9IGVsLnBhcmVudE5vZGUpKSB7XG4gICAgICAgICAgICBpZiAoZWwgPT0gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBfc2ltcGxpZnlBcnJheTogZnVuY3Rpb24gKGFycikge1xuICAgICAgICB2YXIgcmV0QXJyID0gW10sIGxlbiA9IGFyci5sZW5ndGgsIHV0aWwgPSBleHBvcnRzLlV0aWwsIG4sIHZhbDtcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICB2YWwgPSBhcnJbbl07XG4gICAgICAgICAgICBpZiAodXRpbC5faXNOdW1iZXIodmFsKSkge1xuICAgICAgICAgICAgICAgIHZhbCA9IE1hdGgucm91bmQodmFsICogMTAwMCkgLyAxMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXV0aWwuX2lzU3RyaW5nKHZhbCkpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWwudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldEFyci5wdXNoKHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldEFycjtcbiAgICB9LFxuICAgIF91cmxUb0ltYWdlOiBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW1hZ2VPYmogPSBuZXcgR2xvYmFsXzEuZ2xvYi5JbWFnZSgpO1xuICAgICAgICBpbWFnZU9iai5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhpbWFnZU9iaik7XG4gICAgICAgIH07XG4gICAgICAgIGltYWdlT2JqLnNyYyA9IHVybDtcbiAgICB9LFxuICAgIF9yZ2JUb0hleDogZnVuY3Rpb24gKHIsIGcsIGIpIHtcbiAgICAgICAgcmV0dXJuICgoMSA8PCAyNCkgKyAociA8PCAxNikgKyAoZyA8PCA4KSArIGIpLnRvU3RyaW5nKDE2KS5zbGljZSgxKTtcbiAgICB9LFxuICAgIF9oZXhUb1JnYjogZnVuY3Rpb24gKGhleCkge1xuICAgICAgICBoZXggPSBoZXgucmVwbGFjZShIQVNILCBFTVBUWV9TVFJJTkcpO1xuICAgICAgICB2YXIgYmlnaW50ID0gcGFyc2VJbnQoaGV4LCAxNik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiAoYmlnaW50ID4+IDE2KSAmIDI1NSxcbiAgICAgICAgICAgIGc6IChiaWdpbnQgPj4gOCkgJiAyNTUsXG4gICAgICAgICAgICBiOiBiaWdpbnQgJiAyNTVcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldFJhbmRvbUNvbG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByYW5kQ29sb3IgPSAoKE1hdGgucmFuZG9tKCkgKiAweGZmZmZmZikgPDwgMCkudG9TdHJpbmcoMTYpO1xuICAgICAgICB3aGlsZSAocmFuZENvbG9yLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgICAgIHJhbmRDb2xvciA9IFpFUk8gKyByYW5kQ29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEhBU0ggKyByYW5kQ29sb3I7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uICh2YWwsIGRlZikge1xuICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWY7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRSR0I6IGZ1bmN0aW9uIChjb2xvcikge1xuICAgICAgICB2YXIgcmdiO1xuICAgICAgICBpZiAoY29sb3IgaW4gQ09MT1JTKSB7XG4gICAgICAgICAgICByZ2IgPSBDT0xPUlNbY29sb3JdO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByOiByZ2JbMF0sXG4gICAgICAgICAgICAgICAgZzogcmdiWzFdLFxuICAgICAgICAgICAgICAgIGI6IHJnYlsyXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2xvclswXSA9PT0gSEFTSCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hleFRvUmdiKGNvbG9yLnN1YnN0cmluZygxKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29sb3Iuc3Vic3RyKDAsIDQpID09PSBSR0JfUEFSRU4pIHtcbiAgICAgICAgICAgIHJnYiA9IFJHQl9SRUdFWC5leGVjKGNvbG9yLnJlcGxhY2UoLyAvZywgJycpKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcjogcGFyc2VJbnQocmdiWzFdLCAxMCksXG4gICAgICAgICAgICAgICAgZzogcGFyc2VJbnQocmdiWzJdLCAxMCksXG4gICAgICAgICAgICAgICAgYjogcGFyc2VJbnQocmdiWzNdLCAxMClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IDAsXG4gICAgICAgICAgICAgICAgZzogMCxcbiAgICAgICAgICAgICAgICBiOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjb2xvclRvUkdCQTogZnVuY3Rpb24gKHN0cikge1xuICAgICAgICBzdHIgPSBzdHIgfHwgJ2JsYWNrJztcbiAgICAgICAgcmV0dXJuIChleHBvcnRzLlV0aWwuX25hbWVkQ29sb3JUb1JCQShzdHIpIHx8XG4gICAgICAgICAgICBleHBvcnRzLlV0aWwuX2hleDNDb2xvclRvUkdCQShzdHIpIHx8XG4gICAgICAgICAgICBleHBvcnRzLlV0aWwuX2hleDZDb2xvclRvUkdCQShzdHIpIHx8XG4gICAgICAgICAgICBleHBvcnRzLlV0aWwuX3JnYkNvbG9yVG9SR0JBKHN0cikgfHxcbiAgICAgICAgICAgIGV4cG9ydHMuVXRpbC5fcmdiYUNvbG9yVG9SR0JBKHN0cikpO1xuICAgIH0sXG4gICAgX25hbWVkQ29sb3JUb1JCQTogZnVuY3Rpb24gKHN0cikge1xuICAgICAgICB2YXIgYyA9IENPTE9SU1tzdHIudG9Mb3dlckNhc2UoKV07XG4gICAgICAgIGlmICghYykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHI6IGNbMF0sXG4gICAgICAgICAgICBnOiBjWzFdLFxuICAgICAgICAgICAgYjogY1syXSxcbiAgICAgICAgICAgIGE6IDFcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIF9yZ2JDb2xvclRvUkdCQTogZnVuY3Rpb24gKHN0cikge1xuICAgICAgICBpZiAoc3RyLmluZGV4T2YoJ3JnYignKSA9PT0gMCkge1xuICAgICAgICAgICAgc3RyID0gc3RyLm1hdGNoKC9yZ2JcXCgoW14pXSspXFwpLylbMV07XG4gICAgICAgICAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyAqLCAqLykubWFwKE51bWJlcik7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IHBhcnRzWzBdLFxuICAgICAgICAgICAgICAgIGc6IHBhcnRzWzFdLFxuICAgICAgICAgICAgICAgIGI6IHBhcnRzWzJdLFxuICAgICAgICAgICAgICAgIGE6IDFcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9yZ2JhQ29sb3JUb1JHQkE6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgaWYgKHN0ci5pbmRleE9mKCdyZ2JhKCcpID09PSAwKSB7XG4gICAgICAgICAgICBzdHIgPSBzdHIubWF0Y2goL3JnYmFcXCgoW14pXSspXFwpLylbMV07XG4gICAgICAgICAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyAqLCAqLykubWFwKE51bWJlcik7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IHBhcnRzWzBdLFxuICAgICAgICAgICAgICAgIGc6IHBhcnRzWzFdLFxuICAgICAgICAgICAgICAgIGI6IHBhcnRzWzJdLFxuICAgICAgICAgICAgICAgIGE6IHBhcnRzWzNdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfaGV4NkNvbG9yVG9SR0JBOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIGlmIChzdHJbMF0gPT09ICcjJyAmJiBzdHIubGVuZ3RoID09PSA3KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IHBhcnNlSW50KHN0ci5zbGljZSgxLCAzKSwgMTYpLFxuICAgICAgICAgICAgICAgIGc6IHBhcnNlSW50KHN0ci5zbGljZSgzLCA1KSwgMTYpLFxuICAgICAgICAgICAgICAgIGI6IHBhcnNlSW50KHN0ci5zbGljZSg1LCA3KSwgMTYpLFxuICAgICAgICAgICAgICAgIGE6IDFcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9oZXgzQ29sb3JUb1JHQkE6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgaWYgKHN0clswXSA9PT0gJyMnICYmIHN0ci5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcjogcGFyc2VJbnQoc3RyWzFdICsgc3RyWzFdLCAxNiksXG4gICAgICAgICAgICAgICAgZzogcGFyc2VJbnQoc3RyWzJdICsgc3RyWzJdLCAxNiksXG4gICAgICAgICAgICAgICAgYjogcGFyc2VJbnQoc3RyWzNdICsgc3RyWzNdLCAxNiksXG4gICAgICAgICAgICAgICAgYTogMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaGF2ZUludGVyc2VjdGlvbjogZnVuY3Rpb24gKHIxLCByMikge1xuICAgICAgICByZXR1cm4gIShyMi54ID4gcjEueCArIHIxLndpZHRoIHx8XG4gICAgICAgICAgICByMi54ICsgcjIud2lkdGggPCByMS54IHx8XG4gICAgICAgICAgICByMi55ID4gcjEueSArIHIxLmhlaWdodCB8fFxuICAgICAgICAgICAgcjIueSArIHIyLmhlaWdodCA8IHIxLnkpO1xuICAgIH0sXG4gICAgY2xvbmVPYmplY3Q6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgdmFyIHJldE9iaiA9IHt9O1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNQbGFpbk9iamVjdChvYmpba2V5XSkpIHtcbiAgICAgICAgICAgICAgICByZXRPYmpba2V5XSA9IHRoaXMuY2xvbmVPYmplY3Qob2JqW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5faXNBcnJheShvYmpba2V5XSkpIHtcbiAgICAgICAgICAgICAgICByZXRPYmpba2V5XSA9IHRoaXMuY2xvbmVBcnJheShvYmpba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRPYmpba2V5XSA9IG9ialtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXRPYmo7XG4gICAgfSxcbiAgICBjbG9uZUFycmF5OiBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgIHJldHVybiBhcnIuc2xpY2UoMCk7XG4gICAgfSxcbiAgICBfZGVnVG9SYWQ6IGZ1bmN0aW9uIChkZWcpIHtcbiAgICAgICAgcmV0dXJuIGRlZyAqIFBJX09WRVJfREVHMTgwO1xuICAgIH0sXG4gICAgX3JhZFRvRGVnOiBmdW5jdGlvbiAocmFkKSB7XG4gICAgICAgIHJldHVybiByYWQgKiBERUcxODBfT1ZFUl9QSTtcbiAgICB9LFxuICAgIF9jYXBpdGFsaXplOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG4gICAgfSxcbiAgICB0aHJvdzogZnVuY3Rpb24gKHN0cikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoS09OVkFfRVJST1IgKyBzdHIpO1xuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihLT05WQV9FUlJPUiArIHN0cik7XG4gICAgfSxcbiAgICB3YXJuOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIGlmICghR2xvYmFsXzEuS29udmEuc2hvd1dhcm5pbmdzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS53YXJuKEtPTlZBX1dBUk5JTkcgKyBzdHIpO1xuICAgIH0sXG4gICAgZXh0ZW5kOiBmdW5jdGlvbiAoY2hpbGQsIHBhcmVudCkge1xuICAgICAgICBmdW5jdGlvbiBDdG9yKCkge1xuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkO1xuICAgICAgICB9XG4gICAgICAgIEN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTtcbiAgICAgICAgdmFyIG9sZFByb3RvID0gY2hpbGQucHJvdG90eXBlO1xuICAgICAgICBjaGlsZC5wcm90b3R5cGUgPSBuZXcgQ3RvcigpO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2xkUHJvdG8pIHtcbiAgICAgICAgICAgIGlmIChvbGRQcm90by5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQucHJvdG90eXBlW2tleV0gPSBvbGRQcm90b1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7XG4gICAgICAgIGNoaWxkLnN1cGVyID0gcGFyZW50O1xuICAgIH0sXG4gICAgX2dldENvbnRyb2xQb2ludHM6IGZ1bmN0aW9uICh4MCwgeTAsIHgxLCB5MSwgeDIsIHkyLCB0KSB7XG4gICAgICAgIHZhciBkMDEgPSBNYXRoLnNxcnQoTWF0aC5wb3coeDEgLSB4MCwgMikgKyBNYXRoLnBvdyh5MSAtIHkwLCAyKSksIGQxMiA9IE1hdGguc3FydChNYXRoLnBvdyh4MiAtIHgxLCAyKSArIE1hdGgucG93KHkyIC0geTEsIDIpKSwgZmEgPSAodCAqIGQwMSkgLyAoZDAxICsgZDEyKSwgZmIgPSAodCAqIGQxMikgLyAoZDAxICsgZDEyKSwgcDF4ID0geDEgLSBmYSAqICh4MiAtIHgwKSwgcDF5ID0geTEgLSBmYSAqICh5MiAtIHkwKSwgcDJ4ID0geDEgKyBmYiAqICh4MiAtIHgwKSwgcDJ5ID0geTEgKyBmYiAqICh5MiAtIHkwKTtcbiAgICAgICAgcmV0dXJuIFtwMXgsIHAxeSwgcDJ4LCBwMnldO1xuICAgIH0sXG4gICAgX2V4cGFuZFBvaW50czogZnVuY3Rpb24gKHAsIHRlbnNpb24pIHtcbiAgICAgICAgdmFyIGxlbiA9IHAubGVuZ3RoLCBhbGxQb2ludHMgPSBbXSwgbiwgY3A7XG4gICAgICAgIGZvciAobiA9IDI7IG4gPCBsZW4gLSAyOyBuICs9IDIpIHtcbiAgICAgICAgICAgIGNwID0gZXhwb3J0cy5VdGlsLl9nZXRDb250cm9sUG9pbnRzKHBbbiAtIDJdLCBwW24gLSAxXSwgcFtuXSwgcFtuICsgMV0sIHBbbiArIDJdLCBwW24gKyAzXSwgdGVuc2lvbik7XG4gICAgICAgICAgICBhbGxQb2ludHMucHVzaChjcFswXSk7XG4gICAgICAgICAgICBhbGxQb2ludHMucHVzaChjcFsxXSk7XG4gICAgICAgICAgICBhbGxQb2ludHMucHVzaChwW25dKTtcbiAgICAgICAgICAgIGFsbFBvaW50cy5wdXNoKHBbbiArIDFdKTtcbiAgICAgICAgICAgIGFsbFBvaW50cy5wdXNoKGNwWzJdKTtcbiAgICAgICAgICAgIGFsbFBvaW50cy5wdXNoKGNwWzNdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWxsUG9pbnRzO1xuICAgIH0sXG4gICAgZWFjaDogZnVuY3Rpb24gKG9iaiwgZnVuYykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBmdW5jKGtleSwgb2JqW2tleV0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfaW5SYW5nZTogZnVuY3Rpb24gKHZhbCwgbGVmdCwgcmlnaHQpIHtcbiAgICAgICAgcmV0dXJuIGxlZnQgPD0gdmFsICYmIHZhbCA8IHJpZ2h0O1xuICAgIH0sXG4gICAgX2dldFByb2plY3Rpb25Ub1NlZ21lbnQ6IGZ1bmN0aW9uICh4MSwgeTEsIHgyLCB5MiwgeDMsIHkzKSB7XG4gICAgICAgIHZhciB4LCB5LCBkaXN0O1xuICAgICAgICB2YXIgcGQyID0gKHgxIC0geDIpICogKHgxIC0geDIpICsgKHkxIC0geTIpICogKHkxIC0geTIpO1xuICAgICAgICBpZiAocGQyID09IDApIHtcbiAgICAgICAgICAgIHggPSB4MTtcbiAgICAgICAgICAgIHkgPSB5MTtcbiAgICAgICAgICAgIGRpc3QgPSAoeDMgLSB4MikgKiAoeDMgLSB4MikgKyAoeTMgLSB5MikgKiAoeTMgLSB5Mik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgdSA9ICgoeDMgLSB4MSkgKiAoeDIgLSB4MSkgKyAoeTMgLSB5MSkgKiAoeTIgLSB5MSkpIC8gcGQyO1xuICAgICAgICAgICAgaWYgKHUgPCAwKSB7XG4gICAgICAgICAgICAgICAgeCA9IHgxO1xuICAgICAgICAgICAgICAgIHkgPSB5MTtcbiAgICAgICAgICAgICAgICBkaXN0ID0gKHgxIC0geDMpICogKHgxIC0geDMpICsgKHkxIC0geTMpICogKHkxIC0geTMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodSA+IDEuMCkge1xuICAgICAgICAgICAgICAgIHggPSB4MjtcbiAgICAgICAgICAgICAgICB5ID0geTI7XG4gICAgICAgICAgICAgICAgZGlzdCA9ICh4MiAtIHgzKSAqICh4MiAtIHgzKSArICh5MiAtIHkzKSAqICh5MiAtIHkzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHggPSB4MSArIHUgKiAoeDIgLSB4MSk7XG4gICAgICAgICAgICAgICAgeSA9IHkxICsgdSAqICh5MiAtIHkxKTtcbiAgICAgICAgICAgICAgICBkaXN0ID0gKHggLSB4MykgKiAoeCAtIHgzKSArICh5IC0geTMpICogKHkgLSB5Myk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt4LCB5LCBkaXN0XTtcbiAgICB9LFxuICAgIF9nZXRQcm9qZWN0aW9uVG9MaW5lOiBmdW5jdGlvbiAocHQsIGxpbmUsIGlzQ2xvc2VkKSB7XG4gICAgICAgIHZhciBwYyA9IGV4cG9ydHMuVXRpbC5jbG9uZU9iamVjdChwdCk7XG4gICAgICAgIHZhciBkaXN0ID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgbGluZS5mb3JFYWNoKGZ1bmN0aW9uIChwMSwgaSkge1xuICAgICAgICAgICAgaWYgKCFpc0Nsb3NlZCAmJiBpID09PSBsaW5lLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcDIgPSBsaW5lWyhpICsgMSkgJSBsaW5lLmxlbmd0aF07XG4gICAgICAgICAgICB2YXIgcHJvaiA9IGV4cG9ydHMuVXRpbC5fZ2V0UHJvamVjdGlvblRvU2VnbWVudChwMS54LCBwMS55LCBwMi54LCBwMi55LCBwdC54LCBwdC55KTtcbiAgICAgICAgICAgIHZhciBweCA9IHByb2pbMF0sIHB5ID0gcHJvalsxXSwgcGRpc3QgPSBwcm9qWzJdO1xuICAgICAgICAgICAgaWYgKHBkaXN0IDwgZGlzdCkge1xuICAgICAgICAgICAgICAgIHBjLnggPSBweDtcbiAgICAgICAgICAgICAgICBwYy55ID0gcHk7XG4gICAgICAgICAgICAgICAgZGlzdCA9IHBkaXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBjO1xuICAgIH0sXG4gICAgX3ByZXBhcmVBcnJheUZvclR3ZWVuOiBmdW5jdGlvbiAoc3RhcnRBcnJheSwgZW5kQXJyYXksIGlzQ2xvc2VkKSB7XG4gICAgICAgIHZhciBuLCBzdGFydCA9IFtdLCBlbmQgPSBbXTtcbiAgICAgICAgaWYgKHN0YXJ0QXJyYXkubGVuZ3RoID4gZW5kQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgdGVtcCA9IGVuZEFycmF5O1xuICAgICAgICAgICAgZW5kQXJyYXkgPSBzdGFydEFycmF5O1xuICAgICAgICAgICAgc3RhcnRBcnJheSA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChuID0gMDsgbiA8IHN0YXJ0QXJyYXkubGVuZ3RoOyBuICs9IDIpIHtcbiAgICAgICAgICAgIHN0YXJ0LnB1c2goe1xuICAgICAgICAgICAgICAgIHg6IHN0YXJ0QXJyYXlbbl0sXG4gICAgICAgICAgICAgICAgeTogc3RhcnRBcnJheVtuICsgMV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBlbmRBcnJheS5sZW5ndGg7IG4gKz0gMikge1xuICAgICAgICAgICAgZW5kLnB1c2goe1xuICAgICAgICAgICAgICAgIHg6IGVuZEFycmF5W25dLFxuICAgICAgICAgICAgICAgIHk6IGVuZEFycmF5W24gKyAxXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld1N0YXJ0ID0gW107XG4gICAgICAgIGVuZC5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICAgICAgdmFyIHByID0gZXhwb3J0cy5VdGlsLl9nZXRQcm9qZWN0aW9uVG9MaW5lKHBvaW50LCBzdGFydCwgaXNDbG9zZWQpO1xuICAgICAgICAgICAgbmV3U3RhcnQucHVzaChwci54KTtcbiAgICAgICAgICAgIG5ld1N0YXJ0LnB1c2gocHIueSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV3U3RhcnQ7XG4gICAgfSxcbiAgICBfcHJlcGFyZVRvU3RyaW5naWZ5OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHZhciBkZXNjO1xuICAgICAgICBvYmoudmlzaXRlZEJ5Q2lyY3VsYXJSZWZlcmVuY2VSZW1vdmFsID0gdHJ1ZTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKCEob2JqLmhhc093blByb3BlcnR5KGtleSkgJiYgb2JqW2tleV0gJiYgdHlwZW9mIG9ialtrZXldID09ICdvYmplY3QnKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xuICAgICAgICAgICAgaWYgKG9ialtrZXldLnZpc2l0ZWRCeUNpcmN1bGFyUmVmZXJlbmNlUmVtb3ZhbCB8fFxuICAgICAgICAgICAgICAgIGV4cG9ydHMuVXRpbC5faXNFbGVtZW50KG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgIGlmIChkZXNjLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChleHBvcnRzLlV0aWwuX3ByZXBhcmVUb1N0cmluZ2lmeShvYmpba2V5XSkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVzYy5jb25maWd1cmFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBvYmoudmlzaXRlZEJ5Q2lyY3VsYXJSZWZlcmVuY2VSZW1vdmFsO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG4gICAgX2Fzc2lnbjogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgR2xvYmFsXzEgPSByZXF1aXJlKFwiLi9HbG9iYWxcIik7XG52YXIgVXRpbF8xID0gcmVxdWlyZShcIi4vVXRpbFwiKTtcbmZ1bmN0aW9uIF9mb3JtYXRWYWx1ZSh2YWwpIHtcbiAgICBpZiAoVXRpbF8xLlV0aWwuX2lzU3RyaW5nKHZhbCkpIHtcbiAgICAgICAgcmV0dXJuICdcIicgKyB2YWwgKyAnXCInO1xuICAgIH1cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IE51bWJlcl0nKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICAgIGlmIChVdGlsXzEuVXRpbC5faXNCb29sZWFuKHZhbCkpIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpO1xufVxuZnVuY3Rpb24gUkdCQ29tcG9uZW50KHZhbCkge1xuICAgIGlmICh2YWwgPiAyNTUpIHtcbiAgICAgICAgcmV0dXJuIDI1NTtcbiAgICB9XG4gICAgZWxzZSBpZiAodmFsIDwgMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsKTtcbn1cbmV4cG9ydHMuUkdCQ29tcG9uZW50ID0gUkdCQ29tcG9uZW50O1xuZnVuY3Rpb24gYWxwaGFDb21wb25lbnQodmFsKSB7XG4gICAgaWYgKHZhbCA+IDEpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIGVsc2UgaWYgKHZhbCA8IDAuMDAwMSkge1xuICAgICAgICByZXR1cm4gMC4wMDAxO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xufVxuZXhwb3J0cy5hbHBoYUNvbXBvbmVudCA9IGFscGhhQ29tcG9uZW50O1xuZnVuY3Rpb24gZ2V0TnVtYmVyVmFsaWRhdG9yKCkge1xuICAgIGlmIChHbG9iYWxfMS5Lb252YS5pc1VubWluaWZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIGF0dHIpIHtcbiAgICAgICAgICAgIGlmICghVXRpbF8xLlV0aWwuX2lzTnVtYmVyKHZhbCkpIHtcbiAgICAgICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKF9mb3JtYXRWYWx1ZSh2YWwpICtcbiAgICAgICAgICAgICAgICAgICAgJyBpcyBhIG5vdCB2YWxpZCB2YWx1ZSBmb3IgXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ciArXG4gICAgICAgICAgICAgICAgICAgICdcIiBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBzaG91bGQgYmUgYSBudW1iZXIuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0TnVtYmVyVmFsaWRhdG9yID0gZ2V0TnVtYmVyVmFsaWRhdG9yO1xuZnVuY3Rpb24gZ2V0TnVtYmVyT3JBdXRvVmFsaWRhdG9yKCkge1xuICAgIGlmIChHbG9iYWxfMS5Lb252YS5pc1VubWluaWZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIGF0dHIpIHtcbiAgICAgICAgICAgIHZhciBpc051bWJlciA9IFV0aWxfMS5VdGlsLl9pc051bWJlcih2YWwpO1xuICAgICAgICAgICAgdmFyIGlzQXV0byA9IHZhbCA9PT0gJ2F1dG8nO1xuICAgICAgICAgICAgaWYgKCEoaXNOdW1iZXIgfHwgaXNBdXRvKSkge1xuICAgICAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oX2Zvcm1hdFZhbHVlKHZhbCkgK1xuICAgICAgICAgICAgICAgICAgICAnIGlzIGEgbm90IHZhbGlkIHZhbHVlIGZvciBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRyICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGF0dHJpYnV0ZS4gVGhlIHZhbHVlIHNob3VsZCBiZSBhIG51bWJlciBvciBcImF1dG9cIi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5nZXROdW1iZXJPckF1dG9WYWxpZGF0b3IgPSBnZXROdW1iZXJPckF1dG9WYWxpZGF0b3I7XG5mdW5jdGlvbiBnZXRTdHJpbmdWYWxpZGF0b3IoKSB7XG4gICAgaWYgKEdsb2JhbF8xLktvbnZhLmlzVW5taW5pZmllZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCwgYXR0cikge1xuICAgICAgICAgICAgaWYgKCFVdGlsXzEuVXRpbC5faXNTdHJpbmcodmFsKSkge1xuICAgICAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oX2Zvcm1hdFZhbHVlKHZhbCkgK1xuICAgICAgICAgICAgICAgICAgICAnIGlzIGEgbm90IHZhbGlkIHZhbHVlIGZvciBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRyICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGF0dHJpYnV0ZS4gVGhlIHZhbHVlIHNob3VsZCBiZSBhIHN0cmluZy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5nZXRTdHJpbmdWYWxpZGF0b3IgPSBnZXRTdHJpbmdWYWxpZGF0b3I7XG5mdW5jdGlvbiBnZXRGdW5jdGlvblZhbGlkYXRvcigpIHtcbiAgICBpZiAoR2xvYmFsXzEuS29udmEuaXNVbm1pbmlmaWVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgICBpZiAoIVV0aWxfMS5VdGlsLl9pc0Z1bmN0aW9uKHZhbCkpIHtcbiAgICAgICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKF9mb3JtYXRWYWx1ZSh2YWwpICtcbiAgICAgICAgICAgICAgICAgICAgJyBpcyBhIG5vdCB2YWxpZCB2YWx1ZSBmb3IgXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ciArXG4gICAgICAgICAgICAgICAgICAgICdcIiBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5nZXRGdW5jdGlvblZhbGlkYXRvciA9IGdldEZ1bmN0aW9uVmFsaWRhdG9yO1xuZnVuY3Rpb24gZ2V0TnVtYmVyQXJyYXlWYWxpZGF0b3IoKSB7XG4gICAgaWYgKEdsb2JhbF8xLktvbnZhLmlzVW5taW5pZmllZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCwgYXR0cikge1xuICAgICAgICAgICAgaWYgKCFVdGlsXzEuVXRpbC5faXNBcnJheSh2YWwpKSB7XG4gICAgICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybihfZm9ybWF0VmFsdWUodmFsKSArXG4gICAgICAgICAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgc2hvdWxkIGJlIGEgYXJyYXkgb2YgbnVtYmVycy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghVXRpbF8xLlV0aWwuX2lzTnVtYmVyKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdcIicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIiBhdHRyaWJ1dGUgaGFzIG5vbiBudW1lcmljIGVsZW1lbnQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy4gTWFrZSBzdXJlIHRoYXQgYWxsIGVsZW1lbnRzIGFyZSBudW1iZXJzLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0TnVtYmVyQXJyYXlWYWxpZGF0b3IgPSBnZXROdW1iZXJBcnJheVZhbGlkYXRvcjtcbmZ1bmN0aW9uIGdldEJvb2xlYW5WYWxpZGF0b3IoKSB7XG4gICAgaWYgKEdsb2JhbF8xLktvbnZhLmlzVW5taW5pZmllZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCwgYXR0cikge1xuICAgICAgICAgICAgdmFyIGlzQm9vbCA9IHZhbCA9PT0gdHJ1ZSB8fCB2YWwgPT09IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFpc0Jvb2wpIHtcbiAgICAgICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKF9mb3JtYXRWYWx1ZSh2YWwpICtcbiAgICAgICAgICAgICAgICAgICAgJyBpcyBhIG5vdCB2YWxpZCB2YWx1ZSBmb3IgXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ciArXG4gICAgICAgICAgICAgICAgICAgICdcIiBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBzaG91bGQgYmUgYSBib29sZWFuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLmdldEJvb2xlYW5WYWxpZGF0b3IgPSBnZXRCb29sZWFuVmFsaWRhdG9yO1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50VmFsaWRhdG9yKGNvbXBvbmVudHMpIHtcbiAgICBpZiAoR2xvYmFsXzEuS29udmEuaXNVbm1pbmlmaWVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgICBpZiAoIVV0aWxfMS5VdGlsLmlzT2JqZWN0KHZhbCkpIHtcbiAgICAgICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKF9mb3JtYXRWYWx1ZSh2YWwpICtcbiAgICAgICAgICAgICAgICAgICAgJyBpcyBhIG5vdCB2YWxpZCB2YWx1ZSBmb3IgXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ciArXG4gICAgICAgICAgICAgICAgICAgICdcIiBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBzaG91bGQgYmUgYW4gb2JqZWN0IHdpdGggcHJvcGVydGllcyAnICtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0Q29tcG9uZW50VmFsaWRhdG9yID0gZ2V0Q29tcG9uZW50VmFsaWRhdG9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBVdGlsXzEgPSByZXF1aXJlKFwiLi4vVXRpbFwiKTtcbnZhciBGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi4vRmFjdG9yeVwiKTtcbnZhciBTaGFwZV8xID0gcmVxdWlyZShcIi4uL1NoYXBlXCIpO1xudmFyIFZhbGlkYXRvcnNfMSA9IHJlcXVpcmUoXCIuLi9WYWxpZGF0b3JzXCIpO1xudmFyIEdsb2JhbF8xID0gcmVxdWlyZShcIi4uL0dsb2JhbFwiKTtcbnZhciBDaXJjbGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDaXJjbGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ2lyY2xlKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIENpcmNsZS5wcm90b3R5cGUuX3NjZW5lRnVuYyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuYXJjKDAsIDAsIHRoaXMucmFkaXVzKCksIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0cm9rZVNoYXBlKHRoaXMpO1xuICAgIH07XG4gICAgQ2lyY2xlLnByb3RvdHlwZS5nZXRXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFkaXVzKCkgKiAyO1xuICAgIH07XG4gICAgQ2lyY2xlLnByb3RvdHlwZS5nZXRIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhZGl1cygpICogMjtcbiAgICB9O1xuICAgIENpcmNsZS5wcm90b3R5cGUuc2V0V2lkdGggPSBmdW5jdGlvbiAod2lkdGgpIHtcbiAgICAgICAgaWYgKHRoaXMucmFkaXVzKCkgIT09IHdpZHRoIC8gMikge1xuICAgICAgICAgICAgdGhpcy5yYWRpdXMod2lkdGggLyAyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2lyY2xlLnByb3RvdHlwZS5zZXRIZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0KSB7XG4gICAgICAgIGlmICh0aGlzLnJhZGl1cygpICE9PSBoZWlnaHQgLyAyKSB7XG4gICAgICAgICAgICB0aGlzLnJhZGl1cyhoZWlnaHQgLyAyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENpcmNsZTtcbn0oU2hhcGVfMS5TaGFwZSkpO1xuZXhwb3J0cy5DaXJjbGUgPSBDaXJjbGU7XG5DaXJjbGUucHJvdG90eXBlLl9jZW50cm9pZCA9IHRydWU7XG5DaXJjbGUucHJvdG90eXBlLmNsYXNzTmFtZSA9ICdDaXJjbGUnO1xuQ2lyY2xlLnByb3RvdHlwZS5fYXR0cnNBZmZlY3RpbmdTaXplID0gWydyYWRpdXMnXTtcbkdsb2JhbF8xLl9yZWdpc3Rlck5vZGUoQ2lyY2xlKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihDaXJjbGUsICdyYWRpdXMnLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuVXRpbF8xLkNvbGxlY3Rpb24ubWFwTWV0aG9kcyhDaXJjbGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBVdGlsXzEgPSByZXF1aXJlKFwiLi4vVXRpbFwiKTtcbnZhciBGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi4vRmFjdG9yeVwiKTtcbnZhciBTaGFwZV8xID0gcmVxdWlyZShcIi4uL1NoYXBlXCIpO1xudmFyIFZhbGlkYXRvcnNfMSA9IHJlcXVpcmUoXCIuLi9WYWxpZGF0b3JzXCIpO1xudmFyIEdsb2JhbF8xID0gcmVxdWlyZShcIi4uL0dsb2JhbFwiKTtcbnZhciBSZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUmVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSZWN0KCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIFJlY3QucHJvdG90eXBlLl9zY2VuZUZ1bmMgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICB2YXIgY29ybmVyUmFkaXVzID0gdGhpcy5jb3JuZXJSYWRpdXMoKSwgd2lkdGggPSB0aGlzLndpZHRoKCksIGhlaWdodCA9IHRoaXMuaGVpZ2h0KCk7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGlmICghY29ybmVyUmFkaXVzKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb3JuZXJSYWRpdXMgPSBNYXRoLm1pbihjb3JuZXJSYWRpdXMsIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhjb3JuZXJSYWRpdXMsIDApO1xuICAgICAgICAgICAgY29udGV4dC5saW5lVG8od2lkdGggLSBjb3JuZXJSYWRpdXMsIDApO1xuICAgICAgICAgICAgY29udGV4dC5hcmMod2lkdGggLSBjb3JuZXJSYWRpdXMsIGNvcm5lclJhZGl1cywgY29ybmVyUmFkaXVzLCAoTWF0aC5QSSAqIDMpIC8gMiwgMCwgZmFsc2UpO1xuICAgICAgICAgICAgY29udGV4dC5saW5lVG8od2lkdGgsIGhlaWdodCAtIGNvcm5lclJhZGl1cyk7XG4gICAgICAgICAgICBjb250ZXh0LmFyYyh3aWR0aCAtIGNvcm5lclJhZGl1cywgaGVpZ2h0IC0gY29ybmVyUmFkaXVzLCBjb3JuZXJSYWRpdXMsIDAsIE1hdGguUEkgLyAyLCBmYWxzZSk7XG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhjb3JuZXJSYWRpdXMsIGhlaWdodCk7XG4gICAgICAgICAgICBjb250ZXh0LmFyYyhjb3JuZXJSYWRpdXMsIGhlaWdodCAtIGNvcm5lclJhZGl1cywgY29ybmVyUmFkaXVzLCBNYXRoLlBJIC8gMiwgTWF0aC5QSSwgZmFsc2UpO1xuICAgICAgICAgICAgY29udGV4dC5saW5lVG8oMCwgY29ybmVyUmFkaXVzKTtcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKGNvcm5lclJhZGl1cywgY29ybmVyUmFkaXVzLCBjb3JuZXJSYWRpdXMsIE1hdGguUEksIChNYXRoLlBJICogMykgLyAyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3Ryb2tlU2hhcGUodGhpcyk7XG4gICAgfTtcbiAgICByZXR1cm4gUmVjdDtcbn0oU2hhcGVfMS5TaGFwZSkpO1xuZXhwb3J0cy5SZWN0ID0gUmVjdDtcblJlY3QucHJvdG90eXBlLmNsYXNzTmFtZSA9ICdSZWN0Jztcbkdsb2JhbF8xLl9yZWdpc3Rlck5vZGUoUmVjdCk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoUmVjdCwgJ2Nvcm5lclJhZGl1cycsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5VdGlsXzEuQ29sbGVjdGlvbi5tYXBNZXRob2RzKFJlY3QpO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcbiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBub3cgPSByZXF1aXJlKCcuL25vdycpLFxuICAgIHRvTnVtYmVyID0gcmVxdWlyZSgnLi90b051bWJlcicpO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgdGltZVdhaXRpbmcgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nXG4gICAgICA/IG5hdGl2ZU1pbih0aW1lV2FpdGluZywgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpXG4gICAgICA6IHRpbWVXYWl0aW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgICAgIHJldHVybiBpbnZva2VGdW5jKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZGVib3VuY2VkLmNhbmNlbCA9IGNhbmNlbDtcbiAgZGVib3VuY2VkLmZsdXNoID0gZmx1c2g7XG4gIHJldHVybiBkZWJvdW5jZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N5bWJvbDtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5vdztcbiIsInZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJy4vZGVib3VuY2UnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgdGhyb3R0bGVkIGZ1bmN0aW9uIHRoYXQgb25seSBpbnZva2VzIGBmdW5jYCBhdCBtb3N0IG9uY2UgcGVyXG4gKiBldmVyeSBgd2FpdGAgbWlsbGlzZWNvbmRzLiBUaGUgdGhyb3R0bGVkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYFxuICogbWV0aG9kIHRvIGNhbmNlbCBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0b1xuICogaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgXG4gKiBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGUgbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgXG4gKiB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWQgd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlXG4gKiB0aHJvdHRsZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnQgY2FsbHMgdG8gdGhlIHRocm90dGxlZCBmdW5jdGlvbiByZXR1cm4gdGhlXG4gKiByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8udGhyb3R0bGVgIGFuZCBgXy5kZWJvdW5jZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB0aHJvdHRsZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB0aHJvdHRsZSBpbnZvY2F0aW9ucyB0by5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyB0aHJvdHRsZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGV4Y2Vzc2l2ZWx5IHVwZGF0aW5nIHRoZSBwb3NpdGlvbiB3aGlsZSBzY3JvbGxpbmcuXG4gKiBqUXVlcnkod2luZG93KS5vbignc2Nyb2xsJywgXy50aHJvdHRsZSh1cGRhdGVQb3NpdGlvbiwgMTAwKSk7XG4gKlxuICogLy8gSW52b2tlIGByZW5ld1Rva2VuYCB3aGVuIHRoZSBjbGljayBldmVudCBpcyBmaXJlZCwgYnV0IG5vdCBtb3JlIHRoYW4gb25jZSBldmVyeSA1IG1pbnV0ZXMuXG4gKiB2YXIgdGhyb3R0bGVkID0gXy50aHJvdHRsZShyZW5ld1Rva2VuLCAzMDAwMDAsIHsgJ3RyYWlsaW5nJzogZmFsc2UgfSk7XG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgdGhyb3R0bGVkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIHRocm90dGxlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgdGhyb3R0bGVkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxlYWRpbmcgPSB0cnVlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAnbGVhZGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy5sZWFkaW5nIDogbGVhZGluZztcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG4gIHJldHVybiBkZWJvdW5jZShmdW5jLCB3YWl0LCB7XG4gICAgJ2xlYWRpbmcnOiBsZWFkaW5nLFxuICAgICdtYXhXYWl0Jzogd2FpdCxcbiAgICAndHJhaWxpbmcnOiB0cmFpbGluZ1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aHJvdHRsZTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvTnVtYmVyO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiaW1wb3J0IHtTdGFnZX0gZnJvbSAna29udmEvbGliL1N0YWdlJztcbmltcG9ydCB7TGF5ZXJ9IGZyb20gJ2tvbnZhL2xpYi9MYXllcic7XG5pbXBvcnQge1JlY3R9IGZyb20gJ2tvbnZhL2xpYi9zaGFwZXMvUmVjdCc7XG5pbXBvcnQge0NpcmNsZX0gZnJvbSAna29udmEvbGliL3NoYXBlcy9DaXJjbGUnO1xuaW1wb3J0IHtUd2VlbiwgRWFzaW5nc30gZnJvbSAna29udmEvbGliL1R3ZWVuJztcbmltcG9ydCB0aHJvdHRsZSBmcm9tICdsb2Rhc2gvdGhyb3R0bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWNrZ3JvdW5kRG90cyB7XG4gIHN0YXRpYyBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDEpJyxcbiAgICBkb3RDb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC41KScsXG4gICAgZ3V0dGVyOiAzMCxcbiAgICByYWRpdXM6IDEsXG4gICAgYnViYmxlUmFkaXVzOiAzMDAsXG4gICAgbWFnbmV0aWNQb3dlcjogMC4xNSxcbiAgICBvcGFjaXR5OiAwLjUsXG4gICAgZGVidWc6IGZhbHNlXG4gIH07XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmlzTW91c2VPdmVyID0gZmFsc2U7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgLi4uQmFja2dyb3VuZERvdHMuZGVmYXVsdE9wdGlvbnMsXG4gICAgICAuLi5vcHRpb25zXG4gICAgfTtcbiAgICB0aGlzLmdyaWQgPSBbXTtcblxuICAgIHRoaXMuc3RhZ2UgPSBuZXcgU3RhZ2Uoe1xuICAgICAgY29udGFpbmVyOiB0aGlzLmVsZW1lbnQsXG4gICAgICB3aWR0aDogdGhpcy5lbGVtZW50Lm9mZnNldFdpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0XG4gICAgfSk7XG5cbiAgICB0aGlzLmxheWVyID0gbmV3IExheWVyKCk7XG4gICAgdGhpcy5zdGFnZS5hZGQodGhpcy5sYXllcik7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhyb3R0bGUodGhpcy5fcmVzaXplSGFuZGxlci5iaW5kKHRoaXMpLCAxNTApKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fbW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5fZG9jdW1lbnRNb3VzZU91dEhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fZHJhd0hlbHBlcnMoKTtcblxuICAgIHRoaXMuX2RyYXcoKTtcbiAgfVxuXG4gIF9kcmF3KCkge1xuICAgIHRoaXMuX2RyYXdCYWNrZ3JvdW5kKCk7XG4gICAgdGhpcy5fZHJhd0dyaWQoKTtcbiAgICB0aGlzLl9yZWRyYXcoKTtcbiAgfVxuXG4gIF9kcmF3SGVscGVycygpIHtcbiAgICB0aGlzLmhlbHBlciA9IG5ldyBDaXJjbGUoe1xuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgICByYWRpdXM6IDIsXG4gICAgICBmaWxsOiAnI2ZmMDAwMCdcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcpIHtcbiAgICAgIHRoaXMubGF5ZXIuYWRkKHRoaXMuaGVscGVyKTtcbiAgICB9XG4gIH1cblxuICBfZHJhd0JhY2tncm91bmQoKSB7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IFJlY3Qoe1xuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgICB3aWR0aDogdGhpcy5zdGFnZS53aWR0aCgpLFxuICAgICAgaGVpZ2h0OiB0aGlzLnN0YWdlLmhlaWdodCgpLFxuICAgICAgZmlsbDogdGhpcy5vcHRpb25zLmJhY2tncm91bmRDb2xvclxuICAgIH0pO1xuXG4gICAgdGhpcy5sYXllci5hZGQodGhpcy5iYWNrZ3JvdW5kKTtcbiAgfVxuXG4gIF9kcmF3R3JpZCgpIHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuc3RhZ2Uud2lkdGgoKTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnN0YWdlLmhlaWdodCgpO1xuICAgIGNvbnN0IHtndXR0ZXIsIHJhZGl1cywgZG90Q29sb3J9ID0gdGhpcy5vcHRpb25zO1xuICAgIGNvbnN0IHhDb3VudCA9IE1hdGgucm91bmQod2lkdGggLyB0aGlzLm9wdGlvbnMuZ3V0dGVyKTtcbiAgICBjb25zdCB5Q291bnQgPSBNYXRoLnJvdW5kKGhlaWdodCAvIHRoaXMub3B0aW9ucy5ndXR0ZXIpO1xuXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmdyaWQubGVuZ3RoOyB5KyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZFt5XTtcblxuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCByb3cubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgY29uc3QgY2lyY2xlID0gcm93W3hdO1xuXG4gICAgICAgIGNpcmNsZS5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5ncmlkID0gW107XG5cbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSB5Q291bnQ7IHkrKykge1xuICAgICAgY29uc3Qgcm93ID0gW107XG5cbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDw9IHhDb3VudDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IGNpcmNsZVggPSB4ICogZ3V0dGVyO1xuICAgICAgICBjb25zdCBjaXJjbGVZID0geSAqIGd1dHRlcjtcblxuICAgICAgICBjb25zdCBjaXJjbGUgPSBuZXcgQ2lyY2xlKHtcbiAgICAgICAgICB4OiBjaXJjbGVYLFxuICAgICAgICAgIHk6IGNpcmNsZVksXG4gICAgICAgICAgcmFkaXVzLFxuICAgICAgICAgIGZpbGw6IGRvdENvbG9yLFxuICAgICAgICAgIG9wYWNpdHk6IHRoaXMub3B0aW9ucy5vcGFjaXR5XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNpcmNsZS5iYXNlWCA9IGNpcmNsZVg7XG4gICAgICAgIGNpcmNsZS5iYXNlWSA9IGNpcmNsZVk7XG5cbiAgICAgICAgdGhpcy5sYXllci5hZGQoY2lyY2xlKTtcbiAgICAgICAgcm93LnB1c2goY2lyY2xlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZ3JpZC5wdXNoKHJvdyk7XG4gICAgfVxuICB9XG5cbiAgX3JlZHJhdygpIHtcbiAgICB0aGlzLmxheWVyLmJhdGNoRHJhdygpO1xuICB9XG5cbiAgX3Jlc2l6ZUhhbmRsZXIoKSB7XG4gICAgY29uc3Qge3N0YWdlLCBlbGVtZW50fSA9IHRoaXM7XG5cbiAgICBzdGFnZS53aWR0aChlbGVtZW50Lm9mZnNldFdpZHRoKTtcbiAgICBzdGFnZS5oZWlnaHQoZWxlbWVudC5vZmZzZXRIZWlnaHQpO1xuXG4gICAgdGhpcy5fZHJhdygpO1xuICB9XG5cbiAgX21vdXNlTW92ZUhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zdCB7Y2xpZW50WCwgY2xpZW50WX0gPSBldmVudDtcblxuICAgIGlmICghdGhpcy5faXNPdmVyU3RhZ2UoY2xpZW50WCwgY2xpZW50WSkpIHtcbiAgICAgIGlmICh0aGlzLmlzTW91c2VPdmVyKSB7XG4gICAgICAgIHRoaXMuX2NsZWFuKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmlzTW91c2VPdmVyID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5pc01vdXNlT3ZlciA9IHRydWU7XG5cbiAgICBjb25zdCB7eCwgeX0gPSB0aGlzLl9nZXRHcmlkQ29vcmRpbmF0ZXMoY2xpZW50WCwgY2xpZW50WSk7XG5cbiAgICB0aGlzLmhlbHBlci54KHggKiB0aGlzLm9wdGlvbnMuZ3V0dGVyKTtcbiAgICB0aGlzLmhlbHBlci55KHkgKiB0aGlzLm9wdGlvbnMuZ3V0dGVyKTtcblxuICAgIHRoaXMuX3VwZGF0ZUNpcmNsZXNBcm91bmQoY2xpZW50WCwgY2xpZW50WSk7XG5cbiAgICB0aGlzLl9yZWRyYXcoKTtcbiAgfVxuXG4gIF9kb2N1bWVudE1vdXNlT3V0SGFuZGxlcigpIHtcbiAgICB0aGlzLl9jbGVhbigpO1xuICB9XG5cbiAgX2lzT3ZlclN0YWdlKHgsIHkpIHtcbiAgICBjb25zdCBjbGllbnRSZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgcmV0dXJuIChjbGllbnRSZWN0LnRvcCA8PSB5ICYmIGNsaWVudFJlY3QuYm90dG9tID49IHkgJiYgY2xpZW50UmVjdC5sZWZ0IDw9IHggJiYgY2xpZW50UmVjdC5yaWdodCA+PSB4KTtcbiAgfVxuXG4gIF9nZXRHcmlkQ29vcmRpbmF0ZXMoeCwgeSkge1xuICAgIGNvbnN0IHtndXR0ZXJ9ID0gdGhpcy5vcHRpb25zO1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5zdGFnZS53aWR0aCgpO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuc3RhZ2UuaGVpZ2h0KCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogTWF0aC5yb3VuZCh4IC8gd2lkdGggKiB3aWR0aCAvIGd1dHRlciksXG4gICAgICB5OiBNYXRoLnJvdW5kKHkgLyBoZWlnaHQgKiBoZWlnaHQgLyBndXR0ZXIpXG4gICAgfTtcbiAgfVxuXG4gIF91cGRhdGVDaXJjbGVzQXJvdW5kKGNlbnRlclgsIGNlbnRlclkpIHtcbiAgICAvLyBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCB7YnViYmxlUmFkaXVzfSA9IHRoaXMub3B0aW9ucztcblxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5ncmlkLmxlbmd0aDsgeSsrKSB7XG4gICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRbeV07XG5cbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgcm93Lmxlbmd0aDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IGNpcmNsZSA9IHJvd1t4XTtcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coY2lyY2xlLngoKSAtIGNlbnRlclgsIDIpICsgTWF0aC5wb3coY2lyY2xlLnkoKSAtIGNlbnRlclksIDIpKTtcblxuICAgICAgICBpZiAoZGlzdGFuY2UgPD0gYnViYmxlUmFkaXVzKSB7XG4gICAgICAgICAgdGhpcy5fdXBkYXRlQ2lyY2xlQnlEaXN0YW5jZShjaXJjbGUsIGRpc3RhbmNlLCBjZW50ZXJYLCBjZW50ZXJZKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9jbGVhbkNpcmNsZShjaXJjbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3VwZGF0ZUNpcmNsZUJ5RGlzdGFuY2UoY2lyY2xlLCBkaXN0YW5jZSwgY2VudGVyWCwgY2VudGVyWSkge1xuICAgIGNvbnN0IGRpc3RhbmNlSW5kZXggPSBNYXRoLnBvdygxIC0gZGlzdGFuY2UgLyB0aGlzLm9wdGlvbnMuYnViYmxlUmFkaXVzLCAzKTtcbiAgICBjb25zdCB4ID0gY2lyY2xlLmJhc2VYO1xuICAgIGNvbnN0IHkgPSBjaXJjbGUuYmFzZVk7XG4gICAgY29uc3Qge21hZ25ldGljUG93ZXJ9ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgY2lyY2xlLm9wYWNpdHkodGhpcy5vcHRpb25zLm9wYWNpdHkgKiAoMSArIGRpc3RhbmNlSW5kZXgpKTtcbiAgICBjaXJjbGUueCh4ICsgKGNlbnRlclggLSB4KSAqIGRpc3RhbmNlSW5kZXggKiBtYWduZXRpY1Bvd2VyKTtcbiAgICBjaXJjbGUueSh5ICsgKGNlbnRlclkgLSB5KSAqIGRpc3RhbmNlSW5kZXggKiBtYWduZXRpY1Bvd2VyKTtcbiAgfVxuXG4gIF9jbGVhbkNpcmNsZShjaXJjbGUsIHdpdGhBbmltYXRpb24gPSBmYWxzZSkge1xuICAgIGlmIChjaXJjbGUudHdlZW4pIHtcbiAgICAgIGNpcmNsZS50d2Vlbi5kZXN0cm95KCk7XG4gICAgICBjaXJjbGUudHdlZW4gPSBudWxsO1xuICAgIH1cbiAgICBpZiAoIXdpdGhBbmltYXRpb24pIHtcbiAgICAgIGNpcmNsZS5vcGFjaXR5KHRoaXMub3B0aW9ucy5vcGFjaXR5KTtcbiAgICAgIGNpcmNsZS54KGNpcmNsZS5iYXNlWCk7XG4gICAgICBjaXJjbGUueShjaXJjbGUuYmFzZVkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY2lyY2xlLm9wYWNpdHkoKSAhPT0gdGhpcy5vcHRpb25zLm9wYWNpdHkpIHtcbiAgICAgICAgY29uc3QgdHdlZW4gPSBuZXcgVHdlZW4oe1xuICAgICAgICAgIG5vZGU6IGNpcmNsZSxcbiAgICAgICAgICBkdXJhdGlvbjogMC41LFxuICAgICAgICAgIHg6IGNpcmNsZS5iYXNlWCxcbiAgICAgICAgICB5OiBjaXJjbGUuYmFzZVksXG4gICAgICAgICAgb3BhY2l0eTogdGhpcy5vcHRpb25zLm9wYWNpdHksXG4gICAgICAgICAgZWFzaW5nOiBFYXNpbmdzLlN0cm9uZ0Vhc2VPdXRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2lyY2xlLnR3ZWVuID0gdHdlZW47XG4gICAgICAgIHR3ZWVuLnBsYXkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfY2xlYW4oKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmdyaWQubGVuZ3RoOyB5KyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZ3JpZFt5XTtcblxuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCByb3cubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgY29uc3QgY2lyY2xlID0gcm93W3hdO1xuXG4gICAgICAgIHRoaXMuX2NsZWFuQ2lyY2xlKGNpcmNsZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3JlZHJhdygpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9