const { match } = require("../lob/matcher");
const { book } = require("../lob/order_book");
const { publisher } = require("../publisher");
const constants = require("../lib/constants");

const node = (nodeID, initPrice, ledgerLog) => {
  const bk = book(nodeID, initPrice);
  const pb = publisher(nodeID);
  const receive = (order) => {
    // place order and match
    bk.place(order);
    match(bk, pb);
  };

  return {
    id: nodeID,
    place: (order) => {
      pb.publish({
        message: `${nodeID} ${order.transactionType} ${order.orderType} order placed`,
        quantity: order.quantity,
        price:
          order.orderType == constants.MarketOrder
            ? "Market Price"
            : order.limitPrice,
      });
      // logs and publishes to other nodes
      ledgerLog(order);
      receive(order);
    },
    // received from other nodes, just place and match
    receive: (order) => {
      receive(order);
    },
  };
};

module.exports = {
  node,
};
