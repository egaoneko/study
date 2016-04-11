package week1.unionfind;

// cost model: initialize (N), union (N), find (1) => total N^2
// Union too expensive
// Trees are flat, but too expensive to keep them flat
public class QuickFindUF implements UF {

    private int[] id;
    private int count;

    public QuickFindUF(int N) {
        id = new int[N];
        count = N;
        for (int i = 0; i < N; i++) {
            id[i] = i;
        }
        // set id of each object to itself
        // N array access
    }

    @Override
    public boolean connected(int p, int q) {
        validate(p);
        validate(q);
        return id[p] == id[q];
        // check whether p and q are in the same component
        // 2 array accesses
    }

    @Override
    public void union(int p, int q) {
        validate(p);
        validate(q);
        int pid = id[p];
        int qid = id[q];

        for (int i = 0; i < id.length; i++) {
            if (id[i] == pid) id[i] = qid;
        }
        count--;
        // change all entries with id[p] to id[q]
        // at most 2n + 2 array accesses
    }

    @Override
    public int count() {
        return count;
    }

    @Override
    public int find(int p) {
        validate(p);
        return id[p];
    }

    private void validate(int p) {
        int N = id.length;
        if (p < 0 || p >= N) {
            throw new IndexOutOfBoundsException("index " + p + " is not between 0 and " + (N-1));
        }
    }
}
