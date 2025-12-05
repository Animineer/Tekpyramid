# Advance Java Interview Preparation

This document covers Advance Java topics (JDBC, Servlets, JSP) with detailed explanations, implementation flows, and real-time examples, designed to help you answer interview questions effectively.

---

## 1. JDBC (Java Database Connectivity)

### 1.1 Connection, Statement, ResultSet

**Why this topic?**
JDBC is the standard API for connecting Java applications to relational databases. It allows you to execute SQL queries and retrieve results.

**Types of JDBC Drivers:**
1.  **Type 1 (JDBC-ODBC Bridge)**: Uses ODBC driver (Legacy, removed in Java 8).
2.  **Type 2 (Native-API)**: Uses client-side libraries (C/C++).
3.  **Type 3 (Network Protocol)**: Middleware server converts calls.
4.  **Type 4 (Thin Driver)**: Pure Java, converts directly to database protocol (Most common, e.g., MySQL Connector).

**Types of Statements:**
*   **Statement**: General SQL queries (prone to SQL Injection).
*   **PreparedStatement**: Precompiled, parameterized queries (Secure, faster).
*   **CallableStatement**: Used to execute Stored Procedures.

**Flow of Implementation:**
1.  **Load Driver**: `Class.forName("com.mysql.cj.jdbc.Driver")`
2.  **Establish Connection**: `DriverManager.getConnection(url, user, pass)`
3.  **Create Statement**: `PreparedStatement` (Preferred over `Statement` to prevent SQL Injection).
4.  **Execute Query**: `executeQuery()` for SELECT, `executeUpdate()` for INSERT/UPDATE/DELETE.
5.  **Process Results**: Iterate through `ResultSet`.
6.  **Close Resources**: Close connection to prevent memory leaks.

**Code Example:**
```java
public class JdbcDemo {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydb";
        String user = "root";
        String pass = "password";
        
        try (Connection conn = DriverManager.getConnection(url, user, pass)) {
            String sql = "SELECT * FROM users WHERE id = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, 101);
            
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                System.out.println("User: " + rs.getString("name"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

**Realtime Example:**
**Login System**: When you enter your username/password, the backend runs a `SELECT` query via JDBC to check if the credentials match what's in the database.

---

## 2. Servlets

### 2.1 Servlet Lifecycle & Request Handling

**Why this topic?**
Servlets are Java classes that run on a web server (like Tomcat) and handle HTTP requests. They are the foundation of Java Web Development (Spring MVC is built on top of Servlets).

**Flow of Implementation:**
1.  **init()**: Called once when the servlet is created.
2.  **service()**: Called for every request. Dispatches to `doGet()` or `doPost()`.
3.  **destroy()**: Called when the server shuts down.

**Code Example:**
```java
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.println("<h1>Hello from Servlet!</h1>");
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        String name = req.getParameter("username");
        System.out.println("Received: " + name);
    }
}
```

**Realtime Example:**
**Form Submission**: When you fill out a "Contact Us" form and click Submit, the browser sends a POST request to a Servlet, which reads the data and saves it.

---

### 2.2 Session Management (Cookies & HttpSession)

**Why this topic?**
HTTP is stateless (the server forgets you after every request). Session management allows the server to remember who you are across multiple requests (e.g., keeping you logged in).

**Flow of Implementation:**
*   **Cookies**: Small text files stored on the client (browser).
*   **HttpSession**: Object stored on the server, linked to the client via a Session ID cookie.

**Code Example:**
```java
// Login Servlet
protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
    HttpSession session = req.getSession();
    session.setAttribute("user", "Alice"); // Save user in session
}

// Dashboard Servlet
protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
    HttpSession session = req.getSession(false); // Don't create new if not exists
    if (session != null) {
        String user = (String) session.getAttribute("user");
        resp.getWriter().println("Welcome back, " + user);
    } else {
        resp.sendRedirect("login.html");
    }
}
```

**Realtime Example:**
**Shopping Cart**: You add items to your cart on one page, go to another page, and the items are still there. This is `HttpSession` at work.

---

## 3. JSP (JavaServer Pages)

### 3.1 Scriptlets, Expressions, and MVC

**Why this topic?**
JSP allows you to write HTML with embedded Java code. It is used as the **View** layer in MVC applications.

**Flow of Implementation:**
*   **Scriptlet `<% ... %>`**: Write Java logic (loops, if-else).
*   **Expression `<%= ... %>`**: Print values directly to HTML.
*   **Implicit Objects**: `request`, `response`, `session` are available automatically.

**Code Example:**
```jsp
<!-- index.jsp -->
<html>
<body>
    <h1>Current Time: <%= new java.util.Date() %></h1>
    
    <% 
        String name = request.getParameter("name");
        if (name != null) {
    %>
        <h2>Hello, <%= name %>!</h2>
    <% 
        } 
    %>
