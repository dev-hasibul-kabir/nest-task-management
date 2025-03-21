import { TaskStatus } from '../task.model';

export class GetTasksSearchFilterDto {
  status?: TaskStatus;
  search?: string;
}
