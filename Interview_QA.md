# Interview Q&A Document (Detailed)

## JavaScript

### 1. What is JavaScript?
**Detailed Answer:**
JavaScript is a high-level, interpreted, programming language used primarily to create dynamic and interactive content on websites.
*   **Client-Side:** It runs in the user's browser (manipulating DOM, handling events).
*   **Server-Side:** With Node.js, it runs on the server (handling API requests, database connections).
*   **Nature:** It is single-threaded (uses Event Loop), dynamically typed (variables don't have fixed types), and supports multiple paradigms (Object-Oriented, Functional).

**Why it is used:**
To transform static HTML pages into interactive applications. It handles logic, data manipulation, and asynchronous communication (AJAX) without reloading the page.

**Syntax & Complete Flow:**
*Scenario: A button that changes text when clicked.*

```html
<!-- HTML Structure -->
<!DOCTYPE html>
<html>
<body>
  <h1 id="header">Hello Static World</h1>
  <button id="btn">Click Me</button>

  <script>
    // JavaScript Implementation
    // 1. Select elements
    const header = document.getElementById('header');
    const button = document.getElementById('btn');

    // 2. Define the logic
    function changeText() {
      if (header.innerText === "Hello Static World") {
        header.innerText = "Hello Dynamic JavaScript!";
        header.style.color = "blue";
      } else {
        header.innerText = "Hello Static World";
        header.style.color = "black";
      }
    }

    // 3. Attach event listener
    button.addEventListener('click', changeText);
  </script>
</body>
</html>
```

**Real-time Example:**
Consider a **Shopping Cart**. When you click "Add to Cart":
1.  JavaScript prevents the page reload.
2.  It updates the cart count number in the header.
3.  It calculates the new total price.
4.  It might send an asynchronous request to the server to save the item.

**Interviewer Intentions:**
*   Do you know it's not just for browsers anymore (Node.js)?
*   Do you understand it's a scripting language?
*   Can you explain its dynamic nature?

---

### 2. How Event Loop works in JS?
**Detailed Answer:**
JavaScript is **single-threaded**, meaning it has one Call Stack and can do one thing at a time. However, it handles asynchronous operations (like API calls, timers) using the **Event Loop**.

**Components:**
1.  **Call Stack:** Where code is executed. LIFO (Last In, First Out).
2.  **Web APIs:** Browser features (setTimeout, fetch, DOM) that run separately from the main thread.
3.  **Callback Queue (Task Queue):** Holds callbacks from `setTimeout`, `setInterval`.
4.  **Microtask Queue:** Holds callbacks from `Promises`, `queueMicrotask`. Has **higher priority** than the Callback Queue.
5.  **Event Loop:** Continuously checks: *Is the Call Stack empty? If yes, push the first item from Microtask Queue (if any), else push from Callback Queue.*

**Syntax & Complete Flow:**
*Scenario: Demonstrating the order of execution.*

```javascript
console.log("1. Start"); // Step 1: Pushed to Stack, logged, popped.

setTimeout(() => {
  console.log("2. Timeout Callback");
}, 0); // Step 2: Sent to Web API. Timer finishes instantly -> Callback Queue.

Promise.resolve().then(() => {
  console.log("3. Promise Microtask");
}); // Step 3: .then callback goes to Microtask Queue.

console.log("4. End"); // Step 4: Pushed to Stack, logged, popped.

// Event Loop Logic:
// 1. Stack is empty.
// 2. Check Microtask Queue: Found "Promise Microtask". Push to Stack -> Run -> Pop.
// 3. Check Microtask Queue: Empty.
// 4. Check Callback Queue: Found "Timeout Callback". Push to Stack -> Run -> Pop.

// Output:
// 1. Start
// 4. End
// 3. Promise Microtask
// 2. Timeout Callback
```

**Real-time Example:**
**Infinite Scroll:**
1.  User scrolls (Event triggers).
2.  `fetch` request sent (Web API).
3.  JS continues rendering other UI parts (Stack).
4.  Data arrives -> `displayImages` function goes to Queue.
5.  Event Loop pushes `displayImages` to Stack when free.

**Interviewer Intentions:**
*   Do you understand non-blocking I/O?
*   Do you know the difference between Microtasks (Promises) and Macrotasks (setTimeout)?

---

### 3. let, var, const
**Detailed Answer:**
*   **var:** Function-scoped. Can be redeclared. Hoisted with `undefined`. (Legacy).
*   **let:** Block-scoped `{}`. Cannot be redeclared in same scope. Hoisted but in "Temporal Dead Zone" (TDZ).
*   **const:** Block-scoped. Cannot be reassigned. Must be initialized during declaration. Objects declared with `const` are mutable (properties can change), but the reference cannot.

**Syntax & Complete Flow:**

```javascript
// 1. Scope Difference
function scopeTest() {
  if (true) {
    var a = "Var";
    let b = "Let";
    const c = "Const";
  }
  console.log(a); // "Var" (Function scoped - leaked out of if block)
  // console.log(b); // Error: b is not defined (Block scoped)
  // console.log(c); // Error: c is not defined (Block scoped)
}

// 2. Reassignment
let count = 1;
count = 2; // OK

const url = "https://api.com";
// url = "https://google.com"; // Error: Assignment to constant variable.

// 3. Const Object Mutation
const user = { name: "Alice" };
user.name = "Bob"; // OK (Modifying property)
// user = { name: "Charlie" }; // Error (Reassigning reference)
```

**Real-time Example:**
*   **const:** Importing libraries (`const React = require('react')`), API endpoints, configuration.
*   **let:** Loop counters (`for (let i=0...)`), toggle states (`let isOpen = false`).
*   **var:** Rarely used in modern development, mostly seen in legacy code.

**Interviewer Intentions:**
*   Scope knowledge (Block vs Function).
*   Immutability concepts.
*   Hoisting behavior.

---

### 4. Datatypes in JS?
**Detailed Answer:**
JavaScript is **dynamically typed**. Types are divided into Primitives and Non-Primitives (Reference).

**1. Primitive Types (Stored by Value, Immutable):**
*   **String:** Text data.
*   **Number:** Integers and floats (64-bit floating point).
*   **Boolean:** `true` / `false`.
*   **Undefined:** Variable declared but not assigned.
*   **Null:** Intentional absence of value.
*   **Symbol:** Unique identifier (ES6).
*   **BigInt:** Integers larger than `2^53 - 1`.

**2. Non-Primitive Types (Stored by Reference, Mutable):**
*   **Object:** Key-value pairs (includes Arrays, Functions, Dates).

**Syntax & Complete Flow:**

```javascript
// Primitive Comparison (Value)
let a = 10;
let b = 10;
console.log(a === b); // true

// Reference Comparison (Memory Address)
let obj1 = { id: 1 };
let obj2 = { id: 1 };
console.log(obj1 === obj2); // false (Different memory locations)

let obj3 = obj1; // Copying reference
obj3.id = 5;
console.log(obj1.id); // 5 (Both point to same object)
```

**Real-time Example:**
*   **Primitive:** Storing a user's age (`25`), name (`"John"`), or active status (`true`).
*   **Reference:** Storing a list of products (`[{id:1, name:"Phone"}, ...]`).

**Interviewer Intentions:**
*   Value vs Reference understanding (Crucial for bug fixing).
*   Knowledge of newer types like `Symbol` and `BigInt`.

---

### 5. Operators?
**Detailed Answer:**
Symbols used to perform operations on operands.

**Types:**
1.  **Arithmetic:** `+`, `-`, `*`, `/`, `%` (Modulus), `**` (Exponentiation).
2.  **Assignment:** `=`, `+=`, `-=`.
3.  **Comparison:** `==` (Loose equality, type conversion), `===` (Strict equality, no type conversion), `!=`, `!==`, `>`, `<`.
4.  **Logical:** `&&` (AND), `||` (OR), `!` (NOT).
5.  **Ternary:** `condition ? trueVal : falseVal`.
6.  **Type:** `typeof`, `instanceof`.

**Syntax & Complete Flow:**

```javascript
// 1. Coercion (Loose vs Strict)
console.log(5 == "5");  // true (String "5" converted to Number 5)
console.log(5 === "5"); // false (Different types)

// 2. Short-circuiting
let user = null;
let name = user || "Guest"; // "Guest" (because user is falsy)
console.log(name);

let isAdmin = true;
isAdmin && console.log("Access Granted"); // Executes because isAdmin is true

// 3. Ternary
let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
```

**Real-time Example:**
*   **Logical OR (`||`):** Setting default values in function arguments or settings.
*   **Ternary:** Conditionally rendering a "Login" or "Logout" button in React. `isLoggedIn ? <Logout /> : <Login />`.

**Interviewer Intentions:**
*   Implicit type coercion pitfalls (`==` vs `===`).
*   Short-circuit logic usage.

---

### 6. Control flow and conditional statements
**Detailed Answer:**
Controls the order in which the computer executes statements.

**Types:**
*   **if...else:** Basic branching.
*   **switch:** Multiple branches based on a single value.
*   **Loops:** `for` (known iterations), `while` (unknown iterations), `do...while` (run at least once).

**Syntax & Complete Flow:**

```javascript
// Scenario: Grading System

function getGrade(score) {
  // 1. If-Else for ranges
  if (score >= 90) return 'A';
  else if (score >= 80) return 'B';
  else return 'C';
}

// 2. Switch for specific values
function getRoleAction(role) {
  switch (role) {
    case 'ADMIN':
      return 'Full Access';
    case 'EDITOR':
      return 'Edit Access';
    case 'VIEWER':
      return 'Read Only';
    default:
      return 'No Access';
  }
}

// 3. For Loop
const items = ['Apple', 'Banana', 'Cherry'];
for (let i = 0; i < items.length; i++) {
  console.log(`Item ${i}: ${items[i]}`);
}
```

**Real-time Example:**
*   **Switch:** Handling Redux action types in a reducer (`case 'LOGIN_SUCCESS': ...`).
*   **If-Else:** Form validation (if email is empty, show error).

**Interviewer Intentions:**
*   Logic building.
*   Knowing when to use `switch` (cleaner for many specific values) vs `if-else` (ranges/complex conditions).

---

### 7. Scopes
**Detailed Answer:**
Scope is the context in which variables are declared and accessed.

**Types:**
1.  **Global Scope:** Accessible everywhere.
2.  **Function Scope:** Accessible only inside the function (var).
3.  **Block Scope:** Accessible only inside the block `{}` (let, const).
4.  **Lexical Scope:** A function can access variables from its parent scope.

**Syntax & Complete Flow:**

```javascript
let globalVar = "Global";

function outer() {
  let outerVar = "Outer";

  function inner() {
    let innerVar = "Inner";
    // Lexical Scope: Inner can access Outer and Global
    console.log(innerVar); // "Inner"
    console.log(outerVar); // "Outer"
    console.log(globalVar); // "Global"
  }

  inner();
  // console.log(innerVar); // Error: innerVar is not defined
}

outer();
```

**Real-time Example:**
**Module Pattern:** Variables defined in a module file are scoped to that module (file scope) and not leaked globally unless exported. This prevents naming conflicts.

**Interviewer Intentions:**
*   Understanding variable visibility.
*   Debugging "undefined" errors.

---

### 8. What is function? Different types of functions?
**Detailed Answer:**
A function is a reusable block of code.

**Types:**
1.  **Function Declaration:** Hoisted. `function name() {}`
2.  **Function Expression:** Not hoisted. `const name = function() {}`
3.  **Arrow Function (ES6):** Concise, lexical `this`. `const name = () => {}`
4.  **IIFE (Immediately Invoked Function Expression):** Runs as soon as defined. `(function(){})()`
5.  **Anonymous Function:** Function without a name (used as callbacks).

**Syntax & Complete Flow:**

```javascript
// 1. Declaration (Can call before defining)
console.log(add(2, 3)); // 5
function add(a, b) {
  return a + b;
}

// 2. Arrow Function (Implicit return for one-liners)
const multiply = (a, b) => a * b;

// 3. Arrow Function 'this' context
const obj = {
  name: "Test",
  regularFunc: function() { console.log(this.name); }, // "Test"
  arrowFunc: () => { console.log(this.name); } // undefined (inherits from global/window)
};

obj.regularFunc();
obj.arrowFunc();
```

**Real-time Example:**
*   **Arrow Functions:** Heavily used in React components and array methods (`map`, `filter`).
*   **IIFE:** Used in older JS to create private scope before modules existed.

**Interviewer Intentions:**
*   Arrow function vs Regular function (`this` binding).
*   Hoisting differences.

---

### 9. What is Hoisting? Variable and functional hoisting?
**Detailed Answer:**
Hoisting is the default behavior of moving declarations to the top of the scope during the compilation phase.

**Behavior:**
*   **Function Declarations:** Fully hoisted. Can be called before definition.
*   **var:** Hoisted and initialized with `undefined`.
*   **let/const:** Hoisted but **uninitialized**. Accessing them before declaration causes a `ReferenceError` (Temporal Dead Zone).

**Syntax & Complete Flow:**

```javascript
// 1. Function Hoisting
sayHello(); // Works! "Hello"
function sayHello() {
  console.log("Hello");
}

// 2. Var Hoisting
console.log(myVar); // undefined (No error, but no value)
var myVar = 10;

// 3. Let/Const Hoisting (TDZ)
try {
  console.log(myLet); // ReferenceError
} catch (e) {
  console.log(e.message);
}
let myLet = 20;
```

**Real-time Example:**
It explains why you might see `undefined` instead of an error in legacy code, or why you can organize code with helper functions at the bottom of the file but call them at the top.

**Interviewer Intentions:**
*   Deep understanding of JS execution context.
*   Why `let`/`const` are safer.

---

### 10. What is Closure? Use case of closure? Can closures cause memory leaks? Why/why not?
**Detailed Answer:**
**Definition:** A closure is a function that remembers its **lexical scope** even when the function is executed outside that scope. It gives you access to an outer function’s scope from an inner function.

**Use Cases:**
1.  **Data Privacy / Encapsulation:** Emulating private methods.
2.  **Function Factories:** Creating functions with preset configurations.
3.  **Memoization:** Caching results.

**Can it cause Memory Leaks?**
**Yes.** If a closure holds a reference to a large object (like a DOM node or large array) in its outer scope, and that closure is kept alive (e.g., attached to a global event listener), the garbage collector cannot free the large object because it's still "referenced" by the closure.

**Syntax & Complete Flow:**

```javascript
// Use Case: Data Privacy (Counter)
function createCounter() {
  let count = 0; // Private variable

  return {
    increment: function() {
      count++;
      console.log(`Count: ${count}`);
    },
    decrement: function() {
      count--;
      console.log(`Count: ${count}`);
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
counter.increment(); // Count: 1
counter.increment(); // Count: 2
// console.log(counter.count); // undefined (Cannot access directly)

// Memory Leak Example
function attachHandler() {
  const hugeData = new Array(1000000).fill('X'); // Large memory
  const btn = document.getElementById('btn');

  btn.addEventListener('click', function() {
    // This closure captures 'hugeData'
    console.log(hugeData[0]);
  });
}
// Even after attachHandler finishes, 'hugeData' stays in memory
// because the event listener (which is alive) needs it.
```

**Real-time Example:**
**Redux connect / React Hooks:** `useState` relies on closures to remember the state between renders.

**Interviewer Intentions:**
*   Advanced scope knowledge.
*   Ability to write private variables without classes.
*   Performance awareness (Memory leaks).

---

### 11. What are Generator Functions?
**Detailed Answer:**
Regular functions return only one, single value (or nothing). Generators can return ("yield") multiple values, one after another, on-demand. They work as an iterator.
*   **Syntax:** `function*`
*   **Keyword:** `yield` pauses execution. `next()` resumes it.

**Syntax & Complete Flow:**

```javascript
// 1. Define Generator
function* idGenerator() {
  let id = 1;
  while (true) { // Infinite loop, but safe because it pauses!
    yield id++;
  }
}

// 2. Usage
const gen = idGenerator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }

// 3. Real-world: Async Flow (Redux Saga style)
function* fetchData() {
  yield "Loading...";
  // Simulate API call
  yield "Data Fetched";
}

const dataFlow = fetchData();
console.log(dataFlow.next().value); // "Loading..."
console.log(dataFlow.next().value); // "Data Fetched"
```

**Real-time Example:**
**Redux Saga:** It uses generators to handle side effects (API calls) in a synchronous-looking way. It can pause the API call effect until it's finished.

**Interviewer Intentions:**
*   Understanding of iterators.
*   How to handle infinite streams of data.

---

### 12. Event Propagation: Bubbling, Capturing, Delegation?
**Detailed Answer:**
When you click an element, the event doesn't just happen there. It travels.
1.  **Capturing Phase:** Event goes down from Window -> Document -> Parent -> Target.
2.  **Target Phase:** Event reaches the target element.
3.  **Bubbling Phase:** Event bubbles up from Target -> Parent -> Document -> Window.

**Event Delegation:** Instead of adding listeners to specific nodes, you add one listener to a parent. It relies on bubbling.

**Syntax & Complete Flow:**

```html
<div id="parent" style="padding: 20px; background: grey;">
  Parent
  <button id="child">Child</button>
</div>

<script>
  const parent = document.getElementById('parent');
  const child = document.getElementById('child');

  // 1. Bubbling (Default - false)
  parent.addEventListener('click', () => console.log("Parent Clicked (Bubble)"));
  child.addEventListener('click', () => console.log("Child Clicked (Bubble)"));
  // Click Child -> Output: "Child Clicked", "Parent Clicked"

  // 2. Capturing (true)
  parent.addEventListener('click', () => console.log("Parent Clicked (Capture)"), true);
  // Click Child -> Output: "Parent Clicked (Capture)", "Child Clicked (Bubble)", "Parent Clicked (Bubble)"

  // 3. Delegation (Practical Example)
  // Instead of attaching to every list item, attach to UL
  document.querySelector('ul').addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
      console.log("List item clicked:", e.target.innerText);
    }
  });
</script>
```

**Real-time Example:**
**Data Tables:** If you have a table with 1000 rows and a "Delete" button in each, don't add 1000 listeners. Add 1 listener to the `<table>` and check `e.target.className === 'delete-btn'`. This saves memory.

**Interviewer Intentions:**
*   DOM event flow knowledge.
*   Performance optimization (Delegation).

---

### 13. What are ES6 features?
**Detailed Answer:**
ES6 (ECMAScript 2015) was a major update to JS.
**Key Features:**
1.  **Let/Const:** Block scoping.
2.  **Arrow Functions:** Concise syntax, lexical `this`.
3.  **Template Literals:** String interpolation.
4.  **Destructuring:** Unpacking arrays/objects.
5.  **Default Parameters:** `func(a=1)`.
6.  **Rest/Spread Operator:** `...`.
7.  **Classes:** Syntactic sugar for prototypes.
8.  **Modules:** `import` / `export`.
9.  **Promises:** Async handling.

**Syntax & Complete Flow:**

```javascript
// 1. Template Literals & Default Params
const greet = (name = "User") => `Hello, ${name}!`;
console.log(greet()); // "Hello, User!"

// 2. Destructuring
const user = { id: 1, info: { age: 25 } };
const { info: { age } } = user;
console.log(age); // 25

// 3. Spread
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

// 4. Classes
class Person {
  constructor(name) { this.name = name; }
  sayHi() { console.log(this.name); }
}
```

**Real-time Example:**
Modern React development is almost entirely ES6+. You import components (Modules), pass props (Destructuring), and manage state (Classes/Arrow functions).

**Interviewer Intentions:**
*   Are you up to date with the language?
*   Can you write clean, modern code?

---

### 14. What is Promise? Handling? Methods?
**Detailed Answer:**
A Promise is an object representing the eventual completion or failure of an asynchronous operation.
**States:**
1.  **Pending:** Initial state.
2.  **Fulfilled:** Operation completed successfully (`resolve`).
3.  **Rejected:** Operation failed (`reject`).

**Methods:**
*   `Promise.all([p1, p2])`: Waits for all to resolve. Fails if one fails.
*   `Promise.race([p1, p2])`: Returns result of first one to settle.
*   `Promise.allSettled([p1, p2])`: Waits for all to finish (success or fail).

**Syntax & Complete Flow:**

```javascript
// 1. Creating a Promise
function checkAvailability(item) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (item === "Laptop") resolve("Available");
      else reject("Out of Stock");
    }, 1000);
  });
}

// 2. Handling (then/catch)
checkAvailability("Laptop")
  .then(res => console.log("Success:", res))
  .catch(err => console.error("Error:", err))
  .finally(() => console.log("Check complete"));

// 3. Promise.all
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);

Promise.all([p1, p2]).then(values => {
  console.log(values); // [10, 20]
});
```

**Real-time Example:**
**Dashboard Loading:** You need to fetch User Profile, Notifications, and Settings. Use `Promise.all([fetchProfile, fetchNotifs, fetchSettings])` to load them in parallel and show the UI only when all are ready.

**Interviewer Intentions:**
*   Async logic handling.
*   Error handling.
*   Parallel execution (`Promise.all`).

---

### 15. What is Destructuring?
**Detailed Answer:**
A syntax to unpack values from arrays, or properties from objects, into distinct variables.

**Syntax & Complete Flow:**

```javascript
// 1. Object Destructuring
const product = {
  id: 101,
  title: "Phone",
  price: 500,
  details: { color: "Black" }
};

// Renaming variables and Default values
const { title: productName, stock = 0, details: { color } } = product;

console.log(productName); // "Phone"
console.log(stock); // 0 (Default used)
console.log(color); // "Black"

// 2. Array Destructuring
const colors = ["Red", "Green", "Blue"];
const [first, , third] = colors; // Skip second
console.log(first, third); // "Red", "Blue"

// 3. Swapping variables
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1
```

**Real-time Example:**
**React Props:**
Instead of `props.name`, `props.age`, you do:
`const UserCard = ({ name, age }) => { ... }`

**Interviewer Intentions:**
*   Code readability.
*   Handling nested data structures.

---

### 16. How to clone an object?
**Detailed Answer:**
Objects are reference types. Copying them with `=` only copies the reference. To create a real copy, you need to clone.

**Methods:**
1.  **Shallow Copy:** Copies top-level properties. Nested objects are still references.
    *   `Object.assign({}, obj)`
    *   Spread `...obj`
2.  **Deep Copy:** Copies everything recursively.
    *   `JSON.parse(JSON.stringify(obj))` (Fails with Functions/Dates/Undefined).
    *   `structuredClone(obj)` (Modern Browser Native).
    *   Lodash `_.cloneDeep(obj)`.

**Syntax & Complete Flow:**

```javascript
const original = {
  name: "Alice",
  meta: { age: 25 }
};

// 1. Shallow Copy
const shallow = { ...original };
shallow.name = "Bob"; // Original name stays "Alice"
shallow.meta.age = 30; // Original meta.age BECOMES 30! (Shared reference)

// 2. Deep Copy
const deep = JSON.parse(JSON.stringify(original));
deep.meta.age = 40; // Original meta.age stays 30.
```

**Real-time Example:**
**Redux Reducers:** You MUST clone the state before modifying it because Redux expects immutable updates.
`return { ...state, user: { ...state.user, name: 'New' } }`

**Interviewer Intentions:**
*   Immutability.
*   Reference vs Value pitfalls.

---

### 17. Diff between Shallow Copy and Deep Copy?
**Detailed Answer:**
*   **Shallow Copy:** Creates a new object, but inserts references into it. If the original object has nested objects, the copy points to the *same* nested objects. Fast.
*   **Deep Copy:** Creates a new object and recursively creates copies of all nested objects. The two objects are completely independent. Slower.

**Syntax & Complete Flow:**
(See example in Q16).

**Interviewer Intentions:**
*   Do you know when to use which? (Use shallow for flat data, deep for nested state).

---

### 18. Diff between Spread and Rest operator?
**Detailed Answer:**
Both use `...` syntax but do opposite things.
*   **Spread (`...`):** EXPANDS an iterable (array/string) into individual elements. Used in function calls, array literals.
*   **Rest (`...`):** COLLECTS multiple elements into a single array. Used in function parameters.

**Syntax & Complete Flow:**

```javascript
// 1. Spread (Unpacking)
const nums = [10, 20];
const max = Math.max(...nums); // Becomes Math.max(10, 20)
console.log(max); // 20

const combined = [...nums, 30]; // [10, 20, 30]

// 2. Rest (Packing)
function sum(...args) { // args is [1, 2, 3, 4]
  return args.reduce((a, b) => a + b);
}
console.log(sum(1, 2, 3, 4)); // 10

// 3. Rest in Destructuring
const { id, ...others } = { id: 1, name: "A", age: 20 };
console.log(others); // { name: "A", age: 20 }
```

**Real-time Example:**
*   **Spread:** Merging two config objects. `const finalConfig = { ...defaultConfig, ...userConfig };`
*   **Rest:** Creating a wrapper component that passes all extra props to the child. `<Child {...restProps} />`

**Interviewer Intentions:**
*   Contextual understanding of syntax.

---

### 19. Array methods?
**Detailed Answer:**
JavaScript arrays have powerful built-in methods.
*   **Mutating (Change Original):** `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`.
*   **Non-Mutating (Return New):** `map`, `filter`, `reduce`, `slice`, `concat`, `find`, `some`, `every`.

**Syntax & Complete Flow:**

```javascript
const arr = [1, 2, 3, 4, 5];

// 1. find (Returns element)
const found = arr.find(num => num > 3); // 4

// 2. some (Returns boolean)
const hasEven = arr.some(num => num % 2 === 0); // true

// 3. every (Returns boolean)
const allPositive = arr.every(num => num > 0); // true

// 4. includes
console.log(arr.includes(3)); // true
```

**Real-time Example:**
**Search Feature:** `products.filter(p => p.name.includes(searchTerm))`

**Interviewer Intentions:**
*   Knowledge of standard library.
*   Functional programming style (using `find`/`filter` instead of `for` loops).

---

### 20. Diff between map, filter, reduce, forEach, splice, slice?
**Detailed Answer:**
*   **map:** Transforms each element. Returns new array of same length.
*   **filter:** Selects elements based on condition. Returns new array (subset).
*   **reduce:** Accumulates array into a single value (number, object, etc.).
*   **forEach:** Iterates. Returns `undefined`. Used for side effects.
*   **slice:** Returns a sub-array. Immutable.
*   **splice:** Adds/Removes items. Mutable (Changes original).

**Syntax & Complete Flow:**

```javascript
const data = [1, 2, 3, 4];

// 1. map
const doubled = data.map(x => x * 2); // [2, 4, 6, 8]

// 2. filter
const evens = data.filter(x => x % 2 === 0); // [2, 4]

// 3. reduce
const sum = data.reduce((acc, curr) => acc + curr, 0); // 10

// 4. splice vs slice
const sliced = data.slice(0, 2); // [1, 2] (Original intact)

data.splice(0, 1); // Removes 1 element at index 0
console.log(data); // [2, 3, 4] (Original changed)
```

**Real-time Example:**
*   **Reduce:** Converting an array of items `[{id:1, val:10}, {id:2, val:20}]` into an object map `{1: 10, 2: 20}` for faster lookup.
*   **Map:** Rendering a list of `<li>` elements in React.

**Interviewer Intentions:**
*   Functional programming concepts.
*   Immutability (React prefers `map`/`filter` over `splice`).

---

### 21. Object methods?
**Detailed Answer:**
Built-in methods to manipulate objects.
*   `Object.keys(obj)`: Returns array of keys.
*   `Object.values(obj)`: Returns array of values.
*   `Object.entries(obj)`: Returns array of `[key, value]` pairs.
*   `Object.assign(target, source)`: Copies properties.
*   `Object.fromEntries(iterable)`: Converts `[key, value]` pairs back to object.

**Syntax & Complete Flow:**

```javascript
const user = { name: "Alice", age: 25, role: "Admin" };

// 1. Iterating over object
const entries = Object.entries(user);
// [['name', 'Alice'], ['age', 25], ['role', 'Admin']]

entries.forEach(([key, val]) => {
  console.log(`${key}: ${val}`);
});

// 2. Converting back to object
const newObj = Object.fromEntries(entries);
console.log(newObj); // { name: "Alice", ... }
```

**Real-time Example:**
**Dynamic Form Rendering:** You have an object of settings `{ theme: 'dark', notifs: true }`. You use `Object.keys()` to map over it and create a form input for each setting.

**Interviewer Intentions:**
*   Data structure manipulation.

---

### 22. Diff between freeze and seal?
**Detailed Answer:**
*   **Object.freeze():** Makes object **completely immutable**. Cannot add, delete, or update properties.
*   **Object.seal():** Prevents adding/deleting properties, but **allows updating** existing properties.

**Syntax & Complete Flow:**

```javascript
// 1. Freeze
const frozen = Object.freeze({ x: 10 });
frozen.x = 20; // Fails silently (or throws in strict mode)
console.log(frozen.x); // 10

// 2. Seal
const sealed = Object.seal({ x: 10 });
sealed.x = 20; // Works!
sealed.y = 30; // Fails (Cannot add)
delete sealed.x; // Fails (Cannot delete)
console.log(sealed.x); // 20
```

**Real-time Example:**
*   **Freeze:** Redux state (should never change directly).
*   **Seal:** An object representing a fixed database record where you can edit values but not schema.

**Interviewer Intentions:**
*   Controlling mutability.

---

### 23. String methods?
**Detailed Answer:**
Methods to manipulate text.
*   `includes`, `startsWith`, `endsWith`: Boolean checks.
*   `slice`, `substring`: Extract parts.
*   `split`: Convert to array.
*   `trim`: Remove whitespace.
*   `replace`, `replaceAll`: Substitute text.

**Syntax & Complete Flow:**

```javascript
const str = "  Hello World  ";

// 1. Cleaning input
const clean = str.trim().toLowerCase(); // "hello world"

// 2. Extracting
const firstWord = clean.slice(0, 5); // "hello"

// 3. Replacing
const newStr = clean.replace("world", "JavaScript"); // "hello JavaScript"

// 4. Splitting (CSV parsing)
const csv = "apple,banana,cherry";
const fruits = csv.split(","); // ["apple", "banana", "cherry"]
```

**Real-time Example:**
**Search Filter:** `user.name.toLowerCase().includes(searchTerm.toLowerCase())` ensures case-insensitive search.

**Interviewer Intentions:**
*   Basic data manipulation.

---

### 24. Number and Math
**Detailed Answer:**
*   **Number:** `parseInt`, `parseFloat`, `toFixed` (formatting).
*   **Math:** `max`, `min`, `random`, `floor`, `ceil`, `round`.

**Syntax & Complete Flow:**

```javascript
// 1. Formatting Currency
const price = 10.5678;
console.log(price.toFixed(2)); // "10.57" (Returns String)

// 2. Random Integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandomInt(1, 10));

// 3. Parsing
console.log(Number.parseInt("100px")); // 100
```

**Real-time Example:**
**Pagination:** `Math.ceil(totalItems / itemsPerPage)` to calculate total pages.

**Interviewer Intentions:**
*   Handling numerical data.

---

### 25. What is Callback Hell?
**Detailed Answer:**
Also known as the "Pyramid of Doom". It happens when you nest multiple callbacks inside each other to handle sequential asynchronous operations. It makes code unreadable and hard to debug.

**Syntax & Complete Flow:**

```javascript
// BAD: Callback Hell
getUser(userId, (user) => {
  getPosts(user.id, (posts) => {
    getComments(posts[0].id, (comments) => {
      console.log(comments);
    });
  });
});

// GOOD: Promises (Flat chain)
getUser(userId)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err => console.error(err));
```

**Real-time Example:**
Legacy Node.js code often looks like this. Modern code uses Async/Await to flatten it further.

**Interviewer Intentions:**
*   Why Promises were invented.

---

### 26. What is Promise Chaining?
**Detailed Answer:**
The pattern of executing a sequence of asynchronous tasks one after another. Each `.then()` returns a new Promise, which resolves to the return value of the callback.

**Syntax & Complete Flow:**

```javascript
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

wait(1000)
  .then(() => {
    console.log("1 second passed");
    return 5; // Passes 5 to next .then
  })
  .then((num) => {
    console.log(`Received ${num}, waiting 2 seconds...`);
    return wait(2000).then(() => num * 2); // Returning a Promise
  })
  .then((result) => {
    console.log(`Final result: ${result}`); // 10
  });
```

**Real-time Example:**
**Auth Flow:** `login()` -> returns token -> `fetchUser(token)` -> returns user -> `redirect(user.role)`.

**Interviewer Intentions:**
*   Sequential async logic.

---

### 27. What is Async/Await and how does it simplify asynchronous code?
**Detailed Answer:**
`async/await` is syntactic sugar built on top of Promises.
*   `async` function always returns a Promise.
*   `await` pauses the execution of the function until the Promise resolves.
It makes async code look and behave like synchronous code (try/catch works!).

**Syntax & Complete Flow:**

```javascript
// 1. The Async Function
async function fetchUserData(id) {
  try {
    console.log("Fetching...");
    const response = await fetch(`https://api.example.com/users/${id}`);

    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();
    console.log("User:", data);
    return data;
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    console.log("Done");
  }
}

