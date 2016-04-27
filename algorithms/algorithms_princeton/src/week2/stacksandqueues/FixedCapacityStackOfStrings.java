package week2.stacksandqueues;

public class FixedCapacityStackOfStrings implements StackOfStrings {
    protected String[] s;
    protected int N = 0;

    public FixedCapacityStackOfStrings(int capacity) {
        s = new String[capacity];
    }

    @Override
    public boolean isEmpty() {
        return N == 0;
    }

    @Override
    public void push(String item) {
        s[N++] = item;
    }

    @Override
    public String pop() {
        String item = s[--N];
        s[N] = null;    // avoid loitering
        return item;
    }

    @Override
    public int size() {
        return N;
    }
}
