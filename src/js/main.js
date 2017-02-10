// import * as PIXI from 'pixi.js';
import { Application } from 'pixi.js';
import Logo from './logo';
import Time from './time';
import Triangles from './triangles';

class Main {
  constructor() {
    const size = ~~(window.innerWidth/16);
    this.app = new Application(window.innerWidth, window.innerHeight, {
      transparent: true
    });
    document.body.appendChild(this.app.view);

    this.logo = new Logo();
    this.time = new Time();
    this.triangles = new Triangles(size);

    this._addToStage();
    this._loop();
  }

  _addToStage() {
    this.app.stage.addChild(this.logo);
    this.app.stage.addChild(this.triangles.container);
    this.app.stage.addChild(this.time);
  }

  _loop() {
    this.app.ticker.add(delta => {
      this.logo.play();
      this.time.play();
    });
  }
}

export default Main;