// 2. Usage
fetchUserData(1);
```

**Real-time Example:**
Almost all modern API interaction in React components uses `useEffect` with an `async` function inside.

**Interviewer Intentions:**
*   Modern async patterns.
*   Error handling (`try/catch`).

---

### 28. Difference between named export and default export.
**Detailed Answer:**
ES6 Modules allow exporting code.
*   **Named Export:** Multiple per file. Must be imported with `{ }` using exact name.
*   **Default Export:** One per file. Can be imported with any name.

**Syntax & Complete Flow:**

```javascript
// file: utils.js
export const add = (a, b) => a + b; // Named
export const sub = (a, b) => a - b; // Named
const log = (msg) => console.log(msg);
export default log; // Default

// file: main.js
import logger, { add, sub } from './utils.js';

logger("Start"); // Calls log
console.log(add(1, 2));
```

**Real-time Example:**
*   **React:** `import React, { useState } from 'react';` (`React` is default, `useState` is named).

**Interviewer Intentions:**
*   Module system knowledge.

---

### 29. What is optional chaining (?.)?
**Detailed Answer:**
A safe way to access nested object properties. If a property is `null` or `undefined`, it stops and returns `undefined` instead of throwing an error.

**Syntax & Complete Flow:**

```javascript
const user = {
  profile: {
    // address is missing
  }
};

