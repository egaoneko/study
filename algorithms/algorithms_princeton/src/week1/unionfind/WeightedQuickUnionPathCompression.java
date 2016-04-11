package week1.unionfind;

// cost model: initialize (N), union(lg*N, includes cost of finding roots), find(lg*N) => N * lgN
public class WeightedQuickUnionPathCompression extends WeightedQuickUnion {
    public WeightedQuickUnionPathCompression(int N) {
        super(N);
    }

    @Override
    public int find(int p) {
        validate(p);
        while (p != parent[p]) {
            parent[p] = parent[parent[p]];
            p = parent[p];
        }
        return p;
    }
}
