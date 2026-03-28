class MegjelenitendoElem {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  setPosition(element) {
    element.style.position = "absolute";
    element.style.left = this.x + "px";
    element.style.top = this.y + "px";
  }

  setSize(element) {
    element.style.width = this.width + "px";
    element.style.height = this.height + "px";
  }

  putAt(x, y, element) {
    this.x = x;
    this.y = y;
    this.setPosition(element);
  }

  resize(width, height, element) {
    this.width = width;
    this.height = height;
    this.setSize(element);
  }

  show(element) {
    element.style.display = "block";
  }

  hide(element) {
    element.style.display = "none";
  }
}
