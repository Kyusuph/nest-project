import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskSearchDto } from './dto/get-task-search.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // // Get requests
  // @Get()
  // getTasks(@Query(ValidationPipe) taskSearchDto: GetTaskSearchDto): Task[] {
  //   if(Object.keys(taskSearchDto).length) {
  //     return this.tasksService.getTasksWithFilters(taskSearchDto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // // Post requests
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  // // Patch requests
  @Patch('/:id/status')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    const task = await this.tasksService.updateTask(id, status);
    return task;
  }

  // // Delete requests
  @Delete('/:id')
  async deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.tasksService.deleteTask(id);
  }
}
