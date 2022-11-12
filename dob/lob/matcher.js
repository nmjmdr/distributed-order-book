const constants = require("../lib/constants");
const { book } = require("./order_book");

const match = (orderBook, publisher) => {
  while (true) {
    var bo = orderBook.buyQueue.peek();
    var so = orderBook.sellQueue.peek();

    if (bo == null || so == null) {
      return;
    }

    if (
      bo.orderType == constants.LimitOrder &&
      so.orderType == constants.LimitOrder &&
      bo.limitPrice < so.limitPrice
    ) {
      // no match
      return;
    }

    // so either is market order or buy price >= sell price, hence a match
    bo = orderBook.buyQueue.pop();
    so = orderBook.sellQueue.pop();
    const delta = bo.quantity - so.quantity;

    const lastPrice =
      bo.orderType == constants.MarketOrder &&
      so.orderType == constants.MarketOrder
        ? orderBook.lastPrice
        : bo.orderType == constants.MarketOrder
        ? so.limitPrice
        : bo.limitPrice;

    orderBook.updateLastPrice(lastPrice);

    publisher.publish({
      message: "order filled",
      quantity: delta > 0 ? delta : bo.quantity,
      price: lastPrice,
    });

    if (delta == 0) {
      // exact match
      return;
    }
    var o;
    if (delta > 0) {
      o = { ...bo };
      o.quantity = delta;
    } else {
      o = { ...so };
      o.quantity = Math.abs(delta);
    }
    orderBook.place(o);
  }
};

module.exports = {
  match,
};
