/**
 * Java Silver 学習サンプル - static の理解
 * 実行方法: javac StaticSample.java && java StaticSample
 */
public class StaticSample {

    // static フィールド（クラスに1つだけ、全インスタンスで共有）
    static int instanceCount = 0;

    // インスタンスフィールド（各インスタンスが独自の値を持つ）
    String name;
    int id;

    StaticSample(String name) {
        instanceCount++;          // static フィールドを更新
        this.id = instanceCount;
        this.name = name;
    }

    // static メソッド（インスタンスなしで呼べる）
    static int getCount() {
        return instanceCount;
        // return this.name; // コンパイルエラー！staticメソッドではthisが使えない
    }

    // インスタンスメソッド（staticメンバにアクセスできる）
    void printInfo() {
        System.out.println("ID=" + id + ", Name=" + name + ", Total=" + instanceCount);
    }

    // static 初期化ブロック（クラスロード時に1回だけ実行）
    static {
        System.out.println("【staticブロック】クラスが初めてロードされました");
    }

    public static void main(String[] args) {

        System.out.println("\n===== static フィールドの共有 =====");
        System.out.println("現在のインスタンス数: " + StaticSample.getCount()); // 0

        StaticSample a = new StaticSample("Alice");
        StaticSample b = new StaticSample("Bob");
        StaticSample c = new StaticSample("Carol");

        a.printInfo(); // ID=1, Name=Alice, Total=3
        b.printInfo(); // ID=2, Name=Bob, Total=3
        c.printInfo(); // ID=3, Name=Carol, Total=3

        System.out.println("クラス名でアクセス: " + StaticSample.instanceCount); // 3

        System.out.println("\n===== static の乗り越え（hiding） =====");
        // staticメソッドはオーバーライドではなく「ハイディング」
        Parent p = new Child();
        p.staticMethod();    // "Parent static"（参照型Parentのstaticメソッド）
        p.instanceMethod();  // "Child instance"（実行時型Childのインスタンスメソッド）

        System.out.println("\n===== final static（定数） =====");
        System.out.println("MAX_VALUE = " + Constants.MAX_VALUE);
        System.out.println("APP_NAME  = " + Constants.APP_NAME);
    }
}

class Parent {
    static void staticMethod()   { System.out.println("Parent static"); }
    void instanceMethod()        { System.out.println("Parent instance"); }
}

class Child extends Parent {
    // staticメソッドは「オーバーライド」ではなく「ハイディング（隠蔽）」
    static void staticMethod()   { System.out.println("Child static"); }

    @Override
    void instanceMethod()        { System.out.println("Child instance"); }
}

// 定数クラスのパターン（実務でよく使う）
class Constants {
    static final int MAX_VALUE = 100;
    static final String APP_NAME = "JavaSilverApp";

    private Constants() { } // インスタンス化禁止
}
