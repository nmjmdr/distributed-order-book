const q = require("./priority_queue").binaryHeap(
  (x, y) => {
    return x < y;
  },
  (x, y) => x == y
);

const arr = [10, 3, 10, 4, 100, 9, 8, 2, 4, 9, 7, 9, 1, 100, 6, 5];
arr.forEach((e) => {
  q.add(e);
});

q.remove(2);
while (q.size() > 0) console.log(q.pop());
