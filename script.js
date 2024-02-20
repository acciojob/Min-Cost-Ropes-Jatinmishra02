function mincost(arr) {
    // Convert the input array into a min-heap
    const minHeap = new MinHeap(arr);

    let totalCost = 0;

    // Continue until only one rope is left in the heap
    while (minHeap.size() > 1) {
        // Extract the two shortest ropes from the min-heap
        const min1 = minHeap.extractMin();
        const min2 = minHeap.extractMin();

        // Combine the two ropes and calculate the cost
        const combinedRope = min1 + min2;
        totalCost += combinedRope;

        // Add the combined rope back to the min-heap
        minHeap.insert(combinedRope);
    }

    return totalCost;
}

class MinHeap {
    constructor(arr = []) {
        this.heap = [];
        arr.forEach(val => this.insert(val));
    }

    size() {
        return this.heap.length;
    }

    insert(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] < this.heap[parentIndex]) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    extractMin() {
        if (this.size() === 0) return null;
        if (this.size() === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.sinkDown(0);
        return min;
    }

    sinkDown(index) {
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let smallestIndex = index;

            if (leftChildIndex < this.size() && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
                smallestIndex = leftChildIndex;
            }

            if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
                smallestIndex = rightChildIndex;
            }

            if (smallestIndex !== index) {
                [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
                index = smallestIndex;
            } else {
                break;
            }
        }
    }
}

module.exports = mincost;
