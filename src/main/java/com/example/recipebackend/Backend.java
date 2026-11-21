package com.example.recipebackend;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
public class Backend {
    private static final List<Account> accounts = new ArrayList<>();
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api/auth", Backend::handleAuth);
        server.setExecutor(null);
        server.start();
        System.out.println("Server started on port 8080");
    }
    private static void handleAuth(HttpExchange exchange) throws IOException {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }
        String path = exchange.getRequestURI().getPath();
        String method = exchange.getRequestMethod();
        String response = "";
        int statusCode = 200;
        if ("POST".equalsIgnoreCase(method) && path.equals("/api/auth/login")) {
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            String username = extractJsonValue(body, "username");
            String password = extractJsonValue(body, "password");
            response = login(username, password);
        } else if ("DELETE".equalsIgnoreCase(method) && path.equals("/api/auth/all")) {
            accounts.clear();
            response = "ALL_ACCOUNTS_DELETED";
        } else if ("DELETE".equalsIgnoreCase(method) && path.startsWith("/api/auth/")) {
            String username = path.substring("/api/auth/".length());
            boolean removed = accounts.removeIf(acc -> acc.username.equals(username));
            response = removed ? "ACCOUNT_DELETED" : "ACCOUNT_NOT_FOUND";
        } else {
            statusCode = 404;
            response = "NOT_FOUND";
        }
        byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(statusCode, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }
    private static String login(String username, String password) {
        if (password == null || password.length() < 8) {
            return "PASSWORD_TOO_SHORT";
        }
        for (Account account : accounts) {
            if (account.username.equals(username)) {
                if (account.password.equals(password)) {
                    return "LOGIN_SUCCESS";
                }
                return "WRONG_PASSWORD";
            }
        }
        accounts.add(new Account(username, password));
        return "ACCOUNT_CREATED";
    }
    private static String extractJsonValue(String json, String key) {
        Pattern pattern = Pattern.compile("\"" + key + "\"\\s*:\\s*\"([^\"]*)\"");
        Matcher matcher = pattern.matcher(json);
        return matcher.find() ? matcher.group(1) : null;
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
