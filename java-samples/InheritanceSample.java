/**
 * Java Silver 学習サンプル - 継承・オーバーライド・ポリモーフィズム・インターフェース
 * 実行方法: javac InheritanceSample.java && java InheritanceSample
 */

// インターフェース
interface Printable {
    void print();
    default String getHeader() { return "=== Document ==="; }
}

interface Exportable {
    void export(String path);
}

// 抽象クラス
abstract class Shape {
    String color;

    Shape(String color) {
        this.color = color;
    }

    abstract double area();     // 子クラスが実装必須

    void describe() {
        // area() は実行時の型（オーバーライド）で解決される
        System.out.printf("[%s] %s, 面積=%.2f%n", getClass().getSimpleName(), color, area());
    }
}

// 子クラス1
class Circle extends Shape {
    double radius;

    Circle(String color, double radius) {
        super(color);           // 親コンストラクタを呼ぶ（第1行目）
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

// 子クラス2
class Rectangle extends Shape implements Printable, Exportable {
    double width, height;

    Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() { return width * height; }

    @Override
    public void print() {
        System.out.println(getHeader());
        System.out.println("Rectangle: " + width + " x " + height);
    }

    @Override
    public void export(String path) {
        System.out.println("Export to: " + path);
    }
}

public class InheritanceSample {

    public static void main(String[] args) {

        System.out.println("===== ポリモーフィズム =====");
        // 参照型はShape（親）だが、実体は子クラス
        Shape[] shapes = {
            new Circle("赤", 5),
            new Rectangle("青", 4, 6),
            new Circle("緑", 3)
        };

        for (Shape s : shapes) {
            s.describe(); // 実行時型のarea()が呼ばれる（ポリモーフィズム）
        }

        System.out.println("\n===== instanceof と ダウンキャスト =====");
        for (Shape s : shapes) {
            System.out.print(s.getClass().getSimpleName() + " -> ");
            if (s instanceof Circle) {
                Circle c = (Circle) s;  // ダウンキャスト
                System.out.println("半径=" + c.radius);
            } else if (s instanceof Rectangle) {
                Rectangle r = (Rectangle) s;
                System.out.println("幅=" + r.width + ", 高さ=" + r.height);
            }
        }

        System.out.println("\n===== インターフェース =====");
        Rectangle rect = new Rectangle("黒", 3, 4);
        rect.print();
        rect.export("/tmp/report.pdf");

        // インターフェース型として扱う
        Printable p = new Rectangle("白", 2, 2);
        p.print();

        System.out.println("\n===== コンストラクタの実行順序 =====");
        new C_Class(); // A → B → C の順でコンストラクタが実行される
    }
}

class A_Class {
    A_Class() { System.out.println("A_Class コンストラクタ"); }
}
class B_Class extends A_Class {
    B_Class() { System.out.println("B_Class コンストラクタ"); }
}
class C_Class extends B_Class {
    C_Class() { System.out.println("C_Class コンストラクタ"); }
}
