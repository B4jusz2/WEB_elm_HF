class NyeremenyKartya extends MegjelenitendoElem {
  constructor(huzasid, talalat, darab, ertek, x, y, width, height) {
    super(x, y, width, height);

    this.huzasid = huzasid;
    this.talalat = talalat;
    this.darab = darab;
    this.ertek = ertek;

    this.card = document.createElement("div");
    this.card.style.position = "absolute";
    this.card.style.border = "2px solid black";
    this.card.style.backgroundColor = "white";
    this.card.style.padding = "10px";
    this.card.style.boxSizing = "border-box";

    this.title = document.createElement("h3");
    this.title.innerText = "Nyereménykártya";
    this.title.style.margin = "0 0 10px 0";

    this.content = document.createElement("div");

    this.card.appendChild(this.title);
    this.card.appendChild(this.content);

    document.body.appendChild(this.card);

    this.render();
    this.updateDisplay();
  }

  render() {
    this.content.innerHTML =
      "Húzás ID: " + this.huzasid + "<br>" +
      "Találat: " + this.talalat + "<br>" +
      "Darab: " + this.darab + "<br>" +
      "Érték: " + this.ertek + " Ft";
  }

  updateDisplay() {
    this.card.style.left = this.x + "px";
    this.card.style.top = this.y + "px";
    this.card.style.width = this.width + "px";
    this.card.style.height = this.height + "px";
  }

  updateData(huzasid, talalat, darab, ertek) {
    this.huzasid = huzasid;
    this.talalat = talalat;
    this.darab = darab;
    this.ertek = ertek;
    this.render();
  }

  putAt(x, y) {
    this.x = x;
    this.y = y;
    this.updateDisplay();
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    this.updateDisplay();
  }

  show() {
    this.card.style.display = "block";
  }

  hide() {
    this.card.style.display = "none";
  }

  highlight() {
    this.card.style.backgroundColor = "gold";
    this.card.style.border = "3px solid red";
  }

  normal() {
    this.card.style.backgroundColor = "white";
    this.card.style.border = "2px solid black";
  }
}