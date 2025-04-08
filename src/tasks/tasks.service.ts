import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDTO } from './dto/create-task.dto';
// import { GetTasksSearchFilterDto } from './dto/get-tasks-search-filter.dto';
// import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TasksRepository,
  ) {}

  // getTasksWithSearchFilter(searchFilterDto: GetTasksSearchFilterDto): Task[] {
  //   const { search, status } = searchFilterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => task.title.toLowerCase().includes(search));
  //   }
  //   return tasks;
  // }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskRepository.save(task);
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`No data found with Id - ${id}`);
    }
  }

  // updateStatus(id: string, updateTaskStatusDTO: UpdateTaskStatusDTO): Task {
  //   const { status } = updateTaskStatusDTO;
  //   const task = this.getTaskById(id);

  //   task.status = status;

  //   return task;
  // }
}
