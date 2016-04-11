package week1.analysisofalgorithms;

import java.util.Arrays;

public class NSumFast {

    private static boolean containsDuplicates(int[] a) {
        for (int i = 1; i < a.length; i++)
            if (a[i] == a[i-1]) return true;
        return false;
    }

    // return number of distinct pairs (i, j) such that a[i] + a[j] = 0
    // NlgN
    public static int twoSumFastCount(int[] a) {
        int N = a.length;
        Arrays.sort(a);
        int cnt = 0;
        for (int i = 0; i < N; i++) {
            int j = Arrays.binarySearch(a, -a[i]);
            if (j > i) cnt++; // only count if a[i] < a[j] to avoid double counting
        }
        return cnt;
    }


    /**
     * Returns the number of triples (i, j, k) with i < j < k such that a[i] + a[j] + a[k] == 0.
     * @param a the array of integers
     * @return the number of triples (i, j, k) with i < j < k such that a[i] + a[j] + a[k] == 0
     */
    // N^2lgN
    public static int threeSumFastCount(int[] a) {
        int N = a.length;
        Arrays.sort(a);
        if (containsDuplicates(a)) throw new IllegalArgumentException("array contains duplicate integers");
        int cnt = 0;
        for (int i = 0; i < N; i++) {
            for (int j = i+1; j < N; j++) {
                int k = Arrays.binarySearch(a, -(a[i] + a[j]));
                if (k > j) cnt++; // only count if a[i] < a[j] < a[k] to avoid double counting
            }
        }
        return cnt;
    }
}
