# 커맨드 패턴

요구 사항을 객체로 캡슐화 할 수 있으며, 매개변수를 써서 여러가지 다른 요구 사항을 집어넣을 수도 있다.
또한 요청 내역을 큐에 저장하거나 로그로 기록할 수도 있고 작업 취소 기능도 지원이 가능하다.

![diagram](https://upload.wikimedia.org/wikipedia/commons/8/8e/Command_Design_Pattern_Class_Diagram.png)

- Client : Concrete Command 를 생성하고 Receiver를 설정한다.

- Invoker : Command 들을 관리하고 있고 Command 의 execute() 를 호출해서 Command 객체에게
특정 작업을 수행해 달라고 요청을 한다.

- Command : 모든 Command 객체에서 구현되어야 하는 인터페이스.

- Concrete Command : execute() 에서 Receiver 에 있는 Action 들을 호출해 요청받은 작업을 수행하도록 한다.
undo() 의 예를 들면, LightOnCommand 의 경우 undo() 의 내용은 light.off() 정도 될 것이다.

- Receiver : 요구 사항을 처리하기 위해 어떤 일을 수행해야 하는지 알고 있다.

- Macro Command : 여러 Command 들을 한번에 실행시킬 수 있는 새로운 종류의 Command. 

```java
// Command 인터페이스 선언
public interface Command {
    public void execute();
}

// 기능이 없는 클래스 선언
public class NoCommand implements Command {
 
    @Override
    public void execute() {
        System.out.println("설정된 기능이 없습니다.");
    }
}
 
// off 기능 추가
public class Light {
    public void on() {
        System.out.println("조명이 켜졌습니다.");
    }
     
    public void off() {
        System.out.println("조명이 꺼졌습니다.");
    }
}

// 전등을 켜기 위한 Command 클래스 선언
public class LightOnCommand implements Command {
     
    private Light light;
 
    public LightOnCommand(Light light) {
        this.light = light;
    }
     
    @Override
    public void execute() {
        light.on();
    }
}
 
// 전등을 끄는 클래스 구현
public class LightOffCommand implements Command {
     
    private Light light;
     
    public LightOffCommand(Light light) {
        this.light = light;
    }
 
    @Override
    public void execute() {
        light.off();
    }
}
 
// 리모컨 
public class RemoteControl {
 
    private Command[] onCommands;
    private Command[] offCommands;
     
    public RemoteControl() {
        onCommands = new Command[7];
        offCommands = new Command[7];
         
        Command noCommand = new NoCommand();
        for (int i = 0; i < 7; i++) {
            onCommands[i] = noCommand;
            offCommands[i] = noCommand;
        }
    }
     
    public void setCommand(int slot, Command onCommand, Command offCommand) {
        onCommands[slot] = onCommand;
        offCommands[slot] = offCommand;
    }
     
    public void onButtonPushed(int slot) {
        onCommands[slot].execute();
    }
     
    public void offButtonPushed(int slot) {
        offCommands[slot].execute();
    }
     
    @Override
    public String toString() {
        StringBuffer strBuff = new StringBuffer();
         
        strBuff.append("\n--------Remote Control--------\n");
        for (int i = 0; i < onCommands.length; i++) {
            strBuff.append("[slot " + i + "]" + onCommands[i].getClass().getName()
                    + "    " + offCommands[i].getClass().getName() + "\n");
        }
         
        return strBuff.toString();
    }
}

// 리모컨 테스트 클래스
public class RemoteControlTest {
     
    public static void main(String[] args) {
        SimpleRemoteControl remote = new SimpleRemoteControl();
        Light light = new Light();
        LightOnCommand lightOn = new LightOnCommand(light);
         
        remote.setCommand(lightOn);
        remote.buttonPressed();
    }
}
```

```java
public class MacroCommand impelnets Command{
    Commnad[] commands;
 
    public MacroCommand(Commnad[] commands){
        this.commands = commands;
    }
     
    public void execute(){
        for(int i=0; i<commdands.lentth; i++){
            commands[i].execute();
        }
    }
}
 
public class party{
    Light light = new Light("living Room");
    TV tv = new TV("Living Room");
    Stereo stereo = new stereo("Living Room");
    Hottbu hottub = new Hottub();
 
    LightOnCommand lightOn = new LightOnCOmmand(light);
    StereoOnCommand stereoOn = new StereoOnCommand(stereo);
    TVOnCommand tvOn = new VTOnCommnad(tv);
    HottubOnCommand hottubOn = new HottubOnCommand(hottub);
 
    Command[] partyOn = {lightOn, stereoOn, tvOn, hottubOn};
    Commnad[] partyOff = {lightOff, stereoOff, tvOff, hottubOff};
 
    MacroCommand partyOnMacro = new MacroCommand(partyOn);
    MacroCommand partyOffMacro = new MacroCommand(partyOff);
 
    remotoCOntrol.setCommand(0, partyOnMarco, partyOffMacro);
}
```