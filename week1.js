class Queue {
    constructor() {
        this.q = [];
    }
// get the current number of elements in the queue
//Getter function
    get length() {
        return this.q.length
    };
//Get all the elements 
    get queue() {
        return this.q;
    }
// Boolean function: returns true if the queue is empty, false otherwise 
    isEmpty() {
        return 0 == this.q.length;
    };
//adds new element to the end of the quue
    enqueue(newItem) {
        this.q.push(newItem)
    };
//Boolean function: returns true if an item is found (first occurnace); false otherwise
    inQueue(item) {
        let i = 0;
        let isFound = false;
        while (i < this.q.length && !isFound) {
            if (this.q[i] === item) {
                isFound = true;
            } else
                i++;
        }
        return (isFound);
    }
// pop an item from the queue
    dequeue() {
        if (0 != this.q.length) {
            let c = this.q[0];
            this.q.splice(0, 1);
            return c
        }
    };
// delete all items
    dequeueAll() {
        this.q.splice(0, this.q.length);     
    };
// add a set of items
    addAll(newItem) {
      this.q.push(...newItem)
    };
// pop N items from the queue
    dequeueN(item) {
        if (item <= this.q.length) {
            this.q.splice(0, item);
        }
    };
// print content of queue with indexes
    printqueue() {
        for (let i=0; i<this.q.length; i++){
          console.log(i + 1 + "->" + this.q[i]);
        }
    };  
// // add one numbers to queue
//     odd(n) {
//         for (let i=0; i<n; i++){
//             if (i%2===1){
//                 this.q.push(i);
//             }
//         }
//     };
};
let queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
console.log(queue.length);
console.log(queue.q);
queue.dequeue();
queue.enqueue(33);
console.log(queue.q);
console.log(queue.inQueue(33));
console.log(queue.inQueue(88));
queue.dequeueAll();
console.log(queue.q);
queue.addAll([3,7,1,9]);
console.log(queue.q);
queue.dequeueN(2);
console.log(queue.q);
queue.printqueue();
// queue.odd(20);
// console.log(queue.q);