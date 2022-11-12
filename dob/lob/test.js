const lob = require("./order_book");
const { match } = require("./matcher");
const ods = require("./orders").orders("node1");
const ob = lob.book("node1");
const constants = require("../lib/constants");

ob.place(ods.limitOrder(10, 100, constants.Buy));
ob.place(ods.limitOrder(200, 101, constants.Buy));
ob.place(ods.limitOrder(200, 102, constants.Buy));
ob.place(ods.limitOrder(100, 102, constants.Buy));
ob.place(ods.limitOrder(200, 103, constants.Buy));
ob.place(ods.marketOrder(5, constants.Buy));

ob.place(ods.limitOrder(100, 103, constants.Sell));
ob.place(ods.limitOrder(90, 103, constants.Sell));
ob.place(ods.limitOrder(10, 104, constants.Sell));

match(ob, {
  publish: (filled) => {
    console.log(filled);
  },
});

console.log("Buy queue:");
while (ob.buyQueue.size() > 0) {
  console.log(ob.buyQueue.pop());
}

console.log("Sell queue:");

while (ob.sellQueue.size() > 0) {
  console.log(ob.sellQueue.pop());
}
