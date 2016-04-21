package main;

/**
 * Created by donghyun on 4/21/16.
 */
public class Drink {
    private String name;
    private int price;

    public Drink(String name, int price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }
}
