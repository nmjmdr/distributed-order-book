const constants = require("../lib/constants");

const orders = (nodeID) => {
  var orderNo = 0;
  return {
    limitOrder: (n, price, transactionType) => {
      orderNo = orderNo + 1;
      return {
        id: `${nodeID}-${orderNo}`,
        quantity: n,
        orderType: constants.LimitOrder,
        limitPrice: price,
        transactionType: transactionType,
        ts: new Date().getTime(),
      };
    },

    marketOrder: (n, transactionType) => {
      orderNo = orderNo + 1;
      return {
        id: `${nodeID}-${orderNo}`,
        quantity: n,
        orderType: constants.MarketOrder,
        transactionType: transactionType,
        ts: new Date().getTime(),
      };
    },
  };
};

module.exports = {
  orders,
};
