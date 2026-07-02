const QUESTIONS = [
  // ===== String (5問) =====
  {
    id: 1,
    category: "String",
    difficulty: "easy",
    question: "次のコードを実行した場合の出力として正しいものはどれか？",
    code: `String s1 = "Hello";
String s2 = "Hello";
String s3 = new String("Hello");
System.out.println(s1 == s2);
System.out.println(s1 == s3);`,
    choices: ["true / true", "true / false", "false / true", "false / false"],
    answer: 1,
    explanation: `【正解】B: true / false

■ なぜBが正解か
Javaでは文字列リテラル（"Hello"）は「文字列プール」に格納されます。
s1とs2は同じリテラルを指すため、参照先が同じ → ==はtrueになります。
s3はnew String()で新しいオブジェクトを生成するため、s1とは別の参照 → ==はfalseです。

■ 各選択肢の解説
A（true/true）: s3もプールを参照する場合に選びがちですが、new演算子は常に新オブジェクトを生成します。
C（false/true）: s1とs2がプールの別オブジェクトを指すと誤解した場合です。
D（false/false）: s1とs2が別オブジェクトと誤解しています。

■ 試験での注意点
==は参照比較、equalsは値比較です。文字列の内容を比較するには必ずequalsを使ってください。
s1.equals(s3) → trueになります。

■ 実務での活用
APIから取得した文字列と比較する際は必ずequalsを使います。==を使うと予期しないバグが発生します。

■ 関連コード
String a = new String("test");
String b = new String("test");
System.out.println(a == b);       // false（別オブジェクト）
System.out.println(a.equals(b));  // true（値が同じ）`,
    practicalNote: "実務では文字列比較には常にequals()を使用する。nullチェックが必要な場合は Objects.equals(a, b) が安全。"
  },
  {
    id: 2,
    category: "String",
    difficulty: "medium",
    question: "次のコードの出力として正しいものはどれか？",
    code: `String s = "Java Silver";
System.out.println(s.substring(5));
System.out.println(s.substring(5, 9));`,
    choices: ["Silver / Silv", "ilver / ilve", "Silver / Silver", " Silver / Silve"],
    answer: 0,
    explanation: `【正解】A: Silver / Silv

■ なぜAが正解か
substring(int beginIndex) は beginIndex の文字から末尾まで返します。
"Java Silver" のインデックスは:
J=0, a=1, v=2, a=3, (空白)=4, S=5, i=6, l=7, v=8, e=9, r=10

substring(5) → インデックス5から末尾 → "Silver"
substring(5, 9) → インデックス5から8まで（9は含まない） → "Silv"

■ 試験での注意点
substringの第2引数は「その手前まで」です。5〜9は「5,6,7,8」の4文字分になります。
indexOf, substring はインデックスが0始まりである点も頻出です。

■ 実務での活用
メールアドレスから@以降のドメイン部分を取り出すときなどに使います。
String email = "user@example.com";
String domain = email.substring(email.indexOf("@") + 1); // "example.com"`,
    practicalNote: "substringの第2引数は終端インデックスの次（exclusive）。CharAt()との組み合わせもよく使う。"
  },
  {
    id: 3,
    category: "String",
    difficulty: "medium",
    question: "StringとStringBuilderの違いについて正しい説明はどれか？",
    code: `String s = "Hello";
s += " World";  // (1)

StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");  // (2)`,
    choices: [
      "どちらも同じオブジェクトを変更する",
      "(1)は新しいStringオブジェクトを生成し、(2)は同じオブジェクトを変更する",
      "(1)は同じオブジェクトを変更し、(2)は新しいオブジェクトを生成する",
      "どちらも新しいオブジェクトを生成する"
    ],
    answer: 1,
    explanation: `【正解】B: (1)は新しいStringオブジェクトを生成し、(2)は同じオブジェクトを変更する

■ なぜBが正解か
Stringはイミュータブル（不変）です。s += " World" は裏側で
new String("Hello" + " World") が実行され、新しいオブジェクトが作られます。
元の "Hello" オブジェクトはそのまま残ります。

StringBuilderはミュータブル（可変）です。sb.append(" World") は
同じオブジェクトの内部バッファに追記します。新オブジェクトは作られません。

■ 試験での注意点
ループ内でString連結を繰り返すと大量のオブジェクトが生成されてパフォーマンスが悪化します。
ループ内ではStringBuilderを使うのが正解です。

■ 実務での活用
// 悪い例（大量のStringオブジェクト生成）
String result = "";
for (int i = 0; i < 1000; i++) { result += i; }

// 良い例
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) { sb.append(i); }
String result = sb.toString();`,
    practicalNote: "ループ内の文字列連結はStringBuilderを使う。Stringの+=はO(n)のコストがかかる。"
  },
  {
    id: 4,
    category: "String",
    difficulty: "hard",
    question: "次のコードの出力として正しいものはどれか？",
    code: `String s = "abcabc";
System.out.println(s.indexOf("b"));
System.out.println(s.lastIndexOf("b"));
System.out.println(s.contains("ca"));
System.out.println(s.replace("a", "X"));`,
    choices: [
      "1 / 4 / true / XbcXbc",
      "1 / 4 / false / XbcXbc",
      "2 / 5 / true / XbcXbc",
      "1 / 4 / true / abcabc"
    ],
    answer: 0,
    explanation: `【正解】A: 1 / 4 / true / XbcXbc

■ 各メソッドの動作
indexOf("b") → 最初に"b"が見つかるインデックス → 1
lastIndexOf("b") → 最後に"b"が見つかるインデックス → 4
contains("ca") → "ca"が含まれるか → true（"abcabc"に"ca"はある）
replace("a","X") → 全ての"a"を"X"に置換 → "XbcXbc"

■ 試験での注意点
replaceはすべての一致箇所を置換します（replaceFirstとの違い）。
replaceAll はJava正規表現を使うので"."や"+"は特殊文字として扱われます。

■ 実務での活用
replace はSQLクエリのプレースホルダ置換などに使いますが、
実務ではより安全なPreparedStatementやString.format()を使いましょう。`,
    practicalNote: "replaceは全置換、replaceFirstは最初の1箇所のみ。replaceAllは正規表現を使うので注意。"
  },
  {
    id: 5,
    category: "String",
    difficulty: "medium",
    question: "次のコードの出力として正しいものはどれか？",
    code: `String s = "  Hello World  ";
System.out.println(s.trim().toLowerCase());
System.out.println("abc".toUpperCase());
System.out.println(String.valueOf(100));`,
    choices: [
      "hello world / ABC / 100",
      "Hello World / ABC / 100",
      "hello world / abc / 100",
      "コンパイルエラー"
    ],
    answer: 0,
    explanation: `【正解】A: hello world / ABC / 100

■ 各メソッドの動作
trim() → 前後の空白を除去 → "Hello World"
toLowerCase() → 全て小文字 → "hello world"
toUpperCase() → 全て大文字 → "ABC"
String.valueOf(100) → int型をStringに変換 → "100"

■ 試験での注意点
trim()はASCII空白（スペース、タブ）のみ除去します。
全角スペースは除去されません（Java11以降はstrip()が全角にも対応）。
メソッドチェーンは左から順に実行されます。

■ 実務での活用
ユーザー入力のバリデーション処理で trim() + isEmpty() を組み合わせて使います。
String input = userInput.trim();
if (input.isEmpty()) { /* エラー処理 */ }`,
    practicalNote: "Java11以降はstrip()推奨。trim()は全角スペースを除去しない点に注意。"
  },

  // ===== 配列 (4問) =====
  {
    id: 6,
    category: "配列",
    difficulty: "easy",
    question: "次のコードの出力として正しいものはどれか？",
    code: `int[] arr = new int[5];
System.out.println(arr[0]);
System.out.println(arr.length);

String[] names = new String[3];
System.out.println(names[0]);`,
    choices: [
      "0 / 5 / null",
      "0 / 5 / \"\"",
      "null / 5 / null",
      "コンパイルエラー"
    ],
    answer: 0,
    explanation: `【正解】A: 0 / 5 / null

■ なぜAが正解か
Javaの配列は宣言時に自動的に初期化されます。
int配列の初期値 → 0
boolean配列の初期値 → false
参照型（String等）の初期値 → null

arr.length はフィールドです（メソッドではない）。括弧()は不要です。

■ 試験での注意点
length はフィールド（arr.length）で、StringのlengthはメソッドString.length()です。
混同しやすいため注意してください。

■ ArrayIndexOutOfBoundsException
arr[5] にアクセスするとこの例外が発生します（インデックスは0〜4）。

■ 実務での活用
配列の代わりにArrayListを使うと動的にサイズ変更できます。
固定長で高速アクセスが必要な場面では配列が有効です。`,
    practicalNote: "配列のlengthはフィールド（括弧なし）。String.length()はメソッド（括弧あり）。この違いは頻出。"
  },
  {
    id: 7,
    category: "配列",
    difficulty: "medium",
    question: "次のコードの出力として正しいものはどれか？",
    code: `int[] a = {1, 2, 3};
int[] b = a;
b[0] = 99;
System.out.println(a[0]);`,
    choices: ["1", "99", "コンパイルエラー", "実行時エラー"],
    answer: 1,
    explanation: `【正解】B: 99

■ なぜBが正解か
配列はオブジェクトです。b = a は配列の参照をコピーするため、
aとbは同じ配列オブジェクトを指しています。
b[0] = 99 を実行すると、aとbが指す共通の配列が変更されます。
そのため a[0] も99になります。

■ 試験での注意点
プリミティブ型（int, boolean等）は値のコピーが渡されます。
参照型（配列、オブジェクト）は参照のコピーが渡されます。
この違いは「値渡し」と「参照渡し」の概念として試験に頻出です。

■ 配列のコピーを作りたい場合
int[] c = Arrays.copyOf(a, a.length);  // 別オブジェクトとしてコピー
// または
int[] c = a.clone();`,
    practicalNote: "配列の代入は参照コピー。独立したコピーが必要な場合はArrays.copyOf()やclone()を使う。"
  },
  {
    id: 8,
    category: "配列",
    difficulty: "medium",
    question: "次の多次元配列に関するコードの出力として正しいものはどれか？",
    code: `int[][] matrix = {{1, 2, 3}, {4, 5, 6}};
System.out.println(matrix.length);
System.out.println(matrix[0].length);
System.out.println(matrix[1][2]);`,
    choices: ["2 / 3 / 6", "3 / 2 / 6", "2 / 3 / 5", "6 / 3 / 6"],
    answer: 0,
    explanation: `【正解】A: 2 / 3 / 6

■ なぜAが正解か
matrix.length → 行数 = 2（{1,2,3}と{4,5,6}の2行）
matrix[0].length → 0行目の列数 = 3（1,2,3の3要素）
matrix[1][2] → 1行目（{4,5,6}）の2列目 = 6（インデックスは0から）

■ 試験での注意点
matrix.length で「外側の配列（行数）」を取得します。
matrix[i].length で「i行目の列数」を取得します。
インデックスは0始まりです。matrix[1][2] は2行目・3列目です。

■ 実務での活用
行列計算、表形式のデータ処理、画像処理（ピクセル操作）などで使われます。
実務では2次元配列よりList<List<T>>を使うことが多いです。`,
    practicalNote: "二次元配列は配列の配列。各行のlengthは個別に持つため、ジャグ配列（行ごとに列数が違う）も作れる。"
  },
  {
    id: 9,
    category: "配列",
    difficulty: "hard",
    question: "次のコードを実行した場合の結果として正しいものはどれか？",
    code: `int[] arr = {3, 1, 4, 1, 5};
java.util.Arrays.sort(arr);
System.out.println(java.util.Arrays.toString(arr));
System.out.println(java.util.Arrays.binarySearch(arr, 4));`,
    choices: [
      "[1, 1, 3, 4, 5] / 3",
      "[3, 1, 4, 1, 5] / 2",
      "[1, 1, 3, 4, 5] / 2",
      "[1, 1, 3, 4, 5] / 4"
    ],
    answer: 0,
    explanation: `【正解】A: [1, 1, 3, 4, 5] / 3

■ なぜAが正解か
Arrays.sort(arr) はデフォルトで昇順ソートします。
{3,1,4,1,5} → {1,1,3,4,5}

Arrays.toString(arr) は配列を文字列表現に変換します。
（直接System.out.printlnに配列を渡すと "[I@1b6d3586" のようなハッシュ値が表示されます）

Arrays.binarySearch(arr, 4) はソート済み配列から4を二分探索します。
{1,1,3,4,5} でインデックス3の位置に4があります。→ 3

■ 試験での注意点
binarySearchはソート済み配列にのみ使えます。未ソートで使うと結果は不定です。
Arrays.sort()はvoidを返します（戻り値なし）。

■ 実務での活用
大量データの高速検索に二分探索（O(log n)）は有効ですが、
実務ではHashMapのほうが使いやすい場面が多いです。`,
    practicalNote: "binarySearchはソート後に使うこと。未ソートでは動作保証なし。"
  },

  // ===== static (4問) =====
  {
    id: 10,
    category: "static",
    difficulty: "easy",
    question: "次のコードの出力として正しいものはどれか？",
    code: `class Counter {
    static int count = 0;
    Counter() { count++; }
}
public class Main {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        Counter c3 = new Counter();
        System.out.println(Counter.count);
    }
}`,
    choices: ["0", "1", "3", "コンパイルエラー"],
    answer: 2,
    explanation: `【正解】C: 3

■ なぜCが正解か
staticフィールド（count）はクラス全体で共有される変数です。
インスタンスを何個作っても、countはクラスに1つだけ存在します。
コンストラクタでcount++が3回呼ばれるため、最終的にcountは3です。

Counter.count のようにクラス名でアクセスできます（推奨）。
c1.count でもアクセスできますが、staticフィールドと紛らわしいため非推奨です。

■ 試験での注意点
staticフィールドは「クラス変数」とも呼ばれます。
インスタンス変数（staticなし）は各オブジェクトが独自の値を持ちます。

■ 実務での活用
シングルトンパターン、設定値の共有、カウンターなどに使います。
ただしstatic変数は「グローバル変数」的な性質を持つため乱用は避けましょう。`,
    practicalNote: "staticフィールドはクラスに1つだけ。マルチスレッド環境ではスレッドセーフに注意が必要。"
  },
  {
    id: 11,
    category: "static",
    difficulty: "medium",
    question: "次のコードに関して正しい記述はどれか？",
    code: `class MyClass {
    int instanceVar = 10;
    static int staticVar = 20;

    static void staticMethod() {
        System.out.println(staticVar);   // (A)
        System.out.println(instanceVar); // (B)
    }
}`,
    choices: [
      "(A)も(B)もコンパイルできる",
      "(A)はコンパイルできるが、(B)はコンパイルエラー",
      "(A)はコンパイルエラーだが、(B)はコンパイルできる",
      "(A)も(B)もコンパイルエラー"
    ],
    answer: 1,
    explanation: `【正解】B: (A)はコンパイルできるが、(B)はコンパイルエラー

■ なぜBが正解か
staticメソッド内では、インスタンス変数（instanceVar）にアクセスできません。
理由：staticメソッドはインスタンスなしで呼び出せるため、
どのインスタンスのinstanceVarを参照すればよいか不明だからです。

staticメソッドからアクセスできるもの：
✅ staticフィールド（staticVar）
✅ staticメソッド
✅ ローカル変数
❌ インスタンスフィールド（instanceVar）
❌ インスタンスメソッド（thisを使ったもの）

■ 試験での注意点
「staticメソッドからnon-staticメンバは参照できない」は頻出の落とし穴です。
インスタンスメソッドからはstaticメンバにアクセスできます（逆は不可）。

■ 実務での活用
staticメソッドはユーティリティクラス（Math, Arrays, Collections等）でよく使われます。
オブジェクトの状態に依存しない処理に向いています。`,
    practicalNote: "staticメソッドはインスタンスなしで動くため、インスタンス変数を使えない。これは設計上の制約。"
  },
  {
    id: 12,
    category: "static",
    difficulty: "hard",
    question: "次のコードの出力として正しいものはどれか？",
    code: `class Parent {
    static String msg = "Parent";
    static void print() { System.out.println("Parent static"); }
}
class Child extends Parent {
    static String msg = "Child";
    static void print() { System.out.println("Child static"); }
}
public class Main {
    public static void main(String[] args) {
        Parent obj = new Child();
        System.out.println(obj.msg);
        obj.print();
    }
}`,
    choices: [
      "Child / Child static",
      "Parent / Parent static",
      "Child / Parent static",
      "Parent / Child static"
    ],
    answer: 1,
    explanation: `【正解】B: Parent / Parent static

■ なぜBが正解か
staticメンバはポリモーフィズムの対象外です。
staticフィールドやstaticメソッドは、変数の宣言型（参照型）で決まります。

Parent obj = new Child(); の場合、
obj の宣言型は Parent なので、
obj.msg → Parent.msg → "Parent"
obj.print() → Parent.print() → "Parent static"

■ 試験での注意点
インスタンスメソッドはオーバーライド（実行時多態）されますが、
staticメソッド・フィールドはオーバーライドされません（ハイディング）。
これは試験で非常に頻出の落とし穴です。

■ 実務での活用
staticメソッドのオーバーライドができないため、ポリモーフィズムを使いたい場面では
staticを避けてインスタンスメソッドを使いましょう。`,
    practicalNote: "staticメソッドはhidingであり、オーバーライドではない。参照型で解決される。"
  },

  // ===== 継承 / オーバーライド (5問) =====
  {
    id: 13,
    category: "継承",
    difficulty: "easy",
    question: "次のコードの出力として正しいものはどれか？",
    code: `class Animal {
    String name = "Animal";
    void speak() { System.out.println("..."); }
}
class Dog extends Animal {
    String name = "Dog";
    @Override
    void speak() { System.out.println("Woof"); }
}
public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.speak();
        System.out.println(a.name);
    }
}`,
    choices: ["Woof / Dog", "... / Animal", "Woof / Animal", "... / Dog"],
    answer: 2,
    explanation: `【正解】C: Woof / Animal

■ なぜCが正解か
a.speak() → インスタンスメソッドはオーバーライドが適用されます。
実体はDogオブジェクトなので Dog.speak() が呼ばれ → "Woof"

a.name → フィールドはポリモーフィズムの対象外です。
宣言型（Animal）のフィールドが参照されます → "Animal"

■ 試験での注意点
「メソッドはオーバーライド（実行時の型）」「フィールドは宣言型」という違いは超頻出です。
フィールドはオーバーライドではなく「ハイディング（隠蔽）」が起きます。

■ @Overrideアノテーションの重要性
@Overrideをつけると、オーバーライドできていない場合にコンパイルエラーになります。
スペルミスや引数の型違いを防ぐために必ずつけましょう。`,
    practicalNote: "メソッドはオーバーライド（実行時型）、フィールドは宣言型。これは設計上の理由であり、フィールドをprivateにすることで意図しないハイディングを防げる。"
  },
  {
    id: 14,
    category: "継承",
    difficulty: "medium",
    question: "次のコードの出力として正しいものはどれか？",
    code: `class A {
    A() { System.out.println("A constructor"); }
}
class B extends A {
    B() {
        System.out.println("B constructor");
    }
}
class C extends B {
    C() {
        System.out.println("C constructor");
    }
}
public class Main {
    public static void main(String[] args) {
        new C();
    }
}`,
    choices: [
      "C constructor",
      "A constructor / B constructor / C constructor",
      "C constructor / B constructor / A constructor",
      "コンパイルエラー"
    ],
    answer: 1,
    explanation: `【正解】B: A constructor / B constructor / C constructor

■ なぜBが正解か
Javaでは、子クラスのコンストラクタを呼ぶと、自動的に親クラスのコンストラクタが先に呼ばれます。
これはコンストラクタの先頭に暗黙的に super() が挿入されるためです。

実行順序：
1. new C() → C()コンストラクタ開始
2. 暗黙の super() → B()コンストラクタ開始
3. 暗黙の super() → A()コンストラクタ開始
4. "A constructor" 出力
5. "B constructor" 出力
6. "C constructor" 出力

■ 試験での注意点
コンストラクタの実行順は「親から子へ」です。
super()はコンストラクタの第1行目にしか書けません。
super(引数)で親の特定コンストラクタを呼ぶこともできます。`,
    practicalNote: "コンストラクタチェーンはspringなどのDIコンテナの初期化順を理解するための基礎知識。"
  },
  {
    id: 15,
    category: "オーバーライド",
    difficulty: "medium",
    question: "オーバーライドのルールとして正しいものはどれか？",
    code: `class Parent {
    protected int calc(int x) { return x * 2; }
}
class Child extends Parent {
    // 以下のうち正しいオーバーライドはどれか？
}`,
    choices: [
      "public int calc(int x) { return x * 3; }",
      "private int calc(int x) { return x * 3; }",
      "protected int calc(int x, int y) { return x; }",
      "protected String calc(int x) { return \"ok\"; }"
    ],
    answer: 0,
    explanation: `【正解】A: public int calc(int x) { return x * 3; }

■ オーバーライドのルール
1. メソッド名・引数リスト（型・数）が完全に一致すること
2. 戻り値型が同じか、共変戻り値型（サブクラス）であること
3. アクセス修飾子は「同じか、より広く」しかできない

■ 各選択肢の解説
A → protectedをpublicに広げるのはOK ✅
B → protectedをprivateに狭めるのはNG（コンパイルエラー）❌
C → 引数が(int,int)に変わっている → これはオーバーロードで別メソッド ❌
D → 戻り値がintからStringに変わっている → コンパイルエラー ❌

■ 試験での注意点
オーバーライドとオーバーロードの違いは頻出です。
オーバーライド：同じシグネチャ（名前+引数）で継承先で再定義
オーバーロード：同じ名前で引数が異なる複数のメソッドを定義`,
    practicalNote: "アクセス修飾子は広げることはできるが、狭めることはできない。共変戻り値型はJava5以降で利用可能。"
  },
  {
    id: 16,
    category: "ポリモーフィズム",
    difficulty: "hard",
    question: "次のコードの出力として正しいものはどれか？",
    code: `interface Shape {
    double area();
    default String describe() { return "Shape"; }
}
class Circle implements Shape {
    double r;
    Circle(double r) { this.r = r; }
    public double area() { return 3.14 * r * r; }
    public String describe() { return "Circle r=" + r; }
}
class Rect implements Shape {
    double w, h;
    Rect(double w, double h) { this.w = w; this.h = h; }
    public double area() { return w * h; }
}
public class Main {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(2), new Rect(3, 4) };
        for (Shape s : shapes) {
            System.out.println(s.describe() + " area=" + s.area());
        }
    }
}`,
    choices: [
      "Circle r=2.0 area=12.56 / Shape area=12.0",
      "Shape area=12.56 / Shape area=12.0",
      "Circle r=2.0 area=12.56 / コンパイルエラー",
      "コンパイルエラー"
    ],
    answer: 0,
    explanation: `【正解】A: Circle r=2.0 area=12.56 / Shape area=12.0

■ なぜAが正解か
Circle は describe() をオーバーライドしているため → "Circle r=2.0"
area() = 3.14 × 2 × 2 = 12.56

Rect は describe() をオーバーライドしていないため、
interfaceのdefaultメソッドが呼ばれる → "Shape"
area() = 3 × 4 = 12.0

■ defaultメソッド（Java 8以降）
interfaceにメソッドの実装を持たせる機能です。
実装クラスがオーバーライドしなければdefaultが使われます。
これによりinterfaceの後方互換性を保ちながら機能追加が可能です。

■ 試験での注意点
ポリモーフィズムでは実行時の型（Circleまたは Rect）のメソッドが呼ばれます。
defaultメソッドはオーバーライドがない場合のフォールバックです。`,
    practicalNote: "defaultメソッドはJava8でInterfaceに追加。Springのインターフェース設計でよく活用される。"
  },

  // ===== インターフェース / 抽象クラス (3問) =====
  {
    id: 17,
    category: "インターフェース",
    difficulty: "medium",
    question: "インターフェースと抽象クラスの違いについて正しい説明はどれか？",
    code: `// 抽象クラスの例
abstract class Vehicle {
    int speed;
    abstract void move();
    void stop() { System.out.println("Stopped"); }
}

// インターフェースの例
interface Flyable {
    void fly(); // 暗黙的にpublic abstract
    default void land() { System.out.println("Landing"); }
}`,
    choices: [
      "インターフェースはインスタンス変数を持てるが、抽象クラスは持てない",
      "クラスは複数のインターフェースを実装できるが、抽象クラスは1つしか継承できない",
      "抽象クラスはコンストラクタを持てないが、インターフェースは持てる",
      "インターフェースのメソッドはデフォルトでprivateになる"
    ],
    answer: 1,
    explanation: `【正解】B: クラスは複数のインターフェースを実装できるが、抽象クラスは1つしか継承できない

■ 抽象クラスとインターフェースの主な違い

| 特徴 | 抽象クラス | インターフェース |
|------|-----------|----------------|
| インスタンス変数 | 持てる | 持てない（定数のみ） |
| 継承/実装 | 1つのみextends | 複数implementsできる |
| コンストラクタ | 持てる | 持てない |
| アクセス修飾子 | 任意 | メソッドはpublic |
| 多重継承 | 不可 | 実質可能 |

■ 各選択肢の解説
A → 逆です。インターフェースはインスタンス変数を持てません（定数static final のみ）
C → 逆です。抽象クラスはコンストラクタを持てます。
D → インターフェースのメソッドはデフォルトでpublic abstractです（Java9以降はprivateも可能）

■ 使い分けのポイント
抽象クラス：「is-a」関係（Dogは動物である）→ 共通実装を持たせたい場合
インターフェース：「can-do」関係（Dogは泳げる）→ 機能の追加・多重実装したい場合`,
    practicalNote: "SpringフレームワークはインターフェースベースのDIを多用。Service、Repositoryはインターフェースで定義が基本。"
  },
  {
    id: 18,
    category: "抽象クラス",
    difficulty: "medium",
    question: "次のコードに関して正しい記述はどれか？",
    code: `abstract class Base {
    abstract void doWork();
    void init() { System.out.println("Init"); }
}
class Impl extends Base {
    void doWork() { System.out.println("Work"); }
}
public class Main {
    public static void main(String[] args) {
        Base b = new Impl();
        b.init();
        b.doWork();
        // Base x = new Base(); (A)
    }
}`,
    choices: [
      "Init / Work と出力され、(A)はコンパイルエラー",
      "Init / Work と出力され、(A)もコンパイルできる",
      "Work / Init と出力され、(A)はコンパイルエラー",
      "コンパイルエラー"
    ],
    answer: 0,
    explanation: `【正解】A: Init / Work と出力され、(A)はコンパイルエラー

■ なぜAが正解か
b.init() → BaseクラスのinIt()が実行される → "Init"
b.doWork() → ポリモーフィズムにより実体ImplのdoWork()が実行される → "Work"

(A) new Base() → 抽象クラスはインスタンス化できません。コンパイルエラーです。

■ 抽象クラスのルール
・abstract クラスはインスタンス化不可（new できない）
・abstract メソッドは必ずサブクラスでオーバーライドしなければならない
・すべてのabstractメソッドを実装しないサブクラスも abstract にする必要がある

■ 実務での活用
テンプレートメソッドパターンで活用されます。
共通の処理の骨格を抽象クラスに定義し、詳細を子クラスに任せる設計です。`,
    practicalNote: "抽象クラスはnewできない。テンプレートメソッドパターンの基本として設計でよく使われる。"
  },

  // ===== 例外処理 (5問) =====
  {
    id: 19,
    category: "例外処理",
    difficulty: "easy",
    question: "次のコードの出力として正しいものはどれか？",
    code: `public class Main {
    public static void main(String[] args) {
        try {
            System.out.println("try");
            int x = 10 / 0;
            System.out.println("after divide");
        } catch (ArithmeticException e) {
            System.out.println("catch: " + e.getMessage());
        } finally {
            System.out.println("finally");
        }
    }
}`,
    choices: [
      "try / catch: / by zero / finally",
      "try / after divide / finally",
      "try / catch: / by zero",
      "try / finally"
    ],
    answer: 0,
    explanation: `【正解】A: try / catch: / by zero / finally

■ なぜAが正解か
"try" が出力される
10 / 0 でArithmeticExceptionが発生する
"after divide" はスキップされる
catchブロックでe.getMessage()が呼ばれ "/ by zero" が返される
finallyブロックは必ず実行される

■ finallyの重要な性質
finallyは例外が発生しても発生しなくても必ず実行されます。
ファイルのclose、DBコネクションの返却など、リソース解放処理に使います。

■ 試験での注意点
try-catch-finally の実行順序は頻出です。
try内で例外が発生した場合、以降の処理はスキップされます。
finallyはreturnの前にも実行されます（重要！）。

■ 実務での活用
Java7以降はtry-with-resources構文でより安全にリソース解放ができます：
try (FileInputStream fis = new FileInputStream("file.txt")) { ... }`,
    practicalNote: "finallyはreturnより先に実行される。リソース解放はtry-with-resourcesで行うのが現代のベストプラクティス。"
  },
  {
    id: 20,
    category: "例外処理",
    difficulty: "medium",
    question: "例外の種類に関して正しい記述はどれか？",
    code: `// (A) チェック例外
class MyCheckedException extends Exception { }

// (B) 非チェック例外
class MyUncheckedException extends RuntimeException { }

void method1() throws MyCheckedException {
    throw new MyCheckedException();
}
void method2() {
    throw new MyUncheckedException(); // throwsなしでOK
}`,
    choices: [
      "チェック例外も非チェック例外も、throwsで宣言しなければならない",
      "チェック例外はthrowsで宣言またはcatchが必須だが、非チェック例外は不要",
      "非チェック例外はthrowsで宣言が必須だが、チェック例外は不要",
      "どちらも宣言不要"
    ],
    answer: 1,
    explanation: `【正解】B: チェック例外はthrowsで宣言またはcatchが必須だが、非チェック例外は不要

■ Javaの例外階層
Throwable
├── Error（OutOfMemoryError等）← 通常キャッチしない
└── Exception
    ├── RuntimeException（非チェック例外）← throws不要
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   └── ClassCastException
    └── その他のException（チェック例外）← throws or catch が必須
        ├── IOException
        ├── SQLException
        └── FileNotFoundException

■ チェック例外の処理方法（どちらか必須）
1. try-catchでキャッチする
2. throwsで呼び出し元に委譲する

■ 試験での注意点
RuntimeExceptionとそのサブクラスは非チェック例外です。
試験では「throws宣言が必要か不要か」という問題がよく出ます。

■ 実務での活用
チェック例外：IOException（ファイル操作）、SQLException（DB操作）等
非チェック例外：NPEはデバッグで最もよく見る例外です。`,
    practicalNote: "チェック例外はコンパイル時に強制対応。非チェック例外はプログラムバグとして捉える設計が一般的。"
  },
  {
    id: 21,
    category: "例外処理",
    difficulty: "hard",
    question: "次のコードの出力として正しいものはどれか？",
    code: `public class Main {
    static int test() {
        try {
            return 1;
        } finally {
            return 2;
        }
    }
    public static void main(String[] args) {
        System.out.println(test());
    }
}`,
    choices: ["1", "2", "コンパイルエラー", "1 と 2 が両方出力される"],
    answer: 1,
    explanation: `【正解】B: 2

■ なぜBが正解か
tryブロックでreturn 1が実行されますが、finallyが必ず実行されます。
finallyブロックのreturn 2がtryのreturn 1を上書きします。
結果として 2 が返されます。

■ 試験での注意点
これは非常に重要なJavaの動作です。
finallyにreturnがあると、tryのreturn値が無効になります。
試験でよく狙われる「finallyはreturnよりも後に実行される」という特性です。

■ 実務での活用
finallyにreturnを書くのは非常に危険なアンチパターンです。
例外が握りつぶされる可能性があるため、実務ではfinallyにreturnは書きません。
IDEの多くはこのパターンを警告します。`,
    practicalNote: "finallyのreturnはtryのreturnを上書きする。実務ではfinallyにreturnは書かないこと。"
  },
  {
    id: 22,
    category: "例外処理",
    difficulty: "medium",
    question: "次のコードで、コンパイルエラーが発生するものはどれか？",
    code: `// (A)
try {
    throw new IOException();
} catch (IOException e) {
    System.out.println(e);
}

// (B)
try {
    System.out.println("ok");
} catch (IOException e) {
    System.out.println(e);
}

// (C)
try {
    throw new IOException();
} catch (Exception e) {
    System.out.println(e);
}`,
    choices: ["(A)のみ", "(B)のみ", "(C)のみ", "(A)(B)(C)すべて正常"],
    answer: 1,
    explanation: `【正解】B: (B)のみ

■ なぜBが正解か
(A) → tryブロックでIOExceptionをスロー、catchで捕捉 → 正常
(B) → tryブロックでIOExceptionが発生する可能性がないのに、catchにチェック例外(IOException)を書くとコンパイルエラー
(C) → catchにExceptionを書くのはOK（IOExceptionはExceptionのサブクラス）

■ 試験での注意点
非チェック例外（RuntimeException等）はtryブロックで発生しなくてもcatchに書けます。
チェック例外はtryブロック内でthrowされる可能性がない場合、catchに書くとコンパイルエラーです。

■ 実務での活用
不要なcatchを書くとコードが読みにくくなります。
実際に発生する例外だけをcatchしましょう。`,
    practicalNote: "チェック例外はthrowの可能性がなければcatchできない。非チェック例外はそのルールが適用されない。"
  },

  // ===== コレクション (4問) =====
  {
    id: 23,
    category: "コレクション",
    difficulty: "easy",
    question: "次のコードの出力として正しいものはどれか？",
    code: `import java.util.*;
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add("Cherry");
list.add(1, "Blueberry");
System.out.println(list);
System.out.println(list.size());`,
    choices: [
      "[Apple, Blueberry, Banana, Cherry] / 4",
      "[Blueberry, Apple, Banana, Cherry] / 4",
      "[Apple, Banana, Blueberry, Cherry] / 4",
      "[Apple, Blueberry, Banana, Cherry] / 3"
    ],
    answer: 0,
    explanation: `【正解】A: [Apple, Blueberry, Banana, Cherry] / 4

■ なぜAが正解か
add("Apple") → [Apple]
add("Banana") → [Apple, Banana]
add("Cherry") → [Apple, Banana, Cherry]
add(1, "Blueberry") → インデックス1に挿入 → [Apple, Blueberry, Banana, Cherry]

add(int index, E element)はindexの位置に挿入し、後ろにずらします。
size()は要素数を返します → 4

■ ArrayListの特徴
・動的にサイズが変わる配列
・インデックスでアクセスO(1)
・途中への挿入・削除はO(n)（後ろの要素をずらすため）

■ 試験での注意点
listのindexは0始まりです。
set(index, element)はindexの要素を「置換」します。
add(index, element)はindexに「挿入」します。

■ 実務での活用
データベースから取得したレコードをリストで管理するのに頻繁に使います。`,
    practicalNote: "ArrayListはindex操作がO(1)で高速。頻繁な挿入・削除が必要なら LinkedListが適切。"
  },
  {
    id: 24,
    category: "コレクション",
    difficulty: "medium",
    question: "次のMapに関するコードの出力として正しいものはどれか？",
    code: `import java.util.*;
Map<String, Integer> map = new HashMap<>();
map.put("Alice", 90);
map.put("Bob", 80);
map.put("Alice", 95);  // 上書き
System.out.println(map.get("Alice"));
System.out.println(map.get("Charlie"));
System.out.println(map.size());`,
    choices: [
      "90 / null / 3",
      "95 / null / 2",
      "90 / null / 2",
      "95 / 0 / 2"
    ],
    answer: 1,
    explanation: `【正解】B: 95 / null / 2

■ なぜBが正解か
"Alice"キーに90を登録後、95で上書き → getで95が返る
"Charlie"は存在しないキー → nullが返る（0ではない）
"Alice"と"Bob"の2エントリ → size()は2

■ HashMapの特徴
・Key-Value形式でデータを管理
・同じKeyでput()すると値が上書きされる
・存在しないKeyのget()はnullを返す
・順序は保証されない（LinkedHashMapは挿入順を保持）

■ 試験での注意点
getOrDefault(key, defaultValue)を使うとnullを避けられます：
map.getOrDefault("Charlie", 0) → 0

■ 実務での活用
ユーザーIDをKey、ユーザー情報をValueとして管理するなど、
一意なIDによる高速検索（O(1)）が必要な場面で使います。`,
    practicalNote: "HashMapのget()は存在しないkeyにnullを返す。getOrDefault()を使うとデフォルト値を指定できて安全。"
  },
  {
    id: 25,
    category: "コレクション",
    difficulty: "medium",
    question: "次のコードの出力として正しいものはどれか？",
    code: `import java.util.*;
Set<String> set = new HashSet<>();
set.add("A");
set.add("B");
set.add("A");
set.add("C");
System.out.println(set.size());
System.out.println(set.contains("B"));`,
    choices: [
      "4 / true",
      "3 / true",
      "3 / false",
      "4 / false"
    ],
    answer: 1,
    explanation: `【正解】B: 3 / true

■ なぜBが正解か
HashSetは重複を許可しません。
"A"が2回追加されますが、2回目は無視されます。
結果: {A, B, C} → size()は3

contains("B") → "B"は存在するのでtrueを返します。

■ HashSetの特徴
・重複不可（同じ値は1つだけ保持）
・順序は保証されない
・add()は追加成功時true、重複時falseを返す
・contains()がO(1)で非常に高速

■ Set vs List
List：重複を許す、インデックスでアクセス可
Set：重複不可、インデックスなし、高速な存在チェック

■ 実務での活用
「既に処理済みIDのリスト」「ユニークなユーザーIDの集合」など、
重複を排除したいデータ管理に使います。`,
    practicalNote: "Setは重複排除のデータ構造。containsがO(1)なので、大量データの存在チェックに向いている。"
  },
  {
    id: 26,
    category: "コレクション",
    difficulty: "hard",
    question: "次のコードの出力として正しいものはどれか？",
    code: `import java.util.*;
List<Integer> list = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5));
Collections.sort(list);
System.out.println(list);
Collections.reverse(list);
System.out.println(list);
System.out.println(Collections.max(list));`,
    choices: [
      "[1, 1, 3, 4, 5] / [5, 4, 3, 1, 1] / 5",
      "[1, 1, 3, 4, 5] / [1, 1, 3, 4, 5] / 5",
      "[3, 1, 4, 1, 5] / [5, 1, 4, 1, 3] / 5",
      "[1, 1, 3, 4, 5] / [5, 4, 3, 1, 1] / 1"
    ],
    answer: 0,
    explanation: `【正解】A: [1, 1, 3, 4, 5] / [5, 4, 3, 1, 1] / 5

■ なぜAが正解か
Collections.sort(list) → 昇順ソート → [1, 1, 3, 4, 5]
Collections.reverse(list) → 逆順 → [5, 4, 3, 1, 1]
Collections.max(list) → 最大値 → 5

■ Collectionsクラスのよく使うメソッド
sort(list) → 昇順ソート
reverse(list) → 逆順
shuffle(list) → ランダムシャッフル
min(collection) → 最小値
max(collection) → 最大値
frequency(collection, obj) → 要素の出現回数

■ 試験での注意点
Arrays.asList()は固定サイズリストを返します（add/removeは不可）。
new ArrayList<>(Arrays.asList(...))でサイズ変更可能なリストになります。

■ 実務での活用
ランキング表示（sort）、ページング（subList）、統計処理（min/max/frequency）に使います。`,
    practicalNote: "Collections.sort()はリスト自体を変更する（破壊的操作）。コピーが必要な場合は事前にnew ArrayList<>でコピーする。"
  },

  // ===== ラムダ式 (4問) =====
  {
    id: 27,
    category: "ラムダ式",
    difficulty: "easy",
    question: "次のラムダ式に関するコードの出力として正しいものはどれか？",
    code: `import java.util.*;
import java.util.function.*;
List<String> list = Arrays.asList("Banana", "Apple", "Cherry");
list.sort((a, b) -> a.compareTo(b));
System.out.println(list);`,
    choices: [
      "[Banana, Apple, Cherry]",
      "[Apple, Banana, Cherry]",
      "[Cherry, Banana, Apple]",
      "コンパイルエラー"
    ],
    answer: 1,
    explanation: `【正解】B: [Apple, Banana, Cherry]

■ なぜBが正解か
(a, b) -> a.compareTo(b) は昇順ソートのComparatorです。
compareTo は辞書順で比較し、a < b のとき負の値を返します。
結果: アルファベット順（昇順）に並ぶ → [Apple, Banana, Cherry]

■ ラムダ式の基本構文
(引数) -> 処理

// 従来の書き方
list.sort(new Comparator<String>() {
    public int compare(String a, String b) {
        return a.compareTo(b);
    }
});

// ラムダ式
list.sort((a, b) -> a.compareTo(b));

// メソッド参照（さらに簡潔）
list.sort(String::compareTo);

■ 試験での注意点
ラムダ式が使えるのは@FunctionalInterface（抽象メソッドが1つのinterface）のみです。
Comparator、Runnable、Predicate等が代表例です。`,
    practicalNote: "ラムダ式はSpring BootのStreamAPI、CompletableFuture、イベントリスナーで多用される。読めることが重要。"
  },
  {
    id: 28,
    category: "ラムダ式",
    difficulty: "medium",
    question: "次のStream APIを使ったコードの出力として正しいものはどれか？",
    code: `import java.util.*;
import java.util.stream.*;
List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);
List<Integer> result = nums.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * 3)
    .collect(Collectors.toList());
System.out.println(result);`,
    choices: [
      "[2, 4, 6]",
      "[6, 12, 18]",
      "[3, 6, 9, 12, 15, 18]",
      "[1, 3, 5]"
    ],
    answer: 1,
    explanation: `【正解】B: [6, 12, 18]

■ なぜBが正解か
元のリスト: [1, 2, 3, 4, 5, 6]

filter(n -> n % 2 == 0) → 偶数のみ残す → [2, 4, 6]
map(n -> n * 3) → 各要素を3倍 → [6, 12, 18]
collect(Collectors.toList()) → Listに変換

■ Stream APIの主な操作
【中間操作（処理をつなぐ）】
filter(predicate) → 条件で絞り込む
map(function) → 各要素を変換
sorted() → ソート
distinct() → 重複除去
limit(n) → 先頭n件

【終端操作（結果を出す）】
collect() → コレクションに変換
count() → 件数
forEach() → 各要素を処理
reduce() → 集計

■ 試験での注意点
Streamは一度使うと再利用できません（一方向の処理パイプライン）。
中間操作は遅延評価（終端操作が呼ばれるまで実行されない）です。`,
    practicalNote: "Stream APIはJava8の重要機能。DBのSQLのような宣言的な処理記述が可能。実務でのコレクション操作に必須。"
  },
  {
    id: 29,
    category: "ラムダ式",
    difficulty: "hard",
    question: "次のコードの出力として正しいものはどれか？",
    code: `import java.util.function.*;
Predicate<Integer> isEven = n -> n % 2 == 0;
Predicate<Integer> isPositive = n -> n > 0;
Predicate<Integer> combined = isEven.and(isPositive);

System.out.println(combined.test(4));
System.out.println(combined.test(-2));
System.out.println(isEven.negate().test(3));`,
    choices: [
      "true / false / true",
      "true / false / false",
      "true / true / true",
      "false / false / true"
    ],
    answer: 0,
    explanation: `【正解】A: true / false / true

■ なぜAが正解か
combined = isEven.and(isPositive) → 偶数かつ正の数

combined.test(4) → 4は偶数(true) かつ 正(true) → true
combined.test(-2) → -2は偶数(true) だが 負(false) → false
isEven.negate().test(3) → 「偶数でない」の否定 → 3は奇数なのでisEven=false、negate()でtrue

■ Predicateのメソッド
test(T t) → 条件判定（booleanを返す）
and(Predicate other) → 論理AND（両方trueの時true）
or(Predicate other) → 論理OR（どちらかtrueの時true）
negate() → 論理NOT（結果を反転）

■ 試験での注意点
java.util.function パッケージの主な型：
Predicate<T> → T → boolean
Function<T,R> → T → R
Consumer<T> → T → void
Supplier<T> → () → T

■ 実務での活用
バリデーション処理やフィルタリング条件の組み合わせに使います。`,
    practicalNote: "Predicateはfilter()の引数として頻繁に使われる。and/or/negateで条件の組み合わせが簡潔に書ける。"
  },

  // ===== データ型・演算子 (3問) =====
  {
    id: 30,
    category: "データ型と変数",
    difficulty: "easy",
    question: "次のコードのコンパイル・実行結果として正しいものはどれか？",
    code: `byte b = 100;
int i = b;
long l = i;
double d = l;
System.out.println(d);`,
    choices: [
      "100.0",
      "100",
      "コンパイルエラー",
      "実行時エラー"
    ],
    answer: 0,
    explanation: `【正解】A: 100.0

■ なぜAが正解か
byte → int → long → double の順は「暗黙的な型変換（拡大変換）」であり、
明示的なキャストなしに代入できます。

拡大変換の順序（自動変換可能）:
byte → short → int → long → float → double

最終的にdouble型として出力されるため "100.0" となります。

■ 試験での注意点
縮小変換（double → int 等）は明示的なキャストが必要です：
double d = 3.14;
int i = (int) d; // 3（小数点以下切り捨て）

float に代入する場合は F サフィックスが必要：
float f = 3.14F;（3.14はデフォルトでdouble型）

■ データ型の範囲（試験頻出）
byte: -128〜127
short: -32768〜32767
int: 約±21億
long: 約±922京
float: 単精度浮動小数点
double: 倍精度浮動小数点`,
    practicalNote: "拡大変換は暗黙OK、縮小変換はキャスト必須。intをbyteにキャストすると下位8ビットのみ残り値が変わることがある。"
  },
  {
    id: 31,
    category: "演算子",
    difficulty: "medium",
    question: "次のコードの出力として正しいものはどれか？",
    code: `int a = 5;
int b = 3;
System.out.println(a / b);
System.out.println(a % b);
System.out.println((double) a / b);
System.out.println(a++ + ++b);`,
    choices: [
      "1 / 2 / 1.6666666666666667 / 9",
      "1 / 2 / 1.0 / 9",
      "1 / 2 / 1.6666666666666667 / 10",
      "2 / 2 / 1.6666666666666667 / 9"
    ],
    answer: 0,
    explanation: `【正解】A: 1 / 2 / 1.6666666666666667 / 9

■ 各行の解説
5 / 3 → int同士の除算 → 商は1（小数点以下切り捨て）
5 % 3 → 剰余 → 2（5 = 3×1 + 2）
(double) a / b → aをdoubleにキャスト後に除算 → 5.0/3 = 1.6666...
a++ → 後置インクリメント：式の評価後にaを増やす（使用値=5）
++b → 前置インクリメント：式の評価前にbを増やす（使用値=4）
5 + 4 = 9

■ 試験での注意点
a++ と ++a の違いは最頻出事項です。
a++：現在値を使ってから増やす（後置）
++a：増やしてから値を使う（前置）

■ 整数除算に注意
int / int はint → 5/2=2（2.5にならない）
一方をdoubleにキャストすれば小数点以下も計算されます。`,
    practicalNote: "整数除算の結果は整数。金額計算などで精度が必要な場合はBigDecimalを使う。"
  },
  {
    id: 32,
    category: "条件分岐",
    difficulty: "medium",
    question: "次のswitch文の出力として正しいものはどれか？",
    code: `int day = 3;
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
    case 3:
        System.out.println("Midweek");
    case 4:
        System.out.println("Thursday");
        break;
    default:
        System.out.println("Other");
}`,
    choices: [
      "Midweek",
      "Midweek / Thursday",
      "Thursday",
      "Midweek / Thursday / Other"
    ],
    answer: 1,
    explanation: `【正解】B: Midweek / Thursday

■ なぜBが正解か
day=3 なのでcase 3にマッチします。
case 2: はfall-through（breakなし）でcase 3:に続きます。
"Midweek" を出力します。
case 3: にbreakがないため、case 4:にfall-through（処理が流れる）します。
"Thursday" を出力します。
case 4: にbreakがあるためここで終了。

■ fall-throughとは
switchのcaseにbreakがない場合、次のcaseに処理が流れます。
これは意図的な利用（複数ケースで同じ処理）と意図せぬバグの両方の原因になります。

■ 試験での注意点
switchのfall-throughは頻出問題です。
breakの有無をよく確認しましょう。

■ Java14以降のswitch式（参考）
String result = switch (day) {
    case 1 -> "Monday";
    case 2, 3 -> "Midweek";
    default -> "Other";
}; // 自動的にfall-throughしない`,
    practicalNote: "switchのfall-throughは意図しないバグの原因。Java14以降の'switch式'はfall-throughがなく安全。"
  },
  {
    id: 33,
    category: "繰り返し処理",
    difficulty: "medium",
    question: "次のコードの出力として正しいものはどれか？",
    code: `outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) continue outer;
        System.out.print(i + "" + j + " ");
    }
}`,
    choices: [
      "00 01 02 10 11 12 20 21 22",
      "00 10 20",
      "00 10 20 ",
      "00 02 10 12 20 22"
    ],
    answer: 2,
    explanation: `【正解】C: 00 10 20 （末尾スペースあり）

■ なぜCが正解か
ラベル付きcontinue（continue outer）は外側のforループの次のイテレーションに進みます。

i=0: j=0 → "00 " 出力。j=1 → continue outer（外側ループのi=1へ）
i=1: j=0 → "10 " 出力。j=1 → continue outer（外側ループのi=2へ）
i=2: j=0 → "20 " 出力。j=1 → continue outer（外側ループ終了）

結果: "00 10 20 " が出力されます。

■ continueとbreakのラベル付き使用
continue label → labelのループの次のイテレーションへ
break label → labelのループを抜ける

■ 試験での注意点
ラベル付きbreak/continueは見慣れない構文で試験でよく出ます。
外側のループのみ、内側のループのみ、両方、という違いをしっかり理解しましょう。

■ 実務での活用
多重ループからの脱出に使いますが、可読性が下がるため、
実務ではメソッドに切り出して早期returnする方が推奨されます。`,
    practicalNote: "ラベル付きbreak/continueは外側ループを操作できる。実務ではメソッド分割で代替するのが可読性上望ましい。"
  },
  {
    id: 34,
    category: "クラスとオブジェクト",
    difficulty: "easy",
    question: "コンストラクタに関して正しい説明はどれか？",
    code: `class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    Person(String name) {
        this(name, 0); // (A)
    }
}`,
    choices: [
      "コンストラクタは戻り値の型（void等）を宣言しなければならない",
      "(A)のthis()は他のコンストラクタを呼び出しており、コンストラクタの第1行目に書く必要がある",
      "コンストラクタはクラス名と違う名前でもよい",
      "(A)のthis()は任意の位置に書いてよい"
    ],
    answer: 1,
    explanation: `【正解】B: this()は他のコンストラクタを呼び出しており、第1行目に書く必要がある

■ なぜBが正解か
this() はコンストラクタ内から同じクラスの別のコンストラクタを呼び出す構文です。
this()またはsuper()はコンストラクタの第1行目にしか書けません（コンパイルルール）。

■ コンストラクタのルール
・クラス名と同じ名前でなければならない
・戻り値の型を書いてはいけない（voidも書かない）
・引数が異なる複数のコンストラクタ定義が可能（オーバーロード）
・this()またはsuper()は第1行目のみ

■ デフォルトコンストラクタ
引数なしのコンストラクタを明示しない場合、コンパイラが自動的に追加します。
ただし引数ありのコンストラクタを定義すると、デフォルトコンストラクタは追加されません。

■ thisとsuper
this → 自分自身のインスタンスまたはコンストラクタ
super → 親クラスのメンバまたはコンストラクタ`,
    practicalNote: "this()でコンストラクタチェーンを作ると、初期化ロジックの重複を避けられる。"
  },
  {
    id: 35,
    category: "コンストラクタ",
    difficulty: "hard",
    question: "次のコードの出力として正しいものはどれか？",
    code: `class A {
    int x;
    A() { this(10); System.out.println("A() x=" + x); }
    A(int x) { this.x = x; System.out.println("A(int) x=" + x); }
}
class B extends A {
    B() { super(20); System.out.println("B() x=" + x); }
}
public class Main {
    public static void main(String[] args) { new B(); }
}`,
    choices: [
      "A(int) x=20 / B() x=20",
      "A() x=10 / A(int) x=10 / B() x=10",
      "B() x=20 / A(int) x=20",
      "A(int) x=10 / A() x=10 / B() x=10"
    ],
    answer: 0,
    explanation: `【正解】A: A(int) x=20 / B() x=20

■ なぜAが正解か
new B() → B()コンストラクタを呼ぶ
B()の第1行 super(20) → A(int x)コンストラクタを呼ぶ（20が渡される）
A(int x) : this.x = 20 → "A(int) x=20" 出力
A(int x)が終わりB()に戻る → "B() x=20" 出力

B()はsuper(20)でA(int)を指定しているため、A()（引数なし）は呼ばれません。

■ コンストラクタの呼び出し順まとめ
1. コンストラクタの第1行目がsuper()/this()かチェック
2. 指定があればその通り、なければ暗黙的にsuper()（親の引数なし）が呼ばれる
3. 親の初期化後に自身の処理が実行される

■ 試験での注意点
super()を明示することで親の特定コンストラクタを選べます。
指定しない場合は親の引数なしコンストラクタが自動呼び出されます（なければコンパイルエラー）。`,
    practicalNote: "super()を明示するとコンストラクタチェーンを制御できる。意図した初期化順を設計するために重要。"
  }
];

// カテゴリ一覧
const CATEGORIES = [...new Set(QUESTIONS.map(q => q.category))];

// 難易度一覧
const DIFFICULTIES = ["easy", "medium", "hard"];
