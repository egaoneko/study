package week2.stacksandqueues;

public class ResizingArrayStackOfStrings extends FixedCapacityStackOfStrings {
    public ResizingArrayStackOfStrings() {
        super(1);
    }

    @Override
    public void push(String item) {
        if (N == s.length) resize(2 * s.length);
        s[N++] = item;
    }

    @Override
    public String pop() {
        String item = s[--N];
        s[N] = null;    // avoid loitering
        if (N > 0 && N == s.length / 4) resize(s.length / 2);
        return item;
    }

    private void resize(int capacity) {
        String[] copy = new String[capacity];
        for (int i = 0; i < N; i++) {
            copy[i] = s[i];
        }
        s = copy;
    }
}
