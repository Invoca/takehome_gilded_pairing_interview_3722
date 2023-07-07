const GOLD_COINS = 'Gold Coins';
const FINE_ART = 'Fine Art';
const CONCERT_TICKETS = 'Concert Tickets';

class Inventory {
  constructor(items) {
    this.items = items;
  }

  updatePrice() {
    this.items.forEach((item) => {
      // We don't need to do anything in case of Gold Coins.
      if (item.name === GOLD_COINS) {
        return;
      }

      // After the exclusion of Gold Coins we are left with two special items. i.e Fine Art and Concert Tickets
      if (this.isSpecialItem(item.name)) {
        this.updateSpecialItem(item);
      } else {
        this.updateRegularItem(item);
      }

      item.sellBy -= 1;
      if (item.sellBy < 0) {
        this.updateExpiredItem(item);
      }
    });
  }

  // To utility to check if item is a special item i.e Fine Art or Concert Tickets
  isSpecialItem(itemName) {
    return itemName === FINE_ART || itemName === CONCERT_TICKETS;
  }

  // utility to update regular item's price be decreasig one if price is more than 0
  updateRegularItem(item) {
    if (item.price > 0) {
      item.price -= 1;
    }
  }

  // utility to update special item's price
  updateSpecialItem(item) {
    // if price is reached to 50, we don't need to increase.
    if (item.price >= 50) {
      return;
    }
    item.price += 1;
    /*
      Special increment criteria for Concert Tickets.
      It will increase the price by 2 if sellBy is less than 6 otherwise by 1.
    */
    if (item.name === CONCERT_TICKETS) {
      if (item.sellBy < 11) {
        item.price += 1;
      }
      if (item.sellBy < 6) {
        item.price += 1;
      }
    }
  }

  // utility to update price according to expiry criteria.
  updateExpiredItem(item) {
    if (item.name === CONCERT_TICKETS) {
      item.price = 0;
    } else if (item.name !== FINE_ART && item.price > 0) {
      item.price -= 1;
    } else if (item.name === FINE_ART && item.price < 50) {
      item.price += 1;
    }
  }
}

module.exports = { Inventory };
