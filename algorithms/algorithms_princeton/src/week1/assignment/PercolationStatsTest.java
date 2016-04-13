package week1.assignment;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class PercolationStatsTest {

    private static final int N = 200;
    private static final int T = 100;

    private PercolationStats percolationStats;

    @Before
    public void setup() throws IllegalAccessException {
        percolationStats = new PercolationStats(N, T);
    }

    @Test
    public void testPercolationStats() {

    }

    @Test
    public void testGetThreshold() throws IllegalAccessException {
        double sum = 0;

        for (int i = 0; i < T; i++) {
            sum += percolationStats.getThreshold(N);
        }

        assertEquals(0.59299, sum / (double) T, 0.01);
    }

    @Test
    public void testMean() {
        assertEquals(0.59299, percolationStats.mean(), 0.005);
    }

    @Test
    public void testStddev() {
        assertEquals(0.0087, percolationStats.stddev(), 0.002);
    }

    @Test
    public void testConfidenceLo(){
        assertEquals(0.59127, percolationStats.confidenceLo(), 0.005);
    }

    @Test
    public void testConfidenceHi(){
        assertEquals(0.59471, percolationStats.confidenceHi(), 0.005);
    }
}
