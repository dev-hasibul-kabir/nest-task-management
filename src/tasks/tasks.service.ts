import { Injectable, NotFoundException } from '@nestjs/common';
// import { TaskStatus } from './task-status.enum';
// import { CreateTaskDTO } from './dto/create-task.dto';
// import { GetTasksSearchFilterDto } from './dto/get-tasks-search-filter.dto';
// import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TasksRepository,
  ) {}

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

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

  // createTask(createTaskDTO: CreateTaskDTO): Task {
  //   const { title, description } = createTaskDTO;
  //   const task: Task = {
  //     id: uid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  // deleteTask(id: string): void {
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }

  // updateStatus(id: string, updateTaskStatusDTO: UpdateTaskStatusDTO): Task {
  //   const { status } = updateTaskStatusDTO;
  //   const task = this.getTaskById(id);

  //   task.status = status;

  //   return task;
  // }
}
