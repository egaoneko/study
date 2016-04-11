package week1.unionfind;

public interface UF {
    int find(int p);
    void union(int p, int q);
    boolean connected(int p, int q);
    int count();
}
