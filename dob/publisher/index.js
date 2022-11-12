const publisher = (nodeID) => {
  return {
    publish: (e) => {
      console.log(
        `${nodeID}: ${e.message} at ${e.price}, quantity: ${e.quantity} `
      );
    },
  };
};

module.exports = {
  publisher,
};
