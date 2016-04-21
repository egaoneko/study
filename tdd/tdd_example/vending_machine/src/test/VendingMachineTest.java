package test;

import main.ChangeModule;
import main.CoinSet;
import main.Drink;
import main.VendingMachine;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

/**
 * Created by donghyun on 4/21/16.
 */
public class VendingMachineTest {

    @Test   // 잔액확인
    public void testGetChangeAmount() throws Exception {
        VendingMachine machine = new VendingMachine();
        machine.putCoin(100);   // 동전 100원 투입
        assertEquals("투입금액 100원", 100, machine.getChangeAmount());

        machine.putCoin(500);
        assertEquals("추가 투입금액 500원", 600, machine.getChangeAmount());
    }

    @Test   // 거스름돈 50원
    public void testReturnChangeCoinSet_oneCoin_50() throws Exception {
        VendingMachine machine = new VendingMachine();
        machine.putCoin(100);
        machine.putCoin(100);
        machine.putCoin(500);
        machine.selectDrink(new Drink("Cola", 650));

        CoinSet expectedCoinSet = new CoinSet();    // 코인 컨테이너 클래스
        expectedCoinSet.add(50);
        assertEquals("700원 투입 후 650원 음료선택", expectedCoinSet, machine.getChangeCoinSet());
    }

    @Test   // 거스름돈 180원
    public void testReturnChangeCoinSet_coins_180() throws Exception {
        VendingMachine machine = new VendingMachine();
        machine.putCoin(100);
        machine.putCoin(100);
        machine.putCoin(500);
        machine.selectDrink(new Drink("Soda", 520));

        CoinSet expectedCoinSet = new CoinSet();    // 코인 컨테이너 클래스
        expectedCoinSet.add(100);
        expectedCoinSet.add(50);
        expectedCoinSet.add(10);
        expectedCoinSet.add(10);
        expectedCoinSet.add(10);
        assertEquals("700원 투입 후 520원 음료선택", expectedCoinSet, machine.getChangeCoinSet());
    }

    @Test   // 거스름돈 50원
    public void testReturnChangeCoinSet_oneCoin_50_withOut_scenario() throws Exception {
        ChangeModule module = new ChangeModule();
        CoinSet expectedCoinSet = new CoinSet();    // 코인 컨테이너 클래스
        expectedCoinSet.add(50);
        assertEquals("700원 투입 후 650원 음료선택", expectedCoinSet, module.getChangeCoinSet(50));
    }

    @Test   // 거스름돈 180원
    public void testReturnChangeCoinSet_coins_180_withOut_scenario() throws Exception {
        ChangeModule module = new ChangeModule();
        CoinSet expectedCoinSet = new CoinSet();    // 코인 컨테이너 클래스
        expectedCoinSet.add(100);
        expectedCoinSet.add(50);
        expectedCoinSet.add(10);
        expectedCoinSet.add(10);
        expectedCoinSet.add(10);
        assertEquals("700원 투입 후 520원 음료선택", expectedCoinSet, module.getChangeCoinSet(180));
    }
}
