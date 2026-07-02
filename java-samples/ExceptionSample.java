/**
 * Java Silver 学習サンプル - 例外処理
 * 実行方法: javac ExceptionSample.java && java ExceptionSample
 */

// カスタムチェック例外
class InsufficientFundsException extends Exception {
    double amount;
    InsufficientFundsException(double amount) {
        super("残高不足: 必要金額 " + amount + "円");
        this.amount = amount;
    }
}

// カスタム非チェック例外
class InvalidAmountException extends RuntimeException {
    InvalidAmountException(String msg) { super(msg); }
}

class BankAccount {
    private String owner;
    private double balance;

    BankAccount(String owner, double initial) {
        this.owner = owner;
        this.balance = initial;
    }

    // チェック例外：呼び出し元で処理が必須
    void withdraw(double amount) throws InsufficientFundsException {
        if (amount <= 0) throw new InvalidAmountException("金額は正の値にしてください");
        if (balance < amount) throw new InsufficientFundsException(amount);
        balance -= amount;
        System.out.println(owner + ": " + amount + "円 出金。残高=" + balance);
    }

    double getBalance() { return balance; }
}

public class ExceptionSample {

    public static void main(String[] args) {

        System.out.println("===== try-catch-finally の基本 =====");
        try {
            System.out.println("try: 開始");
            int result = 10 / 0;  // ArithmeticException 発生
            System.out.println("try: これは実行されない");
        } catch (ArithmeticException e) {
            System.out.println("catch: " + e.getMessage()); // / by zero
        } finally {
            System.out.println("finally: 必ず実行される");
        }

        System.out.println("\n===== チェック例外の処理 =====");
        BankAccount account = new BankAccount("田中", 10000);
        try {
            account.withdraw(3000);                    // 成功
            account.withdraw(8000);                    // 残高不足 → 例外発生
            System.out.println("これは実行されない");
        } catch (InsufficientFundsException e) {
            System.out.println("エラー: " + e.getMessage());
            System.out.println("不足額: " + e.amount);
        }

        System.out.println("\n===== 非チェック例外 =====");
        try {
            account.withdraw(-100); // InvalidAmountException
        } catch (InvalidAmountException e) {
            System.out.println("不正入力: " + e.getMessage());
        }

        System.out.println("\n===== finallyはreturnより先 =====");
        System.out.println("test() の戻り値: " + testReturn());

        System.out.println("\n===== マルチキャッチ（Java7以降） =====");
        Object[] arr = {"hello", null, 42};
        for (Object obj : arr) {
            try {
                String s = (String) obj;   // ClassCastException の可能性
                System.out.println(s.toUpperCase()); // NullPointerException の可能性
            } catch (ClassCastException | NullPointerException e) {
                System.out.println("例外: " + e.getClass().getSimpleName());
            }
        }

        System.out.println("\n===== 例外の階層 =====");
        testHierarchy();
    }

    static int testReturn() {
        try {
            System.out.println("  try: return 1");
            return 1;
        } finally {
            System.out.println("  finally: return 2 (tryのreturnを上書き)");
            return 2;  // tryのreturnより優先される！（実務ではやらない）
        }
    }

    static void testHierarchy() {
        // 親クラスのExceptionでまとめてキャッチできる
        String[] inputs = {"123", "abc", null};
        for (String s : inputs) {
            try {
                int n = Integer.parseInt(s); // NumberFormatException または NPE の可能性
                System.out.println("変換成功: " + n);
            } catch (NumberFormatException e) {
                System.out.println("数値変換エラー: [" + s + "]");
            } catch (NullPointerException e) {
                System.out.println("nullポインタエラー");
            }
        }
    }
}
