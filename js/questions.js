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
  },

  // ===== アクセス修飾子 / スコープ (2問) =====
  {
    id: 36,
    category: "Javaの基本",
    difficulty: "easy",
    question: "Javaのmainメソッドのシグネチャとして正しいものはどれか？",
    code: null,
    choices: [
      "public static void main(String[] args)",
      "public void main(String[] args)",
      "static void main(String args[])",
      "public static int main(String[] args)"
    ],
    answer: 0,
    explanation: `【正解】A: public static void main(String[] args)

■ なぜAが正解か
mainメソッドはJVMから直接呼ばれるため、以下が必須です。
・public  → JVM（外部）から呼び出せるようにするため
・static  → インスタンス生成なしで呼び出せるようにするため
・void    → 戻り値なし（JVMには返す値がない）
・String[] args（またはString... args）→ コマンドライン引数を受け取る

■ 各選択肢の解説
B → staticがない → JVMはインスタンスなしで呼べない（実行時エラー）
C → publicがない、戻り値型がない → コンパイルエラー
D → 戻り値がint → JVMはintを受け取れないためエラー

■ 試験での注意点
String args[] と String[] args はどちらも正しい書き方です。
mainメソッドはオーバーロードできますが、JVMが呼ぶのはString[]の引数を持つものだけです。

■ 実務での活用
バッチプログラムやコマンドラインツールの起動エントリポイントとして使います。
Spring Bootでも内部的にmainメソッドから起動します。`,
    practicalNote: "mainメソッドはpublic static voidが必須。argsで起動引数を受け取れる。"
  },
  {
    id: 37,
    category: "Javaの基本",
    difficulty: "medium",
    question: "アクセス修飾子の範囲について正しい説明はどれか？",
    code: `// パッケージ: com.example.app
class Animal {
    public String pub = "public";
    protected String pro = "protected";
    String pkg = "package-private";
    private String pri = "private";
}`,
    choices: [
      "protectedはサブクラスと同じパッケージからアクセス可能。別パッケージのサブクラスからもアクセス可能",
      "protectedはサブクラスのみアクセス可能（パッケージは関係ない）",
      "package-privateはどのパッケージからでもアクセス可能",
      "privateは同じクラスと同じパッケージからアクセス可能"
    ],
    answer: 0,
    explanation: `【正解】A: protectedはサブクラスと同じパッケージからアクセス可能。別パッケージのサブクラスからもアクセス可能

■ アクセス修飾子の範囲（広い順）

| 修飾子 | 同クラス | 同パッケージ | サブクラス | 別パッケージ |
|--------|---------|------------|-----------|------------|
| public | ✅ | ✅ | ✅ | ✅ |
| protected | ✅ | ✅ | ✅ | ❌（サブクラス経由はOK）|
| package-private（無指定） | ✅ | ✅ | ❌ | ❌ |
| private | ✅ | ❌ | ❌ | ❌ |

■ protectedの特殊ルール
別パッケージのサブクラスからは「継承して自分のクラスを通じてのみ」アクセス可能です。
別パッケージの非サブクラスからはアクセスできません。

■ 試験での注意点
「protectedはサブクラスからアクセス可能」は正しいですが、
「別パッケージでも直接オブジェクト経由ではアクセス不可」という点が落とし穴です。

■ 実務での活用
フィールドはprivateが基本。サブクラスに公開したいメソッドにprotectedを使います。`,
    practicalNote: "フィールドはprivate、メソッドはpublic/protectedが実務の基本方針。アクセス修飾子は最小権限の原則で選ぶ。"
  },

  // ===== 条件分岐 追加 (2問) =====
  {
    id: 38,
    category: "条件分岐",
    difficulty: "easy",
    question: "次のコードの出力として正しいものはどれか？",
    code: `int x = 7;
String result = (x > 5) ? "big" : (x > 3) ? "medium" : "small";
System.out.println(result);`,
    choices: ["big", "medium", "small", "コンパイルエラー"],
    answer: 0,
    explanation: `【正解】A: big

■ なぜAが正解か
三項演算子は右から評価されます。
まず (x > 5) を評価 → 7 > 5 なので true
trueの場合 "big" が選ばれ、result = "big"
2番目の三項演算子は評価されません。

■ 三項演算子の構文
条件式 ? trueの値 : falseの値

■ ネストした三項演算子
(x > 5) ? "big" : (x > 3) ? "medium" : "small"
は右の三項演算子 (x > 3) ? "medium" : "small" が
falseの部分に当たります。

■ 試験での注意点
三項演算子は if-else の省略形です。
ネストが深くなると可読性が下がります。実務では2段階以上のネストは避けましょう。

■ 実務での活用
null チェックでよく使います：
String name = (user != null) ? user.getName() : "ゲスト";`,
    practicalNote: "三項演算子は短い条件分岐に便利。2段階以上のネストは可読性が下がるためif-elseに書き直すべき。"
  },
  {
    id: 39,
    category: "条件分岐",
    difficulty: "medium",
    question: "switch文の条件式に使える型として正しいものはどれか？",
    code: `long val = 100L;
switch (val) {  // (A)
    case 100: System.out.println("ok"); break;
}`,
    choices: [
      "int, long, double, String, enum が使える",
      "byte, short, char, int, String（Java7以降）, enum が使える。longは使えない",
      "int と String のみ使える",
      "すべての型が使える"
    ],
    answer: 1,
    explanation: `【正解】B: byte, short, char, int, String（Java7以降）, enum が使える。longは使えない

■ switch文で使える型
✅ byte, short, char, int（とそのラッパークラス Byte, Short, Character, Integer）
✅ String（Java 7以降）
✅ enum

❌ long
❌ float, double
❌ boolean

■ コード(A)の解説
long val でswitch → コンパイルエラーです。
int val にすれば動作します。

■ なぜlongが使えないか
switch文の内部では型がintに変換されて処理されます（コンパイラの制約）。
longはintに収まらない範囲があるため使えません。

■ Java14以降のswitch式
switch式（->構文）でも使える型は従来のswitchと同じです。

■ 試験での注意点
「switchにStringが使えるのはJava7以降」という点が頻出です。
また「longとdoubleは使えない」も出題されます。`,
    practicalNote: "switchにlong/doubleは使えない。Java7以降はStringが使えるようになったが、enumベースのswitchが設計上は推奨される場面も多い。"
  },

  // ===== 繰り返し処理 追加 (2問) =====
  {
    id: 40,
    category: "繰り返し処理",
    difficulty: "easy",
    question: "次のコードの出力として正しいものはどれか？",
    code: `int i = 0;
do {
    System.out.print(i + " ");
    i++;
} while (i < 3);`,
    choices: ["0 1 2 ", "1 2 3 ", "0 1 2 3 ", "（何も出力されない）"],
    answer: 0,
    explanation: `【正解】A: 0 1 2

■ なぜAが正解か
do-whileは「まず処理を実行してから条件を確認」します。

i=0 → 出力"0 " → i++ → i=1 → 1<3 true → 続行
i=1 → 出力"1 " → i++ → i=2 → 2<3 true → 続行
i=2 → 出力"2 " → i++ → i=3 → 3<3 false → 終了

■ while vs do-while の違い
while   → 先に条件を確認 → 条件がfalseなら1回も実行されない
do-while → 先に処理を実行 → 必ず1回は実行される

■ 試験での注意点
do-whileは「少なくとも1回は必ず実行される」という性質が頻出ポイントです。
while(false) は1回も実行されませんが、do{ }while(false) は1回実行されます。

■ 実務での活用
「入力が正しくなるまで繰り返す」ような処理に使います：
String input;
do {
    input = scanner.nextLine();
} while (input.isEmpty());`,
    practicalNote: "do-whileは必ず1回実行。ユーザー入力の再試行ループなど「少なくとも1回は実行したい」場面に使う。"
  },
  {
    id: 41,
    category: "繰り返し処理",
    difficulty: "medium",
    question: "拡張for文（for-each）に関して正しい記述はどれか？",
    code: `int[] arr = {1, 2, 3, 4, 5};
for (int n : arr) {
    n = n * 2;  // (A)
}
System.out.println(arr[0]);`,
    choices: [
      "2（配列の要素が変更される）",
      "1（配列の要素は変更されない）",
      "コンパイルエラー",
      "実行時エラー"
    ],
    answer: 1,
    explanation: `【正解】B: 1（配列の要素は変更されない）

■ なぜBが正解か
拡張for文（for-each）のループ変数 n は要素の「コピー」です。
n = n * 2 はローカル変数 n を変更するだけで、配列 arr[0] は変わりません。
よって arr[0] は元の 1 のままです。

■ プリミティブ型の場合
int, double などプリミティブ型は値がコピーされます。
ループ変数を変更しても元の配列に影響しません。

■ 参照型の場合
オブジェクトの配列の場合は参照がコピーされます。
オブジェクトの中身（フィールド）は変更可能ですが、別オブジェクトへの再代入は不可です。

■ 試験での注意点
for-eachはインデックスにアクセスできません。
インデックスが必要な場合は通常のfor文を使います。

■ 実務での活用
リストや配列を順番に処理するだけなら for-each が最もシンプルです。
変更が必要な場合は通常の for 文または Iterator を使います。`,
    practicalNote: "for-eachのループ変数はコピー。配列要素の変更には通常のfor文が必要。"
  },

  // ===== String 追加 (2問) =====
  {
    id: 42,
    category: "String",
    difficulty: "medium",
    question: "次のString.formatの出力として正しいものはどれか？",
    code: `System.out.println(String.format("%05d", 42));
System.out.println(String.format("%.2f", 3.14159));
System.out.println(String.format("%-10s|", "Hi"));`,
    choices: [
      "00042 / 3.14 / Hi        |",
      "42000 / 3.14 / Hi        |",
      "00042 / 3.142 / Hi        |",
      "00042 / 3.14 / Hi|"
    ],
    answer: 0,
    explanation: `【正解】A: 00042 / 3.14 / Hi        |

■ 書式指定子の説明

%05d → dは整数、0はゼロ埋め、5は最小幅5文字 → "00042"

%.2f → fは浮動小数点、.2は小数点以下2桁 → "3.14"（3.14159を四捨五入）

%-10s → sは文字列、-は左寄せ、10は最小幅10文字 → "Hi        "（右に8つのスペース）

■ 主な書式指定子
%d → 整数（int, long）
%f → 浮動小数点（float, double）
%s → 文字列（toString()が呼ばれる）
%c → 文字（char）
%b → boolean
%n → 改行（OSに依存しない改行コード）

■ 試験での注意点
%10d は右寄せ（デフォルト）、%-10d は左寄せです。
%05d の 0 はゼロ埋めを意味します（スペース埋めはデフォルト）。

■ 実務での活用
ログ出力、レポート生成、日付フォーマット（%tY等）に活用します。
日付はDateTimeFormatter（Java8以降）の使用が推奨です。`,
    practicalNote: "String.formatはprintf系の書式指定。%dは整数、%fは浮動小数点、%sは文字列。幅と精度の指定もよく使う。"
  },
  {
    id: 43,
    category: "String",
    difficulty: "easy",
    question: "次のコードの出力として正しいものはどれか？",
    code: `String s = "Hello";
System.out.println(s.charAt(1));
System.out.println(s.isEmpty());
System.out.println("".isEmpty());
System.out.println(" ".isEmpty());`,
    choices: [
      "e / false / true / false",
      "H / false / true / false",
      "e / false / true / true",
      "e / true / true / false"
    ],
    answer: 0,
    explanation: `【正解】A: e / false / true / false

■ なぜAが正解か
charAt(1) → インデックス1の文字 → 'e'（H=0, e=1, l=2, l=3, o=4）

"Hello".isEmpty() → 長さが0でないのでfalse

"".isEmpty() → 長さが0なのでtrue

" ".isEmpty() → スペースが1文字あるので長さは1 → false

■ isEmptyとisBlankの違い（Java11以降）
isEmpty() → 長さが0かどうか（スペースは0でない）
isBlank() → 空またはすべてが空白文字かどうか
" ".isBlank() → true（スペースのみ → blank）
" ".isEmpty() → false（スペースがある）

■ 試験での注意点
charAtはインデックスが0始まりです。
isEmptyはlength()==0と等価です。
null に対して isEmpty() を呼ぶと NullPointerException が発生します。

■ 実務での活用
ユーザー入力の空チェックには isBlank() が便利（全角スペースも含む strip().isEmpty() と同等）。`,
    practicalNote: "isEmptyはlength()==0。スペース込みの空チェックにはJava11以降のisBlank()を使う。"
  },

  // ===== 配列 追加 (1問) =====
  {
    id: 44,
    category: "配列",
    difficulty: "medium",
    question: "次の可変長引数（varargs）に関するコードの出力として正しいものはどれか？",
    code: `static int sum(int... nums) {
    int total = 0;
    for (int n : nums) total += n;
    return total;
}
public static void main(String[] args) {
    System.out.println(sum(1, 2, 3));
    System.out.println(sum(new int[]{4, 5}));
    System.out.println(sum());
}`,
    choices: ["6 / 9 / 0", "6 / 9 / エラー", "6 / コンパイルエラー / 0", "コンパイルエラー"],
    answer: 0,
    explanation: `【正解】A: 6 / 9 / 0

■ なぜAが正解か
sum(1, 2, 3) → nums = {1,2,3} → 合計6
sum(new int[]{4, 5}) → 配列を直接渡すことも可能 → nums = {4,5} → 合計9
sum() → 引数なし → nums = {} → 合計0（空配列）

■ 可変長引数（varargs）のルール
・メソッドの最後の引数にのみ使える（int... nums）
・内部では配列として扱われる
・配列を直接渡すこともできる
・引数なしで呼ぶと空配列が渡される（nullではない）

■ 試験での注意点
void method(int... a, int b) → コンパイルエラー（varargsは最後の引数のみ）
void method(int a, int... b) → OK

■ 実務での活用
PrintStream.printf() や Arrays.asList() など標準ライブラリでも多用されます。
String.format(String format, Object... args) がその代表例です。`,
    practicalNote: "varargsは最後の引数のみ。内部は配列として扱われ、引数なしは空配列（null安全）。"
  },

  // ===== 継承 追加 (2問) =====
  {
    id: 45,
    category: "継承",
    difficulty: "medium",
    question: "次のコードに関して正しい記述はどれか？",
    code: `final class Immutable {
    int value;
    Immutable(int v) { this.value = v; }
    final int getValue() { return value; }
}
// class Sub extends Immutable { } // (A)`,
    choices: [
      "(A)はコンパイルできる",
      "(A)はコンパイルエラー。finalクラスは継承不可",
      "(A)はコンパイルできるが、getValueはオーバーライドできない",
      "finalクラスはインスタンス化できない"
    ],
    answer: 1,
    explanation: `【正解】B: (A)はコンパイルエラー。finalクラスは継承不可

■ finalの3つの使い方（再確認）

1. finalクラス → 継承不可（継承したらコンパイルエラー）
   例: java.lang.String, java.lang.Integer もfinalクラス

2. finalメソッド → オーバーライド不可（getValue()がこれに該当）

3. finalフィールド → 再代入不可（定数として使う）

■ finalクラスの用途
・セキュリティ：継承による動作変更を防ぎたい場合
・イミュータブルオブジェクト：Stringがfinalなのは内容の安全性を保証するため

■ 試験での注意点
finalクラスはインスタンス化は可能です（newでオブジェクトを作れる）。
インスタンス化できないのはabstractクラスです。混同しないよう注意。

■ 実務での活用
ValueObjectパターン（金額・日付など変更不可のオブジェクト）の実装にfinalを使います。`,
    practicalNote: "finalクラスは継承禁止（Stringもfinalクラス）。abstractクラスはインスタンス化禁止。この2つを混同しないこと。"
  },
  {
    id: 46,
    category: "継承",
    difficulty: "medium",
    question: "次のコードの出力として正しいものはどれか？",
    code: `class Vehicle {
    String type() { return "Vehicle"; }
    void info() {
        System.out.println("Type: " + type());
    }
}
class Car extends Vehicle {
    @Override
    String type() { return "Car"; }
}
public class Main {
    public static void main(String[] args) {
        Vehicle v = new Car();
        v.info();
    }
}`,
    choices: [
      "Type: Vehicle",
      "Type: Car",
      "コンパイルエラー",
      "実行時エラー"
    ],
    answer: 1,
    explanation: `【正解】B: Type: Car

■ なぜBが正解か
v.info() → Vehicleのinfo()が呼ばれます。
info()の中でtype()を呼んでいますが、このthisは実行時の型Car（のインスタンス）です。
Javaのオーバーライドは「実行時の型で解決」されるため、Car.type()が呼ばれます。
結果: "Type: Car"

■ これがポリモーフィズムの本質
親クラスのメソッドの中で呼んでいても、オーバーライドされたメソッドが使われます。
これを「動的ディスパッチ（動的束縛）」と言います。

■ テンプレートメソッドパターン
この動作を意図的に利用するのが「テンプレートメソッドパターン」です。
骨格を親クラスに定義し、詳細を子クラスに実装させることができます。

■ 試験での注意点
「親クラスのメソッドからオーバーライドされたメソッドが呼ばれる」は頻出の落とし穴です。
staticメソッドではこの動的ディスパッチは起きません（hidingになる）。`,
    practicalNote: "親クラスのメソッド内でさらにメソッドを呼ぶ場合も、オーバーライドが適用される。テンプレートメソッドパターンの基礎。"
  },

  // ===== ポリモーフィズム 追加 (2問) =====
  {
    id: 47,
    category: "ポリモーフィズム",
    difficulty: "medium",
    question: "次のinstanceof演算子の動作として正しいものはどれか？",
    code: `class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}

Animal a = new Dog();
System.out.println(a instanceof Animal);
System.out.println(a instanceof Dog);
System.out.println(a instanceof Cat);`,
    choices: [
      "true / true / false",
      "false / true / false",
      "true / false / false",
      "true / true / true"
    ],
    answer: 0,
    explanation: `【正解】A: true / true / false

■ なぜAが正解か
a の実体は Dog オブジェクトです。

a instanceof Animal → DogはAnimalのサブクラス → true
a instanceof Dog    → Dogのインスタンスなのでtrue
a instanceof Cat    → CatはDogと兄弟クラスで関係なし → false

■ instanceofのルール
「実体がそのクラス または そのサブクラスのインスタンスか」を確認します。
継承ツリーで「上」の方向へは全部true、「横」や「下」は確認が必要です。

■ 試験での注意点
null instanceof X は常にfalseです（NullPointerExceptionにならない）。
Animal b = null;
System.out.println(b instanceof Animal); // false

■ Java16以降: Pattern Matching instanceof
if (a instanceof Dog dog) {
    dog.bark(); // キャスト不要でdogとして使える
}

■ 実務での活用
ダウンキャスト前の型確認に必須です。ClassCastExceptionを防ぎます。`,
    practicalNote: "null instanceof Xはfalse（NPEなし）。Java16以降のパターンマッチingを使うとcastが不要になる。"
  },
  {
    id: 48,
    category: "ポリモーフィズム",
    difficulty: "hard",
    question: "次のコードで例外が発生するのはどれか？",
    code: `Object obj = "Hello";

String s1 = (String) obj;           // (A)
Integer i  = (Integer) obj;         // (B)

Object num = Integer.valueOf(42);
int x = (int) num;                  // (C) オートアンボクシング
Number n   = (Number) num;          // (D)`,
    choices: [
      "(A)で ClassCastException",
      "(B)で ClassCastException",
      "(C)で ClassCastException",
      "(D)で ClassCastException"
    ],
    answer: 1,
    explanation: `【正解】B: (B)で ClassCastException

■ なぜBが正解か
obj の実体は String オブジェクトです。

(A) String s1 = (String) obj → 実体はString → 成功
(B) Integer i = (Integer) obj → 実体はStringだがIntegerにキャストしようとする → ClassCastException！
(C) int x = (int) num → num の実体はIntegerで、オートアンボクシングによりintに変換 → 成功
(D) Number n = (Number) num → IntegerはNumberのサブクラス → 成功

■ ClassCastExceptionの発生条件
実体の型と、キャスト先の型が「継承関係にない」場合に発生します。
StringとIntegerは兄弟クラスで継承関係なし → ClassCastException

■ 回避方法
事前にinstanceofで確認します：
if (obj instanceof Integer) {
    Integer i = (Integer) obj;
}

■ 試験での注意点
コンパイル時にはキャスト可否を完全にはチェックできません。
実行時に型の不一致が発覚するのがClassCastExceptionです。`,
    practicalNote: "ダウンキャストの前は必ずinstanceofで型チェック。ClassCastExceptionは実行時例外でコンパイルでは防げない。"
  },

  // ===== インターフェース 追加 (2問) =====
  {
    id: 49,
    category: "インターフェース",
    difficulty: "medium",
    question: "次のコードの出力として正しいものはどれか？",
    code: `interface Greeting {
    default String hello() { return "Hello!"; }
    default String bye()   { return "Bye!"; }
}
interface Farewell {
    default String bye() { return "Farewell!"; }
}
class English implements Greeting, Farewell {
    public String bye() { return "See you!"; }
}
public class Main {
    public static void main(String[] args) {
        English e = new English();
        System.out.println(e.hello());
        System.out.println(e.bye());
    }
}`,
    choices: [
      "Hello! / See you!",
      "Hello! / Bye!",
      "Hello! / Farewell!",
      "コンパイルエラー"
    ],
    answer: 0,
    explanation: `【正解】A: Hello! / See you!

■ なぜAが正解か
e.hello() → GreetingのdefaultメソッドのみでFarewellには存在しない → "Hello!"

e.bye() → GreetingとFarewellの両方にbye()のdefaultメソッドが存在（競合）
しかしEnglishクラスが bye() をオーバーライドしているので、Englishの実装が使われる → "See you!"

■ defaultメソッドの競合ルール
2つのインターフェースが同名のdefaultメソッドを持つ場合：
1. 実装クラスがそのメソッドをオーバーライドしていればOK
2. オーバーライドしていなければコンパイルエラー（どちらを使うか曖昧なため）

■ 試験での注意点
この問題でEnglishがbye()をオーバーライドしていなかった場合はコンパイルエラーです。
Javaはどちらのdefaultを使うか自動判断しません（意図的な設計）。

■ 実務での活用
複数インターフェースの実装でdefaultメソッドが競合する場合、
必ず実装クラスで明示的にオーバーライドする必要があります。`,
    practicalNote: "defaultメソッドが競合する場合、実装クラスでオーバーライドしないとコンパイルエラー。競合解決は実装クラスの責務。"
  },
  {
    id: 50,
    category: "インターフェース",
    difficulty: "medium",
    question: "@FunctionalInterfaceアノテーションに関して正しい説明はどれか？",
    code: `@FunctionalInterface
interface Calc {
    int compute(int a, int b);   // 抽象メソッド1つ
    default int add(int a, int b) { return a + b; } // defaultはOK
    static int zero() { return 0; }                 // staticはOK
}`,
    choices: [
      "@FunctionalInterfaceは抽象メソッドを2つ以上要求する",
      "@FunctionalInterfaceがついていないとラムダ式で使えない",
      "@FunctionalInterfaceは抽象メソッドがちょうど1つであることを保証する（コンパイル時チェック）",
      "@FunctionalInterfaceがつくとdefaultメソッドが書けなくなる"
    ],
    answer: 2,
    explanation: `【正解】C: @FunctionalInterfaceは抽象メソッドがちょうど1つであることを保証する

■ なぜCが正解か
@FunctionalInterfaceアノテーションは「このインターフェースは関数型インターフェースである」
という宣言です。抽象メソッドが1つでなければコンパイルエラーになります。
（抽象メソッドを2つ書いた場合にエラーで教えてくれる）

■ 関数型インターフェースのルール
・抽象メソッドはちょうど1つ（これをSAM: Single Abstract Method と呼ぶ）
・defaultメソッドはいくつでも書ける
・staticメソッドはいくつでも書ける
・Objectクラスのメソッド（equals等）は抽象メソッドにカウントされない

■ 各選択肢の解説
A → 逆。1つでなければならない
B → @FunctionalInterfaceがなくても、条件を満たせばラムダで使える（アノテーションはオプション）
D → defaultは何個でも書ける

■ 主な関数型インターフェース（java.util.function）
Predicate<T>、Function<T,R>、Consumer<T>、Supplier<T>、
BiFunction<T,U,R>、UnaryOperator<T>、BinaryOperator<T>`,
    practicalNote: "@FunctionalInterfaceはコンパイル時の安全弁。抽象メソッドが1つという制約を明示するため必ずつける習慣を持つ。"
  },

  // ===== 例外処理 追加 (2問) =====
  {
    id: 51,
    category: "例外処理",
    difficulty: "medium",
    question: "try-with-resourcesに関して正しい記述はどれか？",
    code: `class MyResource implements AutoCloseable {
    public void close() { System.out.println("closed"); }
    public void use()   { System.out.println("used"); }
}
public class Main {
    public static void main(String[] args) {
        try (MyResource r = new MyResource()) {
            r.use();
        }
        System.out.println("done");
    }
}`,
    choices: [
      "used / done（closeは呼ばれない）",
      "used / closed / done",
      "closed / used / done",
      "コンパイルエラー（AutoCloseableが必要）"
    ],
    answer: 1,
    explanation: `【正解】B: used / closed / done

■ なぜBが正解か
try-with-resourcesはtryブロック終了時に自動的にclose()を呼びます。
（例外有無にかかわらず）

実行順序：
1. r.use() → "used"
2. tryブロック終了 → r.close()が自動呼び出し → "closed"
3. "done" 出力

■ try-with-resourcesのルール（Java7以降）
・tryの丸括弧内でリソースを宣言する
・リソースのクラスはAutoCloseableを実装している必要がある
・複数のリソースをセミコロンで区切って宣言できる
・closeは逆順で呼ばれる（最後に宣言したものが最初にclose）

■ 従来のfinallyとの違い
try {
    // ...
} finally {
    r.close(); // 手動でclose（書き忘れリスクあり）
}
→ try-with-resourcesは書き忘れがなく安全

■ 試験での注意点
AutoCloseableを実装していないクラスはtry-with-resourcesで使えません（コンパイルエラー）。

■ 実務での活用
ファイル操作（FileInputStream）、DB接続（Connection）、HTTPクライアントなどに使います。`,
    practicalNote: "try-with-resourcesはJava7以降の必須構文。リソースリークを防ぐ最も安全な方法。AutoCloseableの実装が前提。"
  },
  {
    id: 52,
    category: "例外処理",
    difficulty: "hard",
    question: "オーバーライドメソッドの例外宣言に関して正しいものはどれか？",
    code: `class Parent {
    void method() throws IOException {}  // チェック例外
}
class Child extends Parent {
    // 以下のうち正しいオーバーライドはどれか？
}`,
    choices: [
      "void method() throws Exception {}（より広い例外を宣言）",
      "void method() throws IOException, SQLException {}（例外を追加）",
      "void method() throws FileNotFoundException {}（IOExceptionのサブクラス）",
      "void method() throws RuntimeException {}（非チェック例外を追加）"
    ],
    answer: 2,
    explanation: `【正解】C: void method() throws FileNotFoundException {}（IOExceptionのサブクラス）

■ オーバーライドの例外宣言ルール
オーバーライドメソッドのthrows宣言は「同じか、より狭い（サブクラス）」にする必要があります。

✅ throws宣言なし（例外を宣言しない）
✅ throws IOException（同じ例外）
✅ throws FileNotFoundException（IOExceptionのサブクラス → より狭い）
❌ throws Exception（IOExceptionのスーパークラス → より広い）
❌ throws IOException, SQLException（例外の追加はNG）

■ なぜCが正解か
FileNotFoundException は IOException のサブクラスです。
より狭い（限定された）例外の宣言はOKです。

■ 非チェック例外について
RuntimeException（非チェック例外）はオーバーライドで自由に追加/変更できます。
Dは「非チェック例外の追加」なので一見OKですが、
throwsにRuntimeExceptionを明示するのはやや不自然（省略可能なため）。

■ 試験での注意点
「オーバーライドでは親の例外と同じか狭い範囲のチェック例外のみ」は頻出です。
Listableなので覚えましょう：同じ or サブクラス or なし = OK`,
    practicalNote: "オーバーライドのthrowsは親より広くできない。これはLiskov置換原則を守るための制約。"
  },

  // ===== コレクション 追加 (2問) =====
  {
    id: 53,
    category: "コレクション",
    difficulty: "medium",
    question: "次のコードの出力として正しいものはどれか？",
    code: `import java.util.*;
Map<String, Integer> map = new TreeMap<>();
map.put("banana", 2);
map.put("apple", 1);
map.put("cherry", 3);
System.out.println(map);
System.out.println(map.firstKey());`,
    choices: [
      "{banana=2, apple=1, cherry=3} / banana",
      "{apple=1, banana=2, cherry=3} / apple",
      "{cherry=3, banana=2, apple=1} / cherry",
      "{banana=2, apple=1, cherry=3} / apple"
    ],
    answer: 1,
    explanation: `【正解】B: {apple=1, banana=2, cherry=3} / apple

■ なぜBが正解か
TreeMapはキーを自然順序（昇順）でソートします。
文字列の自然順序はアルファベット順なので:
apple < banana < cherry の順で格納されます。

firstKey() → 最小のキー → "apple"

■ MapのSortedMap実装
TreeMap：赤黒木（Red-Black Tree）で実装。O(log n)でのアクセス。
・常にキーの昇順で格納される
・firstKey()、lastKey()、headMap()、tailMap()、subMap()などが使える
・カスタムComparatorを渡してソート順を変更できる

■ HashMap vs LinkedHashMap vs TreeMap
HashMap：順序不定、最速 O(1)
LinkedHashMap：挿入順を保持
TreeMap：キーの昇順、範囲検索が得意

■ 試験での注意点
TreeMapはnullキーを許可しません（NullPointerException）。
HashMapはnullキーを1つ許可します。`,
    practicalNote: "TreeMapはキーで自動ソート。範囲検索（headMap/tailMap/subMap）が必要なシーン（例：日時範囲のデータ取得）で有効。"
  },
  {
    id: 54,
    category: "コレクション",
    difficulty: "hard",
    question: "次のIteratorに関するコードで例外が発生するのはどれか？",
    code: `List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));

// (A): Iteratorで削除
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().equals("B")) it.remove();
}

// (B): for-each中に削除
for (String s : list) {
    if (s.equals("C")) list.remove(s);
}`,
    choices: [
      "(A)で ConcurrentModificationException",
      "(B)で ConcurrentModificationException",
      "(A)も(B)も正常に動作する",
      "(A)も(B)も例外が発生する"
    ],
    answer: 1,
    explanation: `【正解】B: (B)で ConcurrentModificationException

■ なぜBが正解か
(A) Iteratorのremove()は安全。Iteratorを通じた削除は許可されています。
実行後のlist: ["A", "C"]

(B) for-each（拡張for文）は内部でIteratorを使います。
for-each中に直接list.remove()するとIteratorが「変更された」と検知し、
ConcurrentModificationException が発生します。

■ Listから要素を削除する安全な方法
1. Iterator.remove()を使う
2. Java8以降: list.removeIf(s -> s.equals("C"))
3. 別のリストに残す要素をcollectしてから置き換える

■ 試験での注意点
「for-each中にコレクションを直接変更するとConcurrentModificationException」は頻出です。
これはシングルスレッドでも発生します（マルチスレッドの問題ではない）。

■ 実務での活用
リストから条件に合う要素を削除する最もシンプルな方法：
list.removeIf(s -> s.equals("target"));`,
    practicalNote: "for-each中のリスト直接変更はConcurrentModificationException。removeIf()が最もシンプルな削除方法。"
  },

  // ===== ラムダ式 追加 (2問) =====
  {
    id: 55,
    category: "ラムダ式",
    difficulty: "medium",
    question: "次のOptionalに関するコードの出力として正しいものはどれか？",
    code: `import java.util.Optional;
Optional<String> opt1 = Optional.of("Hello");
Optional<String> opt2 = Optional.empty();
Optional<String> opt3 = Optional.ofNullable(null);

System.out.println(opt1.isPresent());
System.out.println(opt2.isPresent());
System.out.println(opt1.get());
System.out.println(opt2.orElse("default"));
System.out.println(opt3.orElseGet(() -> "generated"));`,
    choices: [
      "true / false / Hello / default / generated",
      "true / false / Hello / null / null",
      "true / false / Hello / default / null",
      "true / true / Hello / default / generated"
    ],
    answer: 0,
    explanation: `【正解】A: true / false / Hello / default / generated

■ なぜAが正解か
opt1.isPresent() → 値があるのでtrue
opt2.isPresent() → 空なのでfalse
opt1.get() → "Hello"（値があるので取得できる）
opt2.orElse("default") → 値がない場合の代替値 → "default"
opt3.orElseGet(() -> "generated") → Supplierを使って代替値を生成 → "generated"

■ OptionalのAPIまとめ
Optional.of(v) → nullを渡すとNullPointerException
Optional.ofNullable(v) → nullを渡すとemptyになる（安全）
Optional.empty() → 空のOptional

isPresent() → 値があればtrue
isEmpty() → 値がなければtrue（Java11以降）
get() → 値取得（emptyのときNoSuchElementException）
orElse(v) → 値がなければvを返す
orElseGet(supplier) → 値がなければsupplierを実行して返す
orElseThrow() → 値がなければ例外をスロー

■ 実務での活用
Optional<User> user = userRepository.findById(id);
user.orElseThrow(() -> new NotFoundException("User not found"));`,
    practicalNote: "Optionalはnullを返さないAPIを実現するためのラッパー。orElseThrow()でnull安全な例外スローが可能。"
  },
  {
    id: 56,
    category: "ラムダ式",
    difficulty: "hard",
    question: "次のメソッド参照に関するコードの出力として正しいものはどれか？",
    code: `import java.util.*;
import java.util.stream.*;
import java.util.function.*;

List<String> list = Arrays.asList("hello", "world", "java");

// (A) インスタンスメソッド参照
list.stream().map(String::toUpperCase).forEach(System.out::println);

// (B) 静的メソッド参照
Function<String, Integer> f = Integer::parseInt;
System.out.println(f.apply("42"));`,
    choices: [
      "HELLO / WORLD / JAVA / 42",
      "hello / world / java / 42",
      "HELLO / WORLD / JAVA / コンパイルエラー",
      "コンパイルエラー"
    ],
    answer: 0,
    explanation: `【正解】A: HELLO / WORLD / JAVA / 42

■ メソッド参照の4種類

1. 静的メソッド参照
   ClassName::staticMethod
   例: Integer::parseInt, Math::abs

2. 特定インスタンスのメソッド参照
   instance::instanceMethod
   例: System.out::println

3. 任意インスタンスのメソッド参照（String::toUpperCase が該当）
   ClassName::instanceMethod
   ストリームの各要素に対してそのメソッドを呼ぶ

4. コンストラクタ参照
   ClassName::new
   例: ArrayList::new

■ (A)の動作
String::toUpperCase → 各文字列に対してtoUpperCase()を呼ぶ
→ HELLO, WORLD, JAVA と出力

■ (B)の動作
Integer::parseInt → staticメソッドへの参照
Function<String, Integer> に対応（String→Integer）
f.apply("42") → Integer.parseInt("42") → 42

■ 試験での注意点
メソッド参照はラムダ式の省略形です。
str -> str.toUpperCase() = String::toUpperCase
s -> System.out.println(s) = System.out::println`,
    practicalNote: "メソッド参照は4種類（static/特定インスタンス/任意インスタンス/コンストラクタ）。可読性が上がりStreamとよく使われる。"
  },

  // ===== 初期化ブロック (1問) =====
  {
    id: 57,
    category: "クラスとオブジェクト",
    difficulty: "hard",
    question: "次のコードの出力として正しいものはどれか？",
    code: `class InitOrder {
    static { System.out.println("static block"); }
    { System.out.println("instance block"); }
    InitOrder() { System.out.println("constructor"); }
}
public class Main {
    public static void main(String[] args) {
        System.out.println("main start");
        new InitOrder();
        new InitOrder();
    }
}`,
    choices: [
      "main start / static block / instance block / constructor / instance block / constructor",
      "static block / main start / instance block / constructor / instance block / constructor",
      "static block / instance block / constructor / main start / instance block / constructor",
      "main start / static block / instance block / constructor / static block / instance block / constructor"
    ],
    answer: 1,
    explanation: `【正解】B: static block / main start / instance block / constructor / instance block / constructor

■ なぜBが正解か
Javaの初期化順序：
1. staticブロックはクラスのロード時に1回だけ実行（main()より先）
2. インスタンスブロック（{}）はコンストラクタより先に実行
3. コンストラクタが実行される

詳細な実行順：
1. "static block"（MainクラスがInitOrderをロード → staticブロック実行）
2. "main start"（main()開始）
3. "instance block"（1回目のnew → インスタンスブロック）
4. "constructor"（コンストラクタ）
5. "instance block"（2回目のnew → インスタンスブロック）
6. "constructor"（コンストラクタ）
→ staticブロックは2回目のnewでは実行されない（クラスは既にロード済み）

■ 試験での注意点
staticブロック → クラスロード時に1回のみ
インスタンスブロック → インスタンス生成のたびに毎回
コンストラクタ → インスタンス生成のたびに毎回

■ 実務での活用
staticブロックはシングルトンの初期化、定数Mapの構築などに使います。`,
    practicalNote: "staticブロックはクラスロード時に1回。インスタンスブロックはコンストラクタの前に毎回実行。実行順の理解は試験頻出。"
  },

  // ===== var / スコープ (2問) =====
  {
    id: 58,
    category: "データ型と変数",
    difficulty: "medium",
    question: "Java10で導入されたvar（ローカル変数型推論）に関して正しい記述はどれか？",
    code: `var list = new ArrayList<String>();  // (A)
list.add("Hello");

var x = 10;                           // (B)
x = "hello";                          // (C)

// var result;                        // (D) 宣言のみ
// var n = null;                      // (E)`,
    choices: [
      "(A)は正しく、listの型はArrayList<String>として推論される",
      "(C)はコンパイルできる（varは型が可変）",
      "(D)はコンパイルできる（後で型が決まる）",
      "(E)はコンパイルできる（nullで初期化可能）"
    ],
    answer: 0,
    explanation: `【正解】A: (A)は正しく、listの型はArrayList<String>として推論される

■ varのルール（Java10以降）
・ローカル変数のみに使用可能（フィールド、引数、戻り値には使えない）
・宣言と同時に初期化が必要（型推論のため）
・一度推論された型は変わらない（JavaはC#のvarと同じ動的型付けではない）

■ 各選択肢の解説
A → 正解。new ArrayList<String>()からArrayList<String>型が推論される
C → コンパイルエラー。xはintとして推論済みのため、Stringは代入不可
D → コンパイルエラー。初期値なしではvarは使えない
E → コンパイルエラー。nullだけでは型が推論できない

■ varが使える場面
var map = new HashMap<String, List<Integer>>();  // 長い型宣言を省略
try (var is = new FileInputStream("file")) { }   // try-with-resourcesでも使える
for (var entry : map.entrySet()) { }             // 拡張for文でも使える

■ 試験での注意点
varはコンパイル時に型が確定します（実行時の動的型付けではない）。`,
    practicalNote: "varはローカル変数型推論。型安全は保たれ、コンパイル時に型が確定する。長いジェネリクス宣言の省略に便利。"
  },
  {
    id: 59,
    category: "データ型と変数",
    difficulty: "medium",
    question: "次のコードの出力として正しいものはどれか？",
    code: `public class Main {
    static int x = 1;          // クラス変数

    public static void main(String[] args) {
        int x = 2;              // ローカル変数（クラス変数をシャドウイング）
        {
            int y = 3;          // ブロックスコープ
            System.out.println(x + y);      // (A)
        }
        // System.out.println(y);           // (B)
        System.out.println(Main.x + x);     // (C)
    }
}`,
    choices: [
      "(A)5 / (C)3 が出力され、(B)はコンパイルエラー",
      "(A)4 / (C)3 が出力され、(B)はコンパイルエラー",
      "(A)5 / (C)3 が出力され、(B)は実行時エラー",
      "(A)5 / (C)2 が出力され、(B)はコンパイルエラー"
    ],
    answer: 0,
    explanation: `【正解】A: (A)5 / (C)3 が出力され、(B)はコンパイルエラー

■ なぜAが正解か
(A) x は最も近いスコープの変数（ローカル変数x=2）が使われる
y はブロック内（y=3）でアクセス可能
x + y = 2 + 3 = 5

(B) y はブロック {} の外ではアクセスできない → コンパイルエラー

(C) Main.x はクラス変数（=1）、x はローカル変数（=2）
1 + 2 = 3

■ 変数のスコープルール
・ローカル変数はメソッド/ブロック内でのみ有効
・内側のブロック変数は外側では使えない
・同名の変数がある場合、最も近いスコープのものが優先（シャドウイング）
・クラス変数はクラス名.変数名でアクセスできる

■ 試験での注意点
ブロック {} 内で宣言した変数はブロック外でアクセス不可（コンパイルエラー）。
これは if/for/while のブロックでも同じです。`,
    practicalNote: "変数スコープは最小限にするのがベストプラクティス。意図しないシャドウイングを避けるためIDEの警告を活用する。"
  },

  // ===== モジュール 追加 (1問) =====
  {
    id: 60,
    category: "モジュール基礎",
    difficulty: "hard",
    question: "module-info.javaに関して正しい説明はどれか？",
    code: `// モジュール A の module-info.java
module com.example.a {
    requires com.example.b;
    exports com.example.a.api;
}

// モジュール B の module-info.java
module com.example.b {
    exports com.example.b.core;
    exports com.example.b.internal to com.example.a;  // (A)
}`,
    choices: [
      "exportsしたパッケージはすべてのモジュールから使える。(A)も同じ",
      "(A)のように特定モジュールにのみexportsすることができる（修飾付きexports）",
      "requiresは自動的に推移的になり、AがBをrequiresするとAを使うモジュールも自動でBを使える",
      "module-info.javaは任意ファイルであり、なくてもモジュールシステムは動作する"
    ],
    answer: 1,
    explanation: `【正解】B: (A)のように特定モジュールにのみexportsすることができる（修飾付きexports）

■ なぜBが正解か
exports パッケージ to モジュール名 という構文を「修飾付きexports（qualified exports）」と言います。
これにより、指定したモジュールだけがそのパッケージを使えます。
他のモジュールからはアクセスできません（強いカプセル化）。

■ module-info.javaのキーワード
requires → 依存するモジュールを宣言
exports → 外部に公開するパッケージを宣言
exports X to Y → モジュールYにのみパッケージXを公開
opens → リフレクションでのアクセスを許可（Spring/Hibernateで必要）
uses → 使用するServiceを宣言（ServiceLoader用）
provides → 提供するServiceの実装を宣言

■ 選択肢の解説
A → 通常のexportsはすべてのモジュールに公開だが、(A)は修飾付きで限定的
C → 推移的にするには requires transitive が必要（デフォルトでは推移的ではない）
D → モジュールシステムを使う場合はmodule-info.javaが必要（名前付きモジュール）

■ requires transitive
requires transitive com.example.b;
→ Aを使うモジュールも自動的にBにアクセスできる（推移的依存）`,
    practicalNote: "モジュールシステムはJava9以降。Silver試験では基本構文（requires/exports）の理解が問われる。"
  },

  // ===== オートボクシング/アンボクシング =====
  {
    id: 61,
    category: "データ型と変数",
    difficulty: "medium",
    question: "次のコードで出力される結果はどれか？",
    code: `Integer a = 127;
Integer b = 127;
Integer c = 128;
Integer d = 128;
System.out.println(a == b);
System.out.println(c == d);`,
    choices: [
      "true / true",
      "true / false",
      "false / false",
      "false / true"
    ],
    answer: 1,
    explanation: `【正解】B: true / false

■ Integerのキャッシュ機構
Javaの Integer クラスは -128 〜 127 の範囲のオブジェクトをキャッシュします。
この範囲内の値は同じオブジェクトが再利用されるため、== で比較すると true になります。
128以上は毎回新しいオブジェクトが生成されるため、== は false になります。

Integer a = 127;  // キャッシュされたオブジェクトを参照
Integer b = 127;  // 同じキャッシュを参照 → a == b は true

Integer c = 128;  // 新しいオブジェクト
Integer d = 128;  // 別の新しいオブジェクト → c == d は false

■ 値の比較には equals() を使う
System.out.println(c.equals(d));  // → true（値として比較）

■ 試験での注意点
Integer を == で比較した結果は範囲依存で変わります。
値の同一性チェックには必ず equals() を使いましょう。`,
    practicalNote: "Integerの == 比較は -128〜127 のキャッシュ範囲内でのみ true になる。値比較は必ず equals() を使うこと。"
  },

  // ===== Comparable =====
  {
    id: 62,
    category: "インターフェース",
    difficulty: "medium",
    question: "Comparable<T>インターフェースを実装したクラスで正しいものはどれか？",
    code: `class Student implements Comparable<Student> {
    String name;
    int score;
    Student(String name, int score) {
        this.name = name;
        this.score = score;
    }
    // compareTo をどう実装するか？
}`,
    choices: [
      "public int compareTo(Student o) { return this.score - o.score; }  // スコア昇順",
      "public boolean compareTo(Student o) { return this.score < o.score; }",
      "public void compareTo(Student o) { System.out.println(this.score - o.score); }",
      "public int compare(Student o1, Student o2) { return o1.score - o2.score; }"
    ],
    answer: 0,
    explanation: `【正解】A: public int compareTo(Student o) { return this.score - o.score; }

■ Comparable<T> インターフェース
compareTo(T o) メソッドを1つ持ちます。
戻り値は int 型で、以下のルールです：
・負の値 → thisがoより小さい（前に来る）
・0     → thisとoは等しい
・正の値 → thisがoより大きい（後に来る）

■ 実装のポイント
return this.score - o.score;  → スコア昇順ソート
return o.score - this.score;  → スコア降順ソート
return this.name.compareTo(o.name);  → 名前アルファベット順

■ Collections.sort との連携
Collections.sort(list);  // Comparable が使われる
list.sort(null);          // 同上

■ Comparator との違い
Comparable  → クラス自身が「自然順序」を定義（1メソッド）
Comparator  → 外部から任意のソート順を指定（compare(a,b)を実装）

■ 試験での注意点
compare() は Comparator のメソッドです。Comparable のメソッドは compareTo() です。`,
    practicalNote: "Comparable.compareTo()は戻り値int。this-o が昇順、o-this が降順。Comparatorのcompare()と混同しないこと。"
  },

  // ===== Comparator =====
  {
    id: 63,
    category: "コレクション",
    difficulty: "medium",
    question: "次のコードでリストを名前のアルファベット逆順にソートする正しい方法はどれか？",
    code: `List<String> names = new ArrayList<>(Arrays.asList("Charlie", "Alice", "Bob"));`,
    choices: [
      "names.sort(Comparator.naturalOrder().reversed());",
      "names.sort(Comparator.reverseOrder());",
      "Collections.sort(names, Comparator.reverseOrder());",
      "上記B・Cは両方正しい"
    ],
    answer: 3,
    explanation: `【正解】D: BとCは両方正しい

■ 解説
Comparator.reverseOrder() は String の自然順序（アルファベット順）を逆にした Comparator を返します。

names.sort(Comparator.reverseOrder());
// → ["Charlie", "Bob", "Alice"]

Collections.sort(names, Comparator.reverseOrder());
// → 同じ結果

A の Comparator.naturalOrder().reversed() も結果は同じですが、
reversed()はデフォルトメソッドで返り値が Comparator<T> になるため有効です。

■ よく使う Comparator
Comparator.naturalOrder()     → 昇順（自然順）
Comparator.reverseOrder()     → 降順（自然逆順）
Comparator.comparing(...)     → キーでソート
Comparator.comparingInt(...)  → intキーでソート（ボクシングなし）

■ チェーン
list.sort(
  Comparator.comparing(Student::getScore)
            .thenComparing(Student::getName)
);`,
    practicalNote: "Comparator.reverseOrder()はStringなど自然順序を持つ型の逆順。複合ソートはthenComparingでチェーン可能。"
  },

  // ===== Stream.reduce =====
  {
    id: 64,
    category: "ラムダ式",
    difficulty: "hard",
    question: "次のコードの出力として正しいものはどれか？",
    code: `List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
int result = nums.stream()
    .reduce(0, (a, b) -> a + b);
System.out.println(result);`,
    choices: [
      "0",
      "5",
      "10",
      "15"
    ],
    answer: 3,
    explanation: `【正解】D: 15

■ Stream.reduce() の動作
reduce(初期値, BinaryOperator<T>) は左から累積演算を行います。

初期値: 0
0 + 1 = 1
1 + 2 = 3
3 + 3 = 6
6 + 4 = 10
10 + 5 = 15

■ reduce の形式
// 初期値あり（戻り値は T）
T result = stream.reduce(identity, (a, b) -> ...);

// 初期値なし（戻り値は Optional<T>）
Optional<T> result = stream.reduce((a, b) -> ...);

■ IntStream を使うと効率的
int sum = nums.stream().mapToInt(i -> i).sum();
// または
int sum = IntStream.of(1,2,3,4,5).sum();

■ 活用例
最大値: reduce(Integer.MIN_VALUE, Math::max)
文字列結合: reduce("", (a, b) -> a + b)
（文字列はcollect(Collectors.joining())が推奨）`,
    practicalNote: "reduce()は累積演算。初期値ありはT型、なしはOptional<T>型を返す。合計はmapToInt().sum()が効率的。"
  },

  // ===== Optional =====
  {
    id: 65,
    category: "ラムダ式",
    difficulty: "medium",
    question: "次のコードで出力される結果はどれか？",
    code: `Optional<String> opt = Optional.of("Hello");
String result = opt
    .filter(s -> s.length() > 3)
    .map(String::toUpperCase)
    .orElse("N/A");
System.out.println(result);`,
    choices: [
      "Hello",
      "HELLO",
      "N/A",
      "コンパイルエラー"
    ],
    answer: 1,
    explanation: `【正解】B: HELLO

■ 処理の流れ
Optional.of("Hello")  → Optional["Hello"] を生成
.filter(s -> s.length() > 3)  → "Hello".length()=5 > 3 なのでそのまま通過
.map(String::toUpperCase)  → "Hello" → "HELLO"
.orElse("N/A")  → Optional が空でないので "HELLO" を返す

■ Optionalの主要メソッド
Optional.of(value)      → null不可でOptionalを生成（nullならNullPointerException）
Optional.ofNullable(v)  → nullの場合はOptional.empty()を生成
Optional.empty()        → 空のOptionalを生成

isPresent()   → 値があるか
get()         → 値を取得（空の場合は例外）
orElse(v)     → 値がなければv
orElseGet(s)  → 値がなければSupplierを実行
orElseThrow() → 値がなければ例外
ifPresent(c)  → 値があればConsumerを実行
map(f)        → Function<T,U>で変換（結果はOptional<U>）
filter(p)     → Predicateで絞り込み

■ 試験での注意点
Optional.of(null) はNullPointerExceptionが発生します。`,
    practicalNote: "Optionalはnullチェックをメソッドチェーンで書けるAPI。orElse()とorElseGet()の違いは引数評価タイミング（後者は遅延評価）。"
  },

  // ===== Enum 基礎 =====
  {
    id: 66,
    category: "クラスとオブジェクト",
    difficulty: "easy",
    question: "Enumに関する説明で正しいものはどれか？",
    code: `enum Day {
    MON, TUE, WED, THU, FRI, SAT, SUN
}
Day d = Day.WED;
System.out.println(d.name());
System.out.println(d.ordinal());`,
    choices: [
      "WED と 3 が出力される",
      "WED と 2 が出力される",
      "Wednesday と 3 が出力される",
      "コンパイルエラー"
    ],
    answer: 1,
    explanation: `【正解】B: WED と 2 が出力される

■ name() メソッド
Enumの定数名を文字列で返します。
d.name() → "WED"（定義した名前そのまま）

■ ordinal() メソッド
0始まりのインデックスを返します。
MON=0, TUE=1, WED=2, THU=3, FRI=4, SAT=5, SUN=6

■ Enumの主要メソッド
name()     → 定数名（"WED"）
ordinal()  → 0始まりインデックス（2）
toString() → name()と同じ（オーバーライド可）
values()   → 全定数の配列を返す（静的メソッド）
valueOf(s) → 文字列から定数を取得（静的メソッド）

■ switch文で使える
switch(d) {
    case MON: case TUE: ... break;
    case SAT: case SUN: ... break;
}

■ 試験での注意点
ordinal() は 0始まりであることに注意。
constants の順序が変わると ordinal() の値も変わります。`,
    practicalNote: "Enumはordinal()が0始まり。name()は定数名の文字列。values()で全定数の配列を取得できる。"
  },

  // ===== Enum メソッド =====
  {
    id: 67,
    category: "クラスとオブジェクト",
    difficulty: "hard",
    question: "次のEnumコードの出力として正しいものはどれか？",
    code: `enum Planet {
    EARTH(5.972e24, 6.371e6),
    MARS(6.39e23, 3.389e6);

    private final double mass;
    private final double radius;

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    double surfaceGravity() {
        final double G = 6.67300E-11;
        return G * mass / (radius * radius);
    }
}
System.out.println(Planet.EARTH.name());
System.out.println(Planet.values().length);`,
    choices: [
      "Earth / 2",
      "EARTH / 2",
      "EARTH / 1",
      "コンパイルエラー（Enumにコンストラクタは持てない）"
    ],
    answer: 1,
    explanation: `【正解】B: EARTH / 2

■ Enumはコンストラクタを持てる
Enumはコンストラクタ・フィールド・メソッドを持つことができます。
ただしコンストラクタは必ず private（または package-private）です。
外部から new Planet() とは呼べません。

■ name() は定義した定数名をそのまま返す
Planet.EARTH.name() → "EARTH"（小文字ではない）

■ values() は全定数の配列
Planet.values() → {EARTH, MARS}
Planet.values().length → 2

■ Enum にフィールドを持つパターン
enum Status {
    OK(200), NOT_FOUND(404), ERROR(500);
    private final int code;
    Status(int code) { this.code = code; }
    public int getCode() { return code; }
}

■ 試験での注意点
Enumのコンストラクタはprivate（省略時はprivateと同等）です。
Enumは暗黙的に java.lang.Enum を継承しています。`,
    practicalNote: "EnumはフィールドとメソッドとコンストラクタをもてるJavaの強力な機能。定数ごとに異なる振る舞いをもたせられる。"
  },

  // ===== Map.Entry iteration =====
  {
    id: 68,
    category: "コレクション",
    difficulty: "medium",
    question: "HashMapのキーと値を両方イテレートするための正しいコードはどれか？",
    code: `Map<String, Integer> map = new HashMap<>();
map.put("Alice", 90);
map.put("Bob", 75);
map.put("Charlie", 85);`,
    choices: [
      "for (String key : map.keys()) { System.out.println(key + \": \" + map.get(key)); }",
      "for (Map.Entry<String, Integer> e : map.entrySet()) { System.out.println(e.getKey() + \": \" + e.getValue()); }",
      "map.forEach((k, v) -> System.out.println(k + \": \" + v));  のみ正しい",
      "BとCは両方正しい"
    ],
    answer: 3,
    explanation: `【正解】D: BとCは両方正しい

■ Mapのイテレート方法

① entrySet() — キーと値を同時に取得（最も一般的）
for (Map.Entry<String, Integer> e : map.entrySet()) {
    System.out.println(e.getKey() + ": " + e.getValue());
}

② keySet() + get() — キーのみ取得してから値を取得
for (String key : map.keySet()) {
    System.out.println(key + ": " + map.get(key));
}
※ get()が内部で検索するため entrySet() より遅い

③ forEach() — Java8以降（ラムダ）
map.forEach((k, v) -> System.out.println(k + ": " + v));

④ values() — 値のみ取得
for (Integer v : map.values()) {
    System.out.println(v);
}

■ 試験での注意点
A の map.keys() は存在しません（正しくは map.keySet()）。
entrySet() が最も効率的な方法です。`,
    practicalNote: "Map反復はentrySet()が最効率。Java8以降はforEach(BiConsumer)が簡潔。map.keys()は存在しないので注意。"
  },

  // ===== String.join =====
  {
    id: 69,
    category: "String",
    difficulty: "easy",
    question: "次のコードの出力として正しいものはどれか？",
    code: `List<String> list = Arrays.asList("Java", "Python", "Go");
String result1 = String.join(", ", list);
String result2 = String.join("-", "A", "B", "C");
System.out.println(result1);
System.out.println(result2);`,
    choices: [
      "Java, Python, Go / A-B-C",
      "[Java, Python, Go] / A-B-C",
      "Java Python Go / A B C",
      "コンパイルエラー"
    ],
    answer: 0,
    explanation: `【正解】A: Java, Python, Go / A-B-C

■ String.join() — Java8以降
第1引数: 区切り文字
第2引数以降: 結合する文字列（可変長引数またはIterable）

String.join(", ", list);
→ "Java, Python, Go"（区切り文字「, 」で連結）

String.join("-", "A", "B", "C");
→ "A-B-C"（可変長引数でも使える）

■ Collectors.joining() との比較
String r = list.stream().collect(Collectors.joining(", "));
// → "Java, Python, Go"（同じ結果）

String r = list.stream()
    .collect(Collectors.joining(", ", "[", "]"));
// → "[Java, Python, Go]"（前後に区切り文字を追加できる）

■ 注意
String.join() は null要素があると "null" という文字列になります（例外にはならない）。`,
    practicalNote: "String.join()はJava8以降で使える便利メソッド。Stream.collect(joining())も同様の機能を持つ。"
  },

  // ===== Collections.unmodifiable =====
  {
    id: 70,
    category: "コレクション",
    difficulty: "medium",
    question: "次のコードで実行時に例外が発生する行はどれか？",
    code: `List<String> original = new ArrayList<>(Arrays.asList("A", "B", "C"));
List<String> unmod = Collections.unmodifiableList(original);

// (1) unmod.get(0)
// (2) unmod.size()
// (3) unmod.add("D")
// (4) original.add("D") — これはunmodに影響するか？`,
    choices: [
      "(1) get(0) で例外",
      "(3) add(\"D\") で UnsupportedOperationException",
      "(4) original.add(\"D\") でも例外",
      "(3)と(4)の両方で例外"
    ],
    answer: 1,
    explanation: `【正解】B: (3) add("D") で UnsupportedOperationException

■ Collections.unmodifiableList()
変更不可のビューを返します。
・読み取り（get, size, contains等）は可能
・書き込み（add, remove, set等）は UnsupportedOperationException を投げる

(1) unmod.get(0)  → "A" を返す（OK）
(2) unmod.size()  → 3 を返す（OK）
(3) unmod.add("D") → UnsupportedOperationException（例外！）
(4) original.add("D") → 元リストは変更可能、かつ変更がunmodに見える（ビューなので）

■ 「変更不可ビュー」であることが重要
オリジナルを変更するとビューにも反映されます。
完全なイミュータブルが必要なら List.copyOf() や List.of() を使います。

■ Java9以降の immutable リスト
List<String> immutable = List.of("A", "B", "C");
// → add/setは UnsupportedOperationException
// → nullも追加不可
// → オリジナルがないので参照漏れの心配なし`,
    practicalNote: "Collections.unmodifiableList()はビューなのでオリジナル変更が反映される。完全不変はList.of()またはList.copyOf()を使う。"
  },

  // ===== マルチキャッチ =====
  {
    id: 71,
    category: "例外処理",
    difficulty: "medium",
    question: "次のマルチキャッチ（multi-catch）に関して正しいものはどれか？",
    code: `try {
    // 処理
} catch (IOException | NumberFormatException e) {
    System.out.println("エラー: " + e.getMessage());
    // e = new IOException("new"); // (A)
}`,
    choices: [
      "マルチキャッチは使えない。catch節は1つずつ書く必要がある",
      "マルチキャッチはJava7以降で使える。(A) の再代入はコンパイルエラー",
      "マルチキャッチでは e を再代入できる（(A)は問題ない）",
      "IOException と NumberFormatException が継承関係にある場合のみ使える"
    ],
    answer: 1,
    explanation: `【正解】B: マルチキャッチはJava7以降で使える。(A) の再代入はコンパイルエラー

■ マルチキャッチ（Java7以降）
複数の例外型を | で区切ってまとめて処理できます。

catch (IOException | NumberFormatException e) { ... }

■ 変数 e は effectively final
マルチキャッチの変数 e はfinalと同等（実質的にfinal）です。
再代入しようとするとコンパイルエラーになります。

// NG: コンパイルエラー
catch (IOException | NumberFormatException e) {
    e = new IOException("new");  // ← エラー
}

■ 使用上の制約
継承関係にある例外をまとめると冗長として警告またはコンパイルエラー
catch (Exception | IOException e) { ... }  // IOException は Exception の子なのでエラー

■ メリット
・コードの重複を排除できる
・スタックトレースが2つの catch に分散しない`,
    practicalNote: "マルチキャッチはJava7以降。変数はeffectively final（再代入不可）。親子関係にある例外は並べられない。"
  },

  // ===== 例外の再スロー =====
  {
    id: 72,
    category: "例外処理",
    difficulty: "hard",
    question: "次のコードでコンパイルが通らないものはどれか？",
    code: `// (A)
void methodA() throws IOException {
    try {
        throw new IOException("test");
    } catch (IOException e) {
        throw e;  // 再スロー
    }
}

// (B)
void methodB() {
    try {
        throw new RuntimeException("test");
    } catch (Exception e) {
        throw e;  // 再スロー
    }
}`,
    choices: [
      "AとBは両方コンパイルが通る",
      "Aはコンパイルが通る。Bはthrows Exceptionが必要でコンパイルエラー",
      "Bはコンパイルが通る。AはIOExceptionをcatchしていても再スローにthrowsが必要",
      "AとBは両方コンパイルエラー"
    ],
    answer: 1,
    explanation: `【正解】B: AはOK。Bはthrows Exceptionが必要でコンパイルエラー

■ 検査例外の再スロー
検査例外（IOException等）は throw すると呼び出し元に伝搬します。
再スローする場合も throws 宣言が必要です（Aはあるのでコンパイルが通る）。

■ Bの問題点
catch(Exception e) でキャッチして throw e する場合、
コンパイラは「Exception が投げられる可能性がある」と判断します。
Exception は検査例外の親なので、throws Exception が必要です。

void methodB() throws Exception {  // ← 追加が必要
    ...
}

■ ただし特例（Java7以降）
try ブロックで投げられうる例外が RuntimeException のみなら
コンパイラが型推論してくれます（単一の例外型）。

■ ポイント
throw で再スローされる例外はcatch変数の「宣言型」ではなく
「実際にcatchされうる例外型」に基づいて型推論されます（Java7以降）。`,
    practicalNote: "例外の再スローは型推論で実際に投げる例外型が推定される。Exception型での再スローはthrows Exceptionが必要。"
  },

  // ===== super キーワード =====
  {
    id: 73,
    category: "継承",
    difficulty: "medium",
    question: "次のコードの出力として正しいものはどれか？",
    code: `class Animal {
    String sound() { return "..."; }
    void speak() { System.out.println("Animal: " + sound()); }
}

class Dog extends Animal {
    @Override
    String sound() { return "Woof"; }

    void speakBoth() {
        speak();           // (1)
        super.speak();     // (2)
    }
}

new Dog().speakBoth();`,
    choices: [
      "Animal: ... / Animal: ...",
      "Animal: Woof / Animal: Woof",
      "Animal: Woof / Animal: ...",
      "Dog: Woof / Animal: ..."
    ],
    answer: 1,
    explanation: `【正解】B: Animal: Woof / Animal: Woof

■ ポリモーフィズムとsuper
(1) speak() → Dogオブジェクトの speak() が呼ばれる
  speak()内で sound() を呼ぶとき、実際のオブジェクト（Dog）の sound() が呼ばれる
  → "Woof"
  → 出力: "Animal: Woof"

(2) super.speak() → 親クラスの speak() メソッドを呼ぶ
  しかし speak() 内の sound() は「実際のオブジェクト（Dog）」に基づく
  → sound() は "Woof" を返す
  → 出力: "Animal: Woof"

■ 重要なポイント
super.speak() はメソッドの定義を親クラスから呼びますが、
そのメソッド内部で呼ばれる他のメソッドはポリモーフィズムが適用されます。
つまり、super.speak()の中の sound() も Dog の sound() が使われます。

■ super の用途
super()     → 親コンストラクタの呼び出し（コンストラクタの1行目のみ）
super.method() → 親クラスの同名メソッドを明示的に呼ぶ
super.field    → 親クラスのフィールドを参照`,
    practicalNote: "super.method()は親メソッドを呼ぶが、その中での他メソッド呼び出しは実際のオブジェクト型（ポリモーフィズム）が適用される。"
  },

  // ===== this() コンストラクタチェーン =====
  {
    id: 74,
    category: "コンストラクタ",
    difficulty: "medium",
    question: "次のコードの出力として正しいものはどれか？",
    code: `class Config {
    String host;
    int port;
    boolean ssl;

    Config() {
        this("localhost");
        System.out.println("no-arg");
    }
    Config(String host) {
        this(host, 8080);
        System.out.println("host=" + host);
    }
    Config(String host, int port) {
        this.host = host;
        this.port = port;
        this.ssl = false;
        System.out.println("host=" + host + ",port=" + port);
    }
}
new Config();`,
    choices: [
      "no-arg → host=localhost → host=localhost,port=8080",
      "host=localhost,port=8080 → host=localhost → no-arg",
      "no-arg のみ",
      "コンパイルエラー（this()の循環呼び出し）"
    ],
    answer: 1,
    explanation: `【正解】B: host=localhost,port=8080 → host=localhost → no-arg

■ コンストラクタチェーンの実行順序
this() による呼び出しは必ず最初に実行され、
その後で呼び出し元の残りの処理が実行されます。

new Config()
  → this("localhost") で Config(String) へ
    → this("localhost", 8080) で Config(String, int) へ
      → 初期化処理
      → System.out.println("host=localhost,port=8080")  ← 最初に出力
    ← Config(String) に戻る
    → System.out.println("host=localhost")  ← 2番目に出力
  ← Config() に戻る
  → System.out.println("no-arg")  ← 最後に出力

■ this() の制約
・コンストラクタの最初の文でなければならない
・super() との共存不可（どちらか1つのみ）
・循環呼び出しはコンパイルエラー

■ 実務での活用
デフォルト値を持つオーバーロードコンストラクタのDRYな実装に使います。`,
    practicalNote: "this()はコンストラクタチェーン。実行はリダイレクト先が先で、呼び出し元の残り処理が後。コンストラクタの1行目のみ書ける。"
  },

  // ===== static 初期化子 =====
  {
    id: 75,
    category: "static",
    difficulty: "hard",
    question: "次のコードの出力として正しいものはどれか？",
    code: `class Counter {
    static int count;
    int id;

    static {
        count = 100;
        System.out.println("static init: count=" + count);
    }

    {
        count++;
        id = count;
        System.out.println("instance init: id=" + id);
    }

    Counter() {
        System.out.println("constructor: id=" + id);
    }
}

Counter c1 = new Counter();
Counter c2 = new Counter();`,
    choices: [
      "static init: count=100 / instance init: id=101 / constructor: id=101 / instance init: id=102 / constructor: id=102",
      "instance init: id=101 / static init: count=100 / constructor: id=101 / instance init: id=102 / constructor: id=102",
      "static init: count=100 / constructor: id=101 / instance init: id=102 / constructor: id=102",
      "static init が2回実行される"
    ],
    answer: 0,
    explanation: `【正解】A: static init → instance init: id=101 → constructor: id=101 → instance init: id=102 → constructor: id=102

■ 初期化の順序
1. static初期化子（クラスロード時に1回のみ）
2. インスタンス初期化子（各インスタンス生成ごと）
3. コンストラクタ（各インスタンス生成ごと）

■ 実行の流れ
クラス最初のロード時:
  static { count = 100; ... }  → "static init: count=100"

new Counter() 1回目:
  { count++; id = count; }  → count=101, id=101 → "instance init: id=101"
  Counter()                 → "constructor: id=101"

new Counter() 2回目:
  { count++; id = count; }  → count=102, id=102 → "instance init: id=102"
  Counter()                 → "constructor: id=102"

■ static初期化子の特徴
クラスがJVMにロードされたときに1度だけ実行されます。
new演算子が呼ばれても2回目以降は実行されません。
複数のstatic{}ブロックは定義順に実行されます。`,
    practicalNote: "static初期化子はクラスロード時1回のみ。インスタンス初期化子はコンストラクタより前に毎回実行。"
  },

  // ===== 配列とリストの変換 =====
  {
    id: 76,
    category: "配列",
    difficulty: "medium",
    question: "配列とリストの変換に関して正しいものはどれか？",
    code: `String[] arr = {"A", "B", "C"};

// (1) 配列→リスト
List<String> list1 = Arrays.asList(arr);
List<String> list2 = new ArrayList<>(Arrays.asList(arr));

// (2) リスト→配列
String[] arr2 = list2.toArray(new String[0]);`,
    choices: [
      "list1 と list2 は両方 add() できる",
      "list1 は add() できないが、list2 は add() できる",
      "list1 は add() できるが、list2 は add() できない",
      "どちらも add() できない"
    ],
    answer: 1,
    explanation: `【正解】B: list1 は add() できないが、list2 は add() できる

■ Arrays.asList() の罠
Arrays.asList(arr) は「固定サイズのリスト」を返します。
要素の変更（set）は可能ですが、サイズ変更（add/remove）は不可。

List<String> list1 = Arrays.asList(arr);
list1.set(0, "Z");   // OK（要素変更）
list1.add("D");      // UnsupportedOperationException ← 例外！

■ ArrayList に変換すれば add/remove 可能
List<String> list2 = new ArrayList<>(Arrays.asList(arr));
list2.add("D");  // OK

■ リスト→配列
String[] arr2 = list2.toArray(new String[0]);
// new String[0] はヒントのみ。実際のサイズはリストのサイズ。

■ Java8以降
List<String> list3 = new ArrayList<>(List.of("A", "B", "C"));

■ プリミティブ配列は注意
int[] primitiveArr = {1, 2, 3};
// Arrays.asList(primitiveArr) は List<int[]> になる（List<Integer>ではない）
Integer[] integerArr = {1, 2, 3};
// Arrays.asList(integerArr) は List<Integer> になる`,
    practicalNote: "Arrays.asList()は固定サイズ。add/removeが必要ならnew ArrayList<>(Arrays.asList(...))でラップする。"
  },

  // ===== インターフェースのdefaultメソッド =====
  {
    id: 77,
    category: "インターフェース",
    difficulty: "hard",
    question: "次のコードで実際に呼ばれる greet() の出力はどれか？",
    code: `interface Hello {
    default String greet() { return "Hello from Hello"; }
}

interface Hi {
    default String greet() { return "Hi from Hi"; }
}

class MyClass implements Hello, Hi {
    @Override
    public String greet() {
        return Hello.super.greet() + " & " + Hi.super.greet();
    }
}

System.out.println(new MyClass().greet());`,
    choices: [
      "Hello from Hello",
      "Hi from Hi",
      "Hello from Hello & Hi from Hi",
      "コンパイルエラー（defaultメソッドが競合している）"
    ],
    answer: 2,
    explanation: `【正解】C: Hello from Hello & Hi from Hi

■ defaultメソッドの競合
2つのインターフェースが同名の default メソッドを持つ場合、
実装クラスは必ずそのメソッドをオーバーライドしなければなりません。
（オーバーライドしないとコンパイルエラー）

■ 特定インターフェースのdefaultを呼ぶ
インターフェース名.super.メソッド名() で特定のインターフェースの
default 実装を呼び出せます。

Hello.super.greet()  → "Hello from Hello"
Hi.super.greet()     → "Hi from Hi"

return Hello.super.greet() + " & " + Hi.super.greet();
→ "Hello from Hello & Hi from Hi"

■ 優先順位（競合がない場合）
1. 実装クラス自身のオーバーライド
2. より具体的なインターフェース（継承関係が深い方）
3. 複数の同レベルインターフェース → コンパイルエラー（明示的オーバーライドが必要）`,
    practicalNote: "複数インターフェースのdefaultメソッド競合時は明示的オーバーライド必須。インターフェース名.super.method()で個別呼び出し可能。"
  },

  // ===== ラムダ式のスコープとeffectively final =====
  {
    id: 78,
    category: "ラムダ式",
    difficulty: "hard",
    question: "次のコードでコンパイルエラーになるものはどれか？",
    code: `int x = 10;
// (A)
Runnable r1 = () -> System.out.println(x);

int y = 20;
y = 30;
// (B)
Runnable r2 = () -> System.out.println(y);

int z = 40;
// (C)
Runnable r3 = () -> System.out.println(z + 1);`,
    choices: [
      "Aがコンパイルエラー（ラムダは外部変数を使えない）",
      "Bがコンパイルエラー（yはeffectively finalでない）",
      "Cがコンパイルエラー（ラムダ内で演算できない）",
      "A・B・Cすべてコンパイルが通る"
    ],
    answer: 1,
    explanation: `【正解】B: Bがコンパイルエラー（yはeffectively finalでない）

■ ラムダ式と変数キャプチャ
ラムダ式からアクセスできる外部変数は final または effectively final でなければなりません。

effectively final（実質的にfinal）:
→ 宣言後に一度も再代入されていない変数

■ 各変数の判定
x = 10 → 一度も再代入されていない → effectively final → (A) は OK
y = 20; y = 30; → y は再代入されている → effectively final でない → (B) はコンパイルエラー
z = 40 → 一度も再代入されていない → effectively final → (C) は OK（+1は演算であり再代入ではない）

■ なぜこの制限があるか
ラムダは変数の参照（スナップショット）をキャプチャします。
変更可能な変数を許可すると、並行処理で予期しない動作が起きる可能性があります。
この制限はスレッドセーフな設計を促すためのものです。

■ 解決策
変更が必要な場合はフィールドや配列を使います（参照自体は変わらない）。
int[] counter = {0};
Runnable r = () -> counter[0]++;  // OK（配列の参照はfinal）`,
    practicalNote: "ラムダは外部変数をキャプチャするがeffectively finalのみ。再代入された変数はコンパイルエラー。配列やフィールドで回避可能。"
  },

  // ===== Stream.distinct / collect =====
  {
    id: 79,
    category: "ラムダ式",
    difficulty: "medium",
    question: "次のコードの出力として正しいものはどれか？",
    code: `List<Integer> nums = Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6, 5, 3);
List<Integer> result = nums.stream()
    .distinct()
    .sorted()
    .collect(Collectors.toList());
System.out.println(result);`,
    choices: [
      "[1, 2, 3, 4, 5, 6, 9]",
      "[3, 1, 4, 1, 5, 9, 2, 6, 5, 3]",
      "[1, 1, 2, 3, 3, 4, 5, 5, 6, 9]",
      "[9, 6, 5, 4, 3, 2, 1]"
    ],
    answer: 0,
    explanation: `【正解】A: [1, 2, 3, 4, 5, 6, 9]

■ 処理の流れ
元のリスト: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]

.distinct() → 重複除去: [3, 1, 4, 5, 9, 2, 6]（順序は最初の登場順）
.sorted()   → 昇順ソート: [1, 2, 3, 4, 5, 6, 9]
.collect(Collectors.toList()) → リストに変換

■ 主な中間操作（遅延評価）
filter(Predicate)   → 絞り込み
map(Function)       → 変換
flatMap(Function)   → 1対多変換
distinct()          → 重複除去（equals/hashCodeを使用）
sorted()            → 自然順ソート
sorted(Comparator)  → カスタムソート
limit(n)            → 先頭n件
skip(n)             → 先頭n件をスキップ
peek(Consumer)      → デバッグ用（中間処理、値は変えない）

■ 終端操作（ストリームを消費）
collect(Collector)  → リスト/マップ/文字列等に変換
forEach(Consumer)   → 各要素に処理
reduce(id, BinOp)   → 累積演算
count()             → 件数
anyMatch/allMatch   → 条件判定
findFirst/findAny   → Optional<T>を返す`,
    practicalNote: "distinct()は重複除去。sorted()は昇順。Stream操作は中間操作（遅延）と終端操作（実行）の2種類がある。"
  },

  // ===== instanceof と型チェック =====
  {
    id: 80,
    category: "ポリモーフィズム",
    difficulty: "medium",
    question: "次のコードの出力として正しいものはどれか？",
    code: `class A {}
class B extends A {}
class C extends B {}

Object obj = new C();

System.out.println(obj instanceof C);  // (1)
System.out.println(obj instanceof B);  // (2)
System.out.println(obj instanceof A);  // (3)
System.out.println(obj instanceof Object);  // (4)`,
    choices: [
      "true / false / false / true",
      "true / true / false / true",
      "true / true / true / true",
      "false / false / false / true"
    ],
    answer: 2,
    explanation: `【正解】C: true / true / true / true

■ instanceof の判定ルール
instanceof は「実際のオブジェクトが指定した型またはそのサブクラス/実装クラスであるか」を確認します。

obj の実際の型は C
C は B を継承 → obj は B のインスタンスでもある
B は A を継承 → obj は A のインスタンスでもある
すべてのクラスは Object を継承 → obj は Object のインスタンスでもある

(1) obj instanceof C → true（Cそのもの）
(2) obj instanceof B → true（Cの親クラス）
(3) obj instanceof A → true（CはA→B→Cの継承チェーン）
(4) obj instanceof Object → true（すべてのクラスのルート）

■ ダウンキャスト前の確認
if (obj instanceof C) {
    C c = (C) obj;  // 安全なキャスト
}

■ Java16以降のパターンマッチ instanceof
if (obj instanceof C c) {
    c.doSomething();  // 自動的にキャスト済みの変数 c を使える
}

■ 注意
null instanceof ClassName → 常に false（例外は発生しない）`,
    practicalNote: "instanceofは継承チェーンをすべてチェックする。ダウンキャスト前に使うのが基本パターン。nullチェックにも使える（nullはfalse）。"
  }
];

// カテゴリ一覧
const CATEGORIES = [...new Set(QUESTIONS.map(q => q.category))];

// 難易度一覧
const DIFFICULTIES = ["easy", "medium", "hard"];
