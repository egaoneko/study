# 데코레이터 패턴

객체에 추가적인 요건을 동적으로 첨가한다.
Decorator 는 서브클래스를 만드는 것을 통해서 기능을 유연하게 확장할 수 있는 방법을 제공한다.

Decorator 패턴을 사용하면 자잘한 객체들이 매우 많이 추가될 수 있고, Decorator를 너무 많이 사용하면 코드가 필요 이상으로 복잡해질 수도 있다.

![](http://cfs9.tistory.com/upload_control/download.blog?fhandle=YmxvZzgzMzI5QGZzOS50aXN0b3J5LmNvbTovYXR0YWNoLzAvOC5naWY%3D)

```java

// Beverage
public abstract class Beverage {
    protected String description = "제목없음";
 
    public abstract double cost();
 
    public String getDescription() {
        return description;
    }
}

// Espresso
public class Espresso extends Beverage {
 
    public Espresso() {
        description = "에스프레소 커피";
    }
 
    @Override
    public double cost() {
        return 1.99;
    }
 
}

// CondimentDecorator
public abstract class CondimentDecorator extends Beverage {
     
    // 모든 첨가물 데코레이터에서 getDescription() 메소드를 새로 구현하도록 한다.
    public abstract String getDescription();
}

// Mocha
public class Mocha extends CondimentDecorator {
 
    // 감싸고자 하는 음료(하우스블렌드, 다크로스트, 디카페인, 에스프레소)를 
    // 저장하는 인스턴스 
    private Beverage beverage;
     
    public Mocha(Beverage beverage) {
        this.beverage = beverage;
    }
     
    @Override
    public String getDescription() {
 
        // 음료 명에 첨가물명을 추가
        return beverage.getDescription() + ", 모카";
    }
 
    @Override
    public double cost() {
         
        // 음료 가격에 모카 가격을 추가
        return beverage.cost() + .20;
    }
}

// StarbuzzCoffee
public class StarbuzzCoffee {
    public static void main(String[] args) {
         
        // 에스프레소 커피
        Beverage espresso = new Espresso();
        System.out.println(espresso.getDescription() + " : $" + espresso.cost());
         
        // 다크로스트 커피 + 모카 + 모카 + 휘핑 크림
        Beverage darkRoast = new DarkRoast();
        darkRoast = new Mocha(darkRoast);       // 모카 추가
        darkRoast = new Mocha(darkRoast);       // 모카 한번 더 추가
        darkRoast = new Whip(darkRoast);        // 휘핑 크림 추가
        System.out.println(darkRoast.getDescription() + " : $" + darkRoast.cost());
         
        // 하우스블렌드 커피 + 두유 + 모카 + 휘핑크림
        Beverage houseBlend = new HouseBlend();
        houseBlend = new Soy(houseBlend);
        houseBlend = new Mocha(houseBlend);
        houseBlend = new Whip(houseBlend);
        System.out.println(houseBlend.getDescription() + " : $" + houseBlend.cost());
         
    }
}
```