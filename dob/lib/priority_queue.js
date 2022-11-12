const binaryHeap = (compareFn, equalFn) => {
  var content = [];

  const bubbleUp = (n) => {
    var element = content[n];
    while (n > 0) {
      const parentN = Math.floor((n + 1) / 2) - 1;
      const parent = content[parentN];
      if (compareFn(element, parent)) {
        break;
      }
      content[parentN] = element;
      content[n] = parent;
      n = parentN;
    }
  };

  const sinkDown = (n) => {
    const length = content.length;
    const element = content[n];

    while (true) {
      const child2N = (n + 1) * 2;
      const child1N = child2N - 1;
      var swap = null;

      var child1;
      if (child1N < length) {
        child1 = content[child1N];
        if (compareFn(element, child1)) {
          swap = child1N;
        }
      }
      if (child2N < length) {
        const child2 = content[child2N];
        const e = swap == null ? element : child1;
        if (compareFn(e, child2)) {
          swap = child2N;
        }
      }
      if (swap == null) break;
      content[n] = content[swap];
      content[swap] = element;
      n = swap;
    }
  };

  return {
    add: (element) => {
      content.push(element);
      bubbleUp(content.length - 1);
    },
    peek: () => {
      return content.length > 0 ? content[0] : null;
    },
    pop: () => {
      var result = content[0];
      var end = content.pop();
      if (content.length > 0) {
        content[0] = end;
        sinkDown(0);
      }
      return result;
    },
    size: () => content.length,
    remove: (node) => {
      var length = content.length;
      for (var i = 0; i < length; i++) {
        if (!equalFn(content[i], node)) continue;

        var end = content.pop();
        if (i == length - 1) break;
        content[i] = end;
        bubbleUp(i);
        sinkDown(i);
        break;
      }
    },
  };
};

module.exports = {
  binaryHeap,
};
