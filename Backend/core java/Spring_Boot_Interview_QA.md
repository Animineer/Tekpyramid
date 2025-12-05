# Spring Boot Interview Preparation

This document covers Spring Boot topics with detailed explanations, implementation flows, and real-time examples, designed to help you answer interview questions effectively.

---

## 1. Introduction to Spring Boot

### 1.1 What is Spring Boot & Advantages

**Why this topic?**
Spring Boot is built on top of the Spring Framework. It simplifies the setup and development of Spring applications by removing boilerplate configuration.

**Flow of Implementation:**
*   **Auto-Configuration**: Spring Boot automatically configures beans based on the dependencies on the classpath (e.g., if `spring-boot-starter-web` is present, it configures Tomcat and Spring MVC).
*   **Starter Dependencies**: Pre-bundled sets of dependencies (e.g., `spring-boot-starter-data-jpa` brings Hibernate, JDBC, etc.).
*   **Embedded Server**: Runs directly with `java -jar` without needing an external web server like Tomcat.

**Code Example:**
```java
@SpringBootApplication // Combines @Configuration, @EnableAutoConfiguration, @ComponentScan
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
```

**Realtime Example:**
**Setup Time**:
*   **Spring (Legacy)**: You spend 2 days configuring XML files, `web.xml`, and downloading JARs manually.
*   **Spring Boot**: You go to `start.spring.io`, select dependencies, download, and run in 5 minutes.

---

## 2. Dependency Injection (DI) & IoC

### 2.1 IoC Container & Dependency Injection

**Why this topic?**
Inversion of Control (IoC) transfers the control of object creation from the developer to the Spring Container. Dependency Injection (DI) is how the container supplies the dependencies.

1.  **Constructor Injection** (Recommended): Dependencies passed via constructor. Ensures immutability and testability.
2.  **Setter Injection**: Dependencies passed via setter methods. Optional dependencies.
3.  **Field Injection**: Dependencies injected directly into fields using `@Autowired`. Not recommended (hard to test).

**Bean Scopes:**
*   **Singleton** (Default): One instance per container.
*   **Prototype**: New instance every time it is requested.
*   **Request**: One instance per HTTP request (Web only).
*   **Session**: One instance per HTTP session (Web only).
*   **GlobalSession**: One instance per global HTTP session (Portlet only).

**Flow of Implementation:**
1.  **Define Bean**: Use `@Component`, `@Service`, or `@Repository`.
2.  **Inject Bean**: Use `@Autowired`.
3.  **Container Manages Lifecycle**: Creation, Initialization, Destruction.

**Code Example:**
```java
// 1. Service Bean
@Service
public class EmailService {
    public void sendEmail(String msg) {
        System.out.println("Sending: " + msg);
    }
}

// 2. Controller injecting Service
@RestController
public class UserController {
    
    // Field Injection (Not recommended, use Constructor Injection)
    @Autowired
    private EmailService emailService;
    
    @GetMapping("/notify")
    public String notifyUser() {
        emailService.sendEmail("Hello!");
        return "Sent";
    }
}
```

**Realtime Example:**
**Car Manufacturing**:
*   **Without DI**: The Car builds its own Engine inside itself. Hard to change engines.
*   **With DI**: The Factory (Spring Container) builds the Engine separately and "injects" it into the Car. You can easily switch between a V6 and V8 engine.

---

## 3. Building RESTful APIs

### 3.1 @RestController & HTTP Methods

**Why this topic?**
Spring Boot is primarily used to build REST APIs that communicate via HTTP (GET, POST, PUT, DELETE).

**Flow of Implementation:**
1.  **Annotate Class**: `@RestController` (implies `@Controller` + `@ResponseBody`).
2.  **Map Methods**: `@GetMapping`, `@PostMapping`, etc.
3.  **Handle Data**: Use `@RequestBody` for JSON input, `@PathVariable` for URL segments.

**Code Example:**
```java
@RestController
@RequestMapping("/api/users")
public class UserApi {

    // GET /api/users/1
    @GetMapping("/{id}")
    public ResponseEntity<String> getUser(@PathVariable int id) {
        return ResponseEntity.ok("User ID: " + id);
    }

    // POST /api/users
    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody UserDto user) {
        return ResponseEntity.status(HttpStatus.CREATED).body("Created " + user.getName());
    }
}
```

