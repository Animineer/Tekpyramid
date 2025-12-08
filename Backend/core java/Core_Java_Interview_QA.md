# Core Java Interview Preparation

This document covers Core Java topics with detailed explanations, implementation flows, and real-time examples, designed to help you answer interview questions effectively.

---

## 1. Introduction to Java & JVM Architecture

### 1.1 JDK, JRE, and JVM

**Why this topic?**
Understanding the internal architecture is crucial because it explains how Java achieves platform independence ("Write Once, Run Anywhere"). It clarifies the difference between the development environment (JDK), the runtime environment (JRE), and the execution engine (JVM).

**Flow of Implementation:**
1.  **Developer writes code**: You write `.java` files.
2.  **Compilation**: The `javac` compiler converts `.java` source code into `.class` bytecode.
3.  **Execution**: The JVM (part of JRE) loads the bytecode, verifies it, and interprets/compiles (JIT) it into machine code for the specific OS.

**Code Example:**
```java
// Simple Hello World to demonstrate the process
public class ArchitectureDemo {
    public static void main(String[] args) {
        System.out.println("This code runs inside the JVM!");
    }
}
```
*   **Compile**: `javac ArchitectureDemo.java` -> Generates `ArchitectureDemo.class` (Bytecode).
*   **Run**: `java ArchitectureDemo` -> JVM reads bytecode -> Machine Code -> Output.

**Realtime Example:**
Think of **JDK** as a "Kitchen" (tools to cook), **JRE** as the "Restaurant" (environment to serve food), and **JVM** as the "Chef" (who actually cooks/executes the recipe). A customer (End User) only needs the Restaurant (JRE) to eat, but the Cook (Developer) needs the Kitchen (JDK).

---

### 1.2 Data Types, Variables, and Literals

**Why this topic?**
Java is a strongly typed language. Knowing data types ensures efficient memory usage and type safety, preventing runtime errors.

**Flow of Implementation:**
1.  **Declare**: Define the type (e.g., `int`, `double`) and name.
2.  **Initialize**: Assign a value (literal).
3.  **Use**: Perform operations.

**Code Example:**
```java
public class DataTypeDemo {
    public static void main(String[] args) {
        // Primitive types
        int age = 25;           // Integer literal
        double salary = 4500.50;// Double literal
        boolean isEmployed = true; // Boolean literal
        
        // Reference type
        String name = "John";   // String literal
        
        System.out.println(name + " is " + age + " years old.");
    }
}


**Realtime Example:**
In a **Banking App**:
*   `String accountHolderName` (Text)
*   `double balance` (Decimal for money)
*   `int accountNumber` (Whole number)
*   `boolean isActive` (True/False flag)



### 1.3 Operators and Expressions

**Why this topic?**
Operators are the building blocks of logic. You need them to perform calculations, comparisons, and logical decisions.

**Flow of Implementation:**
1.  **Operands**: Identify the variables/values.
2.  **Operator**: Apply the symbol (`+`, `-`, `==`, `&&`).
3.  **Result**: The expression evaluates to a new value.

**Code Example:**
```java
public class OperatorDemo {
    public static void main(String[] args) {
        int a = 10, b = 20;
        
        // Arithmetic
        int sum = a + b; 
        
        // Relational
        boolean isGreater = a > b; 
        
        // Logical
        boolean result = (a < b) && (a > 0);
        
        System.out.println("Sum: " + sum); // 30
        System.out.println("Is a > b? " + isGreater); // false
        System.out.println("Result: " + result); // true
    }
}
```

**Realtime Example:**
**E-commerce Cart**:
*   `totalPrice = itemPrice * quantity` (Arithmetic)
*   `if (totalPrice > 500)` (Relational - Free Shipping check)
*   `if (isMember && hasCoupon)` (Logical - Discount eligibility)

---

### 1.4 Input/Output (Scanner, System.out)

**Why this topic?**
Interactive applications need to accept user input and display results. `Scanner` is the standard way to read console input.

**Flow of Implementation:**
1.  **Import**: `import java.util.Scanner;`
2.  **Instantiate**: Create a `Scanner` object connected to `System.in`.
3.  **Read**: Use methods like `nextInt()`, `nextLine()`.
4.  **Close**: Close the scanner to release resources.

**Code Example:**
```java
import java.util.Scanner;