// Without Optional Chaining
// const city = user.profile.address.city; // Uncaught TypeError

// With Optional Chaining
const city = user.profile?.address?.city;
console.log(city); // undefined (No crash)

// Works with methods too
const func = user.someMethod?.();
```

**Real-time Example:**
Handling API responses where some fields are optional. e.g., `user.preferences?.theme`.

**Interviewer Intentions:**
*   Defensive programming.

---

### 30. How does setTimeout and setInterval work internally?
**Detailed Answer:**
They are **Web APIs**, not part of the JS engine.
1.  Call `setTimeout(cb, 1000)`.
2.  Browser starts a timer.
3.  JS continues executing.
4.  After 1000ms, the timer finishes, and `cb` is pushed to the **Callback Queue**.
5.  Event Loop pushes `cb` to Stack when Stack is empty.
*Note: The time is "minimum delay", not exact time.*

**Syntax & Complete Flow:**

```javascript
console.log("Start");

// SetInterval: Runs repeatedly
const intervalId = setInterval(() => {
  console.log("Tick");
}, 1000);

// Stop it after 3 seconds
setTimeout(() => {
  clearInterval(intervalId);
  console.log("Stopped");
}, 3500);

console.log("End");
```

**Real-time Example:**
**Polling:** Checking for new notifications every 30 seconds using `setInterval`.

**Interviewer Intentions:**
*   Event Loop mechanics.
*   Memory management (clearing intervals).

---

### 31. What are Web APIs in the browser?
**Detailed Answer:**
Web APIs are functionalities provided by the browser (not the JS engine itself) that allow you to do things like manipulate the DOM, make network requests, or use timers.
*   **DOM API:** `document.getElementById`
*   **Fetch API:** `fetch()`
*   **Storage API:** `localStorage`, `sessionStorage`
*   **Geolocation API:** `navigator.geolocation`
*   **Timer API:** `setTimeout`

**Syntax & Complete Flow:**

```javascript
// Using Geolocation API
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log("Lat:", position.coords.latitude);
    console.log("Lng:", position.coords.longitude);
  });
} else {
  console.log("Geolocation not available");
}
```

**Real-time Example:**
**Google Maps:** Uses Geolocation API to show your current location on the map.

**Interviewer Intentions:**
*   Distinguishing between JS language features (Array, Object) and Browser features (Window, Document).

---

### 32. What is CORS?
**Detailed Answer:**
**CORS (Cross-Origin Resource Sharing)** is a security feature implemented by browsers. It blocks web pages from making requests to a different domain than the one that served the web page, unless the server explicitly allows it.
*   **Origin:** Protocol + Domain + Port (e.g., `http://localhost:3000`).
*   **Mechanism:** Browser sends an `OPTIONS` preflight request. Server must respond with headers like `Access-Control-Allow-Origin`.

