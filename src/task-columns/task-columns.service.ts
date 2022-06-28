import { Injectable } from '@nestjs/common';
import { TaskColumnsRepository } from './task-columns.repository';

@Injectable()
export class TaskColumnsService {
  constructor(private readonly taskColumnsRepository: TaskColumnsRepository) {}

  async taskColumnsByProject(input: string) {
    try {
      const taskColumns = this.taskColumnsRepository.find(input);
      if (!taskColumns) {
        throw new Error(`No task columns found`);
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
