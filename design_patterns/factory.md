# 팩토리 메소드 패턴

객체를 생성하기 위한 인터페이스를 만듭니다. 어떤 클래스의 인스턴스를 만들지는 서브 클래스에서 결정하도록 합니다. 팩토리 메소드를 이용하면 인스턴스를 만드는 일을 서브클래스로 미룰 수 있습니다.

![factory method pattern](https://www.safaribooksonline.com/library/view/head-first-design/0596007124/httpatomoreillycomsourceoreillyimages1418829.png.jpg)

```java

// PizzaStore.java
public abstract class PizzaStore {
 
	abstract Pizza createPizza(String item);
 
	public Pizza orderPizza(String type) {
		Pizza pizza = createPizza(type);
		System.out.println("--- Making a " + pizza.getName() + " ---");
		pizza.prepare();
		pizza.bake();
		pizza.cut();
		pizza.box();
		return pizza;
	}
}

// ChicagoPizzaStore.java
public class ChicagoPizzaStore extends PizzaStore {

	Pizza createPizza(String item) {
        	if (item.equals("cheese")) {
            		return new ChicagoStyleCheesePizza();
        	} else if (item.equals("veggie")) {
        	    	return new ChicagoStyleVeggiePizza();
        	} else if (item.equals("clam")) {
        	    	return new ChicagoStyleClamPizza();
        	} else if (item.equals("pepperoni")) {
            		return new ChicagoStylePepperoniPizza();
        	} else return null;
	}
}

// NYPizzaStore.java
public class NYPizzaStore extends PizzaStore {

	Pizza createPizza(String item) {
		if (item.equals("cheese")) {
			return new NYStyleCheesePizza();
		} else if (item.equals("veggie")) {
			return new NYStyleVeggiePizza();
		} else if (item.equals("clam")) {
			return new NYStyleClamPizza();
		} else if (item.equals("pepperoni")) {
			return new NYStylePepperoniPizza();
		} else return null;
	}
}

```