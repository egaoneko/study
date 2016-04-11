package week1.unionfind;

// cost model: initialize (N), union(N, includes cost of finding roots), find(N) => total N^2
// Trees can get tall.
// Find too expensive (could be N array accesses)
public class QuickUnionUF implements UF{

    protected int[] parent;
    private int count;

    public QuickUnionUF(int N) {
        parent = new int[N];
        for (int i = 0; i < N; i++) {
            parent[i] = i;
        }
        // set parent of each object to itself
        // N array access
    }

    @Override
    public boolean connected(int p, int q) {
        validate(p);
        validate(q);
        return find(p) == find(q);
        // check if p and q have same root
        // depth of p and q array accesses
    }

    @Override
    public void union(int p, int q) {
        validate(p);
        validate(q);
        int i = find(p);
        int j = find(q);
        if (i == j) return;
        parent[i] = j;
        count--;
        // change root of p to point to root of q
        // depth of p and q array accesses
    }

    @Override
    public int count() {
        return count;
    }

    @Override
    public int find(int p) {
        validate(p);
        while (p != parent[p])
            p = parent[p];
        return p;
        // chase parent pointers until reach root
        // depth of i array accesses
    }

    protected void validate(int p) {
        int N = parent.length;
        if (p < 0 || p >= N) {
            throw new IndexOutOfBoundsException("index " + p + " is not between 0 and " + (N-1));
        }
    }
}
