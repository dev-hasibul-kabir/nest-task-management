import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksSearchFilterDto } from './dto/get-tasks-search-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TasksRepository,
  ) {}

  async getTasks(
    searchFilterDto: GetTasksSearchFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { search, status } = searchFilterDto;
    const query = this.taskRepository.createQueryBuilder('task');

    query.where({ user });
    if (search) {
      query.andWhere('LOWER(task.title) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.taskRepository.save(task);
    return task;
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: id, user: user },
    });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`No data found with Id - ${id}`);
    }
  }

  async updateStatus(
    id: string,
    updateTaskStatusDTO: UpdateTaskStatusDTO,
    user: User,
  ): Promise<void> {
    const { status } = updateTaskStatusDTO;
    const result = await this.taskRepository.update({ id, user }, { status });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
