import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  addTask(title: string, desc: string): Task {
      const task: Task = {
          id: uuidv4(),
          title: title,
          description: desc,
          status: TaskStatus.OPEN,
      }
      this.tasks.push(task);

      return task;
  }
}
