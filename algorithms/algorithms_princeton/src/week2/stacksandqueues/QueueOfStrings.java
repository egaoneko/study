package week2.stacksandqueues;

public interface QueueOfStrings {
    public void enqueue(String item);

    public String dequeue();

    public boolean isEmpty();

    public int size();
}
