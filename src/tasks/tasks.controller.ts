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
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskSearchDto } from './dto/get-task-search.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // Gets
  @Get()
  getTasks(@Query() taskSearchDto: GetTaskSearchDto): Task[] {
    if(Object.keys(taskSearchDto).length) {
      return this.tasksService.getTasksWithFilter(taskSearchDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/:field')
  updateTask(
    @Param('id') id: string,
    @Param('field') field: string,
    @Body() value: {[field: string]: string},
  ): Task {
    return this.tasksService.updateTask(id, field, value);
  }
}
