package week1.assignment;

import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

public class PercolationTest {

    private static final int N = 5;
    private Percolation percolation;

    @Before
    public void setup() throws IllegalAccessException {
        percolation = new Percolation(N);
    }

    @Test
    public void testPercolation() throws IllegalAccessException {
        for (int j = 1; j < N + 1; j++) {
            assertTrue(percolation.getUf().connected(percolation.getVirtualTop(), percolation.convertIndicesToId(1, j)));
            assertTrue(percolation.getUf().connected(percolation.getVirtualBottom(), percolation.convertIndicesToId(N, j)));
        }
    }

    @Test
    public void testCheckIndices() throws IllegalAccessException {
        percolation.checkIndices(1, 1);

        try {
            percolation.checkIndices(6, 6);
            assertTrue(false);
        } catch (IllegalAccessException e) {
            assertTrue(true);
        }
    }

    @Test
    public void testConvertIndicesToId() throws IllegalAccessException {
        assertThat(percolation.convertIndicesToId(1, 1), is(0));
        assertThat(percolation.convertIndicesToId(N, N), is(24));
    }

    @Test
    public void testOpen() throws IllegalAccessException {
        assertFalse(percolation.getUf().connected(percolation.getVirtualTop(), percolation.getVirtualBottom()));
        for (int i = 1; i < N + 1; i++) {
            percolation.open(i, 1);
        }
        assertTrue(percolation.getUf().connected(percolation.getVirtualTop(), percolation.getVirtualBottom()));
    }

    @Test
    public void testIsOpen() throws IllegalAccessException {
        assertFalse(percolation.isOpen(1, 1));
        percolation.open(1, 1);
        assertTrue(percolation.isOpen(1, 1));
    }

    @Test
    public void testIsFull() throws IllegalAccessException {
        percolation.open(1, 1); percolation.open(1, 2);
        percolation.open(2, 1); percolation.open(2, 3);
        percolation.open(3, 1); percolation.open(3, 3);
        percolation.open(4, 4); percolation.open(4, 5);
        percolation.open(5, 1); percolation.open(5, 5);

        assertTrue(percolation.isFull(1, 2));
        assertTrue(percolation.isFull(3, 1));

        assertFalse(percolation.isFull(2, 3));
        assertFalse(percolation.isFull(4, 5));
    }

    @Test
    public void testPercolates() throws IllegalAccessException {
        assertFalse(percolation.percolates());
        for (int i = 1; i < N + 1; i++) {
            percolation.open(i, 1);
        }
        assertTrue(percolation.percolates());
    }

}
