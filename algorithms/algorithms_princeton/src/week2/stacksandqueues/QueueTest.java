package week2.stacksandqueues;

import org.junit.Before;
import org.junit.Test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.Scanner;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class QueueTest {

    private Scanner sc;
    private final String expected = "to be or not to be ";
    private String actual = "";

    @Before
    public void setup() throws FileNotFoundException {
        final String FILE_DIRECTORY = "src/week2/stacksandqueues/source/";
        sc = new Scanner(new FileInputStream(FILE_DIRECTORY + "tobe.txt"));
    }

    @Test
    public void testLinkedQueueOfStrings() {
        LinkedQueueOfStrings linkedQueueOfStrings = new LinkedQueueOfStrings();
        actual = getStrings(sc, linkedQueueOfStrings);
        assertThat(actual, is(expected));
    }

    @Test
    public void testResizingArrayQueueOfStrings() {
        ResizingArrayQueueOfStrings resizingArrayQueueOfStrings = new ResizingArrayQueueOfStrings();
        actual = getStrings(sc, resizingArrayQueueOfStrings);
        assertThat(actual, is(expected));
    }

    private String getStrings(Scanner sc, QueueOfStrings queueOfStrings) {
        String actual = "";
        while (sc.hasNext()) {
            String s = sc.next();
            if (s.equals("-")) actual += queueOfStrings.dequeue() + " ";
            else queueOfStrings.enqueue(s);
        }
        return actual;
    }
}
