package week2.assingment;

import edu.princeton.cs.algs4.StdRandom;

import java.util.Iterator;
import java.util.NoSuchElementException;

public class RandomizedQueue<Item> implements Iterable<Item> {

    private Item[] items;
    private int size = 0;

    public RandomizedQueue() {
        // construct an empty randomized queue
        items = (Item[]) new Object[2];
    }

    public boolean isEmpty() {
        // is the queue empty?
        return size == 0;

    }

    public int size() {
        // return the number of items on the queue
        return size;
    }

    private void resize(int newCapacity) {
        Item[] temp = (Item[]) new Object[newCapacity];
        System.arraycopy(items, 0, temp, 0, size);
        items = temp;
    }

    public void enqueue(Item item) {
        // add the item
        if (item == null) {
            throw new java.lang.NullPointerException();
        }
        if (size == items.length) resize(2 * items.length);
        items[size++] = item;
    }

    public Item dequeue() {
        // remove and return a random item
        if (isEmpty()) {
            throw new java.util.NoSuchElementException();
        }
        int index = (int) (StdRandom.uniform(size));
        Item item = items[index];

        if (index != size - 1) {
            items[index] = items[size - 1];
        }
        items[size--] = null;    // avoid loitering
        if (size > 0 && size == items.length / 4) resize(items.length / 2);
        return item;
    }

    public Item sample() {
        // return (but do not remove) a random item
        if (isEmpty()) {
            throw new java.util.NoSuchElementException();
        }
        int index = (int) (StdRandom.uniform(size));
        return items[index];
    }

    public Iterator<Item> iterator() {
        // return an independent iterator over items in random order
        return new RandomizedQueueIterator();
    }

    private class RandomizedQueueIterator implements Iterator<Item> {
        private int index = 0;
        private Item[] temp;

        public RandomizedQueueIterator() {
            temp = (Item[]) new Object[size];
            System.arraycopy(items, 0, temp, 0, size);
            StdRandom.shuffle(temp);
        }

        @Override
        public boolean hasNext() {
            return index < size;
        }

        @Override
        public Item next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            return temp[index++];
        }

        @Override
        public void remove() {
            throw new UnsupportedOperationException();
        }
    }

    public static void main(String[] args) {
        // unit testing
    }
}