**Syntax & Complete Flow:**

```javascript
// Client-side (React running on localhost:3000)
fetch('http://api.example.com/data') // Fails if CORS not enabled on server
  .then(res => res.json())
  .catch(err => console.error("CORS Error:", err));

// Server-side (Node.js/Express)
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all origins

app.get('/data', (req, res) => {
  res.json({ msg: "This works!" });
});
```

**Real-time Example:**
Your React frontend is on `vercel.app`, but your backend is on `heroku.com`. You must enable CORS on Heroku to allow Vercel to fetch data.

**Interviewer Intentions:**
*   Web security.
*   Debugging common network errors.

---

### 33. What is Debouncing and Throttling?
**Detailed Answer:**
Techniques to control how many times a function is executed over time.
*   **Debouncing:** "Wait for the user to stop." Delays execution until X ms have passed since the last event.
*   **Throttling:** "Execute at most once every X ms." Ensures execution happens regularly but not too often.

**Syntax & Complete Flow:**

```javascript
// 1. Debounce Implementation
function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer); // Clear previous timer
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Usage: Search Bar
const handleSearch = debounce((query) => {
  console.log("Searching API for:", query);
}, 500);
// User types 'A', 'p', 'p', 'l', 'e' quickly.
// API called ONLY once after 'e' is typed and 500ms passes.


// 2. Throttle Implementation
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage: Infinite Scroll
const handleScroll = throttle(() => {
  console.log("Checking scroll position...");
}, 1000);
// User scrolls continuously. Function runs only once every second.
```

**Real-time Example:**
*   **Debounce:** Auto-save feature in a text editor.
*   **Throttle:** Resizing the window (re-calculating layout).

**Interviewer Intentions:**
*   Performance optimization.
*   Ability to implement these utilities from scratch.

---

### 34. Explain the difference between localStorage, sessionStorage, and cookies.
**Detailed Answer:**
All are client-side storage mechanisms.

| Feature | localStorage | sessionStorage | Cookies |
| :--- | :--- | :--- | :--- |
| **Capacity** | ~5-10MB | ~5MB | ~4KB |
| **Expiration** | Never (Manual clear) | On Tab Close | Set manually |
| **Scope** | Browser/Domain | Tab/Window | Domain |
| **Server Access** | No | No | Sent with every HTTP request |

**Syntax & Complete Flow:**

```javascript
// 1. LocalStorage (Theme)
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');

// 2. SessionStorage (Form Wizard)
sessionStorage.setItem('step1_data', JSON.stringify({ name: 'John' }));

// 3. Cookies (Auth Token)
document.cookie = "token=xyz123; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
```

**Real-time Example:**
*   **Cookies:** Storing JWT (JSON Web Token) for authentication (HttpOnly cookies are best for security).
*   **LocalStorage:** "Remember Me" preference.

**Interviewer Intentions:**
*   Storage limits and persistence.
*   Security (Cookies vs LocalStorage for tokens).

---

### 35. What is DOM and BOM?
**Detailed Answer:**
*   **DOM (Document Object Model):** The tree structure of the HTML page. Allows JS to change content, style, and structure. (`document` object).
*   **BOM (Browser Object Model):** The browser environment itself. Allows JS to interact with the browser window. (`window` object).

**Syntax & Complete Flow:**

```javascript
// DOM
document.body.style.backgroundColor = "lightblue";
const div = document.createElement('div');
div.innerText = "Added via DOM";
document.body.appendChild(div);

// BOM
console.log(window.innerHeight); // Screen height
window.history.back(); // Go back
// window.location.href = "https://google.com"; // Redirect
```

**Real-time Example:**
*   **DOM:** React uses the Virtual DOM to efficiently update the real DOM.
*   **BOM:** Detecting if the user is on Mobile (`navigator.userAgent`).

**Interviewer Intentions:**
*   Browser architecture.

---

### 36. Difference between innerText, textContent, and innerHTML.
**Detailed Answer:**
*   **innerText:** Returns the **visible** text. Respects CSS (e.g., won't show `display: none` text). Triggers reflow (slower).
*   **textContent:** Returns **all** text, including hidden ones. Faster.
*   **innerHTML:** Returns the HTML markup (tags and text). **Security Risk:** Prone to XSS (Cross-Site Scripting).

**Syntax & Complete Flow:**

```html
<div id="demo">
  Hello <span style="display:none">Hidden</span>
</div>

<script>
  const el = document.getElementById('demo');
  console.log(el.innerText);   // "Hello"
  console.log(el.textContent); // "Hello Hidden" (with whitespace)
  console.log(el.innerHTML);   // "Hello <span style="display:none">Hidden</span>"
</script>
```

**Real-time Example:**
Never use `innerHTML` with user input (e.g., a comment section) because a user could type `<script>stealCookies()</script>`.

**Interviewer Intentions:**
*   DOM manipulation nuances.
*   Security awareness (XSS).

---

### 37. what is this keyword? How does this keyword work in different contexts
**Detailed Answer:**
`this` refers to the object that is **executing** the current function. Its value depends on *how* the function is called.
1.  **Global Context:** `window` (or `{}` in Node).
2.  **Object Method:** The object itself.
3.  **Function (Strict Mode):** `undefined`.
4.  **Arrow Function:** Lexical scope (inherits from parent).
5.  **Event Listener:** The element that received the event.

**Syntax & Complete Flow:**

```javascript
const user = {
  name: "Alice",
  sayHi() {
    console.log(this.name); // "Alice" (Called by user)
  },
  waitAndSayHi() {
    setTimeout(function() {
      console.log(this.name); // undefined (Called by window/timer)
    }, 100);
  },
  waitAndSayHiFixed() {
    setTimeout(() => {
      console.log(this.name); // "Alice" (Arrow func inherits 'this' from user)
    }, 100);
  }
};

user.sayHi();
user.waitAndSayHi();
user.waitAndSayHiFixed();
```

**Real-time Example:**
In React Class Components, you had to do `this.handleClick = this.handleClick.bind(this)` so that `this` inside the handler referred to the Component instance, not `undefined`.

**Interviewer Intentions:**
*   The most common JS interview question. Understanding context binding.

---

### 38. What is the difference between call, apply, and bind?
**Detailed Answer:**
Methods to explicitly set the value of `this`.
*   **call(thisArg, arg1, arg2):** Invokes function immediately. Arguments passed individually.
*   **apply(thisArg, [args]):** Invokes function immediately. Arguments passed as an array.
*   **bind(thisArg, arg1, arg2):** Returns a **new function** with `this` permanently bound. Does not invoke immediately.

**Syntax & Complete Flow:**

```javascript
const person1 = { name: "John" };
const person2 = { name: "Jane" };

function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

// 1. Call
greet.call(person1, "Hello", "!"); // "Hello, John!"

// 2. Apply
greet.apply(person2, ["Hi", "."]); // "Hi, Jane."

// 3. Bind
const greetJohn = greet.bind(person1);
greetJohn("Hola", "!!"); // "Hola, John!!"
```

**Real-time Example:**
**Method Borrowing:** Using Array methods on array-like objects (like `arguments` or DOM NodeList).
`[].slice.call(arguments)`

**Interviewer Intentions:**
*   Function context manipulation.

---

### 39. Explain prototype and prototypal inheritance.
**Detailed Answer:**
JavaScript is prototype-based. Every object has a hidden property `[[Prototype]]` (accessed via `__proto__`) that links to another object. When you access a property, JS looks at the object, then its prototype, then the prototype's prototype, until null.

**Syntax & Complete Flow:**

```javascript
// Parent
const animal = {
  eats: true,
  walk() { console.log("Animal walking"); }
};

// Child
const rabbit = {
  jumps: true
};

// Inheritance
rabbit.__proto__ = animal;

console.log(rabbit.eats); // true (Found in animal)
rabbit.walk(); // "Animal walking"

// Prototype Chain: rabbit -> animal -> Object.prototype -> null
```

**Real-time Example:**
When you do `arr.map()`, the array `arr` doesn't have the `map` method. It looks up `Array.prototype.map`. This is how all built-in methods work.

**Interviewer Intentions:**
*   Core JS architecture.
*   Classes are just sugar over this system.

---

### 40. what is polyfill?
**Detailed Answer:**
A piece of code (usually JS) used to provide modern functionality on older browsers that do not natively support it.

**Syntax & Complete Flow:**

```javascript
// Scenario: Browser doesn't support Array.prototype.includes

if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement) {
    // Basic implementation
    for (let i = 0; i < this.length; i++) {
      if (this[i] === searchElement) {
        return true;
      }
    }
    return false;
  };
}

const arr = [1, 2, 3];
console.log(arr.includes(2)); // Works now even in IE!
```

**Real-time Example:**
**Babel:** When you compile modern JS, it often adds polyfills (via `core-js`) so your code runs in Internet Explorer or older Safari versions.

**Interviewer Intentions:**
*   Browser compatibility.
*   Ability to implement native methods.

## React

### 1. What is React? Why is it used?
**Detailed Answer:**
React is an open-source JavaScript **library** (not a framework) developed by Facebook for building user interfaces, specifically for single-page applications (SPAs).
*   **Component-Based:** UI is built from small, reusable pieces called components.
*   **Declarative:** You describe *what* the UI should look like for a given state, and React handles *how* to update the DOM.
*   **Virtual DOM:** Optimizes rendering performance.

**Why it is used:**
To build complex, interactive UIs efficiently. It solves the problem of "spaghetti code" in jQuery/Vanilla JS by organizing code into components and managing state predictably.

**Syntax & Complete Flow:**

```javascript
// 1. Import React
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// 2. Create a Component
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello React</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// 3. Render to DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

**Real-time Example:**
**Facebook Feed:** Each post is a `Post` component. The like button is a `LikeButton` component. When you scroll, React efficiently adds new components without reloading the page.

**Interviewer Intentions:**
*   Library vs Framework distinction.
*   Understanding the "Component" mental model.

---

### 2. What are the main features of React?
**Detailed Answer:**
1.  **JSX (JavaScript XML):** Allows writing HTML-like syntax inside JavaScript.
2.  **Virtual DOM:** A lightweight copy of the real DOM. React updates this first, compares it with the previous version (Diffing), and updates only the changed parts in the real DOM (Reconciliation).
3.  **One-way Data Binding:** Data flows down from parent to child via props.
4.  **Components:** Building blocks (Functional and Class).
5.  **Hooks:** Functions to use state and lifecycle features in functional components.

**Syntax & Complete Flow:**

```javascript
// JSX Example
const element = <h1>Hello, world!</h1>;

// One-way Data Flow
function Parent() {
  const name = "John";
  return <Child userName={name} />; // Passing down
}

function Child(props) {
  return <h1>{props.userName}</h1>; // Receiving
  // props.userName = "Doe"; // Error! Props are read-only.
}
```

**Interviewer Intentions:**
*   Knowledge of core architecture.
*   Why React is fast (Virtual DOM).

---

### 3. Difference between functional and class components.
**Detailed Answer:**
*   **Functional Components:** Simple JS functions. Use **Hooks** (`useState`, `useEffect`) for state/lifecycle. Easier to read and test. Recommended for modern React.
*   **Class Components:** ES6 Classes extending `React.Component`. Use `this.state` and lifecycle methods (`componentDidMount`). Verbose.

**Syntax & Complete Flow:**

```javascript
// 1. Functional Component (Modern)
const FunctionalComp = ({ name }) => {
  return <div>Hello {name}</div>;
};

// 2. Class Component (Legacy)
class ClassComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return <div>Hello {this.props.name}</div>;
  }
}
```

**Real-time Example:**
You will see Class components in older codebases (pre-2019). All new features (like Custom Hooks) only work with Functional components.

**Interviewer Intentions:**
*   History of React.
*   Migration knowledge (Class -> Function).

---

### 4. What are props? What is state in React?
**Detailed Answer:**
*   **Props (Properties):** Read-only data passed from a parent component to a child. They act like function arguments.
*   **State:** Internal data managed by the component itself. It can change over time (mutable). When state changes, the component re-renders.

**Syntax & Complete Flow:**

```javascript
// Parent Component
function Shop() {
  // State: Managed here
  const [cartCount, setCartCount] = useState(0);

  return (
    <div>
      {/* Props: Passing data down */}
      <Header count={cartCount} />
      <Product addToCart={() => setCartCount(cartCount + 1)} />
    </div>
  );
}

