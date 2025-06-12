package com.taskmanmt.task_m.repository;

import com.taskmanmt.task_m.model.Task;
import com.taskmanmt.task_m.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
}
