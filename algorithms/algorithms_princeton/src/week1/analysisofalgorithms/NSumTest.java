package week1.analysisofalgorithms;

import org.junit.Test;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class NSumTest {

    private final int[] ARR = {30, -40, -20, -10, 40, 0, 10, 5};

    @Test
    public void testTwoSum() {
        assertThat(NSum.twoSumCount(ARR), is(2));
    }

    @Test
    public void testTwoSumFast() {
        assertThat(NSumFast.twoSumFastCount(ARR), is(2));
    }

    @Test
    public void testThreeSum() {
        assertThat(NSum.threeSumCount(ARR), is(4));
    }

    @Test
    public void testThreeSumFast() {
        assertThat(NSumFast.threeSumFastCount(ARR), is(4));
    }
}
