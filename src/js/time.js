import { Text } from 'pixi.js';

class Time extends Text {
  constructor() {
    super();
    this.position.set(
      ~~(window.innerWidth / 2),
      ~~(window.innerHeight / 2)
    );
    this.anchor.set(0.5, 0.5);
  }

  static _style() {
    return {
      fill: 'black',
      fontFamily: 'Utopia',
      fontSize: `${window.innerWidth * 0.12}px`,
      padding: 15
    };
  }

  static _getTime() {
    const date = new Date();
    const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours() === 0 ? 12 : date.getHours();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const period = date.getHours() < 12 ? 'AM' : 'PM';
    return `${hour}:${minute} ${period}`;
  }

  play() {
    this.text = Time._getTime();
    this.style = Time._style();
  }
}

export default Time;
