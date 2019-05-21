import {Stage} from 'konva/lib/Stage';
import {Layer} from 'konva/lib/Layer';
import {Rect} from 'konva/lib/shapes/Rect';
import {Circle} from 'konva/lib/shapes/Circle';
import throttle from 'lodash/throttle';
import {fromEvent, interval, animationFrameScheduler} from 'rxjs';
import {map, withLatestFrom, scan} from 'rxjs/operators';

const getNewValue = (start, end) => {
  const rate = 0.05;

  return start + (end - start) * rate;
};

const lerp = (start, end) => ({
  clientX: getNewValue(start.clientX, end.clientX),
  clientY: getNewValue(start.clientY, end.clientY)
});

export default class BackgroundDots {
  static defaultOptions = {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    dotColor: 'rgba(255, 255, 255, 0.5)',
    gutter: 30,
    radius: 1,
    bubbleRadius: 300,
    magneticPower: 0.15,
    opacity: 0.5,
    debug: false
  };

  constructor(element, options = {}) {
    this.element = element;
    this.isMouseOver = false;
    this.options = {
      ...BackgroundDots.defaultOptions,
      ...options
    };

    this.grid = [];

    this.stage = new Stage({
      container: this.element,
      width: this.element.offsetWidth,
      height: this.element.offsetHeight
    });

    this.layer = new Layer();
    this.stage.add(this.layer);

    window.addEventListener('resize', throttle(this._resizeHandler.bind(this), 150));

    const mouseMove$ = fromEvent(window, 'mousemove')
      .pipe(map(event => {
        return {
          clientX: event.clientX,
          clientY: event.clientY
        };
      }));

    const animationFrame$ = interval(0, animationFrameScheduler);

    const smoothMove$ = animationFrame$.pipe(
      withLatestFrom(mouseMove$, (tick, move) => move),
      scan(lerp)
    );

    this.subscription = smoothMove$.subscribe(({clientX, clientY}) => {
      this._mouseMoveHandler(clientX, clientY);
    });

    this._drawHelpers();

    this._draw();
  }

  _draw() {
    this._drawBackground();
    this._drawGrid();
    this._redraw();
  }

  _drawHelpers() {
    this.helper = new Circle({
      x: 0,
      y: 0,
      radius: 2,
      fill: '#ff0000'
    });

    if (this.options.debug) {
      this.layer.add(this.helper);
    }
  }

  _drawBackground() {
    this.background = new Rect({
      x: 0,
      y: 0,
      width: this.stage.width(),
      height: this.stage.height(),
      fill: this.options.backgroundColor
    });

    this.layer.add(this.background);
  }

  _drawGrid() {
    const width = this.stage.width();
    const height = this.stage.height();
    const {gutter, radius, dotColor} = this.options;
    const xCount = Math.round(width / this.options.gutter);
    const yCount = Math.round(height / this.options.gutter);

    for (let y = 0; y < this.grid.length; y++) {
      const row = this.grid[y];

      for (let x = 0; x < row.length; x++) {
        const circle = row[x];

        circle.destroy();
      }
    }

    this.grid = [];

    for (let y = 0; y <= yCount; y++) {
      const row = [];

      for (let x = 0; x <= xCount; x++) {
        const circleX = x * gutter;
        const circleY = y * gutter;

        const circle = new Circle({
          x: circleX,
          y: circleY,
          radius,
          fill: dotColor,
          opacity: this.options.opacity
        });

        circle.baseX = circleX;
        circle.baseY = circleY;

        this.layer.add(circle);
        row.push(circle);
      }
      this.grid.push(row);
    }
  }

  _redraw() {
    this.layer.batchDraw();
  }

  _resizeHandler() {
    const {stage, element} = this;

    stage.width(element.offsetWidth);
    stage.height(element.offsetHeight);

    this._draw();
  }

  _mouseMoveHandler(clientX, clientY) {
    if (!this._isOverStage(clientX, clientY)) {
      this.isMouseOver = false;
      return;
    }
    const clientRect = this.element.getBoundingClientRect();
    const stageX = clientX;
    const stageY = clientY - clientRect.y;

    this.isMouseOver = true;

    const {x, y} = this._getGridCoordinates(stageX, stageY);

    this.helper.x(x * this.options.gutter);
    this.helper.y(y * this.options.gutter);

    this._updateCirclesAround(stageX, stageY);

    this._redraw();
  }

  _isOverStage(x, y) {
    const clientRect = this.element.getBoundingClientRect();

    return (clientRect.top <= y && clientRect.bottom >= y && clientRect.left <= x && clientRect.right >= x);
  }

  _getGridCoordinates(x, y) {
    const {gutter} = this.options;
    const width = this.stage.width();
    const height = this.stage.height();

    return {
      x: Math.round(x / width * width / gutter),
      y: Math.round(y / height * height / gutter)
    };
  }

  _updateCirclesAround(centerX, centerY) {
    const {bubbleRadius} = this.options;

    for (let y = 0; y < this.grid.length; y++) {
      const row = this.grid[y];

      for (let x = 0; x < row.length; x++) {
        const circle = row[x];
        const distance = Math.sqrt(Math.pow(circle.x() - centerX, 2) + Math.pow(circle.y() - centerY, 2));

        if (distance <= bubbleRadius) {
          this._updateCircleByDistance(circle, distance, centerX, centerY);
        } else {
          this._cleanCircle(circle);
        }
      }
    }
  }

  _updateCircleByDistance(circle, distance, centerX, centerY) {
    const distanceIndex = Math.pow(1 - distance / this.options.bubbleRadius, 3);
    const x = circle.baseX;
    const y = circle.baseY;
    const {magneticPower} = this.options;

    circle.opacity(this.options.opacity * (1 + distanceIndex));
    circle.x(x + (centerX - x) * distanceIndex * magneticPower);
    circle.y(y + (centerY - y) * distanceIndex * magneticPower);
  }

  _cleanCircle(circle) {
    if (circle.tween) {
      circle.tween.destroy();
      circle.tween = null;
    }
    circle.opacity(this.options.opacity);
    circle.x(circle.baseX);
    circle.y(circle.baseY);
  }

  destroy() {
    this.subscription.unsubscribe();
  }
}

