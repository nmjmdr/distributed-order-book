const ledger = () => {
  var otherNodes = [];
  return {
    registerOtherNodes: (nodes) => {
      otherNodes.push(...nodes);
    },
    log: (order) => {
      // have to change this to peer to peer protocol later
      otherNodes.forEach((node) => {
        node.receive(order);
      });
    },
  };
};

module.exports = {
  ledger,
};
