package week2.stacksandqueues;

import java.util.Iterator;

public class Stack<Item> implements Iterable<Item> {
    private Node first = null;
    private int size = 0;

    private class Node {
        Item item;
        Node next;
    }

    public void push(Item item) {
        Node oldFirst = first;
        first = new Node();
        first.item = item;
        first.next = oldFirst;
        size++;
    }

    public Item pop() {
        Item item = first.item;
        first = first.next;
        size--;
        return item;
    }

    public boolean isEmpty() {
        return first == null;
    }

    public int size() {
        return size;
    }

    @Override
    public Iterator<Item> iterator() {
        return new ListIterator();
    }

    private class ListIterator implements Iterator<Item> {
        private Node current = first;

        @Override
        public boolean hasNext() {
            return current != null;
        }

        @Override
        public Item next() {
            Item item = current.item;
            current = current.next;
            return item;
        }
    }
}
