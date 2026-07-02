/**
 * Java Silver 学習サンプル - String / StringBuilder
 * 実行方法: javac StringSample.java && java StringSample
 */
public class StringSample {

    public static void main(String[] args) {

        System.out.println("===== String の基本 =====");

        String s1 = "Hello";
        String s2 = "Hello";
        String s3 = new String("Hello");

        // == は参照比較
        System.out.println(s1 == s2);        // true（文字列プールの同じオブジェクト）
        System.out.println(s1 == s3);        // false（new で別オブジェクト生成）
        System.out.println(s1.equals(s3));   // true（内容が同じ）

        System.out.println("\n===== String の主要メソッド =====");

        String text = "Java Silver Study";
        System.out.println("length:       " + text.length());           // 17
        System.out.println("charAt(5):    " + text.charAt(5));          // 'S'
        System.out.println("indexOf('i'): " + text.indexOf("i"));       // 2
        System.out.println("substring(5): " + text.substring(5));       // "Silver Study"
        System.out.println("sub(5,11):    " + text.substring(5, 11));   // "Silver"
        System.out.println("toUpperCase:  " + text.toUpperCase());
        System.out.println("toLowerCase:  " + text.toLowerCase());
        System.out.println("replace:      " + text.replace("Java", "Oracle"));
        System.out.println("contains:     " + text.contains("Silver")); // true
        System.out.println("startsWith:   " + text.startsWith("Java")); // true
        System.out.println("endsWith:     " + text.endsWith("Study"));  // true
        System.out.println("trim:         " + "  hello  ".trim());      // "hello"

        System.out.println("\n===== String.format =====");
        String formatted = String.format("名前: %s, 点数: %d点, 割合: %.1f%%", "山田", 85, 85.0);
        System.out.println(formatted);

        System.out.println("\n===== String の不変性（イミュータブル）=====");
        String a = "Hello";
        String b = a;
        a = a + " World";   // 新しいStringオブジェクトが作られる
        System.out.println("a: " + a);  // "Hello World"
        System.out.println("b: " + b);  // "Hello"（変わらない）

        System.out.println("\n===== StringBuilder =====");
        StringBuilder sb = new StringBuilder("Hello");
        sb.append(" World");            // 追記
        sb.insert(5, ",");              // 挿入
        sb.replace(7, 12, "Java");      // 置換
        sb.delete(5, 6);               // 削除
        sb.reverse();                   // 逆順
        System.out.println("reverse: " + sb.toString());

        sb = new StringBuilder("Java");
        sb.append(" is ").append("awesome!"); // メソッドチェーン
        System.out.println("chained: " + sb);

        System.out.println("\n===== ループ内の文字列結合比較 =====");
        long start;

        // Stringでの結合（遅い：毎回新オブジェクト生成）
        start = System.currentTimeMillis();
        String result = "";
        for (int i = 0; i < 10000; i++) result += i;
        System.out.println("String +=: " + (System.currentTimeMillis() - start) + "ms");

        // StringBuilderでの結合（速い）
        start = System.currentTimeMillis();
        StringBuilder sb2 = new StringBuilder();
        for (int i = 0; i < 10000; i++) sb2.append(i);
        String result2 = sb2.toString();
        System.out.println("StringBuilder: " + (System.currentTimeMillis() - start) + "ms");
    }
}
