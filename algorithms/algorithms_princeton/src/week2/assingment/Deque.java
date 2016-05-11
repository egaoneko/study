package week2.assingment;

import java.util.Iterator;
import java.util.NoSuchElementException;

public class Deque<Item> implements Iterable<Item> {

    private Node first = null;
    private Node last = null;
    private int size;

    private class Node {
        private Item item;
        private Node prev;
        private Node next;
    }

    public Deque() {
        // construct an empty deque
        first = new Node();
        last = new Node();
        first.next = last;
        last.prev = first;
        size = 0;
    }

    public boolean isEmpty() {
        // is the deque empty?
        return size == 0;
    }

    public int size() {
        // return the number of items on the deque
        return size;
    }

    public void addFirst(Item item) {
        // add the item to the front
        if (item == null) {
            throw new NullPointerException();
        }
        Node newNode = new Node();
        newNode.item = item;
        newNode.prev = first;
        newNode.next = first.next;
        first.next.prev = newNode;
        first.next = newNode;
        size++;
    }

    public void addLast(Item item) {
        // add the item to the end
        if (item == null) {
            throw new NullPointerException();
        }
        Node newNode = new Node();
        newNode.item = item;
        newNode.prev = last.prev;
        newNode.next = last;
        last.prev.next = newNode;
        last.prev = newNode;
        size++;
    }

    public Item removeFirst() {
        // remove and return the item from the front
        if (isEmpty()) {
            throw new NoSuchElementException();
        }

        Node oldNode = first.next;
        oldNode.next.prev = first;
        first.next = oldNode.next;
        size--;
        return oldNode.item;
    }

    public Item removeLast() {
        // remove and return the item from the end
        if (isEmpty()) {
            throw new NoSuchElementException();
        }

        Node oldNode = last.prev;
        oldNode.prev.next = last;
        last.prev = oldNode.prev;
        size--;
        return oldNode.item;
    }

    public Iterator<Item> iterator() {
        // return an iterator over items in order from front to end
        return new DequeIterator();
    }

    private class DequeIterator implements Iterator<Item> {
        private Node current = first.next;

        @Override
        public boolean hasNext() {
            return current != last;
        }

        @Override
        public Item next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }

            Item item = current.item;
            current = current.next;
            return item;
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
