import {
  Body,
  Controller,
  // Delete,
  Get,
  Param,
  Post,
  // Patch,
  // Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
// import { GetTasksSearchFilterDto } from './dto/get-tasks-search-filter.dto';
// import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() searchFilterDto: GetTasksSearchFilterDto): Task[] {
  //   if (Object.keys(searchFilterDto).length) {
  //     return this.tasksService.getTasksWithSearchFilter(searchFilterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   return this.tasksService.deleteTask(id);
  // }

  // @Patch('/:id/status')
  // updateStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  // ): Task {
  //   return this.tasksService.updateStatus(id, updateTaskStatusDTO);
  // }
}