public class InputDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter your name: ");
        String name = scanner.nextLine(); // Reads a line of text
        
        System.out.print("Enter your age: ");
        int age = scanner.nextInt(); // Reads an integer
        
        System.out.println("Welcome, " + name + "!");
        
        scanner.close();
    }
}
```

**Realtime Example:**
**ATM Machine**:
*   Screen asks: "Enter PIN" (Output)
*   Keypad accepts numbers (Input via Scanner-like mechanism)
*   System validates and shows "Access Granted" (Output)

---

### 1.5 Type Casting and Conversion

**Why this topic?**
Sometimes you need to convert data from one type to another (e.g., calculating an average which results in a decimal from integer inputs).

**Flow of Implementation:**
1.  **Implicit (Widening)**: Automatic, smaller to larger type (e.g., `int` to `double`).
2.  **Explicit (Narrowing)**: Manual, larger to smaller type (e.g., `double` to `int`). Risk of data loss.

**Code Example:**
```java
public class CastingDemo {
    public static void main(String[] args) {
        // Implicit
        int num = 100;
        double doubleNum = num; // Automatic
        
        // Explicit
        double pi = 3.14159;
        int intPi = (int) pi; // Manual cast, .14159 is lost
        
        System.out.println("Double: " + doubleNum); // 100.0
        System.out.println("Integer Pi: " + intPi); // 3
    }
}
```

**Realtime Example:**
**Temperature Converter**:
*   User enters `98` (Integer).
*   Formula `(98 - 32) * 5 / 9` requires floating-point calculation for accuracy.
*   You cast the integer to `double` before division to avoid losing the decimal part.

---

### 1.6 Command-line Arguments

**Why this topic?**
It allows passing configuration or input to the application at the moment it starts, without hardcoding values.

**Flow of Implementation:**
1.  **Main Method**: `public static void main(String[] args)`
2.  **Args Array**: The `args` parameter holds the strings passed from the command line.
3.  **Access**: Use `args[0]`, `args[1]`, etc.

**Code Example:**
```java
public class CmdArgsDemo {
    public static void main(String[] args) {
        if (args.length > 0) {
            System.out.println("Hello, " + args[0]);
        } else {
            System.out.println("Hello, Guest");
        }
    }
}
```
*   Run: `java CmdArgsDemo Alice`
*   Output: `Hello, Alice`

**Realtime Example:**
**Server Startup**:
*   `java StartServer --port 8080 --env production`
*   The program reads the port and environment from `args` to configure the server dynamically.

---

## 2. Control Flow Statements

### 2.1 if, else if, switch

**Why this topic?**
Decision making is fundamental. You need to execute different code blocks based on conditions.

**Flow of Implementation:**
1.  **Evaluate Condition**: Check a boolean expression.
2.  **Branch**: Execute the corresponding block.
3.  **Switch**: Select one of many code blocks to execute (optimized for single variable equality checks).

**Code Example:**
```java
public class DecisionDemo {
    public static void main(String[] args) {
        int day = 3;
        
        // If-Else
        if (day > 5) {
            System.out.println("Weekend");
        } else {
            System.out.println("Weekday");
        }
        
        // Switch
        switch (day) {
            case 1: System.out.println("Monday"); break;
            case 2: System.out.println("Tuesday"); break;
            case 3: System.out.println("Wednesday"); break;
            default: System.out.println("Invalid day");
        }
    }
}
```

**Realtime Example:**
**Traffic Light System**:
*   `if (light == RED)` -> Stop.
*   `else if (light == YELLOW)` -> Slow down.
*   `else if (light == GREEN)` -> Go.

---

### 2.2 for, while, do-while

**Why this topic?**
Loops allow you to repeat a block of code multiple times, which is essential for processing collections of data or repeating tasks.

**Flow of Implementation:**
1.  **Initialization**: Start counter.
2.  **Condition**: Check if loop should continue.
3.  **Update**: Modify counter.
4.  **Body**: Execute code.

**Code Example:**
```java
public class LoopDemo {
    public static void main(String[] args) {
        // For loop (Known number of iterations)
        for (int i = 1; i <= 3; i++) {
            System.out.println("Count: " + i);
        }
        
        // While loop (Unknown iterations, check first)
        int battery = 5;
        while (battery > 0) {
            System.out.println("Using phone...");
            battery--;
        }
        
        // Do-While (Execute at least once)
        do {
            System.out.println("This runs once even if condition is false");
        } while (false);
    }
}
```

**Realtime Example:**
**Music Player**:
*   `while (playlist.hasNext())` -> Play next song.
*   `for (Song s : songs)` -> Display all songs in the list.

---

### 2.3 break, continue, return

**Why this topic?**
These keywords give you fine-grained control over loops and method execution.

**Flow of Implementation:**
*   **break**: Exits the loop immediately.
*   **continue**: Skips the current iteration and jumps to the next one.
*   **return**: Exits the method and optionally sends back a value.

**Code Example:**
```java
public class JumpDemo {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            if (i == 3) continue; // Skip 3
            if (i == 5) break;    // Stop at 5 (before printing)
            System.out.println(i);
        }
        // Output: 1, 2, 4
    }
    
    int getNumber() {
        return 42; // Exits method
    }
}
```

**Realtime Example:**
**Search Function**:
*   Loop through a list of users.
*   `if (user.id == targetId)` -> Found it! `break` (No need to check the rest).
*   `if (user.isDeleted)` -> `continue` (Skip deleted users).

---

## 3. Arrays and Strings

### 3.1 1D and 2D Arrays

**Why this topic?**
Arrays are the most basic data structure to store multiple values of the same type in a single variable.

**Flow of Implementation:**
1.  **Declare**: `int[] arr;`
2.  **Instantiate**: `arr = new int[5];` (Allocates memory)
3.  **Initialize**: `arr[0] = 10;`
4.  **Access**: `System.out.println(arr[0]);`

**Code Example:**
```java
public class ArrayDemo {
    public static void main(String[] args) {
        // 1D Array
        int[] numbers = {10, 20, 30};
        
        // 2D Array (Matrix)
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6}
        };
        
        System.out.println("Element at 0,1: " + matrix[0][1]); // 2
    }
}
```

**Realtime Example:**
*   **1D Array**: A list of student marks in a class.
*   **2D Array**: A chessboard (8x8 grid) or a cinema hall seating arrangement.

---

### 3.2 String Immutability & StringBuffer/StringBuilder

**Why this topic?**
Strings are immutable in Java for security and memory efficiency (String Pool). However, this makes frequent modifications slow. `StringBuilder` and `StringBuffer` solve this by being mutable.

**Flow of Implementation:**
*   **String**: Modifications create new objects.
*   **StringBuilder**: Modifies the existing object (Fast, not thread-safe).
*   **StringBuffer**: Modifies the existing object (Slower, thread-safe).

**Code Example:**
```java
public class StringDemo {
    public static void main(String[] args) {
        // String (Immutable)
        String s = "Hello";
        s.concat(" World"); 
        System.out.println(s); // Prints "Hello" (Original not changed)
        
        // StringBuilder (Mutable)
        StringBuilder sb = new StringBuilder("Hello");
        sb.append(" World");
        System.out.println(sb); // Prints "Hello World"
    }
}
```

**Realtime Example:**
*   **String**: Storing Usernames or Passwords (values that don't change often).
*   **StringBuilder**: Constructing a long SQL query or JSON string dynamically in a loop.

---

## 4. OOPs Concepts

### 4.1 Classes and Objects

**Why this topic?**
Object-Oriented Programming (OOP) models real-world entities. A **Class** is a blueprint, and an **Object** is an instance of that blueprint.

**Flow of Implementation:**
1.  **Define Class**: Create a class with attributes (fields) and behaviors (methods).
2.  **Create Object**: Use the `new` keyword.
3.  **Access**: Use the dot operator `.`.

**Code Example:**

```java
class Car {
    String model;
    
