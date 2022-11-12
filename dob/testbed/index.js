const { ledger } = require("../ledger");
const { orders } = require("../lob/orders");
const { node } = require("../node");
const constants = require("../lib/constants");

const test = () => {
  // assume an initPrice of 100
  var node1, node2;
  const nodes = [node1, node2];
  var lg1 = ledger();
  var lg2 = ledger();
  node1 = node("node-1", 100, lg1.log);
  node2 = node("node-2", 100, lg2.log);
  lg1.registerOtherNodes([node2]);
  lg2.registerOtherNodes([node1]);

  for (i = 0; i < 10; i++) {
    const o = orders("node-1").limitOrder(10, 110 + i, constants.Buy);
    node1.place(o);
  }

  for (i = 0; i < 10; i++) {
    const o = orders("node-2").marketOrder(10, constants.Sell);
    node2.place(o);
  }
};

test();
