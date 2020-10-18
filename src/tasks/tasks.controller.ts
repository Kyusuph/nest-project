import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskSearchDto } from './dto/get-task-search.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private tasksService: TasksService) {}

  // Get requests
  @Get()
  async getTasks(@Query(ValidationPipe) taskSearchDto: GetTaskSearchDto, 
  @GetUser() user: User): Promise<Task[]> {
    this.logger.log(`Getting all task for user ${user.username} with filter ${JSON.stringify(taskSearchDto)}`);
    return await this.tasksService.getTasks(taskSearchDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  // // Post requests
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User,): Promise<Task> {
    this.logger.log(`Creating a new task ${JSON.stringify(createTaskDto)}`);
    return this.tasksService.createTask(createTaskDto, user);
  }

  // // Patch requests
  @Patch('/:id/status')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    const task = await this.tasksService.updateTask(id, status, user);
    return task;
  }

  // // Delete requests
  @Delete('/:id')
  async deleteTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    await this.tasksService.deleteTask(id, user);
  }
}
