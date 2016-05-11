package week2.assingment;

import org.junit.Before;
import org.junit.Test;

import java.util.Iterator;
import java.util.NoSuchElementException;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class DequeTest {

    private Deque<Integer> deque;

    @Before
    public void setup() {
        deque = new Deque<>();
    }

    @Test
    public void testDeque() {

    }

    @Test
    public void testAddFirst() {
        deque.addFirst(1);
        deque.addFirst(2);
        deque.addFirst(3);
        assertThat(deque.size(), is(3));
    }

    @Test(expected = NullPointerException.class)
    public void testAddFirst_ItemIsNull_ShouldNullPointerException(){
        deque.addFirst(null);
    }

    @Test
    public void testAddLast() {
        deque.addLast(1);
        deque.addLast(2);
        deque.addLast(3);
        assertThat(deque.size(), is(3));
    }

    @Test(expected = NullPointerException.class)
    public void testAddLast_ItemIsNull_ShouldNullPointerException(){
        deque.addLast(null);
    }

    @Test
    public void testRemoveFirst() {
        deque.addFirst(1);
        deque.addFirst(2);
        deque.addFirst(3);
        assertThat(deque.removeFirst(), is(3));
        assertThat(deque.removeFirst(), is(2));
        assertThat(deque.removeFirst(), is(1));
    }

    @Test(expected = NoSuchElementException.class)
    public void testRemoveFirst_DequeIsEmpty_ShouldNoSuchElementException(){
        deque.removeFirst();
    }

    @Test
    public void testRemoveLast() {
        deque.addLast(1);
        deque.addLast(2);
        deque.addLast(3);
        assertThat(deque.removeLast(), is(3));
        assertThat(deque.removeLast(), is(2));
        assertThat(deque.removeLast(), is(1));
    }

    @Test(expected = NoSuchElementException.class)
    public void testRemoveLast_DequeIsEmpty_ShouldNoSuchElementException(){
        deque.removeLast();
    }

    @Test
    public void testIteratorNext() {
        deque.addLast(1);
        deque.addLast(2);
        deque.addLast(3);

        Iterator iterator = deque.iterator();
        assertThat(iterator.next(), is(1));
        assertThat(iterator.next(), is(2));
        assertThat(iterator.next(), is(3));
    }

    @Test(expected = NoSuchElementException.class)
    public void testIteratorNext_DequeIsEmpty_ShouldNoSuchElementException() {
        Iterator iterator = deque.iterator();
        iterator.next();
    }

    @Test(expected = UnsupportedOperationException.class)
    public void testIteratorRemove_ShouldUnsupportedOperationException() {
        Iterator iterator = deque.iterator();
        iterator.remove();
    }
}
