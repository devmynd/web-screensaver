import { Texture, Sprite } from 'pixi.js';
import DevMyndSVG from '../assets/devmynd-logo.svg';

class Logo extends Sprite {
  constructor() {
    const logo = Texture.fromImage(DevMyndSVG);
    super(logo);

    this.position.set(
      ~~(window.innerWidth / 2) - (logo.width / 2),
      ~~(window.innerHeight / 2) - (logo.height / 2)
    );
    this.vx = 1.5;
    this.vy = 1.0;
  }

  play() {
    if (this.x + this.vx > window.innerWidth - this.width ||
        this.x + this.vx < 0) {
          this.vx = -this.vx;
        }
    if (this.y + this.vy > window.innerHeight - this.height ||
        this.y + this.vy < 0) {
          this.vy = -this.vy;
        }

    this.x += this.vx;
    this.y += this.vy;
  }
}

export default Logo;
