package com.taskmanmt.task_m.controller;

import com.taskmanmt.task_m.model.Task;
import com.taskmanmt.task_m.model.User;
import com.taskmanmt.task_m.service.TaskService;
import com.taskmanmt.task_m.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @GetMapping("/{username}")
    public List<Task> getUserTasks(@PathVariable String username) {
        Optional<User> user = userService.findByUsername(username);
        return user.map(taskService::getTasksByUser).orElse(List.of());
    }

    @PostMapping("/{username}")
    public String addTask(@PathVariable String username, @RequestBody Task task) {
        Optional<User> user = userService.findByUsername(username);
        if (user.isPresent()) {
            task.setUser(user.get());
            taskService.createTask(task);
            return "Task created";
        }
        return "User not found";
    }

    @PutMapping("/{id}")
    public String updateTask(@PathVariable Long id, @RequestBody Task task) {
        Optional<Task> updated = taskService.updateTask(id, task);
        return updated.isPresent() ? "Task updated" : "Task not found";
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return "Task deleted";
    }
}