// Child Receiving Props
function Header(props) {
  return <h1>Cart: {props.count}</h1>;
}
```

**Real-time Example:**
*   **Props:** Passing a `videoUrl` to a `VideoPlayer` component.
*   **State:** `isPlaying` (true/false) inside the `VideoPlayer`.

**Interviewer Intentions:**
*   Data flow fundamentals.

---

### 5. Difference between props and state.
**Detailed Answer:**

| Feature | Props | State |
| :--- | :--- | :--- |
| **Source** | Parent Component | Component Itself |
| **Mutability** | Immutable (Read-only) | Mutable (via `setState`) |
| **Role** | Configuration / Data passing | Internal Management |
| **Re-render** | Yes (if props change) | Yes (if state changes) |

**Syntax & Complete Flow:**
(See example in Q4).

**Interviewer Intentions:**
*   Understanding data ownership.

---

### 6. what is VDOM? Reconciliation process and diffing algorithm?
**Detailed Answer:**
*   **Virtual DOM:** A JavaScript object representation of the DOM.
*   **Diffing Algorithm:** When state/props change, React creates a new VDOM tree. It compares it with the previous VDOM tree to find the exact differences (diffs).
*   **Reconciliation:** The process of updating the Real DOM with these diffs.

**How it works:**
1.  State changes -> New VDOM created.
2.  React compares New VDOM vs Old VDOM.
3.  It sees: `<h1>Old</h1>` changed to `<h1>New</h1>`.
4.  It updates *only* that text node in the Real DOM.

**Real-time Example:**
If you have a list of 1000 items and you change the text of the 5th item:
*   **Vanilla JS:** Might re-render the whole list `<ul>`.
*   **React:** Updates only the 5th `<li>`.

**Interviewer Intentions:**
*   Performance internals.

---

### 7. Difference between controlled and uncontrolled components.
**Detailed Answer:**
*   **Controlled:** Form data is handled by React state. The input value is controlled by React. Single source of truth.
*   **Uncontrolled:** Form data is handled by the DOM itself. Accessed via `useRef`.

**Syntax & Complete Flow:**

```javascript
// 1. Controlled (Recommended)
function ControlledForm() {
  const [val, setVal] = useState("");
  return (
    <input
      value={val}
      onChange={(e) => setVal(e.target.value)}
    />
  );
}

// 2. Uncontrolled
function UncontrolledForm() {
  const inputRef = useRef(null);
  const handleSubmit = () => {
    alert(inputRef.current.value); // Access DOM directly
  };
  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

**Real-time Example:**
*   **Controlled:** Instant validation (e.g., password strength meter).
*   **Uncontrolled:** File upload input (`<input type="file" />`) is usually uncontrolled because you can't set file value programmatically.

**Interviewer Intentions:**
*   Form handling patterns.

---

### 8. What are pure components?
**Detailed Answer:**
A component that renders the same output for the same props and state. It optimizes performance by preventing unnecessary re-renders.
*   **Class:** Extend `React.PureComponent`. Implements `shouldComponentUpdate` with a shallow prop comparison.
*   **Functional:** Wrap in `React.memo()`.

**Syntax & Complete Flow:**

```javascript
// Functional Pure Component
const MyComponent = React.memo(function MyComponent(props) {
  console.log("Rendered");
  return <div>{props.name}</div>;
});

function App() {
  const [count, setCount] = useState(0);
  // MyComponent will NOT re-render when 'count' changes,
  // because its props (name="Fixed") didn't change.
  return (
    <>
      <MyComponent name="Fixed" />
      <button onClick={() => setCount(count + 1)}>Click {count}</button>
    </>
  );
}
```

**Real-time Example:**
A static footer or a list item that doesn't change often.

**Interviewer Intentions:**
*   Performance optimization.

---

### 9. What is state uplifting in React?
**Detailed Answer:**
When two or more components need to share the same state, you move (lift) that state up to their closest common ancestor. The ancestor passes the state down as props.

**Syntax & Complete Flow:**

```javascript
// Parent (Holds the shared state)
function Calculator() {
  const [temp, setTemp] = useState("");

  return (
    <div>
      <Input label="Celsius" val={temp} onChange={setTemp} />
      <Input label="Fahrenheit" val={temp} onChange={setTemp} />
    </div>
  );
}

// Child
function Input({ label, val, onChange }) {
  return (
    <fieldset>
      <legend>{label}</legend>
      <input value={val} onChange={e => onChange(e.target.value)} />
    </fieldset>
  );
}
```

**Real-time Example:**
**Accordion:** You have 3 Accordion Items. Only one can be open at a time. The state `openIndex` must live in the parent `Accordion` component, not inside each `AccordionItem`.

**Interviewer Intentions:**
*   React data flow patterns.

---

### 10. what are hooks in React?
**Detailed Answer:**
Hooks are functions that let you "hook into" React state and lifecycle features from functional components. They were introduced in React 16.8.
**Rules:**
1.  Only call Hooks at the top level (not inside loops/conditions).
2.  Only call Hooks from React functions.

**Common Hooks:**
*   `useState`: State management.
*   `useEffect`: Side effects (API calls, subscriptions).
*   `useContext`: Context API.
*   `useRef`: References.
*   `useReducer`: Complex state.

**Syntax & Complete Flow:**
(See examples in Q1, Q4, Q7).

**Interviewer Intentions:**
*   Modern React knowledge.

---

### 11. What are Custom Hooks?
**Detailed Answer:**
A Custom Hook is a JavaScript function whose name starts with "use" and that may call other Hooks. It allows you to extract component logic into reusable functions.

**Why it is used:**
To share logic (not state itself, but stateful logic) between two JavaScript functions.

**Syntax & Complete Flow:**

```javascript
// 1. Define Custom Hook (useFetch.js)
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

// 2. Use in Component
function UserList() {
  const { data, loading } = useFetch('https://api.example.com/users');

  if (loading) return <p>Loading...</p>;
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

**Real-time Example:**
`useWindowSize`, `useLocalStorage`, `useAuth`.

**Interviewer Intentions:**
*   Code reusability and abstraction.

---

### 12. What is HOC (Higher Order Component)?
**Detailed Answer:**
A pattern where a function takes a component and returns a new component. It is a pure function with zero side-effects.

**Syntax & Complete Flow:**

```javascript
// 1. Define HOC
function withAuth(WrappedComponent) {
  return function(props) {
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) return <p>Please Login</p>;
    return <WrappedComponent {...props} />;
  };
}

// 2. Wrap Component
function Dashboard() {
  return <h1>Secret Dashboard</h1>;
}

const ProtectedDashboard = withAuth(Dashboard);

// 3. Use
<ProtectedDashboard />
```

**Real-time Example:**
`connect(mapStateToProps)(MyComponent)` in Redux. `withRouter(MyComponent)` in React Router v5.

**Interviewer Intentions:**
*   Advanced component patterns (though Hooks often replace HOCs now).

---

### 13. useState vs useReducer?
**Detailed Answer:**
*   **useState:** Best for simple state (numbers, strings, booleans).
*   **useReducer:** Best for complex state logic involving multiple sub-values or when the next state depends on the previous one. It follows the Redux pattern (dispatching actions).

**Syntax & Complete Flow:**

```javascript
// useReducer Example
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

**Real-time Example:**
Managing a complex form state with many fields and validation rules.

**Interviewer Intentions:**
*   State management complexity.

---

### 14. useEffect and Side Effects?
**Detailed Answer:**
`useEffect` lets you perform side effects in functional components.
*   **Side Effects:** Data fetching, subscriptions, manually changing DOM, timers.
*   **Dependency Array:** Controls when the effect runs.
    *   `[]`: Runs once on mount (componentDidMount).
    *   `[prop]`: Runs when `prop` changes (componentDidUpdate).
    *   No array: Runs on every render.
*   **Cleanup Function:** Runs before component unmounts (componentWillUnmount).

**Syntax & Complete Flow:**

```javascript
useEffect(() => {
  // 1. Setup (Mount)
  const timer = setInterval(() => console.log("Tick"), 1000);

  // 2. Cleanup (Unmount)
  return () => {
    clearInterval(timer);
    console.log("Cleaned up");
  };
}, []); // Empty array = Run once
```

**Real-time Example:**
Subscribing to a WebSocket connection on mount, and closing the connection on unmount.

**Interviewer Intentions:**
*   Lifecycle in functional components.

---

### 15. What is Prop Drilling?
**Detailed Answer:**
The process of passing data from a parent component down to a deep child component through intermediate components that do not need the data themselves.

**Problem:** Makes code hard to maintain. If you rename the prop, you have to change it in 5 files.

**Solution:**
1.  **Context API:** For global data.
2.  **Component Composition:** Passing components as children.
3.  **Redux/Zustand:** State management libraries.

**Real-time Example:**
`App` -> `Layout` -> `Header` -> `UserMenu` -> `Avatar`. Passing `userUrl` all the way down.

**Interviewer Intentions:**
*   Identifying architectural smells.

---

### 16. What is Context API?
**Detailed Answer:**
A way to pass data through the component tree without having to pass props down manually at every level.

**Syntax & Complete Flow:**

```javascript
// 1. Create Context
const ThemeContext = React.createContext('light');

// 2. Provide Context
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3. Consume Context (Intermediate component doesn't need props)
function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>I am {theme}</button>;
}
```

**Real-time Example:**
Theming (Dark/Light mode), User Authentication status, Language/Localization.

**Interviewer Intentions:**
*   Global state management without Redux.

---

### 17. How to manage state globally in react js?
**Detailed Answer:**
1.  **Context API:** Built-in. Good for low-frequency updates (Theme, User).
2.  **Redux (Toolkit):** Industry standard. Good for complex apps, frequent updates, and debugging (DevTools).
3.  **Zustand:** Minimalist, no boilerplate.
4.  **Recoil / Jotai:** Atomic state management.
5.  **React Query / SWR:** For Server State (API data).

**Interviewer Intentions:**
*   Knowledge of the ecosystem.

---

