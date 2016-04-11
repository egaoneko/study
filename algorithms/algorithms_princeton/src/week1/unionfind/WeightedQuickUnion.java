package week1.unionfind;

// cost model: initialize (N), union(lgN, includes cost of finding roots), find(lgN) => N * lgN
public class WeightedQuickUnion extends QuickUnionUF {
    protected int[] size;

    public WeightedQuickUnion(int N) {
        super(N);
        size = new int[N];
    }

    @Override
    public void union(int p, int q) {
        validate(p);
        validate(q);
        int i = find(p);
        int j = find(q);

        if (i==j) return;
        if (size[i] < size[j]) {
            parent[i] = j;
            size[j] += size[i];
        } else {
            parent[j] = i;
            size[i] += size[j];
        }
    }
}