    void drive() {
        System.out.println(model + " is driving...");
    }
}

public class OOPDemo {
    public static void main(String[] args) {
        Car myCar = new Car(); // Object creation
        myCar.model = "Tesla";
        myCar.drive();
    }
}
```

**Realtime Example:**
*   **Class**: "Car Design Blueprint"
*   **Object**: The actual "Red Ferrari" or "Blue Toyota" on the road.

---

### 4.2 Encapsulation

**Why this topic?**
It protects data by bundling it with methods and restricting direct access. It allows you to control how data is accessed or modified.

**Flow of Implementation:**
1.  **Private Fields**: Mark variables as `private`.
2.  **Public Methods**: Provide `getters` and `setters` to access them.

**Code Example:**
```java
class Account {
    private double balance; // Hidden data
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount; // Controlled access
        }
    }
    
    public double getBalance() {
        return balance;
    }
}
```

**Realtime Example:**
**Capsule**: You can't see the medicine inside directly; you consume it through the capsule shell.
**Bank Account**: You can't directly edit your balance in the database; you must use "Deposit" or "Withdraw" functions.

---

### 4.3 Inheritance

**Why this topic?**
It promotes code reusability. A child class acquires properties and behaviors of a parent class.

    - **Single Inheritance**: Class A -> Class B.
    - **Multilevel Inheritance**: Class A -> Class B -> Class C.
    - **Hierarchical Inheritance**: Class A -> Class B, Class A -> Class C.
    - **Multiple Inheritance**: Not supported with classes (Diamond Problem), but supported with Interfaces.
    - **Hybrid Inheritance**: Combination of two or more types.

**Flow of Implementation:**
1.  **Parent Class**: Define common attributes.
2.  **Child Class**: Use `extends` keyword.

**Code Example:**
```java
class Animal {
    void eat() { System.out.println("Eating..."); }
}

