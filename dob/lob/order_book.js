const pq = require("../lib/priority_queue");
const constants = require("../lib/constants");

const book = (nodeID, initPrice) => {
  var lastPrice = initPrice;
  const sellQueue = pq.binaryHeap(
    (x, y) => {
      return x.orderType == constants.MarketOrder
        ? x.ts < y.ts
        : x.limitPrice == y.limitPrice
        ? x.ts < y.ts
        : x.limitPrice > y.limitPrice;
    },
    (a, b) => a.id == b.id
  );

  const buyQueue = pq.binaryHeap(
    (x, y) => {
      return x.orderType == constants.MarketOrder
        ? x.ts < y.ts
        : x.limitPrice == y.limitPrice
        ? x.ts < y.ts
        : x.limitPrice < y.limitPrice;
    },
    (a, b) => a.id == b.id
  );

  return {
    place: (order) => {
      if (order.transactionType == constants.Buy) {
        buyQueue.add(order);
      } else {
        sellQueue.add(order);
      }
    },
    lastPrice: () => lastPrice,
    updateLastPrice: (price) => {
      lastPrice = price;
      return lastPrice;
    },
    buyQueue,
    sellQueue,
  };
};

module.exports = {
  book,
};
