import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksSearchFilterDto } from './dto/get-tasks-search-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithSearchFilter(searchFilterDto: GetTasksSearchFilterDto): Task[] {
    const { search, status } = searchFilterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => task.title.toLowerCase().includes(search));
    }
    return tasks;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateStatus(id: string, status: TaskStatus): Task | undefined {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.status = status;
    }
    return task;
  }
}
