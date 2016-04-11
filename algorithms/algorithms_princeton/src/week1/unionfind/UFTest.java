package week1.unionfind;

import org.junit.BeforeClass;
import org.junit.Test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import static org.junit.Assert.assertTrue;

public class UFTest {

    private static int N_TINY;
    private static List<int[]> CONNECTED_ITEMS_TINY;

    private static int N_MEDIUM;
    private static List<int[]> CONNECTED_ITEMS_MEDIUM;

    @BeforeClass
    public static void setup() throws FileNotFoundException {
        String FILE_DIRECTORY = "src/week1/unionfind/source/";

        Scanner sc = new Scanner(new FileInputStream(FILE_DIRECTORY + "tinyUF.txt"));
        N_TINY = sc.nextInt();
        CONNECTED_ITEMS_TINY = new ArrayList<>(N_TINY);
        setupList(sc, CONNECTED_ITEMS_TINY);

        sc = new Scanner(new FileInputStream(FILE_DIRECTORY + "mediumUF.txt"));
        N_MEDIUM = sc.nextInt();
        CONNECTED_ITEMS_MEDIUM = new ArrayList<>(N_MEDIUM);
        setupList(sc, CONNECTED_ITEMS_MEDIUM);
    }

    public static void setupList(Scanner sc, List<int[]> connectedItemst) {
        while (sc.hasNext()) {
            int p = sc.nextInt();
            int q = sc.nextInt();
            connectedItemst.add(new int[]{p, q});
        }
    }

    public void setConnectedItems(List<int[]> connectedItems, UF uf) {
        for (int[] item : connectedItems) {
            int p = item[0];
            int q = item[1];
            if (!uf.connected(p, q)) {
                uf.union(p, q);
            }
        }
    }

    public void testUF(List<int[]> connectedItems, UF uf) {
        for(int[] item : connectedItems) {
            assertTrue(uf.connected(item[0], item[1]));
        }
    }

    @Test
    public void testQuickFindUF_TINY() {
        UF uf = new QuickFindUF(N_TINY);
        setConnectedItems(CONNECTED_ITEMS_TINY, uf);
        testUF(CONNECTED_ITEMS_TINY, uf);
    }

    @Test
    public void testQuickFindUF_MEDIUM() {
        UF uf = new QuickFindUF(N_MEDIUM);
        setConnectedItems(CONNECTED_ITEMS_MEDIUM, uf);
        testUF(CONNECTED_ITEMS_MEDIUM, uf);
    }

    @Test
    public void testQuickUnionUF_TINY() {
        UF uf = new QuickUnionUF(N_TINY);
        setConnectedItems(CONNECTED_ITEMS_TINY, uf);
        testUF(CONNECTED_ITEMS_TINY, uf);
    }

    @Test
    public void testQuickUnionUF_MEDIUM() {
        UF uf = new QuickUnionUF(N_MEDIUM);
        setConnectedItems(CONNECTED_ITEMS_MEDIUM, uf);
        testUF(CONNECTED_ITEMS_MEDIUM, uf);
    }

    @Test
    public void testWeightedQuickUnionUF_TINY() {
        UF uf = new WeightedQuickUnion(N_TINY);
        setConnectedItems(CONNECTED_ITEMS_TINY, uf);
        testUF(CONNECTED_ITEMS_TINY, uf);

    }

    @Test
    public void testWeightedQuickUnionUF_MEDIUM() {
        UF uf = new WeightedQuickUnion(N_MEDIUM);
        setConnectedItems(CONNECTED_ITEMS_MEDIUM, uf);
        testUF(CONNECTED_ITEMS_MEDIUM, uf);

    }

    @Test
    public void testWeightedQuickUnionUFPathCompression_TINY() {
        UF uf = new WeightedQuickUnionPathCompression(N_TINY);
        setConnectedItems(CONNECTED_ITEMS_TINY, uf);
        testUF(CONNECTED_ITEMS_TINY, uf);
    }

    @Test
    public void testWeightedQuickUnionUFPathCompression_MEDIUM() {
        UF uf = new WeightedQuickUnionPathCompression(N_MEDIUM);
        setConnectedItems(CONNECTED_ITEMS_MEDIUM, uf);
        testUF(CONNECTED_ITEMS_MEDIUM, uf);
    }
}
