class Item {
  constructor(name, sellBy, price) {
    this.name = name;
    this.sellBy = sellBy;
    this.price = price;
  }

  toString() {
    return `${this.name}, ${this.sellBy}, ${this.price}`
  }
}

module.exports = { Item };
