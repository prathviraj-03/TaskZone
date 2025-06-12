package com.taskmanmt.task_m.controller;

import com.taskmanmt.task_m.model.User;
import com.taskmanmt.task_m.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        Optional<User> existingUser = userService.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return "Username already exists";
        }
        userService.register(user);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        Optional<User> loginUser = userService.login(user.getUsername(), user.getPassword());
        return loginUser.isPresent() ? "Login successful" : "Invalid credentials";
    }
}
