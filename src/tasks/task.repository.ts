import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskSearchDto } from './dto/get-task-search.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');
  async getTasks(taskSearchDto: GetTaskSearchDto, user: User): Promise<Task[]> {
    const { status, search } = taskSearchDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    try {
      const task = await query.getMany();
      return task;
    } catch (e) {
      this.logger.error(
        `Failed to get all task for user: ${
          user.username
        } with filter ${JSON.stringify(taskSearchDto)}`,
        e.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    try {
      await task.save();
    } catch (e) {
      this.logger.error(
        `Failed to create a new task for user: ${
          user.username
        } with payload ${JSON.stringify(createTaskDto)}`,
        e.stack,
      );
      throw new InternalServerErrorException();
    }

    delete task.user;
    return task;
  }
}
