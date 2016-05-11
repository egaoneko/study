package week2.stacksandqueues;

public class ResizingArrayQueueOfStrings implements QueueOfStrings {
    protected String[] s;
    protected int N = 0;
    protected int capacity = 0;
    protected int head, tail = 0;

    public ResizingArrayQueueOfStrings() {
        s = new String[1];
        capacity = 1;
    }

    @Override
    public boolean isEmpty() {
        return head == tail;
    }

    @Override
    public void enqueue(String item) {
        if (N == capacity) resize(2 * capacity);

        s[tail++] = item;
        if (tail == capacity) tail = 0;
        N++;
    }

    @Override
    public String dequeue() {
        String item = s[head];
        s[head++] = null;    // avoid loitering
        N--;
        if (head == capacity) head = 0;
        if (N > 0 && N == capacity / 4) resize(capacity / 2);
        return item;
    }

    private void resize(int newCapacity) {
        String[] copy = new String[newCapacity];
        int j = head;
        for (int i = 0; i < capacity; i++) {
            copy[i] = s[j++];
            if (j == capacity) j = 0;
            if (j == tail) {
                head = 0;
                tail = i+1;
                break;
            }
        }
        capacity = newCapacity;
        s = copy;
    }

    @Override
    public int size() {
        return N;
    }
}
