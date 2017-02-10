import { Container } from 'pixi.js';
import { TimelineLite } from 'gsap';
import Triangle from './triangle';
import { randomIntRange } from './utils';

class Triangles {
  constructor(size = 100, saturation = 1) {
    this.container = new Container();
    this.offset = 1;
    this.size = size;
    this.columns = Triangles._columns(this.size, this.offset);
    this.rows = Triangles._rows(this.size, this.offset);
    this.total = this.columns * this.rows;
    this.triangles = [];
    this.tl = null;

    this._generateTriangles(this.total * saturation);
    this._positionContainer();
    this._playTimeline(this.triangles);
    this._loop();
  }

  static _columns(size, offset) {
    return ~~(window.innerWidth / size) - offset;
  }

  static _rows(size, offset) {
    return ~~(window.innerHeight / size) - offset;
  }

  _positionContainer() {
    this.container.x = (window.innerWidth - this.container.width) / 2;
    this.container.y = (window.innerHeight - this.container.height) / 2;
  }

  _generateTriangles(count) {
    const { container, offset, size, columns, total } = this;
    let trianglesToAnimate = [];
    for (let i = 0; i < count; i++) {
      let triangle = new Triangle({ size: size });
      let index = randomIntRange(0, total);
      triangle.x = ((index % columns) + offset) * size;
      triangle.y = (~~(index / columns) + offset) * size;
      trianglesToAnimate.push(triangle);
      this.triangles.push(triangle);
      container.addChild(triangle);
    }
    return trianglesToAnimate;
  }

  _playTimeline(triangles) {
    let tl = new TimelineLite();
    triangles.forEach(triangle => {
      tl.add(triangle.play(), Math.random());
    });
  }

  _reverseTimeline(removeCount) {
    let trianglesToRemove = this.triangles.splice(0, removeCount);
    this.tl = new TimelineLite({ onComplete: () => this._restart(trianglesToRemove) });
    trianglesToRemove.forEach(triangle => {
      this.tl.add(triangle.reverse(), '+=0', 'sequence', 1.0);
    });
  }

  _restart(trianglesToRemove) {
    let trianglesToAnimate = this._generateTriangles(trianglesToRemove.length);
    trianglesToRemove.forEach(triangle => {
      this.container.removeChild(triangle);
    });

    this._playTimeline(trianglesToAnimate);
  }

  _loop() {
    setInterval(() => {
      let secondsLeft = 60 - new Date().getSeconds();
      if (!this.tl || !this.tl.isActive()) this._reverseTimeline(secondsLeft);
    }, 1000);
  }
}

export default Triangles;
