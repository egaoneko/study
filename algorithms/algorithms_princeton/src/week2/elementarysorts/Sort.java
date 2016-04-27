package week2.elementarysorts;

public class Sort {

    public static void selection(Comparable[] a) {
        int N = a.length;
        for (int i = 0; i < N; i++) {
            int min = i;
            for (int j = i + 1; j < N; j++) if (Utils.less(a[j], a[min])) min = j;
            Utils.exch(a, i, min);
        }
    }

    public static void insertion(Comparable[] a) {
        int N = a.length;
        for (int i = 0; i < N; i++)
            for (int j = i; j > 0; j--)
                if (Utils.less(a[j], a[j - 1]))
                    Utils.exch(a, j, j - 1);
                else break;

    }

    public static void shell(Comparable[] a) {
        int N = a.length;
        int h = 1;
        while (h < N / 3) h = 3 * h + 1; // 1, 4, 13, 40, 121, 364, ...

        while (h >= 1) { // h-sort the array.
            for (int i = h; i < N; i++) {
                for (int j = i; j >= h && Utils.less(a[j], a[j - h]); j -= h) // insertion sort
                    Utils.exch(a, j, j - h);
            }
            h = h / 3;
        }
    }
}
