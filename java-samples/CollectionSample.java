/**
 * Java Silver 学習サンプル - コレクション・ラムダ式・Stream API
 * 実行方法: javac CollectionSample.java && java CollectionSample
 */
import java.util.*;
import java.util.stream.*;
import java.util.function.*;

public class CollectionSample {

    public static void main(String[] args) {

        System.out.println("===== ArrayList =====");
        List<String> fruits = new ArrayList<>();
        fruits.add("Banana");
        fruits.add("Apple");
        fruits.add("Cherry");
        fruits.add(1, "Avocado");       // インデックス1に挿入
        System.out.println(fruits);     // [Banana, Avocado, Apple, Cherry]
        System.out.println("size: " + fruits.size());
        fruits.remove("Avocado");       // 値で削除
        fruits.set(0, "Mango");         // 0番目を置換
        System.out.println(fruits);     // [Mango, Apple, Cherry]

        System.out.println("\n===== Collections ユーティリティ =====");
        List<Integer> nums = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9, 3));
        Collections.sort(nums);
        System.out.println("sort:    " + nums);   // [1, 2, 3, 5, 8, 9]
        Collections.reverse(nums);
        System.out.println("reverse: " + nums);   // [9, 8, 5, 3, 2, 1]
        System.out.println("max: " + Collections.max(nums));
        System.out.println("min: " + Collections.min(nums));

        System.out.println("\n===== HashMap =====");
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 90);
        scores.put("Bob", 80);
        scores.put("Carol", 95);
        scores.put("Alice", 92);        // Aliceを上書き

        System.out.println("Alice: " + scores.get("Alice"));            // 92
        System.out.println("Dave: " + scores.get("Dave"));              // null
        System.out.println("Dave(default): " + scores.getOrDefault("Dave", 0)); // 0
        System.out.println("containsKey: " + scores.containsKey("Bob")); // true

        // entrySetで全エントリを処理
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        System.out.println("\n===== HashSet =====");
        Set<String> set = new HashSet<>();
        set.add("A"); set.add("B"); set.add("A"); // "A"は重複無視
        System.out.println("set: " + set);         // [A, B]（順序不定）
        System.out.println("size: " + set.size()); // 2

        System.out.println("\n===== ラムダ式（基本） =====");
        // Comparator
        List<String> words = new ArrayList<>(Arrays.asList("banana", "apple", "cherry", "date"));
        words.sort((a, b) -> a.length() - b.length()); // 長さでソート
        System.out.println("長さ順: " + words);

        // Predicate
        Predicate<Integer> isEven = n -> n % 2 == 0;
        System.out.println("4は偶数: " + isEven.test(4));
        System.out.println("3は偶数: " + isEven.test(3));

        // Function
        Function<String, Integer> strToLen = String::length; // メソッド参照
        System.out.println("banana の長さ: " + strToLen.apply("banana"));

        System.out.println("\n===== Stream API =====");
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // 偶数を2倍にして収集
        List<Integer> doubled = numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * 2)
            .collect(Collectors.toList());
        System.out.println("偶数×2: " + doubled);

        // 合計・平均
        int sum = numbers.stream().mapToInt(Integer::intValue).sum();
        double avg = numbers.stream().mapToInt(Integer::intValue).average().orElse(0);
        System.out.println("合計: " + sum + ", 平均: " + avg);

        // 文字列の操作
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "Anna", "Ben");
        String result = names.stream()
            .filter(n -> n.startsWith("A"))
            .sorted()
            .collect(Collectors.joining(", "));
        System.out.println("Aで始まる人: " + result);

        // グルーピング
        Map<Integer, List<String>> byLength = names.stream()
            .collect(Collectors.groupingBy(String::length));
        System.out.println("長さでグループ: " + byLength);

        System.out.println("\n===== Predicate の合成 =====");
        Predicate<String> longName = s -> s.length() > 4;
        Predicate<String> startsWithA = s -> s.startsWith("A");
        Predicate<String> combined = longName.and(startsWithA);

        names.stream()
             .filter(combined)
             .forEach(n -> System.out.println("該当: " + n));
    }
}