class Dog extends Animal {
    void bark() { System.out.println("Barking..."); }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.eat(); // Inherited
        d.bark(); // Own method
    }
}
```

**Realtime Example:**
**Parent**: "Mobile Phone" (Calls, SMS).
**Child**: "Smart Phone" (Calls, SMS + Camera, Internet).

---

### 4.4 Polymorphism (Overloading & Overriding)

**Why this topic?**
Polymorphism means "many forms". It allows a single interface to support entities of different types.

**Flow of Implementation:**
*   **Overloading (Compile-time)**: Same method name, different parameters.
*   **Overriding (Runtime)**: Same method signature in child class.

**Code Example:**
```java
class Calculator {
    // Overloading
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
}

class Animal {
    void sound() { System.out.println("Animal sound"); }
}

class Cat extends Animal {
    // Overriding
    @Override
    void sound() { System.out.println("Meow"); }
}
```

**Realtime Example:**
*   **Overloading**: A "Search" function. Search by Name, Search by ID, or Search by Date.
*   **Overriding**: A "Shape" class has a `draw()` method. "Circle", "Square", and "Triangle" classes all implement `draw()` differently.

---

### 4.5 Abstraction (Abstract Class & Interface)

**Why this topic?**
Abstraction hides implementation details and shows only functionality. It forces subclasses to implement specific behaviors.

**Flow of Implementation:**
*   **Abstract Class**: Can have both abstract (empty) and concrete methods. Use `extends`.
*   **Interface**: Only abstract methods (until Java 8). Use `implements`.

**Code Example:**
```java
interface Payment {
    void pay(int amount); // Abstract
}

class CreditCard implements Payment {
    public void pay(int amount) {
        System.out.println("Paid " + amount + " via Credit Card");
    }
}

