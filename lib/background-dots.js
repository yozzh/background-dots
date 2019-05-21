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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL0FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9rb252YS9saWIvQmFzZUxheWVyLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9DYW52YXMuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL0NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9rb252YS9saWIvQ29udGV4dC5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9rb252YS9saWIvRHJhZ0FuZERyb3AuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL0dsb2JhbC5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9rb252YS9saWIvTGF5ZXIuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL05vZGUuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL1NoYXBlLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9TdGFnZS5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9rb252YS9saWIvVHdlZW4uanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL1V0aWwuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL1ZhbGlkYXRvcnMuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL3NoYXBlcy9DaXJjbGUuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMva29udmEvbGliL3NoYXBlcy9SZWN0LmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldFRhZy5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvLi9ub2RlX21vZHVsZXMvbG9kYXNoL2RlYm91bmNlLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvbm93LmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC90aHJvdHRsZS5qcyIsIndlYnBhY2s6Ly9CYWNrZ3JvdW5kRG90cy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvdG9OdW1iZXIuanMiLCJ3ZWJwYWNrOi8vQmFja2dyb3VuZERvdHMvKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovL0JhY2tncm91bmREb3RzLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkJhY2tncm91bmREb3RzIiwiZWxlbWVudCIsIm9wdGlvbnMiLCJpc01vdXNlT3ZlciIsImRlZmF1bHRPcHRpb25zIiwiZ3JpZCIsInN0YWdlIiwiY29udGFpbmVyIiwid2lkdGgiLCJvZmZzZXRXaWR0aCIsImhlaWdodCIsIm9mZnNldEhlaWdodCIsImxheWVyIiwiYWRkIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9yZXNpemVIYW5kbGVyIiwiYmluZCIsIl9tb3VzZU1vdmVIYW5kbGVyIiwiZG9jdW1lbnQiLCJib2R5IiwiX2RvY3VtZW50TW91c2VPdXRIYW5kbGVyIiwiX2RyYXdIZWxwZXJzIiwiX2RyYXciLCJfZHJhd0JhY2tncm91bmQiLCJfZHJhd0dyaWQiLCJfcmVkcmF3IiwiaGVscGVyIiwieCIsInkiLCJyYWRpdXMiLCJmaWxsIiwiZGVidWciLCJiYWNrZ3JvdW5kIiwiYmFja2dyb3VuZENvbG9yIiwiZ3V0dGVyIiwiZG90Q29sb3IiLCJ4Q291bnQiLCJNYXRoIiwicm91bmQiLCJ5Q291bnQiLCJsZW5ndGgiLCJyb3ciLCJjaXJjbGUiLCJkZXN0cm95IiwiY2lyY2xlWCIsImNpcmNsZVkiLCJvcGFjaXR5IiwiYmFzZVgiLCJiYXNlWSIsInB1c2giLCJiYXRjaERyYXciLCJldmVudCIsImNsaWVudFgiLCJjbGllbnRZIiwiX2lzT3ZlclN0YWdlIiwiX2NsZWFuIiwiX2dldEdyaWRDb29yZGluYXRlcyIsIl91cGRhdGVDaXJjbGVzQXJvdW5kIiwiZSIsInRhcmdldCIsInJlbGF0ZWRUYXJnZXQiLCJub2RlTmFtZSIsImNsaWVudFJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJib3R0b20iLCJsZWZ0IiwicmlnaHQiLCJjZW50ZXJYIiwiY2VudGVyWSIsImJ1YmJsZVJhZGl1cyIsImRpc3RhbmNlIiwic3FydCIsInBvdyIsIl91cGRhdGVDaXJjbGVCeURpc3RhbmNlIiwiX2NsZWFuQ2lyY2xlIiwiZGlzdGFuY2VJbmRleCIsIm1hZ25ldGljUG93ZXIiLCJ3aXRoQW5pbWF0aW9uIiwidHdlZW4iLCJub2RlIiwiZHVyYXRpb24iLCJlYXNpbmciLCJTdHJvbmdFYXNlT3V0IiwicGxheSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMEJBQTBCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMVZhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ3ZGLDZCQUE2Qix1REFBdUQ7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLGdEQUFRO0FBQzdCLGVBQWUsbUJBQU8sQ0FBQyxvREFBVTtBQUNqQywySEFBMkg7QUFDM0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHVCQUF1QjtBQUNwQyxhQUFhLG9DQUFvQztBQUNqRCxhQUFhLGtEQUFrRDtBQUMvRCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFNBQVM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsb0JBQW9CO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIscUJBQXFCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsYUFBYTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix5QkFBeUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7O0FDcndDYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGNBQWMsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUN2Riw2QkFBNkIsdURBQXVEO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNELDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyxnREFBUTtBQUM3QixnQkFBZ0IsbUJBQU8sQ0FBQyxzREFBVztBQUNuQyxhQUFhLG1CQUFPLENBQUMsZ0RBQVE7QUFDN0IsbUJBQW1CLG1CQUFPLENBQUMsNERBQWM7QUFDekMsZUFBZSxtQkFBTyxDQUFDLG9EQUFVO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHVCQUF1QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsdUJBQXVCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFNBQVM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixTQUFTO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xnQmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxlQUFlLG1CQUFPLENBQUMsb0RBQVU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix3QkFBd0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx3QkFBd0IsSUFBSSxNQUFNLElBQUksTUFBTSxJQUFJO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUJBQW1CLGFBQWE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1QkFBdUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDTSxLQUpZO0FBS3RCRixtQkFBTyxFQUFFLEtBQUs3QyxPQUFMLENBQWE2QyxPQUxBO0FBTXRCb0Msa0JBQU0sRUFBRSxlQUFRQztBQU5NLFdBQVYsQ0FBZDtBQVNBekMsZ0JBQU0sQ0FBQ3FDLEtBQVAsR0FBZUEsS0FBZjtBQUNBQSxlQUFLLENBQUNLLElBQU47QUFDRDtBQUNGO0FBQ0Y7Ozs2QkFFUTtBQUNQLFdBQUssSUFBSXhELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3hCLElBQUwsQ0FBVW9DLE1BQTlCLEVBQXNDWixDQUFDLEVBQXZDLEVBQTJDO0FBQ3pDLFlBQU1hLEdBQUcsR0FBRyxLQUFLckMsSUFBTCxDQUFVd0IsQ0FBVixDQUFaOztBQUVBLGFBQUssSUFBSUQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2MsR0FBRyxDQUFDRCxNQUF4QixFQUFnQ2IsQ0FBQyxFQUFqQyxFQUFxQztBQUNuQyxjQUFNZSxNQUFNLEdBQUdELEdBQUcsQ0FBQ2QsQ0FBRCxDQUFsQjs7QUFFQSxlQUFLZ0QsWUFBTCxDQUFrQmpDLE1BQWxCLEVBQTBCLElBQTFCO0FBQ0Q7QUFDRjs7QUFDRCxXQUFLakIsT0FBTDtBQUNEOzs7Ozs7OztnQkFwUGtCMUIsYyxvQkFDSztBQUN0QmtDLGlCQUFlLEVBQUUsa0JBREs7QUFFdEJFLFVBQVEsRUFBRSwwQkFGWTtBQUd0QkQsUUFBTSxFQUFFLEVBSGM7QUFJdEJMLFFBQU0sRUFBRSxDQUpjO0FBS3RCeUMsY0FBWSxFQUFFLEdBTFE7QUFNdEJPLGVBQWEsRUFBRSxJQU5PO0FBT3RCL0IsU0FBTyxFQUFFLEdBUGE7QUFRdEJmLE9BQUssRUFBRTtBQVJlLEMiLCJmaWxlIjoiYmFja2dyb3VuZC1kb3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJCYWNrZ3JvdW5kRG90c1wiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJCYWNrZ3JvdW5kRG90c1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJCYWNrZ3JvdW5kRG90c1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgR2xvYmFsXzEgPSByZXF1aXJlKFwiLi9HbG9iYWxcIik7XG52YXIgbm93ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoR2xvYmFsXzEuZ2xvYi5wZXJmb3JtYW5jZSAmJiBHbG9iYWxfMS5nbG9iLnBlcmZvcm1hbmNlLm5vdykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIEdsb2JhbF8xLmdsb2IucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB9O1xufSkoKTtcbnZhciBBbmltYXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFuaW1hdGlvbihmdW5jLCBsYXllcnMpIHtcbiAgICAgICAgdGhpcy5pZCA9IEFuaW1hdGlvbi5hbmltSWRDb3VudGVyKys7XG4gICAgICAgIHRoaXMuZnJhbWUgPSB7XG4gICAgICAgICAgICB0aW1lOiAwLFxuICAgICAgICAgICAgdGltZURpZmY6IDAsXG4gICAgICAgICAgICBsYXN0VGltZTogbm93KCksXG4gICAgICAgICAgICBmcmFtZVJhdGU6IDBcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mdW5jID0gZnVuYztcbiAgICAgICAgdGhpcy5zZXRMYXllcnMobGF5ZXJzKTtcbiAgICB9XG4gICAgQW5pbWF0aW9uLnByb3RvdHlwZS5zZXRMYXllcnMgPSBmdW5jdGlvbiAobGF5ZXJzKSB7XG4gICAgICAgIHZhciBsYXlzID0gW107XG4gICAgICAgIGlmICghbGF5ZXJzKSB7XG4gICAgICAgICAgICBsYXlzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobGF5ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxheXMgPSBsYXllcnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsYXlzID0gW2xheWVyc107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXllcnMgPSBsYXlzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEFuaW1hdGlvbi5wcm90b3R5cGUuZ2V0TGF5ZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXllcnM7XG4gICAgfTtcbiAgICBBbmltYXRpb24ucHJvdG90eXBlLmFkZExheWVyID0gZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIHZhciBsYXllcnMgPSB0aGlzLmxheWVycywgbGVuID0gbGF5ZXJzLmxlbmd0aCwgbjtcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICBpZiAobGF5ZXJzW25dLl9pZCA9PT0gbGF5ZXIuX2lkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubGF5ZXJzLnB1c2gobGF5ZXIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIEFuaW1hdGlvbi5wcm90b3R5cGUuaXNSdW5uaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYSA9IEFuaW1hdGlvbiwgYW5pbWF0aW9ucyA9IGEuYW5pbWF0aW9ucywgbGVuID0gYW5pbWF0aW9ucy5sZW5ndGgsIG47XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbnNbbl0uaWQgPT09IHRoaXMuaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBBbmltYXRpb24ucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgdGhpcy5mcmFtZS50aW1lRGlmZiA9IDA7XG4gICAgICAgIHRoaXMuZnJhbWUubGFzdFRpbWUgPSBub3coKTtcbiAgICAgICAgQW5pbWF0aW9uLl9hZGRBbmltYXRpb24odGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQW5pbWF0aW9uLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBBbmltYXRpb24uX3JlbW92ZUFuaW1hdGlvbih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBBbmltYXRpb24ucHJvdG90eXBlLl91cGRhdGVGcmFtZU9iamVjdCA9IGZ1bmN0aW9uICh0aW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUudGltZURpZmYgPSB0aW1lIC0gdGhpcy5mcmFtZS5sYXN0VGltZTtcbiAgICAgICAgdGhpcy5mcmFtZS5sYXN0VGltZSA9IHRpbWU7XG4gICAgICAgIHRoaXMuZnJhbWUudGltZSArPSB0aGlzLmZyYW1lLnRpbWVEaWZmO1xuICAgICAgICB0aGlzLmZyYW1lLmZyYW1lUmF0ZSA9IDEwMDAgLyB0aGlzLmZyYW1lLnRpbWVEaWZmO1xuICAgIH07XG4gICAgQW5pbWF0aW9uLl9hZGRBbmltYXRpb24gPSBmdW5jdGlvbiAoYW5pbSkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucHVzaChhbmltKTtcbiAgICAgICAgdGhpcy5faGFuZGxlQW5pbWF0aW9uKCk7XG4gICAgfTtcbiAgICBBbmltYXRpb24uX3JlbW92ZUFuaW1hdGlvbiA9IGZ1bmN0aW9uIChhbmltKSB7XG4gICAgICAgIHZhciBpZCA9IGFuaW0uaWQsIGFuaW1hdGlvbnMgPSB0aGlzLmFuaW1hdGlvbnMsIGxlbiA9IGFuaW1hdGlvbnMubGVuZ3RoLCBuO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIGlmIChhbmltYXRpb25zW25dLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5zcGxpY2UobiwgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFuaW1hdGlvbi5fcnVuRnJhbWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGF5ZXJIYXNoID0ge30sIGFuaW1hdGlvbnMgPSB0aGlzLmFuaW1hdGlvbnMsIGFuaW0sIGxheWVycywgZnVuYywgbiwgaSwgbGF5ZXJzTGVuLCBsYXllciwga2V5LCBuZWVkUmVkcmF3O1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgYW5pbWF0aW9ucy5sZW5ndGg7IG4rKykge1xuICAgICAgICAgICAgYW5pbSA9IGFuaW1hdGlvbnNbbl07XG4gICAgICAgICAgICBsYXllcnMgPSBhbmltLmxheWVycztcbiAgICAgICAgICAgIGZ1bmMgPSBhbmltLmZ1bmM7XG4gICAgICAgICAgICBhbmltLl91cGRhdGVGcmFtZU9iamVjdChub3coKSk7XG4gICAgICAgICAgICBsYXllcnNMZW4gPSBsYXllcnMubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGZ1bmMpIHtcbiAgICAgICAgICAgICAgICBuZWVkUmVkcmF3ID0gZnVuYy5jYWxsKGFuaW0sIGFuaW0uZnJhbWUpICE9PSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5lZWRSZWRyYXcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFuZWVkUmVkcmF3KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGF5ZXJzTGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsYXllciA9IGxheWVyc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAobGF5ZXIuX2lkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJIYXNoW2xheWVyLl9pZF0gPSBsYXllcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChrZXkgaW4gbGF5ZXJIYXNoKSB7XG4gICAgICAgICAgICBpZiAoIWxheWVySGFzaC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXllckhhc2hba2V5XS5kcmF3KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFuaW1hdGlvbi5fYW5pbWF0aW9uTG9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIEFuaW0gPSBBbmltYXRpb247XG4gICAgICAgIGlmIChBbmltLmFuaW1hdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBBbmltLl9ydW5GcmFtZXMoKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShBbmltLl9hbmltYXRpb25Mb29wKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIEFuaW0uYW5pbVJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5pbWF0aW9uLl9oYW5kbGVBbmltYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5hbmltUnVubmluZykge1xuICAgICAgICAgICAgdGhpcy5hbmltUnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fYW5pbWF0aW9uTG9vcCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFuaW1hdGlvbi5hbmltYXRpb25zID0gW107XG4gICAgQW5pbWF0aW9uLmFuaW1JZENvdW50ZXIgPSAwO1xuICAgIEFuaW1hdGlvbi5hbmltUnVubmluZyA9IGZhbHNlO1xuICAgIHJldHVybiBBbmltYXRpb247XG59KCkpO1xuZXhwb3J0cy5BbmltYXRpb24gPSBBbmltYXRpb247XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFV0aWxfMSA9IHJlcXVpcmUoXCIuL1V0aWxcIik7XG52YXIgQ29udGFpbmVyXzEgPSByZXF1aXJlKFwiLi9Db250YWluZXJcIik7XG52YXIgTm9kZV8xID0gcmVxdWlyZShcIi4vTm9kZVwiKTtcbnZhciBGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi9GYWN0b3J5XCIpO1xudmFyIENhbnZhc18xID0gcmVxdWlyZShcIi4vQ2FudmFzXCIpO1xudmFyIEJhc2VMYXllciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJhc2VMYXllciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCYXNlTGF5ZXIoY29uZmlnKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGNvbmZpZykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY2FudmFzID0gbmV3IENhbnZhc18xLlNjZW5lQ2FudmFzKCk7XG4gICAgICAgIF90aGlzLl93YWl0aW5nRm9yRHJhdyA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5vbigndmlzaWJsZUNoYW5nZScsIF90aGlzLl9jaGVja1Zpc2liaWxpdHkpO1xuICAgICAgICBfdGhpcy5fY2hlY2tWaXNpYmlsaXR5KCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5jcmVhdGVQTkdTdHJlYW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjID0gdGhpcy5jYW52YXMuX2NhbnZhcztcbiAgICAgICAgcmV0dXJuIGMuY3JlYXRlUE5HU3RyZWFtKCk7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLmdldENhbnZhcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5nZXRIaXRDYW52YXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpdENhbnZhcztcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuZ2V0Q29udGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FudmFzKCkuZ2V0Q29udGV4dCgpO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICAgICAgdGhpcy5nZXRDb250ZXh0KCkuY2xlYXIoYm91bmRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLnNldFpJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLnNldFpJbmRleC5jYWxsKHRoaXMsIGluZGV4KTtcbiAgICAgICAgdmFyIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpO1xuICAgICAgICBpZiAoc3RhZ2UpIHtcbiAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQucmVtb3ZlQ2hpbGQodGhpcy5nZXRDYW52YXMoKS5fY2FudmFzKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IHN0YWdlLmdldENoaWxkcmVuKCkubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZ2V0Q2FudmFzKCkuX2NhbnZhcywgc3RhZ2UuZ2V0Q2hpbGRyZW4oKVtpbmRleCArIDFdLmdldENhbnZhcygpLl9jYW52YXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhZ2UuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmdldENhbnZhcygpLl9jYW52YXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5tb3ZlVG9Ub3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIE5vZGVfMS5Ob2RlLnByb3RvdHlwZS5tb3ZlVG9Ub3AuY2FsbCh0aGlzKTtcbiAgICAgICAgdmFyIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpO1xuICAgICAgICBpZiAoc3RhZ2UpIHtcbiAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQucmVtb3ZlQ2hpbGQodGhpcy5nZXRDYW52YXMoKS5fY2FudmFzKTtcbiAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5nZXRDYW52YXMoKS5fY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUubW92ZVVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbW92ZWQgPSBOb2RlXzEuTm9kZS5wcm90b3R5cGUubW92ZVVwLmNhbGwodGhpcyk7XG4gICAgICAgIGlmICghbW92ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCk7XG4gICAgICAgIGlmICghc3RhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzdGFnZS5jb250ZW50LnJlbW92ZUNoaWxkKHRoaXMuZ2V0Q2FudmFzKCkuX2NhbnZhcyk7XG4gICAgICAgIGlmICh0aGlzLmluZGV4IDwgc3RhZ2UuZ2V0Q2hpbGRyZW4oKS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBzdGFnZS5jb250ZW50Lmluc2VydEJlZm9yZSh0aGlzLmdldENhbnZhcygpLl9jYW52YXMsIHN0YWdlLmdldENoaWxkcmVuKClbdGhpcy5pbmRleCArIDFdLmdldENhbnZhcygpLl9jYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RhZ2UuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmdldENhbnZhcygpLl9jYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5tb3ZlRG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKE5vZGVfMS5Ob2RlLnByb3RvdHlwZS5tb3ZlRG93bi5jYWxsKHRoaXMpKSB7XG4gICAgICAgICAgICB2YXIgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCk7XG4gICAgICAgICAgICBpZiAoc3RhZ2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBzdGFnZS5nZXRDaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQucmVtb3ZlQ2hpbGQodGhpcy5nZXRDYW52YXMoKS5fY2FudmFzKTtcbiAgICAgICAgICAgICAgICBzdGFnZS5jb250ZW50Lmluc2VydEJlZm9yZSh0aGlzLmdldENhbnZhcygpLl9jYW52YXMsIGNoaWxkcmVuW3RoaXMuaW5kZXggKyAxXS5nZXRDYW52YXMoKS5fY2FudmFzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUubW92ZVRvQm90dG9tID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoTm9kZV8xLk5vZGUucHJvdG90eXBlLm1vdmVUb0JvdHRvbS5jYWxsKHRoaXMpKSB7XG4gICAgICAgICAgICB2YXIgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCk7XG4gICAgICAgICAgICBpZiAoc3RhZ2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBzdGFnZS5nZXRDaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQucmVtb3ZlQ2hpbGQodGhpcy5nZXRDYW52YXMoKS5fY2FudmFzKTtcbiAgICAgICAgICAgICAgICBzdGFnZS5jb250ZW50Lmluc2VydEJlZm9yZSh0aGlzLmdldENhbnZhcygpLl9jYW52YXMsIGNoaWxkcmVuWzFdLmdldENhbnZhcygpLl9jYW52YXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5nZXRMYXllciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9jYW52YXMgPSB0aGlzLmdldENhbnZhcygpLl9jYW52YXM7XG4gICAgICAgIE5vZGVfMS5Ob2RlLnByb3RvdHlwZS5yZW1vdmUuY2FsbCh0aGlzKTtcbiAgICAgICAgaWYgKF9jYW52YXMgJiYgX2NhbnZhcy5wYXJlbnROb2RlICYmIFV0aWxfMS5VdGlsLl9pc0luRG9jdW1lbnQoX2NhbnZhcykpIHtcbiAgICAgICAgICAgIF9jYW52YXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuZ2V0U3RhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudDtcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgd2lkdGggPSBfYS53aWR0aCwgaGVpZ2h0ID0gX2EuaGVpZ2h0O1xuICAgICAgICB0aGlzLmNhbnZhcy5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuX3RvS29udmFDYW52YXMgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgICAgY29uZmlnLndpZHRoID0gY29uZmlnLndpZHRoIHx8IHRoaXMuZ2V0V2lkdGgoKTtcbiAgICAgICAgY29uZmlnLmhlaWdodCA9IGNvbmZpZy5oZWlnaHQgfHwgdGhpcy5nZXRIZWlnaHQoKTtcbiAgICAgICAgY29uZmlnLnggPSBjb25maWcueCAhPT0gdW5kZWZpbmVkID8gY29uZmlnLnggOiB0aGlzLngoKTtcbiAgICAgICAgY29uZmlnLnkgPSBjb25maWcueSAhPT0gdW5kZWZpbmVkID8gY29uZmlnLnkgOiB0aGlzLnkoKTtcbiAgICAgICAgcmV0dXJuIE5vZGVfMS5Ob2RlLnByb3RvdHlwZS5fdG9Lb252YUNhbnZhcy5jYWxsKHRoaXMsIGNvbmZpZyk7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLl9jaGVja1Zpc2liaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2aXNpYmxlID0gdGhpcy52aXNpYmxlKCk7XG4gICAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5fY2FudmFzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuX2NhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLmdldFdpZHRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudC53aWR0aCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLnNldFdpZHRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdDYW4gbm90IGNoYW5nZSB3aWR0aCBvZiBsYXllci4gVXNlIFwic3RhZ2Uud2lkdGgodmFsdWUpXCIgZnVuY3Rpb24gaW5zdGVhZC4nKTtcbiAgICB9O1xuICAgIEJhc2VMYXllci5wcm90b3R5cGUuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5oZWlnaHQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5zZXRIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ0NhbiBub3QgY2hhbmdlIGhlaWdodCBvZiBsYXllci4gVXNlIFwic3RhZ2UuaGVpZ2h0KHZhbHVlKVwiIGZ1bmN0aW9uIGluc3RlYWQuJyk7XG4gICAgfTtcbiAgICBCYXNlTGF5ZXIucHJvdG90eXBlLmdldEludGVyc2VjdGlvbiA9IGZ1bmN0aW9uIChwb3MsIHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5iYXRjaERyYXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5fd2FpdGluZ0ZvckRyYXcpIHtcbiAgICAgICAgICAgIHRoaXMuX3dhaXRpbmdGb3JEcmF3ID0gdHJ1ZTtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLnJlcXVlc3RBbmltRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmRyYXcoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fd2FpdGluZ0ZvckRyYXcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQmFzZUxheWVyLnByb3RvdHlwZS5fYXBwbHlUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoc2hhcGUsIGNvbnRleHQsIHRvcCkge1xuICAgICAgICB2YXIgbSA9IHNoYXBlLmdldEFic29sdXRlVHJhbnNmb3JtKHRvcCkuZ2V0TWF0cml4KCk7XG4gICAgICAgIGNvbnRleHQudHJhbnNmb3JtKG1bMF0sIG1bMV0sIG1bMl0sIG1bM10sIG1bNF0sIG1bNV0pO1xuICAgIH07XG4gICAgcmV0dXJuIEJhc2VMYXllcjtcbn0oQ29udGFpbmVyXzEuQ29udGFpbmVyKSk7XG5leHBvcnRzLkJhc2VMYXllciA9IEJhc2VMYXllcjtcbkJhc2VMYXllci5wcm90b3R5cGUubm9kZVR5cGUgPSAnQmFzZUxheWVyJztcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihCYXNlTGF5ZXIsICdjbGVhckJlZm9yZURyYXcnLCB0cnVlKTtcblV0aWxfMS5Db2xsZWN0aW9uLm1hcE1ldGhvZHMoQmFzZUxheWVyKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVXRpbF8xID0gcmVxdWlyZShcIi4vVXRpbFwiKTtcbnZhciBDb250ZXh0XzEgPSByZXF1aXJlKFwiLi9Db250ZXh0XCIpO1xudmFyIEdsb2JhbF8xID0gcmVxdWlyZShcIi4vR2xvYmFsXCIpO1xudmFyIEZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuL0ZhY3RvcnlcIik7XG52YXIgVmFsaWRhdG9yc18xID0gcmVxdWlyZShcIi4vVmFsaWRhdG9yc1wiKTtcbnZhciBfcGl4ZWxSYXRpbztcbmZ1bmN0aW9uIGdldERldmljZVBpeGVsUmF0aW8oKSB7XG4gICAgaWYgKF9waXhlbFJhdGlvKSB7XG4gICAgICAgIHJldHVybiBfcGl4ZWxSYXRpbztcbiAgICB9XG4gICAgdmFyIGNhbnZhcyA9IFV0aWxfMS5VdGlsLmNyZWF0ZUNhbnZhc0VsZW1lbnQoKTtcbiAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIF9waXhlbFJhdGlvID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRldmljZVBpeGVsUmF0aW8gPSBHbG9iYWxfMS5nbG9iLndpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEsIGJhY2tpbmdTdG9yZVJhdGlvID0gY29udGV4dC53ZWJraXRCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICAgICAgICBjb250ZXh0Lm1vekJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgICAgICAgIGNvbnRleHQubXNCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICAgICAgICBjb250ZXh0Lm9CYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICAgICAgICBjb250ZXh0LmJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgICAgICAgIDE7XG4gICAgICAgIHJldHVybiBkZXZpY2VQaXhlbFJhdGlvIC8gYmFja2luZ1N0b3JlUmF0aW87XG4gICAgfSkoKTtcbiAgICByZXR1cm4gX3BpeGVsUmF0aW87XG59XG52YXIgQ2FudmFzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYW52YXMoY29uZmlnKSB7XG4gICAgICAgIHRoaXMucGl4ZWxSYXRpbyA9IDE7XG4gICAgICAgIHRoaXMud2lkdGggPSAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDA7XG4gICAgICAgIHRoaXMuaXNDYWNoZSA9IGZhbHNlO1xuICAgICAgICB2YXIgY29uZiA9IGNvbmZpZyB8fCB7fTtcbiAgICAgICAgdmFyIHBpeGVsUmF0aW8gPSBjb25mLnBpeGVsUmF0aW8gfHwgR2xvYmFsXzEuS29udmEucGl4ZWxSYXRpbyB8fCBnZXREZXZpY2VQaXhlbFJhdGlvKCk7XG4gICAgICAgIHRoaXMucGl4ZWxSYXRpbyA9IHBpeGVsUmF0aW87XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IFV0aWxfMS5VdGlsLmNyZWF0ZUNhbnZhc0VsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnBhZGRpbmcgPSAnMCc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5tYXJnaW4gPSAnMCc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5ib3JkZXIgPSAnMCc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5iYWNrZ3JvdW5kID0gJ3RyYW5zcGFyZW50JztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnRvcCA9ICcwJztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmxlZnQgPSAnMCc7XG4gICAgfVxuICAgIENhbnZhcy5wcm90b3R5cGUuZ2V0Q29udGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dDtcbiAgICB9O1xuICAgIENhbnZhcy5wcm90b3R5cGUuZ2V0UGl4ZWxSYXRpbyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGl4ZWxSYXRpbztcbiAgICB9O1xuICAgIENhbnZhcy5wcm90b3R5cGUuc2V0UGl4ZWxSYXRpbyA9IGZ1bmN0aW9uIChwaXhlbFJhdGlvKSB7XG4gICAgICAgIHZhciBwcmV2aW91c1JhdGlvID0gdGhpcy5waXhlbFJhdGlvO1xuICAgICAgICB0aGlzLnBpeGVsUmF0aW8gPSBwaXhlbFJhdGlvO1xuICAgICAgICB0aGlzLnNldFNpemUodGhpcy5nZXRXaWR0aCgpIC8gcHJldmlvdXNSYXRpbywgdGhpcy5nZXRIZWlnaHQoKSAvIHByZXZpb3VzUmF0aW8pO1xuICAgIH07XG4gICAgQ2FudmFzLnByb3RvdHlwZS5zZXRXaWR0aCA9IGZ1bmN0aW9uICh3aWR0aCkge1xuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5fY2FudmFzLndpZHRoID0gd2lkdGggKiB0aGlzLnBpeGVsUmF0aW87XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICAgICAgdmFyIHBpeGVsUmF0aW8gPSB0aGlzLnBpeGVsUmF0aW8sIF9jb250ZXh0ID0gdGhpcy5nZXRDb250ZXh0KCkuX2NvbnRleHQ7XG4gICAgICAgIF9jb250ZXh0LnNjYWxlKHBpeGVsUmF0aW8sIHBpeGVsUmF0aW8pO1xuICAgIH07XG4gICAgQ2FudmFzLnByb3RvdHlwZS5zZXRIZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5fY2FudmFzLmhlaWdodCA9IGhlaWdodCAqIHRoaXMucGl4ZWxSYXRpbztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gICAgICAgIHZhciBwaXhlbFJhdGlvID0gdGhpcy5waXhlbFJhdGlvLCBfY29udGV4dCA9IHRoaXMuZ2V0Q29udGV4dCgpLl9jb250ZXh0O1xuICAgICAgICBfY29udGV4dC5zY2FsZShwaXhlbFJhdGlvLCBwaXhlbFJhdGlvKTtcbiAgICB9O1xuICAgIENhbnZhcy5wcm90b3R5cGUuZ2V0V2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndpZHRoO1xuICAgIH07XG4gICAgQ2FudmFzLnByb3RvdHlwZS5nZXRIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlaWdodDtcbiAgICB9O1xuICAgIENhbnZhcy5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuc2V0V2lkdGgod2lkdGgpO1xuICAgICAgICB0aGlzLnNldEhlaWdodChoZWlnaHQpO1xuICAgIH07XG4gICAgQ2FudmFzLnByb3RvdHlwZS50b0RhdGFVUkwgPSBmdW5jdGlvbiAobWltZVR5cGUsIHF1YWxpdHkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYW52YXMudG9EYXRhVVJMKG1pbWVUeXBlLCBxdWFsaXR5KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIFV0aWxfMS5VdGlsLmVycm9yKCdVbmFibGUgdG8gZ2V0IGRhdGEgVVJMLiAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENhbnZhcztcbn0oKSk7XG5leHBvcnRzLkNhbnZhcyA9IENhbnZhcztcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihDYW52YXMsICdwaXhlbFJhdGlvJywgdW5kZWZpbmVkLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xudmFyIFNjZW5lQ2FudmFzID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2NlbmVDYW52YXMsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2NlbmVDYW52YXMoY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmNvbnRleHQgPSBuZXcgQ29udGV4dF8xLlNjZW5lQ29udGV4dChfdGhpcyk7XG4gICAgICAgIF90aGlzLnNldFNpemUoY29uZmlnLndpZHRoLCBjb25maWcuaGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU2NlbmVDYW52YXM7XG59KENhbnZhcykpO1xuZXhwb3J0cy5TY2VuZUNhbnZhcyA9IFNjZW5lQ2FudmFzO1xudmFyIEhpdENhbnZhcyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEhpdENhbnZhcywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBIaXRDYW52YXMoY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcgPT09IHZvaWQgMCkgeyBjb25maWcgPSB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmhpdENhbnZhcyA9IHRydWU7XG4gICAgICAgIF90aGlzLmNvbnRleHQgPSBuZXcgQ29udGV4dF8xLkhpdENvbnRleHQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5zZXRTaXplKGNvbmZpZy53aWR0aCwgY29uZmlnLmhlaWdodCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEhpdENhbnZhcztcbn0oQ2FudmFzKSk7XG5leHBvcnRzLkhpdENhbnZhcyA9IEhpdENhbnZhcztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVXRpbF8xID0gcmVxdWlyZShcIi4vVXRpbFwiKTtcbnZhciBGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi9GYWN0b3J5XCIpO1xudmFyIE5vZGVfMSA9IHJlcXVpcmUoXCIuL05vZGVcIik7XG52YXIgRHJhZ0FuZERyb3BfMSA9IHJlcXVpcmUoXCIuL0RyYWdBbmREcm9wXCIpO1xudmFyIFZhbGlkYXRvcnNfMSA9IHJlcXVpcmUoXCIuL1ZhbGlkYXRvcnNcIik7XG52YXIgQ29udGFpbmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29udGFpbmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbnRhaW5lcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmNoaWxkcmVuID0gbmV3IFV0aWxfMS5Db2xsZWN0aW9uKCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5nZXRDaGlsZHJlbiA9IGZ1bmN0aW9uIChmaWx0ZXJGdW5jKSB7XG4gICAgICAgIGlmICghZmlsdGVyRnVuYykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdHMgPSBuZXcgVXRpbF8xLkNvbGxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5lYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgaWYgKGZpbHRlckZ1bmMoY2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5oYXNDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2hpbGRyZW4oKS5sZW5ndGggPiAwO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoaWxkO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICBjaGlsZC5pbmRleCA9IDA7XG4gICAgICAgICAgICBjaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gbmV3IFV0aWxfMS5Db2xsZWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5kZXN0cm95Q2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGlsZDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgY2hpbGQuaW5kZXggPSAwO1xuICAgICAgICAgICAgY2hpbGQuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBuZXcgVXRpbF8xLkNvbGxlY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoYXJndW1lbnRzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGlsZC5nZXRQYXJlbnQoKSkge1xuICAgICAgICAgICAgY2hpbGQubW92ZVRvKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbjtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGVBZGQoY2hpbGQpO1xuICAgICAgICBjaGlsZC5pbmRleCA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICAgIHRoaXMuX2ZpcmUoJ2FkZCcsIHtcbiAgICAgICAgICAgIGNoaWxkOiBjaGlsZFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNoaWxkLmlzRHJhZ2dpbmcoKSkge1xuICAgICAgICAgICAgRHJhZ0FuZERyb3BfMS5ERC5hbmltLnNldExheWVycyhjaGlsZC5nZXRMYXllcigpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzQ2hpbGRyZW4oKSkge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95Q2hpbGRyZW4oKTtcbiAgICAgICAgfVxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dlbmVyYWxGaW5kKHNlbGVjdG9yLCBmYWxzZSk7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdjb2xsZWN0aW9uLmdldCgpIG1ldGhvZCBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIGNvbGxlY3Rpb24uZmluZCgpIGluc3RlYWQuJyk7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmQoc2VsZWN0b3IpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5maW5kT25lID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9nZW5lcmFsRmluZChzZWxlY3RvciwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMCA/IHJlc3VsdFswXSA6IHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuX2dlbmVyYWxGaW5kID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBmaW5kT25lKSB7XG4gICAgICAgIHZhciByZXRBcnIgPSBbXTtcbiAgICAgICAgdGhpcy5fZGVzY2VuZGFudHMoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZCA9IG5vZGUuX2lzTWF0Y2goc2VsZWN0b3IpO1xuICAgICAgICAgICAgaWYgKHZhbGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0QXJyLnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsaWQgJiYgZmluZE9uZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFV0aWxfMS5Db2xsZWN0aW9uLnRvQ29sbGVjdGlvbihyZXRBcnIpO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fZGVzY2VuZGFudHMgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgdmFyIHNob3VsZFN0b3AgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgc2hvdWxkU3RvcCA9IGZuKGNoaWxkKTtcbiAgICAgICAgICAgIGlmIChzaG91bGRTdG9wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNoaWxkLmhhc0NoaWxkcmVuKCkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNob3VsZFN0b3AgPSBjaGlsZC5fZGVzY2VuZGFudHMoZm4pO1xuICAgICAgICAgICAgaWYgKHNob3VsZFN0b3ApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLnRvT2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2JqID0gTm9kZV8xLk5vZGUucHJvdG90eXBlLnRvT2JqZWN0LmNhbGwodGhpcyk7XG4gICAgICAgIG9iai5jaGlsZHJlbiA9IFtdO1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLmdldENoaWxkcmVuKCk7XG4gICAgICAgIHZhciBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW25dO1xuICAgICAgICAgICAgb2JqLmNoaWxkcmVuLnB1c2goY2hpbGQudG9PYmplY3QoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuX2dldERlc2NlbmRhbnRzID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICB2YXIgcmV0QXJyID0gW107XG4gICAgICAgIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGFycltuXTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQW5jZXN0b3JPZihub2RlKSkge1xuICAgICAgICAgICAgICAgIHJldEFyci5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXRBcnI7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmlzQW5jZXN0b3JPZiA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSBub2RlLmdldFBhcmVudCgpO1xuICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICBpZiAocGFyZW50Ll9pZCA9PT0gdGhpcy5faWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5nZXRQYXJlbnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBDb250YWluZXIucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB2YXIgbm9kZSA9IE5vZGVfMS5Ob2RlLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIG9iaik7XG4gICAgICAgIHRoaXMuZ2V0Q2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uIChubykge1xuICAgICAgICAgICAgbm9kZS5hZGQobm8uY2xvbmUoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0QWxsSW50ZXJzZWN0aW9ucyA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgdmFyIGFyciA9IFtdO1xuICAgICAgICB0aGlzLmZpbmQoJ1NoYXBlJykuZWFjaChmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgICAgIGlmIChzaGFwZS5pc1Zpc2libGUoKSAmJiBzaGFwZS5pbnRlcnNlY3RzKHBvcykpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaChzaGFwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5fc2V0Q2hpbGRyZW5JbmRpY2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNoaWxkcmVuLmVhY2goZnVuY3Rpb24gKGNoaWxkLCBuKSB7XG4gICAgICAgICAgICBjaGlsZC5pbmRleCA9IG47XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5kcmF3U2NlbmUgPSBmdW5jdGlvbiAoY2FuLCB0b3AsIGNhY2hpbmcpIHtcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpLCBjYW52YXMgPSBjYW4gfHwgKGxheWVyICYmIGxheWVyLmdldENhbnZhcygpKSwgY29udGV4dCA9IGNhbnZhcyAmJiBjYW52YXMuZ2V0Q29udGV4dCgpLCBjYWNoZWRDYW52YXMgPSB0aGlzLl9nZXRDYW52YXNDYWNoZSgpLCBjYWNoZWRTY2VuZUNhbnZhcyA9IGNhY2hlZENhbnZhcyAmJiBjYWNoZWRDYW52YXMuc2NlbmU7XG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSgpIHx8IGNhY2hpbmcpIHtcbiAgICAgICAgICAgIGlmICghY2FjaGluZyAmJiBjYWNoZWRTY2VuZUNhbnZhcykge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgICAgIGxheWVyLl9hcHBseVRyYW5zZm9ybSh0aGlzLCBjb250ZXh0LCB0b3ApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RyYXdDYWNoZWRTY2VuZUNhbnZhcyhjb250ZXh0KTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RyYXdDaGlsZHJlbihjYW52YXMsICdkcmF3U2NlbmUnLCB0b3AsIGZhbHNlLCBjYWNoaW5nLCBjYWNoaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZHJhd0hpdCA9IGZ1bmN0aW9uIChjYW4sIHRvcCwgY2FjaGluZykge1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCksIGNhbnZhcyA9IGNhbiB8fCAobGF5ZXIgJiYgbGF5ZXIuaGl0Q2FudmFzKSwgY29udGV4dCA9IGNhbnZhcyAmJiBjYW52YXMuZ2V0Q29udGV4dCgpLCBjYWNoZWRDYW52YXMgPSB0aGlzLl9nZXRDYW52YXNDYWNoZSgpLCBjYWNoZWRIaXRDYW52YXMgPSBjYWNoZWRDYW52YXMgJiYgY2FjaGVkQ2FudmFzLmhpdDtcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkRHJhd0hpdChjYW52YXMpIHx8IGNhY2hpbmcpIHtcbiAgICAgICAgICAgIGlmICghY2FjaGluZyAmJiBjYWNoZWRIaXRDYW52YXMpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgICAgICBsYXllci5fYXBwbHlUcmFuc2Zvcm0odGhpcywgY29udGV4dCwgdG9wKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmF3Q2FjaGVkSGl0Q2FudmFzKGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHJhd0NoaWxkcmVuKGNhbnZhcywgJ2RyYXdIaXQnLCB0b3AsIGZhbHNlLCBjYWNoaW5nLCBjYWNoaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuX2RyYXdDaGlsZHJlbiA9IGZ1bmN0aW9uIChjYW52YXMsIGRyYXdNZXRob2QsIHRvcCwgY2FjaGluZywgc2tpcEJ1ZmZlciwgc2tpcENvbXBvc2l0aW9uKSB7XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKSwgY29udGV4dCA9IGNhbnZhcyAmJiBjYW52YXMuZ2V0Q29udGV4dCgpLCBjbGlwV2lkdGggPSB0aGlzLmNsaXBXaWR0aCgpLCBjbGlwSGVpZ2h0ID0gdGhpcy5jbGlwSGVpZ2h0KCksIGNsaXBGdW5jID0gdGhpcy5jbGlwRnVuYygpLCBoYXNDbGlwID0gKGNsaXBXaWR0aCAmJiBjbGlwSGVpZ2h0KSB8fCBjbGlwRnVuYywgY2xpcFgsIGNsaXBZO1xuICAgICAgICBpZiAoaGFzQ2xpcCAmJiBsYXllcikge1xuICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy5nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApO1xuICAgICAgICAgICAgdmFyIG0gPSB0cmFuc2Zvcm0uZ2V0TWF0cml4KCk7XG4gICAgICAgICAgICBjb250ZXh0LnRyYW5zZm9ybShtWzBdLCBtWzFdLCBtWzJdLCBtWzNdLCBtWzRdLCBtWzVdKTtcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBpZiAoY2xpcEZ1bmMpIHtcbiAgICAgICAgICAgICAgICBjbGlwRnVuYy5jYWxsKHRoaXMsIGNvbnRleHQsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xpcFggPSB0aGlzLmNsaXBYKCk7XG4gICAgICAgICAgICAgICAgY2xpcFkgPSB0aGlzLmNsaXBZKCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZWN0KGNsaXBYLCBjbGlwWSwgY2xpcFdpZHRoLCBjbGlwSGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRleHQuY2xpcCgpO1xuICAgICAgICAgICAgbSA9IHRyYW5zZm9ybVxuICAgICAgICAgICAgICAgIC5jb3B5KClcbiAgICAgICAgICAgICAgICAuaW52ZXJ0KClcbiAgICAgICAgICAgICAgICAuZ2V0TWF0cml4KCk7XG4gICAgICAgICAgICBjb250ZXh0LnRyYW5zZm9ybShtWzBdLCBtWzFdLCBtWzJdLCBtWzNdLCBtWzRdLCBtWzVdKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaGFzQ29tcG9zaXRpb24gPSB0aGlzLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbigpICE9PSAnc291cmNlLW92ZXInICYmICFza2lwQ29tcG9zaXRpb247XG4gICAgICAgIGlmIChoYXNDb21wb3NpdGlvbiAmJiBsYXllcikge1xuICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICBjb250ZXh0Ll9hcHBseUdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoaWxkcmVuLmVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICBjaGlsZFtkcmF3TWV0aG9kXShjYW52YXMsIHRvcCwgY2FjaGluZywgc2tpcEJ1ZmZlcik7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaGFzQ29tcG9zaXRpb24gJiYgbGF5ZXIpIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNDbGlwICYmIGxheWVyKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGFpbmVyLnByb3RvdHlwZS5zaG91bGREcmF3SGl0ID0gZnVuY3Rpb24gKGNhbnZhcykge1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCk7XG4gICAgICAgIHZhciBsYXllclVuZGVyRHJhZyA9IERyYWdBbmREcm9wXzEuREQuaXNEcmFnZ2luZyAmJiBEcmFnQW5kRHJvcF8xLkRELmFuaW0uZ2V0TGF5ZXJzKCkuaW5kZXhPZihsYXllcikgIT09IC0xO1xuICAgICAgICByZXR1cm4gKChjYW52YXMgJiYgY2FudmFzLmlzQ2FjaGUpIHx8XG4gICAgICAgICAgICAobGF5ZXIgJiYgbGF5ZXIuaGl0R3JhcGhFbmFibGVkKCkgJiYgdGhpcy5pc1Zpc2libGUoKSAmJiAhbGF5ZXJVbmRlckRyYWcpKTtcbiAgICB9O1xuICAgIENvbnRhaW5lci5wcm90b3R5cGUuZ2V0Q2xpZW50UmVjdCA9IGZ1bmN0aW9uIChhdHRycykge1xuICAgICAgICBhdHRycyA9IGF0dHJzIHx8IHt9O1xuICAgICAgICB2YXIgc2tpcFRyYW5zZm9ybSA9IGF0dHJzLnNraXBUcmFuc2Zvcm07XG4gICAgICAgIHZhciByZWxhdGl2ZVRvID0gYXR0cnMucmVsYXRpdmVUbztcbiAgICAgICAgdmFyIG1pblgsIG1pblksIG1heFgsIG1heFk7XG4gICAgICAgIHZhciBzZWxmUmVjdCA9IHtcbiAgICAgICAgICAgIHg6IEluZmluaXR5LFxuICAgICAgICAgICAgeTogSW5maW5pdHksXG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMFxuICAgICAgICB9O1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIGlmICghY2hpbGQudmlzaWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlY3QgPSBjaGlsZC5nZXRDbGllbnRSZWN0KHtcbiAgICAgICAgICAgICAgICByZWxhdGl2ZVRvOiB0aGF0LFxuICAgICAgICAgICAgICAgIHNraXBTaGFkb3c6IGF0dHJzLnNraXBTaGFkb3csXG4gICAgICAgICAgICAgICAgc2tpcFN0cm9rZTogYXR0cnMuc2tpcFN0cm9rZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocmVjdC53aWR0aCA9PT0gMCAmJiByZWN0LmhlaWdodCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtaW5YID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBtaW5YID0gcmVjdC54O1xuICAgICAgICAgICAgICAgIG1pblkgPSByZWN0Lnk7XG4gICAgICAgICAgICAgICAgbWF4WCA9IHJlY3QueCArIHJlY3Qud2lkdGg7XG4gICAgICAgICAgICAgICAgbWF4WSA9IHJlY3QueSArIHJlY3QuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbWluWCA9IE1hdGgubWluKG1pblgsIHJlY3QueCk7XG4gICAgICAgICAgICAgICAgbWluWSA9IE1hdGgubWluKG1pblksIHJlY3QueSk7XG4gICAgICAgICAgICAgICAgbWF4WCA9IE1hdGgubWF4KG1heFgsIHJlY3QueCArIHJlY3Qud2lkdGgpO1xuICAgICAgICAgICAgICAgIG1heFkgPSBNYXRoLm1heChtYXhZLCByZWN0LnkgKyByZWN0LmhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc2hhcGVzID0gdGhpcy5maW5kKCdTaGFwZScpO1xuICAgICAgICB2YXIgaGFzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNoYXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNoYXBlID0gc2hhcGVzW2ldO1xuICAgICAgICAgICAgaWYgKHNoYXBlLl9pc1Zpc2libGUodGhpcykpIHtcbiAgICAgICAgICAgICAgICBoYXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzVmlzaWJsZSkge1xuICAgICAgICAgICAgc2VsZlJlY3QgPSB7XG4gICAgICAgICAgICAgICAgeDogbWluWCxcbiAgICAgICAgICAgICAgICB5OiBtaW5ZLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBtYXhYIC0gbWluWCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IG1heFkgLSBtaW5ZXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZlJlY3QgPSB7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgICAgIGhlaWdodDogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNraXBUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1lZFJlY3Qoc2VsZlJlY3QsIHJlbGF0aXZlVG8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmUmVjdDtcbiAgICB9O1xuICAgIHJldHVybiBDb250YWluZXI7XG59KE5vZGVfMS5Ob2RlKSk7XG5leHBvcnRzLkNvbnRhaW5lciA9IENvbnRhaW5lcjtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoQ29udGFpbmVyLCAnY2xpcCcsIFtcbiAgICAneCcsXG4gICAgJ3knLFxuICAgICd3aWR0aCcsXG4gICAgJ2hlaWdodCdcbl0pO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKENvbnRhaW5lciwgJ2NsaXBYJywgdW5kZWZpbmVkLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKENvbnRhaW5lciwgJ2NsaXBZJywgdW5kZWZpbmVkLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKENvbnRhaW5lciwgJ2NsaXBXaWR0aCcsIHVuZGVmaW5lZCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihDb250YWluZXIsICdjbGlwSGVpZ2h0JywgdW5kZWZpbmVkLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKENvbnRhaW5lciwgJ2NsaXBGdW5jJyk7XG5VdGlsXzEuQ29sbGVjdGlvbi5tYXBNZXRob2RzKENvbnRhaW5lcik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFV0aWxfMSA9IHJlcXVpcmUoXCIuL1V0aWxcIik7XG52YXIgR2xvYmFsXzEgPSByZXF1aXJlKFwiLi9HbG9iYWxcIik7XG52YXIgQ09NTUEgPSAnLCcsIE9QRU5fUEFSRU4gPSAnKCcsIENMT1NFX1BBUkVOID0gJyknLCBPUEVOX1BBUkVOX0JSQUNLRVQgPSAnKFsnLCBDTE9TRV9CUkFDS0VUX1BBUkVOID0gJ10pJywgU0VNSUNPTE9OID0gJzsnLCBET1VCTEVfUEFSRU4gPSAnKCknLCBFUVVBTFMgPSAnPScsIENPTlRFWFRfTUVUSE9EUyA9IFtcbiAgICAnYXJjJyxcbiAgICAnYXJjVG8nLFxuICAgICdiZWdpblBhdGgnLFxuICAgICdiZXppZXJDdXJ2ZVRvJyxcbiAgICAnY2xlYXJSZWN0JyxcbiAgICAnY2xpcCcsXG4gICAgJ2Nsb3NlUGF0aCcsXG4gICAgJ2NyZWF0ZUxpbmVhckdyYWRpZW50JyxcbiAgICAnY3JlYXRlUGF0dGVybicsXG4gICAgJ2NyZWF0ZVJhZGlhbEdyYWRpZW50JyxcbiAgICAnZHJhd0ltYWdlJyxcbiAgICAnZmlsbCcsXG4gICAgJ2ZpbGxUZXh0JyxcbiAgICAnZ2V0SW1hZ2VEYXRhJyxcbiAgICAnY3JlYXRlSW1hZ2VEYXRhJyxcbiAgICAnbGluZVRvJyxcbiAgICAnbW92ZVRvJyxcbiAgICAncHV0SW1hZ2VEYXRhJyxcbiAgICAncXVhZHJhdGljQ3VydmVUbycsXG4gICAgJ3JlY3QnLFxuICAgICdyZXN0b3JlJyxcbiAgICAncm90YXRlJyxcbiAgICAnc2F2ZScsXG4gICAgJ3NjYWxlJyxcbiAgICAnc2V0TGluZURhc2gnLFxuICAgICdzZXRUcmFuc2Zvcm0nLFxuICAgICdzdHJva2UnLFxuICAgICdzdHJva2VUZXh0JyxcbiAgICAndHJhbnNmb3JtJyxcbiAgICAndHJhbnNsYXRlJ1xuXTtcbnZhciBDT05URVhUX1BST1BFUlRJRVMgPSBbXG4gICAgJ2ZpbGxTdHlsZScsXG4gICAgJ3N0cm9rZVN0eWxlJyxcbiAgICAnc2hhZG93Q29sb3InLFxuICAgICdzaGFkb3dCbHVyJyxcbiAgICAnc2hhZG93T2Zmc2V0WCcsXG4gICAgJ3NoYWRvd09mZnNldFknLFxuICAgICdsaW5lQ2FwJyxcbiAgICAnbGluZURhc2hPZmZzZXQnLFxuICAgICdsaW5lSm9pbicsXG4gICAgJ2xpbmVXaWR0aCcsXG4gICAgJ21pdGVyTGltaXQnLFxuICAgICdmb250JyxcbiAgICAndGV4dEFsaWduJyxcbiAgICAndGV4dEJhc2VsaW5lJyxcbiAgICAnZ2xvYmFsQWxwaGEnLFxuICAgICdnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24nXG5dO1xudmFyIHRyYWNlQXJyTWF4ID0gMTAwO1xudmFyIENvbnRleHQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRleHQoY2FudmFzKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gY2FudmFzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgaWYgKEdsb2JhbF8xLktvbnZhLmVuYWJsZVRyYWNlKSB7XG4gICAgICAgICAgICB0aGlzLnRyYWNlQXJyID0gW107XG4gICAgICAgICAgICB0aGlzLl9lbmFibGVUcmFjZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIENvbnRleHQucHJvdG90eXBlLmZpbGxTaGFwZSA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICBpZiAoc2hhcGUuZ2V0RmlsbEVuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fZmlsbChzaGFwZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLl9maWxsID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5zdHJva2VTaGFwZSA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICBpZiAoc2hhcGUuZ2V0U3Ryb2tlRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9zdHJva2Uoc2hhcGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5fc3Ryb2tlID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5maWxsU3Ryb2tlU2hhcGUgPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgaWYgKHNoYXBlLmdldEZpbGxFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGwoc2hhcGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaGFwZS5nZXRTdHJva2VFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0cm9rZShzaGFwZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmdldFRyYWNlID0gZnVuY3Rpb24gKHJlbGF4ZWQpIHtcbiAgICAgICAgdmFyIHRyYWNlQXJyID0gdGhpcy50cmFjZUFyciwgbGVuID0gdHJhY2VBcnIubGVuZ3RoLCBzdHIgPSAnJywgbiwgdHJhY2UsIG1ldGhvZCwgYXJncztcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICB0cmFjZSA9IHRyYWNlQXJyW25dO1xuICAgICAgICAgICAgbWV0aG9kID0gdHJhY2UubWV0aG9kO1xuICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgIGFyZ3MgPSB0cmFjZS5hcmdzO1xuICAgICAgICAgICAgICAgIHN0ciArPSBtZXRob2Q7XG4gICAgICAgICAgICAgICAgaWYgKHJlbGF4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9IERPVUJMRV9QQVJFTjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlsXzEuVXRpbC5faXNBcnJheShhcmdzWzBdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9IE9QRU5fUEFSRU5fQlJBQ0tFVCArIGFyZ3Muam9pbihDT01NQSkgKyBDTE9TRV9CUkFDS0VUX1BBUkVOO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9IE9QRU5fUEFSRU4gKyBhcmdzLmpvaW4oQ09NTUEpICsgQ0xPU0VfUEFSRU47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gdHJhY2UucHJvcGVydHk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZWxheGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBFUVVBTFMgKyB0cmFjZS52YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyICs9IFNFTUlDT0xPTjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuY2xlYXJUcmFjZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50cmFjZUFyciA9IFtdO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuX3RyYWNlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICB2YXIgdHJhY2VBcnIgPSB0aGlzLnRyYWNlQXJyLCBsZW47XG4gICAgICAgIHRyYWNlQXJyLnB1c2goc3RyKTtcbiAgICAgICAgbGVuID0gdHJhY2VBcnIubGVuZ3RoO1xuICAgICAgICBpZiAobGVuID49IHRyYWNlQXJyTWF4KSB7XG4gICAgICAgICAgICB0cmFjZUFyci5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBpeGVsUmF0aW8gPSB0aGlzLmdldENhbnZhcygpLmdldFBpeGVsUmF0aW8oKTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oMSAqIHBpeGVsUmF0aW8sIDAsIDAsIDEgKiBwaXhlbFJhdGlvLCAwLCAwKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmdldENhbnZhcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoYm91bmRzKSB7XG4gICAgICAgIHZhciBjYW52YXMgPSB0aGlzLmdldENhbnZhcygpO1xuICAgICAgICBpZiAoYm91bmRzKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyUmVjdChib3VuZHMueCB8fCAwLCBib3VuZHMueSB8fCAwLCBib3VuZHMud2lkdGggfHwgMCwgYm91bmRzLmhlaWdodCB8fCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy5nZXRXaWR0aCgpIC8gY2FudmFzLnBpeGVsUmF0aW8sIGNhbnZhcy5nZXRIZWlnaHQoKSAvIGNhbnZhcy5waXhlbFJhdGlvKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuX2FwcGx5TGluZUNhcCA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICB2YXIgbGluZUNhcCA9IHNoYXBlLmdldExpbmVDYXAoKTtcbiAgICAgICAgaWYgKGxpbmVDYXApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignbGluZUNhcCcsIGxpbmVDYXApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5fYXBwbHlPcGFjaXR5ID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgIHZhciBhYnNPcGFjaXR5ID0gc2hhcGUuZ2V0QWJzb2x1dGVPcGFjaXR5KCk7XG4gICAgICAgIGlmIChhYnNPcGFjaXR5ICE9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2dsb2JhbEFscGhhJywgYWJzT3BhY2l0eSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLl9hcHBseUxpbmVKb2luID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgIHZhciBsaW5lSm9pbiA9IHNoYXBlLmdldExpbmVKb2luKCk7XG4gICAgICAgIGlmIChsaW5lSm9pbikge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdsaW5lSm9pbicsIGxpbmVKb2luKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuc2V0QXR0ciA9IGZ1bmN0aW9uIChhdHRyLCB2YWwpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dFthdHRyXSA9IHZhbDtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmFyYyA9IGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuYXJjKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuYXJjVG8gPSBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmFyYyhhMCwgYTEsIGEyLCBhMywgYTQsIGE1KTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmJlZ2luUGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmJlemllckN1cnZlVG8gPSBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmJlemllckN1cnZlVG8oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5jbGVhclJlY3QgPSBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5jbGVhclJlY3QoYTAsIGExLCBhMiwgYTMpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuY2xpcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5jbGlwKCk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5jbG9zZVBhdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5jcmVhdGVJbWFnZURhdGEgPSBmdW5jdGlvbiAoYTAsIGExKSB7XG4gICAgICAgIHZhciBhID0gYXJndW1lbnRzO1xuICAgICAgICBpZiAoYS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmNyZWF0ZUltYWdlRGF0YShhMCwgYTEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGEubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5jcmVhdGVJbWFnZURhdGEoYTApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5jcmVhdGVMaW5lYXJHcmFkaWVudCA9IGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMykge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudChhMCwgYTEsIGEyLCBhMyk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5jcmVhdGVQYXR0ZXJuID0gZnVuY3Rpb24gKGEwLCBhMSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5jcmVhdGVQYXR0ZXJuKGEwLCBhMSk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5jcmVhdGVSYWRpYWxHcmFkaWVudCA9IGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuZHJhd0ltYWdlID0gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpIHtcbiAgICAgICAgdmFyIGEgPSBhcmd1bWVudHMsIF9jb250ZXh0ID0gdGhpcy5fY29udGV4dDtcbiAgICAgICAgaWYgKGEubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICBfY29udGV4dC5kcmF3SW1hZ2UoYTAsIGExLCBhMik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYS5sZW5ndGggPT09IDUpIHtcbiAgICAgICAgICAgIF9jb250ZXh0LmRyYXdJbWFnZShhMCwgYTEsIGEyLCBhMywgYTQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGEubGVuZ3RoID09PSA5KSB7XG4gICAgICAgICAgICBfY29udGV4dC5kcmF3SW1hZ2UoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmlzUG9pbnRJblBhdGggPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5pc1BvaW50SW5QYXRoKHgsIHkpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5maWxsKCk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5maWxsUmVjdCA9IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5zdHJva2VSZWN0ID0gZnVuY3Rpb24gKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2VSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuZmlsbFRleHQgPSBmdW5jdGlvbiAoYTAsIGExLCBhMikge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxUZXh0KGEwLCBhMSwgYTIpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUubWVhc3VyZVRleHQgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5tZWFzdXJlVGV4dCh0ZXh0KTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLmdldEltYWdlRGF0YSA9IGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMykge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoYTAsIGExLCBhMiwgYTMpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUubGluZVRvID0gZnVuY3Rpb24gKGEwLCBhMSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVUbyhhMCwgYTEpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUubW92ZVRvID0gZnVuY3Rpb24gKGEwLCBhMSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0Lm1vdmVUbyhhMCwgYTEpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUucmVjdCA9IGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMykge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnJlY3QoYTAsIGExLCBhMiwgYTMpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUucHV0SW1hZ2VEYXRhID0gZnVuY3Rpb24gKGEwLCBhMSwgYTIpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5wdXRJbWFnZURhdGEoYTAsIGExLCBhMik7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5xdWFkcmF0aWNDdXJ2ZVRvID0gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQucXVhZHJhdGljQ3VydmVUbyhhMCwgYTEsIGEyLCBhMyk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5yZXN0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uIChhMCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnJvdGF0ZShhMCk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnNhdmUoKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnNjYWxlID0gZnVuY3Rpb24gKGEwLCBhMSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnNjYWxlKGEwLCBhMSk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5zZXRMaW5lRGFzaCA9IGZ1bmN0aW9uIChhMCkge1xuICAgICAgICBpZiAodGhpcy5fY29udGV4dC5zZXRMaW5lRGFzaCkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5zZXRMaW5lRGFzaChhMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoJ21vekRhc2gnIGluIHRoaXMuX2NvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHRbJ21vekRhc2gnXSA9IGEwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCd3ZWJraXRMaW5lRGFzaCcgaW4gdGhpcy5fY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dFsnd2Via2l0TGluZURhc2gnXSA9IGEwO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5nZXRMaW5lRGFzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0TGluZURhc2goKTtcbiAgICB9O1xuICAgIENvbnRleHQucHJvdG90eXBlLnNldFRyYW5zZm9ybSA9IGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuc2V0VHJhbnNmb3JtKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuc3Ryb2tlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZSgpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUuc3Ryb2tlVGV4dCA9IGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMykge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZVRleHQoYTAsIGExLCBhMiwgYTMpO1xuICAgIH07XG4gICAgQ29udGV4dC5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC50cmFuc2Zvcm0oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS50cmFuc2xhdGUgPSBmdW5jdGlvbiAoYTAsIGExKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQudHJhbnNsYXRlKGEwLCBhMSk7XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5fZW5hYmxlVHJhY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcywgbGVuID0gQ09OVEVYVF9NRVRIT0RTLmxlbmd0aCwgX3NpbXBsaWZ5QXJyYXkgPSBVdGlsXzEuVXRpbC5fc2ltcGxpZnlBcnJheSwgb3JpZ1NldHRlciA9IHRoaXMuc2V0QXR0ciwgbiwgYXJncztcbiAgICAgICAgdmFyIGZ1bmMgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xuICAgICAgICAgICAgdmFyIG9yaWdNZXRob2QgPSB0aGF0W21ldGhvZE5hbWVdLCByZXQ7XG4gICAgICAgICAgICB0aGF0W21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGFyZ3MgPSBfc2ltcGxpZnlBcnJheShBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgICAgICByZXQgPSBvcmlnTWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgdGhhdC5fdHJhY2Uoe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IGFyZ3NcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICBmdW5jKENPTlRFWFRfTUVUSE9EU1tuXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5zZXRBdHRyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgb3JpZ1NldHRlci5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgdmFyIHByb3AgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICB2YXIgdmFsID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdzaGFkb3dPZmZzZXRYJyB8fFxuICAgICAgICAgICAgICAgIHByb3AgPT09ICdzaGFkb3dPZmZzZXRZJyB8fFxuICAgICAgICAgICAgICAgIHByb3AgPT09ICdzaGFkb3dCbHVyJykge1xuICAgICAgICAgICAgICAgIHZhbCA9IHZhbCAvIHRoaXMuY2FudmFzLmdldFBpeGVsUmF0aW8oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoYXQuX3RyYWNlKHtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogcHJvcCxcbiAgICAgICAgICAgICAgICB2YWw6IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBDb250ZXh0LnByb3RvdHlwZS5fYXBwbHlHbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB2YXIgZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gbm9kZS5nZXRHbG9iYWxDb21wb3NpdGVPcGVyYXRpb24oKTtcbiAgICAgICAgaWYgKGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiAhPT0gJ3NvdXJjZS1vdmVyJykge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24nLCBnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ29udGV4dDtcbn0oKSk7XG5leHBvcnRzLkNvbnRleHQgPSBDb250ZXh0O1xuQ09OVEVYVF9QUk9QRVJUSUVTLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29udGV4dC5wcm90b3R5cGUsIHByb3AsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dFtwcm9wXTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0W3Byb3BdID0gdmFsO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbnZhciBTY2VuZUNvbnRleHQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTY2VuZUNvbnRleHQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2NlbmVDb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIFNjZW5lQ29udGV4dC5wcm90b3R5cGUuX2ZpbGxDb2xvciA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICB2YXIgZmlsbCA9IHNoYXBlLmZpbGwoKTtcbiAgICAgICAgdGhpcy5zZXRBdHRyKCdmaWxsU3R5bGUnLCBmaWxsKTtcbiAgICAgICAgc2hhcGUuX2ZpbGxGdW5jKHRoaXMpO1xuICAgIH07XG4gICAgU2NlbmVDb250ZXh0LnByb3RvdHlwZS5fZmlsbFBhdHRlcm4gPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgdmFyIGZpbGxQYXR0ZXJuWCA9IHNoYXBlLmdldEZpbGxQYXR0ZXJuWCgpLCBmaWxsUGF0dGVyblkgPSBzaGFwZS5nZXRGaWxsUGF0dGVyblkoKSwgZmlsbFBhdHRlcm5TY2FsZVggPSBzaGFwZS5nZXRGaWxsUGF0dGVyblNjYWxlWCgpLCBmaWxsUGF0dGVyblNjYWxlWSA9IHNoYXBlLmdldEZpbGxQYXR0ZXJuU2NhbGVZKCksIGZpbGxQYXR0ZXJuUm90YXRpb24gPSBHbG9iYWxfMS5Lb252YS5nZXRBbmdsZShzaGFwZS5nZXRGaWxsUGF0dGVyblJvdGF0aW9uKCkpLCBmaWxsUGF0dGVybk9mZnNldFggPSBzaGFwZS5nZXRGaWxsUGF0dGVybk9mZnNldFgoKSwgZmlsbFBhdHRlcm5PZmZzZXRZID0gc2hhcGUuZ2V0RmlsbFBhdHRlcm5PZmZzZXRZKCk7XG4gICAgICAgIGlmIChmaWxsUGF0dGVyblggfHwgZmlsbFBhdHRlcm5ZKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZShmaWxsUGF0dGVyblggfHwgMCwgZmlsbFBhdHRlcm5ZIHx8IDApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWxsUGF0dGVyblJvdGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnJvdGF0ZShmaWxsUGF0dGVyblJvdGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlsbFBhdHRlcm5TY2FsZVggfHwgZmlsbFBhdHRlcm5TY2FsZVkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhbGUoZmlsbFBhdHRlcm5TY2FsZVgsIGZpbGxQYXR0ZXJuU2NhbGVZKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlsbFBhdHRlcm5PZmZzZXRYIHx8IGZpbGxQYXR0ZXJuT2Zmc2V0WSkge1xuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGUoLTEgKiBmaWxsUGF0dGVybk9mZnNldFgsIC0xICogZmlsbFBhdHRlcm5PZmZzZXRZKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEF0dHIoJ2ZpbGxTdHlsZScsIHNoYXBlLl9nZXRGaWxsUGF0dGVybigpKTtcbiAgICAgICAgc2hhcGUuX2ZpbGxGdW5jKHRoaXMpO1xuICAgIH07XG4gICAgU2NlbmVDb250ZXh0LnByb3RvdHlwZS5fZmlsbExpbmVhckdyYWRpZW50ID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgIHZhciBncmQgPSBzaGFwZS5fZ2V0TGluZWFyR3JhZGllbnQoKTtcbiAgICAgICAgaWYgKGdyZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdmaWxsU3R5bGUnLCBncmQpO1xuICAgICAgICAgICAgc2hhcGUuX2ZpbGxGdW5jKHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTY2VuZUNvbnRleHQucHJvdG90eXBlLl9maWxsUmFkaWFsR3JhZGllbnQgPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgdmFyIGdyZCA9IHNoYXBlLl9nZXRSYWRpYWxHcmFkaWVudCgpO1xuICAgICAgICBpZiAoZ3JkKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2ZpbGxTdHlsZScsIGdyZCk7XG4gICAgICAgICAgICBzaGFwZS5fZmlsbEZ1bmModGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNjZW5lQ29udGV4dC5wcm90b3R5cGUuX2ZpbGwgPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgdmFyIGhhc0NvbG9yID0gc2hhcGUuZmlsbCgpLCBmaWxsUHJpb3JpdHkgPSBzaGFwZS5nZXRGaWxsUHJpb3JpdHkoKTtcbiAgICAgICAgaWYgKGhhc0NvbG9yICYmIGZpbGxQcmlvcml0eSA9PT0gJ2NvbG9yJykge1xuICAgICAgICAgICAgdGhpcy5fZmlsbENvbG9yKHNoYXBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaGFzUGF0dGVybiA9IHNoYXBlLmdldEZpbGxQYXR0ZXJuSW1hZ2UoKTtcbiAgICAgICAgaWYgKGhhc1BhdHRlcm4gJiYgZmlsbFByaW9yaXR5ID09PSAncGF0dGVybicpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGxQYXR0ZXJuKHNoYXBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaGFzTGluZWFyR3JhZGllbnQgPSBzaGFwZS5nZXRGaWxsTGluZWFyR3JhZGllbnRDb2xvclN0b3BzKCk7XG4gICAgICAgIGlmIChoYXNMaW5lYXJHcmFkaWVudCAmJiBmaWxsUHJpb3JpdHkgPT09ICdsaW5lYXItZ3JhZGllbnQnKSB7XG4gICAgICAgICAgICB0aGlzLl9maWxsTGluZWFyR3JhZGllbnQoc2hhcGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoYXNSYWRpYWxHcmFkaWVudCA9IHNoYXBlLmdldEZpbGxSYWRpYWxHcmFkaWVudENvbG9yU3RvcHMoKTtcbiAgICAgICAgaWYgKGhhc1JhZGlhbEdyYWRpZW50ICYmIGZpbGxQcmlvcml0eSA9PT0gJ3JhZGlhbC1ncmFkaWVudCcpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGxSYWRpYWxHcmFkaWVudChzaGFwZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc0NvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9maWxsQ29sb3Ioc2hhcGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhhc1BhdHRlcm4pIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGxQYXR0ZXJuKHNoYXBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChoYXNMaW5lYXJHcmFkaWVudCkge1xuICAgICAgICAgICAgdGhpcy5fZmlsbExpbmVhckdyYWRpZW50KHNoYXBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChoYXNSYWRpYWxHcmFkaWVudCkge1xuICAgICAgICAgICAgdGhpcy5fZmlsbFJhZGlhbEdyYWRpZW50KHNoYXBlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU2NlbmVDb250ZXh0LnByb3RvdHlwZS5fc3Ryb2tlTGluZWFyR3JhZGllbnQgPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgdmFyIHN0YXJ0ID0gc2hhcGUuZ2V0U3Ryb2tlTGluZWFyR3JhZGllbnRTdGFydFBvaW50KCksIGVuZCA9IHNoYXBlLmdldFN0cm9rZUxpbmVhckdyYWRpZW50RW5kUG9pbnQoKSwgY29sb3JTdG9wcyA9IHNoYXBlLmdldFN0cm9rZUxpbmVhckdyYWRpZW50Q29sb3JTdG9wcygpLCBncmQgPSB0aGlzLmNyZWF0ZUxpbmVhckdyYWRpZW50KHN0YXJ0LngsIHN0YXJ0LnksIGVuZC54LCBlbmQueSk7XG4gICAgICAgIGlmIChjb2xvclN0b3BzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGNvbG9yU3RvcHMubGVuZ3RoOyBuICs9IDIpIHtcbiAgICAgICAgICAgICAgICBncmQuYWRkQ29sb3JTdG9wKGNvbG9yU3RvcHNbbl0sIGNvbG9yU3RvcHNbbiArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignc3Ryb2tlU3R5bGUnLCBncmQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTY2VuZUNvbnRleHQucHJvdG90eXBlLl9zdHJva2UgPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgdmFyIGRhc2ggPSBzaGFwZS5kYXNoKCksIHN0cm9rZVNjYWxlRW5hYmxlZCA9IHNoYXBlLmdldFN0cm9rZVNjYWxlRW5hYmxlZCgpO1xuICAgICAgICBpZiAoc2hhcGUuaGFzU3Ryb2tlKCkpIHtcbiAgICAgICAgICAgIGlmICghc3Ryb2tlU2NhbGVFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgICAgICAgICAgdmFyIHBpeGVsUmF0aW8gPSB0aGlzLmdldENhbnZhcygpLmdldFBpeGVsUmF0aW8oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRyYW5zZm9ybShwaXhlbFJhdGlvLCAwLCAwLCBwaXhlbFJhdGlvLCAwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2FwcGx5TGluZUNhcChzaGFwZSk7XG4gICAgICAgICAgICBpZiAoZGFzaCAmJiBzaGFwZS5kYXNoRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMaW5lRGFzaChkYXNoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2xpbmVEYXNoT2Zmc2V0Jywgc2hhcGUuZGFzaE9mZnNldCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignbGluZVdpZHRoJywgc2hhcGUuc3Ryb2tlV2lkdGgoKSk7XG4gICAgICAgICAgICBpZiAoIXNoYXBlLmdldFNoYWRvd0ZvclN0cm9rZUVuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cignc2hhZG93Q29sb3InLCAncmdiYSgwLDAsMCwwKScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGhhc0xpbmVhckdyYWRpZW50ID0gc2hhcGUuZ2V0U3Ryb2tlTGluZWFyR3JhZGllbnRDb2xvclN0b3BzKCk7XG4gICAgICAgICAgICBpZiAoaGFzTGluZWFyR3JhZGllbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJva2VMaW5lYXJHcmFkaWVudChzaGFwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHIoJ3N0cm9rZVN0eWxlJywgc2hhcGUuc3Ryb2tlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hhcGUuX3N0cm9rZUZ1bmModGhpcyk7XG4gICAgICAgICAgICBpZiAoIXN0cm9rZVNjYWxlRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTY2VuZUNvbnRleHQucHJvdG90eXBlLl9hcHBseVNoYWRvdyA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICB2YXIgdXRpbCA9IFV0aWxfMS5VdGlsLCBjb2xvciA9IHV0aWwuZ2V0KHNoYXBlLmdldFNoYWRvd1JHQkEoKSwgJ2JsYWNrJyksIGJsdXIgPSB1dGlsLmdldChzaGFwZS5nZXRTaGFkb3dCbHVyKCksIDUpLCBvZmZzZXQgPSB1dGlsLmdldChzaGFwZS5nZXRTaGFkb3dPZmZzZXQoKSwge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfSksIHNjYWxlID0gc2hhcGUuZ2V0QWJzb2x1dGVTY2FsZSgpLCByYXRpbyA9IHRoaXMuY2FudmFzLmdldFBpeGVsUmF0aW8oKSwgc2NhbGVYID0gc2NhbGUueCAqIHJhdGlvLCBzY2FsZVkgPSBzY2FsZS55ICogcmF0aW87XG4gICAgICAgIHRoaXMuc2V0QXR0cignc2hhZG93Q29sb3InLCBjb2xvcik7XG4gICAgICAgIHRoaXMuc2V0QXR0cignc2hhZG93Qmx1cicsIGJsdXIgKiBNYXRoLm1pbihNYXRoLmFicyhzY2FsZVgpLCBNYXRoLmFicyhzY2FsZVkpKSk7XG4gICAgICAgIHRoaXMuc2V0QXR0cignc2hhZG93T2Zmc2V0WCcsIG9mZnNldC54ICogc2NhbGVYKTtcbiAgICAgICAgdGhpcy5zZXRBdHRyKCdzaGFkb3dPZmZzZXRZJywgb2Zmc2V0LnkgKiBzY2FsZVkpO1xuICAgIH07XG4gICAgcmV0dXJuIFNjZW5lQ29udGV4dDtcbn0oQ29udGV4dCkpO1xuZXhwb3J0cy5TY2VuZUNvbnRleHQgPSBTY2VuZUNvbnRleHQ7XG52YXIgSGl0Q29udGV4dCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEhpdENvbnRleHQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSGl0Q29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBIaXRDb250ZXh0LnByb3RvdHlwZS5fZmlsbCA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICAgICAgdGhpcy5zZXRBdHRyKCdmaWxsU3R5bGUnLCBzaGFwZS5jb2xvcktleSk7XG4gICAgICAgIHNoYXBlLl9maWxsRnVuY0hpdCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZXN0b3JlKCk7XG4gICAgfTtcbiAgICBIaXRDb250ZXh0LnByb3RvdHlwZS5fc3Ryb2tlID0gZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgIGlmIChzaGFwZS5oYXNTdHJva2UoKSAmJiBzaGFwZS5oaXRTdHJva2VXaWR0aCgpKSB7XG4gICAgICAgICAgICB2YXIgc3Ryb2tlU2NhbGVFbmFibGVkID0gc2hhcGUuZ2V0U3Ryb2tlU2NhbGVFbmFibGVkKCk7XG4gICAgICAgICAgICBpZiAoIXN0cm9rZVNjYWxlRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBwaXhlbFJhdGlvID0gdGhpcy5nZXRDYW52YXMoKS5nZXRQaXhlbFJhdGlvKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0ocGl4ZWxSYXRpbywgMCwgMCwgcGl4ZWxSYXRpbywgMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hcHBseUxpbmVDYXAoc2hhcGUpO1xuICAgICAgICAgICAgdmFyIGhpdFN0cm9rZVdpZHRoID0gc2hhcGUuaGl0U3Ryb2tlV2lkdGgoKTtcbiAgICAgICAgICAgIHZhciBzdHJva2VXaWR0aCA9IGhpdFN0cm9rZVdpZHRoID09PSAnYXV0bycgPyBzaGFwZS5zdHJva2VXaWR0aCgpIDogaGl0U3Ryb2tlV2lkdGg7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2xpbmVXaWR0aCcsIHN0cm9rZVdpZHRoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignc3Ryb2tlU3R5bGUnLCBzaGFwZS5jb2xvcktleSk7XG4gICAgICAgICAgICBzaGFwZS5fc3Ryb2tlRnVuY0hpdCh0aGlzKTtcbiAgICAgICAgICAgIGlmICghc3Ryb2tlU2NhbGVFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBIaXRDb250ZXh0O1xufShDb250ZXh0KSk7XG5leHBvcnRzLkhpdENvbnRleHQgPSBIaXRDb250ZXh0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQW5pbWF0aW9uXzEgPSByZXF1aXJlKFwiLi9BbmltYXRpb25cIik7XG52YXIgR2xvYmFsXzEgPSByZXF1aXJlKFwiLi9HbG9iYWxcIik7XG5leHBvcnRzLkREID0ge1xuICAgIHN0YXJ0UG9pbnRlclBvczoge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgfSxcbiAgICBhbmltOiBuZXcgQW5pbWF0aW9uXzEuQW5pbWF0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGIgPSB0aGlzLmRpcnR5O1xuICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBiO1xuICAgIH0pLFxuICAgIGlzRHJhZ2dpbmc6IGZhbHNlLFxuICAgIGp1c3REcmFnZ2VkOiBmYWxzZSxcbiAgICBvZmZzZXQ6IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgIH0sXG4gICAgbm9kZTogbnVsbCxcbiAgICBfZHJhZzogZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICB2YXIgbm9kZSA9IGV4cG9ydHMuREQubm9kZTtcbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIGlmICghZXhwb3J0cy5ERC5pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IG5vZGUuZ2V0U3RhZ2UoKS5nZXRQb2ludGVyUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXBvcykge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmdldFN0YWdlKCkuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgICAgICAgICAgICAgcG9zID0gbm9kZS5nZXRTdGFnZSgpLmdldFBvaW50ZXJQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgZHJhZ0Rpc3RhbmNlID0gbm9kZS5kcmFnRGlzdGFuY2UoKTtcbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLm1heChNYXRoLmFicyhwb3MueCAtIGV4cG9ydHMuREQuc3RhcnRQb2ludGVyUG9zLngpLCBNYXRoLmFicyhwb3MueSAtIGV4cG9ydHMuREQuc3RhcnRQb2ludGVyUG9zLnkpKTtcbiAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCBkcmFnRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUuZ2V0U3RhZ2UoKS5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICAgICAgaWYgKCFleHBvcnRzLkRELmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRzLkRELmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG5vZGUuZmlyZSgnZHJhZ3N0YXJ0Jywge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZHJhZ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBub2RlLFxuICAgICAgICAgICAgICAgICAgICBldnQ6IGV2dFxuICAgICAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgICAgIGlmICghbm9kZS5pc0RyYWdnaW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUuX3NldERyYWdQb3NpdGlvbihldnQpO1xuICAgICAgICAgICAgbm9kZS5maXJlKCdkcmFnbW92ZScsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZHJhZ21vdmUnLFxuICAgICAgICAgICAgICAgIHRhcmdldDogbm9kZSxcbiAgICAgICAgICAgICAgICBldnQ6IGV2dFxuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9lbmREcmFnQmVmb3JlOiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHZhciBub2RlID0gZXhwb3J0cy5ERC5ub2RlO1xuICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgZXhwb3J0cy5ERC5hbmltLnN0b3AoKTtcbiAgICAgICAgICAgIGlmIChleHBvcnRzLkRELmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICBleHBvcnRzLkRELmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBleHBvcnRzLkRELmp1c3REcmFnZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBHbG9iYWxfMS5Lb252YS5saXN0ZW5DbGlja1RhcCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChldnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZ0LmRyYWdFbmROb2RlID0gbm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHBvcnRzLkRELm5vZGUgPSBudWxsO1xuICAgICAgICAgICAgdmFyIGRyYXdOb2RlID0gbm9kZS5nZXRMYXllcigpIHx8IChub2RlIGluc3RhbmNlb2YgR2xvYmFsXzEuS29udmFbJ1N0YWdlJ10gJiYgbm9kZSk7XG4gICAgICAgICAgICBpZiAoZHJhd05vZGUpIHtcbiAgICAgICAgICAgICAgICBkcmF3Tm9kZS5kcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9lbmREcmFnQWZ0ZXI6IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgZXZ0ID0gZXZ0IHx8IHt9O1xuICAgICAgICB2YXIgZHJhZ0VuZE5vZGUgPSBldnQuZHJhZ0VuZE5vZGU7XG4gICAgICAgIGlmIChldnQgJiYgZHJhZ0VuZE5vZGUpIHtcbiAgICAgICAgICAgIGRyYWdFbmROb2RlLmZpcmUoJ2RyYWdlbmQnLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2RyYWdlbmQnLFxuICAgICAgICAgICAgICAgIHRhcmdldDogZHJhZ0VuZE5vZGUsXG4gICAgICAgICAgICAgICAgZXZ0OiBldnRcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxufTtcbmlmIChHbG9iYWxfMS5Lb252YS5pc0Jyb3dzZXIpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGV4cG9ydHMuREQuX2VuZERyYWdCZWZvcmUsIHRydWUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGV4cG9ydHMuREQuX2VuZERyYWdCZWZvcmUsIHRydWUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBleHBvcnRzLkRELl9kcmFnKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZXhwb3J0cy5ERC5fZHJhZyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBleHBvcnRzLkRELl9lbmREcmFnQWZ0ZXIsIGZhbHNlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBleHBvcnRzLkRELl9lbmREcmFnQWZ0ZXIsIGZhbHNlKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFV0aWxfMSA9IHJlcXVpcmUoXCIuL1V0aWxcIik7XG52YXIgVmFsaWRhdG9yc18xID0gcmVxdWlyZShcIi4vVmFsaWRhdG9yc1wiKTtcbnZhciBHRVQgPSAnZ2V0JywgU0VUID0gJ3NldCc7XG5leHBvcnRzLkZhY3RvcnkgPSB7XG4gICAgYWRkR2V0dGVyU2V0dGVyOiBmdW5jdGlvbiAoY29uc3RydWN0b3IsIGF0dHIsIGRlZiwgdmFsaWRhdG9yLCBhZnRlcikge1xuICAgICAgICB0aGlzLmFkZEdldHRlcihjb25zdHJ1Y3RvciwgYXR0ciwgZGVmKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0ZXIoY29uc3RydWN0b3IsIGF0dHIsIHZhbGlkYXRvciwgYWZ0ZXIpO1xuICAgICAgICB0aGlzLmFkZE92ZXJsb2FkZWRHZXR0ZXJTZXR0ZXIoY29uc3RydWN0b3IsIGF0dHIpO1xuICAgIH0sXG4gICAgYWRkR2V0dGVyOiBmdW5jdGlvbiAoY29uc3RydWN0b3IsIGF0dHIsIGRlZikge1xuICAgICAgICB2YXIgbWV0aG9kID0gR0VUICsgVXRpbF8xLlV0aWwuX2NhcGl0YWxpemUoYXR0cik7XG4gICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2RdID1cbiAgICAgICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2RdIHx8XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0gdGhpcy5hdHRyc1thdHRyXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbCA9PT0gdW5kZWZpbmVkID8gZGVmIDogdmFsO1xuICAgICAgICAgICAgICAgIH07XG4gICAgfSxcbiAgICBhZGRTZXR0ZXI6IGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgYXR0ciwgdmFsaWRhdG9yLCBhZnRlcikge1xuICAgICAgICB2YXIgbWV0aG9kID0gU0VUICsgVXRpbF8xLlV0aWwuX2NhcGl0YWxpemUoYXR0cik7XG4gICAgICAgIGlmICghY29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZF0pIHtcbiAgICAgICAgICAgIGV4cG9ydHMuRmFjdG9yeS5vdmVyV3JpdGVTZXR0ZXIoY29uc3RydWN0b3IsIGF0dHIsIHZhbGlkYXRvciwgYWZ0ZXIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBvdmVyV3JpdGVTZXR0ZXI6IGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgYXR0ciwgdmFsaWRhdG9yLCBhZnRlcikge1xuICAgICAgICB2YXIgbWV0aG9kID0gU0VUICsgVXRpbF8xLlV0aWwuX2NhcGl0YWxpemUoYXR0cik7XG4gICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRvciAmJiB2YWwgIT09IHVuZGVmaW5lZCAmJiB2YWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWxpZGF0b3IuY2FsbCh0aGlzLCB2YWwsIGF0dHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc2V0QXR0cihhdHRyLCB2YWwpO1xuICAgICAgICAgICAgaWYgKGFmdGVyKSB7XG4gICAgICAgICAgICAgICAgYWZ0ZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgYWRkQ29tcG9uZW50c0dldHRlclNldHRlcjogZnVuY3Rpb24gKGNvbnN0cnVjdG9yLCBhdHRyLCBjb21wb25lbnRzLCB2YWxpZGF0b3IsIGFmdGVyKSB7XG4gICAgICAgIHZhciBsZW4gPSBjb21wb25lbnRzLmxlbmd0aCwgY2FwaXRhbGl6ZSA9IFV0aWxfMS5VdGlsLl9jYXBpdGFsaXplLCBnZXR0ZXIgPSBHRVQgKyBjYXBpdGFsaXplKGF0dHIpLCBzZXR0ZXIgPSBTRVQgKyBjYXBpdGFsaXplKGF0dHIpLCBuLCBjb21wb25lbnQ7XG4gICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZVtnZXR0ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJldCA9IHt9O1xuICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50c1tuXTtcbiAgICAgICAgICAgICAgICByZXRbY29tcG9uZW50XSA9IHRoaXMuZ2V0QXR0cihhdHRyICsgY2FwaXRhbGl6ZShjb21wb25lbnQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBiYXNpY1ZhbGlkYXRvciA9IFZhbGlkYXRvcnNfMS5nZXRDb21wb25lbnRWYWxpZGF0b3IoY29tcG9uZW50cyk7XG4gICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZVtzZXR0ZXJdID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgdmFyIG9sZFZhbCA9IHRoaXMuYXR0cnNbYXR0cl0sIGtleTtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWxpZGF0b3IuY2FsbCh0aGlzLCB2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJhc2ljVmFsaWRhdG9yKSB7XG4gICAgICAgICAgICAgICAgYmFzaWNWYWxpZGF0b3IuY2FsbCh0aGlzLCB2YWwsIGF0dHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChrZXkgaW4gdmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWwuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0QXR0cihhdHRyICsgY2FwaXRhbGl6ZShrZXkpLCB2YWxba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9maXJlQ2hhbmdlRXZlbnQoYXR0ciwgb2xkVmFsLCB2YWwpO1xuICAgICAgICAgICAgaWYgKGFmdGVyKSB7XG4gICAgICAgICAgICAgICAgYWZ0ZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFkZE92ZXJsb2FkZWRHZXR0ZXJTZXR0ZXIoY29uc3RydWN0b3IsIGF0dHIpO1xuICAgIH0sXG4gICAgYWRkT3ZlcmxvYWRlZEdldHRlclNldHRlcjogZnVuY3Rpb24gKGNvbnN0cnVjdG9yLCBhdHRyKSB7XG4gICAgICAgIHZhciBjYXBpdGFsaXplZEF0dHIgPSBVdGlsXzEuVXRpbC5fY2FwaXRhbGl6ZShhdHRyKSwgc2V0dGVyID0gU0VUICsgY2FwaXRhbGl6ZWRBdHRyLCBnZXR0ZXIgPSBHRVQgKyBjYXBpdGFsaXplZEF0dHI7XG4gICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZVthdHRyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpc1tzZXR0ZXJdKGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpc1tnZXR0ZXJdKCk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBhZGREZXByZWNhdGVkR2V0dGVyU2V0dGVyOiBmdW5jdGlvbiAoY29uc3RydWN0b3IsIGF0dHIsIGRlZiwgdmFsaWRhdG9yKSB7XG4gICAgICAgIFV0aWxfMS5VdGlsLmVycm9yKCdBZGRpbmcgZGVwcmVjYXRlZCAnICsgYXR0cik7XG4gICAgICAgIHZhciBtZXRob2QgPSBHRVQgKyBVdGlsXzEuVXRpbC5fY2FwaXRhbGl6ZShhdHRyKTtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRyICtcbiAgICAgICAgICAgICcgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIHNvb24uIExvb2sgYXQgS29udmEgY2hhbmdlIGxvZyBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nO1xuICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgICAgICAgdmFyIHZhbCA9IHRoaXMuYXR0cnNbYXR0cl07XG4gICAgICAgICAgICByZXR1cm4gdmFsID09PSB1bmRlZmluZWQgPyBkZWYgOiB2YWw7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWRkU2V0dGVyKGNvbnN0cnVjdG9yLCBhdHRyLCB2YWxpZGF0b3IsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hZGRPdmVybG9hZGVkR2V0dGVyU2V0dGVyKGNvbnN0cnVjdG9yLCBhdHRyKTtcbiAgICB9LFxuICAgIGJhY2tDb21wYXQ6IGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgbWV0aG9kcykge1xuICAgICAgICBVdGlsXzEuVXRpbC5lYWNoKG1ldGhvZHMsIGZ1bmN0aW9uIChvbGRNZXRob2ROYW1lLCBuZXdNZXRob2ROYW1lKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gY29uc3RydWN0b3IucHJvdG90eXBlW25ld01ldGhvZE5hbWVdO1xuICAgICAgICAgICAgdmFyIG9sZEdldHRlciA9IEdFVCArIFV0aWxfMS5VdGlsLl9jYXBpdGFsaXplKG9sZE1ldGhvZE5hbWUpO1xuICAgICAgICAgICAgdmFyIG9sZFNldHRlciA9IFNFVCArIFV0aWxfMS5VdGlsLl9jYXBpdGFsaXplKG9sZE1ldGhvZE5hbWUpO1xuICAgICAgICAgICAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICAgICAgICAgICAgICBtZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICBVdGlsXzEuVXRpbC5lcnJvcignXCInICtcbiAgICAgICAgICAgICAgICAgICAgb2xkTWV0aG9kTmFtZSArXG4gICAgICAgICAgICAgICAgICAgICdcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIHNvb24uIFVzZSBcIlwiJyArXG4gICAgICAgICAgICAgICAgICAgIG5ld01ldGhvZE5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgaW5zdGVhZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZVtvbGRNZXRob2ROYW1lXSA9IGRlcHJlY2F0ZWQ7XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbb2xkR2V0dGVyXSA9IGRlcHJlY2F0ZWQ7XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbb2xkU2V0dGVyXSA9IGRlcHJlY2F0ZWQ7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgYWZ0ZXJTZXRGaWx0ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZmlsdGVyVXBUb0RhdGUgPSBmYWxzZTtcbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUElfT1ZFUl8xODAgPSBNYXRoLlBJIC8gMTgwO1xuZnVuY3Rpb24gZGV0ZWN0QnJvd3NlcigpIHtcbiAgICByZXR1cm4gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICh7fS50b1N0cmluZy5jYWxsKHdpbmRvdykgPT09ICdbb2JqZWN0IFdpbmRvd10nIHx8XG4gICAgICAgICAgICB7fS50b1N0cmluZy5jYWxsKHdpbmRvdykgPT09ICdbb2JqZWN0IGdsb2JhbF0nKSk7XG59XG52YXIgX2RldGVjdElFID0gZnVuY3Rpb24gKHVhKSB7XG4gICAgdmFyIG1zaWUgPSB1YS5pbmRleE9mKCdtc2llICcpO1xuICAgIGlmIChtc2llID4gMCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodWEuc3Vic3RyaW5nKG1zaWUgKyA1LCB1YS5pbmRleE9mKCcuJywgbXNpZSkpLCAxMCk7XG4gICAgfVxuICAgIHZhciB0cmlkZW50ID0gdWEuaW5kZXhPZigndHJpZGVudC8nKTtcbiAgICBpZiAodHJpZGVudCA+IDApIHtcbiAgICAgICAgdmFyIHJ2ID0gdWEuaW5kZXhPZigncnY6Jyk7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh1YS5zdWJzdHJpbmcocnYgKyAzLCB1YS5pbmRleE9mKCcuJywgcnYpKSwgMTApO1xuICAgIH1cbiAgICB2YXIgZWRnZSA9IHVhLmluZGV4T2YoJ2VkZ2UvJyk7XG4gICAgaWYgKGVkZ2UgPiAwKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh1YS5zdWJzdHJpbmcoZWRnZSArIDUsIHVhLmluZGV4T2YoJy4nLCBlZGdlKSksIDEwKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbmV4cG9ydHMuX3BhcnNlVUEgPSBmdW5jdGlvbiAodXNlckFnZW50KSB7XG4gICAgdmFyIHVhID0gdXNlckFnZW50LnRvTG93ZXJDYXNlKCksIG1hdGNoID0gLyhjaHJvbWUpWyAvXShbXFx3Ll0rKS8uZXhlYyh1YSkgfHxcbiAgICAgICAgLyh3ZWJraXQpWyAvXShbXFx3Ll0rKS8uZXhlYyh1YSkgfHxcbiAgICAgICAgLyhvcGVyYSkoPzouKnZlcnNpb258KVsgL10oW1xcdy5dKykvLmV4ZWModWEpIHx8XG4gICAgICAgIC8obXNpZSkgKFtcXHcuXSspLy5leGVjKHVhKSB8fFxuICAgICAgICAodWEuaW5kZXhPZignY29tcGF0aWJsZScpIDwgMCAmJlxuICAgICAgICAgICAgLyhtb3ppbGxhKSg/Oi4qPyBydjooW1xcdy5dKyl8KS8uZXhlYyh1YSkpIHx8XG4gICAgICAgIFtdLCBtb2JpbGUgPSAhIXVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZHxCbGFja0JlcnJ5fGlQaG9uZXxpUGFkfGlQb2R8T3BlcmEgTWluaXxJRU1vYmlsZS9pKSwgaWVNb2JpbGUgPSAhIXVzZXJBZ2VudC5tYXRjaCgvSUVNb2JpbGUvaSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYnJvd3NlcjogbWF0Y2hbMV0gfHwgJycsXG4gICAgICAgIHZlcnNpb246IG1hdGNoWzJdIHx8ICcwJyxcbiAgICAgICAgaXNJRTogX2RldGVjdElFKHVhKSxcbiAgICAgICAgbW9iaWxlOiBtb2JpbGUsXG4gICAgICAgIGllTW9iaWxlOiBpZU1vYmlsZVxuICAgIH07XG59O1xuZXhwb3J0cy5nbG9iID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IGdsb2JhbFxuICAgIDogdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyB3aW5kb3dcbiAgICAgICAgOiB0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICA/IHNlbGZcbiAgICAgICAgICAgIDoge307XG5leHBvcnRzLktvbnZhID0ge1xuICAgIHZlcnNpb246ICczLjIuNicsXG4gICAgaXNCcm93c2VyOiBkZXRlY3RCcm93c2VyKCksXG4gICAgaXNVbm1pbmlmaWVkOiAvcGFyYW0vLnRlc3QoZnVuY3Rpb24gKHBhcmFtKSB7IH0udG9TdHJpbmcoKSksXG4gICAgZGJsQ2xpY2tXaW5kb3c6IDQwMCxcbiAgICBnZXRBbmdsZTogZnVuY3Rpb24gKGFuZ2xlKSB7XG4gICAgICAgIHJldHVybiBleHBvcnRzLktvbnZhLmFuZ2xlRGVnID8gYW5nbGUgKiBQSV9PVkVSXzE4MCA6IGFuZ2xlO1xuICAgIH0sXG4gICAgZW5hYmxlVHJhY2U6IGZhbHNlLFxuICAgIGxpc3RlbkNsaWNrVGFwOiBmYWxzZSxcbiAgICBpbkRibENsaWNrV2luZG93OiBmYWxzZSxcbiAgICBwaXhlbFJhdGlvOiB1bmRlZmluZWQsXG4gICAgZHJhZ0Rpc3RhbmNlOiAzLFxuICAgIGFuZ2xlRGVnOiB0cnVlLFxuICAgIHNob3dXYXJuaW5nczogdHJ1ZSxcbiAgICBkcmFnQnV0dG9uczogWzAsIDFdLFxuICAgIGlzRHJhZ2dpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuS29udmFbJ0REJ10uaXNEcmFnZ2luZztcbiAgICB9LFxuICAgIGlzRHJhZ1JlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhIWV4cG9ydHMuS29udmFbJ0REJ10ubm9kZTtcbiAgICB9LFxuICAgIFVBOiBleHBvcnRzLl9wYXJzZVVBKChleHBvcnRzLmdsb2IubmF2aWdhdG9yICYmIGV4cG9ydHMuZ2xvYi5uYXZpZ2F0b3IudXNlckFnZW50KSB8fCAnJyksXG4gICAgZG9jdW1lbnQ6IGV4cG9ydHMuZ2xvYi5kb2N1bWVudCxcbiAgICBfaW5qZWN0R2xvYmFsOiBmdW5jdGlvbiAoS29udmEpIHtcbiAgICAgICAgZXhwb3J0cy5nbG9iLktvbnZhID0gS29udmE7XG4gICAgfSxcbiAgICBfcGFyc2VVQTogZXhwb3J0cy5fcGFyc2VVQVxufTtcbmV4cG9ydHMuX05PREVTX1JFR0lTVFJZID0ge307XG5leHBvcnRzLl9yZWdpc3Rlck5vZGUgPSBmdW5jdGlvbiAoTm9kZUNsYXNzKSB7XG4gICAgZXhwb3J0cy5fTk9ERVNfUkVHSVNUUllbTm9kZUNsYXNzLnByb3RvdHlwZS5nZXRDbGFzc05hbWUoKV0gPSBOb2RlQ2xhc3M7XG4gICAgZXhwb3J0cy5Lb252YVtOb2RlQ2xhc3MucHJvdG90eXBlLmdldENsYXNzTmFtZSgpXSA9IE5vZGVDbGFzcztcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFV0aWxfMSA9IHJlcXVpcmUoXCIuL1V0aWxcIik7XG52YXIgQ29udGFpbmVyXzEgPSByZXF1aXJlKFwiLi9Db250YWluZXJcIik7XG52YXIgRmFjdG9yeV8xID0gcmVxdWlyZShcIi4vRmFjdG9yeVwiKTtcbnZhciBCYXNlTGF5ZXJfMSA9IHJlcXVpcmUoXCIuL0Jhc2VMYXllclwiKTtcbnZhciBDYW52YXNfMSA9IHJlcXVpcmUoXCIuL0NhbnZhc1wiKTtcbnZhciBTaGFwZV8xID0gcmVxdWlyZShcIi4vU2hhcGVcIik7XG52YXIgVmFsaWRhdG9yc18xID0gcmVxdWlyZShcIi4vVmFsaWRhdG9yc1wiKTtcbnZhciBHbG9iYWxfMSA9IHJlcXVpcmUoXCIuL0dsb2JhbFwiKTtcbnZhciBIQVNIID0gJyMnLCBCRUZPUkVfRFJBVyA9ICdiZWZvcmVEcmF3JywgRFJBVyA9ICdkcmF3JywgSU5URVJTRUNUSU9OX09GRlNFVFMgPSBbXG4gICAgeyB4OiAwLCB5OiAwIH0sXG4gICAgeyB4OiAtMSwgeTogLTEgfSxcbiAgICB7IHg6IDEsIHk6IC0xIH0sXG4gICAgeyB4OiAxLCB5OiAxIH0sXG4gICAgeyB4OiAtMSwgeTogMSB9XG5dLCBJTlRFUlNFQ1RJT05fT0ZGU0VUU19MRU4gPSBJTlRFUlNFQ1RJT05fT0ZGU0VUUy5sZW5ndGg7XG52YXIgTGF5ZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhMYXllciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBMYXllcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmhpdENhbnZhcyA9IG5ldyBDYW52YXNfMS5IaXRDYW52YXMoe1xuICAgICAgICAgICAgcGl4ZWxSYXRpbzogMVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBMYXllci5wcm90b3R5cGUuX3NldENhbnZhc1NpemUgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLmNhbnZhcy5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLmhpdENhbnZhcy5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgIH07XG4gICAgTGF5ZXIucHJvdG90eXBlLl92YWxpZGF0ZUFkZCA9IGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICB2YXIgdHlwZSA9IGNoaWxkLmdldFR5cGUoKTtcbiAgICAgICAgaWYgKHR5cGUgIT09ICdHcm91cCcgJiYgdHlwZSAhPT0gJ1NoYXBlJykge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwudGhyb3coJ1lvdSBtYXkgb25seSBhZGQgZ3JvdXBzIGFuZCBzaGFwZXMgdG8gYSBsYXllci4nKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTGF5ZXIucHJvdG90eXBlLmdldEludGVyc2VjdGlvbiA9IGZ1bmN0aW9uIChwb3MsIHNlbGVjdG9yKSB7XG4gICAgICAgIHZhciBvYmosIGksIGludGVyc2VjdGlvbk9mZnNldCwgc2hhcGU7XG4gICAgICAgIGlmICghdGhpcy5oaXRHcmFwaEVuYWJsZWQoKSB8fCAhdGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNwaXJhbFNlYXJjaERpc3RhbmNlID0gMTtcbiAgICAgICAgdmFyIGNvbnRpbnVlU2VhcmNoID0gZmFsc2U7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgSU5URVJTRUNUSU9OX09GRlNFVFNfTEVOOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbnRlcnNlY3Rpb25PZmZzZXQgPSBJTlRFUlNFQ1RJT05fT0ZGU0VUU1tpXTtcbiAgICAgICAgICAgICAgICBvYmogPSB0aGlzLl9nZXRJbnRlcnNlY3Rpb24oe1xuICAgICAgICAgICAgICAgICAgICB4OiBwb3MueCArIGludGVyc2VjdGlvbk9mZnNldC54ICogc3BpcmFsU2VhcmNoRGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgIHk6IHBvcy55ICsgaW50ZXJzZWN0aW9uT2Zmc2V0LnkgKiBzcGlyYWxTZWFyY2hEaXN0YW5jZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNoYXBlID0gb2JqLnNoYXBlO1xuICAgICAgICAgICAgICAgIGlmIChzaGFwZSAmJiBzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hhcGUuZmluZEFuY2VzdG9yKHNlbGVjdG9yLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2hhcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNoYXBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250aW51ZVNlYXJjaCA9ICEhb2JqLmFudGlhbGlhc2VkO1xuICAgICAgICAgICAgICAgIGlmICghb2JqLmFudGlhbGlhc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb250aW51ZVNlYXJjaCkge1xuICAgICAgICAgICAgICAgIHNwaXJhbFNlYXJjaERpc3RhbmNlICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTGF5ZXIucHJvdG90eXBlLl9nZXRJbnRlcnNlY3Rpb24gPSBmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgIHZhciByYXRpbyA9IHRoaXMuaGl0Q2FudmFzLnBpeGVsUmF0aW87XG4gICAgICAgIHZhciBwID0gdGhpcy5oaXRDYW52YXMuY29udGV4dC5nZXRJbWFnZURhdGEoTWF0aC5yb3VuZChwb3MueCAqIHJhdGlvKSwgTWF0aC5yb3VuZChwb3MueSAqIHJhdGlvKSwgMSwgMSkuZGF0YSwgcDMgPSBwWzNdLCBjb2xvcktleSwgc2hhcGU7XG4gICAgICAgIGlmIChwMyA9PT0gMjU1KSB7XG4gICAgICAgICAgICBjb2xvcktleSA9IFV0aWxfMS5VdGlsLl9yZ2JUb0hleChwWzBdLCBwWzFdLCBwWzJdKTtcbiAgICAgICAgICAgIHNoYXBlID0gU2hhcGVfMS5zaGFwZXNbSEFTSCArIGNvbG9yS2V5XTtcbiAgICAgICAgICAgIGlmIChzaGFwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlOiBzaGFwZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFudGlhbGlhc2VkOiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHAzID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhbnRpYWxpYXNlZDogdHJ1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge307XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUuZHJhd1NjZW5lID0gZnVuY3Rpb24gKGNhbiwgdG9wKSB7XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKSwgY2FudmFzID0gY2FuIHx8IChsYXllciAmJiBsYXllci5nZXRDYW52YXMoKSk7XG4gICAgICAgIHRoaXMuX2ZpcmUoQkVGT1JFX0RSQVcsIHtcbiAgICAgICAgICAgIG5vZGU6IHRoaXNcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmNsZWFyQmVmb3JlRHJhdygpKSB7XG4gICAgICAgICAgICBjYW52YXMuZ2V0Q29udGV4dCgpLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgQ29udGFpbmVyXzEuQ29udGFpbmVyLnByb3RvdHlwZS5kcmF3U2NlbmUuY2FsbCh0aGlzLCBjYW52YXMsIHRvcCk7XG4gICAgICAgIHRoaXMuX2ZpcmUoRFJBVywge1xuICAgICAgICAgICAgbm9kZTogdGhpc1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUuZHJhd0hpdCA9IGZ1bmN0aW9uIChjYW4sIHRvcCkge1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCksIGNhbnZhcyA9IGNhbiB8fCAobGF5ZXIgJiYgbGF5ZXIuaGl0Q2FudmFzKTtcbiAgICAgICAgaWYgKGxheWVyICYmIGxheWVyLmNsZWFyQmVmb3JlRHJhdygpKSB7XG4gICAgICAgICAgICBsYXllclxuICAgICAgICAgICAgICAgIC5nZXRIaXRDYW52YXMoKVxuICAgICAgICAgICAgICAgIC5nZXRDb250ZXh0KClcbiAgICAgICAgICAgICAgICAuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgICBDb250YWluZXJfMS5Db250YWluZXIucHJvdG90eXBlLmRyYXdIaXQuY2FsbCh0aGlzLCBjYW52YXMsIHRvcCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTGF5ZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKGJvdW5kcykge1xuICAgICAgICBCYXNlTGF5ZXJfMS5CYXNlTGF5ZXIucHJvdG90eXBlLmNsZWFyLmNhbGwodGhpcywgYm91bmRzKTtcbiAgICAgICAgdGhpcy5nZXRIaXRDYW52YXMoKVxuICAgICAgICAgICAgLmdldENvbnRleHQoKVxuICAgICAgICAgICAgLmNsZWFyKGJvdW5kcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTGF5ZXIucHJvdG90eXBlLmVuYWJsZUhpdEdyYXBoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmhpdEdyYXBoRW5hYmxlZCh0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUuZGlzYWJsZUhpdEdyYXBoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmhpdEdyYXBoRW5hYmxlZChmYWxzZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTGF5ZXIucHJvdG90eXBlLnRvZ2dsZUhpdENhbnZhcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudDtcbiAgICAgICAgdmFyIGFkZGVkID0gISF0aGlzLmhpdENhbnZhcy5fY2FudmFzLnBhcmVudE5vZGU7XG4gICAgICAgIGlmIChhZGRlZCkge1xuICAgICAgICAgICAgcGFyZW50LmNvbnRlbnQucmVtb3ZlQ2hpbGQodGhpcy5oaXRDYW52YXMuX2NhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnQuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmhpdENhbnZhcy5fY2FudmFzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTGF5ZXIucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIHdpZHRoID0gX2Eud2lkdGgsIGhlaWdodCA9IF9hLmhlaWdodDtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5zZXRTaXplLmNhbGwodGhpcywgeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH0pO1xuICAgICAgICB0aGlzLmhpdENhbnZhcy5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBMYXllcjtcbn0oQmFzZUxheWVyXzEuQmFzZUxheWVyKSk7XG5leHBvcnRzLkxheWVyID0gTGF5ZXI7XG5MYXllci5wcm90b3R5cGUubm9kZVR5cGUgPSAnTGF5ZXInO1xuR2xvYmFsXzEuX3JlZ2lzdGVyTm9kZShMYXllcik7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTGF5ZXIsICdoaXRHcmFwaEVuYWJsZWQnLCB0cnVlLCBWYWxpZGF0b3JzXzEuZ2V0Qm9vbGVhblZhbGlkYXRvcigpKTtcblV0aWxfMS5Db2xsZWN0aW9uLm1hcE1ldGhvZHMoTGF5ZXIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVXRpbF8xID0gcmVxdWlyZShcIi4vVXRpbFwiKTtcbnZhciBGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi9GYWN0b3J5XCIpO1xudmFyIENhbnZhc18xID0gcmVxdWlyZShcIi4vQ2FudmFzXCIpO1xudmFyIEdsb2JhbF8xID0gcmVxdWlyZShcIi4vR2xvYmFsXCIpO1xudmFyIERyYWdBbmREcm9wXzEgPSByZXF1aXJlKFwiLi9EcmFnQW5kRHJvcFwiKTtcbnZhciBWYWxpZGF0b3JzXzEgPSByZXF1aXJlKFwiLi9WYWxpZGF0b3JzXCIpO1xuZXhwb3J0cy5pZHMgPSB7fTtcbmV4cG9ydHMubmFtZXMgPSB7fTtcbnZhciBfYWRkSWQgPSBmdW5jdGlvbiAobm9kZSwgaWQpIHtcbiAgICBpZiAoIWlkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZXhwb3J0cy5pZHNbaWRdID0gbm9kZTtcbn07XG5leHBvcnRzLl9yZW1vdmVJZCA9IGZ1bmN0aW9uIChpZCwgbm9kZSkge1xuICAgIGlmICghaWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZXhwb3J0cy5pZHNbaWRdICE9PSBub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGVsZXRlIGV4cG9ydHMuaWRzW2lkXTtcbn07XG5leHBvcnRzLl9hZGROYW1lID0gZnVuY3Rpb24gKG5vZGUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSkge1xuICAgICAgICBpZiAoIWV4cG9ydHMubmFtZXNbbmFtZV0pIHtcbiAgICAgICAgICAgIGV4cG9ydHMubmFtZXNbbmFtZV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRzLm5hbWVzW25hbWVdLnB1c2gobm9kZSk7XG4gICAgfVxufTtcbmV4cG9ydHMuX3JlbW92ZU5hbWUgPSBmdW5jdGlvbiAobmFtZSwgX2lkKSB7XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIG5vZGVzID0gZXhwb3J0cy5uYW1lc1tuYW1lXTtcbiAgICBpZiAoIW5vZGVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yICh2YXIgbiA9IDA7IG4gPCBub2Rlcy5sZW5ndGg7IG4rKykge1xuICAgICAgICB2YXIgbm8gPSBub2Rlc1tuXTtcbiAgICAgICAgaWYgKG5vLl9pZCA9PT0gX2lkKSB7XG4gICAgICAgICAgICBub2Rlcy5zcGxpY2UobiwgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBkZWxldGUgZXhwb3J0cy5uYW1lc1tuYW1lXTtcbiAgICB9XG59O1xudmFyIEFCU09MVVRFX09QQUNJVFkgPSAnYWJzb2x1dGVPcGFjaXR5JywgQUJTT0xVVEVfVFJBTlNGT1JNID0gJ2Fic29sdXRlVHJhbnNmb3JtJywgQUJTT0xVVEVfU0NBTEUgPSAnYWJzb2x1dGVTY2FsZScsIENBTlZBUyA9ICdjYW52YXMnLCBDSEFOR0UgPSAnQ2hhbmdlJywgQ0hJTERSRU4gPSAnY2hpbGRyZW4nLCBLT05WQSA9ICdrb252YScsIExJU1RFTklORyA9ICdsaXN0ZW5pbmcnLCBNT1VTRUVOVEVSID0gJ21vdXNlZW50ZXInLCBNT1VTRUxFQVZFID0gJ21vdXNlbGVhdmUnLCBOQU1FID0gJ25hbWUnLCBTRVQgPSAnc2V0JywgU0hBUEUgPSAnU2hhcGUnLCBTUEFDRSA9ICcgJywgU1RBR0UgPSAnc3RhZ2UnLCBUUkFOU0ZPUk0gPSAndHJhbnNmb3JtJywgVVBQRVJfU1RBR0UgPSAnU3RhZ2UnLCBWSVNJQkxFID0gJ3Zpc2libGUnLCBDTE9ORV9CTEFDS19MSVNUID0gWydpZCddLCBUUkFOU0ZPUk1fQ0hBTkdFX1NUUiA9IFtcbiAgICAneENoYW5nZS5rb252YScsXG4gICAgJ3lDaGFuZ2Uua29udmEnLFxuICAgICdzY2FsZVhDaGFuZ2Uua29udmEnLFxuICAgICdzY2FsZVlDaGFuZ2Uua29udmEnLFxuICAgICdza2V3WENoYW5nZS5rb252YScsXG4gICAgJ3NrZXdZQ2hhbmdlLmtvbnZhJyxcbiAgICAncm90YXRpb25DaGFuZ2Uua29udmEnLFxuICAgICdvZmZzZXRYQ2hhbmdlLmtvbnZhJyxcbiAgICAnb2Zmc2V0WUNoYW5nZS5rb252YScsXG4gICAgJ3RyYW5zZm9ybXNFbmFibGVkQ2hhbmdlLmtvbnZhJ1xuXS5qb2luKFNQQUNFKSwgU0NBTEVfQ0hBTkdFX1NUUiA9IFsnc2NhbGVYQ2hhbmdlLmtvbnZhJywgJ3NjYWxlWUNoYW5nZS5rb252YSddLmpvaW4oU1BBQ0UpO1xudmFyIGVtcHR5Q2hpbGRyZW4gPSBuZXcgVXRpbF8xLkNvbGxlY3Rpb24oKTtcbnZhciBpZENvdW50ZXIgPSAxO1xudmFyIE5vZGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5vZGUoY29uZmlnKSB7XG4gICAgICAgIHRoaXMuX2lkID0gaWRDb3VudGVyKys7XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgdGhpcy5hdHRycyA9IHt9O1xuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9jYWNoZSA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fbGFzdFBvcyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2ZpbHRlclVwVG9EYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzVW5kZXJDYWNoZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gZW1wdHlDaGlsZHJlbjtcbiAgICAgICAgdGhpcy5zZXRBdHRycyhjb25maWcpO1xuICAgICAgICB0aGlzLm9uKFRSQU5TRk9STV9DSEFOR0VfU1RSLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGVhckNhY2hlKFRSQU5TRk9STSk7XG4gICAgICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoQUJTT0xVVEVfVFJBTlNGT1JNKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub24oU0NBTEVfQ0hBTkdFX1NUUiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKEFCU09MVVRFX1NDQUxFKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub24oJ3Zpc2libGVDaGFuZ2Uua29udmEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoVklTSUJMRSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uKCdsaXN0ZW5pbmdDaGFuZ2Uua29udmEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoTElTVEVOSU5HKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub24oJ29wYWNpdHlDaGFuZ2Uua29udmEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoQUJTT0xVVEVfT1BBQ0lUWSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBOb2RlLnByb3RvdHlwZS5oYXNDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBlbXB0eUNoaWxkcmVuO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2NsZWFyQ2FjaGUgPSBmdW5jdGlvbiAoYXR0cikge1xuICAgICAgICBpZiAoYXR0cikge1xuICAgICAgICAgICAgdGhpcy5fY2FjaGUuZGVsZXRlKGF0dHIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY2FjaGUuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2dldENhY2hlID0gZnVuY3Rpb24gKGF0dHIsIHByaXZhdGVHZXR0ZXIpIHtcbiAgICAgICAgdmFyIGNhY2hlID0gdGhpcy5fY2FjaGUuZ2V0KGF0dHIpO1xuICAgICAgICBpZiAoY2FjaGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2FjaGUgPSBwcml2YXRlR2V0dGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZS5zZXQoYXR0ciwgY2FjaGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWNoZTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9nZXRDYW52YXNDYWNoZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlLmdldChDQU5WQVMpO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZSA9IGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyQ2FjaGUoYXR0cik7XG4gICAgICAgIGlmICh0aGlzLl9nZXRDYW52YXNDYWNoZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uZWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICAgIG5vZGUuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShhdHRyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9jYWNoZS5kZWxldGUoQ0FOVkFTKTtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuY2FjaGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIHZhciBjb25mID0gY29uZmlnIHx8IHt9O1xuICAgICAgICB2YXIgcmVjdCA9IHt9O1xuICAgICAgICBpZiAoY29uZi54ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIGNvbmYueSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBjb25mLndpZHRoID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIGNvbmYuaGVpZ2h0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlY3QgPSB0aGlzLmdldENsaWVudFJlY3Qoe1xuICAgICAgICAgICAgICAgIHNraXBUcmFuc2Zvcm06IHRydWUsXG4gICAgICAgICAgICAgICAgcmVsYXRpdmVUbzogdGhpcy5nZXRQYXJlbnQoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdpZHRoID0gY29uZi53aWR0aCB8fCByZWN0LndpZHRoLCBoZWlnaHQgPSBjb25mLmhlaWdodCB8fCByZWN0LmhlaWdodCwgcGl4ZWxSYXRpbyA9IGNvbmYucGl4ZWxSYXRpbywgeCA9IGNvbmYueCA9PT0gdW5kZWZpbmVkID8gcmVjdC54IDogY29uZi54LCB5ID0gY29uZi55ID09PSB1bmRlZmluZWQgPyByZWN0LnkgOiBjb25mLnksIG9mZnNldCA9IGNvbmYub2Zmc2V0IHx8IDAsIGRyYXdCb3JkZXIgPSBjb25mLmRyYXdCb3JkZXIgfHwgZmFsc2U7XG4gICAgICAgIGlmICghd2lkdGggfHwgIWhlaWdodCkge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwuZXJyb3IoJ0NhbiBub3QgY2FjaGUgdGhlIG5vZGUuIFdpZHRoIG9yIGhlaWdodCBvZiB0aGUgbm9kZSBlcXVhbHMgMC4gQ2FjaGluZyBpcyBza2lwcGVkLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHdpZHRoICs9IG9mZnNldCAqIDI7XG4gICAgICAgIGhlaWdodCArPSBvZmZzZXQgKiAyO1xuICAgICAgICB4IC09IG9mZnNldDtcbiAgICAgICAgeSAtPSBvZmZzZXQ7XG4gICAgICAgIHZhciBjYWNoZWRTY2VuZUNhbnZhcyA9IG5ldyBDYW52YXNfMS5TY2VuZUNhbnZhcyh7XG4gICAgICAgICAgICBwaXhlbFJhdGlvOiBwaXhlbFJhdGlvLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgfSksIGNhY2hlZEZpbHRlckNhbnZhcyA9IG5ldyBDYW52YXNfMS5TY2VuZUNhbnZhcyh7XG4gICAgICAgICAgICBwaXhlbFJhdGlvOiBwaXhlbFJhdGlvLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgfSksIGNhY2hlZEhpdENhbnZhcyA9IG5ldyBDYW52YXNfMS5IaXRDYW52YXMoe1xuICAgICAgICAgICAgcGl4ZWxSYXRpbzogMSxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgIH0pLCBzY2VuZUNvbnRleHQgPSBjYWNoZWRTY2VuZUNhbnZhcy5nZXRDb250ZXh0KCksIGhpdENvbnRleHQgPSBjYWNoZWRIaXRDYW52YXMuZ2V0Q29udGV4dCgpO1xuICAgICAgICBjYWNoZWRIaXRDYW52YXMuaXNDYWNoZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NhY2hlLmRlbGV0ZSgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuX2ZpbHRlclVwVG9EYXRlID0gZmFsc2U7XG4gICAgICAgIHNjZW5lQ29udGV4dC5zYXZlKCk7XG4gICAgICAgIGhpdENvbnRleHQuc2F2ZSgpO1xuICAgICAgICBzY2VuZUNvbnRleHQudHJhbnNsYXRlKC14LCAteSk7XG4gICAgICAgIGhpdENvbnRleHQudHJhbnNsYXRlKC14LCAteSk7XG4gICAgICAgIHRoaXMuX2lzVW5kZXJDYWNoZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShBQlNPTFVURV9PUEFDSVRZKTtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKEFCU09MVVRFX1NDQUxFKTtcbiAgICAgICAgdGhpcy5kcmF3U2NlbmUoY2FjaGVkU2NlbmVDYW52YXMsIHRoaXMsIHRydWUpO1xuICAgICAgICB0aGlzLmRyYXdIaXQoY2FjaGVkSGl0Q2FudmFzLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5faXNVbmRlckNhY2hlID0gZmFsc2U7XG4gICAgICAgIHNjZW5lQ29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIGhpdENvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICBpZiAoZHJhd0JvcmRlcikge1xuICAgICAgICAgICAgc2NlbmVDb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIHNjZW5lQ29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIHNjZW5lQ29udGV4dC5yZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgc2NlbmVDb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgc2NlbmVDb250ZXh0LnNldEF0dHIoJ3N0cm9rZVN0eWxlJywgJ3JlZCcpO1xuICAgICAgICAgICAgc2NlbmVDb250ZXh0LnNldEF0dHIoJ2xpbmVXaWR0aCcsIDUpO1xuICAgICAgICAgICAgc2NlbmVDb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICAgICAgc2NlbmVDb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jYWNoZS5zZXQoQ0FOVkFTLCB7XG4gICAgICAgICAgICBzY2VuZTogY2FjaGVkU2NlbmVDYW52YXMsXG4gICAgICAgICAgICBmaWx0ZXI6IGNhY2hlZEZpbHRlckNhbnZhcyxcbiAgICAgICAgICAgIGhpdDogY2FjaGVkSGl0Q2FudmFzLFxuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHlcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0Q2xpZW50UmVjdCA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhYnN0cmFjdCBcImdldENsaWVudFJlY3RcIiBtZXRob2QgY2FsbCcpO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX3RyYW5zZm9ybWVkUmVjdCA9IGZ1bmN0aW9uIChyZWN0LCB0b3ApIHtcbiAgICAgICAgdmFyIHBvaW50cyA9IFtcbiAgICAgICAgICAgIHsgeDogcmVjdC54LCB5OiByZWN0LnkgfSxcbiAgICAgICAgICAgIHsgeDogcmVjdC54ICsgcmVjdC53aWR0aCwgeTogcmVjdC55IH0sXG4gICAgICAgICAgICB7IHg6IHJlY3QueCArIHJlY3Qud2lkdGgsIHk6IHJlY3QueSArIHJlY3QuaGVpZ2h0IH0sXG4gICAgICAgICAgICB7IHg6IHJlY3QueCwgeTogcmVjdC55ICsgcmVjdC5oZWlnaHQgfVxuICAgICAgICBdO1xuICAgICAgICB2YXIgbWluWCwgbWluWSwgbWF4WCwgbWF4WTtcbiAgICAgICAgdmFyIHRyYW5zID0gdGhpcy5nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApO1xuICAgICAgICBwb2ludHMuZm9yRWFjaChmdW5jdGlvbiAocG9pbnQpIHtcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1lZCA9IHRyYW5zLnBvaW50KHBvaW50KTtcbiAgICAgICAgICAgIGlmIChtaW5YID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBtaW5YID0gbWF4WCA9IHRyYW5zZm9ybWVkLng7XG4gICAgICAgICAgICAgICAgbWluWSA9IG1heFkgPSB0cmFuc2Zvcm1lZC55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWluWCA9IE1hdGgubWluKG1pblgsIHRyYW5zZm9ybWVkLngpO1xuICAgICAgICAgICAgbWluWSA9IE1hdGgubWluKG1pblksIHRyYW5zZm9ybWVkLnkpO1xuICAgICAgICAgICAgbWF4WCA9IE1hdGgubWF4KG1heFgsIHRyYW5zZm9ybWVkLngpO1xuICAgICAgICAgICAgbWF4WSA9IE1hdGgubWF4KG1heFksIHRyYW5zZm9ybWVkLnkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IG1pblgsXG4gICAgICAgICAgICB5OiBtaW5ZLFxuICAgICAgICAgICAgd2lkdGg6IG1heFggLSBtaW5YLFxuICAgICAgICAgICAgaGVpZ2h0OiBtYXhZIC0gbWluWVxuICAgICAgICB9O1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2RyYXdDYWNoZWRTY2VuZUNhbnZhcyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0Ll9hcHBseU9wYWNpdHkodGhpcyk7XG4gICAgICAgIGNvbnRleHQuX2FwcGx5R2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKHRoaXMpO1xuICAgICAgICB2YXIgY2FudmFzQ2FjaGUgPSB0aGlzLl9nZXRDYW52YXNDYWNoZSgpO1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShjYW52YXNDYWNoZS54LCBjYW52YXNDYWNoZS55KTtcbiAgICAgICAgdmFyIGNhY2hlQ2FudmFzID0gdGhpcy5fZ2V0Q2FjaGVkU2NlbmVDYW52YXMoKTtcbiAgICAgICAgdmFyIHJhdGlvID0gY2FjaGVDYW52YXMucGl4ZWxSYXRpbztcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoY2FjaGVDYW52YXMuX2NhbnZhcywgMCwgMCwgY2FjaGVDYW52YXMud2lkdGggLyByYXRpbywgY2FjaGVDYW52YXMuaGVpZ2h0IC8gcmF0aW8pO1xuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9kcmF3Q2FjaGVkSGl0Q2FudmFzID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGNhbnZhc0NhY2hlID0gdGhpcy5fZ2V0Q2FudmFzQ2FjaGUoKSwgaGl0Q2FudmFzID0gY2FudmFzQ2FjaGUuaGl0O1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC5fYXBwbHlHbG9iYWxDb21wb3NpdGVPcGVyYXRpb24odGhpcyk7XG4gICAgICAgIGNvbnRleHQudHJhbnNsYXRlKGNhbnZhc0NhY2hlLngsIGNhbnZhc0NhY2hlLnkpO1xuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShoaXRDYW52YXMuX2NhbnZhcywgMCwgMCk7XG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2dldENhY2hlZFNjZW5lQ2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZmlsdGVycyA9IHRoaXMuZmlsdGVycygpLCBjYWNoZWRDYW52YXMgPSB0aGlzLl9nZXRDYW52YXNDYWNoZSgpLCBzY2VuZUNhbnZhcyA9IGNhY2hlZENhbnZhcy5zY2VuZSwgZmlsdGVyQ2FudmFzID0gY2FjaGVkQ2FudmFzLmZpbHRlciwgZmlsdGVyQ29udGV4dCA9IGZpbHRlckNhbnZhcy5nZXRDb250ZXh0KCksIGxlbiwgaW1hZ2VEYXRhLCBuLCBmaWx0ZXI7XG4gICAgICAgIGlmIChmaWx0ZXJzKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2ZpbHRlclVwVG9EYXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJhdGlvID0gc2NlbmVDYW52YXMucGl4ZWxSYXRpbztcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBsZW4gPSBmaWx0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyQ29udGV4dC5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJDb250ZXh0LmRyYXdJbWFnZShzY2VuZUNhbnZhcy5fY2FudmFzLCAwLCAwLCBzY2VuZUNhbnZhcy5nZXRXaWR0aCgpIC8gcmF0aW8sIHNjZW5lQ2FudmFzLmdldEhlaWdodCgpIC8gcmF0aW8pO1xuICAgICAgICAgICAgICAgICAgICBpbWFnZURhdGEgPSBmaWx0ZXJDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBmaWx0ZXJDYW52YXMuZ2V0V2lkdGgoKSwgZmlsdGVyQ2FudmFzLmdldEhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBmaWx0ZXJzW25dO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlsXzEuVXRpbC5lcnJvcignRmlsdGVyIHNob3VsZCBiZSB0eXBlIG9mIGZ1bmN0aW9uLCBidXQgZ290ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgZmlsdGVyICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyBpbnN0ZWQuIFBsZWFzZSBjaGVjayBjb3JyZWN0IGZpbHRlcnMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5jYWxsKHRoaXMsIGltYWdlRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJDb250ZXh0LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxfMS5VdGlsLmVycm9yKCdVbmFibGUgdG8gYXBwbHkgZmlsdGVyLiAnICsgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyVXBUb0RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlckNhbnZhcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2NlbmVDYW52YXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldnRTdHIsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBldmVudHMgPSBldnRTdHIuc3BsaXQoU1BBQ0UpLCBsZW4gPSBldmVudHMubGVuZ3RoLCBuLCBldmVudCwgcGFydHMsIGJhc2VFdmVudCwgbmFtZTtcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICBldmVudCA9IGV2ZW50c1tuXTtcbiAgICAgICAgICAgIHBhcnRzID0gZXZlbnQuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGJhc2VFdmVudCA9IHBhcnRzWzBdO1xuICAgICAgICAgICAgbmFtZSA9IHBhcnRzWzFdIHx8ICcnO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmV2ZW50TGlzdGVuZXJzW2Jhc2VFdmVudF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzW2Jhc2VFdmVudF0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnNbYmFzZUV2ZW50XS5wdXNoKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGhhbmRsZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2dFN0ciwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGV2ZW50cyA9IChldnRTdHIgfHwgJycpLnNwbGl0KFNQQUNFKSwgbGVuID0gZXZlbnRzLmxlbmd0aCwgbiwgdCwgZXZlbnQsIHBhcnRzLCBiYXNlRXZlbnQsIG5hbWU7XG4gICAgICAgIGlmICghZXZ0U3RyKSB7XG4gICAgICAgICAgICBmb3IgKHQgaW4gdGhpcy5ldmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIHRoaXMuX29mZih0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW25dO1xuICAgICAgICAgICAgcGFydHMgPSBldmVudC5zcGxpdCgnLicpO1xuICAgICAgICAgICAgYmFzZUV2ZW50ID0gcGFydHNbMF07XG4gICAgICAgICAgICBuYW1lID0gcGFydHNbMV07XG4gICAgICAgICAgICBpZiAoYmFzZUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRMaXN0ZW5lcnNbYmFzZUV2ZW50XSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vZmYoYmFzZUV2ZW50LCBuYW1lLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yICh0IGluIHRoaXMuZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb2ZmKHQsIG5hbWUsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICB2YXIgZSA9IHtcbiAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgIHR5cGU6IGV2dC50eXBlLFxuICAgICAgICAgICAgZXZ0OiBldnRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5maXJlKGV2dC50eXBlLCBlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5vbih0eXBlLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgZXZ0LmV2dCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICB0aGlzLm9mZih0eXBlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZGVsZWdhdGUgPSBmdW5jdGlvbiAoZXZlbnQsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gICAgICAgIHZhciBzdG9wTm9kZSA9IHRoaXM7XG4gICAgICAgIHRoaXMub24oZXZlbnQsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRzID0gZXZ0LnRhcmdldC5maW5kQW5jZXN0b3JzKHNlbGVjdG9yLCB0cnVlLCBzdG9wTm9kZSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBldnQgPSBVdGlsXzEuVXRpbC5jbG9uZU9iamVjdChldnQpO1xuICAgICAgICAgICAgICAgIGV2dC5jdXJyZW50VGFyZ2V0ID0gdGFyZ2V0c1tpXTtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmNhbGwodGFyZ2V0c1tpXSwgZXZ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChEcmFnQW5kRHJvcF8xLkRELm5vZGUgJiYgRHJhZ0FuZERyb3BfMS5ERC5ub2RlID09PSB0aGlzKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BEcmFnKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVtb3ZlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX3JlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKFNUQUdFKTtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKEFCU09MVVRFX1RSQU5TRk9STSk7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShWSVNJQkxFKTtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKExJU1RFTklORyk7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShBQlNPTFVURV9PUEFDSVRZKTtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICAgIGlmIChwYXJlbnQgJiYgcGFyZW50LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHRoaXMuaW5kZXgsIDEpO1xuICAgICAgICAgICAgcGFyZW50Ll9zZXRDaGlsZHJlbkluZGljZXMoKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwb3J0cy5fcmVtb3ZlSWQodGhpcy5pZCgpLCB0aGlzKTtcbiAgICAgICAgdmFyIG5hbWVzID0gKHRoaXMubmFtZSgpIHx8ICcnKS5zcGxpdCgvXFxzL2cpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc3VibmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICAgICAgZXhwb3J0cy5fcmVtb3ZlTmFtZShzdWJuYW1lLCB0aGlzLl9pZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRBdHRyID0gZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgICAgdmFyIG1ldGhvZCA9ICdnZXQnICsgVXRpbF8xLlV0aWwuX2NhcGl0YWxpemUoYXR0cik7XG4gICAgICAgIGlmIChVdGlsXzEuVXRpbC5faXNGdW5jdGlvbih0aGlzW21ldGhvZF0pKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1ttZXRob2RdKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cnNbYXR0cl07XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRBbmNlc3RvcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpLCBhbmNlc3RvcnMgPSBuZXcgVXRpbF8xLkNvbGxlY3Rpb24oKTtcbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgICAgYW5jZXN0b3JzLnB1c2gocGFyZW50KTtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5nZXRQYXJlbnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYW5jZXN0b3JzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0QXR0cnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJzIHx8IHt9O1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuc2V0QXR0cnMgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIHZhciBrZXksIG1ldGhvZDtcbiAgICAgICAgaWYgKCFjb25maWcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoa2V5IGluIGNvbmZpZykge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gQ0hJTERSRU4pIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1ldGhvZCA9IFNFVCArIFV0aWxfMS5VdGlsLl9jYXBpdGFsaXplKGtleSk7XG4gICAgICAgICAgICBpZiAoVXRpbF8xLlV0aWwuX2lzRnVuY3Rpb24odGhpc1ttZXRob2RdKSkge1xuICAgICAgICAgICAgICAgIHRoaXNbbWV0aG9kXShjb25maWdba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRBdHRyKGtleSwgY29uZmlnW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuaXNMaXN0ZW5pbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShMSVNURU5JTkcsIHRoaXMuX2lzTGlzdGVuaW5nKTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9pc0xpc3RlbmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxpc3RlbmluZyA9IHRoaXMubGlzdGVuaW5nKCksIHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICAgIGlmIChsaXN0ZW5pbmcgPT09ICdpbmhlcml0Jykge1xuICAgICAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQuaXNMaXN0ZW5pbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmluZztcbiAgICAgICAgfVxuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUoVklTSUJMRSwgdGhpcy5faXNWaXNpYmxlKTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9pc1Zpc2libGUgPSBmdW5jdGlvbiAocmVsYXRpdmVUbykge1xuICAgICAgICB2YXIgdmlzaWJsZSA9IHRoaXMudmlzaWJsZSgpLCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xuICAgICAgICBpZiAodmlzaWJsZSA9PT0gJ2luaGVyaXQnKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50ICYmIHBhcmVudCAhPT0gcmVsYXRpdmVUbykge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQuX2lzVmlzaWJsZShyZWxhdGl2ZVRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHZpc2libGU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnNob3VsZERyYXdIaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKTtcbiAgICAgICAgcmV0dXJuICgoIWxheWVyICYmIHRoaXMuaXNMaXN0ZW5pbmcoKSAmJiB0aGlzLmlzVmlzaWJsZSgpKSB8fFxuICAgICAgICAgICAgKGxheWVyICYmXG4gICAgICAgICAgICAgICAgbGF5ZXIuaGl0R3JhcGhFbmFibGVkKCkgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmlzTGlzdGVuaW5nKCkgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSgpKSk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnZpc2libGUodHJ1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRaSW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4IHx8IDA7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRBYnNvbHV0ZVpJbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRlcHRoID0gdGhpcy5nZXREZXB0aCgpLCB0aGF0ID0gdGhpcywgaW5kZXggPSAwLCBub2RlcywgbGVuLCBuLCBjaGlsZDtcbiAgICAgICAgZnVuY3Rpb24gYWRkQ2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIG5vZGVzID0gW107XG4gICAgICAgICAgICBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgICAgICBjaGlsZCA9IGNoaWxkcmVuW25dO1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlICE9PSBTSEFQRSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLmNvbmNhdChjaGlsZC5nZXRDaGlsZHJlbigpLnRvQXJyYXkoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5faWQgPT09IHRoYXQuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIG4gPSBsZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGVzLmxlbmd0aCA+IDAgJiYgbm9kZXNbMF0uZ2V0RGVwdGgoKSA8PSBkZXB0aCkge1xuICAgICAgICAgICAgICAgIGFkZENoaWxkcmVuKG5vZGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhhdC5ub2RlVHlwZSAhPT0gVVBQRVJfU1RBR0UpIHtcbiAgICAgICAgICAgIGFkZENoaWxkcmVuKHRoYXQuZ2V0U3RhZ2UoKS5nZXRDaGlsZHJlbigpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXREZXB0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRlcHRoID0gMCwgcGFyZW50ID0gdGhpcy5wYXJlbnQ7XG4gICAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGRlcHRoKys7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXB0aDtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24gKHBvcykge1xuICAgICAgICB0aGlzLngocG9zLngpO1xuICAgICAgICB0aGlzLnkocG9zLnkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy54KCksXG4gICAgICAgICAgICB5OiB0aGlzLnkoKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0QWJzb2x1dGVQb3NpdGlvbiA9IGZ1bmN0aW9uICh0b3ApIHtcbiAgICAgICAgdmFyIGFic29sdXRlTWF0cml4ID0gdGhpcy5nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApLmdldE1hdHJpeCgpLCBhYnNvbHV0ZVRyYW5zZm9ybSA9IG5ldyBVdGlsXzEuVHJhbnNmb3JtKCksIG9mZnNldCA9IHRoaXMub2Zmc2V0KCk7XG4gICAgICAgIGFic29sdXRlVHJhbnNmb3JtLm0gPSBhYnNvbHV0ZU1hdHJpeC5zbGljZSgpO1xuICAgICAgICBhYnNvbHV0ZVRyYW5zZm9ybS50cmFuc2xhdGUob2Zmc2V0LngsIG9mZnNldC55KTtcbiAgICAgICAgcmV0dXJuIGFic29sdXRlVHJhbnNmb3JtLmdldFRyYW5zbGF0aW9uKCk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5zZXRBYnNvbHV0ZVBvc2l0aW9uID0gZnVuY3Rpb24gKHBvcykge1xuICAgICAgICB2YXIgb3JpZ1RyYW5zID0gdGhpcy5fY2xlYXJUcmFuc2Zvcm0oKSwgaXQ7XG4gICAgICAgIHRoaXMuYXR0cnMueCA9IG9yaWdUcmFucy54O1xuICAgICAgICB0aGlzLmF0dHJzLnkgPSBvcmlnVHJhbnMueTtcbiAgICAgICAgZGVsZXRlIG9yaWdUcmFucy54O1xuICAgICAgICBkZWxldGUgb3JpZ1RyYW5zLnk7XG4gICAgICAgIGl0ID0gdGhpcy5nZXRBYnNvbHV0ZVRyYW5zZm9ybSgpO1xuICAgICAgICBpdC5pbnZlcnQoKTtcbiAgICAgICAgaXQudHJhbnNsYXRlKHBvcy54LCBwb3MueSk7XG4gICAgICAgIHBvcyA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMuYXR0cnMueCArIGl0LmdldFRyYW5zbGF0aW9uKCkueCxcbiAgICAgICAgICAgIHk6IHRoaXMuYXR0cnMueSArIGl0LmdldFRyYW5zbGF0aW9uKCkueVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHsgeDogcG9zLngsIHk6IHBvcy55IH0pO1xuICAgICAgICB0aGlzLl9zZXRUcmFuc2Zvcm0ob3JpZ1RyYW5zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fc2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gKHRyYW5zKSB7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoa2V5IGluIHRyYW5zKSB7XG4gICAgICAgICAgICB0aGlzLmF0dHJzW2tleV0gPSB0cmFuc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NsZWFyQ2FjaGUoVFJBTlNGT1JNKTtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKEFCU09MVVRFX1RSQU5TRk9STSk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fY2xlYXJUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0cmFucyA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMueCgpLFxuICAgICAgICAgICAgeTogdGhpcy55KCksXG4gICAgICAgICAgICByb3RhdGlvbjogdGhpcy5yb3RhdGlvbigpLFxuICAgICAgICAgICAgc2NhbGVYOiB0aGlzLnNjYWxlWCgpLFxuICAgICAgICAgICAgc2NhbGVZOiB0aGlzLnNjYWxlWSgpLFxuICAgICAgICAgICAgb2Zmc2V0WDogdGhpcy5vZmZzZXRYKCksXG4gICAgICAgICAgICBvZmZzZXRZOiB0aGlzLm9mZnNldFkoKSxcbiAgICAgICAgICAgIHNrZXdYOiB0aGlzLnNrZXdYKCksXG4gICAgICAgICAgICBza2V3WTogdGhpcy5za2V3WSgpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYXR0cnMueCA9IDA7XG4gICAgICAgIHRoaXMuYXR0cnMueSA9IDA7XG4gICAgICAgIHRoaXMuYXR0cnMucm90YXRpb24gPSAwO1xuICAgICAgICB0aGlzLmF0dHJzLnNjYWxlWCA9IDE7XG4gICAgICAgIHRoaXMuYXR0cnMuc2NhbGVZID0gMTtcbiAgICAgICAgdGhpcy5hdHRycy5vZmZzZXRYID0gMDtcbiAgICAgICAgdGhpcy5hdHRycy5vZmZzZXRZID0gMDtcbiAgICAgICAgdGhpcy5hdHRycy5za2V3WCA9IDA7XG4gICAgICAgIHRoaXMuYXR0cnMuc2tld1kgPSAwO1xuICAgICAgICB0aGlzLl9jbGVhckNhY2hlKFRSQU5TRk9STSk7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShBQlNPTFVURV9UUkFOU0ZPUk0pO1xuICAgICAgICByZXR1cm4gdHJhbnM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24gKGNoYW5nZSkge1xuICAgICAgICB2YXIgY2hhbmdlWCA9IGNoYW5nZS54LCBjaGFuZ2VZID0gY2hhbmdlLnksIHggPSB0aGlzLngoKSwgeSA9IHRoaXMueSgpO1xuICAgICAgICBpZiAoY2hhbmdlWCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB4ICs9IGNoYW5nZVg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZVkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgeSArPSBjaGFuZ2VZO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24oeyB4OiB4LCB5OiB5IH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9lYWNoQW5jZXN0b3JSZXZlcnNlID0gZnVuY3Rpb24gKGZ1bmMsIHRvcCkge1xuICAgICAgICB2YXIgZmFtaWx5ID0gW10sIHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCksIGxlbiwgbjtcbiAgICAgICAgaWYgKHRvcCAmJiB0b3AuX2lkID09PSB0aGlzLl9pZCkge1xuICAgICAgICAgICAgZnVuYyh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmYW1pbHkudW5zaGlmdCh0aGlzKTtcbiAgICAgICAgd2hpbGUgKHBhcmVudCAmJiAoIXRvcCB8fCBwYXJlbnQuX2lkICE9PSB0b3AuX2lkKSkge1xuICAgICAgICAgICAgZmFtaWx5LnVuc2hpZnQocGFyZW50KTtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgbGVuID0gZmFtaWx5Lmxlbmd0aDtcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICBmdW5jKGZhbWlseVtuXSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uICh0aGV0YSkge1xuICAgICAgICB0aGlzLnJvdGF0aW9uKHRoaXMucm90YXRpb24oKSArIHRoZXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5tb3ZlVG9Ub3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ05vZGUgaGFzIG5vIHBhcmVudC4gbW92ZVRvVG9wIGZ1bmN0aW9uIGlzIGlnbm9yZWQuJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5pbmRleDtcbiAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4ucHVzaCh0aGlzKTtcbiAgICAgICAgdGhpcy5wYXJlbnQuX3NldENoaWxkcmVuSW5kaWNlcygpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLm1vdmVVcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybignTm9kZSBoYXMgbm8gcGFyZW50LiBtb3ZlVXAgZnVuY3Rpb24gaXMgaWdub3JlZC4nKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmluZGV4LCBsZW4gPSB0aGlzLnBhcmVudC5nZXRDaGlsZHJlbigpLmxlbmd0aDtcbiAgICAgICAgaWYgKGluZGV4IDwgbGVuIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCArIDEsIDAsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuX3NldENoaWxkcmVuSW5kaWNlcygpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUubW92ZURvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ05vZGUgaGFzIG5vIHBhcmVudC4gbW92ZURvd24gZnVuY3Rpb24gaXMgaWdub3JlZC4nKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmluZGV4O1xuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4IC0gMSwgMCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5fc2V0Q2hpbGRyZW5JbmRpY2VzKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5tb3ZlVG9Cb3R0b20gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ05vZGUgaGFzIG5vIHBhcmVudC4gbW92ZVRvQm90dG9tIGZ1bmN0aW9uIGlzIGlnbm9yZWQuJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5pbmRleDtcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnVuc2hpZnQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5fc2V0Q2hpbGRyZW5JbmRpY2VzKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5zZXRaSW5kZXggPSBmdW5jdGlvbiAoekluZGV4KSB7XG4gICAgICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ05vZGUgaGFzIG5vIHBhcmVudC4gekluZGV4IHBhcmFtZXRlciBpcyBpZ25vcmVkLicpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHpJbmRleCA8IDAgfHwgekluZGV4ID49IHRoaXMucGFyZW50LmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybignVW5leHBlY3RlZCB2YWx1ZSAnICtcbiAgICAgICAgICAgICAgICB6SW5kZXggK1xuICAgICAgICAgICAgICAgICcgZm9yIHpJbmRleCBwcm9wZXJ0eS4gekluZGV4IGlzIGp1c3QgaW5kZXggb2YgYSBub2RlIGluIGNoaWxkcmVuIG9mIGl0cyBwYXJlbnQuIEV4cGVjdGVkIHZhbHVlIGlzIGZyb20gMCB0byAnICtcbiAgICAgICAgICAgICAgICAodGhpcy5wYXJlbnQuY2hpbGRyZW4ubGVuZ3RoIC0gMSkgK1xuICAgICAgICAgICAgICAgICcuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5pbmRleDtcbiAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHpJbmRleCwgMCwgdGhpcyk7XG4gICAgICAgIHRoaXMucGFyZW50Ll9zZXRDaGlsZHJlbkluZGljZXMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRBYnNvbHV0ZU9wYWNpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShBQlNPTFVURV9PUEFDSVRZLCB0aGlzLl9nZXRBYnNvbHV0ZU9wYWNpdHkpO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2dldEFic29sdXRlT3BhY2l0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFic09wYWNpdHkgPSB0aGlzLm9wYWNpdHkoKTtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICAgIGlmIChwYXJlbnQgJiYgIXBhcmVudC5faXNVbmRlckNhY2hlKSB7XG4gICAgICAgICAgICBhYnNPcGFjaXR5ICo9IHRoaXMuZ2V0UGFyZW50KCkuZ2V0QWJzb2x1dGVPcGFjaXR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFic09wYWNpdHk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5tb3ZlVG8gPSBmdW5jdGlvbiAobmV3Q29udGFpbmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmdldFBhcmVudCgpICE9PSBuZXdDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZSgpO1xuICAgICAgICAgICAgbmV3Q29udGFpbmVyLmFkZCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnRvT2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2JqID0ge30sIGF0dHJzID0gdGhpcy5nZXRBdHRycygpLCBrZXksIHZhbCwgZ2V0dGVyLCBkZWZhdWx0VmFsdWUsIG5vblBsYWluT2JqZWN0O1xuICAgICAgICBvYmouYXR0cnMgPSB7fTtcbiAgICAgICAgZm9yIChrZXkgaW4gYXR0cnMpIHtcbiAgICAgICAgICAgIHZhbCA9IGF0dHJzW2tleV07XG4gICAgICAgICAgICBub25QbGFpbk9iamVjdCA9XG4gICAgICAgICAgICAgICAgVXRpbF8xLlV0aWwuaXNPYmplY3QodmFsKSAmJiAhVXRpbF8xLlV0aWwuX2lzUGxhaW5PYmplY3QodmFsKSAmJiAhVXRpbF8xLlV0aWwuX2lzQXJyYXkodmFsKTtcbiAgICAgICAgICAgIGlmIChub25QbGFpbk9iamVjdCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2V0dGVyID0gdHlwZW9mIHRoaXNba2V5XSA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW2tleV07XG4gICAgICAgICAgICBkZWxldGUgYXR0cnNba2V5XTtcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IGdldHRlciA/IGdldHRlci5jYWxsKHRoaXMpIDogbnVsbDtcbiAgICAgICAgICAgIGF0dHJzW2tleV0gPSB2YWw7XG4gICAgICAgICAgICBpZiAoZGVmYXVsdFZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgICAgICAgICBvYmouYXR0cnNba2V5XSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvYmouY2xhc3NOYW1lID0gdGhpcy5nZXRDbGFzc05hbWUoKTtcbiAgICAgICAgcmV0dXJuIFV0aWxfMS5VdGlsLl9wcmVwYXJlVG9TdHJpbmdpZnkob2JqKTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMudG9PYmplY3QoKSk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRQYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudDtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmZpbmRBbmNlc3RvcnMgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGluY2x1ZGVTZWxmLCBzdG9wTm9kZSkge1xuICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgIGlmIChpbmNsdWRlU2VsZiAmJiB0aGlzLl9pc01hdGNoKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgcmVzLnB1c2godGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFuY2VzdG9yID0gdGhpcy5wYXJlbnQ7XG4gICAgICAgIHdoaWxlIChhbmNlc3Rvcikge1xuICAgICAgICAgICAgaWYgKGFuY2VzdG9yID09PSBzdG9wTm9kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYW5jZXN0b3IuX2lzTWF0Y2goc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgcmVzLnB1c2goYW5jZXN0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYW5jZXN0b3IgPSBhbmNlc3Rvci5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmlzQW5jZXN0b3JPZiA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmZpbmRBbmNlc3RvciA9IGZ1bmN0aW9uIChzZWxlY3RvciwgaW5jbHVkZVNlbGYsIHN0b3BOb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRBbmNlc3RvcnMoc2VsZWN0b3IsIGluY2x1ZGVTZWxmLCBzdG9wTm9kZSlbMF07XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5faXNNYXRjaCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZWxlY3RvckFyciA9IHNlbGVjdG9yLnJlcGxhY2UoLyAvZywgJycpLnNwbGl0KCcsJyksIGxlbiA9IHNlbGVjdG9yQXJyLmxlbmd0aCwgbiwgc2VsO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIHNlbCA9IHNlbGVjdG9yQXJyW25dO1xuICAgICAgICAgICAgaWYgKCFVdGlsXzEuVXRpbC5pc1ZhbGlkU2VsZWN0b3Ioc2VsKSkge1xuICAgICAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ1NlbGVjdG9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIHNlbCArXG4gICAgICAgICAgICAgICAgICAgICdcIiBpcyBpbnZhbGlkLiBBbGxvd2VkIHNlbGVjdG9ycyBleGFtcGxlcyBhcmUgXCIjZm9vXCIsIFwiLmJhclwiIG9yIFwiR3JvdXBcIi4nKTtcbiAgICAgICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdJZiB5b3UgaGF2ZSBhIGN1c3RvbSBzaGFwZSB3aXRoIHN1Y2ggY2xhc3NOYW1lLCBwbGVhc2UgY2hhbmdlIGl0IHRvIHN0YXJ0IHdpdGggdXBwZXIgbGV0dGVyIGxpa2UgXCJUcmlhbmdsZVwiLicpO1xuICAgICAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ0tvbnZhIGlzIGF3ZXNvbWUsIHJpZ2h0PycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbC5jaGFyQXQoMCkgPT09ICcjJykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlkKCkgPT09IHNlbC5zbGljZSgxKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzZWwuY2hhckF0KDApID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNOYW1lKHNlbC5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jbGFzc05hbWUgPT09IHNlbGVjdG9yIHx8IHRoaXMubm9kZVR5cGUgPT09IHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0TGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xuICAgICAgICByZXR1cm4gcGFyZW50ID8gcGFyZW50LmdldExheWVyKCkgOiBudWxsO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0U3RhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShTVEFHRSwgdGhpcy5fZ2V0U3RhZ2UpO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2dldFN0YWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKTtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5nZXRTdGFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uIChldmVudFR5cGUsIGV2dCwgYnViYmxlKSB7XG4gICAgICAgIGV2dCA9IGV2dCB8fCB7fTtcbiAgICAgICAgZXZ0LnRhcmdldCA9IGV2dC50YXJnZXQgfHwgdGhpcztcbiAgICAgICAgaWYgKGJ1YmJsZSkge1xuICAgICAgICAgICAgdGhpcy5fZmlyZUFuZEJ1YmJsZShldmVudFR5cGUsIGV2dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKGV2ZW50VHlwZSwgZXZ0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldEFic29sdXRlVHJhbnNmb3JtID0gZnVuY3Rpb24gKHRvcCkge1xuICAgICAgICBpZiAodG9wKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QWJzb2x1dGVUcmFuc2Zvcm0odG9wKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShBQlNPTFVURV9UUkFOU0ZPUk0sIHRoaXMuX2dldEFic29sdXRlVHJhbnNmb3JtKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2dldEFic29sdXRlVHJhbnNmb3JtID0gZnVuY3Rpb24gKHRvcCkge1xuICAgICAgICB2YXIgYXQgPSBuZXcgVXRpbF8xLlRyYW5zZm9ybSgpO1xuICAgICAgICB0aGlzLl9lYWNoQW5jZXN0b3JSZXZlcnNlKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICB2YXIgdHJhbnNmb3Jtc0VuYWJsZWQgPSBub2RlLmdldFRyYW5zZm9ybXNFbmFibGVkKCk7XG4gICAgICAgICAgICBpZiAodHJhbnNmb3Jtc0VuYWJsZWQgPT09ICdhbGwnKSB7XG4gICAgICAgICAgICAgICAgYXQubXVsdGlwbHkobm9kZS5nZXRUcmFuc2Zvcm0oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0cmFuc2Zvcm1zRW5hYmxlZCA9PT0gJ3Bvc2l0aW9uJykge1xuICAgICAgICAgICAgICAgIGF0LnRyYW5zbGF0ZShub2RlLmdldFgoKSAtIG5vZGUuZ2V0T2Zmc2V0WCgpLCBub2RlLmdldFkoKSAtIG5vZGUuZ2V0T2Zmc2V0WSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdG9wKTtcbiAgICAgICAgcmV0dXJuIGF0O1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0QWJzb2x1dGVTY2FsZSA9IGZ1bmN0aW9uICh0b3ApIHtcbiAgICAgICAgaWYgKHRvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFic29sdXRlU2NhbGUodG9wKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShBQlNPTFVURV9TQ0FMRSwgdGhpcy5fZ2V0QWJzb2x1dGVTY2FsZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9nZXRBYnNvbHV0ZVNjYWxlID0gZnVuY3Rpb24gKHRvcCkge1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcztcbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgICAgaWYgKHBhcmVudC5faXNVbmRlckNhY2hlKSB7XG4gICAgICAgICAgICAgICAgdG9wID0gcGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LmdldFBhcmVudCgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzY2FsZVggPSAxLCBzY2FsZVkgPSAxO1xuICAgICAgICB0aGlzLl9lYWNoQW5jZXN0b3JSZXZlcnNlKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICBzY2FsZVggKj0gbm9kZS5zY2FsZVgoKTtcbiAgICAgICAgICAgIHNjYWxlWSAqPSBub2RlLnNjYWxlWSgpO1xuICAgICAgICB9LCB0b3ApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogc2NhbGVYLFxuICAgICAgICAgICAgeTogc2NhbGVZXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShUUkFOU0ZPUk0sIHRoaXMuX2dldFRyYW5zZm9ybSk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fZ2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbSA9IG5ldyBVdGlsXzEuVHJhbnNmb3JtKCksIHggPSB0aGlzLngoKSwgeSA9IHRoaXMueSgpLCByb3RhdGlvbiA9IEdsb2JhbF8xLktvbnZhLmdldEFuZ2xlKHRoaXMucm90YXRpb24oKSksIHNjYWxlWCA9IHRoaXMuc2NhbGVYKCksIHNjYWxlWSA9IHRoaXMuc2NhbGVZKCksIHNrZXdYID0gdGhpcy5za2V3WCgpLCBza2V3WSA9IHRoaXMuc2tld1koKSwgb2Zmc2V0WCA9IHRoaXMub2Zmc2V0WCgpLCBvZmZzZXRZID0gdGhpcy5vZmZzZXRZKCk7XG4gICAgICAgIGlmICh4ICE9PSAwIHx8IHkgIT09IDApIHtcbiAgICAgICAgICAgIG0udHJhbnNsYXRlKHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyb3RhdGlvbiAhPT0gMCkge1xuICAgICAgICAgICAgbS5yb3RhdGUocm90YXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChza2V3WCAhPT0gMCB8fCBza2V3WSAhPT0gMCkge1xuICAgICAgICAgICAgbS5za2V3KHNrZXdYLCBza2V3WSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjYWxlWCAhPT0gMSB8fCBzY2FsZVkgIT09IDEpIHtcbiAgICAgICAgICAgIG0uc2NhbGUoc2NhbGVYLCBzY2FsZVkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvZmZzZXRYICE9PSAwIHx8IG9mZnNldFkgIT09IDApIHtcbiAgICAgICAgICAgIG0udHJhbnNsYXRlKC0xICogb2Zmc2V0WCwgLTEgKiBvZmZzZXRZKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB2YXIgYXR0cnMgPSBVdGlsXzEuVXRpbC5jbG9uZU9iamVjdCh0aGlzLmF0dHJzKSwga2V5LCBhbGxMaXN0ZW5lcnMsIGxlbiwgbiwgbGlzdGVuZXI7XG4gICAgICAgIGZvciAodmFyIGkgaW4gQ0xPTkVfQkxBQ0tfTElTVCkge1xuICAgICAgICAgICAgdmFyIGJsb2NrQXR0ciA9IENMT05FX0JMQUNLX0xJU1RbaV07XG4gICAgICAgICAgICBkZWxldGUgYXR0cnNbYmxvY2tBdHRyXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGF0dHJzW2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbm9kZSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGF0dHJzKTtcbiAgICAgICAgZm9yIChrZXkgaW4gdGhpcy5ldmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgYWxsTGlzdGVuZXJzID0gdGhpcy5ldmVudExpc3RlbmVyc1trZXldO1xuICAgICAgICAgICAgbGVuID0gYWxsTGlzdGVuZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gYWxsTGlzdGVuZXJzW25dO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5uYW1lLmluZGV4T2YoS09OVkEpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW5vZGUuZXZlbnRMaXN0ZW5lcnNba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ldmVudExpc3RlbmVyc1trZXldID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbm9kZS5ldmVudExpc3RlbmVyc1trZXldLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl90b0tvbnZhQ2FudmFzID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICAgIHZhciBib3ggPSB0aGlzLmdldENsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpLCB4ID0gY29uZmlnLnggIT09IHVuZGVmaW5lZCA/IGNvbmZpZy54IDogYm94LngsIHkgPSBjb25maWcueSAhPT0gdW5kZWZpbmVkID8gY29uZmlnLnkgOiBib3gueSwgcGl4ZWxSYXRpbyA9IGNvbmZpZy5waXhlbFJhdGlvIHx8IDEsIGNhbnZhcyA9IG5ldyBDYW52YXNfMS5TY2VuZUNhbnZhcyh7XG4gICAgICAgICAgICB3aWR0aDogY29uZmlnLndpZHRoIHx8IGJveC53aWR0aCB8fCAoc3RhZ2UgPyBzdGFnZS5nZXRXaWR0aCgpIDogMCksXG4gICAgICAgICAgICBoZWlnaHQ6IGNvbmZpZy5oZWlnaHQgfHwgYm94LmhlaWdodCB8fCAoc3RhZ2UgPyBzdGFnZS5nZXRIZWlnaHQoKSA6IDApLFxuICAgICAgICAgICAgcGl4ZWxSYXRpbzogcGl4ZWxSYXRpb1xuICAgICAgICB9KSwgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCk7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBpZiAoeCB8fCB5KSB7XG4gICAgICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZSgtMSAqIHgsIC0xICogeSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3U2NlbmUoY2FudmFzKTtcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiBjYW52YXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS50b0NhbnZhcyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvS29udmFDYW52YXMoY29uZmlnKS5fY2FudmFzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUudG9EYXRhVVJMID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICAgIHZhciBtaW1lVHlwZSA9IGNvbmZpZy5taW1lVHlwZSB8fCBudWxsLCBxdWFsaXR5ID0gY29uZmlnLnF1YWxpdHkgfHwgbnVsbDtcbiAgICAgICAgdmFyIHVybCA9IHRoaXMuX3RvS29udmFDYW52YXMoY29uZmlnKS50b0RhdGFVUkwobWltZVR5cGUsIHF1YWxpdHkpO1xuICAgICAgICBpZiAoY29uZmlnLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjb25maWcuY2FsbGJhY2sodXJsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUudG9JbWFnZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgaWYgKCFjb25maWcgfHwgIWNvbmZpZy5jYWxsYmFjaykge1xuICAgICAgICAgICAgdGhyb3cgJ2NhbGxiYWNrIHJlcXVpcmVkIGZvciB0b0ltYWdlIG1ldGhvZCBjb25maWcgYXJndW1lbnQnO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGNvbmZpZy5jYWxsYmFjaztcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5jYWxsYmFjaztcbiAgICAgICAgVXRpbF8xLlV0aWwuX3VybFRvSW1hZ2UodGhpcy50b0RhdGFVUkwoY29uZmlnKSwgZnVuY3Rpb24gKGltZykge1xuICAgICAgICAgICAgY2FsbGJhY2soaW1nKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgICAgICAgdGhpcy53aWR0aChzaXplLndpZHRoKTtcbiAgICAgICAgdGhpcy5oZWlnaHQoc2l6ZS5oZWlnaHQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy53aWR0aCgpLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCgpXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXRDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsYXNzTmFtZSB8fCB0aGlzLm5vZGVUeXBlO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuZ2V0VHlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZVR5cGU7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5nZXREcmFnRGlzdGFuY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmF0dHJzLmRyYWdEaXN0YW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdHRycy5kcmFnRGlzdGFuY2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5nZXREcmFnRGlzdGFuY2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBHbG9iYWxfMS5Lb252YS5kcmFnRGlzdGFuY2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9vZmYgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGV2dExpc3RlbmVycyA9IHRoaXMuZXZlbnRMaXN0ZW5lcnNbdHlwZV0sIGksIGV2dE5hbWUsIGhhbmRsZXI7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBldnRMaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGV2dE5hbWUgPSBldnRMaXN0ZW5lcnNbaV0ubmFtZTtcbiAgICAgICAgICAgIGhhbmRsZXIgPSBldnRMaXN0ZW5lcnNbaV0uaGFuZGxlcjtcbiAgICAgICAgICAgIGlmICgoZXZ0TmFtZSAhPT0gJ2tvbnZhJyB8fCBuYW1lID09PSAna29udmEnKSAmJlxuICAgICAgICAgICAgICAgICghbmFtZSB8fCBldnROYW1lID09PSBuYW1lKSAmJlxuICAgICAgICAgICAgICAgICghY2FsbGJhY2sgfHwgY2FsbGJhY2sgPT09IGhhbmRsZXIpKSB7XG4gICAgICAgICAgICAgICAgZXZ0TGlzdGVuZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBpZiAoZXZ0TGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5ldmVudExpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2ZpcmVDaGFuZ2VFdmVudCA9IGZ1bmN0aW9uIChhdHRyLCBvbGRWYWwsIG5ld1ZhbCkge1xuICAgICAgICB0aGlzLl9maXJlKGF0dHIgKyBDSEFOR0UsIHtcbiAgICAgICAgICAgIG9sZFZhbDogb2xkVmFsLFxuICAgICAgICAgICAgbmV3VmFsOiBuZXdWYWxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5zZXRJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICB2YXIgb2xkSWQgPSB0aGlzLmlkKCk7XG4gICAgICAgIGV4cG9ydHMuX3JlbW92ZUlkKG9sZElkLCB0aGlzKTtcbiAgICAgICAgX2FkZElkKHRoaXMsIGlkKTtcbiAgICAgICAgdGhpcy5fc2V0QXR0cignaWQnLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuc2V0TmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciBvbGROYW1lcyA9ICh0aGlzLm5hbWUoKSB8fCAnJykuc3BsaXQoL1xccy9nKTtcbiAgICAgICAgdmFyIG5ld05hbWVzID0gKG5hbWUgfHwgJycpLnNwbGl0KC9cXHMvZyk7XG4gICAgICAgIHZhciBzdWJuYW1lLCBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2xkTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN1Ym5hbWUgPSBvbGROYW1lc1tpXTtcbiAgICAgICAgICAgIGlmIChuZXdOYW1lcy5pbmRleE9mKHN1Ym5hbWUpID09PSAtMSAmJiBzdWJuYW1lKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0cy5fcmVtb3ZlTmFtZShzdWJuYW1lLCB0aGlzLl9pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5ld05hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzdWJuYW1lID0gbmV3TmFtZXNbaV07XG4gICAgICAgICAgICBpZiAob2xkTmFtZXMuaW5kZXhPZihzdWJuYW1lKSA9PT0gLTEgJiYgc3VibmFtZSkge1xuICAgICAgICAgICAgICAgIGV4cG9ydHMuX2FkZE5hbWUodGhpcywgc3VibmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0QXR0cihOQU1FLCBuYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5hZGROYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc05hbWUobmFtZSkpIHtcbiAgICAgICAgICAgIHZhciBvbGROYW1lID0gdGhpcy5uYW1lKCk7XG4gICAgICAgICAgICB2YXIgbmV3TmFtZSA9IG9sZE5hbWUgPyBvbGROYW1lICsgJyAnICsgbmFtZSA6IG5hbWU7XG4gICAgICAgICAgICB0aGlzLnNldE5hbWUobmV3TmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5oYXNOYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZ1bGxOYW1lID0gdGhpcy5uYW1lKCk7XG4gICAgICAgIGlmICghZnVsbE5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmFtZXMgPSAoZnVsbE5hbWUgfHwgJycpLnNwbGl0KC9cXHMvZyk7XG4gICAgICAgIHJldHVybiBuYW1lcy5pbmRleE9mKG5hbWUpICE9PSAtMTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnJlbW92ZU5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB2YXIgbmFtZXMgPSAodGhpcy5uYW1lKCkgfHwgJycpLnNwbGl0KC9cXHMvZyk7XG4gICAgICAgIHZhciBpbmRleCA9IG5hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIG5hbWVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLnNldE5hbWUobmFtZXMuam9pbignICcpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLnNldEF0dHIgPSBmdW5jdGlvbiAoYXR0ciwgdmFsKSB7XG4gICAgICAgIHZhciBmdW5jID0gdGhpc1tTRVQgKyBVdGlsXzEuVXRpbC5fY2FwaXRhbGl6ZShhdHRyKV07XG4gICAgICAgIGlmIChVdGlsXzEuVXRpbC5faXNGdW5jdGlvbihmdW5jKSkge1xuICAgICAgICAgICAgZnVuYy5jYWxsKHRoaXMsIHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRBdHRyKGF0dHIsIHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fc2V0QXR0ciA9IGZ1bmN0aW9uIChrZXksIHZhbCkge1xuICAgICAgICB2YXIgb2xkVmFsID0gdGhpcy5hdHRyc1trZXldO1xuICAgICAgICBpZiAob2xkVmFsID09PSB2YWwgJiYgIVV0aWxfMS5VdGlsLmlzT2JqZWN0KHZhbCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQgfHwgdmFsID09PSBudWxsKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5hdHRyc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hdHRyc1trZXldID0gdmFsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpcmVDaGFuZ2VFdmVudChrZXksIG9sZFZhbCwgdmFsKTtcbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9zZXRDb21wb25lbnRBdHRyID0gZnVuY3Rpb24gKGtleSwgY29tcG9uZW50LCB2YWwpIHtcbiAgICAgICAgdmFyIG9sZFZhbDtcbiAgICAgICAgaWYgKHZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvbGRWYWwgPSB0aGlzLmF0dHJzW2tleV07XG4gICAgICAgICAgICBpZiAoIW9sZFZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0cnNba2V5XSA9IHRoaXMuZ2V0QXR0cihrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hdHRyc1trZXldW2NvbXBvbmVudF0gPSB2YWw7XG4gICAgICAgICAgICB0aGlzLl9maXJlQ2hhbmdlRXZlbnQoa2V5LCBvbGRWYWwsIHZhbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9maXJlQW5kQnViYmxlID0gZnVuY3Rpb24gKGV2ZW50VHlwZSwgZXZ0LCBjb21wYXJlU2hhcGUpIHtcbiAgICAgICAgaWYgKGV2dCAmJiB0aGlzLm5vZGVUeXBlID09PSBTSEFQRSkge1xuICAgICAgICAgICAgZXZ0LnRhcmdldCA9IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNob3VsZFN0b3AgPSAoZXZlbnRUeXBlID09PSBNT1VTRUVOVEVSIHx8IGV2ZW50VHlwZSA9PT0gTU9VU0VMRUFWRSkgJiZcbiAgICAgICAgICAgICgoY29tcGFyZVNoYXBlICYmXG4gICAgICAgICAgICAgICAgKHRoaXMgPT09IGNvbXBhcmVTaGFwZSB8fFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5pc0FuY2VzdG9yT2YgJiYgdGhpcy5pc0FuY2VzdG9yT2YoY29tcGFyZVNoYXBlKSkpKSB8fFxuICAgICAgICAgICAgICAgICh0aGlzLm5vZGVUeXBlID09PSAnU3RhZ2UnICYmICFjb21wYXJlU2hhcGUpKTtcbiAgICAgICAgaWYgKCFzaG91bGRTdG9wKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKGV2ZW50VHlwZSwgZXZ0KTtcbiAgICAgICAgICAgIHZhciBzdG9wQnViYmxlID0gKGV2ZW50VHlwZSA9PT0gTU9VU0VFTlRFUiB8fCBldmVudFR5cGUgPT09IE1PVVNFTEVBVkUpICYmXG4gICAgICAgICAgICAgICAgKGNvbXBhcmVTaGFwZSAmJlxuICAgICAgICAgICAgICAgICAgICBjb21wYXJlU2hhcGUuaXNBbmNlc3Rvck9mICYmXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmVTaGFwZS5pc0FuY2VzdG9yT2YodGhpcykgJiZcbiAgICAgICAgICAgICAgICAgICAgIWNvbXBhcmVTaGFwZS5pc0FuY2VzdG9yT2YodGhpcy5wYXJlbnQpKTtcbiAgICAgICAgICAgIGlmICgoKGV2dCAmJiAhZXZ0LmNhbmNlbEJ1YmJsZSkgfHwgIWV2dCkgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudCAmJlxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmlzTGlzdGVuaW5nKCkgJiZcbiAgICAgICAgICAgICAgICAhc3RvcEJ1YmJsZSkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wYXJlU2hhcGUgJiYgY29tcGFyZVNoYXBlLnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXJlQW5kQnViYmxlLmNhbGwodGhpcy5wYXJlbnQsIGV2ZW50VHlwZSwgZXZ0LCBjb21wYXJlU2hhcGUucGFyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmVBbmRCdWJibGUuY2FsbCh0aGlzLnBhcmVudCwgZXZlbnRUeXBlLCBldnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2ZpcmUgPSBmdW5jdGlvbiAoZXZlbnRUeXBlLCBldnQpIHtcbiAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuZXZlbnRMaXN0ZW5lcnNbZXZlbnRUeXBlXSwgaTtcbiAgICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICAgICAgZXZ0ID0gZXZ0IHx8IHt9O1xuICAgICAgICAgICAgZXZ0LmN1cnJlbnRUYXJnZXQgPSB0aGlzO1xuICAgICAgICAgICAgZXZ0LnR5cGUgPSBldmVudFR5cGU7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRzW2ldLmhhbmRsZXIuY2FsbCh0aGlzLCBldnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRyYXdTY2VuZSgpO1xuICAgICAgICB0aGlzLmRyYXdIaXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5zdGFydERyYWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdGFnZSA9IHRoaXMuZ2V0U3RhZ2UoKSwgbGF5ZXIgPSB0aGlzLmdldExheWVyKCksIHBvcyA9IHN0YWdlLmdldFBvaW50ZXJQb3NpdGlvbigpLCBhcCA9IHRoaXMuZ2V0QWJzb2x1dGVQb3NpdGlvbigpO1xuICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICBpZiAoRHJhZ0FuZERyb3BfMS5ERC5ub2RlKSB7XG4gICAgICAgICAgICAgICAgRHJhZ0FuZERyb3BfMS5ERC5ub2RlLnN0b3BEcmFnKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBEcmFnQW5kRHJvcF8xLkRELm5vZGUgPSB0aGlzO1xuICAgICAgICAgICAgRHJhZ0FuZERyb3BfMS5ERC5zdGFydFBvaW50ZXJQb3MgPSBwb3M7XG4gICAgICAgICAgICBEcmFnQW5kRHJvcF8xLkRELm9mZnNldC54ID0gcG9zLnggLSBhcC54O1xuICAgICAgICAgICAgRHJhZ0FuZERyb3BfMS5ERC5vZmZzZXQueSA9IHBvcy55IC0gYXAueTtcbiAgICAgICAgICAgIERyYWdBbmREcm9wXzEuREQuYW5pbS5zZXRMYXllcnMobGF5ZXIgfHwgdGhpc1snZ2V0TGF5ZXJzJ10oKSk7XG4gICAgICAgICAgICBEcmFnQW5kRHJvcF8xLkRELmFuaW0uc3RhcnQoKTtcbiAgICAgICAgICAgIHRoaXMuX3NldERyYWdQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5fc2V0RHJhZ1Bvc2l0aW9uID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICB2YXIgcG9zID0gdGhpcy5nZXRTdGFnZSgpLmdldFBvaW50ZXJQb3NpdGlvbigpLCBkYmYgPSB0aGlzLmRyYWdCb3VuZEZ1bmMoKTtcbiAgICAgICAgaWYgKCFwb3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3Tm9kZVBvcyA9IHtcbiAgICAgICAgICAgIHg6IHBvcy54IC0gRHJhZ0FuZERyb3BfMS5ERC5vZmZzZXQueCxcbiAgICAgICAgICAgIHk6IHBvcy55IC0gRHJhZ0FuZERyb3BfMS5ERC5vZmZzZXQueVxuICAgICAgICB9O1xuICAgICAgICBpZiAoZGJmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG5ld05vZGVQb3MgPSBkYmYuY2FsbCh0aGlzLCBuZXdOb2RlUG9zLCBldnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0QWJzb2x1dGVQb3NpdGlvbihuZXdOb2RlUG9zKTtcbiAgICAgICAgaWYgKCF0aGlzLl9sYXN0UG9zIHx8XG4gICAgICAgICAgICB0aGlzLl9sYXN0UG9zLnggIT09IG5ld05vZGVQb3MueCB8fFxuICAgICAgICAgICAgdGhpcy5fbGFzdFBvcy55ICE9PSBuZXdOb2RlUG9zLnkpIHtcbiAgICAgICAgICAgIERyYWdBbmREcm9wXzEuREQuYW5pbVsnZGlydHknXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGFzdFBvcyA9IG5ld05vZGVQb3M7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5zdG9wRHJhZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGV2dCA9IHt9O1xuICAgICAgICBEcmFnQW5kRHJvcF8xLkRELl9lbmREcmFnQmVmb3JlKGV2dCk7XG4gICAgICAgIERyYWdBbmREcm9wXzEuREQuX2VuZERyYWdBZnRlcihldnQpO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuc2V0RHJhZ2dhYmxlID0gZnVuY3Rpb24gKGRyYWdnYWJsZSkge1xuICAgICAgICB0aGlzLl9zZXRBdHRyKCdkcmFnZ2FibGUnLCBkcmFnZ2FibGUpO1xuICAgICAgICB0aGlzLl9kcmFnQ2hhbmdlKCk7XG4gICAgfTtcbiAgICBOb2RlLnByb3RvdHlwZS5pc0RyYWdnaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gISEoRHJhZ0FuZERyb3BfMS5ERC5ub2RlICYmIERyYWdBbmREcm9wXzEuREQubm9kZSA9PT0gdGhpcyAmJiBEcmFnQW5kRHJvcF8xLkRELmlzRHJhZ2dpbmcpO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2xpc3RlbkRyYWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2RyYWdDbGVhbnVwKCk7XG4gICAgICAgIHRoaXMub24oJ21vdXNlZG93bi5rb252YSB0b3VjaHN0YXJ0LmtvbnZhJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgdmFyIHNob3VsZENoZWNrQnV0dG9uID0gZXZ0LmV2dC5idXR0b24gIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHZhciBjYW5EcmFnID0gIXNob3VsZENoZWNrQnV0dG9uIHx8IEdsb2JhbF8xLktvbnZhLmRyYWdCdXR0b25zLmluZGV4T2YoZXZ0LmV2dC5idXR0b24pID49IDA7XG4gICAgICAgICAgICBpZiAoIWNhbkRyYWcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIURyYWdBbmREcm9wXzEuREQubm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREcmFnKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTm9kZS5wcm90b3R5cGUuX2RyYWdDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmF0dHJzLmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuRHJhZygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ0NsZWFudXAoKTtcbiAgICAgICAgICAgIHZhciBzdGFnZSA9IHRoaXMuZ2V0U3RhZ2UoKTtcbiAgICAgICAgICAgIHZhciBkZCA9IERyYWdBbmREcm9wXzEuREQ7XG4gICAgICAgICAgICBpZiAoc3RhZ2UgJiYgZGQubm9kZSAmJiBkZC5ub2RlLl9pZCA9PT0gdGhpcy5faWQpIHtcbiAgICAgICAgICAgICAgICBkZC5ub2RlLnN0b3BEcmFnKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vZGUucHJvdG90eXBlLl9kcmFnQ2xlYW51cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5vZmYoJ21vdXNlZG93bi5rb252YScpO1xuICAgICAgICB0aGlzLm9mZigndG91Y2hzdGFydC5rb252YScpO1xuICAgIH07XG4gICAgTm9kZS5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSwgY29udGFpbmVyKSB7XG4gICAgICAgIGlmIChVdGlsXzEuVXRpbC5faXNTdHJpbmcoZGF0YSkpIHtcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVOb2RlKGRhdGEsIGNvbnRhaW5lcik7XG4gICAgfTtcbiAgICBOb2RlLl9jcmVhdGVOb2RlID0gZnVuY3Rpb24gKG9iaiwgY29udGFpbmVyKSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSBOb2RlLnByb3RvdHlwZS5nZXRDbGFzc05hbWUuY2FsbChvYmopLCBjaGlsZHJlbiA9IG9iai5jaGlsZHJlbiwgbm8sIGxlbiwgbjtcbiAgICAgICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICAgICAgb2JqLmF0dHJzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUdsb2JhbF8xLl9OT0RFU19SRUdJU1RSWVtjbGFzc05hbWVdKSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdDYW4gbm90IGZpbmQgYSBub2RlIHdpdGggY2xhc3MgbmFtZSBcIicgK1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArXG4gICAgICAgICAgICAgICAgJ1wiLiBGYWxsYmFjayB0byBcIlNoYXBlXCIuJyk7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSAnU2hhcGUnO1xuICAgICAgICB9XG4gICAgICAgIHZhciBDbGFzcyA9IEdsb2JhbF8xLl9OT0RFU19SRUdJU1RSWVtjbGFzc05hbWVdO1xuICAgICAgICBubyA9IG5ldyBDbGFzcyhvYmouYXR0cnMpO1xuICAgICAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGxlbiA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgICAgIG5vLmFkZChOb2RlLl9jcmVhdGVOb2RlKGNoaWxkcmVuW25dKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vO1xuICAgIH07XG4gICAgcmV0dXJuIE5vZGU7XG59KCkpO1xuZXhwb3J0cy5Ob2RlID0gTm9kZTtcbk5vZGUucHJvdG90eXBlLm5vZGVUeXBlID0gJ05vZGUnO1xuTm9kZS5wcm90b3R5cGUuX2F0dHJzQWZmZWN0aW5nU2l6ZSA9IFtdO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICd6SW5kZXgnKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnYWJzb2x1dGVQb3NpdGlvbicpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdwb3NpdGlvbicpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICd4JywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAneScsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ2dsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbicsICdzb3VyY2Utb3ZlcicsIFZhbGlkYXRvcnNfMS5nZXRTdHJpbmdWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ29wYWNpdHknLCAxLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICduYW1lJywgJycsIFZhbGlkYXRvcnNfMS5nZXRTdHJpbmdWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ2lkJywgJycsIFZhbGlkYXRvcnNfMS5nZXRTdHJpbmdWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3JvdGF0aW9uJywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3NjYWxlJywgWyd4JywgJ3knXSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3NjYWxlWCcsIDEsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3NjYWxlWScsIDEsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKE5vZGUsICdza2V3JywgWyd4JywgJ3knXSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3NrZXdYJywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnc2tld1knLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihOb2RlLCAnb2Zmc2V0JywgWyd4JywgJ3knXSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ29mZnNldFgnLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdvZmZzZXRZJywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnZHJhZ0Rpc3RhbmNlJywgbnVsbCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnd2lkdGgnLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdoZWlnaHQnLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdsaXN0ZW5pbmcnLCAnaW5oZXJpdCcsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICB2YXIgaXNWYWxpZCA9IHZhbCA9PT0gdHJ1ZSB8fCB2YWwgPT09IGZhbHNlIHx8IHZhbCA9PT0gJ2luaGVyaXQnO1xuICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICBVdGlsXzEuVXRpbC53YXJuKHZhbCArXG4gICAgICAgICAgICAnIGlzIGEgbm90IHZhbGlkIHZhbHVlIGZvciBcImxpc3RlbmluZ1wiIGF0dHJpYnV0ZS4gVGhlIHZhbHVlIG1heSBiZSB0cnVlLCBmYWxzZSBvciBcImluaGVyaXRcIi4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbn0pO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdwcmV2ZW50RGVmYXVsdCcsIHRydWUsIFZhbGlkYXRvcnNfMS5nZXRCb29sZWFuVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdmaWx0ZXJzJywgbnVsbCwgZnVuY3Rpb24gKHZhbCkge1xuICAgIHRoaXMuX2ZpbHRlclVwVG9EYXRlID0gZmFsc2U7XG4gICAgcmV0dXJuIHZhbDtcbn0pO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICd2aXNpYmxlJywgJ2luaGVyaXQnLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgdmFyIGlzVmFsaWQgPSB2YWwgPT09IHRydWUgfHwgdmFsID09PSBmYWxzZSB8fCB2YWwgPT09ICdpbmhlcml0JztcbiAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgVXRpbF8xLlV0aWwud2Fybih2YWwgK1xuICAgICAgICAgICAgJyBpcyBhIG5vdCB2YWxpZCB2YWx1ZSBmb3IgXCJ2aXNpYmxlXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgbWF5IGJlIHRydWUsIGZhbHNlIG9yIFwiaW5oZXJpdFwiLicpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xufSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3RyYW5zZm9ybXNFbmFibGVkJywgJ2FsbCcsIFZhbGlkYXRvcnNfMS5nZXRTdHJpbmdWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3NpemUnKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihOb2RlLCAnZHJhZ0JvdW5kRnVuYycpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdkcmFnZ2FibGUnLCBmYWxzZSwgVmFsaWRhdG9yc18xLmdldEJvb2xlYW5WYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5iYWNrQ29tcGF0KE5vZGUsIHtcbiAgICByb3RhdGVEZWc6ICdyb3RhdGUnLFxuICAgIHNldFJvdGF0aW9uRGVnOiAnc2V0Um90YXRpb24nLFxuICAgIGdldFJvdGF0aW9uRGVnOiAnZ2V0Um90YXRpb24nXG59KTtcblV0aWxfMS5Db2xsZWN0aW9uLm1hcE1ldGhvZHMoTm9kZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFV0aWxfMSA9IHJlcXVpcmUoXCIuL1V0aWxcIik7XG52YXIgRmFjdG9yeV8xID0gcmVxdWlyZShcIi4vRmFjdG9yeVwiKTtcbnZhciBOb2RlXzEgPSByZXF1aXJlKFwiLi9Ob2RlXCIpO1xudmFyIFZhbGlkYXRvcnNfMSA9IHJlcXVpcmUoXCIuL1ZhbGlkYXRvcnNcIik7XG52YXIgR2xvYmFsXzEgPSByZXF1aXJlKFwiLi9HbG9iYWxcIik7XG52YXIgSEFTX1NIQURPVyA9ICdoYXNTaGFkb3cnO1xudmFyIFNIQURPV19SR0JBID0gJ3NoYWRvd1JHQkEnO1xudmFyIHBhdHRlcm5JbWFnZSA9ICdwYXR0ZXJuSW1hZ2UnO1xudmFyIGxpbmVhckdyYWRpZW50ID0gJ2xpbmVhckdyYWRpZW50JztcbnZhciByYWRpYWxHcmFkaWVudCA9ICdyYWRpYWxHcmFkaWVudCc7XG52YXIgZHVtbXlDb250ZXh0O1xuZnVuY3Rpb24gZ2V0RHVtbXlDb250ZXh0KCkge1xuICAgIGlmIChkdW1teUNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIGR1bW15Q29udGV4dDtcbiAgICB9XG4gICAgZHVtbXlDb250ZXh0ID0gVXRpbF8xLlV0aWwuY3JlYXRlQ2FudmFzRWxlbWVudCgpLmdldENvbnRleHQoJzJkJyk7XG4gICAgcmV0dXJuIGR1bW15Q29udGV4dDtcbn1cbmV4cG9ydHMuc2hhcGVzID0ge307XG5mdW5jdGlvbiBfZmlsbEZ1bmMoY29udGV4dCkge1xuICAgIGNvbnRleHQuZmlsbCgpO1xufVxuZnVuY3Rpb24gX3N0cm9rZUZ1bmMoY29udGV4dCkge1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG59XG5mdW5jdGlvbiBfZmlsbEZ1bmNIaXQoY29udGV4dCkge1xuICAgIGNvbnRleHQuZmlsbCgpO1xufVxuZnVuY3Rpb24gX3N0cm9rZUZ1bmNIaXQoY29udGV4dCkge1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG59XG5mdW5jdGlvbiBfY2xlYXJIYXNTaGFkb3dDYWNoZSgpIHtcbiAgICB0aGlzLl9jbGVhckNhY2hlKEhBU19TSEFET1cpO1xufVxuZnVuY3Rpb24gX2NsZWFyR2V0U2hhZG93UkdCQUNhY2hlKCkge1xuICAgIHRoaXMuX2NsZWFyQ2FjaGUoU0hBRE9XX1JHQkEpO1xufVxuZnVuY3Rpb24gX2NsZWFyRmlsbFBhdHRlcm5DYWNoZSgpIHtcbiAgICB0aGlzLl9jbGVhckNhY2hlKHBhdHRlcm5JbWFnZSk7XG59XG5mdW5jdGlvbiBfY2xlYXJMaW5lYXJHcmFkaWVudENhY2hlKCkge1xuICAgIHRoaXMuX2NsZWFyQ2FjaGUobGluZWFyR3JhZGllbnQpO1xufVxuZnVuY3Rpb24gX2NsZWFyUmFkaWFsR3JhZGllbnRDYWNoZSgpIHtcbiAgICB0aGlzLl9jbGVhckNhY2hlKHJhZGlhbEdyYWRpZW50KTtcbn1cbnZhciBTaGFwZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNoYXBlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNoYXBlKGNvbmZpZykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjb25maWcpIHx8IHRoaXM7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBrZXkgPSBVdGlsXzEuVXRpbC5nZXRSYW5kb21Db2xvcigpO1xuICAgICAgICAgICAgaWYgKGtleSAmJiAhKGtleSBpbiBleHBvcnRzLnNoYXBlcykpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5jb2xvcktleSA9IGtleTtcbiAgICAgICAgZXhwb3J0cy5zaGFwZXNba2V5XSA9IF90aGlzO1xuICAgICAgICBfdGhpcy5vbignc2hhZG93Q29sb3JDaGFuZ2Uua29udmEgc2hhZG93Qmx1ckNoYW5nZS5rb252YSBzaGFkb3dPZmZzZXRDaGFuZ2Uua29udmEgc2hhZG93T3BhY2l0eUNoYW5nZS5rb252YSBzaGFkb3dFbmFibGVkQ2hhbmdlLmtvbnZhJywgX2NsZWFySGFzU2hhZG93Q2FjaGUpO1xuICAgICAgICBfdGhpcy5vbignc2hhZG93Q29sb3JDaGFuZ2Uua29udmEgc2hhZG93T3BhY2l0eUNoYW5nZS5rb252YSBzaGFkb3dFbmFibGVkQ2hhbmdlLmtvbnZhJywgX2NsZWFyR2V0U2hhZG93UkdCQUNhY2hlKTtcbiAgICAgICAgX3RoaXMub24oJ2ZpbGxQcmlvcml0eUNoYW5nZS5rb252YSBmaWxsUGF0dGVybkltYWdlQ2hhbmdlLmtvbnZhIGZpbGxQYXR0ZXJuUmVwZWF0Q2hhbmdlLmtvbnZhJywgX2NsZWFyRmlsbFBhdHRlcm5DYWNoZSk7XG4gICAgICAgIF90aGlzLm9uKCdmaWxsUHJpb3JpdHlDaGFuZ2Uua29udmEgZmlsbExpbmVhckdyYWRpZW50Q29sb3JTdG9wc0NoYW5nZS5rb252YSBmaWxsTGluZWFyR3JhZGllbnRTdGFydFBvaW50WENoYW5nZS5rb252YSBmaWxsTGluZWFyR3JhZGllbnRTdGFydFBvaW50WUNoYW5nZS5rb252YSBmaWxsTGluZWFyR3JhZGllbnRFbmRQb2ludFhDaGFuZ2Uua29udmEgZmlsbExpbmVhckdyYWRpZW50RW5kUG9pbnRZQ2hhbmdlLmtvbnZhJywgX2NsZWFyTGluZWFyR3JhZGllbnRDYWNoZSk7XG4gICAgICAgIF90aGlzLm9uKCdmaWxsUHJpb3JpdHlDaGFuZ2Uua29udmEgZmlsbFJhZGlhbEdyYWRpZW50Q29sb3JTdG9wc0NoYW5nZS5rb252YSBmaWxsUmFkaWFsR3JhZGllbnRTdGFydFBvaW50WENoYW5nZS5rb252YSBmaWxsUmFkaWFsR3JhZGllbnRTdGFydFBvaW50WUNoYW5nZS5rb252YSBmaWxsUmFkaWFsR3JhZGllbnRFbmRQb2ludFhDaGFuZ2Uua29udmEgZmlsbFJhZGlhbEdyYWRpZW50RW5kUG9pbnRZQ2hhbmdlLmtvbnZhIGZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UmFkaXVzQ2hhbmdlLmtvbnZhIGZpbGxSYWRpYWxHcmFkaWVudEVuZFJhZGl1c0NoYW5nZS5rb252YScsIF9jbGVhclJhZGlhbEdyYWRpZW50Q2FjaGUpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFNoYXBlLnByb3RvdHlwZS5nZXRDb250ZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRMYXllcigpLmdldENvbnRleHQoKTtcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5nZXRDYW52YXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldExheWVyKCkuZ2V0Q2FudmFzKCk7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuZ2V0U2NlbmVGdW5jID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRycy5zY2VuZUZ1bmMgfHwgdGhpc1snX3NjZW5lRnVuYyddO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLmdldEhpdEZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJzLmhpdEZ1bmMgfHwgdGhpc1snX2hpdEZ1bmMnXTtcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5oYXNTaGFkb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShIQVNfU0hBRE9XLCB0aGlzLl9oYXNTaGFkb3cpO1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLl9oYXNTaGFkb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5zaGFkb3dFbmFibGVkKCkgJiZcbiAgICAgICAgICAgICh0aGlzLnNoYWRvd09wYWNpdHkoKSAhPT0gMCAmJlxuICAgICAgICAgICAgICAgICEhKHRoaXMuc2hhZG93Q29sb3IoKSB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYWRvd0JsdXIoKSB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYWRvd09mZnNldFgoKSB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYWRvd09mZnNldFkoKSkpKTtcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5fZ2V0RmlsbFBhdHRlcm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShwYXR0ZXJuSW1hZ2UsIHRoaXMuX19nZXRGaWxsUGF0dGVybik7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuX19nZXRGaWxsUGF0dGVybiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsbFBhdHRlcm5JbWFnZSgpKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gZ2V0RHVtbXlDb250ZXh0KCk7XG4gICAgICAgICAgICByZXR1cm4gY3R4LmNyZWF0ZVBhdHRlcm4odGhpcy5maWxsUGF0dGVybkltYWdlKCksIHRoaXMuZmlsbFBhdHRlcm5SZXBlYXQoKSB8fCAncmVwZWF0Jyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5fZ2V0TGluZWFyR3JhZGllbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShsaW5lYXJHcmFkaWVudCwgdGhpcy5fX2dldExpbmVhckdyYWRpZW50KTtcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5fX2dldExpbmVhckdyYWRpZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sb3JTdG9wcyA9IHRoaXMuZmlsbExpbmVhckdyYWRpZW50Q29sb3JTdG9wcygpO1xuICAgICAgICBpZiAoY29sb3JTdG9wcykge1xuICAgICAgICAgICAgdmFyIGN0eCA9IGdldER1bW15Q29udGV4dCgpO1xuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5maWxsTGluZWFyR3JhZGllbnRTdGFydFBvaW50KCk7XG4gICAgICAgICAgICB2YXIgZW5kID0gdGhpcy5maWxsTGluZWFyR3JhZGllbnRFbmRQb2ludCgpO1xuICAgICAgICAgICAgdmFyIGdyZCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudChzdGFydC54LCBzdGFydC55LCBlbmQueCwgZW5kLnkpO1xuICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBjb2xvclN0b3BzLmxlbmd0aDsgbiArPSAyKSB7XG4gICAgICAgICAgICAgICAgZ3JkLmFkZENvbG9yU3RvcChjb2xvclN0b3BzW25dLCBjb2xvclN0b3BzW24gKyAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZ3JkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuX2dldFJhZGlhbEdyYWRpZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUocmFkaWFsR3JhZGllbnQsIHRoaXMuX19nZXRSYWRpYWxHcmFkaWVudCk7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuX19nZXRSYWRpYWxHcmFkaWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbG9yU3RvcHMgPSB0aGlzLmZpbGxSYWRpYWxHcmFkaWVudENvbG9yU3RvcHMoKTtcbiAgICAgICAgaWYgKGNvbG9yU3RvcHMpIHtcbiAgICAgICAgICAgIHZhciBjdHggPSBnZXREdW1teUNvbnRleHQoKTtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRQb2ludCgpO1xuICAgICAgICAgICAgdmFyIGVuZCA9IHRoaXMuZmlsbFJhZGlhbEdyYWRpZW50RW5kUG9pbnQoKTtcbiAgICAgICAgICAgIHZhciBncmQgPSBjdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoc3RhcnQueCwgc3RhcnQueSwgdGhpcy5maWxsUmFkaWFsR3JhZGllbnRTdGFydFJhZGl1cygpLCBlbmQueCwgZW5kLnksIHRoaXMuZmlsbFJhZGlhbEdyYWRpZW50RW5kUmFkaXVzKCkpO1xuICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBjb2xvclN0b3BzLmxlbmd0aDsgbiArPSAyKSB7XG4gICAgICAgICAgICAgICAgZ3JkLmFkZENvbG9yU3RvcChjb2xvclN0b3BzW25dLCBjb2xvclN0b3BzW24gKyAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZ3JkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuZ2V0U2hhZG93UkdCQSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKFNIQURPV19SR0JBLCB0aGlzLl9nZXRTaGFkb3dSR0JBKTtcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5fZ2V0U2hhZG93UkdCQSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzU2hhZG93KCkpIHtcbiAgICAgICAgICAgIHZhciByZ2JhID0gVXRpbF8xLlV0aWwuY29sb3JUb1JHQkEodGhpcy5zaGFkb3dDb2xvcigpKTtcbiAgICAgICAgICAgIHJldHVybiAoJ3JnYmEoJyArXG4gICAgICAgICAgICAgICAgcmdiYS5yICtcbiAgICAgICAgICAgICAgICAnLCcgK1xuICAgICAgICAgICAgICAgIHJnYmEuZyArXG4gICAgICAgICAgICAgICAgJywnICtcbiAgICAgICAgICAgICAgICByZ2JhLmIgK1xuICAgICAgICAgICAgICAgICcsJyArXG4gICAgICAgICAgICAgICAgcmdiYS5hICogKHRoaXMuc2hhZG93T3BhY2l0eSgpIHx8IDEpICtcbiAgICAgICAgICAgICAgICAnKScpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuaGFzRmlsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICEhKHRoaXMuZmlsbCgpIHx8XG4gICAgICAgICAgICB0aGlzLmZpbGxQYXR0ZXJuSW1hZ2UoKSB8fFxuICAgICAgICAgICAgdGhpcy5maWxsTGluZWFyR3JhZGllbnRDb2xvclN0b3BzKCkgfHxcbiAgICAgICAgICAgIHRoaXMuZmlsbFJhZGlhbEdyYWRpZW50Q29sb3JTdG9wcygpKTtcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5oYXNTdHJva2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5zdHJva2VFbmFibGVkKCkgJiZcbiAgICAgICAgICAgIHRoaXMuc3Ryb2tlV2lkdGgoKSAmJlxuICAgICAgICAgICAgISEodGhpcy5zdHJva2UoKSB8fCB0aGlzLnN0cm9rZUxpbmVhckdyYWRpZW50Q29sb3JTdG9wcygpKSk7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuaW50ZXJzZWN0cyA9IGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICB2YXIgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCksIGJ1ZmZlckhpdENhbnZhcyA9IHN0YWdlLmJ1ZmZlckhpdENhbnZhcywgcDtcbiAgICAgICAgYnVmZmVySGl0Q2FudmFzLmdldENvbnRleHQoKS5jbGVhcigpO1xuICAgICAgICB0aGlzLmRyYXdIaXQoYnVmZmVySGl0Q2FudmFzKTtcbiAgICAgICAgcCA9IGJ1ZmZlckhpdENhbnZhcy5jb250ZXh0LmdldEltYWdlRGF0YShNYXRoLnJvdW5kKHBvaW50LngpLCBNYXRoLnJvdW5kKHBvaW50LnkpLCAxLCAxKS5kYXRhO1xuICAgICAgICByZXR1cm4gcFszXSA+IDA7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgTm9kZV8xLk5vZGUucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcbiAgICAgICAgZGVsZXRlIGV4cG9ydHMuc2hhcGVzW3RoaXMuY29sb3JLZXldO1xuICAgICAgICBkZWxldGUgdGhpcy5jb2xvcktleTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuX3VzZUJ1ZmZlckNhbnZhcyA9IGZ1bmN0aW9uIChjYWNoaW5nKSB7XG4gICAgICAgIHJldHVybiAoKCFjYWNoaW5nIHx8IHRoaXMuaGFzU2hhZG93KCkpICYmXG4gICAgICAgICAgICB0aGlzLnBlcmZlY3REcmF3RW5hYmxlZCgpICYmXG4gICAgICAgICAgICB0aGlzLmdldEFic29sdXRlT3BhY2l0eSgpICE9PSAxICYmXG4gICAgICAgICAgICB0aGlzLmhhc0ZpbGwoKSAmJlxuICAgICAgICAgICAgdGhpcy5oYXNTdHJva2UoKSAmJlxuICAgICAgICAgICAgdGhpcy5nZXRTdGFnZSgpKTtcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5zZXRTdHJva2VIaXRFbmFibGVkID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLmhpdFN0cm9rZVdpZHRoKCdhdXRvJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpdFN0cm9rZVdpZHRoKDApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuZ2V0U3Ryb2tlSGl0RW5hYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGl0U3Ryb2tlV2lkdGgoKSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5nZXRTZWxmUmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNpemUgPSB0aGlzLnNpemUoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMuX2NlbnRyb2lkID8gTWF0aC5yb3VuZCgtc2l6ZS53aWR0aCAvIDIpIDogMCxcbiAgICAgICAgICAgIHk6IHRoaXMuX2NlbnRyb2lkID8gTWF0aC5yb3VuZCgtc2l6ZS5oZWlnaHQgLyAyKSA6IDAsXG4gICAgICAgICAgICB3aWR0aDogc2l6ZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogc2l6ZS5oZWlnaHRcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5nZXRDbGllbnRSZWN0ID0gZnVuY3Rpb24gKGF0dHJzKSB7XG4gICAgICAgIGF0dHJzID0gYXR0cnMgfHwge307XG4gICAgICAgIHZhciBza2lwVHJhbnNmb3JtID0gYXR0cnMuc2tpcFRyYW5zZm9ybTtcbiAgICAgICAgdmFyIHJlbGF0aXZlVG8gPSBhdHRycy5yZWxhdGl2ZVRvO1xuICAgICAgICB2YXIgZmlsbFJlY3QgPSB0aGlzLmdldFNlbGZSZWN0KCk7XG4gICAgICAgIHZhciBhcHBseVN0cm9rZSA9ICFhdHRycy5za2lwU3Ryb2tlICYmIHRoaXMuaGFzU3Ryb2tlKCk7XG4gICAgICAgIHZhciBzdHJva2VXaWR0aCA9IChhcHBseVN0cm9rZSAmJiB0aGlzLnN0cm9rZVdpZHRoKCkpIHx8IDA7XG4gICAgICAgIHZhciBmaWxsQW5kU3Ryb2tlV2lkdGggPSBmaWxsUmVjdC53aWR0aCArIHN0cm9rZVdpZHRoO1xuICAgICAgICB2YXIgZmlsbEFuZFN0cm9rZUhlaWdodCA9IGZpbGxSZWN0LmhlaWdodCArIHN0cm9rZVdpZHRoO1xuICAgICAgICB2YXIgYXBwbHlTaGFkb3cgPSAhYXR0cnMuc2tpcFNoYWRvdyAmJiB0aGlzLmhhc1NoYWRvdygpO1xuICAgICAgICB2YXIgc2hhZG93T2Zmc2V0WCA9IGFwcGx5U2hhZG93ID8gdGhpcy5zaGFkb3dPZmZzZXRYKCkgOiAwO1xuICAgICAgICB2YXIgc2hhZG93T2Zmc2V0WSA9IGFwcGx5U2hhZG93ID8gdGhpcy5zaGFkb3dPZmZzZXRZKCkgOiAwO1xuICAgICAgICB2YXIgcHJlV2lkdGggPSBmaWxsQW5kU3Ryb2tlV2lkdGggKyBNYXRoLmFicyhzaGFkb3dPZmZzZXRYKTtcbiAgICAgICAgdmFyIHByZUhlaWdodCA9IGZpbGxBbmRTdHJva2VIZWlnaHQgKyBNYXRoLmFicyhzaGFkb3dPZmZzZXRZKTtcbiAgICAgICAgdmFyIGJsdXJSYWRpdXMgPSAoYXBwbHlTaGFkb3cgJiYgdGhpcy5zaGFkb3dCbHVyKCkpIHx8IDA7XG4gICAgICAgIHZhciB3aWR0aCA9IHByZVdpZHRoICsgYmx1clJhZGl1cyAqIDI7XG4gICAgICAgIHZhciBoZWlnaHQgPSBwcmVIZWlnaHQgKyBibHVyUmFkaXVzICogMjtcbiAgICAgICAgdmFyIHJvdW5kaW5nT2Zmc2V0ID0gMDtcbiAgICAgICAgaWYgKE1hdGgucm91bmQoc3Ryb2tlV2lkdGggLyAyKSAhPT0gc3Ryb2tlV2lkdGggLyAyKSB7XG4gICAgICAgICAgICByb3VuZGluZ09mZnNldCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlY3QgPSB7XG4gICAgICAgICAgICB3aWR0aDogd2lkdGggKyByb3VuZGluZ09mZnNldCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0ICsgcm91bmRpbmdPZmZzZXQsXG4gICAgICAgICAgICB4OiAtTWF0aC5yb3VuZChzdHJva2VXaWR0aCAvIDIgKyBibHVyUmFkaXVzKSArXG4gICAgICAgICAgICAgICAgTWF0aC5taW4oc2hhZG93T2Zmc2V0WCwgMCkgK1xuICAgICAgICAgICAgICAgIGZpbGxSZWN0LngsXG4gICAgICAgICAgICB5OiAtTWF0aC5yb3VuZChzdHJva2VXaWR0aCAvIDIgKyBibHVyUmFkaXVzKSArXG4gICAgICAgICAgICAgICAgTWF0aC5taW4oc2hhZG93T2Zmc2V0WSwgMCkgK1xuICAgICAgICAgICAgICAgIGZpbGxSZWN0LnlcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFza2lwVHJhbnNmb3JtKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtZWRSZWN0KHJlY3QsIHJlbGF0aXZlVG8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWN0O1xuICAgIH07XG4gICAgU2hhcGUucHJvdG90eXBlLmRyYXdTY2VuZSA9IGZ1bmN0aW9uIChjYW4sIHRvcCwgY2FjaGluZywgc2tpcEJ1ZmZlcikge1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCksIGNhbnZhcyA9IGNhbiB8fCBsYXllci5nZXRDYW52YXMoKSwgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCksIGNhY2hlZENhbnZhcyA9IHRoaXMuX2dldENhbnZhc0NhY2hlKCksIGRyYXdGdW5jID0gdGhpcy5zY2VuZUZ1bmMoKSwgaGFzU2hhZG93ID0gdGhpcy5oYXNTaGFkb3coKSwgaGFzU3Ryb2tlID0gdGhpcy5oYXNTdHJva2UoKSwgc3RhZ2UsIGJ1ZmZlckNhbnZhcywgYnVmZmVyQ29udGV4dDtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmlzaWJsZSgpICYmICFjYWNoaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FjaGVkQ2FudmFzKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIGxheWVyLl9hcHBseVRyYW5zZm9ybSh0aGlzLCBjb250ZXh0LCB0b3ApO1xuICAgICAgICAgICAgdGhpcy5fZHJhd0NhY2hlZFNjZW5lQ2FudmFzKGNvbnRleHQpO1xuICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRyYXdGdW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgaWYgKHRoaXMuX3VzZUJ1ZmZlckNhbnZhcyhjYWNoaW5nKSAmJiAhc2tpcEJ1ZmZlcikge1xuICAgICAgICAgICAgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCk7XG4gICAgICAgICAgICBidWZmZXJDYW52YXMgPSBzdGFnZS5idWZmZXJDYW52YXM7XG4gICAgICAgICAgICBidWZmZXJDb250ZXh0ID0gYnVmZmVyQ2FudmFzLmdldENvbnRleHQoKTtcbiAgICAgICAgICAgIGJ1ZmZlckNvbnRleHQuY2xlYXIoKTtcbiAgICAgICAgICAgIGJ1ZmZlckNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgYnVmZmVyQ29udGV4dC5fYXBwbHlMaW5lSm9pbih0aGlzKTtcbiAgICAgICAgICAgIGlmICghY2FjaGluZykge1xuICAgICAgICAgICAgICAgIGlmIChsYXllcikge1xuICAgICAgICAgICAgICAgICAgICBsYXllci5fYXBwbHlUcmFuc2Zvcm0odGhpcywgYnVmZmVyQ29udGV4dCwgdG9wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtID0gdGhpcy5nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApLmdldE1hdHJpeCgpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnRyYW5zZm9ybShtWzBdLCBtWzFdLCBtWzJdLCBtWzNdLCBtWzRdLCBtWzVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkcmF3RnVuYy5jYWxsKHRoaXMsIGJ1ZmZlckNvbnRleHQsIHRoaXMpO1xuICAgICAgICAgICAgYnVmZmVyQ29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgICAgICB2YXIgcmF0aW8gPSBidWZmZXJDYW52YXMucGl4ZWxSYXRpbztcbiAgICAgICAgICAgIGlmIChoYXNTaGFkb3cgJiYgIWNhbnZhcy5oaXRDYW52YXMpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0Ll9hcHBseVNoYWRvdyh0aGlzKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0Ll9hcHBseU9wYWNpdHkodGhpcyk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlHbG9iYWxDb21wb3NpdGVPcGVyYXRpb24odGhpcyk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoYnVmZmVyQ2FudmFzLl9jYW52YXMsIDAsIDAsIGJ1ZmZlckNhbnZhcy53aWR0aCAvIHJhdGlvLCBidWZmZXJDYW52YXMuaGVpZ2h0IC8gcmF0aW8pO1xuICAgICAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlPcGFjaXR5KHRoaXMpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5R2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKHRoaXMpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGJ1ZmZlckNhbnZhcy5fY2FudmFzLCAwLCAwLCBidWZmZXJDYW52YXMud2lkdGggLyByYXRpbywgYnVmZmVyQ2FudmFzLmhlaWdodCAvIHJhdGlvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5TGluZUpvaW4odGhpcyk7XG4gICAgICAgICAgICBpZiAoIWNhY2hpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuX2FwcGx5VHJhbnNmb3JtKHRoaXMsIGNvbnRleHQsIHRvcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbyA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0odG9wKS5nZXRNYXRyaXgoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC50cmFuc2Zvcm0ob1swXSwgb1sxXSwgb1syXSwgb1szXSwgb1s0XSwgb1s1XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhc1NoYWRvdyAmJiBoYXNTdHJva2UgJiYgIWNhbnZhcy5oaXRDYW52YXMpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNhY2hpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlPcGFjaXR5KHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Ll9hcHBseUdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbih0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlTaGFkb3codGhpcyk7XG4gICAgICAgICAgICAgICAgZHJhd0Z1bmMuY2FsbCh0aGlzLCBjb250ZXh0LCB0aGlzKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNGaWxsKCkgJiYgdGhpcy5zaGFkb3dGb3JTdHJva2VFbmFibGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZHJhd0Z1bmMuY2FsbCh0aGlzLCBjb250ZXh0LCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChoYXNTaGFkb3cgJiYgIWNhbnZhcy5oaXRDYW52YXMpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNhY2hpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlPcGFjaXR5KHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Ll9hcHBseUdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbih0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlTaGFkb3codGhpcyk7XG4gICAgICAgICAgICAgICAgZHJhd0Z1bmMuY2FsbCh0aGlzLCBjb250ZXh0LCB0aGlzKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghY2FjaGluZykge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Ll9hcHBseU9wYWNpdHkodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5R2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkcmF3RnVuYy5jYWxsKHRoaXMsIGNvbnRleHQsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFNoYXBlLnByb3RvdHlwZS5kcmF3SGl0ID0gZnVuY3Rpb24gKGNhbiwgdG9wLCBjYWNoaW5nKSB7XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKSwgY2FudmFzID0gY2FuIHx8IGxheWVyLmhpdENhbnZhcywgY29udGV4dCA9IGNhbnZhcyAmJiBjYW52YXMuZ2V0Q29udGV4dCgpLCBkcmF3RnVuYyA9IHRoaXMuaGl0RnVuYygpIHx8IHRoaXMuc2NlbmVGdW5jKCksIGNhY2hlZENhbnZhcyA9IHRoaXMuX2dldENhbnZhc0NhY2hlKCksIGNhY2hlZEhpdENhbnZhcyA9IGNhY2hlZENhbnZhcyAmJiBjYWNoZWRDYW52YXMuaGl0O1xuICAgICAgICBpZiAoIXRoaXMuY29sb3JLZXkpIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ0xvb2tzIGxpa2UgeW91ciBjYW52YXMgaGFzIGEgZGVzdHJveWVkIHNoYXBlIGluIGl0LiBEbyBub3QgcmV1c2Ugc2hhcGUgYWZ0ZXIgeW91IGRlc3Ryb3llZCBpdC4gU2VlIHRoZSBzaGFwZSBpbiBsb2dzIGFib3ZlLiBJZiB5b3Ugd2FudCB0byByZXVzZSBzaGFwZSB5b3Ugc2hvdWxkIGNhbGwgcmVtb3ZlKCkgaW5zdGVhZCBvZiBkZXN0cm95KCknKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc2hvdWxkRHJhd0hpdCgpICYmICFjYWNoaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FjaGVkSGl0Q2FudmFzKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIGxheWVyLl9hcHBseVRyYW5zZm9ybSh0aGlzLCBjb250ZXh0LCB0b3ApO1xuICAgICAgICAgICAgdGhpcy5fZHJhd0NhY2hlZEhpdENhbnZhcyhjb250ZXh0KTtcbiAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkcmF3RnVuYykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNvbnRleHQuX2FwcGx5TGluZUpvaW4odGhpcyk7XG4gICAgICAgIGlmICghY2FjaGluZykge1xuICAgICAgICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXIuX2FwcGx5VHJhbnNmb3JtKHRoaXMsIGNvbnRleHQsIHRvcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbyA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0odG9wKS5nZXRNYXRyaXgoKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnRyYW5zZm9ybShvWzBdLCBvWzFdLCBvWzJdLCBvWzNdLCBvWzRdLCBvWzVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkcmF3RnVuYy5jYWxsKHRoaXMsIGNvbnRleHQsIHRoaXMpO1xuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBTaGFwZS5wcm90b3R5cGUuZHJhd0hpdEZyb21DYWNoZSA9IGZ1bmN0aW9uIChhbHBoYVRocmVzaG9sZCkge1xuICAgICAgICB2YXIgdGhyZXNob2xkID0gYWxwaGFUaHJlc2hvbGQgfHwgMCwgY2FjaGVkQ2FudmFzID0gdGhpcy5fZ2V0Q2FudmFzQ2FjaGUoKSwgc2NlbmVDYW52YXMgPSB0aGlzLl9nZXRDYWNoZWRTY2VuZUNhbnZhcygpLCBoaXRDYW52YXMgPSBjYWNoZWRDYW52YXMuaGl0LCBoaXRDb250ZXh0ID0gaGl0Q2FudmFzLmdldENvbnRleHQoKSwgaGl0V2lkdGggPSBoaXRDYW52YXMuZ2V0V2lkdGgoKSwgaGl0SGVpZ2h0ID0gaGl0Q2FudmFzLmdldEhlaWdodCgpLCBoaXRJbWFnZURhdGEsIGhpdERhdGEsIGxlbiwgcmdiQ29sb3JLZXksIGksIGFscGhhO1xuICAgICAgICBoaXRDb250ZXh0LmNsZWFyKCk7XG4gICAgICAgIGhpdENvbnRleHQuZHJhd0ltYWdlKHNjZW5lQ2FudmFzLl9jYW52YXMsIDAsIDAsIGhpdFdpZHRoLCBoaXRIZWlnaHQpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaGl0SW1hZ2VEYXRhID0gaGl0Q29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgaGl0V2lkdGgsIGhpdEhlaWdodCk7XG4gICAgICAgICAgICBoaXREYXRhID0gaGl0SW1hZ2VEYXRhLmRhdGE7XG4gICAgICAgICAgICBsZW4gPSBoaXREYXRhLmxlbmd0aDtcbiAgICAgICAgICAgIHJnYkNvbG9yS2V5ID0gVXRpbF8xLlV0aWwuX2hleFRvUmdiKHRoaXMuY29sb3JLZXkpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgICAgICAgICAgICAgYWxwaGEgPSBoaXREYXRhW2kgKyAzXTtcbiAgICAgICAgICAgICAgICBpZiAoYWxwaGEgPiB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaGl0RGF0YVtpXSA9IHJnYkNvbG9yS2V5LnI7XG4gICAgICAgICAgICAgICAgICAgIGhpdERhdGFbaSArIDFdID0gcmdiQ29sb3JLZXkuZztcbiAgICAgICAgICAgICAgICAgICAgaGl0RGF0YVtpICsgMl0gPSByZ2JDb2xvcktleS5iO1xuICAgICAgICAgICAgICAgICAgICBoaXREYXRhW2kgKyAzXSA9IDI1NTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhpdERhdGFbaSArIDNdID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoaXRDb250ZXh0LnB1dEltYWdlRGF0YShoaXRJbWFnZURhdGEsIDAsIDApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC5lcnJvcignVW5hYmxlIHRvIGRyYXcgaGl0IGdyYXBoIGZyb20gY2FjaGVkIHNjZW5lIGNhbnZhcy4gJyArIGUubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gU2hhcGU7XG59KE5vZGVfMS5Ob2RlKSk7XG5leHBvcnRzLlNoYXBlID0gU2hhcGU7XG5TaGFwZS5wcm90b3R5cGUuX2ZpbGxGdW5jID0gX2ZpbGxGdW5jO1xuU2hhcGUucHJvdG90eXBlLl9zdHJva2VGdW5jID0gX3N0cm9rZUZ1bmM7XG5TaGFwZS5wcm90b3R5cGUuX2ZpbGxGdW5jSGl0ID0gX2ZpbGxGdW5jSGl0O1xuU2hhcGUucHJvdG90eXBlLl9zdHJva2VGdW5jSGl0ID0gX3N0cm9rZUZ1bmNIaXQ7XG5TaGFwZS5wcm90b3R5cGUuX2NlbnRyb2lkID0gZmFsc2U7XG5TaGFwZS5wcm90b3R5cGUubm9kZVR5cGUgPSAnU2hhcGUnO1xuR2xvYmFsXzEuX3JlZ2lzdGVyTm9kZShTaGFwZSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2UnLCB1bmRlZmluZWQsIFZhbGlkYXRvcnNfMS5nZXRTdHJpbmdWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VXaWR0aCcsIDIsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdoaXRTdHJva2VXaWR0aCcsICdhdXRvJywgVmFsaWRhdG9yc18xLmdldE51bWJlck9yQXV0b1ZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZUhpdEVuYWJsZWQnLCB0cnVlLCBWYWxpZGF0b3JzXzEuZ2V0Qm9vbGVhblZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3BlcmZlY3REcmF3RW5hYmxlZCcsIHRydWUsIFZhbGlkYXRvcnNfMS5nZXRCb29sZWFuVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc2hhZG93Rm9yU3Ryb2tlRW5hYmxlZCcsIHRydWUsIFZhbGlkYXRvcnNfMS5nZXRCb29sZWFuVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnbGluZUpvaW4nKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2xpbmVDYXAnKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3NjZW5lRnVuYycpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnaGl0RnVuYycpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZGFzaCcpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZGFzaE9mZnNldCcsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzaGFkb3dDb2xvcicsIHVuZGVmaW5lZCwgVmFsaWRhdG9yc18xLmdldFN0cmluZ1ZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3NoYWRvd0JsdXInLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc2hhZG93T3BhY2l0eScsIDEsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKFNoYXBlLCAnc2hhZG93T2Zmc2V0JywgWyd4JywgJ3knXSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzaGFkb3dPZmZzZXRYJywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3NoYWRvd09mZnNldFknLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5JbWFnZScpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbCcsIHVuZGVmaW5lZCwgVmFsaWRhdG9yc18xLmdldFN0cmluZ1ZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuWCcsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVyblknLCAwLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbExpbmVhckdyYWRpZW50Q29sb3JTdG9wcycpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlTGluZWFyR3JhZGllbnRDb2xvclN0b3BzJyk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUmFkaWFsR3JhZGllbnRTdGFydFJhZGl1cycsIDApO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFJhZGlhbEdyYWRpZW50RW5kUmFkaXVzJywgMCk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUmFkaWFsR3JhZGllbnRDb2xvclN0b3BzJyk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVyblJlcGVhdCcsICdyZXBlYXQnKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxFbmFibGVkJywgdHJ1ZSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VFbmFibGVkJywgdHJ1ZSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzaGFkb3dFbmFibGVkJywgdHJ1ZSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdkYXNoRW5hYmxlZCcsIHRydWUpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlU2NhbGVFbmFibGVkJywgdHJ1ZSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUHJpb3JpdHknLCAnY29sb3InKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVybk9mZnNldCcsIFsneCcsICd5J10pO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5PZmZzZXRYJywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuT2Zmc2V0WScsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5TY2FsZScsIFsneCcsICd5J10pO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5TY2FsZVgnLCAxLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5TY2FsZVknLCAxLCBWYWxpZGF0b3JzXzEuZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnQnLCBbXG4gICAgJ3gnLFxuICAgICd5J1xuXSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlTGluZWFyR3JhZGllbnRTdGFydFBvaW50JywgW1xuICAgICd4JyxcbiAgICAneSdcbl0pO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbExpbmVhckdyYWRpZW50U3RhcnRQb2ludFgnLCAwKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZUxpbmVhckdyYWRpZW50U3RhcnRQb2ludFgnLCAwKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnRZJywgMCk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnRZJywgMCk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbExpbmVhckdyYWRpZW50RW5kUG9pbnQnLCBbXG4gICAgJ3gnLFxuICAgICd5J1xuXSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlTGluZWFyR3JhZGllbnRFbmRQb2ludCcsIFtcbiAgICAneCcsXG4gICAgJ3knXG5dKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxMaW5lYXJHcmFkaWVudEVuZFBvaW50WCcsIDApO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlTGluZWFyR3JhZGllbnRFbmRQb2ludFgnLCAwKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxMaW5lYXJHcmFkaWVudEVuZFBvaW50WScsIDApO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlTGluZWFyR3JhZGllbnRFbmRQb2ludFknLCAwKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUmFkaWFsR3JhZGllbnRTdGFydFBvaW50JywgW1xuICAgICd4JyxcbiAgICAneSdcbl0pO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRQb2ludFgnLCAwKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UG9pbnRZJywgMCk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFJhZGlhbEdyYWRpZW50RW5kUG9pbnQnLCBbXG4gICAgJ3gnLFxuICAgICd5J1xuXSk7XG5GYWN0b3J5XzEuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUmFkaWFsR3JhZGllbnRFbmRQb2ludFgnLCAwKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudEVuZFBvaW50WScsIDApO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5Sb3RhdGlvbicsIDApO1xuRmFjdG9yeV8xLkZhY3RvcnkuYmFja0NvbXBhdChTaGFwZSwge1xuICAgIGRhc2hBcnJheTogJ2Rhc2gnLFxuICAgIGdldERhc2hBcnJheTogJ2dldERhc2gnLFxuICAgIHNldERhc2hBcnJheTogJ2dldERhc2gnLFxuICAgIGRyYXdGdW5jOiAnc2NlbmVGdW5jJyxcbiAgICBnZXREcmF3RnVuYzogJ2dldFNjZW5lRnVuYycsXG4gICAgc2V0RHJhd0Z1bmM6ICdzZXRTY2VuZUZ1bmMnLFxuICAgIGRyYXdIaXRGdW5jOiAnaGl0RnVuYycsXG4gICAgZ2V0RHJhd0hpdEZ1bmM6ICdnZXRIaXRGdW5jJyxcbiAgICBzZXREcmF3SGl0RnVuYzogJ3NldEhpdEZ1bmMnXG59KTtcblV0aWxfMS5Db2xsZWN0aW9uLm1hcE1ldGhvZHMoU2hhcGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBVdGlsXzEgPSByZXF1aXJlKFwiLi9VdGlsXCIpO1xudmFyIEZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuL0ZhY3RvcnlcIik7XG52YXIgQ29udGFpbmVyXzEgPSByZXF1aXJlKFwiLi9Db250YWluZXJcIik7XG52YXIgR2xvYmFsXzEgPSByZXF1aXJlKFwiLi9HbG9iYWxcIik7XG52YXIgQ2FudmFzXzEgPSByZXF1aXJlKFwiLi9DYW52YXNcIik7XG52YXIgRHJhZ0FuZERyb3BfMSA9IHJlcXVpcmUoXCIuL0RyYWdBbmREcm9wXCIpO1xudmFyIEdsb2JhbF8yID0gcmVxdWlyZShcIi4vR2xvYmFsXCIpO1xudmFyIFNUQUdFID0gJ1N0YWdlJywgU1RSSU5HID0gJ3N0cmluZycsIFBYID0gJ3B4JywgTU9VU0VPVVQgPSAnbW91c2VvdXQnLCBNT1VTRUxFQVZFID0gJ21vdXNlbGVhdmUnLCBNT1VTRU9WRVIgPSAnbW91c2VvdmVyJywgTU9VU0VFTlRFUiA9ICdtb3VzZWVudGVyJywgTU9VU0VNT1ZFID0gJ21vdXNlbW92ZScsIE1PVVNFRE9XTiA9ICdtb3VzZWRvd24nLCBNT1VTRVVQID0gJ21vdXNldXAnLCBDT05URVhUTUVOVSA9ICdjb250ZXh0bWVudScsIENMSUNLID0gJ2NsaWNrJywgREJMX0NMSUNLID0gJ2RibGNsaWNrJywgVE9VQ0hTVEFSVCA9ICd0b3VjaHN0YXJ0JywgVE9VQ0hFTkQgPSAndG91Y2hlbmQnLCBUQVAgPSAndGFwJywgREJMX1RBUCA9ICdkYmx0YXAnLCBUT1VDSE1PVkUgPSAndG91Y2htb3ZlJywgV0hFRUwgPSAnd2hlZWwnLCBDT05URU5UX01PVVNFT1VUID0gJ2NvbnRlbnRNb3VzZW91dCcsIENPTlRFTlRfTU9VU0VPVkVSID0gJ2NvbnRlbnRNb3VzZW92ZXInLCBDT05URU5UX01PVVNFTU9WRSA9ICdjb250ZW50TW91c2Vtb3ZlJywgQ09OVEVOVF9NT1VTRURPV04gPSAnY29udGVudE1vdXNlZG93bicsIENPTlRFTlRfTU9VU0VVUCA9ICdjb250ZW50TW91c2V1cCcsIENPTlRFTlRfQ09OVEVYVE1FTlUgPSAnY29udGVudENvbnRleHRtZW51JywgQ09OVEVOVF9DTElDSyA9ICdjb250ZW50Q2xpY2snLCBDT05URU5UX0RCTF9DTElDSyA9ICdjb250ZW50RGJsY2xpY2snLCBDT05URU5UX1RPVUNIU1RBUlQgPSAnY29udGVudFRvdWNoc3RhcnQnLCBDT05URU5UX1RPVUNIRU5EID0gJ2NvbnRlbnRUb3VjaGVuZCcsIENPTlRFTlRfREJMX1RBUCA9ICdjb250ZW50RGJsdGFwJywgQ09OVEVOVF9UQVAgPSAnY29udGVudFRhcCcsIENPTlRFTlRfVE9VQ0hNT1ZFID0gJ2NvbnRlbnRUb3VjaG1vdmUnLCBDT05URU5UX1dIRUVMID0gJ2NvbnRlbnRXaGVlbCcsIFJFTEFUSVZFID0gJ3JlbGF0aXZlJywgS09OVkFfQ09OVEVOVCA9ICdrb252YWpzLWNvbnRlbnQnLCBTUEFDRSA9ICcgJywgVU5ERVJTQ09SRSA9ICdfJywgQ09OVEFJTkVSID0gJ2NvbnRhaW5lcicsIE1BWF9MQVlFUlNfTlVNQkVSID0gNSwgRU1QVFlfU1RSSU5HID0gJycsIEVWRU5UUyA9IFtcbiAgICBNT1VTRUVOVEVSLFxuICAgIE1PVVNFRE9XTixcbiAgICBNT1VTRU1PVkUsXG4gICAgTU9VU0VVUCxcbiAgICBNT1VTRU9VVCxcbiAgICBUT1VDSFNUQVJULFxuICAgIFRPVUNITU9WRSxcbiAgICBUT1VDSEVORCxcbiAgICBNT1VTRU9WRVIsXG4gICAgV0hFRUwsXG4gICAgQ09OVEVYVE1FTlVcbl0sIGV2ZW50c0xlbmd0aCA9IEVWRU5UUy5sZW5ndGg7XG5mdW5jdGlvbiBhZGRFdmVudChjdHgsIGV2ZW50TmFtZSkge1xuICAgIGN0eC5jb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGN0eFtVTkRFUlNDT1JFICsgZXZlbnROYW1lXShldnQpO1xuICAgIH0sIGZhbHNlKTtcbn1cbnZhciBOT19QT0lOVEVSU19NRVNTQUdFID0gXCJQb2ludGVyIHBvc2l0aW9uIGlzIG1pc3NpbmcgYW5kIG5vdCByZWdpc3RlcmVkIGJ5IHRoZSBzdGFnZS4gTG9va3MgbGlrZSBpdCBpcyBvdXRzaWRlIG9mIHRoZSBzdGFnZSBjb250YWluZXIuIFlvdSBjYW4gc2V0IGl0IG1hbnVhbGx5IGZyb20gZXZlbnQ6IHN0YWdlLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2ZW50KTtcIjtcbmV4cG9ydHMuc3RhZ2VzID0gW107XG5mdW5jdGlvbiBjaGVja05vQ2xpcChhdHRycykge1xuICAgIGlmIChhdHRycyA9PT0gdm9pZCAwKSB7IGF0dHJzID0ge307IH1cbiAgICBpZiAoYXR0cnMuY2xpcEZ1bmMgfHwgYXR0cnMuY2xpcFdpZHRoIHx8IGF0dHJzLmNsaXBIZWlnaHQpIHtcbiAgICAgICAgVXRpbF8xLlV0aWwud2FybignU3RhZ2UgZG9lcyBub3Qgc3VwcG9ydCBjbGlwcGluZy4gUGxlYXNlIHVzZSBjbGlwIGZvciBMYXllcnMgb3IgR3JvdXBzLicpO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG59XG52YXIgU3RhZ2UgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdGFnZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdGFnZShjb25maWcpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY2hlY2tOb0NsaXAoY29uZmlnKSkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuX2J1aWxkRE9NKCk7XG4gICAgICAgIF90aGlzLl9iaW5kQ29udGVudEV2ZW50cygpO1xuICAgICAgICBleHBvcnRzLnN0YWdlcy5wdXNoKF90aGlzKTtcbiAgICAgICAgX3RoaXMub24oJ3dpZHRoQ2hhbmdlLmtvbnZhIGhlaWdodENoYW5nZS5rb252YScsIF90aGlzLl9yZXNpemVET00pO1xuICAgICAgICBfdGhpcy5vbigndmlzaWJsZUNoYW5nZS5rb252YScsIF90aGlzLl9jaGVja1Zpc2liaWxpdHkpO1xuICAgICAgICBfdGhpcy5vbignY2xpcFdpZHRoQ2hhbmdlLmtvbnZhIGNsaXBIZWlnaHRDaGFuZ2Uua29udmEgY2xpcEZ1bmNDaGFuZ2Uua29udmEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGVja05vQ2xpcChfdGhpcy5hdHRycyk7XG4gICAgICAgIH0pO1xuICAgICAgICBfdGhpcy5fY2hlY2tWaXNpYmlsaXR5KCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU3RhZ2UucHJvdG90eXBlLl92YWxpZGF0ZUFkZCA9IGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICB2YXIgaXNMYXllciA9IGNoaWxkLmdldFR5cGUoKSA9PT0gJ0xheWVyJztcbiAgICAgICAgdmFyIGlzRmFzdExheWVyID0gY2hpbGQuZ2V0VHlwZSgpID09PSAnRmFzdExheWVyJztcbiAgICAgICAgdmFyIHZhbGlkID0gaXNMYXllciB8fCBpc0Zhc3RMYXllcjtcbiAgICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICAgICAgVXRpbF8xLlV0aWwudGhyb3coJ1lvdSBtYXkgb25seSBhZGQgbGF5ZXJzIHRvIHRoZSBzdGFnZS4nKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl9jaGVja1Zpc2liaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IHRoaXMudmlzaWJsZSgpID8gJycgOiAnbm9uZSc7XG4gICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5kaXNwbGF5ID0gc3R5bGU7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuc2V0Q29udGFpbmVyID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgICAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gU1RSSU5HKSB7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLmNoYXJBdCgwKSA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9IGNvbnRhaW5lci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSlbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgaWQ7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5jaGFyQXQoMCkgIT09ICcjJykge1xuICAgICAgICAgICAgICAgICAgICBpZCA9IGNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlkID0gY29udGFpbmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHRocm93ICdDYW4gbm90IGZpbmQgY29udGFpbmVyIGluIGRvY3VtZW50IHdpdGggaWQgJyArIGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NldEF0dHIoQ09OVEFJTkVSLCBjb250YWluZXIpO1xuICAgICAgICBpZiAodGhpcy5jb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuc2hvdWxkRHJhd0hpdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsYXllcnMgPSB0aGlzLmNoaWxkcmVuLCBsZW4gPSBsYXllcnMubGVuZ3RoLCBuO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIGxheWVyc1tuXS5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgb2JqID0ge307XG4gICAgICAgIH1cbiAgICAgICAgb2JqLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICByZXR1cm4gQ29udGFpbmVyXzEuQ29udGFpbmVyLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIG9iaik7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XG4gICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5jb250ZW50O1xuICAgICAgICBpZiAoY29udGVudCAmJiBVdGlsXzEuVXRpbC5faXNJbkRvY3VtZW50KGNvbnRlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lcigpLnJlbW92ZUNoaWxkKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IGV4cG9ydHMuc3RhZ2VzLmluZGV4T2YodGhpcyk7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBleHBvcnRzLnN0YWdlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLmdldFBvaW50ZXJQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBvaW50ZXJQb3MpIHtcbiAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oTk9fUE9JTlRFUlNfTUVTU0FHRSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRlclBvcztcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5nZXRTdGFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuZ2V0Q29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudDtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fdG9Lb252YUNhbnZhcyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgICB2YXIgeCA9IGNvbmZpZy54IHx8IDAsIHkgPSBjb25maWcueSB8fCAwLCBjYW52YXMgPSBuZXcgQ2FudmFzXzEuU2NlbmVDYW52YXMoe1xuICAgICAgICAgICAgd2lkdGg6IGNvbmZpZy53aWR0aCB8fCB0aGlzLndpZHRoKCksXG4gICAgICAgICAgICBoZWlnaHQ6IGNvbmZpZy5oZWlnaHQgfHwgdGhpcy5oZWlnaHQoKSxcbiAgICAgICAgICAgIHBpeGVsUmF0aW86IGNvbmZpZy5waXhlbFJhdGlvIHx8IDFcbiAgICAgICAgfSksIF9jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoKS5fY29udGV4dCwgbGF5ZXJzID0gdGhpcy5jaGlsZHJlbjtcbiAgICAgICAgaWYgKHggfHwgeSkge1xuICAgICAgICAgICAgX2NvbnRleHQudHJhbnNsYXRlKC0xICogeCwgLTEgKiB5KTtcbiAgICAgICAgfVxuICAgICAgICBsYXllcnMuZWFjaChmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgICAgIGlmICghbGF5ZXIuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbGF5ZXJDYW52YXMgPSBsYXllci5fdG9Lb252YUNhbnZhcyhjb25maWcpO1xuICAgICAgICAgICAgX2NvbnRleHQuZHJhd0ltYWdlKGxheWVyQ2FudmFzLl9jYW52YXMsIHgsIHksIGxheWVyQ2FudmFzLmdldFdpZHRoKCkgLyBsYXllckNhbnZhcy5nZXRQaXhlbFJhdGlvKCksIGxheWVyQ2FudmFzLmdldEhlaWdodCgpIC8gbGF5ZXJDYW52YXMuZ2V0UGl4ZWxSYXRpbygpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjYW52YXM7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuZ2V0SW50ZXJzZWN0aW9uID0gZnVuY3Rpb24gKHBvcywgc2VsZWN0b3IpIHtcbiAgICAgICAgdmFyIGxheWVycyA9IHRoaXMuY2hpbGRyZW4sIGxlbiA9IGxheWVycy5sZW5ndGgsIGVuZCA9IGxlbiAtIDEsIG4sIHNoYXBlO1xuICAgICAgICBmb3IgKG4gPSBlbmQ7IG4gPj0gMDsgbi0tKSB7XG4gICAgICAgICAgICBzaGFwZSA9IGxheWVyc1tuXS5nZXRJbnRlcnNlY3Rpb24ocG9zLCBzZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAoc2hhcGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hhcGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX3Jlc2l6ZURPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gdGhpcy53aWR0aCgpLCBoZWlnaHQgPSB0aGlzLmhlaWdodCgpLCBsYXllcnMgPSB0aGlzLmdldENoaWxkcmVuKCksIGxlbiA9IGxheWVycy5sZW5ndGgsIG4sIGxheWVyO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLndpZHRoID0gd2lkdGggKyBQWDtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBQWDtcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyQ2FudmFzLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlckhpdENhbnZhcy5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXIgPSBsYXllcnNbbl07XG4gICAgICAgICAgICAgICAgbGF5ZXIuc2V0U2l6ZSh7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfSk7XG4gICAgICAgICAgICAgICAgbGF5ZXIuZHJhdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChhcmd1bWVudHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLCBsYXllcik7XG4gICAgICAgIHZhciBsZW5ndGggPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbmd0aCA+IE1BWF9MQVlFUlNfTlVNQkVSKSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKCdUaGUgc3RhZ2UgaGFzICcgK1xuICAgICAgICAgICAgICAgIGxlbmd0aCArXG4gICAgICAgICAgICAgICAgJyBsYXllcnMuIFJlY29tbWVuZGVkIG1heGltaW4gbnVtYmVyIG9mIGxheWVycyBpcyAzLTUuIEFkZGluZyBtb3JlIGxheWVycyBpbnRvIHRoZSBzdGFnZSBtYXkgZHJvcCB0aGUgcGVyZm9ybWFuY2UuIFJldGhpbmsgeW91ciB0cmVlIHN0cnVjdHVyZSwgeW91IGNhbiB1c2UgS29udmEuR3JvdXAuJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGF5ZXIuX3NldENhbnZhc1NpemUodGhpcy53aWR0aCgpLCB0aGlzLmhlaWdodCgpKTtcbiAgICAgICAgbGF5ZXIuZHJhdygpO1xuICAgICAgICBpZiAoR2xvYmFsXzEuS29udmEuaXNCcm93c2VyKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobGF5ZXIuY2FudmFzLl9jYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLmdldFBhcmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuZ2V0TGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLmdldExheWVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2hpbGRyZW4oKTtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fYmluZENvbnRlbnRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghR2xvYmFsXzEuS29udmEuaXNCcm93c2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBldmVudHNMZW5ndGg7IG4rKykge1xuICAgICAgICAgICAgYWRkRXZlbnQodGhpcywgRVZFTlRTW25dKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl9tb3VzZWVudGVyID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIHRoaXMuX2ZpcmUoTU9VU0VFTlRFUiwgeyBldnQ6IGV2dCwgdGFyZ2V0OiB0aGlzLCBjdXJyZW50VGFyZ2V0OiB0aGlzIH0pO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl9tb3VzZW92ZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgdGhpcy5fZmlyZShDT05URU5UX01PVVNFT1ZFUiwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgdGhpcy5fZmlyZShNT1VTRU9WRVIsIHsgZXZ0OiBldnQsIHRhcmdldDogdGhpcywgY3VycmVudFRhcmdldDogdGhpcyB9KTtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fbW91c2VvdXQgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgdmFyIHRhcmdldFNoYXBlID0gdGhpcy50YXJnZXRTaGFwZTtcbiAgICAgICAgaWYgKHRhcmdldFNoYXBlICYmICFEcmFnQW5kRHJvcF8xLkRELmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRhcmdldFNoYXBlLl9maXJlQW5kQnViYmxlKE1PVVNFT1VULCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgdGFyZ2V0U2hhcGUuX2ZpcmVBbmRCdWJibGUoTU9VU0VMRUFWRSwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0U2hhcGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFEcmFnQW5kRHJvcF8xLkRELmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoTU9VU0VMRUFWRSwge1xuICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoTU9VU0VPVVQsIHtcbiAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb2ludGVyUG9zID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9maXJlKENPTlRFTlRfTU9VU0VPVVQsIHsgZXZ0OiBldnQgfSk7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX21vdXNlbW92ZSA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgaWYgKEdsb2JhbF8xLktvbnZhLlVBLmllTW9iaWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdG91Y2htb3ZlKGV2dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICB2YXIgc2hhcGU7XG4gICAgICAgIGlmICghRHJhZ0FuZERyb3BfMS5ERC5pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICBzaGFwZSA9IHRoaXMuZ2V0SW50ZXJzZWN0aW9uKHRoaXMuZ2V0UG9pbnRlclBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgaWYgKHNoYXBlICYmIHNoYXBlLmlzTGlzdGVuaW5nKCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGlmZmVyZW50VGFyZ2V0ID0gIXRoaXMudGFyZ2V0U2hhcGUgfHwgdGhpcy50YXJnZXRTaGFwZSAhPT0gc2hhcGU7XG4gICAgICAgICAgICAgICAgaWYgKCFEcmFnQW5kRHJvcF8xLkRELmlzRHJhZ2dpbmcgJiYgZGlmZmVyZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldFNoYXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldFNoYXBlLl9maXJlQW5kQnViYmxlKE1PVVNFT1VULCB7IGV2dDogZXZ0IH0sIHNoYXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0U2hhcGUuX2ZpcmVBbmRCdWJibGUoTU9VU0VMRUFWRSwgeyBldnQ6IGV2dCB9LCBzaGFwZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoTU9VU0VPVkVSLCB7IGV2dDogZXZ0IH0sIHRoaXMudGFyZ2V0U2hhcGUpO1xuICAgICAgICAgICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShNT1VTRUVOVEVSLCB7IGV2dDogZXZ0IH0sIHRoaXMudGFyZ2V0U2hhcGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldFNoYXBlID0gc2hhcGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShNT1VTRU1PVkUsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0U2hhcGUgJiYgIURyYWdBbmREcm9wXzEuREQuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldFNoYXBlLl9maXJlQW5kQnViYmxlKE1PVVNFT1VULCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldFNoYXBlLl9maXJlQW5kQnViYmxlKE1PVVNFTEVBVkUsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUoTU9VU0VPVkVSLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXNcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0U2hhcGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlKE1PVVNFTU9WRSwge1xuICAgICAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9maXJlKENPTlRFTlRfTU9VU0VNT1ZFLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldnQuY2FuY2VsYWJsZSkge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fbW91c2Vkb3duID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBpZiAoR2xvYmFsXzEuS29udmEuVUEuaWVNb2JpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90b3VjaHN0YXJ0KGV2dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICB2YXIgc2hhcGUgPSB0aGlzLmdldEludGVyc2VjdGlvbih0aGlzLmdldFBvaW50ZXJQb3NpdGlvbigpKTtcbiAgICAgICAgR2xvYmFsXzEuS29udmEubGlzdGVuQ2xpY2tUYXAgPSB0cnVlO1xuICAgICAgICBpZiAoc2hhcGUgJiYgc2hhcGUuaXNMaXN0ZW5pbmcoKSkge1xuICAgICAgICAgICAgdGhpcy5jbGlja1N0YXJ0U2hhcGUgPSBzaGFwZTtcbiAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKE1PVVNFRE9XTiwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoTU9VU0VET1dOLCB7XG4gICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpcmUoQ09OVEVOVF9NT1VTRURPV04sIHsgZXZ0OiBldnQgfSk7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX21vdXNldXAgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGlmIChHbG9iYWxfMS5Lb252YS5VQS5pZU1vYmlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RvdWNoZW5kKGV2dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICB2YXIgc2hhcGUgPSB0aGlzLmdldEludGVyc2VjdGlvbih0aGlzLmdldFBvaW50ZXJQb3NpdGlvbigpKSwgY2xpY2tTdGFydFNoYXBlID0gdGhpcy5jbGlja1N0YXJ0U2hhcGUsIGNsaWNrRW5kU2hhcGUgPSB0aGlzLmNsaWNrRW5kU2hhcGUsIGZpcmVEYmxDbGljayA9IGZhbHNlO1xuICAgICAgICBpZiAoR2xvYmFsXzEuS29udmEuaW5EYmxDbGlja1dpbmRvdykge1xuICAgICAgICAgICAgZmlyZURibENsaWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRibFRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFEcmFnQW5kRHJvcF8xLkRELmp1c3REcmFnZ2VkKSB7XG4gICAgICAgICAgICBHbG9iYWxfMS5Lb252YS5pbkRibENsaWNrV2luZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRibFRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKERyYWdBbmREcm9wXzEuREQpIHtcbiAgICAgICAgICAgIERyYWdBbmREcm9wXzEuREQuanVzdERyYWdnZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRibFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEdsb2JhbF8xLktvbnZhLmluRGJsQ2xpY2tXaW5kb3cgPSBmYWxzZTtcbiAgICAgICAgfSwgR2xvYmFsXzEuS29udmEuZGJsQ2xpY2tXaW5kb3cpO1xuICAgICAgICBpZiAoc2hhcGUgJiYgc2hhcGUuaXNMaXN0ZW5pbmcoKSkge1xuICAgICAgICAgICAgdGhpcy5jbGlja0VuZFNoYXBlID0gc2hhcGU7XG4gICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShNT1VTRVVQLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgaWYgKEdsb2JhbF8xLktvbnZhLmxpc3RlbkNsaWNrVGFwICYmXG4gICAgICAgICAgICAgICAgY2xpY2tTdGFydFNoYXBlICYmXG4gICAgICAgICAgICAgICAgY2xpY2tTdGFydFNoYXBlLl9pZCA9PT0gc2hhcGUuX2lkKSB7XG4gICAgICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoQ0xJQ0ssIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGZpcmVEYmxDbGljayAmJiBjbGlja0VuZFNoYXBlICYmIGNsaWNrRW5kU2hhcGUuX2lkID09PSBzaGFwZS5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoREJMX0NMSUNLLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoTU9VU0VVUCwgeyBldnQ6IGV2dCwgdGFyZ2V0OiB0aGlzLCBjdXJyZW50VGFyZ2V0OiB0aGlzIH0pO1xuICAgICAgICAgICAgaWYgKEdsb2JhbF8xLktvbnZhLmxpc3RlbkNsaWNrVGFwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZShDTElDSywgeyBldnQ6IGV2dCwgdGFyZ2V0OiB0aGlzLCBjdXJyZW50VGFyZ2V0OiB0aGlzIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpcmVEYmxDbGljaykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUoREJMX0NMSUNLLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9maXJlKENPTlRFTlRfTU9VU0VVUCwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgaWYgKEdsb2JhbF8xLktvbnZhLmxpc3RlbkNsaWNrVGFwKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKENPTlRFTlRfQ0xJQ0ssIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICBpZiAoZmlyZURibENsaWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZShDT05URU5UX0RCTF9DTElDSywgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBHbG9iYWxfMS5Lb252YS5saXN0ZW5DbGlja1RhcCA9IGZhbHNlO1xuICAgICAgICBpZiAoZXZ0LmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX2NvbnRleHRtZW51ID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIHZhciBzaGFwZSA9IHRoaXMuZ2V0SW50ZXJzZWN0aW9uKHRoaXMuZ2V0UG9pbnRlclBvc2l0aW9uKCkpO1xuICAgICAgICBpZiAoc2hhcGUgJiYgc2hhcGUuaXNMaXN0ZW5pbmcoKSkge1xuICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoQ09OVEVYVE1FTlUsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKENPTlRFWFRNRU5VLCB7XG4gICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpcmUoQ09OVEVOVF9DT05URVhUTUVOVSwgeyBldnQ6IGV2dCB9KTtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fdG91Y2hzdGFydCA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICB2YXIgc2hhcGUgPSB0aGlzLmdldEludGVyc2VjdGlvbih0aGlzLmdldFBvaW50ZXJQb3NpdGlvbigpKTtcbiAgICAgICAgR2xvYmFsXzEuS29udmEubGlzdGVuQ2xpY2tUYXAgPSB0cnVlO1xuICAgICAgICBpZiAoc2hhcGUgJiYgc2hhcGUuaXNMaXN0ZW5pbmcoKSkge1xuICAgICAgICAgICAgdGhpcy50YXBTdGFydFNoYXBlID0gc2hhcGU7XG4gICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShUT1VDSFNUQVJULCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgaWYgKHNoYXBlLmlzTGlzdGVuaW5nKCkgJiYgc2hhcGUucHJldmVudERlZmF1bHQoKSAmJiBldnQuY2FuY2VsYWJsZSkge1xuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZmlyZShUT1VDSFNUQVJULCB7XG4gICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpcmUoQ09OVEVOVF9UT1VDSFNUQVJULCB7IGV2dDogZXZ0IH0pO1xuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl90b3VjaGVuZCA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICB2YXIgc2hhcGUgPSB0aGlzLmdldEludGVyc2VjdGlvbih0aGlzLmdldFBvaW50ZXJQb3NpdGlvbigpKSwgZmlyZURibENsaWNrID0gZmFsc2U7XG4gICAgICAgIGlmIChHbG9iYWxfMS5Lb252YS5pbkRibENsaWNrV2luZG93KSB7XG4gICAgICAgICAgICBmaXJlRGJsQ2xpY2sgPSB0cnVlO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZGJsVGltZW91dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBHbG9iYWxfMS5Lb252YS5pbkRibENsaWNrV2luZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRibFRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGJsVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgR2xvYmFsXzEuS29udmEuaW5EYmxDbGlja1dpbmRvdyA9IGZhbHNlO1xuICAgICAgICB9LCBHbG9iYWxfMS5Lb252YS5kYmxDbGlja1dpbmRvdyk7XG4gICAgICAgIGlmIChzaGFwZSAmJiBzaGFwZS5pc0xpc3RlbmluZygpKSB7XG4gICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShUT1VDSEVORCwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgIGlmIChHbG9iYWxfMS5Lb252YS5saXN0ZW5DbGlja1RhcCAmJlxuICAgICAgICAgICAgICAgIHRoaXMudGFwU3RhcnRTaGFwZSAmJlxuICAgICAgICAgICAgICAgIHNoYXBlLl9pZCA9PT0gdGhpcy50YXBTdGFydFNoYXBlLl9pZCkge1xuICAgICAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKFRBUCwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgICAgICBpZiAoZmlyZURibENsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKERCTF9UQVAsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNoYXBlLmlzTGlzdGVuaW5nKCkgJiYgc2hhcGUucHJldmVudERlZmF1bHQoKSAmJiBldnQuY2FuY2VsYWJsZSkge1xuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZmlyZShUT1VDSEVORCwgeyBldnQ6IGV2dCwgdGFyZ2V0OiB0aGlzLCBjdXJyZW50VGFyZ2V0OiB0aGlzIH0pO1xuICAgICAgICAgICAgaWYgKEdsb2JhbF8xLktvbnZhLmxpc3RlbkNsaWNrVGFwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyZShUQVAsIHsgZXZ0OiBldnQsIHRhcmdldDogdGhpcywgY3VycmVudFRhcmdldDogdGhpcyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJlRGJsQ2xpY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlKERCTF9UQVAsIHtcbiAgICAgICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpcmUoQ09OVEVOVF9UT1VDSEVORCwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgaWYgKEdsb2JhbF8xLktvbnZhLmxpc3RlbkNsaWNrVGFwKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKENPTlRFTlRfVEFQLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgaWYgKGZpcmVEYmxDbGljaykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUoQ09OVEVOVF9EQkxfVEFQLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIEdsb2JhbF8xLktvbnZhLmxpc3RlbkNsaWNrVGFwID0gZmFsc2U7XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX3RvdWNobW92ZSA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICB2YXIgc2hhcGU7XG4gICAgICAgIGlmICghRHJhZ0FuZERyb3BfMS5ERC5pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICBzaGFwZSA9IHRoaXMuZ2V0SW50ZXJzZWN0aW9uKHRoaXMuZ2V0UG9pbnRlclBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgaWYgKHNoYXBlICYmIHNoYXBlLmlzTGlzdGVuaW5nKCkpIHtcbiAgICAgICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShUT1VDSE1PVkUsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHNoYXBlLmlzTGlzdGVuaW5nKCkgJiYgc2hhcGUucHJldmVudERlZmF1bHQoKSAmJiBldnQuY2FuY2VsYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlKFRPVUNITU9WRSwge1xuICAgICAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9maXJlKENPTlRFTlRfVE9VQ0hNT1ZFLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChEcmFnQW5kRHJvcF8xLkRELmlzRHJhZ2dpbmcgJiYgRHJhZ0FuZERyb3BfMS5ERC5ub2RlLnByZXZlbnREZWZhdWx0KCkgJiYgZXZ0LmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX3doZWVsID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIHZhciBzaGFwZSA9IHRoaXMuZ2V0SW50ZXJzZWN0aW9uKHRoaXMuZ2V0UG9pbnRlclBvc2l0aW9uKCkpO1xuICAgICAgICBpZiAoc2hhcGUgJiYgc2hhcGUuaXNMaXN0ZW5pbmcoKSkge1xuICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoV0hFRUwsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKFdIRUVMLCB7XG4gICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpcmUoQ09OVEVOVF9XSEVFTCwgeyBldnQ6IGV2dCB9KTtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5zZXRQb2ludGVyc1Bvc2l0aW9ucyA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgdmFyIGNvbnRlbnRQb3NpdGlvbiA9IHRoaXMuX2dldENvbnRlbnRQb3NpdGlvbigpLCB4ID0gbnVsbCwgeSA9IG51bGw7XG4gICAgICAgIGV2dCA9IGV2dCA/IGV2dCA6IHdpbmRvdy5ldmVudDtcbiAgICAgICAgaWYgKGV2dC50b3VjaGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChldnQudG91Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvdWNoID0gZXZ0LnRvdWNoZXNbMF07XG4gICAgICAgICAgICAgICAgeCA9IHRvdWNoLmNsaWVudFggLSBjb250ZW50UG9zaXRpb24ubGVmdDtcbiAgICAgICAgICAgICAgICB5ID0gdG91Y2guY2xpZW50WSAtIGNvbnRlbnRQb3NpdGlvbi50b3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB4ID0gZXZ0LmNsaWVudFggLSBjb250ZW50UG9zaXRpb24ubGVmdDtcbiAgICAgICAgICAgIHkgPSBldnQuY2xpZW50WSAtIGNvbnRlbnRQb3NpdGlvbi50b3A7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHggIT09IG51bGwgJiYgeSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5wb2ludGVyUG9zID0ge1xuICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgeTogeVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3RhZ2UucHJvdG90eXBlLl9zZXRQb2ludGVyUG9zaXRpb24gPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ01ldGhvZCBfc2V0UG9pbnRlclBvc2l0aW9uIGlzIGRlcHJlY2F0ZWQuIFVzZSBcInN0YWdlLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2ZW50KVwiIGluc3RlYWQuJyk7XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5fZ2V0Q29udGVudFBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuY29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3RcbiAgICAgICAgICAgID8gdGhpcy5jb250ZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICA6IHsgdG9wOiAwLCBsZWZ0OiAwIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wLFxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBTdGFnZS5wcm90b3R5cGUuX2J1aWxkRE9NID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmJ1ZmZlckNhbnZhcyA9IG5ldyBDYW52YXNfMS5TY2VuZUNhbnZhcygpO1xuICAgICAgICB0aGlzLmJ1ZmZlckhpdENhbnZhcyA9IG5ldyBDYW52YXNfMS5IaXRDYW52YXMoeyBwaXhlbFJhdGlvOiAxIH0pO1xuICAgICAgICBpZiAoIUdsb2JhbF8xLktvbnZhLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcigpO1xuICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhyb3cgJ1N0YWdlIGhhcyBubyBjb250YWluZXIuIEEgY29udGFpbmVyIGlzIHJlcXVpcmVkLic7XG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IEVNUFRZX1NUUklORztcbiAgICAgICAgdGhpcy5jb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5wb3NpdGlvbiA9IFJFTEFUSVZFO1xuICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUudXNlclNlbGVjdCA9ICdub25lJztcbiAgICAgICAgdGhpcy5jb250ZW50LmNsYXNzTmFtZSA9IEtPTlZBX0NPTlRFTlQ7XG4gICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncHJlc2VudGF0aW9uJyk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICB0aGlzLl9yZXNpemVET00oKTtcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5jYWNoZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgVXRpbF8xLlV0aWwud2FybignQ2FjaGUgZnVuY3Rpb24gaXMgbm90IGFsbG93ZWQgZm9yIHN0YWdlLiBZb3UgbWF5IHVzZSBjYWNoZSBvbmx5IGZvciBsYXllcnMsIGdyb3VwcyBhbmQgc2hhcGVzLicpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFN0YWdlLnByb3RvdHlwZS5iYXRjaERyYXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZWFjaChmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgICAgIGxheWVyLmJhdGNoRHJhdygpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gU3RhZ2U7XG59KENvbnRhaW5lcl8xLkNvbnRhaW5lcikpO1xuZXhwb3J0cy5TdGFnZSA9IFN0YWdlO1xuU3RhZ2UucHJvdG90eXBlLm5vZGVUeXBlID0gU1RBR0U7XG5HbG9iYWxfMi5fcmVnaXN0ZXJOb2RlKFN0YWdlKTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTdGFnZSwgJ2NvbnRhaW5lcicpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVXRpbF8xID0gcmVxdWlyZShcIi4vVXRpbFwiKTtcbnZhciBBbmltYXRpb25fMSA9IHJlcXVpcmUoXCIuL0FuaW1hdGlvblwiKTtcbnZhciBOb2RlXzEgPSByZXF1aXJlKFwiLi9Ob2RlXCIpO1xudmFyIEdsb2JhbF8xID0gcmVxdWlyZShcIi4vR2xvYmFsXCIpO1xudmFyIGJsYWNrbGlzdCA9IHtcbiAgICBub2RlOiAxLFxuICAgIGR1cmF0aW9uOiAxLFxuICAgIGVhc2luZzogMSxcbiAgICBvbkZpbmlzaDogMSxcbiAgICB5b3lvOiAxXG59LCBQQVVTRUQgPSAxLCBQTEFZSU5HID0gMiwgUkVWRVJTSU5HID0gMywgaWRDb3VudGVyID0gMCwgY29sb3JBdHRycyA9IFsnZmlsbCcsICdzdHJva2UnLCAnc2hhZG93Q29sb3InXTtcbnZhciBUd2VlbkVuZ2luZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVHdlZW5FbmdpbmUocHJvcCwgcHJvcEZ1bmMsIGZ1bmMsIGJlZ2luLCBmaW5pc2gsIGR1cmF0aW9uLCB5b3lvKSB7XG4gICAgICAgIHRoaXMucHJvcCA9IHByb3A7XG4gICAgICAgIHRoaXMucHJvcEZ1bmMgPSBwcm9wRnVuYztcbiAgICAgICAgdGhpcy5iZWdpbiA9IGJlZ2luO1xuICAgICAgICB0aGlzLl9wb3MgPSBiZWdpbjtcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgICAgICB0aGlzLl9jaGFuZ2UgPSAwO1xuICAgICAgICB0aGlzLnByZXZQb3MgPSAwO1xuICAgICAgICB0aGlzLnlveW8gPSB5b3lvO1xuICAgICAgICB0aGlzLl90aW1lID0gMDtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSAwO1xuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9maW5pc2ggPSAwO1xuICAgICAgICB0aGlzLmZ1bmMgPSBmdW5jO1xuICAgICAgICB0aGlzLl9jaGFuZ2UgPSBmaW5pc2ggLSB0aGlzLmJlZ2luO1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgfVxuICAgIFR3ZWVuRW5naW5lLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXNbc3RyXTtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICAgIGhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVHdlZW5FbmdpbmUucHJvdG90eXBlLnNldFRpbWUgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICBpZiAodCA+IHRoaXMuZHVyYXRpb24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnlveW8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lID0gdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgICAgICAgICB0aGlzLnJldmVyc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodCA8IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnlveW8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RpbWUgPSB0O1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVHdlZW5FbmdpbmUucHJvdG90eXBlLmdldFRpbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lO1xuICAgIH07XG4gICAgVHdlZW5FbmdpbmUucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24gKHApIHtcbiAgICAgICAgdGhpcy5wcmV2UG9zID0gdGhpcy5fcG9zO1xuICAgICAgICB0aGlzLnByb3BGdW5jKHApO1xuICAgICAgICB0aGlzLl9wb3MgPSBwO1xuICAgIH07XG4gICAgVHdlZW5FbmdpbmUucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdCA9IHRoaXMuX3RpbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZnVuYyh0LCB0aGlzLmJlZ2luLCB0aGlzLl9jaGFuZ2UsIHRoaXMuZHVyYXRpb24pO1xuICAgIH07XG4gICAgVHdlZW5FbmdpbmUucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBQTEFZSU5HO1xuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSB0aGlzLmdldFRpbWVyKCkgLSB0aGlzLl90aW1lO1xuICAgICAgICB0aGlzLm9uRW50ZXJGcmFtZSgpO1xuICAgICAgICB0aGlzLmZpcmUoJ29uUGxheScpO1xuICAgIH07XG4gICAgVHdlZW5FbmdpbmUucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBSRVZFUlNJTkc7XG4gICAgICAgIHRoaXMuX3RpbWUgPSB0aGlzLmR1cmF0aW9uIC0gdGhpcy5fdGltZTtcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gdGhpcy5nZXRUaW1lcigpIC0gdGhpcy5fdGltZTtcbiAgICAgICAgdGhpcy5vbkVudGVyRnJhbWUoKTtcbiAgICAgICAgdGhpcy5maXJlKCdvblJldmVyc2UnKTtcbiAgICB9O1xuICAgIFR3ZWVuRW5naW5lLnByb3RvdHlwZS5zZWVrID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB0aGlzLl90aW1lID0gdDtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5maXJlKCdvblNlZWsnKTtcbiAgICB9O1xuICAgIFR3ZWVuRW5naW5lLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB0aGlzLl90aW1lID0gMDtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5maXJlKCdvblJlc2V0Jyk7XG4gICAgfTtcbiAgICBUd2VlbkVuZ2luZS5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIHRoaXMuX3RpbWUgPSB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLmZpcmUoJ29uRmluaXNoJyk7XG4gICAgfTtcbiAgICBUd2VlbkVuZ2luZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMuZ2V0UG9zaXRpb24odGhpcy5fdGltZSkpO1xuICAgIH07XG4gICAgVHdlZW5FbmdpbmUucHJvdG90eXBlLm9uRW50ZXJGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHQgPSB0aGlzLmdldFRpbWVyKCkgLSB0aGlzLl9zdGFydFRpbWU7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBQTEFZSU5HKSB7XG4gICAgICAgICAgICB0aGlzLnNldFRpbWUodCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZSA9PT0gUkVWRVJTSU5HKSB7XG4gICAgICAgICAgICB0aGlzLnNldFRpbWUodGhpcy5kdXJhdGlvbiAtIHQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBUd2VlbkVuZ2luZS5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBQQVVTRUQ7XG4gICAgICAgIHRoaXMuZmlyZSgnb25QYXVzZScpO1xuICAgIH07XG4gICAgVHdlZW5FbmdpbmUucHJvdG90eXBlLmdldFRpbWVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgfTtcbiAgICByZXR1cm4gVHdlZW5FbmdpbmU7XG59KCkpO1xudmFyIFR3ZWVuID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUd2Vlbihjb25maWcpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBub2RlID0gY29uZmlnLm5vZGUsIG5vZGVJZCA9IG5vZGUuX2lkLCBkdXJhdGlvbiwgZWFzaW5nID0gY29uZmlnLmVhc2luZyB8fCBleHBvcnRzLkVhc2luZ3MuTGluZWFyLCB5b3lvID0gISFjb25maWcueW95bywga2V5O1xuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy5kdXJhdGlvbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGR1cmF0aW9uID0gMC4zO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZy5kdXJhdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgZHVyYXRpb24gPSAwLjAwMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGR1cmF0aW9uID0gY29uZmlnLmR1cmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gICAgICAgIHRoaXMuX2lkID0gaWRDb3VudGVyKys7XG4gICAgICAgIHZhciBsYXllcnMgPSBub2RlLmdldExheWVyKCkgfHxcbiAgICAgICAgICAgIChub2RlIGluc3RhbmNlb2YgR2xvYmFsXzEuS29udmFbJ1N0YWdlJ10gPyBub2RlLmdldExheWVycygpIDogbnVsbCk7XG4gICAgICAgIGlmICghbGF5ZXJzKSB7XG4gICAgICAgICAgICBVdGlsXzEuVXRpbC5lcnJvcignVHdlZW4gY29uc3RydWN0b3IgaGF2ZSBgbm9kZWAgdGhhdCBpcyBub3QgaW4gYSBsYXllci4gUGxlYXNlIGFkZCBub2RlIGludG8gbGF5ZXIgZmlyc3QuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hbmltID0gbmV3IEFuaW1hdGlvbl8xLkFuaW1hdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGF0LnR3ZWVuLm9uRW50ZXJGcmFtZSgpO1xuICAgICAgICB9LCBsYXllcnMpO1xuICAgICAgICB0aGlzLnR3ZWVuID0gbmV3IFR3ZWVuRW5naW5lKGtleSwgZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgIHRoYXQuX3R3ZWVuRnVuYyhpKTtcbiAgICAgICAgfSwgZWFzaW5nLCAwLCAxLCBkdXJhdGlvbiAqIDEwMDAsIHlveW8pO1xuICAgICAgICB0aGlzLl9hZGRMaXN0ZW5lcnMoKTtcbiAgICAgICAgaWYgKCFUd2Vlbi5hdHRyc1tub2RlSWRdKSB7XG4gICAgICAgICAgICBUd2Vlbi5hdHRyc1tub2RlSWRdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFUd2Vlbi5hdHRyc1tub2RlSWRdW3RoaXMuX2lkXSkge1xuICAgICAgICAgICAgVHdlZW4uYXR0cnNbbm9kZUlkXVt0aGlzLl9pZF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVR3ZWVuLnR3ZWVuc1tub2RlSWRdKSB7XG4gICAgICAgICAgICBUd2Vlbi50d2VlbnNbbm9kZUlkXSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGZvciAoa2V5IGluIGNvbmZpZykge1xuICAgICAgICAgICAgaWYgKGJsYWNrbGlzdFtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRBdHRyKGtleSwgY29uZmlnW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5vbkZpbmlzaCA9IGNvbmZpZy5vbkZpbmlzaDtcbiAgICAgICAgdGhpcy5vblJlc2V0ID0gY29uZmlnLm9uUmVzZXQ7XG4gICAgfVxuICAgIFR3ZWVuLnByb3RvdHlwZS5fYWRkQXR0ciA9IGZ1bmN0aW9uIChrZXksIGVuZCkge1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZSwgbm9kZUlkID0gbm9kZS5faWQsIHN0YXJ0LCBkaWZmLCB0d2VlbklkLCBuLCBsZW4sIHRydWVFbmQsIHRydWVTdGFydCwgZW5kUkdCQTtcbiAgICAgICAgdHdlZW5JZCA9IFR3ZWVuLnR3ZWVuc1tub2RlSWRdW2tleV07XG4gICAgICAgIGlmICh0d2VlbklkKSB7XG4gICAgICAgICAgICBkZWxldGUgVHdlZW4uYXR0cnNbbm9kZUlkXVt0d2VlbklkXVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIHN0YXJ0ID0gbm9kZS5nZXRBdHRyKGtleSk7XG4gICAgICAgIGlmIChVdGlsXzEuVXRpbC5faXNBcnJheShlbmQpKSB7XG4gICAgICAgICAgICBkaWZmID0gW107XG4gICAgICAgICAgICBsZW4gPSBNYXRoLm1heChlbmQubGVuZ3RoLCBzdGFydC5sZW5ndGgpO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gJ3BvaW50cycgJiYgZW5kLmxlbmd0aCAhPT0gc3RhcnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVuZC5sZW5ndGggPiBzdGFydC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZVN0YXJ0ID0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gVXRpbF8xLlV0aWwuX3ByZXBhcmVBcnJheUZvclR3ZWVuKHN0YXJ0LCBlbmQsIG5vZGUuY2xvc2VkKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZUVuZCA9IGVuZDtcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gVXRpbF8xLlV0aWwuX3ByZXBhcmVBcnJheUZvclR3ZWVuKGVuZCwgc3RhcnQsIG5vZGUuY2xvc2VkKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChrZXkuaW5kZXhPZignZmlsbCcpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuICUgMiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlmZi5wdXNoKGVuZFtuXSAtIHN0YXJ0W25dKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGFydFJHQkEgPSBVdGlsXzEuVXRpbC5jb2xvclRvUkdCQShzdGFydFtuXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRSR0JBID0gVXRpbF8xLlV0aWwuY29sb3JUb1JHQkEoZW5kW25dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0W25dID0gc3RhcnRSR0JBO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlmZi5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByOiBlbmRSR0JBLnIgLSBzdGFydFJHQkEucixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnOiBlbmRSR0JBLmcgLSBzdGFydFJHQkEuZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiOiBlbmRSR0JBLmIgLSBzdGFydFJHQkEuYixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhOiBlbmRSR0JBLmEgLSBzdGFydFJHQkEuYVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZGlmZi5wdXNoKGVuZFtuXSAtIHN0YXJ0W25dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29sb3JBdHRycy5pbmRleE9mKGtleSkgIT09IC0xKSB7XG4gICAgICAgICAgICBzdGFydCA9IFV0aWxfMS5VdGlsLmNvbG9yVG9SR0JBKHN0YXJ0KTtcbiAgICAgICAgICAgIGVuZFJHQkEgPSBVdGlsXzEuVXRpbC5jb2xvclRvUkdCQShlbmQpO1xuICAgICAgICAgICAgZGlmZiA9IHtcbiAgICAgICAgICAgICAgICByOiBlbmRSR0JBLnIgLSBzdGFydC5yLFxuICAgICAgICAgICAgICAgIGc6IGVuZFJHQkEuZyAtIHN0YXJ0LmcsXG4gICAgICAgICAgICAgICAgYjogZW5kUkdCQS5iIC0gc3RhcnQuYixcbiAgICAgICAgICAgICAgICBhOiBlbmRSR0JBLmEgLSBzdGFydC5hXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGlmZiA9IGVuZCAtIHN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIFR3ZWVuLmF0dHJzW25vZGVJZF1bdGhpcy5faWRdW2tleV0gPSB7XG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICBkaWZmOiBkaWZmLFxuICAgICAgICAgICAgZW5kOiBlbmQsXG4gICAgICAgICAgICB0cnVlRW5kOiB0cnVlRW5kLFxuICAgICAgICAgICAgdHJ1ZVN0YXJ0OiB0cnVlU3RhcnRcbiAgICAgICAgfTtcbiAgICAgICAgVHdlZW4udHdlZW5zW25vZGVJZF1ba2V5XSA9IHRoaXMuX2lkO1xuICAgIH07XG4gICAgVHdlZW4ucHJvdG90eXBlLl90d2VlbkZ1bmMgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZSwgYXR0cnMgPSBUd2Vlbi5hdHRyc1tub2RlLl9pZF1bdGhpcy5faWRdLCBrZXksIGF0dHIsIHN0YXJ0LCBkaWZmLCBuZXdWYWwsIG4sIGxlbiwgZW5kO1xuICAgICAgICBmb3IgKGtleSBpbiBhdHRycykge1xuICAgICAgICAgICAgYXR0ciA9IGF0dHJzW2tleV07XG4gICAgICAgICAgICBzdGFydCA9IGF0dHIuc3RhcnQ7XG4gICAgICAgICAgICBkaWZmID0gYXR0ci5kaWZmO1xuICAgICAgICAgICAgZW5kID0gYXR0ci5lbmQ7XG4gICAgICAgICAgICBpZiAoVXRpbF8xLlV0aWwuX2lzQXJyYXkoc3RhcnQpKSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsID0gW107XG4gICAgICAgICAgICAgICAgbGVuID0gTWF0aC5tYXgoc3RhcnQubGVuZ3RoLCBlbmQubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5LmluZGV4T2YoJ2ZpbGwnKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuICUgMiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbC5wdXNoKChzdGFydFtuXSB8fCAwKSArIGRpZmZbbl0gKiBpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbC5wdXNoKCdyZ2JhKCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKHN0YXJ0W25dLnIgKyBkaWZmW25dLnIgKiBpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcsJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoc3RhcnRbbl0uZyArIGRpZmZbbl0uZyAqIGkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJywnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZChzdGFydFtuXS5iICsgZGlmZltuXS5iICogaSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc3RhcnRbbl0uYSArIGRpZmZbbl0uYSAqIGkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWwucHVzaCgoc3RhcnRbbl0gfHwgMCkgKyBkaWZmW25dICogaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb2xvckF0dHJzLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWwgPVxuICAgICAgICAgICAgICAgICAgICAncmdiYSgnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoc3RhcnQuciArIGRpZmYuciAqIGkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcsJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKHN0YXJ0LmcgKyBkaWZmLmcgKiBpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZChzdGFydC5iICsgZGlmZi5iICogaSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJywnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChzdGFydC5hICsgZGlmZi5hICogaSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyknO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsID0gc3RhcnQgKyBkaWZmICogaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cihrZXksIG5ld1ZhbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS5fYWRkTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnR3ZWVuLm9uUGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmFuaW0uc3RhcnQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50d2Vlbi5vblJldmVyc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5hbmltLnN0YXJ0KCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHdlZW4ub25QYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmFuaW0uc3RvcCgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnR3ZWVuLm9uRmluaXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBfdGhpcy5ub2RlO1xuICAgICAgICAgICAgdmFyIGF0dHJzID0gVHdlZW4uYXR0cnNbbm9kZS5faWRdW190aGlzLl9pZF07XG4gICAgICAgICAgICBpZiAoYXR0cnMucG9pbnRzICYmIGF0dHJzLnBvaW50cy50cnVlRW5kKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyKCdwb2ludHMnLCBhdHRycy5wb2ludHMudHJ1ZUVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX3RoaXMub25GaW5pc2gpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vbkZpbmlzaC5jYWxsKF90aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50d2Vlbi5vblJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBfdGhpcy5ub2RlO1xuICAgICAgICAgICAgdmFyIGF0dHJzID0gVHdlZW4uYXR0cnNbbm9kZS5faWRdW190aGlzLl9pZF07XG4gICAgICAgICAgICBpZiAoYXR0cnMucG9pbnRzICYmIGF0dHJzLnBvaW50cy50cnVlU3RhcnQpIHtcbiAgICAgICAgICAgICAgICBub2RlLnBvaW50cyhhdHRycy5wb2ludHMudHJ1ZVN0YXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5vblJlc2V0KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25SZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG4gICAgVHdlZW4ucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudHdlZW4ucGxheSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnR3ZWVuLnJldmVyc2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudHdlZW4ucmVzZXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUuc2VlayA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHRoaXMudHdlZW4uc2Vlayh0ICogMTAwMCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHdlZW4ucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnR3ZWVuLnBhdXNlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHdlZW4ucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50d2Vlbi5maW5pc2goKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5vZGVJZCA9IHRoaXMubm9kZS5faWQsIHRoaXNJZCA9IHRoaXMuX2lkLCBhdHRycyA9IFR3ZWVuLnR3ZWVuc1tub2RlSWRdLCBrZXk7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgZm9yIChrZXkgaW4gYXR0cnMpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBUd2Vlbi50d2VlbnNbbm9kZUlkXVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBUd2Vlbi5hdHRyc1tub2RlSWRdW3RoaXNJZF07XG4gICAgfTtcbiAgICBUd2Vlbi5hdHRycyA9IHt9O1xuICAgIFR3ZWVuLnR3ZWVucyA9IHt9O1xuICAgIHJldHVybiBUd2Vlbjtcbn0oKSk7XG5leHBvcnRzLlR3ZWVuID0gVHdlZW47XG5Ob2RlXzEuTm9kZS5wcm90b3R5cGUudG8gPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgdmFyIG9uRmluaXNoID0gcGFyYW1zLm9uRmluaXNoO1xuICAgIHBhcmFtcy5ub2RlID0gdGhpcztcbiAgICBwYXJhbXMub25GaW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICBpZiAob25GaW5pc2gpIHtcbiAgICAgICAgICAgIG9uRmluaXNoKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciB0d2VlbiA9IG5ldyBUd2VlbihwYXJhbXMpO1xuICAgIHR3ZWVuLnBsYXkoKTtcbn07XG5leHBvcnRzLkVhc2luZ3MgPSB7XG4gICAgQmFja0Vhc2VJbjogZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqICgocyArIDEpICogdCAtIHMpICsgYjtcbiAgICB9LFxuICAgIEJhY2tFYXNlT3V0OiBmdW5jdGlvbiAodCwgYiwgYywgZCkge1xuICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDEpICsgYjtcbiAgICB9LFxuICAgIEJhY2tFYXNlSW5PdXQ6IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAoYyAvIDIpICogKHQgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgLSBzKSkgKyBiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoYyAvIDIpICogKCh0IC09IDIpICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0ICsgcykgKyAyKSArIGI7XG4gICAgfSxcbiAgICBFbGFzdGljRWFzZUluOiBmdW5jdGlvbiAodCwgYiwgYywgZCwgYSwgcCkge1xuICAgICAgICB2YXIgcyA9IDA7XG4gICAgICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHQgLz0gZCkgPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBiICsgYztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXApIHtcbiAgICAgICAgICAgIHAgPSBkICogMC4zO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYSB8fCBhIDwgTWF0aC5hYnMoYykpIHtcbiAgICAgICAgICAgIGEgPSBjO1xuICAgICAgICAgICAgcyA9IHAgLyA0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcyA9IChwIC8gKDIgKiBNYXRoLlBJKSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoLShhICpcbiAgICAgICAgICAgIE1hdGgucG93KDIsIDEwICogKHQgLT0gMSkpICpcbiAgICAgICAgICAgIE1hdGguc2luKCgodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkpIC8gcCkpICsgYik7XG4gICAgfSxcbiAgICBFbGFzdGljRWFzZU91dDogZnVuY3Rpb24gKHQsIGIsIGMsIGQsIGEsIHApIHtcbiAgICAgICAgdmFyIHMgPSAwO1xuICAgICAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0IC89IGQpID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwKSB7XG4gICAgICAgICAgICBwID0gZCAqIDAuMztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWEgfHwgYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgICAgICAgICBhID0gYztcbiAgICAgICAgICAgIHMgPSBwIC8gNDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHMgPSAocCAvICgyICogTWF0aC5QSSkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGEgKiBNYXRoLnBvdygyLCAtMTAgKiB0KSAqIE1hdGguc2luKCgodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkpIC8gcCkgK1xuICAgICAgICAgICAgYyArXG4gICAgICAgICAgICBiKTtcbiAgICB9LFxuICAgIEVsYXN0aWNFYXNlSW5PdXQ6IGZ1bmN0aW9uICh0LCBiLCBjLCBkLCBhLCBwKSB7XG4gICAgICAgIHZhciBzID0gMDtcbiAgICAgICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodCAvPSBkIC8gMikgPT09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBiICsgYztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXApIHtcbiAgICAgICAgICAgIHAgPSBkICogKDAuMyAqIDEuNSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhIHx8IGEgPCBNYXRoLmFicyhjKSkge1xuICAgICAgICAgICAgYSA9IGM7XG4gICAgICAgICAgICBzID0gcCAvIDQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzID0gKHAgLyAoMiAqIE1hdGguUEkpKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHQgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gKC0wLjUgKlxuICAgICAgICAgICAgICAgIChhICpcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKlxuICAgICAgICAgICAgICAgICAgICBNYXRoLnNpbigoKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpKSAvIHApKSArXG4gICAgICAgICAgICAgICAgYik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChhICpcbiAgICAgICAgICAgIE1hdGgucG93KDIsIC0xMCAqICh0IC09IDEpKSAqXG4gICAgICAgICAgICBNYXRoLnNpbigoKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpKSAvIHApICpcbiAgICAgICAgICAgIDAuNSArXG4gICAgICAgICAgICBjICtcbiAgICAgICAgICAgIGIpO1xuICAgIH0sXG4gICAgQm91bmNlRWFzZU91dDogZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKCh0IC89IGQpIDwgMSAvIDIuNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqIHQgKiB0KSArIGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodCA8IDIgLyAyLjc1KSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAxLjUgLyAyLjc1KSAqIHQgKyAwLjc1KSArIGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodCA8IDIuNSAvIDIuNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDIuMjUgLyAyLjc1KSAqIHQgKyAwLjkzNzUpICsgYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDIuNjI1IC8gMi43NSkgKiB0ICsgMC45ODQzNzUpICsgYjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgQm91bmNlRWFzZUluOiBmdW5jdGlvbiAodCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gYyAtIGV4cG9ydHMuRWFzaW5ncy5Cb3VuY2VFYXNlT3V0KGQgLSB0LCAwLCBjLCBkKSArIGI7XG4gICAgfSxcbiAgICBCb3VuY2VFYXNlSW5PdXQ6IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmICh0IDwgZCAvIDIpIHtcbiAgICAgICAgICAgIHJldHVybiBleHBvcnRzLkVhc2luZ3MuQm91bmNlRWFzZUluKHQgKiAyLCAwLCBjLCBkKSAqIDAuNSArIGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwb3J0cy5FYXNpbmdzLkJvdW5jZUVhc2VPdXQodCAqIDIgLSBkLCAwLCBjLCBkKSAqIDAuNSArIGMgKiAwLjUgKyBiO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBFYXNlSW46IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICsgYjtcbiAgICB9LFxuICAgIEVhc2VPdXQ6IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiAtYyAqICh0IC89IGQpICogKHQgLSAyKSArIGI7XG4gICAgfSxcbiAgICBFYXNlSW5PdXQ6IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gKGMgLyAyKSAqIHQgKiB0ICsgYjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKC1jIC8gMikgKiAoLS10ICogKHQgLSAyKSAtIDEpICsgYjtcbiAgICB9LFxuICAgIFN0cm9uZ0Vhc2VJbjogZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCAqIHQgKyBiO1xuICAgIH0sXG4gICAgU3Ryb25nRWFzZU91dDogZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0ICogdCArIDEpICsgYjtcbiAgICB9LFxuICAgIFN0cm9uZ0Vhc2VJbk91dDogZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAoYyAvIDIpICogdCAqIHQgKiB0ICogdCAqIHQgKyBiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoYyAvIDIpICogKCh0IC09IDIpICogdCAqIHQgKiB0ICogdCArIDIpICsgYjtcbiAgICB9LFxuICAgIExpbmVhcjogZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIChjICogdCkgLyBkICsgYjtcbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgR2xvYmFsXzEgPSByZXF1aXJlKFwiLi9HbG9iYWxcIik7XG52YXIgQ29sbGVjdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29sbGVjdGlvbigpIHtcbiAgICB9XG4gICAgQ29sbGVjdGlvbi50b0NvbGxlY3Rpb24gPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IENvbGxlY3Rpb24oKSwgbGVuID0gYXJyLmxlbmd0aCwgbjtcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnB1c2goYXJyW25dKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICB9O1xuICAgIENvbGxlY3Rpb24uX21hcE1ldGhvZCA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoLCBpO1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzW2ldW21ldGhvZE5hbWVdLmFwcGx5KHRoaXNbaV0sIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBDb2xsZWN0aW9uLm1hcE1ldGhvZHMgPSBmdW5jdGlvbiAoY29uc3RydWN0b3IpIHtcbiAgICAgICAgdmFyIHByb3QgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgICAgIGZvciAodmFyIG1ldGhvZE5hbWUgaW4gcHJvdCkge1xuICAgICAgICAgICAgQ29sbGVjdGlvbi5fbWFwTWV0aG9kKG1ldGhvZE5hbWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ29sbGVjdGlvbjtcbn0oKSk7XG5leHBvcnRzLkNvbGxlY3Rpb24gPSBDb2xsZWN0aW9uO1xuQ29sbGVjdGlvbi5wcm90b3R5cGUgPSBbXTtcbkNvbGxlY3Rpb24ucHJvdG90eXBlLmVhY2ggPSBmdW5jdGlvbiAoZnVuYykge1xuICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdGhpcy5sZW5ndGg7IG4rKykge1xuICAgICAgICBmdW5jKHRoaXNbbl0sIG4pO1xuICAgIH1cbn07XG5Db2xsZWN0aW9uLnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnIgPSBbXSwgbGVuID0gdGhpcy5sZW5ndGgsIG47XG4gICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgIGFyci5wdXNoKHRoaXNbbl0pO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xufTtcbnZhciBUcmFuc2Zvcm0gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRyYW5zZm9ybShtKSB7XG4gICAgICAgIGlmIChtID09PSB2b2lkIDApIHsgbSA9IFsxLCAwLCAwLCAxLCAwLCAwXTsgfVxuICAgICAgICB0aGlzLm0gPSAobSAmJiBtLnNsaWNlKCkpIHx8IFsxLCAwLCAwLCAxLCAwLCAwXTtcbiAgICB9XG4gICAgVHJhbnNmb3JtLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFRyYW5zZm9ybSh0aGlzLm0pO1xuICAgIH07XG4gICAgVHJhbnNmb3JtLnByb3RvdHlwZS5wb2ludCA9IGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICB2YXIgbSA9IHRoaXMubTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IG1bMF0gKiBwb2ludC54ICsgbVsyXSAqIHBvaW50LnkgKyBtWzRdLFxuICAgICAgICAgICAgeTogbVsxXSAqIHBvaW50LnggKyBtWzNdICogcG9pbnQueSArIG1bNV1cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFRyYW5zZm9ybS5wcm90b3R5cGUudHJhbnNsYXRlID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgdGhpcy5tWzRdICs9IHRoaXMubVswXSAqIHggKyB0aGlzLm1bMl0gKiB5O1xuICAgICAgICB0aGlzLm1bNV0gKz0gdGhpcy5tWzFdICogeCArIHRoaXMubVszXSAqIHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHJhbnNmb3JtLnByb3RvdHlwZS5zY2FsZSA9IGZ1bmN0aW9uIChzeCwgc3kpIHtcbiAgICAgICAgdGhpcy5tWzBdICo9IHN4O1xuICAgICAgICB0aGlzLm1bMV0gKj0gc3g7XG4gICAgICAgIHRoaXMubVsyXSAqPSBzeTtcbiAgICAgICAgdGhpcy5tWzNdICo9IHN5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFRyYW5zZm9ybS5wcm90b3R5cGUucm90YXRlID0gZnVuY3Rpb24gKHJhZCkge1xuICAgICAgICB2YXIgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgdmFyIG0xMSA9IHRoaXMubVswXSAqIGMgKyB0aGlzLm1bMl0gKiBzO1xuICAgICAgICB2YXIgbTEyID0gdGhpcy5tWzFdICogYyArIHRoaXMubVszXSAqIHM7XG4gICAgICAgIHZhciBtMjEgPSB0aGlzLm1bMF0gKiAtcyArIHRoaXMubVsyXSAqIGM7XG4gICAgICAgIHZhciBtMjIgPSB0aGlzLm1bMV0gKiAtcyArIHRoaXMubVszXSAqIGM7XG4gICAgICAgIHRoaXMubVswXSA9IG0xMTtcbiAgICAgICAgdGhpcy5tWzFdID0gbTEyO1xuICAgICAgICB0aGlzLm1bMl0gPSBtMjE7XG4gICAgICAgIHRoaXMubVszXSA9IG0yMjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUcmFuc2Zvcm0ucHJvdG90eXBlLmdldFRyYW5zbGF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy5tWzRdLFxuICAgICAgICAgICAgeTogdGhpcy5tWzVdXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBUcmFuc2Zvcm0ucHJvdG90eXBlLnNrZXcgPSBmdW5jdGlvbiAoc3gsIHN5KSB7XG4gICAgICAgIHZhciBtMTEgPSB0aGlzLm1bMF0gKyB0aGlzLm1bMl0gKiBzeTtcbiAgICAgICAgdmFyIG0xMiA9IHRoaXMubVsxXSArIHRoaXMubVszXSAqIHN5O1xuICAgICAgICB2YXIgbTIxID0gdGhpcy5tWzJdICsgdGhpcy5tWzBdICogc3g7XG4gICAgICAgIHZhciBtMjIgPSB0aGlzLm1bM10gKyB0aGlzLm1bMV0gKiBzeDtcbiAgICAgICAgdGhpcy5tWzBdID0gbTExO1xuICAgICAgICB0aGlzLm1bMV0gPSBtMTI7XG4gICAgICAgIHRoaXMubVsyXSA9IG0yMTtcbiAgICAgICAgdGhpcy5tWzNdID0gbTIyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFRyYW5zZm9ybS5wcm90b3R5cGUubXVsdGlwbHkgPSBmdW5jdGlvbiAobWF0cml4KSB7XG4gICAgICAgIHZhciBtMTEgPSB0aGlzLm1bMF0gKiBtYXRyaXgubVswXSArIHRoaXMubVsyXSAqIG1hdHJpeC5tWzFdO1xuICAgICAgICB2YXIgbTEyID0gdGhpcy5tWzFdICogbWF0cml4Lm1bMF0gKyB0aGlzLm1bM10gKiBtYXRyaXgubVsxXTtcbiAgICAgICAgdmFyIG0yMSA9IHRoaXMubVswXSAqIG1hdHJpeC5tWzJdICsgdGhpcy5tWzJdICogbWF0cml4Lm1bM107XG4gICAgICAgIHZhciBtMjIgPSB0aGlzLm1bMV0gKiBtYXRyaXgubVsyXSArIHRoaXMubVszXSAqIG1hdHJpeC5tWzNdO1xuICAgICAgICB2YXIgZHggPSB0aGlzLm1bMF0gKiBtYXRyaXgubVs0XSArIHRoaXMubVsyXSAqIG1hdHJpeC5tWzVdICsgdGhpcy5tWzRdO1xuICAgICAgICB2YXIgZHkgPSB0aGlzLm1bMV0gKiBtYXRyaXgubVs0XSArIHRoaXMubVszXSAqIG1hdHJpeC5tWzVdICsgdGhpcy5tWzVdO1xuICAgICAgICB0aGlzLm1bMF0gPSBtMTE7XG4gICAgICAgIHRoaXMubVsxXSA9IG0xMjtcbiAgICAgICAgdGhpcy5tWzJdID0gbTIxO1xuICAgICAgICB0aGlzLm1bM10gPSBtMjI7XG4gICAgICAgIHRoaXMubVs0XSA9IGR4O1xuICAgICAgICB0aGlzLm1bNV0gPSBkeTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUcmFuc2Zvcm0ucHJvdG90eXBlLmludmVydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGQgPSAxIC8gKHRoaXMubVswXSAqIHRoaXMubVszXSAtIHRoaXMubVsxXSAqIHRoaXMubVsyXSk7XG4gICAgICAgIHZhciBtMCA9IHRoaXMubVszXSAqIGQ7XG4gICAgICAgIHZhciBtMSA9IC10aGlzLm1bMV0gKiBkO1xuICAgICAgICB2YXIgbTIgPSAtdGhpcy5tWzJdICogZDtcbiAgICAgICAgdmFyIG0zID0gdGhpcy5tWzBdICogZDtcbiAgICAgICAgdmFyIG00ID0gZCAqICh0aGlzLm1bMl0gKiB0aGlzLm1bNV0gLSB0aGlzLm1bM10gKiB0aGlzLm1bNF0pO1xuICAgICAgICB2YXIgbTUgPSBkICogKHRoaXMubVsxXSAqIHRoaXMubVs0XSAtIHRoaXMubVswXSAqIHRoaXMubVs1XSk7XG4gICAgICAgIHRoaXMubVswXSA9IG0wO1xuICAgICAgICB0aGlzLm1bMV0gPSBtMTtcbiAgICAgICAgdGhpcy5tWzJdID0gbTI7XG4gICAgICAgIHRoaXMubVszXSA9IG0zO1xuICAgICAgICB0aGlzLm1bNF0gPSBtNDtcbiAgICAgICAgdGhpcy5tWzVdID0gbTU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHJhbnNmb3JtLnByb3RvdHlwZS5nZXRNYXRyaXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm07XG4gICAgfTtcbiAgICBUcmFuc2Zvcm0ucHJvdG90eXBlLnNldEFic29sdXRlUG9zaXRpb24gPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICB2YXIgbTAgPSB0aGlzLm1bMF0sIG0xID0gdGhpcy5tWzFdLCBtMiA9IHRoaXMubVsyXSwgbTMgPSB0aGlzLm1bM10sIG00ID0gdGhpcy5tWzRdLCBtNSA9IHRoaXMubVs1XSwgeXQgPSAobTAgKiAoeSAtIG01KSAtIG0xICogKHggLSBtNCkpIC8gKG0wICogbTMgLSBtMSAqIG0yKSwgeHQgPSAoeCAtIG00IC0gbTIgKiB5dCkgLyBtMDtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlKHh0LCB5dCk7XG4gICAgfTtcbiAgICByZXR1cm4gVHJhbnNmb3JtO1xufSgpKTtcbmV4cG9ydHMuVHJhbnNmb3JtID0gVHJhbnNmb3JtO1xudmFyIE9CSkVDVF9BUlJBWSA9ICdbb2JqZWN0IEFycmF5XScsIE9CSkVDVF9OVU1CRVIgPSAnW29iamVjdCBOdW1iZXJdJywgT0JKRUNUX1NUUklORyA9ICdbb2JqZWN0IFN0cmluZ10nLCBPQkpFQ1RfQk9PTEVBTiA9ICdbb2JqZWN0IEJvb2xlYW5dJywgUElfT1ZFUl9ERUcxODAgPSBNYXRoLlBJIC8gMTgwLCBERUcxODBfT1ZFUl9QSSA9IDE4MCAvIE1hdGguUEksIEhBU0ggPSAnIycsIEVNUFRZX1NUUklORyA9ICcnLCBaRVJPID0gJzAnLCBLT05WQV9XQVJOSU5HID0gJ0tvbnZhIHdhcm5pbmc6ICcsIEtPTlZBX0VSUk9SID0gJ0tvbnZhIGVycm9yOiAnLCBSR0JfUEFSRU4gPSAncmdiKCcsIENPTE9SUyA9IHtcbiAgICBhbGljZWJsdWU6IFsyNDAsIDI0OCwgMjU1XSxcbiAgICBhbnRpcXVld2hpdGU6IFsyNTAsIDIzNSwgMjE1XSxcbiAgICBhcXVhOiBbMCwgMjU1LCAyNTVdLFxuICAgIGFxdWFtYXJpbmU6IFsxMjcsIDI1NSwgMjEyXSxcbiAgICBhenVyZTogWzI0MCwgMjU1LCAyNTVdLFxuICAgIGJlaWdlOiBbMjQ1LCAyNDUsIDIyMF0sXG4gICAgYmlzcXVlOiBbMjU1LCAyMjgsIDE5Nl0sXG4gICAgYmxhY2s6IFswLCAwLCAwXSxcbiAgICBibGFuY2hlZGFsbW9uZDogWzI1NSwgMjM1LCAyMDVdLFxuICAgIGJsdWU6IFswLCAwLCAyNTVdLFxuICAgIGJsdWV2aW9sZXQ6IFsxMzgsIDQzLCAyMjZdLFxuICAgIGJyb3duOiBbMTY1LCA0MiwgNDJdLFxuICAgIGJ1cmx5d29vZDogWzIyMiwgMTg0LCAxMzVdLFxuICAgIGNhZGV0Ymx1ZTogWzk1LCAxNTgsIDE2MF0sXG4gICAgY2hhcnRyZXVzZTogWzEyNywgMjU1LCAwXSxcbiAgICBjaG9jb2xhdGU6IFsyMTAsIDEwNSwgMzBdLFxuICAgIGNvcmFsOiBbMjU1LCAxMjcsIDgwXSxcbiAgICBjb3JuZmxvd2VyYmx1ZTogWzEwMCwgMTQ5LCAyMzddLFxuICAgIGNvcm5zaWxrOiBbMjU1LCAyNDgsIDIyMF0sXG4gICAgY3JpbXNvbjogWzIyMCwgMjAsIDYwXSxcbiAgICBjeWFuOiBbMCwgMjU1LCAyNTVdLFxuICAgIGRhcmtibHVlOiBbMCwgMCwgMTM5XSxcbiAgICBkYXJrY3lhbjogWzAsIDEzOSwgMTM5XSxcbiAgICBkYXJrZ29sZGVucm9kOiBbMTg0LCAxMzIsIDExXSxcbiAgICBkYXJrZ3JheTogWzE2OSwgMTY5LCAxNjldLFxuICAgIGRhcmtncmVlbjogWzAsIDEwMCwgMF0sXG4gICAgZGFya2dyZXk6IFsxNjksIDE2OSwgMTY5XSxcbiAgICBkYXJra2hha2k6IFsxODksIDE4MywgMTA3XSxcbiAgICBkYXJrbWFnZW50YTogWzEzOSwgMCwgMTM5XSxcbiAgICBkYXJrb2xpdmVncmVlbjogWzg1LCAxMDcsIDQ3XSxcbiAgICBkYXJrb3JhbmdlOiBbMjU1LCAxNDAsIDBdLFxuICAgIGRhcmtvcmNoaWQ6IFsxNTMsIDUwLCAyMDRdLFxuICAgIGRhcmtyZWQ6IFsxMzksIDAsIDBdLFxuICAgIGRhcmtzYWxtb246IFsyMzMsIDE1MCwgMTIyXSxcbiAgICBkYXJrc2VhZ3JlZW46IFsxNDMsIDE4OCwgMTQzXSxcbiAgICBkYXJrc2xhdGVibHVlOiBbNzIsIDYxLCAxMzldLFxuICAgIGRhcmtzbGF0ZWdyYXk6IFs0NywgNzksIDc5XSxcbiAgICBkYXJrc2xhdGVncmV5OiBbNDcsIDc5LCA3OV0sXG4gICAgZGFya3R1cnF1b2lzZTogWzAsIDIwNiwgMjA5XSxcbiAgICBkYXJrdmlvbGV0OiBbMTQ4LCAwLCAyMTFdLFxuICAgIGRlZXBwaW5rOiBbMjU1LCAyMCwgMTQ3XSxcbiAgICBkZWVwc2t5Ymx1ZTogWzAsIDE5MSwgMjU1XSxcbiAgICBkaW1ncmF5OiBbMTA1LCAxMDUsIDEwNV0sXG4gICAgZGltZ3JleTogWzEwNSwgMTA1LCAxMDVdLFxuICAgIGRvZGdlcmJsdWU6IFszMCwgMTQ0LCAyNTVdLFxuICAgIGZpcmVicmljazogWzE3OCwgMzQsIDM0XSxcbiAgICBmbG9yYWx3aGl0ZTogWzI1NSwgMjU1LCAyNDBdLFxuICAgIGZvcmVzdGdyZWVuOiBbMzQsIDEzOSwgMzRdLFxuICAgIGZ1Y2hzaWE6IFsyNTUsIDAsIDI1NV0sXG4gICAgZ2FpbnNib3JvOiBbMjIwLCAyMjAsIDIyMF0sXG4gICAgZ2hvc3R3aGl0ZTogWzI0OCwgMjQ4LCAyNTVdLFxuICAgIGdvbGQ6IFsyNTUsIDIxNSwgMF0sXG4gICAgZ29sZGVucm9kOiBbMjE4LCAxNjUsIDMyXSxcbiAgICBncmF5OiBbMTI4LCAxMjgsIDEyOF0sXG4gICAgZ3JlZW46IFswLCAxMjgsIDBdLFxuICAgIGdyZWVueWVsbG93OiBbMTczLCAyNTUsIDQ3XSxcbiAgICBncmV5OiBbMTI4LCAxMjgsIDEyOF0sXG4gICAgaG9uZXlkZXc6IFsyNDAsIDI1NSwgMjQwXSxcbiAgICBob3RwaW5rOiBbMjU1LCAxMDUsIDE4MF0sXG4gICAgaW5kaWFucmVkOiBbMjA1LCA5MiwgOTJdLFxuICAgIGluZGlnbzogWzc1LCAwLCAxMzBdLFxuICAgIGl2b3J5OiBbMjU1LCAyNTUsIDI0MF0sXG4gICAga2hha2k6IFsyNDAsIDIzMCwgMTQwXSxcbiAgICBsYXZlbmRlcjogWzIzMCwgMjMwLCAyNTBdLFxuICAgIGxhdmVuZGVyYmx1c2g6IFsyNTUsIDI0MCwgMjQ1XSxcbiAgICBsYXduZ3JlZW46IFsxMjQsIDI1MiwgMF0sXG4gICAgbGVtb25jaGlmZm9uOiBbMjU1LCAyNTAsIDIwNV0sXG4gICAgbGlnaHRibHVlOiBbMTczLCAyMTYsIDIzMF0sXG4gICAgbGlnaHRjb3JhbDogWzI0MCwgMTI4LCAxMjhdLFxuICAgIGxpZ2h0Y3lhbjogWzIyNCwgMjU1LCAyNTVdLFxuICAgIGxpZ2h0Z29sZGVucm9keWVsbG93OiBbMjUwLCAyNTAsIDIxMF0sXG4gICAgbGlnaHRncmF5OiBbMjExLCAyMTEsIDIxMV0sXG4gICAgbGlnaHRncmVlbjogWzE0NCwgMjM4LCAxNDRdLFxuICAgIGxpZ2h0Z3JleTogWzIxMSwgMjExLCAyMTFdLFxuICAgIGxpZ2h0cGluazogWzI1NSwgMTgyLCAxOTNdLFxuICAgIGxpZ2h0c2FsbW9uOiBbMjU1LCAxNjAsIDEyMl0sXG4gICAgbGlnaHRzZWFncmVlbjogWzMyLCAxNzgsIDE3MF0sXG4gICAgbGlnaHRza3libHVlOiBbMTM1LCAyMDYsIDI1MF0sXG4gICAgbGlnaHRzbGF0ZWdyYXk6IFsxMTksIDEzNiwgMTUzXSxcbiAgICBsaWdodHNsYXRlZ3JleTogWzExOSwgMTM2LCAxNTNdLFxuICAgIGxpZ2h0c3RlZWxibHVlOiBbMTc2LCAxOTYsIDIyMl0sXG4gICAgbGlnaHR5ZWxsb3c6IFsyNTUsIDI1NSwgMjI0XSxcbiAgICBsaW1lOiBbMCwgMjU1LCAwXSxcbiAgICBsaW1lZ3JlZW46IFs1MCwgMjA1LCA1MF0sXG4gICAgbGluZW46IFsyNTAsIDI0MCwgMjMwXSxcbiAgICBtYWdlbnRhOiBbMjU1LCAwLCAyNTVdLFxuICAgIG1hcm9vbjogWzEyOCwgMCwgMF0sXG4gICAgbWVkaXVtYXF1YW1hcmluZTogWzEwMiwgMjA1LCAxNzBdLFxuICAgIG1lZGl1bWJsdWU6IFswLCAwLCAyMDVdLFxuICAgIG1lZGl1bW9yY2hpZDogWzE4NiwgODUsIDIxMV0sXG4gICAgbWVkaXVtcHVycGxlOiBbMTQ3LCAxMTIsIDIxOV0sXG4gICAgbWVkaXVtc2VhZ3JlZW46IFs2MCwgMTc5LCAxMTNdLFxuICAgIG1lZGl1bXNsYXRlYmx1ZTogWzEyMywgMTA0LCAyMzhdLFxuICAgIG1lZGl1bXNwcmluZ2dyZWVuOiBbMCwgMjUwLCAxNTRdLFxuICAgIG1lZGl1bXR1cnF1b2lzZTogWzcyLCAyMDksIDIwNF0sXG4gICAgbWVkaXVtdmlvbGV0cmVkOiBbMTk5LCAyMSwgMTMzXSxcbiAgICBtaWRuaWdodGJsdWU6IFsyNSwgMjUsIDExMl0sXG4gICAgbWludGNyZWFtOiBbMjQ1LCAyNTUsIDI1MF0sXG4gICAgbWlzdHlyb3NlOiBbMjU1LCAyMjgsIDIyNV0sXG4gICAgbW9jY2FzaW46IFsyNTUsIDIyOCwgMTgxXSxcbiAgICBuYXZham93aGl0ZTogWzI1NSwgMjIyLCAxNzNdLFxuICAgIG5hdnk6IFswLCAwLCAxMjhdLFxuICAgIG9sZGxhY2U6IFsyNTMsIDI0NSwgMjMwXSxcbiAgICBvbGl2ZTogWzEyOCwgMTI4LCAwXSxcbiAgICBvbGl2ZWRyYWI6IFsxMDcsIDE0MiwgMzVdLFxuICAgIG9yYW5nZTogWzI1NSwgMTY1LCAwXSxcbiAgICBvcmFuZ2VyZWQ6IFsyNTUsIDY5LCAwXSxcbiAgICBvcmNoaWQ6IFsyMTgsIDExMiwgMjE0XSxcbiAgICBwYWxlZ29sZGVucm9kOiBbMjM4LCAyMzIsIDE3MF0sXG4gICAgcGFsZWdyZWVuOiBbMTUyLCAyNTEsIDE1Ml0sXG4gICAgcGFsZXR1cnF1b2lzZTogWzE3NSwgMjM4LCAyMzhdLFxuICAgIHBhbGV2aW9sZXRyZWQ6IFsyMTksIDExMiwgMTQ3XSxcbiAgICBwYXBheWF3aGlwOiBbMjU1LCAyMzksIDIxM10sXG4gICAgcGVhY2hwdWZmOiBbMjU1LCAyMTgsIDE4NV0sXG4gICAgcGVydTogWzIwNSwgMTMzLCA2M10sXG4gICAgcGluazogWzI1NSwgMTkyLCAyMDNdLFxuICAgIHBsdW06IFsyMjEsIDE2MCwgMjAzXSxcbiAgICBwb3dkZXJibHVlOiBbMTc2LCAyMjQsIDIzMF0sXG4gICAgcHVycGxlOiBbMTI4LCAwLCAxMjhdLFxuICAgIHJlYmVjY2FwdXJwbGU6IFsxMDIsIDUxLCAxNTNdLFxuICAgIHJlZDogWzI1NSwgMCwgMF0sXG4gICAgcm9zeWJyb3duOiBbMTg4LCAxNDMsIDE0M10sXG4gICAgcm95YWxibHVlOiBbNjUsIDEwNSwgMjI1XSxcbiAgICBzYWRkbGVicm93bjogWzEzOSwgNjksIDE5XSxcbiAgICBzYWxtb246IFsyNTAsIDEyOCwgMTE0XSxcbiAgICBzYW5keWJyb3duOiBbMjQ0LCAxNjQsIDk2XSxcbiAgICBzZWFncmVlbjogWzQ2LCAxMzksIDg3XSxcbiAgICBzZWFzaGVsbDogWzI1NSwgMjQ1LCAyMzhdLFxuICAgIHNpZW5uYTogWzE2MCwgODIsIDQ1XSxcbiAgICBzaWx2ZXI6IFsxOTIsIDE5MiwgMTkyXSxcbiAgICBza3libHVlOiBbMTM1LCAyMDYsIDIzNV0sXG4gICAgc2xhdGVibHVlOiBbMTA2LCA5MCwgMjA1XSxcbiAgICBzbGF0ZWdyYXk6IFsxMTksIDEyOCwgMTQ0XSxcbiAgICBzbGF0ZWdyZXk6IFsxMTksIDEyOCwgMTQ0XSxcbiAgICBzbm93OiBbMjU1LCAyNTUsIDI1MF0sXG4gICAgc3ByaW5nZ3JlZW46IFswLCAyNTUsIDEyN10sXG4gICAgc3RlZWxibHVlOiBbNzAsIDEzMCwgMTgwXSxcbiAgICB0YW46IFsyMTAsIDE4MCwgMTQwXSxcbiAgICB0ZWFsOiBbMCwgMTI4LCAxMjhdLFxuICAgIHRoaXN0bGU6IFsyMTYsIDE5MSwgMjE2XSxcbiAgICB0cmFuc3BhcmVudDogWzI1NSwgMjU1LCAyNTUsIDBdLFxuICAgIHRvbWF0bzogWzI1NSwgOTksIDcxXSxcbiAgICB0dXJxdW9pc2U6IFs2NCwgMjI0LCAyMDhdLFxuICAgIHZpb2xldDogWzIzOCwgMTMwLCAyMzhdLFxuICAgIHdoZWF0OiBbMjQ1LCAyMjIsIDE3OV0sXG4gICAgd2hpdGU6IFsyNTUsIDI1NSwgMjU1XSxcbiAgICB3aGl0ZXNtb2tlOiBbMjQ1LCAyNDUsIDI0NV0sXG4gICAgeWVsbG93OiBbMjU1LCAyNTUsIDBdLFxuICAgIHllbGxvd2dyZWVuOiBbMTU0LCAyMDUsIDVdXG59LCBSR0JfUkVHRVggPSAvcmdiXFwoKFxcZHsxLDN9KSwoXFxkezEsM30pLChcXGR7MSwzfSlcXCkvLCBhbmltUXVldWUgPSBbXTtcbmV4cG9ydHMuVXRpbCA9IHtcbiAgICBfaXNFbGVtZW50OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09IDEpO1xuICAgIH0sXG4gICAgX2lzRnVuY3Rpb246IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuICEhKG9iaiAmJiBvYmouY29uc3RydWN0b3IgJiYgb2JqLmNhbGwgJiYgb2JqLmFwcGx5KTtcbiAgICB9LFxuICAgIF9pc1BsYWluT2JqZWN0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiAhIW9iaiAmJiBvYmouY29uc3RydWN0b3IgPT09IE9iamVjdDtcbiAgICB9LFxuICAgIF9pc0FycmF5OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gT0JKRUNUX0FSUkFZO1xuICAgIH0sXG4gICAgX2lzTnVtYmVyOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IE9CSkVDVF9OVU1CRVIgJiZcbiAgICAgICAgICAgICFpc05hTihvYmopICYmXG4gICAgICAgICAgICBpc0Zpbml0ZShvYmopKTtcbiAgICB9LFxuICAgIF9pc1N0cmluZzogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IE9CSkVDVF9TVFJJTkc7XG4gICAgfSxcbiAgICBfaXNCb29sZWFuOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gT0JKRUNUX0JPT0xFQU47XG4gICAgfSxcbiAgICBpc09iamVjdDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gdmFsIGluc3RhbmNlb2YgT2JqZWN0O1xuICAgIH0sXG4gICAgaXNWYWxpZFNlbGVjdG9yOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZmlyc3RDaGFyID0gc2VsZWN0b3JbMF07XG4gICAgICAgIHJldHVybiAoZmlyc3RDaGFyID09PSAnIycgfHxcbiAgICAgICAgICAgIGZpcnN0Q2hhciA9PT0gJy4nIHx8XG4gICAgICAgICAgICBmaXJzdENoYXIgPT09IGZpcnN0Q2hhci50b1VwcGVyQ2FzZSgpKTtcbiAgICB9LFxuICAgIF9zaWduOiBmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChudW1iZXIgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVxdWVzdEFuaW1GcmFtZTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGFuaW1RdWV1ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgaWYgKGFuaW1RdWV1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHF1ZXVlID0gYW5pbVF1ZXVlO1xuICAgICAgICAgICAgICAgIGFuaW1RdWV1ZSA9IFtdO1xuICAgICAgICAgICAgICAgIHF1ZXVlLmZvckVhY2goZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY3JlYXRlQ2FudmFzRWxlbWVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjYW52YXMuc3R5bGUgPSBjYW52YXMuc3R5bGUgfHwge307XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICByZXR1cm4gY2FudmFzO1xuICAgIH0sXG4gICAgY3JlYXRlSW1hZ2VFbGVtZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICB9LFxuICAgIF9pc0luRG9jdW1lbnQ6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICB3aGlsZSAoKGVsID0gZWwucGFyZW50Tm9kZSkpIHtcbiAgICAgICAgICAgIGlmIChlbCA9PSBkb2N1bWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIF9zaW1wbGlmeUFycmF5OiBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgIHZhciByZXRBcnIgPSBbXSwgbGVuID0gYXJyLmxlbmd0aCwgdXRpbCA9IGV4cG9ydHMuVXRpbCwgbiwgdmFsO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIHZhbCA9IGFycltuXTtcbiAgICAgICAgICAgIGlmICh1dGlsLl9pc051bWJlcih2YWwpKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gTWF0aC5yb3VuZCh2YWwgKiAxMDAwKSAvIDEwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdXRpbC5faXNTdHJpbmcodmFsKSkge1xuICAgICAgICAgICAgICAgIHZhbCA9IHZhbC50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0QXJyLnB1c2godmFsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0QXJyO1xuICAgIH0sXG4gICAgX3VybFRvSW1hZ2U6IGZ1bmN0aW9uICh1cmwsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpbWFnZU9iaiA9IG5ldyBHbG9iYWxfMS5nbG9iLkltYWdlKCk7XG4gICAgICAgIGltYWdlT2JqLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGltYWdlT2JqKTtcbiAgICAgICAgfTtcbiAgICAgICAgaW1hZ2VPYmouc3JjID0gdXJsO1xuICAgIH0sXG4gICAgX3JnYlRvSGV4OiBmdW5jdGlvbiAociwgZywgYikge1xuICAgICAgICByZXR1cm4gKCgxIDw8IDI0KSArIChyIDw8IDE2KSArIChnIDw8IDgpICsgYikudG9TdHJpbmcoMTYpLnNsaWNlKDEpO1xuICAgIH0sXG4gICAgX2hleFRvUmdiOiBmdW5jdGlvbiAoaGV4KSB7XG4gICAgICAgIGhleCA9IGhleC5yZXBsYWNlKEhBU0gsIEVNUFRZX1NUUklORyk7XG4gICAgICAgIHZhciBiaWdpbnQgPSBwYXJzZUludChoZXgsIDE2KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHI6IChiaWdpbnQgPj4gMTYpICYgMjU1LFxuICAgICAgICAgICAgZzogKGJpZ2ludCA+PiA4KSAmIDI1NSxcbiAgICAgICAgICAgIGI6IGJpZ2ludCAmIDI1NVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0UmFuZG9tQ29sb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJhbmRDb2xvciA9ICgoTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmKSA8PCAwKS50b1N0cmluZygxNik7XG4gICAgICAgIHdoaWxlIChyYW5kQ29sb3IubGVuZ3RoIDwgNikge1xuICAgICAgICAgICAgcmFuZENvbG9yID0gWkVSTyArIHJhbmRDb2xvcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSEFTSCArIHJhbmRDb2xvcjtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gKHZhbCwgZGVmKSB7XG4gICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFJHQjogZnVuY3Rpb24gKGNvbG9yKSB7XG4gICAgICAgIHZhciByZ2I7XG4gICAgICAgIGlmIChjb2xvciBpbiBDT0xPUlMpIHtcbiAgICAgICAgICAgIHJnYiA9IENPTE9SU1tjb2xvcl07XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IHJnYlswXSxcbiAgICAgICAgICAgICAgICBnOiByZ2JbMV0sXG4gICAgICAgICAgICAgICAgYjogcmdiWzJdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbG9yWzBdID09PSBIQVNIKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGV4VG9SZ2IoY29sb3Iuc3Vic3RyaW5nKDEpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2xvci5zdWJzdHIoMCwgNCkgPT09IFJHQl9QQVJFTikge1xuICAgICAgICAgICAgcmdiID0gUkdCX1JFR0VYLmV4ZWMoY29sb3IucmVwbGFjZSgvIC9nLCAnJykpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByOiBwYXJzZUludChyZ2JbMV0sIDEwKSxcbiAgICAgICAgICAgICAgICBnOiBwYXJzZUludChyZ2JbMl0sIDEwKSxcbiAgICAgICAgICAgICAgICBiOiBwYXJzZUludChyZ2JbM10sIDEwKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcjogMCxcbiAgICAgICAgICAgICAgICBnOiAwLFxuICAgICAgICAgICAgICAgIGI6IDBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbG9yVG9SR0JBOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHN0ciA9IHN0ciB8fCAnYmxhY2snO1xuICAgICAgICByZXR1cm4gKGV4cG9ydHMuVXRpbC5fbmFtZWRDb2xvclRvUkJBKHN0cikgfHxcbiAgICAgICAgICAgIGV4cG9ydHMuVXRpbC5faGV4M0NvbG9yVG9SR0JBKHN0cikgfHxcbiAgICAgICAgICAgIGV4cG9ydHMuVXRpbC5faGV4NkNvbG9yVG9SR0JBKHN0cikgfHxcbiAgICAgICAgICAgIGV4cG9ydHMuVXRpbC5fcmdiQ29sb3JUb1JHQkEoc3RyKSB8fFxuICAgICAgICAgICAgZXhwb3J0cy5VdGlsLl9yZ2JhQ29sb3JUb1JHQkEoc3RyKSk7XG4gICAgfSxcbiAgICBfbmFtZWRDb2xvclRvUkJBOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHZhciBjID0gQ09MT1JTW3N0ci50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgaWYgKCFjKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcjogY1swXSxcbiAgICAgICAgICAgIGc6IGNbMV0sXG4gICAgICAgICAgICBiOiBjWzJdLFxuICAgICAgICAgICAgYTogMVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgX3JnYkNvbG9yVG9SR0JBOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIGlmIChzdHIuaW5kZXhPZigncmdiKCcpID09PSAwKSB7XG4gICAgICAgICAgICBzdHIgPSBzdHIubWF0Y2goL3JnYlxcKChbXildKylcXCkvKVsxXTtcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvICosICovKS5tYXAoTnVtYmVyKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcjogcGFydHNbMF0sXG4gICAgICAgICAgICAgICAgZzogcGFydHNbMV0sXG4gICAgICAgICAgICAgICAgYjogcGFydHNbMl0sXG4gICAgICAgICAgICAgICAgYTogMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX3JnYmFDb2xvclRvUkdCQTogZnVuY3Rpb24gKHN0cikge1xuICAgICAgICBpZiAoc3RyLmluZGV4T2YoJ3JnYmEoJykgPT09IDApIHtcbiAgICAgICAgICAgIHN0ciA9IHN0ci5tYXRjaCgvcmdiYVxcKChbXildKylcXCkvKVsxXTtcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvICosICovKS5tYXAoTnVtYmVyKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcjogcGFydHNbMF0sXG4gICAgICAgICAgICAgICAgZzogcGFydHNbMV0sXG4gICAgICAgICAgICAgICAgYjogcGFydHNbMl0sXG4gICAgICAgICAgICAgICAgYTogcGFydHNbM11cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9oZXg2Q29sb3JUb1JHQkE6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgaWYgKHN0clswXSA9PT0gJyMnICYmIHN0ci5sZW5ndGggPT09IDcpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcjogcGFyc2VJbnQoc3RyLnNsaWNlKDEsIDMpLCAxNiksXG4gICAgICAgICAgICAgICAgZzogcGFyc2VJbnQoc3RyLnNsaWNlKDMsIDUpLCAxNiksXG4gICAgICAgICAgICAgICAgYjogcGFyc2VJbnQoc3RyLnNsaWNlKDUsIDcpLCAxNiksXG4gICAgICAgICAgICAgICAgYTogMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2hleDNDb2xvclRvUkdCQTogZnVuY3Rpb24gKHN0cikge1xuICAgICAgICBpZiAoc3RyWzBdID09PSAnIycgJiYgc3RyLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByOiBwYXJzZUludChzdHJbMV0gKyBzdHJbMV0sIDE2KSxcbiAgICAgICAgICAgICAgICBnOiBwYXJzZUludChzdHJbMl0gKyBzdHJbMl0sIDE2KSxcbiAgICAgICAgICAgICAgICBiOiBwYXJzZUludChzdHJbM10gKyBzdHJbM10sIDE2KSxcbiAgICAgICAgICAgICAgICBhOiAxXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBoYXZlSW50ZXJzZWN0aW9uOiBmdW5jdGlvbiAocjEsIHIyKSB7XG4gICAgICAgIHJldHVybiAhKHIyLnggPiByMS54ICsgcjEud2lkdGggfHxcbiAgICAgICAgICAgIHIyLnggKyByMi53aWR0aCA8IHIxLnggfHxcbiAgICAgICAgICAgIHIyLnkgPiByMS55ICsgcjEuaGVpZ2h0IHx8XG4gICAgICAgICAgICByMi55ICsgcjIuaGVpZ2h0IDwgcjEueSk7XG4gICAgfSxcbiAgICBjbG9uZU9iamVjdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB2YXIgcmV0T2JqID0ge307XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc1BsYWluT2JqZWN0KG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgIHJldE9ialtrZXldID0gdGhpcy5jbG9uZU9iamVjdChvYmpba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9pc0FycmF5KG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgIHJldE9ialtrZXldID0gdGhpcy5jbG9uZUFycmF5KG9ialtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldE9ialtrZXldID0gb2JqW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldE9iajtcbiAgICB9LFxuICAgIGNsb25lQXJyYXk6IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgcmV0dXJuIGFyci5zbGljZSgwKTtcbiAgICB9LFxuICAgIF9kZWdUb1JhZDogZnVuY3Rpb24gKGRlZykge1xuICAgICAgICByZXR1cm4gZGVnICogUElfT1ZFUl9ERUcxODA7XG4gICAgfSxcbiAgICBfcmFkVG9EZWc6IGZ1bmN0aW9uIChyYWQpIHtcbiAgICAgICAgcmV0dXJuIHJhZCAqIERFRzE4MF9PVkVSX1BJO1xuICAgIH0sXG4gICAgX2NhcGl0YWxpemU6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbiAgICB9LFxuICAgIHRocm93OiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihLT05WQV9FUlJPUiArIHN0cik7XG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gKHN0cikge1xuICAgICAgICBjb25zb2xlLmVycm9yKEtPTlZBX0VSUk9SICsgc3RyKTtcbiAgICB9LFxuICAgIHdhcm46IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgaWYgKCFHbG9iYWxfMS5Lb252YS5zaG93V2FybmluZ3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLndhcm4oS09OVkFfV0FSTklORyArIHN0cik7XG4gICAgfSxcbiAgICBleHRlbmQ6IGZ1bmN0aW9uIChjaGlsZCwgcGFyZW50KSB7XG4gICAgICAgIGZ1bmN0aW9uIEN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgICAgQ3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xuICAgICAgICB2YXIgb2xkUHJvdG8gPSBjaGlsZC5wcm90b3R5cGU7XG4gICAgICAgIGNoaWxkLnByb3RvdHlwZSA9IG5ldyBDdG9yKCk7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvbGRQcm90bykge1xuICAgICAgICAgICAgaWYgKG9sZFByb3RvLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5wcm90b3R5cGVba2V5XSA9IG9sZFByb3RvW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTtcbiAgICAgICAgY2hpbGQuc3VwZXIgPSBwYXJlbnQ7XG4gICAgfSxcbiAgICBfZ2V0Q29udHJvbFBvaW50czogZnVuY3Rpb24gKHgwLCB5MCwgeDEsIHkxLCB4MiwgeTIsIHQpIHtcbiAgICAgICAgdmFyIGQwMSA9IE1hdGguc3FydChNYXRoLnBvdyh4MSAtIHgwLCAyKSArIE1hdGgucG93KHkxIC0geTAsIDIpKSwgZDEyID0gTWF0aC5zcXJ0KE1hdGgucG93KHgyIC0geDEsIDIpICsgTWF0aC5wb3coeTIgLSB5MSwgMikpLCBmYSA9ICh0ICogZDAxKSAvIChkMDEgKyBkMTIpLCBmYiA9ICh0ICogZDEyKSAvIChkMDEgKyBkMTIpLCBwMXggPSB4MSAtIGZhICogKHgyIC0geDApLCBwMXkgPSB5MSAtIGZhICogKHkyIC0geTApLCBwMnggPSB4MSArIGZiICogKHgyIC0geDApLCBwMnkgPSB5MSArIGZiICogKHkyIC0geTApO1xuICAgICAgICByZXR1cm4gW3AxeCwgcDF5LCBwMngsIHAyeV07XG4gICAgfSxcbiAgICBfZXhwYW5kUG9pbnRzOiBmdW5jdGlvbiAocCwgdGVuc2lvbikge1xuICAgICAgICB2YXIgbGVuID0gcC5sZW5ndGgsIGFsbFBvaW50cyA9IFtdLCBuLCBjcDtcbiAgICAgICAgZm9yIChuID0gMjsgbiA8IGxlbiAtIDI7IG4gKz0gMikge1xuICAgICAgICAgICAgY3AgPSBleHBvcnRzLlV0aWwuX2dldENvbnRyb2xQb2ludHMocFtuIC0gMl0sIHBbbiAtIDFdLCBwW25dLCBwW24gKyAxXSwgcFtuICsgMl0sIHBbbiArIDNdLCB0ZW5zaW9uKTtcbiAgICAgICAgICAgIGFsbFBvaW50cy5wdXNoKGNwWzBdKTtcbiAgICAgICAgICAgIGFsbFBvaW50cy5wdXNoKGNwWzFdKTtcbiAgICAgICAgICAgIGFsbFBvaW50cy5wdXNoKHBbbl0pO1xuICAgICAgICAgICAgYWxsUG9pbnRzLnB1c2gocFtuICsgMV0pO1xuICAgICAgICAgICAgYWxsUG9pbnRzLnB1c2goY3BbMl0pO1xuICAgICAgICAgICAgYWxsUG9pbnRzLnB1c2goY3BbM10pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhbGxQb2ludHM7XG4gICAgfSxcbiAgICBlYWNoOiBmdW5jdGlvbiAob2JqLCBmdW5jKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGZ1bmMoa2V5LCBvYmpba2V5XSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9pblJhbmdlOiBmdW5jdGlvbiAodmFsLCBsZWZ0LCByaWdodCkge1xuICAgICAgICByZXR1cm4gbGVmdCA8PSB2YWwgJiYgdmFsIDwgcmlnaHQ7XG4gICAgfSxcbiAgICBfZ2V0UHJvamVjdGlvblRvU2VnbWVudDogZnVuY3Rpb24gKHgxLCB5MSwgeDIsIHkyLCB4MywgeTMpIHtcbiAgICAgICAgdmFyIHgsIHksIGRpc3Q7XG4gICAgICAgIHZhciBwZDIgPSAoeDEgLSB4MikgKiAoeDEgLSB4MikgKyAoeTEgLSB5MikgKiAoeTEgLSB5Mik7XG4gICAgICAgIGlmIChwZDIgPT0gMCkge1xuICAgICAgICAgICAgeCA9IHgxO1xuICAgICAgICAgICAgeSA9IHkxO1xuICAgICAgICAgICAgZGlzdCA9ICh4MyAtIHgyKSAqICh4MyAtIHgyKSArICh5MyAtIHkyKSAqICh5MyAtIHkyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciB1ID0gKCh4MyAtIHgxKSAqICh4MiAtIHgxKSArICh5MyAtIHkxKSAqICh5MiAtIHkxKSkgLyBwZDI7XG4gICAgICAgICAgICBpZiAodSA8IDApIHtcbiAgICAgICAgICAgICAgICB4ID0geDE7XG4gICAgICAgICAgICAgICAgeSA9IHkxO1xuICAgICAgICAgICAgICAgIGRpc3QgPSAoeDEgLSB4MykgKiAoeDEgLSB4MykgKyAoeTEgLSB5MykgKiAoeTEgLSB5Myk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh1ID4gMS4wKSB7XG4gICAgICAgICAgICAgICAgeCA9IHgyO1xuICAgICAgICAgICAgICAgIHkgPSB5MjtcbiAgICAgICAgICAgICAgICBkaXN0ID0gKHgyIC0geDMpICogKHgyIC0geDMpICsgKHkyIC0geTMpICogKHkyIC0geTMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgeCA9IHgxICsgdSAqICh4MiAtIHgxKTtcbiAgICAgICAgICAgICAgICB5ID0geTEgKyB1ICogKHkyIC0geTEpO1xuICAgICAgICAgICAgICAgIGRpc3QgPSAoeCAtIHgzKSAqICh4IC0geDMpICsgKHkgLSB5MykgKiAoeSAtIHkzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3gsIHksIGRpc3RdO1xuICAgIH0sXG4gICAgX2dldFByb2plY3Rpb25Ub0xpbmU6IGZ1bmN0aW9uIChwdCwgbGluZSwgaXNDbG9zZWQpIHtcbiAgICAgICAgdmFyIHBjID0gZXhwb3J0cy5VdGlsLmNsb25lT2JqZWN0KHB0KTtcbiAgICAgICAgdmFyIGRpc3QgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICBsaW5lLmZvckVhY2goZnVuY3Rpb24gKHAxLCBpKSB7XG4gICAgICAgICAgICBpZiAoIWlzQ2xvc2VkICYmIGkgPT09IGxpbmUubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwMiA9IGxpbmVbKGkgKyAxKSAlIGxpbmUubGVuZ3RoXTtcbiAgICAgICAgICAgIHZhciBwcm9qID0gZXhwb3J0cy5VdGlsLl9nZXRQcm9qZWN0aW9uVG9TZWdtZW50KHAxLngsIHAxLnksIHAyLngsIHAyLnksIHB0LngsIHB0LnkpO1xuICAgICAgICAgICAgdmFyIHB4ID0gcHJvalswXSwgcHkgPSBwcm9qWzFdLCBwZGlzdCA9IHByb2pbMl07XG4gICAgICAgICAgICBpZiAocGRpc3QgPCBkaXN0KSB7XG4gICAgICAgICAgICAgICAgcGMueCA9IHB4O1xuICAgICAgICAgICAgICAgIHBjLnkgPSBweTtcbiAgICAgICAgICAgICAgICBkaXN0ID0gcGRpc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGM7XG4gICAgfSxcbiAgICBfcHJlcGFyZUFycmF5Rm9yVHdlZW46IGZ1bmN0aW9uIChzdGFydEFycmF5LCBlbmRBcnJheSwgaXNDbG9zZWQpIHtcbiAgICAgICAgdmFyIG4sIHN0YXJ0ID0gW10sIGVuZCA9IFtdO1xuICAgICAgICBpZiAoc3RhcnRBcnJheS5sZW5ndGggPiBlbmRBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciB0ZW1wID0gZW5kQXJyYXk7XG4gICAgICAgICAgICBlbmRBcnJheSA9IHN0YXJ0QXJyYXk7XG4gICAgICAgICAgICBzdGFydEFycmF5ID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgc3RhcnRBcnJheS5sZW5ndGg7IG4gKz0gMikge1xuICAgICAgICAgICAgc3RhcnQucHVzaCh7XG4gICAgICAgICAgICAgICAgeDogc3RhcnRBcnJheVtuXSxcbiAgICAgICAgICAgICAgICB5OiBzdGFydEFycmF5W24gKyAxXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGVuZEFycmF5Lmxlbmd0aDsgbiArPSAyKSB7XG4gICAgICAgICAgICBlbmQucHVzaCh7XG4gICAgICAgICAgICAgICAgeDogZW5kQXJyYXlbbl0sXG4gICAgICAgICAgICAgICAgeTogZW5kQXJyYXlbbiArIDFdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3U3RhcnQgPSBbXTtcbiAgICAgICAgZW5kLmZvckVhY2goZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgICAgICB2YXIgcHIgPSBleHBvcnRzLlV0aWwuX2dldFByb2plY3Rpb25Ub0xpbmUocG9pbnQsIHN0YXJ0LCBpc0Nsb3NlZCk7XG4gICAgICAgICAgICBuZXdTdGFydC5wdXNoKHByLngpO1xuICAgICAgICAgICAgbmV3U3RhcnQucHVzaChwci55KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXdTdGFydDtcbiAgICB9LFxuICAgIF9wcmVwYXJlVG9TdHJpbmdpZnk6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgdmFyIGRlc2M7XG4gICAgICAgIG9iai52aXNpdGVkQnlDaXJjdWxhclJlZmVyZW5jZVJlbW92YWwgPSB0cnVlO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoIShvYmouaGFzT3duUHJvcGVydHkoa2V5KSAmJiBvYmpba2V5XSAmJiB0eXBlb2Ygb2JqW2tleV0gPT0gJ29iamVjdCcpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgICAgICBpZiAob2JqW2tleV0udmlzaXRlZEJ5Q2lyY3VsYXJSZWZlcmVuY2VSZW1vdmFsIHx8XG4gICAgICAgICAgICAgICAgZXhwb3J0cy5VdGlsLl9pc0VsZW1lbnQob2JqW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlc2MuY29uZmlndXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmpba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGV4cG9ydHMuVXRpbC5fcHJlcGFyZVRvU3RyaW5naWZ5KG9ialtrZXldKSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChkZXNjLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIG9iai52aXNpdGVkQnlDaXJjdWxhclJlZmVyZW5jZVJlbW92YWw7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfSxcbiAgICBfYXNzaWduOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBHbG9iYWxfMSA9IHJlcXVpcmUoXCIuL0dsb2JhbFwiKTtcbnZhciBVdGlsXzEgPSByZXF1aXJlKFwiLi9VdGlsXCIpO1xuZnVuY3Rpb24gX2Zvcm1hdFZhbHVlKHZhbCkge1xuICAgIGlmIChVdGlsXzEuVXRpbC5faXNTdHJpbmcodmFsKSkge1xuICAgICAgICByZXR1cm4gJ1wiJyArIHZhbCArICdcIic7XG4gICAgfVxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgTnVtYmVyXScpIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG4gICAgaWYgKFV0aWxfMS5VdGlsLl9pc0Jvb2xlYW4odmFsKSkge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCk7XG59XG5mdW5jdGlvbiBSR0JDb21wb25lbnQodmFsKSB7XG4gICAgaWYgKHZhbCA+IDI1NSkge1xuICAgICAgICByZXR1cm4gMjU1O1xuICAgIH1cbiAgICBlbHNlIGlmICh2YWwgPCAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWwpO1xufVxuZXhwb3J0cy5SR0JDb21wb25lbnQgPSBSR0JDb21wb25lbnQ7XG5mdW5jdGlvbiBhbHBoYUNvbXBvbmVudCh2YWwpIHtcbiAgICBpZiAodmFsID4gMSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgZWxzZSBpZiAodmFsIDwgMC4wMDAxKSB7XG4gICAgICAgIHJldHVybiAwLjAwMDE7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG59XG5leHBvcnRzLmFscGhhQ29tcG9uZW50ID0gYWxwaGFDb21wb25lbnQ7XG5mdW5jdGlvbiBnZXROdW1iZXJWYWxpZGF0b3IoKSB7XG4gICAgaWYgKEdsb2JhbF8xLktvbnZhLmlzVW5taW5pZmllZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCwgYXR0cikge1xuICAgICAgICAgICAgaWYgKCFVdGlsXzEuVXRpbC5faXNOdW1iZXIodmFsKSkge1xuICAgICAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oX2Zvcm1hdFZhbHVlKHZhbCkgK1xuICAgICAgICAgICAgICAgICAgICAnIGlzIGEgbm90IHZhbGlkIHZhbHVlIGZvciBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRyICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGF0dHJpYnV0ZS4gVGhlIHZhbHVlIHNob3VsZCBiZSBhIG51bWJlci4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5nZXROdW1iZXJWYWxpZGF0b3IgPSBnZXROdW1iZXJWYWxpZGF0b3I7XG5mdW5jdGlvbiBnZXROdW1iZXJPckF1dG9WYWxpZGF0b3IoKSB7XG4gICAgaWYgKEdsb2JhbF8xLktvbnZhLmlzVW5taW5pZmllZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCwgYXR0cikge1xuICAgICAgICAgICAgdmFyIGlzTnVtYmVyID0gVXRpbF8xLlV0aWwuX2lzTnVtYmVyKHZhbCk7XG4gICAgICAgICAgICB2YXIgaXNBdXRvID0gdmFsID09PSAnYXV0byc7XG4gICAgICAgICAgICBpZiAoIShpc051bWJlciB8fCBpc0F1dG8pKSB7XG4gICAgICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybihfZm9ybWF0VmFsdWUodmFsKSArXG4gICAgICAgICAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgc2hvdWxkIGJlIGEgbnVtYmVyIG9yIFwiYXV0b1wiLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLmdldE51bWJlck9yQXV0b1ZhbGlkYXRvciA9IGdldE51bWJlck9yQXV0b1ZhbGlkYXRvcjtcbmZ1bmN0aW9uIGdldFN0cmluZ1ZhbGlkYXRvcigpIHtcbiAgICBpZiAoR2xvYmFsXzEuS29udmEuaXNVbm1pbmlmaWVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgICBpZiAoIVV0aWxfMS5VdGlsLl9pc1N0cmluZyh2YWwpKSB7XG4gICAgICAgICAgICAgICAgVXRpbF8xLlV0aWwud2FybihfZm9ybWF0VmFsdWUodmFsKSArXG4gICAgICAgICAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgc2hvdWxkIGJlIGEgc3RyaW5nLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLmdldFN0cmluZ1ZhbGlkYXRvciA9IGdldFN0cmluZ1ZhbGlkYXRvcjtcbmZ1bmN0aW9uIGdldEZ1bmN0aW9uVmFsaWRhdG9yKCkge1xuICAgIGlmIChHbG9iYWxfMS5Lb252YS5pc1VubWluaWZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIGF0dHIpIHtcbiAgICAgICAgICAgIGlmICghVXRpbF8xLlV0aWwuX2lzRnVuY3Rpb24odmFsKSkge1xuICAgICAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oX2Zvcm1hdFZhbHVlKHZhbCkgK1xuICAgICAgICAgICAgICAgICAgICAnIGlzIGEgbm90IHZhbGlkIHZhbHVlIGZvciBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRyICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGF0dHJpYnV0ZS4gVGhlIHZhbHVlIHNob3VsZCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLmdldEZ1bmN0aW9uVmFsaWRhdG9yID0gZ2V0RnVuY3Rpb25WYWxpZGF0b3I7XG5mdW5jdGlvbiBnZXROdW1iZXJBcnJheVZhbGlkYXRvcigpIHtcbiAgICBpZiAoR2xvYmFsXzEuS29udmEuaXNVbm1pbmlmaWVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgICBpZiAoIVV0aWxfMS5VdGlsLl9pc0FycmF5KHZhbCkpIHtcbiAgICAgICAgICAgICAgICBVdGlsXzEuVXRpbC53YXJuKF9mb3JtYXRWYWx1ZSh2YWwpICtcbiAgICAgICAgICAgICAgICAgICAgJyBpcyBhIG5vdCB2YWxpZCB2YWx1ZSBmb3IgXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ciArXG4gICAgICAgICAgICAgICAgICAgICdcIiBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBzaG91bGQgYmUgYSBhcnJheSBvZiBudW1iZXJzLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFVdGlsXzEuVXRpbC5faXNOdW1iZXIoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oJ1wiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ciArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiIGF0dHJpYnV0ZSBoYXMgbm9uIG51bWVyaWMgZWxlbWVudCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLiBNYWtlIHN1cmUgdGhhdCBhbGwgZWxlbWVudHMgYXJlIG51bWJlcnMuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5nZXROdW1iZXJBcnJheVZhbGlkYXRvciA9IGdldE51bWJlckFycmF5VmFsaWRhdG9yO1xuZnVuY3Rpb24gZ2V0Qm9vbGVhblZhbGlkYXRvcigpIHtcbiAgICBpZiAoR2xvYmFsXzEuS29udmEuaXNVbm1pbmlmaWVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgICB2YXIgaXNCb29sID0gdmFsID09PSB0cnVlIHx8IHZhbCA9PT0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIWlzQm9vbCkge1xuICAgICAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oX2Zvcm1hdFZhbHVlKHZhbCkgK1xuICAgICAgICAgICAgICAgICAgICAnIGlzIGEgbm90IHZhbGlkIHZhbHVlIGZvciBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRyICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGF0dHJpYnV0ZS4gVGhlIHZhbHVlIHNob3VsZCBiZSBhIGJvb2xlYW4uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0Qm9vbGVhblZhbGlkYXRvciA9IGdldEJvb2xlYW5WYWxpZGF0b3I7XG5mdW5jdGlvbiBnZXRDb21wb25lbnRWYWxpZGF0b3IoY29tcG9uZW50cykge1xuICAgIGlmIChHbG9iYWxfMS5Lb252YS5pc1VubWluaWZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIGF0dHIpIHtcbiAgICAgICAgICAgIGlmICghVXRpbF8xLlV0aWwuaXNPYmplY3QodmFsKSkge1xuICAgICAgICAgICAgICAgIFV0aWxfMS5VdGlsLndhcm4oX2Zvcm1hdFZhbHVlKHZhbCkgK1xuICAgICAgICAgICAgICAgICAgICAnIGlzIGEgbm90IHZhbGlkIHZhbHVlIGZvciBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRyICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGF0dHJpYnV0ZS4gVGhlIHZhbHVlIHNob3VsZCBiZSBhbiBvYmplY3Qgd2l0aCBwcm9wZXJ0aWVzICcgK1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5nZXRDb21wb25lbnRWYWxpZGF0b3IgPSBnZXRDb21wb25lbnRWYWxpZGF0b3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFV0aWxfMSA9IHJlcXVpcmUoXCIuLi9VdGlsXCIpO1xudmFyIEZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuLi9GYWN0b3J5XCIpO1xudmFyIFNoYXBlXzEgPSByZXF1aXJlKFwiLi4vU2hhcGVcIik7XG52YXIgVmFsaWRhdG9yc18xID0gcmVxdWlyZShcIi4uL1ZhbGlkYXRvcnNcIik7XG52YXIgR2xvYmFsXzEgPSByZXF1aXJlKFwiLi4vR2xvYmFsXCIpO1xudmFyIENpcmNsZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENpcmNsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDaXJjbGUoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgQ2lyY2xlLnByb3RvdHlwZS5fc2NlbmVGdW5jID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5hcmMoMCwgMCwgdGhpcy5yYWRpdXMoKSwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3Ryb2tlU2hhcGUodGhpcyk7XG4gICAgfTtcbiAgICBDaXJjbGUucHJvdG90eXBlLmdldFdpZHRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yYWRpdXMoKSAqIDI7XG4gICAgfTtcbiAgICBDaXJjbGUucHJvdG90eXBlLmdldEhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFkaXVzKCkgKiAyO1xuICAgIH07XG4gICAgQ2lyY2xlLnByb3RvdHlwZS5zZXRXaWR0aCA9IGZ1bmN0aW9uICh3aWR0aCkge1xuICAgICAgICBpZiAodGhpcy5yYWRpdXMoKSAhPT0gd2lkdGggLyAyKSB7XG4gICAgICAgICAgICB0aGlzLnJhZGl1cyh3aWR0aCAvIDIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDaXJjbGUucHJvdG90eXBlLnNldEhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQpIHtcbiAgICAgICAgaWYgKHRoaXMucmFkaXVzKCkgIT09IGhlaWdodCAvIDIpIHtcbiAgICAgICAgICAgIHRoaXMucmFkaXVzKGhlaWdodCAvIDIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ2lyY2xlO1xufShTaGFwZV8xLlNoYXBlKSk7XG5leHBvcnRzLkNpcmNsZSA9IENpcmNsZTtcbkNpcmNsZS5wcm90b3R5cGUuX2NlbnRyb2lkID0gdHJ1ZTtcbkNpcmNsZS5wcm90b3R5cGUuY2xhc3NOYW1lID0gJ0NpcmNsZSc7XG5DaXJjbGUucHJvdG90eXBlLl9hdHRyc0FmZmVjdGluZ1NpemUgPSBbJ3JhZGl1cyddO1xuR2xvYmFsXzEuX3JlZ2lzdGVyTm9kZShDaXJjbGUpO1xuRmFjdG9yeV8xLkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKENpcmNsZSwgJ3JhZGl1cycsIDAsIFZhbGlkYXRvcnNfMS5nZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5VdGlsXzEuQ29sbGVjdGlvbi5tYXBNZXRob2RzKENpcmNsZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFV0aWxfMSA9IHJlcXVpcmUoXCIuLi9VdGlsXCIpO1xudmFyIEZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuLi9GYWN0b3J5XCIpO1xudmFyIFNoYXBlXzEgPSByZXF1aXJlKFwiLi4vU2hhcGVcIik7XG52YXIgVmFsaWRhdG9yc18xID0gcmVxdWlyZShcIi4uL1ZhbGlkYXRvcnNcIik7XG52YXIgR2xvYmFsXzEgPSByZXF1aXJlKFwiLi4vR2xvYmFsXCIpO1xudmFyIFJlY3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJlY3QoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgUmVjdC5wcm90b3R5cGUuX3NjZW5lRnVuYyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHZhciBjb3JuZXJSYWRpdXMgPSB0aGlzLmNvcm5lclJhZGl1cygpLCB3aWR0aCA9IHRoaXMud2lkdGgoKSwgaGVpZ2h0ID0gdGhpcy5oZWlnaHQoKTtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgaWYgKCFjb3JuZXJSYWRpdXMpIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvcm5lclJhZGl1cyA9IE1hdGgubWluKGNvcm5lclJhZGl1cywgd2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKGNvcm5lclJhZGl1cywgMCk7XG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyh3aWR0aCAtIGNvcm5lclJhZGl1cywgMCk7XG4gICAgICAgICAgICBjb250ZXh0LmFyYyh3aWR0aCAtIGNvcm5lclJhZGl1cywgY29ybmVyUmFkaXVzLCBjb3JuZXJSYWRpdXMsIChNYXRoLlBJICogMykgLyAyLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyh3aWR0aCwgaGVpZ2h0IC0gY29ybmVyUmFkaXVzKTtcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKHdpZHRoIC0gY29ybmVyUmFkaXVzLCBoZWlnaHQgLSBjb3JuZXJSYWRpdXMsIGNvcm5lclJhZGl1cywgMCwgTWF0aC5QSSAvIDIsIGZhbHNlKTtcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKGNvcm5lclJhZGl1cywgaGVpZ2h0KTtcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKGNvcm5lclJhZGl1cywgaGVpZ2h0IC0gY29ybmVyUmFkaXVzLCBjb3JuZXJSYWRpdXMsIE1hdGguUEkgLyAyLCBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbygwLCBjb3JuZXJSYWRpdXMpO1xuICAgICAgICAgICAgY29udGV4dC5hcmMoY29ybmVyUmFkaXVzLCBjb3JuZXJSYWRpdXMsIGNvcm5lclJhZGl1cywgTWF0aC5QSSwgKE1hdGguUEkgKiAzKSAvIDIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHJva2VTaGFwZSh0aGlzKTtcbiAgICB9O1xuICAgIHJldHVybiBSZWN0O1xufShTaGFwZV8xLlNoYXBlKSk7XG5leHBvcnRzLlJlY3QgPSBSZWN0O1xuUmVjdC5wcm90b3R5cGUuY2xhc3NOYW1lID0gJ1JlY3QnO1xuR2xvYmFsXzEuX3JlZ2lzdGVyTm9kZShSZWN0KTtcbkZhY3RvcnlfMS5GYWN0b3J5LmFkZEdldHRlclNldHRlcihSZWN0LCAnY29ybmVyUmFkaXVzJywgMCwgVmFsaWRhdG9yc18xLmdldE51bWJlclZhbGlkYXRvcigpKTtcblV0aWxfMS5Db2xsZWN0aW9uLm1hcE1ldGhvZHMoUmVjdCk7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIGdldFJhd1RhZyA9IHJlcXVpcmUoJy4vX2dldFJhd1RhZycpLFxuICAgIG9iamVjdFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fb2JqZWN0VG9TdHJpbmcnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUdldFRhZztcbiIsIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnJlZUdsb2JhbDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFJhd1RhZztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdFRvU3RyaW5nO1xuIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb290O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIG5vdyA9IHJlcXVpcmUoJy4vbm93JyksXG4gICAgdG9OdW1iZXIgPSByZXF1aXJlKCcuL3RvTnVtYmVyJyk7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heCxcbiAgICBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGVsYXlzIGludm9raW5nIGBmdW5jYCB1bnRpbCBhZnRlciBgd2FpdGBcbiAqIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdhc1xuICogaW52b2tlZC4gVGhlIGRlYm91bmNlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGAgbWV0aG9kIHRvIGNhbmNlbFxuICogZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG8gaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uXG4gKiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGVcbiAqIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgXG4gKiBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLmRlYm91bmNlYCBhbmQgYF8udGhyb3R0bGVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz1mYWxzZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4V2FpdF1cbiAqICBUaGUgbWF4aW11bSB0aW1lIGBmdW5jYCBpcyBhbGxvd2VkIHRvIGJlIGRlbGF5ZWQgYmVmb3JlIGl0J3MgaW52b2tlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBjb3N0bHkgY2FsY3VsYXRpb25zIHdoaWxlIHRoZSB3aW5kb3cgc2l6ZSBpcyBpbiBmbHV4LlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAxNTApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHNlbmRNYWlsYCB3aGVuIGNsaWNrZWQsIGRlYm91bmNpbmcgc3Vic2VxdWVudCBjYWxscy5cbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCBfLmRlYm91bmNlKHNlbmRNYWlsLCAzMDAsIHtcbiAqICAgJ2xlYWRpbmcnOiB0cnVlLFxuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSkpO1xuICpcbiAqIC8vIEVuc3VyZSBgYmF0Y2hMb2dgIGlzIGludm9rZWQgb25jZSBhZnRlciAxIHNlY29uZCBvZiBkZWJvdW5jZWQgY2FsbHMuXG4gKiB2YXIgZGVib3VuY2VkID0gXy5kZWJvdW5jZShiYXRjaExvZywgMjUwLCB7ICdtYXhXYWl0JzogMTAwMCB9KTtcbiAqIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9zdHJlYW0nKTtcbiAqIGpRdWVyeShzb3VyY2UpLm9uKCdtZXNzYWdlJywgZGVib3VuY2VkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIGRlYm91bmNlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgZGVib3VuY2VkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxhc3RBcmdzLFxuICAgICAgbGFzdFRoaXMsXG4gICAgICBtYXhXYWl0LFxuICAgICAgcmVzdWx0LFxuICAgICAgdGltZXJJZCxcbiAgICAgIGxhc3RDYWxsVGltZSxcbiAgICAgIGxhc3RJbnZva2VUaW1lID0gMCxcbiAgICAgIGxlYWRpbmcgPSBmYWxzZSxcbiAgICAgIG1heGluZyA9IGZhbHNlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHdhaXQgPSB0b051bWJlcih3YWl0KSB8fCAwO1xuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gISFvcHRpb25zLmxlYWRpbmc7XG4gICAgbWF4aW5nID0gJ21heFdhaXQnIGluIG9wdGlvbnM7XG4gICAgbWF4V2FpdCA9IG1heGluZyA/IG5hdGl2ZU1heCh0b051bWJlcihvcHRpb25zLm1heFdhaXQpIHx8IDAsIHdhaXQpIDogbWF4V2FpdDtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRnVuYyh0aW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBsYXN0QXJncyxcbiAgICAgICAgdGhpc0FyZyA9IGxhc3RUaGlzO1xuXG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xuICAgIC8vIFJlc2V0IGFueSBgbWF4V2FpdGAgdGltZXIuXG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAvLyBJbnZva2UgdGhlIGxlYWRpbmcgZWRnZS5cbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lLFxuICAgICAgICB0aW1lV2FpdGluZyA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmdcbiAgICAgID8gbmF0aXZlTWluKHRpbWVXYWl0aW5nLCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSlcbiAgICAgIDogdGltZVdhaXRpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3ltYm9sO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKlxuICogR2V0cyB0aGUgdGltZXN0YW1wIG9mIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlXG4gKiB0aGUgVW5peCBlcG9jaCAoMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgRGF0ZVxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdGltZXN0YW1wLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmVyKGZ1bmN0aW9uKHN0YW1wKSB7XG4gKiAgIGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7XG4gKiB9LCBfLm5vdygpKTtcbiAqIC8vID0+IExvZ3MgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdG9vayBmb3IgdGhlIGRlZmVycmVkIGludm9jYXRpb24uXG4gKi9cbnZhciBub3cgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHJvb3QuRGF0ZS5ub3coKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbm93O1xuIiwidmFyIGRlYm91bmNlID0gcmVxdWlyZSgnLi9kZWJvdW5jZScpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSB0aHJvdHRsZWQgZnVuY3Rpb24gdGhhdCBvbmx5IGludm9rZXMgYGZ1bmNgIGF0IG1vc3Qgb25jZSBwZXJcbiAqIGV2ZXJ5IGB3YWl0YCBtaWxsaXNlY29uZHMuIFRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgXG4gKiBtZXRob2QgdG8gY2FuY2VsIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvXG4gKiBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS4gUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2BcbiAqIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZSBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGBcbiAqIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZCB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGVcbiAqIHRocm90dGxlZCBmdW5jdGlvbi4gU3Vic2VxdWVudCBjYWxscyB0byB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uIHJldHVybiB0aGVcbiAqIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2AgaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIHRocm90dGxlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy50aHJvdHRsZWAgYW5kIGBfLmRlYm91bmNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHRocm90dGxlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHRocm90dGxlIGludm9jYXRpb25zIHRvLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHRocm90dGxlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgZXhjZXNzaXZlbHkgdXBkYXRpbmcgdGhlIHBvc2l0aW9uIHdoaWxlIHNjcm9sbGluZy5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdzY3JvbGwnLCBfLnRocm90dGxlKHVwZGF0ZVBvc2l0aW9uLCAxMDApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHJlbmV3VG9rZW5gIHdoZW4gdGhlIGNsaWNrIGV2ZW50IGlzIGZpcmVkLCBidXQgbm90IG1vcmUgdGhhbiBvbmNlIGV2ZXJ5IDUgbWludXRlcy5cbiAqIHZhciB0aHJvdHRsZWQgPSBfLnRocm90dGxlKHJlbmV3VG9rZW4sIDMwMDAwMCwgeyAndHJhaWxpbmcnOiBmYWxzZSB9KTtcbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCB0aHJvdHRsZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgdGhyb3R0bGVkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCB0aHJvdHRsZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGVhZGluZyA9IHRydWUsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICdsZWFkaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLmxlYWRpbmcgOiBsZWFkaW5nO1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cbiAgcmV0dXJuIGRlYm91bmNlKGZ1bmMsIHdhaXQsIHtcbiAgICAnbGVhZGluZyc6IGxlYWRpbmcsXG4gICAgJ21heFdhaXQnOiB3YWl0LFxuICAgICd0cmFpbGluZyc6IHRyYWlsaW5nXG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9OdW1iZXI7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJpbXBvcnQge1N0YWdlfSBmcm9tICdrb252YS9saWIvU3RhZ2UnO1xuaW1wb3J0IHtMYXllcn0gZnJvbSAna29udmEvbGliL0xheWVyJztcbmltcG9ydCB7UmVjdH0gZnJvbSAna29udmEvbGliL3NoYXBlcy9SZWN0JztcbmltcG9ydCB7Q2lyY2xlfSBmcm9tICdrb252YS9saWIvc2hhcGVzL0NpcmNsZSc7XG5pbXBvcnQge1R3ZWVuLCBFYXNpbmdzfSBmcm9tICdrb252YS9saWIvVHdlZW4nO1xuaW1wb3J0IHRocm90dGxlIGZyb20gJ2xvZGFzaC90aHJvdHRsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tncm91bmREb3RzIHtcbiAgc3RhdGljIGRlZmF1bHRPcHRpb25zID0ge1xuICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMSknLFxuICAgIGRvdENvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpJyxcbiAgICBndXR0ZXI6IDMwLFxuICAgIHJhZGl1czogMSxcbiAgICBidWJibGVSYWRpdXM6IDMwMCxcbiAgICBtYWduZXRpY1Bvd2VyOiAwLjE1LFxuICAgIG9wYWNpdHk6IDAuNSxcbiAgICBkZWJ1ZzogZmFsc2VcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuaXNNb3VzZU92ZXIgPSBmYWxzZTtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAuLi5CYWNrZ3JvdW5kRG90cy5kZWZhdWx0T3B0aW9ucyxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuXG4gICAgdGhpcy5ncmlkID0gW107XG5cbiAgICB0aGlzLnN0YWdlID0gbmV3IFN0YWdlKHtcbiAgICAgIGNvbnRhaW5lcjogdGhpcy5lbGVtZW50LFxuICAgICAgd2lkdGg6IHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5lbGVtZW50Lm9mZnNldEhlaWdodFxuICAgIH0pO1xuXG4gICAgdGhpcy5sYXllciA9IG5ldyBMYXllcigpO1xuICAgIHRoaXMuc3RhZ2UuYWRkKHRoaXMubGF5ZXIpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRocm90dGxlKHRoaXMuX3Jlc2l6ZUhhbmRsZXIuYmluZCh0aGlzKSwgMTUwKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX21vdXNlTW92ZUhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHRoaXMuX2RvY3VtZW50TW91c2VPdXRIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2RyYXdIZWxwZXJzKCk7XG5cbiAgICB0aGlzLl9kcmF3KCk7XG4gIH1cblxuICBfZHJhdygpIHtcbiAgICB0aGlzLl9kcmF3QmFja2dyb3VuZCgpO1xuICAgIHRoaXMuX2RyYXdHcmlkKCk7XG4gICAgdGhpcy5fcmVkcmF3KCk7XG4gIH1cblxuICBfZHJhd0hlbHBlcnMoKSB7XG4gICAgdGhpcy5oZWxwZXIgPSBuZXcgQ2lyY2xlKHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgICAgcmFkaXVzOiAyLFxuICAgICAgZmlsbDogJyNmZjAwMDAnXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnKSB7XG4gICAgICB0aGlzLmxheWVyLmFkZCh0aGlzLmhlbHBlcik7XG4gICAgfVxuICB9XG5cbiAgX2RyYXdCYWNrZ3JvdW5kKCkge1xuICAgIHRoaXMuYmFja2dyb3VuZCA9IG5ldyBSZWN0KHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgICAgd2lkdGg6IHRoaXMuc3RhZ2Uud2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy5zdGFnZS5oZWlnaHQoKSxcbiAgICAgIGZpbGw6IHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3JcbiAgICB9KTtcblxuICAgIHRoaXMubGF5ZXIuYWRkKHRoaXMuYmFja2dyb3VuZCk7XG4gIH1cblxuICBfZHJhd0dyaWQoKSB7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLnN0YWdlLndpZHRoKCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5zdGFnZS5oZWlnaHQoKTtcbiAgICBjb25zdCB7Z3V0dGVyLCByYWRpdXMsIGRvdENvbG9yfSA9IHRoaXMub3B0aW9ucztcbiAgICBjb25zdCB4Q291bnQgPSBNYXRoLnJvdW5kKHdpZHRoIC8gdGhpcy5vcHRpb25zLmd1dHRlcik7XG4gICAgY29uc3QgeUNvdW50ID0gTWF0aC5yb3VuZChoZWlnaHQgLyB0aGlzLm9wdGlvbnMuZ3V0dGVyKTtcblxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5ncmlkLmxlbmd0aDsgeSsrKSB7XG4gICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRbeV07XG5cbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgcm93Lmxlbmd0aDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IGNpcmNsZSA9IHJvd1t4XTtcblxuICAgICAgICBjaXJjbGUuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZ3JpZCA9IFtdO1xuXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPD0geUNvdW50OyB5KyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtdO1xuXG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSB4Q291bnQ7IHgrKykge1xuICAgICAgICBjb25zdCBjaXJjbGVYID0geCAqIGd1dHRlcjtcbiAgICAgICAgY29uc3QgY2lyY2xlWSA9IHkgKiBndXR0ZXI7XG5cbiAgICAgICAgY29uc3QgY2lyY2xlID0gbmV3IENpcmNsZSh7XG4gICAgICAgICAgeDogY2lyY2xlWCxcbiAgICAgICAgICB5OiBjaXJjbGVZLFxuICAgICAgICAgIHJhZGl1cyxcbiAgICAgICAgICBmaWxsOiBkb3RDb2xvcixcbiAgICAgICAgICBvcGFjaXR5OiB0aGlzLm9wdGlvbnMub3BhY2l0eVxuICAgICAgICB9KTtcblxuICAgICAgICBjaXJjbGUuYmFzZVggPSBjaXJjbGVYO1xuICAgICAgICBjaXJjbGUuYmFzZVkgPSBjaXJjbGVZO1xuXG4gICAgICAgIHRoaXMubGF5ZXIuYWRkKGNpcmNsZSk7XG4gICAgICAgIHJvdy5wdXNoKGNpcmNsZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmdyaWQucHVzaChyb3cpO1xuICAgIH1cbiAgfVxuXG4gIF9yZWRyYXcoKSB7XG4gICAgdGhpcy5sYXllci5iYXRjaERyYXcoKTtcbiAgfVxuXG4gIF9yZXNpemVIYW5kbGVyKCkge1xuICAgIGNvbnN0IHtzdGFnZSwgZWxlbWVudH0gPSB0aGlzO1xuXG4gICAgc3RhZ2Uud2lkdGgoZWxlbWVudC5vZmZzZXRXaWR0aCk7XG4gICAgc3RhZ2UuaGVpZ2h0KGVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcblxuICAgIHRoaXMuX2RyYXcoKTtcbiAgfVxuXG4gIF9tb3VzZU1vdmVIYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc3Qge2NsaWVudFgsIGNsaWVudFl9ID0gZXZlbnQ7XG5cbiAgICBpZiAoIXRoaXMuX2lzT3ZlclN0YWdlKGNsaWVudFgsIGNsaWVudFkpKSB7XG4gICAgICBpZiAodGhpcy5pc01vdXNlT3Zlcikge1xuICAgICAgICB0aGlzLl9jbGVhbigpO1xuICAgICAgfVxuICAgICAgdGhpcy5pc01vdXNlT3ZlciA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaXNNb3VzZU92ZXIgPSB0cnVlO1xuXG4gICAgY29uc3Qge3gsIHl9ID0gdGhpcy5fZ2V0R3JpZENvb3JkaW5hdGVzKGNsaWVudFgsIGNsaWVudFkpO1xuXG4gICAgdGhpcy5oZWxwZXIueCh4ICogdGhpcy5vcHRpb25zLmd1dHRlcik7XG4gICAgdGhpcy5oZWxwZXIueSh5ICogdGhpcy5vcHRpb25zLmd1dHRlcik7XG5cbiAgICB0aGlzLl91cGRhdGVDaXJjbGVzQXJvdW5kKGNsaWVudFgsIGNsaWVudFkpO1xuXG4gICAgdGhpcy5fcmVkcmF3KCk7XG4gIH1cblxuICBfZG9jdW1lbnRNb3VzZU91dEhhbmRsZXIoZSkge1xuICAgIGNvbnN0IGV2ZW50ID0gZSA/IGUgOiB3aW5kb3cuZXZlbnQ7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQucmVsYXRlZFRhcmdldDtcblxuICAgIGlmICghdGFyZ2V0IHx8IHRhcmdldC5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICB0aGlzLl9jbGVhbigpO1xuICAgIH1cbiAgfVxuXG4gIF9pc092ZXJTdGFnZSh4LCB5KSB7XG4gICAgY29uc3QgY2xpZW50UmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHJldHVybiAoY2xpZW50UmVjdC50b3AgPD0geSAmJiBjbGllbnRSZWN0LmJvdHRvbSA+PSB5ICYmIGNsaWVudFJlY3QubGVmdCA8PSB4ICYmIGNsaWVudFJlY3QucmlnaHQgPj0geCk7XG4gIH1cblxuICBfZ2V0R3JpZENvb3JkaW5hdGVzKHgsIHkpIHtcbiAgICBjb25zdCB7Z3V0dGVyfSA9IHRoaXMub3B0aW9ucztcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuc3RhZ2Uud2lkdGgoKTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnN0YWdlLmhlaWdodCgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IE1hdGgucm91bmQoeCAvIHdpZHRoICogd2lkdGggLyBndXR0ZXIpLFxuICAgICAgeTogTWF0aC5yb3VuZCh5IC8gaGVpZ2h0ICogaGVpZ2h0IC8gZ3V0dGVyKVxuICAgIH07XG4gIH1cblxuICBfdXBkYXRlQ2lyY2xlc0Fyb3VuZChjZW50ZXJYLCBjZW50ZXJZKSB7XG4gICAgLy8gY29uc3QgcmVzdWx0ID0gW107XG4gICAgY29uc3Qge2J1YmJsZVJhZGl1c30gPSB0aGlzLm9wdGlvbnM7XG5cbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuZ3JpZC5sZW5ndGg7IHkrKykge1xuICAgICAgY29uc3Qgcm93ID0gdGhpcy5ncmlkW3ldO1xuXG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHJvdy5sZW5ndGg7IHgrKykge1xuICAgICAgICBjb25zdCBjaXJjbGUgPSByb3dbeF07XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KGNpcmNsZS54KCkgLSBjZW50ZXJYLCAyKSArIE1hdGgucG93KGNpcmNsZS55KCkgLSBjZW50ZXJZLCAyKSk7XG5cbiAgICAgICAgaWYgKGRpc3RhbmNlIDw9IGJ1YmJsZVJhZGl1cykge1xuICAgICAgICAgIHRoaXMuX3VwZGF0ZUNpcmNsZUJ5RGlzdGFuY2UoY2lyY2xlLCBkaXN0YW5jZSwgY2VudGVyWCwgY2VudGVyWSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fY2xlYW5DaXJjbGUoY2lyY2xlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF91cGRhdGVDaXJjbGVCeURpc3RhbmNlKGNpcmNsZSwgZGlzdGFuY2UsIGNlbnRlclgsIGNlbnRlclkpIHtcbiAgICBjb25zdCBkaXN0YW5jZUluZGV4ID0gTWF0aC5wb3coMSAtIGRpc3RhbmNlIC8gdGhpcy5vcHRpb25zLmJ1YmJsZVJhZGl1cywgMyk7XG4gICAgY29uc3QgeCA9IGNpcmNsZS5iYXNlWDtcbiAgICBjb25zdCB5ID0gY2lyY2xlLmJhc2VZO1xuICAgIGNvbnN0IHttYWduZXRpY1Bvd2VyfSA9IHRoaXMub3B0aW9ucztcblxuICAgIGNpcmNsZS5vcGFjaXR5KHRoaXMub3B0aW9ucy5vcGFjaXR5ICogKDEgKyBkaXN0YW5jZUluZGV4KSk7XG4gICAgY2lyY2xlLngoeCArIChjZW50ZXJYIC0geCkgKiBkaXN0YW5jZUluZGV4ICogbWFnbmV0aWNQb3dlcik7XG4gICAgY2lyY2xlLnkoeSArIChjZW50ZXJZIC0geSkgKiBkaXN0YW5jZUluZGV4ICogbWFnbmV0aWNQb3dlcik7XG4gIH1cblxuICBfY2xlYW5DaXJjbGUoY2lyY2xlLCB3aXRoQW5pbWF0aW9uID0gZmFsc2UpIHtcbiAgICBpZiAoY2lyY2xlLnR3ZWVuKSB7XG4gICAgICBjaXJjbGUudHdlZW4uZGVzdHJveSgpO1xuICAgICAgY2lyY2xlLnR3ZWVuID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKCF3aXRoQW5pbWF0aW9uKSB7XG4gICAgICBjaXJjbGUub3BhY2l0eSh0aGlzLm9wdGlvbnMub3BhY2l0eSk7XG4gICAgICBjaXJjbGUueChjaXJjbGUuYmFzZVgpO1xuICAgICAgY2lyY2xlLnkoY2lyY2xlLmJhc2VZKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNpcmNsZS5vcGFjaXR5KCkgIT09IHRoaXMub3B0aW9ucy5vcGFjaXR5KSB7XG4gICAgICAgIGNvbnN0IHR3ZWVuID0gbmV3IFR3ZWVuKHtcbiAgICAgICAgICBub2RlOiBjaXJjbGUsXG4gICAgICAgICAgZHVyYXRpb246IDAuNSxcbiAgICAgICAgICB4OiBjaXJjbGUuYmFzZVgsXG4gICAgICAgICAgeTogY2lyY2xlLmJhc2VZLFxuICAgICAgICAgIG9wYWNpdHk6IHRoaXMub3B0aW9ucy5vcGFjaXR5LFxuICAgICAgICAgIGVhc2luZzogRWFzaW5ncy5TdHJvbmdFYXNlT3V0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNpcmNsZS50d2VlbiA9IHR3ZWVuO1xuICAgICAgICB0d2Vlbi5wbGF5KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2NsZWFuKCkge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5ncmlkLmxlbmd0aDsgeSsrKSB7XG4gICAgICBjb25zdCByb3cgPSB0aGlzLmdyaWRbeV07XG5cbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgcm93Lmxlbmd0aDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IGNpcmNsZSA9IHJvd1t4XTtcblxuICAgICAgICB0aGlzLl9jbGVhbkNpcmNsZShjaXJjbGUsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9yZWRyYXcoKTtcbiAgfVxufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9