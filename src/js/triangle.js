import { Graphics } from 'pixi.js';
import { TweenLite } from 'gsap';
import { Circ } from 'gsap/EasePack';
import { randomIntRange } from './utils';

class Triangle extends Graphics {
  constructor(options) {
    super();
    this.options = Object.assign({}, Triangle._defaults(), (options || {}));
    this.rotation = this.options.rotation;
    this.polygon = [
      0, 0,
      -this.options.size, this.options.size,
      this.options.size, this.options.size
    ];

    this._render();
  }

  static _defaults() {
    const fillColors = [
      '0xF48577',
      '0xBD9147',
      '0xEBDED9',
      '0x404750'
    ];
    return {
      color: fillColors[randomIntRange(0, fillColors.length)],
      rotation: randomIntRange(0, 4) * 90 * Math.PI / 180,
      size: 64
    }
  }

  _render() {
    this.beginFill(this.options.color, 0.5);
    this.drawPolygon(this.polygon);
    this.endFill();
  }

  play() {
    return TweenLite.from(this.scale, 1,
      { y: 0, ease: Circ.easeOut }
    );
  }

  reverse() {
    return TweenLite.to(this.scale, 1,
      { y: 0, ease: Circ.easeOut }
    );
  }
}

export default Triangle;
