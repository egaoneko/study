package week2.stacksandqueues;

import java.util.Iterator;

public class FixedCapacityStack<Item> implements Iterable<Item> {
    protected Item[] s;
    protected int N = 0;

    public FixedCapacityStack(int capacity) {
        s = (Item[]) new Object[capacity];
    }

    public boolean isEmpty() {
        return N == 0;
    }

    public void push(Item item) {
        s[N++] = item;
    }

    public Item pop() {
        Item item = s[--N];
        s[N] = null;    // avoid loitering
        return item;
    }

    public int size() {
        return N;
    }

    @Override
    public Iterator<Item> iterator() {
        return new ReverseArrayIterator();
    }

    private class ReverseArrayIterator implements Iterator<Item> {
        private int i = N;

        @Override
        public boolean hasNext() {
            return i > 0;
        }

        @Override
        public Item next() {
            return s[--i];
        }
    }
}
