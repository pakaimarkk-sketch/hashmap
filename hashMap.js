class HashMap {
  constructor() {
    this.buckets = new Array(16).fill(null).map(() => []);
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  getIndex(key) {
    return this.hash(key) % this.capacity;
  }

  set(key, value) {
    const index = this.getIndex(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.getIndex(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }

    return null;
  }

  has(key) {
    const index = this.getIndex(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.getIndex(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    const keysArray = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        keysArray.push(entry[0]);
      }
    }

    return keysArray;
  }

  values() {
    const valuesArray = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        valuesArray.push(entry[1]);
      }
    }

    return valuesArray;
  }

  entries() {
    const entriesArray = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entriesArray.push(entry);
      }
    }

    return entriesArray;
  }

  resize() {
    const oldBuckets = this.buckets;

    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const entry of bucket) {
        this.set(entry[0], entry[1]);
      }
    }
  }
}

const test = new HashMap(); // or HashMap() if using a factory

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.length()); // 12
console.log(test.entries());

test.set("apple", "green");
test.set("banana", "gold");

console.log(test.get("apple")); // green
console.log(test.get("banana")); // gold
console.log(test.length()); // 12

test.set("moon", "silver");

console.log(test.length()); // 13
console.log(test.capacity); // 32
console.log(test.has("moon")); // true
console.log(test.remove("dog")); // true
console.log(test.has("dog")); // false
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