class PayPal implements Payment {
    public void pay(int amount) {
        System.out.println("Paid " + amount + " via PayPal");
    }
}
```

**Realtime Example:**
**Car Dashboard**: You have a steering wheel, accelerator, and brake (Interface). You don't need to know how the engine combustion works (Implementation hidden) to drive the car.

---

## 5. Exception Handling

### 5.1 try, catch, finally, throw, throws

**Why this topic?**
Exceptions are runtime errors that disrupt the normal flow. Handling them ensures the application doesn't crash and provides meaningful error messages.

*   **Checked Exceptions**: Checked at compile-time (e.g., `IOException`, `SQLException`). You *must* handle them.
*   **Unchecked Exceptions**: Occurs at runtime (e.g., `NullPointerException`, `ArithmeticException`). Handling is optional but recommended.
*   **Errors**: Serious problems that applications shouldn't try to catch (e.g., `OutOfMemoryError`, `StackOverflowError`).

**Flow of Implementation:**
*   **try**: Block of code that might throw an exception.
*   **catch**: Block that handles the exception.
*   **finally**: Block that always executes (cleanup).
*   **throw**: Explicitly throw an exception.
*   **throws**: Declare that a method might throw an exception.

**Code Example:**
```java
public class ExceptionDemo {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // ArithmeticException
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero!");
        } finally {
            System.out.println("Cleanup code executed.");
        }
    }
    
    // Throws declaration
    void readFile() throws IOException {
        throw new IOException("File not found"); // Explicit throw
    }
}
```

**Realtime Example:**
**File Download**:
*   `try` to download.
*   `catch` "Network Error" (Retry or notify user).
*   `finally` close the connection stream.

---

### 5.2 Custom Exceptions

**Why this topic?**
Built-in exceptions (like `NullPointerException`) cover generic errors. Custom exceptions allow you to define business-specific errors.

**Flow of Implementation:**
1.  **Create Class**: Extend `Exception` (Checked) or `RuntimeException` (Unchecked).
2.  **Constructor**: Call `super(message)`.

**Code Example:**
```java
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String msg) {
        super(msg);
    }
}

class Bank {
    void withdraw(double amount) throws InsufficientFundsException {
        if (amount > 1000) {
            throw new InsufficientFundsException("Not enough money!");
        }
    }
}
```

**Realtime Example:**
**Login System**: `InvalidCredentialsException` or `AccountLockedException`.

---

## 6. Wrapper Classes & Autoboxing

### 6.1 Wrapper Classes & Autoboxing

**Why this topic?**
Java primitives (`int`, `double`) are not objects. Wrapper classes (`Integer`, `Double`) wrap them into objects, which is required for Collections (like `ArrayList<Integer>`) that only store objects.

**Flow of Implementation:**
*   **Autoboxing**: Automatic conversion of primitive to wrapper.
*   **Unboxing**: Automatic conversion of wrapper to primitive.

**Code Example:**
```java
public class WrapperDemo {
    public static void main(String[] args) {
        int num = 10;
        
        // Autoboxing
        Integer obj = num; 
        
        // Unboxing
        int n = obj;
        
        // Utility methods
        int parsed = Integer.parseInt("123");
        System.out.println(parsed + 10); // 133
    }
}
```

**Realtime Example:**
**Forms**: Text fields return Strings ("100"). You use `Integer.parseInt()` to convert it to a number for calculation.

---

## 7. Collections Framework

### 7.1 List, Set, Map (Hierarchy Overview)

**Why this topic?**
Collections provide a standard way to store and manipulate groups of objects. Choosing the right one impacts performance.

**Flow of Implementation:**
*   **List** (Ordered, Duplicates allowed):
    *   `ArrayList`: Fast iteration, slow insertion/deletion (Dynamic Array).
    *   `LinkedList`: Fast insertion/deletion, slow access (Doubly Linked List).
    *   `Vector`: Thread-safe version of ArrayList (Legacy).
*   **Set** (Unordered, Unique elements):
    *   `HashSet`: Unordered, fast (Hash Table).
    *   `LinkedHashSet`: Ordered by insertion.
    *   `TreeSet`: Sorted order (Red-Black Tree).
*   **Map** (Key-Value pairs):
    *   `HashMap`: Unordered keys.
    *   `LinkedHashMap`: Insertion ordered keys.
    *   `TreeMap`: Sorted keys.
    *   `Hashtable`: Thread-safe (Legacy).

**Code Example:**
```java
import java.util.*;