**Realtime Example:**
**Social Media App**:
*   `GET /posts`: Fetch news feed.
*   `POST /posts`: Create a new status update.
*   `DELETE /posts/123`: Delete a post.

---

## 4. Spring Data JPA & Hibernate

### 4.1 Entities & Repositories

**Why this topic?**
JPA (Java Persistence API) is the standard for ORM (Object-Relational Mapping). Hibernate is the implementation. Spring Data JPA abstracts the boilerplate code.

**Flow of Implementation:**
1.  **Entity**: Class mapped to DB table (`@Entity`).
2.  **Repository**: Interface extending `JpaRepository`.
3.  **Service**: Calls repository methods (`save`, `findById`).

**Code Example:**
```java
// 1. Entity
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    // Getters & Setters
}

// 2. Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Custom query method derived from name
    List<Product> findByName(String name);
}
```

**Realtime Example:**
**E-commerce Inventory**:
*   Instead of writing raw SQL `SELECT * FROM products WHERE price > 100`, you just call `productRepository.findByPriceGreaterThan(100)`.

---

## 5. Exception Handling

### 5.1 @ControllerAdvice & @ExceptionHandler

**Why this topic?**
You need a global way to handle errors (like "User Not Found") and return proper HTTP status codes (404) instead of crashing with a 500 error.

**Flow of Implementation:**
1.  **Create Global Handler**: Class annotated with `@ControllerAdvice`.
2.  **Define Methods**: Annotate with `@ExceptionHandler`.
3.  **Return Response**: Custom error object.

**Code Example:**
```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFound(UserNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneric(Exception ex) {
        return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

**Realtime Example:**
**ATM**: If you try to withdraw more money than you have, the system throws `InsufficientFundsException`. The Global Handler catches this and shows a polite message "Insufficient Funds" on the screen instead of a blue screen of death.

---

## 6. Validation

### 6.1 @Valid & Validation Annotations

**Why this topic?**
You must validate user input before processing it to ensure data integrity.

**Flow of Implementation:**
1.  **DTO**: Add annotations like `@NotNull`, `@Email`, `@Size`.
2.  **Controller**: Add `@Valid` before the `@RequestBody` parameter.

**Code Example:**
```java
public class UserDto {
    @NotNull(message = "Name cannot be null")
    private String name;
    
    @Email(message = "Invalid email format")
    private String email;
}

@PostMapping
public String register(@Valid @RequestBody UserDto user) {
    return "Registered";
}
```

**Realtime Example:**
**Signup Form**: If a user tries to sign up with "abc" as an email, the backend rejects it immediately saying "Invalid email format".

---

## 7. Configuration & Profiles

### 7.1 application.properties & @Value

**Why this topic?**
Hardcoding values (like DB passwords) is bad. Spring Boot allows external configuration.

**Flow of Implementation:**
1.  **File**: `src/main/resources/application.properties`.
2.  **Access**: Use `@Value("${key}")`.

**Code Example:**
```properties
# application.properties
app.welcomeMessage=Welcome to our API!
server.port=8081
```

```java
@RestController
public class ConfigDemo {
    @Value("${app.welcomeMessage}")
    private String message;
    
    @GetMapping("/welcome")
    public String welcome() {
        return message;
    }
}
```

**Realtime Example:**
**Environments**:
*   `application-dev.properties`: Connects to Local DB.
*   `application-prod.properties`: Connects to Production DB (AWS RDS).
*   You switch by setting `spring.profiles.active=prod`.

---

## 8. Testing

### 8.1 JUnit & Mockito

**Why this topic?**
Unit testing ensures individual components work correctly. Mockito allows you to mock dependencies (like the Database) so you test only the logic.

**Flow of Implementation:**
1.  **Test Class**: `@SpringBootTest` or `@ExtendWith(MockitoExtension.class)`.
2.  **Mock**: `@Mock` for dependencies.
3.  **Inject**: `@InjectMocks` for the class under test.
4.  **Verify**: `when(...).thenReturn(...)`.

**Code Example:**
```java
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void testGetUser() {
        User mockUser = new User("Alice");
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        
        User result = userService.getUserById(1L);
        assertEquals("Alice", result.getName());
    }
}
```

**Realtime Example:**
**Payment Gateway**: You don't want to actually charge a credit card every time you run a test. You "Mock" the Payment Service to always return "Success" during testing.

---

## 9. Deployment

### 9.1 Jar vs War & Docker

**Why this topic?**
How do you get your code to the server?

**Flow of Implementation:**
*   **JAR (Java Archive)**: Contains code + embedded Tomcat. Run with `java -jar app.jar`. (Preferred for Microservices).
*   **WAR (Web Archive)**: Deployed to an external Tomcat. (Legacy).
*   **Docker**: Containerize the JAR.

**Code Example:**
```dockerfile
# Dockerfile
FROM openjdk:17
COPY target/myapp.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

