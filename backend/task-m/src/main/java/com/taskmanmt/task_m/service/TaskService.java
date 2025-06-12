package com.taskmanmt.task_m.service;

import com.taskmanmt.task_m.model.Task;
import com.taskmanmt.task_m.model.User;
import com.taskmanmt.task_m.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getTasksByUser(User user) {
        return taskRepository.findByUser(user);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Optional<Task> updateTask(Long id, Task newTask) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task existingTask = optionalTask.get();
            existingTask.setTitle(newTask.getTitle());
            existingTask.setDescription(newTask.getDescription());
            existingTask.setStatus(newTask.getStatus());
            return Optional.of(taskRepository.save(existingTask));
        }
        return Optional.empty();
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