### 18. What is the use of key prop ?
**Detailed Answer:**
A special string attribute you need to include when creating lists of elements.
*   **Why:** It helps React identify which items have changed, are added, or are removed.
*   **Performance:** Without keys, React might re-render the whole list instead of just moving the DOM node.
*   **Pitfall:** Do NOT use `index` as key if the list order can change (sorting/filtering/deleting). Use unique IDs.

**Syntax & Complete Flow:**

```javascript
const todos = [{ id: 1, text: "Buy Milk" }, { id: 2, text: "Walk Dog" }];

function TodoList() {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

**Interviewer Intentions:**
*   Reconciliation details.

---

### 19. What is useRef and when to use it?
**Detailed Answer:**
`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument.
*   **Does NOT trigger re-render** when changed.
*   **Use Cases:**
    1.  Accessing DOM elements (focus, scroll).
    2.  Storing mutable variables (like `setInterval` ID) that persist across renders.

**Syntax & Complete Flow:**

```javascript
function FocusInput() {
  const inputRef = useRef(null);

  const onButtonClick = () => {
    // Access the DOM node directly
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

**Interviewer Intentions:**
*   DOM access in React.
*   Difference from `useState`.

---

### 20. How to optimize performance in React applications?
**Detailed Answer:**
1.  **Identify Bottlenecks:** Use React DevTools Profiler.
2.  **Code Splitting:** `React.lazy` and `Suspense` to load chunks on demand.
3.  **Memoization:** `React.memo` (Components), `useMemo` (Values), `useCallback` (Functions).
4.  **Virtualization:** `react-window` for long lists.
5.  **Lazy Loading Images:** `loading="lazy"`.
6.  **Throttling/Debouncing:** For event handlers.

**Interviewer Intentions:**
*   Optimization strategies.

---

### 21. Difference between useMemo and useCallback.
**Detailed Answer:**
Both are memoization hooks used to optimize performance.
*   **useMemo:** Returns a **memoized value**. It only recalculates the value when dependencies change.
*   **useCallback:** Returns a **memoized function**. It returns the same function instance unless dependencies change.

**Syntax & Complete Flow:**

```javascript
import React, { useState, useMemo, useCallback } from 'react';

function Demo({ items }) {
  const [count, setCount] = useState(0);

  // 1. useMemo: Expensive calculation
  const sortedItems = useMemo(() => {
    console.log("Sorting...");
    return items.sort((a, b) => a - b);
  }, [items]); // Only re-sort if 'items' changes

  // 2. useCallback: Stable function reference
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []); // Function stays same across renders

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} list={sortedItems} />
    </div>
  );
}

// Child is wrapped in memo, so it only re-renders if props change.
// Thanks to useCallback, 'onClick' prop doesn't change on parent re-render.
const Child = React.memo(({ onClick, list }) => {
  console.log("Child Rendered");
  return <button onClick={onClick}>Click Child</button>;
});
```

**Interviewer Intentions:**
*   Referential equality.
*   Preventing unnecessary child re-renders.

---

### 22. what is lazy loading?
**Detailed Answer:**
A design pattern where you defer the loading of non-critical resources (like images or components) until they are needed. In React, this usually means splitting the code bundle.

**Syntax & Complete Flow:**

```javascript
import React, { Suspense } from 'react';

// 1. Lazy Import
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <div>
      <h1>My App</h1>
      {/* 2. Wrap in Suspense to show fallback while loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
```

**Real-time Example:**
Loading the "Settings" page code only when the user clicks the Settings icon.

**Interviewer Intentions:**
*   Performance (Initial Load Time).

---

### 23. what is code splitting in react?
**Detailed Answer:**
The process of splitting your large JavaScript bundle (which contains the entire app) into smaller chunks.
*   **Why:** To avoid downloading 10MB of JS just to see the login page.
*   **Tools:** Webpack, Rollup, Vite do this. React provides `React.lazy` to trigger it.

**Syntax & Complete Flow:**
(See Q22).

**Interviewer Intentions:**
*   Bundle optimization.

---

### 24. How does routing work in React?
**Detailed Answer:**
React is a SPA (Single Page App). Routing is handled by JavaScript (Client-Side Routing), not the server.
*   **Library:** `react-router-dom`.
*   **Mechanism:** It listens to the browser's URL changes (History API) and renders different components based on the path, without reloading the page.

**Syntax & Complete Flow:**

```javascript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Interviewer Intentions:**
*   SPA navigation concepts.

---

### 25. What are useNavigate and useParams hooks?
**Detailed Answer:**
Hooks provided by `react-router-dom` v6.
*   **useNavigate:** Programmatically change the URL (e.g., after form submit).
*   **useParams:** Access dynamic parameters from the URL (e.g., `/user/123` -> `123`).

**Syntax & Complete Flow:**

```javascript
import { useNavigate, useParams } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate();
  const { userId } = useParams(); // URL was /user/:userId

  const handleLogout = () => {
    // Perform logout logic...
    navigate('/login'); // Redirect
  };

  return (
    <div>
      <h1>User ID: {userId}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

**Interviewer Intentions:**
*   Routing implementation.

---

### 26. How do you handle forms in React?
**Detailed Answer:**
1.  **Controlled Components:** Standard way. State tracks input value.
2.  **React Hook Form:** Library. Uses uncontrolled components for performance. Less re-renders. Easy validation.

**Syntax & Complete Flow (React Hook Form):**

```javascript
import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Register input */}
      <input {...register("email", { required: true })} />
      {errors.email && <span>Email is required</span>}

      <button type="submit">Login</button>
    </form>
  );
}
```

**Interviewer Intentions:**
*   Practical experience with forms.

---

### 27. How do you handle validation in React forms?
**Detailed Answer:**
*   **Manual:** Check `state` values in `onChange` or `onSubmit`.
*   **Schema Validation (Yup/Zod):** Define a schema and validate data against it. Works great with React Hook Form.

**Syntax & Complete Flow (Zod + React Hook Form):**

```javascript
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 1. Define Schema
const schema = z.object({
  age: z.number().min(18, "Must be 18+"),
  email: z.string().email("Invalid email")
});

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(d => console.log(d))}>
      <input type="number" {...register("age", { valueAsNumber: true })} />
      <p>{errors.age?.message}</p>
      <button>Submit</button>
    </form>
  );
}
```

**Interviewer Intentions:**
*   Robustness and libraries used.

---

### 28. What is React Fiber?
**Detailed Answer:**
React Fiber is the **reconciliation engine** introduced in React 16.
*   **Goal:** To enable **incremental rendering**.
*   **How:** It splits rendering work into chunks (units of work called "fibers"). It can pause work, reuse it, or abort it to prioritize high-priority updates (like user input) over low-priority ones (like data fetching).

**Real-time Example:**
Before Fiber, if React started rendering a huge list, the browser would freeze until done. With Fiber, React can pause every few milliseconds to let the browser handle clicks/animations, keeping the app responsive.

**Interviewer Intentions:**
*   Deep internal knowledge.

---

### 29. Difference between class component lifecycle methods and hooks.
**Detailed Answer:**
Hooks map to lifecycle methods but are not 1-to-1.

| Class Lifecycle | Functional Hook Equivalent |
| :--- | :--- |
| `componentDidMount` | `useEffect(() => { ... }, [])` |
| `componentDidUpdate` | `useEffect(() => { ... }, [prop])` |
| `componentWillUnmount` | `useEffect(() => { return () => ... }, [])` |
| `shouldComponentUpdate` | `React.memo` (wrapper) |

**Interviewer Intentions:**
*   Migration skills.

---

### 30. what is tree shaking?
**Detailed Answer:**
A term used in bundling (Webpack/Rollup) to remove **dead code**.
*   **How:** It relies on ES6 `import`/`export` static structure. If you export function A and B, but only import A, function B is removed from the final bundle.

**Syntax & Complete Flow:**

```javascript
// utils.js
export const used = () => console.log("Used");
export const unused = () => console.log("Unused");

// main.js
import { used } from './utils';
used();

// Result: 'unused' function is NOT in the final build file.
```

**Interviewer Intentions:**
*   Staying up-to-date.

## Next.js

### 1. What is Next.js? Why do we use it?
**Detailed Answer:**
Next.js is a React **framework** that provides building blocks to create web applications. It handles tooling and configuration needed for React, and provides additional structure, features, and optimizations.
**Why:** React is a library for building UIs, but it doesn't handle routing, data fetching, or SEO out of the box. Next.js provides these.

**Key Features:**
*   **SSR (Server Side Rendering):** Better SEO and initial load.
*   **SSG (Static Site Generation):** Fast static pages.
*   **File-based Routing:** No need for `react-router-dom`.
*   **API Routes:** Build backend endpoints in the same project.

**Syntax & Complete Flow:**

```javascript
// pages/index.js (Next.js 12/13 Pages Router)
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js</h1>
      <Link href="/about">Go to About</Link>
    </div>
  );
}
```

**Interviewer Intentions:**
*   Framework vs Library.
*   Production readiness.

---

### 2. Difference between Next.js and React.js?
**Detailed Answer:**
*   **React:** A library. "The V in MVC". You choose your own router, bundler, server. Client-side rendering (CSR) by default (bad for SEO).
*   **Next.js:** A framework. Batteries-included (Router, Webpack, Server included). Supports SSR/SSG (Great for SEO).

**Analogy:** React is the engine. Next.js is the car.

**Interviewer Intentions:**
*   Architectural understanding.

---

### 3. What is SSR, SSG, CSR, ISR?
**Detailed Answer:**
*   **CSR (Client Side Rendering):** Browser downloads empty HTML + JS. JS builds UI. (Standard React).
*   **SSR (Server Side Rendering):** Server builds HTML for *every request*. Good for dynamic data + SEO. (`getServerSideProps`).
*   **SSG (Static Site Generation):** Server builds HTML *once at build time*. Fastest. Good for blogs/docs. (`getStaticProps`).
*   **ISR (Incremental Static Regeneration):** SSG + updates. Rebuilds static pages in the background after x seconds.

**Syntax & Complete Flow (SSG vs SSR):**

```javascript
// 1. SSG (Build time)
export async function getStaticProps() {
  const res = await fetch('https://api.com/posts');
  const posts = await res.json();
  return { props: { posts } };
}

// 2. SSR (Request time)
export async function getServerSideProps(context) {
  const res = await fetch(`https://api.com/user/${context.params.id}`);
  const user = await res.json();
  return { props: { user } };
}
```

**Interviewer Intentions:**
*   Rendering strategies (Core Next.js concept).

---

### 4. What are the features of Next.js?
**Detailed Answer:**
1.  **Rendering Modes:** SSR, SSG, ISR, CSR.
2.  **File-system Routing:** `pages/about.js` -> `/about`.
3.  **API Routes:** `pages/api/user.js`.
4.  **Image Optimization:** `<Image />` component.
5.  **Middleware:** Run code before request completes.
6.  **Built-in CSS Support:** CSS Modules, Sass, Tailwind.

**Interviewer Intentions:**
*   Breadth of knowledge.

---

### 5. What is hydration in Next.js?
**Detailed Answer:**
Hydration is the process where JavaScript attaches to the HTML generated by the server (SSR/SSG) to make it interactive.
1.  Server sends HTML (User sees content immediately).
2.  Browser downloads JS bundle.
3.  React "hydrates" the HTML (Attaches event listeners like `onClick`).

**Real-time Example:**
You load a page. You see the button immediately (HTML). You click it, but nothing happens for 0.5s until JS loads. Once JS loads (Hydration), the button works.

**Interviewer Intentions:**
*   How React works on the server.

---

### 6. What is the Image component in Next.js?
**Detailed Answer:**
An extension of the HTML `<img>` element (`next/image`).
**Features:**
*   **Lazy Loading:** Images load only when scrolled into view.
*   **Resizing:** Automatically serves correctly sized images for different devices.
*   **Format:** Serves modern formats like WebP/AVIF.
*   **Prevention of CLS:** Prevents Cumulative Layout Shift by requiring width/height.

**Syntax & Complete Flow:**

```javascript
import Image from 'next/image';
import profilePic from '../public/me.png';