**Realtime Example:**
**Cloud Deployment**: You push your Docker image to AWS ECR, and Kubernetes (EKS) pulls it and runs 10 copies (replicas) of your app to handle traffic.

---

## 10. Microservices Overview

### 10.1 Architecture Components

**Why this topic?**
Modern apps are broken into smaller, independent services.

**Flow of Implementation:**
*   **Eureka**: Service Discovery (Phonebook for services).
*   **API Gateway**: Single entry point (Receptionist).
*   **Feign Client**: Easy HTTP communication between services.

**Code Example:**
```java
// Feign Client Interface to call another service
@FeignClient(name = "order-service")
public interface OrderClient {
    @GetMapping("/orders/{userId}")
    List<Order> getOrders(@PathVariable Long userId);
}
```

**Realtime Example:**
**Netflix**:
*   **Movie Service**: Handles video streaming.
*   **Recommendation Service**: Suggests new movies.
*   **Billing Service**: Charges your card.
*   If "Recommendation" fails, you can still watch movies (High Availability).

---

---

## 11. Spring Boot Actuator

**Why this topic?**
Production-ready features. It exposes endpoints to monitor and manage the application.

**Flow of Implementation:**
1.  **Dependency**: spring-boot-starter-actuator.
2.  **Endpoints**:
    *   \/actuator/health\: App status (UP/DOWN).
    *   \/actuator/info\: App version/details.
    *   \/actuator/metrics\: Memory, CPU usage.

**Realtime Example:**
**Health Check**: Load balancers (like AWS ALB) ping \/actuator/health\ to see if the server is alive. If it returns "DOWN", traffic is rerouted.

---

## 12. Spring Security Basics

**Why this topic?**
Security is mandatory. It handles Authentication (Who are you?) and Authorization (What can you do?).

**Flow of Implementation:**
1.  **Dependency**: spring-boot-starter-security.
2.  **Default Behavior**: Secures all endpoints, generates a default password.
3.  **Custom Config**: Extend WebSecurityConfigurerAdapter (Deprecated) or use SecurityFilterChain bean.

**Code Example:**
\\\java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf().disable()
        .authorizeRequests()
        .antMatchers("/public/**").permitAll() // Open access
        .anyRequest().authenticated() // Secure everything else
        .and().httpBasic();
    return http.build();
}
\\\

**Realtime Example:**
**Login**: Users cannot access \/profile\ without logging in. Admin users can access \/admin\, but normal users cannot.

---

## 13. AOP (Aspect Oriented Programming) & Transactions

### 13.1 AOP (Logging/Cross-cutting concerns)

**Why this topic?**
Separates business logic from system services (logging, security, transactions).

**Flow of Implementation:**
*   **Aspect**: The class containing the logic (\@Aspect\).
*   **Advice**: The action (\@Before\, \@After\, \@Around\).
*   **Pointcut**: Where to apply the advice (expression).

**Code Example:**
\\\java
@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore() {
        System.out.println("Method called...");
    }
}
\\\

### 13.2 @Transactional

**Why this topic?**
Ensures data integrity. If one step fails, all changes are rolled back.

**Flow of Implementation:**
*   Add \@Transactional\ to a method or class.
*   If an unchecked exception (RuntimeException) occurs, the DB transaction is rolled back.

**Realtime Example:**
**Bank Transfer**:
1. Debit User A.
2. Credit User B.
If step 2 fails, step 1 must be undone (Rollback). \@Transactional\ handles this automatically.