</body>
</html>
```

**Realtime Example:**
**Dynamic Reports**: Generating an HTML table that lists all employees. The HTML structure is static, but the rows are generated by a Java loop inside the JSP.

---

### 3.2 JSTL & EL (Expression Language)

**Why this topic?**
Writing raw Java code in JSP (Scriptlets) is bad practice (hard to read/maintain). JSTL and EL provide a cleaner, tag-based way to handle logic.

**Flow of Implementation:**
1.  **Import JSTL**: `<%@ taglib uri="..." prefix="c" %>`
2.  **Use Tags**: `<c:forEach>`, `<c:if>`.
3.  **Use EL**: `${variableName}` instead of `<%= variableName %>`.

**Code Example:**
```jsp
<!-- Better approach than Scriptlets -->
<c:if test="${not empty sessionScope.user}">
    Welcome, ${sessionScope.user}
</c:if>

<ul>
    <c:forEach var="item" items="${productList}">
        <li>${item.name} - $${item.price}</li>
    </c:forEach>
</ul>
```

**Realtime Example:**
**Product Catalog**: Displaying a list of products fetched from the database without cluttering the HTML with Java syntax.

---

## 4. Design Patterns (MVC & DAO)

### 4.1 MVC (Model-View-Controller)

**Why this topic?**
It separates concerns:
*   **Model**: Data (Java Beans).
*   **View**: UI (JSP/HTML).
*   **Controller**: Logic (Servlet).

**Flow of Implementation:**
1.  **Request** hits the **Servlet (Controller)**.
2.  **Controller** calls Service/DAO to get **Model** data.
3.  **Controller** sets data in request scope.
4.  **Controller** forwards to **JSP (View)**.

**Code Example:**
```java
// Controller
@WebServlet("/products")
public class ProductController extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        List<String> products = Arrays.asList("Laptop", "Phone");
        req.setAttribute("prodList", products); // Set Model
        
        RequestDispatcher rd = req.getRequestDispatcher("view_products.jsp");
        rd.forward(req, resp); // Forward to View
    }
}
```

**Realtime Example:**
**Web Apps**: Almost all modern web frameworks (Spring MVC, Struts) follow this pattern to keep code organized.

---

### 4.2 DAO (Data Access Object)

**Why this topic?**
It isolates database logic from business logic. If you change the database (e.g., MySQL to Oracle), you only change the DAO, not the whole app.

**Flow of Implementation:**
1.  **Interface**: `UserDAO` (methods like `save`, `delete`).
2.  **Implementation**: `UserDAOImpl` (contains JDBC code).
3.  **Service**: Calls `UserDAO`.

**Code Example:**
```java
public interface UserDAO {
    void save(User user);
    User get(int id);
}

public class UserDAOImpl implements UserDAO {
    public void save(User user) {
        // JDBC Insert Logic here
    }
}
```

**Realtime Example:**
**Bank System**: The `TransferService` focuses on checking balances and rules. It calls `AccountDAO.updateBalance()` to actually touch the database.

---

## 5. Build Tools (Maven/Gradle)

### 5.1 Maven Dependencies & Lifecycle

**Why this topic?**
Manually downloading JARs is painful. Maven manages dependencies and builds the project (compiles, tests, packages).

**Flow of Implementation:**
1.  **pom.xml**: Define dependencies (e.g., `mysql-connector-java`).
2.  **Commands**:
    *   `mvn clean`: Clears old build.
    *   `mvn install`: Compiles, tests, and packages into WAR/JAR.

**Code Example:**
```xml
<!-- pom.xml -->
<dependencies>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.28</version>
    </dependency>
</dependencies>
```

**Realtime Example:**
**Team Development**: Instead of sharing a 500MB folder of JARs, you just share the small `pom.xml`. Maven downloads everything automatically for each developer.

---

---

## 6. Servlet Filters & Listeners

### 6.1 Filters

**Why this topic?**
Filters allow you to intercept requests *before* they reach the Servlet or responses *after* they leave. Used for cross-cutting concerns.

**Flow of Implementation:**
1.  **Implement**: Filter interface.
2.  **Method**: doFilter(request, response, chain).
3.  **Chain**: chain.doFilter() passes control to the next filter or servlet.

**Code Example:**
\\\java
@WebFilter("/admin/*")
public class AuthFilter implements Filter {
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        if (request.getSession().getAttribute("user") == null) {
            ((HttpServletResponse) res).sendRedirect("login.jsp"); // Block request
        } else {
            chain.doFilter(req, res); // Allow request
        }
    }
}
\\\

**Realtime Example:**
**Authentication**: Checking if a user is logged in before allowing access to any \/admin\ page.
**Logging**: Logging the time taken for every request.

### 6.2 Listeners

**Why this topic?**
Listeners trigger events when something happens in the lifecycle (e.g., Server starts, Session created).

**Common Types:**
*   ServletContextListener: App startup/shutdown.
*   HttpSessionListener: Session creation/invalidation.

---

## 7. JSP Scopes

**Why this topic?**
Understanding scopes determines how long data persists and who can see it.

**Types:**
1.  **Page**: Available only in the current JSP page (Default).
2.  **Request**: Available for the duration of one HTTP request (forwarding).
3.  **Session**: Available for the entire user session (multiple requests).
4.  **Application**: Available for the entire application lifecycle (shared by all users).

**Realtime Example:**
*   **Request**: Error message shown after a failed form submit.
*   **Session**: User login details.
*   **Application**: Total active users counter.



