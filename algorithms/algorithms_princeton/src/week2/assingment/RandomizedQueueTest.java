package week2.assingment;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.NoSuchElementException;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

public class RandomizedQueueTest {

    private RandomizedQueue<Integer> randomizedQueue;

    @Before
    public void setup() {
        randomizedQueue = new RandomizedQueue<>();
    }

    @Test
    public void testRandomizedQueue() {

    }

    @Test
    public void testEnqueue() {
        randomizedQueue.enqueue(1);
        randomizedQueue.enqueue(2);
        randomizedQueue.enqueue(3);
        assertThat(randomizedQueue.size(), is(3));
    }

    @Test(expected = NullPointerException.class)
    public void testEnqueue_ItemIsNull_ShouldNullPointerException() {
        randomizedQueue.enqueue(null);
    }

    @Test
    public void testDequeue() {
        ArrayList<Integer> arr = new ArrayList<>();
        arr.add(1);
        arr.add(2);
        arr.add(3);
        randomizedQueue.enqueue(1);
        randomizedQueue.enqueue(2);
        randomizedQueue.enqueue(3);
        assertTrue(arr.contains(randomizedQueue.dequeue()));
        assertTrue(arr.contains(randomizedQueue.dequeue()));
        assertTrue(arr.contains(randomizedQueue.dequeue()));
        assertThat(randomizedQueue.size(), is(0));
    }

    @Test(expected = NoSuchElementException.class)
    public void testDequeue_RandomizedQueueIsEmpty_ShouldNullPointerException() {
        randomizedQueue.dequeue();
    }

    @Test
    public void testIteratorNext() {
        ArrayList<Integer> arr = new ArrayList<>();
        arr.add(1);
        arr.add(2);
        arr.add(3);
        randomizedQueue.enqueue(1);
        randomizedQueue.enqueue(2);
        randomizedQueue.enqueue(3);

        Iterator iterator = randomizedQueue.iterator();
        assertTrue(arr.contains(iterator.next()));
        assertTrue(arr.contains(iterator.next()));
        assertTrue(arr.contains(iterator.next()));
    }

    @Test(expected = NoSuchElementException.class)
    public void testIteratorNext_RandomizedQueueIsEmpty_ShouldNoSuchElementException() {
        Iterator iterator = randomizedQueue.iterator();
        iterator.next();
    }

    @Test(expected = UnsupportedOperationException.class)
    public void testIteratorRemove_ShouldUnsupportedOperationException() {
        Iterator iterator = randomizedQueue.iterator();
        iterator.remove();
    }
}
