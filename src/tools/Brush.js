import Tool from "./Tool";

export default class Brush extends Tool {
  constructor(canvas) {
    super(canvas);
    this.name = "brush";
    this.listen();
    this.mouseDown = false;
  }

  listen() {
    this.canvas.onmousemove = this.mouseMove.bind(this);
    this.canvas.onmouseup = this.mouseUp.bind(this);
    this.canvas.onmousedown = this.mouseDown.bind(this);
    this.canvas.onmouseout = () => {
      this.mouseDown = false;
    };
  }

  mouseUp(event) {
    this.mouseDown = false;
    if (this.x === this.endX && this.y === this.endY) {
      this.context.lineTo(this.x, this.y);
      this.context.stroke();
      this.context.moveTo(this.x, this.y);
    }
  }

  mouseDown(event) {
    this.mouseDown = true;
    this.context.beginPath();
    this.x = event.x - event.target.offsetLeft;
    this.y = event.y - event.target.offsetTop;
    this.endX = event.x - event.target.offsetLeft;
    this.endY = event.y - event.target.offsetTop;
    this.context.moveTo(this.x, this.y);
  }

  mouseMove(event) {
    if (this.mouseDown) {
      this.draw(event.x - event.target.offsetLeft, event.y - event.target.offsetTop);
    }
  }

  draw(x, y) {
    this.endX = x;
    this.endY = y;
    this.context.lineCap = "round";
    this.context.lineJoin = "bevel";
    this.context.lineTo(x, y);
    this.context.stroke();
  }
}
