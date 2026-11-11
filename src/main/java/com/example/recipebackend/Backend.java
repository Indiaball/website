package com.example.recipebackend;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
@SpringBootApplication
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class Backend {
    private final List<Account> accounts = new ArrayList<>();    public static void main(String[] args) {
        SpringApplication.run(Backend.class, args);
    }
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        if (request.password == null || request.password.length() < 8) {
            return "PASSWORD_TOO_SHORT";
        }
        for (Account account : accounts) {
            if (account.username.equals(request.username)) {
                if (account.password.equals(request.password)) {
                    return "LOGIN_SUCCESS";
                }
                return "WRONG_PASSWORD";
            }
        }
        accounts.add(
            new Account(
                request.username,
                request.password
            )
        );
        return "ACCOUNT_CREATED";
    }
    @DeleteMapping("/{username}")
    public String deleteAccount(@PathVariable String username) {
        boolean removed = accounts.removeIf(
            account -> account.username.equals(username)
        );
        if (removed) {
            return "ACCOUNT_DELETED";
        }
        return "ACCOUNT_NOT_FOUND";
    }
    @DeleteMapping("/all")
    public String clearAccounts() {
        accounts.clear();
        return "ALL_ACCOUNTS_DELETED";
    }
    public static class LoginRequest {
        public String username;
        public String password;
    }
    private static class Account {
        private String username;
        private String password;
        public Account(String username, String password) {
            this.username = username;
            this.password = password;
        }
    }
}