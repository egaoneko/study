package week2.stacksandqueues;

public class LinkedQueueOfStrings implements QueueOfStrings{

    private Node first, last = null;
    private int size = 0;

    private class Node {
        String item;
        Node next;
    }

    @Override
    public void enqueue(String item) {
        Node oldLast = last;
        last = new Node();
        last.item = item;
        last.next = null;
        if (isEmpty()) first = last;
        else oldLast.next = last;
    }

    @Override
    public String dequeue() {
        String item = first.item;
        first = first.next;
        if (isEmpty()) last = null;
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
