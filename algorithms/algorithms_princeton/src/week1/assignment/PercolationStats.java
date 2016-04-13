package week1.assignment;

import edu.princeton.cs.algs4.StdOut;
import edu.princeton.cs.algs4.StdRandom;
import edu.princeton.cs.algs4.StdStats;

public class PercolationStats {

    private final int T;
    private double mean = 0;
    private double stddev = 0;

    public PercolationStats(int N, int T) throws IllegalAccessException {
        // perform T independent experiments on an N-by-N grid
        if (N <= 0  || T <= 0) throw new java.lang.IllegalArgumentException();

        // init parameter
        this.T = T;
        int n = N;

        double[] xValues = new double[T];

        for (int i = 0; i < T; i++) {
            xValues[i] = getThreshold(N);
        }
        this.mean = StdStats.mean(xValues);
        this.stddev = StdStats.stddev(xValues);
    }

    public double getThreshold(int N) throws IllegalAccessException {
        // get threshold by using Percolation Class
        if (N <= 0) throw new java.lang.IllegalArgumentException();

        int cnt = 0;
        Percolation percolation = new Percolation(N);

        while (!percolation.percolates()) {
            // open sites randomly
            int i = StdRandom.uniform(1, N + 1);
            int j = StdRandom.uniform(1, N + 1);

            if (!percolation.isOpen(i, j)) {
                percolation.open(i, j);
                cnt++;
            }
        }
        return (double) cnt / (double) (N * N);
    }

    public double mean() {
        // sample mean of percolation threshold
        return this.mean;
    }

    public double stddev() {
        // sample standard deviation of percolation threshold
        return this.stddev;
    }

    public double confidenceLo() {
        // low  endpoint of 95% confidence interval
        return this.mean - (1.96) * this.stddev / Math.sqrt(T);
        // 'Math.pow(x, 0.5)' is slow. Use 'Math.sqrt(x)' instead.
    }

    public double confidenceHi() {
        // high endpoint of 95% confidence interval
        return this.mean + (1.96) * this.stddev / Math.sqrt(T);
    }

    public static void main(String[] args) throws IllegalAccessException {
        // test client (described below)
        if (args.length < 2) throw new IllegalArgumentException();

        int N = Integer.parseInt(args[0]);
        int T = Integer.parseInt(args[1]);

        PercolationStats percolationStats = new PercolationStats(N, T);

        StdOut.println("mean                    = "
                + Double.toString(percolationStats.mean()));
        StdOut.println("stddev                  = "
                + Double.toString(percolationStats.stddev()));
        StdOut.println("95% confidence interval = "
                + Double.toString(percolationStats.confidenceLo()) + ", "
                + Double.toString(percolationStats.confidenceHi()));
    }
}