function Avatar() {
  return (
    <Image
      src={profilePic}
      alt="Picture of the author"
      width={500}
      height={500}
      placeholder="blur" // Shows blurred version while loading
    />
  );
}
```

**Interviewer Intentions:**
*   Performance optimization.

---

### 7. How routing works in Next.js?
**Detailed Answer:**
*   **Pages Router (Legacy/Stable):** Files in `pages/` directory become routes.
    *   `pages/index.js` -> `/`
    *   `pages/blog/[slug].js` -> `/blog/hello-world`
*   **App Router (New):** Files in `app/` directory. Uses Server Components by default.

**Syntax & Complete Flow (Dynamic Routing):**

```javascript
// File: pages/product/[id].js
import { useRouter } from 'next/router';

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Product ID: {id}</h1>;
}
```

**Interviewer Intentions:**
*   File-based routing mechanics.

---

### 8. What are dynamic routes in Next.js?
**Detailed Answer:**
Routes that support dynamic parameters. Defined using brackets `[]`.
*   `[id].js`: Matches `/1`, `/abc`.
*   `[...slug].js`: Catch-all. Matches `/a`, `/a/b`, `/a/b/c`.

**Syntax & Complete Flow:**
(See Q7).

**Interviewer Intentions:**
*   Handling variable URLs.

---

### 9. How to handle SEO in Next.js?
**Detailed Answer:**
1.  **SSR/SSG:** Ensures crawlers see content.
2.  **Head Component:** `next/head` allows modifying `<head>` tags (Title, Meta description).
3.  **Metadata API (App Router):** Export `metadata` object.

**Syntax & Complete Flow:**

```javascript
// Pages Router
import Head from 'next/head';

function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | MyApp</title>
        <meta name="description" content="Get in touch with us" />
      </Head>
      <h1>Contact Page</h1>
    </>
  );
}
```

**Interviewer Intentions:**
*   Why we use Next.js (SEO is the #1 reason).

---

### 10. How to fetch data in Next.js?
**Detailed Answer:**
*   **Client-side:** `useEffect` or SWR/React Query.
*   **Server-side (Pages):** `getServerSideProps`, `getStaticProps`.
*   **Server-side (App Router):** `async/await` directly in component.

**Syntax & Complete Flow (App Router - Modern):**

```javascript
// app/users/page.js
async function getUsers() {
  const res = await fetch('https://api.example.com/users');
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers(); // Direct async call

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

**Interviewer Intentions:**
*   Data fetching evolution.

---

### 11. Difference between Link and a tag?
**Detailed Answer:**
*   **`<a>` tag:** Standard HTML. Causes a **full page reload**. State is lost. Slower.
*   **`<Link>` component:** Next.js component. Performs **client-side transition**. Fetches JSON for the next page, changes URL, and re-renders without full reload. Preserves state. Prefetches pages in viewport.

**Syntax & Complete Flow:**

```javascript
import Link from 'next/link';

function Nav() {
  return (
    <nav>
      {/* BAD: Reloads page */}
      <a href="/about">About (Slow)</a>

      {/* GOOD: SPA Transition */}
      <Link href="/about">About (Fast)</Link>
    </nav>
  );
}
```

**Interviewer Intentions:**
*   SPA navigation vs MPA navigation.


---

### 31. What is React StrictMode?
**Detailed Answer:**
A tool for highlighting potential problems in an application. It does not render any visible UI.
**What it does (in Development only):**
1.  **Double Invocation:** Renders components twice to detect side effects in render phase.
2.  **Detects Legacy API:** Warns about unsafe lifecycles (`componentWillMount`).
3.  **Detects Deprecated FindDOMNode:** Warns usage.

**Syntax & Complete Flow:**

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Interviewer Intentions:**
*   Debugging and best practices.

---

### 32. What is Redux Tool Kit(RTK) and why do we use it?
**Detailed Answer:**
Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development.
**Why:** Standard Redux requires too much boilerplate (actions, constants, reducers, store setup). RTK simplifies this.
**Features:**
*   `configureStore`: Auto-setup with DevTools and Thunk.
*   `createSlice`: Generates actions and reducers automatically.
*   **Immer.js:** Allows writing "mutating" logic in reducers (e.g., `state.value = 123`).

**Syntax & Complete Flow:**

```javascript
// 1. Create Slice
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1; }, // "Mutation" allowed
    decrement: state => { state.value -= 1; }
  }
});

export const { increment, decrement } = counterSlice.actions;

// 2. Configure Store
const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});

// 3. Use in Component
// import { useSelector, useDispatch } from 'react-redux';
// const count = useSelector(state => state.counter.value);
// const dispatch = useDispatch();
// dispatch(increment());
```

**Interviewer Intentions:**
*   Modern Redux practices.

---

### 33. Explain the Redux flow
**Detailed Answer:**
Redux follows a unidirectional data flow.
1.  **Action:** User interacts (click), dispatching an Action (object with `type` and `payload`).
2.  **Reducer:** Pure function that takes `(prevState, action)` and returns `newState`.
3.  **Store:** Holds the state. Notifies subscribers.
4.  **View:** UI re-renders with new state (via `useSelector`).

**Visual Flow:**
`UI -> Dispatch(Action) -> Reducer -> Store -> UI`

**Interviewer Intentions:**
*   Flux architecture understanding.

---

### 34. What is middleware in Redux? Diff between Redux Thunk and Saga?
**Detailed Answer:**
Middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. Used for logging, crash reporting, talking to an asynchronous API, routing, etc.

*   **Redux Thunk:**
    *   Allows action creators to return a **function** instead of an action object.
    *   Simple, easy to learn. Good for simple async logic.
*   **Redux Saga:**
    *   Uses **Generator Functions** (`function*`).
    *   More powerful. Can handle complex scenarios like cancelling API calls, race conditions. Steeper learning curve.

**Syntax & Complete Flow (Thunk):**

```javascript
// Thunk Action Creator
const fetchUser = (id) => async (dispatch) => {
  dispatch({ type: 'FETCH_START' });
  try {
    const res = await fetch(`/api/user/${id}`);
    const data = await res.json();
    dispatch({ type: 'FETCH_SUCCESS', payload: data });
  } catch (err) {
    dispatch({ type: 'FETCH_FAIL', payload: err });
  }
};
```

**Interviewer Intentions:**
*   Async state management.

---

### 35. Explain RTK Query?
**Detailed Answer:**
A powerful data fetching and caching tool built into Redux Toolkit. It eliminates the need to write thunks and reducers for data fetching.
**Features:**
*   Automatic caching (deduplication).
*   Auto-refetching (polling, focus).
*   Loading/Error states provided automatically.

**Syntax & Complete Flow:**

```javascript
// 1. Define Service
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;

// 2. Use Hook in Component
function Pokemon({ name }) {
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error</>;
  return <img src={data.sprites.front_default} alt={name} />;
}
```

**Interviewer Intentions:**
*   Modern data fetching strategies.

---

### 36. How does React handle error boundaries?
**Detailed Answer:**
Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.
*   **Requirement:** Must be a **Class Component**.
*   **Methods:** `static getDerivedStateFromError()` (render fallback) and `componentDidCatch()` (log error).

**Syntax & Complete Flow:**

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

**Interviewer Intentions:**
*   Error handling strategy.

---

### 37. What is batching ? Why does React batch state updates?
**Detailed Answer:**
Batching is when React groups multiple state updates into a single re-render for better performance.
*   **React 17:** Batched only inside event handlers.
*   **React 18:** Automatic Batching (batches inside promises, timeouts, native events too).

**Syntax & Complete Flow:**

```javascript
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    // React 18: These two updates trigger ONE re-render.
    setCount(c => c + 1);
    setFlag(f => !f);
  };

  console.log("Render"); // Logs once per click
  return <button onClick={handleClick}>Click</button>;
}
```

**Interviewer Intentions:**
*   Performance internals.

---

### 38. what is react fragments?
**Detailed Answer:**
A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.

**Syntax & Complete Flow:**

```javascript
function Columns() {
  return (
    <React.Fragment>
      <td>Hello</td>
      <td>World</td>
    </React.Fragment>
  );
}

// Short syntax
function ShortColumns() {
  return (
    <>
      <td>Hello</td>
      <td>World</td>
    </>
  );
}
```

**Interviewer Intentions:**
*   DOM structure cleanliness.

---

### 39. what are bundlers? features of bundlers?
**Detailed Answer:**
Bundlers are tools that take your code (JS, CSS, Images) and bundle them into a single (or few) files that the browser can load.
*   **Examples:** Webpack, Vite, Parcel, Rollup.
*   **Features:**
    1.  **Bundling:** Combine files.
    2.  **Minification:** Remove whitespace/comments to reduce size.
    3.  **Transpilation:** Convert modern JS (ES6+) to older JS (ES5) using Babel.
    4.  **HMR (Hot Module Replacement):** Update modules in browser without reload.
    5.  **Tree Shaking:** Remove unused code.

**Interviewer Intentions:**
*   Build toolchain knowledge.

---

### 40. current version of React, react-router-dom?
**Detailed Answer:**
*   **React:** v18.2.0 (Introduced Concurrent Mode, Automatic Batching, Transitions).
*   **React Router DOM:** v6.20+ (Introduced Data APIs, `createBrowserRouter`).
*   **Next.js:** v14 (Server Actions, Turbopack).

**Interviewer Intentions:**
*   Staying up-to-date.

## Next.js

### 1. What is Next.js? Why do we use it?
**Detailed Answer:**
Next.js is a React **framework** that provides building blocks to create web applications. It handles tooling and configuration needed for React, and provides additional structure, features, and optimizations.
**Why:** React is a library for building UIs, but it doesn't handle routing, data fetching, or SEO out of the box. Next.js provides these.

**Key Features:**
*   **SSR (Server Side Rendering):** Better SEO and initial load.
*   **SSG (Static Site Generation):** Fast static pages.
*   **File-based Routing:** No need for `react-router-dom`.
*   **API Routes:** Build backend endpoints in the same project.

**Syntax & Complete Flow:**

```javascript
// pages/index.js (Next.js 12/13 Pages Router)
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js</h1>
      <Link href="/about">Go to About</Link>
    </div>
  );
}
```

**Interviewer Intentions:**
*   Framework vs Library.
*   Production readiness.

---

### 2. Difference between Next.js and React.js?
**Detailed Answer:**
*   **React:** A library. "The V in MVC". You choose your own router, bundler, server. Client-side rendering (CSR) by default (bad for SEO).
*   **Next.js:** A framework. Batteries-included (Router, Webpack, Server included). Supports SSR/SSG (Great for SEO).

**Analogy:** React is the engine. Next.js is the car.

**Interviewer Intentions:**
*   Architectural understanding.

---

### 3. What is SSR, SSG, CSR, ISR?
**Detailed Answer:**
*   **CSR (Client Side Rendering):** Browser downloads empty HTML + JS. JS builds UI. (Standard React).
*   **SSR (Server Side Rendering):** Server builds HTML for *every request*. Good for dynamic data + SEO. (`getServerSideProps`).
*   **SSG (Static Site Generation):** Server builds HTML *once at build time*. Fastest. Good for blogs/docs. (`getStaticProps`).
*   **ISR (Incremental Static Regeneration):** SSG + updates. Rebuilds static pages in the background after x seconds.

**Syntax & Complete Flow (SSG vs SSR):**

```javascript
// 1. SSG (Build time)
export async function getStaticProps() {
  const res = await fetch('https://api.com/posts');
  const posts = await res.json();
  return { props: { posts } };
}

// 2. SSR (Request time)
export async function getServerSideProps(context) {
  const res = await fetch(`https://api.com/user/${context.params.id}`);
  const user = await res.json();
  return { props: { user } };
}
```

**Interviewer Intentions:**
*   Rendering strategies (Core Next.js concept).

---

### 4. What are the features of Next.js?
**Detailed Answer:**
1.  **Rendering Modes:** SSR, SSG, ISR, CSR.
2.  **File-system Routing:** `pages/about.js` -> `/about`.
3.  **API Routes:** `pages/api/user.js`.
4.  **Image Optimization:** `<Image />` component.
5.  **Middleware:** Run code before request completes.
6.  **Built-in CSS Support:** CSS Modules, Sass, Tailwind.

**Interviewer Intentions:**
*   Breadth of knowledge.

---

### 5. What is hydration in Next.js?
**Detailed Answer:**
Hydration is the process where JavaScript attaches to the HTML generated by the server (SSR/SSG) to make it interactive.
1.  Server sends HTML (User sees content immediately).
2.  Browser downloads JS bundle.
3.  React "hydrates" the HTML (Attaches event listeners like `onClick`).

**Real-time Example:**
You load a page. You see the button immediately (HTML). You click it, but nothing happens for 0.5s until JS loads. Once JS loads (Hydration), the button works.

**Interviewer Intentions:**
*   How React works on the server.

---

### 6. What is the Image component in Next.js?
**Detailed Answer:**
An extension of the HTML `<img>` element (`next/image`).
**Features:**
*   **Lazy Loading:** Images load only when scrolled into view.
*   **Resizing:** Automatically serves correctly sized images for different devices.
*   **Format:** Serves modern formats like WebP/AVIF.
*   **Prevention of CLS:** Prevents Cumulative Layout Shift by requiring width/height.

**Syntax & Complete Flow:**

```javascript
import Image from 'next/image';
import profilePic from '../public/me.png';