public class CollectionDemo {
    public static void main(String[] args) {
        // List
        List<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Alice"); // Allowed
        
        // Set
        Set<String> uniqueNames = new HashSet<>(names);
        // uniqueNames has only one "Alice"
        
        // Map
        Map<String, Integer> ages = new HashMap<>();
        ages.put("Alice", 25);
    }
}
```

**Realtime Example:**
*   **List**: Shopping Cart (Items added in order, duplicates allowed).
*   **Set**: Student IDs (Must be unique).
*   **Map**: Phonebook (Name -> Phone Number).

---

### 7.2 Comparable vs Comparator

**Why this topic?**
Sorting objects requires defining *how* to compare them.

**Flow of Implementation:**
*   **Comparable**: Implemented by the class itself (`compareTo`). Natural ordering.
*   **Comparator**: Separate class (`compare`). Custom ordering.

**Code Example:**
```java
class Student implements Comparable<Student> {
    int id;
    public int compareTo(Student other) {
        return this.id - other.id; // Sort by ID
    }
}

// Custom Comparator
class NameComparator implements Comparator<Student> {
    public int compare(Student s1, Student s2) {
        return s1.name.compareTo(s2.name); // Sort by Name
    }
}
```

**Realtime Example:**
**Product List**:
*   Default Sort: By Price (Comparable).
*   Filter: Sort by Rating, Sort by Newest (Comparators).

---

## 8. Multithreading

### 8.1 Thread vs Runnable

**Why this topic?**
Multithreading allows concurrent execution of tasks, maximizing CPU utilization. You can create threads by extending `Thread` or implementing `Runnable`.

**Flow of Implementation:**
*   **Extend Thread**: Limit (cannot extend other classes).
*   **Implement Runnable**: Flexible (can extend other classes). Preferred.

**Code Example:**
```java
// Way 1: Runnable
class Task implements Runnable {
    public void run() {
        System.out.println("Thread running...");
    }
}

public class ThreadDemo {
    public static void main(String[] args) {
        Thread t1 = new Thread(new Task());
        t1.start(); // Starts a new call stack
    }
}
```

**Realtime Example:**
**Web Browser**: One thread downloads the file, another thread updates the progress bar, and another handles user clicks (scrolling).

---

### 8.2 Synchronization

**Why this topic?**
When multiple threads access shared resources (like a bank account) simultaneously, data inconsistency occurs. Synchronization ensures only one thread accesses the resource at a time.

**Flow of Implementation:**
1.  **Identify Critical Section**: Code that modifies shared data.
2.  **Synchronize**: Use `synchronized` keyword on method or block.

**Code Example:**
```java
class Counter {
    private int count = 0;
    
    public synchronized void increment() {
        count++; // Thread-safe
    }
}
```

**Realtime Example:**
**Train Ticket Booking**: If only 1 seat is left, two users shouldn't be able to book it at the exact same millisecond. Synchronization locks the seat for one user while the other waits.

---

## 9. File I/O and Serialization

### 9.1 File I/O (Reader/Writer)

**Why this topic?**
Applications need to persist data. Java I/O streams handle reading/writing to files.

**Flow of Implementation:**
*   **Byte Streams**: `FileInputStream` (Images, Videos).
*   **Character Streams**: `FileReader` (Text files).
*   **Buffered**: `BufferedReader` (Efficient reading).

**Code Example:**
```java
import java.io.*;

