package week2.elementarysorts;

import org.junit.Test;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class SortTest {
    private Integer[] actual = {3, 4, 1, 6, 7, 2, 4, 5};
    private Integer[] expected = {1, 2, 3, 4, 4, 5, 6, 7};

    @Test
    public void testLess_InUtils() {
        assertThat(Utils.less(1, 2), is(true));
        assertThat(Utils.less(2, 1), is(false));
        assertThat(Utils.less(1, 1), is(false));
    }

    @Test
    public void testExch_InUtils() {
        Integer[] actual = {1, 2, 3};
        Integer[] expected = {3, 2, 1};
        Utils.exch(actual, 0, 2);
        assertThat(actual, is(expected));
    }

    @Test
    public void testSelectionSort() {
        Sort.selection(actual);
        assertThat(actual, is(expected));
    }

    @Test
    public void testInsertionSort() {
        Sort.insertion(actual);
        assertThat(actual, is(expected));
    }

    @Test
    public void testShellSort() {
        Sort.insertion(actual);
        assertThat(actual, is(expected));
    }
}
