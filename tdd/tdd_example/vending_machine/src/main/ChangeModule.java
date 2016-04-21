package main;

/**
 * Created by donghyun on 4/21/16.
 */
public class ChangeModule {

    enum COIN {
        KRW500(500), KRW100(100), KRW50(50), KRW10(10);

        private int value;

        COIN(int value) {
            this.value = value;
        }
    }

    public CoinSet getChangeCoinSet(int changeAmount) {
        CoinSet coinSet = new CoinSet();
        // 넘겨받은 변수에 직접 대입이 일어나지 않도록
        // remainChangeAmount 라는 지역 변수를 지정

        int remainChangeAmount = changeAmount;
        for (COIN coin : COIN.values()) {
            remainChangeAmount = addCoinsToCoinSet(remainChangeAmount, coinSet, coin.value);
        }
        return coinSet;
    }

    private int addCoinsToCoinSet(int changeAmount, CoinSet coinSet, int coinValue) {
        while (changeAmount >= coinValue) {
            changeAmount -= coinValue;
            coinSet.add(coinValue);
        }
        return changeAmount;
    }
}