function Avatar() {
  return (
    <Image
      src={profilePic}
      alt="Picture of the author"
      width={500}
      height={500}
      placeholder="blur" // Shows blurred version while loading
    />
  );
}
```

**Interviewer Intentions:**
*   Performance optimization.

---

### 7. How routing works in Next.js?
**Detailed Answer:**
*   **Pages Router (Legacy/Stable):** Files in `pages/` directory become routes.
    *   `pages/index.js` -> `/`
    *   `pages/blog/[slug].js` -> `/blog/hello-world`
*   **App Router (New):** Files in `app/` directory. Uses Server Components by default.

**Syntax & Complete Flow (Dynamic Routing):**

```javascript
// File: pages/product/[id].js
import { useRouter } from 'next/router';

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Product ID: {id}</h1>;
}
```

**Interviewer Intentions:**
*   File-based routing mechanics.

---

### 8. What are dynamic routes in Next.js?
**Detailed Answer:**
Routes that support dynamic parameters. Defined using brackets `[]`.
*   `[id].js`: Matches `/1`, `/abc`.
*   `[...slug].js`: Catch-all. Matches `/a`, `/a/b`, `/a/b/c`.

**Syntax & Complete Flow:**
(See Q7).

**Interviewer Intentions:**
*   Handling variable URLs.

---

### 9. How to handle SEO in Next.js?
**Detailed Answer:**
1.  **SSR/SSG:** Ensures crawlers see content.
2.  **Head Component:** `next/head` allows modifying `<head>` tags (Title, Meta description).
3.  **Metadata API (App Router):** Export `metadata` object.

**Syntax & Complete Flow:**

```javascript
// Pages Router
import Head from 'next/head';

function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | MyApp</title>
        <meta name="description" content="Get in touch with us" />
      </Head>
      <h1>Contact Page</h1>
    </>
  );
}
```

**Interviewer Intentions:**
*   Why we use Next.js (SEO is the #1 reason).

---

### 10. How to fetch data in Next.js?
**Detailed Answer:**
*   **Client-side:** `useEffect` or SWR/React Query.
*   **Server-side (Pages):** `getServerSideProps`, `getStaticProps`.
*   **Server-side (App Router):** `async/await` directly in component.

**Syntax & Complete Flow (App Router - Modern):**

```javascript
// app/users/page.js
async function getUsers() {
  const res = await fetch('https://api.example.com/users');
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers(); // Direct async call

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

**Interviewer Intentions:**
*   Data fetching evolution.

---

### 11. Difference between Link and a tag?
**Detailed Answer:**
*   **`<a>` tag:** Standard HTML. Causes a **full page reload**. State is lost. Slower.
*   **`<Link>` component:** Next.js component. Performs **client-side transition**. Fetches JSON for the next page, changes URL, and re-renders without full reload. Preserves state. Prefetches pages in viewport.

**Syntax & Complete Flow:**

```javascript
import Link from 'next/link';

function Nav() {
  return (
    <nav>
      {/* BAD: Reloads page */}
      <a href="/about">About (Slow)</a>

      {/* GOOD: SPA Transition */}
      <Link href="/about">About (Fast)</Link>
    </nav>
  );
}
```

**Interviewer Intentions:**
*   SPA navigation vs MPA navigation.

---

### 12. Difference between App Router and Page Router?
**Detailed Answer:**
*   **Pages Router (`pages/`):** The original Next.js router. Uses `getServerSideProps` / `getStaticProps`. Route based on file path.
*   **App Router (`app/`):** Introduced in Next.js 13. Uses **React Server Components** by default. Supports Layouts, Templates, and Streaming. Data fetching is done via `async/await` components.

**Syntax & Complete Flow:**

```javascript
// Pages Router (pages/about.js)
export default function About() { return <h1>About</h1> }

// App Router (app/about/page.js)
export default function About() { return <h1>About</h1> }
```

**Interviewer Intentions:**
*   Knowledge of the latest Next.js architecture.

## TypeScript

### 1. What is TypeScript?
**Detailed Answer:**
TypeScript is a superset of JavaScript developed by Microsoft. It adds **static typing** to JavaScript. It compiles (transpiles) down to plain JavaScript so browsers can run it.
**Why:** To catch errors at compile-time (during development) rather than runtime (in the browser).

**Syntax & Complete Flow:**

```typescript
// JavaScript
function add(a, b) {
  return a + b;
}
add("1", "2"); // Returns "12" (String concatenation - Bug?)

// TypeScript
function addTS(a: number, b: number): number {
  return a + b;
}
// addTS("1", "2"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
```

**Interviewer Intentions:**
*   Understanding the core value proposition: Type Safety.

---

### 2. TypeScript over JavaScript?
**Detailed Answer:**
**Advantages:**
1.  **Static Typing:** Catches bugs early.
2.  **IntelliSense:** Better autocompletion in IDEs (VS Code).
3.  **Readability:** Types act as documentation.
4.  **Refactoring:** Easier to rename variables/functions across the whole project safely.

**Disadvantages:**
1.  **Setup:** Requires compilation step.
2.  **Learning Curve:** Need to learn Interfaces, Generics, etc.
3.  **Verbosity:** More code to write initially.

**Interviewer Intentions:**
*   Trade-off analysis.

---

### 3. Basic Datatypes in TypeScript?
**Detailed Answer:**
TypeScript inherits all JS types and adds more.

**Primitive:**
*   `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.

**Non-Primitive:**
*   `object`, `Array<T>` or `T[]`.

**Special Types:**
*   `any`: Disables type checking (Avoid using).
*   `unknown`: Safer version of `any`. Must check type before using.
*   `void`: Function returns nothing.
*   `never`: Function never returns (throws error or infinite loop).
*   `tuple`: Fixed length array `[string, number]`.
*   `enum`: Named constants.

**Syntax & Complete Flow:**

```typescript
let username: string = "John";
let age: number = 30;
let isActive: boolean = true;
let scores: number[] = [1, 2, 3];
let user: [string, number] = ["John", 30]; // Tuple
```

**Interviewer Intentions:**
*   Familiarity with TS type system.

---

### 4. Type Inference?
**Detailed Answer:**
TypeScript is smart enough to guess the type of a variable based on its initial value. You don't always need to explicitly write the type.

**Syntax & Complete Flow:**

```typescript
let x = 10; // TS infers x is 'number'
// x = "Hello"; // Error: Type 'string' is not assignable to type 'number'.

// Function return inference
function double(n: number) {
  return n * 2; // TS infers return type is 'number'
}
```

**Interviewer Intentions:**
*   Knowing you don't need to over-annotate code.

---

### 5. Type Alias vs Interface?
**Detailed Answer:**
Both define the shape of an object.
*   **Interface:** Can be **merged** (declaration merging). Better for defining object shapes and classes.
*   **Type:** Can define unions, primitives, tuples. Cannot be merged.

**Syntax & Complete Flow:**

```typescript
// 1. Interface (Extendable)
interface User {
  name: string;
}
interface User { // Merges with above
  age: number;
}
const u: User = { name: "A", age: 10 };

// 2. Type (Unions)
type ID = string | number; // Union Type
type Status = "Active" | "Inactive"; // String Literal Union
```

**Interviewer Intentions:**
*   When to use which (Use Interface for Objects/APIs, Type for Unions/Primitives).

---

### 6. What is Enum?
**Detailed Answer:**
A way to define a set of named constants. JavaScript doesn't have this natively.

**Syntax & Complete Flow:**

```typescript
enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST"
}

function checkAccess(role: Role) {
  if (role === Role.ADMIN) {
    console.log("Full Access");
  }
}

checkAccess(Role.ADMIN);
```

**Interviewer Intentions:**
*   Organizing constants.

---

### 7. What are Generics?
**Detailed Answer:**
Generics allow you to create reusable components/functions that work with a variety of types rather than a single one. It's like a "variable for types".

**Syntax & Complete Flow:**

```typescript
// Without Generics (Specific)
function identityNumber(arg: number): number {
  return arg;
}

// With Generics (Reusable)
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(5); // T becomes number
const str = identity<string>("Hello"); // T becomes string
```

**Real-time Example:**
`useState<User>(null)` in React. You tell React that the state will hold a `User` object.

**Interviewer Intentions:**
*   Advanced typing skills.

---

### 8. Diff between any and unknown?
**Detailed Answer:**
*   **any:** "I don't care." TS disables all checking. You can access any property. Unsafe.
*   **unknown:** "I don't know yet." You cannot access properties until you verify the type (Type Narrowing). Safe.

**Syntax & Complete Flow:**

```typescript
let a: any = 10;
a.toUpperCase(); // No Error at compile time (Crashes at runtime)

let u: unknown = 10;
// u.toUpperCase(); // Error: Object is of type 'unknown'.

if (typeof u === 'string') {
  u.toUpperCase(); // OK (Narrowed to string)
}
```

**Interviewer Intentions:**
*   Type safety best practices.

---

### 9. Diff between void and never?
**Detailed Answer:**
*   **void:** A function that completes but returns `undefined` (or nothing).
*   **never:** A function that **never** completes normally (e.g., throws an error or infinite loop).

**Syntax & Complete Flow:**

```typescript
// Void
function logMessage(msg: string): void {
  console.log(msg);
}

// Never
function throwError(msg: string): never {
  throw new Error(msg);
}

function infiniteLoop(): never {
  while (true) {}
}
```

**Interviewer Intentions:**
*   Understanding control flow analysis.

---

### 10. Inheritance, Encapsulation, Abstraction, Polymorphism (OOP in TS)?
**Detailed Answer:**
TypeScript supports full OOP features.
1.  **Inheritance:** `class Child extends Parent`.
2.  **Encapsulation:** `public`, `private`, `protected` modifiers.
3.  **Abstraction:** `abstract class`. Cannot be instantiated, must be extended.
4.  **Polymorphism:** Method overriding.

**Syntax & Complete Flow:**

```typescript
// Abstraction
abstract class Animal {
  abstract makeSound(): void; // Must be implemented by child
  move(): void { console.log("Moving..."); }
}

// Inheritance
class Dog extends Animal {
  // Encapsulation
  private name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  // Polymorphism
  makeSound(): void {
    console.log("Woof!");
  }

  getName(): string {
    return this.name;
  }
}

const dog = new Dog("Buddy");
dog.makeSound(); // "Woof!"
// console.log(dog.name); // Error: Property 'name' is private.
```

**Interviewer Intentions:**
*   Object-Oriented Programming (OOP) fundamentals.








