import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksSearchFilterDto } from './dto/get-tasks-search-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() searchFilterDto: GetTasksSearchFilterDto): Task[] {
    if (Object.keys(searchFilterDto).length) {
      return this.tasksService.getTasksWithSearchFilter(searchFilterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task | undefined {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task | undefined {
    return this.tasksService.updateStatus(id, status);
  }
}