public class FileDemo {
    public static void main(String[] args) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("test.txt"))) {
            writer.write("Hello File!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**Realtime Example:**
**Log Files**: Server writes error logs to a `.log` file for later analysis.

---

### 9.2 Serialization

**Why this topic?**
Serialization converts an object into a byte stream to save it to a file or send it over a network. Deserialization reverses it.

**Flow of Implementation:**
1.  **Implement Serializable**: Marker interface.
2.  **ObjectOutputStream**: Write object.
3.  **ObjectInputStream**: Read object.

**Code Example:**
```java
import java.io.*;

class User implements Serializable {
    String name;
}

public class SerialDemo {
    public static void main(String[] args) throws Exception {
        User u = new User();
        u.name = "Admin";
        
        // Save state
        ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("user.ser"));
        out.writeObject(u);
        out.close();
    }
}
```

**Realtime Example:**
**Game Save**: Saving the player's current level, health, and inventory to a file so they can resume later.

---

## 10. Java 8 Features

### 10.1 Lambda Expressions & Functional Interfaces

**Why this topic?**
It enables functional programming, making code more concise and readable. A Functional Interface has exactly one abstract method.

**Flow of Implementation:**
1.  **Interface**: Define interface with one method.
2.  **Lambda**: `(args) -> { body }`.

**Code Example:**
```java
@FunctionalInterface
interface MathOp {
    int operate(int a, int b);
}

public class LambdaDemo {
    public static void main(String[] args) {
        // Implementation using Lambda
        MathOp add = (a, b) -> a + b;
        
        System.out.println(add.operate(5, 3)); // 8
    }
}
```

**Realtime Example:**
**Event Listeners**: `button.addActionListener(e -> System.out.println("Clicked"));`

---

### 10.2 Stream API

**Why this topic?**
Streams provide a declarative way to process collections (filter, map, reduce) efficiently, often in parallel.

**Flow of Implementation:**
1.  **Source**: Collection.
2.  **Intermediate Ops**: `filter`, `map`, `sorted` (Lazy).
3.  **Terminal Op**: `collect`, `forEach`, `count` (Triggers processing).

**Code Example:**
```java
import java.util.*;
import java.util.stream.Collectors;

public class StreamDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");
        
        // Filter names starting with 'A' and convert to uppercase
        List<String> result = names.stream()
            .filter(n -> n.startsWith("A"))
            .map(String::toUpperCase)
            .collect(Collectors.toList());
            
        System.out.println(result); // [ALICE]
    }
}
```

**Realtime Example:**
**Data Processing**: Filtering a list of 10,000 employees to find those earning > $50k and sorting them by name.


## 11. Important Keywords (static, final, this, super)

### 11.1 static vs final

**Why this topic?**
These keywords control memory management and mutability.
*   **static**: Belongs to the class, not the object. Shared among all instances.
*   **final**: Restriction modifier.
    *   **Variable**: Constant (cannot change).
    *   **Method**: Cannot be overridden.
    *   **Class**: Cannot be inherited (e.g., String class).

**Code Example:**
\\\java
class Constants {
    static final double PI = 3.14159; // Class-level constant
    
    static void print() {
        System.out.println("Static Method");
    }
}
\\\

### 11.2 this vs super

*   **this**: Refers to the current object instance.
*   **super**: Refers to the parent class instance.

---

## 12. Object Class Methods (equals & hashCode)

**Why this topic?**
Every class in Java inherits from Object. Understanding equals() and hashCode() is critical for using objects in Collections like HashMap or HashSet.

**Flow of Implementation:**
*   **==**: Compares references (memory address).
*   **equals()**: Compares content (if overridden).
*   **hashCode()**: Returns an integer representation. *Contract*: If two objects are equal, their hashCodes must be same.

**Code Example:**
\\\java
class Employee {
    int id;
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Employee e = (Employee) obj;
        return id == e.id;
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
\\\

**Realtime Example:**
**HashMap Keys**: If you use a custom Key object in a Map, you MUST override these methods, otherwise you won't be able to retrieve the value.

---

## 13. Memory Management (Stack vs Heap)

**Why this topic?**
Understanding where variables are stored helps in debugging OutOfMemoryError or StackOverflowError.

**Flow of Implementation:**
*   **Stack Memory**: Stores method calls, local variables, and reference variables. LIFO order. Thread-safe (each thread has its own stack).
*   **Heap Memory**: Stores Objects (created with 
ew). Shared by all threads. Garbage Collector cleans this.

**Realtime Example:**
*   int x = 10; -> Stored in Stack.
*   Employee e = new Employee(); -> Reference e in Stack, actual Employee object in Heap.

---

## 14. Java 8 Optional Class

**Why this topic?**
It avoids NullPointerException (NPE) by forcing you to handle the absence of a value.

**Flow of Implementation:**
1.  **Create**: Optional.of(value) or Optional.ofNullable(value).
2.  **Check**: isPresent().
3.  **Get**: orElse("Default") or orElseThrow().

**Code Example:**
\\\java
Optional<String> name = Optional.ofNullable(null);
String result = name.orElse("Unknown User"); // Returns "Unknown User" instead of crashing
\\\

