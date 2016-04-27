package week2.stacksandqueues;

import org.junit.Before;
import org.junit.Test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.Scanner;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class StackTest {

    private Scanner sc;
    private final String expected = "to be not that or be ";
    private String actual = "";

    @Before
    public void setup() throws FileNotFoundException {
        final String FILE_DIRECTORY = "src/week2/stacksandqueues/source/";
        sc = new Scanner(new FileInputStream(FILE_DIRECTORY + "tobe.txt"));
    }

    @Test
    public void testLinkedStackOfStrings() {
        LinkedStackOfStrings stackOfStrings = new LinkedStackOfStrings();
        actual = getStrings(sc, stackOfStrings);
        assertThat(actual, is(expected));
    }

    @Test
    public void testFixedCapacityStackOfStrings() {
        FixedCapacityStackOfStrings fixedCapacityStackOfStrings = new FixedCapacityStackOfStrings(10);
        actual = getStrings(sc, fixedCapacityStackOfStrings);
        assertThat(actual, is(expected));
    }

    @Test
    public void testResizingArrayStackOfStrings() {
        ResizingArrayStackOfStrings resizingArrayStackOfStrings = new ResizingArrayStackOfStrings();
        actual = getStrings(sc, resizingArrayStackOfStrings);
        assertThat(actual, is(expected));
    }

    private String getStrings(Scanner sc, StackOfStrings stackOfStrings) {
        String actual = "";
        while (sc.hasNext()) {
            String s = sc.next();
            if (s.equals("-")) actual += stackOfStrings.pop() + " ";
            else stackOfStrings.push(s);
        }
        return actual;
    }

    @Test
    public void testStack() {
        Stack<String> stack = new Stack<>();
        while (sc.hasNext()) {
            String s = sc.next();
            if (s.equals("-")) actual += stack.pop() + " ";
            else stack.push(s);
        }
        assertThat(actual, is(expected));
    }

    @Test
    public void testFixedCapacityStack() {
        FixedCapacityStack<String> fixedCapacityStack = new FixedCapacityStack<>(10);
        while (sc.hasNext()) {
            String s = sc.next();
            if (s.equals("-")) actual += fixedCapacityStack.pop() + " ";
            else fixedCapacityStack.push(s);
        }
        assertThat(actual, is(expected));
    }
}
