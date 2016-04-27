package week2.stacksandqueues;

public class LinkedStackOfStrings implements StackOfStrings{

    private Node first = null;
    private int size = 0;

    private class Node {
        String item;
        Node next;
    }

    @Override
    public void push(String item) {
        Node oldFirst = first;
        first = new Node();
        first.item = item;
        first.next = oldFirst;
        size++;
    }

    @Override
    public String pop() {
        String item = first.item;
        first = first.next;
        size--;
        return item;
    }

    @Override
    public boolean isEmpty() {
        return first == null;
    }

    @Override
    public int size() {
        return size;
    }
}
