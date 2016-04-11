package week1.analysisofalgorithms;

import org.junit.Test;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class BinarySearchTest {

    private final int[] ARR = {6, 13, 14, 25, 33, 43, 51, 53, 64, 72, 84, 93, 95, 96, 97};
    private final int[] ARR_WRONG = {6};

    @Test
    public void testBinarySearch() {
        assertThat(BinarySearch.binarySearch(ARR, 14), is(2));
        assertThat(BinarySearch.binarySearch(ARR, 15), is(-1));
        assertThat(BinarySearch.binarySearch(ARR_WRONG, 14), is(-1));
    }
}
