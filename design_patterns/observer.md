# 옵저버 패턴

한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체들한테 연락이 가고,
자동으로 내용이 갱신되는 방식으로 일대다(one-to-many) 의존성을 정의한다.

![diagram](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Observer.svg/854px-Observer.svg.png)

- 느슨한 결합 (Loose Coupling)

-  Push 방식 vs. Pull 방식

Push 방식 : Subject 는 데이터가 변경될 때 마다 Observer 들에게 알려준다.
- 장점 : 
Observer 는 Subject 에게 따로 데이터를 요청할 필요가 없다.
- 단점 : 
Observer 가 불필요한 데이터까지 받아야 되는 경우가 생긴다.

Pull 방식 : Observer 가 갱신된 데이터가 필요할 때 Getter 메소드를 이용해 Subject 로부터 데이터를 가져온다.
- 장점 : 
Observer 는 필요한 데이터만 가져올 수 있다.
Subject 가 확장되더라도 Subject 는 notify 메소드를 수정할 필요없이 Getter 메소드만 추가하면 된다.
- 단점 : 
Observer 는 필요한 데이터가 많을 수록 Getter 메소드를 여러 번 호출해야만 한다.

(Pull 방식이 더 옳은 것으로 간주된다고 합니다.)

```java
// Observer Interface
public interface Observer {
    public void update(float temperature, float humidity, float pressure);
}

// Subject Interface
public interface Subject {
    public void registerObserver(Observer o);
    public void removeObserver(Observer o);
    public void notifyObservers();
}

// DisplayElement Interface
public interface DisplayElement {
    public void display();
}

// WeatherData Class
public class WeatherData implements Subject {
 
    private ArrayList<Observer> observers;
    private float temperature;
    private float humidity;
    private float pressure;
 
    public WeatherData() {
        this.observers = new ArrayList<Observer>();
    }
 
    @Override
    public void registerObserver(Observer o) {
        observers.add(o);
    }
 
    @Override
    public void removeObserver(Observer o) {
        int i = observers.size();
         
        if (i >= 0)
            observers.remove(o);
    }
 
    @Override
    public void notifyObservers() {
        Observer observer;
         
        for (int i = 0; i < observers.size(); i++) {
            observer = observers.get(i);
            observer.update(temperature, humidity, pressure);
        }
    }
 
    public void notifyObservers(List<Observer> observerList) {
        Iterator<Observer> itr = observerList.iterator();
        Observer observer;
         
        while (itr.hasNext()) {
            observer = itr.next();
            observer.update(temperature, humidity, pressure);
        }
    }
     
    public void setMeasurements(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
         
        measurementsChanged();
    }
     
    public void measurementsChanged() {
        // 여기서 변경 사항을 수신받을 옵저버들을 선택할 수 있다.
        List<Observer> observerList = observers.subList(0, 2);
        notifyObservers(observerList);
    }
 
}

// CurrentConditionsDisplay Class
public class CurrentConditionsDisplay implements Observer, DisplayElement {
 
    private Subject weatherData;
    private float temperature;
    private float humidity;
     
    public CurrentConditionsDisplay(Subject weatherData) {
        this.weatherData = weatherData;
         
        weatherData.registerObserver(this);
    }
     
    @Override
    public void update(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
         
        display();
    }
 
    @Override
    public void display() {
        System.out.println("온도 : " + temperature);
        System.out.println("습도 : " + humidity);
        System.out.println();
    }
}
```