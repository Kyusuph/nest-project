import { BadRequestException, PipeTransform } from '@nestjs/common';

import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: string) {
    value = value.toUpperCase();
    if(!this.checkStatusValidation(value)) {
        throw new BadRequestException(`${value} is not a valid status`);
    }
    
    return value;
  }

  private checkStatusValidation(value: any): boolean {
      const statusIndex = this.allowedStatus.indexOf(value);
      return statusIndex !== -1;
  }
}
