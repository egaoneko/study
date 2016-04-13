package week1.assignment;

import edu.princeton.cs.algs4.WeightedQuickUnionUF;

public class Percolation {

    private static final int BLOCKED = 0;
    private static final int OPENED = 1;
    private final int N;
    private final int virtualTop;
    private final int virtualBottom;
    private final WeightedQuickUnionUF uf;

    private int[][] grid;

    public Percolation(int N) throws IllegalAccessException {
        // create N-by-N UF, with all sites blocked
        if (N <= 0) throw new IllegalArgumentException();

        // init parameters
        this.N = N;
        virtualTop = N * N;
        virtualBottom = N * N + 1;
        uf = new WeightedQuickUnionUF(N * N + 2);

        grid = new int[N][N];

        // init virtual top and bottom;
        for (int j = 1; j < N + 1; j++) {
            uf.union(virtualTop, convertIndicesToId(1, j));
            uf.union(virtualBottom, convertIndicesToId(N, j));
        }
    }

    protected void checkIndices(int i, int j) throws IllegalAccessException {
        // is this indices ok?
        if (i <= 0 || i > N || j <= 0 || j > N) {
            throw new IllegalAccessException();
        }
    }

    public int convertIndicesToId(int i, int j) throws IllegalAccessException {
        // convert indices to id for union find
        // | (1,1) = 0  | (1,2) = 1  | (1,3) = 2  | (1,4) = 3  | (1,5) = 4  |
        // | (2,1) = 5  | (2,2) = 6  | (2,3) = 7  | (2,4) = 8  | (2,5) = 9  |
        // | (3,1) = 10 | (3,2) = 11 | (3,3) = 12 | (3,4) = 13 | (3,5) = 14 |
        // | (4,1) = 15 | (4,2) = 16 | (4,3) = 17 | (4,4) = 18 | (4,5) = 19 |
        // | (5,1) = 20 | (5,2) = 21 | (5,3) = 22 | (5,4) = 23 | (5,5) = 24 |
        checkIndices(i, j);
        return (i - 1) * N + (j - 1);
    }

    public void open(int i, int j) throws IllegalAccessException {
        // open site (row i, column j) if it is not open already
        int siteId;

        checkIndices(i, j);
        if (isOpen(i, j)) return;

        // convert indices to index
        int x = i - 1;
        int y = j - 1;

        // open site
        grid[x][y] = OPENED;
        siteId = convertIndicesToId(i, j);

        // TOP
        if (j > 1 && grid[x][y - 1] == OPENED)
            uf.union(siteId, convertIndicesToId(i, j - 1));

        // DOWN
        if (j < N && grid[x][y + 1] == OPENED)
            uf.union(siteId, convertIndicesToId(i, j + 1));

        // LEFT
        if (i > 1 && grid[x - 1][y] == OPENED)
            uf.union(siteId, convertIndicesToId(i - 1, j));

        // RIGHT
        if (i < N && grid[x + 1][y] == OPENED)
            uf.union(siteId, convertIndicesToId(i + 1, j));
    }

    public boolean isOpen(int i, int j) throws IllegalAccessException {
        // is site (row i, column j) open?
        checkIndices(i, j);

        // convert indices to index
        int x = i - 1;
        int y = j - 1;

        return grid[x][y] == OPENED;
    }

    public boolean isFull(int i, int j) throws IllegalAccessException {
        // is site (row i, column j) full?
        // This method for Percolation Visualizer.
        // This current method has a backwash problem occurred by virtual sites.
        // The solution about this problem is
        // "https://class.coursera.org/algs4partI-010/forum/thread?thread_id=233".
        checkIndices(i, j);

        return isOpen(i, j) && uf.connected(virtualTop, convertIndicesToId(i, j));
    }

    public boolean percolates() {
        // does the system percolate?
        return uf.connected(virtualTop, virtualBottom);
    }

    public WeightedQuickUnionUF getUf() {
        return this.uf;
    }

    public int getVirtualTop() {
        return virtualTop;
    }

    public int getVirtualBottom() {
        return virtualBottom;
    }

    public static void main(String[] args) {
        // test client (optional)
    }
}
